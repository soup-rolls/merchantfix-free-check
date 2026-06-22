# MerchantFix Free Check Operating Playbook

## Goal

Turn MerchantFix from a Chrome Web Store-dependent launch into a passive intake funnel:

`Instant free preview -> full-material Tally intake -> qualified issue -> $29 Launch Lite Snapshot`

The founder should act as operator and reviewer, not as a daily outbound marketer.

Public boundary:

- Independent public-page evidence review.
- Not Google and not a platform partner.
- No account login, admin access, appeal submission, or promised platform decision.

## Public Entry

Landing page:

`index.html`

Primary CTA:

`#instant-check`

Use the same Tally form as the full-material backup intake. Do not create a second form until the first 10 qualified submissions prove the flow.

If the local Chrome extension is unavailable or not released yet, continue manually:

1. Open the Tally submission.
2. Open the store URL and affected product URL in a normal browser tab.
3. Check the six visible signals manually: contact, shipping, returns/refund, price/currency, availability, business identity.
4. Use the reply templates below.

The extension is a speed tool, not a launch blocker.

## Paid-Link Flow

Use this order until the first 3 paid orders:

1. User runs the instant free preview.
2. User submits full public-page materials through Tally.
3. Operator rejects unsafe or unqualified cases before requesting payment.
4. Qualified users receive or see the $29 Launch Lite Snapshot payment link.
5. Payment success redirects to `thank-you.html`.
6. Delivery target starts after qualified paid intake, not after a vague page visit.

Current public paid-scope page:

`checkout.html`

Payment placeholder marker:

`PAYMENT_LINK_PLACEHOLDER`

Do not publish a fake payment URL. Replace the placeholder only with the real provider checkout link.

## Tally Form Fields

Recommended fields:

- Email
- Store URL
- Product URL
- Merchant Center issue text or screenshot link
- Merchant Center issue screenshot upload
- Affected product URLs
- Privacy policy link: `https://soup-rolls.github.io/merchantfix-free-check/privacy.html`
- Terms link: `https://soup-rolls.github.io/merchantfix-free-check/terms.html`
- Paid scope link: `https://soup-rolls.github.io/merchantfix-free-check/checkout.html`
- Consent checkbox:
  `I understand this is an independent public-page evidence review, not Google, not an appeal service, and does not control platform decisions. I will not upload passwords, cookies, payment data, or customer data.`

## Daily Operator Loop

Run once per day, not all day. The public page now gives users an instant client-side preview. Use Tally and the local Chrome extension only for cases that submit full materials:

1. Review instant-check leads that continue into Tally full-material intake.
2. Open one Tally submission detail page.
3. Click the extension button `Capture Tally submission`.
4. Click `Open product URL`.
5. On the product page, click `Check current page`.
6. Click `Copy triage reply`.
7. Paste the copied reply into email and send after a quick human read.

Target time:

- Free triage: 5-8 minutes per qualified submission.
- Paid Launch Lite Snapshot: 35-60 minutes per order.

Reply SLA:

- Qualified free triage: first reply target within 1 business day.
- Paid Launch Lite Snapshot: delivery target within 48h after qualified paid intake.
- If the case is not qualified, reply with the no-clear-issue template instead of selling paid review.

The public instant preview runs locally in the browser and does not submit data by itself. Tally stores full-material submissions only when the user clicks through and submits the form. The extension stores the active case locally in Chrome only. It does not upload Tally data, login to accounts, send emails, or submit appeals.

Send replies from the same public contact mailbox listed on the site. Do not switch between random personal inboxes.

## Free Triage Response

Subject:

`Your public-page evidence check`

Body:

```text
Hi,

I ran a quick public-page evidence check on the URL you submitted.

This is not a platform decision and does not require account login. It only checks visible public-page signals.

Quick result:
- Contact/support: [found / weak / not found]
- Shipping policy: [found / weak / not found]
- Returns/refund policy: [found / weak / not found]
- Price/currency signal: [found / weak / not found]
- Availability/purchase signal: [found / weak / not found]
- Business identity signal: [found / weak / not found]

If you want a page-by-page Launch Lite Snapshot, I can review the submitted URL, issue context, and affected product pages manually.

Launch Lite Snapshot: $29
Includes: 1-2 page evidence brief, delivered in 48h after qualified intake, one clarification reply.

This is early validation pricing for qualified stores. The Standard Snapshot returns to $49 after launch validation.

No account login, no appeal submission, no promised platform decision.
```

## No Clear Issue Response

```text
Hi,

I ran a quick public-page evidence check on the submitted URL.

I did not find an obvious public-page evidence gap in the quick scan. This does not mean any platform has made a positive decision; it only means the visible page signals did not show a clear issue in this pass.

If you have a specific Merchant Center issue screenshot or affected product URL, reply with that context and I can re-check the exact page.
```

## Paid Snapshot Scope

Only accept $29 Launch Lite Snapshot orders when the user provides:

- Store URL
- At least one affected product URL
- Merchant Center issue screenshot or issue text
- Consent to the independent-review boundary

Do not accept:

- Passwords
- 2FA codes
- Admin invites
- Customer exports
- Payment information
- Requests to submit appeals
- Requests to promise platform outcomes

## Refund and Complaint Path

Use this policy for payment links and reply templates:

- If the user pays but the case is rejected before work starts, refund the order.
- If the user cancels before the evidence brief draft has started, refund the order.
- If the brief has already been delivered, review complaints case by case. Offer clarification first; refund only when the delivered brief clearly misses the paid scope.
- Acknowledge refund or complaint requests within 2 business days.
- Never promise that a refund depends on platform outcome.

## Data Retention

Keep the data footprint short:

- The instant preview input stays in the browser unless the user submits the Tally form.
- Tally submissions and working copies are kept only for review, delivery, billing, and dispute handling.
- Delete or anonymize non-essential working copies within 90 days after delivery.
- Delete rejected spam or unsafe submissions immediately.
- If a user asks for deletion, remove non-essential copies where legally possible and confirm by email.

Screenshot handling:

- Accept PNG, JPG, or PDF screenshots only.
- Ask users to redact customer names, order IDs, payment data, cookies, and account tokens.
- Do not store or forward screenshots that include passwords, 2FA codes, customer exports, or payment details.

## Tracking and Monitoring

For the first paid-link launch:

- Use Tally query parameters (`source`, `utm_source`, `utm_campaign`) as the minimum conversion tracking layer.
- Record daily counts manually: page visits if available, free previews, Tally submissions, qualified cases, paid orders, refunds.
- Add external uptime monitoring after the first paid order. Monitor `https://soup-rolls.github.io/merchantfix-free-check/` and `https://soup-rolls.github.io/merchantfix-free-check/health.txt`.
- Do not add invasive analytics before the privacy policy and consent language are updated.

## Stop-Loss Rule

After 14 days:

- If 10+ qualified submissions and 1+ paid order: continue.
- If submissions exist but no paid orders: improve sample report and pricing language.
- If no qualified submissions: distribution, not product, is the bottleneck.

Do not build Radar, RAG, backend, or subscription features before at least 3 paid Snapshot orders.
