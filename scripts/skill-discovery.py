"""Optional local Codex app-server probe. Does not start a model turn.
Requires a Codex runtime whose state directory is writable. stdout contains only
this repository skill's metadata; no credentials are read or printed.
"""
import json, os, pathlib, select, subprocess, time
root = pathlib.Path(__file__).resolve().parents[1]
p = subprocess.Popen(['codex','app-server','--listen','stdio://'],stdin=subprocess.PIPE,stdout=subprocess.PIPE,text=True,bufsize=1,cwd=root,env={**os.environ,'RUST_LOG':'error'})
def send(value):
    p.stdin.write(json.dumps(value)+'\n'); p.stdin.flush()
try:
    send({'id':1,'method':'initialize','params':{'clientInfo':{'name':'animated-shorts-skill-probe','version':'1.0.0'}}})
    deadline=time.monotonic()+30
    while time.monotonic()<deadline:
        if not select.select([p.stdout],[],[],1)[0]:
            continue
        line=p.stdout.readline()
        if not line:
            raise RuntimeError('Codex app-server exited before skill discovery')
        result=json.loads(line)
        if result.get('id')==1:
            if 'error' in result:
                raise RuntimeError(result['error'])
            send({'method':'initialized'})
            send({'id':2,'method':'skills/list','params':{'cwds':[str(root)],'forceReload':True}})
        if result.get('id')==2:
            entries=result['result']['data']
            skill=next(s for entry in entries for s in entry['skills'] if s['name']=='codex-animated-shorts')
            assert skill['scope']=='repo' and skill['enabled']
            print(json.dumps(skill,indent=2)); break
    else:
        raise TimeoutError('Skill discovery did not respond within 30 seconds')
finally:
    p.terminate()
    try: p.wait(timeout=5)
    except subprocess.TimeoutExpired:
        p.kill(); p.wait()
