const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const errorsDir = path.join(root, "errors");
const siteUrl = "https://soup-rolls.github.io/merchantfix-free-check";
const lastmod = "2026-06-22";

const errors = [
  {
    slug: "missing-value-gtin",
    code: "Missing value [gtin]",
    category: "Product identifiers",
    summary: "Google Merchant Center is missing a required GTIN for at least one affected product.",
    evidence: [
      "Affected public product URL",
      "Visible brand and manufacturer information",
      "GTIN, barcode, or package identifier evidence",
      "Merchant Center issue text or screenshot"
    ],
    gaps: [
      "Product page does not show enough identifier context.",
      "Variant-level identifiers are missing or mixed.",
      "Feed value is empty while the product appears to be a branded retail item."
    ],
    badJson: {
      id: "sku-1024-blue",
      title: "Portable Desk Lamp",
      brand: "Acme",
      gtin: "",
      mpn: ""
    },
    goodJson: {
      id: "sku-1024-blue",
      title: "Portable Desk Lamp",
      brand: "Acme",
      gtin: "00012345678905",
      mpn: "ADL-1024-BLUE"
    }
  },
  {
    slug: "invalid-value-gtin",
    code: "Invalid value [gtin]",
    category: "Product identifiers",
    summary: "The submitted GTIN is malformed, not assigned to the item, or conflicts with visible product identity.",
    evidence: [
      "Affected product URL",
      "Visible product packaging or manufacturer identifier evidence",
      "Submitted GTIN value",
      "Brand and variant context"
    ],
    gaps: [
      "GTIN length or check digit does not look valid.",
      "GTIN appears copied across unrelated variants.",
      "Brand and product page identity do not support the submitted identifier."
    ],
    badJson: {
      id: "sku-771",
      title: "Running Shoes - Black 42",
      brand: "Northline",
      gtin: "12345"
    },
    goodJson: {
      id: "sku-771",
      title: "Running Shoes - Black 42",
      brand: "Northline",
      gtin: "00123456789012"
    }
  },
  {
    slug: "missing-value-brand",
    code: "Missing value [brand]",
    category: "Product identifiers",
    summary: "The feed or listing does not provide a brand value where Merchant Center expects one.",
    evidence: [
      "Product page showing visible brand or maker",
      "Feed title and brand field",
      "Manufacturer or store brand context",
      "Issue screenshot or exact message"
    ],
    gaps: [
      "Product title mentions a brand but the brand field is empty.",
      "Product page hides brand information that the feed claims.",
      "Store brand and manufacturer brand are mixed."
    ],
    badJson: {
      id: "case-39",
      title: "Luma Case for iPhone",
      brand: ""
    },
    goodJson: {
      id: "case-39",
      title: "Luma Case for iPhone",
      brand: "Luma"
    }
  },
  {
    slug: "price-mismatch",
    code: "Price mismatch",
    category: "Price and availability",
    summary: "The price in Merchant Center does not match the price visible on the product page or checkout path.",
    evidence: [
      "Affected product URL",
      "Visible product page price",
      "Sale price and currency context",
      "Feed price or diagnostic screenshot"
    ],
    gaps: [
      "Page price, sale price, and feed price are not aligned.",
      "Currency differs between the page and feed.",
      "Variant or sale app changes price after the landing page loads."
    ],
    badJson: {
      id: "lamp-12",
      feed_price: "29.00 USD",
      page_price: "39.00 USD",
      sale_price: ""
    },
    goodJson: {
      id: "lamp-12",
      feed_price: "39.00 USD",
      page_price: "39.00 USD",
      sale_price: ""
    }
  },
  {
    slug: "availability-mismatch",
    code: "Availability mismatch",
    category: "Price and availability",
    summary: "Merchant Center sees a different stock or purchase state than the public product page shows.",
    evidence: [
      "Affected product URL",
      "Visible add-to-cart or sold-out state",
      "Feed availability value",
      "Variant-level stock context"
    ],
    gaps: [
      "Feed says in stock while the page says sold out.",
      "Variant availability differs from the default product page.",
      "Preorder or backorder language is not consistent with feed availability."
    ],
    badJson: {
      id: "shirt-red-m",
      feed_availability: "in_stock",
      page_state: "Sold out"
    },
    goodJson: {
      id: "shirt-red-m",
      feed_availability: "out_of_stock",
      page_state: "Sold out"
    }
  },
  {
    slug: "shipping-cost-mismatch",
    code: "Shipping cost mismatch",
    category: "Shipping",
    summary: "The shipping cost or shipping condition in Merchant Center does not match public checkout or policy evidence.",
    evidence: [
      "Product URL and shipping destination context",
      "Shipping policy URL",
      "Checkout shipping estimate screenshot or text",
      "Merchant Center shipping diagnostic"
    ],
    gaps: [
      "Shipping policy is vague or not reachable from the product page.",
      "Checkout estimate differs from configured shipping rates.",
      "Regional exceptions are not visible enough."
    ],
    badJson: {
      id: "bag-551",
      feed_shipping: "0.00 USD",
      checkout_shipping: "8.95 USD"
    },
    goodJson: {
      id: "bag-551",
      feed_shipping: "8.95 USD",
      checkout_shipping: "8.95 USD"
    }
  },
  {
    slug: "misrepresentation",
    code: "Misrepresentation",
    category: "Trust and policy",
    summary: "Merchant Center may not have enough public evidence to trust the store, policies, business identity, or product claims.",
    evidence: [
      "Store URL and affected product URL",
      "Contact, refund, return, and shipping policy URLs",
      "Business identity or support evidence",
      "Exact Merchant Center issue text or screenshot"
    ],
    gaps: [
      "Contact or business identity is weak.",
      "Refund, return, or shipping policies are missing or thin.",
      "Product claims, prices, or trust signals are not supported by public pages."
    ],
    badJson: {
      public_contact: "missing",
      return_policy: "not linked",
      shipping_policy: "generic",
      business_identity: "unclear"
    },
    goodJson: {
      public_contact: "visible support email and contact page",
      return_policy: "linked from footer and product page",
      shipping_policy: "regions, timing, and exceptions visible",
      business_identity: "store identity and support context visible"
    }
  },
  {
    slug: "untrusted-store",
    code: "Untrusted store",
    category: "Trust and policy",
    summary: "The store may lack enough public trust evidence for Merchant Center to evaluate the business and customer experience.",
    evidence: [
      "Homepage and product URL",
      "Contact page",
      "Shipping, return, and refund policy pages",
      "Business identity, support, and terms pages"
    ],
    gaps: [
      "Policies exist but are hard to find.",
      "Contact path is missing or only a generic form.",
      "Store identity and support expectations are unclear."
    ],
    badJson: {
      contact_page: false,
      refund_policy: false,
      shipping_policy: "footer only, empty body"
    },
    goodJson: {
      contact_page: true,
      refund_policy: "clear return window and exceptions",
      shipping_policy: "clear regions, timing, costs, and exceptions"
    }
  },
  {
    slug: "insufficient-contact-information",
    code: "Insufficient contact information",
    category: "Trust and policy",
    summary: "The public store does not show enough contact or support information for customers and policy review.",
    evidence: [
      "Contact page URL",
      "Support email or form",
      "Customer service expectations",
      "Footer, policy, and product page links"
    ],
    gaps: [
      "No visible email, support path, or contact form.",
      "Contact page is not linked from common public pages.",
      "Support expectations are unclear."
    ],
    badJson: {
      contact_page: "",
      support_email: "",
      footer_link: false
    },
    goodJson: {
      contact_page: "/pages/contact",
      support_email: "support@example.com",
      footer_link: true
    }
  },
  {
    slug: "return-policy-missing",
    code: "Return policy missing",
    category: "Trust and policy",
    summary: "Return or refund terms are missing, unclear, or not reachable from public store pages.",
    evidence: [
      "Return policy URL",
      "Refund policy URL",
      "Product page or footer link path",
      "Exceptions and time window"
    ],
    gaps: [
      "Return policy page is missing or empty.",
      "Refund and return terms are inconsistent.",
      "Policy is not linked from product, footer, or checkout-adjacent pages."
    ],
    badJson: {
      return_policy_url: "",
      refund_window: "",
      exceptions: ""
    },
    goodJson: {
      return_policy_url: "/policies/refund-policy",
      refund_window: "30 days after delivery",
      exceptions: "final sale and hygiene products clearly listed"
    }
  }
];

