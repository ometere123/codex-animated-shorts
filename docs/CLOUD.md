# Codex Cloud from an iPhone

This repository runs the existing Three.js/R3F bridge template, including ink,
two-tone materials, shadows, two-pass lens blur, bloom, neutral tone mapping and
colour grade. The original optional grain remains off. It is a source template,
not an automatic story generator. See [verification](VERIFICATION.md) for tested
limits and [audit](AUDIT.md) for missing inputs.

## Configure the environment once

In Safari, open Codex web → Settings → Environments → Create environment (or edit
an existing one). Select `ometere123/codex-animated-shorts`, then select this PR's
branch until it is merged. Use a Linux image with Node 22 or 24 and Python 3.12+.
Set the setup script to:

```bash
bash scripts/cloud-setup.sh
```

If the UI starts setup outside the checkout, first `cd` to the repository location
shown by that environment; there is no universal cloud checkout path. Save the
environment and select it for subsequent tasks. If a maintenance script field is
available, use the same command; setup is repeatable and refuses source conflicts.
Cache `.cache/npm`, `.cache/pip`, `.venv` and `node_modules` through the environment
snapshot/cache controls if offered. Lockfiles remain the source of truth.

The image must provide FFmpeg/FFprobe and Chromium libraries. On Debian/Ubuntu,
an environment administrator can install these packages during image setup:

```bash
sudo apt-get update
sudo apt-get install -y ffmpeg chromium python3-venv libnss3 libatk-bridge2.0-0 libgbm1 libasound2t64
```

