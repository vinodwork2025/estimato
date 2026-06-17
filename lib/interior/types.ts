export type City = "hosur" | "bangalore-outskirts" | "bangalore-urban";
export type PropertyType = "apartment" | "independent-house" | "villa";
export type BHK = "1" | "2" | "3" | "4" | "5+";
export type CurrentState = "bare-shell" | "semi-finished" | "occupied";
export type FinishLevel = "basic" | "standard" | "premium" | "ultra-luxury";

export type ScopeKey =
  | "modular-kitchen"
  | "wardrobes"
  | "false-ceiling"
  | "painting"
  | "flooring"
  | "electrical"
  | "tv-storage"
  | "loose-furniture"
  | "soft-furnishings"
  | "lighting";

export interface InteriorInput {
  city: City;
  propertyType: PropertyType;
  bhk: BHK;
  carpetArea: number;
  currentState: CurrentState;
  scope: ScopeKey[];
  finishLevel: FinishLevel;
}

export interface CostRange {
  min: number;
  max: number;
}

export interface CategoryCost {
  label: string;
  range: CostRange;
}

export interface InteriorResult {
  isUltraLuxury: false;
  headline: CostRange;
  perSqft: CostRange;
  categories: CategoryCost[];
  designFeeRange: CostRange | null;
}

export interface UltraLuxuryResult {
  isUltraLuxury: true;
}

export type CalcResult = InteriorResult | UltraLuxuryResult;
