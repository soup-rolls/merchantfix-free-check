# Tally Form Copy

Use this to update the existing Tally form. This form is now the full-material intake after the instant free preview, not the first user action:

`https://tally.so/r/EkA01B`

## Form Title

`Free Public-Page Evidence Check`

## Form Description

```text
Submit full public-page evidence after your instant free preview. We only review visible public pages.

No account login. No admin access. No appeal submission. This independent check does not control platform decisions.

Privacy policy: https://soup-rolls.github.io/merchantfix-free-check/privacy.html
Terms: https://soup-rolls.github.io/merchantfix-free-check/terms.html
Paid scope: https://soup-rolls.github.io/merchantfix-free-check/checkout.html
Qualified free-triage replies target 1 business day. Paid Launch Evidence Snapshot delivery targets 48h after qualified intake.
```

## Fields

### 1. Email

Type: Email

Required: Yes

Label:

`Email`

### 2. Store URL

Type: URL / short text

Required: Yes

Label:

`Store URL`

Helper:

`Public storefront URL only. Do not submit admin or login URLs.`

### 3. Product URL

Type: URL / short text

Required: Yes

Label:

`Affected product URL`

Helper:

`Use one public product page that shows the issue clearly.`

### 4. Merchant Center Issue Context

Type: Long text

Required: Yes

Label:

`Merchant Center issue text or screenshot link`

Helper:

`Paste the issue text or a screenshot link. Do not include passwords, cookies, payment data, or customer data.`

### 5. Screenshot Upload

Type: File upload

Required: No

Label:

`Merchant Center issue screenshot`

Helper:

`Optional. PNG, JPG, or PDF only; keep each file under 10MB. Redact private customer, order, payment, cookie, and account data before uploading.`

### 6. Additional Product URLs

Type: Long text

Required: No

Label:

`Additional affected product URLs`

Helper:

`Paste one URL per line if more products are affected.`

### 7. Consent

Type: Checkbox

Required: Yes

Label:

```text
I understand this is an independent public-page evidence review, not Google, not an appeal service, and does not control platform decisions. I have read the privacy policy and will not upload passwords, cookies, payment data, or customer data.
```

### 8. Anti-spam setting

Type: Tally form setting

Required: Yes

Instruction:

`Enable Tally spam protection / CAPTCHA if available on the current plan. If unavailable, keep manual review on and ignore submissions without a real store URL, product URL, and issue context.`

## Submit Button

`Submit free check`

## Success Message

```text
Thanks. Your public-page evidence check request was received.

If the submitted URL has clear public-page evidence gaps, expect a free-triage reply within 1 business day.

If the case is qualified and you request a $29 Evidence Snapshot, delivery targets 48h after qualified paid intake.
```

## Payment Link Setup

Use this after the real payment provider link exists:

- Keep Tally as the full-material intake.
- Add the payment provider success redirect to:
  `https://soup-rolls.github.io/merchantfix-free-check/thank-you.html`
- Replace the `PAYMENT_LINK_PLACEHOLDER` note in `checkout.html` with the real payment URL.
- Do not request payment for submissions that lack a store URL, affected product URL, issue text or screenshot, and consent.

## Hidden Field / Source Tracking

Hidden fields are optional. Do not block launch on this.

If Tally supports hidden fields on the current plan:

- Field: `source`
- Expected value from landing page: `free_check_page`
- Expected value from extension: `merchantfix_extension`
- Field: `utm_source`
- Expected value from landing page: `merchantfix_site`
- Field: `utm_campaign`
- Expected examples: `instant_free_check`, `footer_intake`, `category_intake`

If hidden fields are not available, keep using query parameters in the URL and inspect them manually. Source tracking is helpful for optimization but not required for intake to work.
