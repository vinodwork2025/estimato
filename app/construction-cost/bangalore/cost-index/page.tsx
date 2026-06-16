export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { BangalorePlannerCTA } from "../BangalorePlannerCTA";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/cost-index`;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Bangalore Construction Cost Index 2026 | Estimato",
  description:
    "Current construction cost per sqft in Bangalore by quality tier, with sourced rates and material prices. Updated June 2026, built from real BOQs.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Bangalore Construction Cost Index 2026 | Estimato",
    description:
      "Current construction cost per sqft in Bangalore by quality tier, with sourced rates and material prices. Updated June 2026, built from real BOQs.",
    url: PAGE_URL,
    type: "article",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Schemas ─────────────────────────────────────────────────────────────────

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Bangalore Construction Cost Index 2026",
    description:
      "Current construction cost per sqft in Bangalore by quality tier, with sourced rates, material prices, and zone-by-zone variation. Updated June 2026.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-12",
    author: {
      "@type": "Person",
      name: "Ar. Chittrarasan",
      jobTitle: "Principal Architect",
      worksFor: { "@type": "Organization", name: "Design Intend", url: "https://designintend.com" },
    },
    reviewedBy: {
      "@type": "Person",
      name: "Ar. Chittrarasan",
      jobTitle: "Principal Architect (ex-Gensler)",
      worksFor: { "@type": "Organization", name: "Design Intend", url: "https://designintend.com" },
    },
    publisher: {
      "@type": "Organization",
      name: "Estimato",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    url: PAGE_URL,
    inLanguage: "en-IN",
    mainEntityOfPage: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: `${SITE_URL}/construction-cost/bangalore` },
      { "@type": "ListItem", position: 4, name: "Cost Index", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Bangalore Construction Cost Rate Table 2026",
    description:
      "Construction cost per sqft in Bangalore by quality tier (Basic through Ultra-Luxury), with material price index. Source: real project BOQs and contractor quotes, June 2026.",
    url: PAGE_URL,
    creator: { "@type": "Organization", name: "Estimato", url: SITE_URL },
    datePublished: "2026-06-01",
    dateModified: "2026-06-12",
    temporalCoverage: "2026",
    spatialCoverage: "Bangalore, Karnataka, India",
    inLanguage: "en-IN",
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
  },
];

// ─── Rate tier data (from Bangalore Cost Index, June 2026) ───────────────────

const RATE_TIERS = [
  {
    tier: "Basic",
    min: 1500,
    max: 2200,
    description:
      "Sound structure, standard blocks, basic vitrified tiles, standard paint, basic electricals and plumbing, no false ceiling.",
    badge: null,
  },
  {
    tier: "Standard",
    min: 2000,
    max: 2800,
    description:
      "Branded cement and steel, mid-grade tiles or granite, teak main door, UPVC windows, branded fittings (Jaquar, Hindware). The most common choice.",
    badge: "Most common",
  },
  {
    tier: "Premium",
    min: 2600,
    max: 3500,
    description:
      "Stone or large-format flooring, designer false ceilings, system windows, modular kitchen rough-ins, upgraded sanitaryware.",
    badge: null,
  },
  {
    tier: "Luxury",
    min: 3500,
    max: 5000,
    description:
      "Imported marble, hardwood floors, home automation, central HVAC provisions, bespoke architectural finishes.",
    badge: null,
  },
  {
    tier: "Ultra-Luxury",
    min: null,
    max: null,
    description:
      "No fixed ceiling. Imported materials, specialised foundations, full architect-led design. Priced to the project.",
    badge: "Custom quote",
  },
];

const MATERIAL_PRICES = [
  { material: "Cement, OPC 53 grade", range: "₹340 – ₹476", note: "Regional brands from ₹310", unit: "per 50kg bag" },
  { material: "TMT steel, Fe500D / Fe550D", range: "₹65 – ₹85", note: "Branded retail higher than national index", unit: "per kg" },
  { material: "M-Sand, concrete grade", range: "₹42 – ₹55", note: "Primary substitute for river sand", unit: "per cft" },
  { material: "River sand (scarce)", range: "₹65 – ₹100", note: "Mining restrictions. Hard to source legally", unit: "per cft" },
  { material: "P-Sand, plastering grade", range: "₹50 – ₹65", note: "", unit: "per cft" },
  { material: "Solid concrete block", range: "₹41 – ₹51", note: "", unit: "per piece" },
  { material: "AAC block", range: "₹48 – ₹59", note: "Thermal advantage in Bangalore climate", unit: "per piece" },
  { material: "Red clay brick, first class", range: "₹8.50 – ₹25", note: "Wide range by source and kiln", unit: "per piece" },
  { material: "Skilled mason", range: "₹728 – ₹1,200", note: "Demand-driven; higher in IT corridors", unit: "per day" },
  { material: "Labour-only, gray structure", range: "₹280 – ₹350", note: "Civil labour without materials", unit: "per sqft" },
];

const EXCLUSIONS = [
  { item: "BBMP / BDA plan approval, khata, liaison", cost: "₹50,000 to ₹2,00,000+" },
  { item: "BESCOM power and BWSSB water connections", cost: "₹20,000 to ₹1,00,000" },
  { item: "Deep foundations on soft or rocky soil", cost: "₹300 to ₹450 extra per sqft of footprint" },
  { item: "Compound wall and gates", cost: "₹1,00,000 to ₹3,00,000" },
  { item: "Borewell, casing, and pump", cost: "₹80,000 to ₹2,00,000" },
  { item: "Interiors: wardrobes, modular kitchen, false ceiling, furniture", cost: "₹3,00,000 to ₹15,00,000+" },
  { item: "Heavy elevation work: stone cladding, skylights, special glass", cost: "Billed on actuals" },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the construction cost per sqft in Bangalore in 2026?",
    answer:
      "Construction cost per sqft in Bangalore ranges from ₹1,500 to ₹2,200 for basic quality, ₹2,000 to ₹2,800 for standard (the most common choice), ₹2,600 to ₹3,500 for premium, and ₹3,500 to ₹5,000 for luxury. Ultra-luxury is quoted per project. These are built-up area civil construction rates verified from real BOQs and current contractor quotes, as of June 2026. They exclude land, approvals, utility connections, and interiors.",
  },
  {
    question: "What does the per-sqft rate include?",
    answer:
      "The per-sqft rate covers the core civil build: foundation (isolated footings in normal soil), full RCC structure, external and internal block walls, plastering, chemical waterproofing in bathrooms and terrace, floor and wall tiling, concealed copper wiring and MCB board, CPVC water supply and PVC drainage with basic fittings, main door, internal doors, and windows, interior putty and emulsion paint plus exterior weatherproof paint, and a standard overhead tank. It is the habitable shell of the home. It is not the cheque you write to move in.",
  },
  {
    question: "What is NOT included in a Bangalore per-sqft quote?",
    answer:
      "BBMP or BDA plan approval and khata (₹50,000 to ₹2,00,000+), BESCOM power connection and BWSSB water connection (₹20,000 to ₹1,00,000), deep foundations on soft lakebed soil or rocky outcrops (₹300 to ₹450 extra per sqft of footprint), compound wall and gates (₹1,00,000 to ₹3,00,000), borewell (₹80,000 to ₹2,00,000), and interiors, including modular kitchen, wardrobes, false ceilings, and furniture. Budget these separately on top of the civil cost.",
  },
  {
    question: "How much does it cost to build a 30×40 G+1 house in Bangalore?",
    answer:
      "The core civil construction for a 30×40 G+1 at standard quality in Bangalore runs ₹28.8 to ₹40.3 lakh for approximately 1,440 sqft of built-up area (at ₹2,000 to ₹2,800 per sqft). The full move-in cost, adding BBMP approval, BESCOM and BWSSB connections, borewell, compound wall, and basic interiors, is closer to ₹40 to ₹58 lakh. North Bangalore outskirts hit the lower end; IT-corridor east and central Bangalore hit the upper end.",
  },
  {
    question: "Why do construction rates vary across Bangalore?",
    answer:
      "Three factors drive zone variation. First, soil type: north Bangalore has hard laterite that requires shallow, cheap foundations; east Bangalore lakebed zones near Bellandur and Varthur may need deep foundations. Second, site access: narrow streets in central Bangalore (Indiranagar, Koramangala) prevent large concrete trucks and cranes, so ready-mix costs more and labour is more expensive. Third, local labour demand: IT-corridor areas draw worker populations that push up daily labour rates. The same 1,200 sqft home can cost ₹6 to ₹10 lakh more depending only on the neighbourhood.",
  },
  {
    question: "How often is this index updated?",
    answer:
      "Estimato refreshes this index as material prices and contractor quotes move. The date at the top of the page shows the last update. Material prices, especially steel and sand, are checked weekly. The tier bands are reviewed quarterly or when BOQ data from current projects shows a meaningful shift.",
  },
  {
    question: "Are these Bangalore rates verified?",
    answer:
      "Yes. The rates are built from real project bills of quantities (BOQs) from active Bangalore and Hosur projects, cross-checked against published rate ranges from Brick & Bolt, myNivasa, Thikedaar, and Sqft.Expert, and reviewed by Ar. Chittrarasan, Principal Architect at Design Intend (ex-Gensler). Where sources disagreed, the spread is shown rather than averaged. Outliers below ₹1,500 per sqft and clear under-market ultra-luxury quotes were excluded.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BangaloreCostIndexPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <SiteHeader
        ctaLabel="Get my estimate →"
        ctaHref="/plan?city=bangalore&from=blr-cost-index"
        maxWidth="max-w-5xl"
      />

      <main className="bg-bg-primary">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Cost Index</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · Data of record · BOQ-verified rates
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <p className="font-mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>Last updated: June 2026</p>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>·</span>
              <p className="font-mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                Reviewed by: Ar. Chittrarasan, Principal Architect (ex-Gensler), Design Intend
              </p>
            </div>

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
              Bangalore Construction
              <br className="hidden md:block" /> Cost Index 2026
            </h1>

            <p
              className="font-sans mb-8"
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "640px",
              }}
            >
              Construction cost per square foot in Bangalore as of mid-2026, by quality tier.
              Rates built from real project BOQs and verified against current Bangalore contractor
              quotes. This page is the cited rate source for all Estimato Bangalore calculator pages.
            </p>

            <div
              className="rounded-sm p-5"
              style={{ border: "1px solid rgba(196,154,60,0.3)", background: "rgba(196,154,60,0.04)" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
                Data basis
              </p>
              <p className="font-sans" style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Rates pulled from Bangalore-specific builders and material trackers: Brick &amp; Bolt, NoBroker,
                LizaHomes, myNivasa, Thikedaar, Sqft.Expert, InfraLens, Deejos, and live material price trackers
                for cement, steel, sand, and masonry. Where sources disagreed, the spread is shown rather than
                averaged. Outliers below ₹1,500/sqft excluded.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE TABLE ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-table-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Bangalore · June 2026 · Built-up area civil rates
            </p>
            <h2
              id="rate-table-heading"
              className="font-serif mb-3"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What it costs to build in Bangalore right now
            </h2>
            <p className="font-sans mb-2" style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "600px", lineHeight: 1.65 }}>
              These are ranges, not single numbers. Real quotes vary by builder, locality, soil, and finish level.
              Use the range that matches your plan, then get a verified quote to lock your number.
            </p>
            <p className="font-mono text-[12px] mb-10" style={{ color: "var(--text-tertiary)" }}>
              Source: Real project BOQs + current Hosur and Bangalore contractor quotes · Last updated June 2026
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_TIERS.map(({ tier, min, max, description, badge }) => (
              <StaggerItem key={tier}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{tier}</p>
                      {badge && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>
                      )}
                    </div>
                    {min !== null ? (
                      <>
                        <p className="font-mono tabular-nums" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                          <strong>₹{min.toLocaleString("en-IN")}</strong>
                          <span style={{ fontSize: "16px", color: "var(--text-tertiary)", margin: "0 6px" }}>–</span>
                          <strong>₹{max!.toLocaleString("en-IN")}</strong>
                        </p>
                        <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>per sqft (built-up area)</p>
                      </>
                    ) : (
                      <p className="font-mono" style={{ fontSize: "16px", color: "var(--text-tertiary)" }}>Custom quote only</p>
                    )}
                  </div>
                  <div className="md:pt-1">
                    <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{description}</p>
                  </div>
                  {min !== null && (
                    <div className="flex items-center gap-3 md:justify-end">
                      <div className="w-full md:w-32 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.round(((min + max!) / 2 / 5000) * 100)}%`, background: "var(--accent)" }} />
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-8 pt-6 border-t border-border" style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              Civil construction rates for built-up area only. Exclude land, approvals, utility connections, and interiors.
              See full exclusions list below.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── HOW WE BUILT THIS INDEX ──────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="methodology-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Methodology</p>
            <h2
              id="methodology-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              How we built this index
            </h2>
            <div className="space-y-5" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "18px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Most cost pages quote one number from one source. That number breaks the moment a homeowner gets a real
                quote. We did it differently. We pulled current rates from a spread of Bangalore-specific sources: builders,
                construction-tech firms, and live material trackers. Where they disagreed, we kept the spread instead of
                averaging it into a false single figure. We dropped clear outliers, like shell-only "starter" rates below
                ₹1,500 and one ultra-luxury quote that sat far under the rest of the market.
              </p>
              <p className="font-sans" style={{ fontSize: "18px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Every tier here is cross-checked against real project bills of quantities and current contractor quotes from
                Hosur and Bangalore. Ar. Chittrarasan, Principal Architect at Design Intend (formerly at Gensler), reviewed
                the bands. The result is a range you can actually plan against.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="inclusions-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>What's covered</p>
            <h2
              id="inclusions-heading"
              className="font-serif mb-6"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What the per-sqft rate includes
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "600px" }}>
              When a Bangalore contractor quotes a per-sqft rate, it almost always covers the core build of the habitable home:
            </p>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ maxWidth: "800px" }}>
              {[
                "Basic design: 2D floor plans, 3D elevation, structural drawings",
                "Earthwork and standard isolated-footing foundation in normal soil (up to ~5 ft depth)",
                "Full RCC structure: columns, beams, slabs, lintels, staircase",
                "External and internal walls, plastering, crack-control mesh at junctions",
                "Chemical waterproofing in bathrooms, utility areas, and terrace",
                "Floor and wall tiling, including bathroom dado and kitchen counter dado",
                "Concealed copper wiring, switchboards, MCB board, earthing, standard points per room",
                "CPVC water supply, PVC drainage, and a set allowance for basic sanitaryware",
                "Main door, internal doors, and windows (up to ~8–10% of built-up area)",
                "Interior putty, primer, and emulsion paint; exterior weatherproof paint",
                "Standard overhead tank and, in most quotes, a basic underground sump",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-sm" style={{ border: "1px solid var(--border)" }}>
                  <span className="font-mono text-[11px] mt-0.5" style={{ color: "var(--accent)", flexShrink: 0 }}>+</span>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── EXCLUSIONS ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="exclusions-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Budget for these separately</p>
            <h2
              id="exclusions-heading"
              className="font-serif mb-4"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What the per-sqft rate does NOT include
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "600px" }}>
              This is where budgets blow up. None of the below is in a base per-sqft quote. Budget for them separately.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {EXCLUSIONS.map(({ item, cost }) => (
              <StaggerItem key={item}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 py-5 items-baseline">
                  <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</p>
                  <p className="font-mono" style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 500 }}>{cost}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-6 pt-4 border-t border-border" style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>
              A per-sqft rate is for the built-up area civil work. It is not the cheque you write to move in.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── MATERIAL PRICE INDEX ─────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="material-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Bangalore · June 2026 · Updated weekly
            </p>
            <h2
              id="material-heading"
              className="font-serif mb-3"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Material price index, Bangalore, mid-2026
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "580px" }}>
              Material prices move week to week. These are current ranges. The figures firmed through 2025 into 2026,
              with steel the most volatile and river sand the scarcest.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {MATERIAL_PRICES.map(({ material, range, note, unit }) => (
              <StaggerItem key={material}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_220px] gap-3 md:gap-6 py-5 items-baseline">
                  <div>
                    <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-primary)", lineHeight: 1.4 }}>{material}</p>
                    {note && <p className="font-mono mt-1" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{note}</p>}
                  </div>
                  <p className="font-mono tabular-nums" style={{ fontSize: "17px", fontWeight: 500, color: "var(--text-primary)" }}>{range}</p>
                  <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{unit}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn direction="up" delay={0.1}>
            <div className="mt-8 space-y-3">
              <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text-secondary)" }}>Note on steel:</strong> National price indices sometimes show a lower band near ₹55 to ₹66 per kg.
                Bangalore retail rates for branded TMT run higher, in the ₹65 to ₹85 range. Always confirm the live rate at quote time.
              </p>
              <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text-secondary)" }}>Note on sand:</strong> River sand mining is heavily restricted in Karnataka, so most Bangalore
                construction now uses M-Sand. River sand is expensive and hard to source legally.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── COST BY ZONE ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="zone-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Zone variation</p>
            <h2
              id="zone-heading"
              className="font-serif mb-4"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              How cost varies across Bangalore
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "600px" }}>
              The same 1,200 sqft home can cost ₹6 to ₹10 lakh more depending only on the neighbourhood.
              Three things drive it: soil bearing capacity, site access, and local labour demand.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                zone: "North Bangalore",
                areas: "Devanahalli, Yelahanka, Hebbal",
                range: "₹2,000 – ₹2,800/sqft",
                note: "Hard laterite soil means shallower, cheaper foundations. Often the most economical zone to build in.",
              },
              {
                zone: "East & South-East",
                areas: "Sarjapur, Whitefield, Electronic City, Marathahalli",
                range: "₹2,100 – ₹3,500/sqft",
                note: "IT-corridor demand lifts labour rates. Soft lakebed soil near Bellandur and Varthur can force deep foundations (+₹300–₹450/sqft footprint). Parts of Whitefield are rocky and need breaking.",
              },
              {
                zone: "Central",
                areas: "Indiranagar, Koramangala, Jayanagar, Malleshwaram",
                range: "₹2,800 – ₹4,000+/sqft",
                note: "Narrow streets block large trucks and ready-mix, so logistics cost more. Builds here are usually premium spec to match land values.",
              },
            ].map(({ zone, areas, range, note }) => (
              <StaggerItem key={zone}>
                <div className="rounded-sm p-6 h-full" style={{ border: "1px solid var(--border)" }}>
                  <p className="font-serif mb-1" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{zone}</p>
                  <p className="font-mono mb-3" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{areas}</p>
                  <p className="font-mono tabular-nums mb-4" style={{ fontSize: "18px", fontWeight: 500, color: "var(--accent)" }}>{range}</p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{note}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── WORKED EXAMPLE ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="example-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Worked example · 30×40 site · G+1 · Standard quality
            </p>
            <h2
              id="example-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What a 30×40 G+1 actually costs in Bangalore
            </h2>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <div
              className="rounded-sm p-7 md:p-10"
              style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.03)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>Plot parameters</p>
                  {[
                    ["Plot", "30 × 40 feet, 1,200 sqft of land"],
                    ["Configuration", "Ground plus one floor (G+1)"],
                    ["Built-up area", "~2,000 sqft after BBMP setbacks (typical 1,800–2,400 sqft)"],
                    ["Rate used", "Standard: ₹2,100–₹2,600/sqft"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-4 py-2 border-b" style={{ borderColor: "rgba(196,154,60,0.15)" }}>
                      <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)", width: "140px", flexShrink: 0 }}>{label}</p>
                      <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)" }}>{value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>Cost output</p>
                  {[
                    ["Core civil cost", "₹42,00,000 – ₹52,00,000"],
                    ["Move-in ready", "₹58,00,000 – ₹65,00,000"],
                    ["+ Approvals, BESCOM, borewell, compound wall, basic interiors"],
                  ].map((row, i) =>
                    row.length === 2 ? (
                      <div key={i} className="flex gap-4 py-2 border-b" style={{ borderColor: "rgba(196,154,60,0.15)" }}>
                        <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)", width: "140px", flexShrink: 0 }}>{row[0]}</p>
                        <p className="font-mono tabular-nums" style={{ fontSize: "17px", fontWeight: 500, color: "var(--text-primary)" }}>{row[1]}</p>
                      </div>
                    ) : (
                      <p key={i} className="font-mono pt-3" style={{ fontSize: "12px", color: "var(--text-tertiary)", lineHeight: 1.6 }}>{row[0]}</p>
                    )
                  )}
                </div>
              </div>
              <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
                Cross-check: Brick &amp; Bolt estimates ₹43.2 to ₹67.2 lakh for a 2,400 sqft G+1 at standard quality.
                myNivasa estimates ₹45 to ₹60 lakh for an 1,800 to 2,200 sqft G+1. Our model sits in line with both.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR WIDGET ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <BangalorePlannerCTA sourcePage="blr-cost-index" />
          </AnimateIn>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Index questions
            </p>
            <h2
              id="faq-heading"
              className="font-serif mb-10"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Bangalore Cost Index 2026
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-cost-index-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── INTERNAL LINKS ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2
              id="related-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Use this data
            </h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                href: "/construction-cost/bangalore",
                eyebrow: "Rate hub",
                title: "Bangalore construction hub",
                desc: "Start here for all Bangalore cost pages and the free estimator.",
              },
              {
                href: "/construction-cost/bangalore/per-sqft",
                eyebrow: "Per-sqft detail",
                title: "Construction cost per sqft in Bangalore",
                desc: "Full breakdown by home type and build configuration.",
              },
              {
                href: "/construction-cost/bangalore/30x40",
                eyebrow: "Calculator page",
                title: "30×40 plot cost in Bangalore",
                desc: "Tier breakdown and costs for Bangalore's most common plot.",
              },
              {
                href: "/construction-cost/bangalore/50-lakh-house",
                eyebrow: "Budget planner",
                title: "What ₹50 lakh builds in Bangalore",
                desc: "Work backward from your budget to plot size and quality tier.",
              },
            ].map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link
                  href={href}
                  className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>{eyebrow}</p>
                  <p className="font-serif mb-2 group-hover:text-navy transition-colors" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{title}</p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>
                Free · No sign-up · Under 2 minutes
              </p>
              <h2
                className="font-serif mb-4"
                style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}
              >
                Turn these rates into your estimate
              </h2>
              <p
                className="font-sans mb-8 mx-auto"
                style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}
              >
                Five questions. A personalised cost range, material list, and payment timeline
                built from Bangalore BOQs. Pre-loaded with these rates.
              </p>
              <Link
                href="/plan?city=bangalore&from=blr-cost-index-footer"
                className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}
              >
                Begin my Bangalore estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
