const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://soup-rolls.github.io/merchantfix-free-check";
const lastmod = "2026-06-22";

const categoryPages = [
  {
    slug: "product-identifiers",
    title: "Product identifiers",
    eyebrow: "Error category",
    summary: "GTIN, brand, MPN, and identifier rules for products that need stronger public-page proof.",
    description: "MerchantFix category page for product identifier evidence: GTIN, brand, MPN, and identifier_exists cases.",
    items: [
      ["Missing value [gtin]", "missing-value-gtin.html"],
      ["Invalid value [gtin]", "invalid-value-gtin.html"],
      ["Missing value [brand]", "missing-value-brand.html"],
      ["Missing value [mpn]", "missing-value-mpn.html"],
      ["Invalid value [mpn]", "invalid-value-mpn.html"],
      ["Identifier exists conflict [identifier_exists]", "identifier-exists-conflict.html"]
    ],
    evidence: [
      "Public product page with visible brand or maker",
      "Barcode, package, or manufacturer evidence where available",
      "Feed value and affected product URL",
      "Exact Merchant Center issue text or screenshot"
    ]
  },
  {
    slug: "content-and-landing",
    title: "Content and landing pages",
    eyebrow: "Error category",
    summary: "Title, description, link, image, category, and product-type evidence for public pages.",
    description: "MerchantFix category page for content and landing-page evidence issues.",
    items: [
      ["Missing value [title]", "missing-value-title.html"],
      ["Invalid value [title]", "invalid-value-title.html"],
      ["Missing value [description]", "missing-value-description.html"],
      ["Invalid value [description]", "invalid-value-description.html"],
      ["Missing value [link]", "missing-value-link.html"],
      ["Invalid value [link]", "invalid-value-link.html"],
      ["Missing value [image_link]", "missing-value-image-link.html"],
      ["Invalid value [image_link]", "invalid-value-image-link.html"],
      ["Missing value [google_product_category]", "missing-value-google-product-category.html"],
      ["Invalid value [google_product_category]", "invalid-value-google-product-category.html"],
      ["Missing value [product_type]", "missing-value-product-type.html"]
    ],
    evidence: [
      "Exact public product URL",
      "Visible product title and description",
      "Main product image and variant image context",
      "Category or product-type mapping if the item is ambiguous"
    ]
  },
  {
    slug: "price-and-availability",
    title: "Price and availability",
    eyebrow: "Error category",
    summary: "Price, sale price, currency, availability, and purchase-state evidence for live listings.",
    description: "MerchantFix category page for price and availability evidence issues.",
    items: [
      ["Price mismatch", "price-mismatch.html"],
      ["Availability mismatch", "availability-mismatch.html"],
      ["Missing value [price]", "missing-value-price.html"],
      ["Invalid value [price]", "invalid-value-price.html"],
      ["Missing value [availability]", "missing-value-availability.html"],
      ["Invalid value [availability]", "invalid-value-availability.html"],
      ["Missing value [sale_price]", "missing-value-sale-price.html"],
      ["Invalid value [sale_price]", "invalid-value-sale-price.html"],
      ["Missing value [sale_price_effective_date]", "missing-value-sale-price-effective-date.html"],
      ["Invalid value [sale_price_effective_date]", "invalid-value-sale-price-effective-date.html"],
      ["Missing value [condition]", "missing-value-condition.html"],
      ["Invalid value [condition]", "invalid-value-condition.html"]
    ],
    evidence: [
      "Visible landing-page price and currency",
      "Sale price or promotion timing if present",
      "Stock state, preorder language, and add-to-cart evidence",
      "Variant-level availability if the item changes by option"
    ]
  },
  {
    slug: "shipping-and-tax",
    title: "Shipping and tax",
    eyebrow: "Error category",
    summary: "Shipping, shipping weight, and tax evidence for stores where checkout signals matter.",
    description: "MerchantFix category page for shipping and tax evidence issues.",
    items: [
      ["Shipping cost mismatch", "shipping-cost-mismatch.html"],
      ["Missing value [shipping]", "missing-value-shipping.html"],
      ["Invalid value [shipping]", "invalid-value-shipping.html"],
      ["Missing value [shipping_weight]", "missing-value-shipping-weight.html"],
      ["Invalid value [shipping_weight]", "invalid-value-shipping-weight.html"],
      ["Missing value [tax]", "missing-value-tax.html"],
      ["Invalid value [tax]", "invalid-value-tax.html"]
    ],
    evidence: [
      "Shipping policy page with regions, timing, and exceptions",
      "Checkout shipping estimate or policy screenshot",
      "Weight or package evidence if shipping is weight-based",
      "Region-specific tax or surcharge context"
    ]
  },
  {
    slug: "variants-and-attributes",
    title: "Variants and attributes",
    eyebrow: "Error category",
    summary: "Color, size, gender, age group, item grouping, and policy-sensitive attribute evidence.",
    description: "MerchantFix category page for variant and attribute evidence issues.",
    items: [
      ["Missing value [color]", "missing-value-color.html"],
      ["Invalid value [color]", "invalid-value-color.html"],
      ["Missing value [size]", "missing-value-size.html"],
      ["Invalid value [size]", "invalid-value-size.html"],
      ["Missing value [gender]", "missing-value-gender.html"],
      ["Invalid value [gender]", "invalid-value-gender.html"],
      ["Missing value [age_group]", "missing-value-age-group.html"],
      ["Invalid value [age_group]", "invalid-value-age-group.html"],
      ["Missing value [item_group_id]", "missing-value-item-group-id.html"],
      ["Invalid value [item_group_id]", "invalid-value-item-group-id.html"],
      ["Missing value [adult]", "missing-value-adult.html"],
      ["Invalid value [adult]", "invalid-value-adult.html"]
    ],
    evidence: [
      "Variant selector text and images",
      "Shared product grouping or option naming",
      "Audience or age group evidence where needed",
      "Adult-content classification if the page requires it"
    ]
  },
  {
    slug: "trust-and-policy",
    title: "Trust and policy",
    eyebrow: "Error category",
    summary: "Contact, return, trust, and store-identity evidence for Merchant Center review preparation.",
    description: "MerchantFix category page for trust and policy evidence issues.",
    items: [
      ["Misrepresentation", "misrepresentation.html"],
      ["Untrusted store", "untrusted-store.html"],
      ["Insufficient contact information", "insufficient-contact-information.html"],
      ["Return policy missing", "return-policy-missing.html"]
    ],
    evidence: [
      "Contact page or visible support path",
      "Return and refund page",
      "Shipping policy and store identity pages",
      "Exact public signals visible without login"
    ]
  }
];

