import json, subprocess, sys
import numpy as np
p, width, height = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
r = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',p]))
v = next(s for s in r['streams'] if s['codec_type']=='video')
a = next(s for s in r['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames'])) == (width,height,'30/1',120)
assert v['codec_name']=='h264' and a['codec_name']=='aac'
assert abs(float(r['format']['duration'])-4)<0.05
assert abs(float(v['duration'])-float(a['duration']))<1/30
assert abs(float(a.get('start_time',0))-float(v.get('start_time',0)))<1/30
subprocess.run(['ffmpeg','-v','error','-xerror','-i',p,'-f','null','-'],check=True)
raw = subprocess.check_output(['ffmpeg','-v','error','-i',p,'-map','0:a:0','-ac','1','-ar','48000','-f','f32le','-'])
x = np.frombuffer(raw,'<f4')
# Verify decoded cue attacks remain on the intended 0.5-second timeline within 1 frame.
errors=[]
for t in np.arange(0,4,0.5):
    start = max(0, round((t-0.04)*48000)); end = min(len(x),round((t+0.08)*48000))
    peak = start+np.argmax(np.abs(x[start:end])); errors.append(float(peak/48000-t))
assert max(abs(e) for e in errors)<1/30, errors
report={'width':width,'height':height,'fps':v['r_frame_rate'],'frames':v['nb_frames'],'duration':r['format']['duration'],'video':v['codec_name'],'audio':a['codec_name'],'audio_duration':a['duration'],'cue_peak_offsets_seconds':errors,'decode':'passed'}
open(p+'.json','w').write(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
