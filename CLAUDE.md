# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for José Roberto García Correa (Robert0X) — a static, single-page site built with vanilla HTML/CSS/JS. **No build system, no dependencies, no package.json, no tests.** The three files that matter are `index.html`, `css/style.css`, and `js/main.js`.

**Deployment:** GitHub Pages serves the `main` branch at https://robert0x.github.io/portfolio/. Merging a PR into `main` deploys to production immediately.

## Commands

```powershell
# Preview locally (no build step — serve the folder and open the URL)
python -m http.server 8000   # → http://localhost:8000
```

There is no lint or test tooling. Verification is manual: load the page, toggle EN/ES, check mobile width, and scroll through all sections.

## Architecture

### Bilingual i18n (the most important convention)

Every user-visible text element carries `data-en` and `data-es` attributes; the element's content is the English default. `setLanguage()` in `js/main.js` swaps `textContent` (or `placeholder` for inputs/textareas) for all `[data-en][data-es]` elements. The choice persists in localStorage under `portfolio-lang` and falls back to browser language.

**When adding or editing ANY visible text: always provide both `data-en` and `data-es`.** Text without these attributes will not translate and will look broken in Spanish mode.

### JavaScript (`js/main.js`)

One IIFE with feature-init functions called from `init()`: typing animation (`typingStrings` has parallel EN/ES arrays — keep them in sync), language toggle, nav scroll state, mobile menu, smooth scroll, scroll-reveal, and active-nav highlighting.

**Scroll reveal gotcha:** `initScrollReveal()` selects a hard-coded list of CSS classes and adds the `reveal`/`visible` animation pair via IntersectionObserver. New components/sections must have their class added to that selector list or they won't animate in.

### CSS (`css/style.css`)

- Design tokens live in `:root` custom properties: colors (`--color-*`), spacing scale (`--space-xs` … `--space-5xl`), radii, fonts, `--container-max`. Use tokens, not hard-coded values.
- BEM-style naming: `block__element--modifier` (e.g. `.exp-card__title`, `.hero__link--accent`).
- Fonts: Plus Jakarta Sans (body) and JetBrains Mono via the `.mono` utility class for labels/numbers/handles.
- Sections alternate backgrounds with `section--alt`. Inserting a new section means re-checking the alternation of every section after it.

### Content sources

- `Contexto para la IA/` — CV in Markdown and Git workflow docs. This is the source of truth for biographical/achievement content; the site must stay consistent with the current CV (`CV_RobertGarcia_(Actual).md`).
- `assets/CV_RobertGarcia.pdf` — the downloadable CV linked from the hero.
- `Documentos para la clase/` — coursework, not part of the site.
- The contact form posts to formsubmit.co (no backend).

## Git Workflow

This repo deliberately follows GitHub Flow, documented in detail in `Contexto para la IA/DOCUMENTACION_GIT_PORTAFOLIO.md`:

- **Never commit directly to `main`** (it deploys to production). Create a branch with prefixes `feat/`, `fix/`, `chore/`, or `docs/`.
- Conventional Commits, written in English (e.g. `feat: add typing animation`).
- PRs via `gh pr create`, merged with `gh pr merge --merge --delete-branch`, then `git checkout main && git pull`.
