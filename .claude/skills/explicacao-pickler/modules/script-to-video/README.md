# script-to-video

**Turn a script or your own recordings into a narrated, word-synced video.** Local voice generation (Kokoro), images and articles from the web with licences recorded, clips, and browser-rendered motion graphics. 16:9 for YouTube or 9:16 for Reels, Shorts and TikTok. The core rendering and TTS pipeline needs no cloud API keys.

It also ships as a **Claude Code skill** (`SKILL.md`): drop the folder in `~/.claude/skills/` and Claude plans the shots, fetches the pictures, and builds the video from your script.

> **What to expect.** The agent should deliver a reviewed first cut, then incorporate your direction into versioned edits. The skill covers natural scripts, your own narration and retakes, complete demonstrations, visual styling, and export verification. Advanced audio cleanup and timing repairs require agent-directed editing with appropriate tools; they are not automatic features of the CLI. A draft should still have checked sync, intact speech, and footage that matches the narration.

<table align="center">
  <tr>
    <td align="center" width="62%"><a href="https://github.com/isabellagreco1997/script-to-video/releases/download/examples-v2/how-does-a-door-work.mp4"><img src="examples/how-does-a-door-work/out/preview.gif" width="100%"></a><br><b>How does a door work</b> · 16:9 · 1:30 · <a href="https://github.com/isabellagreco1997/script-to-video/releases/download/examples-v2/how-does-a-door-work.mp4">▶ watch the full video</a><br><sub>Wikipedia images + article screenshots + diagrams drawn in code, male Kokoro voice</sub></td>
    <td align="center" width="38%"><a href="https://github.com/isabellagreco1997/script-to-video/releases/download/examples-v2/dark-souls-story-916.mp4"><img src="examples/dark-souls-story-916/out/preview.gif" width="100%"></a><br><b>The story of Dark Souls</b> · 9:16 · 0:48 · <a href="https://github.com/isabellagreco1997/script-to-video/releases/download/examples-v2/dark-souls-story-916.mp4">▶ watch the full video</a><br><sub>trailer clips + article captures + a counter, same voice</sub></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><a href="https://github.com/isabellagreco1997/script-to-video/releases/download/examples-v2/dark-souls-the-choice-draft-v1.mp4"><img src="examples/dark-souls-the-choice/out/preview.gif" width="640" alt="Dark Souls: The Choice animated preview"></a><br><b>Dark Souls: The Choice</b> · 16:9 · 1:58 · <a href="https://github.com/isabellagreco1997/script-to-video/releases/download/examples-v2/dark-souls-the-choice-draft-v1.mp4">▶ watch the full video</a><br><sub>Made with Codex and this skill: gameplay + word-synced character reveals + explanatory diagrams, local Kokoro voice · first cut</sub><br><sub><a href="examples/dark-souls-the-choice">Script, subtitles and source credits</a></sub></td>
  </tr>
</table>

