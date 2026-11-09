# Codex Animated Shorts

An independent Codex adaptation of
[mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts),
using Three.js, React Three Fiber and Remotion for expressive 2D cartoon characters
in stylized 3D environments. Research, scripting, narration, music, sound effects,
review and rendering are separate production stages.

**A source template and skill, not a one-click story generator.** New stories need
original scripts, characters, environments and audio. The included bridge example
is a technical baseline; optional Kenney models and its narration are not bundled.

## Use from your phone in Codex Cloud

1. Select this repository and the environment described in [docs/CLOUD.md](docs/CLOUD.md).
2. Set its setup script to `bash scripts/cloud-setup.sh`.
3. Start a fresh task and invoke `$codex-animated-shorts`.

The actual discovery entry is
[.agents/skills/codex-animated-shorts/SKILL.md](.agents/skills/codex-animated-shorts/SKILL.md).
It is committed with the repository: no installation on a personal computer is
needed. Root SKILL.md is a synchronized distribution copy. Keep the repository
layout when using the scoped entry; its resources resolve to this checkout.

Example prompt:

> Use $codex-animated-shorts to research three funny, verified moments in Nigerian
> political history. Let me choose one, then draft a 60-second script and
> storyboard. Wait for approval of the script and playable preview before final
> rendering. Use original characters and lawful audio.

## Reproducible technical test

With Node 22/24, Python 3.12+, FFmpeg and Chromium/rendering libraries available:

```bash
bash scripts/cloud-setup.sh
PATH="$PWD/.venv/bin:$PATH" npm run cloud:verify
```

This installs locked npm dependencies and pinned Python audio libraries, bootstraps
the source template without overwriting changes, compiles TypeScript, runs tests,
bundles/discovers BridgeShort, renders a real frame and 4-second 360×640 H.264
animation, synthesizes/muxes audio, and asserts FFprobe specs, decoding and cue
timing. Outputs stay in ignored `out/cloud-smoke/`. `PREVIEW_WIDTH=540` selects
540×960 without changing final composition size. Software WebGL and one worker
are defaults. No visual effects are disabled to pass the test.

See [exact verification results](docs/VERIFICATION.md), [audit](docs/AUDIT.md), and
[cloud settings, delivery and production instructions](docs/CLOUD.md). A smoke test
is not proof of full-minute 2K performance or narration synchronization. In a
restricted command sandbox Chromium may require the supported approval path.

## Export into another Remotion project

```bash
node /path/to/this-repository/scripts/bootstrap-remotion.mjs /path/to/project
```

The target must already have package.json. The helper copies bridge source, a
separate entry/root, render/QA helpers, and audio examples. It never overwrites
conflicting files. Install the compatible versions listed in this repository's
package.json; all Remotion packages must match. To preview:

```bash
npx remotion studio src/bridge-entry.ts
npx remotion still src/bridge-entry.ts BridgeShort out/frame.png --frame=90
```

The optional assets are expected at `public/bridge/kenney/`; missing models are
skipped and full visual parity is not guaranteed. The Python mixer expects
`voice/voice.wav` and `voice/words.json` and must be adapted from its bridge-specific
67.5-second timeline. No narration service is configured. Authorized recordings
uploaded from your phone are a supported input route.

## Contents

| Location | Purpose |
|---|---|
| `.agents/skills/codex-animated-shorts/` | Repository-scoped skill and metadata |
| `templates/bridge/` | Source for scene, cast, cameras, shaders and post effects |
| `templates/remotion/` | Standalone registration |
| `templates/audio/` | Bridge-specific synthesis and mixing examples |
| `templates/scripts/` | Stills, streaming QA, source utilities |
| `scripts/cloud-setup.sh` | Repeatable dependency and source setup |
| `scripts/cloud-render.mjs` | Four-second render/audio verification |
| `.github/workflows/cloud-preview.yml` | Manual cloud test with downloadable artifact |
| `references/` | Style measurements and private visual study materials |
| `docs/` | Environment, delivery, audit and verified limits |

Media/cache/venv/generated baseline copies are ignored. Keep new story source and
research in Git, and downloadable video artifacts outside Git. Research, story
selection, script/storyboard, playable preview and final QA remain explicit stages;
story, script and preview approvals are mandatory.

## Credits and license

Based on the MIT-licensed source by [mromidev](https://github.com/mromidev/claude-animated-shorts).
Code/documentation remain under [MIT](LICENSE). Reference frames/contact sheets
are for private study only: do not republish, trace, or reproduce identifiable
reference scripts, characters or scenes. No reference images are used in renders.
Remotion has its own license terms; review them for your organization/use.
