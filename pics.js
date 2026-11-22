// ================= 3AM Rules kit v6 — PICTURE FORMAT (owner's choice 22 Nov 2026) =================
// Reference: reference/bunker_part1_remake_FORMAT.mp4. Load AFTER common.js.
// Pictures (Flow / Gemini, 9:16, dark gritty hand-drawn horror cartoon) are the backgrounds; code adds the
// stick-figure "kid", HUD (clock + NOISE meter), centre captions, notes, item labels, red flashes, vote buttons, creep layer.
// Each shot = one picture with a slow zoom/pan (Ken Burns). 3-6 s per shot, faster cuts in the first 10 s.

// ---------- picture loading ----------
// window.PICS = {key:'pics/bunker/back_door_close.jpg', ...} must be set BEFORE this file loads.
const IMG={};
const _FONTS=['400 60px Anton','300 30px Montserrat','400 60px "Permanent Marker"','800 30px Inter'].map(f=>document.fonts.load(f).catch(()=>{}));
window.READY_P=Promise.all(_FONTS.concat(Object.entries(window.PICS||{}).map(([k,src])=>new Promise(res=>{const im=new Image();im.onload=()=>{IMG[k]=im;res();};im.onerror=()=>{console.error('missing pic',src);res();};im.src=src;}))));

// draw a picture to cover the 1080x1920 frame with a Ken Burns move.
// o: {z0:1,z1:1.08, x0:0,y0:0,x1:0,y1:0 (pan in px at the end), shake:0, flipX:false}
function pic(key,p,o={}){const im=IMG[key];if(!im){x.fillStyle='#111';x.fillRect(0,0,W,H);txt('MISSING '+key,540,960,'800 40px Inter','#f44');return;}
 const e=ease(clamp(p)),z=lerp(o.z0??1,o.z1??1.08,e);const s=Math.max(W/im.width,H/im.height)*z;const w=im.width*s,h=im.height*s;
 const px=(W-w)/2+lerp(o.x0||0,o.x1||0,e),py=(H-h)/2+lerp(o.y0||0,o.y1||0,e);x.save();
 if(o.flipX){x.translate(W,0);x.scale(-1,1);}x.drawImage(im,px,py,w,h);x.restore();}

