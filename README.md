# 3AM Rules kit v5.1 (creep layer added) — NEW FORMAT (stick figures, code-drawn, lots of movement)
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
- creep_test.html = the Fresh Mart finale with the creep layer, use it as the reference.
