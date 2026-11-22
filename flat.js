// ================= 3AM Rules kit v7 — FLAT FORMAT (owner's reference: Instagram reel by oddhourtales, "Night 1 of 7") =================
// Clean flat 2D cartoon drawn in code: deep navy nights, soft warm lamp glows, simple round-headed hero with a knit cap,
// big HUD (DAY N / 6, clock, place, status chips), handwritten rule notes that fill in line by line, object close-ups,
// bottom captions (1-3 words, key word coloured) with a small speaker tag above them. Load AFTER common.js.
const F={night:'#141a2b',night2:'#1c2438',wall:'#3a3a3f',wall2:'#2e2e33',floor:'#2a2522',wood:'#5a3f2a',wood2:'#4a3322',amber:'#ffb648',amberSoft:'rgba(255,182,72,',
 coat:'#556b3a',coat2:'#46592f',cap:'#9c3b32',skin:'#f4f1e8',ink:'#20232b',steel:'#5d636b',steel2:'#474c53',rust:'#8a5a3c',slow:'#8b9a86',slow2:'#6f7d6b'};
function _fonts(){return ['400 60px Anton','300 30px Montserrat','700 60px Caveat','800 30px Inter'].map(f=>document.fonts.load(f).catch(()=>{}));}
window.READY_P=Promise.all(_fonts());

