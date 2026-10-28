"""Usa uma narração gravada (ex.: ElevenLabs) no lugar da voz sintetizada.

Encurta pausas longas, acelera um pouco a fala e acha o início de cada frase de
narracao.json casando as pausas do áudio com o tamanho de cada frase.
Gera narracao.wav e tempos.json no mesmo formato de gerar_narracao.py.

Uso: python alinhar_voz.py <audio> [aceleracao]
"""
import json, re, subprocess, sys
from pathlib import Path

import numpy as np
import soundfile as sf

AQUI = Path(__file__).parent
audio_in = sys.argv[1]
acel = float(sys.argv[2]) if len(sys.argv) > 2 else 1.1
SR = 44100
PAUSA_MAX = 0.3  # pausas maiores que isso são encurtadas para isso
FIM = 1.2

pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", audio_in, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                     capture_output=True, check=True).stdout
x = np.frombuffer(pcm, dtype=np.float32)
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", audio_in, "-af", "silencedetect=noise=-35dB:d=0.15", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
ss = [float(v) for v in re.findall(r"silence_start: ([\d.]+)", log)]
se = [float(v) for v in re.findall(r"silence_end: ([\d.]+)", log)]
silencios = list(zip(ss, se))

# 1) encurta pausas e monta o mapa tempo-original -> tempo-novo
partes, mapa, cursor, novo = [], [], 0.0, 0.0
for s, e in silencios:
    if e - s <= PAUSA_MAX:
        continue
    corte_ini, corte_fim = s + PAUSA_MAX / 2, e - PAUSA_MAX / 2
    partes.append(x[int(cursor * SR):int(corte_ini * SR)])
    mapa.append((cursor, novo))
    novo += corte_ini - cursor
    cursor = corte_fim
partes.append(x[int(cursor * SR):])
mapa.append((cursor, novo))
dur_orig = len(x) / SR


def remap(t):
    """tempo no áudio original -> tempo no áudio final (pausas encurtadas e acelerado)"""
    base_o, base_n = mapa[0]
    for o, n in mapa:
        if o <= t:
            base_o, base_n = o, n
    return (base_n + max(0.0, t - base_o)) / acel


# 2) acha o fim de cada frase entre as pausas (programação dinâmica)
cenas = json.loads((AQUI / "narracao.json").read_text())
frases = [(ci, f) for ci, c in enumerate(cenas) for f in c["frases"]]
ini_fala = silencios[0][1] if silencios and silencios[0][0] < 0.05 else 0.0
fim_fala = silencios[-1][0] if silencios and silencios[-1][1] > dur_orig - 0.05 else dur_orig
cands = [(s + e) / 2 for s, e in silencios if ini_fala < s and e < fim_fala] + [fim_fala]
fala_total = fim_fala - ini_fala
chars = np.array([len(f) for _, f in frases], dtype=float)
esperado = chars / chars.sum() * fala_total
N, M = len(frases), len(cands)
INF = float("inf")
custo = np.full((N, M), INF)
volta = np.zeros((N, M), dtype=int)
for j in range(M):
    d = cands[j] - ini_fala
    custo[0, j] = (d - esperado[0]) ** 2 / esperado[0]
for i in range(1, N):
    for j in range(i, M):
        melhor, arg = INF, -1
        for k in range(i - 1, j):
            if custo[i - 1, k] == INF:
                continue
            d = cands[j] - cands[k]
            c = custo[i - 1, k] + (d - esperado[i]) ** 2 / esperado[i]
            if c < melhor:
                melhor, arg = c, k
        custo[i, j], volta[i, j] = melhor, arg
fins = [M - 1]
for i in range(N - 1, 0, -1):
    fins.append(volta[i, fins[-1]])
fins = [cands[j] for j in reversed(fins)]
inicios = [ini_fala] + fins[:-1]

# 3) monta os tempos (palavras distribuídas pelo tamanho dentro de cada frase)
saida = [{"id": c["id"], "tag": c["tag"], "frases": [], "palavras": []} for c in cenas]
for (ci, frase), a, b in zip(frases, inicios, fins):
    # a frase começa quando a fala volta depois da pausa
    a_fala = next((e for s, e in silencios if s <= a <= e), a)
    b_fala = next((s for s, e in silencios if s <= b <= e), b)
    t0, t1 = remap(a_fala), remap(b_fala)
    saida[ci]["frases"].append(round(t0, 3))
    ws = frase.split()
    pesos = [len(w) + 2 for w in ws]
    acc = t0
    for w, p in zip(ws, pesos):
        d = (t1 - t0) * p / sum(pesos)
        saida[ci]["palavras"].append({"w": w, "t0": round(acc, 3), "t1": round(acc + d, 3)})
        acc += d
for i, c in enumerate(saida):
    c["inicio"] = 0.0 if i == 0 else round((saida[i - 1]["palavras"][-1]["t1"] + c["frases"][0]) / 2, 3)
total = remap(dur_orig) + FIM
for a, b in zip(saida, saida[1:] + [None]):
    a["fim"] = b["inicio"] if b else round(total, 3)

# 4) grava o áudio final
y = np.concatenate(partes + [np.zeros(int(FIM * acel * SR), dtype=np.float32)])
tmp = AQUI / "_tmp.wav"
sf.write(tmp, y, SR)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(tmp), "-af", f"atempo={acel}", str(AQUI / "narracao.wav")], check=True)
tmp.unlink()
(AQUI / "tempos.json").write_text(json.dumps({"total": round(total, 3), "cenas": saida}, ensure_ascii=False, indent=1))
print(f"original={dur_orig:.1f}s final={total:.1f}s frases={N} pausas={len(silencios)}")
for (ci, f), a, b in zip(frases, inicios, fins):
    print(f"{remap(a):7.2f} {b - a:5.2f}s (esp {esperado[frases.index((ci, f))]:5.2f})  {f[:60]}")
