# cv

Personal CV site. Plain HTML/CSS/JS, hosted on GitHub Pages, PDF generated in CI.

- Live: https://quph4.github.io/cv/
- PDF: https://quph4.github.io/cv/cv.pdf

## Local editing

Just open `index.html` in a browser. No build step, no `npm install` needed for normal edits.

## How it works

- `index.html` — the whole page.
- `styles/main.css` — screen styles.
- `styles/print.css` — applies in print/PDF (single-column A4, no buttons).
- `scripts/main.js` — theme toggle + current-year stamp.
- `.github/workflows/build-pdf.yml` — on push, renders the page to `cv.pdf` via Puppeteer and commits it back.
- `.github/workflows/deploy.yml` — publishes the repo root to GitHub Pages.

## One-time setup

1. Create a repo named `cv` under `quph4` on GitHub.
2. Push this directory as `main`.
3. In the repo → Settings → Pages → Source: **GitHub Actions**.
4. First push triggers both workflows. PDF appears after the first build.

## Verification

- Local: open `index.html`, hit `Ctrl+P` → print preview should be clean A4.
- Live: visit the URL above, click Download PDF.
- Lighthouse: run in DevTools, aim for 95+ everywhere.
