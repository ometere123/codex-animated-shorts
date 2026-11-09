// Usage: node scripts/bridge-stills.mjs <outPrefix> <frame,frame,...> [scale]
// Optional: REMOTION_ENTRY, REMOTION_COMPOSITION, REMOTION_BROWSER_EXECUTABLE, REMOTION_GL, REMOTION_TMP.
import fs from "node:fs";
if (process.env.REMOTION_TMP) { fs.mkdirSync(process.env.REMOTION_TMP, { recursive: true }); process.env.TEMP = process.env.TMP = process.env.REMOTION_TMP; }
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const [prefix, frames, scale = "0.5"] = process.argv.slice(2);
if (!prefix || !frames || !frames.split(",").every((frame) => /^\d+$/.test(frame)) || !(Number(scale) > 0)) {
  console.error("Usage: node scripts/bridge-stills.mjs <outPrefix> <frame,frame,...> [scale]");
  process.exit(2);
}
fs.mkdirSync(path.dirname(path.resolve(prefix)), { recursive: true });
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || undefined;
const chromiumOptions = { gl: process.env.REMOTION_GL || "angle" };
const entryPoint = path.resolve(process.env.REMOTION_ENTRY || process.env.BRIDGE_ENTRY || "src/bridge-entry.ts");
const compositionId = process.env.REMOTION_COMPOSITION || "BridgeShort";
const serveUrl = await bundle({ entryPoint, publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id: compositionId, browserExecutable, chromiumOptions });
const onBrowserLog = (l) => { if (l.type === "error" || l.type === "warning") console.log(`[${l.type}]`, l.text.slice(0, 300)); };
for (const f of frames.split(",").map(Number)) {
  const t0 = Date.now();
  await renderStill({ composition, serveUrl, frame: f, output: `${prefix}${f}.jpg`, imageFormat: "jpeg", jpegQuality: 88, scale: Number(scale),
    browserExecutable, chromiumOptions, timeoutInMilliseconds: 180000, onBrowserLog });
  console.log("still", f, ((Date.now() - t0) / 1000).toFixed(1) + "s");
}
