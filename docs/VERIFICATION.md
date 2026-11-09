# Verification — 2026-11-09

Tested on the attached managed cloud executor, not a personal computer.
Baseline commit: f6fdfc6f5f043f1ce8e5ce8be075dfe4bdabe225.

| Check | Observed result |
|---|---|
| Repository skill discovery | Codex app-server skills/list returns codex-animated-shorts, scope repo, enabled true, no discovery errors |
| Phone UI invocation | Not independently exercised on an iPhone; use the fresh-task prompt in CLOUD.md |
| Fresh npm install | npm ci from package-lock.json passed; no peer overrides |
| Fresh Python venv | NumPy 2.3.5, SciPy 1.17.0, Pillow 13.0.0 installed successfully |
| Bootstrap | Initial copy passed; repeated setup copies zero files; edited destinations rejected |
| Regression tests | 3 passed, 0 failed |
| TypeScript | tsc --noEmit passed with strict mode |
| Bundle and discovery | BridgeShort discovered: 1080×1920, 30 fps, 2025 frames |
| WebGL probe | WebGL 2.0; ANGLE Vulkan 1.3.0 SwiftShader Device (Subzero); max texture 8192 |
| Actual frame | Frame 90 rendered at 360×640; visually inspected, characters/bridge/blur visible |
| Four-second MP4 | In progress at initial PR creation; results will be updated before handoff |
| Original audio primitives | boot: 10560 samples; glock: 24000 samples; finite/nonzero at 48 kHz |
| Synthetic timing cue | WAV generated, FFprobe duration 4.000000 seconds |
| Full bridge audio mix | Not run: narration WAV and word timestamps absent |
| 60-second 2K final | Not attempted; requires approved production and resource plan |

Runtime: Node 24.22.1, npm 11.9.0, Python 3.12.14,
Chromium 156.0.8078.79 (Debian 13), FFmpeg 7.1.5. Container quota: two CPUs,
8 GiB RAM, approximately 8 GiB writable disk. Software rendering is slow; no
GPU availability or full-minute throughput claim is made.

Initial sandbox browser launch failed with SIGTRAP and crashpad setsockopt
Operation not permitted. The approved outer cloud execution path successfully
launched Chromium and rendered the frame. Node child-process test stdout was
also unreliable inside the inner sandbox; all three tests pass outside it.
These are runtime restrictions, not a reason to disable the animation effects.

All original default visual effects are retained, including 4× MSAA, 4096 shadow
maps, ink, both lens blur stages, bloom and grade. Grain remains off as before.
Optional Kenney models are missing and generate 404s; no full visual parity claim.
Crossfade-heavy full-minute memory lifetime has not been profiled. The new QA
streams decoded frames rather than retaining the whole video in floating arrays.

The GitHub Actions workflow is a second, clean-runner verification and downloadable
artifact route. Its result and URL will be recorded after the PR run completes.
No external paid services, credentials or storage buckets were introduced.
