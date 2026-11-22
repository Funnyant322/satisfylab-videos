import numpy as np,wave,subprocess
SR=48000;rng=np.random.default_rng(7)
def save(n,x):
    x=x/(np.max(np.abs(x))+1e-9)*0.9;w=wave.open(f'sfx/{n}.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype(np.int16).tobytes());w.close()
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'sfx/{n}.wav','-b:a','160k',f'sfx/{n}.mp3']);subprocess.run(['rm',f'sfx/{n}.wav'])
# scrape: three slow nail/metal scrapes (band noise with a wobbling resonance), 2.6 s
t=np.arange(int(SR*2.6))/SR;out=np.zeros_like(t)
for o in (0.0,0.85,1.7):
    n=int(0.75*SR);kk=np.arange(n)/SR;env=np.sin(np.pi*kk/0.75)**1.5
    nz=rng.normal(0,1,n);f=900+500*np.sin(2*np.pi*3*kk)+rng.normal(0,30,n).cumsum()*0.02
    ph=2*np.pi*np.cumsum(f)/SR;tone=np.sin(ph)*0.5+np.sin(ph*2.01)*0.25
    gr=(np.sin(2*np.pi*38*kk)>0.3)*1.0*0.6+0.4
    i=int(o*SR);out[i:i+n]+=(nz*0.5*np.abs(tone)+tone*0.4)*env*gr
save('scrape',out)
