# HSS Philippines — website

Static website for **HSS — Hindu Swayamsevak Sangh, Philippines** · *Sanskar, Seva and Sanghatan*.
No build step, no dependencies — plain HTML/CSS/JS.

**🌐 Live:** https://hss-philippines.netlify.app
**Netlify admin:** https://app.netlify.com/projects/hss-philippines
This folder is linked to that Netlify project (`.netlify/state.json`), so `netlify deploy --prod` redeploys it.

## Structure

```
index.html          Home
about.html          About HSS
activities.html     The shakha & our practice
events.html         Events & festivals
get-involved.html   Ways to take part (Netlify interest form)
gallery.html        Photo gallery (placeholder tiles until real photos exist)
news.html           News & updates (dated timeline)
resources.html      FAQ, downloads, glossary, links
donate.html         Support our work
contact.html        Contact (Netlify contact form)
404.html            Branded not-found page
css/styles.css      Design system — "Aruṇodaya" saffron/bhagwa dawn theme
js/main.js          Nav, scroll-reveal, forms UX
assets/             Favicon, icons, OG image (SVG + rasterised PNG)
netlify.toml        Publish dir + security headers + caching
sitemap.xml, robots.txt, site.webmanifest
```

## Deploy / redeploy

**Continuous deployment (GitHub → Netlify):** every push to `main` triggers `.github/workflows/deploy.yml`, which deploys the site to Netlify production. Just commit and push:
```bash
git add -A && git commit -m "Update content" && git push
```
CD requires two repo secrets (Settings → Secrets and variables → Actions): `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.

**Manual deploy** (optional, the folder is also linked):
```bash
netlify deploy --dir . --prod
```
(First time on a new machine: `npm i -g netlify-cli && netlify login`.)

### Forms
`get-involved.html` (form `interest`) and `contact.html` (form `contact`) use **Netlify Forms** (`data-netlify="true"` + honeypot). Both are **detected and active** — submissions appear under *Site → Forms* in the Netlify dashboard. Set up a notification email there (Site configuration → Forms → Form notifications) to receive them.

> Note: this site has `ignore_html_forms` **off** and `pretty_urls` **off** in Netlify's processing settings (so `.html` URLs are served directly, matching the canonical tags). If you clone to a new Netlify site, re-apply those, or forms won't be detected.

## Before you go live — fill these in

The site is deliberately honest that the HSS Philippines community is **new and forming**. Every location/contact detail is a marked placeholder. Search the project for `PLACEHOLDER` to find them all:

```bash
grep -rn "PLACEHOLDER" .
```

Key items to supply:
- **Domain** — canonical/OG tags, `sitemap.xml` and `robots.txt` currently use the live `https://hss-philippines.netlify.app`. If you add a custom domain in Netlify, find/replace that with the new domain and redeploy, then submit the sitemap to Google Search Console.
- **Contact** — email, phone/WhatsApp, social handles (contact.html, footer).
- **Local coordinator / karyakarta** name(s) and city.
- **Shakha details** — cities, venue, day & time — *only once a real weekly shakha exists*.
- **Registration & giving channels** — legal entity / SEC status, bank/GCash — *only once verified* (donate.html).
- **Photos** — real, consented photos for the gallery, hero and news.
- **Event dates** — specific dates/venues for events.html and news.html.

Do **not** invent any of the above — the copy is written to stay accurate until real details are added.

## Content notes (why the copy is worded carefully)

- HSS PH is presented as a forming community, not an established registered chapter (no standing weekly shakha yet).
- Real, corroborated 2026 activity referenced: volunteers supporting *Chant Mahaveer* (Manila) and *International Day of Yoga* (Makati).
- "Sanskar, Seva, Sanghatan" are described as **core values** (HSS's own framing), not a "motto".
- HSS is described as **strictly non-political**; global reach as **roughly 40+ countries**.
- Other Hindu/Indian community bodies (temples, ISKCON, Ramakrishna Mission, etc.) are independent — referenced only as context, never as affiliates.

## Design

- **Theme "Aruṇodaya"** (dawn) — saffron/bhagwa `#EF8A2B`, deep maroon `#641A12`, temple gold `#C79A3B`, warm cream `#FCF6EA`.
- **Type** — Marcellus (display), Mukta (body), Tiro Devanagari Sanskrit (shlokas), via Google Fonts.
- **Signature** — the Bhagwa Dhwaj rendered as a rising flame; a dawn gradient runs through heroes and CTAs.
- Responsive, keyboard-accessible, `prefers-reduced-motion` respected.

To preview locally, run any static server from this folder, e.g. `python3 -m http.server` then open http://localhost:8000.
