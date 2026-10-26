# Your voice, synthesised

A field guide, and a 24-minute lecture, on narrating lessons in **your own voice** in English and Mandarin.

The lecture is the way through. The site is the evidence: how the models work, which cloud and open-source tools an individual can actually use, how to record and check a course, and the legal and safety limits. Facts in the guide were checked on **17 October 2026**.

This is about your own voice, for teaching. It is not a guide to cloning anyone else.

## Watch and read

Open these now:

- [Lecture (24 min)](https://your-voice-synthesised-557d.surge.sh/lecture.html)
- [Field guide](https://your-voice-synthesised-557d.surge.sh/)

That copy is the `site/` folder, including the video. Surge sent a verification message to **raymond.shen@medavis.com**. Open it so the address stays up. The password was set from this publish; use “forgot password” on [surge.sh](https://surge.sh) if you want to manage the account.

The same pages work from a checkout, with no server and no build. Open `site/index.html` or `site/lecture.html`. The video is `site/media/lecture.mp4` (about 42 MB), with English captions in `site/media/lecture.vtt`.

GitHub Pages is set up to publish that same `site/` folder from `main` (`.github/workflows/pages.yml`). These addresses are the ones that workflow deploys to:

- [Lecture on GitHub Pages](https://connect-world-1985-ai.github.io/2026-10-17-ai-voice-cloning/lecture.html)
- [Field guide on GitHub Pages](https://connect-world-1985-ai.github.io/2026-10-17-ai-voice-cloning/)

GitHub does not let the Actions token create the Pages site. The workflow is on `main` and stops at that check until the source is GitHub Actions: repository **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then re-run **Deploy GitHub Pages**. After that, the github.io links above serve the lecture and the guide.

## What is where

| Path | What it is |
|---|---|
| `site/lecture.html` | The narrated lecture, with section jumps |
| `site/index.html` | Overview and how the guide labels evidence |
| `site/01-how-it-works.html` … `site/12-next.html` | The field guide |
| `site/glossary.html`, `site/sources.html` | Terms, method, and conflicts |
| `.github/workflows/pages.yml` | Publishes `site/` to GitHub Pages on every push to `main` |

The narration in the lecture is a stock neural voice, not a clone. The lecture says so at the start.
