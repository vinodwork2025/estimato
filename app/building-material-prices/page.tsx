export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { getLatestDate } from "@/lib/materials/queries";
import { formatMonthYear } from "@/lib/materials/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/building-material-prices`;

export const metadata: Metadata = {
  title: "Building Material Prices in India (2026) | Estimato",
  description:
    "Current construction material rates for Hosur and Bangalore. Cement, TMT steel, M-sand, aggregates, bricks — updated monthly from verified procurement records.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Building Material Prices in India (2026) | Estimato",
    description:
      "Current construction material rates for Hosur and Bangalore. Updated monthly from verified procurement records.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

const CITIES: { slug: string; label: string; state: string; desc: string }[] = [
  {
    slug:  "hosur",
    label: "Hosur",
    state: "Tamil Nadu",
    desc:  "Fast-growing industrial corridor near Bengaluru. Active residential construction market with competitive supplier rates.",
  },
  {
    slug:  "bangalore",
    label: "Bangalore",
    state: "Karnataka",
    desc:  "India's largest tech city. Higher material demand pushes rates 5–15% above satellite towns. Central zone premiums apply.",
  },
];

const TRACKED = [
  "Cement, OPC 53 grade",
  "TMT steel, Fe500",
  "M-sand",
  "River sand",
  "Aggregate, 20mm",
  "Red bricks",
  "Concrete blocks, 8 inch",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  name: "Building Material Prices in India (2026)",
  url: PAGE_URL,
  description:
    "Monthly-updated construction material rates for Hosur and Bangalore. Sourced from verified procurement records.",
  publisher: { "@type": "Organization", name: "Estimato", url: SITE_URL },
};

export default async function Page() {
  // Fetch latest dates for both cities in parallel
  const [hosurDate, bangaloreDate] = await Promise.all([
    getLatestDate("hosur"),
    getLatestDate("bangalore"),
  ]);

  const latestMap: Record<string, string | null> = {
    hosur:     hosurDate,
    bangalore: bangaloreDate,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader maxWidth="max-w-5xl" />

      <main className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">

        {/* Header */}
        <div className="mb-12">
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70" style={{ color: "var(--text-tertiary)" }}>
              Estimato
            </Link>
            <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-secondary)" }}>
              Building material prices
            </span>
          </nav>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
            Updated monthly &middot; Verified procurement records
          </p>
          <h1 className="font-serif mb-4" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-primary)" }}>
            Building material prices
          </h1>
          <p className="font-sans" style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: "54ch" }}>
            Current rates for cement, TMT steel, sand, aggregates, and masonry in Hosur and Bangalore.
            Sourced from Design Intend&apos;s active project procurement &mdash; the price a working
            architecture studio actually pays, updated on the first of each month.
          </p>
        </div>

        {/* City cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {CITIES.map((city) => {
            const latest = latestMap[city.slug];
            return (
              <Link
                key={city.slug}
                href={`/building-material-prices/${city.slug}`}
                className="group block"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 2,
                  padding: "28px 28px",
                  background: "#fff",
                  transition: "border-color 160ms, box-shadow 160ms",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                  <div>
                    <p className="font-serif" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1, marginBottom: 2 }}>
                      {city.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>
                      {city.state}
                    </p>
                  </div>
                  <span className="font-mono" style={{ fontSize: 18, color: "var(--accent)", lineHeight: 1, flexShrink: 0 }}>
                    &rarr;
                  </span>
                </div>
                <p className="font-sans mb-5" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {city.desc}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: latest ? "var(--accent)" : "var(--text-tertiary)" }}>
                  {latest ? `Last updated: ${formatMonthYear(latest)}` : "Data loading"}
                </p>
              </Link>
            );
          })}
        </div>

        {/* What we track */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 40 }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-5" style={{ color: "var(--text-tertiary)" }}>
            Materials tracked
          </p>
          <div className="flex flex-wrap gap-2">
            {TRACKED.map((m) => (
              <span
                key={m}
                className="font-mono"
                style={{
                  fontSize: 12, padding: "5px 12px", borderRadius: 1,
                  border: "1px solid var(--border)", color: "var(--text-secondary)",
                  background: "rgba(14,33,70,0.02)",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Source note */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--text-tertiary)" }}>
            Data source
          </p>
          <p className="font-sans" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "58ch" }}>
            Prices are sourced from Design Intend&apos;s active project procurement records and direct dealer surveys
            in each city. All rates are ex-dealer, excluding GST (18% on most materials) and transport.
            Rates reflect mid-market prices for typical residential quantities.
          </p>
        </div>

      </main>
    </>
  );
}
