export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";
import { BANGALORE_RATES } from "@/lib/data/bangalore-plot-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/duplex`;

export const metadata: Metadata = {
  title: "Duplex Construction Cost in Bangalore | Estimato",
  description:
    "What it costs to build a duplex in Bangalore in 2026. BOQ-verified rates by quality tier, rental income context, zone breakdown. Updated June 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Duplex Construction Cost in Bangalore | Estimato",
    description:
      "What it costs to build a duplex in Bangalore in 2026. BOQ-verified rates, five quality tiers, rental income context.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: `${SITE_URL}/construction-cost/bangalore` },
      { "@type": "ListItem", position: 4, name: "Duplex", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Duplex Construction Cost in Bangalore 2026",
    url: PAGE_URL,
    dateModified: "2026-06-12",
    inLanguage: "en-IN",
  },
];

function fmtL(r: number): string { return `₹${(r / 100000).toFixed(1)}L`; }

const RATE_BANDS = [
  {
    key: "basic" as const,
    label: "Basic",
    badge: null,
    buaRange: "1,400–2,800 sqft",
    costMin: fmtL(1400 * BANGALORE_RATES.basic.min),
    costMax: fmtL(2800 * BANGALORE_RATES.basic.max),
    note: "Functional duplex at bare minimum spec. Rarely the right choice when separate rental income is the goal. Basic kitchens and bathrooms reduce rental appeal.",
  },
  {
    key: "standard" as const,
    label: "Standard",
    badge: "Most common",
    buaRange: "1,400–2,800 sqft",
    costMin: fmtL(1400 * BANGALORE_RATES.standard.min),
    costMax: fmtL(2800 * BANGALORE_RATES.standard.max),
    note: "Branded fittings, separate electrical panels, two independent kitchens. The practical choice for rental-income duplexes near Bengaluru's IT corridors.",
  },
  {
    key: "premium" as const,
    label: "Premium",
    badge: null,
    buaRange: "1,400–2,800 sqft",
    costMin: fmtL(1400 * BANGALORE_RATES.premium.min),
    costMax: fmtL(2800 * BANGALORE_RATES.premium.max),
    note: "Better flooring, Jaquar fittings, sound insulation between floors, stone or ACP elevation. Commands higher rental, ₹18,000 to ₹35,000 per floor in good locations.",
  },
  {
    key: "luxury" as const,
    label: "Luxury",
    badge: null,
    buaRange: "1,400–2,800 sqft",
    costMin: fmtL(1400 * BANGALORE_RATES.luxury.min),
    costMax: fmtL(2800 * BANGALORE_RATES.luxury.max),
    note: "High-end finishes throughout both units. Italian marble, Kohler sanitary, smart home integration.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does it cost to build a duplex in Bangalore in 2026?",
    answer:
      `A standard-quality duplex in Bangalore costs between ₹${(1400 * BANGALORE_RATES.standard.min / 100000).toFixed(1)} lakh and ₹${(2800 * BANGALORE_RATES.standard.max / 100000).toFixed(1)} lakh for a built-up area of 1,400 to 2,800 sqft, at a rate of ₹${BANGALORE_RATES.standard.min.toLocaleString("en-IN")} to ₹${BANGALORE_RATES.standard.max.toLocaleString("en-IN")} per sqft. Premium quality in the same area runs ₹${(1400 * BANGALORE_RATES.premium.min / 100000).toFixed(1)} to ₹${(2800 * BANGALORE_RATES.premium.max / 100000).toFixed(1)} lakh. These figures cover civil and structural work, the second kitchen, and separate electrical panels. Interiors, modular kitchens, and wardrobes are priced separately.`,
  },
  {
    question: "What is the rental income from a duplex in Bangalore in 2026?",
    answer:
      "A well-designed duplex unit in Bangalore in a good IT-corridor location rents for ₹18,000 to ₹35,000 per floor per month at standard quality in 2026. A premium duplex unit near Koramangala, HSR Layout, or Sarjapur Road rents for ₹28,000 to ₹50,000 per floor. At a ₹50 to ₹70 lakh construction cost for the rental unit, payback is 12 to 18 years on civil cost alone, not counting land appreciation. The rental yield on Bangalore duplexes is much better than on apartment investments in the city because you own the land.",
  },
  {
    question: "How is a duplex different from a G+1 house in Bangalore?",
    answer:
      "A G+1 house in Bangalore is a two-floor home treated as one unit, with one family, one kitchen, one entrance, and one electricity meter. A duplex is a G+1 where the ground and first floors are functionally independent: separate entrances from the street, separate kitchens, and separate electricity meters. BBMP's approval process is the same for both; the difference is in internal layout and MEP design. A duplex adds a second kitchen (₹2.5–₹5 lakh at standard), a separate entrance lobby or staircase (₹1–₹2 lakh), and double metering (₹40,000–₹80,000). Total duplex premium over a comparable G+1 is ₹4 to ₹9 lakh.",
  },
  {
    question: "Which areas of Bangalore are best for a duplex rental investment?",
    answer:
      "For rental yield, the best Bangalore zones for duplex investment in 2026 are: Sarjapur Road (strong tech company demand, steady rental), HSR Layout (young professional demand, good transport), Electronic City (affordable land, high rental demand from IT park workers), and Marathahalli (proximity to major IT companies, good connectivity). Central areas (Koramangala, Indiranagar) have higher rents but much higher land costs, so the yield is lower. North Bangalore near Manyata Tech Park and Yelahanka is emerging as a high-yield zone for duplex rentals.",
  },
  {
    question: "What plot size is suitable for a duplex in Bangalore?",
    answer:
      "The minimum practical plot size for a Bangalore duplex is 20×40 feet (800 sqft), though 30×40 (1,200 sqft) is the comfortable standard. A 30×40 site gives a floor footprint of about 600 to 720 sqft after BBMP setbacks, enough for a 2 BHK per floor. Larger plots (30×50, 40×50) allow 3 BHK per floor and a dedicated parking bay per unit. Going below 20×30 for a duplex is possible but the units become very small and separate entrance paths are difficult to design without compromising room sizes.",
  },
  {
    question: "Does BBMP require separate approval for a duplex vs a G+1?",
    answer:
      "No. BBMP's plan approval process does not distinguish between a G+1 and a duplex. The approval is based on the structural and architectural drawings: plot size, setbacks, FAR, and floor count. The internal layout (one unit or two) does not trigger a different approval category. However, if you later want two separate electricity meters (which makes the duplex functionally independent), BESCOM requires proof of separate entrances and a licensed electrician's certificate for each unit. Factor BESCOM's dual connection cost (₹20,000 to ₹60,000 per connection) into your duplex budget.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/bangalore",
    eyebrow: "Hub",
    title: "Bangalore construction rates",
    desc: "Full rate table for Bangalore across all quality tiers.",
  },
  {
    href: "/construction-cost/bangalore/g-plus-1",
    eyebrow: "Related type",
    title: "G+1 house construction cost in Bangalore",
    desc: "The single-unit equivalent. Lower cost, simpler layout.",
  },
  {
    href: "/construction-cost/bangalore/30x40",
    eyebrow: "Plot size",
    title: "30×40 plot cost in Bangalore",
    desc: "The most common duplex site. Cost breakdown with BUA math.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Rate source",
    title: "Bangalore Cost Index 2026",
    desc: "Where these rates come from. Sourced, dated, BOQ-verified.",
  },
];

