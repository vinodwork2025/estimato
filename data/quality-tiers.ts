import type { QualityTier } from "@/types";
import { HOSUR_BASE_RATES } from "@/lib/cost-engine/rates";

export const QUALITY_TIERS: {
  value: QualityTier;
  label: string;
  tagline: string;
  materials: string;
  baseRate: number;
}[] = [
  {
    value: "essential",
    label: "Essential",
    tagline: "Functional, durable, no frills",
    materials: "Local tiles, standard sanitary, basic electricals",
    baseRate: HOSUR_BASE_RATES.essential,
  },
  {
    value: "economy",
    label: "Economy",
    tagline: "Standard build, smart material choices",
    materials: "Kajaria flooring, Hindware sanitary, Anchor switches",
    baseRate: HOSUR_BASE_RATES.economy,
  },
  {
    value: "premium",
    label: "Premium",
    tagline: "Better finishes, branded fittings",
    materials: "Somany Duragres, Jaquar fittings, Legrand switches",
    baseRate: HOSUR_BASE_RATES.premium,
  },
  {
    value: "luxury",
    label: "Luxury",
    tagline: "Architect-grade, top-tier materials",
    materials: "Italian marble, Kohler sanitary, Schneider electrics",
    baseRate: HOSUR_BASE_RATES.luxury,
  },
];
