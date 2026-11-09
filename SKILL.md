---
name: codex-animated-shorts
description: Plan, build, preview, and render original 9:16 animated story shorts using Codex, Remotion, Three.js, expressive flat cartoon characters, painted 3D environments, camera moves, narration, music, and sound effects. Use for funny history, science, Nigerian stories or political satire, educational explainers, and requests for the 2D-in-3D cartoon-short look. Invoke as $codex-animated-shorts.
---

# Codex Animated Shorts

Create original, visually readable cartoon stories. Use the supplied bridge source as an editable technical starting point, **not** as a ready-made general video generator. The original bridge timeline, costumes, geography, voices, and soundtrack must be replaced for unrelated stories.

## Resource map

Resolve the skill directory from this SKILL.md file, not from the user's working directory:

- templates/bridge/ — original 1831 bridge composition: camera/story, scene, 2D billboards, shading, ink, blur, grade.
- templates/remotion/ — standalone bridge composition entry and registration for a Remotion project.
- scripts/bootstrap-remotion.mjs — non-destructive copy of the template and helpers into an existing Remotion project.
- templates/scripts/ — render stills, QA, contact sheets, bridge-only shot extraction and merge tools.
- templates/audio/ — **bridge-specific** Python sound composition example, not reusable unchanged.
- references/STYLE_BIBLE.md and references/reports/ — optional style measurements and technical look targets.
- references/frames/ and references/sheets/ — third-party visual references for private study only. Never publish, redistribute, or reproduce identifiable reference scenes/characters/scripts.

Read the relevant source files and reports for the part being changed. Do not load the entire reference archive into context.

## Stage 0 — check the environment

1. Check the project's location, existing work, tooling, disk space, and user preferences. Never overwrite existing user files or remove generated assets without permission.
2. Require Node.js/npm, Python 3, and FFmpeg. For the Python sound examples, install NumPy and SciPy in the project's own environment; QA may also require Pillow.
3. If no Remotion project exists, make a new one with:

       npx create-video@latest --yes --blank animated-shorts

4. To introduce the bridge example into an existing Remotion project without replacing its entrypoint, run:

       node <skill-dir>/scripts/bootstrap-remotion.mjs <remotion-project-path>

   This creates src/bridge-entry.ts, src/BridgeRoot.tsx, src/videos/bridge/, and scripts/. It refuses conflicting files.
