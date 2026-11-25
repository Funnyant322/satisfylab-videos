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

// ---------- added 23 Nov (Bunker Part 4 STAY INSIDE) ----------
// crawlspace: top-down bunker floorboards; one board pried up (pry 0..1) revealing a dark crawlspace with a page lit by a flashlight beam.
// o: {pry, page:true, hand:true, beamA (deg), red, dark, shake}
function crawlspace(t,o={}){const pry=o.pry??1,sh=o.shake?Math.sin(t*40)*6*o.shake:0;x.save();x.translate(sh,0);
 x.fillStyle='#2b2420';x.fillRect(-20,0,W+40,H);
 for(let i=0;i<7;i++){const bx=i*160-20;x.fillStyle=i%2?'#5a3f2a':'#523926';x.fillRect(bx,0,156,H);x.fillStyle='rgba(0,0,0,0.25)';x.fillRect(bx+154,0,6,H);
  for(let k=0;k<4;k++){x.fillStyle='rgba(40,25,15,0.35)';x.beginPath();x.ellipse(bx+40+hash(i*9+k)*80,200+k*460+hash(i+k)*120,10,22,0,0,7);x.fill();}
  for(let k=0;k<3;k++){x.fillStyle='#8a8f96';for(const nx of[bx+24,bx+130]){x.beginPath();x.arc(nx,320+k*620,7,0,7);x.fill();}}}
 // the hole (under two boards)
 const hx=300,hw=316,hy=520,hh=900;x.fillStyle='#07080b';x.fillRect(hx,hy,hw,hh);
 x.save();x.beginPath();x.rect(hx,hy,hw,hh);x.clip();x.fillStyle='#14100d';for(let i=0;i<10;i++)x.fillRect(hx-40+i*40,hy+60+hash(i)*hh*0.8,30,7);
 x.strokeStyle='rgba(120,110,100,0.25)';x.lineWidth=3;for(let i=0;i<4;i++){x.beginPath();x.moveTo(hx,hy+180+i*200);x.lineTo(hx+hw,hy+150+i*210);x.stroke();}
 if(o.page!==false){const fl=0.5+0.5*Math.sin(t*2.2);x.save();x.translate(hx+hw/2,hy+hh*0.52);x.rotate(-0.1+Math.sin(t*0.8)*0.01);x.shadowColor='rgba(255,230,180,0.5)';x.shadowBlur=30+10*fl;x.fillStyle='#ece2c8';
  x.beginPath();x.moveTo(-120,-170);x.lineTo(120,-170);x.lineTo(126,160);x.lineTo(60,176);x.lineTo(0,158);x.lineTo(-70,178);x.lineTo(-126,160);x.closePath();x.fill();x.shadowBlur=0;
  for(let k=0;k<7;k++)seg([-96,-130+k*36],[lerp(20,96,hash(k+3)),-130+k*36],5,k===1||k===2?'rgba(178,48,42,0.8)':'rgba(40,40,40,0.6)');x.restore();}
 x.restore();
 // the two lifted boards lean against the left edge (rotate up on the left hinge)
 for(let b=0;b<2;b++){x.save();x.translate(hx+b*158,hy);const a=pry*1.25;const sx=Math.cos(a);x.transform(sx,0,0,1,0,0);x.translate(-b*158*(1-sx)/sx,0);x.fillStyle=b?'#6a4d35':'#5f4530';x.fillRect(0,0,156,hh);x.fillStyle='rgba(0,0,0,0.3)';x.fillRect(150,0,6,hh);x.restore();}
 if(pry>0.05){x.fillStyle='rgba(0,0,0,0.35)';x.fillRect(hx-40*pry,hy,40*pry,hh);}
 if(o.hand){const hy2=hy+hh*0.5;x.save();x.translate(hx-250+60*pry,hy2+140);x.rotate(-0.5);x.fillStyle=F.coat;x.fillRect(-300,-46,330,92);x.fillStyle=F.skin;x.beginPath();x.ellipse(40,0,56,46,0,0,7);x.fill();x.restore();
  seg([hx-150,hy2+60],[hx+30,hy2-40-60*pry],14,'#9aa0a6');}
 x.restore();
 beam(980,1880,o.beamA??-30,1500,0.24,0.55);darkness(o.dark??0.55,[[hx+hw/2,hy+hh*0.52,560]]);
 if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,110,100,${o.red})`;x.fillRect(0,0,W,H);x.restore();}vignette(0.5);}

// ---------- added 24 Nov (Bunker Part 5 TRUST MY NOTE) ----------
// pencilWrite: your torn page on the table, a pencil writing BY ITSELF (no hand). lines=[[text,red,size]], chars = characters revealed so far (float); o:{red tint, lamp}
function pencilWrite(t,lines,chars,o={}){x.fillStyle=F.wood2;x.fillRect(0,0,W,H);for(let i=0;i<20;i++){x.fillStyle=i%2?'#4a3322':'#3f2b1d';x.fillRect(0,i*100,W,100);}
 warmLight(880,260,700,0.35);
 x.save();x.translate(540,880);x.rotate(-0.025);x.shadowColor='rgba(0,0,0,0.55)';x.shadowBlur=34;x.fillStyle='#efe6d0';
 x.beginPath();x.moveTo(-410,-560);x.lineTo(400,-540);x.lineTo(415,430);x.lineTo(290,470);x.lineTo(170,425);x.lineTo(30,475);x.lineTo(-100,430);x.lineTo(-230,470);x.lineTo(-415,440);x.closePath();x.fill();x.shadowBlur=0;
 for(let y=-450;y<420;y+=84)seg([-375,y],[375,y],2,'rgba(90,110,150,0.22)');
 let y=-430,left=chars,px=-340,py=-430;x.textAlign='left';
 for(const L of lines){const fs=L[2]||64,n=L[0].length;if(left<=0)break;const k=Math.min(n,Math.floor(left));const s=L[0].slice(0,k);x.font=`700 ${fs}px Caveat`;x.fillStyle=L[1]?'#b2302a':'#2a2a2a';x.fillText(s,-345,y);
  px=-345+x.measureText(s).width;py=y;left-=n;y+=fs*1.42;}
 // the pencil (floating, nobody holding it): tip at the last written letter, wiggles while writing
 const wr=o.idle?0:1,wx=px+Math.sin(t*38)*5*wr,wy=py-6+Math.abs(Math.sin(t*19))*-12*wr;
 x.fillStyle='rgba(0,0,0,0.28)';x.beginPath();x.ellipse(wx+90,wy+40,150,16,-0.55,0,7);x.fill();
 x.save();x.translate(wx,wy);x.rotate(-0.95);
 x.fillStyle='#3a3a3a';x.beginPath();x.moveTo(0,0);x.lineTo(16,-10);x.lineTo(16,10);x.closePath();x.fill();
 x.fillStyle='#e8c99a';x.beginPath();x.moveTo(16,-10);x.lineTo(60,-22);x.lineTo(60,22);x.lineTo(16,10);x.closePath();x.fill();
 x.fillStyle='#f2c230';x.fillRect(60,-22,300,44);x.fillStyle='#d9a91c';x.fillRect(60,-4,300,8);
 x.fillStyle='#b9bec4';x.fillRect(360,-23,34,46);x.fillStyle='#e58a96';x.beginPath();x.roundRect(392,-22,44,44,[0,14,14,0]);x.fill();x.restore();
 x.restore();if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,110,100,${o.red})`;x.fillRect(0,0,W,H);x.restore();}
 darkness(o.dark??0.35,[[560,820,760]]);vignette(0.55);}
