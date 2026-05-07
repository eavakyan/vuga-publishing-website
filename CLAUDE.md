# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static HTML rebuild of vugapublishing.com — marketing site for VUGA Publishing. **No build step, no framework, no dependencies, no package manager.** Edit HTML/CSS/JS directly; commit; deploy.

Production URL: `https://vugapublishing.com`. Deployed via GitHub Pages from `main` / root.

## Local preview

```bash
python3 -m http.server 8080      # then open http://localhost:8080
# or: npx serve  /  php -S localhost:8080
```

There are no tests, no linter, and no build commands — opening the file in a browser is the QA loop.

## Architecture

Top-level pages live at the repo root (`index.html`, `catalog.html`, `for-authors.html`, `our-story.html`, `network.html`, `contact.html`, `terms.html`, `404.html`). Per-book detail pages live under `books/`. All pages share `assets/css/style.css` (single stylesheet) and `assets/js/main.js` (~25 lines: mobile menu toggle + smooth-scroll offset for sticky header — that's the entire interaction layer).

Each page is self-contained: it inlines its own `<head>` SEO metadata (title, description, canonical, Open Graph, Twitter Card) and its own Schema.org JSON-LD `@graph`. There is no shared header/footer template — header and footer markup is duplicated across pages. **When changing nav, footer, or brand elements, update every HTML file.** Use `grep -l` to find them all.

`.nojekyll` is present at the root, which disables GitHub Pages' Jekyll processor — files are served verbatim. Do not remove it.

## Adding a new book (the most common task)

A new book requires **four** coordinated edits, all manual:

1. Drop the cover image in `assets/images/books/`.
2. Create `books/<slug>.html` — copy an existing book page (e.g. `books/emma-luke.html`) and update title, meta tags, canonical URL, JSON-LD `Book` schema, and body content.
3. Add a card linking to it in `catalog.html` (and on `index.html` if it's a featured title).
4. Add a `<url>` entry to `sitemap.xml`, including an `<image:image>` block with the cover.

Forgetting step 4 is the most common drift — the sitemap currently lacks entries for some pages that exist on disk; treat sitemap parity as part of "done."

## SEO is load-bearing

This site's whole job is ranking and looking right when shared. Every page must have:

- Per-page `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Open Graph (`og:title`, `og:description`, `og:url`, `og:image`) + Twitter Card tags
- Schema.org JSON-LD: `Organization` + `WebSite` everywhere; `Book` on book pages; `BreadcrumbList` on nested pages; `CollectionPage` on `catalog.html`
- Real `alt` text on all `<img>` tags

When editing any page, sanity-check that canonical URL and JSON-LD URLs match the page's actual path.

## Brand constants

- Colors: Black `#0a0a0a`, White, Signal Red `#dd3333`
- Type: Oswald (display) · Raleway (body) — loaded from Google Fonts in each page's `<head>`
- Voice: independent, confident, author-first

## Deploy

GitHub Pages serves from `main` branch root. To ship: commit, push to `origin main`, GitHub Pages picks it up automatically. The commit history convention is `Deploy YYYY-MM-DD HH:MM`.

For the custom domain, a `CNAME` file at the root containing `vugapublishing.com` is required (not currently present — add when wiring DNS).

## Conventions specific to this repo

- Don't introduce a build step, framework, bundler, or npm dependency without explicit approval — the zero-dependency property is intentional (fast first paint, ~2 KB JS, no trackers).
- Don't duplicate `style.css` per page; keep it as one stylesheet.
- Asset paths are relative (e.g. `assets/images/...`) so the site works under any base path; preserve this — don't switch to root-absolute paths.
