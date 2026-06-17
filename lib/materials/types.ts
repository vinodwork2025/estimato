export interface MaterialPrice {
  id: string;
  city: string;
  material: string;
  unit: string;
  price_min: number;
  price_max: number;
  source: string;
  recorded_on: string;
  created_at: string;
}

export interface MaterialWithChange {
  material: string;
  unit: string;
  price_min: number;
  price_max: number;
  source: string;
  recorded_on: string;
  prev_min: number | null;
  prev_max: number | null;
  change_pct: number | null;
  direction: "up" | "down" | "flat" | null;
}

export interface TrendPoint {
  month: string;
  recorded_on: string;
  price_min: number;
  price_max: number;
  midpoint: number;
}

export interface MaterialTrend {
  material: string;
  unit: string;
  points: TrendPoint[];
}
