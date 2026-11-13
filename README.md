# Heart of the City Development Center — website draft

# Live site - [Mackmusial](https://mackmusial.github.io/HOTC-Project/)
Plain HTML/CSS/JS. No build step. Open `index.html` in a browser to preview.
Project background is in `context.md`.

## Layout
- `index.html`, `adult-programming.html`, `youth-families.html`, `about.html`, `get-involved.html`, `contact.html`
- `css/styles.css`: all styles. Brand colors are variables at the top. Adult pages turn red through `data-section="adult"` on `<body>`.
- `js/main.js`: the header, footer and newsletter band (edit once, all pages update), the Key Focus tabs, and the forms.
- `assets/logo/`, `assets/img/`: web-sized logo and photos. Originals are in `Sources/` (not needed on the live site).
- `apps-script/Code.gs`: contact form backend, not deployed yet.

## Publish to GitHub Pages
Push this folder to a GitHub repo, then Settings > Pages > Deploy from branch > `main` / root.

## Finding what's unfinished
- Search for `[PLACEHOLDER` to find content still needed from the client or the old site.
- Search for `draft-tag` to find wording written by us that the client should review.
- Search for `TODO(` to find the form hookup.
