---
name: explainer-video
description: Make a 30-60s motion-graphics explainer or product demo video entirely in code (Remotion + React for picture, numpy synth for music and sound design), rendered to mp4 on a laptop. Use when asked for an explainer, demo video, launch video, animated "how X works", or motion graphics.
---

# explainer-video

Every frame and every note is code. One `timeline.json` drives both the picture and the sound, so cuts, numbers and hits always line up. `reference/` is a finished 40s video ("How a coding agent works"): read it before writing anything, copy its patterns, replace its content.

## What works (from the Sep 2026 Opus motion-graphics wave on X)
- Copy-paste showreels died in two days. What kept spreading: **"how X works" explainers** (30-45s), short story films, same-prompt model-vs-model, and honest receipts (minutes, lines, tokens, retries).
- One idea per scene, 4-6s each. First 2s is the hook title. Last scene is a one-line thesis.
- One **persistent visual thread** that accumulates across scenes (the reference uses a context-window bar that fills, then compacts). It turns a list of facts into a story.
- A number the viewer didn't expect, derived in code from the data so it adds up (reference: "You typed 6 tokens. The model read 275,334").
- Captions in plain words, one accent-colored phrase each. A small HUD (chapter label, countdown) makes it feel produced.

## Workflow
1. `scripts/new.sh <dir>`: Remotion project + venv, seeded with the reference.
2. Write the storyboard as `src/timeline.json`: scenes, and a time for every event. Put cuts on the beat grid (120 BPM = 0.5s).
3. `src/Video.tsx`: every scene is a pure function of `t` (seconds). Use `prog(t, at, dur)` with expo-out easing, mask word reveals, blur-in/out scene transitions, a slow push-in. Dark background, dot grid, two drifting glows that pulse on the kick. Inter + JetBrains Mono. One accent color plus semantic colors.
4. `gen_music.py`: the chord progression, drums, sidechained bass, filtered pad whose cutoff follows the story's energy, arp with ping-pong delay, and a riser into a drop on the key reveal. Every on-screen event gets a sound: typing clicks, thuds when things land, rising pings per loop, buzz on failure, chime on success, an impact on the final line.
5. QA before the full render: `node stills.mjs <frames...>`, then look at `out/contact.png` for overlaps, cut-off text and empty frames. Fix, repeat.
6. `scripts/render.sh`: music -> loudnorm -14 LUFS -> 1080p30 render -> mux to `out/video.mp4` + `out/spectrum.png` (check the build and drop are visible). About 2 min for 40s on an 8 GB laptop with concurrency 3.

## Rules
- No stock footage, no AI video/music generators, no external assets except Google Fonts.
- Illustrative numbers are fine for an explainer; they must be consistent and plausible, and say so if asked.
- Keep it 2D (text, SVG, CSS). Heavy 3D renders slowly without a GPU.
- Receipts for the post: wall-clock time, lines of code, render time. Say only what is true.