// ---------- light ----------
function warmLight(cx,cy,r,a=0.55){x.save();x.globalCompositeOperation='screen';x.fillStyle=rg(cx,cy,0,r,[[0,F.amberSoft+a+')'],[0.5,F.amberSoft+(a*0.35)+')'],[1,'rgba(0,0,0,0)']]);x.fillRect(cx-r,cy-r,2*r,2*r);x.restore();}
function darkness(a,holes=[]){x.save();const k=document.createElement('canvas');k.width=W;k.height=H;const g=k.getContext('2d');g.fillStyle=`rgba(5,7,14,${a})`;g.fillRect(0,0,W,H);g.globalCompositeOperation='destination-out';
 for(const [hx,hy,hr] of holes){const gr=g.createRadialGradient(hx,hy,0,hx,hy,hr);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(0.6,'rgba(0,0,0,0.6)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(hx-hr,hy-hr,2*hr,2*hr);}
 x.drawImage(k,0,0);x.restore();}
function beam(x0,y0,ang,len=900,spread=0.28,a=0.45){const r=(ang-90)*D;x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(x0,y0,8,x0,y0,len);g.addColorStop(0,`rgba(255,240,200,${a})`);g.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g;x.beginPath();x.moveTo(x0,y0);x.arc(x0,y0,len,r-spread,r+spread);x.closePath();x.fill();x.restore();}
function rain(t,n=140,a=0.35){x.save();x.strokeStyle=`rgba(200,215,255,${a})`;x.lineWidth=2;for(let i=0;i<n;i++){const sx=(hash(i)*W+t*60)%W,sy=(hash(i+7)*H+t*1400*(0.8+hash(i+3)*0.4))%H;x.beginPath();x.moveTo(sx,sy);x.lineTo(sx-6,sy+38);x.stroke();}x.restore();}
function vignette(a=0.6){x.fillStyle=rg(W/2,H*0.46,H*0.25,H*0.75,[[0,'rgba(0,0,0,0)'],[1,`rgba(0,0,0,${a})`]]);x.fillRect(0,0,W,H);}

// ---------- hero (flat, like the reel's keeper): round white head, dot eyes, knit cap, olive coat, thin dark legs ----------
// hero(px, feetY, s, {walk:t, look:-1..1, mood:'calm'|'worry'|'scared'|'shock', arm:'down'|'hold'|'up'|'point', light:angleDeg, tremble, turn:0..1 (0=front,1=side)})
function hero(px,py,s,o={}){x.save();const t=o.walk??0,wk=o.walk!=null?Math.sin(t*8):0,tr=o.tremble?Math.sin(performance.now?0:0)+Math.sin((o.tt||0)*45)*2*o.tremble:0;
 x.translate(px+tr,py);x.scale(s,s);
 x.fillStyle='rgba(0,0,0,0.35)';x.beginPath();x.ellipse(0,4,70,12,0,0,7);x.fill();
 // legs
 seg([-18,-150],[-18-wk*16,-8],9,F.ink);seg([18,-150],[18+wk*16,-8],9,F.ink);
 x.fillStyle=F.ink;x.beginPath();x.ellipse(-22-wk*16,-4,15,7,0,0,7);x.fill();x.beginPath();x.ellipse(22+wk*16,-4,15,7,0,0,7);x.fill();
 // backpack
 x.fillStyle='#6b4a32';x.beginPath();x.roundRect(o.turn>0.5?-78:30,-330,50,120,12);x.fill();
 // coat
 x.fillStyle=F.coat;x.beginPath();x.roundRect(-55,-345,110,205,[26,26,12,12]);x.fill();x.fillStyle=F.coat2;x.fillRect(-55,-170,110,22);
 seg([0,-330],[0,-160],3,F.coat2);
 // arms
 const arm=o.arm||'down';const sh=[[-52,-320],[52,-320]];
 const A={down:[[-62,-200],[62,-200]],hold:[[-40,-230],[85,-250]],up:[[-80,-400],[80,-400]],point:[[-62,-200],[130,-300]],mouth:[[-20,-410],[62,-200]]}[arm];
 seg(sh[0],[(sh[0][0]+A[0][0])/2-8,(sh[0][1]+A[0][1])/2],10,F.coat);seg([(sh[0][0]+A[0][0])/2-8,(sh[0][1]+A[0][1])/2],A[0],9,F.coat);
 seg(sh[1],[(sh[1][0]+A[1][0])/2+8,(sh[1][1]+A[1][1])/2],10,F.coat);seg([(sh[1][0]+A[1][0])/2+8,(sh[1][1]+A[1][1])/2],A[1],9,F.coat);
 x.fillStyle=F.skin;for(const h of A){x.beginPath();x.arc(h[0],h[1],11,0,7);x.fill();}
 if(o.light!=null){x.fillStyle='#2b2b2b';x.save();x.translate(A[1][0],A[1][1]);x.rotate((o.light-90)*D);x.fillRect(-4,-9,46,18);x.fillStyle='#ffe9a8';x.fillRect(40,-11,8,22);x.restore();}
 // head
 const hx=(o.turn||0)*6,hy=-420;x.fillStyle=F.skin;x.beginPath();x.arc(hx,hy,66,0,7);x.fill();x.lineWidth=5;x.strokeStyle=F.ink;x.stroke();
 // cap
 x.fillStyle=F.cap;x.beginPath();x.arc(hx,hy-8,68,Math.PI*1.05,Math.PI*1.95);x.closePath();x.fill();x.fillRect(hx-70,hy-28,140,20);x.beginPath();x.arc(hx,hy-78,10,0,7);x.fill();
 // face
 const lk=(o.look||0)*14+(o.turn||0)*22,m=o.mood||'calm';x.fillStyle=F.ink;
 const er=m==='shock'?9:7;x.beginPath();x.arc(hx-20+lk,hy+6,er,0,7);x.arc(hx+20+lk,hy+6,er,0,7);x.fill();
 if(m!=='calm'){seg([hx-34+lk,hy-12],[hx-10+lk,hy-6+(m==='scared'?-4:0)],5,F.ink);seg([hx+34+lk,hy-12],[hx+10+lk,hy-6+(m==='scared'?-4:0)],5,F.ink);}
 if(arm!=='mouth'){x.lineWidth=5;x.strokeStyle=F.ink;x.beginPath();if(m==='shock'){x.fillStyle=F.ink;x.ellipse(hx+lk*0.6,hy+34,9,12,0,0,7);x.fill();}else if(m==='scared'||m==='worry'){x.moveTo(hx-12+lk*0.6,hy+36);x.quadraticCurveTo(hx+lk*0.6,hy+28,hx+12+lk*0.6,hy+36);x.stroke();}else{x.moveTo(hx-10+lk*0.6,hy+32);x.lineTo(hx+10+lk*0.6,hy+32);x.stroke();}}
 if(m==='scared'||m==='shock'){x.fillStyle='rgba(150,200,255,0.9)';x.beginPath();x.ellipse(hx+58,hy-24,6,10,0.3,0,7);x.fill();}
 x.restore();}

// ---------- the slow one (flat zombie: grey-green, thin, hollow eyes; no gore) ----------
function slowOne(px,py,s,o={}){x.save();x.translate(px,py);x.scale(s,s);const t=o.t||0;
 x.fillStyle='rgba(0,0,0,0.35)';x.beginPath();x.ellipse(0,4,70,12,0,0,7);x.fill();
 if(o.sit){x.fillStyle=F.slow2;x.beginPath();x.roundRect(-60,-120,120,110,20);x.fill();seg([-40,-20],[-90,-5],12,F.slow2);seg([40,-20],[90,-5],12,F.slow2);}
 else{seg([-14,-150],[-22,-6],11,F.slow2);seg([14,-150],[24,-6],11,F.slow2);x.fillStyle=F.slow2;x.beginPath();x.roundRect(-42,-330,84,190,18);x.fill();}
 const top=o.sit?-120:-330;
 x.fillStyle='#55624f';for(let i=0;i<5;i++){x.beginPath();x.moveTo(-40+i*20,top+(o.sit?100:185));x.lineTo(-30+i*20,top+(o.sit?120:215));x.lineTo(-20+i*20,top+(o.sit?100:185));x.fill();} // torn hem
 const tap=o.tap?Math.max(0,Math.sin(t*9))*18:0;
 seg([-38,top+20],[-70,top+110],10,F.slow);seg([-70,top+110],[-86,top+170-tap],9,F.slow);
 seg([38,top+20],[66,top+110],10,F.slow);seg([66,top+110],[80,top+170],9,F.slow);
 const lift=o.lift??1;const hx=0,hy=top-60+(1-lift)*55;x.save();x.translate(hx,hy);x.rotate((1-lift)*0.5);
 x.fillStyle=F.slow;x.beginPath();x.ellipse(0,0,56,62,0,0,7);x.fill();x.lineWidth=4;x.strokeStyle='#3d463a';x.stroke();
 if(lift>0.35){x.fillStyle='#0b0d0c';x.beginPath();x.ellipse(-20,-4,13,17,0,0,7);x.ellipse(20,-4,13,17,0,0,7);x.fill();
  if(o.eyeGlow){for(const k of[-20,20]){glow(k,-4,30,'rgba(255,240,200,0.45)');x.fillStyle='#fff7da';x.beginPath();x.arc(k,-4,4,0,7);x.fill();}}
  x.fillStyle='#0b0d0c';x.beginPath();x.ellipse(0,32,o.talk?10+Math.abs(Math.sin(t*14))*6:8,o.talk?8+Math.abs(Math.sin(t*14))*7:4,0,0,7);x.fill();}
 x.restore();
 if(o.chain){x.strokeStyle='#9aa0a6';x.lineWidth=6;x.setLineDash([16,8]);x.beginPath();x.moveTo(-86,top+170);x.quadraticCurveTo(-160,top+140,o.chain,top-40);x.stroke();x.setLineDash([]);}
 x.restore();}

// ---------- sets ----------
function bunkerRoom(t,o={}){// wide view of the bunker: curved concrete, bulb, cot, shelf, radio, back door
 x.fillStyle=F.wall;x.fillRect(0,0,W,H);
 for(let i=0;i<7;i++){x.fillStyle=i%2?'#353539':'#3d3d42';x.beginPath();x.ellipse(540,520,620-i*60,420-i*30,0,Math.PI,0);x.fill();} // ribbed ceiling
 x.fillStyle=F.wall2;x.fillRect(0,900,W,500);for(let i=0;i<6;i++)x.fillRect(0,900+i*90,W,4);
 x.fillStyle=F.floor;x.fillRect(0,1400,W,520);x.fillStyle='#231f1c';for(let i=0;i<5;i++)x.fillRect(0,1460+i*95,W,5);
 // back door
 door(540,1400,0.9,t,o);
 // cot
 x.fillStyle='#4b5560';x.fillRect(40,1250,330,30);x.fillStyle='#6b7780';x.beginPath();x.roundRect(40,1200,330,60,12);x.fill();x.fillStyle='#d8d2c4';x.beginPath();x.roundRect(60,1175,110,40,16);x.fill();
 seg([50,1280],[50,1400],8,'#3a4048');seg([360,1280],[360,1400],8,'#3a4048');
 // shelf + cans
 x.fillStyle=F.wood2;for(let k=0;k<3;k++){x.fillRect(780,1000+k*120,280,16);for(let i=0;i<5;i++){x.fillStyle=['#b04a3a','#c9a448','#7f9a5a','#6f8aa8','#b08a5a'][(i+k)%5];x.beginPath();x.roundRect(795+i*52,1000+k*120-62,40,62,6);x.fill();}x.fillStyle=F.wood2;}
 // radio on crate
 x.fillStyle=F.wood;x.fillRect(780,1260,200,140);x.fillStyle='#3b3631';x.beginPath();x.roundRect(800,1170,160,95,10);x.fill();x.fillStyle=o.radioOn?'#ffcc55':'#5a5240';x.fillRect(880,1190,62,34);if(o.radioOn)warmLight(911,1207,120,0.5);
 // bulb
 const sw=Math.sin(t*1.4)*(o.swing??6)*D;x.save();x.translate(540,0);x.rotate(sw);seg([0,0],[0,330],3,'#222');x.fillStyle='#ffe6a0';x.beginPath();x.arc(0,350,22,0,7);x.fill();x.restore();
 if(o.bulb!==false){const bx=540+Math.sin(sw)*350;warmLight(bx,350,700,0.55);}
 if(o.hero)hero(o.hero[0],o.hero[1],o.hero[2],o.heroO||{});
 darkness(o.dark??0.45,[[540+Math.sin(sw)*350,360,760],...(o.holes||[])]);}
function door(cx,by,s,t,o={}){x.save();const kn=o.knock?Math.max(0,Math.sin(t*20))*Math.max(0,Math.sin(t*3.1))*6:0;x.translate(cx+kn,by);x.scale(s,s);
 const w=360,h=640;x.fillStyle='#2a2d31';x.fillRect(-w/2-22,-h-22,w+44,h+22);
 if(o.open){x.fillStyle='#05060a';x.fillRect(-w/2,-h,w,h);for(let i=0;i<5;i++){x.fillStyle=`rgba(200,215,230,${0.06+0.03*Math.sin(t*2+i)})`;x.beginPath();x.ellipse(-w/2+60+((t*40+i*80)%w),-60-i*30,120,30,0,0,7);x.fill();}}
 const ow=o.open?w*(1-o.open*0.75):w;x.fillStyle=F.steel;x.fillRect(-w/2,-h,ow,h);x.fillStyle=F.steel2;x.fillRect(-w/2,-h,ow,18);x.fillRect(-w/2,-h/2,ow,12);
 x.fillStyle='#8b9096';for(let i=0;i<5;i++){x.beginPath();x.arc(-w/2+24,-h+60+i*130,7,0,7);x.arc(-w/2+ow-24,-h+60+i*130,7,0,7);x.fill();}
 if(!o.open||o.open<0.5){x.fillStyle='#07080b';x.fillRect(-60,-h+90,120,100);if(o.eyes){for(const k of[-24,24]){glow(k,-h+140,50,'rgba(255,240,200,0.5)');x.fillStyle='#fff6d8';x.beginPath();x.arc(k,-h+140,9,0,7);x.fill();}}}
 x.fillStyle=F.rust;x.globalAlpha=0.5;x.beginPath();x.ellipse(-w/2+ow*0.3,-120,70,40,0,0,7);x.fill();x.globalAlpha=1;
 const cl=o.chains??1;if(cl>0&&!o.open){x.globalAlpha=cl;x.strokeStyle='#a7adb3';x.lineWidth=12;x.setLineDash([22,10]);const lift=(1-cl)*-120;
  x.beginPath();x.moveTo(-w/2,-h*0.75+lift);x.lineTo(w/2,-h*0.25+lift);x.moveTo(w/2,-h*0.75+lift);x.lineTo(-w/2,-h*0.25+lift);x.stroke();x.setLineDash([]);
  x.fillStyle='#c9a448';x.beginPath();x.roundRect(-34,-h*0.5-20+lift,68,62,10);x.fill();x.strokeStyle='#c9a448';x.lineWidth=10;x.beginPath();x.arc(0,-h*0.5-20+lift,24,Math.PI,0);x.stroke();x.globalAlpha=1;}
 x.restore();}
function doorClose(t,o={}){x.fillStyle=F.wall2;x.fillRect(0,0,W,H);x.fillStyle=F.floor;x.fillRect(0,1560,W,360);
 door(540,1640,2.2,t,o);
 beam(980,1700,-28,1500,0.3,0.4);darkness(o.dark??0.55,[[560,1000,620]]);}
function tunnel(t,o={}){const sc=(t*90)%240;x.fillStyle='#1a1d22';x.fillRect(0,0,W,H);
 x.fillStyle='#2b2f35';x.fillRect(0,500,W,900);x.fillStyle='#24272c';for(let i=-1;i<6;i++)x.fillRect(i*240-sc,500,14,900);
 for(const py of[600,680]){x.fillStyle='#4a4f55';x.fillRect(0,py,W,26);for(let i=-1;i<6;i++){x.fillStyle='#3a3e43';x.fillRect(i*240+100-sc,py-6,22,38);}}
 x.fillStyle='#1f2226';x.fillRect(0,1400,W,520);for(let i=0;i<4;i++){x.fillStyle='rgba(120,150,180,0.25)';x.beginPath();x.ellipse((i*330-sc*1.2+2000)%1300-100,1470+i*30,120,14,0,0,7);x.fill();}
 for(let i=0;i<6;i++){const dy=((t*700+i*230)%800);x.fillStyle='rgba(170,200,230,0.7)';x.beginPath();x.ellipse((i*197)%W,706+dy,4,9,0,0,7);x.fill();}
 x.fillStyle='#ffe6a0';x.beginPath();x.arc(900,560,10,0,7);x.fill();
 hero(420,1440,1.05,{walk:t,mood:'worry',arm:'hold',light:o.light??-80,look:0.6,tt:t});
 beam(500,1190,-80+Math.sin(t*9)*3,1000,0.22,0.5);darkness(0.72,[[800,1180,520],[420,1100,320],[900,560,120]]);}
function tinyRoom(t,o={}){x.fillStyle='#34312e';x.fillRect(0,0,W,H);x.fillStyle='#2b2826';x.fillRect(0,1380,W,540);
 for(let i=0;i<9;i++){x.fillStyle=i%2?'#3a3632':'#36322f';x.fillRect(0,200+i*130,W,128);}
 // chair
 x.fillStyle=F.wood;x.fillRect(150,1180,170,22);x.fillRect(150,960,22,240);x.fillRect(298,960,22,240);x.fillRect(150,960,170,22);x.fillRect(160,1200,16,200);x.fillRect(300,1200,16,200);
 // sleeping bag
 x.fillStyle='#4f6b8a';x.beginPath();x.roundRect(380,1360,380,90,40);x.fill();x.fillStyle='#3c5470';x.beginPath();x.moveTo(600,1360);x.lineTo(660,1330);x.lineTo(700,1365);x.fill();
 // broken chains on wall
 x.strokeStyle='#9aa0a6';x.lineWidth=8;x.setLineDash([18,9]);x.beginPath();x.moveTo(840,700);x.lineTo(870,980);x.moveTo(960,700);x.lineTo(940,900);x.stroke();x.setLineDash([]);x.fillStyle='#6b7076';x.fillRect(820,680,170,26);
 // scratches
 x.strokeStyle='rgba(20,20,20,0.6)';x.lineWidth=5;for(let i=0;i<4;i++){x.beginPath();x.moveTo(480+i*26,820);x.lineTo(520+i*26,1010);x.stroke();}
 if(o.slow)slowOne(o.slowX??860,1420,o.slowS??1.0,{sit:true,t,tap:o.tap,lift:o.lift??1,chain:-40,eyeGlow:o.eyeGlow,talk:o.talk});
 if(o.hero)hero(o.hero[0],o.hero[1],o.hero[2],o.heroO||{});
 const bx=o.beamX??(540+Math.sin(t*0.9)*300);beam(o.bsx??100,o.bsy??1900,o.bang??25,1700,0.25,0.5);
 darkness(o.dark??0.68,[[bx,1050,o.beamR??420],...(o.holes||[])]);}
function heroClose(t,o={}){x.fillStyle=o.bg||'#1d2230';x.fillRect(0,0,W,H);warmLight(540,800,800,0.18);
 hero(540,2300,2.6,{mood:o.mood||'scared',look:o.look||0,turn:o.turn||0,arm:o.arm,tt:t,tremble:o.tremble});
 if(o.knock){const k=Math.max(0,Math.sin(t*20))*Math.max(0,Math.sin(t*3.1));x.fillStyle=`rgba(0,0,0,${k*0.25})`;x.fillRect(0,0,W,H);}}
function slowClose(t,o={}){x.fillStyle='#16181d';x.fillRect(0,0,W,H);
 slowOne(540,2050,2.6,{sit:false,t,tap:o.tap,lift:o.lift??1,eyeGlow:o.eyeGlow,talk:o.talk,chain:-260});
 beam(1080,1900,-30,1800,0.3,0.35);darkness(0.6,[[540,900,620]]);if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,80,70,${o.red})`;x.fillRect(0,0,W,H);x.restore();}}
function handTap(t,o={}){x.fillStyle='#24211f';x.fillRect(0,0,W,H);x.fillStyle='#2e2a27';x.fillRect(0,1150,W,770);
 x.strokeStyle='#9aa0a6';x.lineWidth=10;x.setLineDash([22,10]);x.beginPath();x.moveTo(-20,700);x.quadraticCurveTo(200,820,300,1020);x.stroke();x.setLineDash([]);
 const tap=Math.max(0,Math.sin(t*6.2));x.save();x.translate(560,1240-tap*70);x.rotate(-0.5);
 x.fillStyle=F.slow;x.beginPath();x.roundRect(-700,-70,640,140,60);x.fill();x.fillStyle=F.slow2;x.beginPath();x.roundRect(-330,-82,70,164,20);x.fill();
 x.fillStyle=F.slow;x.beginPath();x.ellipse(0,0,110,90,0,0,7);x.fill();
 for(let i=0;i<4;i++){x.save();x.translate(60+i*8,-60+i*40);x.rotate(0.5+i*0.12);x.beginPath();x.roundRect(0,-16,150-i*12,32,16);x.fill();x.restore();}
 x.restore();
 if(tap<0.1){x.strokeStyle='rgba(255,255,255,0.55)';x.lineWidth=6;for(let k=0;k<3;k++){x.beginPath();x.arc(700,1330,50+k*40,Math.PI*1.1,Math.PI*1.9);x.stroke();}}
 beam(1080,1900,-35,1600,0.3,0.45);darkness(0.6,[[620,1250,560]]);}
function radioClose(t,o={}){x.fillStyle=F.wood2;x.fillRect(0,0,W,H);for(let i=0;i<20;i++){x.fillStyle=i%2?'#4a3322':'#432e1f';x.fillRect(0,i*100,W,100);}
 x.fillStyle='#4b453d';x.beginPath();x.roundRect(110,560,860,700,40);x.fill();x.fillStyle='#3a352f';for(let r=0;r<10;r++)for(let c2=0;c2<10;c2++){x.beginPath();x.arc(200+c2*36,700+r*36,8,0,7);x.fill();}
 x.fillStyle='#2b2620';x.beginPath();x.roundRect(560,640,360,180,16);x.fill();x.fillStyle='#ffc95a';x.beginPath();x.roundRect(578,656,324,148,10);x.fill();
 txt('CH 3',740,720,'400 56px Anton','#3a2a10');x.strokeStyle='#3a2a10';x.lineWidth=4;x.beginPath();for(let i=0;i<300;i++){const yy=770+(o.talk?Math.sin(i*0.25+t*20)*Math.sin(i*0.05)*24*Math.abs(Math.sin(t*5)):0);i?x.lineTo(590+i,yy):x.moveTo(590,yy);}x.stroke();
 for(const [kx,lab] of [[650,'VOLUME'],[830,'CHANNEL']]){x.fillStyle='#2f2a24';x.beginPath();x.arc(kx,960,70,0,7);x.fill();txt(lab,kx,1080,'400 28px Anton','#8f8572');}
 seg([900,560],[1010,250],8,'#6b645a');warmLight(740,730,700,0.45);vignette(0.6);}
// rule note: lines = [[n,'text','text2'],...]; shown = how many lines are visible (can be fractional for the newest)
function ruleNote(t,lines,shown,o={}){x.fillStyle=F.wood2;x.fillRect(0,0,W,H);for(let i=0;i<20;i++){x.fillStyle=i%2?'#4a3322':'#3f2b1d';x.fillRect(0,i*100,W,100);}
 x.save();x.translate(540,960);x.rotate(-0.012);x.shadowColor='rgba(0,0,0,0.5)';x.shadowBlur=30;x.fillStyle='#f1e9d6';x.fillRect(-430,-640,860,1180);x.shadowBlur=0;
 for(let y=-460;y<520;y+=78)seg([-400,y],[400,y],2,'rgba(90,110,150,0.22)');seg([-330,-640],[-330,540],2,'rgba(200,80,80,0.35)');
 x.fillStyle='#c33';x.beginPath();x.arc(0,-610,12,0,7);x.fill();
 txt(o.title||'Rules for the bunker',0,-520,'700 74px Caveat','#2a2a2a');seg([-250,-498],[250,-498],3,'#2a2a2a');
 let y=-400;lines.forEach((L,i)=>{if(i>=shown)return;const a=clamp(shown-i);x.globalAlpha=a;txt(L[0]+'.',-360,y,'700 58px Caveat','#b2302a','left');
  txt(L[1],-300,y,'700 56px Caveat',L[3]?'#b2302a':'#2a2a2a','left');if(L[2])txt(L[2],-300,y+66,'700 56px Caveat',L[3]?'#b2302a':'#2a2a2a','left');y+=L[2]?170:104;x.globalAlpha=1;});
 if(o.sign)txt(o.sign,260,480,'700 60px Caveat','#2a2a2a');
 x.fillStyle=F.wood2;x.beginPath();x.moveTo(430,330);x.lineTo(300,360);x.lineTo(430,420);x.fill(); // torn corner
 x.restore();vignette(0.5);}

// ---------- HUD (like the reel: red dot + DAY n / 6, big clock, place line, status chips) ----------
function hud3(o){x.save();const X0=48,Y0=96;x.fillStyle='#e24a3b';x.beginPath();x.arc(X0+8,Y0-10,8,0,7);x.fill();
 txt(`DAY ${o.day} / ${o.days||6}`,X0+26,Y0,'800 30px Inter','#e24a3b','left');
 x.shadowColor='rgba(0,0,0,0.6)';x.shadowBlur=12;txt(o.time,X0,Y0+110,'400 110px Anton','#fff','left');x.font='400 110px Anton';const tw=x.measureText(o.time).width;txt(o.ampm||'PM',X0+tw+12,Y0+108,'400 46px Anton','#fff','left');x.shadowBlur=0;
 txt(o.place,X0+2,Y0+150,'800 24px Inter','rgba(255,255,255,0.75)','left');
 let cx=X0;for(const ch of o.chips||[]){x.font='800 26px Inter';const w=x.measureText(ch[0]).width+34;x.strokeStyle=ch[1];x.lineWidth=3;x.beginPath();x.roundRect(cx,Y0+170,w,48,10);x.stroke();x.fillStyle='rgba(0,0,0,0.35)';x.fill();txt(ch[0],cx+17,Y0+204,'800 26px Inter',ch[1],'left');cx+=w+14;}
 x.restore();}
// bottom captions: 1-3 words; window.HI={gold:[...],red:[...]}; speaker(t) -> tag text or null
function captions3(t,y=1560,speaker=null){const ws=window.WORDS||[];let i=ws.findIndex(w=>t<w.e+0.06);if(i<0||t<ws[i].s-0.25)return;
 const start=Math.floor(i/3)*3,grp=ws.slice(start,i+1);const H2=window.HI||{gold:[],red:[]};const words=grp.map(w=>w.w.replace(/["“”]/g,'').toUpperCase());
 let fs=96;x.font=`400 ${fs}px Anton`;const sp=26;let wd=words.map(w=>x.measureText(w).width),tot=wd.reduce((a,b)=>a+b,0)+sp*(words.length-1);
 if(tot>980){fs=Math.floor(fs*980/tot);x.font=`400 ${fs}px Anton`;wd=words.map(w=>x.measureText(w).width);tot=wd.reduce((a,b)=>a+b,0)+sp*(words.length-1);}
 if(speaker){x.save();x.shadowColor='rgba(0,0,0,0.9)';x.shadowBlur=10;txt(speaker,540,y-fs-6,'400 40px Anton','#ffcf4a');x.restore();}
 let cx=540-tot/2;words.forEach((w,k)=>{const key=w.toLowerCase().replace(/[^a-z0-9']/g,'');const col=H2.red.includes(key)?'#ff4a3d':H2.gold.includes(key)?'#ffcf4a':'#fff';
  x.save();x.textAlign='left';x.font=`400 ${fs}px Anton`;x.shadowColor='rgba(0,0,0,0.95)';x.shadowBlur=20;x.shadowOffsetY=4;x.fillStyle=col;x.fillText(w,cx,y);x.restore();cx+=wd[k]+sp;});}
function vote3(a,b,dt,y=1180){const p=ease(dt/0.35);x.save();x.translate(540,y);x.scale(p,p);x.font='400 70px Anton';
 const wa=Math.max(340,x.measureText(a).width+90),wb=Math.max(340,x.measureText(b).width+90);x.shadowColor='rgba(0,0,0,0.6)';x.shadowBlur=24;
 rr(-wa-16,-80,wa,150,24,'#2f9a4a');rr(16,-80,wb,150,24,'#c3352c');x.shadowBlur=0;txt(a,-wa/2-16,26,'400 70px Anton','#fff');txt(b,16+wb/2,26,'400 70px Anton','#fff');
 txt('1',-wa-16+36,-36,'400 36px Anton','rgba(255,255,255,0.75)');txt('2',16+36,-36,'400 36px Anton','rgba(255,255,255,0.75)');
 txt('COMMENT 1 OR 2',0,150,'800 36px Inter','rgba(255,255,255,0.85)');x.restore();}
function flashRed(dt,len=0.4){if(dt<len){x.fillStyle=`rgba(200,20,20,${0.45*(1-dt/len)})`;x.fillRect(0,0,W,H);}}
function cutFlash(dt){if(dt<0.07){x.fillStyle=`rgba(255,255,255,${0.15*(1-dt/0.07)})`;x.fillRect(0,0,W,H);}}
function grainLite(t,a=0.06){x.save();x.globalAlpha=a;for(let i=0;i<900;i++){x.fillStyle=hash(i+Math.floor(t*24)*13)>0.5?'#fff':'#000';x.fillRect(hash(i*3+Math.floor(t*24))*W,hash(i*7+Math.floor(t*24))*H,2,2);}x.restore();}

// ---------- added 22 Nov (Bunker Part 2 BLOCK IT) ----------
// barricade(stage 0..3): drawn in front of the bunkerRoom back door (door at x540, bottom y1400, scale .9). 1 = cot on its end, 2 = + shelf, 3 = + crates. shake = hit from behind
function barricade(t,stage,o={}){const sh=o.shake?Math.max(0,Math.sin(t*22))*o.shake*10:0;x.save();x.translate(sh,0);
 if(stage>0){const a=clamp(stage);x.globalAlpha=a;x.save();x.translate(400,1400);x.rotate(-0.08);x.fillStyle='#4b5560';x.fillRect(-30,-560,60,560);x.fillStyle='#6b7780';x.beginPath();x.roundRect(10,-540,70,520,14);x.fill();for(let i=0;i<6;i++)seg([0,-500+i*90],[90,-500+i*90],5,'#3a4048');x.restore();x.globalAlpha=1;}
 if(stage>1){const a=clamp(stage-1);x.globalAlpha=a;x.fillStyle=F.wood2;x.fillRect(560,1000,190,400);x.fillStyle=F.wood;for(let k=0;k<4;k++)x.fillRect(560,1010+k*100,190,14);x.globalAlpha=1;}
 if(stage>2){const a=clamp(stage-2);x.globalAlpha=a;for(const [bx,by,bw,bh] of [[430,1250,180,150],[600,1250,170,150],[500,1110,190,140],[470,980,150,130]]){x.fillStyle=F.wood;x.fillRect(bx,by,bw,bh);x.strokeStyle=F.wood2;x.lineWidth=8;x.strokeRect(bx+6,by+6,bw-12,bh-12);seg([bx+6,by+6],[bx+bw-6,by+bh-6],6,F.wood2);}x.globalAlpha=1;}
 x.restore();}
// cansRoll: close-up of tin cans rolling across the floor (noisy moment)
function cansRoll(t,o={}){x.fillStyle=F.floor;x.fillRect(0,0,W,H);for(let i=0;i<14;i++){x.fillStyle=i%2?'#2a2522':'#26211e';x.fillRect(0,i*140,W,140);}
 const cols=['#b04a3a','#c9a448','#7f9a5a','#6f8aa8'];for(let i=0;i<4;i++){const px=((t*(200+i*130)+i*370)%1500)-200,py=900+i*180,r=70;x.save();x.translate(px,py);x.rotate(t*(3+i));x.fillStyle=cols[i];x.beginPath();x.roundRect(-r,-r*0.8,r*2,r*1.6,14);x.fill();x.fillStyle='#d9d9d9';x.fillRect(-r,-r*0.8,14,r*1.6);x.fillRect(r-14,-r*0.8,14,r*1.6);x.fillStyle='rgba(255,255,255,0.35)';x.fillRect(-r+20,-r*0.5,r*2-40,20);x.restore();
  if(Math.sin(t*9+i)>0.85){x.strokeStyle='rgba(255,255,255,0.5)';x.lineWidth=5;for(let k=0;k<2;k++){x.beginPath();x.arc(px,py,90+k*35,Math.PI*1.2,Math.PI*1.8);x.stroke();}}}
 warmLight(540,300,900,0.35);vignette(0.6);}
// doorGap: low close-up of the gap under the back door; a page slides in (p 0..1) or back out (dir -1); feet shadows move in the light from behind
function doorGap(t,p,o={}){x.fillStyle=F.steel;x.fillRect(0,0,W,1180);x.fillStyle=F.steel2;x.fillRect(0,1120,W,60);x.fillStyle='#8b9096';for(let i=0;i<6;i++){x.beginPath();x.arc(90+i*180,1080,9,0,7);x.fill();}
 x.fillStyle='#07080b';x.fillRect(0,1180,W,46);// gap
 x.save();x.globalCompositeOperation='screen';x.fillStyle=`rgba(255,220,160,${0.25+0.1*Math.sin(t*3)})`;x.fillRect(0,1186,W,34);x.restore();
 if(o.feet){for(const k of[-1,1]){const fx=540+k*120+Math.sin(t*1.5)*40;x.fillStyle='#07080b';x.fillRect(fx-50,1186,100,34);}}
 x.fillStyle=F.floor;x.fillRect(0,1226,W,700);for(let i=0;i<5;i++){x.fillStyle='#231f1c';x.fillRect(0,1300+i*130,W,6);}
 const ex=lerp(-360,140,ease(p));if(p>0){x.save();x.beginPath();x.rect(0,1190,W,800);x.clip();x.translate(540,1226+ex);x.rotate(0.06);x.fillStyle='#efe6d0';x.beginPath();x.moveTo(-230,-20);x.lineTo(230,-20);x.lineTo(240,300);x.lineTo(150,320);x.lineTo(60,295);x.lineTo(-40,325);x.lineTo(-150,300);x.lineTo(-240,320);x.closePath();x.fill();
  for(let i=0;i<5;i++)seg([-190,30+i*50],[lerp(60,190,hash(i)),30+i*50],7,'rgba(40,40,40,0.55)');x.restore();}
 beam(1080,1900,-40,1500,0.3,0.4);darkness(o.dark??0.5,[[540,1300,560]]);}
// tornPage: big torn notebook page in M.'s handwriting. lines: [['text',red?],...]; shown = lines visible (fractional ok)
function tornPage(t,lines,shown,o={}){x.fillStyle=F.wood2;x.fillRect(0,0,W,H);for(let i=0;i<20;i++){x.fillStyle=i%2?'#4a3322':'#3f2b1d';x.fillRect(0,i*100,W,100);}
 x.save();x.translate(540,900);x.rotate(0.03);x.shadowColor='rgba(0,0,0,0.5)';x.shadowBlur=30;x.fillStyle='#efe6d0';
 x.beginPath();x.moveTo(-400,-520);x.lineTo(400,-520);x.lineTo(410,420);x.lineTo(300,460);x.lineTo(180,420);x.lineTo(40,470);x.lineTo(-90,425);x.lineTo(-220,465);x.lineTo(-410,430);x.closePath();x.fill();x.shadowBlur=0;
 for(let y=-420;y<420;y+=78)seg([-370,y],[370,y],2,'rgba(90,110,150,0.22)');
 x.fillStyle='rgba(120,80,40,0.12)';x.beginPath();x.ellipse(250,-380,90,60,0.3,0,7);x.fill();
 let y=-400;lines.forEach((L,i)=>{if(i>=shown)return;x.globalAlpha=clamp(shown-i);txt(L[0],-340,y,`700 ${L[2]||60}px Caveat`,L[1]?'#b2302a':'#2a2a2a','left');y+=L[2]?L[2]*1.5:92;x.globalAlpha=1;});
 x.restore();if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,120,110,${o.red})`;x.fillRect(0,0,W,H);x.restore();}vignette(0.55);}

