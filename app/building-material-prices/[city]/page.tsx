export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock } from "@/components/shared/FAQBlock";
import { PriceTable } from "@/components/materials/PriceTable";
import { PriceTrend } from "@/components/materials/PriceTrend";
import { EmbedButton } from "@/components/materials/EmbedButton";
import { getCurrentPrices, getTrend, getLatestDate } from "@/lib/materials/queries";
import { buildDatasetSchema, buildFAQSchema, formatMonthYear, nextMonthYear } from "@/lib/materials/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

const CITY_META: Record<string, { label: string; state: string }> = {
  hosur:     { label: "Hosur",     state: "Tamil Nadu" },
  bangalore: { label: "Bangalore", state: "Karnataka"  },
};

const TREND_MATERIALS = ["Cement, OPC 53 grade", "TMT steel, Fe500"];

type PageProps = { params: { city: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = CITY_META[params.city];
  if (!meta) return {};

  const latestDate = await getLatestDate(params.city);
  const monthStr = latestDate ? formatMonthYear(latestDate) : "2026";
  const pageUrl = `${SITE_URL}/building-material-prices/${params.city}`;

  const title = `Building Material Prices in ${meta.label} (${monthStr}) | Estimato`;
  const desc = `Current ${meta.label} rates for cement, TMT steel, M-sand, aggregates, bricks — updated ${monthStr} from verified procurement records. Prices ex-dealer, excl. GST.`;

  return {
    title,
    description: desc,
    alternates: { canonical: pageUrl },
    openGraph: {
      title, description: desc, url: pageUrl,
      type: "website", siteName: "Estimato", locale: "en_IN",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const meta = CITY_META[params.city];
  if (!meta) notFound();

  const pageUrl = `${SITE_URL}/building-material-prices/${params.city}`;

  const [prices, trends, latestDate] = await Promise.all([
    getCurrentPrices(params.city),
    getTrend(params.city, TREND_MATERIALS),
    getLatestDate(params.city),
  ]);

  const month     = latestDate ? formatMonthYear(latestDate) : "—";
  const nextMonth = latestDate ? nextMonthYear(latestDate)   : "—";

  const faqs = [
    {
      question: "How often are these prices updated?",
      answer:
        `Prices are updated on the first of each month. The current data is from ${month}. Every row in the table shows the exact month it was recorded so you can judge freshness at a glance.`,
    },
    {
      question: "Where do these rates come from?",
      answer:
        `Rates are sourced from Design Intend's active project procurement records and direct dealer surveys in ${meta.label}. These are prices a working architecture studio actually pays, not published list prices or estimates.`,
    },
    {
      question: "Do these prices include GST and transport?",
      answer:
        "No. All prices are ex-dealer — the base material rate before GST (18% on most construction materials) and before transport. Add ₹2–8 per unit for transport depending on site distance and order volume.",
    },
    {
      question: "How accurate are these rates for my project?",
      answer:
        "These are mid-market rates for typical residential quantities. Your actual price may vary by 5–15% depending on order size, payment terms, supplier relationship, and site location within the city. Use these as planning benchmarks, not purchase quotes.",
    },
  ];

  const datasetSchema = buildDatasetSchema({
    cityLabel: meta.label,
    cityState: meta.state,
    latestDate: latestDate ?? new Date().toISOString().slice(0, 10),
    pageUrl,
    materials: prices.map((p) => p.material),
  });

  const faqSchema = buildFAQSchema(faqs);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",                     item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Building material prices",  item: `${SITE_URL}/building-material-prices` },
      { "@type": "ListItem", position: 3, name: `${meta.label} rates`,       item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader maxWidth="max-w-5xl" />

      <main className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70" style={{ color: "var(--text-tertiary)" }}>
            Estimato
          </Link>
          <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
          <Link href="/building-material-prices" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70" style={{ color: "var(--text-tertiary)" }}>
            Material prices
          </Link>
          <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-secondary)" }}>
            {meta.label}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
            {meta.label} &middot; {meta.state} &middot; Verified procurement data
          </p>
          <h1 className="font-serif mb-4" style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-primary)" }}>
            Building material prices<br className="hidden sm:block" /> in {meta.label}
          </h1>

          {/* Freshness — the most important line on this page */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", border: "1px solid var(--accent)", borderRadius: 2, background: "rgba(196,154,60,0.04)", marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
            <p className="font-mono" style={{ fontSize: 12, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
              Last updated: <strong>{month}</strong>
              <span style={{ color: "var(--text-tertiary)", marginLeft: 10 }}>Next update: {nextMonth}</span>
            </p>
          </div>

          <p className="font-sans" style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: "56ch" }}>
            Current rates for seven key construction materials in {meta.label}. Sourced from Design Intend&apos;s
            active project procurement records. All prices are ex-dealer — GST (18%) and transport are not included.
          </p>
        </div>

        {/* Embed / cite */}
        <div className="mb-10">
          <EmbedButton cityLabel={meta.label} month={month} pageUrl={pageUrl} />
        </div>

        {/* Current rates table */}
        <div className="mb-14">
          <h2 className="font-serif mb-5" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Current rates — {month}
          </h2>
          <PriceTable materials={prices} />
          <p className="font-mono mt-3" style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            All rates ex-dealer &middot; Excluding GST (18%) and transport &middot; Typical residential quantities
          </p>
        </div>

        {/* 12-month trend */}
        {trends.some((t) => t.points.length > 1) && (
          <div className="mb-14">
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
              <h2 className="font-serif mb-2" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                12-month trend
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                Midpoint of recorded min&ndash;max range. Cement (₹/bag) and TMT steel (₹/kg).
              </p>
              <PriceTrend trends={trends} />
            </div>
          </div>
        )}

        {/* How we source this */}
        <div className="mb-14" style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-serif mb-4" style={{ fontSize: 20, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            How we source these prices
          </h2>
          <p className="font-sans" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "62ch" }}>
            Prices are sourced on the first of each month from Design Intend&apos;s active project procurement
            records and direct supplier quotes in {meta.label}. Design Intend is an architecture and construction
            studio with ongoing projects across {params.city === "hosur" ? "Hosur, Attibele, and Krishnagiri" : "Bangalore and the surrounding metropolitan area"}.
            These are the rates the firm actually pays for current projects &mdash; not published list prices,
            not estimates. Every row in the table names the source and date it was recorded.
            Prices are ex-dealer: GST (18% on most materials) and transport (₹2&ndash;8 per unit depending
            on distance and volume) are not included.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-16" style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 className="font-serif mb-6" style={{ fontSize: 20, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <FAQBlock items={faqs} />
        </div>

        {/* Soft CTA — at the bottom only, never blocking */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: "var(--text-tertiary)" }}>
            Planning to build?
          </p>
          <p className="font-serif mb-4" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Get a full construction cost estimate for your plot.
          </p>
          <p className="font-sans mb-6" style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "48ch" }}>
            Material rates are one input. Our construction calculator combines them with labour,
            supervision, and finishes to give you a full project range &mdash; by plot size and quality tier.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/construction-cost/${params.city === "hosur" ? "hosur" : "bangalore"}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 22px",
                borderRadius: 2, border: "1px solid #0D1F3C",
                background: "#0D1F3C", color: "#fff",
                fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em",
                textDecoration: "none", transition: "opacity 150ms",
              }}
            >
              View construction costs in {meta.label} &rarr;
            </Link>
            <Link
              href="/plan"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 22px",
                borderRadius: 2, border: "1px solid var(--border)",
                background: "transparent", color: "var(--text-secondary)",
                fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em",
                textDecoration: "none", transition: "opacity 150ms",
              }}
            >
              Get my estimate
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}
