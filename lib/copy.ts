import type { QualityTier } from "@/types";

// ─── Tier identity ───────────────────────────────────────────────────────────
// TODO: VERIFY WITH VINOD — tier names dropped "Living" suffix per v3 brief

export const TIER_NAMES: Record<QualityTier, string> = {
  essential: "Considered",
  economy: "Refined",
  premium: "Crafted",
  luxury: "Heritage",
};

export const TIER_DESCRIPTIONS: Record<QualityTier, string> = {
  essential:
    "Honest construction with practical materials. Built to last. Built to budget.",
  economy:
    "Elevated finishes and considered detailing. For homeowners who notice the small things.",
  premium:
    "Architectural intent in every surface. Materials chosen for permanence.",
  luxury:
    "A home built to outlast trends. Timeless architecture. Generational quality.",
};

export const TIER_MATERIALS: Record<QualityTier, string> = {
  essential: "Local tiles, standard sanitary, basic electricals",
  economy: "Kajaria flooring, Hindware sanitary, Anchor switches",
  premium: "Somany Duragres, Jaquar fittings, Legrand switches",
  luxury: "Italian marble, Kohler sanitary, Schneider electrics",
};

// TODO: VERIFY WITH VINOD — rate bands per sqft
export const TIER_RATE_BANDS: Record<QualityTier, string> = {
  essential: "₹1,400–₹1,800 per sqft",
  economy: "₹1,800–₹2,400 per sqft",
  premium: "₹2,400–₹3,200 per sqft",
  luxury: "₹3,200–₹5,000 per sqft",
};

// ─── CTAs ─────────────────────────────────────────────────────────────────────

export const CTA = {
  heroPrimary: "Begin your projection",
  heroSecondary: "Read the methodology",
  navPrimary: "Begin",
  planStart: "Begin",
  planNext: "Continue",
  planBack: "Back",
  planFinal: "Generate planning report",
  requestIntro: "Request one introduction",
  getPDF: "Download PDF",
  newEstimate: "Start a new projection",
  readMethodology: "Read the methodology",
} as const;

// ─── Homepage ────────────────────────────────────────────────────────────────

export const HOME = {
  heroHeadline: "Plan your home with numbers\nthat actually hold up.",
  heroSubhead:
    "A construction cost projection built from real Hosur and Bengaluru BOQs. Updated quarterly. Seven steps. No contractor pitch.",
  heroMethodologyNudge: "Read our methodology before you trust the number.",
  processLabel: "The process",
  processHeadline: "Three steps to a number you can defend.",
  reportHeadline: "What your projection includes.",
  reportSubhead:
    "Not a number. A document you can take to any architect, banker, or family member.",
  whyLabel: "Our philosophy",
  whyHeadline: "What makes a projection trustworthy.",
  citiesLabel: "Coverage",
  citiesBody:
    "We currently calibrate rates for Hosur, Krishnagiri, Attibele, Bagalur, Anekal, Sarjapura, Devanahalli, Yelahanka, Bengaluru Rural, Electronic City, Bengaluru Urban, and Whitefield. Quarterly updates.",
  faqLabel: "Common questions",
  faqHeadline: "Common questions.",
  finalCtaLabel: "Get started",
  finalCtaHeadline: "Plan before you build.",
  finalCtaSubhead: "About three minutes. Free. No account.",
} as const;

// ─── Sample projection (hero right column typographic moment) ─────────────────

export const SAMPLE_PROJECTION = {
  label: "A SAMPLE PROJECTION",
  range: "₹68L – ₹84L",
  spec: "1,500 sqft · Hosur · Considered tier",
} as const;

// ─── Authority tiles (replaces vanity stats) ──────────────────────────────────

export const AUTHORITY_TILES = [
  {
    label: "DATA",
    body: "Built from verified Hosur and Bengaluru BOQs. Updated each quarter.",
  },
  {
    label: "METHOD",
    body: "Every assumption is published. Open to your architect's review.",
  },
  {
    label: "PRICE",
    body: "Free for homeowners. We don't earn from your build.",
  },
] as const;

// ─── Authority stats (hero stats row — label + sublabel shape) ────────────────

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