// ---------- added 23 Nov (Bunker Part 3 ANSWER THE RADIO) ----------
// woodsSky: night (navy + stars) or dawn (grey-pink) sky with a row of pine silhouettes; base = treeline y
function woodsSky(t,o={}){const dawn=o.dawn;x.fillStyle=lg(0,0,0,H,dawn?[[0,'#5b6478'],[0.45,'#a88f98'],[0.7,'#c9a8a0'],[1,'#6f6a68']]:[[0,'#0d1222'],[0.6,'#1c2640'],[1,'#141a2b']]);x.fillRect(0,0,W,H);
 if(!dawn)for(let i=0;i<70;i++){x.fillStyle=`rgba(255,255,255,${0.25+0.5*hash(i+3)*(0.6+0.4*Math.sin(t*2+i))})`;x.fillRect(hash(i)*W,hash(i+9)*900,3,3);}
 else glow(780,(o.base??1000)-40,520,'rgba(255,200,170,0.35)');
 const base=o.base??1000;for(let k=0;k<2;k++){x.fillStyle=k?(dawn?'#3e3f47':'#0b0f1a'):(dawn?'#5a5a63':'#141b2c');for(let i=-1;i<12;i++){const tx=i*105+(k?40:0)+hash(i+k*20)*40,th=(k?260:190)+hash(i*3+k)*150;x.beginPath();x.moveTo(tx-70,base+k*30);x.lineTo(tx,base+k*30-th);x.lineTo(tx+70,base+k*30);x.fill();}}}