// ---------- the kid (matches the painted stick figure in the pictures) ----------
// round pale head with dark outline + soft shading, big worried eyes, thin black limbs, dark backpack strap.
const KID_HEAD='#e7e5df',KID_INK='#15161a';
function kidFace(cx,cy,r,mood,look=0){const lx=look*r*0.1;x.lineCap='round';
 if(mood==='shh'){// hand-over-mouth look: wide eyes, no mouth (hand drawn by pose)
  mood='scared';}
 const big=mood==='terror'?1.35:mood==='scared'?1.15:1;
 for(const s of[-1,1]){x.fillStyle='#fff';x.beginPath();x.ellipse(cx+s*r*0.3+lx,cy-r*0.05,r*0.2*big,r*0.24*big,0,0,7);x.fill();x.lineWidth=r*0.06;x.strokeStyle=KID_INK;x.stroke();
  x.fillStyle=KID_INK;x.beginPath();x.arc(cx+s*r*0.3+lx*1.6,cy-r*0.02,r*(mood==='terror'?0.05:0.08),0,7);x.fill();}
 // brows
 const bw=mood==='calm'?0:1;for(const s of[-1,1])seg([cx+s*r*0.14,cy-r*(0.36+0.08*bw)],[cx+s*r*0.48,cy-r*(0.3-0.06*bw)],r*0.07,KID_INK);
 // mouth
 x.lineWidth=r*0.07;x.strokeStyle=KID_INK;x.beginPath();
 if(mood==='terror'){x.fillStyle=KID_INK;x.ellipse(cx,cy+r*0.48,r*0.14,r*0.18,0,0,7);x.fill();}
 else if(mood==='scared'){x.moveTo(cx-r*0.2,cy+r*0.5);x.quadraticCurveTo(cx-r*0.1,cy+r*0.4,cx,cy+r*0.5);x.quadraticCurveTo(cx+r*0.1,cy+r*0.6,cx+r*0.2,cy+r*0.48);x.stroke();}
 else if(mood!=='shh2'){x.moveTo(cx-r*0.16,cy+r*0.5);x.quadraticCurveTo(cx,cy+r*0.42,cx+r*0.16,cy+r*0.5);x.stroke();}
 if(mood==='terror'||mood==='scared'){x.fillStyle='rgba(160,200,255,0.8)';x.beginPath();x.ellipse(cx+r*0.82,cy-r*0.5,r*0.07,r*0.12,0.3,0,7);x.fill();} // sweat drop
}
// kid(px, py = feet y, s = scale (1 => ~760 px tall), pose (from P / RUN / TREMBLE / MOUTH), o:{mood,look,pack:true,light:false})
function kid(px,py,s,p,o={}){x.save();
 // floor shadow
 x.fillStyle='rgba(0,0,0,0.45)';x.beginPath();x.ellipse(px,py+6*s,90*s,16*s,0,0,7);x.fill();
 const w=11*s,L=170*s,hip=[px+(p.hipX||0)*s,py-L*2.05+(p.drop||0)*s],lean=p.lean||0;
 const neck=[hip[0]+Math.sin(lean*D)*L*1.6,hip[1]-Math.cos(lean*D)*L*1.6];
 limb(hip,p.hl1??8,p.kl1??-5,L*1.05,L*1.0,w,KID_INK);limb(hip,p.hr1??-8,p.kr1??5,L*1.05,L*1.0,w,KID_INK);
 seg(hip,neck,w*1.15,KID_INK);
 if(o.pack!==false){x.fillStyle='#3a2f28';x.beginPath();x.roundRect(neck[0]-70*s,neck[1]+20*s,62*s,150*s,18*s);x.fill();seg([neck[0]-8*s,neck[1]+18*s],[neck[0]+10*s,neck[1]+120*s],6*s,'#2a211c');}
 const sh=[neck[0],neck[1]+16*s];
 const hl=limb(sh,p.al1??20,p.el1??-10,L*0.95,L*0.9,w*0.9,KID_INK),hr=limb(sh,p.ar1??-20,p.er1??10,L*0.95,L*0.9,w*0.9,KID_INK);
 if(o.light){flashlight(hr[0],hr[1],o.lightAng??-15,o.lightLen??900,o.lightW??0.35);}
 const r=(o.head||112)*s,hx=neck[0]+(p.headX||0)*s,hy=neck[1]-r*0.95+(p.headY||0)*s;
 x.fillStyle=rg(hx-r*0.3,hy-r*0.35,r*0.1,r*1.1,[[0,'#f6f5f1'],[0.7,KID_HEAD],[1,'#b9b7b1']]);x.beginPath();x.arc(hx,hy,r,0,7);x.fill();x.lineWidth=r*0.07;x.strokeStyle=KID_INK;x.stroke();
 kidFace(hx,hy,r,o.mood||'scared',o.look||0);
 if(o.mood==='shh'||p.mouth){x.fillStyle=KID_HEAD;x.beginPath();x.arc(hx+r*0.05,hy+r*0.5,r*0.22,0,7);x.fill();x.lineWidth=r*0.05;x.stroke();}
 x.restore();return{hl,hr,neck,head:[hx,hy,r]};}
const TREMBLE=t=>({...P.stand(t),hipX:Math.sin(t*40)*2,headX:Math.sin(t*37)*3,al1:30,el1:-60,ar1:-30,er1:60});
const MOUTH=t=>({...P.stand(t),ar1:-150,er1:-120,mouth:true});
const RUN2=(t,sp=9)=>{const a=Math.sin(t*sp)*45;return{al1:-a,el1:-70,ar1:a,er1:70,hl1:a*0.9,kl1:Math.min(0,-a)*1.2-25,hr1:-a*0.9,kr1:Math.min(0,a)*1.2-25,drop:-Math.abs(Math.sin(t*sp))*25,lean:12}};
const HOLD=t=>({...P.stand(t),ar1:-70,er1:-60,al1:60,el1:60}); // holding something / flashlight forward

// flashlight cone (draw AFTER the picture, BEFORE creep(); also pass a light pool to creep at the beam end)
function flashlight(x0,y0,angDeg,len=900,spread=0.35){const a=(angDeg-90)*D;x.save();x.globalCompositeOperation='screen';
 const g=x.createRadialGradient(x0,y0,10,x0,y0,len);g.addColorStop(0,'rgba(255,250,215,0.55)');g.addColorStop(1,'rgba(255,250,215,0)');x.fillStyle=g;
 x.beginPath();x.moveTo(x0,y0);x.arc(x0,y0,len,a-spread,a+spread);x.closePath();x.fill();x.restore();}

