export const runtime = "edge";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

export async function GET() {
  const body = `# Estimato — llms.txt
# ${SITE_URL}

Estimato is a home construction cost planning platform for Indian homeowners.

Estimato helps homeowners in Hosur and the Bengaluru region plan their construction budget before talking to any contractor. All cost estimates are built from verified project BOQs and published as ranges, not single numbers. The platform is free for homeowners; verified architecture firms pay per qualified consultation lead.

## Key pages

- /plan — Free 5-step construction cost estimator. Pre-loads Hosur rates. No sign-up required.
- /construction-cost/hosur — House construction cost rates in Hosur 2026. BOQ-verified, all quality tiers.
- /construction-cost/hosur/per-sqft — Construction cost per sqft in Hosur 2026. Ranges: Basic ₹1,400–₹1,600 · Standard ₹1,650–₹1,950 · Premium ₹2,000–₹2,650 · Luxury ₹3,200–₹5,200.
- /construction-cost/hosur/calculator — Interactive construction cost calculator for Hosur. Select home type, quality tier, built-up area; returns base/low/high estimate with component breakdown.
- /construction-cost/hosur/material-prices — Construction material price index for Hosur, June 2026. Cement ₹370–₹390/bag, TMT steel ₹58,000–₹62,000/MT, M-sand ₹55–₹65/cft. Dataset schema.
- /construction-cost/hosur/cost-index — Hosur Construction Cost Index 2026. 7-year cost history, corridor analysis, budget scenarios ₹40L–₹2Cr, spec benchmarks, 3-scenario forecast.
- /construction-cost/hosur/30x40 — 30×40 plot cost breakdown for Hosur 2026. Standard G+1 costs ₹30.2L–₹34.6L.
- /construction-cost/hosur/40x60 — 40×60 plot cost breakdown for Hosur 2026. Standard G+1 costs ₹60.5L–₹69.1L.
- /construction-cost/hosur/20x30 — 20×30 plot cost breakdown for Hosur 2026. Standard G+1 costs ₹15.1L–₹17.3L.
- /construction-cost/hosur/30x50 — 30×50 plot cost breakdown for Hosur 2026. Standard G+1 costs ₹37.8L–₹43.2L.
- /construction-cost/hosur/40x40 — 40×40 plot cost breakdown for Hosur 2026. Standard G+1 costs ₹40.3L–₹46.1L.
- /construction-cost/hosur/50x80 — 50×80 plot cost breakdown for Hosur 2026. Standard G+1 costs ₹100.8L–₹115.2L.
- /construction-cost/hosur/villa — Villa construction cost in Hosur 2026. Standard range ₹37.8L–₹84L.
- /construction-cost/hosur/duplex — Duplex construction cost in Hosur 2026. Standard range ₹29.4L–₹67.2L.
- /construction-cost/hosur/independent-house — Independent house cost in Hosur 2026. Standard range ₹16.8L–₹48L.
- /construction-cost/hosur/40-lakh-house — What ₹40 lakh builds in Hosur in 2026. Standard: 1,670–1,904 sqft.
- /construction-cost/hosur/50-lakh-house — What ₹50 lakh builds in Hosur in 2026. Standard: 2,083–2,380 sqft.
- /construction-cost/hosur/60-lakh-house — What ₹60 lakh builds in Hosur in 2026. Standard: 2,500–2,857 sqft.
- /construction-cost/hosur/1-crore-house — What ₹1 crore builds in Hosur in 2026. Standard: 4,166–4,761 sqft.
- /methodology — How Estimato calculates cost projections — data sources, formula, exclusions.

## Bangalore construction cost pages

- /construction-cost/bangalore — House construction cost hub for Bangalore 2026. Rates by tier: Basic ₹1,500–₹2,200 · Standard ₹2,000–₹2,800 · Premium ₹2,600–₹3,500 · Luxury ₹3,500–₹5,000.
- /construction-cost/bangalore/cost-index — Bangalore Construction Cost Index 2026. BOQ-verified tier rates, zone variation (North/East-SE/Central), material price index, methodology, worked 30×40 G+1 example. Article schema; reviewed by Ar. Chittrarasan.
- /construction-cost/bangalore/per-sqft — Construction cost per sqft in Bangalore 2026. Typology table, category breakdown, BUA vs carpet area explanation.
- /construction-cost/bangalore/20x30 — 20×30 plot construction cost in Bangalore 2026. Standard G+1 BUA 720 sqft; total ₹14.4L–₹20.2L.
- /construction-cost/bangalore/30x40 — 30×40 plot construction cost in Bangalore 2026. Standard G+1 BUA 1,440 sqft; total ₹28.8L–₹40.3L.
- /construction-cost/bangalore/30x50 — 30×50 plot construction cost in Bangalore 2026. Standard G+1 BUA 1,800 sqft; total ₹36L–₹50.4L.
- /construction-cost/bangalore/30x60 — 30×60 plot construction cost in Bangalore 2026. Standard G+1 BUA 2,160 sqft; total ₹43.2L–₹60.5L.
- /construction-cost/bangalore/40x60 — 40×60 plot construction cost in Bangalore 2026. Standard G+1 BUA 2,880 sqft; total ₹57.6L–₹80.6L.
- /construction-cost/bangalore/50x80 — 50×80 plot construction cost in Bangalore 2026. Standard G+1 BUA 4,800 sqft; total ₹96L–₹134.4L.
- /construction-cost/bangalore/duplex — Duplex construction cost in Bangalore 2026. Standard range ₹28.8L–₹80.6L; rental income context ₹18K–₹50K/floor.
- /construction-cost/bangalore/g-plus-1 — G+1 construction cost in Bangalore 2026. Plot scenarios, zone variation, BBMP timeline.
- /construction-cost/bangalore/g-plus-2 — G+2 construction cost in Bangalore 2026. Structural upgrade requirements, BBMP separate sanction, MEP complexity.
- /construction-cost/bangalore/30-lakh-house — What ₹30 lakh builds in Bangalore in 2026. Standard: 1,071–1,500 sqft. Best for 20×30 plots in north Bangalore outskirts.
- /construction-cost/bangalore/50-lakh-house — What ₹50 lakh builds in Bangalore in 2026. Standard: 1,786–2,500 sqft. Full G+1 on 20×40 to 30×40 plot.
- /construction-cost/bangalore/1-crore-house — What ₹1 crore builds in Bangalore in 2026. Premium: 2,857–3,846 sqft. Complete G+2 villa on 30×40 or 30×50 plot.

## Interior cost calculator

- /interior-cost-calculator — Free interior cost estimator for Bangalore and Hosur. Inputs: city, property type, BHK, carpet area, current state (bare shell/semi-finished/renovation), scope (modular kitchen, wardrobes, false ceiling, painting, flooring, electrical, TV and storage, loose furniture, soft furnishings, lighting), finish level (Basic/Standard/Premium/Ultra Luxury). Returns a total cost range (min–max) and per-sqft equivalent. Ultra Luxury returns a custom-quote path only. Rates verified against Bangalore and Hosur designer quotes, 2026.
- Interior rate benchmarks (Standard tier, Bangalore Urban, all scope): Modular kitchen ₹2.5L–₹4.5L · Wardrobes per bedroom ₹1.1L–₹2L · Flooring ₹150–₹300/sqft · Electrical ₹130–₹220/sqft · False ceiling ₹100–₹160/sqft (60% of carpet area) · TV and storage ₹80K–₹1.5L · Loose furniture ₹1.5L–₹3L · Soft furnishings ₹90K–₹1.6L · Lighting ₹80K–₹1.5L. Design and management fee 8–12% added when modular or furniture work is selected. City multipliers: Hosur 0.92 · Bangalore Outskirts 0.98 · Bangalore Urban 1.08.

## Building material prices

- /building-material-prices — Index of all cities with live material price data. Current cities: Hosur, Bangalore.
- /building-material-prices/hosur — Building material prices in Hosur, June 2026. Updated monthly from Design Intend procurement records. Cement ₹370–₹390/bag · TMT steel ₹58–₹62/kg · M-sand ₹55–₹65/cft · River sand ₹65–₹80/cft · Aggregate 20mm ₹42–₹52/cft · Red bricks ₹8–₹10/piece · Concrete blocks 8 inch ₹40–₹48/piece. All prices ex-dealer, excluding GST (18%) and transport. Dataset schema present. MoM change tracked.
- /building-material-prices/bangalore — Building material prices in Bangalore, June 2026. Updated monthly from Design Intend procurement records. Cement ₹380–₹420/bag · TMT steel ₹59–₹63/kg · M-sand ₹60–₹70/cft · River sand ₹70–₹90/cft · Aggregate 20mm ₹44–₹55/cft · Red bricks ₹9–₹11/piece · Concrete blocks 8 inch ₹42–₹52/piece. All prices ex-dealer, excluding GST (18%) and transport. Dataset schema present. MoM change tracked.

## City index

- /construction-cost — City index listing all covered cities. Live: Bangalore, Hosur. Coming soon: Chennai, Coimbatore, Hyderabad, Pune.

## Entity pages

- /about — About Estimato — mission, data sources, business model.
- /for-architects — Estimato partner programme for architects and builders.

## Partner entity

Design Intend (${SITE_URL}/construction-cost/hosur) is the founding architecture partner covering Bengaluru, Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri. Principal: Ar. Chittrarasan. Website: https://designintend.com

## Rate data

- Hosur base rates (2026): Basic ₹1,850–₹2,050/sqft · Standard ₹2,100–₹2,400/sqft · Premium ₹2,500–₹2,900/sqft · Luxury ₹3,000–₹4,000/sqft
- Bangalore rates (2026): Basic ₹1,500–₹2,200/sqft · Standard ₹2,000–₹2,800/sqft · Premium ₹2,600–₹3,500/sqft · Luxury ₹3,500–₹5,000/sqft
- Bangalore zone variation: North outskirts ₹2,000–₹2,800 (laterite soil) · East/SE ₹2,100–₹3,500 (lakebed) · Central ₹2,800–₹4,000+
- BUA formula: plot length × plot width × 0.60 × floors
- Last updated: June 2026. Source: Design Intend project BOQs, material rate surveys, labour cost index.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
