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
| Four-second MP4 | PASS: 360×640, 30/1 fps, 120 frames, H.264/yuv420p, 4.000000s |
| Audio mux and timing | AAC, 48 kHz stereo, 4.000000s; identical audio/video start times; all eight cue peak offsets +0.000604167s |
| Playback validity | FFmpeg full decode with -xerror passed |
| Streaming frame QA | 120 frames; no black, white, frozen spans ≥12 frames or unplanned spikes; no held frames |
| Inspected motion | Contact sheet at frames 0, 60 and 119 shows wide-to-close camera movement and marching |
| Temporary cleanup | .tmp empty after successful render |
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

The local cloud run finished at 12:01 UTC. Bundled composition metadata was written
at 11:52:39 and completed MP4 at 12:01:30 (about nine minutes including the still,
software shader compilation and rendering). Container-wide peak memory during
setup/render was approximately 3.09 GiB; this includes concurrent verification
processes, not an isolated Remotion benchmark. Video SHA-256:
`8f88a322af9d14e2827c26249ceafb5ab2f7fd44db8161e97a1ab80aaeb1eb67`.

The test soundtrack is a deliberate quiet pulse clock: -28.3 LUFS integrated,
peak -12.2 dBFS, with intentional silence between cues. It is not a final music or
narration mix. Encoded timing accuracy does not prove lip sync or speech quality.
The inspected close view at frame 119 crops the foreground hats; this is part of
the supplied camera move, not proof that all shots meet production framing QA.

The first render used the runner before its WebGL metadata and streaming-QA calls
were integrated. The same WebGL probe, media verifier and updated QA were then
executed independently against the actual output. The PR workflow runs the
integrated runner on a clean Linux host.

The GitHub Actions workflow is a second, clean-runner verification and downloadable
artifact route: https://github.com/ometere123/codex-animated-shorts/actions/runs/42613629580
Its result and artifact URL will be recorded after the PR run completes.
No external paid services, credentials or storage buckets were introduced.
