# .venv/bin/python gen_music.py  -> public/music.wav
# Score + sound design, all synthesized from code, locked to the same timeline.json the video reads.
import json, numpy as np
from scipy.signal import butter, sosfilt, sosfilt_zi, fftconvolve

T = json.load(open('src/timeline.json'))
SR = 48000
DUR = T['duration']
N = int(SR * DUR)
BEAT = 60 / T['bpm']
rng = np.random.default_rng(7)

def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def tt(n): return np.arange(n) / SR
def bus(): return np.zeros((2, N))

def add(b, at, sig, gain=1.0, pan=0.0):
    """mix mono or stereo sig into bus b at time `at` (seconds), equal-power pan"""
    i = int(at * SR)
    if i >= N: return
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.vstack([sig * l * 1.414, sig * r * 1.414])
    n = min(sig.shape[1], N - i)
    b[:, i:i + n] += gain * sig[:, :n]

def filt(x, kind, f, order=2):
    sos = butter(order, f, kind, fs=SR, output='sos')
    return sosfilt(sos, x, axis=-1)

def sweep_filter(x, kind, f_curve, order=2, block=512):
    """time-varying butterworth: f_curve(t_seconds_array) -> cutoff per block"""
    x = np.atleast_2d(x)
    out = np.zeros_like(x)
    zi = None
    for s in range(0, x.shape[1], block):
        f = float(np.clip(f_curve(s / SR), 30, SR / 2 - 500))
        sos = butter(order, f, kind, fs=SR, output='sos')
        if zi is None: zi = np.stack([sosfilt_zi(sos) * 0 for _ in range(x.shape[0])], axis=1)
        out[:, s:s + block], zi = sosfilt(sos, x[:, s:s + block], axis=-1, zi=zi)
    return out

def saw(f, n, phase=0.0):
    ph = (phase + np.cumsum(np.full(n, f) if np.isscalar(f) else f) / SR) % 1.0
    return 2 * ph - 1

def env_adsr(n, a=0.01, d=0.1, s=0.7, r=0.2):
    e = np.ones(n) * s
    na, nd, nr = int(a * SR), int(d * SR), int(r * SR)
    na = min(na, n); e[:na] = np.linspace(0, 1, na)
    nd = min(nd, n - na); e[na:na + nd] = np.linspace(1, s, nd)
    nr = min(nr, n); e[n - nr:] *= np.linspace(1, 0, nr)
    return e

def expdec(n, tau): return np.exp(-tt(n) / tau)

# ---------------- instruments ----------------
def kick(amp=1.0):
    n = int(0.5 * SR); t = tt(n)
    f = 45 + 110 * np.exp(-t / 0.035)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.28)
    click = filt(rng.standard_normal(n), 'highpass', 2000) * np.exp(-t / 0.004) * 0.35
    return np.tanh((body + click) * 1.6) * amp

def clap():
    n = int(0.4 * SR); t = tt(n)
    nz = filt(rng.standard_normal(n), 'bandpass', [900, 3200])
    e = np.zeros(n)
    for k, o in enumerate([0, 0.011, 0.022]):
        i = int(o * SR); e[i:] += np.exp(-(t[:n - i]) / (0.012 if k < 2 else 0.14))
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05) * 0.4
    return (nz * e + tone) * 0.6

def hat(open_=False):
    n = int((0.35 if open_ else 0.08) * SR); t = tt(n)
    nz = filt(rng.standard_normal(n), 'highpass', 7500, 4)
    return nz * np.exp(-t / (0.11 if open_ else 0.022)) * 0.5

def bass_note(m, dur, bright=500):
    n = int(dur * SR); f = mtof(m)
    x = 0.8 * np.sin(2 * np.pi * f * tt(n)) + 0.45 * filt(saw(f, n) + saw(f * 1.005, n), 'lowpass', bright)
    return np.tanh(x * 1.3) * env_adsr(n, 0.004, 0.08, 0.75, 0.05)