// hatchOutside: the bunker hatch in the woods clearing; slow ones in a ring around it. o:{dawn, n (count), sit, crawl, lift, eyeGlow, notebook, shake}
function hatchOutside(t,o={}){woodsSky(t,{dawn:o.dawn,base:980});x.fillStyle=o.dawn?'#4d5245':'#1b2219';x.fillRect(0,1000,W,920);
 for(let i=0;i<60;i++){x.fillStyle=o.dawn?'#5d6553':'#232c20';const gx=hash(i)*W,gy=1010+hash(i+5)*900;x.beginPath();x.moveTo(gx-8,gy);x.lineTo(gx,gy-26-hash(i+2)*20);x.lineTo(gx+8,gy);x.fill();}
 const hx=540,hy=1260,sh=o.shake?Math.sin(t*40)*4*o.shake:0;
 // ring of slow ones (back half first)
 const n=o.n??7,pts=[];for(let i=0;i<n;i++){const a=Math.PI*2*i/n+Math.PI/2+0.25;pts.push([hx+Math.cos(a)*430,hy+Math.sin(a)*170,i]);}
 const draw=p=>{const sc=0.78+(p[1]-hy+170)/340*0.42;const sx=o.crawl?lerp(p[0],hx+(p[0]-hx)*0.55,ease(o.crawl)):p[0],sy=o.crawl?lerp(p[1],hy+(p[1]-hy)*0.55,ease(o.crawl)):p[1];
  slowOne(sx,sy,sc,{sit:o.sit!==false,t:t+p[2],tap:o.crawl!=null,lift:o.lift??1,eyeGlow:o.eyeGlow});
  if(o.notebook&&p[2]===Math.floor(n/2)){x.save();x.translate(sx-60*sc,sy-40*sc);x.rotate(-0.2);x.fillStyle='#6b4630';x.fillRect(-34*sc,-46*sc,68*sc,92*sc);x.fillStyle='#e9dcc0';x.fillRect(30*sc,-42*sc,6*sc,84*sc);txt('M.',0,14*sc,`700 ${40*sc}px Caveat`,'#f1e9d6');x.restore();}};
 pts.filter(p=>p[1]<hy).sort((a,b)=>a[1]-b[1]).forEach(draw);
 // hatch
 x.save();x.translate(sh,0);x.fillStyle='#2a2d31';x.beginPath();x.ellipse(hx,hy+14,230,76,0,0,7);x.fill();x.fillStyle=F.steel;x.beginPath();x.ellipse(hx,hy,220,70,0,0,7);x.fill();
 x.strokeStyle=F.steel2;x.lineWidth=8;x.beginPath();x.ellipse(hx,hy,170,52,0,0,7);x.stroke();x.fillStyle=F.rust;x.globalAlpha=0.45;x.beginPath();x.ellipse(hx-90,hy+10,60,18,0,0,7);x.fill();x.globalAlpha=1;
 x.strokeStyle='#9aa0a6';x.lineWidth=10;x.beginPath();x.ellipse(hx,hy-26,80,24,0,0,7);x.stroke();for(let k=0;k<4;k++){const a=k*Math.PI/2+t*0.0;seg([hx,hy-26],[hx+Math.cos(a)*80,hy-26+Math.sin(a)*24],7,'#9aa0a6');}
 x.fillStyle='#b9bec4';x.beginPath();x.ellipse(hx,hy-26,16,7,0,0,7);x.fill();x.restore();
 if(o.scratch){x.strokeStyle='rgba(255,255,255,0.6)';x.lineWidth=5;for(let k=0;k<3;k++){const a=Math.sin(t*12+k)>0;if(a){x.beginPath();x.arc(hx,hy-40,120+k*50,Math.PI*1.15,Math.PI*1.85);x.stroke();}}}
 pts.filter(p=>p[1]>=hy).sort((a,b)=>a[1]-b[1]).forEach(draw);
 if(o.dawn){for(let i=0;i<5;i++){x.fillStyle=`rgba(230,220,225,${0.10+0.04*Math.sin(t+i)})`;x.beginPath();x.ellipse((i*300+t*25)%1500-200,1150+i*120,420,60,0,0,7);x.fill();}vignette(0.45);}
 else darkness(o.dark??0.5,[[hx,hy-100,640]]);}
