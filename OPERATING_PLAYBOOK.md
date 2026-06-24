# MerchantFix Free Check Operating Playbook

## Goal

Turn MerchantFix from a Chrome Web Store-dependent launch into a passive intake funnel:

`Instant free preview -> full-material Tally intake -> qualified issue -> $29 Evidence Snapshot or $99 Evidence Fix Pack`

The founder should act as operator and reviewer, not as a daily outbound marketer.

Public boundary:

- Independent public-page evidence review.
- Not Google and not a platform partner.
- No account login, admin access, appeal submission, or promised platform decision.

## Path Decision

Current launch path:

`public website -> indexed error pages -> free preview -> Tally intake -> paid digital evidence brief`

This path is not weaker than the Chrome extension path for first revenue. The Chrome extension is a useful acquisition and trust asset, but it depends on store review, install friction, and extension distribution. The public website path is easier to explain to payment providers because it sells a defined digital service with a visible sample, terms, intake record, and email delivery record.

Use the extension later as an additional entry point. Do not make it a launch blocker.

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
4. Qualified users receive or see the $29 Evidence Snapshot or $99 Evidence Fix Pack payment link.
5. Payment success redirects to `thank-you.html`.
6. Delivery target starts after qualified paid intake, not after a vague page visit.

Current public paid-scope page:

`checkout.html`

Payment placeholder marker:

`PAYMENT_LINK_PLACEHOLDER`

Do not publish a fake payment URL. Replace the placeholder only with the real provider checkout link.

Public sample deliverable:

`sample-report.html`

Use this page when a payment provider, buyer, or support reviewer asks what the digital service delivers.

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
- Paid $29 Evidence Snapshot: 35-60 minutes per order.
- Paid $99 Evidence Fix Pack: 90-150 minutes per order.

Reply SLA:

- Qualified free triage: first reply target within 1 business day.
- Paid $29 Evidence Snapshot: delivery target within 48h after qualified paid intake.
- Paid $99 Evidence Fix Pack: delivery target within 72h after qualified paid intake.
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

If you want a page-by-page Evidence Snapshot, I can review the submitted URL, issue context, and affected product pages manually.

Evidence Snapshot: $29
Includes: 1-2 page evidence brief, 3-5 priority findings, one suggested response paragraph, delivered in 48h after qualified intake, one clarification reply.

Evidence Fix Pack: $99
Includes: Snapshot scope plus page-by-page edit checklist, policy-link map, before/after copy blocks, one revised response draft, delivered in 72h after qualified intake.

The $29 Snapshot can be credited toward the $99 Fix Pack within 7 days if the case needs broader cleanup.

No account login, no appeal submission, no promised platform decision.
```

## No Clear Issue Response

```text
Hi,

I ran a quick public-page evidence check on the submitted URL.

I did not find an obvious public-page evidence gap in the quick scan. This does not mean any platform has made a positive decision; it only means the visible page signals did not show a clear issue in this pass.

If you have a specific Merchant Center issue screenshot or affected product URL, reply with that context and I can re-check the exact page.
```

## Paid Product Scope

Only accept paid orders when the user provides:

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

### $29 Evidence Snapshot

Accept when the user has one clear issue path:

- Misrepresentation or suspicious store evidence
- Untrusted store evidence
- Price or availability mismatch
- Missing or weak return/refund policy
- Missing or weak contact/support evidence
- Missing GTIN or identifier evidence

Deliver:

- 1-2 page evidence brief
- 3-5 priority findings
- Severity labels: blocker, important, cleanup
- Public URLs checked
- One suggested response paragraph
- One clarification reply

Do not include:

- Full policy rewriting
- Multiple response drafts
- Feed repair
- Store theme editing
- Appeal submission
- Account login

### $99 Evidence Fix Pack

Accept when the submitted materials show multiple public-page gaps or the buyer wants a fuller repair checklist.

Deliver:

- Everything in the $29 Snapshot
- Page-by-page edit checklist
- Policy-link map across homepage, product page, footer, contact, shipping, returns/refund, privacy, terms
- Before/after copy blocks for the visible gaps
- One revised response draft
- One follow-up clarification reply

Do not include:

- Backend implementation
- Shopify admin access
- Feed upload
- Legal review
- Guaranteed platform result

### Triage Decision Rule

Use this rule before sending a payment link:

- If no issue text or screenshot: ask for issue context first.
- If no affected product URL: ask for one product URL first.
- If the gap is one narrow issue: offer $29 Snapshot.
- If the gap spans policies, contact, price, and product pages: offer $99 Fix Pack.
- If the request requires login, appeal submission, or promised recovery: reject politely.

## Payment Review Evidence Pack

Keep these materials ready for PayPal or any payment-provider review:

- Public service page: `https://soup-rolls.github.io/merchantfix-free-check/checkout.html`
- Sample deliverable: `https://soup-rolls.github.io/merchantfix-free-check/sample-report.html`
- Terms: `https://soup-rolls.github.io/merchantfix-free-check/terms.html`
- Privacy policy: `https://soup-rolls.github.io/merchantfix-free-check/privacy.html`
- Intake form URL and one redacted sample submission.
- One redacted sample evidence brief.
- Proof that no account login, passwords, cookies, customer exports, or admin access are requested.
- Delivery evidence for each paid order: buyer email, payment ID, report file, sent-email timestamp, and any clarification reply.

Short explanation for payment review:

```text
MerchantFix sells a digital public-page evidence brief for ecommerce sellers preparing Merchant Center materials. The service reviews only public storefront pages and buyer-submitted screenshots or issue text. It does not require account login, does not access private dashboards, does not submit appeals, and does not promise platform outcomes. Paid reports are delivered by email within the stated delivery target after qualified intake.
```

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

Do not build Radar, RAG, backend, or subscription features before at least 3 paid Snapshot or Fix Pack orders.

## Delivery Templates

### $29 Evidence Snapshot Outline

```text
Subject: MerchantFix Evidence Snapshot - [store/domain]

Scope:
- Store URL:
- Affected product URL:
- Issue path:
- Materials reviewed:

Summary:
- Overall readiness: [low / medium / high]
- Primary blocker:
- Secondary gaps:

Findings:
1. [Blocker / Important / Cleanup] [Finding title]
   Evidence observed:
   Public URL checked:
   Why it matters:
   Suggested action:

2. ...

Suggested response paragraph:
[Neutral paragraph the seller can adapt. No outcome-promise language.]

Boundary:
This review used only public pages and buyer-submitted context. It does not include account login, appeal submission, legal advice, or a promised platform decision.
```

### $99 Evidence Fix Pack Outline

```text
Subject: MerchantFix Evidence Fix Pack - [store/domain]

Scope:
- Store URL:
- Issue paths:
- Product URLs:
- Policy URLs:

Executive read:
- Main risk cluster:
- Fastest cleanup order:
- Pages requiring edits:

Page-by-page checklist:
- Homepage:
- Product page:
- Contact/support:
- Shipping policy:
- Return/refund policy:
- Privacy/terms:

Before/after copy blocks:
1. [Page/section]
   Before:
   After:

Policy-link map:
- Product page -> [links present/missing]
- Footer -> [links present/missing]
- Contact path -> [links present/missing]

Revised response draft:
[Neutral draft for the seller to adapt.]

Boundary:
This is a public-page evidence pack only. MerchantFix does not log in, edit the store, submit appeals, or promise any platform outcome.
```
