export const runtime = "edge";

import { PlannerWizard } from "@/components/planner/PlannerWizard";

interface PlanPageProps {
  searchParams: {
    city?: string;
    type?: string;
    from?: string;
    ctaVariant?: "primary" | "secondary";
    partnerId?: string;
  };
}

export default function PlanPage({ searchParams }: PlanPageProps) {
  return (
    <PlannerWizard
      defaultCity={searchParams.city}
      defaultHomeType={searchParams.type}
      sourcePage={searchParams.from}
      ctaVariant={searchParams.ctaVariant}
      partnerId={searchParams.partnerId}
    />
  );
}
