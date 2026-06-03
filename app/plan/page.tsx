export const runtime = "edge";

import { PlannerWizard } from "@/components/planner/PlannerWizard";

interface PlanPageProps {
  searchParams: {
    city?: string;
    type?: string;
    length?: string;
    width?: string;
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
      defaultPlotL={searchParams.length}
      defaultPlotW={searchParams.width}
      sourcePage={searchParams.from}
      ctaVariant={searchParams.ctaVariant}
      partnerId={searchParams.partnerId}
    />
  );
}
