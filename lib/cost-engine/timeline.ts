import type { PlannerInput, Phase } from "@/types";

type TimelineResult = { phases: Phase[]; totalDays: number };

const BASE_PHASES = [
  {
    name: "Foundation",
    baseDays: 20,
    costShare: 0.1,
    paymentPercent: 10,
    description:
      "Soil testing, excavation, footings, and foundation laying. Payment linked to completion of plinth.",
  },
  {
    name: "Structure",
    baseDays: 45,
    costShare: 0.32,
    paymentPercent: 30,
    description:
      "Columns, beams, slabs, and structural work floor by floor. Largest single cost phase.",
  },
  {
    name: "Brickwork & Plaster",
    baseDays: 20,
    costShare: 0.16,
    paymentPercent: 15,
    description:
      "Walls, plaster, waterproofing, and rough electrical and plumbing lines.",
  },
  {
    name: "Finishing",
    baseDays: 60,
    costShare: 0.42,
    paymentPercent: 45,
    description:
      "Flooring, doors, windows, painting, fixtures, electrical fit-out, and interiors.",
  },
];

export function generateTimeline(
  input: PlannerInput,
  totalCost: number
): TimelineResult {
  let durationMultiplier = 1;

  if (input.configuration.floors > 1) {
    durationMultiplier += 0.15 * (input.configuration.floors - 1);
  }
  if (input.configuration.basement) {
    durationMultiplier += 0.15;
  }
  if (input.qualityTier === "luxury") {
    durationMultiplier += 0.1;
  }

  const phases: Phase[] = BASE_PHASES.map((p) => ({
    name: p.name,
    durationDays: Math.round(p.baseDays * durationMultiplier),
    cost: Math.round(totalCost * p.costShare),
    description: p.description,
    paymentPercent: p.paymentPercent,
  }));

  const totalDays = phases.reduce((sum, p) => sum + p.durationDays, 0);

  return { phases, totalDays };
}