// radioTower: lattice radio tower in the woods with a blinking red light and a hut with a lit window (Jo's silhouette). o:{dawn, talk}
function radioTower(t,o={}){woodsSky(t,{dawn:o.dawn,base:1350});const tx=640,top=380,bot=1330;
 x.strokeStyle=o.dawn?'#3b3c44':'#2a3040';x.lineWidth=10;x.beginPath();x.moveTo(tx-120,bot);x.lineTo(tx,top);x.lineTo(tx+120,bot);x.stroke();x.lineWidth=5;
 for(let i=0;i<9;i++){const y1=top+(bot-top)*i/9,y2=top+(bot-top)*(i+1)/9,w1=120*i/9,w2=120*(i+1)/9;x.beginPath();x.moveTo(tx-w1,y1);x.lineTo(tx+w2,y2);x.moveTo(tx+w1,y1);x.lineTo(tx-w2,y2);x.moveTo(tx-w2,y2);x.lineTo(tx+w2,y2);x.stroke();}
 seg([tx,top],[tx,top-120],6,o.dawn?'#3b3c44':'#2a3040');const bl=Math.sin(t*4)>0;x.fillStyle=bl?'#ff3b30':'#5a1a18';x.beginPath();x.arc(tx,top-126,14,0,7);x.fill();if(bl)glow(tx,top-126,90,'rgba(255,60,50,0.6)');
 // hut
 x.fillStyle=o.dawn?'#4a4038':'#2b241f';x.fillRect(tx-330,bot-230,260,230);x.fillStyle=o.dawn?'#3a312b':'#1f1a16';x.beginPath();x.moveTo(tx-350,bot-230);x.lineTo(tx-200,bot-320);x.lineTo(tx-50,bot-230);x.fill();
 x.fillStyle='#ffc760';x.fillRect(tx-280,bot-180,110,90);warmLight(tx-225,bot-135,260,0.5);
 x.fillStyle='#1a1410';x.beginPath();x.arc(tx-225,bot-132,22,0,7);x.fill();x.fillRect(tx-250,bot-110,50,24);x.beginPath();x.ellipse(tx-198,bot-140,8,18,0.4,0,7);x.fill();// Jo silhouette + ponytail
 if(o.talk){x.strokeStyle='rgba(255,220,150,0.55)';x.lineWidth=5;for(let k=0;k<3;k++){const r=((t*120+k*70)%210)+30;x.globalAlpha=1-r/240;x.beginPath();x.arc(tx,top-126,r,Math.PI*0.9,Math.PI*2.1);x.stroke();}x.globalAlpha=1;}
 x.fillStyle=o.dawn?'#3b3a3f':'#0a0e18';x.fillRect(0,1330,W,600);
 if(!o.dawn)darkness(0.35,[[tx-225,bot-135,420],[tx,top-126,260]]);else vignette(0.5);}
