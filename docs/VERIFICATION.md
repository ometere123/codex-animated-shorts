# Verification — 2026-11-09

Tested on the attached managed cloud executor, not a personal computer.
Baseline commit: f6fdfc6f5f043f1ce8e5ce8be075dfe4bdabe225.

| Check | Observed result |
|---|---|
| Repository skill discovery | Codex app-server skills/list returns codex-animated-shorts, scope repo, enabled true, no discovery errors |
| ANGLE comparison | Plain angle mode could not create WebGL2; swangle succeeded |
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

Independent clean-runner verification:
https://github.com/ometere123/codex-animated-shorts/actions/runs/42613944538

- Setup, strict compilation/tests, integrated render/audio/media/streaming QA,
  and upload-artifact steps all **passed** on Ubuntu 24.04 with Node 22/Python 3.12.
- Renderer elapsed time: **562.34 seconds**, concurrency 1, swangle, 360×640,
  120 frames. Original effects retained. Same media specs and cue timing as above.
- Artifact **animated-shorts-preview**, ID **13671953497**, ZIP **4,561,923 bytes**,
  expires **2026-11-16 12:14:33 UTC**.
- Downloaded through the connected GitHub artifact tool, unpacked and independently
  decoded/verified the MP4; inspected its frame. The ordinary gh redirect download
  returned 403 in this cloud environment; the connector download worked. Use the
  GitHub artifact page in an authenticated phone browser for the reusable route.
- Downloaded video SHA-256:
  `f8da1a5e7b21222ede42455d5845497acb154b02d3b0b370b673aeb814cfd752`.
- The overall run was marked failed **after** successful rendering/upload because
  setup-python's post-job cache looked for ~/.cache/pip while setup used .cache/pip.
  The workflow now explicitly shares PIP_CACHE_DIR and NPM_CONFIG_CACHE with the
  setup script. The final complete run below verified cache saving as well as rendering.

Two earlier clean-runner attempts failed at Chromium launch: the deeply nested
checkout made Chromium's Unix socket path exceed its length limit. The renderer
now uses a short owned `/tmp/cas-*` scratch directory (REMOTION_TMP_BASE override).
The completed clean-runner render above proves that fix. No visual effects were
removed. No external paid services, credentials or storage buckets were introduced.

## Final complete workflow result

**PASS** — https://github.com/ometere123/codex-animated-shorts/actions/runs/42615622206

Tested runtime/workflow commit: `8db7273c1c41d4814b7d50a39b32c9169bca1588`.
Every step passed, including npm and pip cache saving. Total job time **6m57s**;
the integrated render/probe/audio/QA runner took **361.504s**. Output remains
360×640, 30 fps, 120 frames, 4.000000s H.264/AAC. All eight encoded cue peak offsets
are +0.000604167s. Streaming QA reported no black/white/frozen/spike failures.

Download: https://github.com/ometere123/codex-animated-shorts/actions/runs/42615622206/artifacts/13672164272

Artifact ID **13672164272**, ZIP **4,561,922 bytes**, expires
**2026-11-16 12:23:15 UTC**. Downloaded the final artifact through the connector,
unpacked it, and independently repeated FFprobe assertions and full FFmpeg decode.
Its video SHA-256 is identical to the previous clean-runner output:
`f8da1a5e7b21222ede42455d5845497acb154b02d3b0b370b673aeb814cfd752`.
The code changes are verified; subsequent report-only commits do not change the
rendering pipeline. No remaining blocker for this four-second cloud preview.
Full-minute/2K performance, production assets/narration and actual iPhone UI
interaction remain outside this technical test's evidence.
