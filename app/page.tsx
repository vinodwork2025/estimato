import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { HomeHero } from "@/components/home/HomeHero";
import { HOME, CTA } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Estimato – Plan before you build",
  description:
    "Plan your home construction budget in 7 steps. Honest numbers, no contractor pitch. Free for Indian homeowners.",
  openGraph: {
    title: "Estimato – Plan before you build",
    description:
      "Get an honest home construction estimate in 7 steps. Covers Hosur, Sarjapura, Bengaluru, and 12+ cities.",
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
  },
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How accurate is the estimate?",
    answer:
      "Our estimates are based on verified 2026 market rates from real project BOQs in the Hosur–Bengaluru belt. We give you a range (not a single number) because construction costs always vary. Use the estimate to plan your budget, not to sign a contract.",
  },
  {
    question: "Is Estimato free to use?",
    answer:
      "Yes, completely free for homeowners. We earn revenue from verified architecture and construction firms who pay per qualified consultation lead.",
  },
  {
    question: "What cities does Estimato cover?",
    answer:
      "We currently have verified rate data for Hosur, Krishnagiri, Sarjapura, Attibele, Bagalur, Anekal, Devanahalli, Yelahanka, Electronic City, Whitefield, and Bengaluru Urban and Rural areas.",
  },
  {
    question: "Will I be contacted by contractors?",
    answer:
      "Only if you choose to. In the lead form, there is a checkbox for connecting with a verified architect. If you uncheck it, no one contacts you. We never sell your data.",
  },
  {
    question: "What is included in the estimate?",
    answer:
      "The estimate covers civil structure, finishes, MEP (electrical and plumbing), elevation, approvals, contingency, and your chosen interior level. It does not include furniture, appliances, or landscaping unless you add them as optional items.",
  },
  {
    question: "How is Estimato different from asking a contractor?",
    answer:
      "Contractors have an incentive to quote low to win work, then increase the cost later. Estimato is independent. We show you the real range, flag hidden costs, and explain what drives each number.",
  },
  {
    question: "Who are the verified partners?",
    answer:
      "Verified partners are architecture and construction firms that Estimato has evaluated for quality, project history, and client feedback. Design Intend is our founding partner for Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri.",
  },
  {
    question: "Can I get the estimate as a PDF?",
    answer:
      "Yes. After completing the 7 steps, you can request a 12-page PDF report with the full breakdown, timeline, hidden cost warnings, and smart observations. Just enter your WhatsApp number.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us about your build",
    body: "Home type, location, plot size, floors, quality tier — 7 quick steps. No signup required.",
  },
  {
    step: "02",
    title: "Get an honest estimate",
    body: "We calculate your cost range using verified 2026 market rates — with a breakdown, timeline, and hidden costs.",
  },
  {
    step: "03",
    title: "Connect if you want to",
    body: "If you want a consultation, we connect you with one verified firm in your area. No cold calls, no spam.",
  },
];

const WHAT_YOU_GET = [
  {
    label: "Cost breakdown",
    body: "7-segment breakdown showing exactly where every rupee goes, from civil structure to contingency.",
  },
  {
    label: "Phase-wise timeline",
    body: "4 construction phases with duration, cost share, and payment schedule.",
  },
  {
    label: "Hidden cost warnings",
    body: "Costs most homeowners discover only after breaking ground — flagged upfront.",
  },
  {
    label: "Smart observations",
    body: "Insights specific to your plot, city, configuration, and quality choices.",
  },
];

const WHY_DIFFERENT = [
  {
    title: "Honest numbers",
    body: "We show a range, not a single optimistic figure. You see exactly what drives costs up or down.",
  },
  {
    title: "No contractor pitch",
    body: "We earn nothing from your construction. Partners pay per qualified lead — that's it.",
  },
  {
    title: "Verified partners only",
    body: "We evaluate architecture firms before listing them. Not a directory. Not paid placements.",
  },
  {
    title: "Always free",
    body: "No upsell inside the tool. No premium tier. Free forever for homeowners.",
  },
];