function attributeIssue(slug, code, category, attribute, weakValue, cleanValue, context) {
  const label = attribute || code;
  return {
    slug,
    code,
    category,
    summary: context.summary || `${code} means the submitted product data needs stronger public-page evidence before review.`,
    evidence: context.evidence || [
      "Affected product URL",
      `Visible public-page evidence for ${label}`,
      "Submitted feed value or diagnostic screenshot",
      "Variant, currency, region, or policy context if relevant"
    ],
    gaps: context.gaps || [
      `Public page does not clearly support ${label}.`,
      "Submitted value conflicts with visible product or policy evidence.",
      "Variant-level evidence is unclear or not reachable from the affected page."
    ],
    badJson: {
      id: context.id || `${slug}-example`,
      [attribute || "issue"]: weakValue
    },
    goodJson: {
      id: context.id || `${slug}-example`,
      [attribute || "issue"]: cleanValue
    }
  };
}

errors.push(
  attributeIssue("missing-value-title", "Missing value [title]", "Basic product data", "title", "", "Women's Waterproof Hiking Jacket - Blue M", {
    summary: "The product data is missing a title for an affected item.",
    gaps: ["Product page title is blank or hidden from crawlers.", "Feed title is empty while the page has a sellable product.", "Variant context is not included in the submitted title."]
  }),
  attributeIssue("invalid-value-title", "Invalid value [title]", "Basic product data", "title", "BEST!!! Cheap Item $$$", "Waterproof Hiking Jacket - Blue M", {
    summary: "The submitted product title may be promotional, malformed, or inconsistent with the public product page.",
    gaps: ["Title uses promotional language instead of product identity.", "Title does not match visible product page identity.", "Variant information is misleading or missing."]
  }),
  attributeIssue("missing-value-description", "Missing value [description]", "Basic product data", "description", "", "Lightweight waterproof hiking jacket with sealed seams and adjustable hood.", {
    summary: "The product data is missing a description that explains the affected item.",
    gaps: ["Public product description is empty or too thin.", "Feed description is blank while the page contains product claims.", "Description does not support the submitted product identity."]
  }),
  attributeIssue("invalid-value-description", "Invalid value [description]", "Basic product data", "description", "Click here!!! Best deal now.", "Lightweight waterproof hiking jacket with sealed seams and adjustable hood.", {
    summary: "The submitted description may be promotional, unsupported, or inconsistent with the public page.",
    gaps: ["Description is mostly promotional language.", "Claims are not supported by the product page.", "Description does not match the visible item."]
  }),
  attributeIssue("missing-value-link", "Missing value [link]", "Landing page", "link", "", "https://example.com/products/hiking-jacket-blue", {
    summary: "The product data is missing a landing page URL for the affected item.",
    gaps: ["Affected product URL is not provided.", "Landing page is not reachable from public web.", "URL does not resolve to a product-specific page."]
  }),
  attributeIssue("invalid-value-link", "Invalid value [link]", "Landing page", "link", "https://example.com/404", "https://example.com/products/hiking-jacket-blue", {
    summary: "The submitted landing page URL is malformed, broken, redirected incorrectly, or not product-specific.",
    gaps: ["Product URL returns an error or redirects to homepage.", "URL requires login or region selection before product evidence appears.", "Landing page content does not match the submitted item."]
  }),
  attributeIssue("missing-value-image-link", "Missing value [image_link]", "Images", "image_link", "", "https://example.com/images/hiking-jacket-blue.jpg", {
    summary: "The product data is missing the main product image URL.",
    gaps: ["Main product image is not present on the public page.", "Image URL is empty or blocked.", "Variant image evidence does not match the affected item."]
  }),
  attributeIssue("invalid-value-image-link", "Invalid value [image_link]", "Images", "image_link", "https://example.com/image.txt", "https://example.com/images/hiking-jacket-blue.jpg", {
    summary: "The submitted image URL may be unreachable, unsupported, too small, or inconsistent with the product.",
    gaps: ["Image URL does not return a valid product image.", "Image does not show the affected variant.", "Public page image and submitted image conflict."]
  }),
  attributeIssue("missing-value-price", "Missing value [price]", "Price and availability", "price", "", "39.00 USD", {
    summary: "The product data is missing a price value for the affected item.",
    gaps: ["Public page price is hidden or rendered inconsistently.", "Feed price is empty while the product is purchasable.", "Currency evidence is missing."]
  }),
  attributeIssue("invalid-value-price", "Invalid value [price]", "Price and availability", "price", "39", "39.00 USD", {
    summary: "The submitted price may be malformed, missing currency, or unsupported.",
    gaps: ["Price format is incomplete.", "Currency is missing or inconsistent.", "Sale price and regular price are not clearly separated."]
  }),
  attributeIssue("missing-value-availability", "Missing value [availability]", "Price and availability", "availability", "", "in_stock", {
    summary: "The product data is missing availability for the affected item.",
    gaps: ["Page does not clearly show in-stock, out-of-stock, preorder, or backorder state.", "Feed availability is empty.", "Variant stock state is unclear."]
  }),
  attributeIssue("invalid-value-availability", "Invalid value [availability]", "Price and availability", "availability", "available now", "in_stock", {
    summary: "The submitted availability value is not one of the expected product availability states.",
    gaps: ["Availability wording is not mapped to a valid feed value.", "Page state and submitted state conflict.", "Variant availability differs from the default product page."]
  }),
  attributeIssue("missing-value-condition", "Missing value [condition]", "Product condition", "condition", "", "new", {
    summary: "The product data is missing condition for an affected item.",
    gaps: ["Page does not identify whether the item is new, refurbished, or used.", "Feed condition is empty.", "Condition varies by variant or seller note."]
  }),
  attributeIssue("invalid-value-condition", "Invalid value [condition]", "Product condition", "condition", "brand-new", "new", {
    summary: "The submitted condition value is malformed or not aligned with expected product condition values.",
    gaps: ["Condition wording does not map cleanly to a feed value.", "Public page condition evidence is vague.", "Refurbished or used state is not supported by page copy."]
  }),
  attributeIssue("missing-value-mpn", "Missing value [mpn]", "Product identifiers", "mpn", "", "ADL-1024-BLUE", {
    summary: "The product data is missing manufacturer part number evidence where identifier context is expected.",
    gaps: ["Product page does not show manufacturer part number context.", "Feed MPN is empty while brand identity is visible.", "Identifier evidence is mixed across variants."]
  }),
  attributeIssue("invalid-value-mpn", "Invalid value [mpn]", "Product identifiers", "mpn", "SKU-LOCAL-1", "ADL-1024-BLUE", {
    summary: "The submitted MPN may be a store SKU, malformed value, or not supported by visible product evidence.",
    gaps: ["MPN looks like an internal SKU.", "Brand and manufacturer evidence do not support the submitted MPN.", "Same MPN appears across unrelated variants."]
  }),
  attributeIssue("identifier-exists-conflict", "Identifier exists conflict [identifier_exists]", "Product identifiers", "identifier_exists", "false", "true", {
    summary: "The identifier_exists value may conflict with visible brand, GTIN, or manufacturer evidence.",
    gaps: ["Page shows branded retail product evidence while identifier_exists is false.", "Feed suppresses identifiers without supporting custom-product context.", "Brand, MPN, and GTIN fields conflict."]
  }),
  attributeIssue("missing-value-google-product-category", "Missing value [google_product_category]", "Taxonomy", "google_product_category", "", "Apparel & Accessories > Clothing > Outerwear", {
    summary: "The product data is missing a Google product category where category context is needed.",
    gaps: ["Product category is vague or missing.", "Page and feed category do not support the same item type.", "Regulated or apparel attributes need stronger category context."]
  }),
  attributeIssue("invalid-value-google-product-category", "Invalid value [google_product_category]", "Taxonomy", "google_product_category", "Stuff > Jacket", "Apparel & Accessories > Clothing > Outerwear", {
    summary: "The submitted Google product category is malformed or not aligned with the product type.",
    gaps: ["Category path is not a valid taxonomy-style value.", "Category does not match public product identity.", "Variant category context is mixed."]
  }),
  attributeIssue("missing-value-product-type", "Missing value [product_type]", "Taxonomy", "product_type", "", "Women > Jackets > Rain Jackets", {
    summary: "The merchant-defined product type is missing or too thin for internal category evidence.",
    gaps: ["Product type is empty.", "Store category path is not visible or consistent.", "Product type does not support the visible page category."]
  }),
  attributeIssue("missing-value-color", "Missing value [color]", "Apparel variants", "color", "", "Blue", {
    summary: "The product data is missing color for an affected apparel or variant item.",
    gaps: ["Visible variant color is not submitted.", "Product page color options are hidden or image-only.", "Default image color and selected variant color conflict."]
  }),
  attributeIssue("invalid-value-color", "Invalid value [color]", "Apparel variants", "color", "#1D4ED8", "Blue", {
    summary: "The submitted color value may be overly technical, unsupported, or inconsistent with visible variant evidence.",
    gaps: ["Color value is a code instead of customer-facing color.", "Public page color label differs from feed value.", "Multiple colors are submitted without clear variant mapping."]
  }),
  attributeIssue("missing-value-size", "Missing value [size]", "Apparel variants", "size", "", "M", {
    summary: "The product data is missing size for an affected apparel variant.",
    gaps: ["Variant size is visible but not submitted.", "Size selector is not crawlable.", "Feed item represents a variant but size is empty."]
  }),
  attributeIssue("invalid-value-size", "Invalid value [size]", "Apparel variants", "size", "Medium-ish", "M", {
    summary: "The submitted size value may be inconsistent, unsupported, or unclear.",
    gaps: ["Size format differs across variants.", "Size value does not match public selector labels.", "One feed item mixes multiple sizes."]
  }),
  attributeIssue("missing-value-gender", "Missing value [gender]", "Apparel variants", "gender", "", "female", {
    summary: "The product data is missing gender where apparel category rules expect it.",
    gaps: ["Page category suggests apparel but gender is not submitted.", "Product copy mixes multiple audiences without variant context.", "Feed category and gender evidence conflict."]
  }),
  attributeIssue("invalid-value-gender", "Invalid value [gender]", "Apparel variants", "gender", "ladies", "female", {
    summary: "The submitted gender value is not aligned with expected apparel gender values.",
    gaps: ["Gender wording is customer-facing but not feed-ready.", "Page audience and submitted gender conflict.", "Unisex products lack supporting context."]
  }),
  attributeIssue("missing-value-age-group", "Missing value [age_group]", "Apparel variants", "age_group", "", "adult", {
    summary: "The product data is missing age group where apparel category rules expect it.",
    gaps: ["Age group is not visible or submitted.", "Kids/adult context conflicts between title, category, and page.", "Variant-level audience context is unclear."]
  }),
  attributeIssue("invalid-value-age-group", "Invalid value [age_group]", "Apparel variants", "age_group", "grown up", "adult", {
    summary: "The submitted age group value is malformed or unsupported.",
    gaps: ["Age group wording is not feed-ready.", "Page audience evidence does not match the submitted value.", "Category implies a different age group."]
  }),
  attributeIssue("missing-value-item-group-id", "Missing value [item_group_id]", "Apparel variants", "item_group_id", "", "jacket-1024", {
    summary: "Variant products may be missing a shared item group ID.",
    gaps: ["Color or size variants are submitted as unrelated products.", "Variant group evidence is not visible.", "Default URL does not map cleanly to selected variant."]
  }),
  attributeIssue("invalid-value-item-group-id", "Invalid value [item_group_id]", "Apparel variants", "item_group_id", "jacket blue m", "jacket-1024", {
    summary: "The submitted item group ID may be unstable, malformed, or mixed across unrelated products.",
    gaps: ["Group ID changes by variant instead of grouping variants.", "Unrelated products share the same group ID.", "Variant evidence on the public page is unclear."]
  }),
  attributeIssue("missing-value-shipping", "Missing value [shipping]", "Shipping", "shipping", "", "US:CA:Ground:8.95 USD", {
    summary: "The product data is missing shipping information where shipping evidence is needed.",
    gaps: ["Shipping policy is not reachable from the product page.", "Checkout estimate is not supported by policy text.", "Regional shipping evidence is missing."]
  }),
  attributeIssue("invalid-value-shipping", "Invalid value [shipping]", "Shipping", "shipping", "free maybe", "US:CA:Ground:8.95 USD", {
    summary: "The submitted shipping value may be malformed or inconsistent with public policy or checkout evidence.",
    gaps: ["Shipping price conflicts with checkout or policy evidence.", "Region or service details are missing.", "Free-shipping threshold is unclear."]
  }),
  attributeIssue("missing-value-shipping-weight", "Missing value [shipping_weight]", "Shipping", "shipping_weight", "", "1.2 kg", {
    summary: "The product data is missing shipping weight for an item that needs weight-based shipping evidence.",
    gaps: ["Product page does not support package weight.", "Shipping rates depend on weight but feed weight is empty.", "Variant package weight differs from submitted evidence."]
  }),
  attributeIssue("invalid-value-shipping-weight", "Invalid value [shipping_weight]", "Shipping", "shipping_weight", "heavy", "1.2 kg", {
    summary: "The submitted shipping weight may be malformed or unsupported.",
    gaps: ["Weight is missing a number or unit.", "Public page and feed weight conflict.", "Dimensional shipping evidence is incomplete."]
  }),
  attributeIssue("missing-value-tax", "Missing value [tax]", "Tax", "tax", "", "US:CA:8.25:y", {
    summary: "The product data is missing tax information where tax configuration evidence is needed.",
    gaps: ["Tax settings are not represented in the submitted data.", "Region-specific tax context is unclear.", "Public price display does not explain tax treatment."]
  }),
  attributeIssue("invalid-value-tax", "Invalid value [tax]", "Tax", "tax", "depends", "US:CA:8.25:y", {
    summary: "The submitted tax value may be malformed or inconsistent with regional pricing evidence.",
    gaps: ["Tax value is not structured.", "Tax region is missing.", "Public page price and tax expectations are unclear."]
  }),
  attributeIssue("missing-value-sale-price", "Missing value [sale_price]", "Price and availability", "sale_price", "", "29.00 USD", {
    summary: "Sale price evidence is missing or not aligned with the public product page.",
    gaps: ["Page advertises a sale but feed sale price is empty.", "Sale price and regular price are not clearly separated.", "Sale period evidence is missing."]
  }),
  attributeIssue("invalid-value-sale-price", "Invalid value [sale_price]", "Price and availability", "sale_price", "29", "29.00 USD", {
    summary: "The submitted sale price may be malformed or inconsistent with visible product page pricing.",
    gaps: ["Sale price lacks currency.", "Sale price is higher than regular price.", "Page price and submitted sale price conflict."]
  }),
  attributeIssue("missing-value-sale-price-effective-date", "Missing value [sale_price_effective_date]", "Price and availability", "sale_price_effective_date", "", "2026-06-01T00:00-0800/2026-06-30T23:59-0800", {
    summary: "The sale price effective date is missing where sale timing evidence is needed.",
    gaps: ["Sale banner does not show timing.", "Feed has sale price without date context.", "Public page and feed sale windows conflict."]
  }),
  attributeIssue("invalid-value-sale-price-effective-date", "Invalid value [sale_price_effective_date]", "Price and availability", "sale_price_effective_date", "June sale", "2026-06-01T00:00-0800/2026-06-30T23:59-0800", {
    summary: "The submitted sale price effective date is malformed or not aligned with the public promotion.",
    gaps: ["Date range is not machine-readable.", "Sale timing differs between page and feed.", "Promotion copy does not support the submitted date."]
  }),
  attributeIssue("missing-value-adult", "Missing value [adult]", "Policy-sensitive products", "adult", "", "no", {
    summary: "Adult content classification is missing or unclear for an affected item.",
    gaps: ["Product category or imagery may require clearer adult classification.", "Feed value is empty.", "Public page policy context is unclear."]
  }),
  attributeIssue("invalid-value-adult", "Invalid value [adult]", "Policy-sensitive products", "adult", "not adult", "no", {
    summary: "The submitted adult value is malformed or unsupported.",
    gaps: ["Adult classification is not feed-ready.", "Product page content and submitted value conflict.", "Policy-sensitive wording lacks context."]
  })
);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonBlock(value) {
  return escapeHtml(JSON.stringify(value, null, 2));
}

