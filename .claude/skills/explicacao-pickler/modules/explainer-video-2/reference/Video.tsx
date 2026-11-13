import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import T from './timeline.json';

const {fontFamily: SANS} = loadInter('normal', {weights: ['400', '500', '600', '700', '800'], subsets: ['latin']});
const {fontFamily: MONO} = loadMono('normal', {weights: ['400', '500', '700'], subsets: ['latin']});

// ---------- palette ----------
const BG = '#09090B';
const FG = '#FAFAFA';
const MUTED = '#71717A';
const DIM = '#27272A';
const PANEL = '#111113';
const ACC = '#FF7A45';
const RED = '#F43F5E';
const GREEN = '#22C55E';
const C = {
  system: '#818CF8',
  tools: '#22D3EE',
  memory: '#C084FC',
  repo: '#34D399',
  message: ACC,
  model: '#F472B6',
  result: '#FBBF24',
  summary: '#E4E4E7',
} as const;

// ---------- time helpers ----------
const EO = Easing.bezier(0.16, 1, 0.3, 1);
const EIO = Easing.bezier(0.65, 0, 0.35, 1);
const EIN = Easing.bezier(0.55, 0, 1, 0.45);
const prog = (t: number, at: number, dur: number, ease = EO) =>
  interpolate(t, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const blurIf = (px: number) => (px > 0.05 ? `blur(${px}px)` : undefined);

// ---------- derived data (one source of truth for every number on screen) ----------
const BASE = T.blocks.reduce((a, b) => a + b.tokens, 0) + T.promptTokens;
const lapEnds = T.laps.map((l, i) => (i + 1 < T.laps.length ? T.laps[i + 1].t : T.finalAnswer));
type Turn = {input: number; cached: number};
const TURNS: Turn[] = (() => {
  const out: Turn[] = [];
  let ctx = BASE;
  out.push({input: ctx, cached: 0});
  ctx += T.lapOutputTokens + T.result.tokens;
  for (const l of T.laps) {
    out.push({input: ctx, cached: out[out.length - 1].input});
    ctx += T.lapOutputTokens + l.tokens;
  }
  out.push({input: ctx, cached: out[out.length - 1].input});
  return out;
})();
const TOTAL_READ = TURNS.reduce((a, b) => a + b.input, 0);
const TOTAL_CACHED = TURNS.reduce((a, b) => a + b.cached, 0);
const REREAD_PCT = Math.round((TOTAL_CACHED / TOTAL_READ) * 100);
const FINAL_CTX = TURNS[TURNS.length - 1].input + 120;

type Seg = {color: string; tokens: number; t: number; removable?: boolean};
const SEGS: Seg[] = (() => {
  const s: Seg[] = T.blocks.map((b) => ({color: C[b.id as keyof typeof C], tokens: b.tokens, t: b.t}));
  s.push({color: C.message, tokens: T.promptTokens + 180, t: T.messageLand, removable: true});
  s.push({color: C.model, tokens: T.lapOutputTokens, t: T.toolCallEnd, removable: true});
  s.push({color: C.result, tokens: T.result.tokens, t: T.result.t, removable: true});
  T.laps.forEach((l, i) => {
    const d = lapEnds[i] - l.t;
    s.push({color: C.model, tokens: T.lapOutputTokens, t: l.t + d * 0.15, removable: true});
    s.push({color: C.result, tokens: l.tokens, t: l.t + d * 0.62, removable: true});
  });
  s.push({color: C.model, tokens: 120, t: T.finalAnswer, removable: true});
  const n = 26;
  const target = 187400;
  const step = (T.fillEnd - T.fillStart - 0.2) / n;
  for (let i = 0; i < n; i++)
    s.push({color: i % 3 === 0 ? C.model : C.result, tokens: (target - FINAL_CTX) / n, t: T.fillStart + i * step, removable: true});
  s.push({color: C.summary, tokens: T.summaryTokens, t: T.compact + 0.35});
  return s;
})();
const segVal = (s: Seg, t: number) =>
  s.tokens * prog(t, s.t, 0.4) * (s.removable ? 1 - prog(t, T.compact, 0.75, EIO) : 1);

// ---------- small building blocks ----------
const Words: React.FC<{text: string; t: number; at: number; stagger?: number; accent?: number[]; style?: React.CSSProperties; times?: number[]}> = ({
  text, t, at, stagger = 0.07, accent = [], style, times,
}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.26em', ...style}}>
    {text.split(' ').map((w, i) => {
      const p = prog(t, times ? times[i] : at + i * stagger, 0.7);
      return (
        <span key={i} style={{display: 'inline-block', overflow: 'hidden', padding: '0.04em 0 0.14em'}}>
          <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 110}%) rotate(${(1 - p) * 4}deg)`, color: accent.includes(i) ? ACC : undefined}}>{w}</span>
        </span>
      );
    })}
  </div>
);

const Fade: React.FC<{t: number; at: number; until?: number; y?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({t, at, until, y = 24, style, children}) => {
  const p = prog(t, at, 0.5);
  const o = until ? prog(t, until - 0.3, 0.3, EIN) : 0;
  return <div style={{opacity: p * (1 - o), transform: `translateY(${(1 - p) * y - o * 12}px)`, filter: blurIf((1 - p) * 10 + o * 8), ...style}}>{children}</div>;
};

const Caption: React.FC<{t: number; at: number; until?: number; children: React.ReactNode}> = ({t, at, until, children}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: 838, display: 'flex', justifyContent: 'center'}}>
    <Fade t={t} at={at} until={until} style={{maxWidth: 1480, textAlign: 'center', fontSize: 40, fontWeight: 600, color: '#D4D4D8', letterSpacing: -0.6, lineHeight: 1.25}}>
      {children}
    </Fade>
  </div>
);
const A: React.FC<{children: React.ReactNode; c?: string}> = ({children, c = ACC}) => <span style={{color: c}}>{children}</span>;

const Title: React.FC<{t: number; at: number; until?: number; children: string; accent?: number[]; top?: number}> = ({t, at, until, children, accent, top = 118}) => {
  const o = until ? prog(t, until - 0.3, 0.3, EIN) : 0;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, opacity: 1 - o, filter: blurIf(o * 8)}}>
      <Words text={children} t={t} at={at} accent={accent} style={{fontSize: 68, fontWeight: 750, letterSpacing: -2.2, color: FG}} />
    </div>
  );
};

// type-on text with a caret
const typed = (text: string, t: number, a: number, b: number) => text.slice(0, Math.floor(text.length * interpolate(t, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));

// tiny syntax highlighter for the code panels
const KW = /^(import|from|const|await|async|describe|it|expect|return|new|true|false)$/;
const hl = (line: string) =>
  line.split(/("[^"]*"|\b\d[\d_]*\b|\w+|\s+|[^\w\s])/).filter(Boolean).map((tok, i) => {
    let color = '#D4D4D8';
    if (tok.startsWith('"')) color = '#86EFAC';
    else if (/^\d/.test(tok)) color = '#FBBF24';
    else if (KW.test(tok)) color = '#C084FC';
    else if (/^(login|createSession|advanceTimersByTime|isValid|toBe)$/.test(tok)) color = '#7DD3FC';
    return <span key={i} style={{color}}>{tok}</span>;
  });

// ---------- background ----------
const Background: React.FC<{t: number}> = ({t}) => {
  const beat = t >= 4 && t < 36 ? Math.exp(-((t - 4) % 0.5) * 9) : 0;
  const drop = t >= 26 && t < 32 ? 1.4 : 1;
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: -80, backgroundImage: 'radial-gradient(rgba(255,255,255,0.075) 1.2px, transparent 1.2px)', backgroundSize: '44px 44px', backgroundPosition: `${-t * 7}px ${-t * 4}px`, WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 100%)'}} />
      <div style={{position: 'absolute', left: 960 - 900 + Math.sin(t / 3) * 200, top: 540 - 900 + Math.cos(t / 4) * 120, width: 1800, height: 1800, borderRadius: '50%', background: `radial-gradient(circle, ${ACC} 0%, transparent 55%)`, opacity: (0.09 + beat * 0.05) * drop}} />
      <div style={{position: 'absolute', left: 960 - 700 - Math.sin(t / 2.5) * 500, top: 540 - 700 + Math.sin(t / 3.3) * 200, width: 1400, height: 1400, borderRadius: '50%', background: 'radial-gradient(circle, #6366F1 0%, transparent 55%)', opacity: 0.08 + beat * 0.03}} />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)'}} />
    </AbsoluteFill>
  );
};

// ---------- HUD: chapter, countdown, progress ----------
const Hud: React.FC<{t: number}> = ({t}) => {
  const idx = Math.max(0, T.scenes.findIndex((s) => t >= s.start && t < s.end));
  const sc = T.scenes[idx];
  const p = prog(t, sc.start + 0.1, 0.45);
  const vis = prog(t, 1.9, 0.5) * (1 - prog(t, 39.3, 0.5));
  const secs = Math.max(0, Math.ceil(40 - t - 0.001));
  return (
    <AbsoluteFill style={{opacity: vis}}>
      <div style={{position: 'absolute', top: 0, left: 0, height: 3, width: (t / 40) * 1920, background: `linear-gradient(90deg, ${ACC}00, ${ACC})`}} />
      <div style={{position: 'absolute', left: 80, top: 52, fontFamily: MONO, fontSize: 20, letterSpacing: 3, color: MUTED, opacity: p, transform: `translateX(${(1 - p) * -16}px)`}}>
        <span style={{color: ACC}}>{String(idx + 1).padStart(2, '0')}</span> / {sc.label}
      </div>
      <div style={{position: 'absolute', right: 80, top: 48, fontFamily: MONO, fontSize: 26, color: secs <= 5 ? ACC : '#A1A1AA', fontWeight: 500}}>
        0:{String(secs).padStart(2, '0')}
      </div>
    </AbsoluteFill>
  );
};

// ---------- the context window meter (the thread that runs through the whole video) ----------
const ContextBar: React.FC<{t: number}> = ({t}) => {
  const vis = prog(t, 4.4, 0.5) * (1 - prog(t, 35.55, 0.4, EIN));
  if (vis <= 0) return null;
  const c = prog(t, 32.0, 0.8, EIO) * (1 - prog(t, 34.95, 0.6, EIO));
  const top = lerp(972, 548, c);
  const h = lerp(14, 64, c);
  const W = 1600;
  const vals = SEGS.map((s) => segVal(s, t));
  const total = vals.reduce((a, b) => a + b, 0);
  const danger = prog(total, 140000, 40000, Easing.linear);
  const turn = t < T.fillStart ? 0 : Math.round(lerp(9, 64, prog(t, T.fillStart, T.fillEnd - T.fillStart, Easing.linear)));
  const sumX = (BASE - T.promptTokens) / 200000 * W;
  return (
    <div style={{position: 'absolute', left: 160, top, width: W, opacity: vis}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: MONO, fontSize: lerp(17, 26, c), letterSpacing: 2, color: MUTED, marginBottom: lerp(10, 18, c)}}>
        <span>CONTEXT WINDOW{turn > 0 && t < T.compact + 1.2 ? <span style={{color: '#A1A1AA'}}>{'  ·  turn ' + turn}</span> : null}</span>
        <span>
          <span style={{color: danger > 0 ? `color-mix(in srgb, ${RED} ${danger * 100}%, ${FG})` : FG, fontWeight: 700, fontSize: lerp(20, 40, c)}}>{fmt(total)}</span> / 200,000
        </span>
      </div>
      <div style={{position: 'relative', height: h, width: W, background: '#18181B', borderRadius: 8, overflow: 'hidden', display: 'flex', boxShadow: `0 0 ${20 + danger * 60}px ${danger > 0 ? RED : ACC}${danger > 0 ? '55' : '22'}`, border: `1px solid ${DIM}`}}>
        {SEGS.map((s, i) =>
          vals[i] < 1 ? null : (
            <div key={i} style={{width: (vals[i] / 200000) * W, height: '100%', background: s.color, flexShrink: 0, boxShadow: 'inset -2px 0 0 rgba(9,9,11,0.9)', opacity: 0.95}} />
          ),
        )}
        <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: W * 0.1, background: `repeating-linear-gradient(135deg, ${RED}22 0 8px, transparent 8px 16px)`, opacity: c}} />
      </div>
      <div style={{position: 'absolute', left: sumX, top: lerp(10, 18, c) + lerp(20, 40, c) + h + 18, fontFamily: MONO, fontSize: 24, color: C.summary, opacity: prog(t, T.compact + 0.7, 0.4) * c, whiteSpace: 'nowrap'}}>
        ↑ summary of 60 turns · {fmt(T.summaryTokens)} tokens
      </div>
    </div>
  );
};

// ---------- scene wrapper: entrance + exit, scene-local slow push-in ----------
const Scene: React.FC<{t: number; s: number; e: number; children: React.ReactNode; noIn?: boolean}> = ({t, s, e, children, noIn}) => {
  if (t < s - 0.02 || t > e + 0.02) return null;
  const i = noIn ? 1 : prog(t, s, 0.4);
  const o = prog(t, e - 0.28, 0.28, EIN);
  const push = interpolate(t, [s, e], [0, 0.025]);
  return (
    <AbsoluteFill style={{opacity: i * (1 - o), transform: `scale(${0.965 + 0.035 * i + push + o * 0.05})`, filter: blurIf((1 - i) * 10 + o * 14)}}>
      {children}
    </AbsoluteFill>
  );
};

// ================= 01 PROMPT =================
const S1: React.FC<{t: number}> = ({t}) => {
  const up = prog(t, 1.85, 0.6, EIO);
  const box = prog(t, 2.0, 0.5);
  const enter = prog(t, T.enter, 0.12, Easing.linear) * (1 - prog(t, T.enter + 0.12, 0.3));
  const shrink = prog(t, 3.62, 0.38, EIO);
  const txt = typed(T.prompt, t, T.typeStart, T.typeEnd);
  const caretOn = Math.floor(t * 3) % 2 === 0 || (t > T.typeStart && t < T.typeEnd);
  const w = lerp(1040, 820, shrink);
  const h = lerp(116, 40, shrink);
  return (
    <Scene t={t} s={0} e={4.02} noIn>
      <div style={{position: 'absolute', left: 0, right: 0, top: lerp(380, 150, up), transform: `scale(${lerp(1, 0.58, up)})`, opacity: 1 - prog(t, 3.6, 0.35)}}>
        <Words text="How a coding agent works" t={t} at={0} times={T.titleWords} accent={[2]} style={{fontSize: 136, fontWeight: 800, letterSpacing: -5, color: FG, lineHeight: 1}} />
        <div style={{textAlign: 'center', marginTop: 26, fontFamily: MONO, fontSize: 40, color: '#A1A1AA', opacity: prog(t, 1.0, 0.5) * (1 - up), letterSpacing: 2}}>
          in <span style={{color: ACC}}>40</span> seconds
        </div>
      </div>
      <div style={{position: 'absolute', left: 960 - w / 2, top: lerp(505, 715, shrink), width: w, height: h, opacity: box, transform: `scale(${lerp(0.9, 1, box)})`, borderRadius: lerp(20, 10, shrink), background: shrink > 0.01 ? `color-mix(in srgb, ${ACC} ${shrink * 16}%, ${PANEL})` : PANEL, border: `1.5px solid ${enter > 0 ? ACC : shrink > 0.5 ? ACC : '#3F3F46'}`, boxShadow: `0 0 ${40 + enter * 80}px ${ACC}${enter > 0 ? '88' : '22'}`, display: 'flex', alignItems: 'center', padding: `0 ${lerp(40, 22, shrink)}px`, fontFamily: MONO, fontSize: lerp(42, 22, shrink), color: FG, overflow: 'hidden', whiteSpace: 'nowrap'}}>
        <span style={{color: ACC, marginRight: 18}}>›</span>
        {txt}
        {shrink < 0.1 && <span style={{display: 'inline-block', width: 22, height: 46, background: caretOn ? ACC : 'transparent', marginLeft: 4}} />}
        <span style={{marginLeft: 'auto', fontSize: 20, color: '#FFD2BF', opacity: shrink}}>your message · {T.promptTokens} tokens</span>
      </div>
    </Scene>
  );
};

// ================= 02 CONTEXT =================
const blockH = (tokens: number) => Math.max(46, tokens * 0.021);
const TOOL_NAMES = ['Read', 'Edit', 'Write', 'Bash', 'Grep', 'Glob', 'WebFetch', 'WebSearch', 'Task', 'TodoWrite', 'NotebookEdit', 'MultiEdit'];
const S2: React.FC<{t: number}> = ({t}) => {
  const col = 820;
  let y = 250;
  const coll = prog(t, T.collapse, 0.7, EIO);
  const tot = T.blocks.reduce((a, b) => a + b.tokens * prog(t, b.t, 0.5), 0) + T.promptTokens;
  return (
    <Scene t={t} s={4} e={10}>
      <Title t={t} at={4.25} accent={[3, 4]}>Your message is the smallest part.</Title>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translateY(${coll * 180}px) scaleY(${1 - coll * 0.85})`, transformOrigin: '960px 760px', opacity: 1 - coll}}>
        {T.blocks.map((b, i) => {
          const h = blockH(b.tokens);
          const top = y;
          y += h + 10;
          const p = prog(t, b.t - 0.35, 0.55);
          const land = Math.exp(-Math.max(0, t - (b.t + 0.2)) * 7) * (t > b.t + 0.2 ? 1 : 0);
          const from = i % 2 === 0 ? -1 : 1;
          const color = C[b.id as keyof typeof C];
          return (
            <div key={b.id} style={{position: 'absolute', left: 960 - col / 2, top, width: col, height: h, opacity: p, transform: `translateX(${(1 - p) * from * 700}px) rotate(${(1 - p) * from * 6}deg) scale(${1 + land * 0.03})`, borderRadius: 12, background: `color-mix(in srgb, ${color} ${14 + land * 20}%, ${PANEL})`, borderLeft: `5px solid ${color}`, boxShadow: `0 0 ${30 * land}px ${color}66`, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 24, top: Math.min(12, (h - 32) / 2), fontSize: 26, fontWeight: 650, color: FG}}>{b.label}</div>
              <div style={{position: 'absolute', right: 24, top: Math.min(12, (h - 32) / 2), fontFamily: MONO, fontSize: 24, color}}>{fmt(b.tokens)}</div>
              {b.id === 'tools' && (
                <div style={{position: 'absolute', left: 24, right: 24, top: 60, display: 'flex', flexWrap: 'wrap', gap: 10}}>
                  {TOOL_NAMES.map((n, k) => (
                    <span key={n} style={{fontFamily: MONO, fontSize: 20, padding: '6px 12px', borderRadius: 8, border: `1px solid ${color}55`, color: '#A5F3FC', opacity: prog(t, b.t + 0.1 + k * 0.05, 0.3)}}>{n}</span>
                  ))}
                  <span style={{fontFamily: MONO, fontSize: 18, color: MUTED, width: '100%', marginTop: 6, opacity: prog(t, b.t + 0.8, 0.4)}}>{'{ "name": "Read", "input_schema": { "file_path": "string", "offset": "number" } }'}</span>
                </div>
              )}
              {b.id === 'system' && h > 60 && <div style={{position: 'absolute', left: 24, top: 46, fontFamily: MONO, fontSize: 16, color: MUTED}}>You are a coding agent. Use the tools to…</div>}
            </div>
          );
        })}
        {(() => {
          const land = prog(t, T.messageLand - 0.2, 0.5);
          return (
            <div style={{position: 'absolute', left: 960 - col / 2, top: y, width: col, height: 40, borderRadius: 10, background: `color-mix(in srgb, ${ACC} 16%, ${PANEL})`, border: `1.5px solid ${ACC}`, display: 'flex', alignItems: 'center', padding: '0 22px', fontFamily: MONO, fontSize: 22, color: FG, boxShadow: `0 0 ${24 + 40 * land * (1 - prog(t, T.messageLand + 0.3, 0.6))}px ${ACC}55`}}>
              <span style={{color: ACC, marginRight: 18}}>›</span>
              {T.prompt}
              <span style={{marginLeft: 'auto', fontSize: 20, color: '#FFD2BF'}}>your message · {T.promptTokens} tokens</span>
            </div>
          );
        })()}
      </div>
      <Caption t={t} at={7.9}>
        The harness wraps it in <A>{fmt(BASE)}</A> tokens of instructions, tools and project files.
      </Caption>
      <div style={{position: 'absolute', right: 160, top: 250, fontFamily: MONO, fontSize: 22, color: MUTED, textAlign: 'right', opacity: prog(t, 5.0, 0.4) * (1 - coll)}}>
        packed so far
        <div style={{fontSize: 54, color: FG, fontWeight: 700, marginTop: 6}}>{fmt(tot)}</div>
      </div>
    </Scene>
  );
};

