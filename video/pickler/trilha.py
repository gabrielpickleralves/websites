# Trilha sonora sintetizada para pickler-tech.html (mesmos tempos do roteiro).
# Uso: python3 trilha.py [saida.wav]   (só numpy)
import sys, wave
import numpy as np

SR = 48000
DUR = 41.6
BEAT = 0.65                  # 92,3 BPM; um compasso = 2,6 s = uma cena
BAR = BEAT * 4
rng = np.random.default_rng(7)
N = int(DUR * SR) + SR
L = np.zeros(N); R = np.zeros(N)
send = np.zeros(N)           # envio para o reverb (mono)
duck = np.ones(N)            # sidechain do bumbo


def tt(d): return np.arange(int(d * SR)) / SR


def add(sig, at, gain=1.0, pan=0.0, verb=0.0):
    i = int(at * SR)
    if i >= N: return
    sig = sig[:N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2) * 1.414
    R[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2) * 1.414
    send[i:i + len(sig)] += sig * verb


def band(sig, lo, hi):
    f = np.fft.rfftfreq(len(sig), 1 / SR); S = np.fft.rfft(sig)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 4) / (1 + (f / hi) ** 4)
    return np.fft.irfft(S * m, len(sig))


def sweep_noise(d, f0, f1, width=1.0):
    """ruído filtrado com centro indo de f0 a f1 (overlap-add)"""
    n = int(d * SR); out = np.zeros(n + 4096); hop = 1024; win = np.hanning(2048)
    for k in range(0, n, hop):
        c = f0 * (f1 / f0) ** (k / n)
        seg = band(rng.standard_normal(2048), c / (1 + width), c * (1 + width)) * win
        out[k:k + 2048] += seg
    return out[:n] / (np.abs(out).max() + 1e-9)


def env(d, a=0.005, decay=8.0):
    t = tt(d); e = np.exp(-t * decay)
    na = max(1, int(a * SR)); e[:na] *= np.linspace(0, 1, na)
    return e


def note(f): return 440 * 2 ** ((f - 69) / 12)

# ---------- instrumentos ----------
def kick():
    t = tt(0.45); f = 45 + 110 * np.exp(-t * 28)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
    s[:200] += rng.standard_normal(200) * np.linspace(0.6, 0, 200)
    return s

def clap():
    s = band(rng.standard_normal(int(0.25 * SR)), 900, 5000) * env(0.25, 0.001, 18)
    return s / np.abs(s).max() + np.sin(2 * np.pi * 190 * tt(0.25)) * env(0.25, 0.001, 30) * 0.4

def hat(d=0.05):
    s = band(rng.standard_normal(int(d * SR)), 7000, 16000) * env(d, 0.0005, 70)
    return s / (np.abs(s).max() + 1e-9)

def pluck(f, d=0.28):
    t = tt(d)
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(4 * np.pi * f * t) + 0.15 * np.sin(6 * np.pi * f * t)) * env(d, 0.002, 14)

def bass(f, d):
    t = tt(d)
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.tanh(3 * np.sin(2 * np.pi * f * t))
    return s * env(d, 0.004, 5)

def pad(fs, d):
    t = tt(d); s = np.zeros(len(t))
    for f in fs:
        for det in (-0.6, 0, 0.7):
            for h, a in ((1, 1), (2, 0.35), (3, 0.12)):
                s += a * np.sin(2 * np.pi * (f + det) * h * t + rng.uniform(0, 6.28))
    e = np.minimum(1, t / 0.6) * np.minimum(1, (d - t) / 0.5)
    return s * e / (len(fs) * 4)

def blip(f, d=0.06):
    return np.sin(2 * np.pi * f * tt(d)) * env(d, 0.001, 50)

def click():
    s = band(rng.standard_normal(400), 2000, 9000) * np.exp(-np.arange(400) / 60)
    return s / (np.abs(s).max() + 1e-9)

def boom():
    t = tt(2.2); f = 28 + 70 * np.exp(-t * 6)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6)
    n = band(rng.standard_normal(len(t)), 60, 3000) * np.exp(-t * 5)
    return s + 0.35 * n / np.abs(n).max()

def whoosh(d, up=True):
    s = sweep_noise(d, 300 if up else 5000, 5000 if up else 300, 0.6)
    t = tt(d)[:len(s)]
    e = (t / d) ** 2 if up else np.exp(-t * 4 / d) * np.minimum(1, t / 0.02)
    return s * e

def riser(d):
    t = tt(d); f = 200 * (8 ** (t / d))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.5 + np.sin(2 * np.pi * np.cumsum(f * 1.01) / SR) * 0.5
    return (tone * 0.5 + sweep_noise(d, 400, 9000, 0.8)[:len(t)]) * (t / d) ** 2

def glitch(d):
    n = int(d * SR); s = rng.standard_normal(n)
    sq = np.sign(np.sin(2 * np.pi * rng.uniform(80, 400) * tt(d)))
    s = np.round((0.5 * s + sq) * 3) / 3            # bitcrush
    hold = 12; s = np.repeat(s[::hold], hold)[:n]   # downsample
    return s * 0.5

