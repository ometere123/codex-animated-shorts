import fs from 'node:fs';
import {openBrowser} from '@remotion/renderer';
export async function probeWebGL(browser) {
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 try {return await page.evaluate(()=>{
  const gl=document.createElement('canvas').getContext('webgl2');
  if(!gl) throw new Error('WebGL2 unavailable');
  const ext=gl.getExtension('WEBGL_debug_renderer_info');
  return {version:gl.getParameter(gl.VERSION),renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),maxTextureSize:gl.getParameter(gl.MAX_TEXTURE_SIZE)};
 });} finally {await page.close();}
}
if(process.argv[1]?.endsWith('webgl-probe.mjs')) {
 const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE || (fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),chromiumOptions:{gl:process.env.REMOTION_GL || 'swangle'}});
 try {console.log(JSON.stringify(await probeWebGL(browser),null,2));}finally{await browser.close({silent:true});}
}
