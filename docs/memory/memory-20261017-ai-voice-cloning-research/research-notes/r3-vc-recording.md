# R3 - Voice conversion tools + recording and cleaning your own voice (state as of 2026-10-17)

Audience: a software engineer on Windows 11, new to speech AI, who wants teaching narration in his own cloned voice (English + Mandarin). Local path assumes a consumer NVIDIA GPU (8-24 GB). Commercial use is undecided, so licences matter.

Method note: research done on 2026-10-17. GitHub numbers (stars, licence SPDX id, `pushed_at`, `archived`, latest release) were read with `gh api` on 2026-10-17 (call that "GH 2026-10-17"). READMEs were read through `gh api .../readme`. Vendor docs were read via WebFetch/WebSearch on the same day. Hugging Face was unreachable from the sandbox (curl timeouts), so licences shown only on HF model cards are "unverified". Blogs, wikis and aggregators are marked "(secondary)". Nothing was invented; missing facts are "unverified". "[S#]" = source number at the end.

Re-verification of the prior note (`AI-video-generation-techniques/.../r4-audio.md`, sections 1c and 5): RVC WebUI 38,788 -> 38,790 stars, MIT, push 2026-08-04 (confirmed). Seed-VC 3,897, GPL-3.0, archived, push 2025-04-20 (confirmed). UVR 26,660 -> 26,661, MIT, push 2026-10-06 (confirmed). DeepFilterNet 4,840, last push 2024-10-17 (confirmed; GitHub reports NOASSERTION because the repo ships both LICENSE-APACHE and LICENSE-MIT). RNNoise 5,898 BSD-3, push 2025-02-22 (confirmed). Resemble Enhance 2,459 MIT, push 2024-12-03 (confirmed). ElevenLabs Voice Changer was "not re-verified" there; now verified (section A3).

---

## PART A - Voice conversion (speech-to-speech)

### A1. How it works (conceptual; papers named, details from READMEs where cited)

Voice conversion (VC) keeps **what** is said and **how** it is said (words, timing, intonation) and swaps **who** says it (timbre). A typical pipeline:

1. **Content encoder** - a self-supervised speech model turns the source audio into frame-level features that carry phonetic content but (ideally) little speaker identity. Examples: HuBERT base (fairseq; trained on LibriSpeech 960 h [S30]), ContentVec (HuBERT variant trained to suppress speaker info [S29]), WavLM (kNN-VC, FreeVC [S24, S25]), Whisper encoder (Seed-VC v1 uses Whisper-small; one tiny model uses XLSR-large [S5]), streaming ASR bottleneck features (MeanVC2 [S8]).
2. **Pitch (F0)** - extracted separately so melody/intonation survives (RVC uses RMVPE, a vocal pitch estimator [S1]). Speech models can run without F0; singing models need it.
3. **Speaker conditioning** - either a trained per-speaker model (RVC, so-vits-svc), a speaker embedding from a short reference clip (zero-shot: Seed-VC, OpenVoice, CosyVoice, MeanVC, Chatterbox VC), or nearest-neighbour matching against reference features (kNN-VC replaces each source frame with the mean of the k closest frames from your reference audio [S24]).
4. **Decoder + vocoder** - generates a mel spectrogram or waveform in the target timbre (HiFi-GAN, BigVGAN, diffusion/flow-matching decoders).
5. **RVC's retrieval index** - after training, RVC builds a feature index (Applio docs: "Generate Index: build a retrieval index from the extracted features" [S3]). At inference, source content features are blended with nearest stored features of the target voice, pulling the output closer to your real timbre (mechanism description from general knowledge; the index step itself is documented [S3]).

**Why use VC for this project**
- Prosody control: you (or a good generic TTS) perform the line with the teaching rhythm you want, then VC applies your timbre. ElevenLabs describes Voice Changer exactly this way: "preserving the tone and delivery of the original voice", useful "by fixing pronunciations or infusing that special performance" [S11]. Resemble: "STS lets you demonstrate the delivery instead of leaving it to the model" [S13].
- Repair: re-record a flubbed sentence on a bad day, then convert it to match your best session.
- Cross-lingual: content encoders are largely language-agnostic, so one target voice can be used for EN and ZH sources (Seed-VC, OpenVoice v2 supports EN/ES/FR/ZH/JA/KO natively [S6]). Caveat: accent comes from the **source** speech, not from the target - VC does not fix a non-native accent.
- Workflow idea: Mandarin TTS (native-sounding stock voice) -> VC into your timbre. Result has native pronunciation but your timbre; whether that is "you" ethically/legally is your call.

### A2. Open-source / local tools

All GitHub figures: GH 2026-10-17.

