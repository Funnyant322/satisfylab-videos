const c=document.getElementById('c'),x=c.getContext('2d'),W=1080,H=1920;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),ease=v=>{v=clamp(v);return v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2},lerp=(a,b,t)=>a+(b-a)*t;
const INK='#24262e',SKIN='#f3f0ea';
function rr(px,py,w,h,r,f){x.beginPath();x.roundRect(px,py,w,h,r);x.fillStyle=f;x.fill();}
function lg(x0,y0,x1,y1,s){const g=x.createLinearGradient(x0,y0,x1,y1);s.forEach(([o,c])=>g.addColorStop(o,c));return g;}
function rg(cx,cy,r0,r1,s){const g=x.createRadialGradient(cx,cy,r0,cx,cy,r1);s.forEach(([o,c])=>g.addColorStop(o,c));return g;}
function glow(cx,cy,r,col){x.fillStyle=rg(cx,cy,0,r,[[0,col],[1,'rgba(0,0,0,0)']]);x.fillRect(cx-r,cy-r,2*r,2*r);}
function seg(a,b,w,col){x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineWidth=w;x.strokeStyle=col;x.lineCap='round';x.stroke();}
function txt(s,px,py,font,col,align='center'){x.font=font;x.textAlign=align;x.fillStyle=col;x.fillText(s,px,py);}
const D=Math.PI/180;

