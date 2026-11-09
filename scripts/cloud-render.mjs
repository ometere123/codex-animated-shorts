// Reproducible technical smoke test. This is not a story or final-render approval.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync} from 'node:child_process';
import {probeWebGL} from './webgl-probe.mjs';
import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill, renderMedia} from '@remotion/renderer';
const startedAt = Date.now();
const width = Number(process.env.PREVIEW_WIDTH || 360);
if (![360,540,1080,1440].includes(width)) throw new Error('PREVIEW_WIDTH must be 360, 540, 1080 or 1440');
const height = width * 16 / 9;
const out = path.resolve(process.env.OUTPUT_DIR || 'out/cloud-smoke');
fs.mkdirSync(out, {recursive:true});
// Chromium uses Unix sockets with a ~108-byte path limit; deep checkout paths fail.
const tempRoot = path.resolve(process.env.REMOTION_TMP_BASE || (process.platform === 'win32' ? os.tmpdir() : '/tmp'));
if (Buffer.byteLength(tempRoot) > 50) throw new Error('REMOTION_TMP_BASE must be a short path (50 bytes or fewer) for Chromium sockets');
fs.mkdirSync(tempRoot,{recursive:true});
const scratch = fs.mkdtempSync(path.join(tempRoot,'cas-'));
process.env.TMPDIR = process.env.TEMP = process.env.TMP = scratch;
let browser;
let stopping = false;
const stop = async (signal) => {
 if (stopping) return;
 stopping = true;
 if (browser) await browser.close({silent:true}).catch(()=>{});
 fs.rmSync(scratch,{recursive:true,force:true});
 process.exit(signal === 'SIGINT' ? 130 : 143);
};
process.once('SIGINT',()=>void stop('SIGINT'));
process.once('SIGTERM',()=>void stop('SIGTERM'));
try {
 const serveUrl = await bundle({entryPoint:path.resolve('src/bridge-entry.ts'), publicDir:path.resolve('public'),outDir:path.join(scratch,'bundle')});
 const chromiumOptions = {gl:process.env.REMOTION_GL || 'swangle'};
 const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
 browser = await openBrowser('chrome',{browserExecutable,chromiumOptions});
 const webgl = await probeWebGL(browser);
 fs.writeFileSync(path.join(out,'webgl.json'),JSON.stringify(webgl,null,2));
 console.log('WEBGL',webgl);
 const compositions = await getCompositions(serveUrl,{puppeteerInstance:browser,chromiumOptions});
 fs.writeFileSync(path.join(out,'compositions.json'),JSON.stringify(compositions,null,2));
 const base = compositions.find(c=>c.id==='BridgeShort');
 if (!base) throw new Error('BridgeShort not discovered');
 const composition = {...base,width,height};
 const options = {serveUrl,composition,puppeteerInstance:browser,chromiumOptions,timeoutInMilliseconds:180000,
 onBrowserLog:l=>{if(l.type==='error'||l.type==='warning') console.log(l.type,l.text.slice(0,500));}};
 await renderStill({...options,frame:90,output:path.join(out,'frame.png')});
 console.log('STILL OK');
 await renderMedia({...options,codec:'h264',pixelFormat:'yuv420p',concurrency:1,frameRange:[0,119],crf:20,
 outputLocation:path.join(out,'silent.mp4'),onProgress:p=>{if(p.renderedFrames%15===0) console.log('frames',p.renderedFrames);}});
 execFileSync('python3',['scripts/smoke-audio.py',path.join(out,'audio.wav')],{stdio:'inherit'});
 execFileSync('ffmpeg',['-v','error','-y','-i',path.join(out,'silent.mp4'),'-i',path.join(out,'audio.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart','-t','4',path.join(out,'preview.mp4')],{stdio:'inherit'});
 execFileSync('python3',['scripts/verify-media.py',path.join(out,'preview.mp4'),String(width),String(height)],{stdio:'inherit'});
 execFileSync('python3',['scripts/short_qa.py',path.join(out,'preview.mp4'),path.join(out,'qa')],{stdio:'inherit'});
 fs.writeFileSync(path.join(out,'run.json'),JSON.stringify({elapsedSeconds:(Date.now()-startedAt)/1000,width,height,frames:120,concurrency:1,gl:chromiumOptions.gl,effects:'original defaults retained',audio:'synthetic timing cue, no narration'},null,2));
 console.log('PASS',out);
} finally {
 if(browser) await browser.close({silent:true});
 fs.rmSync(scratch,{recursive:true,force:true});
}
