"""python3 make_stems.py silent.mp4 spec.json out_stems.mp4  -> video + track1 music bed (music+drone, quiet dips, not ducked) + track2 all sfx (48 kHz).
For runs that can't download the voice: the sandbox then adds the voice, ducks track 1 under it and mixes (see bible LEARNINGS)."""
import sys,json,subprocess
sv,spec,out=sys.argv[1:4];S=json.load(open(spec));D=S['duration']
inp=['-i',sv,'-stream_loop','-1','-i',f"music/{S['music']}.mp3",'-stream_loop','-1','-i','music/bed_drone.mp3'];fl=[];ev=S['events']
for k,(n,t,v) in enumerate(ev):
    inp+=['-i',f'sfx/{n}.mp3'];fl.append(f"[{k+3}:a]aresample=48000,aformat=channel_layouts=stereo,volume={v},adelay={int(t*1000)}|{int(t*1000)}[e{k}]")
q='+'.join(f"between(t,{a},{b})" for a,b in S.get('quiet',[])) or '0'
fl.append(f"[1:a]aresample=48000,aformat=channel_layouts=stereo,volume={S['music_vol']},volume='if({q},0.15,1)':eval=frame,atrim=0:{D}[mu]")
fl.append(f"[2:a]aresample=48000,aformat=channel_layouts=stereo,volume={S['drone_vol']},volume='if({q},0.4,1)':eval=frame,atrim=0:{D}[bd]")
fl.append("[mu][bd]amix=inputs=2:normalize=0,apad,atrim=0:%s[bed]"%D)
fl.append(''.join(f"[e{k}]" for k in range(len(ev)))+f"amix=inputs={len(ev)}:normalize=0,apad,atrim=0:{D}[fx]")
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-filter_complex',';'.join(fl),'-map','0:v','-map','[bed]','-map','[fx]','-c:v','copy','-c:a','pcm_s16le','-ar','48000','-t',str(D),out.replace('.mp4','.mov')],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',out.replace('.mp4','.mov'),'-map','0','-c:v','copy','-c:a','aac','-b:a','256k','-ar','48000',out],check=True)
