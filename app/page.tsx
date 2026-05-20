import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";
import { FAQBlock } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { HomeHero } from "@/components/home/HomeHero";
import {
  HOME,
  CTA,
  HOW_IT_WORKS,
  WHAT_YOU_GET,
  WHY_DIFFERENT,
  FAQ_ITEMS,
} from "@/lib/copy";

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

          {/* ── Three steps — typographic, no photos ── */}
          <section className="py-28 px-6 bg-white border-t border-border" aria-labelledby="how-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
                  {HOME.processLabel}
                </p>
                <h2
                  id="how-heading"
                  className="font-serif text-navy"
                  style={{
                    fontSize: "clamp(32px, 5vw, 48px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    fontWeight: 400,
                  }}
                >
                  {HOME.processHeadline}
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {HOW_IT_WORKS.map((item, i) => (
                  <AnimateIn key={item.step} delay={i * 0.1} className="px-0 md:px-10 py-10 md:py-0 first:pl-0 last:pr-0">
                    <div className="relative mb-2">
                      <p
                        className="font-serif select-none leading-none"
                        style={{
                          fontSize: "96px",
                          fontWeight: 300,
                          color: "#D4CCBF",
                          letterSpacing: "-0.04em",
                          lineHeight: 0.85,
                        }}
                        aria-hidden="true"
                      >
                        {item.step}
                      </p>
                    </div>
                    <h3
                      className="font-serif text-navy mb-3"
                      style={{
                        fontSize: "22px",
                        fontWeight: 400,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.15,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-text-secondary leading-relaxed"
                      style={{ fontSize: "15px", maxWidth: "36ch" }}
                    >
                      {item.body}
                    </p>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── What your projection includes — 6 items, 3×2 grid ── */}
          <section className="py-28 px-6 bg-bg-primary border-t border-border" aria-labelledby="what-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-20 max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
                  Every estimate includes
                </p>
                <h2
                  id="what-heading"
                  className="font-serif text-navy mb-5"
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 400,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.08,
                  }}
                >
                  {HOME.reportHeadline}
                </h2>
                <p
                  className="text-text-secondary leading-relaxed"
                  style={{ fontSize: "17px", lineHeight: 1.7, maxWidth: "56ch", color: "#3A3530" }}
                >
                  {HOME.reportSubhead}
                </p>
              </AnimateIn>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {WHAT_YOU_GET.map((item, i) => (
                  <StaggerItem key={item.label}>
                    <div
                      className="py-8 md:pr-10 border-t border-border"
                    >
                      <p
                        className="font-mono text-text-tertiary tabular-nums mb-3"
                        style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <div
                        style={{
                          width: "16px",
                          height: "1px",
                          background: "var(--accent)",
                          marginBottom: "14px",
                        }}
                      />
                      <h3
                        className="font-serif text-navy mb-2"
                        style={{
                          fontSize: "22px",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.15,
                        }}
                      >
                        {item.label}
                      </h3>
                      <p
                        className="text-text-secondary leading-relaxed"
                        style={{ fontSize: "15px", maxWidth: "32ch" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <AnimateIn delay={0.2} className="mt-14">
                <Link href="/plan">
                  <Button variant="primary" size="lg" className="px-12">
                    {CTA.heroPrimary}
                  </Button>
                </Link>
              </AnimateIn>
            </div>
          </section>

          {/* ── Why different — 2×2 grid, dark ── */}
          <section className="py-28 px-6 bg-navy" aria-labelledby="why-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-5 bg-gold/50" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70">
                    {HOME.whyLabel}
                  </p>
                </div>
                <h2
                  id="why-heading"
                  className="font-serif text-white"
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 400,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  {HOME.whyHeadline}
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {WHY_DIFFERENT.map((item, i) => (
                  <AnimateIn key={item.title} delay={i * 0.08} className="py-8 md:pr-16 border-b border-white/10">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/60 mb-3">
                      POINT {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="font-serif text-white mb-3"
                      style={{
                        fontSize: "24px",
                        fontWeight: 400,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.1,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="leading-relaxed" style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)" }}>
                      {item.body}
                    </p>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── Cities — editorial Cormorant paragraph ── */}
          <section className="py-24 px-6 bg-white border-t border-border" aria-labelledby="cities-heading">
            <div className="max-w-5xl mx-auto text-center">
              <AnimateIn>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-8">
                  {HOME.citiesLabel}
                </p>
                <h2 id="cities-heading" className="sr-only">
                  Cities we cover
                </h2>
                <p
                  className="font-serif text-navy leading-relaxed mx-auto"
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 24px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.55,
                    maxWidth: "720px",
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
                  {HOME.faqLabel}
                </p>
                <h2
                  id="faq-heading"
                  className="font-serif text-navy"
                  style={{
                    fontSize: "clamp(28px, 4vw, 36px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {HOME.faqHeadline}
                </h2>
              </AnimateIn>
              <FAQBlock items={[...FAQ_ITEMS]} schemaId="homepage-faq" />
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="py-32 px-6 bg-navy border-t border-white/8">
            <div className="max-w-4xl mx-auto text-center">
              <AnimateIn>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/70 mb-8">
                  {HOME.finalCtaLabel}
                </p>
                <h2
                  className="font-serif text-white mb-6 whitespace-pre-line"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    fontWeight: 400,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  {HOME.finalCtaHeadline}
                </h2>
                <p
                  className="mx-auto mb-12"
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.7,
                    maxWidth: "44ch",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {HOME.finalCtaSubhead}
                </p>
                <Link href="/plan">
                  <Button variant="gold" size="lg" className="px-14">
                    {CTA.heroPrimary}
                  </Button>
                </Link>
                <p className="font-mono mt-8 uppercase tracking-[0.14em]" style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
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
