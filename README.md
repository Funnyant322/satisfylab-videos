# 3AM Rules kit v7 (FLAT FORMAT, owner's choice 22 Nov 2026 16:41) — read the V7 section at the END first; v6/v5 kept for reference — NEW FORMAT (stick figures, code-drawn, lots of movement)
Files: common.js (stick-figure engine: fig(), poses P.*, headDraw/face, helpers rr/lg/rg/glow/seg/txt),
example_episode.html (the Fresh Mart finale: sets aisle/office/storeFront/counter, cart, card, bubble, reel-style captions, HUD, RUN pose, timeline S[...] driven by word times),
render.js, stills.js, mix.py, music/ (m0..m6 + bed_drone), sfx/ (whoosh, stinger, stinger_low, stinger_rev, hit_low, thud, riser, static, heartbeat, footstep, cart, paper, ring, flicker, lightsout, radio, pa, freezer, cry, car).
Pipeline per episode:
1. words: speech -> scribe words -> drop "[tags]" -> words.js: window.WORDS=[{w,s,e},...]
2. copy example_episode.html -> epN.html; keep common.js + captions + hud helpers; write NEW sets for the episode's places and a NEW timeline S=[[start,end,'scene'],...] cut on word times (2-4 s per shot, faster in the first 10 s). Characters MOVE in every shot.
3. node stills.js epN.html <12 times> ; look at a contact sheet; fix.
4. node render.js epN.html fr <duration+0.6>
5. python3 mix.py vo.mp3 fr epN_final.mp4 spec.json  (pick a music track different from the previous part; vary the scare sound and its timing)

CREEP LAYER (v5.1, required in every episode — the plain v5 look was not creepy enough):
- Shelves/props use the dark DUSK palette, never bright rainbow colours.
- camShake(t,amt) right after x.save() at the top of renderFrame (1.5+ in chase/hook shots, ~0.6 otherwise).
- creep(t,{dark,lights,grade,grain,flicker,eyes,glitch,red}) after the vignette, before hud()/captions(). Most shots dark .5-.75 with 1-2 light pools on the character; daylight shots still dark .2-.45 + grade.
- Something is always watching: 1-3 pairs of eyes in the dark per shot, and a shade() tall shadow figure in at least 3 shots (end of corridors, doorways, behind the character), with shadeEyes() in creep eyes so its eyes glow through.
- glitch:1 on the first 0.25 s of the hook and on each scare; scareFlash(t,at) (2 frames) once per part, right before the twist.
- Creepy characters use face moods 'hollow' or 'stare' (or 'grin'); the narrator character stays 'scared'/'neutral'.
- example_episode.html (and creep_test.html) = the Fresh Mart finale WITH the creep layer, use it as the starting point. example_episode_v5_old.html = old non-creepy look, do NOT use.

GET CREEPIER EVERY PART (escalation rule):
- Each new part must be creepier than the part before it. Keep everything above, then add at least ONE new scare idea not used in the previous part, e.g.: the shadow figure is closer than last time; a pale face peek() from behind a shelf/door; wrongFace() on the narrator for 2 frames; HUD shows a wrong time or a wrong step count for a moment; text on a sign changes to "BEHIND YOU"; the lights go fully black for 0.5 s with only eyes visible; something copies the character's pose in the background; a second shadow figure.
- The creepiest moment goes in the first second (hook) AND near the end before the vote.
- Note in the bible episode log which new scare idea each part used, so the next part picks a different one.
- The review task (Mon & Thu) should check retention on the creepiest moments and write in LEARNINGS which scare ideas to repeat or push further.


