export type HomeType =
  | "villa"
  | "duplex"
  | "farmhouse"
  | "contemporary"
  | "budget"
  | "luxury-villa";

export type Facing =
  | "north"
  | "south"
  | "east"
  | "west"
  | "north-east"
  | "north-west"
  | "south-east"
  | "south-west";

export type SoilType = "red" | "black-cotton" | "rocky" | "sandy" | "unknown";

export type Slope = "flat" | "mild" | "steep";

export type ParkingType = "none" | "covered" | "stilt";

export type QualityTier = "basic" | "standard" | "premium" | "luxury" | "ultra-luxury";

export type InteriorLevel = "basic" | "modular" | "premium" | "luxury-furnished";

export type PlannerInput = {
  homeType: HomeType;
  city: string;
  area?: string;
  pincode?: string;
  plot: {
    length: number;
    width: number;
    facing: Facing;
    cornerPlot: boolean;
    roadWidth: number;
    soilType: SoilType;
    slope: Slope;
  };
  configuration: {
    floors: number;
    builtUpArea: number;
    parking: ParkingType;
    terrace: boolean;
    balconies: number;
    lift: boolean;
    basement: boolean;
    homeOffice: boolean;
    rentalFloor: boolean;
  };
  qualityTier: QualityTier;
  interiorLevel: InteriorLevel;
};

export type Phase = {
  name: string;
  durationDays: number;
  cost: number;
  description: string;
  paymentPercent: number;
};

export type Warning = {
  category: "approvals" | "interiors" | "materials" | "labour" | "overruns";
  title: string;
  message: string;
  estimatedImpact: string;
};

export type Insight = {
  type: "opportunity" | "warning" | "note";
  title: string;
  message: string;
};

export type CalculationResult = {
  totalRange: { min: number; max: number; mid: number };
  costPerSqft: number;
  timeline: { phases: Phase[]; totalDays: number };
  breakdown: {
    civilStructure: number;
    finishes: number;
    interiors: number;
    mep: number;
    elevation: number;
    approvalsAndFees: number;
    contingency: number;
  };
  hiddenCostWarnings: Warning[];
  smartInsights: Insight[];
  recommendedContingency: number;
  comparisonScenarios: {
    basic: number;
    standard: number;
    premium: number;
    luxury: number;
  };
  isCustomQuote?: boolean;
};

export type Partner = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  founderName: string;
  founderBio: string;
  founderPhotoUrl: string;
  logoUrl: string;
  websiteUrl: string;
  whatsappNumber: string;
  email: string;
  exclusiveCities: string[];
  status: "active" | "paused" | "pending";
  perLeadPrice: number;
  isFounding: boolean;
};

export type Lead = {
  id?: string;
  name: string;
  phone: string;
  countryCode: string;
  email?: string;
  city: string;
  area?: string;
  planningTimeline: "within-3-months" | "3-6-months" | "6-12-months" | "exploring";
  consentToPartnerShare: boolean;
  calculationInput: PlannerInput;
  calculationResult: CalculationResult;
  sourcePage?: string;
  assignedPartnerId?: string | null;
  pdfUrl?: string;
};
