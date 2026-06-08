// UPDATE MONTHLY. This page's value is freshness. Refresh prices and the dateModified on the first of each month.

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/hosur/material-prices`;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Construction Material Prices in Hosur (June 2026) | Estimato",
  description:
    "Current 2026 Hosur prices for cement, TMT steel, M-sand, aggregates, bricks, and more. Updated monthly with 1, 3, and 5-year price changes.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Material Prices in Hosur (June 2026) | Estimato",
    description:
      "Current 2026 Hosur prices for cement, TMT steel, M-sand, aggregates, bricks, and more. Updated monthly with 1, 3, and 5-year price changes.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Schema ───────────────────────────────────────────────────────────────────

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: "Construction cost intelligence platform for Indian homeowners.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Hosur", item: `${SITE_URL}/construction-cost/hosur` },
      { "@type": "ListItem", position: 4, name: "Construction Material Prices Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Construction Material Prices in Hosur (2026)",
    url: PAGE_URL,
    description:
      "Monthly market prices for cement, TMT steel, M-sand, river sand, aggregates, bricks, tiles, and labor rates in Hosur, Tamil Nadu. With 1-year, 3-year, and 5-year changes.",
    dateModified: "2026-06-01",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Construction Material Prices in Hosur, Tamil Nadu (June 2026)",
    description:
      "Monthly market prices for cement (OPC 53, PPC), TMT steel (Fe 550D), M-sand, P-sand, river sand, coarse aggregates, clay bricks, AAC blocks, ready mix concrete, vitrified tiles, premium granite, and UPVC windows in Hosur. Includes daily labor rates for masons, tile layers, carpenters, bar benders, electricians, plumbers, painters, and helpers. All prices include 1-year, 3-year, and 5-year percentage changes.",
    url: PAGE_URL,
    dateModified: "2026-06-01",
    datePublished: "2026-06-01",
    creator: {
      "@type": "Organization",
      name: "Estimato",
      url: SITE_URL,
    },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    spatialCoverage: {
      "@type": "Place",
      name: "Hosur",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hosur",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    temporalCoverage: "2026-06",
    measurementTechnique: "Market survey of local suppliers, contractors, and material dealers in Hosur, Tamil Nadu.",
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: PAGE_URL,
      },
    ],
    variableMeasured: [
      { "@type": "PropertyValue", name: "Cement (OPC 53) price per 50 kg bag", unitText: "INR", value: "395" },
      { "@type": "PropertyValue", name: "Cement (PPC) price per 50 kg bag", unitText: "INR", value: "365" },
      { "@type": "PropertyValue", name: "TMT Steel (Fe 550D) price per ton", unitText: "INR", value: "72500" },
      { "@type": "PropertyValue", name: "M-Sand (concrete) price per ton", unitText: "INR", value: "1250" },
      { "@type": "PropertyValue", name: "P-Sand (plaster) price per ton", unitText: "INR", value: "1450" },
      { "@type": "PropertyValue", name: "River Sand (regulated) price per ton", unitText: "INR", value: "2200" },
      { "@type": "PropertyValue", name: "Ready Mix Concrete (M25) price per m³", unitText: "INR", value: "5800" },
    ],
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const MATERIALS = [
  { material: "Cement (OPC 53)",      unit: "50 kg bag",  price: "₹395",    y1: "+5.3%",  y3: "+12.8%", y5: "+16.1%" },
  { material: "Cement (PPC)",         unit: "50 kg bag",  price: "₹365",    y1: "+4.2%",  y3: "+10.6%", y5: "+14.0%" },
  { material: "TMT Steel (Fe 550D)",  unit: "1 ton",      price: "₹72,500", y1: "+6.6%",  y3: "+15.0%", y5: "+24.1%" },
  { material: "M-Sand (concrete)",    unit: "1 ton",      price: "₹1,250",  y1: "+8.7%",  y3: "+25.0%", y5: "+38.8%" },
  { material: "P-Sand (plaster)",     unit: "1 ton",      price: "₹1,450",  y1: "+7.4%",  y3: "+20.8%", y5: "+31.8%" },
  { material: "River Sand (regulated)", unit: "1 ton",    price: "₹2,200",  y1: "+15.7%", y3: "+57.1%", y5: "+91.3%" },
  { material: "Coarse Aggregates (20mm)", unit: "1 ton",  price: "₹1,150",  y1: "+6.4%",  y3: "+18.5%", y5: "+27.7%" },
  { material: "First Class Clay Bricks", unit: "1 piece", price: "₹10.50",  y1: "+10.5%", y3: "+31.2%", y5: "+50.0%" },
  { material: "AAC Blocks (6-inch)",  unit: "1 piece",    price: "₹78.00",  y1: "+2.6%",  y3: "+8.3%",  y5: "+14.7%" },
  { material: "Ready Mix Concrete (M25)", unit: "1 m³",   price: "₹5,800",  y1: "+7.4%",  y3: "+16.0%", y5: "+20.8%" },
  { material: "Vitrified Tiles (2×2 ft)", unit: "1 sqft", price: "₹48.00",  y1: "+4.3%",  y3: "+9.1%",  y5: "+11.6%" },
  { material: "Premium Black Granite",unit: "1 sqft",     price: "₹145",    y1: "+7.4%",  y3: "+16.0%", y5: "+22.8%" },
  { material: "UPVC Window Systems",  unit: "1 sqft",     price: "₹680",    y1: "+9.6%",  y3: "+21.4%", y5: "+36.0%" },
];

const LABOR = [
  { trade: "Head Mason",           daily: "₹1,000", range: "₹950–₹1,100" },
  { trade: "Tile Layer",           daily: "₹950",   range: "₹900–₹1,050" },
  { trade: "Carpenter",            daily: "₹1,000", range: "₹950–₹1,150" },
  { trade: "Bar Bender / Fitter",  daily: "₹900",   range: "₹850–₹950" },
  { trade: "Electrician",          daily: "₹850",   range: "₹800–₹950" },
  { trade: "Plumber",              daily: "₹850",   range: "₹800–₹1,000" },
  { trade: "Painter",              daily: "₹800",   range: "₹750–₹900" },
  { trade: "General Helper (Male)",   daily: "₹680", range: "₹630–₹730" },
  { trade: "General Helper (Female)", daily: "₹580", range: "₹550–₹620" },
];

const PRICE_DRIVERS = [
  {
    heading: "River sand restrictions",
    detail:
      "River sand is severely restricted by Tamil Nadu mining rules, so M-sand has near-total adoption and river sand has spiked 91% over five years.",
  },
  {
    heading: "Steel pulled by infrastructure",
    detail:
      "Steel is pulled up by infrastructure work like the STRR project, tightening local supply and pushing Fe 550D steel up 24.1% over five years.",
  },
  {
    heading: "Cement production controls",
    detail:
      "Cement pricing is shaped by production controls across Southern hubs. OPC 53 rose 5.3% in the last year alone.",
  },
];

const KEY_FACTS = [
  "The average cost to build a standard independent home in Hosur in 2026 is ₹1,800 per sqft of built-up area.",
  "A premium contemporary villa in Hosur averages ₹2,850 per sqft in 2026.",
  "Fe 550D TMT steel rose 24.1% over five years to ₹72,500 per ton in 2026.",
  "A skilled head mason in Hosur earns ₹1,000 per 8-hour shift in 2026.",
  "M-sand for structural concrete is ₹1,250 per ton delivered within Hosur in 2026.",
  "Structure and foundation make up 36% of a standard residential build budget in Hosur.",
  "A deep borewell on Hosur's outer rings costs ₹1,40,000 to ₹2,80,000 in 2026.",
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the cement price in Hosur in 2026?",
    answer:
      "OPC 53 cement is ₹395 per 50 kg bag and PPC is ₹365 per bag as of June 2026.",
  },
  {
    question: "What is the steel rate in Hosur?",
    answer:
      "Fe 550D TMT steel is ₹72,500 per ton in 2026, up 24.1% over five years.",
  },
  {
    question: "Why is river sand so expensive in Hosur?",
    answer:
      "Tamil Nadu restricts riverbed mining, so river sand is ₹2,200 per ton and most builders now use M-sand at ₹1,250 per ton.",
  },
  {
    question: "How often are these prices updated?",
    answer:
      "Monthly. The current data is from June 2026.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/hosur",
    eyebrow: "City hub",
    title: "Hosur construction rates",
    desc: "Full rate table and cost overview for all typologies in Hosur 2026.",
  },
  {
    href: "/construction-cost/hosur/per-sqft",
    eyebrow: "Rate reference",
    title: "Construction cost per sqft",
    desc: "Per-sqft rates by typology and tier — from basic to luxury villa.",
  },
  {
    href: "/construction-cost/hosur/calculator",
    eyebrow: "Interactive tool",
    title: "Construction cost calculator",
    desc: "Enter your BUA and quality tier to get a full cost breakdown instantly.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MaterialPricesHosurPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        {/* ── HERO + QUICK ANSWER ──────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/hosur" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Hosur</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Material Prices</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Hosur · Last updated: June 2026 · Updated monthly
            </p>

            <h1
              className="font-serif mb-4"
              style={{
                fontSize: "clamp(32px, 5.5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                color: "var(--text-primary)",
              }}
            >
              Construction Material Prices
              <br className="hidden md:block" /> in Hosur (2026)
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              Current Hosur prices for cement, steel, sand, aggregates, tiles, and labor.
              With 1-year, 3-year, and 5-year price changes.
              <span className="font-mono text-[13px] ml-2" style={{ color: "var(--text-tertiary)" }}>Source: Estimato Hosur Construction Market Report, 2026.</span>
            </p>

            {/* Quick Answer Box */}
            <div
              className="rounded-sm p-6 md:p-8"
              style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.05)" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
                Quick answer
              </p>
              <p
                className="font-sans"
                style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}
              >
                As of June 2026 in Hosur, cement (OPC 53) is{" "}
                <strong>₹395 per 50 kg bag</strong>, TMT steel (Fe 550D) is{" "}
                <strong>₹72,500 per ton</strong>, and M-sand for concrete is{" "}
                <strong>₹1,250 per ton</strong>. Full table below, with how each price has moved over 1, 3, and 5 years.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── MATERIALS TABLE ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="materials-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              June 2026 · Hosur market
            </p>
            <h2
              id="materials-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Material prices
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Prices reflect the Hosur local market, not national or ex-factory rates. Transport to site is included for deliveries within central Hosur.
            </p>
          </AnimateIn>

          <div className="overflow-x-auto">
            <div style={{ minWidth: "640px" }}>
              {/* Table header */}
              <div
                className="grid gap-3 py-3 border-b border-t border-border"
                style={{ gridTemplateColumns: "2fr 100px 100px 80px 80px 80px" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Material</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-center" style={{ color: "var(--text-tertiary)" }}>Unit</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>Price (2026)</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>1-Year</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>3-Year</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>5-Year</span>
              </div>
              <StaggerContainer className="divide-y divide-border">
                {MATERIALS.map((row) => (
                  <StaggerItem key={row.material}>
                    <div
                      className="grid gap-3 py-4 items-center"
                      style={{ gridTemplateColumns: "2fr 100px 100px 80px 80px 80px" }}
                    >
                      <span className="font-serif" style={{ fontSize: "17px", fontWeight: 400, color: "var(--text-primary)" }}>
                        {row.material}
                      </span>
                      <span className="font-mono text-center" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                        {row.unit}
                      </span>
                      <span className="font-mono tabular-nums text-right font-medium" style={{ fontSize: "15px", color: "var(--text-primary)" }}>
                        {row.price}
                      </span>
                      <span className="font-mono tabular-nums text-right" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        {row.y1}
                      </span>
                      <span className="font-mono tabular-nums text-right" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        {row.y3}
                      </span>
                      <span className="font-mono tabular-nums text-right" style={{ fontSize: "13px", color: row.y5.startsWith("+7") || parseFloat(row.y5) >= 30 ? "var(--accent)" : "var(--text-secondary)" }}>
                        {row.y5}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-8 pt-6 border-t border-border" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              Source: Estimato Hosur Construction Market Report, 2026. Last updated June 2026. Prices include delivery within central Hosur. Sites beyond 15 km carry a 5–8% surcharge on bulk materials.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── LABOR RATES ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="labor-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              June 2026 · Daily rates (8-hour shift)
            </p>
            <h2
              id="labor-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Labor rates in Hosur
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Daily wages for an 8-hour shift. Labor costs have risen 9% year on year, driven by competition from electronics and EV factory jobs.
            </p>
          </AnimateIn>

          <div className="border-t border-border">
            {/* Header */}
            <div
              className="grid gap-4 py-3 border-b border-border"
              style={{ gridTemplateColumns: "1fr 120px 160px" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Trade</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>Daily Rate</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>Range</span>
            </div>
            <StaggerContainer className="divide-y divide-border">
              {LABOR.map((row) => (
                <StaggerItem key={row.trade}>
                  <div
                    className="grid gap-4 py-4 items-center"
                    style={{ gridTemplateColumns: "1fr 120px 160px" }}
                  >
                    <span className="font-serif" style={{ fontSize: "17px", fontWeight: 400, color: "var(--text-primary)" }}>
                      {row.trade}
                    </span>
                    <span className="font-mono tabular-nums text-right font-medium" style={{ fontSize: "16px", color: "var(--text-primary)" }}>
                      {row.daily}
                    </span>
                    <span className="font-mono tabular-nums text-right" style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>
                      {row.range}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-8 pt-6 border-t border-border" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              Source: Estimato Hosur Construction Market Report, 2026. Last updated June 2026. Rates for standard Hosur project conditions; specialized or premium projects may carry higher rates.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── WHY PRICES MOVE ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="drivers-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur price dynamics
            </p>
            <h2
              id="drivers-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Why Hosur prices move
            </h2>
          </AnimateIn>
          <StaggerContainer className="space-y-4">
            {PRICE_DRIVERS.map(({ heading, detail }) => (
              <StaggerItem key={heading}>
                <div
                  className="rounded-sm p-6"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
                >
                  <p
                    className="font-serif mb-2"
                    style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                  >
                    {heading}
                  </p>
                  <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── KEY FACTS (citation block) ───────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="facts-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur 2026 · Verified figures
            </p>
            <h2
              id="facts-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Key facts
            </h2>
            <div
              className="rounded-sm p-7 md:p-10"
              style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
            >
              <ul className="space-y-4">
                {KEY_FACTS.map((fact, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="font-mono text-[11px] shrink-0 mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="font-sans"
                      style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-secondary)" }}
                    >
                      {fact}
                    </p>
                  </li>
                ))}
              </ul>
              <p
                className="font-mono mt-8 pt-6 border-t"
                style={{ fontSize: "13px", color: "var(--text-tertiary)", borderColor: "var(--border)" }}
              >
                Source: Estimato Hosur Construction Market Report, 2026. Last updated June 2026.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Material prices in Hosur
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-material-prices-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PARTNER CARD ────────────────────────────────────────────── */}
        {partner && (
          <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Hosur exclusive partner</p>
              <h2 id="partner-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Verified architect on the ground
              </h2>
              <div className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <p className="font-serif" style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--text-primary)" }}>{partner.name}</p>
                    {partner.isFounding && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>Founding partner</span>
                    )}
                  </div>
                  <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)", lineHeight: 1.5 }}>{partner.tagline}</p>
                  <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Led by {partner.founderName}. {partner.founderBio} Exclusive territory: Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
                    <a href={`mailto:${partner.email}`} className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-navy hover:text-navy" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Email</a>
                    {partner.websiteUrl && (
                      <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-navy hover:text-navy" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Website ↗</a>
                    )}
                  </div>
                </div>
                <div className="rounded-sm p-5" style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>Services</p>
                  {["Architecture & design", "HTM approval support", "Structural drawings", "Turnkey construction", "Interior fit-out", "Project management"].map((s) => (
                    <p key={s} className="font-mono py-2 border-b last:border-b-0" style={{ fontSize: "14px", color: "var(--text-secondary)", borderColor: "rgba(196,154,60,0.12)" }}>{s}</p>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </section>
        )}

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── INTERNAL LINKS ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2 id="related-heading" className="font-serif mb-8" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Related pages
            </h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INTERNAL_LINKS.map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link href={href} className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy" style={{ border: "1px solid var(--border)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>{eyebrow}</p>
                  <p className="font-serif mb-2 group-hover:text-navy transition-colors" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{title}</p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ──────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Translate rates into your budget
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline built from Hosur BOQs.
              </p>
              <Link href="/plan?city=hosur&from=hosur-material-prices-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
