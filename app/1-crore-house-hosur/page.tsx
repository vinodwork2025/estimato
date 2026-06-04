import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/1-crore-house-hosur`;

export const metadata: Metadata = {
  title: "₹1 Crore House in Hosur 2026 – Luxury and Premium Builds",
  description:
    "₹1 crore in Hosur in 2026: standard quality 4,166–4,761 sqft, premium 3,448–4,000 sqft. Full breakdown of configurations, quality tiers, and what drives cost at this level.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "₹1 Crore House in Hosur 2026 – Luxury and Premium Builds",
    description:
      "A ₹1 crore build in Hosur in 2026 delivers a full 5 BHK G+2 at standard or an architect-grade villa at premium. See what the numbers look like across all tiers.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Hosur", item: `${SITE_URL}/construction-cost/hosur` },
      { "@type": "ListItem", position: 3, name: "₹1 Crore House Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "₹1 Crore House in Hosur 2026 – Luxury and Premium Builds",
    url: PAGE_URL,
    dateModified: "2026-06-03",
    inLanguage: "en-IN",
  },
];

function fmtRate(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

const RATE_TIERS = [
  {
    key: "basic",
    label: "Basic",
    rateMin: TIER_RATES.basic.min,
    rateMax: TIER_RATES.basic.max,
    buaMin: 4878,
    buaMax: 5405,
    desc: "A very large home. Rarely built at basic quality at ₹1 crore — the size outpaces practical need.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Most common at ₹1Cr",
    rateMin: TIER_RATES.standard.min,
    rateMax: TIER_RATES.standard.max,
    buaMin: 4166,
    buaMax: 4761,
    desc: "A full 5 BHK G+2 with garage, servant quarter, and proper garden. Branded fittings throughout.",
  },
  {
    key: "premium",
    label: "Premium",
    rateMin: TIER_RATES.premium.min,
    rateMax: TIER_RATES.premium.max,
    buaMin: 3448,
    buaMax: 4000,
    desc: "Italian-grade tile, Jaquar fittings, architect elevation. 4 BHK G+2 on a 40x60 plot.",
  },
  {
    key: "luxury",
    label: "Luxury",
    rateMin: TIER_RATES.luxury.min,
    rateMax: TIER_RATES.luxury.max,
    buaMin: 2500,
    buaMax: 3333,
    desc: "Imported marble, Kohler sanitary, Lutron lighting. A bespoke villa on a 30x50 or 40x50 plot.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does ₹1 crore buy in Hosur in 2026?",
    answer:
      "At standard quality, ₹1 crore in Hosur in 2026 buys 4,166 to 4,761 sqft of built-up area — enough for a full 5 BHK G+2 home with a double garage, servant quarter, landscaped garden, and proper elevation treatment. At premium quality the BUA is 3,448 to 4,000 sqft, with Italian-grade tile, Jaquar fittings throughout, and an architect-designed exterior. At luxury quality, you are looking at 2,500 to 3,333 sqft with imported marble, Kohler sanitary, Lutron lighting, and a fully architect-curated interior.",
  },
  {
    question: "Is ₹1 crore enough for a luxury home in Hosur?",
    answer:
      "Yes — but with a clear definition of luxury. At ₹1 crore, Hosur luxury rates of ₹3,000–₹4,000/sqft deliver 2,500 to 3,333 sqft. A well-designed 2,800–3,000 sqft home on a 40x50 plot with imported marble, Kohler sanitary, Legrand or Lutron electrical, and a designed elevation and landscape is a genuine luxury home by Hosur standards. What ₹1 crore does not reach: Kohler-throughout plus full smart home automation plus imported stone throughout in a 4,000+ sqft home. That requires ₹1.5 crore or more.",
  },
  {
    question: "What configuration fits a ₹1 crore budget in Hosur?",
    answer:
      "The most common configuration at ₹1 crore in Hosur is a 40x60 plot with a G+2 structure at standard to premium quality — 4 to 5 bedrooms, two-car parking, a servant quarter, and a rooftop terrace. At standard quality this fits comfortably. At premium quality on the same plot you would need to reduce floors to G+1 with a partial G+2 to keep within budget. The most practical high-value configuration: 40x60 plot, G+2, premium finish, 4 BHK with study, two-car parking, servant quarter on ground floor, roof garden.",
  },
  {
    question: "Should I do premium on a large plot or luxury on a smaller one?",
    answer:
      "This is the central decision at ₹1 crore. Premium on a 40x60 G+2 gives you more rooms, more parking, and more flexibility for a growing family or multigenerational living. Luxury on a 30x50 G+1 gives you a home that feels significantly more refined in every material and detail — marble that ages well, fittings that last, lighting that is designed rather than installed. For families who will live there for 20+ years and value daily quality of life, the luxury-on-smaller path often wins. For families who need the rooms and the space now, premium-on-larger is the answer.",
  },
  {
    question: "How does a ₹1 crore Hosur build compare to equivalent Bangalore construction?",
    answer:
      "At Bangalore's 1.25x urban multiplier, a ₹1 crore budget delivers approximately 20–25% less BUA than the same budget in Hosur. The Hosur standard-quality range of 4,166–4,761 sqft would cost ₹1.22–₹1.43 crore in Bangalore urban areas at equivalent quality. A premium Hosur build at 3,448–4,000 sqft would cost ₹1.29–₹1.5 crore in Bengaluru city. Land costs compound this gap further — a 40x60 plot in Hosur can cost ₹40–₹80 lakh; the same plot in Sarjapura or Whitefield can cost ₹1.5–₹3 crore.",
  },
  {
    question: "What are the key cost drivers at ₹1 crore in Hosur?",
    answer:
      "At ₹1 crore, structural complexity becomes a cost driver that does not appear at smaller budgets. A G+2 home requires larger beams, deeper foundations, and more reinforcement than a G+1 — adding roughly 6–8% to civil cost per additional floor above G+1. Other key drivers: basement (adds 22% on the basement footprint), two-car covered parking with a proper ramp (adds 6%), imported stone throughout (replaces 40% of finish cost with 2–3x priced material), and smart home electrical (adds ₹8–₹15 lakh depending on coverage). At ₹1 crore, the decisions about structural configuration and material specification drive final cost more than floor area alone.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/hosur",
    eyebrow: "Hosur rates",
    title: "Hosur construction rates",
    desc: "Full breakdown of all quality tiers and what drives cost.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "BOQ-based rate verification for Hosur and Bangalore.",
  },
  {
    href: "/60-lakh-house-hosur",
    eyebrow: "Budget below",
    title: "₹60 lakh house in Hosur",
    desc: "How ₹1 crore compares to the tier below.",
  },
  {
    href: "/villa-construction-cost/hosur",
    eyebrow: "Villa guide",
    title: "Villa construction cost in Hosur",
    desc: "Detailed guide for villa builds across all quality tiers.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OneCroreHosurPage() {
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

        {/* ── HERO + QUICK ANSWER ─────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>
                Estimato
              </Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/hosur" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>
                Hosur
              </Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>
                ₹1 Crore
              </span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Hosur · Last updated: June 2026 · Significant residential build
            </p>

            <h1
              className="font-serif mb-4"
              style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              ₹1 crore house in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              At this budget, the question is not how much sqft — it is how you want to live. Here is what the numbers look like across every quality tier.
            </p>

            {/* Quick Answer Box */}
            <div
              className="rounded-sm p-6 md:p-8"
              style={{ border: "1px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
                Quick answer
              </p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                With <strong>₹1 crore</strong> in Hosur in 2026 you can build roughly <strong>4,166 to 4,761 sq ft</strong> at standard quality — a full G+2 villa with parking and servant quarter. Premium quality limits you to <strong>3,448–4,000 sq ft</strong> with Italian-grade tile and Jaquar fittings. Luxury finishes bring the range to <strong>2,500–3,333 sq ft</strong> with imported marble and Kohler sanitary. Standard rates run <strong>₹2,100–₹2,400/sqft</strong>. At ₹1 crore, material and design choices drive cost more than floor area.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── RATE BANDS ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-bands-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Budget: ₹1 crore · Hosur 2026
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What ₹1 crore builds by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              BUA figures assume the full ₹1 crore goes to civil construction. At this budget, also account for ₹8–₹12 lakh for statutory approvals, compound wall, and site preparation.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_TIERS.map(({ key, label, badge, rateMin, rateMax, buaMin, buaMax, desc }) => (
              <StaggerItem key={key}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-4 md:gap-8 py-7 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                        {label}
                      </p>
                      {badge && (
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                          style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}
                        >
                          {badge}
                        </span>
                      )}
                    </div>
                    <p className="font-mono tabular-nums" style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
                      {fmtRate(rateMin)}–{fmtRate(rateMax)}/sqft
                    </p>
                  </div>

                  <div className="md:pt-1">
                    <p className="font-mono tabular-nums mb-1" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                      {buaMin.toLocaleString("en-IN")}–{buaMax.toLocaleString("en-IN")} sqft
                    </p>
                    <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                      {desc}
                    </p>
                  </div>

                  <div className="flex items-center md:justify-end">
                    <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.round((rateMax / 4000) * 100)}%`, background: "var(--accent)" }}
                      />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Ultra Luxury */}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-4 md:gap-8 py-7 items-start">
                <div>
                  <p className="font-serif mb-1" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                    Ultra Luxury
                  </p>
                  <p className="font-mono" style={{ fontSize: "16px", color: "var(--text-tertiary)" }}>
                    ₹5,000+/sqft
                  </p>
                </div>
                <div className="md:pt-1">
                  <p className="font-sans mb-2" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    Imported stone, Kohler or Duravit, Lutron smart lighting. No standard rate applies — every project is priced from a full design brief.
                  </p>
                  <Link
                    href="/plan?city=hosur&from=hosur-1cr-ultra"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}
                  >
                    Contact for custom quote
                  </Link>
                </div>
                <div className="flex items-center md:justify-end">
                  <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full rounded-full" style={{ width: "100%", background: "var(--accent)" }} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* BOQ Credibility */}
          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-8 pt-6 border-t border-border" style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              "Rates built from real project BOQs and verified against current Hosur and Bangalore contractor quotes, 2026"
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── INLINE CTA ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <div className="rounded-sm p-7 md:p-10" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
                Free · No sign-up · Under 2 minutes
              </p>
              <h2 className="font-serif mb-3" style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Get a detailed estimate for your ₹1 crore build
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "500px" }}>
                Configure your plot, floors, and quality tier. Get a cost range with phase-wise payment schedule — drawn from verified Hosur BOQ data.
              </p>
              <ul className="mb-7 space-y-2">
                {[
                  "Civil and structural cost range",
                  "MEP and finishing allowance",
                  "Phase-wise payment schedule",
                  "Material quantity estimates",
                  "Hosur-verified rates, 2026",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>—</span>
                    <span className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/plan?city=hosur&from=hosur-1crore"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
              >
                Start my estimate →
              </Link>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── CONTENT BODY ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="content-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              What to know about this budget
            </p>
            <h2
              id="content-heading"
              className="font-serif mb-10"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              A significant home in Hosur's market
            </h2>
          </AnimateIn>

          <div className="space-y-8 max-w-2xl">
            <AnimateIn direction="up" delay={0.05}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                At ₹1 crore, you are building one of the more substantial homes in Hosur's residential market. Standard quality at this budget delivers 4,166 to 4,761 sqft — a full G+2 home on a 40x60 plot with a two-car garage, servant quarter, proper staircase with landing, and enough space for five bedrooms plus a study or home office. The home at this scale has genuine presence. Premium quality brings it to 3,448 to 4,000 sqft with Italian-grade porcelain tile, Jaquar fittings throughout, Legrand electrical, and an architect-designed elevation. The exterior of a ₹1 crore premium build in Hosur is visually distinct from anything at the ₹60 lakh range.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                In Hosur's current market in 2026, ₹1 crore builds are concentrated in gated layouts along the ECR road and Rayakottai road corridors, where larger plots with good road access and planned infrastructure attract buyers at this price point. The most common configuration for a ₹1 crore build here: a 40x60 plot purchased at ₹50–₹80 lakh, a G+2 structure at standard to premium quality, 4 to 5 bedrooms, two-car covered parking, a separate ground-floor servant quarter, and a designed roof terrace. Total project cost including land, civil, interiors, and approvals typically runs ₹1.5 to ₹1.8 crore at this configuration. The civil construction figure of ₹1 crore covers the building itself.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The shift that happens at ₹1 crore — and above — is that the question is no longer "how much can I build" but "how do I want to live in this home." The size is not in question. What changes is the quality of every daily experience: the tile that your feet touch every morning, the tap fittings that will last a decade, the light switches that look the same in ten years, the ceiling height that makes rooms feel different. These are the choices that ₹1 crore unlocks, and they are choices best made with an architect and a proper BOQ — not improvised on site. Design Intend, Estimato's Hosur partner, works at this level with a full design-to-construction process.
              </p>
            </AnimateIn>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="font-serif mb-10"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              ₹1 crore in Hosur — answered
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-1cr-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── PARTNER CARD ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur exclusive partner
            </p>
            <h2
              id="partner-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Verified architect on the ground
            </h2>

            <div
              className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start"
              style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-serif" style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--text-primary)" }}>
                    {partner.name}
                  </p>
                  {partner.isFounding && (
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                      style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}
                    >
                      Founding partner
                    </span>
                  )}
                </div>
                <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)", lineHeight: 1.5 }}>
                  {partner.tagline}
                </p>
                <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Led by {partner.founderName}. {partner.founderBio} Exclusive territory: Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
                    style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${partner.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:opacity-80"
                    style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}
                  >
                    Email
                  </a>
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:opacity-80"
                      style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}
                    >
                      Website ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-sm p-5" style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>
                  Services
                </p>
                {["Architecture & design", "HTM approval support", "Structural drawings", "Turnkey construction", "Interior fit-out", "Project management"].map((s) => (
                  <p key={s} className="font-mono py-2 border-b last:border-b-0" style={{ fontSize: "14px", color: "var(--text-secondary)", borderColor: "rgba(196,154,60,0.12)" }}>
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── INTERNAL LINKS ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2
              id="related-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Related pages
            </h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERNAL_LINKS.map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link
                  href={href}
                  className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-[var(--text-primary)]"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>
                    {eyebrow}
                  </p>
                  <p className="font-serif mb-2" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                    {title}
                  </p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ─────────────────────────────────────────────────── */}
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
                Start your ₹1 crore estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline — built from Hosur BOQs.
              </p>
              <Link
                href="/plan?city=hosur&from=hosur-1crore-footer"
                className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}
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
