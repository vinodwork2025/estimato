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

  title: “Estimato – Plan before you build”,

  description:

    "Plan your home construction budget in 7 steps. Honest numbers, no contractor pitch. Free for Indian homeowners.",

  openGraph: {

    title: “Estimato – Plan before you build”,

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

    body: "Home type, location, plot size, floors, quality tier — 7 considered steps. No sign-up, no obligation.",

  },

  {

    step: "02",

    title: "Get an honest estimate",

    body: "Your cost range, built from verified 2026 BOQ data. Full breakdown, phase timeline, and hidden cost flags.",

  },

  {

    step: "03",

    title: "Connect if you want to",

    body: "One verified architecture firm in your area, if you choose. No cold calls, no data sold, no pressure.",

  },

];



const WHAT_YOU_GET = [

  {

    label: "Cost breakdown",

    body: "Seven segments showing exactly where every rupee goes — from civil structure to contingency reserve.",

  },

  {

    label: "Phase-wise timeline",

    body: "Four construction phases with duration, cost share, and a realistic payment schedule.",

  },

  {

    label: "Hidden cost warnings",

    body: "The costs most homeowners discover only after breaking ground, flagged before you start.",

  },

  {

    label: "Smart observations",

    body: "Insights specific to your plot size, city, configuration, and quality tier.",

  },

];



const WHY_DIFFERENT = [

  {

    title: "Honest numbers",

    body: "We show a range, not a single optimistic figure. You see exactly what drives costs up or down — before you speak to anyone.",

  },

  {

    title: "No contractor pitch",

    body: "We earn nothing from your construction. Verified partners pay per qualified introduction. That is the entire model.",

  },

  {

    title: "Verified partners only",

    body: "We evaluate every architecture firm before they appear here. Not a directory. Not a paid listing. Not a marketplace.",

  },

  {

    title: "Always free",

    body: "No upsell inside the tool. No premium tier. No account required. Free for Indian homeowners, permanently.",

  },

];



