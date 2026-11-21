import numpy as np,wave,subprocess
SR=48000;rng=np.random.default_rng(3)
def save(n,x):
    x=x/(np.max(np.abs(x))+1e-9)*0.9;w=wave.open(f'sfx/{n}.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype(np.int16).tobytes());w.close()
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'sfx/{n}.wav','-b:a','160k',f'sfx/{n}.mp3']);subprocess.run(['rm',f'sfx/{n}.wav'])
k=lambda d:np.arange(int(SR*d))/SR
t=k(2.5);save('riser',rng.normal(0,1,len(t))*(t/2.5)**3*0.5+np.sin(2*np.pi*(200+600*(t/2.5)**2)*t)*(t/2.5)**2)
t=k(1.2);save('thud',np.sin(2*np.pi*(60*np.exp(-t*3))*t)*np.exp(-t*4)+rng.normal(0,1,len(t))*np.exp(-t*30)*0.4)
t=k(0.8);s=rng.normal(0,1,len(t))*np.exp(-t*3);s[::2]*=0.3;save('static',s)
t=k(1.0);hb=np.zeros_like(t)
for o in(0,0.25):i=int(o*SR);n=int(0.2*SR);kk=np.arange(n)/SR;hb[i:i+n]+=np.sin(2*np.pi*50*kk)*np.exp(-kk*18)
save('heartbeat',hb)
t=k(0.35);save('footstep',rng.normal(0,1,len(t))*np.exp(-t*25)+np.sin(2*np.pi*90*t)*np.exp(-t*20))
t=k(2.0);save('hit_low',np.sin(2*np.pi*40*t)*np.exp(-t*1.5)+np.sin(2*np.pi*(1200*np.exp(-t*6))*t)*np.exp(-t*5)*0.5+rng.normal(0,1,len(t))*np.exp(-t*12)*0.5)