// ================= 03 MODEL =================
const JSON_LINES = [
  [{s: '{', c: '#A1A1AA'}],
  [{s: '  "tool": ', c: '#7DD3FC'}, {s: '"Read"', c: '#86EFAC'}, {s: ',', c: '#A1A1AA'}],
  [{s: '  "path": ', c: '#7DD3FC'}, {s: '"tests/login.test.ts"', c: '#86EFAC'}],
  [{s: '}', c: '#A1A1AA'}],
];
const JSON_LEN = JSON_LINES.flat().reduce((a, b) => a + b.s.length, 0);
const JsonBlock: React.FC<{n: number; size?: number}> = ({n, size = 32}) => {
  let left = n;
  return (
    <div style={{fontFamily: MONO, fontSize: size, lineHeight: 1.5}}>
      {JSON_LINES.map((line, i) => (
        <div key={i} style={{minHeight: size * 1.5, whiteSpace: 'pre'}}>
          {line.map((tok, k) => {
            const show = tok.s.slice(0, Math.max(0, left));
            left -= tok.s.length;
            return <span key={k} style={{color: tok.c}}>{show}</span>;
          })}
        </div>
      ))}
    </div>
  );
};

const ModelBox: React.FC<{t: number; x: number; y: number; size?: number; glow?: number}> = ({t, x, y, size = 250, glow = 0}) => (
  <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: 44, padding: 3, background: `conic-gradient(from ${t * 140}deg, ${ACC}, #6366F1 35%, transparent 55%, #22D3EE 75%, ${ACC})`, boxShadow: `0 0 ${60 + glow * 60}px ${ACC}${glow > 0.3 ? '77' : '33'}`}}>
    <div style={{width: '100%', height: '100%', borderRadius: 41, background: '#0E0E11', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: MONO, fontSize: 36, fontWeight: 700, letterSpacing: 6, color: FG}}>MODEL</div>
      <div style={{fontFamily: MONO, fontSize: 17, color: MUTED, marginTop: 12}}>next-token predictor</div>
    </div>
  </div>
);

