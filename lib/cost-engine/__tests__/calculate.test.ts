import { describe, it, expect } from "vitest";
import { calculate } from "../calculate";
import { getBaseRate, TIER_RATES } from "../rates";
import type { PlannerInput, QualityTier } from "@/types";

const BASE_INPUT: PlannerInput = {
  homeType: "villa",
  city: "hosur",
  plot: {
    length: 40,
    width: 30,
    facing: "north",
    cornerPlot: false,
    roadWidth: 30,
    soilType: "red",
    slope: "flat",
  },
  configuration: {
    floors: 1,
    builtUpArea: 1500,
    parking: "none",
    terrace: false,
    balconies: 0,
    lift: false,
    basement: false,
    homeOffice: false,
    rentalFloor: false,
  },
  qualityTier: "standard",
  interiorLevel: "modular",
};

// --- Helper ---
function input(overrides: Partial<PlannerInput> = {}): PlannerInput {
  return { ...BASE_INPUT, ...overrides };
}

function inputWithConfig(
  configOverrides: Partial<PlannerInput["configuration"]>
): PlannerInput {
  return {
    ...BASE_INPUT,
    configuration: { ...BASE_INPUT.configuration, ...configOverrides },
  };
}

function inputWithPlot(
  plotOverrides: Partial<PlannerInput["plot"]>
): PlannerInput {
  return {
    ...BASE_INPUT,
    plot: { ...BASE_INPUT.plot, ...plotOverrides },
  };
}

// ====================
// RATE TABLE TESTS
// ====================

describe("getBaseRate", () => {
  it("returns Hosur standard rate unchanged", () => {
    expect(getBaseRate("hosur", "standard")).toBe(
      Math.round(TIER_RATES.standard.mid * 1.0)
    );
  });

  it("applies city multiplier for bangalore-urban", () => {
    const expected = Math.round(TIER_RATES.premium.mid * 1.25);
    expect(getBaseRate("bangalore-urban", "premium")).toBe(expected);
  });

  it("applies bangalore-outskirts multiplier (1.15) correctly", () => {
    const expected = Math.round(TIER_RATES.basic.mid * 1.15);
    expect(getBaseRate("bangalore-outskirts", "basic")).toBe(expected);
  });

  it("falls back to 1.0 multiplier for unknown city", () => {
    const expected = Math.round(TIER_RATES.standard.mid * 1.0);
    expect(getBaseRate("unknown-city", "standard")).toBe(expected);
  });

  it("is case-insensitive for city lookup", () => {
    expect(getBaseRate("Hosur", "standard")).toBe(getBaseRate("hosur", "standard"));
  });
});

// ====================
// MINIMUM INPUT TESTS
// ====================

describe("calculate - minimum input", () => {
  it("produces a result for smallest valid input", () => {
    const result = calculate(
      inputWithConfig({ builtUpArea: 800, floors: 1 })
    );
    expect(result.totalRange.mid).toBeGreaterThan(0);
    expect(result.costPerSqft).toBeGreaterThan(0);
  });

  it("min is less than mid", () => {
    const result = calculate(BASE_INPUT);
    expect(result.totalRange.min).toBeLessThan(result.totalRange.mid);
  });

  it("max is greater than mid", () => {
    const result = calculate(BASE_INPUT);
    expect(result.totalRange.max).toBeGreaterThan(result.totalRange.mid);
  });

  it("mid is average of min and max", () => {
    const result = calculate(BASE_INPUT);
    const expected = Math.round((result.totalRange.min + result.totalRange.max) / 2);
    expect(result.totalRange.mid).toBe(expected);
  });
});

// ====================
// QUALITY TIER × CITY
// ====================

