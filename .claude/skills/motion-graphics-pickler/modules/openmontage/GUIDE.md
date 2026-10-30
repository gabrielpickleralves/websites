---
name: openmontage
description: Make a whole video with OpenMontage, an agentic video studio (github.com/calesthio/OpenMontage, AGPL-3.0): animated explainers, data and chart stories, pitches, documentary montages from real footage, with narration, music and captions, rendered with Remotion or HyperFrames.
---

# OpenMontage

OpenMontage is a full project, not a skill folder: Python pipelines, a Remotion composer, a HyperFrames runtime and 49 skills of its own. It works from inside its own folder, so this module only says where it is and how to drive it.

## 1. Find or install it

It lives in `~/OpenMontage`. Check with `ls ~/OpenMontage/AGENT_GUIDE.md`.

If it is missing, tell the user it is a large install (Python packages, `npm install`, about 1 GB) and wait for a yes. Then:

```bash
git clone --depth 1 https://github.com/calesthio/OpenMontage.git ~/OpenMontage
cd ~/OpenMontage && make setup
```

It needs Python 3.10+, FFmpeg and Node.js 18+. `make setup` creates `.venv`, installs the Remotion composer, the offline Piper voice and the HyperFrames runtime, and copies `.env.example` to `.env`.

## 2. Work inside it

1. Read `~/OpenMontage/AGENT_GUIDE.md` first and follow its routing. It is the project's real instruction file.
2. Run every OpenMontage command from `~/OpenMontage`, with its own Python: `.venv/bin/python`.
3. Its skills are in `~/OpenMontage/.claude/skills/` and `~/OpenMontage/skills/`. They do not load on their own from another folder: when `AGENT_GUIDE.md` points to one, read its `SKILL.md` and follow it.
4. Renders land in `~/OpenMontage/projects/<project>/renders/`. Copy the final video to wherever the user wants it.

## 3. Keys and limits

- Zero-key path: Remotion components (titles, text, charts, data viz), the offline Piper voice, and FFmpeg. `make demo-list` lists demos that need no key.
- Image and video generation, cloud voices, avatars and stock footage need keys in `~/OpenMontage/.env` (OpenAI, ElevenLabs, HeyGen, fal and others). `make preflight` lists what is configured. Ask the user before using a paid provider, and never commit `.env`.
- If Remotion fails with `ENOTFOUND remotion.media` (it cannot download its browser), render with a local Chromium: add `--browser-executable=<path to headless_shell or chromium>` to `npx remotion render`.
- License: AGPL-3.0. Using it to make videos is fine; tell the user before they modify OpenMontage and offer it to others as a service.
