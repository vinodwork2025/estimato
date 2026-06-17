// Interior cost rates — the ONLY place rate numbers live.
// Source: 2025-26 assumptions. Validate against Design Intend BOQs before launch.
import type { City, FinishLevel } from "./types";

export type Tier = Exclude<FinishLevel, "ultra-luxury">;
export interface MinMax { min: number; max: number }

// City multipliers. Tune against Design Intend BOQs before launch.
export const CITY_MULTIPLIERS: Record<City, number> = {
  "hosur":               0.92,
  "bangalore-outskirts": 0.98,
  "bangalore-urban":     1.08,
};

export const CITY_LABELS: Record<City, string> = {
  "hosur":               "Hosur",
  "bangalore-outskirts": "Bangalore Outskirts",
  "bangalore-urban":     "Bangalore Urban",
};

// Cities for which the "verified" credibility claim is authorised.
// TODO: When adding a new city, add it here only after verifying against real BOQs.
export const VERIFIED_CITIES: City[] = ["hosur", "bangalore-outskirts", "bangalore-urban"];

export const CREDIBILITY_LINES: Record<City, string> = {
  "hosur":
    "Interior rates built from real project data and verified against current Hosur designer quotes, 2026.",
  "bangalore-outskirts":
    "Interior rates built from real project data and verified against current Bangalore designer quotes, 2026.",
  "bangalore-urban":
    "Interior rates built from real project data and verified against current Bangalore designer quotes, 2026.",
  // TODO: For future cities outside VERIFIED_CITIES, use a softer line without "verified":
  // "Interior rates are indicative estimates for {city}. Rates are not yet verified against local BOQs."
};

// Part A — area-driven rates (₹ per sqft of carpet area).
// Source: 2025-26 assumptions. Validate against Design Intend BOQs before launch.
export const AREA_RATES: Record<
  "civil" | "electrical" | "flooring" | "painting" | "false-ceiling",
  Record<Tier, MinMax>
> = {
  civil: {
    basic:    { min: 50,  max: 110 },
    standard: { min: 80,  max: 150 },
    premium:  { min: 120, max: 220 },
  },
  electrical: {
    basic:    { min: 90,  max: 150 },
    standard: { min: 130, max: 220 },
    premium:  { min: 200, max: 320 },
  },
  flooring: {
    basic:    { min: 80,  max: 150 },
    standard: { min: 150, max: 300 },
    premium:  { min: 300, max: 600 },
  },
  painting: {
    basic:    { min: 25,  max: 45  },
    standard: { min: 40,  max: 75  },
    premium:  { min: 70,  max: 130 },
  },
  "false-ceiling": {
    basic:    { min: 70,  max: 110 },
    standard: { min: 100, max: 160 },
    premium:  { min: 150, max: 260 },
  },
};

// Part B — module / furniture rates (₹ per unit).
// Source: 2025-26 assumptions. Validate against Design Intend BOQs before launch.
export const MODULE_RATES: Record<
  | "modular-kitchen"
  | "wardrobes"
  | "tv-storage"
  | "loose-furniture"
  | "soft-furnishings"
  | "lighting"
  | "plumbing",
  Record<Tier, MinMax>
> = {
  "modular-kitchen": {
    basic:    { min: 150_000, max: 250_000 },
    standard: { min: 250_000, max: 450_000 },
    premium:  { min: 450_000, max: 900_000 },
  },
  wardrobes: {
    basic:    { min:  60_000, max: 110_000 },
    standard: { min: 110_000, max: 200_000 },
    premium:  { min: 200_000, max: 380_000 },
  },
  "tv-storage": {
    basic:    { min:  40_000, max:  80_000 },
    standard: { min:  80_000, max: 150_000 },
    premium:  { min: 150_000, max: 300_000 },
  },
  "loose-furniture": {
    basic:    { min:  80_000, max: 150_000 },
    standard: { min: 150_000, max: 300_000 },
    premium:  { min: 300_000, max: 600_000 },
  },
  "soft-furnishings": {
    basic:    { min:  40_000, max:  90_000 },
    standard: { min:  90_000, max: 160_000 },
    premium:  { min: 160_000, max: 320_000 },
  },
  lighting: {
    basic:    { min:  35_000, max:  80_000 },
    standard: { min:  80_000, max: 150_000 },
    premium:  { min: 150_000, max: 300_000 },
  },
  plumbing: {
    basic:    { min:  40_000, max:  80_000 },
    standard: { min:  70_000, max: 120_000 },
    premium:  { min: 110_000, max: 200_000 },
  },
};

// BHK → bedroom count (drives wardrobe count).
export const BHK_BEDROOMS: Record<string, number> = {
  "1": 1, "2": 2, "3": 3, "4": 4, "5+": 5,
};

// Loose furniture scales with BHK size relative to a 2BHK baseline.
export const BHK_FURNITURE_MULTIPLIER: Record<string, number> = {
  "1": 0.7, "2": 1.0, "3": 1.4, "4": 1.8, "5+": 2.2,
};

// Design & management fee fraction — applied when modular or furniture scope is selected.
export const DESIGN_FEE = { min: 0.08, max: 0.12 };

// False ceiling applies to 60% of carpet area (accounts for rooms without it).
export const FALSE_CEILING_AREA_FACTOR = 0.6;