describe("calculate - quality tier x city combinations", () => {
  const tiers: QualityTier[] = ["basic", "standard", "premium", "luxury"];
  const cities = ["hosur", "bangalore-outskirts", "bangalore-urban"];

  for (const tier of tiers) {
    for (const city of cities) {
      it(`produces positive result for ${tier} in ${city}`, () => {
        const result = calculate(input({ qualityTier: tier, city }));
        expect(result.totalRange.mid).toBeGreaterThan(0);
      });
    }
  }

  it("luxury costs more than premium same city", () => {
    const premium = calculate(input({ qualityTier: "premium" }));
    const luxury = calculate(input({ qualityTier: "luxury" }));
    expect(luxury.totalRange.mid).toBeGreaterThan(premium.totalRange.mid);
  });

  it("premium costs more than standard same city", () => {
    const standard = calculate(input({ qualityTier: "standard" }));
    const premium = calculate(input({ qualityTier: "premium" }));
    expect(premium.totalRange.mid).toBeGreaterThan(standard.totalRange.mid);
  });

  it("standard costs more than basic same city", () => {
    const basic = calculate(input({ qualityTier: "basic" }));
    const standard = calculate(input({ qualityTier: "standard" }));
    expect(standard.totalRange.mid).toBeGreaterThan(basic.totalRange.mid);
  });

  it("bangalore-urban costs more than hosur (same tier)", () => {
    const hosur = calculate(input({ city: "hosur" }));
    const bengaluru = calculate(input({ city: "bangalore-urban" }));
    expect(bengaluru.totalRange.mid).toBeGreaterThan(hosur.totalRange.mid);
  });

  it("bangalore-outskirts costs more than hosur (same tier)", () => {
    const hosur = calculate(input({ city: "hosur" }));
    const outskirts = calculate(input({ city: "bangalore-outskirts" }));
    expect(outskirts.totalRange.mid).toBeGreaterThan(hosur.totalRange.mid);
  });
});

// ====================
// ULTRA LUXURY
// ====================

describe("calculate - ultra-luxury tier", () => {
  it("sets isCustomQuote = true", () => {
    const result = calculate(input({ qualityTier: "ultra-luxury", interiorLevel: "luxury-furnished" }));
    expect(result.isCustomQuote).toBe(true);
  });

  it("ultra-luxury costs more than luxury", () => {
    const luxury = calculate(input({ qualityTier: "luxury", interiorLevel: "luxury-furnished" }));
    const ultra = calculate(input({ qualityTier: "ultra-luxury", interiorLevel: "luxury-furnished" }));
    expect(ultra.totalRange.mid).toBeGreaterThan(luxury.totalRange.mid);
  });

  it("basic tier isCustomQuote is false or undefined", () => {
    const result = calculate(input({ qualityTier: "basic" }));
    expect(result.isCustomQuote).toBeFalsy();
  });
});

// ====================
// SOIL TYPE TESTS
// ====================

describe("calculate - soil type modifiers", () => {
  it("black-cotton soil costs more than red soil", () => {
    const red = calculate(inputWithPlot({ soilType: "red" }));
    const black = calculate(inputWithPlot({ soilType: "black-cotton" }));
    expect(black.totalRange.mid).toBeGreaterThan(red.totalRange.mid);
  });

  it("rocky soil costs more than red soil", () => {
    const red = calculate(inputWithPlot({ soilType: "red" }));
    const rocky = calculate(inputWithPlot({ soilType: "rocky" }));
    expect(rocky.totalRange.mid).toBeGreaterThan(red.totalRange.mid);
  });

  it("unknown soil has no modifier (same as red)", () => {
    const red = calculate(inputWithPlot({ soilType: "red" }));
    const unknown = calculate(inputWithPlot({ soilType: "unknown" }));
    expect(unknown.totalRange.mid).toBe(red.totalRange.mid);
  });

  it("sandy soil has no modifier (same as red)", () => {
    const red = calculate(inputWithPlot({ soilType: "red" }));
    const sandy = calculate(inputWithPlot({ soilType: "sandy" }));
    expect(sandy.totalRange.mid).toBe(red.totalRange.mid);
  });

  it("black-cotton costs more than rocky", () => {
    const rocky = calculate(inputWithPlot({ soilType: "rocky" }));
    const black = calculate(inputWithPlot({ soilType: "black-cotton" }));
    expect(black.totalRange.mid).toBeGreaterThan(rocky.totalRange.mid);
  });
});

