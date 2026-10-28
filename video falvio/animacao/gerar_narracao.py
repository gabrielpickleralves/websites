"""Gera narracao.wav e tempos.json a partir de narracao.json.

Uso:
  python gerar_narracao.py edge [voz] [velocidade]          voz neural da Microsoft (ex.: pt-BR-AntonioNeural)
  python gerar_narracao.py <pasta-do-kokoro> [voz] [veloc.]  voz Kokoro local (kokoro-v1.0.onnx + voices-v1.0.bin)
"""
import asyncio, json, subprocess, sys
from pathlib import Path

import numpy as np
import soundfile as sf

AQUI = Path(__file__).parent
motor = sys.argv[1]
voz = sys.argv[2] if len(sys.argv) > 2 else ("pt-BR-AntonioNeural" if motor == "edge" else "pm_alex")
velocidade = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0

PAUSA_FRASE = 0.25
PAUSA_CENA = 0.6
INICIO = 0.3
FIM = 1.5
SR = 24000


def edge(frase):
    """Voz da Microsoft: devolve o áudio e o início/fim (s) de cada palavra falada."""
    import edge_tts
    taxa = f"{round((velocidade - 1) * 100):+d}%"
    com = edge_tts.Communicate(frase, voz, rate=taxa, boundary="WordBoundary")
    mp3, marcas = bytearray(), []

    async def rodar():
        async for c in com.stream():
            if c["type"] == "audio":
                mp3.extend(c["data"])
            elif c["type"] == "WordBoundary":
                marcas.append((c["offset"] / 1e7, (c["offset"] + c["duration"]) / 1e7))
    asyncio.run(rodar())
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", "-", "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         input=bytes(mp3), capture_output=True, check=True).stdout
    return np.frombuffer(pcm, dtype=np.float32), marcas


if motor == "edge":
    sintetizar = edge
else:
    from kokoro_onnx import Kokoro
    kokoro = Kokoro(str(Path(motor) / "kokoro-v1.0.onnx"), str(Path(motor) / "voices-v1.0.bin"))
    sintetizar = lambda frase: (kokoro.create(frase, voice=voz, speed=velocidade, lang="pt-br")[0], None)

cenas = json.loads((AQUI / "narracao.json").read_text())

partes, t = [np.zeros(int(INICIO * SR), dtype=np.float32)], INICIO
saida = []
for i, cena in enumerate(cenas):
    inicio_cena, palavras, frases = t, [], []
    for frase in cena["frases"]:
        frases.append(round(t, 3))
        audio, marcas = sintetizar(frase)
        # corta silêncio das pontas para a legenda bater com a fala
        voz_idx = np.where(np.abs(audio) > 0.01)[0]
        corte = max(voz_idx[0] - 240, 0)
        audio = audio[corte: voz_idx[-1] + 480]
        dur = len(audio) / SR
        ws = frase.split()
        if marcas and len(marcas) == len(ws):
            # tempo real de cada palavra, vindo da própria voz
            for w, (a, b) in zip(ws, marcas):
                palavras.append({"w": w, "t0": round(t + a - corte / SR, 3), "t1": round(t + b - corte / SR, 3)})
        else:
            # distribui o tempo da frase entre as palavras pelo tamanho de cada uma
            pesos = [len(w) + 2 for w in ws]
            acc = t
            for w, p in zip(ws, pesos):
                d = dur * p / sum(pesos)
                palavras.append({"w": w, "t0": round(acc, 3), "t1": round(acc + d, 3)})
                acc += d
        partes.append(audio.astype(np.float32))
        partes.append(np.zeros(int(PAUSA_FRASE * SR), dtype=np.float32))
        t += dur + PAUSA_FRASE
    if i < len(cenas) - 1:
        partes.append(np.zeros(int(PAUSA_CENA * SR), dtype=np.float32))
        t += PAUSA_CENA
    saida.append({"id": cena["id"], "tag": cena["tag"], "inicio": round(inicio_cena, 3), "frases": frases, "palavras": palavras})

partes.append(np.zeros(int(FIM * SR), dtype=np.float32))
t += FIM
for a, b in zip(saida, saida[1:] + [None]):
    a["fim"] = b["inicio"] if b else round(t, 3)

sf.write(AQUI / "narracao.wav", np.concatenate(partes), SR)
(AQUI / "tempos.json").write_text(json.dumps({"total": round(t, 3), "cenas": saida}, ensure_ascii=False, indent=1))
print(f"voz={voz} velocidade={velocidade} total={t:.1f}s")
for c in saida:
    print(f'{c["inicio"]:7.2f}  {c["tag"]}')
