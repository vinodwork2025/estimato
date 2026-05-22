import type { Metadata } from "next";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: "About Estimato",
  description:
    "Estimato is a home construction cost planning platform for Indian homeowners. Honest numbers. No contractor pitch.",
};

const SECTIONS = [
  {
    label: "The problem",
    heading: "Contractors quote to win, not to inform",
    body: "Most estimates you get are designed to get you to commit. They start low and grow. By the time the real number arrives, you have already committed emotionally and financially. Estimato works the other way. You come in with a clear expectation, knowing the range, knowing what drives cost, knowing what people forget to include.",
  },
  {
    label: "How we earn",
    heading: "Aligned with honest numbers",
    body: "Estimato is free for homeowners. We earn from verified architecture and construction firms who pay a fixed fee per qualified consultation lead. No commission on project value. This keeps our incentives aligned with giving you accurate numbers — not inflated ones.",
  },
  {
    label: "Our data",
    heading: "Verified 2026 construction rates",
    body: "Our base rates are verified against real project BOQs from Design Intend's work in Hosur and surrounding areas as of January 2026. We update rates quarterly. City multipliers are based on labour cost surveys and material logistics data.",
  },
  {
    label: "Founding partner",
    heading: "Design Intend",
    body: "Design Intend is our founding partner, covering Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri. Founded by Ar. Chittrarasan, with experience at Gensler on Chase Bank, Starbucks, and GMFI projects.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">

      <SiteHeader ctaLabel="Start planning" ctaHref="/plan" maxWidth="max-w-5xl" />

      <main className="max-w-2xl mx-auto px-6">

        {/* Hero */}
        <div className="pt-20 pb-16 border-b border-border">
          <p className="label-arch mb-4">About</p>
          <h1 className="font-serif text-navy mb-6" style={{ fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Honest numbers<br />for homeowners.
          </h1>
          <p className="text-body-lg text-text-secondary leading-relaxed max-w-lg">
            Estimato helps Indian homeowners figure out what their home will actually cost —
            before they talk to a single contractor.
          </p>
        </div>

        {/* Sections */}
        <div className="divide-y divide-border">
          {SECTIONS.map((s) => (
            <div key={s.label} className="py-12">
              <p className="label-arch mb-3">{s.label}</p>
              <h2 className="font-serif text-headline-lg text-navy mb-4">{s.heading}</h2>
              <p className="text-body text-text-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="py-12 border-t border-border">
          <p className="label-arch mb-3">Contact</p>
          <p className="text-body-sm text-text-secondary mb-3">
            Questions, feedback, or rate data corrections?
          </p>
          <a
            href="mailto:hello@estimato.in"
            className="font-mono text-sm text-navy hover:text-navy-muted transition-colors underline underline-offset-4"
          >
            hello@estimato.in
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white px-6 py-10 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <EstimateLogo size="lg" variant="dark" />
          <p className="font-mono text-[12px] text-text-secondary uppercase tracking-[0.14em]">
            © {new Date().getFullYear()} Estimato · estimato.in
          </p>
        </div>
      </footer>

    </div>
  );
}