// radioCoat: the radio on its crate with your olive coat thrown over it; drop 0..1 = coat falling on; muffle = Jo's voice pushing the coat, amber light leaking under the hem
function radioCoat(t,o={}){x.fillStyle=F.wall2;x.fillRect(0,0,W,H);for(let i=0;i<7;i++)x.fillRect(0,i*170,W,5);x.fillStyle=F.floor;x.fillRect(0,1500,W,420);
 x.fillStyle=F.wood;x.fillRect(260,1130,560,400);x.fillStyle=F.wood2;for(let i=0;i<4;i++)x.fillRect(260,1150+i*95,560,12);
 x.fillStyle='#4b453d';x.beginPath();x.roundRect(330,800,420,330,26);x.fill();x.fillStyle='#ffc95a';x.fillRect(560,850,150,80);txt('CH 3',635,905,'400 40px Anton','#3a2a10');seg([700,800],[800,560],7,'#6b645a');
 const d=ease(clamp(o.drop??1)),cy=lerp(-700,0,d),pul=o.muffle?Math.abs(Math.sin(t*9))*Math.abs(Math.sin(t*2.3))*14:0;
 if(d>0.95&&o.muffle)warmLight(540,1135,360,0.35+pul*0.02);
 x.save();x.translate(540,cy);
 x.fillStyle=F.coat;x.beginPath();x.moveTo(-250,1150);x.quadraticCurveTo(-270-pul,850,-120,760-pul);x.quadraticCurveTo(0,720-pul*1.4,120,760-pul);x.quadraticCurveTo(270+pul,850,250,1150);
 x.quadraticCurveTo(0,1175,-250,1150);x.fill();
 x.fillStyle=F.coat2;x.beginPath();x.moveTo(-120,760-pul);x.lineTo(-40,860);x.lineTo(0,770-pul);x.lineTo(40,860);x.lineTo(120,760-pul);x.lineTo(0,735-pul);x.closePath();x.fill();
 seg([0,860],[0,1150],4,F.coat2);for(let i=0;i<4;i++){x.fillStyle='#2c3320';x.beginPath();x.arc(26,900+i*65,9,0,7);x.fill();}
 x.fillStyle=F.coat;x.beginPath();x.roundRect(-300,880,70,330,30);x.fill();x.beginPath();x.roundRect(230,880,70,330,30);x.fill();x.restore();
 if(o.muffle&&d>0.95){x.strokeStyle=`rgba(255,207,74,${0.25+pul*0.03})`;x.lineWidth=6;for(let k=0;k<3;k++){const r=70+((t*120+k*60)%180);x.beginPath();x.arc(540,880,r+140,Math.PI*1.2,Math.PI*1.8);x.stroke();}}
 darkness(o.dark??0.5,[[540,950,620]]);}
// duskRise: red-orange sunset going dark over the clearing; a row of slow ones rises up from the tall grass ALL AT ONCE (p 0..1); eyes glow at the end; the hatch in front
function duskRise(t,p,o={}){const dk=o.dark??0.4;x.fillStyle=lg(0,0,0,1300,[[0,'#151a2e'],[0.45,'#4a2a3a'],[0.8,'#b5493a'],[1,'#e07a3e']]);x.fillRect(0,0,W,H);
 glow(540,1150,420,'rgba(255,150,80,0.5)');
 for(let k=0;k<2;k++){x.fillStyle=k?'#0c0e16':'#1a1624';for(let i=-1;i<12;i++){const tx=i*105+(k?40:0)+hash(i+k*20)*40,th=(k?240:170)+hash(i*3+k)*140,b=1150+k*40;x.beginPath();x.moveTo(tx-70,b);x.lineTo(tx,b-th);x.lineTo(tx+70,b);x.fill();}}
 x.fillStyle='#14120f';x.fillRect(0,1180,W,740);
 const e=ease(clamp(p)),row=[[110,0.95],[290,1.1],[460,0.9],[640,1.15],[820,0.95],[990,1.05]];
 for(const [sx,sc] of row){const rise=(1-e)*300*sc;slowOne(sx,1420+rise,sc,{sit:false,t:t+sx,lift:lerp(0.2,1,e),eyeGlow:e>0.85});}
 x.fillStyle='#0e0d0b';x.beginPath();x.moveTo(0,1920);x.lineTo(0,1330);for(let i=0;i<=54;i++){const gx=i*20,gy=1330+Math.sin(i*1.7)*14-hash(i)*70;x.lineTo(gx,gy);x.lineTo(gx+10,gy+60);}x.lineTo(W,1920);x.closePath();x.fill();
 x.fillStyle='#2f3337';x.beginPath();x.ellipse(540,1560,190,48,0,0,7);x.fill();x.strokeStyle='#6b7076';x.lineWidth=8;x.beginPath();x.ellipse(540,1545,70,18,0,0,7);x.stroke();
 x.fillStyle=`rgba(5,7,14,${dk})`;x.fillRect(0,0,W,H);vignette(0.5);}
// chainRattle: close-up of the crossed chains + padlock on the back door, shaking (shake 0..1); motion ticks
function chainRattle(t,o={}){x.fillStyle=F.steel;x.fillRect(0,0,W,H);x.fillStyle=F.steel2;x.fillRect(0,0,W,40);x.fillRect(0,940,W,26);
 x.fillStyle='#8b9096';for(let i=0;i<6;i++)for(const yy of[120,1820]){x.beginPath();x.arc(90+i*180,yy,11,0,7);x.fill();}
 x.fillStyle=F.rust;x.globalAlpha=0.45;x.beginPath();x.ellipse(260,1500,180,90,0.3,0,7);x.fill();x.globalAlpha=1;
 const s=o.shake??1;const link=(ax,ay,bx,by,ph)=>{const n=13;for(let i=0;i<n;i++){const k=i/(n-1),jx=Math.sin(t*47+i*1.3+ph)*12*s,jy=Math.cos(t*39+i)*8*s;const lx=lerp(ax,bx,k)+jx,ly=lerp(ay,by,k)+jy+Math.sin(k*Math.PI)*60;
  x.save();x.translate(lx,ly);x.rotate(Math.atan2(by-ay,bx-ax)+(i%2?0:Math.PI/2)*0.0+(i%2?0.9:0));x.strokeStyle=i%2?'#8d9398':'#b4bac0';x.lineWidth=16;x.beginPath();x.ellipse(0,0,52,26,0,0,7);x.stroke();x.restore();}};
 link(-60,380,1140,1460,0);link(1140,380,-60,1460,2);
 const jx=Math.sin(t*52)*16*s,jr=Math.sin(t*31)*0.12*s;x.save();x.translate(540+jx,980);x.rotate(jr);
 x.strokeStyle='#b89434';x.lineWidth=26;x.beginPath();x.arc(0,-40,70,Math.PI,0);x.stroke();x.fillStyle='#c9a448';x.beginPath();x.roundRect(-110,-50,220,190,22);x.fill();
 x.fillStyle='#2a2216';x.beginPath();x.arc(0,30,20,0,7);x.fill();x.fillRect(-8,30,16,50);x.restore();
 if(s>0.3){x.strokeStyle='rgba(255,255,255,0.6)';x.lineWidth=7;for(const [mx,my,a] of[[300,700,0.5],[790,700,-0.5],[330,1280,-0.4],[760,1280,0.4]]){if(Math.sin(t*20+mx)>0){x.beginPath();x.arc(mx,my,60,a-0.6,a+0.6);x.stroke();}}}
 beam(1040,1900,-25,1700,0.32,0.4);darkness(o.dark??0.5,[[560,960,640]]);}
