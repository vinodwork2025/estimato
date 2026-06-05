import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { generateTimeline } from "@/lib/cost-engine/timeline";
import { SEED_PARTNERS } from "@/data/partners";
import { HosurPlannerCTA } from "./HosurPlannerCTA";
import type { PlannerInput } from "@/types";

// ─── Metadata ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/hosur`;

export const metadata: Metadata = {
  title: "House Construction Cost in Hosur 2026 – Verified Rates by Quality Tier",
  description:
    "Hosur construction costs in 2026: ₹1,850–₹2,400/sqft for standard builds, ₹2,500–₹2,900 for premium. BOQ-verified rates for G+1 homes. Free estimate, no sign-up.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "House Construction Cost in Hosur 2026",
    description:
      "Verified Hosur construction rates by quality tier. Standard G+1 homes run ₹25–₹29 lakhs. Free estimate tool.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Static data ──────────────────────────────────────────────────────────────

// Representative G+1 standard home for timeline display
const SAMPLE_INPUT: PlannerInput = {
  homeType: "villa",
  city: "hosur",
  plot: {
    length: 40,
    width: 30,
    facing: "north",
    cornerPlot: false,
    roadWidth: 30,
    soilType: "unknown",
    slope: "flat",
  },
  configuration: {
    floors: 2,
    builtUpArea: 1200,
    parking: "none",
    terrace: false,
    balconies: 0,
    lift: false,
    basement: false,
    homeOffice: false,
    rentalFloor: false,
  },
  qualityTier: "standard",
  interiorLevel: "modular",
};

// Standard mid rate × 1,200 sqft at Hosur 1.00x multiplier
const SAMPLE_CIVIL_COST = 1200 * TIER_RATES.standard.mid;
const { phases, totalDays } = generateTimeline(SAMPLE_INPUT, SAMPLE_CIVIL_COST);

const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

const RATE_TIERS = [
  {
    key: "basic",
    label: "Basic",
    badge: null,
    description: "Functional construction. Standard local materials and fittings.",
    interior: "Carpentry only, no built-ins",
    typical: "₹15–₹25 lakhs for an 800–1,200 sqft home",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Most common",
    description: "Branded fittings, better flooring. The choice for most Hosur homeowners.",
    interior: "Modular kitchen, wardrobes",
    typical: "₹25–₹36 lakhs for a 1,000–1,500 sqft G+1",
  },
  {
    key: "premium",
    label: "Premium",
    badge: null,
    description: "Quality materials throughout. Somany, Jaquar, Legrand fittings.",
    interior: "Full modular with designer finishes",
    typical: "₹37–₹52 lakhs for a 1,200–1,800 sqft G+1",
  },
  {
    key: "luxury",
    label: "Luxury",
    badge: null,
    description: "High-end finishes. Italian marble, Kohler sanitary, architect-level detail.",
    interior: "Fully furnished, architect-curated",
    typical: "₹45–₹80 lakhs for 1,200–2,000 sqft",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does it cost to build a house in Hosur in 2026?",
    answer:
      "Construction in Hosur in 2026 runs from ₹1,850 per sq ft for basic builds to ₹4,000 per sq ft for luxury homes. A standard G+1 home with 1,200 sq ft of built-up area costs roughly ₹25 to ₹29 lakhs in civil and structural work before interiors. These numbers come from verified Hosur contractor BOQs updated as of 2026.",
  },
  {
    question: "How does building in Hosur compare to Bangalore?",
    answer:
      "Hosur is about 15 to 25% cheaper than Bangalore for equivalent construction quality. A home that costs ₹30 lakhs in Hosur would cost around ₹34.5 lakhs in Bangalore outskirts (Sarjapura, Whitefield) or ₹37.5 lakhs in Bangalore urban areas like Koramangala or Indiranagar at equivalent quality.",
  },
  {
    question: "What building approvals do I need in Hosur?",
    answer:
      "Hosur falls under Hosur Town Municipality (HTM) jurisdiction. You need a building plan approved by HTM, drawn and certified by a licensed architect. Setbacks are typically 1.5 to 2 metres on all sides for residential plots. If your layout is DTCP-approved, the process is more predictable. Expect 4 to 8 weeks for approval and budget around 4% of your civil cost for statutory fees and approvals.",
  },
  {
    question: "How long does construction take for a typical Hosur home?",
    answer:
      "A standard G+1 home of 1,000 to 1,500 sq ft takes around 9 to 11 months from foundation to handover. Foundation and structure take 10 to 12 weeks, brickwork and plastering another 4 to 5 weeks, and finishing is the longest phase at 10 to 14 weeks. Add 2 to 4 weeks if your structure phase falls during the northeast monsoon in October and November.",
  },
  {
    question: "What type of soil does Hosur have, and does it affect cost?",
    answer:
      "Most of Hosur has stable red laterite soil, which works well for standard residential foundations. Areas near older quarry sites may have rocky terrain, adding roughly 5% to foundation costs. Black cotton soil is uncommon in Hosur but can add 9% if encountered. A basic soil test before starting costs ₹5,000 to ₹8,000 and is worth doing on any plot.",
  },
  {
    question: "What is the FSI for residential plots in Hosur?",
    answer:
      "Under HTM rules, residential plots generally have an FSI of 2.0, meaning you can build up to twice the plot area as total built-up space across all floors. Ground floor coverage is typically 60 to 65% of the plot. A 1,200 sq ft plot can have up to 2,400 sq ft of total built-up area, subject to setback compliance.",
  },
  {
    question: "Is Hosur a good place to build for investment or end-use?",
    answer:
      "Hosur has grown steadily, with semiconductor and electronics manufacturing expanding in the region. Construction and land costs remain lower than Bengaluru, which makes it practical for families working in Hosur's industrial and tech zones. Rental demand is rising. For end-use, infrastructure has improved significantly in the past three years and new township projects have raised quality standards across the area.",
  },
];

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Construction cost intelligence platform for Indian homeowners.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Construction Cost",
        item: `${SITE_URL}/construction-cost`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hosur",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "House Construction Cost in Hosur 2026",
    url: PAGE_URL,
    description:
      "Hosur construction rates by quality tier, BOQ-verified as of 2026. Includes timeline, FAQ, and a free estimate tool.",
    dateModified: "2026-06-03",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
    mainEntity: { "@type": "WebApplication", name: "Hosur Construction Cost Calculator" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hosur Construction Cost Calculator",
    url: `${SITE_URL}/plan`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free home construction cost calculator for Hosur with BOQ-verified rates. Estimate civil cost, materials, and timeline in under 2 minutes.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ar. Chittrarasan",
    jobTitle: "Principal Architect",
    worksFor: {
      "@type": "Organization",
      name: "Design Intend",
      url: "https://designintend.com",
    },
    sameAs: ["https://designintend.com"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRate(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function weekLabel(days: number): string {
  const weeks = Math.round(days / 7);
  return `${weeks} week${weeks !== 1 ? "s" : ""}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HosurHubPage() {
  return (
    <>
      {/* JSON-LD — non-FAQ schemas */}
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <SiteHeader
        ctaLabel="Get my estimate →"
        ctaHref="/plan"
        maxWidth="max-w-5xl"
      />

      <main className="bg-bg-primary">

        {/* ── HERO + QUICK ANSWER ────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link
                href="/"
                className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: "var(--text-tertiary)" }}
              >
                Estimato
              </Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>
                /
              </span>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Construction Cost
              </span>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>
                /
              </span>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--text-primary)" }}
              >
                Hosur
              </span>
            </nav>

            {/* Eyebrow */}
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--accent)" }}
            >
              Hosur, Tamil Nadu · 2026 · Verified rates
            </p>
            <p className="font-mono text-[11px] mb-4" style={{ color: "var(--text-tertiary)" }}>
              Last updated: June 2026
            </p>

            {/* H1 */}
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
              House construction cost
              <br className="hidden md:block" /> in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "600px",
              }}
            >
              Verified rates from real Hosur project BOQs. Includes all quality
              tiers, a free estimate tool, and a construction timeline.
              <span className="font-mono text-[13px] ml-2" style={{ color: "var(--text-tertiary)" }}>
                As of 2026.
              </span>
            </p>

            {/* Quick Answer Block */}
            <div
              className="rounded-sm p-6 md:p-8"
              style={{
                border: "1px solid var(--border-strong)",
                background: "rgba(196,154,60,0.04)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--accent)" }}
              >
                Quick answer
              </p>
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(15px, 2vw, 17px)",
                  lineHeight: 1.8,
                  color: "var(--text-primary)",
                }}
              >
                Building a house in Hosur in 2026 costs between{" "}
                <strong>₹1,850 and ₹2,400 per sq ft</strong> for standard
                quality construction. Most standard G+1 homes with 1,200 sq ft
                of built-up area land around{" "}
                <strong>₹25 to ₹29 lakhs</strong> at current Hosur rates before
                interiors. Premium builds run{" "}
                <strong>₹2,500 to ₹2,900 per sq ft</strong>. Hosur uses a 1.00x
                base multiplier — it is the reference city in our rate database.
              </p>
            </div>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── RATE BANDS ────────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="rate-bands-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Hosur 2026 · 1.00x base multiplier
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Construction rates by quality tier
            </h2>
            <p
              className="font-sans mb-10"
              style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}
            >
              All rates are range-based. The final number for your project
              depends on your exact specifications. Run the estimate tool below
              for a personalised figure.
            </p>
          </AnimateIn>

          {/* Tier table */}
          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_TIERS.map(({ key, label, badge, description, typical }) => {
              const tier = TIER_RATES[key];
              return (
                <StaggerItem key={key}>
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                    {/* Tier label */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p
                          className="font-serif"
                          style={{
                            fontSize: "22px",
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--text-primary)",
                          }}
                        >
                          {label}
                        </p>
                        {badge && (
                          <span
                            className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                            style={{
                              background: "rgba(196,154,60,0.12)",
                              color: "var(--accent)",
                              borderRadius: "2px",
                            }}
                          >
                            {badge}
                          </span>
                        )}
                      </div>
                      {/* Rate range — primary data */}
                      <p
                        className="font-mono tabular-nums"
                        style={{
                          fontSize: "clamp(18px, 2.5vw, 22px)",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          color: "var(--text-primary)",
                        }}
                      >
                        {fmtRate(tier.min)}
                        <span
                          className="font-mono"
                          style={{ fontSize: "16px", color: "var(--text-tertiary)", margin: "0 6px" }}
                        >
                          –
                        </span>
                        {fmtRate(tier.max)}
                      </p>
                      <p
                        className="font-mono"
                        style={{ fontSize: "13px", color: "var(--text-tertiary)" }}
                      >
                        per sq ft
                      </p>
                    </div>

                    {/* Description */}
                    <div className="md:pt-1">
                      <p
                        className="font-sans mb-1"
                        style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}
                      >
                        {description}
                      </p>
                      <p
                        className="font-mono"
                        style={{ fontSize: "13px", color: "var(--text-tertiary)" }}
                      >
                        {typical}
                      </p>
                    </div>

                    {/* Visual rate bar */}
                    <div className="flex items-center gap-3 md:justify-end">
                      <div
                        className="w-full md:w-32 h-1 rounded-full overflow-hidden"
                        style={{ background: "var(--border)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.round((tier.mid / 5000) * 100)}%`,
                            background: "var(--accent)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}

            {/* Ultra Luxury — no price, lead CTA */}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                <div>
                  <p
                    className="font-serif mb-1"
                    style={{
                      fontSize: "22px",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "var(--text-primary)",
                    }}
                  >
                    Ultra Luxury
                  </p>
                  <p
                    className="font-mono"
                    style={{ fontSize: "18px", color: "var(--text-tertiary)" }}
                  >
                    Custom quote
                  </p>
                  <p
                    className="font-mono"
                    style={{ fontSize: "13px", color: "var(--text-tertiary)" }}
                  >
                    per sq ft
                  </p>
                </div>
                <div className="md:pt-1">
                  <p
                    className="font-sans mb-3"
                    style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}
                  >
                    Imported stone, Kohler or Duravit sanitary, Lutron
                    lighting. No standard rate applies — every project is
                    priced from a full design brief.
                  </p>
                  <Link
                    href="/plan?city=hosur&from=hosur-ultra-luxury"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}
                  >
                    Speak to Design Intend
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path d="M1 4h9M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
                <div className="flex items-center gap-3 md:justify-end">
                  <div
                    className="w-full md:w-32 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: "100%", background: "var(--accent)" }}
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* BOQ credibility statement */}
          <AnimateIn direction="up" delay={0.1}>
            <p
              className="font-mono mt-8 pt-6 border-t border-border"
              style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.7 }}
            >
              "Rates built from real project BOQs and verified against current Hosur and
              Bangalore contractor quotes, 2026"
            </p>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── CALCULATOR CTA ────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <HosurPlannerCTA />
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── CONSTRUCTION TIMELINE ─────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="timeline-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Reference: standard G+1, 1,200 sqft
            </p>
            <h2
              id="timeline-heading"
              className="font-serif mb-2"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Construction timeline
            </h2>
            <p
              className="font-sans mb-10"
              style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.65 }}
            >
              Phase-wise breakdown for a standard G+1 home in Hosur. Total
              build time:{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {totalDays} days
              </strong>{" "}
              of active construction. Add 2 to 4 weeks for approvals, material
              lead times, and weather pauses.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {phases.map((phase, i) => {
              const widthPct = Math.round((phase.durationDays / totalDays) * 100);
              return (
                <StaggerItem key={phase.name}>
                  <div className="py-7">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 items-start mb-4">
                      <div>
                        <p
                          className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                          style={{ color: "var(--accent)" }}
                        >
                          Phase {i + 1}
                        </p>
                        <p
                          className="font-serif"
                          style={{
                            fontSize: "20px",
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--text-primary)",
                          }}
                        >
                          {phase.name}
                        </p>
                      </div>
                      <p
                        className="font-sans md:pt-5"
                        style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}
                      >
                        {phase.description}
                      </p>
                    </div>

                    {/* Duration bar */}
                    <div className="flex items-center gap-4">
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "var(--border)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${widthPct}%`,
                            background:
                              i === 0
                                ? "var(--accent)"
                                : i === 1
                                ? "#4A7DAF"
                                : i === 2
                                ? "#6B9FAD"
                                : "#8A9DB5",
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-6 shrink-0">
                        <div>
                          <p
                            className="font-mono tabular-nums"
                            style={{ fontSize: "17px", fontWeight: 400, color: "var(--text-primary)" }}
                          >
                            {weekLabel(phase.durationDays)}
                          </p>
                          <p
                            className="font-mono"
                            style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
                          >
                            {phase.durationDays} days
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-mono tabular-nums"
                            style={{ fontSize: "17px", fontWeight: 400, color: "var(--text-primary)" }}
                          >
                            {phase.paymentPercent}%
                          </p>
                          <p
                            className="font-mono"
                            style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
                          >
                            payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="faq-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="font-serif mb-10"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Building in Hosur
            </h2>
          </AnimateIn>

          {/* FAQBlock handles FAQPage schema internally */}
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-faq" />
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── PARTNER CARD ──────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="partner-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Hosur exclusive partner
            </p>
            <h2
              id="partner-heading"
              className="font-serif mb-8"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Verified architect on the ground
            </h2>

            <div
              className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start"
              style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "24px",
                      fontWeight: 400,
                      letterSpacing: "-0.015em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {partner.name}
                  </p>
                  {partner.isFounding && (
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                      style={{
                        background: "rgba(196,154,60,0.12)",
                        color: "var(--accent)",
                        borderRadius: "2px",
                      }}
                    >
                      Founding partner
                    </span>
                  )}
                </div>

                <p
                  className="font-sans mb-4"
                  style={{ fontSize: "16px", color: "var(--accent)", lineHeight: 1.5 }}
                >
                  {partner.tagline}
                </p>

                <p
                  className="font-sans mb-6"
                  style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}
                >
                  Led by {partner.founderName}. {partner.founderBio} Exclusive
                  territory: Hosur, Sarjapura, Attibele, Bagalur, and
                  Krishnagiri.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
                    style={{
                      background: "var(--text-primary)",
                      color: "#ffffff",
                      borderRadius: "2px",
                    }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${partner.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors hover:border-navy hover:text-navy"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      borderRadius: "2px",
                    }}
                  >
                    Email
                  </a>
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors hover:border-navy hover:text-navy"
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        borderRadius: "2px",
                      }}
                    >
                      Website ↗
                    </a>
                  )}
                </div>
              </div>

              <div
                className="rounded-sm p-5"
                style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Services
                </p>
                {[
                  "Architecture & design",
                  "HTM approval support",
                  "Structural drawings",
                  "Turnkey construction",
                  "Interior fit-out",
                  "Project management",
                ].map((s) => (
                  <p
                    key={s}
                    className="font-mono py-2 border-b last:border-b-0"
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      borderColor: "rgba(196,154,60,0.12)",
                    }}
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── INTERNAL LINKS ────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="related-heading"
        >
          <AnimateIn direction="up">
            <h2
              id="related-heading"
              className="font-serif mb-8"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Related pages
            </h2>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* 30×40 — most searched plot in Hosur */}
            <StaggerItem>
              <Link
                href="/construction-cost/hosur/30x40"
                className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy"
                style={{ border: "1px solid var(--border)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  Most searched
                </p>
                <p
                  className="font-serif mb-2 group-hover:text-navy transition-colors"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                >
                  30×40 plot in Hosur
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}
                >
                  Hosur's benchmark plot size. Standard G+1 costs ₹30.2L–₹34.6L at current rates.
                </p>
              </Link>
            </StaggerItem>

            {/* 40×60 — larger family plot */}
            <StaggerItem>
              <Link
                href="/construction-cost/hosur/40x60"
                className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy"
                style={{ border: "1px solid var(--border)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  Larger plot
                </p>
                <p
                  className="font-serif mb-2 group-hover:text-navy transition-colors"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                >
                  40×60 plot in Hosur
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}
                >
                  2,400 sqft plot with 2,880 sqft BUA at G+1. Cost breakdown across all tiers.
                </p>
              </Link>
            </StaggerItem>

            {/* Villa construction */}
            <StaggerItem>
              <Link
                href="/villa-construction-cost/hosur"
                className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy"
                style={{ border: "1px solid var(--border)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  Home type
                </p>
                <p
                  className="font-serif mb-2 group-hover:text-navy transition-colors"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                >
                  Villa construction cost in Hosur
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}
                >
                  Detailed cost breakdown for villa builds in Hosur. Standard range: ₹37.8L–₹84L.
                </p>
              </Link>
            </StaggerItem>

            {/* ₹50 lakh budget */}
            <StaggerItem>
              <Link
                href="/50-lakh-house-hosur"
                className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy"
                style={{ border: "1px solid var(--border)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  Budget guide
                </p>
                <p
                  className="font-serif mb-2 group-hover:text-navy transition-colors"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                >
                  ₹50 lakh house in Hosur
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}
                >
                  What you can build in Hosur with a ₹50 lakh budget — size, quality, and trade-offs.
                </p>
              </Link>
            </StaggerItem>

          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ────────────────────────────────────────────────── */}
        <section
          className="border-t border-border"
          style={{ background: "var(--text-primary)" }}
        >
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4"
                style={{ color: "rgba(196,154,60,0.85)" }}
              >
                Free · No sign-up · Under 2 minutes
              </p>
              <h2
                className="font-serif mb-4"
                style={{
                  fontSize: "clamp(28px, 4.5vw, 48px)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "#FFFFFF",
                }}
              >
                Start your Hosur estimate
              </h2>
              <p
                className="font-sans mb-8 mx-auto"
                style={{
                  fontSize: "18px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: "480px",
                }}
              >
                Five questions. A cost range, material quantities, and a
                payment timeline — built from Hosur BOQs.
              </p>
              <Link
                href="/plan?city=hosur&from=hosur-footer"
                className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{
                  background: "var(--accent)",
                  color: "#ffffff",
                  borderRadius: "2px",
                }}
              >
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
