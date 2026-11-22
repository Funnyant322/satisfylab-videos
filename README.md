# 3AM Rules kit v6 (PICTURE FORMAT, 22 Nov 2026) — v5.1 code-drawn look kept below for reference — NEW FORMAT (stick figures, code-drawn, lots of movement)
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