// wheelTurn: looking straight up at the underside of the hatch; the wheel turns BY ITSELF (ang in radians); dust falls; o:{red}
function wheelTurn(t,ang,o={}){x.fillStyle='#1e1f23';x.fillRect(0,0,W,H);
 for(let i=0;i<8;i++){const r=1150-i*110;x.fillStyle=i%2?'#2a2c31':'#313338';x.beginPath();x.arc(540,820,r,0,7);x.fill();}
 x.fillStyle=F.steel;x.beginPath();x.arc(540,820,430,0,7);x.fill();x.strokeStyle=F.steel2;x.lineWidth=14;x.beginPath();x.arc(540,820,370,0,7);x.stroke();
 x.fillStyle='#8b9096';for(let i=0;i<12;i++){const a=i*Math.PI/6;x.beginPath();x.arc(540+Math.cos(a)*400,820+Math.sin(a)*400,10,0,7);x.fill();}
 x.fillStyle=F.rust;x.globalAlpha=0.4;x.beginPath();x.ellipse(400,960,120,60,0.4,0,7);x.fill();x.globalAlpha=1;
 x.strokeStyle='#a7adb3';x.lineWidth=26;x.beginPath();x.arc(540,820,230,0,7);x.stroke();for(let k=0;k<4;k++){const a=ang+k*Math.PI/2;seg([540,820],[540+Math.cos(a)*230,820+Math.sin(a)*230],20,'#a7adb3');x.fillStyle='#c4c9ce';x.beginPath();x.arc(540+Math.cos(a)*230,820+Math.sin(a)*230,22,0,7);x.fill();}
 x.fillStyle='#c9ced3';x.beginPath();x.arc(540,820,46,0,7);x.fill();
 if(o.arrows){x.strokeStyle='rgba(255,90,74,0.85)';x.lineWidth=10;for(let k=0;k<2;k++){const a0=ang+k*Math.PI+0.3;x.beginPath();x.arc(540,820,300,a0,a0+1.0);x.stroke();const ex=540+Math.cos(a0+1)*300,ey=820+Math.sin(a0+1)*300;x.fillStyle='rgba(255,90,74,0.85)';x.beginPath();x.arc(ex,ey,14,0,7);x.fill();}}
 for(let i=0;i<50;i++){const dy=((t*300+i*80)%1100);x.fillStyle=`rgba(210,200,180,${0.55-dy/2400})`;x.fillRect(300+hash(i)*480+Math.sin(t+i)*20,900+dy,5,5);}
 for(const s of[-1,1])seg([540+s*360,1920],[540+s*200,1300],24,'#5d6268');for(let i=0;i<4;i++){const k=i/4,y=1920-k*560,w=lerp(360,220,k);seg([540-w,y],[540+w,y],16,'#555a60');}
 if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,100,90,${o.red})`;x.fillRect(0,0,W,H);x.restore();}
 darkness(o.dark??0.45,[[540,820,700]]);}

// ---------- added 24 Nov (Bunker Part 6 GRAND FINALE, HOLD THE HATCH) ----------
// holdWheel: wheelTurn from below with YOUR two arms (olive sleeves, white hands) gripping the spokes; tug = -1..1 strain, ang = wheel angle
function holdWheel(t,ang,o={}){wheelTurn(t,ang,{dark:o.dark??0.4,red:o.red,arrows:o.arrows});
 const tug=(o.tug??Math.sin(t*5))*14;
 const hs=[0,2].map(k=>{const a=ang+k*Math.PI/2+0.6;return [a,540+Math.cos(a)*230,820+Math.sin(a)*230];}).sort((u,v)=>u[1]-v[1]);
 for(const [i,[a,hx,hy]] of hs.entries()){const k=i;const sx=k?860:220,sy=1920;
  x.save();x.lineCap='round';x.strokeStyle=F.coat;x.lineWidth=110;x.beginPath();x.moveTo(sx,sy);x.quadraticCurveTo((sx+hx)/2+(k?60:-60),(sy+hy)/2+tug,hx,hy+40);x.stroke();
  x.strokeStyle=F.coat2;x.lineWidth=18;x.beginPath();x.moveTo(sx+(k?-30:30),sy-40);x.quadraticCurveTo((sx+hx)/2+(k?40:-40),(sy+hy)/2+tug,hx,hy+50);x.stroke();x.restore();
  x.fillStyle=F.skin;x.beginPath();x.ellipse(hx,hy,52,44,a,0,7);x.fill();x.strokeStyle=F.ink;x.lineWidth=3;for(let f=-1;f<=1;f++){x.beginPath();x.moveTo(hx+f*16,hy-30);x.lineTo(hx+f*16,hy+14);x.stroke();}}
 if(o.voices){const L=o.voices;x.save();L.forEach((v,i)=>{const a=clamp((t-v[1])/0.3);if(a<=0)return;x.globalAlpha=a*(0.7+0.3*Math.sin(t*6+i));txt(v[0],540+(i%2?150:-150),1260+i*110,'700 70px Caveat',v[2]||'#e9e2d0');});x.restore();}
 vignette(0.5);}
// backDoorOpen: the bunker back door hanging open onto a black tunnel, chains and the open padlock lying on the floor; o:{open 0..1, dark}
function backDoorOpen(t,o={}){x.fillStyle=F.wall2;x.fillRect(0,0,W,H);x.fillStyle=F.floor;x.fillRect(0,1560,W,360);
 door(540,1640,2.2,t,{open:o.open??0.85,chains:0});
 x.save();x.strokeStyle='#a7adb3';x.lineWidth=12;x.setLineDash([22,10]);for(let k=0;k<2;k++){x.beginPath();x.moveTo(260+k*80,1700+k*20);x.bezierCurveTo(420,1660+k*30,560,1760,820-k*60,1690+k*40);x.stroke();}x.setLineDash([]);
 x.fillStyle='#c9a448';x.save();x.translate(640,1750);x.rotate(0.5);x.beginPath();x.roundRect(-34,-30,68,62,10);x.fill();x.strokeStyle='#c9a448';x.lineWidth=10;x.beginPath();x.arc(30,-34,24,Math.PI*1.2,Math.PI*0.1);x.stroke();x.restore();x.restore();
 beam(980,1700,-28,1500,0.3,0.4);darkness(o.dark??0.5,[[560,1100,700]]);}
// radioTower option o.you: the silhouette in the hut window wears YOUR red knit cap (the copier took your place)
const _radioTower0=radioTower;
radioTower=function(t,o={}){_radioTower0(t,o);if(o.you){const tx=640,bot=1330;x.fillStyle=F.cap;x.beginPath();x.arc(tx-225,bot-140,26,Math.PI,0);x.fill();x.fillRect(tx-251,bot-142,52,10);x.beginPath();x.arc(tx-225,bot-168,8,0,7);x.fill();
 if(o.glow){x.fillStyle='#fff6d8';for(const k of[-8,8]){x.beginPath();x.arc(tx-225+k,bot-128,4,0,7);x.fill();}}}};

// ---------- added 25 Nov (HOSPITAL Part 1, night guard at Greywater Hospital) ----------
// hud3 label: pass {label:'NIGHT'} to show "NIGHT N / 6" instead of "DAY N / 6"
(function(){const h0=hud3;hud3=function(o){if(!o.label)return h0(o);const keep=x.fillText.bind(x);let first=true;x.fillText=function(s,a,b,c){if(first&&typeof s==='string'&&s.startsWith('DAY ')){first=false;s=o.label+' '+o.day+' / '+(o.days||6);}return keep(s,a,b,c);};
 try{h0(o);}finally{x.fillText=keep;}};})();
const HP={wall:'#2b3442',wall2:'#232b37',tile:'#3a4250',tile2:'#323a47',floor:'#262d38',door:'#4a5a6a',door2:'#3c4a58',mint:'#7fb8a8',gown:'#9fb7c9',gown2:'#86a0b4',sheet:'#d9dde2',green:'#6dff9a'};
// hospital building at night: dark block, lit lobby, red cross, dead east wing, rain
function hospitalExt(t,o={}){x.fillStyle=lg(0,0,0,H,[[0,'#0b1020'],[0.6,'#18203a'],[1,'#121726']]);x.fillRect(0,0,W,H);
 x.fillStyle='rgba(220,230,255,0.9)';x.beginPath();x.arc(860,300,62,0,7);x.fill();glow(860,300,200,'rgba(200,215,255,0.18)');
 x.fillStyle='#1c2333';x.fillRect(60,620,960,900);x.fillStyle='#161c2a';x.fillRect(620,520,400,1000);// east wing taller
 txt('EAST WING',820,570,'800 30px Inter','rgba(255,255,255,0.18)');
 for(let r=0;r<7;r++)for(let c=0;c<4;c++){const lit=(r===5&&c===1)||(r===4&&c===0);x.fillStyle=lit?'#ffcf7a':'#0e1320';x.fillRect(110+c*120,680+r*110,70,60);}
 for(let r=0;r<8;r++)for(let c=0;c<3;c++){const on=o.blink&&r===3&&c===2&&Math.sin(t*5)>0;x.fillStyle=on?'#ff4a3d':'#0b0f1a';x.fillRect(660+c*120,600+r*110,70,60);if(on)glow(695+c*120,630+r*110,90,'rgba(255,60,50,0.35)');}
 x.fillStyle='#c8322a';x.fillRect(300,520,40,120);x.fillRect(260,560,120,40);glow(320,580,140,'rgba(255,60,50,0.25)');
 rr(160,1380,360,140,8,'#2a3242');x.fillStyle='#ffd88a';x.fillRect(190,1400,300,120);warmLight(340,1460,380,0.5);
 txt('GREYWATER HOSPITAL',340,1365,'400 44px Anton','#e9edf2');
 x.fillStyle='#10141d';x.fillRect(0,1520,W,400);x.fillStyle='#1a202b';x.fillRect(0,1600,W,30);
 if(o.hero)hero(o.hero[0],1900,o.hero[2]||0.9,{walk:t,mood:'worry',look:0.4});
 rain(t,o.rain??120,0.25);vignette(0.6);}
// guard desk: 4 CCTV monitors on the wall, desk lamp, taped note, optional hero sitting/standing
function guardDesk(t,o={}){x.fillStyle=HP.wall2;x.fillRect(0,0,W,H);for(let i=0;i<9;i++){x.fillStyle=i%2?HP.tile:HP.tile2;x.fillRect(0,1100+i*30,W,30);}
 x.fillStyle=HP.floor;x.fillRect(0,1370,W,550);
 for(let k=0;k<4;k++){const mx=130+(k%2)*420,my=320+Math.floor(k/2)*330;rr(mx-14,my-14,388,288,14,'#151a22');const on=!(o.callLight&&k===3&&Math.sin(t*6)>0);
  x.fillStyle=on?'#1f3a2c':'#2a0d0d';x.fillRect(mx,my,360,260);x.strokeStyle='rgba(109,255,154,0.35)';x.lineWidth=3;
  x.beginPath();x.moveTo(mx+40,my+250);x.lineTo(mx+150,my+120);x.lineTo(mx+210,my+120);x.lineTo(mx+320,my+250);x.moveTo(mx+150,my+120);x.lineTo(mx+150,my+20);x.moveTo(mx+210,my+120);x.lineTo(mx+210,my+20);x.stroke();
  txt('CAM '+(k+1),mx+60,my+40,'800 24px Inter',HP.green);if(k===3&&o.door13){x.fillStyle='rgba(109,255,154,0.6)';x.fillRect(mx+212,my+40,22*o.door13,70);}
  for(let s=0;s<26;s++){x.fillStyle='rgba(0,0,0,0.18)';x.fillRect(mx,my+s*10,360,3);}glow(mx+180,my+130,260,'rgba(109,255,154,0.08)');}
 if(o.callLight){const on=Math.sin(t*6)>0;rr(860,300,120,70,10,'#222');x.fillStyle=on?'#ff3b30':'#4a1512';x.beginPath();x.arc(920,335,26,0,7);x.fill();if(on)glow(920,335,160,'rgba(255,60,50,0.4)');txt('13',920,420,'400 44px Anton','#ff6a5a');}
 x.fillStyle='#4a3a2c';x.fillRect(0,1240,W,70);x.fillStyle='#3a2c20';x.fillRect(0,1310,W,40);
 // lamp
 seg([180,1240],[220,1080],8,'#333');x.fillStyle='#444';x.beginPath();x.moveTo(170,1040);x.lineTo(290,1040);x.lineTo(250,1100);x.lineTo(190,1100);x.fill();warmLight(230,1150,520,0.55);
 // taped note on the desk edge
 if(o.note!==false){x.save();x.translate(760,1160);x.rotate(0.06);x.fillStyle='#f1e9d6';x.fillRect(-120,-80,240,170);x.fillStyle='rgba(255,255,220,0.55)';x.fillRect(-50,-96,100,30);
  for(let i=0;i<4;i++)seg([-90,-30+i*36],[60+hash(i)*30,-30+i*36],4,'#555');x.restore();if(o.noteGlow)glow(760,1160,240,`rgba(255,220,140,${0.25+0.15*Math.sin(t*4)})`);}
 x.fillStyle='#2a2f3a';rr(380,1180,260,60,8,'#2a2f3a');// keyboard
 if(o.hero)hero(o.hero[0],o.hero[1]??1700,o.hero[2]??1.25,Object.assign({tt:t},o.heroO||{}));
 vignette(0.55);if(o.dark)darkness(o.dark,[[540,800,700],[230,1150,420]]);}
// corridor in one-point perspective: doors 11/12/13, flickering tubes, call light over 13
// o: walk (hero walking toward camera/away), heroX, heroS, callOn, door13 0..1 (opens), dark, red
function hallway(t,o={}){const vx=540,vy=880;x.fillStyle=HP.wall;x.fillRect(0,0,W,H);
 x.fillStyle=HP.floor;x.beginPath();x.moveTo(0,H);x.lineTo(W,H);x.lineTo(vx+120,vy+120);x.lineTo(vx-120,vy+120);x.fill();
 x.fillStyle='#1c222c';x.beginPath();x.moveTo(0,0);x.lineTo(W,0);x.lineTo(vx+120,vy-140);x.lineTo(vx-120,vy-140);x.fill();
 x.fillStyle=HP.wall2;x.beginPath();x.moveTo(0,0);x.lineTo(vx-120,vy-140);x.lineTo(vx-120,vy+120);x.lineTo(0,H);x.fill();
 x.fillStyle='#29313d';x.beginPath();x.moveTo(W,0);x.lineTo(vx+120,vy-140);x.lineTo(vx+120,vy+120);x.lineTo(W,H);x.fill();
 x.fillStyle='#0a0d13';x.fillRect(vx-120,vy-140,240,260);
 // floor tiles lines
 x.strokeStyle='rgba(0,0,0,0.25)';x.lineWidth=3;for(let i=1;i<9;i++){const k=Math.pow(i/9,2);const y=vy+120+(H-vy-120)*k;const hw=120+(540-120)*k;x.beginPath();x.moveTo(vx-hw,y);x.lineTo(vx+hw,y);x.stroke();}
 // mint stripe
 x.strokeStyle=HP.mint;x.globalAlpha=0.35;x.lineWidth=10;x.beginPath();x.moveTo(0,1350);x.lineTo(vx-120,vy+40);x.moveTo(W,1350);x.lineTo(vx+120,vy+40);x.stroke();x.globalAlpha=1;
 // doors on the right wall: 11 near, 12, 13 far; on left: 10
 const doors=[[0.25,'11'],[0.55,'12'],[0.78,'13']];
 for(const [k,num] of doors){const xa=W-(W-vx-120)*k,xb=W-(W-vx-120)*(k+0.13);const ta=0-(0-(vy-140))*k,ba=H-(H-(vy+120))*k,tb=0-(0-(vy-140))*(k+0.13),bb=H-(H-(vy+120))*(k+0.13);
  const dt0=ta+(ba-ta)*0.3,dt1=tb+(bb-tb)*0.3;const open=num==='13'?(o.door13||0):0;
  x.fillStyle=open>0?'#05070b':HP.door;x.beginPath();x.moveTo(xa,dt0);x.lineTo(xb,dt1);x.lineTo(xb,bb);x.lineTo(xa,ba);x.fill();
  if(open>0){const xo=xa+(xb-xa)*(1-open);x.fillStyle=HP.door2;x.beginPath();x.moveTo(xa,dt0);x.lineTo(xo,dt0-(dt0-dt1)*0.2);x.lineTo(xo,ba-(ba-bb)*0.2);x.lineTo(xa,ba);x.fill();}
  x.fillStyle='#e9edf2';const fs=Math.max(18,60*(1-k));txt(num,(xa+xb)/2,dt0-(dt0-dt1)/2+fs*1.6,`400 ${fs}px Anton`,num==='13'&&o.callOn?'#ff8a80':'#cfd6de');
  if(num==='13'){const on=o.callOn&&Math.sin(t*7)>0;x.fillStyle=on?'#ff3b30':'#4a1512';x.beginPath();x.arc((xa+xb)/2,dt0-(dt0-dt1)/2-30,14,0,7);x.fill();if(on)glow((xa+xb)/2,dt0-(dt0-dt1)/2-30,120,'rgba(255,60,50,0.45)');
   if(o.chart){x.fillStyle='#e8e1cf';x.fillRect((xa+xb)/2-14,(dt0+ba)/2-20,28,38);}}}
 // left door 10 + wheelchair
 x.fillStyle=HP.door2;x.beginPath();x.moveTo(110,330);x.lineTo(300,560);x.lineTo(300,1270);x.lineTo(110,1520);x.fill();
 x.strokeStyle='#59616d';x.lineWidth=7;x.beginPath();x.arc(330,1430,60,0,7);x.stroke();seg([300,1330],[400,1330],8,'#59616d');seg([300,1250],[300,1380],8,'#59616d');
 // ceiling tubes (flicker)
 for(let i=0;i<4;i++){const k=0.12+i*0.2;const y=0-(0-(vy-140))*k+20;const hw=(540-(540-120)*k)*0.25;const fl=(i===2&&hash(Math.floor(t*12))>0.6)||o.dark>0.8?0:1;
  x.fillStyle=fl?'#eaf6ff':'#3a4048';x.fillRect(vx-hw,y,hw*2,10+12*(1-k));if(fl)glow(vx,y+60,320*(1-k)+80,'rgba(200,235,255,0.14)');}
 if(o.hero){const hs=o.heroS??1.2;hero(o.heroX??540,o.heroY??1700,hs,Object.assign({walk:o.walk?t:null,tt:t},o.heroO||{}));}
 if(o.beam)beam(o.heroX??540,(o.heroY??1700)-300*(o.heroS??1.2),o.beam,1500,0.22,0.4);
 vignette(0.6);darkness(o.dark??0.45,[[vx,vy,520],[o.heroX??540,(o.heroY??1700)-350,420],...(o.holes||[])]);
 if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,90,80,${o.red})`;x.fillRect(0,0,W,H);x.restore();}}