def pluck(m, dur=0.22, cutoff=3500):
    n = int(dur * SR); f = mtof(m); t = tt(n)
    x = 0.6 * saw(f, n) + 0.4 * np.sign(np.sin(2 * np.pi * f * t)) * 0.5
    x = sweep_filter(x, 'lowpass', lambda s: 300 + cutoff * np.exp(-s / 0.06), block=256)[0]
    return x * np.exp(-t / 0.09)

def bell(m, dur=1.4, idx=2.5):
    n = int(dur * SR); t = tt(n); f = mtof(m)
    mod = np.sin(2 * np.pi * f * 3.5 * t) * idx * np.exp(-t / 0.25)
    return np.sin(2 * np.pi * f * t + mod) * np.exp(-t / (dur / 3.5)) * env_adsr(n, 0.002, 0.01, 1, 0.05)

def pad_chord(notes, dur, detune_c=9):
    n = int(dur * SR)
    out = np.zeros((2, n))
    for m in notes:
        for k, d in enumerate([-detune_c, 0, detune_c]):
            f = mtof(m) * 2 ** (d / 1200)
            v = saw(f, n, phase=rng.random())
            pan = [-0.7, 0, 0.7][k]
            out[0] += v * np.cos((pan + 1) * np.pi / 4); out[1] += v * np.sin((pan + 1) * np.pi / 4)
    return out / (len(notes) * 2.2) * env_adsr(n, 0.35, 0.3, 0.85, 0.6)

def noise_sweep(dur, f0, f1, shape='rise'):
    n = int(dur * SR); t = tt(n)
    x = rng.standard_normal((2, n))
    x = sweep_filter(x, 'bandpass', lambda s: 0, block=512) if False else x
    y = np.zeros_like(x)
    zi = None
    for s in range(0, n, 512):
        p = s / n
        fc = f0 * (f1 / f0) ** p
        sos = butter(2, [fc * 0.7, min(fc * 1.4, SR / 2 - 1000)], 'bandpass', fs=SR, output='sos')
        if zi is None: zi = np.zeros((sos.shape[0], 2, 2))
        y[:, s:s + 512], zi = sosfilt(sos, x[:, s:s + 512], axis=-1, zi=zi)
    e = (t / dur) ** 2.2 if shape == 'rise' else np.sin(np.pi * t / dur) ** 2
    return y * e

def impact(size=1.0):
    n = int(2.5 * SR); t = tt(n)
    f = 32 + 40 * np.exp(-t / 0.08)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / (0.9 * size))
    crash = filt(rng.standard_normal(n), 'lowpass', 5000) * np.exp(-t / 0.35) * 0.35
    return np.tanh((boom * 1.2 + crash) * 1.4) * 0.8

def click(amp=1.0):
    n = int(0.03 * SR); t = tt(n)
    return (filt(rng.standard_normal(n), 'bandpass', [1800, 6000]) * np.exp(-t / 0.004) + np.sin(2 * np.pi * 2400 * t) * np.exp(-t / 0.003) * 0.3) * amp

def blip(m, dur=0.12):
    n = int(dur * SR); t = tt(n); f = mtof(m)
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2 * t)) * np.exp(-t / (dur / 4))

def thud(m):
    n = int(0.45 * SR); t = tt(n); f = mtof(m) * (1 + 0.6 * np.exp(-t / 0.02))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)
    nz = filt(rng.standard_normal(n), 'lowpass', 1800) * np.exp(-t / 0.03) * 0.4
    return np.tanh((body + nz) * 1.5)

def buzz():
    n = int(0.4 * SR); t = tt(n)
    f = 98 * (1 - 0.15 * t / 0.4)
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) + np.sign(np.sin(2 * np.pi * np.cumsum(f * 1.02) / SR))
    return filt(x, 'lowpass', 1400) * env_adsr(n, 0.005, 0.05, 0.8, 0.12) * 0.35

def downsweep(dur=0.8):
    n = int(dur * SR); t = tt(n)
    f = 900 * (60 / 900) ** (t / dur)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / dur) ** 0.5 * 0.6

def reverb_ir(sec=2.4, damp=5500):
    n = int(sec * SR); t = tt(n)
    ir = rng.standard_normal((2, n)) * np.exp(-t / (sec / 6.5))
    ir = filt(ir, 'lowpass', damp)
    ir[:, :int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))
    return ir / np.sqrt((ir ** 2).sum(axis=1, keepdims=True)) * 0.9