const trustPages = [
  {
    file: "about.html",
    title: "About MerchantFix",
    description: "About MerchantFix: an independent public-page evidence review for stores preparing Merchant Center materials.",
    canonical: `${siteUrl}/about.html`,
    eyebrow: "About",
    h1: "Independent public-page evidence review.",
    lede: "MerchantFix is a narrow, operator-light workflow for sellers who already have a visible Merchant Center issue and need to understand public-page evidence gaps before spending time on a fuller review.",
    sections: [
      {
        title: "What it does",
        items: [
          "Runs a client-side free preview from a store URL, product URL, and issue text.",
          "Routes qualified cases into a full-material intake for human review.",
          "Keeps the boundary on public pages only."
        ]
      },
      {
        title: "What it does not do",
        items: [
          "Does not log into accounts, read private admin data, or submit appeals.",
          "Does not promise a platform outcome.",
          "Does not operate as Google or as an official partner."
        ]
      }
    ],
    links: [
      ["Run free preview", "./#instant-check"],
      ["Browse error library", "errors/"],
      ["Privacy", "privacy.html"],
      ["Contact", "contact.html"]
    ]
  },
  {
    file: "privacy.html",
    title: "Privacy Policy - MerchantFix",
    description: "MerchantFix privacy policy for the public-page evidence preview and full-material intake flow.",
    canonical: `${siteUrl}/privacy.html`,
    eyebrow: "Privacy",
    h1: "Public-page only by design.",
    lede: "The public site runs a local preview in the browser. Full materials only enter the Tally intake after the user chooses to submit them.",
    sections: [
      {
        title: "Collected on the public site",
        items: [
          "The free preview uses the values you type into the form in your browser session.",
          "The preview may generate a local clipboard copy of the summary you can paste elsewhere.",
          "The public page may use standard hosting analytics or logs from the static host."
        ]
      },
      {
        title: "Not collected by the preview",
        items: [
          "No passwords, cookies, 2FA codes, or admin credentials.",
          "No private store backend data.",
          "No appeal submission from the public preview."
        ]
      },
      {
        title: "Where full materials go",
        items: [
          "Full submission happens only through the linked Tally intake form.",
          "Qualified cases are then reviewed manually.",
          "The operator handles only the minimum material needed to produce the evidence brief."
        ]
      }
    ],
    links: [
      ["Contact", "contact.html"],
      ["About", "about.html"],
      ["Full error library", "errors/"],
      ["Tally intake", "https://tally.so/r/EkA01B"]
    ]
  },
  {
    file: "contact.html",
    title: "Contact MerchantFix",
    description: "Contact options for MerchantFix support and evidence-review questions.",
    canonical: `${siteUrl}/contact.html`,
    eyebrow: "Contact",
    h1: "One public contact path is enough.",
    lede: "For product questions, evidence-review questions, or correction requests, use the public contact paths below.",
    sections: [
      {
        title: "Contact paths",
        items: [
          "Email: shichenghao321@gmail.com",
          "GitHub repo: https://github.com/soup-rolls/merchantfix-free-check",
          "Full material intake: https://tally.so/r/EkA01B"
        ]
      },
      {
        title: "Useful context to include",
        items: [
          "Store URL",
          "Affected product URL",
          "Exact Merchant Center issue text or screenshot",
          "Any visible public-page policy links"
        ]
      }
    ],
    links: [
      ["About", "about.html"],
      ["Privacy", "privacy.html"],
      ["Error library", "errors/"],
      ["Home", "./"]
    ]
  }
];

