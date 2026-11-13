---
name: assistir-videos-pickler
description: "Pickler's video watching toolkit: watch, question and remember videos instead of guessing from a title. Use when the user shares a video URL (YouTube, TikTok, Instagram, a stream), a local file, a screen or meeting recording, or a playlist, and says 'watch this', 'assiste esse vídeo', 'summarize this video'; asks about a video already watched or one from past sessions; wants chapters, a bug report or a hook analysis from a video; wants to share findings; corrects a video answer; when video watching fails; to set up a vision provider; or to record and verify a UI or animation."
argument-hint: "[module] <video-url-or-path> [question], e.g. https://youtu.be/... | ask <question> | memory | chapters | share | loop"
---

# Assistir vídeos pickler

Eleven video skills merged into one. Each lives in `modules/<name>/`, with its instructions in `modules/<name>/GUIDE.md` (its original `SKILL.md`).

## How to use a module

1. Pick the module from the table below. When a request fits more than one, use the first match in table order. If the user names one (`/assistir-videos-pickler watch-video ...`), use that one.
2. Read `modules/<name>/GUIDE.md` and follow it. Treat `modules/<name>/` as that module's skill base directory: `scripts/...` paths in it resolve from there, so run `python3 modules/watch-video/scripts/watch.py` from this skill's folder or with the absolute path.
3. Load another module only when the current one sends you there.

## Modules

| Request | Module | Alias |
|---|---|---|
| A Watch Skill command failed, the download broke, ffmpeg or yt-dlp is missing, "repair my setup" | `recovering-from-errors` | repair |
| The user corrects a video answer ("no, it says X", "wrong timestamp") or asks why it was wrong | `learning-from-mistakes` | lesson |
| Connect an LLM or vision provider, an API key, local Ollama | `configuring-vision` | vision |
| Chapters, a bug report from a screen recording, a hook analysis | `extracting-structure` | chapters |
| Share or export what was found in a video | `sharing-results` | share |
| A question about a video already watched in this session | `asking-with-evidence` | ask |
| Videos from past sessions, or a question across several videos | `video-memory` | memory |
| Record a UI, animation or generated video and verify it against pass criteria | `the-loop` | loop |
| Any new video to watch, summarize or question (default) | `watching-videos` | watching |
| The Watch Skill command reference, when `watching-videos` sends you there | `watch` | watch |
| The user asks for `watch-video`, or the `watch-skill` engine is missing and cannot be installed | `watch-video` | watch-video |

`the-loop` also matches "check that my UI looks right": for plain page checks prefer the `playwright-cli` skill, and use `the-loop` when motion or a recording matters, or when the user asks for it.

`watch-video` was a slash-command-only skill: do not pick it on your own unless the Watch Skill engine is missing. It needs `ffmpeg`, `ffprobe` and `yt-dlp` on PATH; for videos without captions it uses `GROQ_API_KEY` or `OPENAI_API_KEY` from `~/.config/watch/.env`, and without one it returns frames only.

## Engine

Every module except `watch-video` drives the Watch Skill CLI, `watch-skill`. If it is missing: `uv tool install 'watch-skill[standard]'` (add `ocr` for on-screen text, `whisper` for local transcription), then `watch-skill doctor`. Tell the user before installing.

## Skills mentioned by their old names

Modules name each other by their old skill names (`watch`, `watching-videos`, `asking-with-evidence`, `video-memory`, `the-loop`, ...): those are the modules of the same name here.
