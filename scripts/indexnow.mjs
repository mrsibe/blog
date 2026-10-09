// Submit the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver, ...).
//
// Usage:
//   node scripts/indexnow.mjs [sitemap-url]
//
// The public key is served from https://<host>/<key>.txt (see public/<key>.txt).

const KEY = process.env.INDEXNOW_KEY || "1383de5cca6bb0c559a90d754e7ec30a";
const HOST = process.env.INDEXNOW_HOST || "mrsibe.top";
const SITEMAP_URL =
	process.argv[2] || process.env.SITEMAP_URL || `https://${HOST}/sitemap-0.xml`;

const sitemapResponse = await fetch(SITEMAP_URL);
if (!sitemapResponse.ok) {
	throw new Error(`Failed to fetch sitemap ${SITEMAP_URL}: ${sitemapResponse.status}`);
}

const xml = await sitemapResponse.text();
const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(
	(match) => match[1],
);

if (urlList.length === 0) {
	console.log("No URLs found in sitemap, nothing to submit.");
	process.exit(0);
}

console.log(`Submitting ${urlList.length} URL(s) to IndexNow...`);

const response = await fetch("https://api.indexnow.org/indexnow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host: HOST,
		key: KEY,
		keyLocation: `https://${HOST}/${KEY}.txt`,
		urlList,
	}),
});

console.log(`IndexNow responded ${response.status} ${response.statusText}`);
if (!response.ok) {
	process.exit(1);
}
