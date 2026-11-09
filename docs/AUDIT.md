# Audit and scope

Baseline: f6fdfc6f5f043f1ce8e5ce8be075dfe4bdabe225.

- The original repo had no package manifest, lockfile, tsconfig or runnable project.
  Added a pinned standalone runtime and non-destructive bootstrap. All Remotion
  packages use 4.0.373; React 19.1, Fiber 9.1.2, Three 0.177 and postprocessing
  6.37.4 install without forced peer overrides. The lockfile pins transitives.
- The root SKILL.md alone was not repository-scoped discovery. Added a real
  `.agents/skills/codex-animated-shorts/SKILL.md`, metadata and a sync check.
- Read SKILL.md/README, bootstrap/tests, composition, scene/effect integration,
  asset loading, helper scripts, audio mixer/timeline and style/report context.
  The reference reports contain historical measurements and embedded experiments;
  their assertions are not evidence that this checkout rendered successfully.
  Reference JPGs are third-party study material, not production assets.
- Existing optional `public/bridge/kenney/*.glb` models are absent: 26 names,
  including trees, stalls, cart, windmill, canoe and plants. The existing loader
  catches individual failures and skips those props. Render logs disclose 404s.
  No external models were acquired; no full-scene parity claim is made. Core
  architecture, bridge, painterly textures and original billboard cast are
  procedural. Licensed assets or deliberately designed replacements remain a
  production task. Original reference media have not been copied into output.
- Fixed ThreeCanvas's hard-coded render dimensions to use composition dimensions.
  The default registered final size is still 1080×1920; preview dimensions are a
  renderer override. The original bloom reference-size chain remains intact;
  no blur, outline, shadow, grade or bloom effect was removed for the test.
- Fixed TypeScript compatibility with EffectComposer's non-null children contract
  by constructing a keyed element list; all existing effect switches remain.
- `bridge_merge.py` had `your Remotion project` as its root. It now resolves
  REMOTION_PROJECT or cwd. It is still an opt-in bridge-only source helper.
- Bootstrap previously omitted the audio template. It now copies it to audio/,
  leaving voice/ at project root, matching mix.py's relative path assumptions.
  Full audio synthesis still needs a supplied voice WAV and word timestamps;
  its 67.5-second timeline and event tables require adaptation for each story.
  Historical cues.md is not a freshly generated audio report.
- `sandbox_index_example.tsx` is a historical, context-dependent sandbox entry,
  not a standalone compiler input. The runnable entry and all bridge source are
  included in typecheck after bootstrap. Bridge-specific shot parsing still
  assumes the original story source format. Neither helper is a general editor.
- Original QA loaded every decoded pixel plus multiple floating arrays at once.
  See subsequent memory changes and verification limits; contact sheets and
  numerical flags aid review, not automatic proof of visual/story quality.
- The inner sandbox blocked Chromium launch. Supported escalation runs Chromium
  on the cloud executor successfully. Swangle provides software WebGL. An
  environment that denies outer browser processes needs a different cloud runner.
- Narration generation is not implemented by these source templates. Uploaded
  authorized recordings are supported; no paid TTS, cloud bucket, credentials or
  GPU service was introduced. The technical test synthesizes its own pulse cue
  and verifies encoded timing; this is not speech/lip-sync verification.
- Output/work/cache/venv/generated bootstrap paths are ignored. The renderer
  cleans only its own unique scratch path. Generated copies may not silently
  overwrite edited work; the bootstrap refuses conflicts by design.

No original animation algorithms or reference archive were discarded. Historical
style observations are optional look targets, not universal creative constraints.
- A verification rerun exposed Python bytecode inside template directories after
  compilation. Bootstrap now ignores __pycache__ and .pyc so generated caches
  cannot be copied into another project or cause false overwrite conflicts.
- Stills helper now selects software GL/system Chromium where available, reuses
  a browser, and cleans its owned bundle directory on completion or error.
- React review: hooks remain unconditional, dimensions come from useVideoConfig,
  stable keys preserve effect order, and no effects/character logic were removed.
  This is a video composition; no interactive UI/accessibility changes were made.
