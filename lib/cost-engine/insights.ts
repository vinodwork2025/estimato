import type { PlannerInput, Insight } from "@/types";

type InsightRule = {
  condition: (input: PlannerInput) => boolean;
  insight: Insight;
};

const INSIGHT_RULES: InsightRule[] = [
  {
    condition: (input) =>
      input.configuration.rentalFloor ||
      (input.configuration.floors >= 2 && input.homeType !== "budget"),
    insight: {
      type: "opportunity",
      title: "Your build can earn rental income",
      message:
        "A ground-floor unit or separate floor can earn ₹8,000 to ₹18,000 per month in Hosur and surrounding areas. This can offset your EMI significantly.",
    },
  },
  {
    condition: (input) =>
      (input.qualityTier === "premium" || input.qualityTier === "luxury") &&
      (input.interiorLevel === "basic" || input.interiorLevel === "modular"),
    insight: {
      type: "warning",
      title: "Your interior level does not match your construction quality",
      message:
        "Premium structure with basic interiors will look mismatched. Either upgrade interiors or reconsider the construction quality tier.",
    },
  },
  {
    condition: (input) =>
      input.plot.facing === "south" || input.plot.facing === "south-west",
    insight: {
      type: "note",
      title: "South-facing plots need heat management",
      message:
        "South-facing homes receive intense afternoon sun. Budget for double-glazed windows on the south side, overhangs, or light-colored exterior paint to reduce heat gain.",
    },
  },
  {
    condition: (input) =>
      input.configuration.floors === 1 && input.homeType !== "budget",
    insight: {
      type: "opportunity",
      title: "Your plot can support a future floor",
      message:
        "Building ground-floor only now? Design your columns and beams for G+1 from the start. Adding a floor later costs 20-30% more if the structure was not planned for it.",
    },
  },
  {
    condition: (input) =>
      input.area?.toLowerCase().includes("nri") === true ||
      input.homeType === "luxury-villa",
    insight: {
      type: "note",
      title: "Remote builds need a site supervisor",
      message:
        "If you are not in India during construction, appoint a dedicated site supervisor beyond the contractor. Budget ₹25,000 to ₹40,000 per month for weekly photo and video documentation.",
    },
  },
  {
    condition: (input) => input.homeType === "duplex",
    insight: {
      type: "opportunity",
      title: "Duplex design gives you more usable space per rupee",
      message:
        "Duplex homes share one roof and foundation across two units. Cost per sqft is typically 8-12% lower than two separate homes on adjacent plots.",
    },
  },
  {
    condition: (input) => input.plot.cornerPlot,
    insight: {
      type: "opportunity",
      title: "Corner plot means better ventilation and design freedom",
      message:
        "Corner plots have two open sides. This allows cross-ventilation on multiple floors and more architectural flexibility for elevation design.",
    },
  },
  {
    condition: (input) => input.configuration.basement,
    insight: {
      type: "opportunity",
      title: "Basement adds usable space at lower cost per sqft",
      message:
        "A basement costs roughly 70-80% of above-ground construction per sqft. Use it for parking, storage, gym, or a home theater to maximize ROI.",
    },
  },
  {
    condition: (input) =>
      input.interiorLevel === "modular" ||
      input.interiorLevel === "premium" ||
      input.interiorLevel === "luxury-furnished",
    insight: {
      type: "opportunity",
      title: "Modular kitchen gives you resale value",
      message:
        "Modular kitchens are now a basic expectation for buyers in Hosur and Bengaluru belt. A well-fitted modular kitchen can add ₹3,00,000 to ₹5,00,000 to resale value.",
    },
  },
  {
    condition: (input) =>
      input.qualityTier === "premium" || input.qualityTier === "luxury",
    insight: {
      type: "note",
      title: "False ceiling is worth budgeting for every room",
      message:
        "False ceilings improve acoustics, hide wiring, and significantly lift the feel of a room. For a 2,000 sqft home, budget ₹1,50,000 to ₹2,50,000.",
    },
  },
  {
    condition: (input) =>
      ["hosur", "sarjapura", "bengaluru-rural", "electronic-city"].includes(
        input.city.toLowerCase()
      ),
    insight: {
      type: "opportunity",
      title: "Solar panels pay back in 4 to 5 years in this area",
      message:
        "Hosur and Bengaluru get 5+ peak sun hours daily. A 5 kW solar system costs around ₹3,00,000 to ₹3,50,000 and saves ₹1,800 to ₹2,200 per month on electricity.",
    },
  },
  {
    condition: (input) =>
      ["hosur", "bagalur", "attibele", "krishnagiri"].includes(
        input.city.toLowerCase()
      ),
    insight: {
      type: "note",
      title: "Plan your borewell early in Hosur belt",
      message:
        "Water table depth varies widely in Hosur and Krishnagiri. Get a hydrogeology report before finalizing your construction start date. Borewell drilling takes 3 to 7 days.",
    },
  },
  {
    condition: (input) =>
      input.qualityTier === "premium" || input.qualityTier === "luxury",
    insight: {
      type: "note",
      title: "Vastu compliance adds cost if retrofitted",
      message:
        "If vastu compliance matters to you or future buyers, plan it into the design before construction. Changing room orientations after construction is expensive.",
    },
  },
  {
    condition: (input) =>
      input.homeType === "villa" ||
      input.homeType === "luxury-villa" ||
      input.homeType === "contemporary",
    insight: {
      type: "opportunity",
      title: "Good design increases resale value by 15-25%",
      message:
        "In Hosur and Sarjapura corridor, architect-designed homes sell faster and at a premium. The architect fee (1.5-3% of project cost) typically pays back 3x at resale.",
    },
  },
  {
    condition: (input) =>
      input.configuration.parking === "stilt",
    insight: {
      type: "opportunity",
      title: "Stilt parking protects your vehicle and adds resale appeal",
      message:
        "Stilt parking is preferred by buyers in all price ranges. It also keeps ground-level covered, reducing direct sun exposure to the floor slab.",
    },
  },
  {
    condition: (input) => input.plot.soilType === "black-cotton",
    insight: {
      type: "warning",
      title: "Black cotton soil requires special foundation design",
      message:
        "Black cotton soil expands when wet and contracts when dry. This movement can crack walls and damage foundations over time. Consult a structural engineer before starting.",
    },
  },
  {
    condition: (input) => input.plot.soilType === "rocky",
    insight: {
      type: "note",
      title: "Rocky soil is good for foundations but drilling costs more",
      message:
        "Rocky soil offers excellent bearing capacity and reduces foundation depth. However, borewell drilling in rocky terrain costs 40-60% more and takes longer.",
    },
  },
  {
    condition: (input) =>
      ["bengaluru-urban", "whitefield", "electronic-city"].includes(
        input.city.toLowerCase()
      ),
    insight: {
      type: "note",
      title: "Approval timeline in Bengaluru is 3 to 6 months",
      message:
        "BBMP and BMRDA approvals in urban Bengaluru take longer than panchayat limits. Plan your construction start date 4 to 6 months after submitting drawings.",
    },
  },
  {
    condition: (input) =>
      (input.qualityTier === "premium" || input.qualityTier === "luxury") &&
      input.configuration.builtUpArea >= 2000,
    insight: {
      type: "opportunity",
      title: "Architect fee is worth it at this scale",
      message:
        "For a build of this size and quality, hiring an architect (1.5% to 3% of project cost) reduces waste, prevents costly mistakes, and produces a better-looking home.",
    },
  },
  {
    condition: (input) => input.plot.slope === "steep",
    insight: {
      type: "opportunity",
      title: "Steep plot is ideal for a split-level or basement design",
      message:
        "Instead of fighting the slope with a retaining wall, consider a split-level design. This reduces cut-and-fill costs and creates interesting interior spaces.",
    },
  },
  {
    condition: (input) => input.configuration.balconies >= 3,
    insight: {
      type: "note",
      title: "Multiple balconies add cost and maintenance",
      message:
        "Each balcony adds waterproofing requirements, structural projections, and maintenance over time. Consider keeping 1 or 2 large balconies rather than 3 to 4 small ones.",
    },
  },
  {
    condition: (input) => input.configuration.terrace,
    insight: {
      type: "opportunity",
      title: "A usable terrace adds functional space without floor cost",
      message:
        "Terraces with waterproofing, parapet walls, and basic paving can function as outdoor living areas. Budget ₹60,000 to ₹1,50,000 for a well-finished terrace.",
    },
  },
  {
    condition: (input) =>
      input.configuration.lift && input.configuration.floors <= 2,
    insight: {
      type: "note",
      title: "Lift economics work better for G+2 and above",
      message:
        "A lift in a G+1 home is a premium choice, not a necessity. The ₹6,50,000 cost plus maintenance is harder to justify below G+2. Consider a staircase-only design.",
    },
  },
  {
    condition: (input) => input.configuration.homeOffice,
    insight: {
      type: "opportunity",
      title: "Dedicated home office adds resale value for IT buyers",
      message:
        "In Sarjapura, Whitefield, and Electronic City corridors, a dedicated home office is now a top search filter for IT professional buyers.",
    },
  },
  {
    condition: (input) => input.configuration.rentalFloor,
    insight: {
      type: "note",
      title: "Rental floor needs BBMP/panchayat compliance",
      message:
        "Renting a floor requires proper approval. Some panchayat areas require separate meter connections per unit. Clarify compliance requirements before designing.",
    },
  },
  {
    condition: (input) => input.configuration.floors >= 2,
    insight: {
      type: "note",
      title: "Construction loan tranches match your payment phases",
      message:
        "Most banks disburse home loans in 4 to 5 tranches linked to construction stages. Plan your cash flow to match tranche release timing. Gap funding between tranches is common.",
    },
  },
];

export function generateInsights(input: PlannerInput): Insight[] {
  return INSIGHT_RULES.filter((rule) => rule.condition(input))
    .map((rule) => rule.insight)
    .slice(0, 4);
}
