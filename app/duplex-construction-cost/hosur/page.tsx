import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/duplex-construction-cost/hosur`;

function fmtRate(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Duplex Construction Cost in Hosur | Estimato",
  description:
    "What it costs to build a duplex in Hosur. Real project BOQ rates, five quality tiers, an instant range. No guesswork.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Duplex Construction Cost in Hosur | Estimato",
    description:
      "What it costs to build a duplex in Hosur. Real project BOQ rates, five quality tiers, an instant range. No guesswork.",
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
      { "@type": "ListItem", position: 4, name: "Duplex Construction Cost Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Duplex Construction Cost in Hosur 2026",
    url: PAGE_URL,
    description:
      "BOQ-verified duplex construction rates for Hosur 2026. Covers standard through luxury tier with cost ranges and FAQ.",
    dateModified: "2026-06-03",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const RATE_BANDS = [
  {
    key: "basic",
    label: "Basic",
    badge: null,
    buaRange: "1,400–2,800 sqft",
    costMin: "₹25.9L",
    costMax: "₹57.4L",
    note: "Functional construction. Rarely chosen for duplexes — the second kitchen and separate entry are hard to do well at basic spec.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Most common",
    buaRange: "1,400–2,800 sqft",
    costMin: "₹29.4L",
    costMax: "₹67.2L",
    note: "Branded fittings, separate electrical panels, modular kitchens on both floors. The practical choice for rental-income duplexes.",
  },
  {
    key: "premium",
    label: "Premium",
    badge: null,
    buaRange: "1,400–2,800 sqft",
    costMin: "₹35L",
    costMax: "₹81.2L",
    note: "Better flooring, Jaquar fittings, sound insulation between floors, ACP or stone elevation.",
  },
  {
    key: "luxury",
    label: "Luxury",
    badge: null,
    buaRange: "1,400–2,800 sqft",
    costMin: "₹42L",
    costMax: "₹112L",
    note: "High-end finishes throughout both units. Italian marble, Kohler sanitary, fully furnished interiors.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does it cost to build a duplex in Hosur in 2026?",
    answer:
      "A standard-quality duplex in Hosur costs between ₹29.4 lakh and ₹67.2 lakh for a built-up area of 1,400 to 2,800 sqft, at a rate of ₹2,100 to ₹2,400 per sqft. Premium duplexes in the same range run ₹35 lakh to ₹81.2 lakh. These figures cover civil and structural work only — the second kitchen, separate entrances, and double electrical panels are included in a proper duplex BOQ but interior finishes are priced separately.",
  },
  {
    question: "What is a duplex and how is it different from a G+1 house?",
    answer:
      "A G+1 house is simply a two-floor home treated as one unit — one family, one kitchen, one entrance. A duplex is a G+1 where the ground and first floors are functionally independent: separate entrances from the street, separate kitchens, and usually separate electricity meters. The two units can house two branches of the same family or be set up for rental income from one floor. The structural frame may look the same on paper, but the internal layout and MEP costs differ significantly.",
  },
  {
    question: "Can I get rental income from a duplex in Hosur?",
    answer:
      "Yes. A standard duplex in Hosur's residential zones near Electronic City Road rents for ₹8,000 to ₹14,000 per floor in 2026. A ₹35 to ₹40 lakh investment in the rental unit can pay back in 12 to 16 years at current rents, assuming steady occupancy. The rental yield is better if the duplex is near the Hosur SIPCOT or Mathigiri industrial zones where worker housing demand is consistent.",
  },
  {
    question: "What plot size works for a duplex in Hosur?",
    answer:
      "Most Hosur duplex plots are 30x40 to 40x50 sqft. A 30x40 plot (1,200 sqft) can comfortably hold a duplex with two 2 BHK units of around 700 sqft each. Smaller plots (20x40, 30x30) can technically support a duplex but the unit sizes become tight and the separate entrance path needs to be planned very carefully in the original design. Going below 20x30 makes a proper duplex impractical.",
  },
  {
    question: "What are the extra construction costs in a duplex vs a standard G+1?",
    answer:
      "Four items add cost above a standard G+1. A second kitchen adds ₹2.5 to ₹5 lakh depending on quality. A separate staircase or second entrance lobby adds ₹1 to ₹2 lakh in structural and finishing cost. Sound insulation between floors is strongly recommended — it adds ₹80,000 to ₹1.5 lakh but makes both units genuinely independent. Double the metering and electrical panels adds another ₹40,000 to ₹80,000. Total duplex premium over a comparable G+1 is typically ₹4 to ₹9 lakh.",
  },
  {
    question: "Is a duplex a good investment in Hosur in 2026?",
    answer:
      "For homeowners who want to live on one floor and rent the other, a duplex in Hosur makes strong financial sense in 2026. Land costs remain lower than Bengaluru, construction quality has improved significantly, and rental demand near industrial and tech zones is steady. The key is planning the separate entrance from the original design — retrofitting a second staircase costs 2 to 3 times what it costs to build it in from the start. Get the layout right in the architectural drawing stage and the numbers work well.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/villa-construction-cost/hosur",
    eyebrow: "Home type comparison",
    title: "Villa construction cost in Hosur",
    desc: "Compare duplex costs with villa builds in Hosur.",
  },
  {
    href: "/construction-cost/hosur/30x50",
    eyebrow: "Plot size",
    title: "30×50 plot in Hosur",
    desc: "How a duplex fits on a 30×50 plot with cost breakdown.",
  },
  {
    href: "/construction-cost/hosur",
    eyebrow: "Rate data",
    title: "Hosur construction rates",
    desc: "Full rate table for Hosur across all quality tiers.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "Data sources behind Estimato's Hosur rate database.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DuplexHosurPage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Duplex</span>
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
              Duplex construction cost
              <br className="hidden md:block" /> in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              Cost ranges for duplex construction in Hosur — a G+1 with two independent units, separate entrances, and two kitchens. BOQ-verified rates for 1,400 to 2,800 sqft BUA.
              <span className="font-mono text-[13px] ml-2" style={{ color: "var(--text-tertiary)" }}>As of 2026.</span>
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
                A duplex in Hosur in 2026 costs <strong>₹29.4 lakh to ₹67.2 lakh</strong> at standard quality for a built-up area of 1,400 to 2,800 sqft. Premium duplexes in the same range run{" "}
                <strong>₹35 lakh to ₹81.2 lakh</strong>. The base construction rate is{" "}
                <strong>₹2,100–₹2,400 per sqft for standard</strong> quality, with a 1.00x city multiplier for Hosur. A duplex adds a second kitchen (₹2.5–₹5L), a separate entry path, and double electrical metering on top of a standard G+1 build.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE BANDS ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-bands-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur 2026 · Duplex · 1,400–2,800 sqft BUA
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Construction rates by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Cost ranges shown are for duplex BUA of 1,400 to 2,800 sqft at each quality tier. Civil and structural only — interiors, furniture, and landscaping are separate.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_BANDS.map(({ key, label, badge, buaRange, costMin, costMax, note }) => {
              const tier = TIER_RATES[key];
              return (
                <StaggerItem key={key}>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-4 md:gap-8 py-7 items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{label}</p>
                        {badge && (
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>
                        )}
                      </div>
                      <p className="font-mono tabular-nums" style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                        {fmtRate(tier.min)}
                        <span className="font-mono" style={{ fontSize: "15px", color: "var(--text-tertiary)", margin: "0 5px" }}>–</span>
                        {fmtRate(tier.max)}
                      </p>
                      <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>per sqft</p>
                    </div>
                    <div className="md:pt-1">
                      <p className="font-mono mb-1" style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}>{costMin} – {costMax}</p>
                      <p className="font-mono mb-2" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>for {buaRange}</p>
                      <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{note}</p>
                    </div>
                    <div className="flex items-center gap-3 md:justify-end">
                      <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.round((tier.mid / 5000) * 100)}%`, background: "var(--accent)" }} />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}

            {/* Ultra Luxury */}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-4 md:gap-8 py-7 items-start">
                <div>
                  <p className="font-serif mb-1" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>Ultra Luxury</p>
                  <p className="font-mono" style={{ fontSize: "16px", color: "var(--text-tertiary)" }}>₹5,000+ per sqft</p>
                </div>
                <div className="md:pt-1">
                  <p className="font-sans mb-3" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    Fully custom build with imported materials, smart home integration, and designer interiors throughout both units. No published rate — quoted from a full design brief.
                  </p>
                  <Link href="/plan?city=hosur&type=duplex&from=hosur-duplex-ultra" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
                    Speak to Design Intend
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4h9M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </div>
                <div className="flex items-center gap-3 md:justify-end">
                  <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full rounded-full" style={{ width: "100%", background: "var(--accent)" }} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-8 pt-6 border-t border-border" style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              "Rates built from real project BOQs and verified against current Hosur and Bangalore contractor quotes, 2026"
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR CTA ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <div className="rounded-sm p-7 md:p-10" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Free estimate tool</p>
              <h2 className="font-serif mb-3" style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Get a personalised duplex estimate
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "520px" }}>
                Tell us your plot, floor count, and quality level. You get a full cost range and the details below — no sign-up required.
              </p>
              <ul className="mb-8 space-y-2">
                {["Construction cost range", "Cost per sq ft", "BOQ summary", "Payment timeline", "Budget guidance"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)" }}>+</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/plan?city=hosur&type=duplex&from=hosur-duplex-page"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
              >
                Start duplex estimate →
              </Link>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CONTENT BODY ────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="content-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Duplex builds in Hosur</p>
            <h2 id="content-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What separates a duplex from a G+1 house
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                A duplex in Hosur is not just a two-floor home. It is a G+1 where each floor functions as a fully independent unit — its own entrance from the street, its own kitchen, its own electricity meter, and ideally its own staircase. This structure serves two distinct purposes in Hosur: it allows a joint family to live in proximity while maintaining separate households, or it lets the builder live on one floor and rent out the other for steady income. The critical difference from a standard G+1 is in the layout planning, not the structural frame.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The extra cost of a duplex over a comparable G+1 falls into four items. A second kitchen adds ₹2.5 to ₹5 lakh at standard quality. A separate entry path — whether a second staircase or a separate ground-floor lobby — adds ₹1 to ₹2 lakh in structural and finishing cost. Sound insulation between floors is not required but is strongly recommended for a functional duplex: a 100mm hollow block or mineral wool layer between the slab and the floor finish above adds ₹80,000 to ₹1.5 lakh but eliminates the most common complaint in duplex rentals. Double the electrical panels and metering adds another ₹40,000 to ₹80,000. The total duplex premium over a standard G+1 is ₹4 to ₹9 lakh.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The most common mistake in Hosur duplex builds is treating the separate entrance as an afterthought. Builders often start with a standard G+1 design and ask the contractor to add a second staircase during construction. Retrofitting a second staircase costs 2 to 3 times what it costs to plan it into the original architectural drawing. The rental income math for a Hosur duplex near the Electronic City Road or SIPCOT area works well in 2026 — ₹8,000 to ₹14,000 per floor per month means a ₹35 to ₹40 lakh construction investment in the rental unit pays back in 12 to 16 years, not counting land appreciation.
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
              Duplex construction in Hosur
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-duplex-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PARTNER CARD ────────────────────────────────────────────── */}
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

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── INTERNAL LINKS ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2 id="related-heading" className="font-serif mb-8" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Related pages
            </h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Start your duplex estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline built from Hosur BOQs.
              </p>
              <Link href="/plan?city=hosur&type=duplex&from=hosur-duplex-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