// ====================
// SLOPE TESTS
// ====================

describe("calculate - slope modifiers", () => {
  it("steep slope costs more than flat", () => {
    const flat = calculate(inputWithPlot({ slope: "flat" }));
    const steep = calculate(inputWithPlot({ slope: "steep" }));
    expect(steep.totalRange.mid).toBeGreaterThan(flat.totalRange.mid);
  });

  it("mild slope costs more than flat", () => {
    const flat = calculate(inputWithPlot({ slope: "flat" }));
    const mild = calculate(inputWithPlot({ slope: "mild" }));
    expect(mild.totalRange.mid).toBeGreaterThan(flat.totalRange.mid);
  });

  it("steep costs more than mild", () => {
    const mild = calculate(inputWithPlot({ slope: "mild" }));
    const steep = calculate(inputWithPlot({ slope: "steep" }));
    expect(steep.totalRange.mid).toBeGreaterThan(mild.totalRange.mid);
  });
});

// ====================
// CONFIGURATION TOGGLES
// ====================

describe("calculate - configuration toggles", () => {
  it("lift adds ₹6,50,000 to cost", () => {
    const base = calculate(inputWithConfig({ lift: false }));
    const withLift = calculate(inputWithConfig({ lift: true }));
    expect(withLift.totalRange.mid - base.totalRange.mid).toBe(650000);
  });

  it("homeOffice adds ₹1,80,000 to cost", () => {
    const base = calculate(inputWithConfig({ homeOffice: false }));
    const withOffice = calculate(inputWithConfig({ homeOffice: true }));
    expect(withOffice.totalRange.mid - base.totalRange.mid).toBe(180000);
  });

  it("rentalFloor adds ₹95,000 to cost", () => {
    const base = calculate(inputWithConfig({ rentalFloor: false }));
    const withRental = calculate(inputWithConfig({ rentalFloor: true }));
    expect(withRental.totalRange.mid - base.totalRange.mid).toBe(95000);
  });

  it("basement increases cost", () => {
    const base = calculate(inputWithConfig({ basement: false }));
    const withBasement = calculate(inputWithConfig({ basement: true }));
    expect(withBasement.totalRange.mid).toBeGreaterThan(base.totalRange.mid);
  });

  it("stilt parking costs more than no parking", () => {
    const none = calculate(inputWithConfig({ parking: "none" }));
    const stilt = calculate(inputWithConfig({ parking: "stilt" }));
    expect(stilt.totalRange.mid).toBeGreaterThan(none.totalRange.mid);
  });

  it("covered parking costs more than no parking", () => {
    const none = calculate(inputWithConfig({ parking: "none" }));
    const covered = calculate(inputWithConfig({ parking: "covered" }));
    expect(covered.totalRange.mid).toBeGreaterThan(none.totalRange.mid);
  });

  it("stilt parking costs more than covered parking", () => {
    const covered = calculate(inputWithConfig({ parking: "covered" }));
    const stilt = calculate(inputWithConfig({ parking: "stilt" }));
    expect(stilt.totalRange.mid).toBeGreaterThan(covered.totalRange.mid);
  });

  it("additional floor increases cost", () => {
    const g = calculate(inputWithConfig({ floors: 1 }));
    const gPlus1 = calculate(inputWithConfig({ floors: 2 }));
    expect(gPlus1.totalRange.mid).toBeGreaterThan(g.totalRange.mid);
  });

  it("corner plot costs more than non-corner", () => {
    const normal = calculate(inputWithPlot({ cornerPlot: false }));
    const corner = calculate(inputWithPlot({ cornerPlot: true }));
    expect(corner.totalRange.mid).toBeGreaterThan(normal.totalRange.mid);
  });
});