| Tool | Repo / stars / licence / last push / archived | Training data | Zero-shot? | Real-time? | VRAM / Windows | Commercial-use notes | Quality notes / demo |
|---|---|---|---|---|---|---|---|
| **RVC WebUI** | RVC-Project/Retrieval-based-Voice-Conversion-WebUI, 38,790, MIT, 2026-08-04, no. Latest release 2.3.260718 (2026-07-21) | ">=10min low noise speech recommended" [S1]; base pretrain from ~50 h VCTK [S1] | No (per-speaker training) | Yes: 170 ms end-to-end, 90 ms with ASIO [S1] | Training: 8 GB recommended, 4 GB "tight" (secondary [S36, S37]). Windows native; AMD/Intel via DirectML [S1] | Code MIT. Needs HuBERT base + RMVPE weights (see A4). so-vits-svc-fork README calls original RVC "no longer maintained" [S9] while repo still released in July 2026 - conflict | Biggest community; retrieval index |
| **Applio** | IAHispano/Applio, 3,846, MIT, 2026-10-17, no. Release 3.7.0 (2026-10-16) | No fixed duration; "clean and varied" beats long [S3]; community guidance 10-30 min (secondary [S34]) | No | Yes (realtime tab) | Training NVIDIA only, RTX 20xx+ recommended; batch 6-8 for 8 GB [S35]. Windows desktop + compiled builds | README: "source code and model weights ... MIT ... commercial use" plus Terms of Use for the official build; recommends contacting support@applio.org for commercial use [S2] | RVC fork, actively maintained but README says "will no longer receive frequent updates" (stable/mature) [S2]. Note: star count looks low for its popularity; that is what the API returned |
| **Seed-VC** | Plachtaa/seed-vc, 3,897, GPL-3.0, 2025-04-20, **archived** | None (1-30 s reference); optional fine-tune "minimum 1 utterance per speaker ... 2 min on T4" [S5] | Yes | Yes: ~300 ms algorithm + ~100 ms device delay [S5]; 430 ms total on RTX 3060 Laptop [S5] | Windows supported (Python 3.10, optional triton-windows) [S5] | GPL-3.0 code (copyleft if you redistribute). Model weight licence on HF unverified | v2 model "best in suppressing source speaker traits" (accent conversion) [S5]. Demo https://plachtaa.github.io/seed-vc/. **No named successor**; author's newest repo is StreamVoiceAnon (95 stars, Apache-2.0, push 2026-06-23, ICASSP'26 streaming anonymisation + VC) |
| **so-vits-svc** | svc-develop-team/so-vits-svc, 28,073, AGPL-3.0, 2023-11-11, **archived** | Per-speaker training | No | - | - | AGPL | Dead; singing-focused |
| **so-vits-svc-fork** | voicepaw/so-vits-svc-fork, 9,333, NOASSERTION (GitHub), 2026-10-14, not archived; last release v4.2.30 (2026-02-02) | Per-speaker | No | Yes | - | README: "**No Longer Maintained**"; points to Applio (MIT), VCClient, DDSP-SVC [S9] | Avoid for new work |
| **OpenVoice v2** (tone colour converter) | myshell-ai/OpenVoice, 37,911, MIT, 2025-04-19, no | None (short reference) | Yes | unverified | VRAM unverified; Linux-first docs (Windows unverified) | "V1 and V2 are MIT Licensed. Free for both commercial and research use" (since April 2024) [S6] | Converter applies tone colour to a base TTS (MeloTTS); EN/ES/FR/ZH/JA/KO native [S6]. Stale (no push since 2025-04) |
| **CosyVoice VC mode** | QwenAudio/CosyVoice (moved from FunAudioLLM), 24,018, Apache-2.0, 2026-05-25 | None | Yes: `inference_vc(source_wav, prompt_wav)` in `cosyvoice.py`, used with CosyVoice-300M model [S7] | `stream` flag exists; real-time quality unverified | unverified | Code Apache-2.0; model weight licence on HF unverified | VC is a "25hz CosyVoice-300M voice conversion function" (README roadmap) [S7]; main focus is Fun-CosyVoice 3.0 TTS |
| **Chatterbox VC** | resemble-ai/chatterbox, 27,023, MIT, 2026-07-21 | None | Yes: `ChatterboxVC.from_pretrained(device).generate(audio=..., target_voice_path=...)` [S10] | unverified | CPU/CUDA/MPS auto-detect in example [S10] | MIT. **Every output carries Resemble's PerTh imperceptible watermark** [S10] | Language coverage of the VC module unverified (TTS Multilingual V3 covers 23+ languages incl. cross-language cloning) [S10] |
| **FreeVC** | OlaWod/FreeVC, 718, MIT, 2025-01-19 | None (one-shot; trained on VCTK) | Yes | No | - | MIT code; WavLM-Large weights from Microsoft (licence unverified) | 2022 research model (arXiv 2210.15418); 16 kHz with 24 kHz tips [S25] |
| **kNN-VC** | bshall/knn-vc, 526, MIT (LICENSE file; GitHub shows NOASSERTION), 2026-01-16 | No training; uses your reference audio directly | Yes ("any-to-any") | No | GPU via torch.hub | MIT code; WavLM weights from Microsoft | "Improvement in quality diminishes beyond 5 minutes of reference speech" [S24] - good for a quick test with your own recordings |
| **Amphion Vevo / Vevo1.5 / Vevo2** | open-mmlab/Amphion, 10,311, MIT, 2026-03-25 | None | Yes ("SOTA zero-shot VC" claim) [S26] | No | unverified | Code MIT. Vevo trained on Emilia; original Emilia is CC BY-NC 4.0 [S26]; weight licences on HF unverified - **treat weights as research-only until checked** | Vevo2 released 2026-03-25 (arXiv 2508.16332), unified speech + singing incl. VC [S26] |
| **MeanVC** (newcomer, 2025) | ASLP-lab/MeanVC, 309, Apache-2.0, created 2025-09-16, push 2026-07-31 | None | Yes | Yes: streaming; 14M params [S8] | Lightweight | Apache-2.0 (weights licence on HF unverified) | arXiv 2510.08392; demo https://aslp-lab.github.io/MeanVC/ |
| **MeanVC2** (newcomer, 2026) | ASLP-lab/MeanVC2, 171, GitHub licence empty (README says Apache-2.0), created 2026-06-09, push 2026-09-13 | None | Yes | Yes: 110 ms end-to-end, 40 ms chunks, **RTF < 0.633 on a single CPU core**; prebuilt CPU-only Windows .exe [S8] | 18M params | README: Apache-2.0 [S8] (no LICENSE detected by GitHub - check) | arXiv 2606.09050; demo https://aslp-lab.github.io/MeanVC2/. Best CPU-only option found |
| **GPT-SoVITS** (mainly TTS, also VC on roadmap) | RVC-Boss/GPT-SoVITS, 62,996, MIT, 2026-10-08; last tagged release 20250606v2pro; V5 notes in README | Zero-shot TTS from 5 s; fine-tune from 1 min [S4] | Zero-shot TTS yes; "Zero-shot voice conversion (5s) / few-shot voice conversion (1min)" ticked in todo list [S4] | - | Windows installer (`install.ps1 --Device CU126|CU128|CPU`) [S4] | Code MIT; pretrained weights on HF (licence unverified) | Cross-lingual EN/JA/KO/Cantonese/ZH [S4]. Included as the main "train on your voice" route for Mandarin |
| **VCClient (w-okada/voice-changer)** | 21,194, NOASSERTION (LICENSE + LICENSE-CLA + NOTICE), 2026-09-26 | Uses RVC/Beatrice models | - | Yes (real-time GUI) | Win/Mac builds | Licence mix; so-vits-svc-fork calls it "MIT etc." [S9] | Real-time front-end, not a trainer |
| **DDSP-SVC** | yxlllc/DDSP-SVC, 2,691, MIT, 2026-10-04 | Per-speaker | No | Yes | - | MIT | Singing-oriented; "new releases occasionally" [S9] |

