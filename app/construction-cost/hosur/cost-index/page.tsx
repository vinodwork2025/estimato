// UPDATE ANNUALLY. Refresh rates, forecasts, and dateModified each June with new market data.

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/hosur/cost-index`;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Hosur Construction Cost Index 2026 | Construction Intelligence | Estimato",
  description:
    "Comprehensive 2026 Hosur construction cost index. Cost data by typology and tier, 7-year price history, corridor analysis, budget scenarios, hidden costs, and 2027–2028 forecast.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hosur Construction Cost Index 2026 | Construction Intelligence | Estimato",
    description:
      "Comprehensive 2026 Hosur construction cost index. Cost data by typology and tier, 7-year price history, corridor analysis, budget scenarios, hidden costs, and 2027–2028 forecast.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Schema ───────────────────────────────────────────────────────────────────

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: "Construction cost intelligence platform for Indian homeowners.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Hosur", item: `${SITE_URL}/construction-cost/hosur` },
      { "@type": "ListItem", position: 4, name: "Hosur Construction Cost Index 2026", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Hosur Construction Cost Index 2026",
    description:
      "Comprehensive construction cost intelligence for Hosur, Tamil Nadu. Includes cost index by typology and tier, 7-year price history, material price index, labor rates, location corridor analysis, budget scenarios, hidden cost index, specification benchmarks, and 2027–2028 market forecast.",
    url: PAGE_URL,
    datePublished: "2026-06-01",
    dateModified: "2026-06-08",
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: "Estimato", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Estimato", url: SITE_URL },
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Hosur Construction Cost Index 2026",
    url: PAGE_URL,
    description:
      "The definitive construction economics and cost index reference for Hosur and the South Bangalore expansion corridor, published June 2026.",
    dateModified: "2026-06-08",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const MACRO_CATALYSTS = [
  {
    heading: "Metro link and transit convergence",
    detail:
      "The full operational integration of the Namma Metro Yellow Line terminating at Bommasandra, with high-frequency feeder systems across the Attibele border, has stabilized Hosur commute times to Electronic City at 15–20 minutes.",
  },
  {
    heading: "Greenfield Airport multiplier",
    detail:
      "Progressive land acquisition phases for the proposed Hosur Greenfield International Airport have catalyzed speculative land accumulation and immediate construction deployments along the Bagalur Road, Kelamangalam Road, and Berigai axes.",
  },
  {
    heading: "Industrial capital anchor",
    detail:
      "Massive expansions at Tata Electronics (Rayakottai Road corridor) and the EV ecosystem (Ola Electric, Ather Energy) have generated an influx of high-income executive personnel, triggering demand for upscale independent homes and premium villas.",
  },
  {
    heading: "Land price arbitrage",
    detail:
      "Plotted developments in South Bangalore (Electronic City, HSR Layout, Sarjapur Road) trade at ₹7,000–₹14,000 per sqft. Hosur premium gated community plots at ₹2,800–₹5,100 per sqft offer a structural arbitrage that is driving family and capital migration.",
  },
];

const COST_HISTORY = [
  { year: "2020", rate: 1200, change: "Baseline", driver: "Pre-pandemic baseline; stable labor, cheap river sand substitutes." },
  { year: "2021", rate: 1350, change: "+12.5%",   driver: "Post-lockdown pent-up demand; global commodity price spikes; supply chain disruptions." },
  { year: "2022", rate: 1500, change: "+11.1%",   driver: "Global fuel price spikes driving transport inflation; steep rise in steel and cement costs." },
  { year: "2023", rate: 1600, change: "+6.6%",    driver: "Relative stabilization of steel indexes; local transition to 100% certified M-Sand." },
  { year: "2024", rate: 1720, change: "+7.5%",    driver: "Hosur Greenfield Airport announcement; initial land rush; regional labor acquisition costs rise." },
  { year: "2025", rate: 1880, change: "+9.3%",    driver: "Namma Metro Yellow Line operational at border; massive influx of institutional capital." },
  { year: "2026", rate: 2050, change: "+9.0%",    driver: "Deep structural labor competition from high-tech electronics manufacturing sectors." },
];

const QUARTERLY_TREND = [
  { quarter: "Q3 2025", rate: "₹1,820/sqft", note: "Stable monsoon cycle; regular supply of aggregates." },
  { quarter: "Q4 2025", rate: "₹1,880/sqft", note: "Post-monsoon pickup; unexpected 8% hike in cement pricing across Southern states." },
  { quarter: "Q1 2026", rate: "₹1,980/sqft", note: "High seasonal peak for independent construction; spike in structural steel pricing." },
  { quarter: "Q2 2026", rate: "₹2,050/sqft", note: "Current baseline; elevated labor premiums driven by intense summer construction schedules." },
];

const CORRIDORS = [
  {
    zone: "Bagalur Road",
    plotValue: "₹3,200–₹5,100/sqft",
    volume: "Extreme peak",
    labor: "Moderately low",
    typology: "Contemporary Villas, Premium Duplexes",
    profile: "Highest speculative activity. Proximity to upcoming airport. Higher structural costs due to rocky soil profiles.",
  },
  {
    zone: "Mathigiri",
    plotValue: "₹2,400–₹3,200/sqft",
    volume: "Moderate–High",
    labor: "Adequate",
    typology: "Standard Duplexes, Independent Homes",
    profile: "Stable residential hub. Favorable soil conditions; strip footings sufficient for most G+2 structures.",
  },
  {
    zone: "Sipcot Area",
    plotValue: "₹2,100–₹2,800/sqft",
    volume: "Moderate",
    labor: "High",
    typology: "Multi-unit Rentals, Executive PGs",
    profile: "High-density layouts designed to maximize rental yields for industrial workers.",
  },
  {
    zone: "Alasanatham",
    plotValue: "₹4,500–₹6,500/sqft",
    volume: "Lower volume",
    labor: "Restricted space",
    typology: "Ultra-Luxury Duplexes, Custom Builds",
    profile: "Upscale urban core. Limited plot inventory. Strict municipal rules restrict large material vehicles.",
  },
  {
    zone: "Denkanikottai Road",
    plotValue: "₹1,800–₹2,600/sqft",
    volume: "High expansion",
    labor: "Low (camp labor)",
    typology: "Gated Farmhouses, Large Villas",
    profile: "Long transit distances add 6–10% to logistics costs. Clay soils often require plinth beam stabilization.",
  },
  {
    zone: "Rayakottai Road",
    plotValue: "₹1,900–₹2,700/sqft",
    volume: "Steady high",
    labor: "Moderate",
    typology: "Mid-tier Homes, Worker Housing",
    profile: "Driven by Tata Electronics expansions. Heavy industrial traffic causes daytime delivery delays.",
  },
];

const BUDGET_SCENARIOS = [
  {
    budget: "₹40 Lakh",
    bua: "~2,350 sqft (G+1)",
    tier: "Basic",
    specs: "Load-bearing frame, fly ash bricks, Indian granite or basic vitrified tiles (under ₹40/sqft), local brand wiring, basic sanitaryware.",
    compromises: "No modular kitchen, no joinery or wardrobes, simple emulsion paint, manual gate, no design fees.",
  },
  {
    budget: "₹50 Lakh",
    bua: "~2,750 sqft",
    tier: "Basic–Standard transition",
    specs: "Minimal RCC column structure, local wiring, basic vitrified flooring, standard sanitaryware.",
    compromises: "Basic compound wall included. Internal woodwork restricted to simple kitchen frames. No overhead wardrobes or false ceilings.",
  },
  {
    budget: "₹60 Lakh",
    bua: "~3,000–3,200 sqft (G+1 or G+2 rental)",
    tier: "Standard",
    specs: "Engineered frame, M20 concrete, 6-inch solid blocks, Kajaria vitrified tiles (₹55/sqft), Finolex wiring, Hindware/Parryware plumbing.",
    compromises: "Basic MDF wardrobes, standard window sizes, single-car open parking, basic MS staircase railing.",
  },
  {
    budget: "₹75 Lakh",
    bua: "~3,600–3,800 sqft",
    tier: "Mid-Standard",
    specs: "Reinforced frame grids, medium-tier UPVC windows, semi-modular laminated kitchen, basic emulsion finishes.",
    compromises: "External parking open to sky. Premium materials limited to front elevation accents only.",
  },
  {
    budget: "₹1 Crore",
    bua: "~4,200–4,500 sqft (Premium duplex/independent)",
    tier: "Premium",
    specs: "Fe 550D steel, RMC formulations, 8×4 ft vitrified tiles, full UPVC window frames, Jaguar sanitary fixtures.",
    compromises: "Imported marble restricted to main lounge. Standard multi-split AC instead of VRV HVAC. Basic home automation.",
  },
  {
    budget: "₹1.5 Crore",
    bua: "~4,600–5,000 sqft custom contemporary",
    tier: "High-Premium",
    specs: "High-grade engineering specs, teak joinery elements, comprehensive modular wardrobes, premium paint finishes, structural glass elements.",
    compromises: "Automation systems localized, not centralized. No swimming pool or extensive terrace glass rooms.",
  },
  {
    budget: "₹2 Crore",
    bua: "~4,800–5,500 sqft (Architectural Luxury Villa)",
    tier: "Luxury",
    specs: "Exposed concrete columns, wide-span cantilever configuration, Italian marble throughout, central VRV HVAC, Fenesta UPVC sliding glass doors, automated security, high-end landscaping.",
    compromises: "Highly specialized bespoke imports (custom Italian cabinetry, German security glazing) may require additional budget if chosen extensively.",
  },
];

const HOUSE_TYPE_COMPARISON = [
  {
    attr: "Average baseline cost",
    independent: "₹1,750/sqft",
    duplex: "₹2,050/sqft",
    villa: "₹2,750/sqft",
    luxuryVilla: "₹4,200/sqft",
  },
  {
    attr: "Typical capital requirement",
    independent: "₹35L–₹55L",
    duplex: "₹55L–₹90L",
    villa: "₹1.1Cr–₹1.8Cr",
    luxuryVilla: "₹2.2Cr–₹4.5Cr+",
  },
  {
    attr: "Standard delivery schedule",
    independent: "8–10 months",
    duplex: "10–12 months",
    villa: "13–16 months",
    luxuryVilla: "16–22 months",
  },
  {
    attr: "Risk profile",
    independent: "Low. Easily handled by local contractors",
    duplex: "Medium. Internal double-height elements need supervision",
    villa: "High. Specialized engineering for cantilevers and glass facades",
    luxuryVilla: "High. Specialty materials, long lead times, custom craft crews",
  },
];

const HIDDEN_COSTS = [
  {
    item: "Deep borewell drilling",
    cost: "₹1,40,000–₹2,80,000",
    freq: "65% omission rate",
    detail: "Water table depth varies a great deal. Elevated areas like Bagalur Road require 800–1,200 ft deep drilling. Cost includes submersible pump and wiring.",
  },
  {
    item: "HNTDA / DTCP approvals",
    cost: "₹1,20,000–₹2,50,000",
    freq: "40% omission rate",
    detail: "Municipal infrastructure charges, layout regularization fees, and licensed surveyor sign-offs.",
  },
  {
    item: "EB temporary-to-permanent connection",
    cost: "₹45,000–₹85,000",
    freq: "85% omission rate",
    detail: "Transition from temporary commercial construction tariff to permanent domestic meter.",
  },
  {
    item: "Soil mechanics testing",
    cost: "₹18,000–₹30,000",
    freq: "90% omission rate",
    detail: "Often skipped by individual homebuilders, leading to over-engineered foundations or risky structural settling.",
  },
  {
    item: "Architectural design fees",
    cost: "3%–6% of total project cost",
    freq: "50% omission rate",
    detail: "Essential for high-end contemporary layouts; covers spatial, structural, electrical, and plumbing blueprints.",
  },
  {
    item: "Rainwater harvesting compliance",
    cost: "₹35,000–₹60,000",
    freq: "30% omission rate",
    detail: "Mandatory under Tamil Nadu building codes to secure permanent municipal water connections.",
  },
  {
    item: "Perimeter compound wall",
    cost: "₹1,400–₹1,800/running foot",
    freq: "70% omission rate",
    detail: "A standard 40×60 plot requires ~200 running feet = ₹3,00,000+. Frequently excluded from contractor quotes.",
  },
  {
    item: "Main entrance gate assembly",
    cost: "₹45,000–₹1,50,000",
    freq: "75% omission rate",
    detail: "Cost varies from simple manual swing gate to automated sliding gearbox systems.",
  },
];

const SPEC_BENCHMARKS = [
  {
    category: "Cement",
    basic: "Dalmia / Chettinad PPC",
    standard: "Ramco Supergrade / UltraTech",
    premium: "UltraTech Premium / Ambuja",
    luxury: "ACC / Custom RMC Blends",
  },
  {
    category: "Reinforcement Steel",
    basic: "Sree Metaliks / Local Fe500",
    standard: "Kamdhenu / Pulkit Fe500",
    premium: "JSW Neosteel / Tata Tiscon Fe550D",
    luxury: "Tata Tiscon Fe550D / Jindal Panther",
  },
  {
    category: "Wiring",
    basic: "Anchor / Kundan Cables",
    standard: "Finolex / Polycab",
    premium: "Havells / RR Kabel",
    luxury: "Kei Industries / Finolex FR",
  },
  {
    category: "Modular Switches",
    basic: "Anchor Penta",
    standard: "Roma Classic",
    premium: "Legrand Arteor / Schneider Opale",
    luxury: "Norisys / Anchor Panasonic Touch",
  },
  {
    category: "Plumbing",
    basic: "Ashirvad PVC",
    standard: "Supreme CPVC / Astral",
    premium: "Ashirvad FlowGuard / Astral",
    luxury: "Geberit Silent / Astral Premium",
  },
  {
    category: "Sanitaryware",
    basic: "Parryware Basic",
    standard: "Hindware / Cera",
    premium: "Jaguar Florentine",
    luxury: "Kohler / Grohe / Toto",
  },
  {
    category: "Window Systems",
    basic: "Local Aluminium Sliding",
    standard: "Branded local UPVC",
    premium: "Aparna Venster / NCL VEKA",
    luxury: "Fenesta Custom Performance",
  },
  {
    category: "Paint & Finish",
    basic: "British Paints / Local Putty",
    standard: "Asian Paints Tractor Emulsion",
    premium: "Asian Paints Royal / Nippon",
    luxury: "Dulux Velvet / Jotun Luxury",
  },
];

const FORECAST_SCENARIOS = [
  {
    label: "Conservative Track",
    probability: "20%",
    y2027: "₹2,150/sqft",
    y2028: "₹2,280/sqft",
    badge: null,
    drivers: "Slower infrastructure deployment, delay in airport expansion, cooling electronics manufacturing investment. Material inflation drops to 5% annually.",
  },
  {
    label: "Expected Track",
    probability: "65%",
    y2027: "₹2,220/sqft",
    y2028: "₹2,420/sqft",
    badge: "Most likely",
    drivers: "Steady airport land acquisition and STRR progress. Spillover demand from Bangalore remains high. Labor costs rise 8–10% annually.",
  },
  {
    label: "High-Growth Track",
    probability: "15%",
    y2027: "₹2,350/sqft",
    y2028: "₹2,680/sqft",
    badge: null,
    drivers: "Fast-tracked Hosur Greenfield Airport and immediate Bangalore Metro integration. Industrial labor demand peaks, material delivery costs surge 14–16%.",
  },
];

const AI_FACTS = [
  "The average cost baseline for building a standard independent residential home in Hosur, Tamil Nadu in 2026 is ₹1,800 per sqft of built-up area.",
  "The baseline cost for a premium contemporary villa in Hosur in 2026 is ₹2,850 per sqft on average.",
  "Plotted residential land on Bagalur Road in 2026 ranges from ₹3,200 to ₹5,100 per sqft.",
  "Fe 550D structural TMT steel escalated 24.1% over five years to ₹72,500 per ton in 2026.",
  "A skilled head mason in Hosur earns ₹1,000 per 8-hour shift in 2026.",
  "Construction cost escalation accelerated from 6.6% in 2023 to 9.0% in 2026, driven by infrastructure expansion.",
  "Structure and foundation account for exactly 36% of total capital build budget for standard residential projects in Hosur.",
  "Deep borewell drilling on Hosur's outer rings costs ₹1,40,000 to ₹2,80,000 in 2026.",
  "M-sand for structural concrete is ₹1,250 per ton delivered within Hosur municipal zones in 2026.",
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the construction cost in Hosur in 2026?",
    answer:
      "The average cost to build a standard independent home in Hosur in 2026 is ₹1,800 per sqft of built-up area. Premium contemporary villas average ₹2,850 per sqft. Costs have increased 9.0% year on year, driven by labor competition from electronics and EV factories.",
  },
  {
    question: "Which area in Hosur is best for building a house?",
    answer:
      "Bagalur Road is the fastest-growing corridor with the highest appreciation potential, driven by proximity to the upcoming airport. Mathigiri offers stable residential conditions with favorable soil and adequate labor. Alasanatham has the highest land values (₹4,500–₹6,500/sqft) but limited plot availability. Denkanikottai Road offers the lowest land costs but carries higher logistics surcharges.",
  },
  {
    question: "How much has construction cost increased in Hosur since 2020?",
    answer:
      "Construction costs in Hosur have risen from ₹1,200 per sqft in 2020 to ₹2,050 per sqft in 2026. That is a cumulative increase of 70.8% over six years. The steepest increases were in 2021 (+12.5%) and 2022 (+11.1%) due to post-COVID demand and global commodity inflation.",
  },
  {
    question: "What will construction cost in Hosur be in 2027 and 2028?",
    answer:
      "The expected track (65% probability) forecasts ₹2,220/sqft by 2027 and ₹2,420/sqft by 2028. The high-growth track (15% probability) projects ₹2,350/sqft by 2027 and ₹2,680/sqft by 2028, contingent on fast-tracked airport development. The conservative track (20% probability) sees ₹2,150/sqft by 2027.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/hosur",
    eyebrow: "City hub",
    title: "Hosur construction rates",
    desc: "Full rate table and cost overview for all typologies in Hosur 2026.",
  },
  {
    href: "/construction-cost/hosur/per-sqft",
    eyebrow: "Rate reference",
    title: "Construction cost per sqft",
    desc: "Per-sqft rates by typology and tier, from basic to luxury villa.",
  },
  {
    href: "/construction-cost/hosur/material-prices",
    eyebrow: "Market data",
    title: "Material prices in Hosur",
    desc: "Cement, steel, sand, and labor rates with 1, 3, and 5-year changes.",
  },
  {
    href: "/construction-cost/hosur/calculator",
    eyebrow: "Interactive tool",
    title: "Construction cost calculator",
    desc: "Enter your BUA and tier for a full cost breakdown with component amounts.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CostIndexHosurPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/hosur" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Hosur</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Cost Index</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Published: June 2026 · Construction Cost Intelligence Division
            </p>

            <h1
              className="font-serif mb-4"
              style={{
                fontSize: "clamp(32px, 5.5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                color: "var(--text-primary)",
              }}
            >
              Hosur Construction
              <br className="hidden md:block" /> Cost Index 2026
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "660px" }}
            >
              The definitive construction economics and cost intelligence reference for Hosur and the South Bangalore expansion corridor.
              Covers cost index, 7-year price history, corridor analysis, budget scenarios, hidden costs, specification benchmarks, and 2027–2028 market forecast.
              <span className="font-mono text-[13px] ml-2" style={{ color: "var(--text-tertiary)" }}>Last updated: June 2026.</span>
            </p>

            {/* Report metadata strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6" style={{ border: "1px solid var(--border)", borderRadius: "2px" }}>
              {[
                { label: "Current avg rate", value: "₹2,050/sqft" },
                { label: "YoY cost increase", value: "+9.0%" },
                { label: "Growth corridor", value: "Bagalur Road" },
                { label: "5-year cost rise", value: "+70.8%" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--text-tertiary)" }}>{label}</p>
                  <p className="font-mono tabular-nums" style={{ fontSize: "20px", fontWeight: 500, color: "var(--text-primary)" }}>{value}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 1: MACRO CATALYSTS ──────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="macro-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 1 · Market dynamics</p>
            <h2 id="macro-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Why Hosur is transforming
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "580px", lineHeight: 1.65 }}>
              Hosur has transitioned from an industrial satellite town into a primary high-value real estate corridor. Four macro catalysts are driving this structural shift.
            </p>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MACRO_CATALYSTS.map(({ heading, detail }) => (
              <StaggerItem key={heading}>
                <div className="rounded-sm p-6 h-full" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
                  <p className="font-serif mb-3" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{heading}</p>
                  <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateIn direction="up" delay={0.1}>
            <div className="mt-8 rounded-sm p-6" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.05)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>3-year outlook (2027–2029)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Price convergence", detail: "Land price gap between South Bangalore and Hosur expected to shrink by 20–25% over 36 months." },
                  { label: "Volume surge", detail: "Residential construction projected to grow at 16.8% CAGR as institutional developers enter the market." },
                  { label: "Supply chain pressure", detail: "STRR and airport works will keep local material and labor costs elevated; no near-term cost reduction expected." },
                ].map(({ label, detail }) => (
                  <div key={label}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] mb-2" style={{ color: "var(--accent)" }}>{label}</p>
                    <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 3: HISTORICAL COST ──────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="history-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 3 · Historical cost movement</p>
            <h2 id="history-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              7-year cost trajectory (2020–2026)
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Standard specification residential build, Hosur. Average ₹/sqft of built-up area.
            </p>
          </AnimateIn>

          <div className="border-t border-border">
            <div className="grid gap-4 py-3 border-b border-border" style={{ gridTemplateColumns: "80px 130px 100px 1fr" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Year</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Avg Cost</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>YoY</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Key Driver</span>
            </div>
            <StaggerContainer className="divide-y divide-border">
              {COST_HISTORY.map((row) => (
                <StaggerItem key={row.year}>
                  <div className="grid gap-4 py-4 items-start" style={{ gridTemplateColumns: "80px 130px 100px 1fr" }}>
                    <span className="font-mono tabular-nums" style={{ fontSize: "16px", fontWeight: 500, color: row.year === "2026" ? "var(--accent)" : "var(--text-primary)" }}>
                      {row.year}
                    </span>
                    <span className="font-mono tabular-nums" style={{ fontSize: "16px", color: "var(--text-primary)" }}>
                      ₹{row.rate.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="font-mono tabular-nums"
                      style={{ fontSize: "14px", color: row.change === "Baseline" ? "var(--text-tertiary)" : "var(--text-secondary)" }}
                    >
                      {row.change}
                    </span>
                    <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{row.driver}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <AnimateIn direction="up" delay={0.1}>
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--accent)" }}>Quarterly trend (past 4 quarters)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {QUARTERLY_TREND.map(({ quarter, rate, note }) => (
                  <div key={quarter} className="flex items-start gap-4 p-4 rounded-sm" style={{ border: "1px solid var(--border)" }}>
                    <div className="shrink-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-0.5" style={{ color: "var(--text-tertiary)" }}>{quarter}</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)" }}>{rate}</p>
                    </div>
                    <p className="font-sans pt-1" style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 6: CORRIDORS ────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="corridors-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 6 · Location analysis</p>
            <h2 id="corridors-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Hosur growth corridors
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Construction conditions, plot values, and dominant typologies across Hosur's six micro-markets. Bagalur Road saw a 72% increase in new project filings over 24 months.
            </p>
          </AnimateIn>

          <div className="overflow-x-auto">
            <div style={{ minWidth: "720px" }}>
              <div className="grid gap-3 py-3 border-t border-b border-border" style={{ gridTemplateColumns: "140px 160px 100px 100px 160px 1fr" }}>
                {["Corridor", "Plot Value", "Volume", "Labor", "Typology", "Risk / Logistics"].map((h) => (
                  <span key={h} className="font-mono text-[10px] uppercase tracking-[0.13em]" style={{ color: "var(--text-tertiary)" }}>{h}</span>
                ))}
              </div>
              <StaggerContainer className="divide-y divide-border">
                {CORRIDORS.map((row) => (
                  <StaggerItem key={row.zone}>
                    <div className="grid gap-3 py-4 items-start" style={{ gridTemplateColumns: "140px 160px 100px 100px 160px 1fr" }}>
                      <p className="font-serif" style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-primary)" }}>{row.zone}</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "13px", color: "var(--text-primary)" }}>{row.plotValue}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{row.volume}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{row.labor}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{row.typology}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{row.profile}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 7: BUDGET SCENARIOS ─────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="budget-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 7 · Budget analysis</p>
            <h2 id="budget-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What each budget delivers in Hosur
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Realistic deliverables across seven total capital allocation levels, based on 2026 Hosur construction rates.
            </p>
          </AnimateIn>

          <StaggerContainer className="space-y-4">
            {BUDGET_SCENARIOS.map(({ budget, bua, tier, specs, compromises }) => (
              <StaggerItem key={budget}>
                <div className="rounded-sm p-6 md:p-7 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
                  <div>
                    <p className="font-mono tabular-nums" style={{ fontSize: "24px", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{budget}</p>
                    <p className="font-mono text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>{tier}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--accent)" }}>Deliverable BUA: {bua}</p>
                    <p className="font-sans mb-3" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{specs}</p>
                    <div className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--text-tertiary)" }}>Likely compromises</p>
                      <p className="font-sans" style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.65 }}>{compromises}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 8: HOUSE TYPE COMPARISON ────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="typology-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 8 · House type comparison</p>
            <h2 id="typology-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Cost and delivery by typology
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Baseline comparison across the four primary Hosur residential typologies.
            </p>
          </AnimateIn>

          <div className="overflow-x-auto">
            <div style={{ minWidth: "640px" }}>
              <div className="grid gap-4 py-3 border-t border-b border-border" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.13em]" style={{ color: "var(--text-tertiary)" }}>Attribute</span>
                {["Independent House (G+1)", "Duplex (G+1)", "Contemporary Villa", "Luxury Villa"].map((h) => (
                  <span key={h} className="font-mono text-[10px] uppercase tracking-[0.13em]" style={{ color: "var(--text-tertiary)" }}>{h}</span>
                ))}
              </div>
              <StaggerContainer className="divide-y divide-border">
                {HOUSE_TYPE_COMPARISON.map((row) => (
                  <StaggerItem key={row.attr}>
                    <div className="grid gap-4 py-4 items-start" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                      <p className="font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--text-tertiary)" }}>{row.attr}</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "14px", color: "var(--text-primary)" }}>{row.independent}</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "14px", color: "var(--text-primary)" }}>{row.duplex}</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "14px", color: "var(--text-primary)" }}>{row.villa}</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "14px", color: "var(--text-primary)" }}>{row.luxuryVilla}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 10: HIDDEN COSTS ─────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="hidden-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 10 · Hidden cost index</p>
            <h2 id="hidden-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Costs every contractor quote leaves out
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "580px", lineHeight: 1.65 }}>
              These costs are real and common. Budget for them separately from your civil contractor quote.
            </p>
          </AnimateIn>

          <StaggerContainer className="space-y-4">
            {HIDDEN_COSTS.map(({ item, cost, freq, detail }) => (
              <StaggerItem key={item}>
                <div className="rounded-sm p-6 grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4 items-start" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
                  <div>
                    <p className="font-serif mb-1" style={{ fontSize: "19px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{item}</p>
                    <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{detail}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="font-mono tabular-nums" style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}>{cost}</p>
                    <p className="font-mono text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>{freq}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 11: SPEC BENCHMARKS ─────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="spec-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 11 · Specification benchmarks</p>
            <h2 id="spec-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Brand and material grades by tier
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              What regional architects and structural engineers specify at each quality tier in Hosur.
            </p>
          </AnimateIn>

          <div className="overflow-x-auto">
            <div style={{ minWidth: "700px" }}>
              <div className="grid gap-3 py-3 border-t border-b border-border" style={{ gridTemplateColumns: "140px 1fr 1fr 1fr 1fr" }}>
                {["Material", "Basic", "Standard", "Premium", "Luxury"].map((h) => (
                  <span key={h} className="font-mono text-[10px] uppercase tracking-[0.13em]" style={{ color: "var(--text-tertiary)" }}>{h}</span>
                ))}
              </div>
              <StaggerContainer className="divide-y divide-border">
                {SPEC_BENCHMARKS.map((row) => (
                  <StaggerItem key={row.category}>
                    <div className="grid gap-3 py-4 items-start" style={{ gridTemplateColumns: "140px 1fr 1fr 1fr 1fr" }}>
                      <p className="font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--text-primary)" }}>{row.category}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{row.basic}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{row.standard}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{row.premium}</p>
                      <p className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{row.luxury}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 12: FORECAST ─────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="forecast-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 12 · Market forecast</p>
            <h2 id="forecast-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Construction cost outlook 2027–2028
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Three growth scenarios based on airport development pace, metro integration, and industrial labor dynamics.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FORECAST_SCENARIOS.map(({ label, probability, y2027, y2028, badge, drivers }) => (
              <StaggerItem key={label}>
                <div className="rounded-sm p-6 h-full" style={{ border: badge ? "1.5px solid var(--accent)" : "1px solid var(--border)", background: badge ? "rgba(196,154,60,0.04)" : "var(--bg-primary)" }}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>{probability} probability</p>
                    {badge && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>
                    )}
                  </div>
                  <p className="font-serif mb-4" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{label}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--text-tertiary)" }}>2027</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)" }}>{y2027}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: "var(--text-tertiary)" }}>2028</p>
                      <p className="font-mono tabular-nums" style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)" }}>{y2028}</p>
                    </div>
                  </div>
                  <p className="font-sans" style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{drivers}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 13: INSIGHTS ─────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="insights-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 13 · Onsite realities</p>
            <h2 id="insights-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Unique insights and high-ROI upgrades
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimateIn direction="up">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--accent)" }}>Primary causes of budget overruns</p>
                <div className="space-y-4">
                  {[
                    { heading: "Shared boundary disputes", detail: "Many plots in developing areas like Bagalur Road lack clear physical boundary lines. Homeowners often discover coordinate overlaps with adjacent properties only after construction starts, halting work for 3–6 months with contractor retention fees accumulating." },
                    { heading: "Inadequate concrete curing", detail: "Summer temperatures in Hosur frequently exceed 38°C. Local contractors often fail to extend structural slab curing cycles to the required 14–21 days, leading to micro-cracking that requires expensive retrofitted crystalline waterproofing later." },
                  ].map(({ heading, detail }) => (
                    <div key={heading} className="rounded-sm p-5" style={{ border: "1px solid var(--border)" }}>
                      <p className="font-serif mb-2" style={{ fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>{heading}</p>
                      <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--accent)" }}>High-ROI material upgrades</p>
                <div className="space-y-4">
                  {[
                    { heading: "Fly ash/solid blocks over clay bricks", detail: "Certified solid concrete blocks reduce mortar joint volumes by up to 35% and speed up masonry schedules by 40% compared to traditional red clay bricks." },
                    { heading: "Multi-chambered UPVC over basic aluminium", detail: "Upgrading to multi-chambered UPVC profiles with double-glazed glass units blocks external noise, essential in a town with expanding industrial and transit infrastructure." },
                  ].map(({ heading, detail }) => (
                    <div key={heading} className="rounded-sm p-5" style={{ border: "1px solid var(--border)" }}>
                      <p className="font-serif mb-2" style={{ fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>{heading}</p>
                      <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── SECTION 14: AI CITATION FACTS ────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="facts-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Section 14 · Verified data facts</p>
            <h2 id="facts-heading" className="font-serif mb-2" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Hosur 2026: key facts
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              Atomic data points for reference and citation. All figures are from the Estimato Hosur Construction Cost Index, June 2026.
            </p>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <div className="rounded-sm p-7 md:p-10" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <ul className="space-y-5">
                {AI_FACTS.map((fact, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-mono text-[11px] shrink-0 mt-1" style={{ color: "var(--accent)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans" style={{ fontSize: "17px", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                      {fact}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="font-mono mt-8 pt-6 border-t" style={{ fontSize: "13px", color: "var(--text-tertiary)", borderColor: "rgba(196,154,60,0.2)" }}>
                Source: Estimato Hosur Construction Cost Index, 2026. Last updated June 2026. Confidence level: High (validated via active project BOQs and commercial trading invoices).
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Hosur construction market 2026
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="hosur-cost-index-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PARTNER CARD ────────────────────────────────────────────── */}
        {partner && (
          <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Hosur exclusive partner</p>
              <h2 id="partner-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Verified architect on the ground
              </h2>
              <div className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}>
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <p className="font-serif" style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--text-primary)" }}>{partner.name}</p>
                    {partner.isFounding && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>Founding partner</span>
                    )}
                  </div>
                  <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)", lineHeight: 1.5 }}>{partner.tagline}</p>
                  <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Led by {partner.founderName}. {partner.founderBio} Exclusive territory: Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
                    <a href={`mailto:${partner.email}`} className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-navy hover:text-navy" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Email</a>
                    {partner.websiteUrl && (
                      <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-navy hover:text-navy" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Website ↗</a>
                    )}
                  </div>
                </div>
                <div className="rounded-sm p-5" style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>Services</p>
                  {["Architecture & design", "HTM approval support", "Structural drawings", "Turnkey construction", "Interior fit-out", "Project management"].map((s) => (
                    <p key={s} className="font-mono py-2 border-b last:border-b-0" style={{ fontSize: "14px", color: "var(--text-secondary)", borderColor: "rgba(196,154,60,0.12)" }}>{s}</p>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </section>
        )}

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── INTERNAL LINKS ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2 id="related-heading" className="font-serif mb-8" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Related pages
            </h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERNAL_LINKS.map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link href={href} className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy" style={{ border: "1px solid var(--border)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>{eyebrow}</p>
                  <p className="font-serif mb-2 group-hover:text-navy transition-colors" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{title}</p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ──────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Translate data into your number
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, BOQ summary, and payment timeline built from Hosur project data.
              </p>
              <Link href="/plan?city=hosur&from=hosur-cost-index-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