// handMic: close-up of your hand pressing the talk button of a handheld mic; o.press (0..1) lights the red TX light
function handMic(t,o={}){x.fillStyle='#2a2522';x.fillRect(0,0,W,H);x.strokeStyle='#1a1a1a';x.lineWidth=10;x.beginPath();for(let i=0;i<14;i++){const yy=1500+i*30;x.ellipse(860,yy,60,18,0,0,Math.PI*2);}x.stroke();
 x.save();x.translate(560,960);x.rotate(-0.25);x.fillStyle='#232325';x.beginPath();x.roundRect(-150,-330,300,620,70);x.fill();x.fillStyle='#38383b';for(let r=0;r<6;r++)for(let k=0;k<5;k++){x.beginPath();x.arc(-80+k*40,-220+r*40,9,0,7);x.fill();}
 const pr=o.press??0;x.fillStyle=pr>0.5?'#ff3b30':'#5a1a18';x.beginPath();x.arc(0,60,22,0,7);x.fill();if(pr>0.5)glow(0,60,120,'rgba(255,60,50,0.6)');txt('TX',0,120,'800 34px Inter',pr>0.5?'#ff8a80':'#777');
 x.fillStyle='#555';x.beginPath();x.roundRect(-182,-60+pr*10,40,150,12);x.fill();
 // hand: olive sleeve + white mitten hand + thumb on the button
 x.fillStyle=F.coat;x.beginPath();x.roundRect(-520,80,380,200,40);x.fill();x.fillStyle=F.skin;x.beginPath();x.ellipse(-150,140,120,105,0,0,7);x.fill();x.lineWidth=6;x.strokeStyle=F.ink;x.stroke();
 x.save();x.translate(-190,10+pr*14);x.rotate(-0.3);x.fillStyle=F.skin;x.beginPath();x.roundRect(-30,-30,90,60,30);x.fill();x.stroke();x.restore();
 x.restore();warmLight(540,700,700,0.25);vignette(0.6);}
