import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "output", "visual-check");
const pages = [
  "index.html",
  "checkout.html",
  "sample-report.html",
  "terms.html",
  "errors/index.html",
  "errors/misrepresentation.html",
  "errors/untrusted-store.html",
  "errors/price-mismatch.html",
  "errors/missing-value-gtin.html",
  "errors/return-policy-missing.html",
  "errors/categories/trust-and-policy.html",
  "guides/gmc-misrepresentation-checklist.html",
  "guides/untrusted-store-evidence-check.html",
  "guides/merchant-center-price-mismatch-checker.html",
  "guides/merchant-center-return-policy-missing.html",
  "guides/merchant-center-contact-information-checker.html"
];

const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 1200 }
];

async function launchBrowser() {
  const channels = ["chrome", "msedge"];
  for (const channel of channels) {
    try {
      return await chromium.launch({ channel });
    } catch {
      // Try the next installed browser channel.
    }
  }
  return chromium.launch();
}

await mkdir(outputDir, { recursive: true });

const browser = await launchBrowser();
try {
  for (const pageName of pages) {
    const pageUrl = pathToFileURL(path.join(root, pageName)).href;
    const slug = pageName.replace(".html", "").replace(/[\\/]/g, "-") || "index";
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });

    const consoleErrors = [];
    page.on("console", message => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", error => consoleErrors.push(error.message));

    await page.goto(pageUrl, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outputDir, `${slug}-${viewport.name}.png`),
      fullPage: false
    });

    if (consoleErrors.length) {
      console.error(`[${viewport.name}] console errors:`);
      for (const error of consoleErrors) console.error(`- ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`[${slug}:${viewport.name}] OK -> output/visual-check/${slug}-${viewport.name}.png`);
    }

    await page.close();
  }
  }
} finally {
  await browser.close();
}
