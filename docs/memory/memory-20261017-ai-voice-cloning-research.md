# Memory: AI voice cloning research + tutorial site

**Generated**: 2026-10-17 22:40 (UTC+8)
**Last updated**: 2026-10-26 (UTC+8)
**Project**: D:\git\scratches\2026.10\AI-voice-cloning
**Focus**: Vendor-neutral, freshly sourced research on cloning the user's own voice for teaching narration (EN + Mandarin), delivered as a file:// static tutorial site in `site/`.

---

## Goal & Scope

User: experienced software engineer on Windows 11, new to speech AI. Wants an agent to turn lesson/tutorial scripts into natural speech in his own voice, English and Mandarin Chinese, including cross-lingual (his voice in the language he recorded less of). Deliverable teaches the field and lets him pick a setup.

Scope = all 8 sections of the original brief: (1) how it works w/ SVG diagrams; (2) landscape: cloud, open-source, voice conversion + sortable/filterable table; (3) recording; (4) quality/control; (5) agent pipeline (+ brief lip-sync avatar note); (6) legal/ethics/safety (EU AI Act Art. 50, watermarking, bank voice biometrics); (7) decision framework, 3 paths, cost calculator; (8) hands-on experiment + ready agent prompt. Plus glossary, sources-and-method, "3-5 directions for next discussion".

## Key Decisions

1. **Memory location** = `AI-voice-cloning/docs/memory/` (user specified "in this folder").
2. **Started fresh** (no memory loaded). Sibling project `../AI-video-generation-techniques` has today's audio notes (`docs/memory/memory-20261017-ai-video-production-research/research-notes/r4-audio.md`) usable as reference; re-check key facts.
3. **Hardware assumption**: local path assumes typical consumer NVIDIA GPU (8-24 GB VRAM), with notes for CPU-only and rented cloud GPU. User's PC has only Intel UHD iGPU + 64 GB RAM.
4. **Commercial use undecided**: rate every tool for commercial use of output; flag non-commercial licences clearly.
5. **Research approach**: 5 parallel helper agents write sourced fact sheets to `./memory-20261017-ai-voice-cloning-research/research-notes/` (r1 cloud, r2 open-source TTS, r3 VC + recording/cleanup, r4 eval + pipeline, r5 legal). Main agent verifies key claims and writes every page. Rejected: all-by-myself (slow), one big helper (shallow).
6. **Site design**: fresh copy of sibling site's shell pattern (site.js injects sidebar/TOC/prev-next/theme from one page list; data in global JS files; classic scripts; no fetch/modules). Pages: index, 01 how-it-works, 02 cloud, 03 open-source, 04 voice-conversion, 05 explorer, 06 recording, 07 quality-control, 08 pipeline, 09 legal, 10 decide (+calculator, helper), 11 hands-on (+agent prompt), 12 next-directions, glossary, sources.
7. **Audio samples**: link official demo pages; `<audio>` only where licence clearly allows.
8. **No commit** unless user asks. Commits use `[NO-TASK]` prefix (branch master, repo convention).

## Confirmed Assumptions

- Evidence labels: Verified, Practice, Inference, Unverified, Experimental. Every price/stat dated. Conflicts stated.
- Long comprehensive pages OK; no long install guides.
- Done = no JS errors, no broken internal links, mobile width OK, works from file://; honest gaps list.

## Key Discoveries

- Commercial-safe open shortlist (verified licence tags): VoxCPM2, CosyVoice3 0.5B, Qwen3-TTS 1.7B (Apache-2.0); GPT-SoVITS (MIT); IndexTTS-2.5 conditional (100M MAU / RMB 1bn thresholds).
- Non-commercial traps: F5-TTS weights CC-BY-NC, Fish s2-pro weights "no commercial rights", XTTS CPML covers outputs, VibeVoice TTS code removed. OmniVoice licence conflict (helper said NC, repo says Apache-2.0) -> "unclear".
- AA Controlled Voice arena 2026-10-17: HeyGen 1198, Qwen-Audio-3.1 1186, Eleven v4 Turbo 1162; open models low (Chatterbox 930, XTTS 830).
- RunPod 2026-10-17: 3090 $0.50/h, 4090 $0.89/h. Resemble hosted STS discontinued. ElevenLabs default voices expire 2026-12-31.
- Gaps: see site/sources.html#gaps (no hands-on runs, no independent EN+ZH own-voice benchmark, some vendor terms unread).

## Current State

- Site complete (15 pages + data-tools.js); all checks passed 2026-10-17. User confirmed done.
- Committed and pushed to scratches `origin/master` on 2026-10-17 as `[NO-TASK] docs: add AI voice cloning field guide site` (user asked). Throwaway browser files were later deleted.
- Dedicated repo, created 2026-10-26 on the dated-folder account: https://github.com/connect-world-1985-ai/2026-10-17-ai-voice-cloning (public, branch `main`). Name uses the research date, not the upload date. The `gh` CLI on this machine is `shx99717`; this repo was created with the other account.
- Checkers: `scratch/check-site.js <siteDir>` (static), `scratch/browser-check.js` (playwright-cli run-code --filename).

## Next Steps

1. [x] Research, verification, site, checks
2. [ ] User review; possible next directions on site/12-next.html (bake-off, licence deep-dive, one real lesson, cross-lingual, hardware)
3. [x] Commit + push (done on user request)

## References

- `./memory-20261017-ai-voice-cloning-research/tracker.md` -- task tracker (resume point)
- `./memory-20261017-ai-voice-cloning-research/research-notes/` -- helper fact sheets
- `../../site/` -- deliverable
- `D:\git\scratches\2026.10\AI-video-generation-techniques\site\` -- sibling site whose shell pattern is reused

## Session selections

- Device mode: desktop (default, none set). Autonomous mode: off. Memory location: AI-voice-cloning.

---

**Confirmed at**: 2026-10-17 22:40 (UTC+8)
