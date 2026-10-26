# R2 - Open-source / local voice-cloning TTS (fact sheet, 2026-10-17)

Scope: models a Windows 11 user can run locally to narrate teaching content in his own cloned voice, English (EN) + Mandarin (ZH), including cross-lingual cloning (voice prompt in one language, speech in the other). Licence of CODE and of WEIGHTS stated separately.

## 0. Method and legend

- GitHub numbers (stars / forks / `pushed_at` / archived / licence / latest release) were read with `gh api` on **2026-10-17** (about 22:30 UTC+8). "no release" = `releases/latest` returned 404 (repo uses no GitHub releases).
- Hugging Face (huggingface.co) was **unreachable** from this machine (connection fails immediately). Model-card licence tags, downloads, likes and `lastModified` were read through the public mirror **hf-mirror.com** API on 2026-10-17 (same JSON as the HF API). Downloads = HF "downloads" field (rolling ~30 days). Treat as "mirror-read".
- LICENSE texts actually read (raw text): fish-speech (repo), Fish Audio Research License (`fishaudio/s2-pro`), bilibili Model Use License (index-tts), LLaSA_training (CC BY-NC 4.0), Boson Higgs Audio 2 Community License, Boson Higgs TTS 3 Research and Non-Commercial License, Coqui Public Model License (XTTS-v2). Other licences come from the GitHub licence field, README "License" sections, or HF licence tags.
- Benchmarks are **self-reported** by model authors unless labelled otherwise. Tables compiled by one vendor about other vendors are labelled "(compiled by X)".
- "(secondary)" = third-party page / search-result summary; "(unverified)" = not confirmed this session; "(knowledge)" = from background knowledge, not re-checked.
- Terms: **zero-shot** = clone from a short reference clip, no training; **fine-tune** = train on your recordings; **cross-lingual** = reference in language A, output in language B; **RTF** = compute time / audio duration (lower = faster; <1 = faster than real time); **SIM / SS** = speaker similarity (cosine, higher = closer to reference voice); **WER/CER** = word/character error rate (lower = more intelligible).

## 1. Benchmark definition: Seed-TTS-eval

Source: `BytedanceSpeech/seed-tts-eval` README (read 2026-10-17; repo 1,606 stars, last push 2024-06-14, no licence file) [S1]; paper Seed-TTS arXiv 2406.02430.

- **test-en**: 1,000 samples from Common Voice. **test-zh**: 2,000 samples from DiDiSpeech-2. **test-hard** (`zh/hardcase.lst`): hard Mandarin cases (tongue twisters / repetitions; content description from knowledge).
- **WER**: ASR with **Whisper-large-v3** (EN) and **Paraformer-zh** (ZH; reported as CER).
- **SIM**: cosine similarity of speaker embeddings from **WavLM-large fine-tuned on speaker verification**, generated utterance vs reference clip.
- Caveat: numbers in different READMEs use different checkpoints/settings; small differences (<0.3 WER) are within noise. Seed-TTS-eval has only EN and ZH. **CV3-Eval** (from the CosyVoice 3 team) is the common multilingual / cross-lingual add-on.

## 2. Master table (one row per model family)

Commercial-output column: **Yes** = licence of both code and weights permits commercial use; **Cond.** = allowed under conditions (quoted in section 3); **No** = non-commercial weights (or explicit output restriction). Not legal advice.

| Model (current repo) | Stars / forks | Last push | Latest release | Code licence | Weights licence (HF tag, mirror-read) | Commercial output | EN | ZH | Cross-lingual clone |
|---|---|---|---|---|---|---|---|---|---|
| VoxCPM / VoxCPM2 (`OpenBMB/VoxCPM`) | 39,459 / 4,474 | 2026-10-08 | 2.0.3 (2026-05-11) | Apache-2.0 | Apache-2.0 (`openbmb/VoxCPM2`) | **Yes** | Yes | Yes (+9 dialects) | Yes (30 langs, no tag needed) |
| Qwen3-TTS (`QwenLM/Qwen3-TTS`) | 13,829 / 1,795 | 2026-03-17 | no release | Apache-2.0 | Apache-2.0 (`Qwen/Qwen3-TTS-12Hz-1.7B-Base`) | **Yes** | Yes | Yes | Yes (10 langs; cross-lingual benchmark in README) |
| Fun-CosyVoice 3 (`QwenAudio/CosyVoice`, redirected from `FunAudioLLM/CosyVoice`) | 24,018 / 2,745 | 2026-05-25 | no release | Apache-2.0 | Apache-2.0 (`FunAudioLLM/Fun-CosyVoice3-0.5B-2512`) | **Yes** | Yes | Yes (+18 dialects) | Yes (explicit `cross_lingual` mode) |
| Chatterbox (+Turbo, Nano, Multilingual V3) (`resemble-ai/chatterbox`) | 27,023 / 3,627 | 2026-07-21 | v0.1.2 (2025-06-13) | MIT | MIT (chatterbox, -turbo, -nano, Multilingual-zh-cmn) | **Yes** (output watermarked) | Yes | Multilingual V3 + zh-cmn pack only | Yes (accent can leak; see 3) |
| GPT-SoVITS (`RVC-Boss/GPT-SoVITS`) | 62,996 / 6,706 | 2026-10-08 | 20250606v2pro (2025-06-06) | MIT | MIT (`lj1995/GPT-SoVITS`) | **Yes** | Yes | Yes | Yes (EN/JA/KO/Cantonese/ZH) |
| IndexTTS2 / 2.5 (`index-tts/index-tts`) | 24,536 / 2,903 | 2026-09-29 | v2.5.0 (2026-08-13) | bilibili Model Use License (covers code + weights) | bilibili licence (`IndexTeam/IndexTTS-2.5`; IndexTTS-2 card has no tag) | **Cond.** (thresholds) | Yes | Yes | Yes |
| Fish Speech / Fish Audio S2-Pro / Drama 3 (`fishaudio/fish-speech`) | 33,228 / 2,884 | 2026-10-14 | v1.5.1 (2025-05-31) | Fish Audio Community License v1.0 (2026-10-13) | **Fish Audio Research License** (s2-pro, drama-3); CC-BY-NC-SA-4.0 (s1-mini, fish-speech-1.5) | **No** (weights) | Yes | Yes | Yes |
| F5-TTS / E2-TTS (`SWivid/F5-TTS`) | 15,415 / 2,247 | 2026-10-14 | 1.1.22 (2026-07-23) | MIT | **CC-BY-NC-4.0** (`SWivid/F5-TTS`) | **No** | Yes | Yes | unverified |
| OmniVoice (`k2-fsa/OmniVoice`) - new | 14,682 / 2,188 | 2026-10-12 | n/a | Apache-2.0 | **CC-BY-NC** (README) | **No** | Yes | Yes | Yes (600+ langs) |
| Higgs Audio v2 / v3 (`boson-ai/higgs-audio`) | 8,371 / 640 | 2026-06-05 | no release | Apache-2.0 (repo) | v2: Boson Higgs Audio 2 Community License; v3 (`bosonai/higgs-tts-3-4b`): Research & Non-Commercial + Creator Use Grant | v2 **Cond.**; v3 **Cond.** (creator grant) | Yes | Yes | Yes (v3: 100+ langs) |
| VibeVoice (`microsoft/VibeVoice`) | 54,857 / 6,166 | 2026-10-08 | no release | MIT | MIT (`VibeVoice-1.5B`, `-Realtime-0.5B`) | Licence yes, but **TTS code withdrawn**, "research only" | Yes | Yes | Yes (demo) |
| XTTS-v2 (orig. `coqui-ai/TTS`; fork `idiap/coqui-ai-TTS`) | 46,128 / 6,167 (orig.); 2,337 / 296 (fork) | 2024-08-16 (orig.); 2026-10-16 (fork) | fork v0.27.5 (2026-01-26) | MPL-2.0 | **Coqui Public Model License** (non-commercial incl. outputs) | **No** | Yes | Yes (zh-cn) | Yes |
| MegaTTS3 (`bytedance/MegaTTS3`) | 6,098 / 477 | 2026-06-15 | no release | Apache-2.0 | Apache-2.0 | Yes, but **encoder not released** | Yes | Yes | Yes (accent control) |
| Spark-TTS (`SparkAudio/Spark-TTS`) | 10,984 / 1,146 | 2025-04-09 | no release | Apache-2.0 | **CC-BY-NC-SA-4.0** | **No** | Yes | Yes | Yes |
| MaskGCT (in `open-mmlab/Amphion`) | 10,311 / 852 | 2026-03-25 | v0.1.1-alpha (2024-02-23) | MIT | **CC-BY-NC-4.0** (`amphion/MaskGCT`) | **No** | Yes | Yes | Yes (knowledge) |
| Llasa 1B/3B/8B (`zhenye234/LLaSA_training`) | 656 / 51 | 2026-01-21 | n/a | **CC BY-NC 4.0** (LICENSE read) | **CC-BY-NC-4.0** | **No** | Yes | Yes | unverified |
| FireRedTTS-2 (`FireRedTeam/FireRedTTS2`) | 1,432 / 130 | 2025-10-26 | no release | Apache-2.0 | Apache-2.0 | **Yes** | Yes | Yes | Yes |
| MOSS-TTSD (`OpenMOSS/MOSS-TTSD`) | 1,408 / 140 | 2026-09-06 | no release | Apache-2.0 | Apache-2.0 (v0.5 card; MOSS-TTS card also Apache-2.0) | **Yes** | Yes | Yes | Yes (20 langs) |
| Step-Audio-EditX (`stepfun-ai/Step-Audio-EditX`) | 985 / 80 | 2026-04-09 | n/a | Apache-2.0 (code, per HF card) | not stated on HF card (unverified) | unverified | Yes | Yes (+Sichuanese, Cantonese) | unverified |
| Zonos v0.1 (`Zyphra/Zonos`) | 7,235 / 816 | 2025-03-05 | no release | Apache-2.0 | Apache-2.0 | **Yes** | Yes | Yes | unverified |
| OpenVoice V2 (`myshell-ai/OpenVoice`) | 37,911 / 4,269 | 2025-04-19 | no release | MIT | MIT | **Yes** | Yes | Yes | Yes |
| Orpheus (`canopyai/Orpheus-TTS`) | 6,357 / 537 | 2025-12-05 | no release | Apache-2.0 | Apache-2.0 (gated) | **Yes** | Yes | research preview only | No (knowledge) |
| Sesame CSM-1B (`SesameAILabs/csm`) | 14,727 / 1,478 | 2025-05-27 | no release | Apache-2.0 | Apache-2.0 (gated) | **Yes** | Yes | No ("likely won't do well") | No |
| Dia / Dia2 (`nari-labs/dia`, `nari-labs/dia2`) | 19,407 / 1,688; 1,183 / 102 | 2025-11-19; 2025-11-29 | no release | Apache-2.0 | Apache-2.0 (`Dia2-2B`) | **Yes** | Yes (only) | No | No |
| Kyutai TTS / Pocket TTS (`kyutai-labs/delayed-streams-modeling`, `kyutai-labs/pocket-tts`) | 3,040 / 317; 9,915 / 1,050 | 2026-01-26; 2026-10-16 | n/a | MIT / Apache (DSM); MIT (pocket) | CC-BY-4.0 (`tts-1.6b-en_fr`, `pocket-tts`, gated) | **Yes** (attribution) | Yes | **No** | No (EN/FR/DE/PT/IT/ES/NL) |
| StyleTTS 2 (`yl4579/StyleTTS2`) | 6,364 / 708 | 2024-08-10 | no release | MIT | unverified | unverified | Yes | needs training | No |
| Kani-TTS (`nineninesix-ai/kani-tts`) | 458 / 58 | 2025-11-02 | n/a | NOASSERTION (README says Apache-2.0) | `lfm1.0` (LFM Open License) on `kani-tts-370m` | **conflict** | Yes | Yes | cloning not core |
| Kokoro-82M (`hexgrad/kokoro`) | 9,397 / 1,043 | 2025-08-06 | no release | Apache-2.0 | Apache-2.0 | Yes | Yes | Yes | **No cloning** |

