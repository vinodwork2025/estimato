import type { Metadata } from "next";
import Link from "next/link";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Estimato",
  description:
    "Estimato is a home construction cost planning platform for Indian homeowners. Honest numbers. No contractor pitch.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="border-b border-border bg-white px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <EstimateLogo size="md" />
          </Link>
          <Link href="/plan">
            <Button variant="primary" size="sm">Start planning</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl text-text-primary mb-6">About Estimato</h1>

        <div className="prose text-text-secondary space-y-6">
          <p className="text-lg leading-relaxed">
            Estimato helps Indian homeowners figure out what their home will actually cost — before they
            talk to a single contractor.
          </p>

          <p className="leading-relaxed">
            Most cost estimates you get from contractors are designed to win the job. They start low
            and grow. By the time the real number arrives, you have already committed emotionally and
            financially.
          </p>

          <p className="leading-relaxed">
            Estimato works the other way. You come in with a clear budget expectation. You know the
            range. You know what drives the cost. You know what people forget to include. Then you go
            talk to architects.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-10 mb-3">How we earn</h2>
          <p className="leading-relaxed">
            Estimato is free for homeowners. We earn revenue from verified architecture and construction
            firms who pay a fixed fee per qualified consultation lead. We do not earn commissions on
            project value. This keeps our incentives aligned with giving you honest numbers.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-10 mb-3">Where our rates come from</h2>
          <p className="leading-relaxed">
            Our base rates are verified against real project BOQs from Design Intend&apos;s construction
            work in Hosur and surrounding areas as of January 2026. We update rates quarterly. City
            multipliers are based on labour cost surveys and material logistics data.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-10 mb-3">Our founding partner</h2>
          <p className="leading-relaxed">
            Design Intend is our founding partner, covering Hosur, Sarjapura, Attibele, Bagalur, and
            Krishnagiri for the first 12 months. Founded by Ar. Chittrarasan, with experience at Gensler
            on Chase Bank, Starbucks, and GMFI projects.
          </p>

          <div className="mt-10 pt-10 border-t border-border">
            <p className="text-text-secondary mb-4">Questions or feedback?</p>
            <a
              href="mailto:hello@estimato.in"
              className="text-accent underline hover:no-underline"
            >
              hello@estimato.in
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-white px-4 py-8 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Estimato · estimato.in
          </p>
        </div>
      </footer>
    </div>
  );
}