function pageShell({ title, description, canonical, body, jsonLd }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="../assets/merchantfix-icon.png" />
    <style>
      :root{color-scheme:light dark;--ink:#151613;--muted:#52574d;--line:#dfe3d8;--paper:#f8f7f1;--accent:#27735e;--accent-dark:#174f41;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      *{box-sizing:border-box} body{margin:0;background:linear-gradient(180deg,#fbfaf6 0%,var(--paper) 100%);color:var(--ink)} a{color:inherit}
      .nav{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid rgba(21,22,19,.08);background:rgba(248,247,241,.9);position:sticky;top:0;z-index:10;backdrop-filter:blur(18px)}
      .brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:800}.brand img{width:30px;height:30px}.nav a:last-child{font-size:14px;font-weight:800;color:var(--accent-dark)}
      main{padding:clamp(42px,7vw,86px) clamp(20px,6vw,88px)}.hero{display:grid;grid-template-columns:minmax(0,.8fr) minmax(320px,1fr);gap:clamp(34px,6vw,80px);align-items:start}
      .eyebrow{margin:0 0 12px;color:var(--accent);font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:0} h1{margin:0;max-width:760px;font-size:clamp(40px,6vw,76px);line-height:1;letter-spacing:0} h2{margin:0;font-size:clamp(26px,3.6vw,46px);line-height:1.05}
      .lede{max-width:620px;margin:24px 0 0;color:var(--muted);font-size:clamp(17px,2vw,22px);line-height:1.5}.meta{display:grid;gap:12px;margin-top:28px;padding-top:22px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}
      .panel{border-left:2px solid var(--accent);padding-left:24px}.section{padding:54px 0;border-top:1px solid var(--line)}.section:first-of-type{border-top:0}
      ul{margin:18px 0 0;padding:0;list-style:none}li{padding:13px 0;border-bottom:1px solid var(--line);color:var(--muted);line-height:1.45}.code-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}
      pre{margin:0;padding:18px;overflow:auto;border:1px solid var(--line);border-radius:8px;background:#fffef9;font-size:13px;line-height:1.45}code{font-family:"SFMono-Regular",Consolas,monospace}.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
      .primary,.secondary{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:6px;text-decoration:none;font-weight:900}.primary{background:var(--accent);color:white}.secondary{border:1px solid var(--line);background:white;color:var(--accent-dark)}
      .note{margin-top:16px;color:var(--muted);font-size:13px;line-height:1.45}.index-list a{display:flex;justify-content:space-between;gap:16px;text-decoration:none}.index-list strong{color:var(--ink)}.index-list span{color:var(--muted)}.directory{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;padding:54px 0;border-top:1px solid var(--line)}.directory-links{display:flex;flex-wrap:wrap;gap:12px 18px;margin-top:14px}.directory-links a{color:var(--accent-dark);font-weight:800;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}
      @media(max-width:860px){.hero,.code-grid,.directory{grid-template-columns:1fr}.nav{align-items:flex-start}.index-list a{display:block}.primary,.secondary{width:100%}}@media(prefers-color-scheme:dark){:root{color-scheme:dark;--ink:#f4f6f1;--muted:#bcc4b6;--line:#314036;--paper:#101612;--accent:#78c5a7;--accent-dark:#a9e3c7}body{background:linear-gradient(180deg,#101612 0%,#0d120f 100%)}.nav{background:rgba(16,22,18,.92)}.secondary,pre{background:#141a16}.primary{color:#0d120f}.directory-links a{color:var(--accent)}}
    </style>
    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
  </head>
  <body>
    <header class="nav">
      <a class="brand" href="../"><img src="../assets/merchantfix-icon.png" alt="" /><span>MerchantFix</span></a>
      <a href="../#instant-check">Run Evidence Readiness Preview</a>
    </header>
    ${body}
  </body>
</html>
`;
}

function errorPage(item) {
  const url = `${siteUrl}/errors/${item.slug}.html`;
  const description = `${item.code}: public-page evidence checklist, common gaps, and before/after JSON for Merchant Center review preparation.`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": `${item.code} - Merchant Center evidence checklist`,
      "description": description,
      "dateModified": lastmod,
      "mainEntityOfPage": url,
      "about": ["Google Merchant Center", item.code, item.category],
      "publisher": { "@type": "Organization", "name": "MerchantFix" }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What does ${item.code} mean?`,
          "acceptedAnswer": { "@type": "Answer", "text": item.summary }
        },
        {
          "@type": "Question",
          "name": `What evidence should I prepare for ${item.code}?`,
          "acceptedAnswer": { "@type": "Answer", "text": item.evidence.join("; ") }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "MerchantFix", "item": `${siteUrl}/` },
        { "@type": "ListItem", "position": 2, "name": "Error library", "item": `${siteUrl}/errors/` },
        { "@type": "ListItem", "position": 3, "name": item.code, "item": url }
      ]
    }
  ];
  const body = `<main>
      <section class="hero">
        <div>
          <p class="eyebrow">${escapeHtml(item.category)}</p>
          <h1>${escapeHtml(item.code)}</h1>
          <p class="lede">${escapeHtml(item.summary)}</p>
          <div class="meta">
            <span>Scope: public-page evidence readiness</span>
            <span>Boundary: not Google, no account login, no appeal submission</span>
          </div>
        </div>
        <aside class="panel">
          <p class="eyebrow">Short answer</p>
          <h2>Prepare evidence before paying for review.</h2>
          <p class="lede">Use this page to decide whether your materials are ready for a $29 Launch Lite Snapshot.</p>
          <div class="cta">
            <a class="primary" href="../#instant-check">Run Evidence Readiness Preview</a>
            <a class="secondary" href="./">Browse all errors</a>
          </div>
        </aside>
      </section>

      <section class="section">
        <p class="eyebrow">Evidence needed</p>
        <h2>What to collect</h2>
        <ul>${item.evidence.map(text => `<li>${escapeHtml(text)}</li>`).join("")}</ul>
      </section>

      <section class="section">
        <p class="eyebrow">Common public-page gaps</p>
        <h2>What usually breaks the evidence chain</h2>
        <ul>${item.gaps.map(text => `<li>${escapeHtml(text)}</li>`).join("")}</ul>
      </section>

      <section class="section">
        <p class="eyebrow">Before / after JSON</p>
        <h2>Structured comparison</h2>
        <div class="code-grid">
          <div>
            <p class="eyebrow">Weak evidence</p>
            <pre><code>${jsonBlock(item.badJson)}</code></pre>
          </div>
          <div>
            <p class="eyebrow">Cleaner evidence</p>
            <pre><code>${jsonBlock(item.goodJson)}</code></pre>
          </div>
        </div>
        <p class="note">Examples are simplified and anonymized. They are evidence-preparation patterns, not platform decisions.</p>
      </section>

      <section class="section">
        <p class="eyebrow">Next step</p>
        <h2>Check whether your case is ready.</h2>
        <p class="lede">Paste your issue text and affected product URL into the free preview. If the case is qualified, submit full materials for review.</p>
        <div class="cta">
          <a class="primary" href="../#instant-check">Run free preview</a>
          <a class="secondary" href="https://tally.so/r/EkA01B?source=error_library_${item.slug}&utm_source=merchantfix_error_library&utm_campaign=error_detail_intake" target="_blank" rel="noopener noreferrer">Submit full materials</a>
        </div>
      </section>
    </main>`;
  return pageShell({
    title: `${item.code} - MerchantFix Error Library`,
    description,
    canonical: url,
    body,
    jsonLd
  });
}

