import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/hosur/per-sqft`;

function fmtRate(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Construction Cost Per Sqft in Hosur (2026 Rates by Tier) | Estimato",
  description:
    "Real 2026 construction cost per sqft in Hosur. Basic ₹1,500, standard ₹1,800, premium ₹2,200 and up, with a full breakdown of where the money goes.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Cost Per Sqft in Hosur (2026 Rates by Tier) | Estimato",
    description:
      "Real 2026 construction cost per sqft in Hosur. Basic ₹1,500, standard ₹1,800, premium ₹2,200 and up, with a full breakdown of where the money goes.",
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
      { "@type": "ListItem", position: 4, name: "Construction Cost Per Sqft Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Construction Cost Per Sqft in Hosur (2026)",
    url: PAGE_URL,
    description:
      "Real 2026 construction cost per sqft in Hosur by typology and quality tier, with a full breakdown of where the budget goes.",
    dateModified: "2026-06-08",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const TYPOLOGIES = [
  "Independent House",
  "Duplex House",
  "Contemporary Villa",
  "Luxury Villa",
] as const;

const RATE_TABLE = [
  { typology: "Independent House",  tier: "Basic",    min: 1400, avg: 1500, max: 1600, badge: null },
  { typology: "Independent House",  tier: "Standard", min: 1650, avg: 1800, max: 1950, badge: "Most common" },
  { typology: "Independent House",  tier: "Premium",  min: 2000, avg: 2200, max: 2400, badge: null },
  { typology: "Duplex House",       tier: "Standard", min: 1800, avg: 1950, max: 2100, badge: null },
  { typology: "Duplex House",       tier: "Premium",  min: 2150, avg: 2400, max: 2650, badge: "Most typical" },
  { typology: "Duplex House",       tier: "Luxury",   min: 2700, avg: 3100, max: 3500, badge: null },
  { typology: "Contemporary Villa", tier: "Standard", min: 2050, avg: 2250, max: 2450, badge: null },
  { typology: "Contemporary Villa", tier: "Premium",  min: 2500, avg: 2850, max: 3100, badge: "Most typical" },
  { typology: "Contemporary Villa", tier: "Luxury",   min: 3200, avg: 3750, max: 4300, badge: null },
  { typology: "Luxury Villa",       tier: "Premium",  min: 2800, avg: 3150, max: 3450, badge: null },
  { typology: "Luxury Villa",       tier: "Luxury",   min: 3600, avg: 4200, max: 5200, badge: null },
];

const BREAKDOWN = [
  { label: "Superstructure RCC frame",        pct: 22 },
  { label: "Foundation and substructure",     pct: 14 },
  { label: "Flooring and tile finishes",      pct: 11 },
  { label: "Bespoke joinery and main doors",  pct: 11 },
  { label: "Brickwork and internal walls",    pct: 10 },
  { label: "Plastering and external prep",    pct: 8 },
  { label: "Electrical infrastructure",       pct: 7 },
  { label: "Plumbing and drainage",           pct: 6 },
  { label: "Painting and fine finishes",      pct: 6 },
  { label: "Windows and outer glazing",       pct: 5 },
];

const DRIVERS = [
  {
    heading: "Foundation complexity",
    detail:
      "Rocky granite plots need rock-breaking; low-lying clay plots need deeper rafts. This adds ₹120 to ₹250 per sqft to the foundation line.",
  },
  {
    heading: "Structural span length",
    detail:
      "Wide open spans over 18 feet need more structural steel and deeper beams, which raises civil cost above the published average.",
  },
  {
    heading: "Site distance from Hosur grid",
    detail:
      "Sites more than 15 km from central Hosur — outer Bagalur, Denkanikottai Road — carry a 5 to 8% transport surcharge on concrete and aggregates.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the construction cost per sqft in Hosur in 2026?",
    answer:
      "A standard independent house costs about ₹1,800 per sqft. Basic builds start near ₹1,500 and premium villas reach ₹2,850 per sqft and above.",
  },
  {
    question: "What does the per-sqft rate include?",
    answer:
      "It covers all civil work, finishing materials, and mechanical, electrical, and plumbing work, plus contractor margin. It excludes land cost, government approvals, and external development charges.",
  },
  {
    question: "Why is construction in Hosur getting more expensive?",
    answer:
      "Labor is being pulled into local electronics and EV factories, which has pushed wages up. Costs rose 9% in the last year.",
  },
  {
    question: "What adds hidden cost to the per-sqft rate?",
    answer:
      "Rocky or clay soil can add ₹120 to ₹250 per sqft for the foundation, and far-out sites pay a 5 to 8% material transport surcharge.",
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
    href: "/construction-cost/hosur/calculator",
    eyebrow: "Interactive tool",
    title: "Construction cost calculator",
    desc: "Enter your BUA and quality tier to get a full cost breakdown with component amounts.",
  },
  {
    href: "/construction-cost/hosur/material-prices",
    eyebrow: "Market data",
    title: "Hosur material prices (2026)",
    desc: "Current cement, steel, sand, and labor rates in Hosur with 1, 3, and 5-year changes.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PerSqftHosurPage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Per Sqft</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Hosur · Last updated: June 2026 · BOQ-verified rates
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
              Construction Cost Per Sqft
              <br className="hidden md:block" /> in Hosur (2026)
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              Real 2026 rates by typology and quality tier, built from project BOQs.
              Covers independent houses, duplexes, contemporary villas, and luxury villas.
              <span className="font-mono text-[13px] ml-2" style={{ color: "var(--text-tertiary)" }}>Source: Estimato Hosur Construction Cost Index, 2026.</span>
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
                Building a standard independent house in Hosur costs about{" "}
                <strong>₹1,800 per sqft</strong> of built-up area in 2026. Basic builds start near{" "}
                <strong>₹1,500 per sqft</strong>. Premium contemporary villas run{" "}
                <strong>₹2,850 per sqft and above</strong>. Rates cover all civil work, finishes, and MEP, but exclude land, approvals, and external development charges.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE TABLE ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-table-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur 2026 · All typologies
            </p>
            <h2
              id="rate-table-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Construction rates by typology and tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Rates are per sqft of built-up area. Min/average/max reflect the real spread on recent Hosur projects, not theoretical ranges.
            </p>
          </AnimateIn>

          <div className="space-y-12">
            {TYPOLOGIES.map((typology) => {
              const rows = RATE_TABLE.filter((r) => r.typology === typology);
              return (
                <AnimateIn key={typology} direction="up">
                  <h3
                    className="font-serif mb-4"
                    style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--text-primary)" }}
                  >
                    {typology}
                  </h3>
                  <div className="border-t border-border">
                    {/* Column headers */}
                    <div
                      className="grid gap-4 py-3 border-b"
                      style={{ gridTemplateColumns: "1fr 110px 110px 110px", borderColor: "var(--border)" }}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Tier</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>Min</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-center" style={{ color: "var(--text-tertiary)" }}>Average</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-right" style={{ color: "var(--text-tertiary)" }}>Max</span>
                    </div>
                    {rows.map((row) => (
                      <div
                        key={row.tier}
                        className="grid gap-4 py-5 border-b last:border-b-0 items-center"
                        style={{ gridTemplateColumns: "1fr 110px 110px 110px", borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className="font-serif"
                            style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                          >
                            {row.tier}
                          </span>
                          {row.badge && (
                            <span
                              className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                              style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}
                            >
                              {row.badge}
                            </span>
                          )}
                        </div>
                        <span
                          className="font-mono tabular-nums text-right"
                          style={{ fontSize: "15px", color: "var(--text-secondary)" }}
                        >
                          {fmtRate(row.min)}
                        </span>
                        <span
                          className="font-mono tabular-nums text-center font-medium"
                          style={{ fontSize: "16px", color: "var(--text-primary)" }}
                        >
                          {fmtRate(row.avg)}
                        </span>
                        <span
                          className="font-mono tabular-nums text-right"
                          style={{ fontSize: "15px", color: "var(--text-secondary)" }}
                        >
                          {fmtRate(row.max)}
                        </span>
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              );
            })}
          </div>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-10 pt-6 border-t border-border" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              Source: Estimato Hosur Construction Cost Index, 2026. Last updated June 2026. Rates cover civil work, finishes, and MEP. Excludes land, approvals, and external development charges.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── WHERE THE MONEY GOES ─────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="breakdown-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Standard residential build
            </p>
            <h2
              id="breakdown-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Where the money goes
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "540px", lineHeight: 1.65 }}>
              For a standard residential build, the budget splits across these ten categories. Structure and foundation together make up 36%.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {BREAKDOWN.map(({ label, pct }) => (
              <StaggerItem key={label}>
                <div className="grid grid-cols-[1fr_56px] gap-6 py-5 items-center">
                  <div>
                    <div className="h-1 rounded-full mb-3 overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(pct / 22) * 100}%`, background: "var(--accent)" }}
                      />
                    </div>
                    <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {label}
                    </p>
                  </div>
                  <p
                    className="font-mono tabular-nums text-right"
                    style={{ fontSize: "22px", fontWeight: 500, color: "var(--text-primary)" }}
                  >
                    {pct}%
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── WHAT DRIVES THE RATE ─────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="drivers-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur-specific factors
            </p>
            <h2
              id="drivers-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What drives the rate up or down
            </h2>
          </AnimateIn>

          <StaggerContainer className="space-y-4">
            {DRIVERS.map(({ heading, detail }) => (
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

        {/* ── HISTORICAL CONTEXT ───────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="history-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Rate history
            </p>
            <h2
              id="history-heading"
              className="font-serif mb-6"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              How Hosur rates have moved
            </h2>
            <div
              className="rounded-sm p-6 md:p-8"
              style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.05)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: "var(--accent)" }}>2020</p>
                  <p className="font-mono tabular-nums" style={{ fontSize: "28px", fontWeight: 500, color: "var(--text-primary)" }}>₹1,200</p>
                  <p className="font-mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>per sqft (standard)</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: "var(--accent)" }}>2026</p>
                  <p className="font-mono tabular-nums" style={{ fontSize: "28px", fontWeight: 500, color: "var(--text-primary)" }}>₹2,050</p>
                  <p className="font-mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>per sqft (standard)</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: "var(--accent)" }}>YoY change</p>
                  <p className="font-mono tabular-nums" style={{ fontSize: "28px", fontWeight: 500, color: "var(--text-primary)" }}>+9.0%</p>
                  <p className="font-mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>2025 → 2026</p>
                </div>
              </div>
              <p className="font-sans" style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The average standard-build rate in Hosur has moved from ₹1,200 per sqft in 2020 to ₹2,050 per sqft in 2026.
                The 2026 figure is up 9.0% year on year, driven by labor competition from the local electronics and EV factories.
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
              Construction cost per sqft in Hosur
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-per-sqft-faq" />
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
                Know your real number
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions about your plot, configuration, and quality level. A cost range, BOQ summary, and payment timeline built from Hosur data.
              </p>
              <Link href="/plan?city=hosur&from=hosur-per-sqft-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