function ReportMockup() {

  return (

    <svg

      width="240"

      height="340"

      viewBox="0 0 240 340"

      fill="none"

      xmlns="http://www.w3.org/2000/svg"

      aria-hidden="true"

    >

      <rect width="240" height="340" fill="#FFFFFF" />

      <rect x="0.5" y="0.5" width="239" height="339" stroke="#DDE4ED" strokeWidth="1" />



      {/* Navy header */}

      <rect width="240" height="44" fill="#0D1F3C" />

      <text x="20" y="28" fill="#FFFFFF" fontFamily="Georgia, serif" fontSize="11" letterSpacing="3.5">ESTIMATO</text>

      <text x="220" y="26" fill="rgba(247,244,239,0.35)" fontFamily="monospace" fontSize="7" letterSpacing="1" textAnchor="end">2026</text>



      {/* Label block */}

      <text x="20" y="64" fill="#7B93A8" fontFamily="monospace" fontSize="7" letterSpacing="2">CONSTRUCTION COST</text>

      <text x="20" y="76" fill="#7B93A8" fontFamily="monospace" fontSize="7" letterSpacing="2">PROJECTION · HOSUR</text>



      {/* Hairline */}

      <line x1="20" y1="88" x2="220" y2="88" stroke="#DDE4ED" strokeWidth="0.5" />



      {/* Big number */}

      <text x="20" y="136" fill="#0D1F3C" fontFamily="Georgia, serif" fontSize="40" letterSpacing="-2">₹84–96L</text>



      {/* Bronze rule */}

      <line x1="20" y1="149" x2="88" y2="149" stroke="#C49A3C" strokeWidth="1.5" />



      {/* Spec lines */}

      <text x="20" y="167" fill="#7B93A8" fontFamily="monospace" fontSize="7" letterSpacing="1.5">1,800 SQFT · G+1 · HOSUR</text>

      <text x="20" y="179" fill="#7B93A8" fontFamily="monospace" fontSize="7" letterSpacing="1.5">CRAFTED LIVING TIER</text>



      {/* Breakdown label */}

      <text x="20" y="204" fill="#7B93A8" fontFamily="monospace" fontSize="7" letterSpacing="2">COST BREAKDOWN</text>

      <line x1="20" y1="211" x2="220" y2="211" stroke="#EEF2F7" strokeWidth="0.5" />



      {/* Bars — proportional to 200px = 100% */}

      {/* Civil 38% → 76px */}

      <rect x="20" y="219" width="76" height="3.5" fill="#C49A3C" rx="1" />

      <text x="102" y="223" fill="#7B93A8" fontFamily="monospace" fontSize="6.5">CIVIL  38%</text>



      {/* Finishes 22% → 44px */}

      <rect x="20" y="231" width="44" height="3.5" fill="#C4A76B" rx="1" />

      <text x="70" y="235" fill="#7B93A8" fontFamily="monospace" fontSize="6.5">FINISHES  22%</text>



      {/* MEP 14% → 28px */}

      <rect x="20" y="243" width="28" height="3.5" fill="#DDE4ED" rx="1" />

      <text x="54" y="247" fill="#7B93A8" fontFamily="monospace" fontSize="6.5">MEP  14%</text>



      {/* Elevation 10% → 20px */}

      <rect x="20" y="255" width="20" height="3.5" fill="#DDE4ED" rx="1" />

      <text x="46" y="259" fill="#7B93A8" fontFamily="monospace" fontSize="6.5">ELEVATION  10%</text>



      {/* Interiors 8% → 16px */}

      <rect x="20" y="267" width="16" height="3.5" fill="#EEF2F7" rx="1" />

      <text x="42" y="271" fill="#7B93A8" fontFamily="monospace" fontSize="6.5">INTERIORS  8%</text>



      {/* Other 8% → 16px */}

      <rect x="20" y="279" width="16" height="3.5" fill="#EEF2F7" rx="1" />

      <text x="42" y="283" fill="#7B93A8" fontFamily="monospace" fontSize="6.5">CONTINGENCY  8%</text>



      {/* Footer rule */}

      <line x1="20" y1="298" x2="220" y2="298" stroke="#DDE4ED" strokeWidth="0.5" />



      {/* Footer text */}

      <text x="20" y="313" fill="#7B93A8" fontFamily="monospace" fontSize="6" letterSpacing="1">ESTIMATO.IN</text>

      <text x="20" y="324" fill="#7B93A8" fontFamily="monospace" fontSize="6" letterSpacing="1">RATES VERIFIED MAY 2026</text>



      {/* Bronze corner mark */}

      <line x1="196" y1="298" x2="220" y2="298" stroke="#C49A3C" strokeWidth="1" />

      <line x1="220" y1="298" x2="220" y2="334" stroke="#C49A3C" strokeWidth="1" />

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

          {/* â”€â”€ Hero â”€â”€ */}

          <HomeHero />



          {/* â”€â”€ Three steps — architectural numerals â”€â”€ */}

          <section className="py-28 md:py-36 px-6 bg-white border-t border-border" aria-labelledby="how-heading">

            <div className="max-w-6xl mx-auto">

              <AnimateIn className="mb-20">

                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-secondary mb-4">

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

                  <AnimateIn key={item.step} delay={i * 0.1} className="px-0 md:px-10 py-12 md:py-0 first:pl-0 last:pr-0">

                    {/* Large architectural numeral */}

                    <p

                      className="font-serif select-none leading-none mb-5"

                      style={{ fontSize: "112px", fontWeight: 300, color: "#C5D0DC", letterSpacing: "-0.04em", lineHeight: 0.85 }}

                      aria-hidden="true"

                    >

                      {item.step}

                    </p>

                    <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-secondary mb-3">

                      Step {item.step}

                    </p>

                    <h3

                      className="font-serif text-navy mb-3"

                      style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.15 }}

                    >

                      {item.title}

                    </h3>

                    <p className="text-text-secondary leading-relaxed" style={{ fontSize: "15px", maxWidth: "38ch", lineHeight: 1.72 }}>

                      {item.body}

                    </p>

                  </AnimateIn>

                ))}

              </div>

            </div>

          </section>



          {/* â”€â”€ What you get — sticky editorial left, report mockup right â”€â”€ */}

          <section className="py-28 md:py-36 px-6 bg-bg-primary border-t border-border" aria-labelledby="what-heading">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 xl:gap-28 items-start">



              {/* Left — sticky editorial block */}

              <AnimateIn className="lg:sticky lg:top-28">

                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-secondary mb-6">

                  Every estimate includes

                </p>

                <h2

                  id="what-heading"

                  className="font-serif text-navy mb-5"

                  style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08 }}

                >

                  {HOME.reportHeadline}

                </h2>

                <p className="text-text-secondary mb-8 leading-relaxed" style={{ fontSize: "16px", maxWidth: "44ch", lineHeight: 1.72 }}>

                  Not just a number — a full picture of your construction budget

                  with the context to make confident decisions before you start.

                </p>

                <Link href="/plan">

                  <Button variant="primary" size="lg" className="px-10">

                    {CTA.heroPrimary}

                  </Button>

                </Link>

              </AnimateIn>



              {/* Right — detailed report mockup + feature list */}

              <div>

                <AnimateIn className="mb-12">

                  <div

                    className="inline-block"

                    style={{

                      transform: "rotate(2.5deg)",

                      boxShadow: "0 24px 64px rgba(13,31,60,0.14), 0 6px 20px rgba(13,31,60,0.07)",

                    }}

                  >

                    <ReportMockup />

                  </div>

                </AnimateIn>



                <StaggerContainer className="divide-y divide-border">

                  {WHAT_YOU_GET.map((item, i) => (

                    <StaggerItem key={item.label}>

                      <div className="flex gap-6 py-7 group">

                        <div className="shrink-0 mt-1">

                          <span

                            className="font-mono text-text-secondary tabular-nums group-hover:text-text-secondary transition-colors duration-300 block"

                            style={{ fontSize: "11px", letterSpacing: "0.1em" }}

                          >

                            {String(i + 1).padStart(2, "0")}

                          </span>

                          <div

                            style={{

                              width: "16px",

                              height: "1px",

                              background: "var(--accent)",

                              opacity: 0.4,

                              marginTop: "7px",

                            }}

                          />

                        </div>

                        <div>

                          <h3

                            className="font-serif text-navy mb-1.5"

                            style={{ fontSize: "21px", fontWeight: 400, letterSpacing: "-0.01em" }}

                          >

                            {item.label}

                          </h3>

                          <p className="text-text-secondary leading-relaxed" style={{ fontSize: "15px", lineHeight: 1.7 }}>

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



          {/* â”€â”€ Why different — navy, 2×2 editorial grid â”€â”€ */}

          <section className="py-28 md:py-36 px-6 bg-navy" aria-labelledby="why-heading">

            <div className="max-w-6xl mx-auto">

              <AnimateIn className="mb-20">

                <div className="flex items-center gap-3 mb-5">

                  <div className="h-px w-5 bg-gold/50" />

                  <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-gold/70">Our philosophy</p>

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

                  <AnimateIn

                    key={item.title}

                    delay={i * 0.08}

                    className="py-9 md:pr-16 border-b border-white/10"

                    style={{

                      paddingLeft: "20px",

                      borderLeft: "1px solid rgba(255,255,255,0.06)",

                    }}

                  >

                    <div className="flex items-center gap-3 mb-4">

                      <div style={{ width: "12px", height: "1px", background: "rgba(184,149,78,0.5)" }} />

                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/55">

                        Point {String(i + 1).padStart(2, "0")}

                      </p>

                    </div>

                    <h3

                      className="font-serif text-white mb-3"

                      style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.1 }}

                    >

                      {item.title}

                    </h3>

                    <p className="text-white/55 leading-relaxed" style={{ fontSize: "16px", lineHeight: 1.7 }}>

                      {item.body}

                    </p>

                  </AnimateIn>

                ))}

              </div>

            </div>

          </section>



          {/* â”€â”€ Cities — editorial with large numeral â”€â”€ */}

          <section className="py-24 md:py-32 px-6 bg-white border-t border-border" aria-labelledby="cities-heading">

            <div className="max-w-6xl mx-auto">

              <AnimateIn>

                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-secondary mb-14 text-center">

                  Coverage

                </p>

                <h2 id="cities-heading" className="sr-only">Cities we cover</h2>

              </AnimateIn>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-20">

                <AnimateIn className="shrink-0">

                  <p

                    className="font-serif leading-none"

                    style={{ fontSize: "clamp(80px, 12vw, 120px)", fontWeight: 300, color: "#C5D0DC", letterSpacing: "-0.04em" }}

                    aria-hidden="true"

                  >

                    12

                  </p>

                  <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-secondary mt-3">

                    Cities · quarterly updates

                  </p>

                </AnimateIn>

                <AnimateIn delay={0.12}>

                  <p

                    className="font-serif text-navy leading-relaxed"

                    style={{ fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.65, maxWidth: "58ch" }}

                  >

                    {HOME.citiesBody}

                  </p>

                </AnimateIn>

              </div>

            </div>

          </section>



          {/* â”€â”€ FAQ â”€â”€ */}

          <section className="py-20 md:py-28 px-6 bg-bg-primary border-t border-border" aria-labelledby="faq-heading">

            <div className="max-w-2xl mx-auto">

              <AnimateIn className="mb-14">

                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-secondary mb-4">

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



          {/* â”€â”€ Final CTA — cinematic â”€â”€ */}

          <section className="py-36 px-6 bg-navy border-t border-white/8">

            <div className="max-w-4xl mx-auto text-center">

              <AnimateIn>

                <div className="flex justify-center mb-8">

                  <div style={{ width: "32px", height: "1px", background: "rgba(184,149,78,0.5)" }} />

                </div>

                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/65 mb-8">

                  Get started

                </p>

                <h2

                  className="font-serif text-white mb-8 whitespace-pre-line"

                  style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}

                >

                  {HOME.finalCtaHeadline}

                </h2>

                <p className="text-white/55 leading-relaxed mb-12 mx-auto" style={{ fontSize: "17px", maxWidth: "44ch", lineHeight: 1.75 }}>

                  Takes 3 minutes. Free. No account needed.

                  Real numbers you can take to any architect or contractor.

                </p>

                <Link href="/plan">

                  <Button variant="gold" size="lg" className="px-14">

                    {CTA.heroPrimary}

                  </Button>

                </Link>

                <div className="mt-5">

                  <Link

                    href="/methodology"

                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35 hover:text-white/65 transition-colors duration-200"

                  >

                    Read our methodology →

                  </Link>

                </div>

                <p className="text-white/25 font-mono mt-10 uppercase tracking-[0.14em]" style={{ fontSize: "10px" }}>

                  12+ cities · 2026 verified rates · No sign-up

                </p>

              </AnimateIn>

            </div>

          </section>

        </main>



        {/* â”€â”€ Footer â”€â”€ */}

        <footer className="bg-navy border-t border-white/10 px-6 py-12">

          <div className="max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

              <div>

                <EstimateLogo size="lg" variant="light" />

                <p className="font-mono text-[12px] text-white/40 mt-3 max-w-xs leading-relaxed uppercase tracking-[0.1em]">

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

              <p className="font-mono text-[12px] text-white/30 uppercase tracking-[0.1em]">

                © {new Date().getFullYear()} Estimato · estimato.in

              </p>

              <p className="font-mono text-[12px] text-white/30 uppercase tracking-[0.1em]">

                Rates verified for 2026 · Hosur–Bengaluru belt

              </p>

            </div>

          </div>

        </footer>



      </div>

    </>

  );

}

