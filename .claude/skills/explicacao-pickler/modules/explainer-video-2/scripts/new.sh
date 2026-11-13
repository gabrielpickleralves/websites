#!/usr/bin/env bash
# scripts/new.sh <dir>  -> Remotion project + numpy/scipy venv, seeded with the reference video
set -euo pipefail
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$1"; mkdir -p "$DIR"/{src,public,out/stills}; cd "$DIR"
[ -f package.json ] || npm init -y >/dev/null
npm i -s remotion @remotion/cli @remotion/bundler @remotion/renderer @remotion/google-fonts react react-dom typescript @types/react
[ -d .venv ] || { python3 -m venv .venv && .venv/bin/pip -q install numpy scipy; }
for f in Video.tsx timeline.json Root.tsx index.ts; do [ -f src/$f ] || cp "$SKILL/reference/$f" src/; done
[ -f gen_music.py ] || cp "$SKILL/reference/gen_music.py" .
cp "$SKILL/scripts/stills.mjs" .
printf 'node_modules/\nout/\n.venv/\n*.wav\n' > .gitignore
echo "ready: $DIR (reference video = 'How a coding agent works'; rewrite src/timeline.json + src/Video.tsx + gen_music.py score)"