// ─── How it works (3 steps) ───────────────────────────────────────────────────

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us about the build",
    body: "Home type, location, plot size, floors, and finishing tier. Seven steps. About three minutes.",
  },
  {
    step: "02",
    title: "Read your projection",
    body: "A cost range, a breakdown across seven segments, a phase-wise timeline, and notes specific to your plot.",
  },
  {
    step: "03",
    title: "Talk to one architect (optional)",
    body: "If you want a consultation, we introduce one verified firm in your area. You decide.",
  },
] as const;

// ─── What your projection includes (6 items) ─────────────────────────────────

export const WHAT_YOU_GET = [
  {
    label: "Cost range with confidence indicator",
    body: "A min–max range calibrated to your city and tier, with the ±6% confidence band explained.",
  },
  {
    label: "Seven-segment cost breakdown",
    body: "Civil structure, finishing, MEP, doors, kitchen, approvals, and contingency — each as a percentage and a rupee figure.",
  },
  {
    label: "Phase-wise timeline and payment plan",
    body: "Four build phases with typical durations and the percentage of total cost due at each milestone.",
  },
  {
    label: "Hidden costs we surface before you find them",
    body: "Approval delays, labour seasonality, material lead times, and specification drift — flagged upfront.",
  },
  {
    label: "City-specific market notes",
    body: "Labour rate trends, material availability, and approval timelines specific to your location.",
  },
  {
    label: "What is NOT included (and why)",
    body: "Furniture, landscaping, solar, architect fees — all listed clearly so your budget has no surprises.",
  },
] as const;

// ─── Why different (4 points) ─────────────────────────────────────────────────

export const WHY_DIFFERENT = [
  {
    title: "Honest numbers",
    body: "We show a range, not a single optimistic figure. You see exactly what drives costs up or down.",
  },
  {
    title: "No contractor pitch",
    body: "We earn nothing from your construction. Partners pay per qualified lead — that is it.",
  },
  {
    title: "Verified partners only",
    body: "We evaluate architecture firms before listing them. Not a directory. Not paid placements.",
  },
  {
    title: "Always free",
    body: "No upsell inside the tool. No premium tier. Free forever for homeowners.",
  },
] as const;

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    question: "How accurate is the projection?",
    answer:
      "Within ±6% in most cases. We update base rates each quarter against real project BOQs. The largest source of variance is labour cost movement in your city during the build period. Read the methodology for details.",
  },
  {
    question: "Is Estimato actually free?",
    answer:
      "Yes, and there is no upsell. We earn a fixed fee when a homeowner asks us to introduce them to an architect. Partners pay us. You don't.",
  },
  {
    question: "Will I get cold-called?",
    answer:
      "No. We only share your details with one partner, and only if you ask us to.",
  },
  {
    question: "What's NOT included in the projection?",
    answer:
      "Furniture, landscaping beyond basic site work, solar systems, smart home automation, and architect fees (typically 8-12% of build cost). All listed in the methodology.",
  },
  {
    question: "Can I get a PDF?",
    answer:
      "Yes. The projection page has a download option in the top right.",
  },
  {
    question: "Which cities are supported?",
    answer:
      "Hosur, Krishnagiri, Attibele, Bagalur, Anekal, Sarjapura, Devanahalli, Yelahanka, Bengaluru Rural, Electronic City, Bengaluru Urban, and Whitefield.",
  },
  {
    question: "What if I want to challenge a number?",
    answer:
      "Email methodology@estimato.in with your project details. We respond to every methodology challenge within seven days.",
  },
  {
    question: "Who built this?",
    answer:
      "Estimato is built with Design Intend, an architecture practice in the Hosur-Bengaluru belt. Founder Ar. Chittrarasan worked on Chase Bank, Starbucks, and GMFI projects at Gensler. The rate data comes from Design Intend's project BOQs.",
  },
] as const;

// ─── Results page ─────────────────────────────────────────────────────────────

