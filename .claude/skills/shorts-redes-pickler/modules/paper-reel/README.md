# paper-reel

A Claude Code skill that makes faceless 9:16 explainer reels in a cut-paper style: flat textured paper shapes, a box mascot in a different hat every scene, a screwed-on headline sign, rubber stamps, counters, and captions that pop in one paper scrap per word. You give Claude a topic, it writes six or seven lines, and one command renders the MP4.

![Seven scenes from the example reel](docs/strip.jpg)

**[Watch the example reel](docs/demo.mp4)** (23 s, made with this skill, about the [khan-explainer](https://github.com/haiderfarooq3/khan-explainer) skill).

Write-up: [paper-reel: a free Claude Code skill that draws cut-paper explainer reels from one prompt](https://haiderfarooq.dev/blog/paper-reel-explainer-reels-in-code). How the skill explains itself, on YouTube: [wide cut](https://youtu.be/c6hUOxt4eXg) and [Short](https://www.youtube.com/shorts/HXAgpEai8pA).

Everything is drawn in code and runs on your Mac: Kokoro for the voice, whisper.cpp for word timing, an HTML canvas, Playwright and ffmpeg. No API keys, no accounts, no editor.

## How it stays in sync

The voice is the clock. Every spoken line is one scene, with a hard cut just before the line starts. After the voice is generated, whisper.cpp times every word, and the scenes cue props off those words: a stamp slams on "free", a counter runs up on "stars", the mascot's face changes on the payoff.

```js
SCENES.free = () => {
  const wl = VW('free', 'laptop').t0;              // when "laptop" is said
  prWall('#c9b28a');                               // the scene's world
  prSign('RUNS ON YOUR LAPTOP');                   // the headline sign
  prStamp('LOCAL', 450, 690, PR.green, wl, { rot: 0.08, size: 70 });
  clawd(CLAWD_X, CLAWD_Y, { hat: 'cap', mood: TT > wl ? 'happy' : 'neutral' });
  prChips();                                       // one paper caption per word
};
```

## Install

You need macOS, Node 18 or newer, ffmpeg and whisper.cpp.

```sh
git clone https://github.com/haiderfarooq3/paper-reel ~/.claude/skills/paper-reel
cd ~/.claude/skills/paper-reel && npm install && npx playwright install chromium
brew install ffmpeg whisper-cpp
~/.claude/skills/paper-reel/bin/reel doctor
```

`doctor` checks every piece and prints the exact command for anything missing: the whisper model, a Python with `kokoro-onnx`, and the Kokoro model files.

## Use

Ask Claude Code:

> Make a paper-reel about uv, the Python package manager. CTA keyword UV.

> Make a skill-spotlight reel for this repo, comment keyword REPO.

Claude drafts the script for you to approve, generates the voice, builds one scene per line, checks the frames and exports. Or run the pipeline yourself:

```sh
REEL=~/.claude/skills/paper-reel/bin/reel
$REEL new ~/reels/my-reel                  # copy the starter (or: --from khan-skill)
# edit ~/reels/my-reel/voice/script.json and src/scenes.js
$REEL voice ~/reels/my-reel                # Kokoro takes + word times
$REEL still ~/reels/my-reel 2,6,10 look.png
$REEL check ~/reels/my-reel                # text overlap + determinism
$REEL export ~/reels/my-reel ~/Desktop/my-reel.mp4
```

An export renders 1080x1920 at 30 fps with a ducked lo-fi bed at about -14 LUFS, in about 30 seconds on an M-series Mac.

[SKILL.md](SKILL.md) is the full reference: the script arc, the scene rules, the kit API and the gotchas. [references/style.md](references/style.md) has the palette and layout grid.

## Credits

Made by [Haider Farooq](https://github.com/haiderfarooq3). MIT licensed.

The renderer, frame tools and kit core are vendored from [animate](https://github.com/cth9191/animate) by cth9191 (MIT). See [NOTICE.md](NOTICE.md).

Not affiliated with or endorsed by Anthropic. Claude is a trademark of Anthropic.
