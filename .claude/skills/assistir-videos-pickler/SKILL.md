---
name: assistir-videos-pickler
description: "Pickler's video watching toolkit: one entry point to actually watch a video instead of guessing from its title. Use when the user shares a video URL (YouTube, TikTok, Instagram, a stream), a local video file, a screen or meeting recording, or a playlist or folder of videos, and says 'watch this', 'assiste esse vídeo', 'summarize this video', 'what's in this recording'. Downloads it, extracts frames, transcribes it and indexes it."
argument-hint: "[module] <video-url-or-path> [question], e.g. https://youtu.be/... | watch-video <url> --start 2:15 --end 2:45"
---

# Assistir vídeos pickler

Three video-watching skills merged into one. Each lives in `modules/<name>/`, with its instructions in `modules/<name>/GUIDE.md` (its original `SKILL.md`).

## How to use a module

1. Pick the module from the table below. If the user names one (`/assistir-videos-pickler watch-video ...`), use that one.
2. Read `modules/<name>/GUIDE.md` and follow it. Treat `modules/<name>/` as that module's skill base directory: `scripts/...` paths in it resolve from there, so run `python3 modules/watch-video/scripts/watch.py` from this skill's folder or with the absolute path.
3. Use one module per video.

## Modules

| Request | Module | Engine |
|---|---|---|
| Any video to watch, summarize or question (default) | `watching-videos` | Watch Skill CLI (`watch-skill`) |
| The user asks for the Watch Skill directly, or for its options | `watch` | Watch Skill CLI (`watch-skill`) |
| The user asks for `watch-video`, or `watch-skill` is not installed and cannot be | `watch-video` | its own Python scripts + ffmpeg + yt-dlp |

`watching-videos` and `watch` drive the same engine: `watching-videos` is the workflow, `watch` the command reference. Load `watch` only when `watching-videos` sends you there.

`watch-video` was a slash-command-only skill: do not pick it on your own unless the Watch Skill engine is missing. It needs `ffmpeg`, `ffprobe` and `yt-dlp` on PATH; for videos without captions it uses `GROQ_API_KEY` or `OPENAI_API_KEY` from `~/.config/watch/.env`, and without one it returns frames only.

## Skills mentioned by their old names

- `watch`, `watching-videos`, `watch-video`: modules of this skill.
- `asking-with-evidence`, `video-memory`, `extracting-structure`, `sharing-results`, `learning-from-mistakes`, `recovering-from-errors`, `configuring-vision`, `the-loop`: separate Watch Skill skills, still installed on their own. When they say to watch a video first, use this skill.
