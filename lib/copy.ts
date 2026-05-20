import type { QualityTier } from "@/types";

// ─── Tier identity ───────────────────────────────────────────────────────────

export const TIER_NAMES: Record<QualityTier, string> = {
  essential: "Considered Living",
  economy: "Refined Living",
  premium: "Crafted Living",
  luxury: "Heritage Living",
};

export const TIER_DESCRIPTIONS: Record<QualityTier, string> = {
  essential:
    "Honest construction with practical material choices. Built to last, planned to budget.",
  economy:
    "Elevated finishes and considered detailing for homeowners who notice the small things.",
  premium:
    "Architectural intent in every surface. Materials chosen for permanence, not appearance.",
  luxury:
    "A home built to outlast trends. Timeless architecture, considered finishes, generational quality.",
};

export const TIER_MATERIALS: Record<QualityTier, string> = {
  essential: "Local tiles, standard sanitary, basic electricals",
  economy: "Kajaria flooring, Hindware sanitary, Anchor switches",
  premium: "Somany Duragres, Jaquar fittings, Legrand switches",
  luxury: "Italian marble, Kohler sanitary, Schneider electrics",
};

// ─── CTAs ─────────────────────────────────────────────────────────────────────

export const CTA = {
  heroPrimary: "Begin your projection",
  heroSecondary: "Read our methodology",
  planStart: "Begin",
  planNext: "Continue",
  planFinal: "Generate planning report",
  requestIntro: "Request one introduction",
  getPDF: "Download report",
  newEstimate: "Start a new projection",
} as const;

// ─── Homepage ────────────────────────────────────────────────────────────────

export const HOME = {
  heroHeadline: "Plan your home with\nthe numbers that matter.",
  heroSubhead:
    "A construction cost projection built from verified Hosur and Bengaluru BOQs. Seven steps. No contractor pitch.",
  processHeadline: "Three steps to clarity.",
  reportHeadline: "A 12-page report built for homeowners.",
  whyHeadline: "Why Estimato is different.",
  citiesBody:
    "We currently calibrate rates for Hosur, Krishnagiri, Attibele, Bagalur, Anekal, Sarjapura, Devanahalli, Yelahanka, Bengaluru Rural, Electronic City, Bengaluru Urban, and Whitefield. Quarterly updates.",
  faqHeadline: "Common questions.",
  finalCtaHeadline: "Know your numbers\nbefore you break ground.",
} as const;

// ─── Authority stats (replaces vanity numbers) ────────────────────────────────

export const AUTHORITY_STATS = [
  {
    label: "Verified BOQs",
    sublabel: "From real Hosur and Bengaluru projects, 2026",
  },
  {
    label: "Methodology",
    sublabel: "Published and open to review",
  },
  {
    label: "No upsell",
    sublabel: "Free for homeowners, forever",
  },
] as const;

// ─── Results page ─────────────────────────────────────────────────────────────

export const RESULTS = {
  coverLabel: "ESTIMATO · PROJECTION 2026",
  estimateLabel: "ESTIMATED CONSTRUCTION COST",
  breakdownHeadline: "Where the money goes.",
  breakdownBody:
    "Seven cost segments, drawn from real Bengaluru-belt project BOQs. Each percentage is a decision you can revisit.",
  timelineHeadline: "Build timeline.",
  lifestyleHeadline: "Living standards compared.",
  advisoryHeadline: "Notes from the methodology.",
  advisoryBody:
    "Observations specific to your projection. Worth reading before you speak to any contractor.",
  footerHeadline: "Continue your build with the right partner.",
  footerBody:
    "We connect you with one verified architect in your area. No cold calls. You decide if you want to talk.",
} as const;

// ─── Plan flow ────────────────────────────────────────────────────────────────

export const PLAN = {
  step1Question: "What are you building?",
  step1Subhead: "Select the type that best describes your project.",
  step2Question: "Where is your plot?",
  step2Subhead:
    "Location significantly affects material costs and labour rates.",
  step3Question: "What is your built-up area?",
  step3Subhead: "The total floor area across all levels, excluding the terrace.",
  step4Question: "How is your home configured?",
  step4Subhead: "Floors, parking, and other structural choices.",
  step5Question: "Choose your quality level.",
  step5Subhead: "Sets the material standard for your entire home.",
  step6Question: "How finished would you like the interiors?",
  step6Subhead: "Ranges from basic to fully furnished.",
  step7Question: "Where should we send your projection?",
  step7Subhead: "Your numbers, delivered free. No spam. No obligation.",
} as const;

// ─── City confidence indicators ───────────────────────────────────────────────
// Note: these are representative figures; replace with real BOQ data as available

export const CITY_CONFIDENCE: Record<string, { boqs: number; variance: string }> = {
  hosur: { boqs: 28, variance: "±3%" },
  krishnagiri: { boqs: 14, variance: "±5%" },
  attibele: { boqs: 11, variance: "±5%" },
  bagalur: { boqs: 9, variance: "±6%" },
  anekal: { boqs: 12, variance: "±5%" },
  sarjapura: { boqs: 18, variance: "±4%" },
  devanahalli: { boqs: 16, variance: "±4%" },
  yelahanka: { boqs: 22, variance: "±4%" },
  "bengaluru-rural": { boqs: 13, variance: "±6%" },
  "electronic-city": { boqs: 19, variance: "±4%" },
  "bengaluru-urban": { boqs: 31, variance: "±3%" },
  whitefield: { boqs: 24, variance: "±4%" },
  other: { boqs: 8, variance: "±8%" },
};

// ─── Phase names ──────────────────────────────────────────────────────────────

export const PHASE_LABELS = [
  "Foundation",
  "Structure",
  "Finishing",
  "Handover",
] as const;
