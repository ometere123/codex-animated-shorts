#!/usr/bin/env node
/**
 * Copy the reusable BridgeShort example into an existing Remotion project.
 * Does not install packages or overwrite user files.
 *
 * Usage: node scripts/bootstrap-remotion.mjs /path/to/remotion-project
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
if (args.includes("--help") || args.length !== 1) {
  console.log("Usage: node scripts/bootstrap-remotion.mjs <existing-remotion-project>");
  process.exit(args.includes("--help") ? 0 : 2);
}

const projectRoot = path.resolve(args[0]);
if (!fs.existsSync(path.join(projectRoot, "package.json"))) {
  console.error("Target must already be a Remotion project with package.json.");
  console.error("Create one first: npx create-video@latest --yes --blank animated-shorts");
  process.exit(2);
}

const mappings = [
  ["templates/bridge", "src/videos/bridge"],
  ["templates/scripts", "scripts"],
  ["templates/remotion/bridge-entry.ts", "src/bridge-entry.ts"],
  ["templates/remotion/BridgeRoot.tsx", "src/BridgeRoot.tsx"],
];
const copies = [];
function queueFiles(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(source)) {
      queueFiles(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  if (fs.existsSync(target)) {
    if (!fs.statSync(target).isFile() ||
        !fs.readFileSync(source).equals(fs.readFileSync(target))) {
      throw new Error("Refusing to overwrite an existing file: " + target);
    }
    return;
  }
  copies.push([source, target]);
}

try {
  for (const [from, to] of mappings) {
    queueFiles(path.join(skillRoot, from), path.join(projectRoot, to));
  }
  for (const [from, to] of copies) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  console.log("BridgeShort scaffold ready: " + projectRoot);
  console.log("Copied " + copies.length + " new files; existing identical files left untouched.");
  console.log("Install dependencies as described in the skill README.");
  console.log("Preview: npx remotion studio src/bridge-entry.ts");
  console.log("Still:   npx remotion still src/bridge-entry.ts BridgeShort out/bridge.jpg --frame=90");
  if (!fs.existsSync(path.join(projectRoot, "public/bridge/kenney"))) {
    console.warn("Optional Kenney GLB assets are NOT bundled. The loader skips missing models;");
    console.warn("supply properly licensed models or replace them with generated geometry.");
  }
  console.log("The bundled soundtrack is specific to the 1831 bridge story; adapt it for new videos.");
} catch (error) {
  console.error(String(error?.message ?? error));
  process.exit(1);
}