// ---------- HUD (top-left clock box, top-right NOISE meter) ----------
// hud2({day:1,days:6,time:'8:13',ampm:'PM',story:'ZOMBIE BUNKER',ep:1,noise:0..10,meter:'NOISE'})
function hud2(o){x.save();x.globalAlpha=o.alpha??1;
 rr(40,70,430,180,22,'rgba(10,10,12,0.55)');x.fillStyle='#b3202a';x.beginPath();x.arc(82,102,11,0,7);x.fill();
 txt(`DAY ${o.day} OF ${o.days||6}`,108,114,'300 34px Montserrat, Inter','#b3202a','left');
 txt(o.time,62,215,'400 104px Anton','#fff','left');x.font='400 104px Anton';const tw=x.measureText(o.time).width;txt(o.ampm||'PM',62+tw+16,213,'400 44px Anton','#fff','left');
 txt(`${o.story} · EP ${o.ep}`,66,246,'300 26px Montserrat, Inter','rgba(255,255,255,0.35)','left');
 if(o.noise!=null){rr(768,70,268,130,20,'rgba(10,10,12,0.55)');txt(o.meter||'NOISE',1008,104,'300 26px Montserrat, Inter','rgba(255,255,255,0.55)','right');
  const n=Math.round(o.noise);for(let i=0;i<10;i++){const on=i<n;const col=!on?'#3b3b3d':i<4?'#4fd35b':i<7?'#e8c22a':'#e2392d';rr(786+i*23.5,118,18,44,3,col);}
  const lab=n<=3?['QUIET','#4fd35b']:n<=7?['LOUD','#e8c22a']:['TOO LOUD','#e2392d'];if(n>=6&&n<=7)lab[1]='#e2392d';
  txt(lab[0],1008,192,'400 30px Anton',lab[1],'right');}
 x.restore();}

