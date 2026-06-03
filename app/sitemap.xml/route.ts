export const runtime = 'edge';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

const URLS = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/plan", priority: "0.9", changefreq: "monthly" },
  { loc: "/construction-cost/hosur", priority: "0.9", changefreq: "weekly" },
  { loc: "/for-architects", priority: "0.7", changefreq: "monthly" },
  { loc: "/about", priority: "0.5", changefreq: "monthly" },
  { loc: "/methodology", priority: "0.6", changefreq: "monthly" },
  // Tier 2 — Hosur plot size pages
  { loc: "/construction-cost/hosur/20x30", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/30x40", priority: "0.9", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/30x50", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/40x60", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/20x40", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/30x30", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/40x40", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/50x80", priority: "0.7", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/30x60", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/40x50", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/25x40", priority: "0.8", changefreq: "monthly" },
  { loc: "/construction-cost/hosur/60x40", priority: "0.7", changefreq: "monthly" },
  // Tier 3 — Hosur home type pages
  { loc: "/villa-construction-cost/hosur", priority: "0.8", changefreq: "monthly" },
  { loc: "/duplex-construction-cost/hosur", priority: "0.8", changefreq: "monthly" },
  { loc: "/independent-house-construction-cost/hosur", priority: "0.8", changefreq: "monthly" },
  // Tier 4 — Hosur budget pages
  { loc: "/40-lakh-house-hosur", priority: "0.8", changefreq: "monthly" },
  { loc: "/50-lakh-house-hosur", priority: "0.8", changefreq: "monthly" },
  { loc: "/60-lakh-house-hosur", priority: "0.8", changefreq: "monthly" },
  { loc: "/1-crore-house-hosur", priority: "0.8", changefreq: "monthly" },
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