IndexTTS: index-tts/index-tts 24,536 stars, push 2026-09-29, custom bilibili licence (NOASSERTION) - a TTS with zero-shot cloning; a standalone VC mode was not found (unverified).

### A3. Cloud / consumer speech-to-speech

| Service | Price (date read) | Limits / notes |
|---|---|---|
| **ElevenLabs Voice Changer** (formerly Speech to Speech) | API **$0.12 per minute**; in app 1,000 credits/min (Starter $6 = 30,000 credits) [S11, S12], 2026-10-17 | Max 5 min per request; `POST /v1/speech-to-speech/{voice_id}`; models `eleven_multilingual_sts_v2` ("often outperforms" the English one even for English) and `eleven_english_sts_v2`; `remove_background_noise` option; any cloned voice (IVC/PVC) can be the target [S11]. WAV/PCM 44.1 kHz output needs Pro tier [S11] |
| **Resemble AI STS** ("Core STS v2") | Flex pay-as-you-go $0.0005/s of output (~$0.03/min) (secondary [S14]); clone storage $2/mo rapid, $5/mo pro (secondary) | Input WAV <=50 MB, <=5 min; target voice "must have 10+ minutes of training dataset" [S13]; `prompt` attribute for accent/style [S13]; output 8-44.1 kHz |
| **Fish Audio** | Plans Free $0 / Plus $15 / Pro $100 / Max $999 per month; API $15 per 1M UTF-8 bytes TTS [S15] | A dedicated STS/voice-changer product could not be confirmed (the /app/voice-changer page shows only a title) - **unverified**. Free tier terms limit to non-commercial (secondary [S15]) |
| **Voice.ai** | Paid from about $8/mo (secondary); pricing page lists Starter with 5 instant voice clones and "Commercial License" [S16] | Consumer real-time changer + cloning |
| **Voicemod** | PRO priced in-app; ~$10/mo or $29.88/yr (secondary [S16]) | Real-time effects/virtual mic; **no short-sample cloning of your own voice** (secondary) - not suitable for narration cloning |

### A4. Licences of the shared building blocks (matter for commercial use)

- **HuBERT base** (`hubert_base_ls960.pt`): released in fairseq (repo MIT, now **archived**, last push 2025-09-30); trained on LibriSpeech 960 h (CC BY 4.0, from general knowledge) [S30]. Weight-specific licence statement: unverified (generally treated as covered by fairseq MIT).
- **ContentVec**: auspicious3000/contentvec, 527 stars, MIT, last push 2023-04-27 [S29].
- **RMVPE**: Dream-High/RMVPE 337 stars, Apache-2.0, push 2024-01-25; yxlllc/RMVPE (who trained the RVC-shipped weights per RVC README [S1]) has **no licence file** (83 stars). The `rmvpe.pt` RVC downloads from `lj1995/VoiceConversionWebUI` on HF: licence unverified.
- **WavLM** (kNN-VC, FreeVC): Microsoft unilm; licence unverified this session.
- **Datasets behind pretrained models**: VCTK (RVC base; licence not re-checked), Emilia CC BY-NC 4.0 (Vevo) [S26]. A non-commercial training set does not automatically make the weights non-commercial, but it is a risk flag.
- **Practical reading**: For a commercially safe local stack, the cleanest documented chain is Applio/RVC (MIT) + ContentVec (MIT) + RMVPE (Apache-2.0 version) + your own data; or MeanVC/MeanVC2 (Apache-2.0 per README); or OpenVoice v2 (MIT incl. weights per README). Seed-VC is GPL-3.0 (fine for internal use, copyleft on distribution). Vevo weights: assume non-commercial until verified.