// ---------- captions: 1-3 words, centre of screen, Anton, key words coloured ----------
// window.WORDS=[{w,s,e}], window.HI={green:['whisper','hatch',...], red:['knock','door',...]} (lower-case, no punctuation)
function captions2(t,y=760){const ws=window.WORDS||[];let i=ws.findIndex(w=>t<w.e+0.05);if(i<0)return;if(t<ws[i].s-0.3)return;
 const start=Math.floor(i/3)*3,grp=ws.slice(start,start+3).filter((w,k)=>start+k<=i);const H2=window.HI||{green:[],red:[]};
 const words=grp.map(w=>w.w.replace(/["“”]/g,'').toUpperCase());let fs=92;x.font=`400 ${fs}px Anton`;const sp=24;
 let wd=words.map(w=>x.measureText(w).width),tot=wd.reduce((a,b)=>a+b,0)+sp*(words.length-1);if(tot>960){fs=Math.floor(fs*960/tot);x.font=`400 ${fs}px Anton`;wd=words.map(w=>x.measureText(w).width);tot=wd.reduce((a,b)=>a+b,0)+sp*(words.length-1);}
 let cx=540-tot/2;words.forEach((w,k)=>{const key=w.toLowerCase().replace(/[^a-z0-9']/g,'');const col=H2.red.includes(key)?'#ff3b30':H2.green.includes(key)?'#9cff57':'#fff';
  x.save();x.textAlign='left';x.shadowColor='rgba(0,0,0,0.9)';x.shadowBlur=18;x.lineJoin='round';x.lineWidth=10;x.strokeStyle='rgba(0,0,0,0.85)';x.strokeText(w,cx,y);x.fillStyle=col;x.fillText(w,cx,y);x.restore();cx+=wd[k]+sp;});}

// ---------- overlays ----------
function redFlash(dt,len=0.5,max=0.75){if(dt>len)return;x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,40,30,${max*(1-dt/len)})`;x.fillRect(0,0,W,H);x.restore();x.fillStyle=`rgba(200,0,0,${0.35*(1-dt/len)})`;x.fillRect(0,0,W,H);}
function topLabel(s,dt,col='#ff3b30',y=420,bg='rgba(0,0,0,0.75)'){const p=ease(dt/0.25);x.save();x.globalAlpha=p;x.font='400 56px Anton';const w=x.measureText(s).width+44;rr(540-w/2,y-56,w,76,6,bg);txt(s,540,y,'400 56px Anton',col);x.restore();}
function rewindCard(s,dt){const p=ease(dt/0.3);x.save();x.globalAlpha=p;x.font='400 62px Anton';const w=x.measureText('◀◀ '+s).width+50;rr(540-w/2,350,w,96,8,'rgba(0,0,0,0.75)');txt('◀◀ '+s,540,422,'400 62px Anton','#fff');x.restore();}
// rule note: paper card with a black RULE #n label, a faint header and the rule in red hand-lettering
function noteCard(n,lines,dt,o={}){x.fillStyle='rgba(0,0,0,0.55)';x.fillRect(0,0,W,H);const p=ease(dt/0.35);x.save();x.translate(540,820);x.rotate((o.rot??-2)*D);x.scale(lerp(1.0,0.86,p),lerp(1.0,0.86,p));x.globalAlpha=p;
 x.shadowColor='rgba(0,0,0,0.7)';x.shadowBlur=40;x.fillStyle=lg(0,-520,0,520,[[0,'#ecebe4'],[1,'#d6d4cb']]);x.fillRect(-380,-520,760,1040);x.shadowBlur=0;
 for(let y=-380;y<480;y+=46){seg([-340,y],[340,y],2,'rgba(90,120,170,0.18)');}
 txt(o.head||'IF YOU FOUND THIS BUNKER:',0,-450,'500 28px Montserrat, Inter','rgba(60,60,60,0.5)');
 rr(-110,-400,220,90,4,'#1d1d1f');txt('RULE #'+n,0,-336,'400 58px Anton','#f2f2ee');
 lines.forEach((l,i)=>txt(l,0,-160+i*84,'800 58px "Permanent Marker", "Comic Sans MS", Inter',o.col||'#b1201d'));
 x.beginPath();x.ellipse(250,400,62,46,-0.2,0,7);x.lineWidth=4;x.strokeStyle='rgba(120,80,60,0.35)';x.stroke(); // mug ring
 txt('— '+(o.sign||'M.'),250,330,'600 36px "Permanent Marker", Inter','rgba(60,60,60,0.6)');x.restore();}
function itemTag(px,py,label,p){if(p<=0)return;x.save();x.translate(px,py);x.scale(ease(p),ease(p));txt('+ '+label.toUpperCase(),0,0,'400 52px Anton','#f5d742');x.restore();}
function quote(s,dt,y=540,col='#c8ff7a'){const p=ease(dt/0.3);x.save();x.globalAlpha=p;const words=s.split(' ');const lines=[];let cur='';x.font='400 66px Anton';
 for(const w of words){const t2=cur?cur+' '+w:w;if(x.measureText(t2).width>880){lines.push(cur);cur=w;}else cur=t2;}lines.push(cur);
 lines.forEach((l,i)=>{x.shadowColor='#000';x.shadowBlur=16;txt(l,540,y+i*80,'400 66px Anton',col);});x.restore();}
// vote buttons over the last shot: vote2('OPEN IT','BLOCK IT',dt)
function vote2(a,b,dt,y=1020){const p=ease(dt/0.35);x.save();x.translate(540,y);x.scale(p*1.2,p*1.2);
 x.font='400 64px Anton';const wa=Math.max(300,x.measureText(a).width+80),wb=Math.max(300,x.measureText(b).width+80);
 x.shadowColor='rgba(0,0,0,0.6)';x.shadowBlur=20;rr(-wa-14,-70,wa,130,18,'#22963a');rr(14,-70,wb,130,18,'#b6201f');x.shadowBlur=0;
 txt(a,-wa/2-14,22,'400 64px Anton','#fff');txt(b,14+wb/2,22,'400 64px Anton','#fff');
 txt('1',-wa-14+34,-30,'400 34px Anton','rgba(255,255,255,0.7)');txt('2',14+34,-30,'400 34px Anton','rgba(255,255,255,0.7)');
 txt('VOTE IN THE COMMENTS',0,120,'300 34px Montserrat, Inter','rgba(255,255,255,0.7)');x.restore();}
// glowing eyes in a dark window/opening (draw after creep so they glow through the dark)
function windowEyes(cx,cy,s,t,on=1){if(on<=0)return;const bl=((t*0.8)%3)<0.1?0.1:1;x.save();x.globalAlpha=on;for(const k of[-1,1]){glow(cx+k*26*s,cy,60*s,'rgba(255,245,210,0.5)');x.fillStyle='#fffbe8';x.beginPath();x.ellipse(cx+k*26*s,cy,16*s,16*s*bl,0,0,7);x.fill();}x.restore();}
function blackout(dt,len=0.5){if(dt<len){x.fillStyle='#000';x.fillRect(0,0,W,H);}}
// shot helper for timelines: S=[[start,end,'name',{...}],...]; shotAt(t) -> {n,dt,dur,p,o}
function shotAt(S,t){const s=S.find(s=>t>=s[0]&&t<s[1])||S[S.length-1];return{n:s[2],dt:t-s[0],dur:s[1]-s[0],p:(t-s[0])/(s[1]-s[0]),o:s[3]||{}};}
