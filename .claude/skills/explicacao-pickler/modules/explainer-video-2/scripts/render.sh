#!/usr/bin/env bash
# scripts/render.sh [composition-id] [out-name]  (run inside the project) -> out/<name>.mp4 with music at -14 LUFS
set -euo pipefail
ID="${1:-$(node -e "console.log(require('fs').readFileSync('src/Root.tsx','utf8').match(/id=\"([^\"]+)\"/)[1])")}"
NAME="${2:-video}"
.venv/bin/python gen_music.py
ffmpeg -v error -y -i public/music_raw.wav -af loudnorm=I=-14:TP=-1.0:LRA=11 -ar 48000 public/music.wav
npx remotion render src/index.ts "$ID" out/silent.mp4 --concurrency="${CONCURRENCY:-3}" --crf=16 --muted --log=error
ffmpeg -v error -y -i out/silent.mp4 -i public/music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "out/$NAME.mp4"
ffmpeg -v error -y -i public/music.wav -lavfi showspectrumpic=s=1600x500:legend=1:scale=log out/spectrum.png
echo "out/$NAME.mp4"
