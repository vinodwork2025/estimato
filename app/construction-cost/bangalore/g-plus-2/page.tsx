export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";
import { BANGALORE_RATES } from "@/lib/data/bangalore-plot-pages";
import { BangalorePlannerCTA } from "../BangalorePlannerCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/g-plus-2`;

export const metadata: Metadata = {
  title: "G+2 House Construction Cost in Bangalore | Estimato",
  description:
    "G+2 house construction cost in Bangalore 2026. Three-floor build costs by plot size and quality tier. BBMP structural sanction, BOQ-verified rates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "G+2 House Construction Cost in Bangalore | Estimato",
    description: "G+2 house construction cost in Bangalore 2026. Three-floor build costs, BBMP requirements, BOQ-verified.",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: `${SITE_URL}/construction-cost/bangalore` },
      { "@type": "ListItem", position: 4, name: "G+2 House", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "G+2 House Construction Cost in Bangalore 2026",
    url: PAGE_URL,
    dateModified: "2026-06-12",
    inLanguage: "en-IN",
  },
];

function fmtL(r: number): string {
  const l = r / 100000;
  return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
}

const G2_SCENARIOS = [
  {
    plot: "30×40 (1,200 sqft)",
    bua: Math.round(30 * 40 * 0.6 * 3),
    label: "G+2 · 3 BHK per floor",
  },
  {
    plot: "30×50 (1,500 sqft)",
    bua: Math.round(30 * 50 * 0.6 * 3),
    label: "G+2 · 3–4 BHK per floor",
  },
  {
    plot: "40×60 (2,400 sqft)",
    bua: Math.round(40 * 60 * 0.6 * 3),
    label: "G+2 · 4–5 BHK per floor · Villa scale",
    badge: "Large build",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does a G+2 house cost to build in Bangalore?",
    answer:
      `A G+2 (three-floor) house on a 30×40 plot in Bangalore at standard quality costs ₹${fmtL(Math.round(30 * 40 * 0.6 * 3) * BANGALORE_RATES.standard.min)} to ₹${fmtL(Math.round(30 * 40 * 0.6 * 3) * BANGALORE_RATES.standard.max)} in civil work, for approximately ${Math.round(30 * 40 * 0.6 * 3).toLocaleString("en-IN")} sqft of built-up area. At premium quality, the range is ₹${fmtL(Math.round(30 * 40 * 0.6 * 3) * BANGALORE_RATES.premium.min)} to ₹${fmtL(Math.round(30 * 40 * 0.6 * 3) * BANGALORE_RATES.premium.max)}. The move-in budget including BBMP structural sanction (separate from plan approval), BESCOM, borewell, compound wall, and basic interiors adds ₹15 to ₹25 lakh to the civil cost.`,
  },
  {
    question: "Does BBMP require a separate approval for G+2 in Bangalore?",
    answer:
      "Yes. A G+2 structure requires a structural sanction in addition to the standard plan approval. The structural drawings must be prepared by a licensed structural engineer, and the design must account for three-floor loading, seismic zone requirements (Bangalore is in Seismic Zone II), and BBMP's setback rules for tall residential structures. The structural sanction adds 4 to 12 weeks to the approval timeline and costs ₹30,000 to ₹80,000 in additional engineering and liaison fees over a standard G+1 approval. Build this time and cost into your project schedule from the start.",
  },
  {
    question: "Can I convert a G+1 to G+2 later in Bangalore?",
    answer:
      "Only if the original G+1 was designed for it. A G+1 house with columns sized for two floors cannot be extended to three floors without expensive structural retrofitting. In most cases, BBMP will not approve the addition without a new structural assessment and often a proof that the existing foundation can handle the third-floor load. The cheapest way to build G+2 is to design the three-floor structure from day one: larger column sizes, stronger foundations, and a BBMP structural sanction at the outset. The incremental cost of future-proofing a G+1 for a potential G+2 addition is ₹2 to ₹5 lakh in extra reinforcement. This is far cheaper than retrofitting later.",
  },
  {
    question: "What is the maximum FAR for a G+2 in Bangalore?",
    answer:
      "Under BBMP's Revised Master Plan 2031, the FAR for residential plots up to 4,000 sqft is 1.75, and for plots above 4,000 sqft the FAR varies by zone (up to 3.25 in some commercial zones). For a standard 30×40 (1,200 sqft) residential plot, the maximum permitted built-up area across all floors is 2,100 sqft (1,200 × 1.75). A G+2 with three floors of 600 sqft footprint each uses 1,800 sqft, which is within the FAR limit. However, larger floor footprints per floor can push total BUA above the FAR limit and require BBMP variance or a smaller G+2 plan.",
  },
  {
    question: "Is a G+2 suitable for rental income in Bangalore?",
    answer:
      "Yes. A G+2 in a good Bangalore location (near IT parks, metro stations, hospitals, or universities) is one of the highest-yield residential investment formats. Owner occupies one floor, two floors generate rental income. At current Bangalore rents (2026), a standard floor of 700 to 900 sqft rents for ₹18,000 to ₹30,000 per month in Sarjapur Road, Electronic City, and Marathahalli. Two rental floors generate ₹36,000 to ₹60,000 per month. At a civil cost of ₹55 to ₹70 lakh for the two rental floors (on a 30×40), payback on construction alone is 8 to 12 years, before land appreciation.",
  },
  {
    question: "How does G+2 construction cost compare to G+1 in Bangalore?",
    answer:
      `A G+1 on a 30×40 in Bangalore at standard quality costs ₹${fmtL(1440 * BANGALORE_RATES.standard.min)} to ₹${fmtL(1440 * BANGALORE_RATES.standard.max)} for 1,440 sqft BUA. A G+2 on the same plot adds a third slab, third-floor walls, staircase extension, and extra plumbing and electrical runs. The incremental cost per additional sqft is broadly the same per-sqft rate, but the G+2 also adds the structural sanction cost (₹30,000 to ₹80,000) and stronger foundations (₹2 to ₹5 lakh extra). Total G+2 on a 30×40 at standard quality: approximately ₹${fmtL(2160 * BANGALORE_RATES.standard.min)} to ₹${fmtL(2160 * BANGALORE_RATES.standard.max)}.`,
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/bangalore",
    eyebrow: "Hub",
    title: "Bangalore construction rates",
    desc: "Full rate table and all Bangalore cost pages.",
  },
  {
    href: "/construction-cost/bangalore/g-plus-1",
    eyebrow: "Step down",
    title: "G+1 house cost in Bangalore",
    desc: "Two-floor build. Lower cost, standard BBMP approval.",
  },
  {
    href: "/construction-cost/bangalore/1-crore-house",
    eyebrow: "Budget guide",
    title: "What ₹1 crore builds in Bangalore",
    desc: "A G+2 on a medium plot lands in this budget range.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Data source",
    title: "Bangalore Cost Index 2026",
    desc: "Source of all rates. BOQ-verified and dated.",
  },
];

