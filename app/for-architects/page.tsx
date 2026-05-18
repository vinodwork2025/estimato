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
    title: "Homeowners plan their build",
    body: "They use Estimato to get a cost estimate before they talk to anyone. They're informed, serious, and ready to act.",
  },
  {
    title: "They request a consultation",
    body: "When they fill in their contact details, Estimato routes the lead to the verified partner in their city.",
  },
  {
    title: "You get the lead",
    body: "You receive the lead with their full build profile: home type, city, budget, timeline. You follow up and close.",
  },
  {
    title: "You pay per qualified lead",
    body: "₹3,000 per lead. No commission on the project. No subscription. No lock-in.",
  },
];

export default function ForArchitectsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="border-b border-border bg-white px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <EstimateLogo size="md" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">Back to Estimato</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="py-20 px-4 text-center" aria-labelledby="partner-hero">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-accent font-medium uppercase tracking-wider mb-4">
              Partner programme
            </p>
            <h1 id="partner-hero" className="font-serif text-5xl text-text-primary mb-6 leading-tight">
              Get clients who already know their budget
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              Estimato sends you homeowners who have already done their homework.
              They come in with a budget range, a timeline, and a clear idea of what they want.
            </p>
            <p className="text-2xl font-semibold text-text-primary mb-2 tabular-nums">
              ₹3,000 per qualified lead
            </p>
            <p className="text-text-secondary mb-8">
              No commission. No subscription. Pay only when you get a real lead.
            </p>
            <a href="mailto:partners@estimato.in">
              <Button variant="primary" size="lg" className="px-10">
                Apply as a partner
              </Button>
            </a>
          </div>
        </section>

        <section className="py-16 px-4 bg-white border-y border-border" aria-labelledby="how-works">
          <div className="max-w-5xl mx-auto">
            <h2 id="how-works" className="text-3xl font-semibold text-text-primary text-center mb-12">
              How it works for partners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOW_IT_WORKS.map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4" aria-labelledby="pricing">
          <div className="max-w-3xl mx-auto">
            <h2 id="pricing" className="text-3xl font-semibold text-text-primary text-center mb-12">
              Pricing
            </h2>
            <div className="bg-white border border-border rounded-card p-8 text-center">
              <p className="text-5xl font-semibold text-text-primary tabular-nums mb-2">₹3,000</p>
              <p className="text-text-secondary mb-6">per qualified consultation lead</p>
              <ul className="text-sm text-text-secondary text-left max-w-xs mx-auto space-y-3 mb-8">
                {[
                  "Lead includes full build profile",
                  "Name, WhatsApp number, email",
                  "City, plot size, budget range",
                  "Construction timeline",
                  "No commission on project value",
                  "No monthly subscription",
                  "No lock-in contract",
                ].map((point) => (
                  <li key={point} className="flex gap-2 items-start">
                    <span className="text-success mt-0.5">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:partners@estimato.in">
                <Button variant="primary" size="lg" className="w-full">
                  Apply as a partner
                </Button>
              </a>
              <p className="text-xs text-text-tertiary mt-4">
                We are currently onboarding founding partners. Email partners@estimato.in to start.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-bg-charcoal text-white text-center">
          <div className="max-w-xl mx-auto">
            <p className="text-sm opacity-60 mb-2">Founding partner</p>
            <h2 className="text-2xl font-semibold mb-4">Design Intend</h2>
            <p className="opacity-75 text-sm leading-relaxed mb-6">
              Design Intend is Estimato&apos;s founding partner for Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri.
              Founded by Ar. Chittrarasan, with experience at Gensler on Chase Bank, Starbucks, and GMFI projects.
            </p>
            <a
              href="https://designintend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline opacity-75 hover:opacity-100"
            >
              designintend.com
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white px-4 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Estimato · partners@estimato.in
          </p>
        </div>
      </footer>
    </div>
  );
}
