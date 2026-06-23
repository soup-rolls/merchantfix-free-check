import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(root, "sitemap.xml");
const siteHost = "soup-rolls.github.io";
const key = "b6f0d8c4a9e14d28b5c7f3429016ab3e";
const keyLocation = `https://${siteHost}/merchantfix-free-check/${key}.txt`;

function getUrlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
}

async function submitIndexNow() {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const urlList = getUrlsFromSitemap(sitemap);

  if (!urlList.length) {
    throw new Error("No URLs found in sitemap.xml");
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: siteHost,
      key,
      keyLocation,
      urlList
    })
  });

  const body = await response.text();
  console.log(JSON.stringify({
    status: response.status,
    ok: response.ok,
    submitted: urlList.length,
    keyLocation,
    body
  }, null, 2));

  if (!response.ok) {
    process.exitCode = 1;
  }
}

submitIndexNow().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
