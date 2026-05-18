const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

const URLS = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/plan", priority: "0.9", changefreq: "monthly" },
  { loc: "/for-architects", priority: "0.7", changefreq: "monthly" },
  { loc: "/about", priority: "0.5", changefreq: "monthly" },
];

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(
  (u) => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
