/**
 * Bangalore plot page data — programmatic SEO
 * Rates from Bangalore Construction Cost Index 2026 (canonical source).
 * BUA = L × W × 0.60 × floors (G+1 = 2 floors)
 * All rates in ₹/sqft. Cost ranges in rupees.
 */

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

export interface BangalorePlotPageConfig {
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
  body: [string, string, string];
  faqs: PlotFAQItem[];
  internalLinks: [PlotInternalLink, PlotInternalLink, PlotInternalLink, PlotInternalLink];
}

// ─── Bangalore rates (source: Bangalore Construction Cost Index 2026) ─────────

export const BANGALORE_RATES = {
  basic:    { min: 1500, max: 2200, mid: 1850 },
  standard: { min: 2000, max: 2800, mid: 2400 },
  premium:  { min: 2600, max: 3500, mid: 3050 },
  luxury:   { min: 3500, max: 5000, mid: 4250 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcBua(L: number, W: number, floors: number): number {
  return Math.round(L * W * 0.6 * floors);
}

function tierRange(buaSqft: number, key: keyof typeof BANGALORE_RATES): { min: number; max: number } {
  const r = BANGALORE_RATES[key];
  return { min: Math.round(buaSqft * r.min), max: Math.round(buaSqft * r.max) };
}

function allRanges(buaSqft: number) {
  return {
    basic:    tierRange(buaSqft, "basic"),
    standard: tierRange(buaSqft, "standard"),
    premium:  tierRange(buaSqft, "premium"),
    luxury:   tierRange(buaSqft, "luxury"),
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const _20x30: BangalorePlotPageConfig = (() => {
  const bua = calcBua(20, 30, 2);
  return {
    slug: "20x30",
    display: "20×30",
    L: 20, W: 30,
    plotSqft: 600,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "20×30 House Construction Cost in Bangalore | Estimato",
    metaDesc: "What it costs to build on a 20×30 plot in Bangalore. Standard G+1 construction rates, all quality tiers, BBMP context. BOQ-verified, June 2026.",
    eyebrow: "Bangalore · 20×30 plot · G+1 · BOQ-verified rates",
    headline: `20×30 plot house construction cost in Bangalore`,
    lead: `A 20×30 site in Bangalore gives you 600 sqft of land. With a G+1 build and setbacks factored in, you get roughly ${bua.toLocaleString("en-IN")} sqft of built-up area. Here is what that costs to build across quality tiers, at current Bangalore contractor rates.`,
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "A 20×30 plot is Bangalore's most common entry-level urban site, common in mature layouts like Vijayanagar, Rajajinagar, and the older BDA allotments in south Bangalore. At 600 sqft of land, BBMP mandates a setback of roughly 3 feet on three sides and 6 feet to the front (road setback varies by road width). After setbacks, your usable floor footprint per floor is typically 280 to 330 sqft. Across two floors, that gives you a comfortable 560 to 660 sqft of net liveable area per floor, before interior walls. The G+1 configuration is the standard for this site. Going to G+2 on a 20×30 is structurally feasible but needs specific soil assessment and BBMP structural clearance.",
      "The main construction variable on a 20×30 in Bangalore is soil type. In north Bangalore layouts near Yelahanka and Devanahalli, laterite rock sits close to the surface and foundations are shallow and cheap. In south Bangalore lakebed areas near Bannerghatta Road or Konanakunte, soft fill soil is common and may need pile foundations costing ₹3 to ₹6 lakh extra. For the central areas like Jayanagar and Rajajinagar, the soil is generally stable but access on narrow lanes adds logistics cost. The per-sqft rates above assume normal isolated footings in stable soil to about 5 feet depth. Confirm with your structural engineer before signing a quote.",
      "A 20×30 G+1 in Bangalore typically fits a 2 BHK layout per floor: two bedrooms, one living-dining, one kitchen, one bathroom. If you are building one unit for yourself and one for rental, a 20×30 duplex with separate entrances is tight but workable: most architects in Bangalore plan 1 BHK rental units on 20×30 secondary floors with the staircase opening directly from the main gate. At standard quality (₹2,000–₹2,800 per sqft), your civil construction cost for the full G+1 runs ₹14.4 to ₹20.2 lakh. BBMP plan approval for a 20×30 in Bangalore costs ₹50,000 to ₹1,20,000 depending on BDA vs BBMP jurisdiction and liaison charges.",
    ],
    faqs: [
      {
        question: "How much does it cost to build a house on a 20×30 plot in Bangalore?",
        answer: `A G+1 house on a 20×30 plot in Bangalore costs ₹14.4 lakh to ₹20.2 lakh at standard quality, for a built-up area of ${bua.toLocaleString("en-IN")} sqft. Basic quality runs ₹10.8L to ₹15.8L. Premium quality runs ₹18.7L to ₹25.2L. These cover civil and structural work only. BBMP approvals, borewell, compound wall, and interiors are separate costs that typically add ₹8 to ₹15 lakh.`,
      },
      {
        question: "Is a 20×30 plot big enough for a proper house in Bangalore?",
        answer: "Yes, a 20×30 plot builds a functional G+1 house in Bangalore. You get roughly 280 to 330 sqft per floor after BBMP setbacks, which fits a compact 2 BHK. For a family of 3 to 4 people, a 20×30 G+1 is a practical and very common choice in areas like Vijayanagar, Rajajinagar, Basaveshwaranagar, and outer ring road localities. Going G+2 is possible but requires BBMP clearance and a structural assessment. It is not automatically permitted on all 20×30 sites.",
      },
      {
        question: "What is the BBMP setback requirement for a 20×30 plot in Bangalore?",
        answer: "BBMP (Bruhat Bengaluru Mahanagara Palike) mandates a front setback equal to the road width requirement. For a 20-foot road, typically 3 to 6 feet front setback. Side setbacks are 3 feet on each side and rear setback is 3 feet for a 600 sqft site. The exact setback depends on the road width in front of your plot, BDA zone, and whether the site is in a residential or mixed layout. Always confirm with your licensed architect before planning the layout, as violating setbacks requires costly modifications during BBMP inspection.",
      },
      {
        question: "Can I build a duplex on a 20×30 plot in Bangalore?",
        answer: "Yes, but it requires careful planning. A 20×30 duplex (two independent units) needs the separate entrance built from the start. There is no space to add a second staircase later. Most Bangalore architects design a compact 1 BHK rental unit on the first floor with the staircase running along one wall. At standard quality, the duplex configuration costs the same per-sqft but adds ₹2 to ₹3 lakh for the second kitchen and separate entrance setup. Confirm with your architect whether the plot width (20 feet) allows two entrance points after the front setback.",
      },
      {
        question: "What does BBMP plan approval cost for a 20×30 site in Bangalore?",
        answer: "BBMP plan approval for a 20×30 residential plot in Bangalore costs ₹50,000 to ₹1,20,000 in 2026. This includes the official government fees (calculated on built-up area), the licensed architect's drawing charges, structural engineer certificate, and liaison agent fees. Approval timelines with self-certification range from 7 to 30 days. Without a liaison, the process is slower. BDA plots may have a different approval route depending on the layout status and khata type.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/bangalore",
        eyebrow: "Rate hub",
        title: "Bangalore construction rates",
        desc: "Full rate table for Bangalore across all quality tiers.",
      },
      {
        href: "/construction-cost/bangalore/cost-index",
        eyebrow: "Data source",
        title: "Bangalore Cost Index 2026",
        desc: "Where these rates come from. BOQ-verified and dated.",
      },
      {
        href: "/construction-cost/bangalore/30x40",
        eyebrow: "Larger plot",
        title: "30×40 plot cost in Bangalore",
        desc: "One step up: 1,440 sqft BUA, standard G+1.",
      },
      {
        href: "/construction-cost/bangalore/30-lakh-house",
        eyebrow: "Budget guide",
        title: "What ₹30 lakh builds in Bangalore",
        desc: "See what a ₹30 lakh budget buys across quality tiers.",
      },
    ],
  };
})();

const _30x40: BangalorePlotPageConfig = (() => {
  const bua = calcBua(30, 40, 2);
  return {
    slug: "30x40",
    display: "30×40",
    L: 30, W: 40,
    plotSqft: 1200,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×40 House Construction Cost in Bangalore | Estimato",
    metaDesc: "Construction cost for a 30×40 site G+1 in Bangalore. Standard quality ₹28.8–₹40.3 lakh. All tiers, BBMP context, BOQ-verified June 2026.",
    eyebrow: "Bangalore · 30×40 plot · G+1 · BOQ-verified rates",
    headline: `30×40 plot house construction cost in Bangalore`,
    lead: `The 30×40 plot is the most searched residential size in Bangalore, with 1,200 sqft of land, typically yielding ${bua.toLocaleString("en-IN")} sqft of built-up area in a G+1 after BBMP setbacks. Here is the full cost breakdown at current rates.`,
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "A 30×40 site in Bangalore (1,200 sqft of land) is the benchmark residential plot across the city, from BDA layouts in south Bangalore to the new peripheral areas around Sarjapur Road, Electronic City, and Devanahalli. At a G+1 configuration, BBMP mandates setbacks that vary by road width but typically reduce the usable footprint to 600 to 720 sqft per floor. The resulting built-up area of 1,200 to 1,440 sqft accommodates a 3 BHK on the ground floor and a 2 or 3 BHK on the first floor. This site is also the standard for Bangalore duplexes. A 30×40 duplex with separate entrances is one of the most common construction briefs in the city.",
      "On cost, a 30×40 G+1 in Bangalore sits in the mid-market zone where construction quality matters most. At standard quality (₹2,000–₹2,800 per sqft), your civil cost runs ₹28.8 to ₹40.3 lakh. The spread within that range depends on two things: location and soil. North Bangalore plots on hard laterite (Yelahanka, Hebbal, Devanahalli) hit the lower end of the range because foundations are shallow and labour is less congested. East Bangalore plots near the IT corridor (Whitefield, Sarjapur, Marathahalli) trend higher due to labour demand and softer soil in lake-adjacent areas. Central Bangalore plots (Indiranagar, Koramangala) always hit the top of the range, because logistics cost more when ready-mix trucks can't get close.",
      "The full move-in cost on a 30×40 G+1 in Bangalore, adding BBMP approval, BESCOM connection, borewell, compound wall, and basic interiors, typically runs ₹38 to ₹58 lakh at standard quality. The approval route matters: a BDA-approved plot in a formed layout moves faster than a converted agricultural land parcel, where the khata transfer and BDA conversion add time and cost. If you are comparing quotes from Bangalore builders, make sure the BOQ specifies whether the per-sqft rate includes UPVC windows, teak main door, and Jaquar-equivalent fittings. These are standard in mid-range Bangalore quotes but are sometimes excluded to lower the headline number.",
    ],
    faqs: [
      {
        question: "How much does it cost to build a G+1 house on a 30×40 plot in Bangalore?",
        answer: `At standard quality, a 30×40 G+1 in Bangalore costs ₹28.8 lakh to ₹40.3 lakh in civil construction for a built-up area of ${bua.toLocaleString("en-IN")} sqft. Premium quality (₹2,600–₹3,500/sqft) runs ₹37.4 to ₹50.4 lakh. The full move-in cost with BBMP approval, BESCOM connection, borewell, compound wall, and basic interiors adds ₹10 to ₹18 lakh on top of civil cost. Compare this with the equivalent Hosur rates: a 30×40 G+1 in Hosur at standard quality runs ₹30.2 to ₹34.6 lakh. Bangalore costs 10 to 25 percent more depending on location.`,
      },
      {
        question: "What is the maximum built-up area I can construct on a 30×40 plot in Bangalore?",
        answer: "BBMP allows a floor area ratio (FAR) of 1.75 for residential plots up to 1,500 sqft, which means a maximum built-up area of 2,100 sqft (1,200 × 1.75) across all floors on a 30×40 plot. In practice, setbacks, typically 4 feet front, 3 feet each side, and 3 feet rear, reduce each floor footprint to about 720 sqft, allowing a G+1 with around 1,440 sqft BUA. Going to G+2 requires a separate approval, a structural design, and BBMP sanction. The FAR limit and setbacks are checked during the plan approval stage.",
      },
      {
        question: "Which areas in Bangalore are best for building on a 30×40 plot?",
        answer: "Cost efficiency favours north Bangalore. Yelahanka, Devanahalli, and Hebbal have hard laterite soil (shallow foundations, cheaper), easier plot access, and lower labour demand. Sarjapur Road and Electronic City have strong rental demand but softer soil near lake zones. Whitefield has good connectivity but rocky soil in parts which requires breaking at ₹8 to ₹15 per sqft extra. Central areas (Jayanagar, JP Nagar, Indiranagar) cost the most per sqft (narrow lanes, high labour demand, and premium land values) but hold value best over time.",
      },
      {
        question: "How long does it take to build a 30×40 G+1 in Bangalore?",
        answer: "A well-managed 30×40 G+1 in Bangalore takes 10 to 14 months from BBMP plan approval to possession. Foundation work takes 4 to 6 weeks. Gray structure (columns, beams, slabs) runs 12 to 16 weeks for two floors. Brickwork, plastering, and electrical/plumbing rough-in takes another 8 to 12 weeks. Flooring, paint, fixtures, doors, and windows takes 6 to 10 weeks. Delays are most common during BBMP approval, the monsoon months (June to September when concrete work slows), and steel delivery during price spikes. Build the monsoon break into your schedule from the start.",
      },
      {
        question: "Should I hire a contractor or a turnkey architect for a 30×40 build in Bangalore?",
        answer: "A turnkey architect (like Design Intend) gives you design, structural drawings, BOQ, contractor selection, and site supervision under one roof. This costs 8 to 12 percent of civil cost but saves you the coordination effort and reduces quality risk. A direct contractor approach is cheaper up front but transfers all supervision to you. For a first build in Bangalore on a 30×40 plot, most homeowners find the architect-led route pays for itself: Bangalore contractor markets are competitive but opaque, and having an architect who knows the local rate card prevents overquoting in a way that a homeowner typically cannot.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/bangalore",
        eyebrow: "Rate hub",
        title: "Bangalore construction rates",
        desc: "Full rate table for Bangalore across all quality tiers.",
      },
      {
        href: "/construction-cost/bangalore/cost-index",
        eyebrow: "Data source",
        title: "Bangalore Cost Index 2026",
        desc: "Where these rates come from. BOQ-verified and dated.",
      },
      {
        href: "/construction-cost/bangalore/30x50",
        eyebrow: "Larger plot",
        title: "30×50 plot cost in Bangalore",
        desc: "Step up to 1,800 sqft BUA on a 30×50 site.",
      },
      {
        href: "/construction-cost/bangalore/50-lakh-house",
        eyebrow: "Budget guide",
        title: "What ₹50 lakh builds in Bangalore",
        desc: "See how far ₹50 lakh goes in Bangalore's construction market.",
      },
    ],
  };
})();

const _30x50: BangalorePlotPageConfig = (() => {
  const bua = calcBua(30, 50, 2);
  return {
    slug: "30x50",
    display: "30×50",
    L: 30, W: 50,
    plotSqft: 1500,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×50 House Construction Cost in Bangalore | Estimato",
    metaDesc: "30×50 plot G+1 construction cost in Bangalore. Standard quality ₹36–₹50.4 lakh. All tiers, material costs, BBMP notes. BOQ-verified June 2026.",
    eyebrow: "Bangalore · 30×50 plot · G+1 · BOQ-verified rates",
    headline: `30×50 plot house construction cost in Bangalore`,
    lead: `A 30×50 site gives you 1,500 sqft of land, large enough for a spacious 3 or 4 BHK G+1, with room for a ground-floor parking bay and a front garden. Built-up area after setbacks runs around ${bua.toLocaleString("en-IN")} sqft across both floors. Current Bangalore construction costs for this size are below.`,
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "The 30×50 plot (1,500 sqft of land) is the step up from the standard 30×40 that Bangalore homeowners make when they want a dedicated parking bay within the plot boundary, a more generous front garden, and space for a utility room or home office on the ground floor without sacrificing bedroom count. BBMP setbacks on a 30×50 site in a 30-foot road layout typically leave a floor footprint of around 800 to 900 sqft per floor. A G+1 on this site comfortably fits a 3 BHK on each floor, or a 4 BHK ground floor with a 3 BHK first floor. The additional 10 feet of depth over a 30×40 plot makes a meaningful difference in kitchen and utility space.",
      "Construction cost on a 30×50 in Bangalore scales predictably from the 30×40 figures. Standard quality at ₹2,000–₹2,800 per sqft gives a civil range of ₹36 to ₹50.4 lakh for 1,800 sqft BUA. The extra 360 sqft BUA over a 30×40 adds approximately ₹7.2 to ₹10 lakh to the civil cost, the same rate per sqft but more of it. Where the 30×50 does spend more than proportionally is in compound wall length (50-foot depth means a longer rear wall) and in foundation area. If your 30×50 site is in a lake-adjacent area of east Bangalore (Bellandur, Varthur, Mahadevapura), budget an extra ₹4 to ₹8 lakh for deep foundations, because soil reports from these zones regularly show low bearing capacity that normal isolated footings cannot handle.",
      "Builders and architects in Bangalore quote the 30×50 G+1 as a comfortable move-in ready home when the full budget sits between ₹50 and ₹68 lakh: civil at standard quality plus BBMP approval, BESCOM connection, borewell, compound wall, and basic modular kitchen and wardrobes. At this budget, you are not cutting corners on fittings or structure. One common planning error on 30×50 sites is underplanning the parking: a single covered parking bay needs a minimum 9 feet by 18 feet of clear space, which on a 30-foot-wide plot means giving up the full width of the ground floor front setback zone plus some of the covered area. Factor this into your layout plan before the foundation goes in.",
    ],
    faqs: [
      {
        question: "How much does it cost to build on a 30×50 plot in Bangalore in 2026?",
        answer: `At standard quality, a 30×50 G+1 in Bangalore costs ₹36 to ₹50.4 lakh in civil construction for ${bua.toLocaleString("en-IN")} sqft of built-up area. Premium quality (₹2,600–₹3,500/sqft) runs ₹46.8 to ₹63 lakh. Full move-in cost, adding approvals, BESCOM, borewell, compound wall, and basic interiors, typically reaches ₹48 to ₹70 lakh. These are mid-2026 Bangalore rates verified against current contractor quotes.`,
      },
      {
        question: "What can I build on a 30×50 plot in Bangalore?",
        answer: "The standard build for a 30×50 site in Bangalore is a G+1 with 3 to 4 BHK on each floor. The 1,500 sqft land area leaves room for a dedicated parking bay within the setback zone, a front garden, and a utility area at the rear. Duplex configurations (separate entrances per floor) work well on 30×50 because the 50-foot depth allows a side staircase without cutting into the living area of either unit. G+2 is possible but needs BBMP structural clearance and a separate sanction for the third slab.",
      },
      {
        question: "Does building on a 30×50 in Bangalore cost more than in Hosur?",
        answer: "Yes, meaningfully. A 30×50 G+1 at standard quality in Hosur costs approximately ₹37.8 to ₹43.2 lakh (Hosur rates: ₹2,100–₹2,400/sqft). The same plot in Bangalore at standard rates (₹2,000–₹2,800/sqft) runs ₹36 to ₹50.4 lakh. At the lower end (outskirts of Bangalore) the difference is minimal; at the upper end (IT corridor, central Bangalore) you pay 10 to 20 percent more. Labour cost and logistics in Bangalore's congested zones are the primary driver of the premium.",
      },
      {
        question: "How does soil type affect construction cost on a 30×50 in Bangalore?",
        answer: "Soil type is the single biggest variable in Bangalore construction cost after quality tier. North Bangalore laterite: foundations at 3 to 5 feet, minimal extra cost. South and central Bangalore red soil: stable at 4 to 6 feet, standard cost. East Bangalore lakebed zones (near Bellandur, Varthur, Mahadevapura): soft fill soil may require pile foundations adding ₹4 to ₹8 lakh. Rocky outcrops in Whitefield and Electronic City: rock breaking needed at ₹8 to ₹15 per sqft of footprint. Always get a soil test (₹8,000 to ₹15,000) before finalising your structural design and contractor quote.",
      },
      {
        question: "What is the built-up area on a 30×50 plot after BBMP setbacks?",
        answer: "On a 30×50 plot with a 30-foot road frontage in Bangalore, BBMP typically requires 4 feet front setback, 3 feet each side, and 3 feet rear. This leaves a floor footprint of about 23 feet × 44 feet = 1,012 sqft per floor. Over G+1, the total BUA is approximately 2,024 sqft. With a more conservative layout (wider drive lane, larger front setback), floor footprint drops to about 900 sqft per floor, giving a BUA of 1,800 sqft. The model used on this page is 1,800 sqft BUA, a realistic planning figure for a standard 30×50 G+1 in Bangalore.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/bangalore",
        eyebrow: "Rate hub",
        title: "Bangalore construction rates",
        desc: "Full rate table for Bangalore across all quality tiers.",
      },
      {
        href: "/construction-cost/bangalore/cost-index",
        eyebrow: "Data source",
        title: "Bangalore Cost Index 2026",
        desc: "Source of all rates on this page, with dates and material prices.",
      },
      {
        href: "/construction-cost/bangalore/30x40",
        eyebrow: "Smaller plot",
        title: "30×40 plot cost in Bangalore",
        desc: "The most common plot size: 1,440 sqft BUA G+1.",
      },
      {
        href: "/construction-cost/bangalore/50-lakh-house",
        eyebrow: "Budget guide",
        title: "What ₹50 lakh builds in Bangalore",
        desc: "A 30×50 at standard quality lands right in this budget range.",
      },
    ],
  };
})();

const _30x60: BangalorePlotPageConfig = (() => {
  const bua = calcBua(30, 60, 2);
  return {
    slug: "30x60",
    display: "30×60",
    L: 30, W: 60,
    plotSqft: 1800,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "30×60 House Construction Cost in Bangalore | Estimato",
    metaDesc: "30×60 plot construction cost in Bangalore. Standard G+1: ₹43.2–₹60.5 lakh for 2,160 sqft BUA. All quality tiers. BOQ-verified, June 2026.",
    eyebrow: "Bangalore · 30×60 plot · G+1 · BOQ-verified rates",
    headline: `30×60 plot house construction cost in Bangalore`,
    lead: `A 30×60 plot (1,800 sqft of land) is a generous residential site in Bangalore, enough for a large G+1 with spacious rooms, covered parking, and a garden. The G+1 built-up area at standard setbacks runs around ${bua.toLocaleString("en-IN")} sqft. Current Bangalore construction costs at all quality tiers are below.`,
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "A 30×60 site in Bangalore sits in the upper tier of standard residential plots: 1,800 sqft of land, common in layouts like JP Nagar, Banashankari, and the BDA-developed areas of south Bangalore, as well as newer layouts along Sarjapur Road and Kanakapura Road. BBMP setbacks on a 30×60 site with a standard road width leave a floor footprint of approximately 22 to 25 feet by 52 to 55 feet, giving roughly 1,100 to 1,380 sqft per floor. The full G+1 yields a comfortable 2,160 to 2,760 sqft of built-up area. This size easily accommodates a 4 BHK plus pooja room, study, and utility on the ground floor without compression.",
      "On a 30×60 site, Bangalore's construction cost variation by zone is more pronounced than on smaller plots because the total spend is higher. A 2,160 sqft standard G+1 in north Bangalore (Yelahanka, Hebbal corridor) at ₹2,000/sqft comes to ₹43.2 lakh civil. The same build in a central area (Jayanagar, Indiranagar) at ₹2,800/sqft runs ₹60.5 lakh, a ₹17 lakh difference on the same floor area. The premium is real and it compounds: premium-tier finishes in a central location can easily reach ₹75 lakh for the civil work alone. Understand your zone before committing to a rate from any builder.",
      "One planning advantage of the 30×60 over smaller sites is the ability to include a proper car park within the building footprint, whether a double-car basement or a ground-level car shelter of 180 sqft (9 by 20 feet) fits without impacting the main living area. A 30×60 G+1 duplex is also viable: the 60-foot depth allows independent entrance lobbies without giving up bedroom space on either floor. The full move-in budget for a 30×60 G+1 at standard quality in Bangalore (civil, approvals, BESCOM, borewell, compound wall, and basic interiors) typically runs ₹57 to ₹80 lakh depending on location and finish level.",
    ],
    faqs: [
      {
        question: "How much does a 30×60 house cost to build in Bangalore?",
        answer: `At standard quality, a 30×60 G+1 in Bangalore costs ₹43.2 to ₹60.5 lakh in civil work for ${bua.toLocaleString("en-IN")} sqft BUA. Premium quality runs ₹56.2 to ₹75.6 lakh. The full move-in budget including BBMP approval, BESCOM, borewell, compound wall, and basic interiors typically reaches ₹57 to ₹80 lakh at standard spec. These are current mid-2026 Bangalore rates, verified against active contractor quotes.`,
      },
      {
        question: "Is a 30×60 plot good for a 4 BHK house in Bangalore?",
        answer: "Yes, a 30×60 is the natural site for a 4 BHK in Bangalore. After BBMP setbacks, each floor runs about 1,100 to 1,380 sqft, which comfortably holds 4 bedrooms, a separate living and dining, a kitchen with utility room, and 2 bathrooms on the ground floor. You can also include a dedicated study, pooja room, and guest bedroom without compromising room sizes. The 60-foot depth gives designers flexibility that a 30×40 or 30×50 does not.",
      },
      {
        question: "How does the 30×60 construction cost in Bangalore compare to Hosur?",
        answer: "In Hosur, a 30×60 G+1 at standard quality (₹2,100–₹2,400/sqft) costs approximately ₹45.4 to ₹51.8 lakh. In Bangalore at standard rates (₹2,000–₹2,800/sqft), the same plot runs ₹43.2 to ₹60.5 lakh. The Bangalore range is wider because it covers both outskirts (north Bangalore, comparable to Hosur) and urban central zones (Indiranagar, Koramangala) where rates exceed Hosur by 15 to 20 percent. Choose the Bangalore zone that matches your plot location when estimating.",
      },
      {
        question: "What is the FAR limit for a 30×60 residential plot in Bangalore?",
        answer: "BBMP allows a FAR of 1.75 for plots up to 4,000 sqft under the Revised Master Plan 2031. For a 30×60 (1,800 sqft) plot, the maximum total built-up area across all floors is 3,150 sqft (1,800 × 1.75). A standard G+1 at 2,160 sqft BUA uses only 67% of the permitted FAR, leaving room for future expansion to G+2 if the structural design supports it. Always check the specific zone in your area. The FAR varies by residential zone (R1, R2, R3) and road width in BBMP's Zonal Regulations.",
      },
      {
        question: "Can a 30×60 in Bangalore support a duplex with rental income?",
        answer: "Yes. A 30×60 duplex with two fully independent units, separate entrances, separate kitchens, and separate electrical meters, is one of the most practical builds for rental income in Bangalore. Ground floor (1,000 sqft net): 3 BHK for the owner. First floor (1,000 sqft net): 3 BHK rental unit. At 2026 Bangalore rental rates, a well-designed first-floor unit in a good location (near an IT park, metro, or hospital) rents for ₹18,000 to ₹35,000 per month. At ₹50 lakh construction cost for the rental unit, payback is 12 to 18 years, not counting land appreciation.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/bangalore",
        eyebrow: "Rate hub",
        title: "Bangalore construction rates",
        desc: "Full rate table for Bangalore across all quality tiers.",
      },
      {
        href: "/construction-cost/bangalore/cost-index",
        eyebrow: "Data source",
        title: "Bangalore Cost Index 2026",
        desc: "Where these rates come from. BOQ-verified and dated.",
      },
      {
        href: "/construction-cost/bangalore/30x50",
        eyebrow: "Smaller plot",
        title: "30×50 plot cost in Bangalore",
        desc: "One step smaller: 1,800 sqft BUA, standard G+1.",
      },
      {
        href: "/construction-cost/bangalore/1-crore-house",
        eyebrow: "Budget guide",
        title: "What ₹1 crore builds in Bangalore",
        desc: "A premium 30×60 G+1 falls in this budget with interiors included.",
      },
    ],
  };
})();

