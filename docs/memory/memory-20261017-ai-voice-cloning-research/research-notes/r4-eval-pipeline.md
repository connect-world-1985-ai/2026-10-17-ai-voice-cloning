# R4 - Evaluation, control and the agent narration pipeline (state as of 2026-10-17)

Method note: research done on 2026-10-17. GitHub numbers (stars, licence, last push, archived) come from `gh api repos/...` on 2026-10-17. Vendor docs were fetched with WebFetch on the same day. Search-engine summaries and blogs are marked "(secondary)". Items I could not confirm are marked "unverified". Items that come from general knowledge and were not re-fetched today are marked "(knowledge, not re-fetched)". Facts reused from the earlier video-production notes (`r4-audio.md`, `r5-agent-workflows.md`) were re-checked where marked "re-verified".

Legend: SIM = speaker similarity (cosine of speaker embeddings). WER/CER = word/character error rate. WTS = word-level timestamps. [S#] = source in the list at the end.

---

## PART A - Evaluation

### A1. Speaker similarity (does it sound like me?)

How it works: run a speaker-verification model on (a) a real recording of you and (b) the generated clip; each gives an embedding vector; SIM = cosine similarity of the two vectors. Higher = closer timbre. It measures *voice identity*, not pronunciation or naturalness.

| Tool | What it is | Repo facts (2026-10-17) | Notes |
|---|---|---|---|
| WavLM-large fine-tuned for speaker verification (via `microsoft/UniSpeech` scripts) | The embedding used by **Seed-TTS-eval**, the de-facto zero-shot TTS benchmark [S1, S2] | UniSpeech: 491 stars, licence NOASSERTION, last push 2024-04-05. Seed-TTS-eval: 1,606 stars, no licence file, last push 2024-06-14 | Checkpoint is a Google-Drive link in the Seed-TTS-eval README. Use this if you want numbers comparable to papers |
| ECAPA-TDNN (SpeechBrain `spkrec-ecapa-voxceleb`) | Classic, easy speaker embedding | speechbrain 11,887 stars, Apache-2.0, push 2026-10-14 | `SpeakerRecognition.verify_batch` default decision threshold = **0.25** cosine (read in source `speechbrain/inference/speaker.py`) [S3]. Model weights licence on HF: unverified |
| Resemblyzer | GE2E d-vector, tiny | 3,306 stars, Apache-2.0, last push **2023-10-12** (stale) | Fine for quick checks; scores not comparable with WavLM |
| pyannote embedding | Part of pyannote.audio | 10,661 stars, MIT, push 2026-10-16 | Models are gated on HF (accept conditions + token) [S4] |
| 3D-Speaker (CAM++, ERes2Net/ERes2NetV2) | Alibaba speaker models, strong on Mandarin | 3,184 stars, Apache-2.0, push 2025-12-08 | GPT-SoVITS v2Pro itself ships an ERes2NetV2 speaker-verification checkpoint (`sv/pretrained_eres2netv2w24s4ep4.ckpt`) [S5] |

**Benchmark values (Seed-TTS-eval protocol, WavLM-large SV)** - from Seed-TTS paper Table 1 [S1] and the CosyVoice README table [S6] (fetched 2026-10-17):

| System | test-en WER % | test-en SIM | test-zh CER % | test-zh SIM | test-hard (zh) CER % / SIM |
|---|---|---|---|---|---|
| Human ground truth (Seed-TTS paper) | 2.143 | 0.730 | 1.254 | 0.750 | - |
| Human (CosyVoice README) | 2.14 | 0.734 | 1.26 | 0.755 | - |
| Seed-TTS (closed) | 2.25 | 0.762 | 1.12 | 0.796 | 7.59 / 0.776 |
| MiniMax-Speech (closed) | 1.65 | 0.692 | 0.83 | 0.783 | - |
| F5-TTS 0.3B | 2.00 | 0.647 | 1.52 | 0.741 | 8.67 / 0.713 |
| CosyVoice2 0.5B | 2.57 | 0.659 | 1.45 | 0.757 | 6.83 / 0.724 |
| IndexTTS2 1.5B | 2.23 | 0.706 | 1.03 | 0.765 | 7.12 / 0.755 |
| VoxCPM 0.5B | 1.85 | 0.729 | 0.93 | 0.772 | 8.87 / 0.730 |
| Fun-CosyVoice3-0.5B-2512 | 2.24 | 0.718 | 1.21 | 0.780 | 6.71 / 0.758 |
| Fun-CosyVoice3-0.5B-2512_RL | 1.68 | 0.695 | 0.81 | 0.774 | 5.44 / 0.750 |

What "good" means:
- With this protocol, **real human speech vs another clip of the same person scores ~0.73 (EN) / ~0.75 (ZH)**. Top open models land at **~0.65-0.80**. So SIM ~0.7+ on WavLM-SV = "as similar as two real recordings of the same speaker". Synthetic speech can exceed the human figure because it copies the reference clip's channel/style more closely than a different real recording does (Seed-TTS paper explanation) [S1].
- Numbers are **not comparable across embedding models** (ECAPA, Resemblyzer, ERes2Net give different scales). Fix one model and compare against your own baseline: SIM(your real clip A, your real clip B).
- Caveats: SIM rewards matching microphone/room as well as voice; it is blind to mispronunciation and prosody; a clip with noise/reverb copied from a bad reference can score high. Short clips (<2-3 s) give noisy embeddings (knowledge, not re-fetched).
- Suggested practical rule for the pipeline (my recommendation, not a standard): compute baseline B = mean SIM between pairs of your real recordings; flag a generated chunk if SIM < B - 0.10, and track the per-lesson mean to catch drift.

### A2. Intelligibility (did it say the right words?)

Method: transcribe the generated audio with an ASR model, normalise both texts, compute WER (English) or CER (Chinese) against the script.

| Tool | Use | Facts (2026-10-17) |
|---|---|---|
| Whisper large-v3 (`openai/whisper`) | EN ASR used by Seed-TTS-eval [S1] | 110,739 stars, MIT, push 2026-08-31. Ships `whisper/normalizers/english.py` (`EnglishTextNormalizer`) and `basic.py` (`BasicTextNormalizer`) - verified in repo tree |
| faster-whisper | Same models on CTranslate2, faster; `word_timestamps=True` | 25,913 stars, MIT, push 2026-10-16 (re-verified) |
| Paraformer-zh (FunASR) | ZH ASR used by Seed-TTS-eval [S1] | FunASR 20,725 stars, code MIT, push 2026-10-17. **Model weights under "FunASR Model Open Source License Agreement v1.1"** (attribution required; file `MODEL_LICENSE`) |
| SenseVoice (SenseVoiceSmall) | ZH/EN/yue/ja/ko ASR + emotion + audio-event tags; `use_itn` for punctuation + inverse normalisation | Repo now `QwenAudio/SenseVoice` (redirect from FunAudioLLM): 9,520 stars, MIT, push 2026-09-30. Released checkpoint supports zh, yue, en, ja, ko [S7] |
| jiwer | WER/CER/MER computation with transform pipelines | 936 stars, Apache-2.0, push 2026-09-03 |
| NeMo text processing / WeTextProcessing | Normalise numbers etc. in references (also for TTS input, see Part B) | see B5 |

Normalisation before scoring (otherwise "3" vs "three", punctuation and casing inflate WER):
- English: Whisper `EnglishTextNormalizer` (lower-case, strip punctuation, standardise spellings/numbers) then `jiwer.wer`.
- Chinese: strip punctuation and spaces, convert full-width to half-width, map digits consistently (either both to Chinese numerals via WeTextProcessing TN, or ASR output with ITN), then compute **CER** character by character. Seed-TTS-eval's `cal_wer.sh` takes `zh|en` and does the language-specific scoring [S2].

Thresholds seen in benchmarks (above): human reference ~2.1 % WER (EN) and ~1.3 % CER (ZH); top models 0.8-2.6 %. On the hard Chinese set (tongue twisters, repeated words) even top models are 5-9 % CER.

Suggested practical rule (my recommendation, not a standard): per chunk, re-generate if EN WER > 5 % or ZH CER > 3 % *after normalisation*, or if **any** protected term (product names, code identifiers, numbers) is missing in the transcript. Short chunks make WER jumpy (one wrong word in a 10-word sentence = 10 %), so also check "insertions > 2 words" (hallucinated extra speech) and "duration vs expected duration" (see B2).

Caveats: Whisper itself hallucinates on silence/music and "fixes" disfluencies, so a low WER can hide a skipped filler; ASR also fails on rare technical terms, giving false alarms - keep a whitelist of known terms or check them by forced-alignment confidence instead (knowledge, not re-fetched).

### A3. Naturalness and preference

Subjective tests (standards, knowledge, not re-fetched):
- **MOS** - ITU-T P.800 Absolute Category Rating, 1 (bad) to 5 (excellent), averaged over listeners [S8].
- **CMOS** - comparison MOS (P.800 Degradation/Comparison Category Rating style), listener rates B relative to A on -3..+3 (Seed-TTS used -2..+2; |CMOS| < 0.1 treated as insignificant) [S1].
- **SMOS** - similarity MOS: "how similar is this voice to the reference" 1-5.
- **MUSHRA** - ITU-R BS.1534: several systems rated 0-100 side by side with hidden reference and low anchor; webMUSHRA implements it (and AB per ITU-R BS.1116) [S9].
- For one person judging his own voice, a **blind A/B preference test** is enough: randomise order, hide labels, ask "which is better / which sounds more like me", ≥20 pairs, count wins; a binomial test tells whether the preference is real (knowledge).

Automatic MOS predictors (use for ranking/triage only; they correlate with listener panels on average, not per clip):

| Predictor | Repo facts (2026-10-17) | Notes |
|---|---|---|
| UTMOS (UTMOS22 strong learner) | `sarulab-speech/UTMOS22`: 314 stars, MIT, push 2024-04-11 | VoiceMOS 2022 winner (1st in 10/16 metrics) [S10]. Widely used as "UTMOS" score in TTS papers |
| **UTMOSv2** | `sarulab-speech/UTMOSv2`: 374 stars, MIT, push 2026-04-02 | VoiceMOS 2024 Track 1 (high-quality synthetic speech): 1st in 7/16 metrics, 2nd in the other 9 [S11]. `pip install git+https://github.com/sarulab-speech/UTMOSv2.git`; `utmosv2.create_model(pretrained=True).predict(input_path=...)`. Output is not deterministic by default (random slicing / mixup); a GitHub discussion shows how to make it deterministic [S12] |
| DNSMOS (P.835 / P.808) | In `microsoft/DNS-Challenge` (folder `DNSMOS`, `dnsmos_local.py`): 1,473 stars, repo licence CC-BY-4.0, push 2024-07-25 | Built for noise-suppression quality (SIG/BAK/OVRL); good for detecting noise/artefacts, weak for TTS prosody (knowledge) |
| NISQA / NISQA-TTS | 977 stars, code MIT, push 2024-12-01. **Weights CC BY-NC-SA 4.0** (README) | `nisqa_tts.tar` predicts naturalness of synthetic speech. Non-commercial weights - fine for personal evaluation, not for a paid product |

Simple tools for listening tests:
- webMUSHRA (Fraunhofer licence, custom; free redistribution with source-availability conditions; needs PHP server) - 438 stars, push 2026-05-20 [S9].
- A single self-made HTML page: list of pairs, `Math.random()` order, two `<audio>` tags, buttons A/B/"same", results saved to `localStorage` and downloaded as CSV. An agent can generate this in minutes; nothing to install.

---

## PART B - Common failures and controls

### B1. Failure catalogue

| Failure | Typical cause | Detect automatically? | Main control |
|---|---|---|---|
| Mispronounced technical terms ("Kubernetes", "nginx", "SQL", `kubectl`) | Word not in training data; G2P guess | Partly: ASR mismatch on protected terms; forced-alignment low confidence | Lexicon / alias / IPA (B3), rewrite in script ("sequel" vs "S-Q-L") |
| Acronyms read as words or letters wrongly | Ambiguity (API, GUI, SaaS) | Partly | Alias rules: `API`->"A P I" |
| Numbers, dates, versions ("v2.10", "1.5x", "3/4") | Normalisation differences between models | Yes via WER on normalised text | Pre-normalise text yourself (B5); ElevenLabs docs say smaller models (Flash v2.5) read "$1,000,000" as "one thousand thousand dollars" while Multilingual v2 says "one million dollars" [S13] |
| Code read aloud | Symbols (`()`, `_`, `->`) | Yes (symbols in input = red flag) | Never send raw code; script a spoken version ("call get underscore user") |
| Monotone / flat delivery | High stability settings, flat reference clip, long chunk | Weak (UTMOS/pitch variance as hint) | Expressive reference clip, lower stability, style/emotion tags (B4) |
| Wrong emphasis / sentence-final rising tone | Model guesses focus | No (needs ears) | Punctuation, rephrase, `<emphasis>` where supported, CosyVoice `<strong></strong>` [S6] |
| Artefacts: metallic/robotic timbre, breaths, clicks, pops, clipped ends | Vocoder/codec errors, noisy reference, chunk edges | Partly: DNSMOS/UTMOS dips, peak/click detectors, silence at edges | Clean reference, re-generate with other seed, fades at joins |
| Hallucinated, skipped or repeated words; endless loops | Autoregressive token models: sampling picks a repeat token, attention loses alignment | Yes: ASR insertions/deletions, duration ratio far off expected | Re-generate (new seed), shorter chunks, repetition-aware sampling (VALL-E 2 introduced it to stop "infinite loop" decoding; CosyVoice uses it by default with window 10, τ=0.1) [S14, S15 (secondary)] |
| Long-form drift (voice slowly changes, pace speeds up, energy drops) | See below | Yes: SIM and speaking-rate per chunk over time | Chunking + context conditioning (B6), fixed reference |
| Prosody reset at chunk boundaries (each chunk starts "fresh", like a new paragraph) | Each request generated independently | Partly (pitch jump at joins) | `previous_text`/`next_text` or request IDs (B6), paragraph-sized chunks |

Why long-form drift happens (explanations; first two are standard ML concepts, knowledge, not re-fetched):
1. **Exposure bias** - AR models are trained with the true previous tokens but at inference consume their own outputs; small errors compound over long sequences.
2. **Reference conditioning decays** - the speaker prompt sits at the start of the context; as the generated sequence grows, attention to it weakens, so timbre/style wander. VALL-E 2 explicitly cites "the long context modeling problem" as a motivation for grouped code modeling [S14].
3. **Chunk-boundary prosody resets** - when text is split, each chunk lacks knowledge of neighbouring sentences; ElevenLabs states this causes "abrupt changes in prosody from one chunk to another" [S16].

### B2. Duration sanity check (cheap and very effective)
Expected duration ≈ words / speaking rate (e.g. 150 wpm EN; Mandarin ~4-5 characters/second - both rough rules of thumb, knowledge). Flag chunks whose ratio is < 0.7 or > 1.4 of expected: catches skipped sentences, loops and long silences before running ASR (my recommendation).

### B3. Pronunciation controls by vendor / model (verified 2026-10-17 unless marked)

**ElevenLabs** [S13, S17, S18]
- Eleven **v4** and **v3**: **no SSML `<break>` tags** (docs: "Eleven v4 and Eleven v3 do not support SSML break tags"). Use punctuation, ellipses, audio tags instead. SSML phoneme tags also do not work on v4 (official blog) [S18].
- Eleven v4: **inline IPA between slashes** in plain text (e.g. `/ˈæktʃuəli/`), plus pronunciation-dictionary phoneme and alias rules.
- `<break time="1.5s" />` (up to 3 s) works on older models; too many breaks "can cause instability" (speed-up, noises).
- SSML `<phoneme alphabet="cmu-arpabet|ipa">` tags: best-practices page says "only compatible with `eleven_flash_v2`"; the pronunciation blog says Flash v2 and Turbo v2, English only - minor conflict.
- **Pronunciation dictionaries**: PLS (.pls) or TXT upload, or API `POST /v1/pronunciation-dictionaries/add-from-rules` with rules `{type: alias|phoneme, string_to_replace, alias | phoneme+alphabet, case_sensitive (default true), word_boundaries (default true)}`. Up to **3 dictionary locators per TTS request**, versioned (`version_id`; omit = latest). **Phoneme rules only work on `eleven_v4`, `eleven_flash_v2`, `eleven_v3`**; other models skip phoneme rules (use alias rules). Non-English IPA/CMU needs v4 (or v3 per one page). First matching rule wins; matching is case-sensitive.
- Text normalisation: `apply_text_normalization` = `auto|on|off`; `language_code` (ISO 639-1) enforces language for model + normalisation (not supported on multilingual_v2).

**Azure AI Speech** [S19, S20]
- Full SSML incl. `<phoneme alphabet="ipa|sapi|ups">`, `<sub>`, `<break>`, `<prosody>`, `<lexicon uri=...>`.
- Custom lexicon = W3C **PLS 1.0** XML file at a public/SAS URL; one locale per lexicon; ≤ **100 KB** per file; cached by URI for up to **15 minutes**; case-sensitive; `alphabet="ipa"` or `x-microsoft-sapi`; sapi phone set exists for zh-CN, zh-TW, zh-HK, en-US and others. `lexicon` element is **not supported by the Long Audio API** (use batch synthesis).
- `WordBoundary` events: raised for each word, punctuation and sentence, with audio offset in ticks (100 ns) and text position - usable directly for captions.

**Google Cloud TTS** [S21]
- Classic voices: SSML incl. `<phoneme alphabet="ipa|x-sampa">`; for Chinese `alphabet="pinyin"` (or `jyutping` for Cantonese); custom pronunciation dictionary can be passed in the request.
- **Chirp 3 HD**: conflicting docs - the Chirp 3 HD page says SSML is supported (Preview) for synchronous requests (speak, say-as, p, s, phoneme, sub, break, audio, prosody, voice; streaming ignores SSML), while the voice-list page says "Chirp 3: HD voices doesn't support SSML input". Treat as Preview / test before relying on it.

**Open models (Chinese polyphones 多音字 and pinyin)**
- **IndexTTS2**: mixed Chinese characters + pinyin with tone numbers, e.g. `之前你做DE5很好…打DI1去银行取钱`; only valid syllables in `checkpoints/pinyin.vocab`. **IndexTTS2.5**: `<行|XING2>` / `<行|HANG2>` per-character replacement, English `<minute|M IH1 . N AH0 T>` CMU phonemes, Japanese kana [S22]. Licence: custom bilibili model licence (GitHub NOASSERTION; re-verified).
- **Fun-CosyVoice 3**: "pronunciation inpainting of Chinese Pinyin and English CMU phonemes"; example "hotfix" syntax `对报道[j][ǐ]予好评` (forces 给 = jǐ); fine-grained tags `[breath]`, `[laughter]`, `<strong>…</strong>`, `<laughter>…</laughter>`; instruct prompts for dialect/speed/emotion via `…<|endofprompt|>` [S6, S23]. Apache-2.0, repo now `QwenAudio/CosyVoice` (24,018 stars, push 2026-05-25).
- **GPT-SoVITS**: Chinese front end uses the **G2PW** model (separate download `G2PWModel.zip`, "Chinese TTS only") for polyphone disambiguation [S5]; versions v2Pro, v3/v4 and a **V5** (cuda_graph branch) exist; MIT; 62,996 stars, push 2026-10-08. Direct pinyin-override syntax: unverified.
- **python-pinyin** (`pypinyin`, 5,375 stars, MIT, push 2026-07-20) - useful to *generate* pinyin for checking or to build override lists.

### B4. Emotion / style controls
- ElevenLabs v3/v4 **audio tags** in square brackets: `[whispers]`, `[laughing]`, `[sighs]`, `[excitedly]`, accent tags etc. v4 follows them "more reliably than earlier models" but tags may be misread as sound-effect requests; be explicit (`[low, gravelly voice]`) [S13]. PVC voices are "not fully optimized for Eleven v3" - use v4 for professional clones [S13].
- Voice settings (API): `stability` (default 0.5; higher = more monotone), `similarity_boost` (0.75), `style` (0), `speed` (1.0), `use_speaker_boost` (true) [S17].
- CosyVoice instruct text, IndexTTS2 emotion vectors (`emo_alpha` ~0.6 or lower recommended) and duration factor [S22].

### B5. Text normalisation libraries (run *before* TTS, and on references before WER)
| Library | Languages | Facts (2026-10-17) |
|---|---|---|
| NVIDIA NeMo-text-processing | TN/ITN, many languages incl. zh (knowledge for zh coverage) | 513 stars, Apache-2.0, push 2026-10-06 |
| **WeTextProcessing** | zh + en TN/ITN, WFST-based, `pip install WeTextProcessing`; `wetn --text "2.5平方电线"` | 828 stars, Apache-2.0, push 2026-07-29 |
| num2words | Number -> words, many languages incl. zh variants (knowledge) | 969 stars, **LGPL-2.1**, last push 2025-05-30 |
| LLM pre-pass | ElevenLabs recommends adding normalisation instructions to the LLM prompt or regex code (examples: currency, phone numbers) [S13] | - |

Practical approach for a coding agent: keep a *spoken script* separate from the *display script*. The agent converts display text -> spoken text (expand numbers, versions, acronyms, code), applies the project lexicon, and stores both; captions use the display text.

### B6. Chunking and context conditioning
- Chunk at sentence or paragraph level (1-3 sentences, roughly 100-400 characters is a common practice - knowledge, unverified as a vendor rule). Never split inside a sentence.
- **ElevenLabs request parameters** (create-speech API reference, fetched 2026-10-17) [S17]:
  - `previous_text` / `next_text` - surrounding text to improve continuity.
  - `previous_request_ids` / `next_request_ids` - up to **3** IDs each; if both IDs and text are sent, the text is ignored; best with the same model. `next_request_ids` is designed for regenerating a middle clip (pass clip 1 as previous, clip 3 as next).
  - Request stitching guide: request IDs must be **≤ 2 hours old**; **not available for `eleven_v3`** (guide example uses `eleven_v4`); not available under zero-retention (`enable_logging=false`, enterprise) [S16].
  - `seed` (0-4294967295): "best effort" determinism, **not guaranteed** [S17].
- Open models: pass the same reference clip (and its transcript, for models that need prompt text like CosyVoice/F5) to every chunk; some support streaming of long text (CosyVoice bistream) - per-chunk generation with identical prompt is the robust default.
- Reference clip choice (knowledge + vendor guidance, not re-fetched): 5-15 s for zero-shot models, clean, no music/reverb, same mic you want to sound like, *the speaking style you want* (lecture tone, not conversational), ends on a complete sentence, accurate transcript. Keep one "golden" reference per language.
- Seeds / temperature: fix seed per chunk (hash of chunk text + settings) so re-runs are reproducible where the engine allows; to fix a bad chunk, change only the seed. Lower temperature/top-p = more stable but flatter.

---

## PART C - Pipeline

### C1. Forced alignment and word timestamps
| Tool | Output | Facts (2026-10-17) |
|---|---|---|
| **ElevenLabs Forced Alignment API** `POST /v1/forced-alignment` | Characters + **words** with start/end seconds + per-word `loss` (confidence) and overall loss; file < 1 GB; any text format; no diarization [S24] | Good: gives a per-word confidence you can use as a pronunciation check |
| ElevenLabs TTS `convert-with-timestamps` | Character-level `alignment` + `normalized_alignment` (group chars into words yourself) | From r4-audio.md [S25]; v4 support not re-verified |
| Azure `WordBoundary` event | Word/punctuation/sentence boundaries, offset in 100 ns ticks | [S20] |
| WhisperX | Whisper transcription + wav2vec2 phoneme alignment -> WTS; torchaudio default align models for en/fr/de/es/it, others (incl. zh) via HF list `DEFAULT_ALIGN_MODELS_HF` | 24,629 stars, BSD-2, push 2026-09-26 [S26] |
| faster-whisper `word_timestamps=True` | WTS from cross-attention (less precise than forced alignment) | MIT |
| **ctc-forced-aligner** | Aligns *your known script* to audio; default model `MahmoudAshraf/mms-300m-1130-forced-aligner`; 1,100+ languages; `--romanize` for non-Latin scripts (Chinese) | 570 stars, BSD-2, push 2026-09-07 [S27] |
| Montreal Forced Aligner | Word + phone level, needs acoustic model + dictionary (Mandarin models exist - knowledge) | 1,904 stars, MIT, push 2026-10-08 |

Best practice for TTS output: you already know the exact text, so use **forced alignment against the spoken script** (ctc-forced-aligner, MFA or ElevenLabs alignment) rather than free ASR timestamps; use ASR only for the WER check.

### C2. Assembly
- **ffmpeg concat demuxer** (`-f concat -safe 0 -i list.txt -c copy`) needs identical codec/sample rate/channels; generate everything as WAV/PCM 48 kHz mono first, encode once at the end (knowledge).
- **pydub** (9,801 stars, MIT, push 2026-03-19): `AudioSegment.silent(duration=ms)`, `append(seg, crossfade=ms)`, `fade_in/out` - easiest for the agent.
- Silence padding (rules of thumb, knowledge): ~250-400 ms between sentences, ~700-1000 ms between paragraphs, 1.5-2 s at slide changes; trim generated leading/trailing silence first (ffmpeg `silenceremove` or pydub `detect_leading_silence`), then add controlled padding.
- Crossfade only within a continuous paragraph (10-30 ms to hide clicks); use short fades (5-10 ms) at every cut to avoid pops.

### C3. Loudness
| Target | Value | Source |
|---|---|---|
| EBU R128 broadcast | **-23 LUFS** integrated, max true peak -1 dBTP | [S28] (re-used from r4-audio.md) |
| AES TD1008 (streaming recommendation, 2021) | speech/news/talk **-18 LUFS**; music track-normalised -16 LUFS | [S29] (AES page + secondary summaries) |
| Apple Podcasts | -16 LUFS ±1, -1 dBTP | (secondary) [S29] |
| Spotify music playback normalisation | **-14 LUFS** (Normal), user modes -11/-19; upload ≤ -1 dBTP (≤ -2 dBTP if louder than -14) | Spotify for Artists page [S30] |
| YouTube | "-14 LUFS" widely quoted; **no official YouTube page found - unverified** | (secondary) |

Practical pick for lesson videos: **-16 LUFS integrated, -1.5 dBTP** (podcast/online practice; YouTube only turns loud content down). ffmpeg two-pass: pass 1 `loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null -`; pass 2 with `measured_I/measured_TP/measured_LRA/measured_thresh/offset` and `linear=true`, then `aresample=48000` (loudnorm may upsample internally) [r4-audio.md S40]. **ffmpeg-normalize** wraps this: EBU R128 two-pass by default, with a podcast preset at -16 LUFS (1,538 stars, push 2026-10-14; licence shown as NOASSERTION on GitHub) [S31]. **pyloudnorm** (783 stars, MIT) to *measure* in Python for the QA report.

### C4. Captions
- Build SRT/WebVTT from word timestamps: group words into cues by punctuation, max characters and max duration; cue end = last word end + small tail (≤ 200 ms) without overlapping the next cue.
- Line limits (Netflix guides): **Simplified Chinese 16 characters/line** (may go to 18), max 2 lines, reading speed up to 9 chars/s (adult, 11 in limited cases); general languages ~**42 characters/line**; cue duration 5/6 s to 7 s [S32, S33]. English reading-speed figure (20 cps) not re-verified.
- Use the *display* script (with digits/code formatting) for caption text and the timing from the spoken script alignment (map by word index).
- Burn-in: ffmpeg `subtitles=` filter; or keep sidecar VTT for HTML players.

### C5. Syncing narration to slides / screen recordings
| Tool | How sync works | Facts |
|---|---|---|
| **Remotion** (React -> MP4) | Put each slide as a `<Sequence from={frame}>`; frames computed from audio timestamps (`seconds * fps`); `<Audio>` per chunk | 64,704 stars, push 2026-10-17; custom licence: free for individuals and for-profit orgs with **≤ 3 employees**, company licence above that [S34] |
| MoviePy | Python: `ImageClip(slide).with_duration(d)` + `AudioFileClip`, `concatenate_videoclips` | 14,996 stars, MIT, push 2026-08-26 |
| ffmpeg only | Export slides to PNG, write a concat list with `duration` per image = audio segment length, mux audio | knowledge |
| Marp (marp-cli) | Markdown -> HTML/PDF/PPTX/PNG; export PNGs then assemble with ffmpeg/MoviePy (no native narration) | 3,871 stars, MIT, push 2026-09-08 |
| reveal.js | HTML slides; narration needs a plugin or recording via headless browser (knowledge) | 72,435 stars, MIT, push 2026-09-30 |

Slide-sync pattern: write the script with explicit markers (e.g. `<!-- slide 3 -->` or `[[click]]`); generate audio per slide (or per marker); the slide's duration = its audio length + padding. This avoids alignment altogether and is idempotent per slide.

Screen-recording sync: two options - (a) **audio-first**: generate narration, then record/cut the screen video to the narration timeline (retime with ffmpeg `setpts`, freeze frames with `tpad`); (b) **video-first**: transcribe or annotate the recording's events (timestamps of clicks/scene changes, e.g. PySceneDetect), then fit narration chunks into the gaps and use `speed` (ElevenLabs 0.7-1.2 typical - knowledge) or IndexTTS `duration_factor` [S22] to fit. Flag chunks that need > ±10 % speed change for rewrite (my recommendation).

### C6. Keeping the voice consistent over a long course
- **Pin everything** in a settings registry (JSON/YAML in the repo): vendor, `model_id` (e.g. `eleven_v4`, never "latest"), voice ID, voice settings, pronunciation dictionary ID **and version_id**, reference clip hash, seed policy, output format, loudness target; for open models also git commit and checkpoint hash.
- **Vendor deprecations happen**: ElevenLabs deprecated `eleven_monolingual_v1` / `eleven_multilingual_v1` (first announced removal for 2025-12-15, then removal on **2026-07-09**), and `scribe_v1` also removed 2026-07-09 [S35]. Keep source WAVs of everything generated so old lessons never need regeneration; re-generate a whole lesson (not single chunks) after a model change.
- One golden reference clip per language; record a fresh real sample every few months to compute baseline SIM and detect if your *real* voice drifted from the clone.
- Run SIM, speaking rate (words/s) and loudness per chunk and plot per lesson; outliers = regenerate.

### C7. Caching, idempotency, cost tracking
- Cache key = hash(spoken text + model_id + voice_id + settings + dictionary version + seed + reference hash). If key exists, skip the API call. Store `request-id` (needed for stitching, valid 2 h) and the `character-cost` response header (ElevenLabs returns it - stitching guide) [S16] in a manifest (CSV/SQLite).
- Re-generating one chunk should not touch others; assembly is a pure function of the manifest.
- Cost: character count × price; ElevenLabs API list price from r4-audio.md: $0.08/1k chars (v4/v3/Multilingual), $0.04/1k (v4 Turbo/Flash) - fetched 2026-10-17 via summariser, conflicting secondary numbers exist; re-check before budgeting.

### C8. What can be automated vs needs human ears
| Fully automatable | Needs a human (at least sampling) |
|---|---|
| Text normalisation + lexicon application | Final judgement of naturalness/emphasis |
| WER/CER vs script; protected-term check | Whether it "sounds like me" (SIM is only a proxy) |
| Duration ratio, silence/clipping/peak checks | Emotional tone fitting the content |
| SIM vs baseline; UTMOSv2/DNSMOS triage | Subtle mispronunciations ASR "corrects" (esp. tones in Mandarin; polyphones) |
| Loudness normalisation and measurement | Pacing relative to on-screen action |
| Alignment, captions, slide timing, rendering | First-time approval of each new lexicon entry |
| Regenerate-on-fail loop (cap 3 attempts, then flag) | Spot-check: listen to every flagged chunk + random 10 % (my recommendation) |

---

## PART D - Lip-synced avatar of your own face (brief)

| Product / model | Facts (dated) | Licence / consent |
|---|---|---|
| HeyGen | Creator $29/mo ($24 annual), 600 credits; Avatar IV = 31 credits/min (~$1.50/min); Avatar V 48 credits/min. API pay-as-you-go from $5: Digital Twin Avatar III $0.0167/s, Avatar IV $0.05/s, Avatar V $0.0667/s; no free API credits since Feb 2026 [S36] (official pages via search, 2026-10-17) | Digital-twin consent flow: not verified this session |
| Synthesia | Personal avatars on Starter (3) and Creator (5), unlimited on Enterprise; **live consent video required, cannot be uploaded, same person as footage, includes on-screen passcode**; footage single take 1-5 min [S37]. Price: official pricing page shows Starter $29/mo (1,250 credits); "Creator $89/mo" appears in help/secondary pages - plan naming conflict | Strong consent gate |
| D-ID | Pro ~$29/mo 15 min (HeyGen comparison blog, secondary); Build $18, Launch $50 for commercial (secondary) [S38] | Secondary only |
| Tavus | Starter $59/mo (3 replica trainings/mo, extra $65), Growth $397/mo (7, extra $40); replica from ~2 min video; consent-script workflow (white-label option) [S39]. A secondary source saw two different price tables on the page in Oct 2026 | Focus = real-time conversational video |
| **LatentSync** (ByteDance) | v1.6 (2025-06-11, 512×512), v1.5 (2025-03-14, better Chinese); inference VRAM 8 GB (1.5) / 18 GB (1.6). 6,150 stars, Apache-2.0, last push 2025-06-20 [S40] | Lip-sync onto an existing video of you |
| MuseTalk (Tencent Music) | v1.5 (2025-03-28); real-time 30 fps+ on V100. 6,737 stars, LICENSE file MIT (GitHub shows NOASSERTION), last push 2025-09-26 | Check bundled model licences |
| Hallo3 (Fudan) | 1,417 stars, MIT code, last push 2025-03-13; tested on H100; derivative of CogVideoX-5B so **CogVideoX licence applies** to weights | Heavy GPU |
| SadTalker | 14,140 stars, Apache-2.0 (with third-party exceptions), last push 2024-06-26 - stale | Single image -> talking head, dated quality |
| Wav2Lip | 13,242 stars, no licence file; README: **non-commercial / research only** (LRS2 data); authors now run sync.so commercially | Do not use commercially |

Recommendation for a Windows 11 user with one consumer GPU: record a few minutes of yourself on camera once, then lip-sync new narration onto it with LatentSync 1.5 (8 GB) or use HeyGen/Synthesia if no GPU. Avatars are optional; slides + voice is the simpler baseline.

---

## Key findings (top 10)

1. **Seed-TTS-eval is the reference protocol**: Whisper-large-v3 WER (EN), Paraformer-zh CER (ZH), WavLM-large-SV cosine SIM. Human ground truth = WER 2.14 % / SIM 0.73 (EN), CER 1.25 % / SIM 0.75 (ZH); top open models (IndexTTS2, CosyVoice3, VoxCPM) reach SIM 0.70-0.78 and CER ~1 % [S1, S6].
2. SIM numbers only mean something relative to **your own real-vs-real baseline with the same embedding model**; SpeechBrain ECAPA's default "same speaker" threshold is 0.25, a completely different scale [S3].
3. Automatic MOS: **UTMOSv2 (MIT)** is the current best open predictor for high-quality TTS (VoiceMOS 2024); NISQA-TTS weights are **non-commercial**; DNSMOS targets noise, not prosody [S10-S12].
4. **ElevenLabs v4/v3 do not support SSML `<break>` or phoneme tags**; v4 uses inline IPA `/.../`, audio tags and pronunciation dictionaries (phoneme rules only on v4, v3, flash_v2; max 3 dictionaries per request, versioned) [S13, S17, S18].
5. **ElevenLabs continuity**: `previous_text`/`next_text` and `previous_request_ids`/`next_request_ids` (max 3, IDs ≤ 2 h old, not on `eleven_v3`, IDs override text); `seed` is best-effort only [S16, S17].
6. **Azure** is the most complete SSML/lexicon stack (PLS lexicon ≤ 100 KB, 15-min cache, zh-CN sapi phones) plus native `WordBoundary` timestamps [S19, S20]. Google Chirp 3 HD SSML is Preview with contradicting docs [S21].
7. **Chinese polyphones**: IndexTTS2/2.5 (pinyin with tone numbers, `<行|HANG2>`), CosyVoice3 (`[j][ǐ]` pinyin hotfix, CMU for English), GPT-SoVITS (G2PW model) give explicit control; pre-normalise numbers with WeTextProcessing [S5, S6, S22, S23].
8. Long-form problems (loops, skips, drift, boundary resets) are inherent to AR codec TTS; **chunk per sentence/paragraph + context conditioning + automated WER/duration/SIM checks + regenerate with a new seed** is the standard remedy; VALL-E 2 repetition-aware sampling addresses loops [S14].
9. For timing, **align TTS output against the known script** (ctc-forced-aligner, MFA, or ElevenLabs Forced Alignment with per-word confidence) instead of relying on ASR timestamps; generating audio **per slide** removes most sync work [S24, S27].
10. Loudness: EBU R128 -23 LUFS broadcast; AES TD1008 suggests -18 LUFS for speech streaming; Spotify -14; Apple Podcasts -16 (secondary); YouTube -14 is unverified - **-16 LUFS / -1.5 dBTP** is a safe course target [S28-S30]. Pin model versions: ElevenLabs removed v1 models on 2026-07-09 [S35].

## Suggested pipeline outline (concrete picks)

```
lessons/<id>/script.md  (display text, slide markers, language tag)
        |
1. Normalise  -> spoken.txt   : agent rules + WeTextProcessing (zh) / NeMo TN or num2words (en)
                                + project lexicon (YAML) -> ElevenLabs dictionary (versioned) or
                                  inline pinyin/IPA for open models
2. Chunk      -> chunks.jsonl : 1 chunk = 1-3 sentences, never across slide markers
3. Generate   -> wav/<hash>.wav : ElevenLabs eleven_v4 (PVC/IVC) with previous/next request IDs,
                                  or local IndexTTS2 / CosyVoice3 with fixed golden reference clip
                                  cache key = hash(text+model+voice+settings+dict_version+seed+ref)
4. Check      -> qc.csv       : faster-whisper large-v3 (EN) / Paraformer-zh or SenseVoice (ZH)
                                WER<=5% EN, CER<=3% ZH, protected terms present,
                                duration ratio 0.7-1.4, SIM >= baseline-0.10 (WavLM-SV or ERes2Net),
                                UTMOSv2 for triage, peak/click/silence checks
5. Fix loop   : fail -> new seed (max 3) -> still failing -> rewrite text / add lexicon entry -> flag for human
6. Assemble   -> lesson.wav   : pydub trim + padding (sentence 300 ms, paragraph 800 ms, slide 1.5 s),
                                5-10 ms fades; ffmpeg-normalize / loudnorm two-pass to -16 LUFS, -1.5 dBTP
7. Align      -> words.json   : ctc-forced-aligner (or ElevenLabs forced alignment) vs spoken script
8. Captions   -> .srt/.vtt    : display text, zh <=16 chars/line, en <=42 chars/line, <=2 lines
9. Video      -> lesson.mp4   : Remotion (slides as Sequences timed from audio) or MoviePy/ffmpeg
                                (PNG slides from Marp + per-slide durations); screen recordings retimed
10. Review    : human listens to flagged chunks + random 10%; blind A/B HTML page when changing model/settings
11. Registry  : settings.yaml (pinned model ids, voice ids, dict versions, ref hash, loudness) + manifest.sqlite (costs, request ids)
```

## Conflicts & uncertainties
- Human SIM baseline: Seed-TTS paper says EN 0.730, CosyVoice README lists 73.4 (and ZH 75.0 vs 75.5) - small differences in recomputation.
- ElevenLabs SSML phoneme tags: "only `eleven_flash_v2`" (best-practices page) vs "Flash v2 and Turbo v2, English only" (blog). Non-English IPA: "v4 only" (API guide) vs "v3 or v4" (agents page).
- ElevenLabs timestamps endpoint support for v4: not verified. `seed` determinism explicitly not guaranteed.
- Google Chirp 3 HD SSML: supported (Preview, sync only) vs "doesn't support SSML" on two Google pages.
- YouTube loudness target: no official page found; -14 LUFS is secondary.
- Apple Podcasts -16 LUFS and AES TD1008 values came via secondary summaries; the AES page itself was reached only as a search snippet.
- Synthesia plan names/prices: official page (Starter $29, Pro tiers) vs help/secondary pages ("Creator $89"). Tavus page reportedly showed two price tables in Oct 2026 (secondary). D-ID prices secondary only.
- HeyGen consent requirements for digital twins: unverified.
- WER/CER/SIM pipeline thresholds in this note are my recommendations derived from benchmark baselines, not published standards.
- Model-weight licences on Hugging Face (SpeechBrain ECAPA, WavLM-SV checkpoint, UTMOSv2 weights, Paraformer under FunASR model licence) not individually verified except NISQA (CC BY-NC-SA) and FunASR (custom attribution licence).
- GPT-SoVITS direct pinyin override syntax: unverified. MFA Mandarin model details and NeMo zh TN coverage: knowledge, not re-fetched.
- ITU-T P.800 / ITU-R BS.1534 descriptions are from knowledge (standards pages not fetched).

## Sources (accessed 2026-10-17)
1. Seed-TTS paper, arXiv 2406.02430 - https://arxiv.org/html/2406.02430 (Table 1 via search extract)
2. Seed-TTS-eval repo README - https://github.com/BytedanceSpeech/seed-tts-eval
3. SpeechBrain speaker inference source - https://github.com/speechbrain/speechbrain/blob/develop/speechbrain/inference/speaker.py
4. pyannote.audio README - https://github.com/pyannote/pyannote-audio
5. GPT-SoVITS README - https://github.com/RVC-Boss/GPT-SoVITS
6. CosyVoice README (evaluation table, features) - https://github.com/QwenAudio/CosyVoice
7. SenseVoice README - https://github.com/QwenAudio/SenseVoice
8. ITU-T P.800 - https://www.itu.int/rec/T-REC-P.800 (not fetched)
9. webMUSHRA README + LICENSE.txt - https://github.com/audiolabs/webMUSHRA
10. UTMOS22 README - https://github.com/sarulab-speech/UTMOS22
11. UTMOSv2 repo and paper arXiv 2409.09305 - https://github.com/sarulab-speech/UTMOSv2 ; https://arxiv.org/pdf/2409.09305
12. UTMOSv2 determinism discussion - https://github.com/sarulab-speech/UTMOSv2/discussions/40
13. ElevenLabs TTS best practices - https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices
14. VALL-E 2, arXiv 2406.05370 - https://arxiv.org/abs/2406.05370
15. CosyVoice sampling (DeepWiki, secondary) - https://deepwiki.com/FunAudioLLM/CosyVoice/5.4-sampling-strategies
16. ElevenLabs request stitching guide - https://elevenlabs.io/docs/developers/guides/cookbooks/text-to-speech/request-stitching
17. ElevenLabs Create speech API reference - https://elevenlabs.io/docs/api-reference/text-to-speech/convert
18. ElevenLabs pronunciation dictionaries guide / agents page / blog - https://elevenlabs.io/docs/eleven-api/guides/how-to/text-to-speech/pronunciation-dictionaries ; https://elevenlabs.io/docs/eleven-agents/customization/voice/pronunciation-dictionary ; https://elevenlabs.io/blog/pronunciation-dictionary-guide ; API: https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/create-from-rules
19. Azure SSML pronunciation and custom lexicon - https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-pronunciation
20. Azure how-to speech synthesis (events) - https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-speech-synthesis
21. Google Cloud TTS Chirp 3 HD, SSML, voice list - https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd ; https://docs.cloud.google.com/text-to-speech/docs/ssml ; https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types
22. IndexTTS README - https://github.com/index-tts/index-tts
23. CosyVoice example.py - https://github.com/QwenAudio/CosyVoice/blob/main/example.py
24. ElevenLabs Forced Alignment API - https://elevenlabs.io/docs/api-reference/forced-alignment/create
25. ElevenLabs convert-with-timestamps - https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps (from r4-audio.md)
26. WhisperX README - https://github.com/m-bain/whisperX
27. ctc-forced-aligner README - https://github.com/MahmoudAshraf97/ctc-forced-aligner
28. EBU R128 - https://tech.ebu.ch/publications/r128 (from r4-audio.md)
29. AES TD1008 page - https://aes2.org/community/technical-council/technical-document-aestd1008/ ; secondary: https://www.forasoft.com/learn/audio-for-video/articles-audio/lufs-targets-per-platform-2026 ; https://www.izotope.com/community/blog/mastering-for-streaming-platforms
30. Spotify loudness normalization - https://support.spotify.com/us/artists/article/loudness-normalization/
31. ffmpeg-normalize README - https://github.com/slhck/ffmpeg-normalize
32. Netflix Chinese (Simplified) Timed Text Style Guide - https://partnerhelp.netflixstudios.com/hc/en-us/articles/215986007-Chinese-Simplified-Timed-Text-Style-Guide
33. Netflix max characters per line FAQ; general requirements - https://partnerhelp.netflixstudios.com/hc/en-us/articles/215274938 ; https://studiopartner.netflix.net/studio/general-requirements-for-timed-text-style-guides
34. Remotion LICENSE.md - https://github.com/remotion-dev/remotion/blob/main/LICENSE.md
35. ElevenLabs changelog 2026-06-08 and 2025-09-29 - https://elevenlabs.io/docs/changelog/2026/6/8 ; https://elevenlabs.io/docs/changelog/2025/9/29
36. HeyGen pricing, API pricing help, pricing blog - https://www.heygen.com/pricing ; https://help.heygen.com/en/articles/10060327-heygen-api-pricing-explained ; https://www.heygen.com/blog/ai-video-generator-pricing
37. Synthesia personal avatars docs/help, pricing - https://docs.synthesia.io/docs/personal-avatars ; https://help.synthesia.io/en/articles/9453224 ; https://www.synthesia.io/pricing
38. D-ID prices (secondary) - https://realtimeavatar.ai/blog/realtime-ai-avatar-apis-compared-2026 ; HeyGen blog [36]
39. Tavus pricing - https://www.tavus.io/pricing ; secondary https://www.spatius.ai/blog/tavus-pricing-2026/
40. LatentSync README - https://github.com/bytedance/LatentSync ; MuseTalk https://github.com/TMElyralab/MuseTalk ; Hallo3 https://github.com/fudan-generative-vision/hallo3 ; SadTalker https://github.com/OpenTalker/SadTalker ; Wav2Lip https://github.com/Rudrabha/Wav2Lip
41. GitHub API metadata for all repos named above (stars, licence, pushed_at, archived) - `gh api repos/OWNER/REPO`, 2026-10-17, incl. microsoft/UniSpeech, resemble-ai/Resemblyzer, modelscope/3D-Speaker, SYSTRAN/faster-whisper, modelscope/FunASR, jitsi/jiwer, openai/whisper, microsoft/DNS-Challenge, gabrielmittag/NISQA, NVIDIA/NeMo-text-processing, wenet-e2e/WeTextProcessing, savoirfairelinux/num2words, mozillazg/python-pinyin, MontrealCorpusTools/Montreal-Forced-Aligner, jiaaro/pydub, csteinmetz1/pyloudnorm, marp-team/marp-cli, hakimel/reveal.js, Zulko/moviepy
42. Prior notes reused: `AI-video-generation-techniques/.../research-notes/r4-audio.md` (sections 4, 6) and `r5-agent-workflows.md`
