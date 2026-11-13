# Process devlogs and creator styling

Use these as this creator's video defaults unless the current brief says otherwise. They are editorial instructions for the agent, not a promise that every layout or source-audio operation is built into the CLI.

## Tell the process as a conversation

Build the story around choices and consequences: why this idea, what was tried, what went wrong, what the creator asked to change, and what finally worked. Avoid a feature inventory or isolated sentences that jump between topics.

Connect paragraphs explicitly. For example, after explaining a Bomberman-inspired game idea, establish creating its main character before introducing trouble animating her legs. A childhood emulator anecdote can explain the mechanic choice; a ghost's simple silhouette can explain choosing an enemy that needs fewer directional animations. Keep these personal reasons when present in the source instead of replacing them with generic claims about AI.

Explain the actual workflow. In an AI game devlog, coding and debugging may be Claude's role, image generation Codex's, animation Grok Imagine's, and music Suno's. These are roles to verify from the project's evidence, not a mandatory tool stack. Name the tools actually used and distinguish the creator's decisions from generated output. Use supplied/verified model names; do not invent release announcements or attribute all work to one model.

Close with the result and honest limits. Existing rough pixel details, unfinished animation polish, or ideas for maps, enemies, and a villain can make a useful "what could be better" section. Show current flaws when discussing them; clearly frame imagined future features as possibilities. Preserve the creator's conclusion about what made the process easier when supported by their experience.

## Establish the result, then demonstrate the specifics

After any requested greeting on black, show enough of the finished game for viewers to understand it. For a requested full opening sequence, retain title entrance → menu → intro → gameplay in a coherent progression. Other early clips can show different levels or interactions, but let viewers register each moment before cutting.

For every narrated action, log the source file, source in/out, the relevant event time, and the destination phrase. Inspect candidate footage before choosing offsets. If the narrator says the ghost stops and spits flames, show the stop, launch, and visible projectile travel. A ghost GIF or unrelated gameplay does not demonstrate that behavior. Seek later levels/recordings when the mechanic only appears there. Zoom toward the action at the relevant phrase without hiding the player or clipping the projectile path.

Use longer uninterrupted clips when the action, dialogue, or title-to-gameplay flow needs them. Keep real-time demonstrations at their intended speed. Do not shorten a spoken game line or remove part of the result reveal just to hit an edit-frequency target. Read the audio reference for complete sound showcases.

## Choose the correct asset version

For final-result shots, verify what the running project actually uses: active manifest, code references, and final gameplay footage. A file named "final" or a recent modification time is only a clue. Inspect sprite sheets/atlases and their rendered animation; the referenced atlas may differ from a similarly named idle image.

Keep earlier designs where they deliberately show a failure or before/after comparison. When a final-character shot is stale, inspect the entire surrounding scene and update adjacent uses too. Do not erase historical mistakes that explain the process.

## Layout rules

* **Devlog evidence:** relevant text beside its image/animation, with clear visual hierarchy. No redundant "DEV LOG" title, decorative slide frame, or ornamental card furniture. Show only enough text to understand the point.
* **Direct correction to Claude or another coding assistant:** place the actual relevant prompt/correction in a Mac terminal-style window beside the visual. A simple title bar and readable terminal text are sufficient. Preserve the original meaning; do not fabricate a conversation or fake a capture's provenance. Terminal/code text retains its appropriate casing and monospace typography.
* **Other editorial text:** Impact Regular, white, uppercase, no extra letter spacing. Paint the black outline behind the fill so it grows outward without eating the letter interiors. Use Arial Black or Anton if Impact is unavailable. On this creator's Mac, Impact is at `/System/Library/Fonts/Supplemental/Impact.ttf`; resolve the font on the target machine. Inspect the rendered font and outline, not just the CSS declaration.
* **Brief humorous aside:** overlay readable text while keeping the underlying asset centered at its existing size and position. Default to text only, without a box or speech bubble, following the latest correction. Add a bubble only if newly requested. A "quick comment" must still stay long enough to read, not flash for a frame.
* **Tool websites:** use the real website capture with a centered transparent PNG of the correct tool logo over it. Preserve logo proportions and leave useful site content visible. Give the logo a restrained entrance; do not replace it with an emoji or generic icon.

For browser-rendered editorial text, the intended styling is equivalent to:

```css
.editorial-text {
  font-family: Impact, "Arial Black", Anton, sans-serif;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0;
  -webkit-text-stroke: 8px black; /* choose width for actual output size */
  paint-order: stroke fill;
}
```

For raster text, draw the stroke pass first and the clean fill pass on top. Export and inspect at the intended viewing size. The CSS is a layout recipe, not a new CLI option. The existing engine's name/date chips are available for appropriate labels; they are not the default for asides or ordinary devlog text.

## Transitions with a reason

Favor asset-sheet → animated-sprite matches, before → correction → after reveals, and focused pushes into the detail being discussed: legs, eyes, or noisy pixels. Use subtle logo entrances and occasional brief pixel wipes at major process changes if they suit the game. These transitions should help viewers follow the work.

Keep established movement continuous; do not restart an image's entrance or zoom between adjacent shots. Avoid flashes at ordinary cuts, gratuitous shakes, and decorative motion that hides evidence. Complete demos provide useful breathing room. When polishing visuals, preserve the approved audio unless an audio change was also requested.
