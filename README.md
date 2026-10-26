# Your voice, synthesised

A field guide, and two lectures, on narrating lessons in **your own voice** in English and Mandarin.

中文版在同一份站点里：旁白、字幕和页面都是中文。[中文讲座（31 分钟）](https://your-voice-synthesised-557d.surge.sh/zh/lecture.html) · [中文指南](https://your-voice-synthesised-557d.surge.sh/zh/)

The lectures are the way through. The site is the evidence: how the models work, which cloud and open-source tools an individual can actually use, how to record and check a course, and the legal and safety limits. Facts in the guide were checked on **17 October 2026**.

This is about your own voice, for teaching. It is not a guide to cloning anyone else.

## Watch and read

Open these now:

- [English lecture (24 min)](https://your-voice-synthesised-557d.surge.sh/lecture.html)
- [English field guide](https://your-voice-synthesised-557d.surge.sh/)
- [中文讲座（31 分钟）](https://your-voice-synthesised-557d.surge.sh/zh/lecture.html)
- [中文指南](https://your-voice-synthesised-557d.surge.sh/zh/)

That copy is the `site/` folder, including both videos. Surge sent a verification message to **raymond.shen@medavis.com**. Open it so the address stays up. The password was set from this publish; use “forgot password” on [surge.sh](https://surge.sh) if you want to manage the account.

The same pages work from a checkout, with no server and no build.

- English: `site/index.html`, `site/lecture.html`. Video `site/media/lecture.mp4` (about 42 MB), captions `site/media/lecture.vtt`.
- 中文：`site/zh/index.html`，`site/zh/lecture.html`。视频 `site/media/lecture-zh.mp4`（约 51 MB，31 分钟），字幕 `site/media/lecture-zh.vtt`。

The top bar switches language. English stays in place; Chinese is the parallel tree under `site/zh/`.

GitHub Pages is set up to publish that same `site/` folder from `main` (`.github/workflows/pages.yml`). These addresses are the ones that workflow deploys to:

- [English lecture on GitHub Pages](https://connect-world-1985-ai.github.io/2026-10-17-ai-voice-cloning/lecture.html)
- [English field guide on GitHub Pages](https://connect-world-1985-ai.github.io/2026-10-17-ai-voice-cloning/)
- [中文讲座](https://connect-world-1985-ai.github.io/2026-10-17-ai-voice-cloning/zh/lecture.html)
- [中文指南](https://connect-world-1985-ai.github.io/2026-10-17-ai-voice-cloning/zh/)

GitHub does not let the Actions token create the Pages site. The workflow is on `main` and stops at that check until the source is GitHub Actions: repository **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then re-run **Deploy GitHub Pages**. After that, the github.io links above serve both lectures and both guides. Until that setting is on, use the Surge links.

## What is where

| Path | What it is |
|---|---|
| `site/lecture.html` | English lecture, stock voice, with section jumps |
| `site/zh/lecture.html` | 中文讲座，库存语音，带章节跳转和中文字幕 |
| `site/index.html`, `site/zh/index.html` | Overview in each language |
| `site/01-how-it-works.html` … `site/12-next.html` | English field guide |
| `site/zh/` | The same pages in Chinese, including the sortable tool table |
| `site/glossary.html`, `site/sources.html` | Terms, method, and conflicts |
| `.github/workflows/pages.yml` | Publishes `site/` to GitHub Pages on every push to `main` |

Both narrations are stock neural voices, not clones. English is `en-US-AndrewNeural`. Chinese is `zh-CN-YunyangNeural`. Each lecture says so at the start.