const _40x60: BangalorePlotPageConfig = (() => {
  const bua = calcBua(40, 60, 2);
  return {
    slug: "40x60",
    display: "40×60",
    L: 40, W: 60,
    plotSqft: 2400,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "40×60 House Construction Cost in Bangalore | Estimato",
    metaDesc: "40×60 plot G+1 construction cost in Bangalore. Standard quality ₹57.6–₹80.6 lakh for 2,880 sqft BUA. All tiers, BOQ-verified, June 2026.",
    eyebrow: "Bangalore · 40×60 plot · G+1 · BOQ-verified rates",
    headline: `40×60 plot house construction cost in Bangalore`,
    lead: `A 40×60 plot (2,400 sqft of land) is a large residential site by Bangalore standards, one that enables a full-size 4 to 5 BHK home, a double car porch, and space for landscaping. At a G+1 configuration, the built-up area runs around ${bua.toLocaleString("en-IN")} sqft. Construction costs at current Bangalore rates are below.`,
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "A 40×60 plot (2,400 sqft of land) places you in Bangalore's upper-residential tier, a site that sees demand from senior IT professionals, NRI buyers, and families investing in a long-term family home. These plots are common in established south and east Bangalore layouts: Koramangala, HSR Layout, BTM Layout, Sarjapur Road villa gated communities. BBMP permits a FAR of 1.75 on this plot, allowing up to 4,200 sqft of built-up area across all floors. A standard G+1 at 2,880 sqft BUA uses 69% of that FAR, leaving structural room for a future third floor if the original columns are sized for it.",
      "The cost range for a 40×60 G+1 at standard quality (₹2,000–₹2,800/sqft) is ₹57.6 to ₹80.6 lakh in civil work. That spread is larger than on a 30×40 because the absolute spend is higher, and location matters proportionally more at scale. A north Bangalore site (Yelahanka, Hebbal) at ₹2,000 per sqft gives ₹57.6 lakh. A central Bangalore site (Koramangala, Indiranagar) at ₹2,800 per sqft gives ₹80.6 lakh. The difference is ₹23 lakh for the same floor area and quality specification, driven by labour cost, logistics, and the general mark-up that Bangalore contractors apply to premium-location builds. At premium quality (₹2,600–₹3,500/sqft), the range extends from ₹74.9 to ₹100.8 lakh.",
      "A 40×60 site in Bangalore is large enough for specialised designs that smaller plots cannot accommodate: double-height living rooms, a basement parking for two cars, a rooftop pergola or terrace garden with structural waterproofing, and a guest suite on the ground floor with its own bathroom. These are not standard in a base BOQ. They are priced as additions. The architectural design cost on a 40×60 also tends to be higher: a proper architect-designed home on this plot size typically costs 8 to 12 percent of civil cost in design fees, but the value gain in resale and rental yield justifies it in Bangalore's current market.",
    ],
    faqs: [
      {
        question: "How much does it cost to build on a 40×60 plot in Bangalore?",
        answer: `At standard quality, a 40×60 G+1 in Bangalore costs ₹57.6 to ₹80.6 lakh in civil work for ${bua.toLocaleString("en-IN")} sqft BUA. Premium quality runs ₹74.9 to ₹100.8 lakh. The full move-in budget, adding BBMP approval, BESCOM connection, borewell, compound wall (longer perimeter on a 40×60), and basic interiors, typically reaches ₹75 to ₹1.1 crore at standard quality. Luxury finishes on a 40×60 can exceed ₹1.5 crore all-in.`,
      },
      {
        question: "Is a 40×60 plot worth buying in Bangalore in 2026?",
        answer: "A 40×60 plot in Bangalore represents genuine scarcity. Sites of this size in formed layouts with good road access are increasingly rare, especially in south and east Bangalore. As a construction investment, the 2,880 sqft BUA G+1 yields strong rental income: a well-designed duplex configuration on a 40×60 in a good IT-corridor location (Sarjapur, HSR Layout) rents for ₹45,000 to ₹75,000 per month for the full house, or ₹22,000 to ₹35,000 per floor. The land value on a formed 40×60 layout plot in Bangalore has also appreciated at 8 to 14 percent annually over the past five years in most established zones.",
      },
      {
        question: "What is the maximum permitted construction on a 40×60 Bangalore site?",
        answer: "Under BBMP's Revised Master Plan 2031, the FAR for a 40×60 (2,400 sqft) residential plot is 1.75, permitting a maximum total built-up area of 4,200 sqft across all floors. Ground coverage is limited to 50 to 60 percent of plot area (1,200 to 1,440 sqft per floor footprint). A G+2 on a 40×60 using full FAR would be approximately 3,600 to 4,200 sqft. That requires a separate BBMP sanction, structural drawings for three floors, and a licensed architect's certification. The G+1 at 2,880 sqft is well within permitted limits.",
      },
      {
        question: "How does a 40×60 compare to 30×60 for construction cost in Bangalore?",
        answer: "A 30×60 in Bangalore (2,160 sqft BUA G+1) at standard quality costs ₹43.2 to ₹60.5 lakh. A 40×60 (2,880 sqft BUA G+1) at standard quality costs ₹57.6 to ₹80.6 lakh. The 40-foot-wide frontage gives a wider floor layout (5 to 6 rooms across vs 4 on a 30-foot site) which most buyers find more liveable, with larger bedrooms, a proper dining room separate from living, and space for a double car porch without encroaching on the main entrance.",
      },
      {
        question: "Do I need a separate soil test for a 40×60 construction in Bangalore?",
        answer: "Yes, and more critically than on smaller plots because the structural stakes are higher. A 40×60 G+1 has more load per column than a 30×40, and if soil fails under a wider footprint, the cost to remediate is proportionally greater. Soil tests (₹10,000 to ₹18,000) are non-negotiable for Bangalore sites in lake-adjacent areas of east Bangalore, fill zones around the outer ring road, and any site where the previous use is unknown. In stable red-soil zones of south and west Bangalore, soil tests are still good practice. They quantify foundation depth and save on over-engineering.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/bangalore",
        eyebrow: "Rate hub",
        title: "Bangalore construction rates",
        desc: "Full rate table for Bangalore across all quality tiers.",
      },
      {
        href: "/construction-cost/bangalore/cost-index",
        eyebrow: "Data source",
        title: "Bangalore Cost Index 2026",
        desc: "Source of all rates, BOQ-verified with material price index.",
      },
      {
        href: "/construction-cost/bangalore/30x60",
        eyebrow: "Narrower plot",
        title: "30×60 plot cost in Bangalore",
        desc: "Same depth, narrower frontage: 2,160 sqft BUA comparison.",
      },
      {
        href: "/construction-cost/bangalore/1-crore-house",
        eyebrow: "Budget guide",
        title: "What ₹1 crore builds in Bangalore",
        desc: "A 40×60 premium build lands squarely in this budget.",
      },
    ],
  };
})();