export default function BangaloreGPlus2Page() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&from=blr-g-plus-2" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>G+2</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · G+2 construction cost · BOQ-verified 2026
            </p>

            <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              G+2 house construction cost
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              A G+2 is a three-floor residential structure (ground plus two floors), the choice for families who need
              maximum built-up area from a single plot, or who want two rental floors with owner occupancy on one.
              G+2 requires a separate BBMP structural sanction beyond standard plan approval. Costs and requirements
              for Bangalore below, verified from current BOQs.
            </p>

            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Quick answer: 30×40 G+2, standard quality</p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                A G+2 on a 30×40 plot in Bangalore at standard quality costs{" "}
                <strong>{fmtL(2160 * BANGALORE_RATES.standard.min)} to {fmtL(2160 * BANGALORE_RATES.standard.max)}</strong>{" "}
                in civil work for {(2160).toLocaleString("en-IN")} sqft BUA.
                Requires BBMP structural sanction (₹30,000–₹80,000 extra) and stronger foundations vs G+1.
                Full move-in budget: approximately{" "}
                <strong>₹55 to ₹85 lakh</strong>.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SCENARIOS ────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="scenarios-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>G+2 cost by plot size · Standard quality</p>
            <h2 id="scenarios-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              G+2 construction cost by plot
            </h2>
          </AnimateIn>
          <StaggerContainer className="divide-y divide-border border-t border-border">
            {G2_SCENARIOS.map(({ plot, bua, label, badge }) => (
              <StaggerItem key={plot}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 md:gap-8 py-6 items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-mono" style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)" }}>{plot}</p>
                      {badge && <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>}
                    </div>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{bua.toLocaleString("en-IN")} sqft BUA · {label}</p>
                  </div>
                  <div>
                    <p className="font-mono tabular-nums" style={{ fontSize: "22px", fontWeight: 500, color: "var(--text-primary)" }}>
                      {fmtL(bua * BANGALORE_RATES.standard.min)} – {fmtL(bua * BANGALORE_RATES.standard.max)}
                    </p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>civil · standard quality · ₹{BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹{BANGALORE_RATES.standard.max.toLocaleString("en-IN")}/sqft</p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                      Premium: {fmtL(bua * BANGALORE_RATES.premium.min)} – {fmtL(bua * BANGALORE_RATES.premium.max)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>G+2 considerations in Bangalore</p>
            <h2 className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What changes when you go to G+2 in Bangalore
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                A G+2 in Bangalore is not simply a G+1 with one more floor. Three things change a great deal.
                First, the structural design: columns in a G+2 must carry three-floor loads and meet Seismic Zone
                II requirements for Bangalore. This means larger column sizes (typically 12×12 inches vs 9×12 in a
                G+1), more steel reinforcement per column, and deeper or larger footings. If you are designing for
                G+2 from scratch, these upgrades add approximately ₹2 to ₹5 lakh to foundation and structural cost
                over a comparable G+1 design.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Second, BBMP approval: a G+2 requires a separate structural sanction beyond the standard plan
                approval. The structural drawings must be prepared and certified by a licensed structural engineer,
                submitted to BBMP, and cleared before construction starts. Timeline adds 4 to 12 weeks. Cost adds
                ₹30,000 to ₹80,000 in engineering and liaison fees. This is not avoidable. BBMP inspects at
                plinth level and will issue a stop-work order on a G+2 built on G+1 approval.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Third, MEP (mechanical, electrical, plumbing) complexity: a third floor adds a longer water supply
                riser (pump selection changes), a third electrical panel floor, and more plumbing drainage stack.
                None of these are expensive individually, but together they add ₹1.5 to ₹3 lakh over a G+1's MEP
                cost. The incremental MEP cost per sqft for the third floor is broadly the same as the lower floors,
                so the per-sqft rate remains stable, but the absolute spend is higher. At standard quality on a
                30×40, the G+2's extra third-floor civil cost over the G+1 is approximately ₹14.4 to ₹20.2 lakh.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR WIDGET ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <BangalorePlannerCTA sourcePage="blr-g-plus-2" />
          </AnimateIn>
        </section>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              G+2 construction in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-g-plus-2-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Bangalore & Hosur partner</p>
            <h2 id="partner-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Verified architect on the ground</h2>
            <div className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8" style={{ border: "1px solid var(--border)" }}>
              <div>
                <p className="font-serif mb-1" style={{ fontSize: "24px", fontWeight: 400, color: "var(--text-primary)" }}>{partner.name}</p>
                <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)" }}>{partner.tagline}</p>
                <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Led by {partner.founderName}. {partner.founderBio} Active territory: Bengaluru, Hosur, Sarjapura, Attibele, and Bagalur.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
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

        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Get your Bangalore G+2 estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. Cost range, material list, and payment timeline built from Bangalore BOQs.
              </p>
              <Link href="/plan?city=bangalore&from=blr-g-plus-2-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
