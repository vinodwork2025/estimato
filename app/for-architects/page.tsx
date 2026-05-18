import type { Metadata } from "next";
import Link from "next/link";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "For architects and builders – Estimato Partner Programme",
  description:
    "Join Estimato's verified partner network. Get qualified home construction leads at ₹3,000 per lead. No commissions. Pay only for real consultations.",
};

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Homeowners plan their build",
    body: "They use Estimato to get a cost estimate before they talk to anyone. They arrive informed, serious, and ready to act.",
  },
  {
    number: "02",
    title: "They request a consultation",
    body: "When they submit their contact details, Estimato routes the lead to the verified partner in their city.",
  },
  {
    number: "03",
    title: "You receive the lead",
    body: "You get their full build profile: home type, city, budget, and timeline. You follow up and close.",
  },
  {
    number: "04",
    title: "Pay per qualified lead",
    body: "₹3,000 per lead. No commission on project value. No subscription. No lock-in contract.",
  },
];

const PRICING_POINTS = [
  "Lead includes full build profile",
  "Name, WhatsApp number, email",
  "City, plot size, budget range",
  "Construction timeline",
  "No commission on project value",
  "No monthly subscription",
  "No lock-in contract",
];

function Check() {
  return (
    <span className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
        <path d="M1 3.5L3 5.5L7 1" stroke="#2D7D5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ForArchitectsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <EstimateLogo size="sm" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">Back to Estimato</Button>
          </Link>
        </div>
      </header>

      <main>

        {/* Hero */}
        <section className="py-24 px-6 border-b border-border" aria-labelledby="partner-hero">
          <div className="max-w-2xl mx-auto">
            <p className="label-arch mb-4">Partner programme</p>
            <h1
              id="partner-hero"
              className="font-serif text-navy mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              Clients who already know their budget.
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              Estimato sends you homeowners who have already done their homework.
              They arrive with a budget range, a timeline, and a clear idea of what they want.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a href="mailto:partners@estimato.in">
                <Button variant="primary" size="lg" className="px-10">
                  Apply as a partner
                </Button>
              </a>
              <div>
                <p className="font-mono text-[22px] font-semibold text-navy tabular-nums leading-none">₹3,000</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary mt-1">per qualified lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-white border-b border-border" aria-labelledby="how-works">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <p className="label-arch mb-3">The process</p>
              <h2 id="how-works" className="font-serif text-headline-xl text-navy">
                How it works for partners
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.number} className="flex gap-5">
                  <div className="shrink-0 mt-0.5">
                    <span className="font-mono text-[11px] text-text-tertiary uppercase tracking-[0.14em]">{item.number}</span>
                  </div>
                  <div className="border-l border-border pl-5">
                    <h3 className="font-serif text-headline-sm text-navy mb-2">{item.title}</h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 border-b border-border" aria-labelledby="pricing">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <p className="label-arch mb-3">Pricing</p>
              <h2 id="pricing" className="font-serif text-headline-xl text-navy">
                Simple. Transparent.
              </h2>
            </div>
            <div className="bg-white border border-border rounded-2xl p-8">
              <div className="text-center mb-8 pb-8 border-b border-border">
                <p className="font-serif text-navy mb-1" style={{ fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em" }}>₹3,000</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary mt-2">per qualified consultation lead</p>
              </div>
              <ul className="space-y-3 mb-8">
                {PRICING_POINTS.map((point) => (
                  <li key={point} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-body-sm text-text-secondary">{point}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:partners@estimato.in" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Apply as a partner
                </Button>
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary text-center mt-4">
                Onboarding founding partners now · partners@estimato.in
              </p>
            </div>
          </div>
        </section>

        {/* Founding partner */}
        <section className="py-20 px-6 bg-navy">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold mb-4">Founding partner</p>
            <h2 className="font-serif text-headline-xl text-white mb-5">Design Intend</h2>
            <p className="text-white/65 text-body leading-relaxed mb-8 max-w-md mx-auto">
              Design Intend is Estimato&apos;s founding partner for Hosur, Sarjapura, Attibele, Bagalur,
              and Krishnagiri. Founded by Ar. Chittrarasan, with experience at Gensler on Chase Bank,
              Starbucks, and GMFI projects.
            </p>
            <a
              href="https://designintend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-gold transition-colors"
            >
              designintend.com →
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <EstimateLogo size="sm" />
          <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.14em]">
            © {new Date().getFullYear()} Estimato · partners@estimato.in
          </p>
        </div>
      </footer>

    </div>
  );
}
