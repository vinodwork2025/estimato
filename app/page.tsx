import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem, StaggerSpan } from "@/components/shared/AnimateIn";
import { HomeHero } from "@/components/home/HomeHero";
import { CITIES } from "@/data/cities";

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
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "02",
    title: "Get an honest estimate",
    body: "We calculate your cost range using verified 2026 market rates — with a breakdown, timeline, and hidden costs.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "03",
    title: "Connect if you want to",
    body: "If you want a consultation, we connect you with one verified firm in your area. No cold calls, no spam.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80",
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

        {/* ── Nav ── */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <EstimateLogo size="sm" />
            <nav className="flex items-center gap-6" aria-label="Main navigation">
              <Link href="/about" className="text-sm text-text-secondary hover:text-navy transition-colors hidden md:block font-medium">
                About
              </Link>
              <Link href="/for-architects" className="text-sm text-text-secondary hover:text-navy transition-colors hidden md:block font-medium">
                For architects
              </Link>
              <Link href="/plan">
                <Button variant="primary" size="sm">
                  Get my estimate →
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        <main>
          {/* ── Hero ── */}
          <HomeHero />

          {/* ── How it works ── */}
          <section className="py-24 px-6 bg-white border-t border-border" aria-labelledby="how-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-16">
                <p className="label-arch mb-3">The process</p>
                <h2 id="how-heading" className="font-serif text-headline-xl text-navy">
                  Three steps to clarity
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {HOW_IT_WORKS.map((item, i) => (
                  <AnimateIn key={item.step} delay={i * 0.12}>
                    <div className="group">
                      <div className="relative h-56 rounded-2xl overflow-hidden mb-6 bg-surface-low">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-600 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 overlay-cinema" />
                        <div className="absolute bottom-4 left-4">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">{item.step}</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-headline-sm text-navy mb-2">{item.title}</h3>
                      <p className="text-body-sm text-text-secondary leading-relaxed">{item.body}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── What you get ── */}
          <section className="py-24 px-6 bg-bg-primary border-t border-border" aria-labelledby="what-heading">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <AnimateIn direction="right">
                  <p className="label-arch mb-3">Every estimate includes</p>
                  <h2 id="what-heading" className="font-serif text-headline-xl text-navy mb-5">
                    A 12-page report built for homeowners
                  </h2>
                  <p className="text-body text-text-secondary mb-8 leading-relaxed">
                    Not just a number — a full picture of your construction budget
                    with the context to make confident decisions.
                  </p>
                  <Link href="/plan">
                    <Button variant="primary" size="md">
                      Get my free estimate →
                    </Button>
                  </Link>
                </AnimateIn>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {WHAT_YOU_GET.map((item, i) => (
                    <StaggerItem key={item.label}>
                      <div className="bg-white rounded-2xl border border-border p-5 h-full card-hover">
                        <div className="w-7 h-7 rounded-lg bg-navy/6 flex items-center justify-center mb-4">
                          <span className="text-navy text-sm font-mono font-bold">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <h3 className="font-semibold text-navy text-body-sm mb-2">{item.label}</h3>
                        <p className="text-body-sm text-text-secondary leading-relaxed">{item.body}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

              </div>
            </div>
          </section>

          {/* ── Why different — solid navy, no image overlay ── */}
          <section className="py-24 px-6 bg-navy" aria-labelledby="why-heading">
            <div className="max-w-6xl mx-auto">
              <AnimateIn className="mb-16">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-gold mb-3">Our philosophy</p>
                <h2 id="why-heading" className="font-serif text-headline-xl text-white">
                  Why Estimato is different
                </h2>
              </AnimateIn>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_DIFFERENT.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="border border-white/10 rounded-2xl p-7 hover:border-gold/30 hover:bg-white/4 transition-all duration-300">
                      <div className="w-8 h-0.5 bg-gold mb-5" />
                      <h3 className="font-semibold text-white text-headline-sm mb-3">{item.title}</h3>
                      <p className="text-white/65 text-body-sm leading-relaxed">{item.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ── Cities ── */}
          <section className="py-20 px-6 bg-white border-t border-border" aria-labelledby="cities-heading">
            <div className="max-w-4xl mx-auto">
              <AnimateIn className="text-center mb-10">
                <p className="label-arch mb-3">Coverage</p>
                <h2 id="cities-heading" className="font-serif text-headline-xl text-navy mb-3">
                  Cities we cover
                </h2>
                <p className="text-body text-text-secondary">
                  Verified 2026 construction rate data for these locations.
                </p>
              </AnimateIn>

              <StaggerContainer className="flex flex-wrap gap-2.5 justify-center">
                {CITIES.filter((c) => c.value !== "other").map((city) => (
                  <StaggerSpan
                    key={city.value}
                    className="px-4 py-2 bg-surface-low border border-border rounded-full text-body-sm text-text-primary font-medium hover:border-navy hover:text-navy hover:bg-navy-faint transition-all duration-200 cursor-default"
                  >
                    {city.label}
                  </StaggerSpan>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-20 px-6 bg-bg-primary border-t border-border" aria-labelledby="faq-heading">
            <div className="max-w-2xl mx-auto">
              <AnimateIn className="text-center mb-12">
                <h2 id="faq-heading" className="font-serif text-headline-xl text-navy mb-3">
                  Common questions
                </h2>
                <p className="text-body text-text-secondary">
                  Everything homeowners ask before starting.
                </p>
              </AnimateIn>
              <FAQBlock items={FAQ_ITEMS} schemaId="homepage-faq" />
            </div>
          </section>

          {/* ── Final CTA — solid navy, no image overlay ── */}
          <section className="py-28 px-6 bg-navy border-t border-navy-light">
            <div className="max-w-4xl mx-auto text-center">
              <AnimateIn>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-gold mb-5">Get started today</p>
                <h2 className="font-serif text-display-sm text-white mb-6 leading-tight">
                  Start your home plan now.
                </h2>
                <p className="text-white/65 text-body-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Takes 3 minutes. Free. No account needed.
                  Real numbers you can take to any architect or contractor.
                </p>
                <Link href="/plan">
                  <Button variant="gold" size="lg" className="px-12">
                    Get my estimate →
                  </Button>
                </Link>
                <p className="text-white/35 text-xs font-mono mt-6 uppercase tracking-[0.12em]">
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
                <EstimateLogo size="sm" variant="light" />
                <p className="text-xs text-white/40 mt-3 max-w-xs leading-relaxed">
                  Honest construction cost estimates for Indian homeowners.
                  Free forever.
                </p>
              </div>
              <nav className="flex flex-col sm:flex-row gap-x-8 gap-y-3 text-sm text-white/50" aria-label="Footer navigation">
                <Link href="/about" className="hover:text-white/90 transition-colors">About</Link>
                <Link href="/for-architects" className="hover:text-white/90 transition-colors">For architects</Link>
                <Link href="/plan" className="hover:text-white/90 transition-colors">Start planning</Link>
              </nav>
            </div>
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/30 font-mono">
                © {new Date().getFullYear()} Estimato · estimato.in
              </p>
              <p className="text-xs text-white/30 font-mono">
                Rates verified for 2026 · Hosur–Bengaluru belt
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