// polaroidM: a polaroid taped to the bunker wall: M. (beard, gas mask around his neck) and young Jo in front of the hatch; caption handwritten
function polaroidM(t,o={}){x.fillStyle=F.wall;x.fillRect(0,0,W,H);for(let i=0;i<12;i++){x.fillStyle=i%2?'#3d3d42':'#353539';x.fillRect(0,i*170,W,168);}
 x.save();x.translate(540,900);x.rotate(-0.05+Math.sin(t*0.8)*0.01);x.shadowColor='rgba(0,0,0,0.5)';x.shadowBlur=30;x.fillStyle='#f4f1e8';x.fillRect(-380,-470,760,900);x.shadowBlur=0;
 x.fillStyle='#6f7f6a';x.fillRect(-330,-420,660,640);x.fillStyle='#8fa07e';x.fillRect(-330,-60,660,280);
 for(let i=0;i<6;i++){x.fillStyle='#4e5c4a';x.beginPath();x.moveTo(-330+i*120,-60);x.lineTo(-270+i*120,-300);x.lineTo(-210+i*120,-60);x.fill();}
 x.fillStyle=F.steel;x.beginPath();x.ellipse(120,150,140,40,0,0,7);x.fill();// hatch
 // M.: big round head, beard, gas mask on chest, coat
 x.fillStyle='#5a4a3a';x.beginPath();x.roundRect(-230,-60,180,280,30);x.fill();x.fillStyle=F.skin;x.beginPath();x.arc(-140,-140,70,0,7);x.fill();x.lineWidth=5;x.strokeStyle=F.ink;x.stroke();
 x.fillStyle='#4a3626';x.beginPath();x.arc(-140,-110,58,0.1*Math.PI,0.9*Math.PI);x.fill();x.fillStyle=F.ink;x.beginPath();x.arc(-162,-150,7,0,7);x.arc(-118,-150,7,0,7);x.fill();
 x.fillStyle='#2b2f2b';x.beginPath();x.ellipse(-140,10,48,40,0,0,7);x.fill();x.fillStyle='#9aa0a6';x.beginPath();x.arc(-160,0,13,0,7);x.arc(-120,0,13,0,7);x.fill();x.fillStyle='#1b1d1b';x.beginPath();x.arc(-140,36,16,0,7);x.fill();
 // little Jo
 x.fillStyle='#7a3b5a';x.beginPath();x.roundRect(10,30,110,170,24);x.fill();x.fillStyle=F.skin;x.beginPath();x.arc(65,-20,48,0,7);x.fill();x.stroke();x.fillStyle='#3a2a1a';x.beginPath();x.arc(65,-36,50,Math.PI,0);x.fill();x.beginPath();x.ellipse(120,-10,12,30,0.4,0,7);x.fill();
 x.fillStyle=F.ink;x.beginPath();x.arc(50,-16,6,0,7);x.arc(80,-16,6,0,7);x.fill();seg([52,6],[78,6],4,F.ink);
 txt(o.cap||'Uncle M. & Jo',0,330,'700 76px Caveat','#2a2a2a');if(o.cap2)txt(o.cap2,0,410,'700 56px Caveat','#b2302a');
 x.fillStyle='rgba(230,220,170,0.75)';x.save();x.rotate(0.1);x.fillRect(-80,-500,160,56);x.restore();
 x.restore();warmLight(540,300,900,0.3);vignette(0.55);}
