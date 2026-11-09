import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('repository discovery entry stays synchronized with distribution skill',()=>{
 const canonical=fs.readFileSync('.agents/skills/codex-animated-shorts/SKILL.md','utf8');
 assert.equal(canonical,fs.readFileSync('SKILL.md','utf8'));
 assert.match(canonical,/name: codex-animated-shorts/);
 assert.match(canonical,/Always wait for approval/);
});