5. From the Remotion project, install matching Remotion packages and Three.js dependencies:

       npx remotion add @remotion/three @remotion/bundler @remotion/renderer
       npm install three @react-three/fiber @react-three/postprocessing postprocessing
       npm install -D @types/three

   Check peer dependencies and keep all remotion and @remotion/* packages on the same version. Resolve actual compatibility errors rather than forcing conflicting versions.
6. The original loader looks for optional Kenney GLB models under public/bridge/kenney/; those models are **not included**. Provide appropriately licensed assets, replace the props with procedural geometry, or accept a simplified sample. Never claim full visual parity until inspected.
7. Start preview with:

       npx remotion studio src/bridge-entry.ts

   For a quick still, use:

       npx remotion still src/bridge-entry.ts BridgeShort out/bridge-preview.png --frame=90

   A setup is verified only after the project bundles, a still renders, and the image is inspected. If a render cannot run in the current environment, report what was tested and what remains unverified.

## Stage 1 — concept and truth

1. Ask only for the missing essentials: topic, factual versus explicitly fictional satire, duration (default 55–70 seconds), target platform (default 9:16), language/accent, and approval preference.
2. For a true story, research credible sources and record claims with citations in the **project's** SCRIPT.md. Distinguish documented events from disputed anecdotes. Do not invent statistics, dialogue attributed to real people, or political allegations.
3. For satire, clearly label fictional situations and avoid presenting invented actions as authentic footage or quotes of actual politicians. Use original characters and voices; do not clone a real person's voice without authorization.
4. Suggest up to three promising story ideas when the user has not chosen one. Obtain the user's choice before committing to an elaborate animation.

## Stage 2 — script and storyboard gate

1. Write an original hook that lands in the first three seconds, a concise setup, three or four escalating visual beats, a reveal/payoff, and an ending callback. Use humour that arises from the situation, not from unsupported accusations.
2. Target approximately 3.5–4 spoken words per second. Confirm the actual script length against the requested duration.
3. Prepare SCRIPT.md and a shot table: start/end time, narration, action, characters, camera, effect, audio cue, evidence for factual claims. Separate dialogue from narration.
4. Preserve the user's language preferences. Captions, logos, voice timbre, humour intensity, and music style are choices, **not inherited universal rules** from the bridge example.
5. Show the script/storyboard to the user and wait for approval when requested. Do not begin the expensive full render before the agreed review gates.

## Stage 3 — build the animation

1. Copy src/videos/bridge/ to a descriptive new folder such as src/videos/<story-slug>/ and create/register a new composition. Preserve the original bridge example as a baseline.
2. Replace bridge-specific logic in story.ts (shots, cameras, duration, 30 fps timing), build.ts/world.ts (locations and props), toon.ts/cast.ts (original characters and outfits), and Bridge.tsx (composition export and scene). Rename symbols as appropriate. For a different story, do not merely change the narration over bridge visuals.
3. Keep useful reusable effects: painterly two-tone textures, ink on world geometry, character billboards excluded from world ink, camera glides, near-focus blur, bloom, and grade. See references/reports/ for precise visual checks if needed.
4. Build or acquire properly licensed assets, and record attribution. Never copy private study frames into the output. Use deliberate shot composition, readable silhouettes, shadows, and distinct Nigerian architectural/cultural details when the story calls for them.
5. Use deterministic time/frame-based animation. Keep voice word timestamps in voice/words.json when precise synchronization is needed.

## Stage 4 — voice and audio

1. Record or generate an original, authorized voice track. Align word timings and visual reactions within roughly three frames when useful.
2. Adapt the Python examples in templates/audio/ to the **new** shots, runtime, cues, and project paths; their existing event tables and 67.5-second structure are tied to the 1831 bridge. Alternatively build a simpler original soundtrack with lawful assets and FFmpeg.
3. Keep narration intelligible, duck music during speech, avoid clipping, and synchronize sound effects to the rendered action. Produce a mixed WAV before final mux.
4. Do not claim an audio mix was generated simply because example Python files exist.

## Stage 5 — previews and QA

1. Render a few representative stills, including faces, wide views, lighting changes, and action peaks. Inspect them and fix cut-off props, false depth cues, unreadable gestures, harsh clipping, and shots that do not tell the story.
2. The copied scripts/bridge-stills.mjs accepts an output prefix, comma-separated frames and scale; select another entry or composition using REMOTION_ENTRY and REMOTION_COMPOSITION. Set REMOTION_BROWSER_EXECUTABLE only when auto-detection fails. Do not assume Windows paths.
3. Render a short low-resolution video preview. Show or link the actual playable result and summarize known limitations; request approval before the final high-resolution render when that is the user's chosen workflow.
4. Once approved, render the final vertical MP4. For the original example:

       npx remotion render src/bridge-entry.ts BridgeShort out/bridge-video.mp4 --codec h264 --crf 16 --scale 1.3333

   A new story uses its own composition ID and entrypoint. Mux the approved audio with FFmpeg as necessary; check that only the desired tracks are selected.
5. Run frame/audio QA (templates/scripts/short_qa.py as adapted), inspect representative images, confirm duration/resolution/FPS, and check dialogue against the factual script. If any check fails, fix and rerun it.
6. Provide the final MP4 and project files using the available file-delivery mechanism. State truthfully what was rendered, what was inspected, and whether any dependencies or assets were missing.

## Operational safeguards

- Rendering can consume considerable RAM, GPU time and disk. Choose a spacious REMOTION_TMP directory. Do not assume the original author's 1.3 GB public folder is present. Ask before cleaning existing temp directories.
- Use the host's ordinary command and file tools; this skill requires no particular Codex model, special agent type, private paths, or Claude-specific messaging functions.
- The bridge_merge.py and bridge_shots.py helpers assume bridge naming; adapt them before using them for other compositions. Do not use parallel edit/merge workflows unless requested and actually supported.
- Preserve source licenses and separate technical inspiration from copied creative content.
- A skill being installed does **not** mean the user has a complete video-rendering environment. Verify each stage with concrete output.