const S3: React.FC<{t: number}> = ({t}) => {
  const stackH = 380;
  const mt = typed("I'll look at the test first.", t, T.modelText, T.modelText + 0.6);
  const n = Math.floor(JSON_LEN * prog(t, T.toolCall, T.toolCallEnd - T.toolCall, Easing.linear));
  const jsonIn = prog(t, T.toolCall - 0.15, 0.4);
  const flash = t > T.toolCallEnd ? Math.exp(-(t - T.toolCallEnd) * 5) : 0;
  let yy = 0;
  return (
    <Scene t={t} s={10} e={14}>
      <Title t={t} at={10.15} accent={[4, 5]}>The model can't touch your files.</Title>
      <Fade t={t} at={10.3} style={{position: 'absolute', left: 230, top: 330, width: 150}}>
        <div style={{fontFamily: MONO, fontSize: 18, color: MUTED, letterSpacing: 2, marginBottom: 12, textAlign: 'center'}}>CONTEXT</div>
        <div style={{height: stackH, borderRadius: 12, overflow: 'hidden', border: `1px solid ${DIM}`, display: 'flex', flexDirection: 'column'}}>
          {[...T.blocks.map((b) => ({c: C[b.id as keyof typeof C], v: b.tokens})), {c: ACC, v: 900}].map((s, i) => {
            const hh = (s.v / (BASE + 900)) * stackH;
            yy += hh;
            return <div key={i} style={{height: hh, background: s.c, opacity: 0.9, boxShadow: 'inset 0 -2px 0 #09090B'}} />;
          })}
        </div>
        <div style={{fontFamily: MONO, fontSize: 20, color: FG, marginTop: 12, textAlign: 'center'}}>{fmt(BASE)}</div>
      </Fade>
      {Array.from({length: 9}).map((_, i) => {
        const ph = ((t * 1.3 + i / 9) % 1);
        const on = prog(t, 10.4, 0.3);
        return <div key={i} style={{position: 'absolute', left: lerp(400, 640, ph), top: 520 + Math.sin(ph * Math.PI * 2 + i) * 30 * (1 - ph), width: 10, height: 10, borderRadius: 5, background: [C.tools, C.system, ACC][i % 3], opacity: on * Math.sin(ph * Math.PI), boxShadow: '0 0 12px currentColor'}} />;
      })}
      <div style={{opacity: prog(t, 10.2, 0.5), transform: `scale(${lerp(0.85, 1, prog(t, 10.2, 0.6))})`, transformOrigin: '800px 525px'}}>
        <ModelBox t={t} x={800} y={525} glow={flash + (t > T.modelText && t < T.toolCallEnd ? 0.5 : 0)} />
      </div>
      <div style={{position: 'absolute', left: 1020, top: 340, width: 760}}>
        <Fade t={t} at={T.modelText - 0.1} style={{fontFamily: MONO, fontSize: 20, color: MUTED, letterSpacing: 2, marginBottom: 16}}>OUTPUT</Fade>
        <div style={{fontSize: 38, fontWeight: 500, color: FG, minHeight: 60, opacity: prog(t, T.modelText, 0.2)}}>{mt}</div>
        <div style={{marginTop: 26, padding: '24px 30px', borderRadius: 16, background: PANEL, border: `1.5px solid ${flash > 0.05 || t > T.toolCallEnd ? ACC : '#3F3F46'}`, opacity: jsonIn, transform: `translateY(${(1 - jsonIn) * 20}px)`, boxShadow: `0 0 ${50 * flash + 20}px ${ACC}${flash > 0.1 ? '66' : '18'}`, position: 'relative'}}>
          <div style={{position: 'absolute', top: -14, left: 24, background: ACC, color: '#1A0A03', fontFamily: MONO, fontSize: 17, fontWeight: 700, padding: '3px 10px', borderRadius: 6, letterSpacing: 1}}>TOOL CALL</div>
          <JsonBlock n={n} />
        </div>
      </div>
      <Caption t={t} at={12.3}>
        It only writes text. <A>Some of that text is a tool call.</A>
      </Caption>
    </Scene>
  );
};