// close-up: red call light above door 13 blinking, DING rings
function callLight(t,o={}){x.fillStyle=HP.wall;x.fillRect(0,0,W,H);x.fillStyle=HP.door;x.fillRect(240,980,600,940);x.fillStyle=HP.door2;x.fillRect(260,1000,560,920);
 rr(380,1110,320,170,10,'#cfd6de');txt('13',540,1240,'400 130px Anton','#2a2f3a');
 const on=o.on!==false&&Math.sin(t*7)>-0.2;rr(380,560,320,200,40,'#1a1d22');x.fillStyle=on?'#ff3b30':'#4a1512';x.beginPath();x.arc(540,660,80,0,7);x.fill();
 if(on){glow(540,660,520,'rgba(255,60,50,0.45)');x.strokeStyle='rgba(255,120,110,0.6)';x.lineWidth=8;for(let k=0;k<3;k++){const r=120+((t*200+k*90)%270);x.globalAlpha=1-r/390;x.beginPath();x.arc(540,660,r,0,7);x.stroke();}x.globalAlpha=1;}
 txt('CALL',540,830,'800 34px Inter','#9aa3ad');vignette(0.65);}
// elevator: steel doors slide open (p 0..1) on an empty lit car; floor arrows
function elevatorOpen(t,p,o={}){x.fillStyle=HP.wall2;x.fillRect(0,0,W,H);x.fillStyle=HP.floor;x.fillRect(0,1560,W,360);
 rr(170,330,740,1250,10,'#4c535c');x.fillStyle='#fff1c8';x.fillRect(210,400,660,1180);// lit car
 x.fillStyle='#d9c79a';x.fillRect(210,1450,660,130);x.strokeStyle='#bfae84';x.lineWidth=4;seg([240,900],[840,900],6,'#c9b78c');
 if(o.who){x.globalAlpha=o.who;x.fillStyle='rgba(20,20,30,0.85)';x.beginPath();x.ellipse(540,1000,70,80,0,0,7);x.fill();x.fillRect(470,1080,140,370);x.globalAlpha=1;}
 const g=330*ease(clamp(p));x.fillStyle='#8e979f';x.fillRect(210-g,400,330,1180);x.fillRect(540+g,400,330,1180);x.fillStyle='#7a838b';x.fillRect(536-g,400,6,1180);x.fillRect(538+g,400,6,1180);
 x.fillStyle=HP.wall2;x.fillRect(0,400,210,1180);x.fillRect(870,400,210,1180);
 rr(925,700,130,90,10,'#151820');txt(o.floor||'B',990,768,'400 60px Anton','#ff5a4a');
 x.fillStyle='#ffcf4a';x.beginPath();x.moveTo(960,900);x.lineTo(990,860);x.lineTo(1020,900);x.fill();
 warmLight(540,1000,700*ease(clamp(p))+10,0.4);x.fillStyle='rgba(255,240,200,0.12)';x.beginPath();x.moveTo(540-g,1580);x.lineTo(540+g,1580);x.lineTo(540+g*1.6,1920);x.lineTo(540-g*1.6,1920);x.fill();
 vignette(0.6);}
