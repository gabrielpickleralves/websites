# Trilha sonora sintetizada para pickler-v2.html: 45 s em loop (3 passagens de 15 s).
# Uso: python3 trilha-v2.py [saida.wav]   (só numpy)
import sys, wave
import numpy as np

SR = 48000
DUR, SEG = 45.0, 15.0
BEAT = 0.625                 # 96 BPM; 15 s = 6 compassos
BAR = BEAT * 4
rng = np.random.default_rng(11)
N = int(DUR * SR)
L = np.zeros(N); R = np.zeros(N); send = np.zeros(N); duck = np.ones(N)


def tt(d): return np.arange(int(d * SR)) / SR


def add(sig, at, gain=1.0, pan=0.0, verb=0.0):
    """soma com volta ao início: o que passa de 45 s cai no começo (loop sem emenda)"""
    i = int(at * SR) % N
    idx = (np.arange(len(sig)) + i) % N
    s = sig * gain
    np.add.at(L, idx, s * np.sqrt((1 - pan) / 2) * 1.414)
    np.add.at(R, idx, s * np.sqrt((1 + pan) / 2) * 1.414)
    np.add.at(send, idx, s * verb)


def band(sig, lo, hi):
    f = np.fft.rfftfreq(len(sig), 1 / SR); S = np.fft.rfft(sig)
    return np.fft.irfft(S / (1 + (lo / np.maximum(f, 1)) ** 4) / (1 + (f / hi) ** 4), len(sig))


def sweep_noise(d, f0, f1, width=0.6):
    n = int(d * SR); out = np.zeros(n + 4096); hop = 1024; win = np.hanning(2048)
    for k in range(0, n, hop):
        c = f0 * (f1 / f0) ** (k / n)
        out[k:k + 2048] += band(rng.standard_normal(2048), c / (1 + width), c * (1 + width)) * win
    return out[:n] / (np.abs(out).max() + 1e-9)


def env(d, a=0.005, decay=8.0):
    t = tt(d); e = np.exp(-t * decay); na = max(1, int(a * SR)); e[:na] *= np.linspace(0, 1, na); return e


def note(m): return 440 * 2 ** ((m - 69) / 12)


def saw(f, t, n=8):
    return sum(np.sin(2 * np.pi * f * h * t) / h for h in range(1, n + 1))

# ---------- instrumentos ----------
def kick():
    t = tt(0.4); f = 48 + 100 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8)

def snare():
    n = band(rng.standard_normal(int(0.3 * SR)), 1200, 7000) * env(0.3, 0.001, 14)
    return n / np.abs(n).max() * 0.8 + np.sin(2 * np.pi * 185 * tt(0.3)) * env(0.3, 0.001, 25) * 0.5

def hat():
    s = band(rng.standard_normal(int(0.06 * SR)), 7000, 16000) * env(0.06, 0.0005, 60); return s / np.abs(s).max()

def bass(f, d):
    t = tt(d); return np.tanh(1.5 * saw(f, t, 5)) * env(d, 0.004, 4)

def pluck(f, d=0.35):
    t = tt(d); return (saw(f, t, 4) * 0.6 + np.sin(2 * np.pi * f * 2 * t) * 0.3) * env(d, 0.002, 10)

def pad(fs, d):
    t = tt(d); s = np.zeros(len(t))
    for f in fs:
        for det in (-0.8, 0, 0.9):
            s += saw(f + det, t, 4) * 0.5 + np.sin(2 * np.pi * (f + det) * t + rng.uniform(0, 6.28))
    e = np.minimum(1, t / 0.8) * np.minimum(1, (d - t) / 0.8)
    return s * e / (len(fs) * 6)

def boom(d=2.0):
    t = tt(d); f = 30 + 60 * np.exp(-t * 6)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.8)
    n = band(rng.standard_normal(len(t)), 80, 4000) * np.exp(-t * 6)
    return s + 0.3 * n / np.abs(n).max()

def whoosh(d, up=True, f0=300, f1=6000):
    s = sweep_noise(d, f0 if up else f1, f1 if up else f0); t = tt(d)[:len(s)]
    return s * ((t / d) ** 2 if up else np.exp(-t * 4 / d) * np.minimum(1, t / 0.02))

def shimmer(d, f0, f1):
    t = tt(d); f = f0 * (f1 / f0) ** (t / d)
    s = sum(np.sin(2 * np.pi * np.cumsum(f * k) / SR) / k for k in (1, 1.5, 2))
    return s * np.sin(np.pi * t / d)

def blip(f, d=0.08): return np.sin(2 * np.pi * f * tt(d)) * env(d, 0.001, 40)

def glitch(d):
    n = int(d * SR); s = rng.standard_normal(n) * 0.5 + np.sign(np.sin(2 * np.pi * rng.uniform(90, 500) * tt(d)))
    s = np.round(s * 3) / 3; return np.repeat(s[::10], 10)[:n] * 0.5

