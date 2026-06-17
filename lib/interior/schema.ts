import { z } from "zod";

export const CITIES = ["hosur", "bangalore-outskirts", "bangalore-urban"] as const;
export const PROPERTY_TYPES = ["apartment", "independent-house", "villa"] as const;
export const BHK_OPTIONS = ["1", "2", "3", "4", "5+"] as const;
export const CURRENT_STATES = ["bare-shell", "semi-finished", "occupied"] as const;
export const FINISH_LEVELS = ["basic", "standard", "premium", "ultra-luxury"] as const;
export const SCOPE_KEYS = [
  "modular-kitchen",
  "wardrobes",
  "false-ceiling",
  "painting",
  "flooring",
  "electrical",
  "tv-storage",
  "loose-furniture",
  "soft-furnishings",
  "lighting",
] as const;

export const InteriorInputSchema = z.object({
  city: z.enum(CITIES),
  propertyType: z.enum(PROPERTY_TYPES),
  bhk: z.enum(BHK_OPTIONS),
  carpetArea: z
    .number()
    .min(200, "Minimum carpet area is 200 sqft")
    .max(10000, "Maximum carpet area is 10,000 sqft"),
  currentState: z.enum(CURRENT_STATES),
  scope: z.array(z.enum(SCOPE_KEYS)).min(1, "Select at least one scope item"),
  finishLevel: z.enum(FINISH_LEVELS),
});

export const InteriorLeadSchema = z.object({
  name: z.string().min(2, "Enter your name").max(100),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit number"),
  city: z.string().min(2),
  message: z.string().max(500).optional(),
  // Calculator context — saved alongside lead
  propertyType: z.string().optional(),
  bhk: z.string().optional(),
  carpetArea: z.number().optional(),
  currentState: z.string().optional(),
  finishLevel: z.string().optional(),
  scope: z.array(z.string()).optional(),
  estimateMin: z.number().optional(),
  estimateMax: z.number().optional(),
});