=====================================================================
V6 PICTURE FORMAT (owner's decision 22 Nov 2026 — USE THIS for every new part)
=====================================================================
Reference video: reference/bunker_part1_remake_FORMAT.mp4 (the owner's remake of Bunker Part 1). Every part must look like it.
- Backgrounds = PICTURES from pics/ (Flow / Nano Banana, dark gritty hand-drawn horror cartoon). See pics/bunker/INDEX.md.
  Shots: pic(key, p, {z0,z1,x0,x1,y0,y1}) = slow zoom/pan. 12-18 shots per part, 2-4 s each, faster in the first 10 s.
  kid_*.jpg and pics/bunker_ep1/* already contain the stick-figure hero: don't draw kid() on them. On empty places use kid(px,feetY,scale,pose,{mood,light}).
- Template: example_pics_episode.html (loads fonts/, common.js, pics.js). Copy to epN.html and change window.PICS, window.HI (green/red caption words),
  the timeline S, CLOCK, NOISE and the shot code. words.js (ElevenLabs word timings) is written per episode as before.
- On top (pics.js): hud2 (DAY N OF 6 / clock / ZOMBIE BUNKER · EP N / NOISE meter), captions2 (centre, 1-3 words), redFlash, topLabel,
  rewindCard, noteCard (RULE #n), itemTag (+ ITEM), quote (radio lines), vote2 (OPEN IT / BLOCK IT buttons), windowEyes, blackout, then creep() lighter (dark .3-.6).
- render.js / stills.js wait for pictures + fonts (window.READY_P). Always check a stills contact sheet first: no "MISSING <key>" frames.
- Need a picture that doesn't exist? Use the closest one + overlays and write it in the bible's PICTURE WISHLIST (owner's computer-on sessions make them in Flow with Nano Banana 2.1). Never use ElevenLabs images.
- Old v5.1 files (example_episode.html, creep_test.html) are the previous code-drawn look: do NOT use them for new parts.


=====================================================================
V7 FLAT FORMAT (owner's choice 22 Nov 2026 — USE THIS for every new part; overrides V6 pictures and v5)
=====================================================================
Reference video: reference/bunker_part2_FLAT_FORMAT.mp4 (approved by the owner). Style source: Instagram reel by @oddhourtales ("Night 1 of 7", lighthouse keeper rules).
Everything is drawn in CODE (flat.js) — no AI pictures, no Flow, no computer needed:
- clean flat 2D shapes, deep navy/charcoal nights, soft warm lamp/bulb glows, flashlight beams + darkness with light holes, light grain
- hero(): round white head, dot eyes, red knit cap, olive coat, brown backpack, thin dark legs (moods calm/worry/scared/shock, arms down/hold/up/point/mouth, light = flashlight angle, walk, turn)
- slowOne(): flat grey-green zombie, hollow eyes (eyeGlow), sit/stand, tap, lift (head up), talk, chain; no gore
- sets: bunkerRoom (eyes/knock/radioOn/swing/hero), doorClose (chains 0..1 / open 0..1), tunnel (walk + beam), tinyRoom (slow, beamX/beamR), heroClose (big face), slowClose, handTap, radioClose (CH display + waveform), ruleNote (handwritten "Rules for the bunker", lines appear one by one; 4th item = red)
- hud3(): red "DAY N / 6", big clock + AM/PM, place line, status chips (e.g. ✓ HATCH: LOCKED, NOISE: QUIET/LOUD)
- captions3(): bottom (y ~1580), 1-3 words Anton, gold/red key words via window.HI, small yellow speaker tag above (RADIO · CH 3, M.'S NOTE)
- vote3('A','B',dt): green 1 / red 2 buttons + "COMMENT 1 OR 2"; flashRed on scares, cutFlash on cuts, grainLite
Template: example_flat_episode.html (= the approved Part 2). Copy to epN.html, keep the engine, change S timeline, CLK/PLACE/NOISE, RULES and the shots;
ADD new set functions in the same flat style for new places (woods, hatch outside, supermarket, cabin, radio tower...) inside epN.html or flat.js.
Length about one minute (55-70 s). ElevenLabs voice can run long: trim pauses > 0.22 s and speed up with atempo 1.05-1.1 (see bible), then remap word times.
After mix.py check true peak; if above -1 dBFS re-encode audio with volume=-1.5dB,alimiter=limit=0.78.

New flat.js functions (22 Nov, Bunker Part 2 BLOCK IT): barricade(t,stage 0..3,{shake}) over bunkerRoom's back door; cansRoll(t) noisy cans close-up; doorGap(t,p,{feet}) gap under the door with a page sliding in/out + feet shadows; tornPage(t,lines,shown,{red}) M.'s torn page with handwritten lines.

New flat.js functions (23 Nov, Bunker Part 3 ANSWER THE RADIO): woodsSky(t,{dawn,base}) night/dawn sky + pine rows; hatchOutside(t,{dawn,n,sit,crawl,lift,eyeGlow,notebook,shake,scratch}) the hatch in the woods with a ring of slow ones; radioTower(t,{dawn,talk}) Jo's lattice tower, blinking red light, lit hut window; handMic(t,{press}) thumb on the talk button, red TX light; polaroidM(t,{cap,cap2}) photo of M. (beard, gas mask) + young Jo; hatchUnder(t,{shake,dust,scratch,dawn}) looking up the ladder shaft at the hatch; ladderClimb(t,p,{dawn}) climbing to the hatch; peekOut(t,{lift,eyeGlow,notebook}) POV from the hatch rim at dawn; notebookHold(t,{red}) slow-one hand holding M.'s notebook; staticLines(t,a) static overlay. New sfx/scrape.mp3 (sfx_scrape.py). Episode: episodes/bunker_part3.html.
NOTE 23 Nov: this scheduled environment's network blocks elevenlabsusercontent.com (voice download) and static.metricool.com; the run mixed the final in the ElevenLabs sandbox from GitHub raw files (silent video + music/sfx).

- crawlspace(t,{pry,page,hand,beamA,red,dark,shake}) — top-down floorboards, one board pried up over a dark crawlspace with a lit page (added 23 Nov, Bunker Part 4).

New flat.js functions (24 Nov, Bunker Part 5 TRUST MY NOTE): pencilWrite(t,lines,chars,{idle,red,dark}) your page with a pencil writing BY ITSELF (letters appear, pencil tip follows); radioCoat(t,{drop,muffle}) the radio smothered under your olive coat, voice pushing the cloth, amber leak; duskRise(t,p,{dark}) red-orange sunset clearing, a row of slow ones rising out of the tall grass all at once (eyes glow at the end); chainRattle(t,{shake}) close-up of the back-door chains + padlock shaking; wheelTurn(t,ang,{arrows,red}) looking up at the hatch underside, the wheel turning by itself, dust falling. New sfx/chains.mp3 (sfx_chains.py, needs numpy -> run with python3.13). Episode: episodes/bunker_part5.html.
NOTE 24 Nov: network still blocks elevenlabsusercontent.com. Faster route used: render locally, bake music bed + sfx as two extra audio tracks into one stems mp4 (push to the slot branch), attach that one file to the flow, then in the sandbox only loudnorm the voice, sidechain-duck track 1, amix with track 2, copy video (see bible log for the command).
- holdWheel(t,ang,{tug,voices:[[text,t0,col]],red,arrows}) — your arms gripping the hatch wheel from below, begging voices written around it (24 Nov, Bunker Part 6).
- backDoorOpen(t,{open,dark}) — back door hanging open onto the tunnel, chains + open padlock on the floor (24 Nov).
- radioTower(...,{you:true,glow}) — the tower-window silhouette wears YOUR red cap (24 Nov).

New flat.js functions (25 Nov, HOSPITAL Part 1 — new story: night guard at Greywater Hospital, HP palette): hud3({label:'NIGHT',...}) shows "NIGHT N / 6"; hospitalExt(t,{hero,blink,rain}) hospital at night, red cross, dark EAST WING, lit lobby, rain; guardDesk(t,{hero,heroO,callLight,noteGlow,door13,note}) guard desk with 4 green CCTV monitors, lamp, taped note, red call-13 light; hallway(t,{hero,walk,heroX,heroY,heroS,heroO,beam,callOn,door13 0..1,chart,dark,holes,red}) one-point-perspective corridor, doors 11/12/13, flickering tubes, wheelchair; callLight(t,{on}) red call light over door 13 with DING rings; elevatorOpen(t,p,{floor,who}) steel doors sliding open on an empty lit car; stairwell(t,p) zig-zag stairs, green EXIT, hero climbing; cctvView(t,{open,eyes,stamp,zoom,zc}) full-screen green night-vision CAM 4 with door 13 opening + REC; chartClose(t,shown) patient chart on door 13 (PATIENT: YOU / ADMITTED: TONIGHT / 3:00 AM / late for rounds) + polaroid of your face; patientBed(t,{sit,turn,hollow,eyeGlow,grin,flat,hero,dark,lightR}) room 13 with bed, IV, heart monitor, moonlit window, your double in a gown sitting up; twinClose(t,{grin,talk,red}) big close-up of your double (cap, hollow glowing eyes, too-wide grin). Episode: episodes/hospital_part1.html (+ _words.js, _spec.json, make_stems.py = stems mp4 for the sandbox mix when the voice can't be downloaded).
- room13Empty(t,{bpm,steam,flash,dark,hero,heroO}) — inside room 13: empty warm bed (dent + steam), heart monitor on a stand, rainy window, door light (25 Nov, Hospital Part 2).
- heartClose(t,{bpm,alarm}) — big heart-monitor screen with green ECG and BPM (25 Nov).
- walkieClose(t,{talk}) — your walkie-talkie CH 2 close-up, red TX light + rings when it talks (25 Nov).

New flat.js functions (26 Nov, HOSPITAL Part 3 CHASE IT): roundBook(t,rows,{floor,shown,wet,old,date,circle,circleP,flip,red}) guard checkpoint clipboard on the wall (TIME / FL. / ROUND / GUARD table, scribble signatures via sig(), wet-ink glisten + drip, yellowed 2006 pages, page flip, red ring); sig(x,y,w,seed,col) handwritten scribble signature; stairsDown(t,p,{shadow,dark,hero}) looking down the stairwell to the basement with the "B · MORGUE" sign, your shoulders/cap + flashlight in the foreground, the double's red-cap shadow sliding below; morgue(t,{out,elev,who,hero,heroO,dark,red}) basement corridor of steel cold-chamber drawers (drawer 13), mist, ceiling light rows going OUT one row at a time far->near, steel elevator at the end (doors open, the double waving inside); watchClose(t,{time,blink}) wrist + digital watch; elevDouble(t,{wave,grin,step,red}) close-up into the lit elevator car: the double in your coat + red cap, hollow glowing eyes, too-wide grin, your flashlight, waving you in; hero() arm:'wave'. Episode: episodes/hospital_part3.html (+ _words.js, _spec.json).
