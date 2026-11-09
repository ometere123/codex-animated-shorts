#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node -e 'const n=Number(process.versions.node.split(".")[0]);if(n<22||n>24)throw Error("Use Node 22 or 24")'
for tool in npm python3 ffmpeg ffprobe; do
  command -v "$tool" >/dev/null || { echo "Missing $tool; see docs/CLOUD.md" >&2; exit 1; }
done
mkdir -p .cache/npm .tmp public out
npm ci --cache .cache/npm --prefer-offline
python3 -m venv .venv
.venv/bin/python -m pip install --cache-dir .cache/pip -r requirements-audio.txt
npm run bootstrap
npm run typecheck
npm test
if ! command -v chromium >/dev/null; then
  npx remotion browser ensure
fi
printf '%s\n' 'Setup complete. Run PATH="$PWD/.venv/bin:$PATH" npm run cloud:verify'