# ---------- música: cada passagem num tom (acompanha a troca de paleta) ----------
KEYS = [57, 60, 53]                         # lá menor, dó menor, fá menor
PROG = [0, -4, 3, -2, 0, -4]                # i, VI, III, VII, i, VI (em semitons a partir da tônica)
for ps in range(3):
    root = KEYS[ps]
    for b in range(6):
        t0 = ps * SEG + b * BAR; r = root + PROG[b]
        minor = PROG[b] in (0,)
        tri = [r, r + (3 if minor else 4), r + 7]
        add(pad([note(n) for n in tri], BAR + 0.8), t0, 0.28, verb=0.5)
        drums = 1 <= b <= 4                 # 2,5–12,5 s: bateria; 12,5–15 respiro (casa com flash e saída)
        for k in range(4):
            tb = t0 + k * BEAT
            if drums:
                add(kick(), tb, 0.85)
                i = int(tb * SR) % N; d = int(0.3 * SR); idx = (np.arange(d) + i) % N
                duck[idx] = np.minimum(duck[idx], 1 - 0.6 * np.exp(-np.arange(d) / SR * 12))
                if k in (1, 3): add(snare(), tb, 0.35, verb=0.35)
                add(hat(), tb + BEAT / 2, 0.14, pan=0.3)
            if b >= 1:
                for e8 in range(2):
                    add(bass(note(r - 24), BEAT / 2), tb + e8 * BEAT / 2, 0.32 if drums else 0.18)
        pr = np.random.default_rng(ps * 10 + b)
        tones = [note(n + 12) for n in tri] + [note(n + 24) for n in tri]
        for s in range(16):
            if b == 0 and s < 4: continue
            add(pluck(tones[(s * 2 + pr.integers(2)) % len(tones)]), t0 + s * BEAT / 4, 0.09, pan=pr.uniform(-0.6, 0.6), verb=0.4)

# ---------- efeitos sincronizados (mesmos tempos do HTML, por passagem) ----------
for ps in range(3):
    o = ps * SEG; root = KEYS[ps]
    # 1. letra por letra: uma nota subindo por letra
    for i, n in enumerate([0, 3, 7, 10, 12, 15, 19]):
        add(pluck(note(root + 12 + n), 0.5), o + 0.2 + i * 0.09, 0.16, pan=-0.6 + i * 0.2, verb=0.5)
    # 10. linhas de luz entre cenas
    for s, d in [(2.35, 0.5), (4.35, 0.5), (11.9, 0.4)]:
        add(whoosh(d, up=True, f0=800, f1=9000), o + s, 0.22, pan=0.4)
    for k in range(5):
        add(whoosh(0.6, up=True, f0=600, f1=8000), o + 8.6 + k * 0.22, 0.14, pan=-0.8 + k * 0.4)
    # 2. dolly zoom: impacto suave
    add(boom(1.6), o + 2.5, 0.45, verb=0.5)
    # 3. reflexo especular
    add(shimmer(0.9, 2000, 5000), o + 3.5, 0.08, verb=0.6)
    # 4. máscara: varredura da esquerda para a direita + kinetic entrando
    sw = whoosh(0.8, up=True, f0=400, f1=4000)
    for k in range(8):
        add(sw[k * len(sw) // 8:(k + 1) * len(sw) // 8], o + 4.6 + k * 0.1, 0.25, pan=-0.9 + k * 0.25)
    add(whoosh(0.9, up=False), o + 4.6, 0.18)
    # 12. flash colorido em 6,5 e branco em 12
    add(boom(), o + 6.5, 0.6, verb=0.5)
    add(boom(2.5), o + 12.0, 0.9, verb=0.7)
    add(whoosh(0.5, up=True), o + 11.5, 0.35)
    # 5. glitches
    for s, n in [(6.7, 4), (7.3, 3), (7.9, 5)]:
        add(glitch(n / 30 + 0.03), o + s, 0.3, pan=rng.uniform(-0.5, 0.5))
    # 6. rack focus nos cards: tom subindo e "entrando em foco"
    add(shimmer(1.4, 300, 1200), o + 10.3, 0.1, verb=0.5)
    # 15. saída em partículas: faíscas subindo
    add(whoosh(1.4, up=True, f0=1000, f1=10000), o + 13.0, 0.2)
    for k in range(50):
        add(blip(rng.uniform(2500, 7000), 0.04), o + 13.0 + rng.uniform(0, 1.6), 0.04, pan=rng.uniform(-1, 1), verb=0.6)

# ---------- mixagem ----------
L *= duck; R *= duck
# reverb com convolução circular: a cauda do fim entra no começo
ir_t = tt(2.6); ir = band(rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 2.4), 200, 8000)
ir /= np.sqrt((ir ** 2).sum()); IR = np.zeros(N); IR[:len(ir)] = ir
wet = np.fft.irfft(np.fft.rfft(send) * np.fft.rfft(IR), N)
L += wet * 0.5; R += np.roll(wet, 700) * 0.5
mix = np.stack([L, R], 1)
mix = np.tanh(mix / np.abs(mix).max() * 1.3) / np.tanh(1.3) * 0.89

out = sys.argv[1] if len(sys.argv) > 1 else 'trilha-v2.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok:', out, f'{len(mix) / SR:.1f}s')