// hatchUnder: looking UP the ladder shaft at the hatch. o:{shake (0..1 scraping), dust, dawn (light rim), scratch}
function hatchUnder(t,o={}){x.fillStyle='#232428';x.fillRect(0,0,W,H);
 for(let i=0;i<9;i++){const r=1250-i*120;x.fillStyle=i%2?'#2e3035':'#34363b';x.beginPath();x.ellipse(540,560,r*0.75,r*0.52,0,0,7);x.fill();}
 const sh=o.shake?Math.sin(t*38)*7*o.shake:0;x.save();x.translate(sh,0);
 if(o.dawn){x.save();x.globalCompositeOperation='screen';glow(540,560,520,'rgba(255,215,180,0.35)');x.restore();x.strokeStyle='#ffe2c0';x.lineWidth=10;x.beginPath();x.ellipse(540,560,300,205,0,0,7);x.stroke();}
 x.fillStyle=F.steel;x.beginPath();x.ellipse(540,560,290,198,0,0,7);x.fill();x.strokeStyle=F.steel2;x.lineWidth=10;x.beginPath();x.ellipse(540,560,230,156,0,0,7);x.stroke();
 x.strokeStyle='#9aa0a6';x.lineWidth=14;x.beginPath();x.ellipse(540,560,110,76,0,0,7);x.stroke();const sp=o.shake?Math.sin(t*6)*0.15:0;for(let k=0;k<4;k++){const a=k*Math.PI/2+sp;seg([540,560],[540+Math.cos(a)*110,560+Math.sin(a)*76],10,'#9aa0a6');}
 x.fillStyle='#c9a448';x.beginPath();x.roundRect(700,520,70,60,8);x.fill();x.restore();
 // ladder converging up
 for(const s of[-1,1])seg([540+s*330,1920],[540+s*120,760],22,'#6b7076');for(let i=0;i<9;i++){const k=i/9,y=1920-(1920-800)*Math.pow(k,0.8),w=lerp(330,130,Math.pow(k,0.8));seg([540-w,y],[540+w,y],14,'#5d6268');}
 if(o.dust){for(let i=0;i<40;i++){const dy=((t*260+i*90)%1200);x.fillStyle=`rgba(210,200,180,${0.5-dy/2600})`;x.fillRect(380+hash(i)*320+Math.sin(t+i)*20,700+dy,4,4);}}
 if(o.scratch){x.strokeStyle='rgba(255,255,255,0.7)';x.lineWidth=6;for(let k=0;k<3;k++)if(Math.sin(t*10+k*2)>0.2){x.beginPath();x.arc(540,560,330+k*55,Math.PI*1.1,Math.PI*1.9);x.stroke();}}
 if(o.hero)hero(o.hero[0],o.hero[1],o.hero[2],o.heroO||{});
 darkness(o.dark??0.5,[[540,600,o.dawn?800:620]]);}
// ladderClimb: side view of the shaft; you climb the ladder toward the hatch (p 0..1); dawn light leaks around the hatch
function ladderClimb(t,p,o={}){x.fillStyle='#2b2c31';x.fillRect(0,0,W,H);x.fillStyle='#34363b';x.fillRect(220,0,640,H);for(let i=0;i<12;i++)x.fillRect(220,i*170,640,6);
 x.fillStyle=F.steel;x.fillRect(260,150,560,70);x.fillStyle=F.steel2;x.fillRect(260,210,560,16);
 if(o.dawn){x.save();x.globalCompositeOperation='screen';x.fillStyle='rgba(255,220,180,0.8)';x.fillRect(250,140,8,90);x.fillRect(822,140,8,90);glow(540,150,420,'rgba(255,215,180,0.3)');x.restore();}
 for(const lx of[380,700])seg([lx,230],[lx,H],16,'#6b7076');for(let y=300;y<H;y+=130)seg([380,y],[700,y],12,'#5d6268');
 const hy=lerp(1900,1080,ease(p));hero(540,hy,1.25,{arm:'up',mood:'worry',walk:t*0.6,look:0,tt:t});
 darkness(0.5,[[540,300,700],[540,hy-400,500]]);}
// peekOut: your eye-level POV from the open hatch at dawn: the rim + your fingers in front, slow ones sitting in a ring, all facing you. o:{lift, notebook, eyeGlow, zoom}
function peekOut(t,o={}){woodsSky(t,{dawn:true,base:900});x.fillStyle='#4d5245';x.fillRect(0,900,W,1020);
 const ring=[[230,1130,0.62],[400,1080,0.55],[680,1080,0.55],[850,1130,0.62],[70,1420,1.0],[1010,1420,1.0],[540,1110,0.6]];
 ring.sort((a,b)=>a[1]-b[1]).forEach((r,i)=>{slowOne(r[0],r[1],r[2]*1.25,{sit:true,t:t+i,lift:o.lift??1,eyeGlow:o.eyeGlow});
  if(o.notebook&&r[0]===540){x.save();x.translate(r[0]-58,r[1]-40);x.rotate(-0.25);x.fillStyle='#6b4630';x.fillRect(-26,-36,52,72);txt('M.',0,12,'700 32px Caveat','#f1e9d6');x.restore();}});
 for(let i=0;i<5;i++){x.fillStyle=`rgba(230,220,225,${0.12+0.05*Math.sin(t+i)})`;x.beginPath();x.ellipse((i*300+t*30)%1500-200,1000+i*70,420,50,0,0,7);x.fill();}
 // hatch rim + fingers (foreground)
 x.fillStyle='#2a2d31';x.beginPath();x.ellipse(540,1900,820,250,0,Math.PI,0);x.lineTo(1400,1920);x.lineTo(-400,1920);x.fill();x.fillStyle=F.steel;x.beginPath();x.ellipse(540,1890,760,220,0,Math.PI,0);x.fill();
 x.fillStyle='#141619';x.beginPath();x.ellipse(540,1930,640,170,0,Math.PI,0);x.fill();
 for(const fx of[250,330,750,830]){x.fillStyle=F.skin;x.beginPath();x.roundRect(fx-30,1640,60,110,28);x.fill();x.lineWidth=5;x.strokeStyle=F.ink;x.stroke();}
 vignette(0.55);}
// notebookHold: close-up of a grey slow-one hand holding M.'s brown notebook (open:0..1 flips the cover to show handwriting)
function notebookHold(t,o={}){x.fillStyle=lg(0,0,0,H,[[0,'#6f6a70'],[1,'#3f4245']]);x.fillRect(0,0,W,H);for(let i=0;i<5;i++){x.fillStyle=`rgba(230,220,225,${0.1})`;x.beginPath();x.ellipse((i*280+t*20)%1400-150,600+i*220,420,60,0,0,7);x.fill();}
 x.save();x.translate(540,900+Math.sin(t*1.3)*8);x.rotate(-0.12);
 x.fillStyle='#6b4630';x.beginPath();x.roundRect(-260,-340,520,680,24);x.fill();x.fillStyle='#e9dcc0';x.fillRect(250,-320,16,640);x.strokeStyle='#4a3020';x.lineWidth=6;x.strokeRect(-230,-310,460,620);
 txt('M.',0,40,'700 240px Caveat','#f1e9d6');txt('RULES',0,170,'800 44px Inter','rgba(241,233,214,0.7)');
 x.fillStyle=F.slow2;x.beginPath();x.roundRect(-760,120,560,180,70);x.fill();x.fillStyle=F.slow;x.beginPath();x.ellipse(-230,200,130,110,0,0,7);x.fill();
 for(let i=0;i<4;i++){x.save();x.translate(-170,110+i*48);x.rotate(-0.15+i*0.05);x.fillStyle=F.slow;x.beginPath();x.roundRect(0,-20,200-i*20,40,20);x.fill();x.strokeStyle='#3d463a';x.lineWidth=4;x.stroke();x.restore();}
 x.restore();vignette(0.6);if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,120,110,${o.red})`;x.fillRect(0,0,W,H);x.restore();}}
// staticLines: TV/radio static overlay (a 0..1)
function staticLines(t,a=0.5){x.save();for(let i=0;i<60;i++){const y=hash(i+Math.floor(t*30)*7)*H;x.fillStyle=`rgba(255,255,255,${a*hash(i*5+Math.floor(t*30))*0.5})`;x.fillRect(0,y,W,2+hash(i)*6);}x.restore();grainLite(t,a*0.4);}
