# cv

Personal CV site. Plain HTML/CSS/JS, hosted on GitHub Pages. No build step, no framework, no bundler.

Live at **https://quph4.github.io/cv/**

## Local editing

Open `index.html` in a browser. That's it — edit, save, refresh. `Ctrl+P` gives you the print stylesheet.

## Files

- `index.html` — the whole page
- `styles/main.css` — screen styles (V2 Editorial Portal theme)
- `styles/print.css` — print / PDF overrides (single-column A4)
- `scripts/main.js` — language toggle, scroll-spy, year stamp
- `assets/` — photo + favicon
- `.github/workflows/deploy.yml` — publishes the repo root to GitHub Pages

## PDF

The Download PDF button in the header calls `window.print()`, which uses `print.css` to render an A4 version of the live page. One source of truth — no separate PDF artifact to keep in sync.

## Setup

1. Repo `cv` under `quph4` on GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main` → `deploy.yml` publishes automatically.
