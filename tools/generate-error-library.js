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
      :root{color-scheme:light;--ink:#151613;--muted:#62665d;--line:#dfe3d8;--paper:#f8f7f1;--accent:#27735e;--accent-dark:#174f41;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
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
      .note{margin-top:16px;color:var(--muted);font-size:13px;line-height:1.45}.index-list a{display:flex;justify-content:space-between;gap:16px;text-decoration:none}.index-list strong{color:var(--ink)}.index-list span{color:var(--muted)}
      @media(max-width:860px){.hero,.code-grid{grid-template-columns:1fr}.nav{align-items:flex-start}.index-list a{display:block}.primary,.secondary{width:100%}}
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
          <a class="secondary" href="https://tally.so/r/EkA01B?source=error_library_${item.slug}">Submit full materials</a>
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
        <h2>First 10 high-intent entries</h2>
        <ul class="index-list">
          ${errors.map(item => `<li><a href="${item.slug}.html"><strong>${escapeHtml(item.code)}</strong><span>${escapeHtml(item.category)}</span></a></li>`).join("")}
        </ul>
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
