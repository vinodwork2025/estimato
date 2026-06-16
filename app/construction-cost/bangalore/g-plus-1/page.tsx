export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";
import { BANGALORE_RATES } from "@/lib/data/bangalore-plot-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/g-plus-1`;

export const metadata: Metadata = {
  title: "G+1 House Construction Cost in Bangalore | Estimato",
  description:
    "G+1 house construction cost in Bangalore 2026. BOQ-verified rates by quality tier, BBMP approval context, and cost by plot size. Updated June 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "G+1 House Construction Cost in Bangalore | Estimato",
    description:
      "G+1 house construction cost in Bangalore 2026. BOQ-verified rates by quality tier and plot size.",
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
      { "@type": "ListItem", position: 4, name: "G+1 House", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "G+1 House Construction Cost in Bangalore 2026",
    url: PAGE_URL,
    dateModified: "2026-06-12",
    inLanguage: "en-IN",
  },
];

const PLOT_SCENARIOS = [
  {
    plot: "20×30 (600 sqft)",
    bua: 720,
    stdMin: 720 * BANGALORE_RATES.standard.min,
    stdMax: 720 * BANGALORE_RATES.standard.max,
    config: "G+1 · 2 BHK per floor",
  },
  {
    plot: "30×40 (1,200 sqft)",
    bua: 1440,
    stdMin: 1440 * BANGALORE_RATES.standard.min,
    stdMax: 1440 * BANGALORE_RATES.standard.max,
    config: "G+1 · 3 BHK per floor · Most common",
    badge: "Most common",
  },
  {
    plot: "30×50 (1,500 sqft)",
    bua: 1800,
    stdMin: 1800 * BANGALORE_RATES.standard.min,
    stdMax: 1800 * BANGALORE_RATES.standard.max,
    config: "G+1 · 3–4 BHK per floor",
  },
  {
    plot: "40×60 (2,400 sqft)",
    bua: 2880,
    stdMin: 2880 * BANGALORE_RATES.standard.min,
    stdMax: 2880 * BANGALORE_RATES.standard.max,
    config: "G+1 · 4–5 BHK per floor",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does a G+1 house cost to build in Bangalore?",
    answer:
      `A G+1 (ground plus one floor) house in Bangalore costs ₹${(1440 * BANGALORE_RATES.standard.min / 100000).toFixed(1)} to ₹${(1440 * BANGALORE_RATES.standard.max / 100000).toFixed(1)} lakh at standard quality for a 30×40 plot (1,440 sqft BUA). At premium quality the range is ₹${(1440 * BANGALORE_RATES.premium.min / 100000).toFixed(1)} to ₹${(1440 * BANGALORE_RATES.premium.max / 100000).toFixed(1)} lakh. The full move-in budget, adding BBMP approval, BESCOM and BWSSB connections, borewell, compound wall, and basic interiors, typically adds ₹10 to ₹20 lakh to the civil cost. North Bangalore outskirts are at the low end of the range; central and IT-corridor Bangalore at the high end.`,
  },
  {
    question: "What is the difference between G+1 and G+2 in Bangalore?",
    answer:
      "G+1 means ground floor plus one additional floor (two floors total). G+2 means ground plus two additional floors (three floors). BBMP permits G+2 under the Revised Master Plan 2031 for residential plots with sufficient FAR, but G+2 requires a separate structural sanction, columns designed for three floors from the start, and BBMP clearance beyond the standard plan approval. A G+1 is simpler to approve, cheaper to build, and sufficient for most family homes in Bangalore. G+2 is typically pursued when the plot is too small to achieve the required floor area in G+1, or when the owner plans to add a rental floor later.",
  },
  {
    question: "How long does BBMP take to approve a G+1 house in Bangalore?",
    answer:
      "BBMP plan approval for a G+1 residential house in Bangalore takes 7 to 30 days through the self-certification scheme (available for plots up to certain sizes when a licensed architect certifies compliance). Complex sites or sites outside the self-certification route can take 30 to 90 days. The approval involves submitting architectural drawings, a structural engineer's certificate, ownership documents, and paying government fees based on built-up area. Always work with a licensed architect who knows the BBMP approval process. Errors in drawings or missing documents reset the clock.",
  },
  {
    question: "Can I build a G+1 on any plot in Bangalore?",
    answer:
      "G+1 is permitted on most BBMP residential plots under the Revised Master Plan 2031, subject to FAR (floor area ratio) limits and setbacks. FAR of 1.75 applies to plots up to 4,000 sqft. Ground coverage is typically limited to 50 to 60 percent of plot area. The setback requirements depend on road width. Front setback equals the road widening reservation, and side and rear setbacks range from 3 to 6 feet. Some older layouts in BBMP's special zones have different FAR. Check your site's zonal regulations before designing. Plots in Heritage zones, close to storm water drains, or on road reservation lines face additional restrictions.",
  },
  {
    question: "Is it worth building G+1 vs buying a flat in Bangalore?",
    answer:
      "For a plot owner in Bangalore, a G+1 construction almost always yields more value than a flat at the same cost. You own the land (which appreciates), you get more usable area per rupee spent, and you have design control over room sizes, ventilation, and future modifications. A G+1 on a 30×40 plot can generate ₹18,000 to ₹35,000 per month in rental income from one floor while you live on the other. The drawback is the construction management effort and the 12 to 18 month build period. If you have the plot and the time, building G+1 almost always beats buying an apartment of equivalent cost in Bangalore.",
  },
  {
    question: "What structural considerations are unique to a G+1 in Bangalore?",
    answer:
      "Bangalore's geology varies a lot across zones, which affects G+1 structural design more than in more uniform cities. North Bangalore laterite rock allows shallow isolated footings at 3 to 5 feet depth, which is cost-efficient. East Bangalore lakebed zones (Bellandur, Varthur, Mahadevapura) may require pile foundations at ₹300 to ₹450 per sqft extra. Whitefield and parts of Electronic City have rocky outcrops that need rock-breaking before foundation work. A structural engineer's soil test (₹8,000 to ₹15,000) is strongly recommended for any Bangalore G+1 before finalising foundation design. The cost is trivial relative to a structural error.",
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
    href: "/construction-cost/bangalore/g-plus-2",
    eyebrow: "Step up",
    title: "G+2 house construction cost in Bangalore",
    desc: "Three-floor build. Covers costs, BBMP requirements, and structural notes.",
  },
  {
    href: "/construction-cost/bangalore/30x40",
    eyebrow: "Plot size",
    title: "30×40 plot cost in Bangalore",
    desc: "The most common G+1 site. Full cost breakdown.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Data source",
    title: "Bangalore Cost Index 2026",
    desc: "Source of all rates on this page. BOQ-verified and dated.",
  },
];