// stairwell: zig-zag flights, green EXIT sign, hero climbing (p 0..1)
function stairwell(t,p,o={}){x.fillStyle='#232a33';x.fillRect(0,0,W,H);
 for(let f=0;f<3;f++){const by=1700-f*560;x.fillStyle=f%2?'#3a424e':'#333b46';x.beginPath();const dir=f%2?-1:1,x0=dir>0?120:960;for(let s=0;s<9;s++){x.rect(x0+dir*s*90-(dir<0?90:0),by-s*56,90,56+s*56);}x.fill();
  seg([x0,by-60],[x0+dir*810,by-560],8,'#8a939e');}
 rr(760,170,220,90,10,'#0f2a18');txt('EXIT',870,240,'400 64px Anton','#6dff9a');glow(870,215,260,'rgba(109,255,154,0.25)');
 const s=Math.floor(clamp(p)*8);const hx=120+clamp(p)*720,hy=1700-clamp(p)*450;hero(hx,hy,0.95,{walk:t,mood:'scared',look:0.6,tt:t,light:20});
 beam(hx+80,hy-300,30,900,0.25,0.35);vignette(0.6);darkness(o.dark??0.55,[[hx,hy-300,420],[870,215,240]]);}
// CCTV monitor full screen (green night vision), corridor, door 13 slowly opening (open 0..1), timestamp
function cctvView(t,o={}){x.fillStyle='#07120b';x.fillRect(0,0,W,H);x.save();x.translate(0,120);if(o.zoom){const zc=o.zc||[760,700];x.translate(zc[0],zc[1]);x.scale(o.zoom,o.zoom);x.translate(-zc[0],-zc[1]);}
 const vx=540,vy=760;x.strokeStyle='rgba(109,255,154,0.55)';x.lineWidth=4;
 x.beginPath();x.moveTo(0,1500);x.lineTo(vx-90,vy+90);x.lineTo(vx+90,vy+90);x.lineTo(W,1500);x.moveTo(0,80);x.lineTo(vx-90,vy-110);x.lineTo(vx+90,vy-110);x.lineTo(W,80);x.moveTo(vx-90,vy-110);x.lineTo(vx-90,vy+90);x.moveTo(vx+90,vy-110);x.lineTo(vx+90,vy+90);x.stroke();
 x.fillStyle='rgba(109,255,154,0.12)';x.beginPath();x.moveTo(0,1500);x.lineTo(vx-90,vy+90);x.lineTo(vx+90,vy+90);x.lineTo(W,1500);x.fill();
 for(const [k,num] of [[0.3,'11'],[0.58,'12'],[0.8,'13']]){const xa=W-(W-vx-90)*k,xb=W-(W-vx-90)*(k+0.12),ta=80+(vy-110-80)*k+(1500-80)*0*k,ba=1500-(1500-vy-90)*k,tb=80+(vy-110-80)*(k+0.12),bb=1500-(1500-vy-90)*(k+0.12);
  const d0=ta+(ba-ta)*0.3,d1=tb+(bb-tb)*0.3;x.strokeStyle='rgba(109,255,154,0.7)';x.beginPath();x.moveTo(xa,d0);x.lineTo(xb,d1);x.lineTo(xb,bb);x.lineTo(xa,ba);x.closePath();x.stroke();
  if(num==='13'){const op=o.open||0;x.fillStyle='rgba(0,0,0,0.95)';x.beginPath();x.moveTo(xa,d0);x.lineTo(xa+(xb-xa)*op,d0-(d0-d1)*op);x.lineTo(xa+(xb-xa)*op,ba-(ba-bb)*op);x.lineTo(xa,ba);x.fill();
   if(op>0.3&&o.eyes){x.fillStyle='rgba(220,255,230,0.95)';x.beginPath();x.arc(xa+12,d0+90,4,0,7);x.arc(xa+26,d0+90,4,0,7);x.fill();}}
  txt(num,(xa+xb)/2,d0-10,'800 26px Inter','rgba(109,255,154,0.8)');}
 x.restore();for(let s=0;s<190;s++){x.fillStyle='rgba(0,0,0,0.22)';x.fillRect(0,s*10+(t*40)%10,W,3);}grainLite(t,0.18);
 const ss=Math.floor(t)%60;txt('CAM 4 · EAST WING',60,460,'800 40px Inter',HP.green,'left');txt(o.stamp||('02:59:'+String(ss).padStart(2,'0')),60,520,'800 40px Inter',HP.green,'left');
 if(Math.sin(t*4)>0){x.fillStyle='#ff3b30';x.beginPath();x.arc(930,445,14,0,7);x.fill();txt('REC',980,458,'800 34px Inter','#ff3b30');}
 x.strokeStyle='rgba(109,255,154,0.5)';x.lineWidth=4;for(const [a,b,c,d] of [[40,380,40,440],[40,380,100,380],[1040,380,1040,440],[1040,380,980,380],[40,1700,40,1640],[40,1700,100,1700],[1040,1700,1040,1640],[1040,1700,980,1700]]){x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke();}
 vignette(0.7);}