---

## PART B - Recording your own voice

### B1. How much audio (vendor/model quotes)

| System | Type | Amount (quote) | Source |
|---|---|---|---|
| ElevenLabs Instant Voice Clone | zero/instant | "1-2 minutes of good audio"; "more than 2-3 minutes ... little improvement and can ... be detrimental" | [S17] |
| ElevenLabs Professional Voice Clone | fine-tune | "30-180 minutes"; "at least 30 minutes, ideally 2+ hours"; fine-tune 3-6 h (up to 24 h) | [S17, S18] |
| Azure Personal Voice | instant | "clean human voice sample between 5 and 90 seconds" + verbal consent statement; gated access | [S19] |
| Azure MAI-Voice-2.1 instant cloning | instant, gated | "recommended: 5-60 seconds" | [S20] |
| Azure Professional Voice (CNV) | fine-tune | "reasonable custom voice with 300 utterances"; persona voices "at least 1000 (preferably 2000) utterances" | [S21] |
| Google Chirp 3 Instant Custom Voice | instant | reference "up to 10 seconds" + consent clip "up to 10 seconds", same environment | [S22] |
| Google Custom Voice (full) | fine-tune | "500 individual recordings ... around 20 to 30 minutes" | [S23] |
| Resemble STS target voice | clone | "10+ minutes of training dataset" | [S13] |
| GPT-SoVITS | zero-shot / fine-tune | "5-second vocal sample" zero-shot; "1 minute of training data" few-shot | [S4] |
| RVC | train | ">=10min low noise speech recommended" | [S1] |
| RVC community | train | 15 min for beginners, 40+ min for natural (secondary [S38]); 10-30 min sweet spot, flattening after ~1-2 h (secondary [S34]) | |
| Seed-VC | zero-shot | 1-30 s reference; fine-tune from 1 utterance | [S5] |
| kNN-VC | reference set | gains diminish beyond 5 min | [S24] |

**Takeaway**: record one master set of ~60-120 min of clean speech per language. That covers every option: slice 10 s-2 min for instant clones, 10-30 min for RVC/GPT-SoVITS, 30-120+ min for ElevenLabs PVC.

### B2. Microphone, placement, level, room

