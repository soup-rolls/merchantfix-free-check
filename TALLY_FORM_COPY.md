# Tally Form Copy

Use this to update the existing Tally form:

`https://tally.so/r/EkA01B`

## Form Title

`Free Public-Page Evidence Check`

## Form Description

```text
Submit your public store URL and issue context. We only review visible public pages.

No account login. No admin access. No appeal submission. This independent check does not control platform decisions.
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

`Optional. Redact private customer or payment data before uploading.`

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
I understand this is an independent public-page evidence review, not Google, not an appeal service, and does not control platform decisions.
```

## Submit Button

`Submit free check`

## Success Message

```text
Thanks. Your public-page evidence check request was received.

If the submitted URL has clear public-page evidence gaps, you may receive an option to request a $29 Launch Lite Snapshot.
```

## Hidden Field / Source Tracking

If Tally supports hidden fields on the current plan:

- Field: `source`
- Expected value from landing page: `free_check_page`
- Expected value from extension: `merchantfix_extension`

If hidden fields are not available, keep using query parameters in the URL and inspect them manually.
