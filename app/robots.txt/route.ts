export const runtime = 'edge';

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in"}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
