import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/40-lakh-house-hosur`;

export const metadata: Metadata = {
  title: "What Can You Build for ₹40 Lakh in Hosur? | Estimato",
  description:
    "See what a ₹40 lakh budget builds in Hosur. Plot size, quality tier, and finish level, based on real contractor rates. Plan before you spend.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What Can You Build for ₹40 Lakh in Hosur? | Estimato",
    description:
      "See what a ₹40 lakh budget builds in Hosur. Plot size, quality tier, and finish level, based on real contractor rates. Plan before you spend.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BUDGET = 4000000; // ₹40 lakh in rupees

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
      { "@type": "ListItem", position: 3, name: "₹40 Lakh House Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "₹40 Lakh House in Hosur 2026 – What You Can Build",
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
    buaMin: 1950,
    buaMax: 2160,
    desc: "Functional structure. Local materials, basic tile, standard electrical fittings.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Recommended for ₹40L",
    rateMin: TIER_RATES.standard.min,
    rateMax: TIER_RATES.standard.max,
    buaMin: 1670,
    buaMax: 1904,
    desc: "Branded fittings, Kajaria-equivalent tile. The practical ceiling at this budget.",
  },
  {
    key: "premium",
    label: "Premium",
    rateMin: TIER_RATES.premium.min,
    rateMax: TIER_RATES.premium.max,
    buaMin: 1379,
    buaMax: 1600,
    desc: "Somany, Jaquar, Legrand. Achievable only on a small footprint at ₹40L.",
  },
  {
    key: "luxury",
    label: "Luxury",
    rateMin: TIER_RATES.luxury.min,
    rateMax: TIER_RATES.luxury.max,
    buaMin: 1000,
    buaMax: 1333,
    desc: "Italian marble, Kohler sanitary. Very limited BUA — not practical at ₹40L.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Can you really build a full house in Hosur for ₹40 lakh?",
    answer:
      "Yes, but the definition of 'full house' matters. At ₹40 lakh in Hosur in 2026, standard quality rates of ₹2,100–₹2,400 per sqft give you 1,670–1,904 sqft of built-up area. That is enough for a 3 BHK on a single floor or a modest G+1 for a nuclear family. What you cannot include at this budget: modular kitchen, branded bathroom fittings, or a finished elevation. Those come later or from a separate budget.",
  },
  {
    question: "What type of house fits a ₹40 lakh budget in Hosur?",
    answer:
      "The most practical configuration at ₹40 lakh in Hosur is a ground-floor 3 BHK of around 1,100–1,300 sqft at standard quality, or a G+1 with a smaller footprint — 600–700 sqft per floor. On a 30x40 plot you can build G+1 at basic quality, but you will be making compromises on finish level throughout. A G at standard quality on the same plot is a more honest spend of ₹40 lakh.",
  },
  {
    question: "What quality can you expect at ₹40 lakh construction cost?",
    answer:
      "At ₹40 lakh you are solidly in standard-quality territory. That means: good structural design, standard electrical wiring, mid-range tile from brands like Kajaria or equivalent, basic sanitary ware from local brands, and a plain plaster-paint exterior. You will not get modular interiors, grille or glass elevation features, granite countertops throughout, or Jaquar taps included in this number. Those add ₹5–₹8 lakh on top.",
  },
  {
    question: "Should I build G or G+1 on a ₹40 lakh budget in Hosur?",
    answer:
      "If your plot allows it and you need space now, build G at standard quality with provision for a future first floor. Adding a first floor later on a ready structure costs about ₹8–₹12 lakh at standard quality depending on size. Stretching the current ₹40 lakh to do G+1 immediately usually means cutting structural quality to afford the second floor — which is a poor trade. Build G well first.",
  },
  {
    question: "What are the hidden costs that eat into a ₹40 lakh budget?",
    answer:
      "Four items that homeowners regularly underestimate: approvals and HTM fees (roughly 4% of civil cost, so ₹1.4–₹1.6 lakh), bore well and plumbing connections (₹80,000–₹1.5 lakh depending on depth), compound wall (₹1.5–₹2.5 lakh for a 30x40 plot), and temporary site facilities during construction (₹30,000–₹60,000). Together these can add ₹4–₹6 lakh to your effective spend before you buy a single tile.",
  },
  {
    question: "Is ₹40 lakh enough for a 30x40 plot G+1 in 2026?",
    answer:
      "At basic quality, yes. At standard quality, you will need to reduce BUA or defer interiors. The numbers: a 30x40 plot allows roughly 800 sqft ground coverage at 65% FSI utilisation. A true G+1 would be around 1,500–1,600 sqft. At standard quality (₹2,100–₹2,400/sqft) that costs ₹31.5–₹38.4 lakh in civil work alone — before approvals, compound wall, or interiors. The ₹40L total budget is tight but workable if you phase interiors.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/hosur",
    eyebrow: "Hosur rates",
    title: "Hosur construction rates",
    desc: "All quality tiers and Hosur-specific rates explained.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "How Estimato builds its rate database from real Hosur BOQs.",
  },
  {
    href: "/50-lakh-house-hosur",
    eyebrow: "Next budget up",
    title: "₹50 lakh house in Hosur",
    desc: "What the next budget level unlocks in terms of quality and size.",
  },
  {
    href: "/plan",
    eyebrow: "Free tool",
    title: "Free estimate tool",
    desc: "Get a personalised cost range for your Hosur plot and home type.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FortyLakhHosurPage() {
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
                ₹40 Lakh
              </span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Hosur · Last updated: June 2026 · Entry-level budget
            </p>

            <h1
              className="font-serif mb-4"
              style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              ₹40 lakh house in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              What this budget realistically builds in Hosur in 2026 — by quality tier, with honest numbers.
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
                With <strong>₹40 lakh</strong> in Hosur in 2026 you can build roughly <strong>1,670 to 1,904 sq ft</strong> at standard quality. At basic quality the range stretches to <strong>2,160 sq ft</strong>. Premium finish limits you to <strong>1,379–1,600 sq ft</strong>. Hosur construction rates run <strong>₹1,850–₹2,050/sqft</strong> at basic and <strong>₹2,100–₹2,400/sqft</strong> at standard — making ₹40 lakh a workable entry-level budget for a standalone home on a 30x40 plot.
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
              Budget: ₹40 lakh · Hosur 2026
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              What ₹40 lakh builds by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              BUA figures assume the entire budget goes to civil construction. Allow a further ₹4–₹6 lakh for approvals, compound wall, and site costs.
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
                    Not applicable at ₹40 lakh. Contact for custom quote on bespoke builds.
                  </p>
                  <Link
                    href="/plan?city=hosur&from=hosur-40lakh-ultra"
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
                Get a precise estimate for your ₹40 lakh build
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "500px" }}>
                Tell us your plot size, floors, and configuration. You get a cost range, BOQ summary, and payment timeline — built from Hosur rates.
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
                href="/plan?city=hosur&from=hosur-40lakh"
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
              The entry-level budget in 2026
            </h2>
          </AnimateIn>

          <div className="space-y-8 max-w-2xl">
            <AnimateIn direction="up" delay={0.05}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                In Hosur in 2026, ₹40 lakh marks the entry point for a proper standalone home — not a compromise structure, but a real family house with durable construction. At standard quality on a 30x40 plot, you can build a G+1 with roughly 1,670 to 1,904 sqft of built-up area, which is comfortable for a nuclear family of four. The house will have good structural quality, decent flooring, and standard electrical work. What it will not have is modular interiors, branded bathroom fittings like Jaquar, or premium elevation treatment. Those belong to a higher budget.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The single biggest decision at ₹40 lakh is how to divide the money between structure and interiors. Most experienced Hosur contractors advise putting the full budget into civil and structural work and phasing interiors — kitchen, wardrobes, bathroom accessories — into a separate spend of ₹5–₹8 lakh after handover. Trying to fit both into ₹40 lakh means cutting quality on the structure, which is a decision that cannot be undone. Common compromises when people try to do everything at once: no covered parking, basic electrical points with no provision for future additions, local tile brand with no warranty, and bare plaster on the exterior with no paint.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                This budget was viable for a 30x40 G+1 standard build in 2023 and 2024. By 2026, material and labour costs have pushed things up — a true standard-quality G+1 on the same plot now costs ₹42–₹46 lakh in civil work. The ₹40 lakh figure still works if you build G at standard quality or G+1 at basic, and phase the upgrade later. Anyone who received a contractor quote of ₹40 lakh for a G+1 standard in 2024 should get a fresh quote before starting — the gap between old quotes and current site costs has been the single biggest cause of mid-build budget overruns in Hosur this year.
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
              ₹40 lakh in Hosur — answered
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-40l-faq" />
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
                Get your ₹40 lakh estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline — built from Hosur BOQs.
              </p>
              <Link
                href="/plan?city=hosur&from=hosur-40lakh-footer"
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