const errorCategoryIndex = {
  file: "errors/categories/index.html",
  title: "MerchantFix Categories",
  description: "Browse MerchantFix error categories for product identifiers, pricing, shipping, variants, and trust issues.",
  canonical: `${siteUrl}/errors/categories/`,
  eyebrow: "Error categories",
  h1: "Browse MerchantFix categories.",
  lede: "Use the category hub to reach the exact evidence checklist that matches the Merchant Center issue you already see.",
  sections: [
    {
      title: "Category hubs",
      items: categoryPages.map(page => `${page.title} - ${page.slug}.html`)
    }
  ],
  links: [
    ["Product identifiers", "product-identifiers.html"],
    ["Content and landing pages", "content-and-landing.html"],
    ["Price and availability", "price-and-availability.html"],
    ["Shipping and tax", "shipping-and-tax.html"],
    ["Variants and attributes", "variants-and-attributes.html"],
    ["Trust and policy", "trust-and-policy.html"]
  ]
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell({ title, description, canonical, body, jsonLd, assetBase = "assets/", homeHref = "./", previewHref = "./#instant-check" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="${assetBase}merchantfix-icon.png" />
    <style>
      :root{color-scheme:light;--ink:#151613;--muted:#62665d;--line:#dfe3d8;--paper:#f8f7f1;--accent:#27735e;--accent-dark:#174f41;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      *{box-sizing:border-box} body{margin:0;background:linear-gradient(180deg,#fbfaf6 0%,var(--paper) 100%);color:var(--ink)} a{color:inherit}
      .nav{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid rgba(21,22,19,.08);background:rgba(248,247,241,.9);position:sticky;top:0;z-index:10;backdrop-filter:blur(18px)}
      .brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:800}.brand img{width:30px;height:30px}.nav a:last-child{font-size:14px;font-weight:800;color:var(--accent-dark)}
      main{padding:clamp(42px,7vw,86px) clamp(20px,6vw,88px)}.hero{display:grid;grid-template-columns:minmax(0,.8fr) minmax(320px,1fr);gap:clamp(34px,6vw,80px);align-items:start}
      .eyebrow{margin:0 0 12px;color:var(--accent);font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:0} h1{margin:0;max-width:760px;font-size:clamp(40px,6vw,76px);line-height:1;letter-spacing:0} h2{margin:0;font-size:clamp(26px,3.6vw,46px);line-height:1.05}
      .lede{max-width:620px;margin:24px 0 0;color:var(--muted);font-size:clamp(17px,2vw,22px);line-height:1.5}.meta{display:grid;gap:12px;margin-top:28px;padding-top:22px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}
      .panel{border-left:2px solid var(--accent);padding-left:24px}.section{padding:54px 0;border-top:1px solid var(--line)}.section:first-of-type{border-top:0}
      ul{margin:18px 0 0;padding:0;list-style:none}li{padding:13px 0;border-bottom:1px solid var(--line);color:var(--muted);line-height:1.45}.link-grid{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px}
      .primary,.secondary{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:6px;text-decoration:none;font-weight:900}.primary{background:var(--accent);color:white}.secondary{border:1px solid var(--line);background:white;color:var(--accent-dark)}
      .note{margin-top:16px;color:var(--muted);font-size:13px;line-height:1.45}.index-list a{display:flex;justify-content:space-between;gap:16px;text-decoration:none}.index-list strong{color:var(--ink)}.index-list span{color:var(--muted)}
      @media(max-width:860px){.hero{grid-template-columns:1fr}.nav{align-items:flex-start}.index-list a{display:block}.primary,.secondary{width:100%}}
    </style>
    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
  </head>
  <body>
    <header class="nav">
      <a class="brand" href="${homeHref}"><img src="${assetBase}merchantfix-icon.png" alt="" /><span>MerchantFix</span></a>
      <a href="${previewHref}">Run Evidence Readiness Preview</a>
    </header>
    ${body}
  </body>
</html>`;
}

function renderTrustPage(page) {
  const sections = page.sections
    .map(section => `<section class="section"><p class="eyebrow">${escapeHtml(section.title)}</p><ul>${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`)
    .join("");
  const body = `<main>
      <section class="hero">
        <div>
          <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lede">${escapeHtml(page.lede)}</p>
        </div>
        <aside class="panel">
          <p class="eyebrow">Quick links</p>
          <h2>Keep the boundary visible.</h2>
          <p class="lede">Public preview, full intake, and support links live in one place.</p>
          <div class="link-grid">
            ${page.links.map(([label, href]) => `<a class="secondary" href="${href}">${escapeHtml(label)}</a>`).join("")}
          </div>
        </aside>
      </section>
      ${sections}
    </main>`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": page.canonical
  };
  return shell({ title: page.title, description: page.description, canonical: page.canonical, body, jsonLd, assetBase: "../../assets/", homeHref: "../../", previewHref: "../../#instant-check" });
}

function renderCategoryPage(page) {
  const body = `<main>
      <section class="hero">
        <div>
          <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.title)}</h1>
          <p class="lede">${escapeHtml(page.summary)}</p>
        </div>
        <aside class="panel">
          <p class="eyebrow">Use this category</p>
          <h2>Choose the right checklist first.</h2>
          <p class="lede">Each page stays tied to public-page evidence so the next step is clear.</p>
          <div class="link-grid">
            <a class="primary" href="../../#instant-check">Run free preview</a>
            <a class="secondary" href="../../">Home</a>
          </div>
        </aside>
      </section>
      <section class="section">
        <p class="eyebrow">Included errors</p>
        <ul class="index-list">${page.items.map(([label, file]) => `<li><a href="../${file}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(page.title)}</span></a></li>`).join("")}</ul>
      </section>
      <section class="section">
        <p class="eyebrow">Evidence needed</p>
        <ul>${page.evidence.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="section">
        <p class="eyebrow">Next step</p>
        <p class="lede">If your case already has an issue screenshot and affected product URL, move to the full-material intake for a human-read evidence brief.</p>
        <div class="link-grid">
          <a class="primary" href="../../#instant-check">Run evidence preview</a>
          <a class="secondary" href="https://tally.so/r/EkA01B?source=${page.slug}">Submit full materials</a>
        </div>
      </section>
    </main>`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": page.title,
      "description": page.description,
      "url": page.canonical,
      "hasPart": page.items.map(([label, file]) => ({
        "@type": "WebPage",
        "name": label,
        "url": `${siteUrl}/errors/${file}`
      }))
    }
  ];
  return shell({ title: `${page.title} - MerchantFix`, description: page.description, canonical: page.canonical, body, jsonLd, assetBase: "../../assets/", homeHref: "../../", previewHref: "../../#instant-check" });
}

function renderCategoryIndex(page) {
  const body = `<main>
      <section class="hero">
        <div>
          <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lede">${escapeHtml(page.lede)}</p>
        </div>
        <aside class="panel">
          <p class="eyebrow">Browse</p>
          <h2>Jump to the right cluster.</h2>
          <p class="lede">This hub sits between the error library and the trust docs.</p>
          <div class="link-grid">
            ${page.links.map(([label, href]) => `<a class="secondary" href="${href}">${escapeHtml(label)}</a>`).join("")}
          </div>
        </aside>
      </section>
      <section class="section">
        <p class="eyebrow">Category pages</p>
        <ul class="index-list">${page.links.map(([label, href]) => `<li><a href="${href}"><strong>${escapeHtml(label)}</strong><span>Category page</span></a></li>`).join("")}</ul>
      </section>
    </main>`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": page.title,
    "description": page.description,
    "url": page.canonical,
    "hasPart": page.links.map(([label, href]) => ({
      "@type": "WebPage",
      "name": label,
      "url": `${siteUrl}/errors/categories/${href}`
    }))
  };
  return shell({ title: page.title, description: page.description, canonical: page.canonical, body, jsonLd, assetBase: "../../assets/", homeHref: "../../", previewHref: "../../#instant-check" });
}

function llmsTxt() {
  return `# MerchantFix\n\nMerchantFix is an independent public-page evidence review for stores preparing Merchant Center materials.\n\n## Core pages\n- ${siteUrl}/\n- ${siteUrl}/errors/\n- ${siteUrl}/errors/categories/\n- ${siteUrl}/about.html\n- ${siteUrl}/contact.html\n- ${siteUrl}/privacy.html\n\n## Category pages\n- ${siteUrl}/errors/categories/product-identifiers.html\n- ${siteUrl}/errors/categories/content-and-landing.html\n- ${siteUrl}/errors/categories/price-and-availability.html\n- ${siteUrl}/errors/categories/shipping-and-tax.html\n- ${siteUrl}/errors/categories/variants-and-attributes.html\n- ${siteUrl}/errors/categories/trust-and-policy.html\n\n## Boundaries\n- Free preview runs locally in the browser.\n- Full materials enter Tally only when the user chooses to submit them.\n- No account login.\n- No appeal submission.\n- No promised platform decision.\n\n## Reference pages\n- ${siteUrl}/errors/missing-value-gtin.html\n- ${siteUrl}/errors/price-mismatch.html\n- ${siteUrl}/errors/shipping-cost-mismatch.html\n- ${siteUrl}/errors/misrepresentation.html\n`;
}

function sitemapUrls() {
  const current = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const urls = new Set([...current.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]));
  [
    `${siteUrl}/about.html`,
    `${siteUrl}/contact.html`,
    `${siteUrl}/privacy.html`,
    `${siteUrl}/errors/categories/`,
    ...categoryPages.map(page => `${siteUrl}/errors/categories/${page.slug}.html`)
  ].forEach(url => urls.add(url));
  return [...urls];
}

function sitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`;
}

fs.mkdirSync(path.join(root, "errors", "categories"), { recursive: true });

for (const page of trustPages) {
  fs.writeFileSync(path.join(root, page.file), renderTrustPage(page));
}

fs.writeFileSync(path.join(root, errorCategoryIndex.file), renderCategoryIndex(errorCategoryIndex));
for (const page of categoryPages) {
  const canonical = `${siteUrl}/errors/categories/${page.slug}.html`;
  fs.writeFileSync(path.join(root, "errors", "categories", `${page.slug}.html`), renderCategoryPage({
    ...page,
    canonical
  }));
}

fs.writeFileSync(path.join(root, "llms.txt"), llmsTxt());
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemapXml(sitemapUrls()));

console.log(`Generated ${trustPages.length + categoryPages.length + 2} support pages.`);


