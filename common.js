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


// ================= CREEP LAYER (v5.1) =================
// Call creep(t,opts) at the END of renderFrame, after the scene + vignette, BEFORE hud()/captions().
// opts: dark 0..1 (how black the room is, default .7), lights:[[x,y,r],...] pools of light that stay visible,
//  grade 0..1 (cold desaturated colour, default .7), grain 0..1 (default .5), flicker 0..1 (random light dips),
//  eyes:[[x,y,size,stay],...] eyes in the dark (blink + appear/disappear; stay=true keeps them on, use for shade() heads: shadeEyes()), glitch 0..1 (scare moments only),
//  red 0..1 (red danger tint), shake 0..1 (handheld wobble is applied by camShake() before drawing the scene)
const _cv=(w,h)=>{const k=document.createElement('canvas');k.width=w;k.height=h;return k;};
const _GR=[];for(let i=0;i<6;i++){const g=_cv(270,480),gx=g.getContext('2d'),id=gx.createImageData(270,480);for(let p=0;p<id.data.length;p+=4){const v=Math.random()*255;id.data[p]=id.data[p+1]=id.data[p+2]=v;id.data[p+3]=255;}gx.putImageData(id,0,0);_GR.push(g);}
const _MASK=_cv(W,H),_mx=_MASK.getContext('2d'),_TMP=_cv(W,H),_tx=_TMP.getContext('2d');
const hash=n=>{const s=Math.sin(n*127.1)*43758.5453;return s-Math.floor(s);};
function camShake(t,amt=1){const q=Math.floor(t*12);x.translate((hash(q)-.5)*10*amt+Math.sin(t*1.3)*6*amt,(hash(q+9)-.5)*10*amt+Math.cos(t*1.1)*5*amt);x.rotate(Math.sin(t*0.7)*0.006*amt);}
function creep(t,o={}){
 const dark=o.dark??0.7,grade=o.grade??0.7,grain=o.grain??0.5;
 x.save();x.setTransform(1,0,0,1,0,0);
 // 1) cold, drained colour
 if(grade>0){x.globalCompositeOperation='saturation';x.fillStyle=`rgba(128,128,128,${0.75*grade})`;x.fillRect(0,0,W,H);
  x.globalCompositeOperation='multiply';x.fillStyle=`rgba(${lerp(255,150,grade)|0},${lerp(255,185,grade)|0},${lerp(255,190,grade)|0},1)`;x.fillRect(0,0,W,H);}
 if(o.red){x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,${lerp(255,90,o.red)|0},${lerp(255,90,o.red)|0},1)`;x.fillRect(0,0,W,H);}
 x.globalCompositeOperation='source-over';
 // 2) darkness with pools of light (+ flicker)
 let fl=1;if(o.flicker){const q=Math.floor(t*15);if(hash(q)<0.12*o.flicker)fl=0.25+hash(q+3)*0.4;}
 const d=clamp(dark+(1-fl)*0.5,0,0.97);
 if(d>0){_mx.globalCompositeOperation='source-over';_mx.clearRect(0,0,W,H);_mx.fillStyle=`rgba(0,0,0,${d})`;_mx.fillRect(0,0,W,H);
  _mx.globalCompositeOperation='destination-out';for(const [lx,ly,lr] of (o.lights||[])){const r=lr*(0.97+0.03*Math.sin(t*7+lx));const g=_mx.createRadialGradient(lx,ly,0,lx,ly,r);g.addColorStop(0,'rgba(0,0,0,0.95)');g.addColorStop(0.55,'rgba(0,0,0,0.6)');g.addColorStop(1,'rgba(0,0,0,0)');_mx.fillStyle=g;_mx.fillRect(lx-r,ly-r,2*r,2*r);}
  x.drawImage(_MASK,0,0);}
 // 3) eyes watching from the dark
 for(const [i,e] of (o.eyes||[]).entries()){const [ex,ey,es=1,stay]=e;const cyc=stay?0.35:(t*0.35+i*0.37)%1;if(cyc>0.7)continue;const op=clamp(Math.min(cyc/0.08,(0.7-cyc)/0.08));
  const blink=((t*0.9+i)%3)<0.12?0.1:1;x.globalAlpha=op;for(const s of[-1,1]){glow(ex+s*14*es,ey,26*es,'rgba(255,240,200,0.35)');x.fillStyle='#fff6dc';x.beginPath();x.ellipse(ex+s*14*es,ey,5*es,5*es*blink,0,0,7);x.fill();}x.globalAlpha=1;}
 // 4) heavy vignette
 x.fillStyle=rg(W/2,H*0.48,H*0.22,H*0.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,0.75)']]);x.fillRect(0,0,W,H);
 // 5) glitch (slice shift + colour split)
 if(o.glitch){_tx.clearRect(0,0,W,H);_tx.drawImage(c,0,0);const q=Math.floor(t*24);
  for(let k=0;k<Math.ceil(10*o.glitch);k++){const sy=hash(q*7+k)*H,sh=20+hash(q*3+k)*120,dx=(hash(q*5+k)-.5)*120*o.glitch;x.drawImage(_TMP,0,sy,W,sh,dx,sy,W,sh);}
  x.globalCompositeOperation='screen';x.globalAlpha=0.35*o.glitch;x.drawImage(_TMP,8*o.glitch,0);x.globalCompositeOperation='multiply';x.fillStyle='rgb(255,120,120)';x.globalAlpha=0.25*o.glitch;x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over';x.globalAlpha=1;}
 // 6) film grain + scanlines
 if(grain>0){x.globalCompositeOperation='overlay';x.globalAlpha=0.22*grain;x.imageSmoothingEnabled=false;x.drawImage(_GR[Math.floor(t*24)%_GR.length],0,0,W,H);x.imageSmoothingEnabled=true;
  x.globalCompositeOperation='source-over';x.globalAlpha=0.06*grain;x.fillStyle='#000';for(let y=0;y<H;y+=6)x.fillRect(0,y,W,2);x.globalAlpha=1;}
 x.restore();
}
// Tall shadow thing: pitch black, too-long limbs, white pinprick eyes, twitchy stop-motion movement.
function shade(px,py,s,t,o={}){const tq=Math.floor(t*(o.fps||7))/(o.fps||7);const j=k=>(hash(Math.floor(t*(o.fps||7))*13+k)-.5)*(o.twitch??1);
 const col=o.col||'#05060a',L=230*s,w=10*s,hip=[px+j(1)*20*s,py-L*2.1];const neck=[hip[0]+j(2)*30*s+(o.lean||0)*s,hip[1]-L*1.9];
 x.save();if(o.alpha!=null)x.globalAlpha=o.alpha;
 limb(hip,6+j(3)*10,-4,L*1.05,L*1.05,w,col);limb(hip,-6+j(4)*10,4,L*1.05,L*1.05,w,col);seg(hip,neck,w*1.6,col);
 const sh=[neck[0],neck[1]+15*s];const reach=o.reach||0;
 limb(sh,lerp(14,-95,reach)+j(5)*12,lerp(-4,-10,reach),L*1.25,L*1.25,w*0.8,col);limb(sh,lerp(-14,95,reach)+j(6)*12,lerp(4,10,reach),L*1.25,L*1.25,w*0.8,col);
 const hx=neck[0]+j(7)*24*s+(o.tilt||0)*s,hy=neck[1]-62*s;x.save();x.translate(hx,hy);x.rotate((o.tilt||0)*0.01+j(8)*0.25);x.fillStyle=col;x.beginPath();x.ellipse(0,0,46*s,62*s,0,0,7);x.fill();
 if(o.eyes!==false){for(const sg of[-1,1]){glow(sg*15*s,-6*s,22*s,'rgba(255,255,255,0.35)');x.fillStyle='#fff';x.beginPath();x.arc(sg*15*s,-6*s,4.5*s,0,7);x.fill();}}
 if(o.smile){x.strokeStyle='#e9e4d8';x.lineWidth=3*s;x.beginPath();x.arc(0,10*s,26*s,0.15*Math.PI,0.85*Math.PI);x.stroke();for(let i=-4;i<=4;i++)seg([i*5.5*s,26*s+Math.abs(i)*-1.5*s],[i*5.5*s,33*s-Math.abs(i)*2*s],1.6*s,'#e9e4d8');}
 x.restore();x.restore();}
// One-frame subliminal face (use 1-3 frames only): call scareFlash(t,at) after creep()
function scareFlash(t,at,dur=0.07){if(t<at||t>at+dur)return;x.save();x.setTransform(1,0,0,1,0,0);x.fillStyle='#000';x.fillRect(0,0,W,H);
 x.fillStyle='#e9e4d8';x.beginPath();x.ellipse(540,900,330,440,0,0,7);x.fill();x.fillStyle='#000';for(const s of[-1,1]){x.beginPath();x.ellipse(540+s*120,820,80,120,0,0,7);x.fill();}
 x.beginPath();x.ellipse(540,1120,150,70,0,0,7);x.fill();x.restore();}
// extra face moods for creepy characters: 'hollow' (empty black eyes) and 'stare' (tiny pupils, wide eyes)
const _face0=face;face=function(cx,cy,r,f){
 if(f.mood==='hollow'){x.fillStyle='#07080c';for(const s of[-1,1]){x.beginPath();x.ellipse(cx+s*r*0.32,cy-r*0.05,r*0.16,r*0.22,0,0,7);x.fill();}x.fillStyle='rgba(120,0,0,0.5)';for(const s of[-1,1])x.fillRect(cx+s*r*0.32-r*0.02,cy+r*0.12,r*0.04,r*0.3);
  x.beginPath();x.ellipse(cx,cy+r*0.48,r*0.08,r*0.12,0,0,7);x.fillStyle='#07080c';x.fill();return;}
 if(f.mood==='stare'){for(const s of[-1,1]){x.fillStyle='#fff';x.beginPath();x.arc(cx+s*r*0.32,cy-r*0.05,r*0.2,0,7);x.fill();x.lineWidth=r*0.04;x.strokeStyle=INK;x.stroke();x.fillStyle=INK;x.beginPath();x.arc(cx+s*r*0.32+(f.look||0)*r*0.08,cy-r*0.05,r*0.045,0,7);x.fill();}
  seg([cx-r*0.12,cy+r*0.45],[cx+r*0.12,cy+r*0.45],r*0.05,INK);return;}
 _face0(cx,cy,r,f);};
// darker, mostly-empty shelf colours for creepy sets
const DUSK=['#3a2b2b','#26303d','#3a3426','#2a3a2e','#30283d','#3b3d42'];
// where to put always-on eyes for a shade(px,py,s) so they glow through the darkness: creep(t,{eyes:[shadeEyes(px,py,s)]})
function shadeEyes(px,py,s){return [px,py-982*s-6*s,s*1.05,true];}
// Pale face peeking out from behind an edge (shelf, door frame). side=-1 peeks from the left edge, 1 from the right.
// p 0..1 how far out it leans. Draw BEFORE creep() and add [px,py,0.9,true] to creep eyes only if you want glowing eyes.
function peek(px,py,s,p,side=1,t=0){x.save();x.translate(px-side*lerp(60,0,ease(p))*s,py);const tw=(hash(Math.floor(t*6))-.5)*0.08;x.rotate(side*(-0.35+tw));
 x.fillStyle='#e9e4d8';x.beginPath();x.ellipse(0,0,60*s,82*s,0,0,7);x.fill();x.fillStyle='#07080c';for(const sg of[-1,1]){x.beginPath();x.ellipse(sg*22*s,-10*s,11*s,16*s,0,0,7);x.fill();}
 x.beginPath();x.ellipse(0,38*s,9*s,22*s,0,0,7);x.fill();
 x.fillStyle='#07080c';for(let i=0;i<4;i++){x.beginPath();x.ellipse(side*-(56+i*4)*s,(-30+i*26)*s,10*s,6*s,0,0,7);x.fill();} // fingers on the edge
 x.restore();}
// Wrong frame: for 2 frames at time `at`, a character's face is replaced by 'hollow'. Use as: const o2=wrongFace(t,at,YOUf); fig(...,o2)
function wrongFace(t,at,o){return (t>=at&&t<at+0.07)?{...o,mood:'hollow'}:o;}
