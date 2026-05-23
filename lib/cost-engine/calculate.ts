import type { PlannerInput, CalculationResult } from "@/types";
import {
  getBaseRate,
  getBaseRateRange,
  INTERIOR_RATES,
  CONFIG_MODIFIERS,
  FIXED_ADDITIONS,
  COST_BREAKDOWN,
} from "./rates";
import { generateTimeline } from "./timeline";
import { generateWarnings } from "./warnings";
import { generateInsights } from "./insights";

function applyConfigModifiers(input: PlannerInput, baseCivilCost: number): number {
  let modifierTotal = 0;

  if (input.configuration.floors > 1) {
    modifierTotal += CONFIG_MODIFIERS.perAdditionalFloor * (input.configuration.floors - 1);
  }
  if (input.configuration.basement) modifierTotal += CONFIG_MODIFIERS.basement;
  if (input.configuration.parking === "stilt") modifierTotal += CONFIG_MODIFIERS.parkingStilt;
  if (input.configuration.parking === "covered") modifierTotal += CONFIG_MODIFIERS.parkingCovered;
  if (input.plot.cornerPlot) modifierTotal += CONFIG_MODIFIERS.cornerPlot;
  if (input.plot.soilType === "black-cotton") modifierTotal += CONFIG_MODIFIERS.soilBlackCotton;
  if (input.plot.soilType === "rocky") modifierTotal += CONFIG_MODIFIERS.soilRocky;
  if (input.plot.slope === "steep") modifierTotal += CONFIG_MODIFIERS.slopeSteep;
  if (input.plot.slope === "mild") modifierTotal += CONFIG_MODIFIERS.slopeMild;

  let civil = baseCivilCost * (1 + modifierTotal);

  if (input.configuration.lift) civil += FIXED_ADDITIONS.lift;
  if (input.configuration.homeOffice) civil += FIXED_ADDITIONS.homeOffice;
  if (input.configuration.rentalFloor) civil += FIXED_ADDITIONS.rentalFloor;

  return civil;
}

function calculateScenario(input: PlannerInput): number {
  const baseRate = getBaseRate(input.city, input.qualityTier);
  const baseCivilCost = input.configuration.builtUpArea * baseRate;
  const civilCost = applyConfigModifiers(input, baseCivilCost);
  const interiorCost = input.configuration.builtUpArea * INTERIOR_RATES[input.interiorLevel];
  return civilCost + interiorCost;
}

export function calculate(input: PlannerInput): CalculationResult {
  const isCustomQuote = input.qualityTier === "ultra-luxury";
  const rateRange = getBaseRateRange(input.city, input.qualityTier);

  const baseCivilLow = input.configuration.builtUpArea * rateRange.min;
  const baseCivilHigh = input.configuration.builtUpArea * rateRange.max;

  const civilLow = applyConfigModifiers(input, baseCivilLow);
  const civilHigh = applyConfigModifiers(input, baseCivilHigh);

  const interiorCost =
    input.configuration.builtUpArea * INTERIOR_RATES[input.interiorLevel];

  const totalMin = Math.round(civilLow + interiorCost);
  const totalMax = Math.round(civilHigh + interiorCost);
  const totalMid = Math.round((totalMin + totalMax) / 2);

  // Use mid civil cost for breakdown
  const civilMid = (civilLow + civilHigh) / 2;

  const breakdown = {
    civilStructure: Math.round(civilMid * COST_BREAKDOWN.civilStructure),
    finishes: Math.round(civilMid * COST_BREAKDOWN.finishes),
    interiors: Math.round(interiorCost),
    mep: Math.round(civilMid * COST_BREAKDOWN.mep),
    elevation: Math.round(civilMid * COST_BREAKDOWN.elevation),
    approvalsAndFees: Math.round(civilMid * COST_BREAKDOWN.approvalsAndFees),
    contingency: Math.round(civilMid * COST_BREAKDOWN.contingency),
  };

  const comparisonScenarios = {
    basic:    Math.round(calculateScenario({ ...input, qualityTier: "basic" })),
    standard: Math.round(calculateScenario({ ...input, qualityTier: "standard" })),
    premium:  Math.round(calculateScenario({ ...input, qualityTier: "premium" })),
    luxury:   Math.round(calculateScenario({ ...input, qualityTier: "luxury" })),
  };

  const timeline = generateTimeline(input, totalMid);
  const hiddenCostWarnings = generateWarnings(input);
  const smartInsights = generateInsights(input);

  return {
    totalRange: { min: totalMin, max: totalMax, mid: totalMid },
    costPerSqft: Math.round(totalMid / input.configuration.builtUpArea),
    timeline,
    breakdown,
    hiddenCostWarnings,
    smartInsights,
    recommendedContingency: Math.round(totalMid * 0.08),
    comparisonScenarios,
    isCustomQuote,
  };
}