const _50x80: BangalorePlotPageConfig = (() => {
  const bua = calcBua(50, 80, 2);
  return {
    slug: "50x80",
    display: "50×80",
    L: 50, W: 80,
    plotSqft: 4000,
    floors: 2,
    floorLabel: "G+1",
    bua,
    title: "50×80 House Construction Cost in Bangalore | Estimato",
    metaDesc: "50×80 plot construction cost in Bangalore. Standard G+1: ₹96–₹134.4 lakh for 4,800 sqft BUA. Premium and luxury tiers. BOQ-verified June 2026.",
    eyebrow: "Bangalore · 50×80 plot · G+1 · BOQ-verified rates",
    headline: `50×80 plot house construction cost in Bangalore`,
    lead: `A 50×80 plot (4,000 sqft of land) is the villa site of Bangalore, a large urban footprint that enables a full-size family home with double car parking, landscaped garden, and generous room dimensions. G+1 built-up area after setbacks runs around ${bua.toLocaleString("en-IN")} sqft. Construction costs at current Bangalore rates are below.`,
    quickAnswerStd: tierRange(bua, "standard"),
    tierRanges: allRanges(bua),
    body: [
      "A 50×80 plot (4,000 sqft) is in the villa category in Bangalore, far above the city's median residential plot size. These sites are found primarily in older established areas (Sadashivanagar, Malleswaram, Koramangala 1st to 3rd blocks) and in plotted developments on the city periphery (Sarjapur, Devanahalli, Kanakapura Road villa townships). At BBMP's 1.75 FAR limit, the maximum total built-up area is 7,000 sqft across all floors. A G+1 on this site at 4,800 sqft BUA uses just 69% of the permitted FAR. The wide 50-foot frontage allows a porte cochère and a double-car driveway without crowding the entrance.",
      "Standard quality construction (₹2,000–₹2,800 per sqft) on a 50×80 G+1 runs ₹96 to ₹134.4 lakh in civil cost alone. Premium quality extends that to ₹124.8 to ₹168 lakh. These are not numbers for a first-home buyer on a tight budget. They are the territory of families building a long-term generational home. At this scale, the choice between architect-led and contractor-direct makes a real difference: an architect managing a ₹1 crore build on a 50×80 in Bangalore typically recovers 15 to 25 percent of their fee in better procurement and avoided change orders. Quality control on a large-footprint build without professional supervision degrades quickly.",
      "A 50×80 site in Bangalore also opens design options that smaller plots cannot support. A basement (underground parking, home theatre, wine cellar) on a 50×80 footprint costs ₹900 to ₹1,400 per sqft of basement area but adds significant usable space without consuming ground coverage. A rooftop terrace with structural waterproofing and a garden area is practical on this size plot without making the building feel roof-heavy. For a luxury villa on a 50×80, imported marble flooring (₹250 to ₹600 per sqft above standard vitrified tiles), stone cladding on the elevation (₹180 to ₹350 per sqft of elevation area), and home automation (₹4 to ₹12 lakh depending on scope) are the typical upgrades. Each of these is additive to the per-sqft rate bands shown above.",
    ],
    faqs: [
      {
        question: "How much does it cost to build on a 50×80 plot in Bangalore?",
        answer: `At standard quality, a 50×80 G+1 in Bangalore costs ₹96 to ₹134.4 lakh in civil work for ${bua.toLocaleString("en-IN")} sqft BUA. Premium quality (₹2,600–₹3,500/sqft) runs ₹124.8 to ₹168 lakh. Luxury finishes (₹3,500–₹5,000/sqft) reach ₹168 to ₹240 lakh in civil cost. The full move-in budget, including BBMP approval (₹80K to ₹2L), BESCOM (₹30K to ₹1L), compound wall (longer perimeter = ₹2 to ₹4L), borewell, and full interiors, adds ₹25 to ₹50 lakh on top of civil.`,
      },
      {
        question: "Is a 50×80 plot the right size for a villa in Bangalore?",
        answer: "Yes. A 50×80 plot is the starting size for a proper independent villa in Bangalore. You get enough land for a double-car garage, a front garden, side access, and a rear utility area, without the plot feeling cramped. For a comparison: plots below 40×60 force trade-offs between parking, garden, and internal room sizes. On a 50×80, all three coexist. The 4,800 sqft BUA over G+1 accommodates 5 BHK plus servant quarters, pooja room, home office, and a rooftop terrace, the standard villa brief for Bangalore's professional buyer segment.",
      },
      {
        question: "What does BBMP approval cost for a 50×80 site in Bangalore?",
        answer: "BBMP plan approval for a 50×80 residential site in Bangalore costs ₹80,000 to ₹2,00,000 in 2026, depending on the approved BUA, the zone, and whether the site is in BDA-formed layout or BBMP direct jurisdiction. Government fees are calculated on the total built-up area. At 4,800 sqft, expect higher government fees than a smaller plot. Self-certification schemes approved by licensed architects can expedite the process to 7 to 30 days. Complex sites (corner plots, irregularly shaped boundaries, plots abutting storm water drains) take longer and cost more in liaison.",
      },
      {
        question: "Should I build G+1 or G+2 on a 50×80 plot in Bangalore?",
        answer: "G+1 on a 50×80 gives 4,800 sqft BUA, typically enough for a 5 to 6 BHK family home with all support spaces. G+2 gives approximately 7,200 sqft BUA (three floors at 2,400 sqft each footprint), which is a large home or a partial rental floor. Going G+2 requires BBMP structural sanction, lift provision if floor height exceeds certain limits, and columns sized for three floors in the original design. If you plan to add a floor later, tell your structural engineer at the design stage. Columns designed for two floors cannot simply be extended for a third without expensive retrofitting.",
      },
      {
        question: "What are the hidden costs on a 50×80 Bangalore build that builders don't mention?",
        answer: "On a 50×80 in Bangalore, five costs regularly blindside buyers: (1) Compound wall and gates on a 4,000 sqft perimeter cost ₹2.5 to ₹5 lakh, more than on smaller plots. (2) BBMP road-widening: if your plot abuts a road that BBMP plans to widen, you may lose 3 to 5 feet of frontage as road reservation. Check the road proposal map before buying. (3) BESCOM high-tension power connection if the nearest LT line is insufficient for the load, and can add ₹60,000 to ₹1.5 lakh. (4) Soil report and structural design for large footprints with 6+ columns: ₹30,000 to ₹70,000 more than a small-plot structural design. (5) Site clearance: if the plot has old structure, trees, or debris, clearance adds ₹80,000 to ₹3 lakh.",
      },
    ],
    internalLinks: [
      {
        href: "/construction-cost/bangalore",
        eyebrow: "Rate hub",
        title: "Bangalore construction rates",
        desc: "Full rate table for Bangalore across all quality tiers.",
      },
      {
        href: "/construction-cost/bangalore/cost-index",
        eyebrow: "Data source",
        title: "Bangalore Cost Index 2026",
        desc: "Source of all rates, BOQ-verified with material price index.",
      },
      {
        href: "/construction-cost/bangalore/40x60",
        eyebrow: "Smaller plot",
        title: "40×60 plot cost in Bangalore",
        desc: "One size down: 2,880 sqft BUA, standard G+1.",
      },
      {
        href: "/construction-cost/bangalore/1-crore-house",
        eyebrow: "Budget guide",
        title: "What ₹1 crore builds in Bangalore",
        desc: "A standard 50×80 build sits at or above this budget.",
      },
    ],
  };
})();

// ─── Export map ────────────────────────────────────────────────────────────────

export const BANGALORE_PLOT_PAGES: Record<string, BangalorePlotPageConfig> = {
  "20x30": _20x30,
  "30x40": _30x40,
  "30x50": _30x50,
  "30x60": _30x60,
  "40x60": _40x60,
  "50x80": _50x80,
};