Others seen but not researched in depth: ChatTTS (`2noise/ChatTTS`, 39,913 stars, **AGPL-3.0** code), Step-Audio2 (1,526 stars, Apache-2.0), kani-tts-2 (63 stars, no licence), FireRedTTS v1 (924 stars, MPL-2.0, last push 2025-09-28), Voxtral TTS (Mistral) and Breeze TTS 2 (both appear on the Artificial Analysis open-weights board, section 5), GLM-TTS, LongCat-Audio-DiT (appear in VoxCPM's comparison table).

## 3. Per-model cards

### 3.1 VoxCPM2 (OpenBMB) - top permissive EN+ZH candidate
- Repo https://github.com/OpenBMB/VoxCPM (numbers in table). Papers: VoxCPM arXiv 2509.24650 (ICLR 2026); VoxCPM2 technical report arXiv 2606.06928.
- Architecture: "tokenizer-free, diffusion autoregressive" on a MiniCPM-4 backbone; continuous latents of AudioVAE V2; pipeline LocEnc -> TSLM -> RALM -> LocDiT. Family: **hybrid (autoregressive LM + diffusion head)**.
- Versions (README table): VoxCPM2 2B, 48 kHz, 30 languages, RTF ~0.30 on RTX 4090 (~0.13 with Nano-vLLM), **VRAM ~8 GB**; VoxCPM1.5 0.6B, EN+ZH only, RTF ~0.15, ~6 GB; VoxCPM-0.5B legacy, ~5 GB. All self-reported.
- Cloning: zero-shot from a short clip ("Controllable Cloning", optional style text) or "Ultimate Cloning" (reference audio + transcript, continuation). SFT and LoRA fine-tuning supported. Reference length: "short reference clip" (exact seconds not stated in README).
- Languages: 30 incl. English and Chinese + 9 Chinese dialects; "no language tag needed". Voice Design (voice from text description).
- Seed-TTS-eval (self-reported, VoxCPM README): VoxCPM2 test-en WER 1.84 / SIM 75.3; test-zh CER 0.97 / SIM 79.5; test-hard CER 8.13 / SIM 75.3. Cross-lingual zh->en on CV3 (compiled by IndexTTS team): WER 4.48 / SS 64.25.
- Speed/VRAM: above (self-reported). Apple: llama.cpp-omni GGUF Q8_0 RTF ~1.76 on M4 Pro (README).
- Windows: `pip install voxcpm` (Python 3.10-3.12, PyTorch >= 2.5, CUDA >= 12). No official Windows statement; no one-click bundle found (unverified).
- Automation: Python API, CLI, web demo; Nano-vLLM-VoxCPM FastAPI server; **vLLM-Omni OpenAI-compatible `/v1/audio/speech`**.
- Licence: code + weights Apache-2.0; README: "Fully Open-Source & Commercial-Ready - Weights and code released under the Apache-2.0 license, free for commercial use". HF `openbmb/VoxCPM2`: 790,744 downloads, 1,692 likes, lastModified 2026-08-18.
- Maintenance: active (push 2026-10-08). Demo: https://openbmb.github.io/voxcpm2-demopage/ ; sample-audio licence not stated (unverified).

### 3.2 Qwen3-TTS (Alibaba Qwen) - permissive, strong EN/ZH WER
- Repo https://github.com/QwenLM/Qwen3-TTS ; paper arXiv 2601.15621; released 2026-01-22 (README news).
- Architecture: LM over discrete codec tokens from Qwen3-TTS-Tokenizer-12Hz (**codec LM**). Sizes 0.6B and 1.7B; variants Base (cloning), CustomVoice (9 preset voices + instructions), VoiceDesign.
- Cloning: Base models do "3-second rapid voice clone"; give `ref_audio` + `ref_text` (or `x_vector_only_mode=True` without transcript, lower quality). Base can be fine-tuned.
- Languages: Chinese, English, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian. Cross-lingual benchmark table in README. Instruction-based style control (CustomVoice/VoiceDesign).
- Seed-TTS-eval (self-reported): 12Hz-1.7B-Base test-zh 0.77, test-en 1.24 (WER/CER; Fish README quotes the same 0.77/1.24); VoxCPM's compiled table lists Qwen3-TTS 1.23 / SIM 71.7 (EN), 1.22 / 77.0 (ZH) - **conflict** (different runs). Cross-lingual zh->en (compiled by IndexTTS): 5.74 / 63.04.
- VRAM: **no official figure**. Secondary: ~6 GB for 1.7B measured on RTX 4080 SUPER under Windows 11; 0.6B ~4 GB; 0.6B Base degrades on long-form cloning (Medium, secondary). Reddit user: ~5 GB on RTX 2070, RTF ~1.17 (secondary). Pre-Ampere FP16 instability, repo issue #43 (secondary). No official CPU/Apple path (secondary).
- Windows: works with CUDA PyTorch (secondary Windows 11 report); FlashAttention 2 optional and hard to install on Windows (secondary).
- Automation: `qwen-tts` Python package, `qwen-tts-demo` web UI, vLLM support mentioned in README; DashScope cloud API (paid). Community OpenAI-compatible servers exist (secondary).
- Licence: code Apache-2.0; weights Apache-2.0 (HF tag). HF 1.7B-Base: 3,126,633 downloads, 564 likes. Demo/blog: https://qwen.ai/blog?id=qwen3tts-0115 ; sample licence not stated.
- Maintenance: last push 2026-03-17 (7 months - slowing). Note: Alibaba's newer hosted "Qwen-Audio-3.x-TTS" models are API-only (Artificial Analysis listing, secondary).

### 3.3 Fun-CosyVoice 3 (Alibaba FunAudioLLM / Tongyi) - permissive, best dialect coverage
- Repo https://github.com/FunAudioLLM/CosyVoice now redirects to `QwenAudio/CosyVoice`. Papers: CosyVoice 3 arXiv 2505.17589; CosyVoice 2 arXiv 2412.10117; CosyVoice 1 arXiv 2407.05407.
- Architecture: LLM predicting supervised semantic tokens + flow-matching acoustic decoder (**hybrid codec-LM + flow matching**). Open weights: Fun-CosyVoice3-0.5B-2512 (base + RL); CosyVoice3-1.5B is **not** open (VoxCPM table marks CosyVoice3 as not open-source; only 0.5B-2512 is on HF).
- Cloning: zero-shot (prompt audio + text); modes `sft | zero_shot | cross_lingual | instruct`. Instruct: language, dialect, emotion, speed, volume. Pronunciation inpainting (Pinyin, CMU phonemes) - useful for technical terms.
- Languages: zh, en, ja, ko, de, es, fr, it, ru + 18+ Chinese dialects; "supports both multi-lingual/cross-lingual zero-shot voice cloning".
- Seed-TTS-eval (self-reported, CosyVoice README): 0.5B-2512 test-zh CER 1.21 / SS 78.0, test-en 2.24 / 71.8, test-hard 6.71 / 75.8; RL version 0.81 / 77.4, 1.68 / 69.5, 5.44 / 75.0. CV3 zh->en cross-lingual (compiled by IndexTTS): 3.23 / 62.79.
- Speed: bi-streaming, "latency as low as 150ms" (self-reported); TensorRT-LLM "4x acceleration" vs HF transformers (for CosyVoice2). VRAM not stated (unverified).
- Windows: install docs are Linux-oriented (apt sox, ttsfrd cp310 linux wheel); Windows native unverified - expect WSL2 or community packages (unverified).
- Automation: Python (`example.py`), web UI, **FastAPI and gRPC servers** (Docker), vLLM (0.9 / 0.11+), Triton/TensorRT-LLM.
- Licence: code Apache-2.0; weights Apache-2.0. Disclaimer: "for academic purposes only" refers to demo content. HF 0.5B-2512: 206,530 downloads.
- Demo: https://funaudiollm.github.io/cosyvoice3/ . Maintenance: last push 2026-05-25.

### 3.4 Chatterbox family (Resemble AI) - permissive, easiest install, watermark
- Repo https://github.com/resemble-ai/chatterbox ; no paper. Demo pages: https://resemble-ai.github.io/chatterbox_demopage/ and https://resemble-ai.github.io/chatterbox_turbo_demopage/ .
- Models (README): **Turbo** 350M English, paralinguistic tags (`[laugh]`, `[cough]`), one-step decoder; **Nano** 110M English, "3x faster than realtime on 8 CPU cores"; **Multilingual V3** 500M, 23 languages incl. Chinese (zh); **Single Language Pack** incl. `Chatterbox-Multilingual-zh-cmn`; original Chatterbox 500M English with `exaggeration` / `cfg_weight` controls.
- Architecture: LLM (Llama-based, acknowledges CosyVoice / S3Tokenizer) predicting speech tokens + token-to-mel decoder (**codec-LM + flow/mel decoder hybrid**; details knowledge).
- Reference audio: examples use "your_10s_ref_clip.wav" (~10 s). Fine-tuning: not provided officially (unverified).
- Cross-lingual: README tip - "Ensure that the reference clip matches the specified language tag. Otherwise, language transfer outputs may inherit the accent of the reference clip's language. To mitigate this, set `cfg_weight` to 0." V3 claims more stable cross-language cloning.
- Metrics: subjective Podonos comparisons vs ElevenLabs Turbo v2.5, Cartesia Sonic 3, VibeVoice 7B (vendor-commissioned). No Seed-TTS-eval numbers published.
- **Watermark**: every output carries Resemble's PerTh imperceptible watermark (README).
- Windows: `pip install chatterbox-tts`; developed on Debian 11 / Python 3.11; `device="cpu"` and `"mps"` supported in examples. Windows not explicitly documented (works via pip per community, unverified).
- Automation: Python API; community OpenAI-compatible servers exist (unverified).
- Licence: code MIT; weights MIT (HF tags). No output restriction beyond disclaimer "Don't use this model to do bad things".
- Maintenance: push 2026-07-21; GitHub releases stale (v0.1.2, 2025-06-13) but models updated on HF (chatterbox lastModified 2026-06-10, nano 2026-07-21).

### 3.5 GPT-SoVITS (RVC-Boss) - best Windows one-click + fine-tune path
- Repo https://github.com/RVC-Boss/GPT-SoVITS ; no paper. Versions: v1, v2 (2024-08-21), v3 (2025-02-28), v4 (2025-04-22), **v2Pro / v2ProPlus** (2025-06-06, latest GitHub release), **V5** described in README (code on branch `cuda_graph_accel_v5`, weights `gsv-v5-pretrained`; date not stated).
- Architecture: GPT-style AR model over semantic tokens + SoVITS (VITS-family) decoder; v3/v4 use a flow/diffusion decoder + BigVGAN vocoder (**hybrid codec-LM + VITS / flow**; v3/v4 details from README pointers and knowledge).
- Data: **zero-shot from 5 s**; **few-shot fine-tune with ~1 minute** of your recordings ("for improved voice similarity and realism"). WebUI includes vocal separation (UVR5), auto slicing, Chinese ASR (and Faster-Whisper for EN/JA), labelling.
- Languages: Chinese, English, Japanese, Korean, Cantonese; cross-lingual inference supported.
- v2Pro note: "surpassing v4's performance, with v2's hardware cost"; v1/v2/v2Pro tolerate average-quality training data, v3/v4 do not.
- Speed (self-reported): v2ProPlus RTF 0.028 on RTX 4060 Ti, 0.014 on RTX 4090, **0.526 on Apple M4 CPU**. VRAM not stated (unverified).
- Windows: **official integrated package** (7z, double-click `go-webui.bat`; README link points to `GPT-SoVITS-v3lora-20250228.7z` on HF `lj1995/GPT-SoVITS-windows-package`); also `install.ps1 --Device CU126|CU128|CPU`. macOS: CPU training recommended.
- Automation: WebUI; HTTP API scripts `api.py` / `api_v2.py` (knowledge, unverified this session); Python.
- Licence: code MIT; HF `lj1995/GPT-SoVITS` tagged MIT. Training-data provenance of pretrained weights not stated (unverified).
- Maintenance: active (push 2026-10-08; HF lastModified 2026-10-06). Demo: HF space https://lj1995-gpt-sovits-proplus.hf.space/ .

### 3.6 IndexTTS2 / IndexTTS-2.5 (bilibili)
- Repo https://github.com/index-tts/index-tts ; papers: IndexTTS arXiv 2502.05512, IndexTTS2 arXiv 2506.21619, IndexTTS-2.5 arXiv 2601.03888. Releases: 1.0 (2025-03-25), 1.5 (2025-05-14), 2 (2025-09-08), **2.5 (2026-08-10)**.
- Architecture: AR text-to-semantic LM + flow-matching semantic-to-mel + vocoder (**hybrid**); timbre-emotion disentanglement; IndexTTS2 known for explicit duration control (knowledge).
- Languages: 2.5 supports Chinese, English, Japanese, Spanish, Arabic; Pinyin / CMU phoneme / Kana control. Emotion control via emotion reference audio, vectors or text (knowledge for details).
- Metrics (self-reported, CV3-Eval, 2.5-RL): zh WER 3.93 / SS 77.92; en 3.89 / 67.79; cross-lingual zh->en 3.55 / 67.47. IndexTTS2 on Seed-TTS-eval (self-reported via CosyVoice/VoxCPM tables): test-zh 1.03 / 76.5, test-en 2.23 / 70.6, test-hard 7.12 / 75.5.
- Speed (README, RTX 4090, kv_cache): IndexTTS2 fp16 overall RTF 0.3257; 2.5 bf16 0.2065.
- VRAM: no official number. Secondary: one-click installer vendor lists >= 8 GB; a GitHub issue (#326) user says official build still exceeds 8 GB.
- Windows: official `uv` install works on Windows (DeepSpeed optional, hard on Windows; needs CUDA Toolkit 12.8+). Community 8 GB Windows bundle (bilibili video, issue #326) and paid one-click installers (Patreon, secondary).
- Automation: Python API (`indextts.infer_v2_5.IndexTTS2`), web UI (Gradio, port 7860).
- **Licence** (bilibili Model Use License, covers "model weights and final code"): 2.1 "worldwide, non-exclusive, non-transferable, royalty-free limited license to Use the Model"; 2.2 a separate licence is required if "more than 100 million monthly active users" or "annual revenue ... exceeded RMB 1 billion"; 3.4(c) "You may not Use the bilibili indextts2 or any Derivative Work to improve any AI model, except ... non-commercial AI models". "Derivative Work" includes "model outputs". README separately says "For commercial usage and cooperation, please contact indexspeech@bilibili.com" -> **ambiguity**; small-scale commercial narration appears allowed by text, but confirm.
- Demo: https://index-tts.github.io/index-tts2-5.github.io/ ; maintenance active.

### 3.7 Fish Speech -> OpenAudio S1 -> Fish Audio S2-Pro -> Fish Audio Drama 3
- Repo https://github.com/fishaudio/fish-speech . Papers: Fish-Speech arXiv 2411.01156; S2 technical report arXiv 2603.08823; **Drama 3** technical report arXiv 2610.18010 (new this month; HF `fishaudio/drama-3` lastModified 2026-10-17).
- Models: Drama 3 = 35B-A3B MoE (3B active), multi-character, infilling/word-level editing, multi-turn "director" revision, inline tags `[whisper]`, `[angry]`; S2-Pro = 4B, ~100 languages, "10-30 seconds of reference audio", RTF 0.195 on one H200 (self-reported). An `int4` Drama 3 checkpoint exists. Architecture: **codec LM** (dual AR, knowledge).
- Metrics (self-reported): S2 Seed-TTS-eval WER 0.54 (ZH) / 0.99 (EN), lowest in VoxCPM's compiled table too; SIM not published there. CV3 cross-lingual zh->en (compiled by IndexTTS): S2-Pro 4.14 / SS 55.89 (lower similarity than peers).
- Windows: Docker image, docs at https://speech.fish.audio/ ; native Windows status not checked (unverified).
- Automation: CLI, API server, WebUI, SGLang-Omni, vLLM-Omni.
- **Licences**:
  - Code: Fish Audio Community License v1.0 (2026-10-13): free research/non-commercial; commercial "only while Your Annual Revenue is less than USD 500,000"; no Hosted Service; "Built with Fish Audio" attribution; output use restrictions include no voice imitation "without that person's prior consent"; no using output "to create, train, distill, or improve" other speech models.
  - Weights S2-Pro and Drama 3: **Fish Audio Research License** - "Any use of the Fish Audio Materials or Derivative Works for a Commercial Purpose requires a separate written license agreement from Fish Audio. No commercial rights are granted under this Agreement." Outputs: "You own any outputs ... to the extent permitted by applicable law", but generating them for a Commercial Purpose is still use of the Materials. -> **non-commercial without a paid licence**.
  - README text says code "and its associated model weights" are under the Community License but "S2-Pro weights remain under the Fish Audio Research License"; HF shows Drama 3 also under the research licence -> **conflict, trust HF/LICENSE**.
  - Older s1-mini, fish-speech-1.5: CC-BY-NC-SA-4.0.

### 3.8 F5-TTS / E2-TTS (SJTU X-LANCE) - non-commercial weights
- Repo https://github.com/SWivid/F5-TTS ; paper arXiv 2410.06885 (E2 TTS reproduction of arXiv 2406.18009). v1 base model 2025-03-12.
- Architecture: **flow matching** DiT (ConvNeXt V2) + Vocos/BigVGAN vocoder; non-autoregressive.
- Cloning: zero-shot with `--ref_audio` + `--ref_text` (blank -> auto ASR). Reference length: short clip (README does not state; community guidance <~12-15 s, unverified). Fine-tune via `f5-tts_finetune-gradio`.
- Languages: base model trained on Emilia ZH-EN (ModelScope name `F5-TTS_Emilia-ZH-EN`): **English + Chinese**; community fine-tunes for other languages.
- Seed-TTS-eval (self-reported per VoxCPM/CosyVoice tables): test-en 2.00 / SIM 67.0 (or 64.7), test-zh 1.53 / 76.0, test-hard 8.67 / 71.3; Qwen3-TTS README lists F5 1.56 (zh) / 1.83 (en).
- Speed (README, L20 GPU, 16 NFE): RTF 0.1467 offline PyTorch; 0.0394-0.0402 with TensorRT-LLM. VRAM ~2 GB measured on Windows 11 (Medium, secondary).
- Hardware breadth: README lists NVIDIA, AMD ROCm (Linux), **Intel GPU (XPU / IPEX)**, Apple Silicon; MLX port and ONNX port exist.
- Automation: `pip install f5-tts`; CLI `f5-tts_infer-cli`; Gradio app; Docker; Triton/TensorRT-LLM server.
- **Licence**: "Our code is released under MIT License. The pre-trained models are licensed under the CC-BY-NC license due to the training data Emilia". HF tag cc-by-nc-4.0 (830,021 downloads).
- Demo: https://swivid.github.io/F5-TTS/ ; maintenance active.

### 3.9 OmniVoice (k2-fsa / Next-gen Kaldi) - new, non-commercial weights
- Repo https://github.com/k2-fsa/OmniVoice ; paper arXiv 2604.00688; demo https://zhu-han.github.io/omnivoice .
- "Diffusion language model-style" architecture (**diffusion / masked-LM hybrid**); 600+ languages; RTF "as low as 0.025" (H100 batch benchmark). Voice design trained on Chinese and English only. Pinyin and CMU overrides. Cloning needs `ref_audio` + `ref_text` (or auto ASR); reusable `VoiceClonePrompt`.
- CV3 (compiled by IndexTTS): zh 3.41 / 72.99, en 3.62 / 70.13, zh->en 3.74 / 64.91. HF Open TTS Leaderboard names it a strong multilingual model (secondary).
- **Licence**: "code is released under the Apache 2.0 License. The pre-trained model is licensed under the CC-BY-NC due to constraints from its training data (e.g., Emilia)." HF card has no licence tag; 1,666,348 downloads.

### 3.10 Higgs Audio v2 / Higgs TTS 3 (Boson AI)
- Repo https://github.com/boson-ai/higgs-audio (README: "Don't clone this repository to use the latest model"; v3 served via Boson API, SGLang-Omni). No arXiv paper found.
- v2 (`bosonai/higgs-tts-2-3b-base`, ~3B; formerly higgs-audio-v2-generation-3B-base): Llama-3-derived **codec LM**. Seed-TTS-eval (compiled by VoxCPM): test-en 2.44 / 67.7, test-zh 1.50 / 74.0, test-hard 55.07 (weak on hard cases).
- v3 (`bosonai/higgs-tts-3-4b`, created 2026-06-04): 4B, "100+ languages", zero-shot cloning, inline emotion/style/prosody/SFX tokens (`<|emotion:...|>`, `<|prosody:pause|>`, speed tokens).
- **Licences**: code Apache-2.0 (GitHub). v2 weights: Boson Higgs Audio 2 Community License (based on Meta Llama 3 licence) - expanded licence needed if "greater than 100,000 annual active users"; no using outputs to improve other LLMs. v3 weights: Research and Non-Commercial licence **plus Creator Use Grant**: digital creators may "create, reproduce, publish, distribute, and monetize Creator Content" (podcasts, videos, audiobooks...) on channels they own, **if** they acknowledge "Boson AI's Higgs Audio" in the audio or prominently in the description; not covered: hosting/API, redistribution, embedding in a product. Teaching videos on your own channel appear to fit; a paid course platform you don't own is unclear.

### 3.11 VibeVoice (Microsoft) - withdrawn TTS
- Repo https://github.com/microsoft/VibeVoice ; TTS paper arXiv 2508.19205 (ICLR 2026 oral). Architecture: **next-token diffusion** (LLM Qwen2.5-1.5B + diffusion head) over 7.5 Hz continuous tokenizers; up to 90 min, 4 speakers; EN, ZH, cross-lingual demo.
- **Status (verified in README, 2026-10-17)**: "2025-09-05: ... we have removed the VibeVoice-TTS code from this repository." The model table shows VibeVoice-TTS-1.5B weights still linked, Quick Try "Disabled". `microsoft/VibeVoice-Large` (7B) is no longer accessible on HF (mirror returns auth error). Community forks keep the MIT code and re-upload 7B weights (vibevoice-community/VibeVoice, BBC-Esq/VibeVoice, shijincai/VibeVoice; secondary). Repo is now mostly ASR (VibeVoice-ASR, ASR-Streaming 2026-09-03). VibeVoice-Realtime-0.5B (2025-12-03) is open but uses preset voice embeddings, single speaker (secondary).
- Licence: MIT (code + HF weights). README: "We do not recommend using VibeVoice in commercial or real-world applications ... intended for research and development purposes only."
- Seed-TTS-eval (compiled): 1.5B test-en 3.04 / 68.9, test-zh 1.16 / 74.4.

### 3.12 XTTS-v2 (Coqui; company shut down) and the idiap fork
- Original https://github.com/coqui-ai/TTS last push 2024-08-16 (not archived, unmaintained). Maintained fork https://github.com/idiap/coqui-ai-TTS (PyPI `coqui-tts`), push 2026-10-16, v0.27.5 (2026-01-26); README: "Fork of the original, unmaintained repository"; prebuilt wheels for Windows/macOS since 0.24.2; caching for cloned voices in 0.27.0.
- XTTS-v2: GPT-style **codec LM** + HiFi-GAN decoder (knowledge; paper arXiv 2406.04904, knowledge). Model card: "17 languages", "Voice cloning with just a 6-second audio clip", "Cross-language voice cloning", emotion/style transfer by cloning; fine-tuning recipes.
- **Weights licence**: Coqui Public Model License: "This license allows only non-commercial use of a machine learning model **and its outputs**." Coqui no longer exists to sell a commercial licence (company closure: knowledge). -> **No** for commercial use. HF downloads 6,242,324 (still heavily used).
- Arenas: XTTS v2 Elo 915 (lowest of 9 open models on The Open Weights mirror of Artificial Analysis, 2026-10-16, secondary).

### 3.13 MegaTTS3 (ByteDance)
- Repo https://github.com/bytedance/MegaTTS3 ; paper arXiv 2502.18924 (+ 2408.16532). Diffusion transformer + WaveVAE (**diffusion / latent**), 0.45B (knowledge). EN + ZH + code-switching; accent intensity control (`--p_w`, `--t_w`) "useful for accented TTS or solving the accent problems in cross-lingual TTS".
- **Limitation**: WaveVAE encoder not released - you must upload a sample (< 24 s .wav) to a Google Drive folder to receive `.npy` voice latents (README). That is unusable for a private own-voice workflow without sending your voice to ByteDance.
- Windows: "currently under testing"; CPU inference "about 30 seconds (for 10 inference steps)". Licence Apache-2.0 code + weights. Seed-TTS-eval (compiled by VoxCPM): en 2.79 / 77.1, zh 1.52 / 79.0.

### 3.14 Spark-TTS (SparkAudio)
- Repo https://github.com/SparkAudio/Spark-TTS ; paper arXiv 2503.01710; demo https://sparkaudio.github.io/spark-tts/ . Qwen2.5-0.5B **codec LM** with single-stream BiCodec tokens. EN+ZH, zero-shot cross-lingual and code-switching. Windows guide: issue #5.
- Licence: code Apache-2.0 but weights **CC-BY-NC-SA-4.0** -> non-commercial. Stale (last push 2025-04-09). Seed-TTS-eval (compiled): en 1.98-3.14 / SIM 57.3, zh 1.20-1.54 / 66.0 (low similarity).

### 3.15 MaskGCT (Amphion, CUHK-Shenzhen)
- In https://github.com/open-mmlab/Amphion (MIT code); paper arXiv 2409.00750 (ICLR 2025). Fully non-autoregressive **masked generative codec transformer**. Trained on Emilia -> weights CC-BY-NC-4.0. Seed-TTS-eval (compiled): en 2.62 / 71.7, zh 2.27 / 77.4. Amphion later released Metis, Vevo/Vevo2 (2026-03-25). Not recommended (NC, heavy, slow - knowledge).

### 3.16 Llasa (HKUST)
- Training repo https://github.com/zhenye234/LLaSA_training ; paper arXiv 2502.04128. Llama-based **codec LM** with X-codec2 single codebook; 1B / 3B / 8B. EN + ZH (Emilia, LibriHeavy, WenetSpeech4TTS); a Llasa-1B-Multilingual exists.
- Licence: repo LICENSE = CC BY-NC 4.0; weights CC-BY-NC-4.0 -> non-commercial. Qwen3-TTS README lists Llasa-8B Seed-TTS zh 1.59 / en 2.97.

### 3.17 FireRedTTS-2 (Xiaohongshu FireRed)
- Repo https://github.com/FireRedTeam/FireRedTTS2 ; paper arXiv 2509.02020; demo https://fireredteam.github.io/demos/firered_tts_2/ . Long-form multi-speaker dialogue, streaming; EN, ZH, JA, KO, FR, DE, RU; "zero-shot voice cloning for cross-lingual and code-switching". VRAM "from 14GB to 9GB" with bf16 (README 2025-09-28). Fine-tuning code 2025-10-26. Licence Apache-2.0 code + weights. Seed-TTS-eval (compiled): en 1.95 / 66.5, zh 1.14 / 73.6. CV3 (compiled by IndexTTS): weak (en 14.92). Last push 2025-10-26 (stale-ish).

### 3.18 MOSS-TTSD / MOSS-TTS (Fudan OpenMOSS)
- Repo https://github.com/OpenMOSS/MOSS-TTSD ; paper arXiv 2603.19739. Long-form spoken **dialogue** generation, 20 languages incl. zh/en, zero-shot cloning per speaker, v1.0 weights, SGLang server. Licence Apache-2.0. MOSS-TTS (single speaker, Seed-TTS-eval compiled: en 1.85 / 73.4, zh 1.20 / 78.8) and "Moss-TTS 1.5 8B" appear in other tables; not researched further.

### 3.19 Step-Audio-EditX (StepFun)
- Repo https://github.com/stepfun-ai/Step-Audio-EditX ; paper arXiv 2511.03601. 3B LLM-based audio editing + zero-shot TTS: emotion/style/paralinguistic editing in iterations; Mandarin, English, Sichuanese, Cantonese, JA, KO (2025-11-28). Keep audio < 30 s per inference. AWQ 4-bit checkpoint exists. HF card: "The code in this open-source repository is licensed under the Apache 2.0 License"; weights licence not stated (unverified). Ranks #4 on Artificial Analysis open-weights board (Elo 1097, secondary). Note `stepfun-ai/Step-Audio` now shows only 43 stars (repo appears re-created; unverified).

### 3.20 Zonos v0.1 (Zyphra)
- Repo https://github.com/Zyphra/Zonos ; no paper. Transformer and SSM-hybrid variants over DAC tokens (**codec LM**). Clone from "a 10-30s speaker sample"; EN, JA, ZH, FR, DE; emotion, pitch, rate conditioning. "real-time factor of ~2x on an RTX 4090" (i.e. 2 s audio per s); GPU 6 GB+ VRAM; CPU possible but slow; Windows via community fork `sdbds/Zonos-for-windows`. Apache-2.0 code + weights. **Stale** (last push 2025-03-05). Artificial Analysis Elo 1000 (anchor, secondary).

### 3.21 OpenVoice V2 (MyShell / MIT)
- Repo https://github.com/myshell-ai/OpenVoice ; paper arXiv 2312.01479. Base TTS (MeloTTS) + **tone-colour converter** (voice conversion). Zero-shot cross-lingual; EN, ES, FR, ZH, JA, KO native. MIT code + weights ("Free for both commercial and research use"). Stale (2025-04-19); similarity generally below modern models (knowledge).

### 3.22 Orpheus, Sesame CSM, Dia/Dia2, Kyutai, StyleTTS2, Kani, Kokoro (EN-centric or no ZH cloning)
- **Orpheus** (Canopy Labs): Llama-3B **codec LM** (SNAC); English finetune + pretrained; multilingual research preview (2025-04, incl. a `3b-zh-ft-research_release`); README admits zero-shot cloning is emergent, not trained; Apache-2.0 weights (gated). Not suitable for EN+ZH own-voice.
- **Sesame CSM-1B**: Llama backbone + Mimi codec; context-conditioned (can mimic voice from context audio); FAQ: other languages "likely won't do well"; Windows needs `triton-windows`. Apache-2.0. Stale (2025-05-27).
- **Dia / Dia2** (Nari Labs): dialogue TTS, Dia2 1B/2B streaming, "only supports up to 2 minutes of generation in English". Apache-2.0. Stale (Nov 2025).
- **Kyutai TTS 1.6B** (EN/FR, DSM paper arXiv 2509.08753) and **Pocket TTS** (CPU, ~6x real time on MacBook Air M4 using 2 cores; paper link arXiv 2509.06926; EN, FR, DE, PT, IT, ES, NL; "The `--voice` argument can also take a plain wav file as input for voice cloning"; local HTTP server). Weights CC-BY-4.0 (attribution). **No Chinese.** For the 1.6B model, cloning is limited to voices provided as embeddings (knowledge, unverified).
- **StyleTTS 2**: arXiv 2306.07691; style diffusion + adversarial training with WavLM; English LibriTTS model; non-English needs your own PL-BERT + training. Stale (2024-08-10). Not practical for ZH cloning.
- **Kani-TTS**: 370M/400M LLM + NVIDIA NanoCodec; separate en / zh models; "voice cloning examples" still on roadmap; licence conflict (GitHub README Apache-2.0 vs HF card `lfm1.0`, NanoCodec under NVIDIA Open Model License).
- **Kokoro-82M**: StyleTTS2-derived, Apache-2.0, includes Chinese voices, **no voice cloning**; ranks high on arenas (Artificial Analysis Elo 1061; TTS Arena V2 Elo 1473, secondary) - useful only as a non-cloned fallback.

## 4. Seed-TTS-eval comparison (self-reported; compiled tables)

Main table as compiled in the VoxCPM README (read 2026-10-17) [S5]; Fish S2 and Qwen3-TTS also self-report elsewhere. WER EN / CER ZH in %, SIM in %.

| Model | Params | Open weights? | test-en WER / SIM | test-zh CER / SIM | test-hard CER / SIM |
|---|---|---|---|---|---|
| Seed-TTS (closed reference) | - | no | 2.25 / 76.2 | 1.12 / 79.6 | 7.59 / 77.6 |
| Fish Audio S2 (Pro) | 4B | NC | 0.99 / - | 0.54 / - | 5.99 / - |
| Qwen3-TTS | 1.7B | Apache | 1.23 / 71.7 | 1.22 / 77.0 | 6.76 / 74.8 |
| VoxCPM2 | 2B | Apache | 1.84 / 75.3 | 0.97 / 79.5 | 8.13 / 75.3 |
| VoxCPM-0.5B | 0.6B | Apache | 1.85 / 72.9 | 0.93 / 77.2 | 8.87 / 73.0 |
| MOSS-TTS | - | Apache | 1.85 / 73.4 | 1.20 / 78.8 | - |
| LongCat-Audio-DiT | 3.5B | listed open | 1.50 / 78.6 | 1.09 / 81.8 | 6.04 / 79.7 |
| Fun-CosyVoice3-0.5B-2512 (CosyVoice README) | 0.5B | Apache | 2.24 / 71.8 | 1.21 / 78.0 | 6.71 / 75.8 |
| Fun-CosyVoice3-0.5B-2512 RL (CosyVoice README) | 0.5B | Apache | 1.68 / 69.5 | 0.81 / 77.4 | 5.44 / 75.0 |
| IndexTTS2 | 1.5B | bilibili | 2.23 / 70.6 | 1.03 / 76.5 | 7.12 / 75.5 |
| FireRedTTS-2 | 1.5B | Apache | 1.95 / 66.5 | 1.14 / 73.6 | - |
| F5-TTS | 0.3B | NC | 2.00 / 67.0 | 1.53 / 76.0 | 8.67 / 71.3 |
| OpenAudio-s1-mini | 0.5B | NC | 1.94 / 55.0 | 1.18 / 68.5 | 23.37 / 64.3 |
| HiggsAudio-v2 | 3B | community | 2.44 / 67.7 | 1.50 / 74.0 | 55.07 / 65.6 |
| VibeVoice-1.5B | 1.5B | MIT (withdrawn) | 3.04 / 68.9 | 1.16 / 74.4 | - |
| MaskGCT | 1B | NC | 2.62 / 71.7 | 2.27 / 77.4 | - |
| SparkTTS | 0.5B | NC | 3.14 / 57.3 | 1.54 / 66.0 | - |
| MegaTTS3 | 0.5B | Apache (encoder withheld) | 2.79 / 77.1 | 1.52 / 79.0 | - |
| Human ground truth (CosyVoice README) | - | - | 2.14 / 73.4 | 1.26 / 75.5 | - |

Reading: everything modern is at or below human WER, so WER no longer separates the top group; **SIM** (how much it sounds like you) and listening tests matter more. Highest SIM among commercially usable open models: VoxCPM2 (75.3 EN / 79.5 ZH), CosyVoice3-0.5B (71.8 / 78.0), Qwen3-TTS (71.7 / 77.0).

Cross-lingual (CV3-Eval, Chinese prompt -> English output), compiled by the IndexTTS team (README, 2026-10-17): IndexTTS2.5-RL 3.55 WER / 67.47 SS; OmniVoice 3.74 / 64.91; VoxCPM2 4.48 / 64.25; CosyVoice3-0.5B 3.23 / 62.79; Qwen3-TTS 5.74 / 63.04; Fish S2-Pro 4.14 / 55.89; FireRedTTS-2 9.34 / 53.19. (No EN->ZH numbers were found in these tables.)

## 5. Independent comparisons (secondary, dated)

- **Artificial Analysis TTS arena** (search snapshot, October 2026) [S20]: open-weights "Provider Voice" board (models using their own built-in voices, **not** cloning): Fish Audio Drama 3 Preview 1244, Breeze TTS 2 1222, Fish Audio S2 Pro 1116, Step Audio EditX 1097, Voxtral TTS 1087, Magpie-Multilingual 357M 1063, Kokoro 82M 1061, Maya1 1046, OpenAudio S1 Mini 1044, Higgs Audio V3 1038. "17 open weights models out of 97 total". Best proprietary for comparison: Eleven v4 Turbo 1330, Eleven v4 1329. The "Controlled Voice" (cloning, 8 cloned EN voices) board top 8 shown were all proprietary (HeyGen Voice 1198, Qwen-Audio-3.1-TTS-Plus 1186, Eleven v4 Turbo 1162 ...). Method: Bradley-Terry fit, anchored at 1000 [S21]. The Open Weights site mirror (updated 2026-10-16): Chatterbox 1025, Zonos-v0.1 1000, VibeVoice 1.5B 956, XTTS v2 915 [S22].
- **TTS Arena V2** (TTS-AGI, HF Space; via pass.io index, secondary, undated 2026 snapshot) [S23]: OpenAudio S2 1515, OpenAudio S1 1504, chatterbox 1476, Kokoro 1473, Maya1 1406, Magpie TTS Multilingual 1402 (top proprietary ~1563). English, built-in voices.
- **Hugging Face Open TTS Leaderboard** (blog 2026-09-30) [S24]: objective metrics (Qwen3-ASR WER/CER, WavLM SIM, RTFx on H200, TTFA on GPU and CPU), multilingual + voice-cloning toggle. Statements: Kokoro-82M, Supertone supertonic-3 and fishaudio/s2-pro lead English WER; **k2-fsa/OmniVoice, fishaudio/s2-pro and Fun-CosyVoice3-0.5B-2512 are strong multilingual models**; higgs-tts-3-4b and VoxCPM2 improve when a reference is given; **kyutai/pocket-tts is "great ... for streaming on both GPU and CPU"**. Eval scripts: https://github.com/huggingface/open-tts-leaderboard .
- Caveat: arenas are English-heavy and mostly use stock voices; none measures "my voice in Mandarin". Plan a personal listening test.

## 6. Hardware notes for this user (Intel iGPU only today)

- **CPU-only, realistic options**: Kyutai Pocket TTS (CPU-first, but no Chinese); Chatterbox-Nano (CPU, English only); GPT-SoVITS v2ProPlus (RTF 0.526 on Apple M4 CPU, self-reported; x86 CPU unverified; `install.ps1 --Device CPU`); VoxCPM2 via llama.cpp-omni GGUF (RTF ~1.76 on M4 Pro Metal - x86 CPU slower, unverified); MegaTTS3 CPU ~30 s per 10 steps (encoder issue). Most 0.5-4B LLM-based models (Qwen3-TTS, IndexTTS, Fish, CosyVoice) are impractically slow on CPU (no official CPU path for Qwen3-TTS, secondary).
- **Intel iGPU**: only F5-TTS documents Intel GPU (XPU/IPEX) in its README; feasibility on an iGPU is unverified (and F5 weights are NC).
- **8 GB NVIDIA**: VoxCPM2 (~8 GB, tight), VoxCPM1.5 (~6 GB, EN+ZH only), Qwen3-TTS 1.7B (~5-6 GB, secondary), Zonos (6 GB+), GPT-SoVITS (fine), Chatterbox (fine, VRAM not stated), IndexTTS2 (borderline, reports of >8 GB). **12-16 GB**: all of the above comfortably; FireRedTTS-2 (9 GB bf16). **24 GB**: Fish S2-Pro 4B, Higgs v3 4B, Drama 3 int4 (VRAM not stated, unverified).
- **Apple Silicon**: VoxCPM2 GGUF (Metal), F5-TTS (MLX port), Chatterbox (`mps`), GPT-SoVITS (CPU training advised).
- **Cloud GPU** is an alternative for occasional batch narration (not researched here).

## 7. Key findings (top 12)

1. **Commercially clean (Apache/MIT code AND weights) with EN + ZH + cross-lingual cloning**: VoxCPM2, Qwen3-TTS, Fun-CosyVoice3-0.5B, GPT-SoVITS, Chatterbox Multilingual V3 (+ zh-cmn pack), FireRedTTS-2, MOSS-TTSD, OpenVoice V2, Zonos. (MegaTTS3 is Apache but withholds its voice encoder.)
2. **Non-commercial weights - block monetised use**: F5-TTS (CC-BY-NC), OmniVoice (CC-BY-NC), MaskGCT (CC-BY-NC), Llasa (CC-BY-NC), Spark-TTS (CC-BY-NC-SA), Fish S2-Pro and Drama 3 (Fish Audio Research License), Fish s1-mini / 1.5 (CC-BY-NC-SA), **XTTS-v2 (CPML covers outputs explicitly)**.
3. **Conditional**: IndexTTS2/2.5 (royalty-free under 100M MAU / RMB 1bn revenue, but README says contact for commercial use); Higgs v2 (licence needed above 100k annual active users); Higgs v3 (non-commercial, but a Creator Use Grant allows monetised videos/podcasts on your own channels with an on-screen/in-audio credit); Fish code (< USD 500k revenue - irrelevant while weights stay research-only).
4. **VoxCPM2** (Apr 2026, 2B, Apache, ~8 GB, 30 languages, 48 kHz) has the best similarity among commercially usable open models on Seed-TTS-eval (SIM 75.3 EN / 79.5 ZH, self-reported) and an OpenAI-compatible server via vLLM-Omni.
5. **Qwen3-TTS** (Jan 2026, Apache) has very low self-reported WER (0.77 ZH / 1.24 EN), 3-second cloning, ~5-6 GB VRAM (secondary), but repo activity paused since 2026-03-17 and no official CPU path.
6. **CosyVoice 3 (0.5B)** is the most production-oriented (FastAPI/gRPC, vLLM, TensorRT-LLM, explicit cross-lingual mode, Pinyin/phoneme fixes) but Linux-first; Windows likely needs WSL2.
7. **GPT-SoVITS** is the only option with an **official Windows one-click package** and an easy **1-minute fine-tune** path for your own voice (MIT); best fit for a beginner who wants maximal "sounds like me" via training.
8. **Fish Audio** tops open-weights arenas (Drama 3 Preview Elo 1244; S2 Pro 1116) and Seed-TTS WER (0.54/0.99), but weights are research-only; commercial needs a paid licence.
9. **VibeVoice TTS was withdrawn** by Microsoft (code removed 2025-09-05; 7B weights gone from HF; "research only"); only community forks remain - avoid for a long-term pipeline.
10. **Coqui is dead; XTTS-v2 lives on via idiap `coqui-tts`** (maintained, Windows wheels), but its weights stay non-commercial with no one to buy a licence from.
11. **Stale / limited**: Spark-TTS (Apr 2025), Zonos (Mar 2025), CSM (May 2025), OpenVoice (Apr 2025), StyleTTS2 (Aug 2024), Dia/Dia2 (Nov 2025, EN only), Orpheus (EN), Kyutai/Pocket TTS (no ZH), Kokoro (no cloning).
12. **No independent benchmark measures own-voice EN+ZH cross-lingual quality**; arenas are English and stock voices. Objective data (CV3 zh->en) show IndexTTS2.5, OmniVoice, VoxCPM2 and CosyVoice3 ahead on cross-lingual; Fish S2-Pro lower on similarity there. A personal A/B listening test on your own voice is required.

## 8. Recommended shortlist for EN + ZH teaching narration

Assumes an NVIDIA GPU (8-24 GB) is added or a cloud GPU is used; on the current Intel-iGPU PC only GPT-SoVITS (CPU) and VoxCPM GGUF are plausible, slowly.

1. **VoxCPM2** - first choice if commercial use may happen: Apache code + weights, EN + ZH (+ dialects), highest open-model SIM, cross-lingual without tags, LoRA fine-tune for more likeness, Python + CLI + OpenAI-compatible server for automation, ~8 GB VRAM.
2. **Fun-CosyVoice3-0.5B-2512** - second permissive option: explicit cross-lingual mode, instruct control (speed, emotion), Pinyin/CMU pronunciation fixes for technical terms, mature servers; use WSL2 on Windows.
3. **Qwen3-TTS-12Hz-1.7B-Base** - third permissive option: easy `pip install qwen-tts`, 3 s cloning, low WER, low VRAM; check long-form stability (use 1.7B, not 0.6B, for long narration per secondary report).
4. **GPT-SoVITS (v2ProPlus / V5)** - best for "train on my own 1-10 minutes" and Windows one-click; MIT; strong Chinese heritage; use if zero-shot likeness is not good enough.
5. **IndexTTS-2.5** - strongest cross-lingual numbers (zh->en SS 67.5) plus emotion and duration control; licence fine for an individual by its text, but email bilibili before commercial launch.
6. Evaluation-only (do not ship commercially without a licence): Fish Audio S2-Pro / Drama 3 (quality ceiling), F5-TTS and OmniVoice (NC). Higgs TTS 3 only if publishing on your own channels with the required credit.

Practical tips that follow from the facts: record a clean reference in **each** language (most models clone best when the reference language matches; Chatterbox documents accent leakage otherwise); keep the transcript of the reference (VoxCPM "Ultimate Cloning", Qwen3 `ref_text`, F5, OmniVoice all use it); every licence above that mentions voice cloning requires consent - cloning your own voice satisfies it.

## 9. Conflicts and uncertainties

- **Fish licences**: README says code and weights under the Community License but S2-Pro under the Research License; HF shows Drama 3 also under the Research License (2026-10-17). Treat all current Fish weights as non-commercial.
- **IndexTTS**: licence text grants royalty-free use below thresholds; README says "For commercial usage and cooperation, please contact". IndexTTS-2 HF card has no licence tag.
- **Qwen3-TTS Seed-TTS numbers**: own README 0.77 / 1.24 vs VoxCPM-compiled 1.22 / 1.23 (and SIM only in the latter).
- **F5-TTS Seed-TTS numbers** differ by source (EN 2.00 vs 1.83; SIM 67.0 vs 64.7).
- **CC-BY-NC on weights**: whether NC terms extend to generated audio is legally debated; CPML (XTTS) explicitly includes outputs; Fish research license grants output ownership but forbids commercial use of the materials. Conservative reading: no commercial use. See R5 (legal) for detail.
- **Kani-TTS**: GitHub README Apache-2.0 vs HF `lfm1.0` licence.
- **Step-Audio-EditX weights licence**: not stated on HF card. `stepfun-ai/Step-Audio` star count (43) inconsistent with earlier popularity - repo likely re-created (unverified).
- **Higgs naming**: GitHub README says "higgs-audio-v3-tts-4b" / "Higgs Audio v3 ... Research and Non-Commercial License"; HF lists `bosonai/higgs-tts-3-4b` with "Higgs TTS 3" licence. Same model presumably.
- **VibeVoice 7B**: availability only via community re-uploads (secondary); provenance and licence continuity unverifiable.
- **GPT-SoVITS**: README's Windows package link is the v3lora 2025-02-28 bundle; whether a newer v2Pro/V5 one-click bundle exists on HF was not checked. V5 release date not stated. API script names from knowledge.
- **VRAM**: official figures only for VoxCPM, Zonos, FireRedTTS-2; Qwen3-TTS, IndexTTS, Chatterbox, F5 figures are secondary or missing.
- **Windows support** for CosyVoice, Fish, Chatterbox not verified hands-on.
- **Sample-audio licences** on demo pages: not stated in any README read; demo pages were not opened one by one (unverified).
- Hugging Face main site unreachable; HF data via hf-mirror.com (could lag the origin).
- Not researched: Voxtral TTS (Mistral), Breeze TTS 2, Supertone supertonic-3, GLM-TTS, LongCat-Audio-DiT, Maya1, Magpie TTS (NVIDIA) - several are open-weights and appear in leaderboards; worth a follow-up if the shortlist disappoints.

## 10. Sources (all accessed 2026-10-17)

1. https://github.com/BytedanceSpeech/seed-tts-eval (README; Seed-TTS paper https://arxiv.org/abs/2406.02430)
2. https://github.com/OpenBMB/VoxCPM (README); https://arxiv.org/abs/2606.06928 ; https://arxiv.org/abs/2509.24650 ; https://openbmb.github.io/voxcpm2-demopage/
3. https://github.com/QwenLM/Qwen3-TTS (README); https://arxiv.org/abs/2601.15621 ; https://qwen.ai/blog?id=qwen3tts-0115
4. https://github.com/QwenAudio/CosyVoice (README; redirected from FunAudioLLM/CosyVoice); https://arxiv.org/abs/2505.17589 ; https://funaudiollm.github.io/cosyvoice3/
5. VoxCPM README Seed-TTS-eval / CV3 / MiniMax tables (compiled by OpenBMB) - same URL as 2
6. https://github.com/resemble-ai/chatterbox (README); https://resemble-ai.github.io/chatterbox_demopage/
7. https://github.com/RVC-Boss/GPT-SoVITS (README, releases); https://huggingface.co/lj1995/GPT-SoVITS-windows-package
8. https://github.com/index-tts/index-tts (README, LICENSE read); https://arxiv.org/abs/2601.03888 ; https://arxiv.org/abs/2506.21619 ; https://github.com/index-tts/index-tts/issues/326
9. https://github.com/fishaudio/fish-speech (README, LICENSE read); https://huggingface.co/fishaudio/s2-pro (LICENSE.md read via hf-mirror); https://huggingface.co/fishaudio/drama-3 ; https://arxiv.org/abs/2603.08823 ; https://arxiv.org/abs/2610.18010
10. https://github.com/SWivid/F5-TTS (README); https://arxiv.org/abs/2410.06885
11. https://github.com/k2-fsa/OmniVoice (README); https://arxiv.org/abs/2604.00688
12. https://github.com/boson-ai/higgs-audio (README); https://huggingface.co/bosonai/higgs-tts-2-3b-base (LICENSE read); https://huggingface.co/bosonai/higgs-tts-3-4b (LICENSE + card read)
13. https://github.com/microsoft/VibeVoice (README); https://microsoft.github.io/VibeVoice/ ; https://github.com/vibevoice-community/VibeVoice (secondary); https://github.com/shijincai/VibeVoice (secondary)
14. https://github.com/coqui-ai/TTS ; https://github.com/idiap/coqui-ai-TTS (README); https://huggingface.co/coqui/XTTS-v2 (README + LICENSE.txt read)
15. https://github.com/bytedance/MegaTTS3 (README); https://arxiv.org/abs/2502.18924
16. https://github.com/SparkAudio/Spark-TTS ; https://arxiv.org/abs/2503.01710 ; https://github.com/open-mmlab/Amphion ; https://arxiv.org/abs/2409.00750 ; https://github.com/zhenye234/LLaSA_training (LICENSE read); https://arxiv.org/abs/2502.04128
17. https://github.com/FireRedTeam/FireRedTTS2 ; https://arxiv.org/abs/2509.02020 ; https://github.com/OpenMOSS/MOSS-TTSD ; https://arxiv.org/abs/2603.19739 ; https://github.com/stepfun-ai/Step-Audio-EditX ; https://arxiv.org/abs/2511.03601
18. https://github.com/Zyphra/Zonos ; https://github.com/myshell-ai/OpenVoice ; https://arxiv.org/abs/2312.01479 ; https://github.com/canopyai/Orpheus-TTS ; https://github.com/SesameAILabs/csm ; https://github.com/nari-labs/dia2 ; https://github.com/kyutai-labs/pocket-tts ; https://github.com/kyutai-labs/delayed-streams-modeling ; https://github.com/yl4579/StyleTTS2 ; https://github.com/nineninesix-ai/kani-tts ; https://github.com/hexgrad/kokoro
19. Hugging Face model API via mirror: https://hf-mirror.com/api/models/<org>/<name> for every weights licence/download figure in section 2
20. https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice/open-weights and https://artificialanalysis.ai/text-to-speech/leaderboard/controlled-voice (search-result snapshot, secondary)
21. https://artificialanalysis.ai/methodology/text-to-speech (search-result snapshot, secondary)
22. https://theopenweights.com/leaderboards/text-to-speech (updated 2026-10-16, secondary)
23. https://pass.io/index/board/tts-arena-v2 ; https://huggingface.co/spaces/TTS-AGI/TTS-Arena-V2 (secondary)
24. https://huggingface.co/blog/open-tts-leaderboard (fetched; published 2026-09-30); https://github.com/huggingface/open-tts-leaderboard
25. Qwen3-TTS VRAM / Windows (secondary): https://medium.com/data-science-collective/high-quality-long-form-tts-with-qwen3-open-weight-models-cdd6e3d00df0 ; https://localaimaster.com/blog/qwen3-tts-local-setup ; https://www.reddit.com/r/LocalLLaMA/comments/1qlzbhh/ ; https://github.com/TheBeachLab/selfhosted/blob/master/doc/qwen3-tts.md
26. IndexTTS2 Windows installers (secondary): https://www.locallabdigest.com/product-page/indextts-2-expressive-tts-voice-cloning-one-click-installer
27. Prior note reused and re-verified: `AI-video-generation-techniques/docs/memory/memory-20261017-ai-video-production-research/research-notes/r4-audio.md` section 1b (star counts matched within +7 today; F5 weights NC and XTTS CPML now verified; VibeVoice "research only" conflict resolved: MIT licence but TTS code withdrawn)
