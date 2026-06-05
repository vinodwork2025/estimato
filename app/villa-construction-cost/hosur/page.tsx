import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/villa-construction-cost/hosur`;

function fmtRate(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Villa Construction Cost in Hosur | Estimato",
  description:
    "What it costs to build a villa in Hosur. Real project BOQ rates, five quality tiers, an instant range. No guesswork.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Villa Construction Cost in Hosur | Estimato",
    description:
      "What it costs to build a villa in Hosur. Real project BOQ rates, five quality tiers, an instant range. No guesswork.",
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
      { "@type": "ListItem", position: 4, name: "Villa Construction Cost Hosur", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Villa Construction Cost in Hosur 2026",
    url: PAGE_URL,
    description:
      "BOQ-verified villa construction rates for Hosur 2026 across all quality tiers, with cost ranges, content, and FAQ.",
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
    buaRange: "1,800–3,500 sqft",
    costMin: "₹33.3L",
    costMax: "₹71.75L",
    note: "Functional. Standard local materials. Uncommon for villa builds.",
  },
  {
    key: "standard",
    label: "Standard",
    badge: "Common entry point",
    buaRange: "1,800–3,500 sqft",
    costMin: "₹37.8L",
    costMax: "₹84L",
    note: "Branded fittings, better flooring, defined elevation treatment.",
  },
  {
    key: "premium",
    label: "Premium",
    badge: "Most typical for villas",
    buaRange: "1,800–3,500 sqft",
    costMin: "₹45L",
    costMax: "₹101.5L",
    note: "Quality materials throughout. Somany, Jaquar, Legrand fittings.",
  },
  {
    key: "luxury",
    label: "Luxury",
    badge: null,
    buaRange: "1,800–3,500 sqft",
    costMin: "₹54L",
    costMax: "₹140L",
    note: "High-end finishes. Italian marble, Kohler sanitary, full elevation cladding.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the cost to build a villa in Hosur in 2026?",
    answer:
      "A standard-quality villa in Hosur costs between ₹37.8 lakh and ₹84 lakh for a built-up area of 1,800 to 3,500 sqft, based on a rate of ₹2,100 to ₹2,400 per sqft. Premium villas in the same BUA range run ₹45 lakh to ₹101.5 lakh. Most Hosur villas are built at premium or luxury tier — the basic rate is rarely appropriate for a villa build.",
  },
  {
    question: "What defines a villa vs an independent house in Hosur?",
    answer:
      "In Hosur, a villa is a standalone home on a plot of 1,800 sqft or more (typically 40x45 or larger), built with a defined compound wall, gate, driveway, and higher room heights of 10 to 11 feet. An independent house is a standalone home too, but typically on a smaller plot (30x40 or 20x30), with standard ceiling heights of 9.5 feet and a simpler elevation. A 30x40 plot with a standard G+1 is an independent house — not a villa.",
  },
  {
    question: "What plot size do I need for a villa in Hosur?",
    answer:
      "Genuine villas in Hosur start at 40x50 plots (2,000 sqft). The most common villa plots are 40x60 (2,400 sqft) and 50x80 (4,000 sqft). A 30x40 plot can technically have a standalone home, but the result is effectively an independent house in scale and finish. For a comfortable G+1 villa with a 2-car driveway and landscaped compound, a 40x60 plot is the practical minimum.",
  },
  {
    question: "What quality tier is typical for villas in Hosur?",
    answer:
      "Most villa builds in Hosur in 2026 are at premium or luxury tier. Building a villa at basic quality — at ₹1,850 to ₹2,050 per sqft — defeats the purpose of the form factor. The structural requirements (higher ceiling heights, compound wall, gate, wider driveway) already push costs above the basic threshold. Standard is the absolute floor for a villa that will hold its value.",
  },
  {
    question: "What are the extra costs in a villa build that a standard house does not have?",
    answer:
      "Four costs stand out. First, higher ceiling height (10 to 11 ft vs 9.5 ft standard) adds around 4% to structural cost. Second, exterior elevation treatments — cladding, ACP panels, feature walls — add ₹1.5 to ₹4 lakh. Third, the compound wall and gate add ₹3 to ₹8 lakh depending on perimeter length and design. Fourth, landscaping is a separate line item that most villa builders underestimate: a basic garden runs ₹2 to ₹6 lakh and is not included in civil contractor quotes.",
  },
  {
    question: "How long does it take to build a villa in Hosur?",
    answer:
      "A 2,000 to 2,800 sqft villa at premium quality takes 12 to 16 months from foundation to handover. Foundation and structure take 14 to 16 weeks for a villa given the larger footprint and higher ceiling heights. Brickwork and plastering add another 5 to 7 weeks. Finishing — where most of the quality investment shows — takes 14 to 18 weeks. Add 4 to 6 weeks for HTM approvals and material lead times for premium fittings.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/duplex-construction-cost/hosur",
    eyebrow: "Home type comparison",
    title: "Duplex construction cost in Hosur",
    desc: "Compare villa costs with duplex builds across all quality tiers.",
  },
  {
    href: "/construction-cost/hosur/40x60",
    eyebrow: "Plot size",
    title: "40×60 plot in Hosur",
    desc: "Cost breakdown for a 40×60 plot — a common villa plot size in Hosur.",
  },
  {
    href: "/construction-cost/hosur",
    eyebrow: "Rate data",
    title: "Hosur construction rates",
    desc: "Full rate table and cost data for Hosur across all quality tiers.",
  },
  {
    href: "/methodology",
    eyebrow: "How we calculate",
    title: "How we calculate",
    desc: "How Estimato builds its rate database from real Hosur BOQs.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VillaHosurPage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Villa</span>
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
              Villa construction cost
              <br className="hidden md:block" /> in Hosur
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              Cost ranges for villa construction in Hosur, built from real project BOQs.
              Covers all quality tiers from standard to luxury for typical BUA of 1,800 to 3,500 sqft.
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
                Building a villa in Hosur in 2026 costs <strong>₹37.8 lakh to ₹84 lakh</strong> at standard quality for a built-up area of 1,800 to 3,500 sqft. Premium villas in the same range run{" "}
                <strong>₹45 lakh to ₹101.5 lakh</strong>. Luxury tier goes from{" "}
                <strong>₹54 lakh to ₹140 lakh</strong>. The base construction rate in Hosur is{" "}
                <strong>₹2,100–₹2,400 per sqft for standard</strong> and ₹2,500–₹2,900 per sqft for premium, with a 1.00x city multiplier. Most Hosur villa projects land at premium or luxury tier.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE BANDS ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-bands-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Hosur 2026 · Villa · 1,800–3,500 sqft BUA
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Construction rates by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Cost ranges shown are for villa BUA of 1,800 to 3,500 sqft at each rate tier. Civil and structural only — interiors are separate.
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
                        <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                          {label}
                        </p>
                        {badge && (
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>
                            {badge}
                          </span>
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
                      <p className="font-mono mb-1" style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}>
                        {costMin} – {costMax}
                      </p>
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
                    Imported stone, designer lighting, fully automated systems. No published rate applies at this tier — each project is quoted from a full design brief.
                  </p>
                  <Link href="/plan?city=hosur&type=villa&from=hosur-villa-ultra" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
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
                Get a personalised villa estimate
              </h2>
              <p className="font-sans mb-6" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "520px" }}>
                Five questions about your plot, configuration, and quality level. You get a full cost range with the details below — no sign-up required.
              </p>
              <ul className="mb-8 space-y-2">
                {["Construction cost range", "Cost per sq ft", "BOQ summary", "Payment timeline", "Budget guidance"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)" }}>+</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/plan?city=hosur&type=villa&from=hosur-villa-page"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
              >
                Start villa estimate →
              </Link>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CONTENT BODY ────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="content-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Villa builds in Hosur</p>
            <h2 id="content-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What goes into a villa build in Hosur
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                In Hosur, a villa is a standalone home on a plot of 1,800 sqft or more — typically a 40x45 or larger footprint — with a defined compound wall and gate, a driveway wide enough for two cars, and room heights of 10 to 11 feet rather than the standard 9.5 feet. The elevated ceiling alone adds around 4% to structural cost. The compound wall and gate add another ₹3 to ₹8 lakh depending on the perimeter length and gate design. External elevation treatments — cladding, ACP panels, feature walls — add ₹1.5 to ₹4 lakh on top of the base rate. None of these line items show up in a basic contractor quote.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The typical villa buyer in Hosur in 2026 is an NRI or a senior engineer at one of the semiconductor or EV companies in the Hosur zone, buying a 40x60 or 50x80 plot on the Rayakottai or Doddaballapur side roads, building a 4 to 5 BHK for end-use or for future family occupation. Most of these projects run at premium tier. Building a villa at basic quality misses the point of the form — the structural demands of higher ceilings and a larger footprint already put the cost above basic, and the finish quality is what makes a villa hold its value on resale.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                One cost that most villa budgets miss entirely is landscaping. A basic garden — lawn, border planting, a few feature trees, and a simple pathway — runs ₹2 to ₹6 lakh and is not included in any civil contractor quote. The most common Hosur villa configuration is G+1, 4 BHK with a servant room, 2-car parking, and a BUA of 1,800 to 3,000 sqft at standard or premium quality. That puts the cost between ₹37.8 lakh at the low end and ₹87 lakh at the high end before landscaping and interiors.
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
              Villa construction in Hosur
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-villa-faq" />
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
                Start your villa estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, material quantities, and a payment timeline built from Hosur BOQs.
              </p>
              <Link href="/plan?city=hosur&type=villa&from=hosur-villa-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