Package names vary by image (Ubuntu's Chromium may be a Snap wrapper). If system
Chromium is unavailable, setup downloads Remotion's Chrome Headless Shell with
`npx remotion browser ensure`; its Linux shared libraries are still required.
In managed ChatGPT cloud environments use the scoped package installer when
provided; ordinary agent sessions cannot assume sudo is available. The current
test image already supplied FFmpeg and `/usr/bin/chromium`.

Allow setup network access to `registry.npmjs.org`, `pypi.org`,
`files.pythonhosted.org`, and `www.remotion.dev` / `storage.googleapis.com` when
using the downloaded browser. GitHub checkout/push needs `github.com` and
`api.github.com`; research needs the chosen source sites. Preserve the platform
proxy and CA trust. Browser loopback traffic must remain local. Do not disable TLS
verification. If agent internet access is disabled after setup, install the
browser during setup and use local assets during rendering. No secret is needed
for synthesized audio or rendering. Enable the GitHub connection for branch/PR
writes; do not paste tokens into chat.

I cannot change your persistent Codex environment configuration from this task.
The checked-in script and Actions workflow are reusable configuration, not proof
that your saved environment settings have been changed.

## Verify in a fresh task

Open a task with this repository/environment and send:

> Use $codex-animated-shorts. Run the technical cloud smoke test, inspect its
> frame and MP4, and return downloadable outputs. Do not start a full story.

The repository skill is `.agents/skills/codex-animated-shorts/SKILL.md` and needs
no personal-computer installation. Start a new task after checking out the branch
if the skill menu was populated before the file existed.

Commands Codex runs:

```bash
bash scripts/cloud-setup.sh
PATH="$PWD/.venv/bin:$PATH" npm run cloud:verify
```

The default is 360×640, 30 fps, 120 frames (4 seconds). It writes
`out/cloud-smoke/frame.png`, `preview.mp4`, `audio.wav`, composition metadata,
and an asserted FFprobe/audio timing report. Preview size is independent of the
1080×1920 registered final composition. `PREVIEW_WIDTH=540` selects 540×960.
`OUTPUT_DIR=out/my-test` chooses another output directory. The cloud verification
command always renders four seconds; it never approves or renders a full story.

`REMOTION_GL=swangle` is the default software renderer (ANGLE + SwiftShader).
`REMOTION_BROWSER_EXECUTABLE=/path/to/chromium` selects a browser if needed.
`REMOTION_GL=angle` failed the WebGL2 probe on the tested executor; keep swangle
there. ANGLE alone is not a guaranteed GPU route. The
runner uses one render worker; do not automatically scale to CPU count. The test
container has a 2-CPU quota, 8 GiB memory limit and approximately 8 GiB disk.
Software shader compilation is slow. Keep at least 3 GiB disk free, inspect usage
before longer jobs, and render approved final work in shot-sized segments if
needed. A minute at 2K is not validated by the smoke test.

In this managed environment, the inner command sandbox blocks Chromium sockets.
Use the supported command approval/escalation path for rendering; do not change
sandbox policy files. A fresh environment must be tested again. If its outer
runtime also blocks Chromium, use the manual GitHub Actions workflow below, or
another explicitly approved cloud renderer. Compilation alone is not a render.

Each run owns a unique short `/tmp/cas-*` directory and removes it in `finally`.
A short temp base avoids Chromium Unix socket path limits in deeply nested
checkouts. `REMOTION_TMP_BASE` may select another short writable directory.
SIGINT/SIGTERM are handled; a killed VM may leave a directory. Inspect the selected temp base
before removing stale run directories. Never clean someone else's work. Output
files deliberately survive; download them, then delete only selected old runs.
The fixed default output directory is overwritten on reruns; use a unique
OUTPUT_DIR when retaining previews. No external assets are fetched during render
except optional local Kenney paths. Missing models are explicitly disclosed.

## Download on iPhone

Ask Codex to attach `preview.mp4`, `frame.png`, and the report using the task's
file-download/artifact UI if available. Use Share → Save to Files; an MP4 can then
be saved or shared through iOS. A workspace path alone is not a durable download
link, and task retention varies. Download before ending the task.

For a repeatable GitHub-hosted route, the **Cloud preview artifact**
workflow in `.github/workflows/cloud-preview.yml` runs on relevant pull requests
and manual dispatch. It renders the smoke test and
uploads the files for seven days. After the workflow is on the default branch,
open GitHub in Safari → repository → Actions → Cloud preview artifact → Run
workflow → choose branch → Run. Sign in to GitHub in Safari. Open the completed run → Artifacts →
`animated-shorts-preview`; download the ZIP and expand it in Files. If the mobile layout hides artifact
controls, use Safari’s Request Desktop Website. Actions may
consume account minutes/storage; no paid storage service has been provisioned.
This workflow is limited to the technical smoke test and does not generate a
story or bypass its approvals. Only runs listed in the
verification report were actually executed.

For production, extend the workflow with the specific approved composition and
revision after preview approval. Retain source, research and manifests in Git;
keep generated media out of Git. For durable archival use your existing cloud
storage manually from Files. Adding S3/R2/Drive automation, credentials or a paid
service requires a separate decision and authorization.

## First story, entirely by phone

Send:

> Use $codex-animated-shorts to research three humorous, well-sourced moments in
> Nigerian political history for an original 60-second vertical cartoon. Record
> sources and distinguish disputed accounts from documented facts. Let me choose
> the story, then wait for my approval of the script and storyboard. Create
> original characters and environments. Render a low-resolution preview with
> original or licensed audio, wait for my approval, then propose the final render.

Codex maintains `productions/<slug>/SCRIPT.md`, shot table, claim/source ledger,
asset licenses, audio cue sheet and `APPROVALS.md`. Sources and dialogue need
review before animation. Factual claims require credible evidence; invented comic
dialogue is clearly labeled. Story, script/storyboard and playable-preview
approvals are mandatory. Render plans for final resolution, runtime and estimated
resources follow those approvals. Final QA checks representative shots, speech
intelligibility, captions if requested, audio peaks/loudness, factual consistency,
FFprobe specs and full decoding. Deliver the actual file and remaining caveats.

Narration can be an authorized recording uploaded from iPhone. Normalize to 48 kHz
WAV with FFmpeg and keep optional word timestamps for reaction sync. No production
TTS service or voice is configured. Choose one later if desired; never assume a
paid API or clone a real person's voice. The bridge audio synthesis code is
preserved and bootstrapped to `audio/`, but its full mixer requires
`voice/voice.wav` and `voice/words.json` and uses a bridge-specific 67.5s timeline.

## Rendering an approved production composition

After approvals are recorded, choose the new composition's entry and ID, not the
bridge example. Render a short range first. With an installed system browser, an
example final-render command (run only for an approved story) is:

```bash
npx remotion render src/your-story-entry.ts YourStory out/your-story/final.mp4 \
  --width=1080 --height=1920 --concurrency=1 --gl=swangle \
  --browser-executable=/usr/bin/chromium --codec=h264 --crf=16
```

Omit the browser path for Remotion's downloaded Headless Shell. Keep effects on;
review resolution-specific stills before increasing to 1440×2560. Full 60-second
performance is unmeasured. For constrained sessions render contiguous frame ranges
with identical settings, then concatenate and mux the approved full-length mix
once (avoid independent AAC padding at every shot). Confirm no missing/duplicated
frames at joins and repeat full-decode/spec/audio QA. Adapt `short_qa.py` to the new
shot table; it streams low-resolution frames and creates contact sheets. It flags
potential issues but does not establish factual accuracy or artistic quality.

A verified downloadable preview is available from the run linked in
[VERIFICATION.md](VERIFICATION.md). Its artifact expires after seven days. In the
current cloud executor, `gh run download` received a 403 from its redirect target;
the connected GitHub artifact-download tool successfully delivered the ZIP. This
does not prevent downloading through GitHub in Safari. If the Codex task cannot
attach files directly, return the Actions run/artifact link rather than promising
that a raw workspace path is a phone download.
