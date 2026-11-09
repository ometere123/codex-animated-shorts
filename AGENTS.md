# Repository work

The repository-scoped animation skill is `.agents/skills/codex-animated-shorts/SKILL.md`.
Read it when invoked with `$codex-animated-shorts`. Its resource paths resolve from
this repository root. Keep root SKILL.md and the discovery copy synchronized.

Run `bash scripts/cloud-setup.sh`; then `PATH="$PWD/.venv/bin:$PATH" npm run cloud:verify`.
See docs/CLOUD.md for persistent environment settings, rendering restrictions,
phone delivery and production gates. Do not treat generated `src/videos/bridge`
or `audio/` copies as canonical: edit templates first, update an unchanged generated
copy deliberately, and verify bootstrap remains non-destructive. New production
compositions and research belong in Git; generated media belong in ignored out/.
Never render a full story until story, script/storyboard and playable-preview
approval are recorded. Technical smoke tests do not grant those approvals.