function indexPage() {
  const url = `${siteUrl}/errors/`;
  const body = `<main>
      <section class="hero">
        <div>
          <p class="eyebrow">Merchant Center error library</p>
          <h1>Evidence checklists for common GMC errors.</h1>
          <p class="lede">Short, structured pages for sellers who already have a Merchant Center issue and need to prepare public-page evidence.</p>
        </div>
        <aside class="panel">
          <p class="eyebrow">Use this library</p>
          <h2>Find the error, then run the preview.</h2>
          <p class="lede">Each page includes evidence needed, common public-page gaps, and simplified before/after JSON before a $29 Launch Lite Snapshot.</p>
          <div class="cta">
            <a class="primary" href="../#instant-check">Run Evidence Readiness Preview</a>
          </div>
        </aside>
      </section>
      <section class="section">
        <p class="eyebrow">Error pages</p>
        <h2>High-intent entries</h2>
        <ul class="index-list">
          ${errors.map(item => `<li><a href="${item.slug}.html"><strong>${escapeHtml(item.code)}</strong><span>${escapeHtml(item.category)}</span></a></li>`).join("")}
        </ul>
      </section>
      <section class="directory">
        <div>
          <p class="eyebrow">Browse by category</p>
          <div class="directory-links">
            <a href="categories/product-identifiers.html">Product identifiers</a>
            <a href="categories/content-and-landing.html">Content and landing</a>
            <a href="categories/price-and-availability.html">Price and availability</a>
            <a href="categories/shipping-and-tax.html">Shipping and tax</a>
            <a href="categories/variants-and-attributes.html">Variants and attributes</a>
            <a href="categories/trust-and-policy.html">Trust and policy</a>
          </div>
        </div>
        <div>
          <p class="eyebrow">Trust docs</p>
          <div class="directory-links">
            <a href="../about.html">About</a>
            <a href="../contact.html">Contact</a>
            <a href="../privacy.html">Privacy</a>
            <a href="../terms.html">Terms</a>
            <a href="../llms.txt">llms.txt</a>
          </div>
        </div>
      </section>
    </main>`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Merchant Center error library",
    "description": "Structured evidence checklists for common Google Merchant Center errors.",
    "url": url,
    "hasPart": errors.map(item => ({
      "@type": "WebPage",
      "name": item.code,
      "url": `${siteUrl}/errors/${item.slug}.html`
    }))
  };
  return pageShell({
    title: "Merchant Center Error Library - MerchantFix",
    description: "Structured evidence checklists for common Google Merchant Center errors.",
    canonical: url,
    body,
    jsonLd
  });
}

function sitemap() {
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/errors/`,
    ...errors.map(item => `${siteUrl}/errors/${item.slug}.html`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

fs.mkdirSync(errorsDir, { recursive: true });
fs.writeFileSync(path.join(errorsDir, "index.html"), indexPage());
for (const item of errors) {
  fs.writeFileSync(path.join(errorsDir, `${item.slug}.html`), errorPage(item));
}
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap());
fs.writeFileSync(path.join(root, "robots.txt"), robots());

console.log(`Generated ${errors.length} error pages.`);