export const RESULTS = {
  coverLabel: "ESTIMATO · PROJECTION 2026",
  estimateLabel: "ESTIMATED CONSTRUCTION COST",
  estimateFooter: "Calibrated for [CITY] [TIER] standards, 2026 rates.",
  breakdownHeadline: "Where the money goes.",
  breakdownBody:
    "Seven segments, drawn from real Hosur-Bengaluru project BOQs. Each line is a decision you can revisit with your architect.",
  breakdownNote: "Tap any segment for the assumptions behind it.",
  timelineHeadline: "How the build unfolds.",
  timelineBody:
    "Four phases. The payment plan below assumes a standard milestone schedule. Adjust with your architect.",
  lifestyleHeadline: "Other tiers you could consider.",
  lifestyleBody: "If you adjust the finishing tier, here's where the projection moves.",
  advisoryHeadline: "Notes from the methodology.",
  advisoryBody:
    "Observations specific to this projection. Worth reading before you talk to any contractor.",
  footerHeadline: "Want to discuss this with an architect?",
  footerBody:
    "We can introduce one verified firm in your area. No cold calls. You decide if you want to talk.",
  methodologyLink: "How we calculated this",
  confidenceBand: "CONFIDENCE · ±6%",
} as const;

// ─── Plan flow ────────────────────────────────────────────────────────────────

export const PLAN = {
  step1Question: "What kind of home are you planning?",
  step1Subhead: "Pick the closest match. You can change this later.",
  step2Question: "Where will it stand?",
  step2Subhead:
    "Location significantly affects material costs and labour rates.",
  step3Question: "How large is the plot?",
  step3Subhead: "The total built-up area across all floors, excluding the terrace.",
  step4Question: "How many floors?",
  step4Subhead: "Each floor adds civil structure and finishing cost.",
  step5Question: "Tell us about the inside.",
  step5Subhead: "Bedrooms, bathrooms, and living areas.",
  step6Question: "Which finishing tier?",
  step6Subhead: "This drives a third of your total cost. Read carefully.",
  step7Question: "Where should we send your projection?",
  step7Subhead: "Your numbers, delivered free. No spam. No obligation.",
  confidenceNote: "BASED ON VERIFIED BOQS · UPDATED MAY 2026",
} as const;

// ─── City confidence indicators ───────────────────────────────────────────────
// TODO: VERIFY WITH VINOD — BOQ counts and variance figures need real backing data

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

// ─── Phase labels ──────────────────────────────────────────────────────────────

export const PHASE_LABELS = [
  "Foundation",
  "Structure",
  "Finishing",
  "Handover",
] as const;

// ─── Methodology page ─────────────────────────────────────────────────────────
// TODO: VERIFY WITH VINOD — data source counts and update dates

export const METHODOLOGY = {
  pageLabel: "METHODOLOGY · UPDATED MAY 2026",
  heroHeadline: "How we arrive at\nyour projection.",
  heroBody:
    "This document explains every input, every multiplier, and every assumption behind an Estimato projection. It is open to your architect's review and challenge.",
  sourcesHeadline: "What the projection is built from.",
  formulaHeadline: "How the numbers come together.",
  formulaIntro:
    "An Estimato projection is the output of a layered calculation. Each layer maps to a specific input you provided during planning. The structure is below.",
  exclusionsHeadline: "What is not in your projection.",
  exclusionsIntro:
    "We are explicit about this. Most platforms hide it. Below is everything you should plan separately.",
  confidenceHeadline: "Why we show a range, not a number.",
  confidenceIntro:
    "Every projection has a ±6% confidence band. Four forces drive that variance, in roughly this order of impact:",
  cadenceHeadline: "How often we update.",
  cadenceBody:
    "Base rates: quarterly. Labour index: monthly. Material survey: quarterly. Statutory schedules: annually or when published changes are notified.",
  lastUpdated: "LAST UPDATED · MAY 2026",
  challengeHeadline: "Have data we should incorporate?",
  challengeBody:
    "We update against real BOQs. If you have project data we should account for, write to us.",
  challengeEmail: "methodology@estimato.in",
} as const;

// ─── Trust signals ────────────────────────────────────────────────────────────

export const TRUST = {
  heroNudge: "Read our methodology before you trust the number.",
  resultMethodologyLink: "How we calculated this →",
  confidenceHeader: "CONFIDENCE · ±6% · DATA AS OF MAY 2026",
  cityIntelligenceLabel: "CITY INTELLIGENCE",
} as const;
