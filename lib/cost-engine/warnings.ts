import type { PlannerInput, Warning } from "@/types";

type WarningRule = {
  condition: (input: PlannerInput) => boolean;
  warning: Warning;
};

// Specific (conditional) rules listed first so they reach the top-5 slice
const WARNING_RULES: WarningRule[] = [
  // --- Input-specific warnings (highest priority) ---
  {
    condition: (input) => input.plot.soilType === "unknown",
    warning: {
      category: "materials",
      title: "Soil testing not done yet",
      message:
        "Without a soil test, foundation design is an assumption. Black cotton soil or poor bearing capacity can significantly increase foundation costs.",
      estimatedImpact: "₹1,50,000 to ₹4,00,000 if soil is problematic",
    },
  },
  {
    condition: (input) =>
      ["hosur", "bagalur", "attibele", "krishnagiri"].includes(
        input.city.toLowerCase()
      ),
    warning: {
      category: "materials",
      title: "Borewell depth is uncertain in Hosur belt",
      message:
        "Water table depth varies widely in Hosur and Krishnagiri areas. Borewells sometimes need to go 400-600 feet before finding water.",
      estimatedImpact: "₹1,20,000 to ₹2,50,000 for borewell",
    },
  },
  {
    condition: (input) => input.configuration.basement,
    warning: {
      category: "materials",
      title: "Basement waterproofing is critical and costly",
      message:
        "Basements in Hosur-Bengaluru belt face water ingress during monsoon. Proper waterproofing treatment is essential and adds significant cost.",
      estimatedImpact: "₹1,50,000 to ₹4,00,000 for basement waterproofing",
    },
  },
  {
    condition: (input) => input.plot.slope === "steep",
    warning: {
      category: "materials",
      title: "Steep slope increases foundation and retaining wall cost",
      message:
        "A steep plot needs retaining walls, extra excavation, and stepped foundation work. These are outside standard construction estimates.",
      estimatedImpact: "₹2,00,000 to ₹8,00,000 for slope management",
    },
  },
  {
    condition: (input) => input.configuration.lift,
    warning: {
      category: "materials",
      title: "Lift annual maintenance contract is ongoing",
      message:
        "After installation, lifts require an annual maintenance contract costing ₹20,000 to ₹40,000 per year. Factor this into long-term running costs.",
      estimatedImpact: "₹20,000 to ₹40,000 per year ongoing",
    },
  },
  {
    condition: (input) =>
      (input.qualityTier === "premium" || input.qualityTier === "luxury") &&
      (input.interiorLevel === "basic" || input.interiorLevel === "modular"),
    warning: {
      category: "interiors",
      title: "Interior budget may not match your quality choice",
      message:
        "You selected premium or luxury construction but basic or modular interiors. The final look may feel inconsistent. Consider upgrading your interior level.",
      estimatedImpact: "₹3,00,000 to ₹8,00,000 to align interiors",
    },
  },
  {
    condition: (input) =>
      input.qualityTier === "premium" || input.qualityTier === "luxury",
    warning: {
      category: "materials",
      title: "Premium elevation adds cost not shown here",
      message:
        "Architectural elevation work like cladding, feature walls, glass facades, or decorative louvers is separate from this estimate.",
      estimatedImpact: "₹2,00,000 to ₹10,00,000 depending on design",
    },
  },
  // --- Generic (always-true) warnings ---
  {
    condition: () => true,
    warning: {
      category: "approvals",
      title: "Approval and panchayat charges not included",
      message:
        "Building plan approval, panchayat fees, DTCP or BMRDA charges, and betterment fees are not included in this estimate. These vary by location and plot size.",
      estimatedImpact: "₹50,000 to ₹3,00,000 depending on location",
    },
  },
  {
    condition: () => true,
    warning: {
      category: "materials",
      title: "Steel and cement prices fluctuate",
      message:
        "Construction material costs change every quarter. This estimate uses current market rates. Lock material prices with your contractor before signing.",
      estimatedImpact: "5% to 12% cost variation over 6-month build",
    },
  },
  {
    condition: () => true,
    warning: {
      category: "approvals",
      title: "Water and electricity connection charges extra",
      message:
        "BESCOM connection, BWSSB or panchayat water connection, and meter deposits are not included. These require separate applications.",
      estimatedImpact: "₹50,000 to ₹1,50,000 total",
    },
  },
  {
    condition: () => true,
    warning: {
      category: "overruns",
      title: "Compound wall and gate not included",
      message:
        "Boundary wall, main gate, and landscaping are outside this estimate. Many homeowners underestimate this cost.",
      estimatedImpact: "₹1,00,000 to ₹4,00,000 depending on perimeter",
    },
  },
  {
    condition: (input) => input.interiorLevel !== "luxury-furnished",
    warning: {
      category: "interiors",
      title: "Furniture and appliances are extra",
      message:
        "Beds, sofas, dining tables, refrigerator, washing machine, and other appliances are not in this estimate.",
      estimatedImpact: "₹3,00,000 to ₹15,00,000 depending on preferences",
    },
  },
  {
    condition: () => true,
    warning: {
      category: "overruns",
      title: "Design changes mid-construction add cost",
      message:
        "Changing plans after foundation work starts is expensive. Finalize your drawings, room sizes, and electrical layout before breaking ground.",
      estimatedImpact: "3% to 8% cost increase per major change",
    },
  },
  {
    condition: () => true,
    warning: {
      category: "labour",
      title: "Labour rates rise in peak construction season",
      message:
        "December to March is peak construction season in South India. Labour availability drops and daily wages go up by 15-25% during this period.",
      estimatedImpact: "₹80,000 to ₹3,00,000 on total build",
    },
  },
  {
    condition: () => true,
    warning: {
      category: "materials",
      title: "GST on materials not included",
      message:
        "GST applies to purchased materials at 18% on most items. While contractors typically absorb this in their quotes, check your agreement carefully.",
      estimatedImpact: "Can affect 10-15% of material cost if paid separately",
    },
  },
];

export function generateWarnings(input: PlannerInput): Warning[] {
  return WARNING_RULES.filter((rule) => rule.condition(input))
    .map((rule) => rule.warning)
    .slice(0, 5);
}
