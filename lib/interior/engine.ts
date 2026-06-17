// Pure cost engine — no React imports, fully unit-testable.
import type { InteriorInput, CalcResult, CostRange, CategoryCost } from "./types";
import {
  CITY_MULTIPLIERS,
  AREA_RATES,
  MODULE_RATES,
  BHK_BEDROOMS,
  BHK_FURNITURE_MULTIPLIER,
  DESIGN_FEE,
  FALSE_CEILING_AREA_FACTOR,
} from "./rates";

function round1k(n: number): number {
  return Math.round(n / 1000) * 1000;
}

function scale(range: { min: number; max: number }, factor: number): CostRange {
  return { min: range.min * factor, max: range.max * factor };
}

function add(a: CostRange, b: CostRange): CostRange {
  return { min: a.min + b.min, max: a.max + b.max };
}

function areaRange(rateKey: keyof typeof AREA_RATES, tier: "basic" | "standard" | "premium", area: number, cityMul: number): CostRange {
  const r = AREA_RATES[rateKey][tier];
  return scale({ min: r.min * area, max: r.max * area }, cityMul);
}

function moduleRange(rateKey: keyof typeof MODULE_RATES, tier: "basic" | "standard" | "premium", count: number, cityMul: number): CostRange {
  const r = MODULE_RATES[rateKey][tier];
  return scale({ min: r.min * count, max: r.max * count }, cityMul);
}

export function computeInteriorCost(input: InteriorInput): CalcResult {
  if (input.finishLevel === "ultra-luxury") {
    return { isUltraLuxury: true };
  }

  const tier = input.finishLevel as "basic" | "standard" | "premium";
  const cityMul = CITY_MULTIPLIERS[input.city];
  const area = input.carpetArea;
  const scope = new Set(input.scope);
  const bedrooms = BHK_BEDROOMS[input.bhk] ?? 2;
  const furnitureMul = BHK_FURNITURE_MULTIPLIER[input.bhk] ?? 1.0;

  const categories: CategoryCost[] = [];
  let total: CostRange = { min: 0, max: 0 };

  function push(label: string, r: CostRange) {
    const rounded: CostRange = { min: round1k(r.min), max: round1k(r.max) };
    categories.push({ label, range: rounded });
    total = add(total, r);
  }

  // ── Part A: area-driven ──────────────────────────────────────────────────

  // Civil — bare-shell (full civil) or occupied (demolition)
  if (input.currentState === "bare-shell" || input.currentState === "occupied") {
    const label = input.currentState === "bare-shell" ? "Civil works" : "Demolition & civil";
    push(label, areaRange("civil", tier, area, cityMul));
  }

  // Electrical — always for bare-shell; toggle-gated otherwise
  if (input.currentState === "bare-shell" || scope.has("electrical")) {
    push("Electrical", areaRange("electrical", tier, area, cityMul));
  }

  // Flooring
  if (scope.has("flooring")) {
    push("Flooring", areaRange("flooring", tier, area, cityMul));
  }

  // Painting
  if (scope.has("painting")) {
    push("Painting", areaRange("painting", tier, area, cityMul));
  }

  // False ceiling — applied to 60% of carpet area
  if (scope.has("false-ceiling")) {
    push("False ceiling", areaRange("false-ceiling", tier, area * FALSE_CEILING_AREA_FACTOR, cityMul));
  }

  // ── Part B: modules ──────────────────────────────────────────────────────

  if (scope.has("modular-kitchen")) {
    push("Modular kitchen", moduleRange("modular-kitchen", tier, 1, cityMul));
  }

  if (scope.has("wardrobes")) {
    push(`Wardrobes (${bedrooms})`, moduleRange("wardrobes", tier, bedrooms, cityMul));
  }

  if (scope.has("tv-storage")) {
    push("TV & storage unit", moduleRange("tv-storage", tier, 1, cityMul));
  }

  if (scope.has("loose-furniture")) {
    push("Loose furniture", moduleRange("loose-furniture", tier, furnitureMul, cityMul));
  }

  if (scope.has("soft-furnishings")) {
    push("Soft furnishings & curtains", moduleRange("soft-furnishings", tier, 1, cityMul));
  }

  if (scope.has("lighting")) {
    push("Lighting fixtures", moduleRange("lighting", tier, 1, cityMul));
  }

  // Plumbing — bare-shell always; renovation only when kitchen is in scope
  const needsPlumbing =
    input.currentState === "bare-shell" ||
    (input.currentState === "occupied" && scope.has("modular-kitchen"));
  if (needsPlumbing) {
    push("Plumbing & services", moduleRange("plumbing", tier, 1, cityMul));
  }

  // ── Design & management fee ──────────────────────────────────────────────

  const hasModularOrFurniture =
    scope.has("modular-kitchen") ||
    scope.has("wardrobes") ||
    scope.has("tv-storage") ||
    scope.has("loose-furniture");

  let designFeeRange: CostRange | null = null;
  if (hasModularOrFurniture) {
    designFeeRange = {
      min: round1k(total.min * DESIGN_FEE.min),
      max: round1k(total.max * DESIGN_FEE.max),
    };
    total = add(total, designFeeRange);
  }

  const headline: CostRange = { min: round1k(total.min), max: round1k(total.max) };
  const perSqft: CostRange = {
    min: Math.round(headline.min / area),
    max: Math.round(headline.max / area),
  };

  return { isUltraLuxury: false, headline, perSqft, categories, designFeeRange };
}
