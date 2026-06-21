# MerchantFix Free Check Operating Playbook

## Goal

Turn MerchantFix from a Chrome Web Store-dependent launch into a passive intake funnel:

`Instant free preview -> full-material Tally intake -> qualified issue -> $29 Launch Lite Snapshot`

The founder should act as operator and reviewer, not as a daily outbound marketer.

## Public Entry

Landing page:

`index.html`

Primary CTA:

`#instant-check`

Use the same Tally form as the full-material backup intake. Do not create a second form until the first 10 qualified submissions prove the flow.

## Tally Form Fields

Recommended fields:

- Email
- Store URL
- Product URL
- Merchant Center issue text or screenshot link
- Merchant Center issue screenshot upload
- Affected product URLs
- Consent checkbox:
  `I understand this is an independent public-page evidence review, not Google, not an appeal service, and does not control platform decisions.`

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

The public instant preview runs locally in the browser and does not submit data by itself. Tally stores full-material submissions only when the user clicks through and submits the form. The extension stores the active case locally in Chrome only. It does not upload Tally data, login to accounts, send emails, or submit appeals.

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

## Stop-Loss Rule

After 14 days:

- If 10+ qualified submissions and 1+ paid order: continue.
- If submissions exist but no paid orders: improve sample report and pricing language.
- If no qualified submissions: distribution, not product, is the bottleneck.

Do not build Radar, RAG, backend, or subscription features before at least 3 paid Snapshot orders.