All three full videos are on the [releases page](https://github.com/isabellagreco1997/script-to-video/releases/tag/examples-v2). The first two examples also include build contact sheets in their `out/` folders.

## Make it work with your agent

You write the script and give notes. The agent runs the pipeline, following `SKILL.md`. Three steps:

1. **Install once** on the machine the agent works on: the Install section below, then `script-to-video setup` for the voice model.
2. **Give the agent the playbook.**
   * **Claude Code**: copy or symlink this folder to `~/.claude/skills/script-to-video`. It loads itself when you ask for an explainer, a reel, or a video from a script.
   * **Codex**: add to `AGENTS.md`: `Read /path/to/script-to-video/SKILL.md before making any video.`
   * **Cursor / Windsurf / Gemini CLI / anything with a rules file**: paste `SKILL.md` into it, or one line pointing at the file.
   * **Any chat agent with a shell**: start with "Read script-to-video/SKILL.md, here is my script, make it a 16:9 video with a male voice."
3. **Direct it.** Give notes in plain words ("the image at 2:53 is wrong", "tighten the pause inside this phrase", "let her finish speaking"). The agent uses the latest approved cut, preserves unrelated work, and renders only what needs changing where possible. Duration edits also update dependent tracks and markers. If you recorded your own narration, supply the files and explain retake order; the agent selects the takes and aligns the edit to your voice.

## How it works

```
script.txt ──voice──▶ narration.wav ──align──▶ words.json
                                                  │
assets (web images, article shots, clips) ────────┼──▶ build.py (shot list, anchored to phrases)
                                                  ▼
                              timeline.js ──render──▶ frames ──encode──▶ video.mp4 (+ sfx, music)
                                                                └──audit──▶ contact sheets
```

1. **Voice**: generate Kokoro TTS or use the creator's recordings. For human speech, select retakes, reduce microphone noise conservatively, and tighten hesitation without cutting words or sentence endings.
2. **Align**: Whisper word timestamps anchor visuals to phrases. Re-align or update the shared time map after audio changes; ASR timestamps alone are not safe speech-cut boundaries.
3. **Assets**: images the relevant Wikipedia articles actually use (licensed, with a manifest and an attributions file), article screenshots scrolled to the paragraph, video clips cut into frames, made cards and diagrams.
4. **Timeline**: a tiny Python DSL. `tl.shot("the hinge", bg=tl.bg("hinge.jpg", kb="zin"))` means "when the narrator says *the hinge*, cut to this picture and slowly push in".
5. **Render and review**: headless Chrome draws frames from the timeline; ffmpeg encodes the result. Contact sheets help check visuals. Review the exported speech joins, motion, and several audio/video events as well, especially in demos.

## Install

```bash
git clone https://github.com/isabellagreco1997/script-to-video
cd script-to-video
pip install -e .            # pillow numpy kokoro-onnx
pip install mlx-whisper     # Apple Silicon; elsewhere: pip install faster-whisper
npm install                 # puppeteer-core (uses your installed Chrome)
brew install ffmpeg         # or apt / choco
script-to-video setup       # downloads the Kokoro voice model once (~330 MB)
```

## Make a video

```bash
mkdir my-video && cd my-video
# 1. write connected, conversational script.txt (measure the read; allow time for demos)
script-to-video voice script.txt work/narration.wav --voice am_puck      # af_bella, bm_george, ...
script-to-video align work/narration16.wav work/                        # → work/words.json + sentences.txt
# 2. fetch pictures (see examples/*/fetch_assets.py) into work/assets/
# 3. write build.py (see examples/*/build.py) — one visual per sentence, anchored to its phrase
script-to-video build build.py                                          # render + sfx + encode + audit
```

`work/sentences.txt` is your shot-planning sheet. `build.py` ends with `tl.write(...)`, which reports word-slam share, shots over 8 s, and missing anchors. Fix missing anchors; review the other warnings in context. Complete demos and purposeful callbacks are valid even when a duration or reuse warning appears.

### The timeline DSL

```python
from script_to_video import Timeline
tl = Timeline("work/words.json", w=1920, h=1080)        # w=1080, h=1920 for a reel
tl.shot(0.0)                                              # black until the first key word
tl.shot("the hinge", bg=tl.bg("hinge.jpg", kb="zin", dark=0.1))
tl.shot("two leaves", layers=[tl.I("hinge_diagram.png", 360, 60, 1200, anim="slideU", plain=True, zoomTo=1.6, origin="85% 55%")])
tl.shot("Linus Yale", layers=[tl.I("yale.jpg", 700, 60, 520, rot=-3), tl.C("LINUS YALE JR.", 770, 880, i=0.3)])
tl.shot("a shape test", layers=[tl.T("A SHAPE TEST.", 380, 420, fs=170, rot=-2, i=tl.rel("shape test"))])
tl.shot("every shortcut", bg=tl.clip("gameplay2", kb="zout", fit="cover"))
tl.write("work/timeline.js")
```

* `shot(phrase, see="what the viewer should be looking at")` starts a shot when the phrase is spoken and moves the cursor forward. `"a|b"` = alternatives for what whisper might have heard. Writing `see=` for every shot *is* the shot plan: a thing → its photo, a mechanism → a diagram that changes state, a number → a counter, a claim → the article.
* `tl.pic(src)` puts a **whole** image on screen, centred, sized from the file so nothing bleeds off the edge. A `zoomTo` push into a detail is a deliberate crop and is not capped. `tl.bg(src)` shows a whole still over a blurred copy of itself. That protection padding is the 16:9 default; a 9:16 timeline flips it and images fill the phone screen (`fit="cover"`, full-width `pic`). Override per shot with `fit=` / `safe=`.
* Image-only shots get their own blurred copy as a backdrop from the first frame, so a cut never drops to black (`backdrop=False` to opt out).
* `tl.write()` reports word-slam share, shots over 8 s, missing anchors, order problems **and images used twice**. Duration and reuse are review prompts, not hard failures. The dense audit sheet (a frame every half second) supplements playback review; it cannot verify audio or motion by itself.
* `tl.rel("word")` = seconds from the shot start to a word, for a layer's `in`. Elements appear on their word.
* Backgrounds: `kb` = zin, zout, panL, panR, panD, panU, punch, still; `dark` dims; `fit` cover/contain; `flash=0` white flash on the cut.
* Layers: `I` image (pop, slideU/D/L/R, fade, `zoomTo` + `origin` for a slow push), `T` white Impact word with black stroke, `C` black chip, `G` clip as a layer, `counter` counts up, `tl.words()` a centred line that appears word by word on the spoken words. `tl.shot(..., shake="@apart")` jolts the whole picture on that word.

## Assets with licences

```python
from script_to_video import assets
assets.wikipedia_images("Hinge", "work/assets/wp", "work/manifest.json", limit=10, prefix="hinge_")   # what the article uses
assets.commons_file("File:Pin tumbler with key.svg", "work/assets/pin.png", "work/manifest.json")       # a named file (SVG → PNG)
assets.commons_fetch("brass butt hinge", "work/assets/hinge.jpg", "work/manifest.json")                 # keyword search (noisier)
assets.capture([dict(name="wiki", url="https://en.wikipedia.org/wiki/Latch", w=1600, h=1000, scroll="#Types", out="work/assets/wiki_latch.png")], "work")
assets.clip_frames("work/clips/trailer.mp4", "gp1", "work", fps=12, start=18, dur=7)                    # → gifframes/gp1 + gifmeta
assets.attributions("work/manifest.json", "work/attributions.txt")                                     # paste into the description
```

Clips you download (trailers, gameplay, screen recordings) stay out of git; the examples fetch them at build time.

## The rules that make it look right

Written in full in [`SKILL.md`](SKILL.md). The short version:

1. Follow the latest brief for format, duration, greeting, and outro. A requested greeting can stay on black before the result reveal.
2. Tell a connected story of choices, attempts, corrections, and results. Keep the creator's voice and explain the actual tool roles.
3. Use visuals first. Show the exact narrated action and verify current assets against the running project, not filenames alone.
4. Keep the pace lively while letting meaningful gameplay and dialogue finish. There is no fixed maximum shot length.
5. Use later replacement takes when instructed. Tighten gaps inside phrases while protecting consonants, word endings, and natural breaths.
6. Let sound demonstrations play clearly without narration over them. Diagnose offset, drift, and packet artifacts separately; don't blanket-denoise the soundtrack.
7. Use simple devlog layouts: terminal-style corrections beside imagery; white uppercase Impact editorial text with an outward black outline; text-only asides that leave the image in place; transparent tool logos over website captures.
8. Make transitions explain the process: match assets to animations, reveal before/after changes, and zoom into the detail being discussed.
9. Keep approved audio unchanged for visual-only edits. Ripple all dependent tracks and markers together when narration duration changes.
10. Verify the actual export and never overwrite a delivered file. Keep a revision record and provide its versioned path.

### Editing guidance from creator feedback

The playbook includes reusable lessons from a full game-development video and its revisions. These references are instructions for the editing agent, not extra automatic CLI commands:

* [Recorded narration and demo audio](references/audio-editing.md): later retakes, safe micro-pause removal, microphone cleanup, complete character lines, and source-audio sync diagnosis.
* [Process devlogs and creator styling](references/devlog-direction.md): conversational story structure, meaningful gameplay, current assets, text layouts, logos, and purposeful transitions.
* [Revisions and export verification](references/revision-and-qa.md): protected tracks, shared timing changes, versioned outputs, and regression scenarios drawn from actual corrections.

## Examples

* [`examples/how-does-a-door-work/`](examples/how-does-a-door-work) — 16:9, 1:30. Hinge, latch, pin tumbler lock, Linus Yale. Every picture from Wikipedia/Commons with the licence in `work/attributions.txt`.
* [`examples/dark-souls-story-916/`](examples/dark-souls-story-916) — 9:16, 0:48. Trailer clips via yt-dlp, article captures reflowed at phone width, a live counter, a "YOU DIED" card drawn in code.
* [`examples/dark-souls-the-choice/`](examples/dark-souls-the-choice) — 16:9, 1:58. Made with Codex using this skill: 52 word-anchored shots, local Kokoro narration, gameplay, character reveals and diagrams. Includes the first-cut showcase, script, subtitles and source credits.

Run the first two examples with `python examples/<name>/fetch_assets.py` then `script-to-video build examples/<name>/build.py`.

## License

MIT. Kokoro is Apache-2.0; image licences are recorded per file in each example's manifest.