def verb(b, sec=2.4):
    ir = reverb_ir(sec)
    return np.vstack([fftconvolve(b[0], ir[0])[:N], fftconvolve(b[1], ir[1])[:N]])

def pingpong(b, delay=3 * BEAT / 4, fb=0.38, taps=5):
    out = np.zeros_like(b); d = int(delay * SR)
    for k in range(1, taps + 1):
        src = b[(k + 1) % 2] if k % 2 else b[k % 2]
        ch = k % 2
        if k * d < N: out[ch, k * d:] += src[:N - k * d] * fb ** k
    return filt(out, 'lowpass', 4000)

# ---------------- score ----------------
CH = {  # per 2-second bar: A minor / F / C / G
    'Am': ([57, 60, 64], 33), 'F': ([57, 60, 65], 29), 'C': ([55, 60, 64], 36), 'G': ([55, 59, 62], 31),
}
PROG = ['Am', 'F', 'C', 'G']
def chord_at(t): return CH[PROG[int(t // 2) % 4]]

drums, bass, pads, arp, sfx, bells = bus(), bus(), bus(), bus(), bus(), bus()

# kick grid + sidechain envelope
kick_times = []
t = 4.0
while t < 36.0 - 1e-6:
    in_gap = 25.5 <= t < 26.0
    half = t >= T['compact']
    if not in_gap and (not half or abs((t - T['compact']) % 1.0) < 1e-6):
        kick_times.append(t)
    t += BEAT
for k in kick_times: add(drums, k, kick(1.0 if k >= 26 else 0.9))
side = np.ones(N)
for k in kick_times:
    i = int(k * SR); n = min(int(0.3 * SR), N - i)
    side[i:i + n] = np.minimum(side[i:i + n], 1 - 0.65 * np.exp(-tt(n) / 0.07))
side = filt(side, 'lowpass', 60, 1)

# claps on 2 and 4 from 10s (and a snare roll into the drop)
for bar_t in np.arange(10, 34, 2.0):
    for off in (BEAT, 3 * BEAT):
        at = bar_t + off
        if 24 <= at < 26: continue
        add(drums, at, clap(), 0.55, 0.05)
roll = []
t = 24.0; step = 0.25
while t < 25.9:
    roll.append(t); t += step
    if t >= 25.0: step = 0.0625
    elif t >= 24.5: step = 0.125
for i, r in enumerate(roll): add(drums, r, clap(), 0.18 + 0.45 * i / len(roll), 0.1)

# hats
for t in np.arange(4, 36, BEAT / 2):
    off = abs((t / BEAT) % 1 - 0.5) < 1e-6
    if t >= T['compact']: continue
    if off: add(drums, t, hat(), 0.5, 0.3)
    elif t >= 18: add(drums, t, hat(), 0.22, -0.25)
for t in np.arange(18, 26, BEAT / 4):
    if t >= 22: add(drums, t, hat(), 0.14 + 0.1 * (t - 22) / 4, 0.4)
for t in np.arange(26, 32, BEAT): add(drums, t + BEAT / 2, hat(True), 0.3, -0.35)

# bass: offbeat 8ths from 4s, rolling 16ths in the drop, long notes in outro
for t in np.arange(4, 34, BEAT / 2):
    if 25.5 <= t < 26: continue
    _, root = chord_at(t)
    offbeat = abs((t / BEAT) % 1 - 0.5) < 1e-6
    if t >= 26 and t < 32:
        add(bass, t, bass_note(root + 12, 0.2, 900), 0.55)
        add(bass, t + BEAT / 4, bass_note(root + 12 + (7 if int(t * 4) % 3 == 0 else 0), 0.1, 900), 0.35)
    elif offbeat:
        add(bass, t, bass_note(root + 12, 0.22, 450 + 25 * max(0, t - 10)), 0.6)
for t in (T['compact'], T['compact'] + 1.0):
    add(bass, t, bass_note(33, 0.9, 300), 0.6)
add(bass, 36.0, bass_note(33, 3.8, 300), 0.55)

# pads (every bar), final sustained chord
for bt in np.arange(0, 36, 2.0):
    notes, _ = chord_at(bt)
    add(pads, bt, pad_chord(notes + [notes[0] + 12] if bt >= 26 else notes, 2.6), 0.55 if bt >= 4 else 0.4)
add(pads, 36.0, pad_chord([57, 60, 64, 69, 76], 4.0, 12), 0.7)
# pad filter automation: dark intro, opens through the build, wide open on the drop, closes on compaction
def pad_cut(s):
    if s < 4: return 500 + 250 * s
    if s < 18: return 1500 + 60 * (s - 4)
    if s < 26: return 2300 + 700 * (s - 18)
    if s < 32: return 7000
    if s < 34: return 7000 - 1500 * (s - 32)
    if s < 36: return 4000 * (0.08 ** ((s - 34) / 2))
    return 2200
pads = sweep_filter(pads, 'lowpass', pad_cut)

# arp: 16th plucks from 10s
ARP = [0, 1, 2, 3, 2, 1, 0, 2]
for i, t in enumerate(np.arange(10, 34, BEAT / 2 if False else BEAT / 4)):
    if 25.5 <= t < 26: continue
    if t < 18 and i % 2: continue  # 8ths first, 16ths from the loop scene
    notes, _ = chord_at(t)
    ladder = notes + [notes[0] + 12]
    m = ladder[ARP[i % 8]] + 12
    cut = 1800 if t < 18 else 2400 + 500 * min(8, t - 18) / 8 * 6 if t < 26 else 5000
    add(arp, t, pluck(m, 0.2, cut), 0.32 if t < 26 else 0.38, pan=0.35 * np.sin(i * 0.9))
arp_wet = pingpong(arp)

# ---------------- sound design, locked to the picture ----------------
add(sfx, 0.0, impact(0.8), 0.5)
for i, w in enumerate(T['titleWords']): add(bells, w, bell([69, 72, 76, 79, 81][i], 1.6, 1.6), 0.18, [-0.4, -0.2, 0, 0.2, 0.4][i])
add(sfx, 1.55, noise_sweep(0.6, 400, 4000, 'swell'), 0.25)
nchar = len(T['prompt'])
for k in range(nchar):
    at = T['typeStart'] + (T['typeEnd'] - T['typeStart']) * k / nchar + rng.uniform(-0.008, 0.008)
    add(sfx, at, click(rng.uniform(0.5, 0.9)), 0.5, rng.uniform(-0.15, 0.15))
add(sfx, T['enter'], thud(60) * 0.6 + np.pad(click(1.0), (0, int(0.45 * SR) - int(0.03 * SR))), 0.6)
add(sfx, 3.0, noise_sweep(1.0, 300, 6000, 'rise'), 0.3)
for i, b in enumerate(T['blocks']):
    add(sfx, b['t'] - 0.3, noise_sweep(0.35, 800, 5000, 'swell'), 0.14, -0.6 if i % 2 == 0 else 0.6)
    add(sfx, b['t'], thud([45, 48, 52, 55][i]), 0.55)
add(bells, T['messageLand'], bell(81, 1.2, 1.2), 0.2)
add(sfx, T['collapse'], downsweep(0.7), 0.25)
add(sfx, 9.6, noise_sweep(0.5, 500, 5000, 'swell'), 0.2)
# model streams text: soft data chirps, then the tool-call blips
for k in range(10): add(sfx, T['modelText'] + k * 0.06, blip(84 + (k * 5) % 12, 0.05), 0.06, 0.3)
n_json = 14
for k in range(n_json): add(sfx, T['toolCall'] + (T['toolCallEnd'] - T['toolCall']) * k / n_json, click(0.6), 0.35, 0.3)
add(bells, T['toolCallEnd'], bell(76, 1.0, 3), 0.25)
add(sfx, 13.7, noise_sweep(0.5, 600, 6000, 'swell'), 0.2)
add(sfx, 14.3, noise_sweep(0.35, 1000, 5000, 'swell'), 0.15, -0.4)
for k in range(11): add(sfx, T['fileLines'] + k * 0.075, click(0.5), 0.3, 0.5)
add(sfx, T['result']['t'], thud(52), 0.55)
add(bells, T['result']['t'], bell(81, 0.8, 2), 0.14)
# loop laps: rising pings, fail buzz, pass chime
lap_notes = [69, 72, 74, 76, 79, 81, 84]
ends = [l['t'] for l in T['laps'][1:]] + [T['finalAnswer']]
for i, l in enumerate(T['laps']):
    d = ends[i] - l['t']
    add(bells, l['t'], bell(lap_notes[i], 0.9, 2.2), 0.28, -0.2)
    add(sfx, l['t'] + d * 0.62, thud(57 + i), 0.18, 0.4)
    if l.get('status') == 'fail': add(sfx, l['t'] + d / 3, buzz(), 0.8)
    if l.get('status') == 'pass':
        for k, m in enumerate([81, 85, 88]): add(bells, l['t'] + d / 3 + k * 0.05, bell(m, 1.2, 1.0), 0.18, 0.3)
for k, m in enumerate([81, 84, 88, 93]): add(bells, T['finalAnswer'] + k * 0.07, bell(m, 1.8, 1.2), 0.2, -0.3 + 0.2 * k)
add(sfx, 22.0, noise_sweep(3.95, 300, 12000, 'rise'), 0.55)
rise_t = tt(int(3.9 * SR)); add(sfx, 22.0, np.sin(2 * np.pi * np.cumsum(200 * 4 ** (rise_t / 3.9)) / SR) * (rise_t / 3.9) ** 2 * 0.25, 0.5)
# the drop
add(sfx, T['drop'], impact(1.2), 0.9)
for i in range(9): add(bells, 26.25 + i * 0.1, blip(69 + [0, 3, 5, 7, 10, 12, 15, 17, 19][i], 0.1), 0.12, -0.5 + i / 8)
for k in range(int((T['counterEnd'] - T['counterStart']) / 0.045)): add(sfx, T['counterStart'] + k * 0.045, click(0.35), 0.18, 0.2)
add(sfx, T['reread'], thud(45), 0.5)
add(bells, T['reread'], bell(88, 1.5, 1.5), 0.15)
# compaction: filling ticks, riser, then a downsweep
for k in range(26): add(sfx, T['fillStart'] + k * (T['fillEnd'] - T['fillStart'] - 0.2) / 26, blip(72 + k, 0.05), 0.08, rng.uniform(-0.5, 0.5))
add(sfx, 32.3, noise_sweep(1.7, 400, 9000, 'rise'), 0.4)
add(sfx, T['compact'], downsweep(0.9), 0.7)
add(sfx, T['compact'], thud(40), 0.6)
add(sfx, 35.0, noise_sweep(1.0, 800, 10000, 'rise'), 0.4)
# outro
add(sfx, 36.0, impact(1.6), 0.95)
for k, m in enumerate([69, 72, 76, 81, 84, 88]): add(bells, T['final'] + k * 0.11, bell(m, 2.2, 1.0), 0.14, -0.5 + 0.2 * k)

# ---------------- mix ----------------
music = bass * side * 0.95 + pads * side * 1.1 + arp * side * 2.2 + arp_wet * 1.0 * side
mix = drums * 0.5 + music + sfx * 0.7 + bells * 0.9
wet = verb(pads * 0.35 + arp * 0.4 + bells * 0.9 + sfx * 0.25 + drums * 0.06, 2.6)
mix = mix + wet * 0.5
mix = filt(mix, 'highpass', 28)
# master: fade tail, soft clip, normalize
fade_t = np.clip((DUR - tt(N)) / 1.2, 0, 1)
mix *= fade_t
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.6) / np.tanh(1.6)
mix *= 0.89
for name, b in [('drums', drums), ('bass', bass), ('pads', pads), ('arp', arp), ('sfx', sfx), ('bells', bells)]:
    print(f'{name:6s} rms {np.sqrt((b ** 2).mean()):.3f} peak {np.abs(b).max():.2f}')
import wave
pcm = (np.clip(mix.T, -1, 1) * 32767).astype('<i2')
with wave.open('public/music_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('wrote public/music_raw.wav', mix.shape[1] / SR, 's')
