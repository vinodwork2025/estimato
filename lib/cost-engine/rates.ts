import type { QualityTier } from "@/types";

/**
 * BASE CONSTRUCTION RATES (Hosur 2026 baseline)
 * Includes: Civil structure + basic finishes
 * Excludes: Interior work, modular kitchens, furniture, appliances
 * Source: Verified with Design Intend project BOQ analysis, January 2026
 * Review cycle: Quarterly
 */
export const HOSUR_BASE_RATES: Record<QualityTier, number> = {
  essential: 1750,
  economy: 1950,
  premium: 2050,
  luxury: 2600,
} as const;

/**
 * CITY MULTIPLIERS (relative to Hosur baseline)
 * Reflects: Labour rates, material logistics, regulatory cost variations
 */
export const CITY_MULTIPLIERS: Record<string, number> = {
  hosur: 1.0,
  krishnagiri: 0.96,
  attibele: 0.97,
  bagalur: 0.98,
  anekal: 1.0,
  sarjapura: 1.05,
  devanahalli: 1.03,
  yelahanka: 1.07,
  "bengaluru-rural": 1.05,
  "electronic-city": 1.1,
  "bengaluru-urban": 1.13,
  whitefield: 1.13,
} as const;

export function getBaseRate(city: string, tier: QualityTier): number {
  const cityMult = CITY_MULTIPLIERS[city.toLowerCase()] ?? 1.0;
  const tierRate = HOSUR_BASE_RATES[tier];
  return Math.round(tierRate * cityMult);
}

/**
 * INTERIOR RATES (₹ per sqft of built-up area)
 */
export const INTERIOR_RATES: Record<string, number> = {
  basic: 450,
  modular: 850,
  premium: 1400,
  "luxury-furnished": 2200,
} as const;

/**
 * CONFIGURATION MODIFIERS (additive percentages on civil cost)
 */
export const CONFIG_MODIFIERS = {
  perAdditionalFloor: 0.04,
  basement: 0.22,
  parkingStilt: 0.06,
  parkingCovered: 0.03,
  cornerPlot: 0.06,
  soilBlackCotton: 0.09,
  soilRocky: 0.05,
  slopeSteep: 0.07,
  slopeMild: 0.02,
} as const;

/**
 * FIXED ADDITIONS (₹)
 */
export const FIXED_ADDITIONS = {
  lift: 650000,
  homeOffice: 180000,
  rentalFloor: 95000,
} as const;

/**
 * COST BREAKDOWN PERCENTAGES (of total civil cost)
 */
export const COST_BREAKDOWN = {
  civilStructure: 0.42,
  finishes: 0.26,
  mep: 0.14,
  elevation: 0.08,
  approvalsAndFees: 0.04,
  contingency: 0.06,
} as const;
