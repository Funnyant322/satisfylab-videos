// node render.js page.html outdir seconds  -> outdir/00000.jpg ... at 30 fps
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [pg,out,secs]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({args:['--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+path.resolve(pg));await p.evaluate(()=>document.fonts.ready);await p.evaluate(async()=>{if(window.READY_P)await window.READY_P;});await p.evaluate(()=>document.fonts.ready);
const n=Math.round(parseFloat(secs)*30);for(let i=0;i<n;i++){const d=await p.evaluate(t=>{window.renderFrame(t);return document.getElementById('c').toDataURL('image/jpeg',0.95)},i/30);
fs.writeFileSync(`${out}/${String(i).padStart(5,'0')}.jpg`,Buffer.from(d.split(',')[1],'base64'))}console.log('frames',n);await b.close()})();
