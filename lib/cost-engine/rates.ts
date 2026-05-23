/**
 * BASE CONSTRUCTION RATES — Hosur 2026 baseline
 * Source: Design Intend project BOQ analysis, verified May 2026
 * Review cycle: Quarterly
 */
export const TIER_RATES: Record<string, { min: number; max: number; mid: number }> = {
  basic:         { min: 1850, max: 2050, mid: 1950 },
  standard:      { min: 2100, max: 2400, mid: 2250 },
  premium:       { min: 2500, max: 2900, mid: 2700 },
  luxury:        { min: 3000, max: 4000, mid: 3500 },
  "ultra-luxury": { min: 5000, max: 5000, mid: 5000 },
};

/**
 * LIVE CITIES with multipliers relative to Hosur baseline
 */
export const CITY_RATES = [
  {
    id: "hosur",
    name: "Hosur",
    multiplier: 1.00,
    status: "live" as const,
    region: "Tamil Nadu",
  },
  {
    id: "bangalore-outskirts",
    name: "Bangalore Outskirts",
    subtitle: "Sarjapura, Anekal, Whitefield, Devanahalli",
    multiplier: 1.15,
    status: "live" as const,
    region: "Karnataka",
  },
  {
    id: "bangalore-urban",
    name: "Bangalore Urban",
    subtitle: "Indiranagar, Koramangala, JP Nagar, Hebbal",
    multiplier: 1.25,
    status: "live" as const,
    region: "Karnataka",
  },
];

export const COMING_SOON_CITIES = [
  "Chennai",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi NCR",
];

export function getCityMultiplier(cityId: string): number {
  const city = CITY_RATES.find((c) => c.id === cityId.toLowerCase());
  return city?.multiplier ?? 1.0;
}

export function getBaseRate(city: string, tier: string): number {
  const mult = getCityMultiplier(city);
  const tierRates = TIER_RATES[tier] ?? TIER_RATES.standard;
  return Math.round(tierRates.mid * mult);
}

export function getBaseRateRange(city: string, tier: string): { min: number; max: number } {
  const mult = getCityMultiplier(city);
  const tierRates = TIER_RATES[tier] ?? TIER_RATES.standard;
  return {
    min: Math.round(tierRates.min * mult),
    max: Math.round(tierRates.max * mult),
  };
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