def zap(d, f0, f1):
    t = tt(d); f = f0 * (f1 / f0) ** (t / d) * (1 + 0.03 * np.sin(2 * np.pi * 30 * t))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.02) * np.exp(-t * 1.5)

def chime(fs, d=1.2):
    return sum(np.sin(2 * np.pi * f * tt(d)) * env(d, 0.002, 4) for f in fs) / len(fs)

# ---------- música ----------
CHORDS = [(57, 60, 64), (53, 57, 60), (48, 52, 55), (55, 59, 62)]   # Am F C G
bars = int(DUR // BAR)
for b in range(bars):
    t0 = b * BAR; ch = CHORDS[b % 4]
    full = b in (4, 5, 6, 7, 8, 12)
    # pad o tempo todo, menos no último compasso do contorno (o riser ocupa)
    if b != 13:
        add(pad([note(n) for n in ch], BAR + 0.4), t0, 0.22, verb=0.4)
    for k in range(4):
        tb = t0 + k * BEAT
        kick_on = (b == 1 and k in (0, 2)) or (b in (2, 3, 4, 5, 6, 7, 8, 11, 12)) or (b == 10 and k == 0)
        if kick_on:
            add(kick(), tb, 0.9)
            i = int(tb * SR); d = int(0.3 * SR)
            duck[i:i + d] = np.minimum(duck[i:i + d], 1 - 0.65 * np.exp(-np.arange(d) / SR * 12))
        if (full or b in (3, 11)) and k in (1, 3):
            add(clap(), tb, 0.45, verb=0.3)
        if b >= 2 and b not in (9, 13, 14, 15):
            for h in range(4 if full else 2):
                step = BEAT / (4 if full else 2)
                add(hat(), tb + h * step, 0.18 if h % 2 else 0.1, pan=0.3)
        if b >= 2 and b not in (9, 13, 14, 15):
            for e8 in range(2):
                add(bass(note(ch[0] - 24), BEAT / 2), tb + e8 * BEAT / 2, 0.42)
    # arpejo em dezesseis avos nas seções cheias e no respiro do globo
    if full or b in (9, 10):
        pr = np.random.default_rng(b)
        tones = [note(n + 12 * o) for o in (0, 1) for n in ch]
        for s in range(16):
            if pr.random() < 0.8:
                add(pluck(tones[pr.integers(len(tones))]), t0 + s * BEAT / 4, 0.12, pan=pr.uniform(-0.6, 0.6), verb=0.35)

# ---------- efeitos ----------
# 1. terminal: digitação
for i in range(int(1.7 * 34)):
    add(click(), i / 34 + rng.uniform(0, 0.01), 0.12, pan=rng.uniform(-0.4, 0.4))
for k in range(16):
    add(click(), 1.7 + k * 0.035, 0.25)
add(blip(1320, 0.12), 1.7 + 16 * 0.035, 0.25, verb=0.3)

# glitches e flashes (mesmas listas do HTML)
for s, n in [(2.53, 3), (5.13, 3), (12.93, 4), (20.73, 3), (29.7, 5), (31.13, 3), (33.73, 4)]:
    add(glitch(n / 30 + 0.04), s, 0.35, pan=rng.uniform(-0.5, 0.5))
for s in (7.8, 23.4, 36.4):
    add(whoosh(0.6, up=True), s - 0.6, 0.5)
    add(boom(), s, 0.9 if s == 36.4 else 0.6, verb=0.6)

# 2. grade: brilho da onda e bipes da matriz de pontos subindo
add(whoosh(1.2, up=True), 2.6, 0.18, verb=0.3)
for wc in range(41):
    add(blip(700 + wc * 30, 0.05), 2.6 + 1.2 + wc * 0.035, 0.07, pan=-0.7 + wc / 30, verb=0.2)
add(whoosh(0.85, up=True), 2.6 + 1.75, 0.3)

# 3. circuito: estalos, zaps dos pulsos, ping na chegada, mergulho no chip
add(band(rng.standard_normal(int(1.1 * SR)), 2000, 8000) * (rng.random(int(1.1 * SR)) > 0.995) * 3, 5.3, 0.2)
for k in range(4):
    add(zap(0.7, 180, 900), 5.2 + 1.0 + k * 0.12, 0.12, pan=(-0.6, 0.6, -0.3, 0.3)[k])
    add(blip(1760, 0.2), 5.2 + 1.7 + k * 0.12, 0.12, verb=0.4)
add(whoosh(0.65, up=True), 5.2 + 1.95, 0.4)

# 4. túnel: vento acelerando e riser curto
add(whoosh(2.6, up=True), 7.8, 0.35)
add(riser(2.6), 7.8, 0.15)

# 5. HUD: pings do radar, tique a cada 10%, acorde ao completar, saída
add(chime([1568], 1.5), 10.5, 0.15, verb=0.6)
ts = np.linspace(0, 2.6, 2601)
p = np.clip((ts - 0.4) / 1.6, 0, 1); p = np.where(p < .5, 16 * p ** 5, 1 - (-2 * p + 2) ** 5 / 2)
for k in range(1, 11):
    i = np.argmax(p >= k / 10 - 1e-9)
    add(blip(900 + k * 60, 0.04), 10.4 + ts[i], 0.12)
add(chime([note(69), note(76), note(81)], 1.6), 10.4 + 2.0, 0.3, verb=0.5)
add(whoosh(0.4, up=False), 10.4 + 2.2, 0.3)

# 6. janelas: pops, clique, sucesso, recolhimento
for i in range(8):
    add(zap(0.08, 900, 300) * 0.8, 13.0 + 0.1 + i * 0.16 + 0.03, 0.18, pan=-0.5 if i % 2 == 0 else 0.5)
add(zap(0.1, 700, 250), 13.0 + 1.43, 0.25)
add(click(), 13.0 + 2.75, 0.6); add(blip(2000, 0.03), 13.0 + 2.75, 0.2)
add(zap(1.1, 300, 1200) * 0.5, 13.0 + 2.85, 0.1)
add(chime([note(72), note(76), note(79), note(84)], 1.6), 13.0 + 3.95, 0.3, verb=0.5)
add(whoosh(0.6, up=False), 13.0 + 4.3, 0.35)
add(blip(1320, 0.08), 13.0 + 4.6, 0.2, verb=0.4)

# 7. dados: um bipe por ponto da linha
for i in range(24):
    add(blip(500 + i * 45, 0.05), 18.2 + 0.35 + 1.3 * i / 23, 0.08, pan=-0.7 + i / 17, verb=0.2)

# 8. osciloscópio: tom que pulsa com o bumbo
t = tt(2.6)
wob = np.sin(2 * np.pi * 110 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * t / BEAT * 2)) * np.minimum(1, t / 0.3) * np.minimum(1, (2.6 - t) / 0.2)
add(wob + 0.3 * np.sin(2 * np.pi * 220.5 * t) * np.exp(-(t % BEAT) * 7), 20.8, 0.14)