// ====================
// BREAKDOWN SUM
// ====================

describe("calculate - breakdown sum verification", () => {
  it("breakdown components are all positive", () => {
    const result = calculate(BASE_INPUT);
    const b = result.breakdown;
    expect(b.civilStructure).toBeGreaterThan(0);
    expect(b.finishes).toBeGreaterThan(0);
    expect(b.interiors).toBeGreaterThan(0);
    expect(b.mep).toBeGreaterThan(0);
    expect(b.elevation).toBeGreaterThan(0);
    expect(b.approvalsAndFees).toBeGreaterThan(0);
    expect(b.contingency).toBeGreaterThan(0);
  });

  it("breakdown sum is within 5% of total mid (rounding tolerance)", () => {
    const result = calculate(BASE_INPUT);
    const b = result.breakdown;
    const breakdownTotal =
      b.civilStructure + b.finishes + b.interiors + b.mep + b.elevation + b.approvalsAndFees + b.contingency;
    const diff = Math.abs(breakdownTotal - result.totalRange.mid);
    expect(diff / result.totalRange.mid).toBeLessThan(0.05);
  });
});

// ====================
// COMPARISON SCENARIO MONOTONICITY
// ====================

describe("calculate - scenario comparison monotonicity", () => {
  it("scenarios are in ascending order: basic < standard < premium < luxury", () => {
    const result = calculate(BASE_INPUT);
    const s = result.comparisonScenarios;
    expect(s.basic).toBeLessThan(s.standard);
    expect(s.standard).toBeLessThan(s.premium);
    expect(s.premium).toBeLessThan(s.luxury);
  });

  it("all scenario values are positive", () => {
    const result = calculate(BASE_INPUT);
    const s = result.comparisonScenarios;
    expect(s.basic).toBeGreaterThan(0);
    expect(s.standard).toBeGreaterThan(0);
    expect(s.premium).toBeGreaterThan(0);
    expect(s.luxury).toBeGreaterThan(0);
  });
});

// ====================
// TIMELINE TESTS
// ====================

describe("calculate - timeline", () => {
  it("produces 4 phases", () => {
    const result = calculate(BASE_INPUT);
    expect(result.timeline.phases).toHaveLength(4);
  });

  it("total days is sum of phase days", () => {
    const result = calculate(BASE_INPUT);
    const sum = result.timeline.phases.reduce((acc, p) => acc + p.durationDays, 0);
    expect(result.timeline.totalDays).toBe(sum);
  });

  it("payment percentages sum to 100", () => {
    const result = calculate(BASE_INPUT);
    const sum = result.timeline.phases.reduce((acc, p) => acc + p.paymentPercent, 0);
    expect(sum).toBe(100);
  });

  it("multi-floor build takes longer than single floor", () => {
    const g = calculate(inputWithConfig({ floors: 1 }));
    const gPlus2 = calculate(inputWithConfig({ floors: 3 }));
    expect(gPlus2.timeline.totalDays).toBeGreaterThan(g.timeline.totalDays);
  });

  it("basement build takes longer", () => {
    const noBasement = calculate(inputWithConfig({ basement: false }));
    const withBasement = calculate(inputWithConfig({ basement: true }));
    expect(withBasement.timeline.totalDays).toBeGreaterThan(noBasement.timeline.totalDays);
  });

  it("luxury tier build takes longer than basic", () => {
    const basic = calculate(input({ qualityTier: "basic" }));
    const luxury = calculate(input({ qualityTier: "luxury" }));
    expect(luxury.timeline.totalDays).toBeGreaterThan(basic.timeline.totalDays);
  });
});

// ====================
// CONTINGENCY
// ====================

describe("calculate - contingency", () => {
  it("recommended contingency is ~8% of mid total", () => {
    const result = calculate(BASE_INPUT);
    expect(result.recommendedContingency).toBeCloseTo(result.totalRange.mid * 0.08, -3);
  });

  it("contingency is positive", () => {
    const result = calculate(BASE_INPUT);
    expect(result.recommendedContingency).toBeGreaterThan(0);
  });
});

