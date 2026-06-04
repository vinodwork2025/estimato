export const runtime = "edge";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan your home build",
  description:
    "Get an honest construction cost estimate in 5 steps. No contractor pitch, no upsell.",
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {children}
    </div>
  );
}
