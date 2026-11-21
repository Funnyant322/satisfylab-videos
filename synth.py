import numpy as np, subprocess, wave
SR=48000; D=64
def save(name,x):
    x=x/ (np.max(np.abs(x))+1e-9)*0.8
    st=np.stack([x,np.roll(x,int(SR*0.013))],1)
    w=wave.open(f'music/{name}.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype(np.int16).tobytes());w.close()
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'music/{name}.wav','-b:a','160k',f'music/{name}.mp3']);subprocess.run(['rm',f'music/{name}.wav'])
t=np.arange(SR*D)/SR
def env(n,a=0.005,r=1.5):
    k=np.arange(n)/SR;return np.minimum(k/a,1)*np.exp(-k/r)
def note(f,dur,kind='sine',r=1.2):
    n=int(SR*dur);k=np.arange(n)/SR
    if kind=='box': s=np.sin(2*np.pi*f*k)+0.3*np.sin(2*np.pi*f*2.01*k)+0.15*np.sin(2*np.pi*f*4.2*k)
    elif kind=='piano': s=np.sin(2*np.pi*f*k)+0.5*np.sin(2*np.pi*f*2*k)*np.exp(-k*2)+0.2*np.sin(2*np.pi*f*3*k)*np.exp(-k*4)
    else: s=np.sin(2*np.pi*f*k)
    return s*env(n,0.003,r)
def put(buf,s,at):
    i=int(at*SR);j=min(len(buf),i+len(s));buf[i:j]+=s[:j-i]
def reverb(x,delays=(0.031,0.047,0.071,0.113,0.17),g=0.45):
    y=x.copy()
    for d in delays:
        n=int(d*SR);z=np.zeros_like(x);z[n:]=x[:-n]*g;y+=z
    return y
rng=np.random.default_rng(7)
A=lambda m:440*2**((m-69)/12)
# 1 music box in a different minor key, slower, detuned
b=np.zeros_like(t);mel=[64,67,71,72,71,67,64,62,64,67,64,59];
for i in range(40):put(b,note(A(mel[i%len(mel)])*(1+rng.normal(0,0.003)),2.0,'box',0.9)*0.5,i*1.55)
b+=0.15*np.sin(2*np.pi*55*t)*(0.6+0.4*np.sin(2*np.pi*0.05*t))
save('m1_musicbox_dark',reverb(b))
# 2 low drone + heartbeat
b=0.5*np.sin(2*np.pi*41.2*t)+0.3*np.sin(2*np.pi*41.6*t)+0.2*np.sin(2*np.pi*82.4*t+np.sin(2*np.pi*0.1*t))
hb=np.zeros_like(t)
for i in range(int(D/0.9)):
    for o in(0,0.22):put(hb,note(55,0.25,'sine',0.08)*1.2,i*0.9+o)
save('m2_drone_heartbeat',b*0.6+hb)
# 3 sparse detuned piano
b=np.zeros_like(t);ch=[[57,60,64],[53,57,60],[55,59,62],[52,55,59]]
for i in range(26):
    for m in ch[i%4]:put(b,note(A(m)*(1+rng.normal(0,0.004)),3.5,'piano',1.6)*0.35,i*2.45+rng.uniform(0,0.06))
    if i%3==0:put(b,note(A(ch[i%4][0]+24),2,'piano',0.8)*0.3,i*2.45+1.2)
save('m3_sparse_piano',reverb(b))
# 4 tension pulse arpeggio
b=np.zeros_like(t);arp=[45,52,57,60,57,52]
for i in range(int(D/0.18)):put(b,note(A(arp[i%6]),0.2,'sine',0.07)*(0.5+0.5*(i%6==0)),i*0.18)
b+=0.25*np.sin(2*np.pi*55*t)*np.clip(t/D,0,1)
save('m4_tension_pulse',reverb(b,g=0.3))
# 5 wind + metal hits
nz=rng.normal(0,1,len(t));from numpy.fft import rfft,irfft
F=rfft(nz);fr=np.fft.rfftfreq(len(t),1/SR);F*=np.exp(-((fr-400)/350)**2);w=irfft(F,len(t));w*= (0.5+0.5*np.sin(2*np.pi*0.07*t))
mh=np.zeros_like(t)
for i in range(14):
    f=rng.uniform(300,900);n=int(SR*3);k=np.arange(n)/SR;s=(np.sin(2*np.pi*f*k)+np.sin(2*np.pi*f*1.41*k)+np.sin(2*np.pi*f*2.76*k))*np.exp(-k*1.2);put(mh,s*0.25,rng.uniform(0,D-3))
save('m5_wind_metal',w*3+reverb(mh))
# 6 slow string pad
b=np.zeros_like(t);chords=[[45,52,57,60],[41,48,53,57],[43,50,55,58],[40,47,52,55]]
for i,ch in enumerate(chords*4):
    n=int(SR*4.2);k=np.arange(n)/SR;e=np.sin(np.pi*np.clip(k/4.2,0,1))
    for m in ch:s=np.sin(2*np.pi*A(m)*k*(1+0.003*np.sin(2*np.pi*5*k)));put(b,s*e*0.25,i*4)
save('m6_string_pad',reverb(b))