// ====================
// WARNINGS AND INSIGHTS
// ====================

describe("calculate - warnings and insights", () => {
  it("returns at most 5 warnings", () => {
    const result = calculate(BASE_INPUT);
    expect(result.hiddenCostWarnings.length).toBeLessThanOrEqual(5);
  });

  it("returns at least 1 warning", () => {
    const result = calculate(BASE_INPUT);
    expect(result.hiddenCostWarnings.length).toBeGreaterThanOrEqual(1);
  });

  it("returns at most 4 insights", () => {
    const result = calculate(BASE_INPUT);
    expect(result.smartInsights.length).toBeLessThanOrEqual(4);
  });

  it("returns at least 1 insight", () => {
    const result = calculate(BASE_INPUT);
    expect(result.smartInsights.length).toBeGreaterThanOrEqual(1);
  });

  it("hosur city gets borewell warning", () => {
    const result = calculate(input({ city: "hosur" }));
    const hasBorewell = result.hiddenCostWarnings.some((w) =>
      w.title.toLowerCase().includes("borewell")
    );
    expect(hasBorewell).toBe(true);
  });

  it("unknown soil type triggers soil testing warning", () => {
    const result = calculate(inputWithPlot({ soilType: "unknown" }));
    const hasSoilWarning = result.hiddenCostWarnings.some((w) =>
      w.title.toLowerCase().includes("soil")
    );
    expect(hasSoilWarning).toBe(true);
  });

  it("basement generates basement waterproofing warning", () => {
    const result = calculate(inputWithConfig({ basement: true }));
    const hasBasementWarning = result.hiddenCostWarnings.some((w) =>
      w.title.toLowerCase().includes("basement")
    );
    expect(hasBasementWarning).toBe(true);
  });
});

// ====================
// COST PER SQFT
// ====================

describe("calculate - costPerSqft", () => {
  it("costPerSqft equals mid / builtUpArea", () => {
    const result = calculate(BASE_INPUT);
    const expected = Math.round(result.totalRange.mid / BASE_INPUT.configuration.builtUpArea);
    expect(result.costPerSqft).toBe(expected);
  });

  it("luxury costPerSqft is higher than basic", () => {
    const basic = calculate(input({ qualityTier: "basic" }));
    const luxury = calculate(input({ qualityTier: "luxury" }));
    expect(luxury.costPerSqft).toBeGreaterThan(basic.costPerSqft);
  });
});

// ====================
// MAXIMUM INPUT
// ====================

describe("calculate - maximum input (luxury villa, all toggles)", () => {
  const maxInput: PlannerInput = {
    homeType: "luxury-villa",
    city: "bangalore-urban",
    plot: {
      length: 80,
      width: 60,
      facing: "north-east",
      cornerPlot: true,
      roadWidth: 60,
      soilType: "black-cotton",
      slope: "steep",
    },
    configuration: {
      floors: 4,
      builtUpArea: 5000,
      parking: "stilt",
      terrace: true,
      balconies: 6,
      lift: true,
      basement: true,
      homeOffice: true,
      rentalFloor: true,
    },
    qualityTier: "luxury",
    interiorLevel: "luxury-furnished",
  };

  it("produces a result", () => {
    const result = calculate(maxInput);
    expect(result.totalRange.mid).toBeGreaterThan(0);
  });

  it("total exceeds 3 crore for max config", () => {
    const result = calculate(maxInput);
    expect(result.totalRange.mid).toBeGreaterThan(30000000);
  });

  it("all breakdown values are positive", () => {
    const result = calculate(maxInput);
    const b = result.breakdown;
    expect(b.civilStructure).toBeGreaterThan(0);
    expect(b.interiors).toBeGreaterThan(0);
  });
});
