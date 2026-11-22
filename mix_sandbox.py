"""Variant of mix.py for runs that can't download the voice: runs in the ElevenLabs sandbox.
python3 mix_sandbox.py vo.wav silent.mp4 out.mp4 spec.json   (music/ and sfx/ folders next to it)
Same mix as mix.py, video stream copied from silent.mp4; also prints voice vs. music-bed loudness."""
import sys,json,subprocess
vo,sv,out,spec=sys.argv[1:5];S=json.load(open(spec));D=S['duration']
subprocess.run(['ffmpeg','-v','error','-y','-i',vo,'-af','loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=mono,apad','-t',str(D),'-ar','48000','_vo.wav'],check=True)
inp=['-i','_vo.wav','-stream_loop','-1','-i',f"music/{S['music']}.mp3",'-stream_loop','-1','-i','music/bed_drone.mp3']
fl=[];ev=S.get('events',[])
for k,(n,t,v) in enumerate(ev):
    inp+=['-i',f'sfx/{n}.mp3'];fl.append(f"[{k+3}:a]aresample=48000,volume={v},adelay={int(t*1000)}|{int(t*1000)}[e{k}]")
q='+'.join(f"between(t,{a},{b})" for a,b in S.get('quiet',[])) or '0'
fl.append(f"[1:a]aresample=48000,volume={S.get('music_vol',0.38)},volume='if({q},0.15,1)':eval=frame,atrim=0:{D}[mu]")
fl.append(f"[2:a]aresample=48000,volume={S.get('drone_vol',0.35) if S.get('drone',True) else 0},atrim=0:{D}[bd]")
fl.append("[mu][bd]amix=inputs=2:normalize=0[music]");fl.append("[0:a]asplit=3[v1][v2][v3]")
fl.append("[music][v2]sidechaincompress=threshold=0.012:ratio=12:attack=15:release=350,asplit=2[duck][duck2]")
fl.append("[v1][duck]"+''.join(f"[e{k}]" for k in range(len(ev)))+f"amix=inputs={len(ev)+2}:normalize=0,atrim=0:{D},loudnorm=I=-15:TP=-2.2:LRA=11,alimiter=limit=0.74:level=0,aresample=48000[a]")
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-filter_complex',';'.join(fl),'-map','[a]','-ar','48000','_mix.wav','-map','[v3]','_stem_vo.wav','-map','[duck2]','_stem_mu.wav'],check=True)
for st in ('_stem_vo.wav','_stem_mu.wav'):
    r=subprocess.run(['ffmpeg','-i',st,'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
    print(st,[l.strip() for l in r.splitlines() if l.strip().startswith('I:')][-1])
subprocess.run(['ffmpeg','-v','error','-y','-i',sv,'-i','_mix.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-ar','48000','-b:a','128k','-t',str(D),'-movflags','+faststart',out],check=True)
r=subprocess.run(['ffmpeg','-i',out,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
print('\n'.join(l for l in r.splitlines()[-12:] if 'I:' in l or 'Peak:' in l))
