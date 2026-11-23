# chains.mp3: metal chain rattle (random short metallic clinks, decaying partials) — added 24 Nov (Bunker Part 5)
import numpy as np,wave,subprocess
SR=48000;rng=np.random.default_rng(11);D=1.6;n=int(SR*D);y=np.zeros(n)
for i in range(46):
    t0=rng.uniform(0,D-0.15)*(0.6+0.4*rng.random());i0=int(t0*SR);L=int(0.12*SR);k=np.arange(L)/SR
    f=rng.uniform(1800,5200);s=sum(np.sin(2*np.pi*f*r*k+rng.uniform(0,6))*a for r,a in((1,1),(1.52,0.6),(2.31,0.4),(3.7,0.25)))
    s=s*np.exp(-k*rng.uniform(35,70))*rng.uniform(0.3,1)+rng.normal(0,1,L)*np.exp(-k*300)*0.3
    y[i0:i0+L]+=s[:max(0,min(L,n-i0))]
y*=np.minimum(1,np.arange(n)/(0.02*SR))*np.exp(-np.arange(n)/SR*0.9)
y=y/np.max(np.abs(y))*0.9;w=wave.open('sfx/chains.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
subprocess.run(['ffmpeg','-v','error','-y','-i','sfx/chains.wav','-b:a','160k','sfx/chains.mp3']);subprocess.run(['rm','sfx/chains.wav'])