// ================= 04 HARNESS =================
const CODE = [
  'import { login } from "../src/auth/login";',
  'import { createSession } from "../src/auth/session";',
  '',
  'describe("login", () => {',
  '  it("keeps the session alive for 1 hour", async () => {',
  '    const user = await login("ada@example.com", "hunter2");',
  '    const session = createSession(user);',
  '    jest.advanceTimersByTime(30 * 60 * 1000);',
  '    expect(session.isValid()).toBe(true);',
  '  });',
  '});',
];
const S4: React.FC<{t: number}> = ({t}) => {
  const fly = prog(t, 14.15, 0.6, EIO);
  const term = prog(t, 14.2, 0.5);
  const cmd = typed('$ read tests/login.test.ts', t, T.harnessRun, T.harnessRun + 0.35);
  const chipIn = prog(t, 15.95, 0.3);
  const chipFly = prog(t, 16.15, 0.45, EIN);
  return (
    <Scene t={t} s={14} e={18}>
      <Title t={t} at={14.15} accent={[1]}>The harness runs it.</Title>
      <div style={{position: 'absolute', left: lerp(1020, 150, fly), top: lerp(430, 380, fly), padding: '22px 28px', borderRadius: 16, background: PANEL, border: `1.5px solid ${ACC}`, transform: `scale(${lerp(1, 0.8, fly)})`, transformOrigin: 'left top', boxShadow: `0 0 30px ${ACC}22`, opacity: 1 - prog(t, 15.2, 0.5) * 0.55}}>
        <div style={{position: 'absolute', top: -14, left: 24, background: ACC, color: '#1A0A03', fontFamily: MONO, fontSize: 17, fontWeight: 700, padding: '3px 10px', borderRadius: 6, letterSpacing: 1}}>TOOL CALL</div>
        <JsonBlock n={JSON_LEN} size={30} />
      </div>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
        <defs>
          <linearGradient id="ar" x1="0" x2="1"><stop offset="0" stopColor={ACC} stopOpacity="0" /><stop offset="1" stopColor={ACC} /></linearGradient>
        </defs>
        <path d="M 640 470 C 700 470, 700 470, 790 470" stroke="url(#ar)" strokeWidth={4} fill="none" strokeDasharray="160" strokeDashoffset={160 * (1 - prog(t, 14.45, 0.4))} />
      </svg>
      <div style={{position: 'absolute', left: 810, top: 250, width: 960, height: 540, borderRadius: 18, background: '#0C0C0E', border: `1.5px solid ${DIM}`, opacity: term, transform: `translateY(${(1 - term) * 30}px)`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)', overflow: 'hidden'}}>
        <div style={{height: 52, borderBottom: `1px solid ${DIM}`, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10, fontFamily: MONO, fontSize: 19, color: MUTED, letterSpacing: 2}}>
          <span style={{width: 12, height: 12, borderRadius: 6, background: '#3F3F46'}} />
          <span style={{width: 12, height: 12, borderRadius: 6, background: '#3F3F46'}} />
          <span style={{width: 12, height: 12, borderRadius: 6, background: '#3F3F46'}} />
          <span style={{marginLeft: 14}}>HARNESS</span>
          <span style={{marginLeft: 'auto', color: t > 15.9 ? GREEN : '#FBBF24'}}>{t < T.harnessRun ? 'idle' : t > 15.9 ? '● done' : '● running'}</span>
        </div>
        <div style={{padding: '22px 26px', fontFamily: MONO, fontSize: 22, lineHeight: 1.62}}>
          <div style={{color: FG, marginBottom: 8}}>{cmd}</div>
          {CODE.map((line, i) => {
            const p = prog(t, T.fileLines + i * 0.075, 0.25);
            return (
              <div key={i} style={{display: 'flex', opacity: p, transform: `translateX(${(1 - p) * 20}px)`, whiteSpace: 'pre'}}>
                <span style={{width: 44, color: '#52525B'}}>{i + 1}</span>
                <span>{hl(line)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{position: 'absolute', left: 1290 - 190, top: lerp(lerp(800, 730, chipIn), 1000, chipFly), width: 380, height: 50, borderRadius: 25, background: `color-mix(in srgb, ${C.result} 22%, ${PANEL})`, border: `1.5px solid ${C.result}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 21, color: '#FDE68A', opacity: chipIn * (1 - prog(t, 16.45, 0.2)), transform: `scale(${lerp(1, 0.5, chipFly)})`, boxShadow: `0 0 40px ${C.result}55`}}>
        tool result · +{fmt(T.result.tokens)} tokens
      </div>
      <Caption t={t} at={16.0}>
        …and pastes the result <A c={C.result}>back into the context.</A>
      </Caption>
    </Scene>
  );
};

// ================= 05 LOOP =================
const CX = 610;
const CY = 545;
const R = 222;
const NODES = [
  {label: 'MODEL', a: -90, c: ACC},
  {label: 'HARNESS', a: 30, c: C.tools},
  {label: 'CONTEXT', a: 150, c: C.result},
];
const pos = (a: number, r = R) => [CX + Math.cos((a * Math.PI) / 180) * r, CY + Math.sin((a * Math.PI) / 180) * r];
const lapState = (t: number) => {
  for (let i = T.laps.length - 1; i >= 0; i--) {
    if (t >= T.laps[i].t) {
      const d = lapEnds[i] - T.laps[i].t;
      return {i, p: Math.min(1, (t - T.laps[i].t) / d), d};
    }
  }
  return {i: -1, p: 0, d: 1};
};
const S5: React.FC<{t: number}> = ({t}) => {
  const ls = lapState(t);
  const done = t >= T.finalAnswer;
  const ang = -90 + 360 * (done ? 1 : ls.p);
  const turn = done ? TURNS.length : ls.i + 2;
  const inn = prog(t, 18.0, 0.5);
  const lines: {k: string; at: number; node: React.ReactNode}[] = [];
  T.laps.forEach((l, i) => {
    const d = lapEnds[i] - l.t;
    lines.push({k: 'l' + i, at: l.t, node: (
      <>
        <span style={{fontFamily: MONO, fontSize: 21, fontWeight: 700, padding: '3px 10px', borderRadius: 6, background: `${C.tools}22`, color: C.tools, width: 76, textAlign: 'center', display: 'inline-block'}}>{l.tool}</span>
        <span style={{marginLeft: 16, color: '#D4D4D8'}}>{l.arg}</span>
        <span style={{marginLeft: 'auto', color: C.result, opacity: prog(t, l.t + d * 0.62, 0.2)}}>+{fmt(l.tokens)}</span>
      </>
    )});
    if (l.status)
      lines.push({k: 's' + i, at: l.t + d / 3, node: <span style={{marginLeft: 92, color: l.status === 'fail' ? RED : GREEN, fontWeight: 700}}>{l.status === 'fail' ? '✗' : '✓'} {l.note}</span>});
  });
  lines.push({k: 'final', at: T.finalAnswer, node: <span style={{color: FG, fontFamily: SANS, fontSize: 27, fontWeight: 600}}><A c={GREEN}>✓ Done.</A> Session expiry compared seconds to milliseconds.</span>});
  const failFlash = (() => { const f = T.laps.find((l) => l.status === 'fail')!; const i = T.laps.indexOf(f); const at = f.t + (lapEnds[i] - f.t) / 3; return t > at ? Math.exp(-(t - at) * 4) : 0; })();
  const doneGlow = done ? Math.exp(-(t - T.finalAnswer) * 1.5) : 0;
  return (
    <Scene t={t} s={18} e={26}>
      <Title t={t} at={18.1} until={T.finalAnswer} accent={[2]}>Then it loops.</Title>
      <Title t={t} at={T.finalAnswer + 0.05} accent={[5, 6, 7]}>It stops when there's no tool call.</Title>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#3F3F46" strokeWidth={2} strokeDasharray="6 10" opacity={inn * (done ? 0.4 : 1)} />
        {[0, 1, 2].map((k) => {
          const a0 = NODES[k].a + 18;
          const [x, y] = pos(a0 + 4);
          const rot = a0 + 4 + 90;
          return <path key={k} d="M -9 -8 L 5 0 L -9 8" transform={`translate(${x} ${y}) rotate(${rot})`} fill="none" stroke="#71717A" strokeWidth={3} opacity={inn} />;
        })}
        {!done && t >= 18 &&
          Array.from({length: 18}).map((_, k) => {
            const [x, y] = pos(ang - k * 3.2);
            return <circle key={k} cx={x} cy={y} r={12 - k * 0.55} fill={failFlash > 0.2 ? RED : ACC} opacity={(1 - k / 18) * 0.85} />;
          })}
      </svg>
      {!done && t >= 18 && (() => { const [x, y] = pos(ang); return <div style={{position: 'absolute', left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: 30, background: `radial-gradient(circle, ${failFlash > 0.2 ? RED : ACC}cc, transparent 70%)`}} />; })()}
      {NODES.map((nd, k) => {
        const [x, y] = pos(nd.a);
        let dA = Math.abs(((ang - nd.a + 540) % 360) - 180);
        if (done) dA = k === 0 ? 0 : 180;
        const hot = Math.max(0, 1 - dA / 26) * inn;
        const glow = k === 0 && done ? doneGlow : 0;
        return (
          <div key={nd.label} style={{position: 'absolute', left: x - 82, top: y - 82, width: 164, height: 164, borderRadius: 82, background: `color-mix(in srgb, ${glow > 0 ? GREEN : nd.c} ${10 + hot * 25 + glow * 30}%, #0E0E11)`, border: `2px solid ${glow > 0.05 ? GREEN : nd.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 21, fontWeight: 700, letterSpacing: 2, color: FG, transform: `scale(${(0.85 + 0.15 * inn) * (1 + hot * 0.1)})`, boxShadow: `0 0 ${20 + hot * 50 + glow * 70}px ${glow > 0.05 ? GREEN : nd.c}${hot > 0.3 || glow > 0.1 ? '88' : '33'}`, opacity: inn}}>
            {nd.label}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: CX - 150, top: CY - 64, width: 300, textAlign: 'center', opacity: inn}}>
        <div style={{fontFamily: MONO, fontSize: 20, color: MUTED, letterSpacing: 4}}>TURN</div>
        <div style={{fontFamily: MONO, fontSize: 92, fontWeight: 700, color: FG, lineHeight: 1.05}}>{turn}</div>
      </div>
      <div style={{position: 'absolute', left: 1080, top: 262, width: 720, display: 'flex', flexDirection: 'column', gap: 10}}>
        {lines.map((ln) => {
          const p = prog(t, ln.at, 0.35);
          if (p <= 0) return null;
          return (
            <div key={ln.k} style={{display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 24, height: ln.k === 'final' ? 'auto' : 38, marginTop: ln.k === 'final' ? 14 : 0, opacity: p, transform: `translateX(${(1 - p) * 40}px)`, filter: blurIf((1 - p) * 6)}}>
              {ln.node}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: CX + 100, top: CY - R - 14, width: 300, textAlign: 'left', fontFamily: MONO, fontSize: 20, color: GREEN, opacity: prog(t, T.finalAnswer + 0.15, 0.4)}}>no tool call → answer</div>
      <Caption t={t} at={18.5} until={T.finalAnswer}>
        Think, <A c={C.tools}>call a tool</A>, <A c={C.result}>read the result</A>. Repeat.
      </Caption>
      <Caption t={t} at={T.finalAnswer + 0.2}>
        That loop <A>is</A> the agent.
      </Caption>
    </Scene>
  );
};

// ================= 06 COST =================
const S6: React.FC<{t: number}> = ({t}) => {
  const max = Math.max(...TURNS.map((x) => x.input));
  const cnt = TOTAL_READ * prog(t, T.counterStart, T.counterEnd - T.counterStart, Easing.bezier(0.3, 0, 0.2, 1));
  const hi = prog(t, T.reread, 0.5);
  const flash = t >= T.drop ? Math.exp(-(t - T.drop) * 6) : 0;
  return (
    <Scene t={t} s={26} e={32}>
      <AbsoluteFill style={{background: '#fff', opacity: flash * 0.35}} />
      <div style={{position: 'absolute', left: 160, top: 210}}>
        <Fade t={t} at={26.1} style={{fontSize: 34, color: '#A1A1AA', fontWeight: 500}}>You typed</Fade>
        <Fade t={t} at={26.2} style={{fontSize: 104, fontWeight: 800, letterSpacing: -4, color: FG, lineHeight: 1.05}}>{T.promptTokens} tokens.</Fade>
        <Fade t={t} at={26.8} style={{fontSize: 34, color: '#A1A1AA', fontWeight: 500, marginTop: 34}}>The model read</Fade>
        <Fade t={t} at={26.9} style={{fontSize: 104, fontWeight: 800, letterSpacing: -4, color: ACC, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums'}}>{fmt(cnt)}.</Fade>
        <Fade t={t} at={T.reread} style={{fontSize: 38, fontWeight: 600, color: FG, marginTop: 40, maxWidth: 700, lineHeight: 1.3}}>
          <A>{REREAD_PCT}%</A> of that was the same context, read again.
        </Fade>
      </div>
      <div style={{position: 'absolute', left: 1000, top: 200, width: 760, height: 580}}>
        <Fade t={t} at={26.4} style={{display: 'flex', gap: 30, fontFamily: MONO, fontSize: 19, color: '#A1A1AA'}}>
          <span><span style={{display: 'inline-block', width: 14, height: 14, background: ACC, borderRadius: 3, marginRight: 10}} />new this turn</span>
          <span><span style={{display: 'inline-block', width: 14, height: 14, background: '#52525B', borderRadius: 3, marginRight: 10}} />re-read</span>
        </Fade>
        {TURNS.map((tr, i) => {
          const p = prog(t, 26.25 + i * 0.1, 0.7);
          const H = 430;
          const hAll = (tr.input / max) * H * p;
          const hC = (tr.cached / max) * H * p;
          const x = i * (56 + 32);
          return (
            <React.Fragment key={i}>
              <div style={{position: 'absolute', left: x, bottom: 40, width: 56, height: hAll, borderRadius: '8px 8px 2px 2px', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                <div style={{flex: 1, background: ACC, boxShadow: `0 0 24px ${ACC}88`}} />
                <div style={{height: hC, background: `color-mix(in srgb, ${ACC} ${hi * 22}%, #52525B)`, backgroundImage: hi > 0 ? `repeating-linear-gradient(135deg, rgba(255,255,255,${0.08 * hi}) 0 6px, transparent 6px 12px)` : undefined}} />
              </div>
              <div style={{position: 'absolute', left: x - 10, bottom: 50 + hAll, width: 76, textAlign: 'center', fontFamily: MONO, fontSize: 16, color: '#A1A1AA', opacity: p}}>{Math.round(tr.input / 1000)}K</div>
              <div style={{position: 'absolute', left: x, bottom: 6, width: 56, textAlign: 'center', fontFamily: MONO, fontSize: 18, color: MUTED, opacity: p}}>{i + 1}</div>
            </React.Fragment>
          );
        })}
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 38, height: 2, background: DIM}} />
        <Fade t={t} at={26.6} style={{position: 'absolute', bottom: -30, left: 0, right: 0, textAlign: 'center', fontFamily: MONO, fontSize: 17, color: MUTED, letterSpacing: 3}}>TOKENS READ PER TURN</Fade>
      </div>
      <Caption t={t} at={T.cacheLine}>
        Prompt caching bills those re-reads at <A>about a tenth</A> of the price. That's what keeps agents affordable.
      </Caption>
    </Scene>
  );
};

// ================= 07 COMPACTION =================
const S7: React.FC<{t: number}> = ({t}) => (
  <Scene t={t} s={32} e={36}>
    <Title t={t} at={32.1} until={T.compact + 0.05} top={330} accent={[3, 4]}>Long sessions fill the window.</Title>
    <Title t={t} at={T.compact + 0.15} top={330} accent={[3]}>So old turns get summarized.</Title>
    <Caption t={t} at={T.compact + 0.5}>
      The harness compresses history into a short note, <A>and the loop keeps going.</A>
    </Caption>
  </Scene>
);

// ================= 08 RECAP =================
const S8: React.FC<{t: number}> = ({t}) => {
  const out = prog(t, 39.35, 0.6, EIN);
  const hit = t >= 36 ? Math.exp(-(t - 36) * 5) : 0;
  const up = prog(t, T.final, 0.7, EIO);
  return (
    <Scene t={t} s={36} e={40.2}>
      <AbsoluteFill style={{background: '#fff', opacity: hit * 0.25}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: lerp(360, 300, up), opacity: 1 - out}}>
        <Words text="The model only writes text." t={t} at={T.outroLine1} stagger={0.08} accent={[1]} style={{fontSize: 92, fontWeight: 800, letterSpacing: -3.5, color: FG}} />
        <Words text="The harness does everything else." t={t} at={T.outroLine2} stagger={0.08} accent={[1]} style={{fontSize: 92, fontWeight: 800, letterSpacing: -3.5, color: FG, marginTop: 6}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', opacity: up * (1 - out)}}>
        <svg width={90} height={90} viewBox="-50 -50 100 100" style={{transform: `rotate(${t * 120}deg)`}}>
          <circle r={34} fill="none" stroke="#3F3F46" strokeWidth={4} strokeDasharray="4 8" />
          <circle cx={0} cy={-34} r={8} fill={ACC} />
        </svg>
        <div style={{fontFamily: MONO, fontSize: 22, color: MUTED, marginTop: 22, letterSpacing: 1}}>
          animated by Claude Opus 5.5 · every frame and every note is code
        </div>
      </div>
    </Scene>
  );
};

export const AgentExplainer: React.FC = () => {
  const t = useCurrentFrame() / T.fps;
  return (
    <AbsoluteFill style={{fontFamily: SANS, color: FG, background: BG}}>
      <Background t={t} />
      <S1 t={t} />
      <S2 t={t} />
      <S3 t={t} />
      <S4 t={t} />
      <S5 t={t} />
      <S6 t={t} />
      <S7 t={t} />
      <S8 t={t} />
      <ContextBar t={t} />
      <Hud t={t} />
    </AbsoluteFill>
  );
};

export const NUMBERS = {BASE, TOTAL_READ, TOTAL_CACHED, REREAD_PCT, TURNS};
