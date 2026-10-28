"""Gera narracao.wav e tempos.json a partir de narracao.json (voz Kokoro, pt-br).

Uso: python gerar_narracao.py <pasta-do-modelo> [voz] [velocidade]
A pasta do modelo precisa ter kokoro-v1.0.onnx e voices-v1.0.bin.
"""
import json, sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

AQUI = Path(__file__).parent
modelo = Path(sys.argv[1])
voz = sys.argv[2] if len(sys.argv) > 2 else "pm_alex"
velocidade = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0

PAUSA_FRASE = 0.25
PAUSA_CENA = 0.6
INICIO = 0.3
FIM = 1.5

kokoro = Kokoro(str(modelo / "kokoro-v1.0.onnx"), str(modelo / "voices-v1.0.bin"))
cenas = json.loads((AQUI / "narracao.json").read_text())

partes, t, sr = [], INICIO, 24000
saida = []
partes.append(np.zeros(int(INICIO * sr), dtype=np.float32))
for i, cena in enumerate(cenas):
    inicio_cena, palavras, frases = t, [], []
    for frase in cena["frases"]:
        frases.append(round(t, 3))
        audio, sr = kokoro.create(frase, voice=voz, speed=velocidade, lang="pt-br")
        # corta silêncio das pontas para a legenda bater com a fala
        voz_idx = np.where(np.abs(audio) > 0.01)[0]
        audio = audio[max(voz_idx[0] - 240, 0): voz_idx[-1] + 480]
        dur = len(audio) / sr
        # distribui o tempo da frase entre as palavras pelo tamanho de cada uma
        ws = frase.split()
        pesos = [len(w) + 2 for w in ws]
        acc = t
        for w, p in zip(ws, pesos):
            d = dur * p / sum(pesos)
            palavras.append({"w": w, "t0": round(acc, 3), "t1": round(acc + d, 3)})
            acc += d
        partes.append(audio.astype(np.float32))
        partes.append(np.zeros(int(PAUSA_FRASE * sr), dtype=np.float32))
        t += dur + PAUSA_FRASE
    if i < len(cenas) - 1:
        partes.append(np.zeros(int(PAUSA_CENA * sr), dtype=np.float32))
        t += PAUSA_CENA
    saida.append({"id": cena["id"], "tag": cena["tag"], "inicio": round(inicio_cena, 3), "frases": frases, "palavras": palavras})

partes.append(np.zeros(int(FIM * sr), dtype=np.float32))
t += FIM
for a, b in zip(saida, saida[1:] + [None]):
    a["fim"] = b["inicio"] if b else round(t, 3)

sf.write(AQUI / "narracao.wav", np.concatenate(partes), sr)
(AQUI / "tempos.json").write_text(json.dumps({"total": round(t, 3), "cenas": saida}, ensure_ascii=False, indent=1))
print(f"voz={voz} velocidade={velocidade} total={t:.1f}s")
for c in saida:
    print(f'{c["inicio"]:7.2f}  {c["tag"]}')
