# Recorded narration and demo audio

Use this workflow for human recordings, retakes, silence edits, game dialogue, or sound that seems delayed or noisy. Keep original recordings intact and narration, music, and source demo audio on separate lanes as far as possible.

## Select takes before tightening

1. Inventory the recordings in their intended recording order. Transcribe with source filenames and timestamps; do not simply concatenate the files.
2. When the creator has said later repeated paragraphs are retakes, the later version replaces the earlier version. Compare paragraph meaning as well as exact wording. Retain unique material before and after the replacement and assemble it in story order.
3. Record selected source intervals and superseded passages in the edit plan. Intentional recaps are different from duplicate takes. If replacement scope is genuinely ambiguous, continue independent work and ask about that passage.
4. Clean a representative narration excerpt conservatively, checking both a quiet phrase and a louder one before applying settings to the lane. Reduce microphone noise without metallic pumping, lost consonants, or unnaturally gated breathing. Do not apply the voice filter to music or game audio.

## Remove hesitation, preserve speech

Classify each gap before editing:

| Gap | Treatment |
| --- | --- |
| Inside a fluent phrase, e.g. "pixel art … and AI" or "an emulator … was at the time" | Remove the unnecessary quiet middle so the words connect naturally. |
| Between sentences or thoughts | Keep a small natural breath/pause; do not make every sentence collide. |
| Intentional emphasis, laugh, or necessary breath | Keep unless the creator requests otherwise. |
| Demo, music, or character-dialogue listening window | Protect its full intended duration; it is not dead air. |

Whisper timestamps locate candidates; they are not authoritative boundaries. ASR can absorb a long pause into a word or end a sentence before the last quiet sound. Inspect waveform/energy around the actual sound, and listen to a contextual excerpt where playback is available. Do not cut at a timestamp just because the transcript says the word ended there.

Keep a quiet buffer on both sides of every edit. Use tiny fades or crossfades within those quiet buffers to prevent clicks, without fading syllables or sentence endings. Prefer a conservative first pass, then targeted tightening of the phrases that still drag. There is no universal silence threshold or required gap length: noise floors, breaths, and enunciation vary by speaker and recording. Never time-stretch or change the pitch of human speech merely to remove hesitation.

For each removal, retain source start/end, reason, quiet-boundary evidence, retained buffers, and resulting duration in a cut list. If removing filler such as "I don't know," preserve the preceding sentence ending and the first sound of the following phrase. Do not remove every occurrence automatically.

Compare complete before/after passages, including the words on either side. Transcript comparison can detect missing words but cannot prove intact consonants, smooth joins, or natural rhythm. Very short stitched excerpts can themselves cause ASR hallucinations; use contextual passages without a prompt that biases the expected words. If listening is unavailable, report that limit and do not claim a listening check.

## Give demonstrations their own audio window

When the narration introduces a sound, music cue, or character voice, finish the introduction, pause the voiceover, play the example clearly, then resume. Duck competing music where needed. Do not talk over the content the viewer is meant to hear.

For a character-voice showcase, select the requested number of distinct complete lines; when the brief asks for five or six, a single clipped example does not satisfy it. Log each source in/out and the line heard. Include the onset and natural ending, including a short tail where needed. Listen across both montage joins and verify lip/action sync when visible. The eight-second shot warning never overrides a complete line.

Keep demo picture and its original audio linked. Use the same source interval and time mapping for both. Any trimming at a montage boundary must preserve the demonstrated action and full line, not merely produce the planned montage duration.

## Diagnose delayed or strange demo sound

Check several identifiable events near the start, middle, and end, in the source and exported demo. A menu click, bomb explosion, or clearly visible attack is more useful than guessing from background music.

* **Constant offset:** events differ by roughly the same amount throughout. Measure and compensate the source-specific offset, then check again.
* **Drift:** the error grows or changes over time. Inspect stream start times, durations, frame/sample rates, and packet timestamps before shifting anything. Do not independently reset picture and audio timestamps and assume they still match.
* **Crackle that resembles mic noise:** inspect packet gaps and decoded continuity. A screen recording can have recurring timestamp gaps whose wall-clock duration differs from a straight PCM decode. This is a source-timing problem, not necessarily background noise.

Use `ffprobe` packet/frame timing and decoded durations to establish which case applies. Automatic asynchronous resampling with hard gap compensation can insert thousands of tiny silent spans: duration and sync may improve while the soundtrack acquires rhythmic crackle. Do not call that repaired audio or hide it with heavy denoising.

If that failure is evidenced, recover continuous audio and map it smoothly to source time with a pitch-preserving method, such as a Rubber Band time map derived from packet/frame timestamps. Measure and compensate any processing latency; do not copy offsets from another recording. This is an advanced repair option, not a standard filter chain. Compare continuous sound quality and event alignment at multiple positions before accepting it.

## Preserve timing through revisions

* **Visual-only edit:** keep the approved soundtrack unchanged; copy the encoded audio stream where compatible and verify the encoded packet payload hash. Do not rerun narration cleanup or change music levels during transition polish.
* **Narration-duration edit:** use one removal/time map to ripple visuals, narration, music placement, demo windows, overlays, chapters, and captions if present. Account for crossfade overlap. Avoid cutting through protected demo windows.
* Align picture edits to the output frame grid and derive audio boundaries using consistent sample rounding. Update word anchors as well as clip starts. Verify the exported joins and later demo sync, not just the edit immediately after the cut.
