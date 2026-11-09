# Codex Animated Shorts

An independent Codex adaptation of [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts). It guides Codex through researching, scripting, building, reviewing, and rendering original animated story shorts with flat 2D cartoon characters in a stylized 3D world.

Built around Three.js, React Three Fiber, and [Remotion](https://www.remotion.dev/). No AI video generation service is required; rendering happens on a machine with the necessary dependencies.

**This is a Codex skill and a reusable source template, not a one-click video generator.** The 1831 bridge example has story-specific code and audio. New topics require new animation work.

## Install the Codex skill

Requires Git and Codex. Put the repository directly under your personal Codex skills directory:

macOS / Linux:

    mkdir -p ~/.agents/skills
    git clone https://github.com/ometere123/codex-animated-shorts.git ~/.agents/skills/codex-animated-shorts

Windows PowerShell:

    New-Item -ItemType Directory -Force "$HOME/.agents/skills"
    git clone https://github.com/ometere123/codex-animated-shorts.git "$HOME/.agents/skills/codex-animated-shorts"

Alternatively, clone it under a project's .agents/skills/codex-animated-shorts/ directory to make it project-scoped. Its entry point is the root SKILL.md; the matching skill name is **codex-animated-shorts**.

Invoke in Codex:

> Use $codex-animated-shorts to research three funny, verified moments in Nigerian political history. Let me choose one, then draft a 60-second script and storyboard. Wait for approval before rendering a preview.

## First project: bootstrap the bridge example

Install Node.js, npm, Python 3, and FFmpeg first. Have enough disk space for a 3D Remotion render.

1. Create a blank Remotion project:

       npx create-video@latest --yes --blank animated-shorts
       cd animated-shorts

2. Run the skill's non-destructive setup helper, replacing SKILL_DIR with the directory where you installed this repository:

       node SKILL_DIR/scripts/bootstrap-remotion.mjs .

   This copies the bridge code into src/videos/bridge/, adds a separate src/bridge-entry.ts and src/BridgeRoot.tsx, and copies the rendering/QA helpers to scripts/. It never overwrites conflicting existing files. Running it twice is safe when files have not been modified.

3. Install the required packages from inside the Remotion project:

       npx remotion add @remotion/three @remotion/bundler @remotion/renderer
       npm install three @react-three/fiber @react-three/postprocessing postprocessing
       npm install -D @types/three

   Remotion package versions should match. Use a compatible Node.js release and resolve any peer dependency conflicts.

4. Try the composition:

       npx remotion studio src/bridge-entry.ts
       npx remotion still src/bridge-entry.ts BridgeShort out/bridge-preview.png --frame=90

   For automated JPEG stills:

       node scripts/bridge-stills.mjs out/bridge/frame- 90,240,600 0.5

5. Ask Codex to inspect the rendered sample, fix any compatibility problems, and create your own story-specific composition. For final output, render that new composition ID, add the original or appropriately licensed voice/music/SFX, and perform QA.

### Known limitations

- The original example optionally loads Kenney 3D models from public/bridge/kenney/. Those GLB assets are **not in this repository**; missing files are skipped, but the example will not fully match the author's original scene. Add properly licensed models or procedural replacements.
- The Python files under templates/audio/ are specific to the original 67.5-second bridge story. They must be adapted to a new script, timestamps, duration, and cue sheet. Install NumPy/SciPy if using them.
- The original render helper assumed a Windows Chrome executable. The Codex fork allows Chromium auto-detection and accepts REMOTION_BROWSER_EXECUTABLE when needed.
- A full preview or final MP4 is not guaranteed until dependencies, assets, and rendering have been verified on your machine. The skill separates script approval, preview approval, and final rendering.
- Reference frames and contact sheets are supplied for **private style analysis only**. Do not republish or trace those frames, characters, scripts, or shots.

## Repository contents

| Location | Purpose |
|---|---|
| SKILL.md | Codex workflow, safety/approval gates, setup, and QA |
| agents/openai.yaml | Codex skill display name and starter prompt |
| scripts/bootstrap-remotion.mjs | Safe example integration into a Remotion project |
| templates/remotion/ | Standalone example composition registration |
| templates/bridge/ | Original bridge 2D/3D scene, characters, camera, and effects |
| templates/scripts/ | Stills, QA, source utilities (some bridge-specific) |
| templates/audio/ | Original bridge-specific synthesized audio workflow |
| references/STYLE_BIBLE.md | Format and storytelling observations |
| references/reports/ | Technical visual measurements |
| references/frames/, references/sheets/ | Private visual study materials |

## Credits and license

Based on the MIT-licensed source by [mromidev](https://github.com/mromidev/claude-animated-shorts), with Codex-oriented workflows, project bootstrap, portable still rendering, and documentation added in this fork. The code/documentation remain under the repository's MIT [LICENSE](LICENSE); the reference media are for study only.
