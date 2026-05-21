import type { Metadata } from "next";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plan your home build",
  description:
    "Get an honest construction cost estimate in 7 steps. No contractor pitch, no upsell.",
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <header className="sticky top-0 z-30 bg-bg-primary border-b border-border">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" aria-label="Estimato home">
            <EstimateLogo size="sm" variant="mark" />
          </Link>
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.18em]">
            Free · No sign-up
          </span>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