// ================= STICK FIGURE (skeleton) =================
// pose angles in degrees from straight down; elbows/knees relative bends
function limb(o,a1,a2,l1,l2,w,col){const p1=[o[0]+Math.sin(a1*D)*l1,o[1]+Math.cos(a1*D)*l1];const p2=[p1[0]+Math.sin((a1+a2)*D)*l2,p1[1]+Math.cos((a1+a2)*D)*l2];seg(o,p1,w,col);seg(p1,p2,w,col);return p2;}
function face(cx,cy,r,f){ // f: {mood:'neutral'|'scared'|'grin'|'shut', glasses, look}
 const lx=(f.look||0)*r*0.12,ey=cy-r*0.02;
 if(f.mood==='grin'){x.fillStyle=INK;for(const s of[-1,1]){x.beginPath();x.arc(cx+s*r*0.32+lx,ey-r*0.12,r*0.1,0,7);x.fill();}
  x.fillStyle='#fff';x.beginPath();x.moveTo(cx-r*0.66,cy+r*0.15);x.quadraticCurveTo(cx,cy+r*0.92,cx+r*0.66,cy+r*0.15);x.quadraticCurveTo(cx,cy+r*0.38,cx-r*0.66,cy+r*0.15);x.fill();x.lineWidth=r*0.06;x.strokeStyle=INK;x.stroke();
  for(let i=-3;i<=3;i++)seg([cx+i*r*0.15,cy+r*0.3],[cx+i*r*0.15,cy+r*0.55-Math.abs(i)*r*0.06],r*0.035,INK);return;}
 if(f.mood==='shut'){for(const s of[-1,1]){x.beginPath();x.arc(cx+s*r*0.32,ey,r*0.11,0.2,Math.PI-0.2);x.lineWidth=r*0.06;x.strokeStyle=INK;x.stroke();}
  seg([cx-r*0.14,cy+r*0.42],[cx+r*0.14,cy+r*0.42],r*0.06,INK);return;}
 x.fillStyle=INK;const big=f.mood==='scared'?1.3:1;for(const s of[-1,1]){x.beginPath();x.ellipse(cx+s*r*0.32+lx,ey,r*0.08*big,r*0.11*big,0,0,7);x.fill();}
 if(f.mood==='scared'){for(const s of[-1,1])seg([cx+s*r*0.18,ey-r*0.22],[cx+s*r*0.46,ey-r*0.3],r*0.06,INK);if(!f.covered){x.beginPath();x.ellipse(cx,cy+r*0.45,r*0.1,r*0.14,0,0,7);x.fill();}}
 else seg([cx-r*0.16,cy+r*0.42],[cx+r*0.16,cy+r*0.42],r*0.06,INK);
}
function headDraw(cx,cy,r,o){
 x.fillStyle=SKIN;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.lineWidth=Math.max(4,r*0.1);x.strokeStyle=INK;x.stroke();
 if(o.hair==='brown'){x.fillStyle='#3a2a22';x.beginPath();x.arc(cx,cy,r*1.04,Math.PI*1.08,Math.PI*1.95);x.quadraticCurveTo(cx+r*0.1,cy-r*0.35,cx-r*0.95,cy-r*0.25);x.fill();}
 if(o.hair==='grey'){x.fillStyle='#c3c6cf';for(const s of[-1,1]){x.beginPath();x.ellipse(cx+s*r*0.85,cy-r*0.4,r*0.3,r*0.22,s*0.5,0,7);x.fill();}x.beginPath();x.ellipse(cx,cy-r*0.92,r*0.35,r*0.13,0,0,7);x.fill();}
 if(o.cap){x.fillStyle='#22305a';x.beginPath();x.arc(cx,cy-r*0.18,r*1.02,Math.PI*1.08,Math.PI*1.92);x.closePath();x.fill();rr(cx-r*0.2,cy-r*0.5,r*1.3,r*0.18,r*0.09,'#18213f');}
 face(cx,cy,r,o);
 if(o.glasses){x.lineWidth=r*0.07;x.strokeStyle=INK;for(const s of[-1,1]){x.beginPath();x.arc(cx+s*r*0.32,cy-r*0.1,r*0.2,0,7);x.stroke();}seg([cx-r*0.12,cy-r*0.1],[cx+r*0.12,cy-r*0.1],r*0.05,INK);}
}
// fig(px,py=feet y,s=scale (1 => ~800px tall), p=pose, o=look)
function fig(px,py,s,p,o){
 const w=14*s/1, L=170*s; // segment lengths
 const hip=[px+(p.hipX||0)*s,py-L*2.05+(p.drop||0)*s];
 const lean=(p.lean||0);const neck=[hip[0]+Math.sin(lean*D)*L*1.75,hip[1]-Math.cos(lean*D)*L*1.75];
 const col=o.body||INK;
 // legs
 const fl=limb(hip,p.hl1??8,p.kl1??-5,L*1.05,L*1.0,w,col),fr=limb(hip,p.hr1??-8,p.kr1??5,L*1.05,L*1.0,w,col);
 x.fillStyle=col;for(const f of[fl,fr]){x.beginPath();x.ellipse(f[0]+10*s,f[1]+4*s,26*s,12*s,0,0,7);x.fill();}
 // torso (thicker for clothes)
 seg(hip,neck,(o.torsoW||22)*s,o.shirt||col);
 if(o.apron){x.fillStyle='#2f8a55';x.beginPath();x.moveTo(neck[0]-30*s,neck[1]+60*s);x.lineTo(neck[0]+30*s,neck[1]+60*s);x.lineTo(hip[0]+42*s,hip[1]+40*s);x.lineTo(hip[0]-42*s,hip[1]+40*s);x.closePath();x.fill();}
 if(o.tag){x.save();x.translate(neck[0]+18*s,neck[1]+95*s);if(o.flip)x.rotate(Math.PI);rr(-16*s,-9*s,32*s,18*s,3*s,'#f4f1ea');x.fillStyle='#c33';x.fillRect(-11*s,-4*s,22*s,3*s);x.restore();}
 // arms
 const sh=[neck[0],neck[1]+18*s];
 const hl=limb(sh,p.al1??20,p.el1??-10,L*0.95,L*0.9,w*0.9,o.shirt||col),hr=limb(sh,p.ar1??-20,p.er1??10,L*0.95,L*0.9,w*0.9,o.shirt||col);
 x.fillStyle=SKIN;for(const h of[hl,hr]){x.beginPath();x.arc(h[0],h[1],11*s,0,7);x.fill();x.lineWidth=4*s;x.strokeStyle=INK;x.stroke();}
 headDraw(neck[0]+(p.headX||0)*s,neck[1]-95*s+(p.headY||0)*s,92*s,o);
 return {hl,hr,neck};
}
// poses
const P={
 stand:t=>({al1:12+Math.sin(t*2)*2,el1:-6,ar1:-12-Math.sin(t*2)*2,er1:6,hl1:6,hr1:-6,drop:Math.sin(t*2)*3}),
 knock:t=>{const k=Math.abs(Math.sin(t*6.5));return{al1:12,el1:-6,ar1:-150+k*25,er1:-40+k*30,hl1:6,hr1:-6,lean:4}},
 walk:(t,dir=1)=>{const a=Math.sin(t*6.2)*28;return{al1:-a*0.8,el1:-12,ar1:a*0.8,er1:12,hl1:a,kl1:Math.max(0,-a)*0.9*-1+(-10),hr1:-a,kr1:Math.max(0,a)*-0.9+(-10),drop:Math.abs(Math.sin(t*6.2))*-8,lean:3*dir}},
 crouch:p=>({hl1:lerp(8,-70,p),kl1:lerp(-5,130,p),hr1:lerp(-8,-60,p),kr1:lerp(5,120,p),drop:lerp(0,300,p),lean:lerp(0,30,p),al1:lerp(12,-40,p),el1:lerp(-6,-20,p),ar1:lerp(-12,-60,p),er1:lerp(6,-10,p)}),
 peer:t=>({al1:-150,el1:-20,ar1:150,er1:20,hl1:6,hr1:-6,lean:6,headX:Math.sin(t*1.5)*6}),
 wave:t=>({al1:12,el1:-6,ar1:-150+Math.sin(t*5)*18,er1:-20,hl1:6,hr1:-6}),
};
const RAY={hair:'grey',glasses:true,mood:'grin',apron:true,tag:true,flip:true,shirt:'#e3e0d8'};
const YOU={cap:true,mood:'neutral',tag:true,shirt:'#26335c'};
const DOUBLE={cap:true,mood:'grin',tag:true,shirt:'#26335c'};