// the patient chart clipped to door 13: shown 0..4 lines; line 1 'NAME: YOU' red circle, polaroid of your face
function chartClose(t,shown,o={}){x.fillStyle=HP.door;x.fillRect(0,0,W,H);x.fillStyle=HP.door2;for(let i=0;i<6;i++)x.fillRect(0,i*330,W,6);
 x.save();x.translate(540,980);x.rotate(-0.03+Math.sin(t*1.3)*0.006);rr(-380,-620,760,1160,20,'#6b4a32');rr(-340,-560,680,1060,6,'#efeadf');rr(-120,-660,240,110,16,'#a9b0b8');
 txt('GREYWATER HOSPITAL',0,-470,'800 34px Inter','#3a4250');txt('ROOM 13 · EAST WING',0,-420,'800 30px Inter','#7a828c');seg([-300,-390],[300,-390],3,'#bbb');
 const L=[['PATIENT:','YOU',1],['ADMITTED:','TONIGHT',1],['TIME:','3:00 AM',1],['NOTES:','late for rounds',0]];
 L.forEach((l,i)=>{if(i>=shown)return;x.globalAlpha=clamp(shown-i);txt(l[0],-300,-300+i*130,'800 34px Inter','#555','left');txt(l[1],-60,-296+i*130,'700 78px Caveat',l[2]?'#b2302a':'#2a2a2a','left');x.globalAlpha=1;});
 if(shown>0.6){x.strokeStyle='#d33';x.lineWidth=6;x.beginPath();x.ellipse(10,-320,110,62,-0.05,0,7*clamp((shown-0.6)*2));x.stroke();}
 // polaroid of your face
 x.save();x.translate(200,300);x.rotate(0.08);x.fillStyle='#fff';x.fillRect(-110,-120,220,250);x.fillStyle='#2b3442';x.fillRect(-95,-105,190,180);
 x.fillStyle=F.skin;x.beginPath();x.arc(0,-5,58,0,7);x.fill();x.fillStyle=F.cap;x.beginPath();x.arc(0,-12,60,Math.PI*1.05,Math.PI*1.95);x.closePath();x.fill();x.fillRect(-62,-30,124,16);
 x.fillStyle=F.ink;x.beginPath();x.arc(-18,0,6,0,7);x.arc(18,0,6,0,7);x.fill();seg([-10,26],[10,26],4,F.ink);x.restore();
 x.restore();if(o.beam!==false)beam(-60,1900,40,1900,0.3,0.4);vignette(0.55);if(o.dark)darkness(o.dark,[[540,900,640]]);}
