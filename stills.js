// node stills.js page.html t1 t2 ... -> chk/st_<t>.jpg
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [pg,...ts]=process.argv.slice(2);fs.mkdirSync('chk',{recursive:true});const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.resolve(pg));await p.evaluate(()=>document.fonts.ready);await p.evaluate(async()=>{if(window.READY_P)await window.READY_P;});await p.evaluate(()=>document.fonts.ready);
for(const t of ts){const d=await p.evaluate(t=>{window.renderFrame(t);return document.getElementById('c').toDataURL('image/jpeg',0.9)},+t);fs.writeFileSync(`chk/st_${t}.jpg`,Buffer.from(d.split(',')[1],'base64'))}await b.close()})();
