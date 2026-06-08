/**
 * Hosur plot page data — Tier 2 programmatic SEO
 * All cost ranges computed from TIER_RATES × BUA, Hosur 1.00x multiplier.
 * BUA = L × W × 0.60 × floors (G+1 = 2, G+2 = 3)
 *
 * 60×40 uses G+2 because wide-frontage plots in Hosur are routinely built to three
 * floors — the wide road-face means good light and ventilation on all floors.
 * Every other plot uses G+1 as the standard reference case.
 */

import { TIER_RATES } from "@/lib/cost-engine/rates";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlotFAQItem {
  question: string;
  answer: string;
}

export interface PlotInternalLink {
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
}

export interface PlotPageConfig {
  slug: string;
  display: string;
  L: number;
  W: number;
  plotSqft: number;
  floors: number;
  floorLabel: string;
  bua: number;
  title: string;
  metaDesc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  quickAnswerStd: { min: number; max: number };
  tierRanges: {
    basic: { min: number; max: number };
    standard: { min: number; max: number };
    premium: { min: number; max: number };
    luxury: { min: number; max: number };
  };
  // 3 unique body paragraphs
  body: [string, string, string];
  faqs: PlotFAQItem[];
  internalLinks: [PlotInternalLink, PlotInternalLink, PlotInternalLink, PlotInternalLink];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcBua(L: number, W: number, floors: number): number {
  return Math.round(L * W * 0.6 * floors);
}

function tierRange(buaSqft: number, tier: string): { min: number; max: number } {
  const t = TIER_RATES[tier];
  return { min: Math.round(buaSqft * t.min), max: Math.round(buaSqft * t.max) };
}

function allRanges(buaSqft: number) {
  return {
    basic: tierRange(buaSqft, "basic"),
    standard: tierRange(buaSqft, "standard"),
    premium: tierRange(buaSqft, "premium"),
    luxury: tierRange(buaSqft, "luxury"),
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const _20x30: PlotPageConfig = (() => {
  const bua = calcBua(20, 30, 2);
  return {
    slug: "20x30",
    display: "20×30",
    L: 20,
    W: 30,
    plotSqft: 600,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "20×30 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 20×30 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "20×30 plot · Hosur · 2026",
    headline: "20×30 house construction cost in Hosur",
    lead:
      "A 20×30 plot (600 sqft) is the smallest practical size for a standalone house in Hosur. A G+1 build gives 720 sqft of built-up area — enough for a compact 2 BHK family home.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "After applying HTM's standard setbacks — 1.5 metres on the front, 1 metre on each side and rear — the usable ground floor interior on a 20×30 plot is roughly 17 feet wide and 27 feet deep (about 459 sqft per floor). That is tight but workable. A 2 BHK with a combined living and dining area fits well. A 3 BHK can be done but the rooms will be small — typically 9×10 feet or less. Most builders on this plot size choose a comfortable 2 BHK with a dedicated kitchen rather than squeezing in a third bedroom.",
      "Street parking or a compact car porch at the front is usually the only parking option on a 20×30 plot. A full one-car garage requires at least 18 feet of width after setbacks, which leaves almost nothing for the house on a 20-foot-wide plot. The most practical arrangement is a small stilt parking area that doubles as the ground-floor entry, with living space starting above. This is a common approach in Hosur's older residential layouts near the bus stand and Sipcot areas where 20×30 plots are more frequent.",
      "The cost figures here are for civil construction only — structure, masonry, plastering, flooring, MEP, and a standard elevation. Modular kitchen, wardrobes, and compound wall are separate. On a ₹15–₹17 lakh standard build, the split is roughly ₹5.7–₹6.5 lakh for civil structure, ₹4–₹4.5 lakh for finishes and MEP, and ₹1.5–₹2 lakh for elevation and approvals. Interiors (kitchen, wardrobes) typically add ₹1.5–₹2.5 lakh on top of the civil cost at this size.",
    ],
    faqs: [
      {
        question: "Can you build a 2 BHK on a 20×30 plot in Hosur?",
        answer:
          "Yes. A G+1 on a 20×30 plot gives 720 sqft of built-up area. After allocating space for a kitchen, bathroom, and living area on the ground floor, a 2 BHK with bedrooms on the upper floor is the standard configuration. Room sizes will be compact — bedrooms typically 9×10 to 10×11 feet. With careful planning from an architect familiar with Hosur's setback rules, this works well for a small family.",
      },
      {
        question: "What is the built-up area on a 20×30 plot in Hosur at G+1?",
        answer:
          "At 60% ground coverage (HTM standard) and two floors, the built-up area is 720 sqft. Ground floor: 360 sqft. Upper floor: 360 sqft. The 60% coverage rule means you cannot cover more than 360 sqft of the 600-sqft plot on any floor. In practice, most builders stay between 55–60% coverage to allow for a small front setback garden.",
      },
      {
        question: "Is a 20×30 plot worth buying in Hosur in 2026?",
        answer:
          "That depends on your purpose. For end-use living with a family of 3–4, a 20×30 plot gives a functional but compact home. For rental income, a 2 BHK on a 20×30 plot near Hosur Electronic City or Sipcot can fetch ₹6,000–₹9,000 per month in 2026. For long-term investment, the land appreciation potential in Hosur is the bigger argument — construction costs are a secondary factor.",
      },
      {
        question: "What does a G+1 house on a 20×30 plot cost in Hosur at basic quality?",
        answer:
          `At basic quality (₹1,850–₹2,050 per sqft), a G+1 with 720 sqft of built-up area costs ₹13.3–₹14.8 lakh in Hosur in 2026. Basic quality means local tile brands, standard sanitary ware, and basic electrical fittings — all functional, no branded items. This is the entry-level for a structurally sound home.`,
      },
      {
        question: "How long does it take to build a G+1 house on a 20×30 plot in Hosur?",
        answer:
          "A standard G+1 on a 20×30 plot takes about 7–9 months of active construction in Hosur. Foundation and structure take 8–10 weeks. Brickwork and plastering another 3–4 weeks. Finishing (flooring, tiling, electrical, painting) is the longest phase at 8–10 weeks. Small plot sizes actually reduce construction time slightly compared to larger homes because there is less material handling and less complexity.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x30",
        eyebrow: "Related plot",
        title: "30×30 plot in Hosur",
        desc: "A square 900 sqft plot — the next step up from 20×30 with more room layout options.",
      },
      {
        href: "/construction-cost/hosur/30x40",
        eyebrow: "Most searched",
        title: "30×40 plot in Hosur",
        desc: "Hosur's most common residential plot size. Benchmark for most contractor quotes.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers and construction types in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _30x40: PlotPageConfig = (() => {
  const bua = calcBua(30, 40, 2);
  return {
    slug: "30x40",
    display: "30×40",
    L: 30,
    W: 40,
    plotSqft: 1200,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×40 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 30×40 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "30×40 plot · Hosur · 2026",
    headline: "30×40 house construction cost in Hosur",
    lead:
      "A 30×40 plot (1,200 sqft) is the most common residential plot size in Hosur. A standard G+1 gives 1,440 sqft of built-up area — the configuration most Hosur contractor quotes are benchmarked on.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "The 30×40 plot is so common in Hosur's residential layouts that most local contractors quote rates using a 1,200-sqft reference plot by default. When someone in Hosur says they want a 3 BHK G+1, they almost always mean a 30×40 plot. After setbacks (1.5m front, 1m sides and rear), the usable ground floor interior runs about 27×37 feet — approximately 999 sqft — and at 60% coverage you get 720 sqft per floor. The standard layout is two bedrooms, living, dining, and kitchen on the ground floor with the master bedroom and one more room upstairs.",
      "Parking is one of the first questions for a 30×40 build. A single covered car park requires 9×18 feet minimum, which fits within the front setback if the road is 20 feet or wider. Most Hosur layouts have 30-foot roads, making this possible. If the plot has a 20-foot approach road, the parking width is tighter. A two-car arrangement is not practical on this plot without losing the front garden entirely. Most 30×40 owners in Hosur build a single covered car porch on one side and leave a narrow garden strip on the other.",
      "One of the common decisions on a 30×40 build in Hosur is whether to plan for a rental floor at the G+1 level. Adding a second kitchen, separate entrance, and basic sanitary fitting to the upper floor costs an extra ₹2.5–4 lakh at the construction stage but is significantly cheaper than retrofitting later. The upper floor typically rents for ₹7,000–₹11,000 per month in well-connected Hosur localities in 2026. This makes the 30×40 G+1 a common choice for homeowners who want both a family home and a rental income stream.",
    ],
    faqs: [
      {
        question: "What is the construction cost for a G+1 house on a 30×40 plot in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 30×40 G+1 with 1,440 sqft of built-up area costs ₹30.2–₹34.6 lakh in Hosur in 2026. At basic quality, the range is ₹26.6–₹29.5 lakh. At premium quality, ₹36–₹41.8 lakh. These figures cover civil structure, finishes, MEP, elevation, and approvals. Modular kitchen and compound wall are additional.",
      },
      {
        question: "What configuration fits on a 30×40 plot in Hosur?",
        answer:
          "A standard 3 BHK G+1 fits comfortably on a 30×40 plot in Hosur. Ground floor: living room, dining, kitchen, one bedroom, bathroom. Upper floor: master bedroom, one more bedroom, bathrooms. Total: 3 bedrooms, 2–3 bathrooms, kitchen. A 4 BHK is possible but rooms become compact. A single covered car park can be included on one side without sacrificing the main living area.",
      },
      {
        question: "What is the FSI for a 30×40 plot in Hosur under HTM rules?",
        answer:
          "Under Hosur Town Municipality (HTM) rules, residential plots generally have an FSI of 2.0. For a 30×40 plot (1,200 sqft), the total permissible built-up area is 2,400 sqft across all floors. A standard G+1 at 60% coverage uses 1,440 sqft, leaving 960 sqft of FSI headroom for future expansion — either G+2 or a larger upper floor.",
      },
      {
        question: "How long does construction take for a 30×40 G+1 in Hosur?",
        answer:
          "A standard 30×40 G+1 in Hosur takes 9–11 months of active construction. Foundation and structure: 10–12 weeks. Brickwork and plastering: 4–5 weeks. Finishing (flooring, tiling, electrical, painting, sanitary): 10–14 weeks. Add 4–6 weeks for HTM approval before work starts. The total timeline from plot purchase to key handover is typically 14–18 months.",
      },
      {
        question: "Can I add a rental floor to a 30×40 G+1 in Hosur?",
        answer:
          "Yes, and many Hosur homeowners do. The upper floor of a 30×40 G+1 can be designed as a separate 2 BHK unit with its own entrance, kitchen, and metering. This costs ₹2.5–4 lakh extra to plan at construction time compared to a standard G+1. The rental floor typically earns ₹7,000–₹11,000 per month in well-connected areas near Hosur Electronic City in 2026.",
      },
      {
        question: "What are the setback rules for a 30×40 plot under HTM?",
        answer:
          "Hosur Town Municipality requires: front setback of 1.5 metres (approximately 5 feet), side setbacks of 1 metre (3.3 feet) on each side, and a rear setback of 1 metre. On a 30-foot-wide plot, after two side setbacks the building width is 30 − 2 × 3.3 = 23.4 feet, or more practically 24 feet at the most in the design. These are minimum setbacks — a good architect will recommend slightly more on the sides for light and air.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x30",
        eyebrow: "Smaller option",
        title: "30×30 plot in Hosur",
        desc: "How a compact square plot compares to the standard 30×40 in cost and layout.",
      },
      {
        href: "/construction-cost/hosur/40x40",
        eyebrow: "Step up",
        title: "40×40 plot in Hosur",
        desc: "More space, same square shape — what the extra area unlocks in Hosur.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers. Hosur 2026 verified rates.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _30x50: PlotPageConfig = (() => {
  const bua = calcBua(30, 50, 2);
  return {
    slug: "30x50",
    display: "30×50",
    L: 30,
    W: 50,
    plotSqft: 1500,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×50 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 30×50 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "30×50 plot · Hosur · 2026",
    headline: "30×50 house construction cost in Hosur",
    lead:
      "A 30×50 plot (1,500 sqft) gives enough depth to zone a home front-to-back — public spaces at the front, private spaces at the rear. G+1 gives 1,800 sqft, which is comfortable for a 3–4 BHK family home.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "The extra depth on a 30×50 plot compared to a 30×40 changes how a house can be designed. With 50 feet of depth, after setbacks you have about 47 feet to work with from front to back. This allows a natural front-to-back zone: the living room and dining face the road or garden, the kitchen sits in the middle, and all bedrooms go to the quieter rear of the plot. This separation is something that compact 30×40 plots struggle with because depth is too limited to create a meaningful buffer between the living and sleeping areas.",
      "A 30×50 plot comfortably supports a 4 BHK G+1 layout — something that requires careful planning on a 30×40. The fourth bedroom can be fitted on the ground floor as a study or guest room without compressing the main living areas. Alternatively, a 3 BHK with a proper dedicated study is a popular choice for buyers who work from home. The plot also has space for a rear utility yard (for washing, drying, water tank, and generator placement) without eating into the main living area — a convenience that is often overlooked in planning.",
      "For buyers deciding between a 30×40 and a 30×50 plot in Hosur, the cost difference in land is often ₹8–15 lakh depending on the locality (2026 prices). The construction cost difference for the additional 360 sqft of BUA at standard quality is about ₹7.5–8.6 lakh. So the 30×50 build costs roughly ₹7–9 lakh more in civil construction than a comparable 30×40 G+1. That incremental cost typically buys one extra bedroom, a study room, or a significantly larger living and dining area — which is a good return for most families building their only home.",
    ],
    faqs: [
      {
        question: "What does a 30×50 G+1 house cost in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 30×50 G+1 with 1,800 sqft of built-up area costs ₹37.8–₹43.2 lakh in Hosur in 2026. At basic quality, the range is ₹33.3–₹36.9 lakh. At premium quality, ₹45–₹52.2 lakh. These figures cover civil structure, finishes, MEP, elevation treatment, and HTM approval fees.",
      },
      {
        question: "What can I fit in a 30×50 house in Hosur?",
        answer:
          "A 30×50 G+1 can comfortably fit a 4 BHK layout or a 3 BHK with a study room. Ground floor: living, dining, kitchen, 2 bedrooms, 2 bathrooms. Upper floor: master bedroom, 1–2 more bedrooms, bathrooms, and a balcony. The 50-foot depth allows a rear utility yard of about 8–10 feet without reducing the main living space.",
      },
      {
        question: "Is a 30×50 plot better than a 30×40 in Hosur?",
        answer:
          "The extra 300 sqft of land gives 360 sqft more BUA at G+1. That translates to one extra bedroom or a significantly larger living area. Construction costs ₹7.5–9 lakh more at standard quality. Whether that is worth it depends on your family size and how long you plan to live in the home. For a family of 4–5 or a joint family setup, the 30×50 is usually the better choice.",
      },
      {
        question: "Can I fit a parking space and a garden on a 30×50 plot?",
        answer:
          "Yes. With a 30-foot frontage, you can allocate 12–14 feet for a covered car porch and still have 16–18 feet of facade for the main entrance and a narrow garden strip. The 50-foot depth means the rear setback and a small utility yard can coexist without any compromise to the main living area. This is one of the practical advantages of the extra depth.",
      },
      {
        question: "How long does it take to build a G+1 on a 30×50 plot in Hosur?",
        answer:
          "Active construction on a 30×50 G+1 in Hosur takes about 10–12 months. The slightly larger footprint adds 2–4 weeks compared to a 30×40 build, mainly in the finishing phase (more floor area to tile, plaster, and paint). Foundation and structure are similar in complexity to a 30×40.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x40",
        eyebrow: "Compare",
        title: "30×40 plot in Hosur",
        desc: "The most common Hosur plot. See how 30×50 compares in cost and layout.",
      },
      {
        href: "/construction-cost/hosur/40x50",
        eyebrow: "Similar area",
        title: "40×50 plot in Hosur",
        desc: "Wider and shallower — a different proportion with the same approximate footprint.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur BOQs.",
      },
    ],
  };
})();

const _40x60: PlotPageConfig = (() => {
  const bua = calcBua(40, 60, 2);
  return {
    slug: "40x60",
    display: "40×60",
    L: 40,
    W: 60,
    plotSqft: 2400,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "40×60 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 40×60 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "40×60 plot · Hosur · 2026",
    headline: "40×60 house construction cost in Hosur",
    lead:
      "A 40×60 plot (2,400 sqft) is where proper family homes happen in Hosur. G+1 gives 2,880 sqft — room for a 4–5 BHK, dual parking, and a genuine front garden, all without compromise.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "At 2,400 sqft, a 40×60 plot is large enough that layout constraints essentially disappear. After HTM setbacks, the usable ground floor is about 37×57 feet — 2,109 sqft — and at 60% coverage the maximum per-floor BUA is 1,440 sqft. Most builders on this size plot choose a comfortable 60% coverage with room for a front driveway, a proper garden strip, and a rear utility area rather than maximising every sqft. The result is a home that breathes rather than one that presses against every setback.",
      "A standard configuration on a 40×60 is a 4 BHK G+1 with servant quarters or a study: master bedroom and one bedroom on the ground floor for family members who prefer not to climb stairs, and two more bedrooms on the upper floor. Dual covered car parking fits naturally on a 40-foot frontage without narrowing the entrance. The 60-foot depth allows a dedicated rear kitchen garden or a covered utility area that does not eat into the main living space.",
      "The 40×60 plot is also the starting point where G+2 becomes a practical option rather than a constraint. FSI of 2.0 means you can build up to 4,800 sqft total. A G+2 on 40×60 gives a 5–6 BHK home or a home with a fully independent rental floor. Most Hosur families building on this plot size choose G+1 for personal use and leave G+2 as a future option — the structural cost of building for G+2 readiness (thicker columns, better foundation) adds about 6–8% to civil costs and is worth doing at the construction stage rather than retrofitting later.",
    ],
    faqs: [
      {
        question: "What is the construction cost for a G+1 house on a 40×60 plot in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 40×60 G+1 with 2,880 sqft of built-up area costs ₹60.5–₹69.1 lakh in Hosur in 2026. At basic quality, the range is ₹53.3–₹59 lakh. At premium quality, ₹72–₹83.5 lakh. Luxury tier runs ₹86.4–₹115.2 lakh.",
      },
      {
        question: "What fits on a 40×60 plot in Hosur?",
        answer:
          "A 4–5 BHK G+1 fits with room to spare. Typical layout: master bedroom, guest bedroom, living and dining on the ground floor; two more bedrooms and a family lounge on the upper floor. Dual covered car parking on the side. A rear utility yard or garden area. Servant quarters can be added within the BUA allowance without reducing the main home.",
      },
      {
        question: "Is G+2 feasible on a 40×60 plot in Hosur?",
        answer:
          "Yes. With FSI 2.0, a 40×60 plot permits up to 4,800 sqft total built-up area. G+2 at 60% coverage would give 4,320 sqft. Adding a G+2 to the original structure after completion is expensive because it requires structural retrofitting. The right approach is to design for G+2 at the outset — using thicker columns and a stronger foundation — which costs about 6–8% more on the civil side but saves significantly over retrofitting.",
      },
      {
        question: "How long does construction take for a 40×60 G+1 in Hosur?",
        answer:
          "Active construction on a 40×60 G+1 in Hosur takes 11–13 months. Foundation and structure are more substantial than smaller plots and take 12–14 weeks. Finishing is the longest phase at 12–16 weeks due to the larger floor area. HTM approval adds 4–8 weeks before work starts.",
      },
      {
        question: "What is the FSI for a 40×60 plot in Hosur?",
        answer:
          "Hosur Town Municipality (HTM) allows an FSI of 2.0 for residential plots. For a 40×60 plot (2,400 sqft), the maximum total built-up area across all floors is 4,800 sqft. A standard G+1 at 60% coverage uses 2,880 sqft, leaving 1,920 sqft of FSI headroom — enough for a full additional floor or a significant expansion.",
      },
      {
        question: "How does a 40×60 plot compare to a 60×40 in Hosur?",
        answer:
          "Both are 2,400 sqft plots, but the orientation is different. The 40×60 has a 40-foot frontage and is 60 feet deep — it is shown as a G+1 because the standard use case is a deep home. The 60×40 has a 60-foot frontage and is only 40 feet deep — it is typically built to G+2 because the wide facade makes multi-floor construction more natural. A 60×40 G+2 (4,320 sqft BUA) costs more than a 40×60 G+1 (2,880 sqft BUA). The 60×40 wide frontage also typically commands a higher resale land price per sqft.",
      },
      {
        question: "Can I do a multi-unit or joint-family arrangement on a 40×60 G+2?",
        answer:
          "Yes. A 40×60 G+2 at 60% coverage gives 4,320 sqft total BUA — three floors of 1,440 sqft each. Each floor can function as a fully independent 3 BHK unit with a separate kitchen, entrance, and metering. This is popular for joint families in Hosur where two or three generations want separate but connected living, or for homeowners who want to live in one unit and rent the other floors at ₹10,000–₹16,000 per month per unit in 2026.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x60",
        eyebrow: "Narrower option",
        title: "30×60 plot in Hosur",
        desc: "Same depth, narrower frontage — how the numbers and layout differ.",
      },
      {
        href: "/construction-cost/hosur/40x50",
        eyebrow: "Similar size",
        title: "40×50 plot in Hosur",
        desc: "Slightly smaller but well-proportioned — compare cost and configuration.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for Hosur 2026 across all quality tiers.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _20x40: PlotPageConfig = (() => {
  const bua = calcBua(20, 40, 2);
  return {
    slug: "20x40",
    display: "20×40",
    L: 20,
    W: 40,
    plotSqft: 800,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "20×40 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 20×40 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "20×40 plot · Hosur · 2026",
    headline: "20×40 house construction cost in Hosur",
    lead:
      "A 20×40 plot (800 sqft) is a long, narrow site — 20 feet wide and 40 feet deep. G+1 gives 960 sqft of built-up area. The layout challenge is working within the 20-foot width after setbacks.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "After the 1-metre side setbacks on a 20-foot-wide plot, the interior building width is 17.5 feet (roughly 17 feet usable). Every room must fit within this width, which means the standard room-plus-corridor arrangement will not work without careful planning. The most successful designs for 20×40 plots use a through-ventilation approach: rooms run the full 17-foot width from side to side, with windows on both sides. This gives better natural light and ventilation than trying to fit a corridor down one side.",
      "The 40-foot depth is actually a significant advantage on a narrow plot — it allows a proper zoning that wider-but-shallower plots cannot do. A typical 20×40 layout separates the home into a front zone (living and dining), a middle zone (kitchen and service), and a rear zone (bedrooms). With a side staircase tucked against one wall, both floors can have this front-middle-rear arrangement. The result is a house that feels larger than its footprint suggests because each zone has a clear purpose.",
      "Narrow plots require a more involved design process than standard square plots. An architect who understands Hosur's setback rules and has worked on similar plot shapes will save you more in optimised space than their fee costs. A 3 BHK on a 20×40 is achievable with the right design, but the rooms will be compact. A 2 BHK with larger, more comfortable rooms is the more practical choice for most families. For buyers who want a third bedroom, a loft over the kitchen area is a common addition that adds minimal structural cost.",
    ],
    faqs: [
      {
        question: "What does a G+1 house on a 20×40 plot cost in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 20×40 G+1 with 960 sqft of built-up area costs ₹20.2–₹23 lakh in Hosur. At basic quality, ₹17.8–₹19.7 lakh. At premium quality, ₹24–₹27.8 lakh. These are civil construction figures — compound wall and modular kitchen are additional.",
      },
      {
        question: "How wide is a 20×40 house after setbacks in Hosur?",
        answer:
          "With HTM's 1-metre side setbacks on each side, the usable building width on a 20-foot-wide plot is 20 − 2 × 3.3 feet = approximately 13.4 feet minimum. In practice, most architects design for 15–17 feet interior width by using only the mandatory setbacks and placing the building as close to the centre of the plot as possible. This leaves about 1.5 feet on each side — enough for drainage and maintenance access.",
      },
      {
        question: "Can I fit a 3 BHK on a 20×40 plot in Hosur?",
        answer:
          "Yes, but the rooms will be compact. A more comfortable arrangement is a 2 BHK with a study that can serve as a third bedroom. The 17-foot building width limits room sizes to roughly 10–12 feet, which works for bedrooms but is tight for a combined living and dining on the same floor. The best 20×40 designs typically have the living and dining on the ground floor and all bedrooms on the upper floor.",
      },
      {
        question: "Is a 20×40 plot good for rental investment in Hosur?",
        answer:
          "A 2 BHK G+1 on a 20×40 plot near Hosur Electronic City or Sipcot can rent for ₹7,000–₹10,000 per month per floor in 2026. The construction cost of ₹20–23 lakh at standard quality makes this one of the more affordable rental investment configurations in Hosur. The narrow width is less of an issue for renters than for homeowners because renters typically care more about location and connectivity than room size.",
      },
      {
        question: "What is the parking arrangement on a 20×40 plot?",
        answer:
          "A full covered car park on a 20-foot-wide plot requires careful planning. A standard car park needs 9 feet of width minimum. After side setbacks, you have 17–18 feet of usable width. A single-car covered porch fits if it takes up half the front width and the main entrance uses the other half. Two-car parking is not feasible without using the entire front setback as driveway.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/20x30",
        eyebrow: "Smaller option",
        title: "20×30 plot in Hosur",
        desc: "The most compact viable plot size in Hosur — compare layouts and cost.",
      },
      {
        href: "/construction-cost/hosur/25x40",
        eyebrow: "Slightly wider",
        title: "25×40 plot in Hosur",
        desc: "5 extra feet of frontage makes a significant difference to layout options.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _30x30: PlotPageConfig = (() => {
  const bua = calcBua(30, 30, 2);
  return {
    slug: "30x30",
    display: "30×30",
    L: 30,
    W: 30,
    plotSqft: 900,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×30 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 30×30 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "30×30 plot · Hosur · 2026",
    headline: "30×30 house construction cost in Hosur",
    lead:
      "A 30×30 plot (900 sqft) is a square site — equal width and depth. G+1 gives 1,080 sqft of built-up area. The square shape creates architectural efficiencies that rectangular plots do not.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "Square plots are architecturally efficient because there are no awkward proportions to work around. On a 30×30, after setbacks the usable interior is roughly 27×27 feet per floor. A central staircase placement works naturally in this proportion — it sits at the geometric centre, giving equal access to rooms on all four sides. This is harder to achieve on rectangular plots where a central staircase often eats into one room or creates an odd L-shape corridor. The square form also makes it easier to place windows on all four sides for cross-ventilation.",
      "The standard configuration on a 30×30 G+1 is a 3 BHK — two bedrooms and a study or a compact third bedroom on the upper floor, with the living, dining, and kitchen on the ground floor. A 4 BHK requires rooms of about 9×10 feet, which works but leaves little margin for wardrobes within the room. Most architects recommend a 3 BHK with generous room sizes over a 4 BHK with tight ones on this plot size. The kitchen and bathrooms, being smaller, can be placed at the rear of the square without wasting the prime front-facing space.",
      "The 30×30 plot is common in older Hosur residential areas and in some of the BDA-influenced layouts near the eastern bypass. In newer residential projects, plots tend to be slightly larger (30×40 or 25×40), but the 30×30 remains a common size in resale and older layout transactions. Buyers looking at 30×30 plots in Hosur should check whether the layout is DTCP-approved and whether the road width is 30 feet or more — the road width affects parking feasibility and future road-widening risk.",
    ],
    faqs: [
      {
        question: "What does a G+1 house on a 30×30 plot cost in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 30×30 G+1 with 1,080 sqft of built-up area costs ₹22.7–₹25.9 lakh in Hosur in 2026. At basic quality, ₹20–₹22.1 lakh. At premium quality, ₹27–₹31.3 lakh. These are civil construction figures.",
      },
      {
        question: "What configuration fits on a 30×30 plot in Hosur?",
        answer:
          "A 3 BHK G+1 fits well. Ground floor: living, dining, kitchen, bathroom. Upper floor: two or three bedrooms with bathrooms. A central staircase on a square plot makes circulation efficient and gives all rooms roughly equal size. A 4 BHK is possible but rooms become smaller than 10×10 feet, which many families find limiting.",
      },
      {
        question: "Is a 30×30 plot worth buying in Hosur for construction?",
        answer:
          "For end-use, a 30×30 plot gives a comfortable 3 BHK at an achievable construction cost. For investment, the land price per sqft on smaller plots in Hosur is typically lower than on 30×40 or larger plots in the same locality, making entry cost manageable. The key check: confirm the layout is DTCP-approved and that road width is at least 20–24 feet for workable parking.",
      },
      {
        question: "Can I fit a car park on a 30×30 plot in Hosur?",
        answer:
          "One covered car porch is possible on a 30-foot frontage. After the 1.5-metre front setback, you have about 27 feet of width. A single car porch takes 10–12 feet, leaving 15 feet for the main facade and entrance. Two-car parking requires using essentially the entire frontage and is not usually practical while maintaining a proper entrance foyer.",
      },
      {
        question: "What makes a square 30×30 plot different from a 30×40?",
        answer:
          "The main differences are cost and layout. A 30×30 costs ₹22.7–₹25.9 lakh at standard G+1, versus ₹30.2–₹34.6 lakh for a 30×40 G+1 — a saving of about ₹7–9 lakh. The layout on a square plot is architecturally more efficient but you lose one extra room that the 40-foot depth of the 30×40 provides. For a small family or someone building a second property for rental, the 30×30 often makes better financial sense.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/20x30",
        eyebrow: "Smaller option",
        title: "20×30 plot in Hosur",
        desc: "The most compact viable plot size in Hosur — compare with the 30×30.",
      },
      {
        href: "/construction-cost/hosur/30x40",
        eyebrow: "Step up",
        title: "30×40 plot in Hosur",
        desc: "Hosur's most common plot — one extra room worth of depth.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _40x40: PlotPageConfig = (() => {
  const bua = calcBua(40, 40, 2);
  return {
    slug: "40x40",
    display: "40×40",
    L: 40,
    W: 40,
    plotSqft: 1600,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "40×40 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 40×40 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "40×40 plot · Hosur · 2026",
    headline: "40×40 house construction cost in Hosur",
    lead:
      "A 40×40 plot (1,600 sqft) is a spacious square site — large enough for a full 4 BHK G+1 with parking and a garden, and equally suited to G+2 if your family expands.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "The 40×40 plot combines the layout efficiency of a square with enough space to avoid the compromises that the 30×30 requires. After setbacks, the usable ground floor is about 37×37 feet — over 1,360 sqft of potential floor area, of which 60% coverage gives 960 sqft per floor. This is enough for a proper 4 BHK without any room feeling crowded. Living, dining, and a bedroom on the ground floor, three more bedrooms and a family area upstairs — this is a configuration that works for joint families and nuclear families alike.",
      "The G+2 option is more practical on a 40×40 than on a 30×40. With FSI 2.0, a 40×40 plot allows up to 3,200 sqft total. A G+2 at 60% coverage gives 2,880 sqft — a 5–6 BHK home or a home-plus-rental-floor combination. Many joint families in Hosur's growing residential areas (near ECR, Rayakottai, and the Mathigiri bypass) are choosing 40×40 plots specifically because they plan to give each nuclear unit its own floor while sharing a compound and parking. The structural cost of G+2 readiness is about 7% more than a standard G+1 build and is best done at the construction stage.",
      "For buyers comparing a 40×40 to a 40×50 in Hosur, the 40×40 saves approximately ₹10–12 lakh in construction cost (difference in BUA × standard rate) and typically ₹5–12 lakh in land cost depending on locality. The trade-off is 480 sqft less BUA and no rear utility depth. For most families building a permanent home, the 40×50 is preferable; for buyers on a budget or building a primary investment property, the 40×40 is the more practical choice.",
    ],
    faqs: [
      {
        question: "What does a G+1 house on a 40×40 plot cost in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 40×40 G+1 with 1,920 sqft of built-up area costs ₹40.3–₹46.1 lakh in Hosur in 2026. At basic quality, ₹35.5–₹39.4 lakh. At premium quality, ₹48–₹55.7 lakh. Luxury tier runs ₹57.6–₹76.8 lakh.",
      },
      {
        question: "What fits on a 40×40 plot in Hosur?",
        answer:
          "A full 4 BHK G+1 fits comfortably. Ground floor: living, dining, kitchen, master bedroom, bathroom. Upper floor: 3 bedrooms, 2 bathrooms, balcony. Single covered car parking fits on one side of the 40-foot frontage. For joint families, G+2 on this plot gives two independent floors with a full 3 BHK each.",
      },
      {
        question: "Is G+2 a good choice on a 40×40 plot in Hosur?",
        answer:
          "Yes, for joint families or for homeowners who want to add a rental floor. G+2 at 60% coverage gives 2,880 sqft total. The structural cost of building G+2-ready (stronger columns and foundation) adds about 7% to civil costs. That is far cheaper than retrofitting G+2 later. If you have any chance of wanting a third floor in the next 15 years, build for it at the start.",
      },
      {
        question: "How does a 40×40 compare to a 30×40 in Hosur?",
        answer:
          "A 40×40 gives 1,920 sqft BUA at G+1 versus 1,440 sqft for a 30×40 — 480 sqft more. Cost difference at standard quality: ₹40.3–₹46.1 lakh versus ₹30.2–₹34.6 lakh, roughly ₹10–12 lakh more. You also get 400 sqft more plot (1,600 vs 1,200 sqft) and a wider 40-foot frontage that makes parking and facade design easier.",
      },
      {
        question: "Can I have a duplex arrangement on a 40×40 plot in Hosur?",
        answer:
          "Yes. A G+1 on a 40×40 can be designed as a duplex with separate ground-floor and first-floor units, each with its own kitchen, entrance, and metering. The second kitchen adds ₹2.5–4.5 lakh. A separate staircase or external access stair costs ₹1–2 lakh. The upper floor rents for ₹9,000–₹14,000 per month in well-connected Hosur localities in 2026.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x40",
        eyebrow: "Step down",
        title: "30×40 plot in Hosur",
        desc: "The most common Hosur plot — compare with the 40×40 in cost and BUA.",
      },
      {
        href: "/construction-cost/hosur/40x50",
        eyebrow: "Step up",
        title: "40×50 plot in Hosur",
        desc: "Same frontage, more depth — what the extra 10 feet buys you.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _50x80: PlotPageConfig = (() => {
  const bua = calcBua(50, 80, 2);
  return {
    slug: "50x80",
    display: "50×80",
    L: 50,
    W: 80,
    plotSqft: 4000,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "50×80 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 50×80 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "50×80 plot · Hosur · 2026",
    headline: "50×80 house construction cost in Hosur",
    lead:
      "A 50×80 plot (4,000 sqft) is large-format residential — approaching villa territory. G+1 gives 4,800 sqft of built-up area. The scale creates a different set of construction considerations than standard residential plots.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "Plots of 4,000 sqft are uncommon in Hosur's tighter residential layouts but are regularly available in the peripheral areas: along the Rayakottai road, near Thally, on the Krishnagiri highway, and in some of the older agricultural-to-residential conversions around Bagalur. For a family building a permanent home rather than a compact urban residence, a 50×80 plot allows a proper large home with a driveway, a real garden, and outdoor utility space — without the cost per sqft inflating significantly.",
      "A G+1 at 60% coverage on a 50×80 plot gives 4,800 sqft of built-up area — that is a 5–6 BHK home with servant quarters, a home office, a two-car garage, and still room for a proper garden. The 50-foot frontage means the facade can have 3–4 bays, making the elevation look proportionate and grand without expensive treatments. At standard quality, the total civil cost runs ₹1 crore to ₹1.15 crore — this is the construction cost alone, separate from land, interiors, landscaping, and compound wall.",
      "At this scale, the cost per sqft stays at the same Hosur rate as any other plot size — there is no premium or discount for large-format construction as long as the design is straightforward. However, compound wall and gate costs are significantly higher on a large plot (roughly ₹8–15 lakh for a full boundary wall on 4,000 sqft versus ₹2–4 lakh on a 30×40 plot). Landscaping on a 50×80 plot is also a meaningful budget item (₹4–10 lakh for a basic garden with drip irrigation). These additions are worth budgeting separately from the main construction cost.",
    ],
    faqs: [
      {
        question: "What is the construction cost for a house on a 50×80 plot in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 50×80 G+1 with 4,800 sqft of built-up area costs ₹100.8–₹115.2 lakh (approximately ₹1–₹1.15 crore) in Hosur in 2026. At basic quality, ₹88.8–₹98.4 lakh. At premium quality, ₹120–₹139.2 lakh. These are civil construction figures, not including compound wall, landscaping, or interiors.",
      },
      {
        question: "What configuration fits on a 50×80 plot in Hosur?",
        answer:
          "A G+1 on a 50×80 plot can accommodate a 5–6 BHK with servant quarters, home office, two-car garage, and a proper garden. The 50-foot frontage allows a 3-bay elevation design. The 80-foot depth allows a front garden, the main structure, and a rear utility and service area. FSI of 2.0 means up to 8,000 sqft total is permissible — G+2 or beyond is fully viable if needed.",
      },
      {
        question: "Where are 50×80 plots commonly found in Hosur?",
        answer:
          "Large residential plots of 4,000 sqft and above in Hosur are more common in peripheral areas: Rayakottai road, Thally, the Krishnagiri highway belt, and some agricultural-conversion layouts near Bagalur and the Tamil Nadu border. Within Hosur town and SIPCOT layouts, plot sizes tend to be smaller (30×40 to 40×60). Buyers looking for 50×80 plots typically find them in recently approved layouts or from older owners subdividing agricultural land.",
      },
      {
        question: "What are the extra costs on a 50×80 plot that don't apply to smaller plots?",
        answer:
          "Compound wall and gate on a 50×80 plot require about 260 running feet of boundary wall. At ₹400–600 per running foot for a standard 5-foot brick wall and gate, that is ₹10.4–₹15.6 lakh — significantly more than the ₹2–4 lakh for a 30×40 plot. Landscaping for a proper garden on this size plot runs ₹4–10 lakh. These additions can add ₹15–25 lakh to the total project cost beyond the main construction cost.",
      },
      {
        question: "Is a 50×80 plot a good investment in Hosur?",
        answer:
          "Large plots in Hosur's peripheral areas have shown consistent appreciation as infrastructure develops. The main risk is liquidity — large plots are harder to sell quickly than standard 30×40 or 40×60 plots because the buyer pool is smaller and the capital outlay is higher. For end-use, a 50×80 plot in a developing area near Hosur's industrial zones is a strong long-term choice if you plan to stay for 10+ years.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/40x60",
        eyebrow: "Smaller option",
        title: "40×60 plot in Hosur",
        desc: "The most common large family plot in Hosur — compare cost and layout.",
      },
      {
        href: "/construction-cost/hosur/40x60",
        eyebrow: "Similar area",
        title: "40×60 plot in Hosur",
        desc: "Common large family plot in Hosur — compare cost and layout with the 50×80.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _30x60: PlotPageConfig = (() => {
  const bua = calcBua(30, 60, 2);
  return {
    slug: "30x60",
    display: "30×60",
    L: 30,
    W: 60,
    plotSqft: 1800,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×60 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 30×60 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "30×60 plot · Hosur · 2026",
    headline: "30×60 house construction cost in Hosur",
    lead:
      "A 30×60 plot (1,800 sqft) is a long rectangle — narrow but deep. G+1 gives 2,160 sqft of built-up area. The 60-foot depth is the defining feature, allowing distinct front, middle, and rear zones.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "The 30×60 plot shares a 30-foot frontage with the more common 30×40, but the extra 20 feet of depth changes the design options significantly. After setbacks, the usable interior depth is about 57 feet. This is enough to create three clear zones: a front zone facing the road (living and dining), a middle zone (kitchen, stairs, service areas), and a rear zone (bedrooms and bathrooms). This separation gives bedrooms genuine quiet and privacy from the road, something a 30×40 can only partially achieve.",
      "30×60 plots are more common in Hosur's older residential pockets — areas near the bypass road, older SIPCOT-adjacent housing, and some of the layouts developed in the 2000s when plots were still available at lower prices and developers sized them for practicality rather than maximising plot count. Buyers who find 30×60 plots in these areas often get good value because the extra depth is underpriced relative to the layout advantage it provides.",
      "A potential use of the 30×60 depth is a rear extension that does not require additional floor height. A ground-floor rear addition — a covered utility yard, outdoor seating area, or future expansion room — can be done without affecting the main structure if planned from the start. This is particularly useful for families who build in stages: civil structure first, interior and rear additions later as budget allows. The deep plot means the rear extension does not eat into any natural light for the main building.",
    ],
    faqs: [
      {
        question: "What does a G+1 house on a 30×60 plot cost in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 30×60 G+1 with 2,160 sqft of built-up area costs ₹45.4–₹51.8 lakh in Hosur in 2026. At basic quality, ₹40–₹44.3 lakh. At premium quality, ₹54–₹62.6 lakh.",
      },
      {
        question: "What layout works best on a 30×60 plot?",
        answer:
          "Front-to-rear zoning works extremely well on the 60-foot depth. Ground floor: living and dining at the front (road-facing), kitchen in the middle, one bedroom and bathroom at the rear. Upper floor: bedrooms arranged front-to-rear. The staircase sits in the middle zone. A rear utility yard of 8–10 feet can be left after the main structure without reducing the main home's floor area.",
      },
      {
        question: "How does a 30×60 compare to a 30×40 in Hosur?",
        answer:
          "A 30×60 has 600 sqft more land and 720 sqft more BUA at G+1 than a 30×40. Cost difference at standard quality: ₹45.4–₹51.8 lakh versus ₹30.2–₹34.6 lakh — approximately ₹15 lakh more in construction. The extra BUA can accommodate a 4 BHK comfortably, and the extra depth creates layout options that a 30×40 cannot. If the land price difference is reasonable (typically ₹6–12 lakh in Hosur, 2026), the 30×60 is a better family home.",
      },
      {
        question: "Where are 30×60 plots commonly found in Hosur?",
        answer:
          "30×60 plots are more common in older residential areas — plots developed before 2010 when deeper sites were more common. They appear in areas near the Hosur bypass, in some SIPCOT-adjacent housing colonies, and in private layouts on the Denkanikottai and Thally roads. They are less common in newer planned developments which tend to use 30×40 or 40×50 dimensions.",
      },
      {
        question: "Can I have a front garden and rear utility area on a 30×60?",
        answer:
          "Yes, and this is one of the main advantages of the 60-foot depth. After the 1.5-metre front setback and a 3-foot front garden strip, the main structure starts 8–9 feet from the road. The rear setback plus a utility yard of 8–10 feet means the main structure occupies 40–42 feet of the 60-foot depth, leaving meaningful space at both ends.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x50",
        eyebrow: "Similar width",
        title: "30×50 plot in Hosur",
        desc: "Same frontage, less depth — compare layout and cost.",
      },
      {
        href: "/construction-cost/hosur/40x60",
        eyebrow: "Wider option",
        title: "40×60 plot in Hosur",
        desc: "10 feet more frontage on a 60-foot-deep plot — see the cost difference.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _40x50: PlotPageConfig = (() => {
  const bua = calcBua(40, 50, 2);
  return {
    slug: "40x50",
    display: "40×50",
    L: 40,
    W: 50,
    plotSqft: 2000,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "40×50 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 40×50 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "40×50 plot · Hosur · 2026",
    headline: "40×50 house construction cost in Hosur",
    lead:
      "A 40×50 plot (2,000 sqft) is well-proportioned — slightly wider than it is deep, which most architects prefer for natural light and layout flexibility. G+1 gives 2,400 sqft of built-up area.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "Among the mid-size residential plots in Hosur, the 40×50 is often described as the most versatile. The 40-foot frontage is wide enough for three bays across — a car porch on one side, the main entrance in the centre, and a garden strip on the other — without any element feeling squeezed. The 50-foot depth gives enough front-to-rear space for a living area, a proper kitchen, and bedrooms at the rear, while still leaving a small rear utility yard after setbacks. Neither dimension is so extreme that it creates a design constraint.",
      "For joint families, the 40×50 is a popular choice in Hosur's newer residential layouts. The ground floor works well for the older generation (living, bedroom, puja room, kitchen close together), while the upper floor gives the younger family independent space. Two car parks fit side by side on the 40-foot frontage with a generous 12–14-foot access road. A small garden strip between the car parks and the main entrance gives the home an open feel that compact plots cannot achieve.",
      "On cost, the 40×50 sits between the 30×50 and the 40×60. Standard quality G+1 on a 40×50 runs ₹50.4–₹57.6 lakh — about ₹12.6–₹14.4 lakh more than a 30×50 G+1 and about ₹10 lakh less than a 40×60 G+1. The land cost difference between a 30×50 and a 40×50 in Hosur depends on locality but is usually ₹6–12 lakh. For families who want a 4 BHK with comfortable room sizes and dual parking, the 40×50 offers the right trade-off between cost and space.",
    ],
    faqs: [
      {
        question: "What is the construction cost for a G+1 house on a 40×50 plot in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 40×50 G+1 with 2,400 sqft of built-up area costs ₹50.4–₹57.6 lakh in Hosur in 2026. At basic quality, ₹44.4–₹49.2 lakh. At premium quality, ₹60–₹69.6 lakh. Luxury tier: ₹72–₹96 lakh.",
      },
      {
        question: "What fits on a 40×50 plot in Hosur?",
        answer:
          "A 4 BHK G+1 fits comfortably with dual car parking and a garden strip. Ground floor: living, dining, kitchen, master bedroom, bathroom. Upper floor: 3 bedrooms, 2–3 bathrooms, family lounge. The 40-foot frontage accommodates a car porch, main entrance, and a garden strip. A servant room or study can be added on either floor within the BUA.",
      },
      {
        question: "Is a 40×50 better than a 30×50 in Hosur?",
        answer:
          "The 40×50 gives 2,400 sqft BUA at G+1 versus 1,800 sqft for a 30×50 — 600 sqft more. Cost difference at standard quality: ₹50.4–₹57.6 lakh versus ₹37.8–₹43.2 lakh, about ₹12.6–₹14.4 lakh more. The extra 10 feet of width allows dual car parking (which is not feasible on a 30-foot plot) and a wider, more imposing facade. For growing families, the extra cost is usually worth it.",
      },
      {
        question: "Can I add a rental floor on a 40×50 plot?",
        answer:
          "Yes. The upper floor of a 40×50 G+1 can be designed as an independent 3 BHK unit with its own entrance, kitchen, and metering. The upper floor (at 2,400 sqft BUA total, the upper floor is about 1,200 sqft) is a well-sized 3 BHK. In well-connected areas near Hosur Electronic City, a 3 BHK flat rents for ₹12,000–₹18,000 per month in 2026.",
      },
      {
        question: "How long does construction take for a 40×50 G+1 in Hosur?",
        answer:
          "Active construction on a 40×50 G+1 in Hosur takes 11–13 months. Foundation and structure: 12–14 weeks. Brickwork and plastering: 4–6 weeks. Finishing: 12–15 weeks. The larger floor area compared to a 30×40 adds 4–6 weeks to the finishing phase.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/30x50",
        eyebrow: "Narrower option",
        title: "30×50 plot in Hosur",
        desc: "Same depth, 10 feet narrower — compare layout and cost.",
      },
      {
        href: "/construction-cost/hosur/40x40",
        eyebrow: "Compare",
        title: "40×40 plot in Hosur",
        desc: "Same frontage, square shape — how a 40×40 differs from a 40×50.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

const _25x40: PlotPageConfig = (() => {
  const bua = calcBua(25, 40, 2);
  return {
    slug: "25x40",
    display: "25×40",
    L: 25,
    W: 40,
    plotSqft: 1000,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "25×40 House Construction Cost in Hosur | Estimato",
    metaDesc:
      "Cost to build a 25×40 house in Hosur. Real BOQ-backed rates across five quality tiers, verified against current Hosur contractor quotes.",
    eyebrow: "25×40 plot · Hosur · 2026",
    headline: "25×40 house construction cost in Hosur",
    lead:
      "A 25×40 plot (1,000 sqft) is a standard planned-layout size — found in many BDA-influenced residential projects in Hosur. G+1 gives 1,200 sqft of built-up area, comfortable for a 3 BHK nuclear family home.",
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "The 25×40 plot appears frequently in Hosur's planned residential layouts — those developed by private developers with DTCP or RERA approval, where plot sizes are standardised for a balance of affordability and livability. The 25-foot frontage is 5 feet wider than the minimum practical width (20 feet), which makes a noticeable difference in how a ground floor can be laid out. After setbacks, the usable width is about 22 feet — enough for two side-by-side bedrooms or a bedroom and a kitchen running width-wise rather than depth-wise.",
      "A standard 3 BHK G+1 on a 25×40 plot is the default configuration in Hosur's planned layouts. Ground floor: living and dining (combined, about 15×18 feet), kitchen, one bedroom and bathroom, stairs. Upper floor: two bedrooms with bathrooms, a small balcony or sit-out. The 40-foot depth gives enough front-to-rear space for a narrow garden strip at the front and a small utility area at the rear within the setback zone. A single covered car porch takes up half the 25-foot frontage and leaves the other half for the main entrance and garden access.",
      "25×40 plots in Hosur are typically less expensive per sqft than 30×40 plots in the same area because the narrower frontage is considered less desirable for elevation design. This makes them a good entry point for buyers who want to be in a well-developed layout at a lower land cost. The construction cost per sqft is the same as any other plot size in Hosur — the rate table does not change based on plot dimensions. The only meaningful construction-cost difference from a 30×40 is the ₹5 lakh lower BUA (1,200 versus 1,440 sqft at standard G+1).",
    ],
    faqs: [
      {
        question: "What does a G+1 house on a 25×40 plot cost in Hosur in 2026?",
        answer:
          "At standard quality (₹2,100–₹2,400 per sqft), a 25×40 G+1 with 1,200 sqft of built-up area costs ₹25.2–₹28.8 lakh in Hosur in 2026. At basic quality, ₹22.2–₹24.6 lakh. At premium quality, ₹30–₹34.8 lakh. Luxury tier: ₹36–₹48 lakh.",
      },
      {
        question: "What layout fits on a 25×40 plot in Hosur?",
        answer:
          "A 3 BHK G+1 fits well. Ground floor: living and dining, kitchen, one bedroom, bathroom. Upper floor: master bedroom, second bedroom, bathrooms, balcony. A single covered car porch on one side of the 25-foot frontage. Room sizes on a 25×40 are slightly smaller than on a 30×40 but fully functional for a family of 3–4.",
      },
      {
        question: "Is a 25×40 plot common in Hosur?",
        answer:
          "Yes, particularly in DTCP-approved planned layouts developed in the last 10–15 years. Developers standardised this size as a mid-point between the compact 20×40 and the more spacious 30×40. You find 25×40 plots frequently in layouts along the Hosur–Krishnagiri road, near Mathigiri, and in some of the Bagalur-side developments.",
      },
      {
        question: "How does a 25×40 compare to a 30×40 in Hosur?",
        answer:
          "A 25×40 has 200 sqft less land and 240 sqft less BUA at G+1 than a 30×40. Construction cost difference at standard quality: ₹25.2–₹28.8 lakh versus ₹30.2–₹34.6 lakh — about ₹5 lakh cheaper to build. Land is also typically cheaper on the narrower plot. The trade-off: slightly smaller rooms and a narrower facade. For buyers on a tight budget, the 25×40 is a practical alternative to the 30×40.",
      },
      {
        question: "Can I fit parking on a 25×40 plot in Hosur?",
        answer:
          "One covered car porch fits. After the 1-metre side setback, one side has about 9–10 feet for parking and the other side has 13–14 feet for the main entrance and garden strip. A 9×18 foot car porch for a standard car fits without issue on a 25-foot frontage. Two-car parking is not practical on this width.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/hosur/20x40",
        eyebrow: "Narrower option",
        title: "20×40 plot in Hosur",
        desc: "The narrowest practical plot for a Hosur home — compare with 25×40.",
      },
      {
        href: "/construction-cost/hosur/30x40",
        eyebrow: "Step up",
        title: "30×40 plot in Hosur",
        desc: "Hosur's most common plot — see what 5 extra feet of frontage buys.",
      },
      {
        href: "/construction-cost/hosur",
        eyebrow: "City rates",
        title: "Hosur construction rates",
        desc: "Full rate table for all quality tiers in Hosur 2026.",
      },
      {
        href: "/methodology",
        eyebrow: "How we calculate",
        title: "Our methodology",
        desc: "How Estimato builds its rate database from real Hosur and Bangalore BOQs.",
      },
    ],
  };
})();

// ─── Exported map ─────────────────────────────────────────────────────────────

export const PLOT_PAGES: Record<string, PlotPageConfig> = {
  "20x30": _20x30,
  "30x40": _30x40,
  "30x50": _30x50,
  "40x60": _40x60,
  "20x40": _20x40,
  "30x30": _30x30,
  "40x40": _40x40,
  "50x80": _50x80,
  "30x60": _30x60,
  "40x50": _40x50,
  "25x40": _25x40,
};

export const PLOT_SLUGS = Object.keys(PLOT_PAGES);
