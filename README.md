# VUGA Publishing — Static Website

Static HTML rebuild of [vugapublishing.com](https://vugapublishing.com). Built for fast loading, strong SEO, and easy maintenance — no WordPress, no database, no plugins.

## Structure

```
.
├── index.html                      # Homepage
├── our-story.html                  # About page
├── catalog.html                    # Full book catalog
├── contact.html                    # Contact info + form
├── 404.html                        # Custom 404
├── sitemap.xml                     # SEO sitemap
├── robots.txt                      # Crawler directives
├── books/
│   ├── emma-luke.html              # Emma + Luke detail page
│   ├── how-trump-played-the-media.html
│   ├── law-firm-marketing-bible.html
│   ├── content-marketing-attorney-guide.html
│   └── story-arc-secrets.html
└── assets/
    ├── css/style.css               # Single stylesheet, all pages
    ├── js/main.js                  # Mobile menu + smooth scroll
    └── images/
        ├── brand/                  # Logo, favicon, hero
        ├── books/                  # Book cover art
        └── retailers/              # 19 retailer logos
```

## SEO features

- Per-page `<title>`, meta description, and canonical URL
- Open Graph + Twitter Card tags on every page
- Schema.org JSON-LD: `Organization`, `WebSite`, `Book`, `BreadcrumbList`, `CollectionPage`
- `sitemap.xml` with image annotations
- Semantic HTML5 (`<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>`)
- Alt text on all images
- Internal cross-linking between books and catalog
- Mobile-responsive, fast first paint (~2 KB JS, no external trackers)

## Local preview

Just open `index.html` in a browser, or serve with any static server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve

# PHP
php -S localhost:8080
```

## Deploy to GitHub Pages

1. Push the repo to GitHub
2. Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`
3. Custom domain: `vugapublishing.com` (add a `CNAME` file with the domain when ready)
4. Update DNS A records to point to GitHub Pages IPs

## Brand

- Colors: Black `#0a0a0a`, White, Signal Red `#dd3333`
- Type: Oswald (display) · Raleway (body) — Google Fonts
- Tone: independent, confident, author-first

## Contact

- Email: info@vugapublishing.com
- Phone: 1 (833) 900-8842
- Partner companies: [VUGA Media Group](https://vugamediagroup.com), [VUGA Enterprises](https://vugaenterprises.com)

© 2026 VUGA Publishing. All Rights Reserved.
