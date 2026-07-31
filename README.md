# Thesis — Marketing Site

Marketing landing page for the Thesis AI Stock Research app.
Hosted on Vercel: https://aistockresearch.vercel.app

## Structure

```
stockresearch/
├── index.html       # Main landing page
├── style.css        # All styles
├── script.js        # Animations & interactivity
├── assets/
│   └── favicon.svg  # App icon
└── README.md
```

## Deploy to Vercel

```
vercel link      # first time only
vercel deploy --prod
```

Static site, no build step required.

## Before publishing

- Replace `#` href values in the store buttons with real App Store / Google Play URLs
- Update the `og:image` meta tag with a real screenshot
- Update the canonical URL in `<head>`
- Update the footer email/links