export default function BangaloreDuplexPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&type=duplex&from=blr-duplex" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Duplex</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · Duplex construction · BOQ-verified rates 2026
            </p>

            <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              Duplex construction cost
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              A duplex in Bangalore is a G+1 with two fully independent units, with separate entrances from the street,
              two kitchens, and two electricity meters. It is the city's most common rental-income construction
              strategy. Cost ranges below are BOQ-verified for 1,400 to 2,800 sqft total BUA across Bangalore zones.
            </p>

            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Quick answer</p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                A standard-quality duplex in Bangalore costs{" "}
                <strong>₹{(1400 * BANGALORE_RATES.standard.min / 100000).toFixed(1)} to ₹{(2800 * BANGALORE_RATES.standard.max / 100000).toFixed(1)} lakh</strong>{" "}
                for 1,400 to 2,800 sqft BUA. A premium duplex in the same area runs{" "}
                <strong>₹{(1400 * BANGALORE_RATES.premium.min / 100000).toFixed(1)} to ₹{(2800 * BANGALORE_RATES.premium.max / 100000).toFixed(1)} lakh</strong>.
                The duplex premium over a standard G+1, including second kitchen, separate entrance, sound insulation,
                and dual metering, is typically ₹5 to ₹10 lakh. Location clearly affects cost:
                north Bangalore is at the low end; central and IT-corridor areas at the high.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE BANDS ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-bands-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Bangalore 2026 · Duplex · 1,400–2,800 sqft BUA
            </p>
            <h2 id="rate-bands-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Construction rates by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Cost ranges for duplex BUA of 1,400 to 2,800 sqft. Civil and structural only. Modular kitchens, wardrobes, and interiors are separate.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_BANDS.map(({ key, label, badge, buaRange, costMin, costMax, note }) => (
              <StaggerItem key={key}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-4 md:gap-8 py-7 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{label}</p>
                      {badge && <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>}
                    </div>
                    <p className="font-mono tabular-nums" style={{ fontSize: "16px", color: "var(--text-primary)" }}>
                      ₹{BANGALORE_RATES[key].min.toLocaleString("en-IN")}–₹{BANGALORE_RATES[key].max.toLocaleString("en-IN")}
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
                      <div className="h-full rounded-full" style={{ width: `${Math.round((BANGALORE_RATES[key].mid / 5000) * 100)}%`, background: "var(--accent)" }} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-4 md:gap-8 py-7 items-start">
                <div>
                  <p className="font-serif mb-1" style={{ fontSize: "22px", fontWeight: 400, color: "var(--text-primary)" }}>Ultra Luxury</p>
                  <p className="font-mono" style={{ fontSize: "16px", color: "var(--text-tertiary)" }}>₹5,000+ per sqft</p>
                </div>
                <div className="md:pt-1">
                  <p className="font-sans mb-3" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    Fully custom duplex with imported materials, smart home integration in both units. No published rate. Quoted from a full design brief.
                  </p>
                  <Link href="/plan?city=bangalore&type=duplex&from=blr-duplex-ultra" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
                    Speak to Design Intend <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4h9M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
              Rates from{" "}
              <Link href="/construction-cost/bangalore/cost-index" className="underline" style={{ color: "var(--accent)" }}>Bangalore Construction Cost Index 2026</Link>.
              Verified against current BOQs and contractor quotes.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Duplex builds in Bangalore</p>
            <h2 className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What separates a Bangalore duplex from a G+1
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                A Bangalore duplex is not simply a two-floor home. It is a G+1 where each floor functions as a
                fully independent residential unit. Each floor has its own entrance from the street, its own kitchen,
                its own electricity meter (through BESCOM), and ideally its own staircase. This structure exists
                primarily for two purposes in Bangalore: multi-generational families that want proximity with privacy,
                and owners who want to live on one floor and generate rental income from the other. In the IT-corridor
                zones of east Bangalore (Sarjapur, Marathahalli, Electronic City), duplex rental income is one of the
                most consistent cash flows available to a residential property owner.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The cost premium of a duplex over a comparable G+1 in Bangalore breaks down into four items. A second
                kitchen adds ₹2.5 to ₹5 lakh at standard quality, which is higher than a comparable Hosur duplex because
                Bangalore kitchen vendors price for the city market. A separate entrance or staircase adds ₹1 to ₹2
                lakh in structural and finishing cost. Sound insulation between the slab and the floor finish above
                (100mm hollow block layer or mineral wool) adds ₹80,000 to ₹1.5 lakh but eliminates the primary
                complaint in duplex rentals. Dual BESCOM metering and separate electrical panels add ₹60,000 to
                ₹1.2 lakh. Total duplex premium over a standard G+1: ₹5 to ₹10 lakh, more in premium zones.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The most avoidable mistake in a Bangalore duplex build is planning the second entrance as an
                afterthought. Most Bangalore architects see clients who started with a standard G+1 design and
                asked the contractor to add a second staircase mid-construction. Retrofitting costs 2 to 3 times
                what designing it in from the start costs. The rental income math on a well-planned Bangalore
                duplex near the IT corridor is compelling in 2026: a standard-quality first-floor unit of 700
                to 900 sqft rents for ₹18,000 to ₹28,000 per month. At a ₹30 to ₹45 lakh construction cost
                for that floor, payback is 10 to 14 years, before factoring land value appreciation.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Duplex construction in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-duplex-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PARTNER ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Bangalore & Hosur partner</p>
            <h2 id="partner-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Verified architect on the ground</h2>
            <div className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start" style={{ border: "1px solid var(--border)" }}>
              <div>
                <p className="font-serif mb-1" style={{ fontSize: "24px", fontWeight: 400, color: "var(--text-primary)" }}>{partner.name}</p>
                <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)" }}>{partner.tagline}</p>
                <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Led by {partner.founderName}. {partner.founderBio} Active territory: Bengaluru, Hosur, Sarjapura, Attibele, and Bagalur.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
                  <a href={`mailto:${partner.email}`} className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Email</a>
                  {partner.websiteUrl && <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Website ↗</a>}
                </div>
              </div>
              <div className="rounded-sm p-5" style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>Services</p>
                {["Architecture & design", "BBMP approval support", "Structural drawings", "Turnkey construction", "Interior fit-out", "Project management"].map((s) => (
                  <p key={s} className="font-mono py-2 border-b last:border-b-0" style={{ fontSize: "14px", color: "var(--text-secondary)", borderColor: "rgba(196,154,60,0.12)" }}>{s}</p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── INTERNAL LINKS ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2 id="related-heading" className="font-serif mb-8" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Related pages</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERNAL_LINKS.map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link href={href} className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy" style={{ border: "1px solid var(--border)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>{eyebrow}</p>
                  <p className="font-serif mb-2 group-hover:text-navy transition-colors" style={{ fontSize: "20px", fontWeight: 400, color: "var(--text-primary)" }}>{title}</p>
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
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Start your Bangalore duplex estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. Cost range, BOQ summary, and payment timeline built from Bangalore BOQs.
              </p>
              <Link href="/plan?city=bangalore&type=duplex&from=blr-duplex-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
