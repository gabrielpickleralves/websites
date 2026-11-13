# Revisions and export verification

Use before delivering a first cut or any revision. Verify the actual output and scale the review to what changed.

## Revision record

Keep a small ledger in the video project with the latest approved export, each user correction, the affected scene/source ranges, protected sections, edit/time map, and verification result. Resolve later directions over earlier conflicting ones. User timestamps identify the version they watched; map them through intervening cuts instead of applying them blindly to the latest export.

Before editing, identify whether the request changes visuals, audio content, or duration. Preserve unrelated approved work. Use partial rendering when technically valid; acknowledge when a duration change requires rebuilding dependent timing. Do not promise that every note is only a partial render.

Never overwrite a delivered MP4. Use a new version and keep source files and active timeline references intact. Do not delete original media or delivered versions to make space. Before export, allow disk space for frames, temporary video/audio, muxing, and faststart rewriting. Clean only obsolete scratch files proven unreferenced by the current timeline or concat list. If writes fail despite the estimate, stop the failing export and resolve space without damaging the approved version.

## Review the first/master export

* Probe the output: requested dimensions/aspect ratio, frame rate, expected duration/frame count, and present audio streams. Decode-check for broken frames/streams. Check peaks/clipping and intelligibility, not merely that audio exists.
* Inspect framing and text using contact sheets, then inspect motion at playback speed. Check opening flow, reveal timing, meaningful before/afters, readable comments, and transitions without black glitches or jump resets.
* Compare narration to visuals sentence by sentence. Show the named action, correct development stage, and current final assets at the intended phrase.
* Review narration joins with surrounding words and sentence endings. Confirm retakes are resolved, intra-phrase hesitation is tightened, and breaths/syllables remain intact.
* Verify several source-to-export events across each sound demo, complete character lines, voiceover listening windows, and clear return to narration. Duration equality alone does not establish sync.

## Review a narrow revision

Inspect the changed region and neighboring boundaries, then check the invariants at risk. For a visual-only revision, verify approved audio preservation (encoded packet payload hashes where stream-copying). For narration cuts, check the shared ripple map, new duration, later demo alignment, updated overlays/chapters/captions, and the last frame/audio tail. For a replaced asset, check all adjacent uses in the affected scene.

Use these regression scenarios to review the plan and actual artifact when relevant; they are not automated tests bundled with the CLI:

| Request or failure | Passing behavior |
| --- | --- |
| Later recording repeats an earlier paragraph | Later take replaces that passage; unique neighboring content survives in story order. |
| "pixel art … and AI" / "emulator … was at the time" | The phrase flows without the hesitation and both neighboring words remain complete. |
| "Remove 'I don't know' here" | Only the specified filler is removed; the previous ending and next onset survive. |
| Narrator asks viewers to hear the character | Voiceover pauses; requested five or six distinct examples finish audibly, without competing music. |
| Demo seems delayed or crackly | Offset versus drift versus packet discontinuity is diagnosed; several exported events match and continuous sound is clean. |
| Narrator describes ghost flames | Footage visibly includes the actual attack and projectile, not just the enemy sprite. |
| Character image is outdated | Active project references and final footage identify the current asset; surrounding final-result shots agree. |
| A short funny comment is requested | Image stays centered and unchanged; readable text appears without an unwanted box. |
| Show a direct correction / a tool website | Correction uses a simple terminal beside the visual; website gets its correct transparent logo overlay. |
| Polish transitions only | Motion improves without changing approved narration, demo sound, or timing. |
| Tighten speech late in the film | Contextual phrases improve, every dependent lane ripples together, and later demos/chapters remain aligned. |
| Opening feels fragmented | Requested greeting stays on black, then a coherent result reveal and understandable gameplay clips establish the game. |

Record which checks passed and how. Contact sheets, transcripts, signal measurements, and a successful render each prove different things; none alone proves a smooth finished film. Do not claim listening or watching that was not performed.

Deliver a playable local export with the exact absolute path and version. Briefly state the requested changes, verification performed, and any material unresolved limitation. Keep the current project/edit references usable for the next revision.