# 9. globo: ping em cada ponto ativo
for k in range(10):
    add(blip(note(81 + (0, 3, 7, 10, 12)[k % 5]), 0.25), 23.4 + 0.6 + k * 0.15, 0.08, pan=rng.uniform(-0.7, 0.7), verb=0.6)

# 10. partículas: redemoinho, faíscas, encaixe, espalhar
add(whoosh(1.8, up=True), 26.3, 0.3)
for k in range(70):
    add(blip(rng.uniform(2500, 6000), 0.03), 26.3 + rng.uniform(0, 2.0), 0.04, pan=rng.uniform(-1, 1), verb=0.5)
add(boom() * 0.6, 28.4, 0.5, verb=0.4)
add(chime([note(81), note(88)], 1.2), 28.4, 0.2, verb=0.6)
add(whoosh(0.9, up=False), 30.3, 0.4)

# 11. hex: conversa de dados e a faixa varrendo
for k in range(110):
    add(click(), 31.2 + rng.uniform(0, 2.4), 0.06, pan=rng.uniform(-1, 1))
add(whoosh(0.7, up=True), 31.2 + 1.8, 0.4)

# 12. contorno: chiado elétrico desenhando, enchimento, riser e rufo até o impacto
t = tt(1.3)
hum = np.tanh(2 * np.sin(2 * np.pi * 55 * t)) * 0.4 + band(rng.standard_normal(len(t)), 3000, 9000) * 0.3
add(hum * np.minimum(1, t / 0.1), 33.8, 0.2)
add(whoosh(0.6, up=True), 33.8 + 1.3, 0.35)
add(riser(2.0), 34.4, 0.35)
k = 0; tr = 35.1
while tr < 36.35:
    add(clap(), tr, 0.12 + 0.25 * (tr - 35.1) / 1.25)
    tr += max(0.04, 0.16 - 0.1 * (tr - 35.1)); k += 1

# 13. título: máquina de escrever e a segunda onda
for k in range(17):
    add(click(), 36.4 + 0.9 + k * 0.04, 0.2)
add(whoosh(0.5, up=True), 36.4 + 2.4, 0.2)
add(boom() * 0.4, 36.4 + 2.6, 0.4, verb=0.5)

# ---------- mixagem ----------
L *= duck; R *= duck
# reverb: convolução com ruído de cauda exponencial
ir_t = tt(2.4); ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 2.6)
ir = band(ir, 200, 8000); ir /= np.sqrt((ir ** 2).sum())
M = 1 << int(np.ceil(np.log2(N + len(ir))))
wet = np.fft.irfft(np.fft.rfft(send, M) * np.fft.rfft(ir, M), M)[:N]
L += wet * 0.5; R += np.roll(wet, 700) * 0.5
fade = np.ones(N); a, b = int(40.5 * SR), int(DUR * SR)
fade[a:b] = np.linspace(1, 0, b - a); fade[b:] = 0
L *= fade; R *= fade
mix = np.stack([L, R], 1)[:int(DUR * SR)]
mix = np.tanh(mix / np.abs(mix).max() * 1.3) / np.tanh(1.3) * 0.89

out = sys.argv[1] if len(sys.argv) > 1 else 'trilha.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok:', out, f'{len(mix) / SR:.1f}s')
