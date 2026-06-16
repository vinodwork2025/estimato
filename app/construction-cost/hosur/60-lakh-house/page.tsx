import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/hosur/60-lakh-house`;

export const metadata: Metadata = {
  title: "What Can You Build for ₹60 Lakh in Hosur? | Estimato",
  description:
    "See what a ₹60 lakh budget builds in Hosur. Plot size, quality tier, and finish level, based on real contractor rates. Plan before you spend.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What Can You Build for ₹60 Lakh in Hosur? | Estimato",
    description:
      "See what a ₹60 lakh budget builds in Hosur. Plot size, quality tier, and finish level, based on real contractor rates. Plan before you spend.",
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
      { "@type": "ListItem", position: 3, name: "₹60 Lakh House Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "₹60 Lakh House in Hosur 2026 – Premium Entry Range",
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
    buaMin: 2926,
    buaMax: 3243,
    desc: "Very large footprint. Enough for a 4 BHK G+1 or a 3 BHK villa on a 40x50 plot.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Best value at ₹60L",
    rateMin: TIER_RATES.standard.min,
    rateMax: TIER_RATES.standard.max,
    buaMin: 2500,
    buaMax: 2857,
    desc: "Branded fittings, good flooring, full 3–4 BHK G+1 on a 30x50 or 40x50 plot.",
  },
  {
    key: "premium",
    label: "Premium",
    rateMin: TIER_RATES.premium.min,
    rateMax: TIER_RATES.premium.max,
    buaMin: 2068,
    buaMax: 2400,
    desc: "Jaquar, Somany Duragres, Legrand switches. A smaller but much better-finished home.",
  },
  {
    key: "luxury",
    label: "Luxury",
    rateMin: TIER_RATES.luxury.min,
    rateMax: TIER_RATES.luxury.max,
    buaMin: 1500,
    buaMax: 2000,
    desc: "Italian marble, Kohler sanitary, architect-designed spaces. A compact luxury villa.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the difference between ₹50 lakh and ₹60 lakh construction in Hosur?",
    answer:
      "The extra ₹10 lakh opens two paths. On the first path, you keep standard quality and build a larger home: 2,500 to 2,857 sqft instead of 2,083 to 2,380 sqft. That extra 400 to 500 sqft is meaningful: it is the difference between a compact 3 BHK and a proper 3 BHK with a study or a pooja room. On the second path, you keep the same BUA and step up to premium quality: Jaquar fittings, Somany Duragres tile, Legrand electrical, and a better elevation finish. Most families with a ₹60 lakh budget choose the first path unless they are building a forever home they intend to live in for 20+ years.",
  },
  {
    question: "Can I get premium quality materials within a ₹60 lakh budget?",
    answer:
      "Yes. At ₹60 lakh and premium rates of ₹2,500–₹2,900/sqft, you can build 2,068 to 2,400 sqft with Jaquar sanitary fittings, Somany or Duragres tile, Legrand or Anchor switches, designer plaster finish inside, and a proper architect-designed elevation with texture and cladding. The trade-off versus standard quality is roughly 400 sqft less BUA. For a family building a home they plan to live in for 20 years, the premium finish is a reasonable choice at this budget.",
  },
  {
    question: "What plot and configuration works well at ₹60 lakh?",
    answer:
      "A 30x50 plot with a G+1 at standard quality is an excellent fit for ₹60 lakh. Ground coverage at 65% gives 975 sqft per floor, and a G+1 delivers around 1,950 sqft of BUA, well within the budget at standard rates. A 40x50 plot works too, giving up to 1,300 sqft per floor and 2,600 sqft for G+1. For premium quality, a 30x40 plot with 1,500–1,600 sqft BUA gives you a tight but well-finished home without overspending on civil work.",
  },
  {
    question: "Is it better to build standard on a larger plot or premium on a smaller one?",
    answer:
      "It depends entirely on how long you plan to live there and what matters more to you: space or finish quality. Standard quality on a larger plot (say, 2,500 sqft BUA) gives the family more room to live, work, and grow. Premium quality on a smaller plot (say, 2,000 sqft BUA) gives you a home that looks and feels much better, is easier to maintain, and is likely to hold its value better. If you are building for 20+ years and care about daily quality of life, premium on a smaller plot is worth considering seriously.",
  },
  {
    question: "What does ₹60 lakh cover in terms of MEP and finishes?",
    answer:
      "At standard quality, ₹60 lakh covers: full concealed electrical wiring with MCB panels for all floors, plumbing rough-in for all bathrooms and kitchen, single-phase connection with provision for inverter, basic waterproofing on terrace and bathrooms, ceramic tile flooring throughout, plaster and paint interior finish, and a straightforward painted exterior. At premium quality, the same budget additionally covers: porcelain tile flooring, better bathroom fixtures, concealed plumbing with chrome fittings, and a designed exterior with texture paint or stone cladding on the main elevation.",
  },
  {
    question: "How much of the ₹60 lakh should go to civil versus interiors?",
    answer:
      "A practical split for ₹60 lakh: put ₹52–₹56 lakh toward civil construction and earmark ₹4–₹8 lakh for interiors and fit-out. This gives you a complete shell at standard or premium quality with all MEP work done, doors and windows installed, flooring laid, and bathroom fittings placed. The remaining ₹4–₹8 lakh handles the modular kitchen, wardrobes in all bedrooms, false ceiling if wanted, and custom joinery. If you try to do everything within the ₹60 lakh in one go, either the civil quality suffers or the interiors are too thin to be satisfying.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/hosur",
    eyebrow: "Hosur rates",
    title: "Hosur construction rates",
    desc: "Full rate table for Hosur across all quality tiers.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "Rate verification process and what the numbers include.",
  },
  {
    href: "/construction-cost/hosur/50-lakh-house",
    eyebrow: "Budget below",
    title: "₹50 lakh house in Hosur",
    desc: "How ₹60 lakh compares to the most common Hosur budget.",
  },
  {
    href: "/construction-cost/hosur/1-crore-house",
    eyebrow: "Budget above",
    title: "₹1 crore house in Hosur",
    desc: "What a much larger budget unlocks in Hosur.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SixtyLakhHosurPage() {
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
                ₹60 Lakh
              </span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Hosur · Last updated: June 2026 · Premium entry range
            </p>

            <h1
              className="font-serif mb-4"
              style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              ₹60 lakh house in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              At ₹60 lakh you can choose standard quality on a larger plot or step into premium materials. Here is what each path delivers.
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
                With <strong>₹60 lakh</strong> in Hosur in 2026 you can build roughly <strong>2,500 to 2,857 sq ft</strong> at standard quality. At basic quality the range stretches to <strong>3,243 sq ft</strong>, large enough for a 4 BHK G+1. Premium finish limits you to <strong>2,068–2,400 sq ft</strong> with Jaquar fittings, Somany tile, and a designed elevation. The decision between standard-larger and premium-smaller is the defining choice at this budget level.
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
              Budget: ₹60 lakh · Hosur 2026
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What ₹60 lakh builds by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              BUA figures assume the full budget goes to civil construction. Add ₹4–₹6 lakh for approvals, compound wall, and site preparation.
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
                    Imported stone, Kohler or Duravit, Lutron lighting. No standard rate. Contact for custom quote.
                  </p>
                  <Link
                    href="/plan?city=hosur&from=hosur-60lakh-ultra"
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
                Get a precise estimate for your ₹60 lakh build
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "500px" }}>
                Enter your plot dimensions, floor count, and quality preference. Get a detailed cost range drawn from verified Hosur rates, including MEP, finishes, and contingency.
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
                href="/plan?city=hosur&from=hosur-60lakh"
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
              Where ₹60 lakh takes you
            </h2>
          </AnimateIn>

          <div className="space-y-8 max-w-2xl">
            <AnimateIn direction="up" delay={0.05}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                At ₹60 lakh, you are at the entry point of premium-quality construction in Hosur. This is the budget where a genuine quality decision opens up. Standard quality gives you 2,500 to 2,857 sqft, enough for a 3 or 4 BHK G+1 on a 30x50 or 40x50 plot with full fittings. Premium quality, at rates of ₹2,500 to ₹2,900 per sqft, gives you 2,068 to 2,400 sqft with Jaquar sanitary, Somany Duragres floor tile, Legrand switches, and a properly designed exterior elevation. The trade is clear: about 400 sqft less space in exchange for a meaningfully better material and finish quality throughout.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                This budget is common among buyers who have already invested ₹40–₹50 lakh in a 40x60 or 30x50 plot and want a home they will live in for 20 years or more. At ₹60 lakh, the upgrade from standard to premium is a matter of reducing BUA by roughly 400 sqft but gaining materials that perform better over time: porcelain that does not fade, chrome fittings that do not corrode in two years, electrical switches that still look good after a decade. For a long-term home, the premium path is often the wiser financial decision. For a first home with young children and growing space needs, standard on a larger footprint makes equal sense.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                At basic quality, ₹60 lakh can build up to 3,243 sqft, large enough for a 4 BHK G+1 with a servant quarter on a 30x50 or 40x50 plot. This option is less commonly chosen at ₹60 lakh because the quality gap between basic and standard is visible in day-to-day use, and the additional space rarely justifies it. The most practical use of this budget remains standard quality on a 30x50 or 40x50 plot, with a proper 3–4 BHK configuration, two-car parking provision, and a small garden or sit-out area. That configuration, built well, holds its value and remains liveable for a generation.
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
              ₹60 lakh in Hosur: answered
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-60l-faq" />
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
                Get your ₹60 lakh estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline, built from Hosur BOQs.
              </p>
              <Link
                href="/plan?city=hosur&from=hosur-60lakh-footer"
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
