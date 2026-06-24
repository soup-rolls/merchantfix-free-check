import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://soup-rolls.github.io/merchantfix-free-check";
const lastmod = "2026-06-25";

const pages = [
  {
    slug: "gmc-misrepresentation-checklist",
    title: "GMC Misrepresentation Checklist",
    h1: "GMC misrepresentation checklist for public-page evidence",
    description: "Check public-page evidence gaps for a Google Merchant Center misrepresentation issue before preparing review materials.",
    intent: "The searcher already sees a misrepresentation warning and wants a practical checklist, not a generic policy article.",
    issue: "Misrepresentation usually needs visible public trust evidence: policies, contact path, business identity, product claims, prices, and support expectations.",
    freeCheck: [
      "Can a reviewer reach contact, shipping, returns/refund, privacy, and terms pages without login?",
      "Do product claims, discount language, price, and availability match the visible product page?",
      "Is the business identity and support path consistent across homepage, footer, product page, and policies?",
      "Does the issue screenshot mention misleading promotions, unreliable claims, or suspicious store behavior?"
    ],
    paidFit: "$29 Snapshot when the case has one clear issue path. $99 Fix Pack when trust, policy, contact, and product-page evidence all need cleanup.",
    related: ["untrusted-store-evidence-check", "merchant-center-return-policy-missing", "merchant-center-contact-information-checker"]
  },
  {
    slug: "untrusted-store-evidence-check",
    title: "Untrusted Store Evidence Check",
    h1: "Untrusted store evidence check for Merchant Center",
    description: "Find visible trust and policy evidence gaps behind an untrusted store issue before sending materials for review.",
    intent: "The searcher wants to know why a store looks untrusted from public pages.",
    issue: "Untrusted store issues often come from weak contact paths, vague policies, inconsistent identity, or unsupported buyer-facing claims.",
    freeCheck: [
      "Can a buyer find contact, shipping, return/refund, privacy, and terms links quickly?",
      "Are support expectations, return windows, shipping regions, and exceptions specific?",
      "Is the store identity consistent across homepage, product page, footer, and policy pages?",
      "Are trust badges, reviews, discounts, and claims supported by visible evidence?"
    ],
    paidFit: "$29 Snapshot for one store-trust pass. $99 Fix Pack when multiple policy pages need specific copy blocks.",
    related: ["gmc-misrepresentation-checklist", "merchant-center-contact-information-checker", "merchant-center-return-policy-missing"]
  },
  {
    slug: "merchant-center-price-mismatch-checker",
    title: "Merchant Center Price Mismatch Checker",
    h1: "Merchant Center price mismatch checker",
    description: "Check product page, variant, sale price, currency, and checkout-adjacent evidence for Merchant Center price mismatch issues.",
    intent: "The searcher has a price mismatch warning and needs to locate the evidence conflict fast.",
    issue: "Price mismatch happens when feed price, landing-page price, variant price, sale price, currency, or region behavior does not line up.",
    freeCheck: [
      "Does the default landing-page price match the affected feed price and currency?",
      "Do variant selections change price, availability, or URL state?",
      "Is sale price separated from regular price with a clear active window?",
      "Do region, currency, or checkout-adjacent signals change the visible price?"
    ],
    paidFit: "$29 Snapshot is usually enough for one affected product or one price path. $99 Fix Pack fits multi-product or policy-linked pricing cleanup.",
    related: ["merchant-center-availability-mismatch-checker", "merchant-center-shipping-cost-mismatch", "gmc-misrepresentation-checklist"]
  },
  {
    slug: "merchant-center-return-policy-missing",
    title: "Merchant Center Return Policy Missing",
    h1: "Return policy missing checklist for Merchant Center",
    description: "Check whether return and refund evidence is public, reachable, specific, and consistent before preparing Merchant Center materials.",
    intent: "The searcher needs to know what public return policy evidence is missing.",
    issue: "A return policy can be treated as missing when it is absent, empty, hard to reach, inconsistent, or blocked behind country gates or templates.",
    freeCheck: [
      "Is the return/refund policy reachable from homepage, footer, product page, or checkout-adjacent navigation?",
      "Does it define return window, refund timing, exceptions, final-sale items, and customer responsibility?",
      "Are return, refund, shipping, and terms pages consistent?",
      "Does the policy load publicly without login, country gate, or empty template content?"
    ],
    paidFit: "$29 Snapshot for one policy evidence gap. $99 Fix Pack if return, shipping, contact, and terms need coordinated edits.",
    related: ["gmc-misrepresentation-checklist", "untrusted-store-evidence-check", "merchant-center-shipping-cost-mismatch"]
  },
  {
    slug: "merchant-center-contact-information-checker",
    title: "Merchant Center Contact Information Checker",
    h1: "Contact information checker for Merchant Center evidence",
    description: "Check whether public contact, support, business identity, and response expectations are visible enough for Merchant Center evidence review.",
    intent: "The searcher needs a quick way to identify weak public contact evidence.",
    issue: "Contact evidence is weak when support paths are hidden, generic, inconsistent, or missing a practical way for buyers to reach the seller.",
    freeCheck: [
      "Is there a reachable contact page or support method from the homepage and product page?",
      "Does the page show support email, form, business identity, or response expectation where appropriate?",
      "Are contact details consistent with policies, footer, and terms?",
      "Does the contact path work without login or account-only access?"
    ],
    paidFit: "$29 Snapshot for one contact/support evidence read. $99 Fix Pack when contact, policy, and product pages need coordinated copy.",
    related: ["untrusted-store-evidence-check", "gmc-misrepresentation-checklist", "merchant-center-return-policy-missing"]
  },
  {
    slug: "merchant-center-shipping-cost-mismatch",
    title: "Merchant Center Shipping Cost Mismatch",
    h1: "Shipping cost mismatch checklist for Merchant Center",
    description: "Check public shipping policy and checkout-adjacent evidence for Merchant Center shipping cost mismatch issues.",
    intent: "The searcher wants to understand why submitted shipping values conflict with public evidence.",
    issue: "Shipping mismatch often appears when region, method, threshold, exception, or checkout-estimate evidence conflicts with submitted values.",
    freeCheck: [
      "Does the shipping policy show regions, timing, cost logic, and exceptions?",
      "Does checkout-adjacent evidence match the policy language?",
      "Are free-shipping thresholds and excluded products visible?",
      "Is the affected product subject to weight, region, or delivery restrictions?"
    ],
    paidFit: "$29 Snapshot for one shipping path. $99 Fix Pack if shipping, return, terms, and product-page copy all need alignment.",
    related: ["merchant-center-price-mismatch-checker", "merchant-center-return-policy-missing", "gmc-misrepresentation-checklist"]
  },
  {
    slug: "merchant-center-availability-mismatch-checker",
    title: "Merchant Center Availability Mismatch Checker",
    h1: "Availability mismatch checker for Merchant Center",
    description: "Check product-page availability, variant state, preorder language, and add-to-cart evidence for Merchant Center availability mismatch.",
    intent: "The searcher has an availability mismatch warning and needs to find visible page conflict.",
    issue: "Availability mismatch happens when feed availability does not match public product page, variant, preorder, or purchase-state evidence.",
    freeCheck: [
      "Does the product page clearly show in stock, out of stock, preorder, or backorder?",
      "Do variants change availability after selection?",
      "Is add-to-cart or checkout-adjacent behavior consistent with the visible availability text?",
      "Does sale, bundle, or region behavior change purchase availability?"
    ],
    paidFit: "$29 Snapshot for one product/variant path. $99 Fix Pack when multiple product pages or policy explanations need alignment.",
    related: ["merchant-center-price-mismatch-checker", "merchant-center-shipping-cost-mismatch", "gmc-misrepresentation-checklist"]
  },
  {
    slug: "merchant-center-gtin-missing-fix",
    title: "Merchant Center GTIN Missing Fix Checklist",
    h1: "GTIN missing fix checklist for Merchant Center evidence",
    description: "Check public brand, product identifier, and issue evidence before preparing materials for a missing GTIN Merchant Center issue.",
    intent: "The searcher sees Missing value [gtin] and wants a practical evidence checklist.",
    issue: "GTIN issues need product identifier context, brand or manufacturer evidence, and affected product URLs. Not every case is solved by inventing a number.",
    freeCheck: [
      "Does the product have a visible brand, manufacturer, model, or product identifier?",
      "Is the affected product new, custom, handmade, bundled, or refurbished?",
      "Does the issue screenshot specify GTIN, brand, MPN, or identifier_exists?",
      "Is there public evidence supporting why an identifier is present or unavailable?"
    ],
    paidFit: "$29 Snapshot for one product identifier question. $99 Fix Pack if many products need grouping and evidence cleanup.",
    related: ["merchant-center-price-mismatch-checker", "gmc-misrepresentation-checklist", "untrusted-store-evidence-check"]
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPage(page) {
  const canonical = `${siteUrl}/guides/${page.slug}.html`;
  const faq = [
    {
      q: `What should I check first for ${page.title}?`,
      a: page.freeCheck[0]
    },
    {
      q: "Does MerchantFix log in or submit appeals?",
      a: "No. MerchantFix only reviews public-page evidence and buyer-submitted context. It does not log in, submit appeals, or promise platform outcomes."
    },
    {
      q: "When is the $99 Fix Pack better than the $29 Snapshot?",
      a: "Use the $99 Fix Pack when the issue spans multiple public pages or needs coordinated policy, contact, product-page, and response-draft cleanup."
    }
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      headline: page.h1,
      description: page.description,
      url: canonical,
      isPartOf: {
        "@type": "WebSite",
        name: "MerchantFix",
        url: siteUrl
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
    }
  ];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(page.title)} - MerchantFix</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="../favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" href="../assets/merchantfix-icon.png" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/assets/merchantfix-og.png" />
    <style>
      :root{color-scheme:light dark;--ink:#151613;--muted:#53615d;--line:#dbe3e1;--paper:#f4f7f6;--accent:#27735e;--accent-dark:#174f41;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      *{box-sizing:border-box}body{margin:0;background:linear-gradient(90deg,rgba(23,79,65,.045) 1px,transparent 1px),linear-gradient(180deg,rgba(23,79,65,.035) 1px,transparent 1px),linear-gradient(180deg,#fbfdfd 0%,var(--paper) 100%);background-size:44px 44px,44px 44px,auto;color:var(--ink)}a{color:inherit}.nav{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid rgba(21,22,19,.08);background:rgba(251,253,253,.92);position:sticky;top:0;z-index:10;backdrop-filter:blur(18px)}.brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:900}.brand img{width:30px;height:30px}.nav a:last-child{color:var(--accent-dark);font-size:14px;font-weight:900;text-decoration:none}
      main{padding:clamp(38px,6vw,78px) clamp(20px,6vw,88px)}.hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(320px,.56fr);gap:clamp(34px,6vw,78px);align-items:start}.eyebrow{margin:0 0 12px;color:var(--accent);font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:0}h1{margin:0;max-width:860px;font-size:clamp(38px,5.4vw,72px);line-height:.98;letter-spacing:0}h2{margin:0;font-size:clamp(25px,3.2vw,42px);line-height:1.04}.lede{max-width:700px;margin:24px 0 0;color:var(--muted);font-size:clamp(17px,2vw,22px);line-height:1.5}.panel{border-left:2px solid var(--accent);padding-left:24px}.section{padding:48px 0;border-top:1px solid var(--line)}ul{margin:18px 0 0;padding:0;list-style:none}li{padding:14px 0;border-bottom:1px solid var(--line);color:var(--muted);line-height:1.45}li strong{color:var(--ink)}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.primary,.secondary{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 18px;border-radius:6px;text-decoration:none;font-weight:900}.primary{background:var(--accent);color:#fff}.secondary{border:1px solid var(--line);background:#fbfdfc;color:var(--accent-dark)}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:20px}.box{border-top:2px solid var(--accent);padding-top:18px}.note{margin-top:16px;color:var(--muted);font-size:13px;line-height:1.45}.site-footer{padding:28px clamp(20px,6vw,88px) 48px;border-top:1px solid var(--line);background:#fbfdfc}.site-footer nav{display:flex;flex-wrap:wrap;gap:10px 16px}.site-footer a{color:var(--accent-dark);font-weight:900;text-decoration:none}
      @media(max-width:900px){.hero,.comparison{grid-template-columns:1fr}.primary,.secondary{width:100%}.nav{align-items:flex-start}}@media(prefers-color-scheme:dark){:root{--ink:#f4f6f1;--muted:#bcc4b6;--line:#314036;--paper:#101612;--accent:#78c5a7;--accent-dark:#a9e3c7}body{background:linear-gradient(180deg,#101612 0%,#0d120f 100%)}.nav,.site-footer{background:rgba(16,22,18,.92)}.secondary{background:#141a16}.primary{color:#0d120f}}
    </style>
    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
  </head>
  <body>
    <header class="nav">
      <a class="brand" href="../"><img src="../assets/merchantfix-icon.png" alt="" /><span>MerchantFix</span></a>
      <a href="../#instant-check">Run free preview</a>
    </header>
    <main>
      <section class="hero">
        <div>
          <p class="eyebrow">High-intent checklist</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lede">${escapeHtml(page.description)}</p>
          <div class="actions">
            <a class="primary" href="../#instant-check">Run free preview</a>
            <a class="secondary" href="../checkout.html">Compare $29 and $99 scope</a>
          </div>
        </div>
        <aside class="panel">
          <p class="eyebrow">Search intent answer</p>
          <h2>What this page solves.</h2>
          <p class="lede">${escapeHtml(page.intent)}</p>
          <p class="note">Independent checklist. Not Google, not an appeal service, no account login, no promised outcome.</p>
        </aside>
      </section>
      <section class="section">
        <p class="eyebrow">Issue pattern</p>
        <h2>${escapeHtml(page.issue)}</h2>
      </section>
      <section class="section">
        <p class="eyebrow">Free self-check</p>
        <ul>${page.freeCheck.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="section comparison">
        <div class="box">
          <p class="eyebrow">$29 Evidence Snapshot</p>
          <h2>Compact read.</h2>
          <ul>
            <li>One issue path</li>
            <li>1-2 page evidence brief</li>
            <li>3-5 priority findings</li>
            <li>One suggested response paragraph</li>
          </ul>
        </div>
        <div class="box">
          <p class="eyebrow">$99 Evidence Fix Pack</p>
          <h2>Broader cleanup.</h2>
          <ul>
            <li>Snapshot scope included</li>
            <li>Page-by-page edit checklist</li>
            <li>Policy-link map</li>
            <li>Before/after copy blocks and revised response draft</li>
          </ul>
        </div>
      </section>
      <section class="section">
        <p class="eyebrow">Paid fit</p>
        <h2>${escapeHtml(page.paidFit)}</h2>
        <div class="actions">
          <a class="primary" href="https://tally.so/r/EkA01B?source=${page.slug}&utm_source=merchantfix_pseo&utm_campaign=high_intent" target="_blank" rel="noopener noreferrer">Submit materials first</a>
          <a class="secondary" href="../sample-report.html">View sample report</a>
        </div>
      </section>
      <section class="section">
        <p class="eyebrow">Related checks</p>
        <ul>${page.related.map(slug => {
          const related = pages.find(item => item.slug === slug);
          return `<li><a href="${slug}.html"><strong>${escapeHtml(related?.title || slug)}</strong></a></li>`;
        }).join("")}</ul>
      </section>
    </main>
    <footer class="site-footer">
      <nav>
        <a href="../privacy.html">Privacy</a>
        <a href="../terms.html">Terms</a>
        <a href="../contact.html">Contact</a>
        <a href="../errors/">Error library</a>
      </nav>
    </footer>
  </body>
</html>`;
}

function updateSitemap() {
  const sitemapPath = path.join(root, "sitemap.xml");
  const current = fs.readFileSync(sitemapPath, "utf8");
  const urls = new Set([...current.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]));
  for (const page of pages) {
    urls.add(`${siteUrl}/guides/${page.slug}.html`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].map(url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml);
}

function updateLlms() {
  const llmsPath = path.join(root, "llms.txt");
  let content = fs.readFileSync(llmsPath, "utf8");
  const block = `\n## High-intent guides\n${pages.map(page => `- ${siteUrl}/guides/${page.slug}.html`).join("\n")}\n`;
  content = content.replace(/\n## High-intent guides\n[\s\S]*?(?=\n## |$)/, "");
  fs.writeFileSync(llmsPath, `${content.trim()}\n${block}`);
}

fs.mkdirSync(path.join(root, "guides"), { recursive: true });
for (const page of pages) {
  fs.writeFileSync(path.join(root, "guides", `${page.slug}.html`), renderPage(page));
}
updateSitemap();
updateLlms();

console.log(`Generated ${pages.length} high-intent guide pages.`);
