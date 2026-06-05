import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/independent-house-construction-cost/hosur`;

function fmtRate(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Independent House Construction Cost in Hosur | Estimato",
  description:
    "What it costs to build an independent house in Hosur. Real project BOQ rates, five quality tiers, an instant range. No guesswork.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Independent House Construction Cost in Hosur | Estimato",
    description:
      "What it costs to build an independent house in Hosur. Real project BOQ rates, five quality tiers, an instant range. No guesswork.",
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
      { "@type": "ListItem", position: 4, name: "Independent House Construction Cost Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Independent House Construction Cost in Hosur 2026",
    url: PAGE_URL,
    description:
      "BOQ-verified independent house construction rates for Hosur 2026 across all quality tiers, with cost ranges, content, and FAQ.",
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
    buaRange: "800–2,000 sqft",
    costMin: "₹14.8L",
    costMax: "₹41L",
    note: "Functional construction. Standard local materials. Used for budget first homes or rental properties where finish quality is not the priority.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Most common in Hosur",
    buaRange: "800–2,000 sqft",
    costMin: "₹16.8L",
    costMax: "₹48L",
    note: "Branded fittings, vitrified tiles, modular kitchen. The benchmark for most Hosur contractor quotes.",
  },
  {
    key: "premium",
    label: "Premium",
    badge: null,
    buaRange: "800–2,000 sqft",
    costMin: "₹20L",
    costMax: "₹58L",
    note: "Somany or equivalent tiles, Jaquar fittings, Legrand switches, better elevation treatment.",
  },
  {
    key: "luxury",
    label: "Luxury",
    badge: null,
    buaRange: "800–2,000 sqft",
    costMin: "₹24L",
    costMax: "₹80L",
    note: "High-end stone, Kohler sanitary, architect-curated interiors, feature elevation with cladding.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the cost to build an independent house in Hosur in 2026?",
    answer:
      "A standard-quality independent house in Hosur costs between ₹16.8 lakh and ₹48 lakh for a built-up area of 800 to 2,000 sqft, at a rate of ₹2,100 to ₹2,400 per sqft. The most common Hosur build — a G+1 on a 30x40 plot with 1,440 sqft BUA at standard quality — lands between ₹30 lakh and ₹35 lakh for civil and structural work before interiors.",
  },
  {
    question: "What is the standard configuration for an independent house in Hosur?",
    answer:
      "The benchmark independent house in Hosur is G+1, 3 BHK, standard quality, on a 30x40 plot with around 1,440 sqft of built-up area. This is the exact build that most Hosur contractor quotes use as a reference point. Ground floor typically has a living room, dining, kitchen, 1 bedroom, and a bathroom. First floor has 2 bedrooms, a common bathroom, and a utility area. This configuration works well for a family of four and leaves FSI headroom for a future extension.",
  },
  {
    question: "What is the FSI rule for residential plots in Hosur?",
    answer:
      "Under HTM (Hosur Town Municipality) rules, residential plots generally have an FSI of 2.0, meaning you can build up to twice the plot area as total built-up space across all floors. Ground floor coverage is typically 60 to 65% of the plot. A 30x40 plot (1,200 sqft) can have up to 2,400 sqft of total built-up area. Most standard independent houses use 1,200 to 1,500 sqft on a G+1, leaving significant FSI headroom for a future second floor or extension.",
  },
  {
    question: "How long does construction take for a typical Hosur independent house?",
    answer:
      "A standard G+1 independent house of 1,200 to 1,500 sqft in Hosur takes 9 to 11 months from foundation to handover. Foundation and structure take 10 to 12 weeks. Brickwork and plastering add 4 to 5 weeks. Finishing — flooring, painting, fixtures, and fit-out — takes 10 to 14 weeks. Add 2 to 4 weeks for HTM approval, material lead times, and any weather pauses during the northeast monsoon in October and November.",
  },
  {
    question: "What are the most common mistakes first-time builders make in Hosur?",
    answer:
      "Three mistakes come up repeatedly. First, leaving the elevation treatment for later — a decision that saves ₹80,000 to ₹1.5 lakh now but costs significantly more to add after the structure is complete, since scaffolding has to be re-erected. Second, not deciding on flooring before the structure starts — the slab finish affects flooring costs downstream. Third, skipping the modular kitchen at build time — retrofitting a modular kitchen after plastering requires breaking walls for plumbing and electrical, adding 30 to 40% to the cost vs planning it into the original drawing.",
  },
  {
    question: "How is an independent house different from a villa in Hosur?",
    answer:
      "An independent house is a standalone home on its own plot — the defining feature is that it does not share walls with neighbors, unlike a rowhouse. A villa is also a standalone home, but the term implies a larger scale (40x50 plot or more), higher ceiling heights of 10 to 11 feet, a defined compound with a gated driveway, and premium or luxury finish quality. In Hosur, an independent house is typically on a 600 to 1,500 sqft plot at standard quality. A villa starts at 1,800 sqft plot and almost always runs at premium or luxury tier.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/duplex-construction-cost/hosur",
    eyebrow: "Home type comparison",
    title: "Duplex construction cost in Hosur",
    desc: "How an independent house compares to a duplex build in Hosur.",
  },
  {
    href: "/construction-cost/hosur/30x40",
    eyebrow: "Plot size",
    title: "30×40 plot in Hosur",
    desc: "The most common independent house plot size and its cost range.",
  },
  {
    href: "/construction-cost/hosur",
    eyebrow: "Rate data",
    title: "Hosur construction rates",
    desc: "Full rate table and quality tier breakdown for Hosur.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "Rate methodology and what the numbers include.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndependentHouseHosurPage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Independent House</span>
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
              Independent house
              <br className="hidden md:block" /> construction cost in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              Cost ranges for independent house construction in Hosur — the most common build type in the city. BOQ-verified rates for 800 to 2,000 sqft BUA across all quality tiers.
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
                An independent house in Hosur in 2026 costs <strong>₹16.8 lakh to ₹48 lakh</strong> at standard quality for a built-up area of 800 to 2,000 sqft. The most common build — a G+1 on a 30x40 plot with 1,440 sqft BUA — lands between{" "}
                <strong>₹30 lakh and ₹35 lakh</strong> at standard quality. The base rate in Hosur is{" "}
                <strong>₹2,100–₹2,400 per sqft for standard</strong>, with a 1.00x city multiplier. Premium builds run ₹2,500–₹2,900 per sqft, adding up to{" "}
                <strong>₹20 lakh to ₹58 lakh</strong> for the same BUA range.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE BANDS ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-bands-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur 2026 · Independent House · 800–2,000 sqft BUA
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Construction rates by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Cost ranges shown are for independent house BUA of 800 to 2,000 sqft at each quality tier. Civil and structural work only — interiors are separate.
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
                    Fully custom build. Imported stone, Lutron lighting, home automation, and fully furnished interiors. No published rate — priced from a full design brief.
                  </p>
                  <Link href="/plan?city=hosur&type=contemporary&from=hosur-indhouse-ultra" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
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
                Get a personalised estimate for your Hosur home
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "520px" }}>
                Tell us your plot size, number of floors, and quality level. You get a full cost range with the details below — no sign-up needed.
              </p>
              <ul className="mb-8 space-y-2">
                {["Construction cost range", "Cost per sq ft", "BOQ summary", "Payment timeline", "Budget guidance"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)" }}>+</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/plan?city=hosur&type=contemporary&from=hosur-indhouse-page"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
              >
                Start my estimate →
              </Link>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CONTENT BODY ────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="content-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Independent house builds in Hosur</p>
            <h2 id="content-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              The most common build in Hosur
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                An independent house is the default residential build in Hosur — a standalone home on its own plot with its own compound and no shared walls with neighbors. This is what distinguishes it from a rowhouse (shared side walls) and from a villa (larger plot, premium finish, higher ceilings). Hosur's established residential areas — around SIPCOT, Mathigiri, and the older layouts near the bus stand — are almost entirely made up of independent houses on 600 to 2,000 sqft plots. The road infrastructure, water connections, and contractor ecosystems in these areas are all built around this form factor.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The reference build for Hosur contractor quotes is a G+1, 3 BHK, standard quality, on a 30x40 plot with 1,440 sqft of built-up area. At ₹2,100 to ₹2,400 per sqft, that comes to ₹30.2 lakh to ₹34.6 lakh for civil work before interiors. Three decisions at this stage define how the budget moves: whether to invest in a quality elevation now or leave it for later, whether to do a full modular kitchen now or add it after, and whether to complete all flooring in the first construction phase or leave the upper floor in basic cement. Each of these deferred decisions costs more to fix later than to plan correctly from the start.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Under HTM rules, a 30x40 plot has an FSI of 2.0, meaning you can build up to 2,400 sqft in total across all floors. Most standard independent houses use 1,200 to 1,500 sqft on a G+1 — 60% ground coverage, as permitted — which leaves significant headroom for a future third floor or an upper-floor extension as the family grows. This is one reason why the independent house remains the dominant form in Hosur: it is financeable in phases, extendable as income grows, and well-matched to the plot sizes available in the city's established layouts.
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
              Independent house construction in Hosur
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-indhouse-faq" />
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
                Start your Hosur estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline built from Hosur BOQs.
              </p>
              <Link href="/plan?city=hosur&type=contemporary&from=hosur-indhouse-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