- **Mic types** (general knowledge unless cited): USB condenser = simplest (plug in, built-in converter). XLR condenser + audio interface = lower noise, more control, but picks up more room. Dynamic mics (XLR or USB/XLR hybrids) reject room sound better - often the better choice in an untreated room, but need more gain. ElevenLabs: "a professional XLR microphone costing $150 to $300 is sufficient for most voiceover work"; example setups it names: Focusrite interface + Audio-Technica AT2020 or Rode NT1, "$300 to $500" total [S17]. (Those are ElevenLabs' examples, not endorsements here.) Price classes: USB condenser roughly USD 50-150; entry XLR condenser + 2-channel interface roughly USD 250-500; broadcast dynamic mics roughly USD 100-400 (general knowledge, unverified).
- **Distance**: "about two fists away ... approximately 20cm (7-8 in), with a pop filter" between you and the mic; speaking slightly off-axis reduces plosives [S17]. Keep the same distance every session (mark the spot).
- **Pop filter**: required by ElevenLabs ("to avoid plosives as well as breaths ... will also cause issues with the cloning process") [S17].
- **Gain staging** - sources differ, all agree "never touch 0 dBFS":
  - ElevenLabs PVC: peaks **-6 to -3 dB**, average **-18 dB** [S17].
  - Azure professional voice: peaks **-3 to -6 dB**; flagged as too quiet below -18 dB [S21].
  - Sound On Sound (24-bit): average around -18 to -20 dBFS, peaks "around -10 dBFS"; leave about 12 dB safety margin [S39].
  - Voice-over practice: ordinary-line peaks about -12 to -10 dBFS, loudest line about -6 dBFS (secondary [S40]).
  - **Recommendation**: record 24-bit, set gain so normal lines peak around -12 to -10 dBFS and loudest around -6 dBFS; raise to vendor target (e.g. -3 to -6 dB peak) later in post. 24-bit has enough dynamic range that this costs nothing in noise [S39].
- **Noise floor / SNR targets**:
  - Azure: **SNR > 35 dB**; "SNR below 20 can result in obvious noise in your generated voice"; noise before speech **< -70 dB**; silence after last word < -60 dB; little/no compression (max 4:1); 100-200 ms leading/trailing silence [S21].
  - ACX (audiobook standard, useful benchmark): RMS -23 to -18 dB, peaks <= -3 dB, noise floor <= -60 dB RMS, room tone at head and tail [S41].
  - Google full custom voice: average **-23 LUFS +-2** (BS.1770-3) [S23].
- **Room**: deaden reflections; vocal booth or DIY "blanket fort, or closet" [S17]. Turn off fans/AC, record when quiet, keep the PC fan away from the mic. Record 10 s of room tone at the start of each session (useful for noise profiles and checking the floor).
- **Consistency across sessions** (the biggest single factor): Azure - "recordings for the same voice style should all sound like they were made on the same day in the same room"; voice talents manage 2-3 h/day, 3-4 days/week [S21]. Google - record **"match files"** at project start and compare every session against them for volume, energy, cadence, articulation, spectral properties [S23]. ElevenLabs - keep one energy level and one accent throughout; "you can't mix and match or the AI can become unstable" [S17]. Same mic, same position, same gain, same time of day, hydrated, no cold.

### B3. What to read

- **Your real teaching material comes first**: ElevenLabs - the clone copies "cadence, tonality, performance style, the length of your pauses ... 'uhms' and 'ahs'"; choose a script that "fits the tonality we are aiming for" [S17]. Azure suggests a mix: e.g. 1,000 general + 1,000 domain sentences, include phrases you will actually use [S21]. So: read your own lesson scripts (with code terms, numbers and English tech words as you really say them).
- **Phonetic coverage (English)**:
  - CMU ARCTIC: 1,132 prompts selected for diphone coverage, from out-of-copyright texts; licence permits commercial use with attribution [S42]. Azure lists it as "an excellent starting point" [S21].
  - Harvard sentences: 720 sentences in 72 lists of 10 (IEEE 297-1969) [S43].
  - Rainbow Passage (Fairbanks 1960): common warm-up/reference passage [S44]; note an ASHA study found only 35.84% coverage of English consonant contexts, so it is not truly phonetically balanced [S44].
- **Mandarin**:
  - AISHELL-3 (85 h, 218 speakers, 88,035 utterances, char + pinyin transcripts) - OpenSLR lists Apache-2.0 but AISHELL's own page says "research purposes ... commercial usage is not allowed" [S45]. Use its prompt **style**, not necessarily its text, if commercial.
  - Biaobei / CSMSC: 10,000 sentences, ~12 h, single female, 22.05 kHz, non-commercial (secondary [S45]).
  - Content to cover (general phonetics knowledge, not sourced this session): all four tones + neutral tone; tone sandhi (3-3, 一 / 不); retroflex vs dental (zh/ch/sh vs z/c/s), n/l, front/back nasals (-n/-ng); erhua (儿化) only if you actually use it in teaching - be consistent; English code terms embedded in Chinese sentences (code-switching) since that is how you will teach.
- **Script hygiene** (Azure): 2-15 s per sentence; 70-80% statements, ~10% short phrases, plus questions/exclamations; no duplicates; write numbers/acronyms in spoken form in the training transcript ("nine one one", "A B C") [S21].
- **Emotional range**: one consistent teaching persona per dataset (Azure, ElevenLabs [S17, S21]). If you want an "excited" or "calm" style, record it as a **separate** set rather than mixing.

### B4. File format

| Vendor/tool | Requirement |
|---|---|
| ElevenLabs | Record WAV 44.1/48 kHz, >= 24-bit [S17]; upload recommendation "MP3, 192kbps or higher"; WAV "usually do not improve clone quality" [S17] |
| Azure professional | WAV mono, 24 kHz, 16-bit PCM as spec; you can record 48 kHz/24-bit, auto-downsampled [S21] |
| Azure consent/personal | MP3 or WAV, 16/24/44.1/48 kHz, 16/24/32-bit [S19] |
| Google custom voice | 48 kHz/24-bit WAV; "Do not up-sample" [S23]; instant: LINEAR16/MP3/M4A mono [S22] |
| Applio/RVC | Lossless WAV/FLAC; resampled to model rate (32/40/44.1/48 kHz) [S3, S35] |

**Recommendation**: capture 48 kHz, 24-bit, mono WAV; keep untouched originals; derive per-vendor copies.

### B5. Bilingual (EN + ZH) recording

- ElevenLabs: accent comes from the voice samples; "use samples speaking ... the language that the PVC will mainly be used for"; a clone made from English will "very likely have an English accent" in another language [S18]. -> **Record a separate set per language**; for ElevenLabs PVC this likely means two PVCs (one EN, one ZH) - or one PVC in your primary teaching language and accept accent in the other.
- Azure: consent statement must be in the same language as training data [S19, S21].
- GPT-SoVITS: cross-lingual inference EN/JA/KO/Cantonese/ZH from one dataset [S4], but quality is better when training data includes the target language (general experience, unverified).
- For VC (RVC etc.) the **source** speech sets the accent, so one target model trained on both languages is fine; including both languages in training improves coverage of phonemes (general knowledge).
- Practical: same mic, room, distance and gain for both languages; alternate EN and ZH blocks within a session so the timbre stays matched; label every file with language.

---

## PART C - Cleaning the recordings

**Golden rule**: clean as little as possible. Applio: "Avoid strong gating, compression, denoising, or reverb removal simply because they are available. Natural breaths and unvoiced consonants can be useful training material" [S3]. ElevenLabs: "You don't need any fancy post-processing, plugins, denoisers" [S17]. Training learns the artefacts: aggressive denoise gives "watery"/metallic sound (Audacity docs on artefacts [S46]), and the clone will reproduce it. Always A/B processed vs original and keep originals.

### C1. Tools (GH 2026-10-17 unless noted)

| Task | Tool | Status / licence | Notes |
|---|---|---|---|
| Noise reduction (classic) | Audacity Noise Reduction | Free (GPL app) | Profile >=0.5 s of pure noise; defaults: reduction 6 dB, sensitivity 6; start ~12 dB / 6 / 3; lower values if "watery" [S46] |
| Noise reduction (neural, real-time) | RNNoise (xiph/rnnoise) | 5,898, BSD-3, push 2025-02-22 | Low CPU; quality modest |
| Noise reduction (neural, full-band) | DeepFilterNet (Rikorose) | 4,840, MIT or Apache-2.0 (dual), push 2024-10-17 (stale) | 48 kHz WAV only via `deep-filter`; Windows supported (training Linux only) [S47] |
| Denoise + enhance / bandwidth extension | Resemble Enhance | 2,459, MIT, push 2024-12-03 (stale) | Denoiser + enhancer trained on 44.1 kHz speech [S48]. Enhancer can **change timbre** - do not use on training data unless A/B tested |
| Hosted "studio sound" | Adobe Podcast Enhance Speech v2 | Free: audio only, 30 min/500 MB per file, 1 h/day, no strength control; Premium: strength control, 2 h/1 GB files, 4 h/day [S49] | Very strong; free tier cannot dial strength -> high over-processing risk for training data |
| Pro repair suite | iZotope RX 12 | Standard $399, Advanced $1,399 (iZotope store, 2026-10-17) [S50] | Dialogue Isolate (noise + reverb), De-reverb, De-ess, De-plosive, De-click (mouth noise). RX 11 merged Dialogue De-reverb into Dialogue Isolate [S50] |
| Separation / de-reverb models | UVR (Anjok07/ultimatevocalremovergui) | 26,661, MIT, push 2026-10-06 | GUI for MDX-Net/Demucs/Roformer models; GPT-SoVITS bundles UVR5 for "Vocals/Accompaniment Separation & Reverberation Removal" [S4]. Model licences vary (unverified). python-audio-separator (CLI): 1,424, MIT, push 2026-10-01 |
| Separation (stems) | Demucs | facebookresearch archived; adefossez fork maintained (from r4-audio) | Only needed if music/other voices in source |
| De-essing | RX De-ess; DAW de-esser (e.g. Audacity/REAPER plugins) | - | Use gently; harsh "s" in training data becomes harsh "s" in clone (general knowledge) |
| Silence trimming / slicing | openvpi/audio-slicer | 887, MIT, push 2024-06-08 | RMS-based; defaults threshold -40 dB, min_length 5,000 ms, min_interval 300 ms, max_sil_kept 500 ms [S51]. GPT-SoVITS and RVC/Applio include their own slicers [S3, S4] |
| Loudness | ffmpeg `loudnorm` (EBU R128, two-pass) | - | See r4-audio section 6. For **training data**, prefer simple consistent gain / peak normalisation per clip; loudnorm's dynamic mode can alter dynamics (r4-audio [S40 there]). Final narration deliverables: e.g. -16 LUFS (common podcast target, unverified) or vendor spec |
| ASR labelling (EN) | faster-whisper (25,913, MIT, push 2026-10-16); openai/whisper (110,739, MIT) | - | GPT-SoVITS uses Faster Whisper Large V3 for EN/JA [S4] |
| ASR labelling (ZH) | FunASR (modelscope/FunASR) | 20,725, code MIT; models under "FunASR Model Open Source License Agreement v1.1" (attribution, keep model names; commercial not prohibited in the excerpt read) [S52], push 2026-10-17 | GPT-SoVITS uses Damo Paraformer-large + FSMN-VAD + CT-Transformer punctuation for Chinese [S4] |

### C2. Suggested cleaning order (synthesis of [S3, S4, S21, S46])

1. Listen through; delete takes with mistakes, clipping, coughs, other voices. (Clipping cannot be undone by lowering level [S3].)
2. High-pass around 70-80 Hz for rumble (general practice; ACX recommends targeting low rumble, exact range not retrieved [S41]).
3. Light noise reduction only if the floor fails your target (e.g. Azure SNR > 35 dB) - compare residue.
4. De-reverb only if the room is clearly audible; better: re-record in a deader spot.
5. Gentle de-ess / mouth-click removal if needed.
6. Trim silence to ~100-200 ms at edges (Azure) [S21]; slice to 2-15 s clips.
7. Consistent level per clip (peaks -3 to -6 dB per Azure/ElevenLabs).
8. Transcribe with Whisper (EN) / FunASR (ZH), then **proofread** (GPT-SoVITS step "Proofreading ASR transcriptions" [S4]).
9. Hold out a few clips for evaluation (Applio [S3]).

---

## Key findings (top 10)

1. **Record once, reuse everywhere**: ~60-120 min per language of clean 48 kHz/24-bit mono WAV covers instant clones (5 s-2 min), RVC/GPT-SoVITS (10-30 min) and ElevenLabs PVC (30-180 min, ideally 2+ h) [S1, S4, S17, S18].
2. **Consistency beats quantity**: same room, mic, distance (~20 cm), gain and persona across sessions; Google's "match file" method is the best concrete technique [S17, S21, S23].
3. **Level targets**: record peaks around -12 to -6 dBFS, normalise later to -3 to -6 dB peak; Azure wants SNR > 35 dB and pre-speech noise < -70 dB; ACX benchmark noise floor <= -60 dB [S17, S21, S39, S41].
4. **Do not over-clean training data**: denoisers/enhancers' artefacts get cloned; Applio and ElevenLabs both advise minimal processing [S3, S17].
5. **Bilingual**: accent follows the training samples (TTS clone) or the source speech (VC). Record separate EN and ZH sets; expect separate PVCs per language on ElevenLabs [S18].
6. **RVC/Applio** (MIT) remains the standard trained-VC route on Windows + NVIDIA (8 GB comfortable for training); real-time 90-170 ms [S1, S2, S35]. Original RVC still released 2026-07 but described as unmaintained by others - Applio is the active fork.
7. **Seed-VC is archived** (GPL-3.0, last push 2025-04-20) with no named successor; **MeanVC2** (Apache-2.0 per README, 2026) is the notable newcomer: zero-shot, 110 ms streaming, CPU-only Windows exe [S5, S8].
8. Zero-shot VC options with clear permissive licences: OpenVoice v2 (MIT incl. commercial per README), Chatterbox VC (MIT, but **watermarks every output**), CosyVoice `inference_vc` (Apache code), kNN-VC (MIT) [S6, S7, S10, S24].
9. **Cloud STS**: ElevenLabs Voice Changer $0.12/min API, 5-min chunks, works with your PVC; Resemble STS ~$0.0005/s (secondary) and needs a 10+ min target voice [S11, S13, S14].
10. **Licence traps**: AISHELL-3 text/audio is research-only per AISHELL despite Apache tag on OpenSLR; Emilia-trained weights (Vevo) carry CC BY-NC risk; RMVPE weights used by RVC have unclear licence; so-vits-svc is AGPL and archived [S26, S45].

## Conflicts & uncertainties

- **RVC maintenance**: so-vits-svc-fork README says original RVC is "no longer maintained" [S9], yet RVC published release 2.3.260718 on 2026-07-21 and pushed 2026-08-04 (GH). Treat it as low-cadence maintained.
- **Applio stars**: GitHub API returned 3,846 stars, which seems low for a widely used tool; reported as read.
- **Gain targets** differ: ElevenLabs/Azure peaks -3 to -6 dB (delivery levels) vs audio-engineering advice to record peaks ~-10 to -12 dBFS (capture levels). Both are compatible if you record conservatively and normalise later.
- **ElevenLabs IVC duration**: "1-2 minutes" vs "about 1-3 minutes" on different pages of the same docs [S17].
- **ElevenLabs file format**: records at WAV 24-bit recommended, yet upload recommendation is MP3 192 kbps and "WAV usually do not improve clone quality" [S17].
- **AISHELL-3 licence**: OpenSLR "Apache License v.2.0" vs AISHELL "ONLY ... research purposes. Any commercial usage is not allowed" [S45].
- **MeanVC2 licence**: README states Apache-2.0, but GitHub detects no licence file.
- **Resemble STS price**: only from secondary pages; the official pricing page fetched showed detection prices, not STS.
- **Fish Audio STS**: not confirmed to exist as a product.
- **Unverified**: all Hugging Face model-card licences (Seed-VC, Vevo, MeanVC, GPT-SoVITS, CosyVoice weights, rmvpe.pt, HuBERT weight terms, WavLM); VRAM for OpenVoice/CosyVoice VC/Chatterbox VC/Vevo; Chatterbox VC language coverage; whether IndexTTS has a VC mode; the GPT-SoVITS VC function's actual availability in the UI; RVC VRAM figures (from wiki/DeepWiki, secondary); mic price classes; Mandarin script phonetics (from general knowledge); YouTube/podcast loudness targets.

## Sources (all accessed 2026-10-17)

S1 https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI (README zh + docs/en/README.en.md, via gh api)
S2 https://github.com/IAHispano/Applio (README "Terms of Use and Commercial Usage")
S3 https://docs.applio.org/guides/how-create-datasets/ ; https://docs.applio.org/getting-started/training/ (search extracts)
S4 https://github.com/RVC-Boss/GPT-SoVITS (README incl. V2Pro/V5 notes, pretrained-model and ASR sections)
S5 https://github.com/Plachtaa/seed-vc (README; demo https://plachtaa.github.io/seed-vc/ ; arXiv 2411.09943)
S6 https://github.com/myshell-ai/OpenVoice (README licence section)
S7 https://github.com/QwenAudio/CosyVoice (README; example.py; cosyvoice/cli/cosyvoice.py `inference_vc`)
S8 https://github.com/ASLP-lab/MeanVC and https://github.com/ASLP-lab/MeanVC2 (READMEs; arXiv 2510.08392, 2606.09050)
S9 https://github.com/voicepaw/so-vits-svc-fork (README "No Longer Maintained")
S10 https://github.com/resemble-ai/chatterbox (README; example_vc.py; src/chatterbox/vc.py)
S11 https://elevenlabs.io/docs/api-reference/speech-to-speech/convert.mdx ; https://elevenlabs.io/docs/overview/capabilities/voice-changer.mdx ; https://elevenlabs.io/docs/eleven-creative/playground/voice-changer.mdx (search extracts)
S12 https://elevenlabs.io/pricing/api ; https://elevenlabs.io/pricing (search extracts)
S13 https://docs.resemble.ai/voice-generation/speech-to-speech.mdx ; https://www.resemble.ai/products/speech-to-speech
S14 https://checkthat.ai/brands/resemble-ai/pricing ; https://litmustools.com/review/resemble/ (secondary)
S15 https://fish.audio/plan/ ; https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits ; https://hokai.io/hub/tools/fish-audio (secondary)
S16 https://voice.ai/pricing ; https://support.voicemod.net/hc/en-us/articles/360014300760-Voicemod-Features-Free-vs-PRO ; https://toolscorer.com/tools/voicemod/ (secondary)
S17 https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning (fetched in full: recording, mic, levels, distance, IVC/PVC lengths)
S18 https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning.mdx ; https://help.elevenlabs.io/hc/en-us/articles/14888868300177 ; https://help.elevenlabs.io/hc/en-us/articles/19631995406481 ; https://elevenlabs.io/docs/eleven-creative/troubleshooting.mdx
S19 https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-create-voice ; .../personal-voice-create-consent ; .../personal-voice-overview
S20 https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-voices
S21 https://learn.microsoft.com/en-us/azure/ai-services/speech-service/record-custom-voice-samples (fetched in full)
S22 https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice
S23 https://cloud.google.com/text-to-speech/custom-voice/docs/training-data
S24 https://github.com/bshall/knn-vc (README, LICENSE)
S25 https://github.com/OlaWod/FreeVC (README; arXiv 2210.15418)
S26 https://github.com/open-mmlab/Amphion (README news: Vevo, Vevo1.5, Vevo2, Emilia licences)
S27 https://github.com/svc-develop-team/so-vits-svc (GH metadata)
S28 https://github.com/w-okada/voice-changer (GH metadata, README)
S29 https://github.com/auspicious3000/contentvec
S30 https://github.com/facebookresearch/fairseq/tree/main/examples/hubert (README model table)
S31 https://github.com/Dream-High/RMVPE ; https://github.com/yxlllc/RMVPE (GH metadata)
S32 https://github.com/Plachtaa (repo list: StreamVoiceAnon etc.)
S33 https://github.com/yxlllc/DDSP-SVC (GH metadata)
S34 https://nicevois.com/guides/rvc-dataset-preparation (secondary)
S35 https://docs.applio.org/applio/getting-started/training (search extract)
S36 https://applio-page.fandom.com/wiki/RVC_(Retrieval-Voice-Conversion) ; https://deepwiki.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/1.2-system-requirements (secondary)
S37 https://seesaawiki.jp/rvc_ch/d/%bf%e4%be%a9PC%a5%b9%a5%da%a5%c3%a5%af (secondary, user test table)
S38 https://docs.aihub.gg/rvc/resources/dataset-isolation/ (secondary)
S39 https://www.soundonsound.com/sound-advice/q-how-much-headroom-should-leave-24-bit-recording ; https://www.soundonsound.com/sound-advice/q-how-should-i-optimise-my-gain-structure
S40 https://www.thevoicerealm.com/blog/voice-over-recording-levels/ ; https://blog.frame.io/2022/03/10/recording-voiceovers-from-home-part-3-recording/ (secondary)
S41 https://www.acx.com/mp/blog/mastering-audiobooks-with-alex-the-audio-scientist ; https://www.acx.com/mp/blog/all-about-noise-floor-with-alex-the-audio-scientist
S42 https://www.cs.cmu.edu/~awb/papers/ssw5/arctic.pdf ; http://festvox.org/cmu_arctic/cmu_arctic/cmu_us_bdl_arctic/COPYING
S43 https://www.cs.columbia.edu/~hgs/audio/harvard.html ; https://en.wikipedia.org/wiki/Harvard_sentences
S44 https://www.york.ac.uk/media/languageandlinguistics/documents/currentstudents/linguisticsresources/Standardised-reading.pdf ; https://pubs.asha.org/doi/abs/10.1044/2022_PERSP-22-00063
S45 http://www.openslr.org/resources/93/info.txt ; https://opendata.aishelltech.com/ ; https://www.selectdataset.com/dataset/e2d9682d928a0b5604bef7f8e94bbce9/biaobei (secondary) ; https://github.com/TensorSpeech/TensorFlowTTS/issues/201 (secondary)
S46 https://manual.audacityteam.org/man/noise_reduction.html ; https://www.audacityteam.org/features/noise-reduction/
S47 https://github.com/Rikorose/DeepFilterNet (README)
S48 https://github.com/resemble-ai/resemble-enhance (README)
S49 https://podcast.adobe.com/en/features ; https://helpx.adobe.com/firefly/web/work-with-audio-and-video/work-with-audio/frequently-asked-questions-about-enhance-speech.html
S50 https://www.izotope.com/products/rx-standard ; https://www.izotope.com/products/rx-advanced ; https://www.mixonline.com/technology/izotope-rx-11-advanced-a-mix-real-world-review (secondary)
S51 https://github.com/openvpi/audio-slicer (README)
S52 https://github.com/modelscope/FunASR (MODEL_LICENSE v1.1, read via gh api)
Prior note re-verified: D:\git\scratches\2026.10\AI-video-generation-techniques\docs\memory\memory-20261017-ai-video-production-research\research-notes\r4-audio.md (sections 1c, 5, 6)
