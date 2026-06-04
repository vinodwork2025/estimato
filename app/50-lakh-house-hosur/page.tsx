import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/50-lakh-house-hosur`;

export const metadata: Metadata = {
  title: "₹50 Lakh House in Hosur 2026 – 3 BHK G+1 at Standard Quality",
  description:
    "₹50 lakh is the most common construction budget in Hosur. Get a full breakdown by quality tier — standard G+1 3 BHK, modular kitchen, and what the numbers include in 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "₹50 Lakh House in Hosur 2026 – 3 BHK G+1 at Standard Quality",
    description:
      "At standard quality, ₹50 lakh buys 2,083–2,380 sqft in Hosur in 2026. Includes modular kitchen and quality flooring. Full breakdown.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL_CONST = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

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
      { "@type": "ListItem", position: 3, name: "₹50 Lakh House Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "₹50 Lakh House in Hosur 2026 – 3 BHK G+1 at Standard Quality",
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
    buaMin: 2439,
    buaMax: 2702,
    desc: "Large footprint, local materials. Enough for a 3 BHK villa on a 30x40 or 30x50 plot.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Most common at ₹50L",
    rateMin: TIER_RATES.standard.min,
    rateMax: TIER_RATES.standard.max,
    buaMin: 2083,
    buaMax: 2380,
    desc: "The sweet spot. Branded tile, modular kitchen, Kajaria flooring, decent sanitary.",
  },
  {
    key: "premium",
    label: "Premium",
    rateMin: TIER_RATES.premium.min,
    rateMax: TIER_RATES.premium.max,
    buaMin: 1724,
    buaMax: 2000,
    desc: "Somany, Jaquar, Legrand. Full premium quality is possible with reduced BUA.",
  },
  {
    key: "luxury",
    label: "Luxury",
    rateMin: TIER_RATES.luxury.min,
    rateMax: TIER_RATES.luxury.max,
    buaMin: 1250,
    buaMax: 1666,
    desc: "Italian marble, Kohler. A compact luxury home — architect design required.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does ₹50 lakh buy in terms of construction in Hosur?",
    answer:
      "At standard quality — the most common choice for first-home buyers in Hosur — ₹50 lakh buys 2,083 to 2,380 sqft of built-up area. That is a comfortable G+1 home on a 30x40 plot, with a 3 BHK configuration, proper staircase, two bathrooms, and a covered entry. The civil cost includes structure, brickwork, plastering, basic waterproofing, standard flooring, doors and windows, electrical wiring, and plumbing rough-in. It does not include a modular kitchen or wardrobes — those are interiors and cost an additional ₹5–₹8 lakh.",
  },
  {
    question: "Is ₹50 lakh enough for a 3 BHK G+1 in Hosur?",
    answer:
      "Yes, comfortably. A standard-quality G+1 on a 30x40 plot with a total built-up area of 1,800–2,000 sqft costs ₹37–₹48 lakh in civil work. The extra headroom in a ₹50 lakh budget lets you improve the finish level, add a covered parking slab, or keep a contingency buffer. If you are building on a 30x50 or 40x50 plot and want a full 2,000+ sqft G+1 at standard quality, ₹50 lakh is close but you may need to phase the compound wall and parking separately.",
  },
  {
    question: "Can I include a modular kitchen in a ₹50 lakh Hosur build?",
    answer:
      "Not if you want to stay within ₹50 lakh for everything. A basic modular kitchen in Hosur costs ₹2.5–₹4 lakh, a mid-range one ₹4–₹7 lakh. The smart approach: allocate the full ₹50 lakh to civil construction to get a solid G+1 at standard quality, then budget ₹6–₹10 lakh separately for interiors — kitchen, wardrobes, painting, and accessories. This phased approach is what most experienced Hosur homeowners do, and it results in a better home than trying to compress everything into one number.",
  },
  {
    question: "What plot size works best with a ₹50 lakh budget?",
    answer:
      "A 30x40 plot is the natural match for a ₹50 lakh build at standard quality. The plot gives you 1,200 sqft of gross area, and at 65% ground coverage you get 780 sqft per floor. A G+1 on this plot gives you around 1,560 sqft of BUA — comfortably within ₹50 lakh at standard rates. Going to a 40x60 plot and trying to build across the full footprint at standard quality pushes the BUA above 2,500 sqft, which would cost ₹52–₹60 lakh in civil work alone.",
  },
  {
    question: "How do I split ₹50 lakh between structure and interiors?",
    answer:
      "The advised split for a first home in Hosur: put ₹44–₹46 lakh into civil construction and hold ₹4–₹6 lakh for interiors post-handover. This gets you a complete, move-in-ready shell at standard quality with basic flooring and fittings. Interiors — kitchen, wardrobes, feature walls, lighting — can be done in phases after you move in. Trying to do a full interior fit-out within the same ₹50 lakh means either cutting civil quality or ending up with a builder-grade kitchen that you will want to replace in five years.",
  },
  {
    question: "What quality tier is realistic at ₹50 lakh?",
    answer:
      "Standard quality is the natural fit for ₹50 lakh in Hosur in 2026. At standard, you get Kajaria or equivalent tile, CP fittings from Hindware or similar, basic modular electrical points with MCB panels, standard plaster finish, and a simple but well-designed exterior. Premium quality is achievable at ₹50 lakh if you accept a smaller BUA — 1,724 to 2,000 sqft. For most families, standard quality across 2,000+ sqft is more useful than premium quality across 1,700 sqft.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/hosur",
    eyebrow: "Hosur rates",
    title: "Hosur construction rates",
    desc: "Full rate table for all quality tiers in Hosur 2026.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "Data sources and methods behind every Estimato rate.",
  },
  {
    href: "/40-lakh-house-hosur",
    eyebrow: "Budget below",
    title: "₹40 lakh house in Hosur",
    desc: "What is achievable at the entry-level budget in Hosur.",
  },
  {
    href: "/60-lakh-house-hosur",
    eyebrow: "Budget above",
    title: "₹60 lakh house in Hosur",
    desc: "What the next level up buys in quality and built-up area.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FiftyLakhHosurPage() {
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
                ₹50 Lakh
              </span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Hosur · Last updated: June 2026 · Most common budget
            </p>

            <h1
              className="font-serif mb-4"
              style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              ₹50 lakh house in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              The most common Hosur construction budget in 2026 — what it delivers, where it stretches, and where it stops.
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
                With <strong>₹50 lakh</strong> in Hosur in 2026 you can build roughly <strong>2,083 to 2,380 sq ft</strong> at standard quality — enough for a full 3 BHK G+1 with modular kitchen provision. At basic quality the range stretches to <strong>2,702 sq ft</strong>. Premium finish limits you to <strong>1,724–2,000 sq ft</strong>. Standard rates in Hosur run <strong>₹2,100–₹2,400/sqft</strong>. The extra ₹10 lakh over the ₹40L budget unlocks Kajaria-grade flooring, wardrobes in two bedrooms, and a basic elevation design.
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
              Budget: ₹50 lakh · Hosur 2026
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What ₹50 lakh builds by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              BUA figures assume the full budget goes to civil construction. Budget ₹4–₹6 lakh additionally for approvals, compound wall, and site costs.
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
                    No standard figure applies. Every project priced from a full design brief.
                  </p>
                  <Link
                    href="/plan?city=hosur&from=hosur-50lakh-ultra"
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
                Get a personalised estimate for your ₹50 lakh build
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "500px" }}>
                Enter your plot size, floors, and finish level. You get a detailed cost range and phase-wise payment schedule — drawn from verified Hosur rates.
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
                href="/plan?city=hosur&from=hosur-50lakh"
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
              The first-home budget in Hosur
            </h2>
          </AnimateIn>

          <div className="space-y-8 max-w-2xl">
            <AnimateIn direction="up" delay={0.05}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                In 2026, ₹50 lakh is the most commonly searched construction budget among Hosur first-home buyers — and for good reason. At standard quality, it gives you 2,083 to 2,380 sqft of built-up area. On a 30x40 plot, that translates to a full G+1 with three bedrooms, two bathrooms, a separate kitchen and dining area, a sit-out, and a covered staircase. The home is complete and liveable. What it includes at standard quality: Kajaria or equivalent tile, mid-range electrical fittings, plumbing rough-in for two bathrooms, and basic plaster-paint finish inside and out.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The extra ₹10 lakh over a ₹40 lakh budget makes a real difference. It unlocks the modular kitchen provision (civil cutouts, plumbing points, chimney provision), wardrobes in at least two bedrooms if you handle them as civil carpentry, Kajaria-equivalent flooring throughout, a basic elevation design with texture or cladding on the front face, and enough contingency to handle site surprises without stopping construction. At basic quality, ₹50 lakh can build 2,439 to 2,702 sqft — large enough for a small 3 BHK villa on a 30x40 or 30x50 plot. The trade-off is finish level and material durability.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The typical person building at ₹50 lakh in Hosur in 2026 is an employee of one of the EV, electronics, or manufacturing companies in the Hosur industrial zone — buying a 30x40 plot in a DTCP-approved layout and building a family home near their workplace. The advice for this profile: do not try to stretch ₹50 lakh across a 40x60 plot at standard quality. The numbers do not work without cutting structural quality. Build well on a 30x40 plot, get the structure right, and invest in interiors over time. A well-built 1,900 sqft home is better than an under-built 2,600 sqft one.
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
              ₹50 lakh in Hosur — answered
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-50l-faq" />
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
                Get your ₹50 lakh estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline — built from Hosur BOQs.
              </p>
              <Link
                href="/plan?city=hosur&from=hosur-50lakh-footer"
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
