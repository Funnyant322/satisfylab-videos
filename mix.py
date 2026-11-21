"""python3 mix.py voice.mp3 frames_dir out.mp4 spec.json
spec: {"duration":53.9, "music":"m3_sparse_piano", "music_vol":0.38, "drone":true, "drone_vol":0.35,
       "quiet":[[22.3,24.3]], "events":[["stinger_low",39.2,0.8],["whoosh",2.4,0.35],...]}
Encodes 1080x1920 30fps H.264 crf17 + AAC 48 kHz 112k, loudness about -15 LUFS, true peak below -1 dBFS."""
import sys,json,subprocess
vo,fr,out,spec=sys.argv[1:5];S=json.load(open(spec));D=S['duration']
subprocess.run(['ffmpeg','-v','error','-y','-i',vo,'-af','loudnorm=I=-18:TP=-3:LRA=11,aresample=48000','-ar','48000','_vo.wav'],check=True)
inp=['-i','_vo.wav','-stream_loop','-1','-i',f"music/{S['music']}.mp3",'-stream_loop','-1','-i','music/bed_drone.mp3']
fl=[];ev=S.get('events',[])
for k,(n,t,v) in enumerate(ev):
    inp+=['-i',f'sfx/{n}.mp3'];fl.append(f"[{k+3}:a]aresample=48000,volume={v},adelay={int(t*1000)}|{int(t*1000)}[e{k}]")
q='+'.join(f"between(t,{a},{b})" for a,b in S.get('quiet',[])) or '0'
fl.append(f"[1:a]aresample=48000,volume={S.get('music_vol',0.38)},volume='if({q},0.15,1)':eval=frame,atrim=0:{D}[mu]")
fl.append(f"[2:a]aresample=48000,volume={S.get('drone_vol',0.35) if S.get('drone',True) else 0},atrim=0:{D}[bd]")
fl.append("[mu][bd]amix=inputs=2:normalize=0[music]");fl.append("[0:a]asplit=2[v1][v2]")
fl.append("[music][v2]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[duck]")
fl.append("[v1][duck]"+''.join(f"[e{k}]" for k in range(len(ev)))+f"amix=inputs={len(ev)+2}:normalize=0,atrim=0:{D},loudnorm=I=-12:TP=-2.2:LRA=11,alimiter=limit=0.74:level=0,volume=0.8dB,aresample=48000[a]")
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-filter_complex',';'.join(fl),'-map','[a]','-ar','48000','_mix.wav'],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-framerate','30','-i',f'{fr}/%05d.jpg','-i','_mix.wav','-c:v','libx264','-preset','veryfast','-crf','17','-tune','animation','-pix_fmt','yuv420p','-c:a','aac','-ar','48000','-b:a','112k','-shortest','-movflags','+faststart',out],check=True)
r=subprocess.run(['ffmpeg','-i',out,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
print('\n'.join(l for l in r.splitlines()[-12:] if 'I:' in l or 'Peak:' in l))