// room 13: moonlit window, hospital bed, IV stand, heart monitor; the patient (your double: red cap, pale gown) sits up (sit 0..1) and turns (turn 0..1)
function patientBed(t,o={}){const sit=clamp(o.sit??1),turn=clamp(o.turn??0);x.fillStyle='#1b2230';x.fillRect(0,0,W,H);x.fillStyle='#161b26';x.fillRect(0,1400,W,520);
 rr(620,300,360,460,8,'#2b3446');x.fillStyle='#8fa6c8';x.fillRect(640,320,320,420);seg([800,320],[800,740],8,'#2b3446');seg([640,530],[960,530],8,'#2b3446');
 x.fillStyle='rgba(170,195,235,0.13)';x.beginPath();x.moveTo(640,740);x.lineTo(960,740);x.lineTo(700,1600);x.lineTo(160,1600);x.fill();
 // monitor
 rr(110,560,260,190,12,'#11161e');x.strokeStyle=o.flat?'#ff4a3d':HP.green;x.lineWidth=4;x.beginPath();for(let i=0;i<220;i++){const ph=(i+t*120)%110;const yy=650-(o.flat?0:(ph>40&&ph<48?(ph<44?-60:40):0));i?x.lineTo(130+i,yy):x.moveTo(130,yy);}x.stroke();
 txt(o.flat?'--':'61',320,600,'800 30px Inter',o.flat?'#ff4a3d':HP.green);seg([240,750],[240,1450],8,'#444b55');
 // IV stand
 seg([900,820],[900,1480],6,'#8a939e');seg([860,820],[940,820],6,'#8a939e');rr(880,840,40,90,10,'rgba(200,230,255,0.5)');
 // bed
 rr(200,1180,700,120,16,HP.sheet);rr(200,1300,700,40,6,'#8a939e');seg([240,1340],[240,1460],10,'#6f7782');seg([860,1340],[860,1460],10,'#6f7782');rr(170,1000,40,360,10,'#8a939e');
 // patient: legs under sheet; torso rises with sit
 x.fillStyle=HP.sheet;x.beginPath();x.ellipse(640,1180,240,50,0,Math.PI,0);x.fill();
 x.save();x.translate(lerp(600,330,sit),1190);x.rotate(-(1-sit)*1.35);
 x.fillStyle=HP.gown;x.beginPath();x.roundRect(-55,-260,110,260,[30,30,8,8]);x.fill();x.fillStyle=HP.gown2;for(let i=0;i<4;i++){x.beginPath();x.arc(-25+i*16,-200+i*40,5,0,7);x.fill();}
 const hy=-330;x.fillStyle=F.skin;x.beginPath();x.arc(0,hy,66,0,7);x.fill();x.lineWidth=5;x.strokeStyle=F.ink;x.stroke();
 x.fillStyle=F.cap;x.beginPath();x.arc(0,hy-8,68,Math.PI*1.05,Math.PI*1.95);x.closePath();x.fill();x.fillRect(-70,hy-28,140,20);x.beginPath();x.arc(0,hy-78,10,0,7);x.fill();
 const lk=-turn*22;// turn toward camera
 if(o.hollow){x.fillStyle='#07080b';x.beginPath();x.ellipse(-20+lk,hy+4,13,17,0,0,7);x.ellipse(20+lk,hy+4,13,17,0,0,7);x.fill();if(o.eyeGlow)for(const k of[-20,20]){glow(k+lk,hy+4,26,'rgba(255,240,200,0.5)');x.fillStyle='#fff7da';x.beginPath();x.arc(k+lk,hy+4,4,0,7);x.fill();}}
 else{x.fillStyle=F.ink;x.beginPath();x.arc(-20+lk,hy+6,7,0,7);x.arc(20+lk,hy+6,7,0,7);x.fill();}
 if(o.grin){x.strokeStyle=F.ink;x.lineWidth=5;x.beginPath();x.moveTo(-30+lk,hy+28);x.quadraticCurveTo(lk,hy+56,30+lk,hy+28);x.stroke();}else seg([-10+lk,hy+32],[10+lk,hy+32],5,F.ink);
 x.restore();
 if(o.hero)hero(o.hero[0],o.hero[1]??1760,o.hero[2]??1.3,Object.assign({tt:t},o.heroO||{}));
 if(o.beamTo)beam(1080,1900,-38,1700,0.22,0.45);
 vignette(0.6);darkness(o.dark??0.5,[[330,900,o.lightR??380],[800,530,300],...(o.holes||[])]);}
