# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for José Roberto García Correa (Robert0X) — a static, single-page site built with vanilla HTML/CSS/JS. **No build system, no dependencies, no package.json, no tests.** The three files that matter are `index.html`, `css/style.css`, and `js/main.js`. The design system is "F-Definitivo" (spec: `docs/superpowers/specs/2026-06-10-redesign-f-definitivo-design.md`).

**Deployment:** GitHub Pages serves the `main` branch at https://robert0x.github.io/portfolio/. Merging a PR into `main` deploys to production immediately.

## Commands

```powershell
# Preview locally (no build step — serve the folder and open the URL)
python -m http.server 8000   # → http://localhost:8000

# Quality gates (used before every merge)
html-validate index.html 404.html        # must report 0 errors
lighthouse http://localhost:8000 --view  # A11y/BP/SEO must stay 100
```

Verification is otherwise manual: load the page, toggle EN/ES and ☾/☀, check mobile width, and scroll through all sections. Note: the browser caches main.js aggressively under `python -m http.server` — hard-reload (Ctrl+Shift+R) or serve on a fresh port after JS changes.

## Architecture

### Bilingual i18n (the most important convention)

Every user-visible text element carries `data-en` and `data-es` attributes; the element's content is the English default. `setLanguage()` in `js/main.js` swaps `textContent` (or `placeholder` for inputs/textareas) for all `[data-en][data-es]` elements. The choice persists in localStorage under `portfolio-lang` and falls back to browser language.

**Two hard rules:**
1. When adding or editing ANY visible text, always provide both `data-en` and `data-es`.
2. **Never put `data-en`/`data-es` on an element that has child elements** — the `textContent` swap destroys children. Put the attributes on the innermost text-bearing element instead (see the Teaching bento cell: the attributes live on the inner `<small>`, not the parent `.cell__v`).

### Theme system (dark mode)

- `data-theme="light|dark"` on `<html>`; tokens flip in `css/style.css` under `[data-theme="dark"]`.
- An inline **anti-flash script** in `<head>` sets `data-theme` and the `theme-color` meta before first paint (its two hex values mirror the `--paper` tokens — keep them in sync).
- `applyTheme(theme, persist)` in main.js: **only an explicit toggle click persists** to localStorage `portfolio-theme`; OS-derived themes keep following the OS (there's a `prefers-color-scheme` change listener).
- `404.html` is standalone by design: it mirrors token values inline and reads `portfolio-theme` with its own tiny script.
- Text on blue surfaces uses the `--on-accent` token (white in light, near-black in dark for AA contrast).

### JavaScript (`js/main.js`)

One IIFE with helpers (`storeGet`/`storeSet`/`prefersReducedMotion`) and feature-inits called from `init()`: theme manager, language toggle, count-up counters, scroll reveal, mobile menu, delegated smooth scroll, and active-nav highlighting.

- **Scroll reveal:** elements opt in with a `data-reveal` attribute. The CSS only hides them under `html.reveal-ready`, a class added by JS — so content stays visible if JS is disabled or fails. Don't hide content with CSS alone.
- **Counters:** `[data-count]` spans animate from 0, but the final value is written in the HTML — the animation is an enhancement, never the source of the number.
- All animation honors `prefers-reduced-motion` (JS guards + a global CSS override block).

### CSS (`css/style.css`)

- Design tokens live in `:root` / `[data-theme="dark"]`: `--paper`, `--ink(-2,-3)`, `--rule`, `--blue`, `--blue-soft`, `--on-accent`, `--green`, `--shadow`, fonts, `--ease`. Use tokens, not hard-coded values (exception: the `.ui-nb` "paper sheet" illustration is intentionally literal).
- Fonts: Familjen Grotesk (display, weights 600/700 only), Instrument Sans (body, 400/600), JetBrains Mono (metadata, 400/500). The Google Fonts URL appears 3× in `<head>` (preload + async stylesheet + noscript) — **update all three together** and never request weights the CSS doesn't use.
- BEM-style naming (`.proj__name`, `.cell--2w`). Breakpoint tiers: 900px tablet, 600px phone (hero photo stacks), 520px compact.
- `color-mix()` declarations keep a plain fallback line above them for older browsers.

### Content sources

- `Contexto para la IA/` — CV in Markdown (source of truth for biographical content), improvement plan, reference analysis, repo-update prompts.
- `assets/CV_RobertGarcia.pdf` — the downloadable CV (nav button + JSON-LD).
- `assets/brand/` — HTML templates used to render `og-image.png` and the favicon set with Playwright (re-render if the identity changes; sizes documented inside the files).
- `design-mockups/` — design-process artifacts (not linked from the site).
- The contact form posts to formsubmit.co (no backend).

## Git Workflow

This repo deliberately follows GitHub Flow, documented in detail in `Contexto para la IA/DOCUMENTACION_GIT_PORTAFOLIO.md`:

- **Never commit directly to `main`** (it deploys to production). Create a branch with prefixes `feat/`, `fix/`, `chore/`, or `docs/`.
- Conventional Commits, written in English (e.g. `feat: add typing animation`).
- PRs via `gh pr create`, merged with `gh pr merge --merge --delete-branch`, then `git checkout main && git pull`.