function fmtL(r: number): string {
  const l = r / 100000;
  return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
}

export default function BangaloreGPlus1Page() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&from=blr-g-plus-1" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>G+1</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · G+1 construction cost · BOQ-verified 2026
            </p>

            <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              G+1 house construction cost
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              A G+1, ground floor plus one floor, is Bangalore's most common house configuration. It gives you
              two full floors of living space on a standard residential plot, typically yielding 1,200 to 2,800 sqft
              of built-up area. Costs vary by plot size, zone, and quality tier. All rates below are BOQ-verified
              for Bangalore, June 2026.
            </p>

            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Quick answer: 30×40 G+1, standard quality</p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                The most common brief: a 30×40 plot in Bangalore, G+1, standard quality, costs{" "}
                <strong>{fmtL(1440 * BANGALORE_RATES.standard.min)} to {fmtL(1440 * BANGALORE_RATES.standard.max)}</strong>{" "}
                in civil work for 1,440 sqft BUA (₹{BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹{BANGALORE_RATES.standard.max.toLocaleString("en-IN")} per sqft).
                Full move-in budget with BBMP approval, BESCOM, borewell, compound wall, and basic interiors:{" "}
                <strong>₹40 to ₹58 lakh</strong>.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── COST BY PLOT ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="scenarios-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>G+1 cost by plot size</p>
            <h2 id="scenarios-heading" className="font-serif mb-3" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Standard quality cost by plot size
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "560px" }}>
              At standard quality (₹{BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹{BANGALORE_RATES.standard.max.toLocaleString("en-IN")}/sqft). BUA = plot area × 60% × 2 floors. Civil work only.
            </p>
          </AnimateIn>
          <StaggerContainer className="divide-y divide-border border-t border-border">
            {PLOT_SCENARIOS.map(({ plot, bua, stdMin, stdMax, config, badge }) => (
              <StaggerItem key={plot}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 md:gap-8 py-6 items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-mono" style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)" }}>{plot}</p>
                      {badge && <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>}
                    </div>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{bua.toLocaleString("en-IN")} sqft BUA</p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{config}</p>
                  </div>
                  <div className="md:pt-1">
                    <p className="font-mono tabular-nums" style={{ fontSize: "22px", fontWeight: 500, color: "var(--text-primary)" }}>
                      {fmtL(stdMin)} – {fmtL(stdMax)}
                    </p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>civil construction · standard quality</p>
                  </div>
                  <div className="md:pt-1 flex items-start md:justify-end">
                    <Link href={`/construction-cost/bangalore/${plot.split(" ")[0].replace("×", "x").toLowerCase()}`} className="font-mono text-[11px] uppercase tracking-[0.12em] underline" style={{ color: "var(--accent)" }}>
                      Full breakdown →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>G+1 in Bangalore</p>
            <h2 className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What drives G+1 cost in Bangalore
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                A G+1 in Bangalore is the city's default residential format, with two floors, a single family unit, one
                entrance, one kitchen. The ground floor typically holds the living room, dining, kitchen, and one
                bedroom; the first floor holds the remaining bedrooms and bathrooms. On a standard 30×40 plot, this
                gives two liveable floors of 600 to 720 sqft each, enough for a 3 BHK on the ground and a 2 or 3
                BHK master suite arrangement on the first floor.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Three factors cause the most variation in G+1 cost within Bangalore. First, zone: north Bangalore
                (Yelahanka, Hebbal, Devanahalli) builds G+1 homes for ₹2,000 to ₹2,400 per sqft at standard quality
                because laterite soil is cheap to found on and labour rates are lower than the IT corridor. Central
                Bangalore (Indiranagar, Koramangala) runs ₹2,400 to ₹2,800 per sqft for the same spec because
                logistics cost more and Bangalore contractors price their market premium into central-city quotes.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Second, specification: the per-sqft rate bands cover civil work, but the quality of materials within
                "standard" varies enough to matter. A ₹2,200 per sqft quote specifying Kajaria tiles, UPVC windows,
                and Jaquar chrome fittings is a genuinely different product from a ₹2,200 quote with generic tiles,
                aluminium windows, and basic ISI fittings. Ask every builder for a specification list, not just a
                rate. Third, soil: east Bangalore lakebed zones typically add ₹3 to ₹8 lakh to G+1 foundation
                costs through deep foundation requirements that standard isolated footings cannot handle.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              G+1 construction in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-g-plus-1-faq" />
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
                Get your Bangalore G+1 estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. Cost range, material list, and payment timeline built from Bangalore BOQs.
              </p>
              <Link href="/plan?city=bangalore&from=blr-g-plus-1-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