function ReportMockup() {
  return (
    <svg
      width="200"
      height="283"
      viewBox="0 0 200 283"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="200" height="283" fill="#F7F4EF" />
      <rect x="0.5" y="0.5" width="199" height="282" stroke="#D4CCBF" strokeWidth="1" />
      <rect width="200" height="36" fill="#1C1917" />
      <text x="16" y="23" fill="#F7F4EF" fontFamily="Georgia, serif" fontSize="10" letterSpacing="3">ESTIMATO</text>
      <line x1="16" y1="56" x2="184" y2="56" stroke="#D4CCBF" strokeWidth="0.75" />
      <text x="16" y="78" fill="#6B635C" fontFamily="monospace" fontSize="7" letterSpacing="2">CONSTRUCTION COST</text>
      <text x="16" y="90" fill="#6B635C" fontFamily="monospace" fontSize="7" letterSpacing="2">PROJECTION · 2026</text>
      <text x="16" y="138" fill="#1C1917" fontFamily="Georgia, serif" fontSize="32" letterSpacing="-1">₹84–96L</text>
      <line x1="16" y1="152" x2="80" y2="152" stroke="#A8823B" strokeWidth="1" />
      <text x="16" y="170" fill="#6B635C" fontFamily="monospace" fontSize="7">1,800 SQFT · HOSUR</text>
      <text x="16" y="182" fill="#6B635C" fontFamily="monospace" fontSize="7">CRAFTED LIVING TIER</text>
      <rect x="16" y="205" width="168" height="1.5" fill="#E8E3DA" />
      <rect x="16" y="218" width="120" height="1.5" fill="#E8E3DA" />
      <rect x="16" y="231" width="144" height="1.5" fill="#E8E3DA" />
      <rect x="16" y="244" width="90" height="1.5" fill="#E8E3DA" />
      <text x="16" y="271" fill="#6B635C" fontFamily="monospace" fontSize="6">MAY 2026 · ESTIMATO.IN</text>
    </svg>
  );
}

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: "https://estimato.in",
    description: "Home construction cost planning platform for Indian homeowners.",
    areaServed: "IN",
    serviceType: "Construction cost estimation",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-bg-primary">

        <SiteHeader />

        <main>
          {/* ── Hero ── */}
          <HomeHero />

          {/* ── Three steps to clarity — typographic, no photos ── */}
          <section className="py-28 px-6 bg-white border-t border-border" aria-labelledby="how-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
                  The process
                </p>
                <h2
                  id="how-heading"
                  className="font-serif text-navy"
                  style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 400 }}
                >
                  {HOME.processHeadline}
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {HOW_IT_WORKS.map((item, i) => (
                  <AnimateIn key={item.step} delay={i * 0.1} className="px-0 md:px-10 py-10 md:py-0 first:pl-0 last:pr-0">
                    <p
                      className="font-serif select-none leading-none mb-4"
                      style={{ fontSize: "80px", fontWeight: 300, color: "#D4CCBF", letterSpacing: "-0.04em" }}
                      aria-hidden="true"
                    >
                      {item.step}
                    </p>
                    <h3
                      className="font-serif text-navy mb-3"
                      style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.1 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed" style={{ fontSize: "15px", maxWidth: "38ch" }}>
                      {item.body}
                    </p>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── What you get ── */}
          <section className="py-28 px-6 bg-bg-primary border-t border-border" aria-labelledby="what-heading">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 xl:gap-28 items-start">

              {/* Left — sticky editorial block */}
              <AnimateIn direction="right" className="lg:sticky lg:top-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-6">
                  Every estimate includes
                </p>
                <h2
                  id="what-heading"
                  className="font-serif text-navy mb-6"
                  style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08 }}
                >
                  {HOME.reportHeadline}
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed" style={{ fontSize: "16px", maxWidth: "44ch" }}>
                  Not just a number — a full picture of your construction budget
                  with the context to make confident decisions.
                </p>
                <Link href="/plan">
                  <Button variant="primary" size="lg" className="px-10">
                    {CTA.heroPrimary}
                  </Button>
                </Link>
              </AnimateIn>

              {/* Right — PDF mockup + feature list */}
              <div>
                <AnimateIn className="mb-10">
                  <div
                    className="inline-block"
                    style={{
                      transform: "rotate(4deg)",
                      boxShadow: "0 16px 48px rgba(28,25,23,0.12), 0 4px 12px rgba(28,25,23,0.06)",
                    }}
                  >
                    <ReportMockup />
                  </div>
                </AnimateIn>

                <StaggerContainer className="divide-y divide-border">
                  {WHAT_YOU_GET.map((item, i) => (
                    <StaggerItem key={item.label}>
                      <div className="flex gap-6 py-7 group">
                        <span
                          className="font-mono text-text-tertiary tabular-nums shrink-0 mt-1 group-hover:text-text-secondary transition-colors duration-300"
                          style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3
                            className="font-serif text-navy mb-1.5"
                            style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em" }}
                          >
                            {item.label}
                          </h3>
                          <p className="text-text-secondary leading-relaxed" style={{ fontSize: "14px" }}>
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

            </div>
          </section>

          {/* ── Why different — two-column editorial ── */}
          <section className="py-28 px-6 bg-navy" aria-labelledby="why-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-5 bg-gold/50" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70">Our philosophy</p>
                </div>
                <h2
                  id="why-heading"
                  className="font-serif text-white"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
                >
                  {HOME.whyHeadline}
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {WHY_DIFFERENT.map((item, i) => (
                  <AnimateIn key={item.title} delay={i * 0.08} className="py-8 md:pr-16 border-b border-white/10">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/60 mb-3">
                      POINT 0{i + 1}
                    </p>
                    <h3
                      className="font-serif text-white mb-3"
                      style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.1 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/55 leading-relaxed" style={{ fontSize: "15px" }}>
                      {item.body}
                    </p>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── Cities — editorial paragraph ── */}
          <section className="py-24 px-6 bg-white border-t border-border" aria-labelledby="cities-heading">
            <div className="max-w-5xl mx-auto text-center">
              <AnimateIn className="mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-6">
                  Coverage
                </p>
                <h2
                  id="cities-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary sr-only"
                >
                  Cities we cover
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <p
                  className="font-serif text-navy leading-relaxed mx-auto"
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 24px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.6,
                    maxWidth: "64ch",
                  }}
                >
                  {HOME.citiesBody}
                </p>
              </AnimateIn>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-20 px-6 bg-bg-primary border-t border-border" aria-labelledby="faq-heading">
            <div className="max-w-2xl mx-auto">
              <AnimateIn className="mb-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
                  Common questions
                </p>
                <h2
                  id="faq-heading"
                  className="font-serif text-navy"
                  style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  {HOME.faqHeadline}
                </h2>
              </AnimateIn>
              <FAQBlock items={FAQ_ITEMS} schemaId="homepage-faq" />
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="py-32 px-6 bg-navy border-t border-white/8">
            <div className="max-w-4xl mx-auto text-center">
              <AnimateIn>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/70 mb-8">
                  Get started
                </p>
                <h2
                  className="font-serif text-white mb-8 whitespace-pre-line"
                  style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
                >
                  {HOME.finalCtaHeadline}
                </h2>
                <p className="text-white/55 leading-relaxed mb-12 mx-auto" style={{ fontSize: "17px", maxWidth: "44ch" }}>
                  Takes 3 minutes. Free. No account needed.
                  Real numbers you can take to any architect or contractor.
                </p>
                <Link href="/plan">
                  <Button variant="gold" size="lg" className="px-14">
                    {CTA.heroPrimary}
                  </Button>
                </Link>
                <p className="text-white/30 font-mono mt-8 uppercase tracking-[0.14em]" style={{ fontSize: "10px" }}>
                  12+ cities · 2026 verified rates · No sign-up
                </p>
              </AnimateIn>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="bg-navy border-t border-white/10 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <EstimateLogo size="lg" variant="light" />
                <p className="font-mono text-[10px] text-white/40 mt-3 max-w-xs leading-relaxed uppercase tracking-[0.1em]">
                  Honest construction cost estimates for Indian homeowners.
                </p>
              </div>
              <nav className="flex flex-col sm:flex-row gap-x-8 gap-y-3" aria-label="Footer navigation">
                <Link href="/about" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">About</Link>
                <Link href="/methodology" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">Methodology</Link>
                <Link href="/for-architects" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">For architects</Link>
                <Link href="/plan" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">Start planning</Link>
              </nav>
            </div>
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em]">
                © {new Date().getFullYear()} Estimato · estimato.in
              </p>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em]">
                Rates verified for 2026 · Hosur–Bengaluru belt
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
