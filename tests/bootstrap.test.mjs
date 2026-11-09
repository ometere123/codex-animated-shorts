import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bootstrap = path.join(root, "scripts/bootstrap-remotion.mjs");

test("scaffolds, repeats safely, and refuses to overwrite changes", (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "codex-shorts-test-"));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  fs.writeFileSync(path.join(target, "package.json"), '{"name":"video-test","private":true}\n');

  const run = () => spawnSync(process.execPath, [bootstrap, target], { encoding: "utf8" });
  const first = run();
  assert.equal(first.status, 0, first.stderr);
  assert.ok(fs.existsSync(path.join(target, "src/videos/bridge/Bridge.tsx")));
  assert.ok(fs.existsSync(path.join(target, "src/BridgeRoot.tsx")));
  assert.ok(fs.existsSync(path.join(target, "src/bridge-entry.ts")));
  assert.ok(fs.existsSync(path.join(target, "scripts/bridge-stills.mjs")));

  const second = run();
  assert.equal(second.status, 0, second.stderr);
  assert.match(second.stdout, /Copied 0 new files/);

  const edited = path.join(target, "src/bridge-entry.ts");
  fs.appendFileSync(edited, "// user's change\n");
  const third = run();
  assert.equal(third.status, 1);
  assert.match(third.stderr, /Refusing to overwrite/);
  assert.match(fs.readFileSync(edited, "utf8"), /user's change/);
});

test("rejects targets without a package.json", (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "codex-shorts-empty-"));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const run = spawnSync(process.execPath, [bootstrap, target], { encoding: "utf8" });
  assert.equal(run.status, 2);
  assert.match(run.stderr, /package.json/);
});