// close-up of your double's face in room 13: cap, hollow eyes, slow too-wide grin (grin 0..1), mouth moves with talk
function twinClose(t,o={}){x.fillStyle='#141a26';x.fillRect(0,0,W,H);x.fillStyle=HP.gown;x.beginPath();x.roundRect(200,1500,680,500,[160,160,0,0]);x.fill();
 const cx=540,cy=980+Math.sin(t*1.3)*6,R=330;x.fillStyle=F.skin;x.beginPath();x.arc(cx,cy,R,0,7);x.fill();x.lineWidth=12;x.strokeStyle=F.ink;x.stroke();
 x.fillStyle=F.cap;x.beginPath();x.arc(cx,cy-40,R+10,Math.PI*1.05,Math.PI*1.95);x.closePath();x.fill();x.fillRect(cx-R-10,cy-140,2*R+20,90);x.beginPath();x.arc(cx,cy-R-60,44,0,7);x.fill();
 x.fillStyle='#06070a';x.beginPath();x.ellipse(cx-110,cy+20,58,76,0,0,7);x.ellipse(cx+110,cy+20,58,76,0,0,7);x.fill();
 for(const k of[-110,110]){glow(cx+k,cy+20,90,'rgba(255,240,200,0.4)');x.fillStyle='#fff7da';x.beginPath();x.arc(cx+k,cy+20,14,0,7);x.fill();}
 const g=clamp(o.grin??1),m=o.talk?Math.abs(Math.sin(t*13))*30:0;x.fillStyle='#06070a';x.beginPath();x.moveTo(cx-60-120*g,cy+150);x.quadraticCurveTo(cx,cy+190+90*g+m,cx+60+120*g,cy+150);x.quadraticCurveTo(cx,cy+190+30*g,cx-60-120*g,cy+150);x.fill();
 x.fillStyle='#e9e4d6';for(let i=-4;i<=4;i++){x.fillRect(cx+i*34*g-8,cy+168+20*g-Math.abs(i)*4*g,16,18*g);}
 vignette(0.75);darkness(0.35,[[cx,cy,560]]);if(o.red){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,80,70,${o.red})`;x.fillRect(0,0,W,H);x.restore();}}

// ---------- added 25 Nov (Hospital Part 2, GO INSIDE) ----------
// room13Empty: inside room 13: the empty bed (warm dent in sheet + pillow, steam wisps), heart monitor on a stand (green trace, bpm), rainy window, door frame on the left with the hallway light. o:{bpm, steam, flash, dark, hero:[x,y,s], heroO}
function room13Empty(t,o={}){x.fillStyle='#1f2633';x.fillRect(0,0,W,H);x.fillStyle=HP.mint;x.globalAlpha=0.35;x.fillRect(0,900,W,26);x.globalAlpha=1;x.fillStyle='#181e29';x.fillRect(0,1380,W,540);
 // window with rain
 x.fillStyle='#0d1424';x.fillRect(620,300,360,420);x.strokeStyle='#3a4556';x.lineWidth=14;x.strokeRect(620,300,360,420);seg([800,300],[800,720],10,'#3a4556');
 x.save();x.beginPath();x.rect(627,307,346,406);x.clip();x.strokeStyle='rgba(160,190,230,0.35)';x.lineWidth=3;for(let i=0;i<30;i++){const rx=627+((i*53+t*90)%380),ry=307+((i*97+t*700)%460);x.beginPath();x.moveTo(rx,ry);x.lineTo(rx-6,ry+28);x.stroke();}x.restore();
 // door frame + hallway light
 x.fillStyle='#2f3a4a';x.fillRect(0,560,170,880);x.fillStyle='rgba(255,240,200,0.18)';x.beginPath();x.moveTo(170,560);x.lineTo(520,1440);x.lineTo(170,1440);x.fill();
 // monitor on stand
 const mx=860,my=860;seg([mx,my+150],[mx,1420],12,'#5d6470');seg([mx-80,1420],[mx+80,1420],12,'#5d6470');rr(mx-150,my-110,300,230,22,'#2c333e');rr(mx-130,my-92,260,170,10,'#05110a');
 const bpm=o.bpm??70,ph=(t*bpm/60)%1;x.save();x.beginPath();x.rect(mx-130,my-92,260,170);x.clip();x.strokeStyle=HP.green;x.lineWidth=5;x.beginPath();
 for(let i=0;i<=52;i++){const u=i/52,px=mx-130+u*260,q=(u+1-ph)%1;let y=my;if(q>0.5&&q<0.53)y-=60;else if(q>=0.53&&q<0.56)y+=30;else if(q>=0.47&&q<0.5)y+=8;i?x.lineTo(px,y):x.moveTo(px,y);}x.stroke();x.restore();
 txt(String(Math.round(bpm)),mx+95,my+60,'800 40px Inter',HP.green);if(ph<0.12){glow(mx-150,my-120,26,'rgba(255,60,50,0.9)');}
 // bed
 const bx=330,by=1180;x.fillStyle='#6b7380';x.fillRect(bx-260,by+60,520,24);seg([bx-250,by+80],[bx-250,by+250],10,'#6b7380');seg([bx+250,by+80],[bx+250,by+250],10,'#6b7380');
 x.fillStyle='#8b94a0';x.fillRect(bx-280,by-160,22,260);x.fillStyle=HP.sheet;x.beginPath();x.roundRect(bx-250,by-40,500,110,30);x.fill();
 x.fillStyle='#eef0f2';x.beginPath();x.ellipse(bx-180,by-50,70,34,0,0,7);x.fill();x.fillStyle='rgba(120,130,150,0.35)';x.beginPath();x.ellipse(bx-180,by-48,40,16,0,0,7);x.fill();
 x.fillStyle='rgba(120,130,150,0.3)';x.beginPath();x.ellipse(bx+30,by-6,190,30,0,0,7);x.fill(); // body dent
 if(o.steam!==false){x.strokeStyle='rgba(230,235,245,0.35)';x.lineWidth=6;for(let k=0;k<4;k++){const sx=bx-120+k*80,ph2=(t*0.6+k*0.3)%1;x.globalAlpha=1-ph2;x.beginPath();x.moveTo(sx,by-60-ph2*160);x.bezierCurveTo(sx+30,by-100-ph2*160,sx-30,by-140-ph2*160,sx,by-190-ph2*160);x.stroke();}x.globalAlpha=1;}
 if(o.hero)hero(o.hero[0],o.hero[1],o.hero[2],o.heroO||{});
 beam(170,1000,8,1200,0.2,0.35);darkness(o.dark??0.45,[[330,1150,520],[mx,my,320],[800,510,300]]);
 if(o.flash){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(255,110,100,${o.flash})`;x.fillRect(0,0,W,H);x.restore();}vignette(0.5);}
// heartClose: big heart-monitor screen: green ECG trace, bpm number climbing, red beat light; o:{bpm, alarm}
function heartClose(t,o={}){x.fillStyle='#14181f';x.fillRect(0,0,W,H);rr(80,500,920,760,50,'#2c333e');rr(130,560,820,620,24,'#03100a');
 const bpm=o.bpm??80,ph=(t*bpm/60)%1;x.save();x.beginPath();x.rect(130,560,820,620);x.clip();x.strokeStyle='rgba(109,255,154,0.12)';x.lineWidth=2;for(let i=0;i<12;i++){x.beginPath();x.moveTo(130+i*70,560);x.lineTo(130+i*70,1180);x.stroke();}
 x.strokeStyle=HP.green;x.lineWidth=9;x.shadowColor=HP.green;x.shadowBlur=18;x.beginPath();for(let i=0;i<=120;i++){const u=i/120,px=130+u*820,q=(u*2+1-ph)%1;let y=860;if(q>0.5&&q<0.53)y-=230;else if(q>=0.53&&q<0.57)y+=110;else if(q>=0.46&&q<0.5)y+=25;i?x.lineTo(px,y):x.moveTo(px,y);}x.stroke();x.restore();
 txt('♥ '+Math.round(bpm),800,1150,'800 90px Inter',o.alarm?'#ff5a4a':HP.green);txt('BPM',800,1210,'800 34px Inter','#7f8a96');
 if(ph<0.15||o.alarm&&Math.sin(t*12)>0){glow(200,620,60,'rgba(255,60,50,0.9)');x.fillStyle='#ff3b30';x.beginPath();x.arc(200,620,18,0,7);x.fill();}vignette(0.45);}
// walkieClose: your walkie-talkie close-up on the belt/hand, green screen "CH 2", red TX light when it talks, sound rings; o:{talk}
function walkieClose(t,o={}){x.fillStyle='#1d2430';x.fillRect(0,0,W,H);x.fillStyle=F.coat;x.fillRect(0,1300,W,620);
 x.save();x.translate(540,1000);x.rotate(-0.08);seg([-110,-460],[-110,-260],26,'#2a2f36');rr(-200,-300,400,760,60,'#2a2f36');rr(-160,-250,320,200,20,'#9fd8a0');txt('CH 2',0,-130,'800 80px Inter','#1d3a22');
 for(let r=0;r<6;r++)for(let c=0;c<5;c++){x.fillStyle='#1a1e24';x.beginPath();x.arc(-120+c*60,40+r*50,10,0,7);x.fill();}rr(-210,-60,30,160,10,'#3a4048');
 const tx=o.talk&&Math.sin(t*10)>-0.2;x.fillStyle=tx?'#ff3b30':'#5a1a18';x.beginPath();x.arc(120,-200,14,0,7);x.fill();if(tx)glow(120,-200,70,'rgba(255,60,50,0.6)');x.restore();
 x.fillStyle=F.skin;x.beginPath();x.ellipse(330,1250,120,90,-0.4,0,7);x.fill();
 if(o.talk){x.strokeStyle='rgba(159,216,160,0.6)';x.lineWidth=6;for(let k=0;k<3;k++){const r=((t*160+k*90)%270)+40;x.globalAlpha=1-r/320;x.beginPath();x.arc(540,800,r+200,Math.PI*1.15,Math.PI*1.85);x.stroke();}x.globalAlpha=1;}
 darkness(0.35,[[540,900,620]]);vignette(0.5);}
