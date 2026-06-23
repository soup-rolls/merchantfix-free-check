# Deploy Notes

## Fastest Public Hosting Options

Use any static host. No backend is required.

Live URL:

`https://soup-rolls.github.io/merchantfix-free-check/`

GitHub repository:

`https://github.com/soup-rolls/merchantfix-free-check`

Recommended order:

1. Netlify Drop
2. Cloudflare Pages
3. Vercel static project
4. GitHub Pages

## Files To Upload

Upload the full folder:

`merchantfix-free-check`

Required files:

- `index.html`
- `assets/merchantfix-icon.png`
- `assets/merchantfix-og.png`
- `favicon.ico`
- `privacy.html`
- `terms.html`
- `checkout.html`
- `thank-you.html`
- `sample-report.html`
- `contact.html`
- `404.html`
- `health.txt`

`index.html` now includes the landing page CSS inline as the single source of truth. The duplicate `styles.css` file was removed to avoid split maintenance.

## After Deploy

Replace or reuse these links:

- Primary intake: `https://tally.so/r/EkA01B?source=instant_check`
- Checkout intake: `https://tally.so/r/EkA01B?source=checkout`
- Footer intake: `https://tally.so/r/EkA01B?source=footer`
- Category intake: `https://tally.so/r/EkA01B?source=<category-slug>`

Payment link setup:

- Keep `checkout.html` live before payment setup so users can review paid scope.
- When the real payment URL exists, replace the `PAYMENT_LINK_PLACEHOLDER` note in `checkout.html` with the provider checkout link.
- Use `thank-you.html` as the future payment success redirect page.
- Keep `sample-report.html` public as service evidence for payment review and buyer trust.
- Do not add a fake or test payment link to the public page.

Use a custom domain before paid traffic or larger partner outreach. GitHub Pages is acceptable for validation, but a domain such as `merchantfix.ai` or `merchantfix.co` will reduce payment-page trust friction.

Set a free uptime monitor after the first paid order:

- Home: `https://soup-rolls.github.io/merchantfix-free-check/`
- Health: `https://soup-rolls.github.io/merchantfix-free-check/health.txt`
- Sitemap: `https://soup-rolls.github.io/merchantfix-free-check/sitemap.xml`

## Suggested Public URL Slug

`/free-gmc-page-check`

## What This Page Is For

This page is not a heavy marketing campaign. It is a passive intake surface:

`visitor -> instant free preview -> optional full-material Tally intake -> paid-scope check -> optional $29 Launch Lite Snapshot`

Do not add blog, dashboard, pricing table, login, or automation features before the first paid Snapshot order.
