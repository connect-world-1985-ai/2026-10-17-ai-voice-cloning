# R1 - Cloud voice-cloning services (state as of 2026-10-17)

Scope: hosted (cloud/API) services that can clone the user's OWN voice for narrated teaching content in English (EN) and Mandarin Chinese (ZH), including cross-lingual use, driven by an agent through an API.

Method: web research on 2026-10-17 using WebFetch/WebSearch and `curl`. Vendor pages, docs, help centres and terms were preferred and are cited as [S#]. Anything from blogs, aggregators, LinkedIn or search-engine summaries is marked "(secondary)". Azure prices come from the official Azure Retail Prices API (`prices.azure.com`), because the Azure pricing web page renders prices as "$-". Nothing was invented; anything not found is "unverified". The prior note `r4-audio.md` (same day) was re-checked: its ElevenLabs v4 date and $0.08 / $0.04 per 1k chars are confirmed; the PlayHT shutdown was not re-checked; new this session: Resemble, LMNT and (apparently) Hume have left the hosted-TTS market, and Gemini TTS now clones voices.

## 0. Assumptions used for "price per hour of narration"

- English: 1 hour of narration ~ 9,000 words ~ 50,000-60,000 billable characters (task assumption). Cross-check: Artificial Analysis converts at 150 words/min ~ 825 chars/min = 49,500 chars/hour [S40]; Cartesia says 750-800 credits (= chars) per minute = 45,000-48,000/hour [S20]; ElevenLabs' calculator equates 1,000 chars ~ 1 minute = 60,000/hour [S2]. All "EN/h" figures below use 50k-60k.
- Mandarin: normal Mandarin speech ~ 240 characters (syllables) per minute, range 150-300; TV news ~ 300/min [S47, S48]. 240 x 60 = 14,400 chars/hour; with punctuation counted as characters, ~ 15,000 billable chars/hour. All "ZH/h" figures use 15,000. Teaching narration is often slower (fewer chars/hour), so this is an upper-middle estimate.
- Vendors that bill by UTF-8 bytes (Fish Audio): one Chinese character = 3 bytes, so 15,000 ZH chars = 45,000 bytes.
- Vendors that bill by audio duration/tokens (Gemini TTS) cost the same per hour regardless of language.
- CNY to USD: 1 USD ~ 7.1 CNY is an assumption for rough comparison only (unverified; check the day's rate).
- Some vendors may count one Chinese character as more than one billable character (MiniMax historically; unverified this session). Treat ZH/h figures for per-character vendors as "if 1 Chinese char = 1 billable char".

## 1. Summary table (one row per service)

Legend: IVC = instant clone (seconds to minutes of audio, no training); PVC = professional clone (fine-tuned on 30 min+); EN/h, ZH/h = estimated synthesis cost per hour of finished narration (pay-as-you-go/list rate, excl. tax, excl. one-off voice fees); X-ling = can a voice cloned from one language speak another.

| Service | Clone types & audio needed | Access gate | Mandarin? | X-ling EN<->ZH | List price (as of 2026-10-17) | EN/h | ZH/h | Agent/API fit |
|---|---|---|---|---|---|---|---|---|
| **ElevenLabs** (Eleven v4 / v4 Turbo, v3, Multilingual v2) | IVC: 1-2 min recommended (v4 "just 10 s" claimed); PVC: 30 min minimum, 1-3 h recommended, fine-tune 3-6 h (up to 24 h) [S3, S4, S1] | Self-serve. IVC from Starter; PVC from Creator; PVC = own voice only + voice-captcha verification [S2b, S3, S4] | Yes (`zh`, Cantonese `yue` on v4) [S5] | Yes, officially: "a voice recorded in one language also speaks any other fluently, adopting the accent of a native speaker" (v4 claim) [S1]; PVC guide warns of source-language accent [S4] | API: v4/v3/Multilingual v2 $0.08 per 1k chars; v4 Turbo/Flash $0.04 per 1k [S2] | $4.00-4.80 (v4); $2.00-2.40 (Turbo) | $1.20 (v4); $0.60 (Turbo) | Excellent: REST + official SDKs, `/with-timestamps` (character-level), pronunciation dictionaries, request stitching (`previous_text`, `previous_request_ids`), 10,000 char/request on v4 [S5, S6] |
| **Microsoft Azure Personal Voice** | 5-90 s audio prompt + recorded consent statement; creation < 5 s [S7] | Limited Access: registration + approval; use cases restricted [S7, S9] | Yes (91 languages, 100+ locales, auto language detection) [S7] | Yes (one voice speaks ~100 languages) [S7] | $24 per 1M chars; voice creation free; storage $600 per 1K profiles/month (East US, retail API) [S10] | $1.20-1.44 | $0.36 | Good SDK/REST/SSML, but approval is the blocker (see 3b) |
| **Azure Custom Neural Voice (Professional voice)** | 300-2,000 utterances (studio quality), 20-40 compute h single-style, ~90 multi-style [S11, S12] | Limited Access; "Only customers managed by Microsoft ... are eligible" [S9] | Yes; zh-CN bilingual zh/en training [S12] | "Neural - multilingual" method; "Neural - cross lingual" retired 2026-08-25 [S12] | Synthesis $24/1M (HD $48/1M; long audio $100/1M); training $52/compute h (cap 96 h); hosting $4.032/model/h [S10, S11] | $1.20-1.44 + hosting | $0.36 + hosting | Excellent SSML/lexicons, but unrealistic for an individual |
| **Google Gemini 3.8 Flash TTS - Voice replication** (Gemini API & Vertex "Gemini Enterprise Agent Platform") | 10-30 s reference + consent recording read verbatim; WAV 24 kHz mono 16-bit [S13, S14] | Self-serve in docs (Preview); no allow-list stated [S13, S14] | Yes (130 languages; consent phrase in zh-CN/cmn) [S15, S13] | Unverified explicitly; model auto-detects language, voices "can be synthesized across any supported TTS synthesis model" [S16] | $0.50/1M text tokens in + $9.00/1M audio tokens out (25 tokens/s) through 2026-12-31; doubles from 2027-01-01; Batch half price [S17] | ~$0.82 (2026), ~$1.64 (2027); batch ~$0.41 | same as EN (duration-billed) | Good: google-genai SDK, REST, Batch API; stored voices 200/project, 1-year TTL after last use; stateless keys 7 days [S13, S14]. Timestamps: unverified |
| **Google Chirp 3 Instant Custom Voice** (Cloud TTS) | Up to 10 s reference + consent (up to 10 s) [S18] | **Allow-listed** ("contact a member of the sales team") [S18] | Yes (cmn-CN) [S18] | **No EN->ZH**: only en-US keys transfer, and only to de/es/fr/pt [S18] | $60 per 1M chars [S19] | $3.00-3.60 | $0.90 | Good API (streaming + long-form), but gated |
| **MiniMax** (speech-2.8-hd / turbo) | Rapid clone: 10 s - 5 min file (mp3/m4a/wav, <= 20 MB) + optional < 8 s prompt audio [S21] | Self-serve (international platform) | Yes (vendor is Chinese; strong ZH reputation, independent ZH rank unverified) | `language_boost` param exists; cross-lingual quality unverified [S22] | 2.8-hd $100/1M chars; 2.8-turbo $60/1M; clone $1.50 per voice on first use [S20] | $5.00-6.00 (hd); $3.00-3.60 (turbo) | $1.50 (hd); $0.90 (turbo) (if 1 ZH char = 1 billable char) | Good: REST, async long-form up to 1M chars/request, **word-level subtitles/timestamps**, pronunciation_dict [S20, S22] |
| **Fish Audio** (S2.1-Pro) | Instant (inline reference) or persistent model; >= 10 s/clip, 1-2 min better; PVC "verified", web app only [S23] | Self-serve | Yes (83 languages) [S24] | Unverified | API $15 per 1M UTF-8 bytes; `s2.1-pro-free` $0 under fair use [S25] | $0.75-0.90 | ~$0.68 (45k bytes) | Good: REST + Python SDK, bracket emotion tags. TTS timestamps: unverified |
| **Cartesia** (Sonic 3.6) | IVC: 10 s minimum, up to 60 s on Sonic 3.6; PVC: 30 min+ [S26] | Self-serve. IVC from Pro ($5); PVC from Startup ($49) [S20c] | Yes (ranked in AA Mandarin cloned-voice board, secondary) | Yes via "Add Voice Accents" API: clone in own language first, then add languages; 225 credits per added accent [S26, S20c] | 1 credit = 1 char; Pro $5/100k; Startup $49/1.25M; Scale $299/8M; overage $65/$45/$38 per 1M [S20c] | ~$1.96-2.35 (Startup rate $39.2/1M) | ~$0.59 | Good API/WebSocket; timestamps: unverified this session |
| **Inworld** (Realtime TTS-2 / TTS-2 Flash) | IVC: 3-30 s (10-30 s best); PVC (beta): 10 min+, up to 50 files [S27, S28] | Self-serve; PVC "Growth and above" on marketing page vs docs table listing On-Demand 2 slots (conflict) [S27, S28] | Yes (AA Mandarin cloned-voice #1, secondary) | IVC: "cross-lingual closest match in the clip's own language"; non-English "experimental" for PVC (secondary wording from vendor page) [S27] | TTS-2 $25/1M on-demand ($12.50 Growth); Flash $15 ($7 Growth); cloning free [S29] | $1.25-1.50 | $0.38 | API + portal; details not researched further |
| **Alibaba Cloud Model Studio** (Qwen-Audio-TTS / CosyVoice) | 10-20 s recommended, 60 s max, >= 3-5 s continuous speech [S30] | Self-serve; international region supports `qwen-audio-3.0-tts-plus/flash` only; 3.1 models listed for China (Beijing) region [S31] | Yes, Mandarin + 20 dialects [S31] | Cloned voices listed for 17 languages incl. EN; X-ling quality unverified | qwen-audio-3.0-tts-plus: $0.20 per 10,000 chars (international) = $20/1M; voice creation free [S32, S31] | $1.00-1.20 | $0.30 | DashScope REST/WebSocket; voice bound to one target model; auto-deleted after 1 year unused [S30] |
| **ByteDance Volcengine Doubao voice clone 2.0** (China) | "5 s" recording (product page) [S33] | China account; real-name verification likely (unverified for Volcengine; confirmed for Tencent) | Yes | Product page advertises cross-lingual clone ("user who only speaks Chinese" -> English/Japanese) [S33] | 3 CNY per 10k chars postpaid; voice slot 138 CNY per voice (postpaid, charged on first real synthesis) [S34] | ~16.5 CNY (~$2.3) | ~4.5 CNY (~$0.63) | Chinese docs/console; not evaluated further |
| **Tencent Cloud voice clone (一句话复刻)** | "One sentence" clone | Real-name verified Tencent Cloud account required [S35b] | Yes | Unverified | Training 39 CNY/voice (20-pack); synthesis 8 CNY per 10k chars (10k pack) [S35] | n/a | ~12 CNY (~$1.7) | Chinese only; not evaluated further |
| **iFlytek 一句话复刻** | One sentence | Developer account | Yes | Unverified | Prices on console only; promo "7.7 CNY per 10k" wording is ambiguous (secondary) [S36] | unverified | unverified | Not evaluated |
| **OpenAI** (gpt-4o-mini-tts, Realtime, GPT-Live) | 10-30 s sample (<= 30 s, >= 5 s speech) + consent phrase [S37] | **Eligible/approved customers only** - contact sales [S37]; community reports 404 for normal orgs (secondary) [S38] | Consent phrase list includes `zh` [S37] | Example shows custom voice speaking French via `language` param [S37] | gpt-4o-mini-tts $0.60/1M text in + $12/1M audio out [S39] | unverified (tokens per audio minute not fetched) | unverified | Good API, but not accessible to an individual today |
| **Murf** | IVC 30 s; PVC up to 90 min, 1-4 weeks managed [S41] | **Enterprise plan only** [S41] | unverified | unverified | Falcon 2 rates; no extra clone fee [S41] | n/a | n/a | Not for individuals |
| **Speechify API** | unverified | Cloning in custom tier; "Bespoke Voice Cloning & Dubbing" $5,000/year commitment [S42] | unverified | unverified | Pay-as-you-go $10/1M chars "No Voice Cloning" [S42] | n/a | n/a | Not for individuals |
| **WellSaid** | No self-serve cloning (licensed voice actors) (secondary) [S43] | Enterprise services | - | - | - | - | - | Not applicable |
| **Resemble AI** | Hosted voice platform discontinued: "no longer offered as commercial paid products"; Chatterbox stays open source (MIT) [S44] | - | - | - | - | - | - | Use Chatterbox self-hosted (see local research note) |
| **LMNT** | "LMNT has shut down" [S45] | - | - | - | - | - | - | - |
| **Hume** | hume.ai/pricing now describes a voice-AI evaluation platform; no TTS pricing shown [S46]. Octave TTS still ranked on leaderboards. Current availability of Octave cloning: unverified | - | - | - | - | - | - | Treat as uncertain |
| **PlayHT** | Shut down 2025 per prior note (secondary there; not re-checked) | - | - | - | - | - | - | - |

## 2. Independent quality evidence (leaderboards)

### 2a. Artificial Analysis - two different arenas (read on 2026-10-17)

- **Provider Voice Arena** = each model with its OWN preset voices; does **not** measure cloning [S40, S49]. Top 5: Eleven v4 Turbo 1330, Eleven v4 1329, Qwen-Audio-3.1-TTS-Plus 1296, Cartesia Sonic 3.6 1285, Gemini 3.8 Flash TTS 1275. Others: Fish Audio Drama 3 Preview 1244 (#10), Fish S2.1 Pro 1190 (#18), MiniMax Speech 2.8 HD 1173 (#22), Azure HD 2.5 1135 (#30), Chirp 3 HD 1060 (#57) [S49].
- **Controlled Voice Arena** = every model clones the SAME 8 professionally recorded reference voices (4 US, 4 UK; 1-2 min recordings, shorter cuts for models that limit reference length) - this is the relevant board for "my cloned voice" [S40, S50]. Top: HeyGen Voice 1198, Qwen-Audio-3.1-TTS-Plus 1186, Eleven v4 Turbo 1162, Eleven v4 1159, Sonic 3.6 1149, Inworld Realtime TTS-2 1144. Further down: Gemini 3.8 Flash-Lite TTS 1058 (#15), Gemini 3.8 Flash TTS 1050 (#18), MiniMax Speech 2.8 Turbo 1021 / HD 1020 (#20/#21), Fish S2.1 Pro 1015 (#24), Eleven Multilingual v2 996 (#29), Chatterbox 930 (#39), XTTS v2 830 [S50].
- What it measures: blind pairwise preference ("which sounds more natural") with paid native-speaker panels; it is **not** a speaker-similarity score [S40]. Similarity to the original speaker is not ranked by any arena found.
- **Mandarin** cloned-voice board exists (native-speaker raters, 1 male + 1 female native reference voice) [S40]. Reported results (secondary - LinkedIn/news; the per-language table could not be fetched, date of snapshot unverified, likely before Eleven v4 was added): #1 Inworld Realtime TTS-2 1185, #2 Cartesia Sonic 3.6 1146, #3 StepFun StepAudio 2.5 TTS 1130 [S51]. Whether Eleven v4, Gemini 3.8, Qwen-Audio-3.1 or MiniMax 2.8 are on the Mandarin board: unverified.
- Vendor claim vs independent: ElevenLabs says v4 is "Ranked #1 by Artificial Analysis" [S1] - true for the Provider Voice board on 2026-10-17, but on the cloned-voice board v4 is #3-4 behind HeyGen and Qwen [S49, S50].

### 2b. TTS Arena V2 (TTS-AGI, Hugging Face)

- Live JSON `https://tts-agi-tts-arena-v2.hf.space/api/leaderboard` read 2026-10-17: #1 Inworld TTS MAX 1553, #2 CastleFlow v1.0 1556, #3 "Aurora" (stealth) 1563, #4 Papla P1 1545, #5 Inworld TTS 1537, #7 MiniMax Speech 2.8 HD 1535, #8 Hume Octave 1521, #11 MiniMax 2.8 Turbo 1519 [S52]. (Rank order is by tier, not raw Elo.) A secondary CSV snapshot (2026-10-12) shows a slightly different order with stealth entries [S53].
- Whether TTS Arena uses cloned or preset voices: not stated in the fetched data - unverified. Treat as a general naturalness signal, English-centric.

### 2c. Speaker similarity

- No vendor-independent speaker-similarity ranking of commercial cloud APIs was found. The Hugging Face "Open TTS Leaderboard" reports WavLM-embedding similarity (SIM) but covers open models (secondary) [S54].
- Vendor claims only: ElevenLabs v4 "significantly better speaker similarity" and "Instant Voice Clones can now capture voices with high fidelity using just 10 seconds" [S1]; Resemble/others similar marketing.
- Practical consequence: the user must A/B test his own voice himself (official demos listed in section 5).

## 3. Per-service notes

### 3a. ElevenLabs

- Models (docs) [S5]: `eleven_v4` (90+ languages incl. Mandarin `zh` and Cantonese `yue`, 10,000 chars/request, "high-fidelity voice cloning with reliable speaker preservation across long text generations"), `eleven_v4_turbo` (~100 ms), `eleven_v3` (70+ languages, 5,000 chars), `eleven_multilingual_v2` (29 languages incl. Chinese, 10,000 chars), `eleven_flash_v2_5` (32 languages, 40,000 chars). v4 published 2026-09-28, updated 2026-10-12 [S1]. Docs oddly say v4 "is available via the Text to Dialogue API"; the timestamps endpoint accepts any `model_id` that can do TTS - whether v4 works on `/with-timestamps`: unverified.
- Default voices warning: "All our Default voices will expire on December 31, 2026" [S3] (irrelevant for a cloned voice, relevant for fallback voices).
- IVC [S3, S3b]: record/upload, "confirm that you have the right and consent to clone the voice" checkbox; best 1-2 min, more than 3 min "can even be detrimental"; target -23 to -18 dB RMS, true peak -3 dB; MP3 >= 128 kbps (192 recommended). IVC available on Starter and above (pricing page) [S2b].
- PVC [S4]: "For now, we only allow you to clone your own voice"; voice verification by reading lines (voice-captcha), retry after 24 h if failed; minimum 30 min, ideally 2-3 h; split into ~30-min files; fine-tune 3-6 h, up to 24 h. PVC slots: Free/Starter 0, Creator/Pro 1, Scale 3, Business 10 [S4, S2b]. "Professional Voice Cloning supports all languages available in the Eleven v4 model family - 90+ languages" [S4]. API flag `use_pvc_as_ivc` exists [S6].
- Cross-lingual: v4 blog claims native accent in other languages with source identity retained and less accent drift [S1]; PVC guide (older wording) says an English-recorded clone speaking Spanish "will very likely have an English accent" and recommends recording in the main target language [S4]. Conflict = model-generation difference; test both directions.
- Pronunciation / SSML [S8]: v4 and v3 do **not** support SSML `<break>`; v4 accepts inline IPA between slashes `/ˈæpl̩/`; SSML `<phoneme>` works only on `eleven_flash_v2` (CMU Arpabet or IPA); alias tags; pronunciation dictionaries (.PLS or TXT, phoneme or alias rules), up to 3 dictionary locators per request [S6]. Mandarin pinyin/tone control: unverified.
- Audio tags (v4): inline `[laughs]`, `[excited, happy]`, `[light rain]` etc. [S1].
- Timestamps: `POST /v1/text-to-speech/{voice_id}/with-timestamps` returns `alignment` and `normalized_alignment` with per-character start/end seconds; word timing must be derived [S6]. Also `seed`, `previous_text`/`next_text`, `previous_request_ids`/`next_request_ids` (max 3) for long-form continuity; `enable_logging=false` (zero retention) enterprise-only; data-residency endpoints (US, EU, India, Singapore) [S6].
- Plans (pricing page, monthly) [S2b]: Free $0 / 10k credits; Starter $6 (promo $1 first month "until Oct 18") / 30k; Creator $22 ($11 first month) / 121k; Pro $99 / 600k; Scale $299 / 1.8M; Business $990 / 6M; Enterprise custom. TTS 1 credit per character (v2 Multilingual stated; v4 credit rate not stated on this page). Annual = 10x monthly. Rollover up to 2 months on paid plans. 44.1 kHz PCM/WAV via API needs Pro+; 192 kbps MP3 needs Creator+ [S6].
- Conflict: API pricing page says the $22 Creator subscription includes "275k characters of TTS (v4)", while the main pricing page says Creator = 121k credits [S2, S2b]. Likely separate "ElevenAPI" vs "ElevenCreative" plan views; unresolved.
- Commercial use / attribution (help centre, primary) [S9e]: "The free plan does not include a commercial license ... If you publish content generated ... on a free plan ... you must attribute it to ElevenLabs by including 'elevenlabs.io' or '11.ai' in the title." Paid plans: commercial licence "provided you're not using Beta Services"; content made during a paid subscription stays commercially usable after cancelling.
- ToS (non-EEA, "Last Updated: 09 October 2026") [S9t]: "as between you and ElevenLabs, you retain all rights in and to your Output" (s. 4(a)(ii) area); user voice models: "You may request deletion of your User Voice Models"; licence to ElevenLabs covers using "your voice ... to provide and improve the Services, and to develop new services and products. ... we will not commercialize your voice on a standalone basis without your permission"; training opt-out via account "Data use" menu, not retroactive.
- Watermark: help centre says "All audio generated by our models can be instantly traced back to the user responsible" [S3b]; specific watermark/C2PA technology: unverified.

### 3b. Microsoft Azure AI Speech

- **Personal Voice** [S7]: 5-90 s sample, training < 5 s, "about 100 languages", 91 languages / 100+ locales, sentence-level automatic language detection (no locale tag needed). Returns `speakerProfileId`. Consent: recorded verbal statement acknowledging that "the customer (Azure Speech ... resource owner) will create and use their voice"; template "I [name] am aware that recordings of my voice will be used by [company] to create and use a synthetic version of my voice" (language must match the training data) [S7b].
- **Use-case restriction (the blocker)** [S9b]: personal voice allowed only for (1) applications where "voice output is constrained ... does not read user-generated or open-ended content ... output must not be publishable or shareable from the application"; (2) media/film/TV dubbing for entertainment; (3) "Business content ... product information, marketing materials, business promotional content, and internal business communications"; (4) video translation. "All other uses ... are prohibited." Educational narration published on YouTube is not an explicitly listed use case - eligibility would depend on Microsoft's approval (unverified).
- Microsoft blog (primary-ish, 2024): "Watermarks are added to speech output created with the personal voice feature"; content-creation use "restricted and available only to customers who meet Limited Access eligibility criteria" [S9c].
- **Professional voice (Custom Neural Voice)** [S9, S11, S12]: Limited Access; "Only customers managed by Microsoft, meaning those who are working directly with Microsoft account teams, are eligible". Microsoft "reserves the right to use ... speaker recognition ... on this recorded acknowledgement statement" and "will also continue to retain this recorded acknowledgement statement file and the custom voice model". Training methods: Neural, Neural-HD, Neural-multilingual (e.g. en-US data -> speaks zh-CN etc.), Neural-multi style (>= 300 utterances + 100 per custom style); "Neural - cross lingual retires on August 25, 2026" (existing models unaffected); older recipe versions V3.0/V7.0/V8.0 retired 2025-07-25. zh-CN/zh-HK/zh-TW support bilingual Chinese+English training. CNV Lite (20-50 utterances) is demo/evaluation only.
- **Prices** (Azure Retail Prices API, US East, read 2026-10-17) [S10]: Personal Voice characters $24.00 per 1M (effective 2024-02-01); Personal Voice storage $600 per 1K (profiles/month); "S1 Custom Neural Realtime Characters" $24 per 1M; "CNV Neural HD Synthesis Characters" $48 per 1M; "S1 Custom Neural Long Audio Characters" $100 per 1M; "S1 Custom Neural Training" $52 per hour; "S1 Custom Neural Voice Model Hosting Unit" $4.032 per hour; prebuilt Neural $15/1M, Neural HD $22/1M. Training cap 96 compute hours (= $4,992 max) [S11]. 24x7 hosting ~ $2,943/month at 730 h (computed); "Fast resume" endpoints can be suspended to stop hosting charges [S11b].
- SSML and lexicons: supported for custom voices (pitch, rate, pronunciation, style switching) [S11c]. Personal voice SSML specifics: unverified this session.
- Output ownership: governed by Microsoft Product Terms / Azure agreements - not fetched (unverified).

### 3c. Google

- **Gemini 3.8 Flash TTS / Flash-Lite TTS voice replication** (docs "Last updated 2026-09-24") [S13, S14, S16]: `POST /v1beta/voices` with `type: replicated`, `source_audio` 10-30 s + `consent_audio` reading the language's statement word for word; "two real human audio recordings from the same adult speaker"; Google verifies consent by matching the consent transcript and fails with `INVALID_ARGUMENT` otherwise. Storage: `store=true` -> `voice_...` id, 200 voices/project (shared with designed voices), retained 1 year after last use; `store=false` -> encrypted `voicekey_...` kept by the client, valid 7 days. Also available as interactive "Voice Replication" in Google AI Studio. Vertex variant is a "Generative AI Preview offering" under Pre-GA terms, which explicitly allow production/commercial use [S14].
- Consent phrase conflict: Gemini API doc gives "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model." (30 locales) [S13]; Vertex doc gives "I am the owner of this voice and have consented to the creation of a synthetic model of my voice through the use of Google Cloud." (70+ languages) [S14]. Use the one for the endpoint you call.
- Model facts [S15]: 130 languages incl. Chinese (Hans and Hant) and Cantonese; input 8,192 tokens / output 16,384 tokens per request (~11 min of audio at 25 tokens/s - computed); Batch API supported; inline vocal events, `speech_metadata.style` for delivery; default WAV output.
- Prices (Gemini API, Standard tier) [S17]: Flash TTS $0.50/1M text in, $9.00/1M audio out "through December 31, 2026", $1.00 / $18.00 "starting January 1, 2027"; Batch/Flex $0.25 / $4.50 (2026); Flash-Lite $0.50 / $6.00. **Free tier exists and "Used to improve our products: Yes"** for free tier, "No" for paid - do not clone your voice on the free tier if that matters. Cloud TTS page lists the same Gemini 3.8 prices [S19].
- **Chirp 3 Instant Custom Voice** [S18, S19]: "Access ... is restricted to allow-listed users"; up to 10 s reference + consent; key is a client-side "voice cloning key" string (no server limit on number); pace 0.25-2x, experimental pause tags and IPA/X-SAMPA pronunciation; language transfer only from en-US to de-DE, es-US, es-ES, fr-CA, fr-FR, pt-BR (**no Chinese transfer**); price $60/1M chars.
- Gemini TTS timestamps/word alignment: unverified (not found).

### 3d. MiniMax (international platform `platform.minimax.io`)

- Prices [S20]: T2A sync/async speech-2.8-hd $100/1M chars, speech-2.8-turbo $60/1M; legacy 2.6/02 same; Rapid Voice Cloning $1.50 per voice "charged when the cloned voice is first used for synthesis"; Voice Design $3/voice. Audio subscriptions $5-$999/month with "audio points" (point-to-character rate not stated - unverified).
- Clone workflow [S21]: upload file (`purpose=voice_clone`, 10 s - 5 min, <= 20 MB), optional prompt audio < 8 s with its text, then `POST /v1/voice_clone` with your own `voice_id`; no consent recording step documented (account-level ToS only - unverified).
- T2A API [S22]: `language_boost`, `pronunciation_dict`, `subtitle_enable` with `subtitle_type` = `sentence` / `word` / `word_streaming` (word-level timestamps), billable count returned as `usage_characters`; async endpoint up to 1M chars per request [S20].
- Also resold inside Alibaba Model Studio (China region) where "The first speech synthesis request using the cloned voice incurs a CNY 9.9 voice unlocking fee" [S31].
- Independent quality: TTS Arena V2 #7 (2.8 HD) [S52]; AA cloned-voice board #20-21 [S50]. Mandarin-specific independent rank: unverified.
- Terms/ownership/training on voice data: not fetched (unverified).

### 3e. Fish Audio

- API [S24, S25]: `s2.1-pro` (recommended, 83 languages, `[bracket]` natural-language emotion tags, multi-speaker), `s2.1-pro-free` ($0, "fair-use limits", "No TTFA or DPA guarantees", "for testing, prototyping, development, and smaller businesses"), `s2-pro` (open-source), `s1` retiring 2026-12-31. Price $15 per 1M UTF-8 bytes; "1M UTF-8 bytes is approximately 180,000 English words, or about 12 hours of speech".
- Cloning [S23]: persistent model via `POST /model` (`train_mode=fast`, usually `trained` immediately) or instant inline `references` with transcripts; >= 10 s per clip; `enhance_audio_quality` on by default; models private by default. PVC is "Verified, studio-quality ... Web app only".
- App plans [S23b]: Free 8,000 credits; Plus $15 ($11 annual) 250k credits, 1 PVC slot; Pro $100 ($75 annual) 2M credits, 5 PVC; Max $999. ~600-625 credits per minute.
- Terms (effective 2024-08-18) [S23t]: non-paid users "only use the Services for your own internal, personal, non-commercial use"; paid users "licensed to use the Services for commercial uses"; "Usage Data and Content may be used to develop, train, or enhance artificial intelligence or machine learning models". Conflict: plan page lists "Commercial use" on the Free tier [S23b]. Enterprise offers "Zero Data Retention".

### 3f. Cartesia

- Pricing [S20c]: Free 20k credits; Pro $5 (100k, commercial licence, IVC); Startup $49 (1.25M, PVC, 2 PVC slots); Scale $299 (8M, 4 PVC slots); "Training a Professional Voice Clone is free. Speech generated with a PVC costs 1 credit per character"; localizing a voice 225 credits per added accent; overage $65 / $45 / $38 per 1M.
- Cloning [S26]: 10 s minimum, up to 60 s on Sonic 3.6+; "Each clone is built from one language. To make the clone speak other languages natively, clone it in its own language first, then add languages with the Add Voice Accents API"; PVC 30 min+.
- Terms [S26t]: "Cartesia does not claim ownership of any of your Inputs ... or any of the Outputs"; "unless otherwise agreed ... Inputs, Outputs, and user interactions ... may be used by Cartesia to train ... Models" with a perpetual licence; training opt-out via online form (not retroactive).

### 3g. OpenAI

- Custom voices exist in the API (`/v1/audio/voice_consents`, `/v1/audio/voices`), usable with gpt-4o-mini-tts, Realtime, Chat Completions audio and GPT-Live [S37]. "Custom voices created from recordings are limited to eligible customers. Contact our sales team"; max 20 recording-based voices per org; sample <= 30 s; consent phrase must match exactly (includes `zh`: "我是此声音的拥有者并授权OpenAI使用此声音创建语音合成模型"); not compatible with Zero Data Retention. Prompt-designed voices are generally available but GPT-Live only (not the TTS API).
- Community (secondary): normal orgs get HTTP 404 "Your organization does not have access to this endpoint"; staff say the enterprise-only wording was removed but access still via sales [S38].
- Price: gpt-4o-mini-tts $0.60/1M text in, $12/1M audio out; tts-1 $15/1M chars; tts-1-hd $30/1M chars [S39].
- Ownership: Services Agreement (updated 2025-12-01, effective 2026-01-01) s. 4.1 "Customer: (a) retains all ownership rights in Input; and (b) owns all Output" [S39b]. Custom voices also governed by a "Text-to-Speech Supplemental Agreement" (not fetched).

### 3h. Others in brief

- Inworld [S27-S29]: strongest independent Mandarin cloned-voice signal (secondary); cheap; cloning free; IVC 3-30 s; PVC beta 10 min+. Docs vs marketing conflict on PVC plan eligibility. ToS/data use: unverified.
- Alibaba Model Studio [S30-S32]: voice creation free; synthesis at model rate; 1,000 custom voices per account; voice bound to its `target_model`; auto-deleted if unused for 1 year. The leaderboard model "Qwen-Audio-3.1-TTS-Plus" is not in the international clone-model list (only 3.0-plus/flash there; China region lists 3.1-tts-flash) - check region before relying on the #2 ranking. Consent step: none documented in fetched pages (unverified).
- Volcengine Doubao voice clone 2.0 [S33, S34]: 20,000 free chars (6 months); 3 CNY/10k chars postpaid, prepaid 2.8-2.1 CNY/10k; voice slot 138 CNY (postpaid, charged at first formal synthesis; "after synthesis the voice is fixed and cannot be re-cloned"); premium studio clones 30,000 / 80,000 CNY per voice. Cross-lingual advertised.
- Tencent Cloud [S35]: one-sentence clone training 39 CNY/voice (20-pack), synthesis 8 CNY/10k chars; real-name verification required.
- HeyGen Voice tops the AA cloned-voice board (1198, Oct 2026) [S50]; HeyGen's own API/pricing/consent for voice cloning not researched (unverified).
- StepFun StepAudio 2.5 TTS: AA Mandarin #3 (secondary); $85/1M per AA [S49]; not researched.

## 4. Consent, ownership, data use - quick comparison

| Service | Consent / identity check | Output ownership / commercial | Training on your voice/content |
|---|---|---|---|
| ElevenLabs | IVC: rights/consent checkbox; PVC: voice-captcha verification, own voice only [S3, S4] | You retain rights in Output; commercial only on paid plans; free = attribution, non-commercial [S9t, S9e] | Licence to improve services/develop products; opt-out in settings; no standalone commercialisation of your voice without permission [S9t] |
| Azure PV/CNV | Recorded consent statement; speaker-recognition match; Limited Access approval [S7b, S9] | Unverified (Microsoft Product Terms) | Microsoft retains consent recording and model for security [S9] |
| Google Gemini / Chirp | Consent recording matched to fixed statement; adult speaker [S13, S14, S18] | Pre-GA terms allow commercial use (Vertex) [S14]; Gemini API terms not fetched | Gemini API free tier: used to improve products; paid: no [S17] |
| MiniMax | No consent recording documented [S21] | Unverified | Unverified |
| Fish Audio | PVC "verified" (method unverified) [S23] | Paid = commercial; free = non-commercial per ToS (conflicts with plan page) [S23t, S23b] | ToS allows training on Content [S23t] |
| Cartesia | Unverified | Cartesia claims no ownership of Inputs/Outputs [S26t] | Trains on Inputs/Outputs unless opted out [S26t] |
| OpenAI | Exact consent phrase recording, same speaker [S37] | Customer owns Output [S39b] | API defaults: unverified this session |
| Alibaba / Volcengine / Tencent | Not documented in fetched pages; Tencent requires real-name account [S35b] | Unverified | Unverified |

Watermarking: Azure personal voice output is watermarked [S9c]; Resemble's PerTh watermark ships in open-source Chatterbox [S44b, secondary]; ElevenLabs says all audio is traceable to the generating user [S3b]; Google SynthID on Gemini TTS: unverified; others: unverified.

## 5. Official demo / sample pages (to listen before choosing)

- ElevenLabs v4 launch post with a real-voice vs v4-clone pair and Catalan/Spanish samples: https://elevenlabs.io/blog/eleven-v4 [S1]
- Azure Personal Voice demo: Foundry (classic) or Speech Studio -> "Personal Voice" card (requires registration) [S7]
- Google AI Studio interactive "Voice Replication" (record your own clip, audition): referenced in [S13]
- Artificial Analysis arena (vote and hear cloned-voice samples) https://artificialanalysis.ai/text-to-speech/arena and reference recordings on the methodology page [S40] (independent, not vendor)
- MiniMax voice clone guide shows "Cloned Audio / Example Audio / Resulting Audio" players: https://platform.minimax.io/docs/guides/speech-voice-clone [S21]
- Inworld cloning page: https://inworld.ai/voice-cloning [S27]
- Fish Audio web app (free tier) https://fish.audio and Cartesia dashboard (free tier): sign-up needed; direct sample URLs not verified.

## Key findings (top 10)

1. **ElevenLabs is the most complete self-serve option for this user**: own-voice PVC (Creator $22/month, 1 slot, 30 min-3 h of audio, voice-captcha) or IVC (Starter, 1-2 min), Mandarin + English on Eleven v4, official cross-lingual claim, character timestamps, pronunciation dictionaries, commercial licence on any paid plan. API cost ~ $4-4.80 per EN hour (v4) or ~ $2-2.40 (v4 Turbo); ~ $1.20 / $0.60 per ZH hour [S1-S6, S9e].
2. **Gemini 3.8 Flash TTS now clones voices** (10-30 s + consent recording, self-serve Preview) at ~ $0.82 per hour of audio until 2026-12-31 (price doubles 2027-01-01; batch half) - by far the cheapest major-vendor option, any language. But on the cloned-voice arena it ranks #18 (1050) vs Eleven v4 #4 (1159) [S13-S17, S50].
3. **Independent cloned-voice quality (AA Controlled Voice Arena, English, 2026-10-17)**: HeyGen 1198, Qwen-Audio-3.1-TTS-Plus 1186, Eleven v4 Turbo 1162, Eleven v4 1159, Sonic 3.6 1149, Inworld TTS-2 1144 [S50]. The more-cited "Eleven v4 #1" is the preset-voice board [S49].
4. **Mandarin cloned-voice ranking** (secondary, snapshot date unverified): Inworld Realtime TTS-2 #1, Cartesia Sonic 3.6 #2, StepAudio 2.5 #3 [S51]. No primary per-language table could be fetched. The user should test ZH himself.
5. **Azure Personal Voice is technically ideal (5-90 s, ~100 languages, $24/1M) but gated**: Limited Access approval, and allowed use cases exclude open "publishable" app output; "business content" and media use cases exist. Custom Neural Voice requires being a Microsoft-managed customer; "Neural - cross lingual" retired 2026-08-25 [S7, S9, S9b, S10, S12].
6. **Google Chirp 3 Instant Custom Voice is allow-listed and cannot transfer an English clone to Chinese** (en-US -> de/es/fr/pt only); $60/1M chars [S18, S19].
7. **OpenAI custom voices exist but only for approved customers via sales**; not usable by an individual today [S37, S38].
8. **Market exits**: Resemble ended its paid hosted voice platform (Chatterbox remains MIT open source), LMNT shut down, Hume's site now sells evaluation infrastructure; Murf cloning is Enterprise-only; WellSaid has no self-serve cloning [S41-S46].
9. **Cheapest per hour with self-serve cloning** (list rates): Gemini 3.8 Flash TTS ~ $0.82/h, Fish Audio S2.1-Pro ~ $0.75-0.90 EN / ~ $0.68 ZH per h, Alibaba Qwen-Audio-3.0-TTS-Plus ~ $1.00-1.20 EN / $0.30 ZH, Inworld TTS-2 ~ $1.25-1.50 EN / $0.38 ZH; MiniMax 2.8 HD is the most expensive per char ($100/1M) but offers word-level subtitles [S17, S20, S25, S29, S32].
10. **Data-use defaults differ**: Cartesia and Fish Audio terms allow training on your inputs/outputs (Cartesia opt-out form); ElevenLabs licence covers improving services (opt-out); Gemini free tier is used to improve products, paid tier is not [S9t, S17, S23t, S26t].

## Conflicts & uncertainties

- ElevenLabs Creator plan: 121k credits (pricing page) vs "275k characters of TTS (v4) included" (API pricing page calculator) [S2b vs S2]. v4 credit-per-character rate on subscription plans not stated.
- ElevenLabs IVC audio: "1-2 minutes" (IVC guide) vs "just 10 seconds" (v4 blog) [S3 vs S1]. ElevenLabs cross-lingual: v4 blog says native accent; PVC guide says source accent likely [S1 vs S4].
- ElevenLabs v4 and `/with-timestamps`: docs say v4 is available via Text to Dialogue API; compatibility with the timestamps endpoint unverified [S5, S6].
- Google consent statement wording differs between Gemini API and Vertex docs [S13 vs S14]. Gemini voice-replication pricing (any per-voice fee) not shown - assumed none (unverified).
- Fish Audio: free plan "Commercial use" (plan page) vs ToS "non-commercial" for non-paid users [S23b vs S23t].
- Inworld PVC eligibility: "Growth and above" (marketing) vs On-Demand 2 slots (docs) [S27 vs S28].
- Alibaba: the AA #2 model (Qwen-Audio-3.1-TTS-Plus, $19.3/1M per AA) is not in the international clone list; international price for 3.0-plus is $20/1M [S31, S32, S50].
- Mandarin AA board: only secondary sources; snapshot date unknown; probably predates Eleven v4 (2026-09-28) [S51].
- MiniMax and others: how Chinese characters are counted for billing (1 or 2 billable chars each) is unverified; ZH/h figures assume 1:1.
- Azure: whether "Personal Voice storage $600 per 1K" is per month (pricing-page text) or per voice-day (docs text "per voice per day") is ambiguous [S10, S11].
- Azure eligibility of an individual educator for Personal Voice: unverified (likely requires a business/organisation).
- TTS Arena V2: whether it uses cloned or preset voices is unverified.
- Hume Octave current availability and pricing: unverified. PlayHT shutdown not re-checked.
- Gemini TTS timestamps, Cartesia timestamps, Fish TTS timestamps: unverified. Watermarks for ElevenLabs/Google/MiniMax: unverified.
- Not fetched: Microsoft Product Terms output clause; MiniMax, Inworld, Alibaba, Volcengine ToS; OpenAI TTS Supplemental Agreement; Gemini API additional terms.
- Exchange rate 1 USD ~ 7.1 CNY is an assumption.

## Sources (all accessed 2026-10-17)

1. [S1] ElevenLabs, "Introducing Eleven v4" (published 2026-09-28, updated 2026-10-12): https://elevenlabs.io/blog/eleven-v4
2. [S2] ElevenLabs API pricing: https://elevenlabs.io/pricing/api
3. [S2b] ElevenLabs plan pricing: https://elevenlabs.io/pricing
4. [S3] ElevenLabs docs, Voices overview: https://elevenlabs.io/docs/capabilities/voices
5. [S3b] ElevenLabs docs, Instant Voice Cloning (with FAQ): https://elevenlabs.io/docs/product-guides/voices/voice-cloning/instant-voice-cloning
6. [S4] ElevenLabs docs, Professional Voice Cloning (with FAQ): https://elevenlabs.io/docs/product-guides/voices/voice-cloning/professional-voice-cloning
7. [S5] ElevenLabs docs, Models: https://elevenlabs.io/docs/models
8. [S6] ElevenLabs API reference, Create speech with timing: https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps
9. [S8] ElevenLabs docs, Prompting controls (SSML, IPA, pronunciation dictionaries): https://elevenlabs.io/docs/best-practices/prompting/controls
10. [S9e] ElevenLabs help centre, "Can I publish the content I generate on the platform?": https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform
11. [S9t] ElevenLabs Terms of Service (non-EEA), Last Updated 09 October 2026: https://elevenlabs.io/terms-of-use
12. [S7] Microsoft Learn, What is personal voice?: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-overview
13. [S7b] Microsoft Learn, Add user consent for personal voice: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-create-consent
14. [S9] Microsoft Learn, Limited Access (custom neural voice, personal voice): https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/limited-access
15. [S9b] Microsoft Learn, Text to speech transparency note (intended uses for personal voice): https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/transparency-note
16. [S9c] Microsoft Tech Community blog, "Create personalized voices with Azure AI Speech" (2024): https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/create-personalized-voices-with-azure-ai-speech/4147073
17. [S10] Azure Retail Prices API (Foundry Tools / Azure Speech meters, US East and Global): https://prices.azure.com/api/retail/prices?$filter=contains(productName,'Speech') and armRegionName eq 'eastus' ; pricing page (renders "$-"): https://azure.microsoft.com/en-us/pricing/details/speech/
18. [S11] Microsoft Learn, Text to speech overview (custom voice billing, compute hours, 96 h cap): https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech
19. [S11b] Microsoft Learn, Deploy professional voice endpoint: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/professional-voice-deploy-endpoint
20. [S11c] Microsoft Learn, Custom voice overview: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/custom-neural-voice
21. [S12] Microsoft Learn, Train your professional voice model (retirements, multilingual, bilingual): https://learn.microsoft.com/en-us/azure/ai-services/speech-service/professional-voice-train-voice?tabs=neural ; CNV lite/pro comparison (secondary summary of https://ai.azure.com/explore/aiservices/speech/customneuralvoice)
22. [S13] Google AI for Developers, Voice replication (last updated 2026-09-24): https://ai.google.dev/gemini-api/docs/voice-replication
23. [S14] Google Cloud, Replicate voices (Gemini Enterprise Agent Platform, Preview): https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/text-to-speech/voice-replication
24. [S15] Google AI for Developers, Gemini 3.8 Flash TTS model page: https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts
25. [S16] Google AI for Developers, Gemini Voices API reference: https://ai.google.dev/api/voices (search-result content)
26. [S17] Google AI for Developers, Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing
27. [S18] Google Cloud, Chirp 3: Instant Custom Voice: https://cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice
28. [S19] Google Cloud, Text-to-Speech pricing: https://cloud.google.com/text-to-speech/pricing
29. [S20] MiniMax, Pricing overview: https://platform.minimax.io/docs/guides/pricing
30. [S21] MiniMax, Voice Clone guide: https://platform.minimax.io/docs/guides/speech-voice-clone
31. [S22] MiniMax, T2A HTTP API reference: https://platform.minimax.io/docs/api-reference/speech-t2a-http
32. [S20c] Cartesia, Pricing: https://cartesia.ai/pricing
33. [S26] Cartesia docs, Instant Voice Clone: https://docs.cartesia.ai/build-with-cartesia/capability-guides/clone-voices
34. [S26t] Cartesia Terms of Service: https://cartesia.ai/legal/terms
35. [S23] Fish Audio docs, Voice Cloning: https://docs.fish.audio/features/voice-cloning
36. [S23b] Fish Audio plans: https://fish.audio/plan/
37. [S23t] Fish Audio Terms (effective 2024-08-18): https://fish.audio/terms/
38. [S24] Fish Audio docs, Models Overview: https://docs.fish.audio/developer-guide/models-pricing/models-overview
39. [S25] Fish Audio docs, Pricing & Rate Limits: https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits (search-result content)
40. [S27] Inworld, Voice cloning page: https://inworld.ai/voice-cloning (search-result content)
41. [S28] Inworld docs, Professional voice cloning: https://docs.inworld.ai/tts/professional-voice-cloning (search-result content)
42. [S29] Inworld, Pricing: https://inworld.ai/pricing (search-result content)
43. [S30] QwenCloud docs, Voice cloning (audio requirements): https://docs.qwencloud.com/developer-guides/speech/voice-cloning
44. [S31] Alibaba Cloud Model Studio, Voice cloning user guide: https://www.alibabacloud.com/help/en/model-studio/voice-cloning-user-guide ; https://help.aliyun.com/en/model-studio/tts-model (search-result content)
45. [S32] Alibaba Cloud, qwen-audio-3.0-tts-plus model info/pricing: https://www.alibabacloud.com/help/en/model-studio/qwen-audio-3-0-tts-plus (search-result content)
46. [S33] Volcengine, 声音复刻 product page: https://www.volcengine.com/product/voicecloning (search-result content)
47. [S34] Volcengine docs, Doubao voice billing: https://docs.volcengine.com/docs/DoubaoVoice/Billinginstructions-21?lang=zh and https://docs.volcengine.com/docs/DoubaoVoice/BillingOverview-15?lang=zh
48. [S35] Tencent Cloud, 声音复刻 计费概述: https://cloud.tencent.com/document/product/1283/93105 ; [S35b] 操作指引 (real-name verification, updated 2026-08-17): https://cloud.tencent.com/document/product/1283/96201
49. [S36] iFlytek, 一句话复刻 API doc and promo page: https://www.xfyun.cn/doc/spark/voiceclone.html ; https://www.xfyun.cn/activity_618 (secondary for price)
50. [S37] OpenAI, Custom voices guide: https://developers.openai.com/api/docs/guides/custom-voices
51. [S38] OpenAI Developer Community threads (secondary): https://community.openai.com/t/custom-voices-in-the-api-not-available/1377611 ; https://community.openai.com/t/unable-to-send-consent-for-custom-voice/1370287
52. [S39] OpenAI API pricing: https://developers.openai.com/api/docs/pricing
53. [S39b] OpenAI Services Agreement (updated 2025-12-01, effective 2026-01-01): https://openai.com/policies/services-agreement/
54. [S40] Artificial Analysis, TTS benchmarking methodology: https://artificialanalysis.ai/methodology/text-to-speech
55. [S41] Murf API docs, Instant Voice Cloning: https://murf.ai/api/docs/voices-styles/instant-voice-cloning (search-result content)
56. [S42] Speechify API pricing: https://speechify.com/pricing-api/ (search-result content)
57. [S43] Rework, "Best AI Voice Generators in 2026" (secondary): https://resources.rework.com/tools/ai-tools/best-ai-voice-generators-2026
58. [S44] Resemble AI docs, Voice AI Research Archive: https://docs.resemble.ai/voice-archive.md ; [S44b] https://www.resemble.ai/start/start-here (search-result content)
59. [S45] LMNT pricing page ("LMNT has shut down"): https://lmnt.com/pricing
60. [S46] Hume AI pricing page (now evaluation platform): https://www.hume.ai/pricing
61. [S47] 科普中国 / LingLab, 普通话语速约每分钟240字, 新闻播音约300字: https://www.kepuchina.cn/kpcs/ydt/kxyl6/201704/t20170407_181166.shtml ; https://www.linglab.cn/news/3361 (secondary)
62. [S48] 北京普通话学会, PSC syllabus quote "正常語速大約為每分鐘240個音節, 150-300": https://beijingputonghua.com/psc/ldzp/ldzp.htm (secondary)
63. [S49] Artificial Analysis, Provider Voice Arena leaderboard: https://artificialanalysis.ai/text-to-speech/leaderboard
64. [S50] Artificial Analysis, Controlled Voice (cloned) Arena leaderboard: https://artificialanalysis.ai/text-to-speech/leaderboard/controlled-voice
65. [S51] Artificial Analysis LinkedIn post on multilingual leaderboards (secondary): https://www.linkedin.com/posts/artificial-analysis_announcing-multilingual-text-to-speech-arena-activity-7508256405640888320-k7Kn ; The AI Post (secondary): https://theaipost.net/story/aa-multilingual-tts-arena/
66. [S52] TTS Arena V2 live leaderboard JSON: https://tts-agi-tts-arena-v2.hf.space/api/leaderboard (Space: https://huggingface.co/spaces/TTS-AGI/TTS-Arena-V2)
67. [S53] The Known Good TTS Arena CSV snapshot 2026-10-12 (secondary): https://theknowngood.com/data/charts/arena-speech.csv
68. [S54] Hugging Face blog, Open TTS Leaderboard (secondary): https://huggingface.co/blog/open-tts-leaderboard
