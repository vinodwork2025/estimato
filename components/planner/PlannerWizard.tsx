"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlannerStore } from "@/lib/store/planner-store";
import { Button } from "@/components/ui/Button";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { CITIES } from "@/data/cities";
import { COMING_SOON_CITIES } from "@/lib/cost-engine/rates";
import { getBaseRate, INTERIOR_RATES } from "@/lib/cost-engine/rates";
import { formatINRShort } from "@/lib/utils";
import type {
  HomeType, QualityTier, ParkingType, InteriorLevel, Facing, SoilType, Slope,
} from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 5;
const DISPLAY_STEPS = 6;
const STEP_LABELS = ["Type", "Location", "Size", "Build", "Finish", "Results"];

// ─── Static data ──────────────────────────────────────────────────────────────

const HOME_TYPES: {
  value: HomeType;
  label: string;
  description: string;
  sqftRange: string;
  range: string;
  image: string;
  recommended?: boolean;
}[] = [
  {
    value: "villa",
    label: "Villa",
    description: "Premium family home",
    sqftRange: "2,000–5,000 sqft",
    range: "₹50L – 1.2Cr",
    image: "/homes/villa.png",
  },
  {
    value: "duplex",
    label: "Duplex",
    description: "Two-level modern home",
    sqftRange: "1,200–3,000 sqft",
    range: "₹40L – 90L",
    image: "/homes/duplex.png",
  },
  {
    value: "farmhouse",
    label: "Farmhouse",
    description: "Open spaces and outdoor living",
    sqftRange: "2,000–6,000 sqft",
    range: "₹35L – 1.5Cr",
    image: "/homes/farmhouse.png",
  },
  {
    value: "contemporary",
    label: "Contemporary",
    description: "Modern architecture style",
    sqftRange: "1,500–4,000 sqft",
    range: "₹45L – 1Cr",
    image: "/homes/contemporary.png",
    recommended: true,
  },
  {
    value: "budget",
    label: "Budget Home",
    description: "Cost-optimized construction",
    sqftRange: "800–2,000 sqft",
    range: "₹25L – 50L",
    image: "/homes/budget.png",
  },
  {
    value: "luxury-villa",
    label: "Luxury Villa",
    description: "High-end finishes and larger spaces",
    sqftRange: "3,000–8,000 sqft",
    range: "₹1.2Cr – 3Cr",
    image: "/homes/luxury-villa.png",
  },
];

const QUALITY_OPTIONS: { value: QualityTier; label: string; badge: string; description: string; image: string; materials: string }[] = [
  { value: "basic", label: "Basic", badge: "Budget-friendly", description: "Functional construction. Standard materials. No compromises on structure.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80", materials: "Local tiles · Standard sanitary · Basic electricals" },
  { value: "standard", label: "Standard", badge: "Most popular", description: "Better finishes. Branded fittings. The choice for most homeowners.", image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80", materials: "Kajaria flooring · Hindware sanitary · Anchor switches" },
  { value: "premium", label: "Premium", badge: "Design-focused", description: "Quality materials throughout. Designed to impress and last.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", materials: "Somany Duragres · Jaquar fittings · Legrand switches" },
  { value: "luxury", label: "Luxury", badge: "Heritage quality", description: "High-end finishes. Architect-designed details. Built to a higher standard.", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=80", materials: "Italian marble · Kohler sanitary · Schneider electrics" },
  { value: "ultra-luxury", label: "Ultra Luxury", badge: "Custom quote", description: "No constraints. Best materials. Built for permanence.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80", materials: "Imported stone · Kohler / Duravit · Lutron / Schneider" },
];

const INTERIOR_OPTIONS: { value: InteriorLevel; label: string; desc: string }[] = [
  { value: "basic", label: "Basic essentials", desc: "Carpentry only — no built-in furniture" },
  { value: "modular", label: "Modular standard", desc: "Modular kitchen and wardrobes" },
  { value: "premium", label: "Full modular", desc: "Full modular and designer finishes" },
  { value: "luxury-furnished", label: "Luxury furnished", desc: "Architect-curated, fully furnished" },
];

const FACINGS: { value: Facing; label: string }[] = [
  { value: "north", label: "N" }, { value: "north-east", label: "NE" }, { value: "east", label: "E" },
  { value: "south-east", label: "SE" }, { value: "south", label: "S" }, { value: "south-west", label: "SW" },
  { value: "west", label: "W" }, { value: "north-west", label: "NW" },
];

const SLOPES: { value: Slope; label: string; desc: string }[] = [
  { value: "flat", label: "Flat", desc: "No extra cost" },
  { value: "mild", label: "Mild slope", desc: "+4% civil" },
  { value: "steep", label: "Steep slope", desc: "+10% civil" },
];

const SOIL_OPTIONS: { value: SoilType; label: string }[] = [
  { value: "unknown", label: "Don't know" },
  { value: "red", label: "Red soil" },
  { value: "black-cotton", label: "Black cotton" },
  { value: "rocky", label: "Rocky" },
  { value: "sandy", label: "Sandy" },
];

const FLOOR_OPTIONS = [
  { value: 1, label: "G", desc: "Ground only" },
  { value: 2, label: "G+1", desc: "Two floors" },
  { value: 3, label: "G+2", desc: "Three floors" },
  { value: 4, label: "G+3", desc: "Four floors" },
];

// ─── Finish level design data ──────────────────────────────────────────────────

const FINISH_IMAGES: Record<string, string> = {
  basic: "/finishes/basic.webp",
  standard: "/finishes/standard.webp",
  premium: "/finishes/premium.webp",
  luxury: "/finishes/luxury.webp",
  "ultra-luxury": "/finishes/ultra-luxury.webp",
};

const FINISH_COPY: Record<string, { badge: string; statement: string }> = {
  basic:         { badge: "Budget-friendly", statement: "Built on trusted essentials for practical homeowners." },
  standard:      { badge: "Most popular",    statement: "Branded materials with enhanced comfort and aesthetics." },
  premium:       { badge: "Design-focused",  statement: "Contemporary villa-grade specifications with premium finishes." },
  luxury:        { badge: "Heritage quality",statement: "Architect-selected materials and elevated detailing." },
  "ultra-luxury":{ badge: "Custom quote",    statement: "Bespoke villa specifications without compromise." },
};

const FINISH_BRANDS: Record<string, string[]> = {
  basic:         ["Tata Steel", "Ramco Cement", "Parryware", "Anchor", "Local Tiles"],
  standard:      ["Tata Steel", "Ultratech", "Kajaria", "Hindware", "Anchor"],
  premium:       ["Tata Steel", "Ultratech", "Kajaria", "Jaquar", "Legrand"],
  luxury:        ["Tata Steel", "Ultratech", "Kajaria Prima", "Kohler", "Schneider"],
  "ultra-luxury":["Tata Steel", "Ultratech Premium", "Italian Marble", "Duravit", "Grohe", "Jung", "Hafele"],
};

const TIER_ORDER: QualityTier[] = ["basic", "standard", "premium", "luxury", "ultra-luxury"];
const TIER_LABEL: Record<string, string> = {
  basic: "Basic", standard: "Standard", premium: "Premium",
  luxury: "Luxury", "ultra-luxury": "Ultra Luxury",
};

const COMPARE_ROWS: { label: string; values: Record<string, string> }[] = [
  { label: "Steel",     values: { basic: "Tata Steel",        standard: "Tata Steel",       premium: "Tata Steel",       luxury: "Tata Steel",        "ultra-luxury": "Tata Steel" } },
  { label: "Cement",    values: { basic: "Ramco",             standard: "Ultratech",         premium: "Ultratech",        luxury: "Ultratech",         "ultra-luxury": "Ultratech Premium" } },
  { label: "Flooring",  values: { basic: "Local Tiles",       standard: "Kajaria",           premium: "Kajaria / Somany", luxury: "Kajaria Prima",     "ultra-luxury": "Italian Marble" } },
  { label: "Sanitary",  values: { basic: "Parryware",         standard: "Hindware",          premium: "Jaquar",           luxury: "Kohler",            "ultra-luxury": "Duravit / Grohe" } },
  { label: "Electrical",values: { basic: "Anchor",            standard: "Anchor",            premium: "Legrand",          luxury: "Schneider",         "ultra-luxury": "Jung" } },
  { label: "Plumbing",  values: { basic: "Standard ISI",      standard: "Standard ISI",      premium: "Jaquar CP",        luxury: "Kohler CP",         "ultra-luxury": "Grohe CP" } },
  { label: "Doors",     values: { basic: "Flush Doors",       standard: "Solid Flush",       premium: "Solid Wood",       luxury: "Engineered Wood",   "ultra-luxury": "Hafele Hardware" } },
  { label: "Kitchen",   values: { basic: "Masonry Platform",  standard: "Basic Modular",     premium: "Full Modular",     luxury: "Designer Modular",  "ultra-luxury": "Bespoke" } },
  { label: "Wardrobes", values: { basic: "Painted Ply",       standard: "Basic Modular",     premium: "Premium Modular",  luxury: "Architect Modular", "ultra-luxury": "Custom Fitted" } },
  { label: "Ceiling",   values: { basic: "Plain Plaster",     standard: "POP False Ceiling", premium: "L-Panel + LED",    luxury: "Coffered + LED",    "ultra-luxury": "Designer Coffered" } },
  { label: "Paint",     values: { basic: "Tractor Emulsion",  standard: "Apcolite Sheen",    premium: "Royale Luxury",    luxury: "Dulux Velvet Touch","ultra-luxury": "Imported Matte" } },
  { label: "Built for", values: { basic: "Budget-conscious families", standard: "Most Indian homeowners", premium: "Quality seekers", luxury: "High-end buyers", "ultra-luxury": "No-compromise builds" } },
];

const INTERIOR_AUTO: Record<QualityTier, InteriorLevel> = {
  basic: "basic",
  standard: "modular",
  premium: "premium",
  luxury: "luxury-furnished",
  "ultra-luxury": "luxury-furnished",
};

const ESTIMATE_INCLUDES = [
  "Construction Cost",
  "Material Quantities",
  "BOQ Summary",
  "Cost Per Sq.Ft.",
  "Budget Guidance",
];

// ─── Wizard state ─────────────────────────────────────────────────────────────

interface WizardState {
  homeType: HomeType | null;
  city: string;
  plotLength: number;
  plotWidth: number;
  facing: Facing;
  cornerPlot: boolean;
  roadWidth: number;
  soilType: SoilType;
  slope: Slope;
  floors: number;
  builtUpArea: number;
  parking: ParkingType;
  terrace: boolean;
  balconies: number;
  lift: boolean;
  basement: boolean;
  homeOffice: boolean;
  rentalFloor: boolean;
  qualityTier: QualityTier | null;
  interiorLevel: InteriorLevel | null;
}

const L0 = 40, W0 = 30;

const INITIAL: WizardState = {
  homeType: null,
  city: "",
  plotLength: L0,
  plotWidth: W0,
  facing: "north",
  cornerPlot: false,
  roadWidth: 30,
  soilType: "unknown",
  slope: "flat",
  floors: 1,
  builtUpArea: Math.round(L0 * W0 * 0.6),
  parking: "none",
  terrace: false,
  balconies: 0,
  lift: false,
  basement: false,
  homeOffice: false,
  rentalFloor: false,
  qualityTier: null,
  interiorLevel: null,
};

function buildFullInput(w: WizardState) {
  return {
    homeType: w.homeType!,
    city: w.city,
    plot: {
      length: Math.max(15, Math.min(200, w.plotLength)),
      width: Math.max(15, Math.min(200, w.plotWidth)),
      facing: w.facing,
      cornerPlot: w.cornerPlot,
      roadWidth: w.roadWidth,
      soilType: w.soilType,
      slope: w.slope,
    },
    configuration: {
      floors: w.floors,
      builtUpArea: Math.max(400, Math.min(15000, w.builtUpArea)),
      parking: w.parking,
      terrace: w.terrace,
      balconies: w.balconies,
      lift: w.lift,
      basement: w.basement,
      homeOffice: w.homeOffice,
      rentalFloor: w.rentalFloor,
    },
    qualityTier: w.qualityTier!,
    interiorLevel: w.interiorLevel!,
  };
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-secondary mb-3">
      {children}
    </p>
  );
}

function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 min-h-[44px] font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-200 focus:outline-none"
      style={{
        borderRadius: "2px",
        border: "1px solid",
        borderColor: active ? "var(--navy)" : "var(--border)",
        background: active ? "var(--navy)" : "transparent",
        color: active ? "#FFFFFF" : "var(--text-secondary)",
      }}
    >
      {children}
    </button>
  );
}

function ToggleRow({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p style={{ fontSize: "17px", color: "var(--text-primary)", fontWeight: 400 }}>{label}</p>
        <p className="font-mono text-text-secondary" style={{ fontSize: "13px" }}>{hint}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        className="relative focus:outline-none shrink-0"
        style={{ width: "44px", height: "24px" }}
      >
        <div style={{ width: "44px", height: "24px", borderRadius: "12px", background: checked ? "var(--accent)" : "#DDE4ED", transition: "background 0.2s" }} />
        <div style={{ position: "absolute", top: "3px", left: checked ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "9px", background: "white", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
      </button>
    </div>
  );
}

// ─── Desktop step breadcrumb ──────────────────────────────────────────────────

function DesktopStepBreadcrumb({ current }: { current: number }) {
  return (
    <div className="flex items-center select-none">
      <span className="font-mono text-[11px] text-text-secondary mr-2.5 shrink-0 tracking-[0.04em]">
        Step {current} of {DISPLAY_STEPS}
      </span>
      <span className="text-border mr-2.5 text-[12px]">·</span>
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <span key={label} className="flex items-center shrink-0">
            <span
              className="font-mono text-[11px] tracking-[0.05em]"
              style={{
                color: isActive ? "var(--navy)" : isDone ? "var(--accent)" : "var(--text-tertiary)",
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? "1.5px solid var(--navy)" : "1.5px solid transparent",
                paddingBottom: "1px",
                transition: "color 0.2s",
              }}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span className="font-mono text-[10px] text-text-tertiary mx-1.5">→</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── Step 1: Home type ────────────────────────────────────────────────────────

function Step1HomeType({ selected, onSelect }: { selected: HomeType | null; onSelect: (v: HomeType) => void }) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-28 md:pb-12 max-w-5xl mx-auto w-full">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-6">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-secondary mb-2">
          Step 1 of {DISPLAY_STEPS}
        </p>

        {/* Completion promise */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] text-text-tertiary">Takes less than 2 minutes</span>
          <span className="inline-block w-px h-3 bg-border shrink-0" />
          <span className="font-mono text-[11px] text-text-tertiary">No sign-up required</span>
        </div>

        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          What type of home are you planning?
        </h1>
        <p className="text-text-secondary mt-2.5" style={{ fontSize: "17px", lineHeight: 1.65 }}>
          Choose the closest option. You can refine details later.
        </p>
      </motion.div>

      {/* Value preview */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        className="mb-5 rounded-sm p-4"
        style={{ background: "rgba(14,33,70,0.035)", border: "1px solid rgba(14,33,70,0.07)" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-3">
          Your estimate includes
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {ESTIMATE_INCLUDES.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="shrink-0">
                <path d="M1 4L3.5 6.5L9 1" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[11px] text-text-secondary">{item}</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Card grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {HOME_TYPES.map((ht, i) => {
          const isSelected = selected === ht.value;
          return (
            <motion.button
              key={ht.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 + 0.15, ease }}
              onClick={() => onSelect(ht.value)}
              className="relative overflow-hidden text-left focus:outline-none group"
              style={{
                borderRadius: "4px",
                border: `2px solid ${isSelected ? "var(--accent)" : "transparent"}`,
                boxShadow: isSelected
                  ? "0 0 0 1px rgba(168,130,59,0.5), 0 6px 24px rgba(168,130,59,0.20)"
                  : "0 2px 8px rgba(14,33,70,0.06)",
                minHeight: "150px",
                aspectRatio: "3/2",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
              // CSS hover only on desktop — touch devices don't trigger hover
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(14,33,70,0.14)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(14,33,70,0.06)";
                } else {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(168,130,59,0.5), 0 6px 24px rgba(168,130,59,0.20)";
                }
              }}
              aria-pressed={isSelected}
            >
              {/* Gold top accent on selection */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: "var(--accent)" }} />
              )}

              {/* Recommended badge */}
              {ht.recommended && !isSelected && (
                <div
                  className="absolute top-3 left-3 z-10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ background: "rgba(168,130,59,0.88)", color: "white", borderRadius: "2px" }}
                >
                  Recommended
                </div>
              )}

              <Image
                src={ht.image}
                alt={ht.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{
                  filter: isSelected
                    ? "brightness(0.72) saturate(1.05)"
                    : "brightness(0.82) saturate(0.95)",
                  transition: "filter 0.3s",
                }}
              />

              {/* Strong bottom gradient for text legibility over bright images */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,16,40,0.97) 0%, rgba(6,16,40,0.78) 30%, rgba(6,16,40,0.20) 58%, rgba(6,16,40,0) 100%)" }} />

              {/* Checkmark top-right on selection */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent)" }}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p
                  className="font-serif text-white leading-tight drop-shadow-sm"
                  style={{ fontSize: "clamp(16px, 2.4vw, 21px)", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  {ht.label}
                </p>
                <p
                  className="font-sans mt-1"
                  style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "rgba(255,255,255,0.82)", lineHeight: 1.4 }}
                >
                  {ht.description}
                </p>
                <p
                  className="font-mono mt-0.5"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)", letterSpacing: "0.04em" }}
                >
                  {ht.sqftRange}
                </p>
                {isSelected && (
                  <div className="flex items-center gap-1 mt-2">
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.2 5.8L8 1" stroke="rgba(212,180,110,1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "rgba(212,180,110,0.95)" }}>
                      Selected
                    </span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease }}
        className="text-center font-mono text-text-tertiary mt-6"
        style={{ fontSize: "14px" }}
      >
        Not sure? Choose the closest option — you can adjust project specifications later.
      </motion.p>
    </div>
  );
}

// ─── Step 2: Location ─────────────────────────────────────────────────────────

function Step2Location({ city, onChange, prefilled }: { city: string; onChange: (v: string) => void; prefilled?: boolean }) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-28 md:pb-12 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-secondary">
            Step 2 of {DISPLAY_STEPS}
          </p>
          {prefilled && (
            <span
              className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
              style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}
            >
              Pre-filled
            </span>
          )}
        </div>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          Where will it stand?
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "18px" }}>
          {prefilled
            ? "We've selected Hosur based on your search. Change it if needed."
            : "Location affects material costs and labour rates significantly."}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }}>
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Select city">
          {CITIES.map((c) => {
            const isSelected = city === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange(c.value)}
                role="radio"
                aria-checked={isSelected}
                className="text-left px-5 py-4 transition-all duration-200 focus:outline-none"
                style={{
                  borderRadius: "4px",
                  border: "1.5px solid",
                  borderColor: isSelected ? "var(--navy)" : "var(--border)",
                  background: isSelected ? "var(--navy)" : "transparent",
                }}
              >
                <p style={{ fontSize: "18px", color: isSelected ? "#FFFFFF" : "var(--text-primary)", fontWeight: 400 }}>
                  {c.label}
                </p>
                {"subtitle" in c && c.subtitle && (
                  <p className="font-mono mt-0.5" style={{ fontSize: "13px", color: isSelected ? "rgba(255,255,255,0.55)" : "var(--text-tertiary)" }}>
                    {c.subtitle}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary mb-3">
            More cities coming soon
          </p>
          <div className="flex flex-wrap gap-2">
            {COMING_SOON_CITIES.map((name) => (
              <div
                key={name}
                className="px-4 py-2 font-mono text-[12px]"
                style={{
                  borderRadius: "2px",
                  border: "1px dashed var(--border)",
                  color: "var(--text-tertiary)",
                  userSelect: "none",
                }}
              >
                {name} ·{" "}
                <span style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Step 3: Plot details ─────────────────────────────────────────────────────

function Step3Plot({ state, onChange }: { state: WizardState; onChange: (p: Partial<WizardState>) => void }) {
  const plotArea = state.plotLength * state.plotWidth;
  const sliderPct = ((Math.max(900, Math.min(40000, plotArea)) - 900) / (40000 - 900)) * 100;

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const area = Number(e.target.value);
    const side = Math.round(Math.sqrt(area));
    const suggestedBUA = Math.max(400, Math.min(15000, Math.round(side * side * 0.6 * state.floors)));
    onChange({ plotLength: side, plotWidth: side, builtUpArea: suggestedBUA });
  }

  function handleDimension(field: "plotLength" | "plotWidth", val: number) {
    const l = field === "plotLength" ? val : state.plotLength;
    const w = field === "plotWidth" ? val : state.plotWidth;
    const suggestedBUA = Math.max(400, Math.min(15000, Math.round(l * w * 0.6 * state.floors)));
    onChange({ [field]: Math.max(1, val), builtUpArea: suggestedBUA });
  }

  return (
    <div className="px-5 md:px-10 pt-8 pb-28 md:pb-12 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-secondary mb-3">
          Step 3 of {DISPLAY_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          Tell us about your plot.
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "18px" }}>
          Plot dimensions affect foundation and structure costs.
        </p>
      </motion.div>

      {/* Big plot area */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease }} className="text-center py-6">
        <p className="font-mono text-navy leading-none tabular-nums" style={{ fontSize: "clamp(64px, 14vw, 110px)", fontWeight: 300, letterSpacing: "-0.03em" }}>
          {plotArea > 0 ? plotArea.toLocaleString("en-IN") : "—"}
        </p>
        <p style={{ fontSize: "17px", color: "#7B93A8", marginTop: "8px" }}>square feet</p>
        <p className="font-mono text-text-secondary mt-1" style={{ fontSize: "13px", letterSpacing: "0.06em" }}>
          {state.plotLength} ft × {state.plotWidth} ft
        </p>
      </motion.div>

      {/* Slider */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14, ease }} style={{ maxWidth: "480px", margin: "0 auto 32px", width: "100%" }}>
        <input
          type="range"
          min={900}
          max={40000}
          step={100}
          value={Math.max(900, Math.min(40000, plotArea))}
          onChange={handleSlider}
          className="w-full"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            height: "2px",
            background: `linear-gradient(to right, var(--navy) ${sliderPct}%, #DDE4ED ${sliderPct}%)`,
            borderRadius: "0",
            outline: "none",
            cursor: "pointer",
          }}
          aria-label="Plot area slider"
        />
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[12px] text-text-secondary tracking-[0.1em]">900</span>
          <span className="font-mono text-[12px] text-text-secondary tracking-[0.1em]">40,000 sqft</span>
        </div>
      </motion.div>

      {/* L × W inputs */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18, ease }} className="mb-8">
        <SectionLabel>Or enter exact dimensions</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          {(["plotLength", "plotWidth"] as const).map((field) => (
            <div key={field}>
              <label className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-secondary mb-2 block">
                {field === "plotLength" ? "Length" : "Width"} (ft)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={15}
                max={200}
                value={field === "plotLength" ? state.plotLength : state.plotWidth}
                onChange={(e) => handleDimension(field, parseInt(e.target.value) || 1)}
                className="w-full focus:outline-none"
                style={{ borderBottom: "1px solid #DDE4ED", padding: "8px 0", fontSize: "20px", color: "var(--text-primary)", background: "transparent" }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Suggested BUA callout */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }} className="mb-8">
        <div className="p-4" style={{ background: "rgba(168,130,59,0.07)", border: "1px solid rgba(168,130,59,0.2)", borderRadius: "3px" }}>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--accent)" }}>
            Suggested built-up area
          </p>
          <p className="font-mono text-navy" style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em" }}>
            {Math.round(state.plotLength * state.plotWidth * 0.6).toLocaleString("en-IN")} sqft
          </p>
          <p className="font-mono text-text-secondary mt-1" style={{ fontSize: "13px" }}>
            60% plot coverage for 1 floor · multiply by floors for multi-storey
          </p>
        </div>
      </motion.div>

      {/* Facing */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22, ease }} className="mb-8">
        <SectionLabel>Plot facing</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {FACINGS.map((f) => (
            <PillBtn key={f.value} active={state.facing === f.value} onClick={() => onChange({ facing: f.value })}>
              {f.label}
            </PillBtn>
          ))}
        </div>
      </motion.div>

      {/* Slope */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26, ease }} className="mb-8">
        <SectionLabel>Plot slope</SectionLabel>
        <div className="flex flex-wrap gap-6 border-b border-border pb-6">
          {SLOPES.map((s) => {
            const active = state.slope === s.value;
            return (
              <button key={s.value} type="button" onClick={() => onChange({ slope: s.value })}
                className="text-left focus:outline-none pb-1 transition-colors duration-200"
                style={{ fontSize: "19px", color: active ? "var(--accent)" : "var(--text-primary)", borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent" }}
              >
                {s.label}
                <span className="block font-mono" style={{ fontSize: "13px", color: active ? "var(--accent)" : "var(--text-tertiary)", marginTop: "2px" }}>
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Soil type */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28, ease }} className="mb-8">
        <SectionLabel>Soil type</SectionLabel>
        <div className="flex flex-wrap gap-2 mb-2">
          {SOIL_OPTIONS.map((s) => (
            <PillBtn key={s.value} active={state.soilType === s.value} onClick={() => onChange({ soilType: s.value })}>
              {s.label}
            </PillBtn>
          ))}
        </div>
        <p className="font-mono text-text-secondary" style={{ fontSize: "13px" }}>
          If unsure, choose &ldquo;Don&rsquo;t know&rdquo; — we flag it as a risk.
        </p>
      </motion.div>

      {/* Road width */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease }} className="mb-8">
        <SectionLabel>Road width in front</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {[20, 30, 40, 60, 80].map((w) => (
            <PillBtn key={w} active={state.roadWidth === w} onClick={() => onChange({ roadWidth: w })}>
              {w} ft
            </PillBtn>
          ))}
        </div>
      </motion.div>

      {/* Corner plot */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32, ease }}>
        <div className="border-t border-border">
          <ToggleRow
            label="Corner plot"
            hint="+6% structure cost for corner exposure"
            checked={state.cornerPlot}
            onChange={(v) => onChange({ cornerPlot: v })}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Step 4: Configuration ────────────────────────────────────────────────────

function Step4Config({ state, onChange }: { state: WizardState; onChange: (p: Partial<WizardState>) => void }) {
  const [buaStr, setBuaStr] = useState("");
  const suggestedBUA = Math.round(state.plotLength * state.plotWidth * 0.6 * state.floors);

  function handleFloorChange(floors: number) {
    const newBUA = Math.max(400, Math.min(15000, Math.round(state.plotLength * state.plotWidth * 0.6 * floors)));
    onChange({ floors, builtUpArea: newBUA });
    setBuaStr("");
  }

  function handleBuaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setBuaStr(raw);
    const v = parseInt(raw);
    if (!isNaN(v) && v >= 400 && v <= 15000) {
      onChange({ builtUpArea: v });
    }
  }

  return (
    <div className="px-5 md:px-10 pt-8 pb-28 md:pb-12 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-secondary mb-3">
          Step 4 of {DISPLAY_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          How will it be built?
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "18px" }}>
          Configuration affects structure and finishing costs significantly.
        </p>
      </motion.div>

      {/* Floors */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }} className="mb-8">
        <SectionLabel>Number of floors</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {FLOOR_OPTIONS.map((f) => {
            const isSelected = state.floors === f.value;
            return (
              <button key={f.value} type="button" onClick={() => handleFloorChange(f.value)}
                className="py-4 text-center focus:outline-none transition-all duration-200"
                style={{ borderRadius: "4px", border: "1.5px solid", borderColor: isSelected ? "var(--accent)" : "var(--border)", background: isSelected ? "rgba(168,130,59,0.06)" : "white" }}
              >
                <p className="font-mono text-navy" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em" }}>{f.label}</p>
                <p className="font-mono text-text-secondary mt-1" style={{ fontSize: "12px" }}>{f.desc}</p>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Built-up area */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15, ease }} className="mb-8">
        <SectionLabel>Built-up area (total across all floors)</SectionLabel>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="number"
              inputMode="numeric"
              min={400}
              max={15000}
              value={buaStr !== "" ? buaStr : state.builtUpArea}
              onChange={handleBuaChange}
              onBlur={() => setBuaStr("")}
              className="w-full focus:outline-none"
              style={{
                borderBottom: "1.5px solid var(--border)",
                padding: "8px 0",
                fontSize: "clamp(24px, 5vw, 32px)",
                color: "var(--text-primary)",
                background: "transparent",
                fontFamily: "var(--font-mono)",
                letterSpacing: "-0.02em",
              }}
            />
          </div>
          <span className="font-mono text-[12px] text-text-secondary shrink-0">sqft</span>
        </div>
        <p className="font-mono text-text-secondary mt-2" style={{ fontSize: "13px" }}>
          Suggested: {suggestedBUA.toLocaleString("en-IN")} sqft
          ({state.plotLength} × {state.plotWidth} ft × 60%{state.floors > 1 ? ` × ${state.floors} floors` : ""})
          {state.builtUpArea !== suggestedBUA && (
            <button
              type="button"
              className="ml-2 underline focus:outline-none"
              style={{ color: "var(--accent)" }}
              onClick={() => { onChange({ builtUpArea: Math.max(400, Math.min(15000, suggestedBUA)) }); setBuaStr(""); }}
            >
              Use suggestion
            </button>
          )}
        </p>
      </motion.div>

      {/* Parking */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }} className="mb-8">
        <SectionLabel>Parking</SectionLabel>
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-border pb-6">
          {([
            { value: "none" as ParkingType, label: "None", hint: "" },
            { value: "covered" as ParkingType, label: "Covered", hint: "+3%" },
            { value: "stilt" as ParkingType, label: "Stilt", hint: "+6%" },
          ]).map((p) => {
            const isSelected = state.parking === p.value;
            return (
              <button key={p.value} type="button" onClick={() => onChange({ parking: p.value })}
                className="text-left focus:outline-none pb-1 transition-colors duration-200"
                style={{ fontSize: "20px", color: isSelected ? "var(--accent)" : "var(--text-primary)", borderBottom: isSelected ? "2px solid var(--accent)" : "2px solid transparent" }}
              >
                {p.label}
                {p.hint && (
                  <span className="block font-mono" style={{ fontSize: "13px", color: isSelected ? "var(--accent)" : "var(--text-tertiary)", marginTop: "2px" }}>{p.hint}</span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Balconies */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24, ease }} className="mb-8">
        <SectionLabel>Balconies</SectionLabel>
        <div className="flex items-center gap-5">
          <button type="button" onClick={() => onChange({ balconies: Math.max(0, state.balconies - 1) })} disabled={state.balconies === 0}
            className="w-12 h-12 border border-border flex items-center justify-center text-lg focus:outline-none disabled:opacity-30 transition-all"
          >
            −
          </button>
          <span className="font-mono tabular-nums w-8 text-center" style={{ fontSize: "32px", fontWeight: 400, color: "var(--text-primary)" }}>
            {state.balconies}
          </span>
          <button type="button" onClick={() => onChange({ balconies: Math.min(6, state.balconies + 1) })} disabled={state.balconies === 6}
            className="w-12 h-12 border border-border flex items-center justify-center text-lg focus:outline-none disabled:opacity-30 transition-all"
          >
            +
          </button>
          {state.balconies > 0 && (
            <span className="font-mono text-[11px] text-text-secondary tabular-nums">
              +₹{(state.balconies * 50000).toLocaleString("en-IN")} approx
            </span>
          )}
        </div>
      </motion.div>

      {/* Extras */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28, ease }}>
        <SectionLabel>Optional extras</SectionLabel>
        <div className="divide-y divide-border border-t border-border">
          <ToggleRow label="Terrace" hint="Usable roof terrace" checked={state.terrace} onChange={(v) => onChange({ terrace: v })} />
          <ToggleRow label="Lift" hint="+₹6.5L installed" checked={state.lift} onChange={(v) => onChange({ lift: v })} />
          <ToggleRow label="Basement" hint="+22% civil cost" checked={state.basement} onChange={(v) => onChange({ basement: v })} />
          <ToggleRow label="Home office" hint="+₹1.8L" checked={state.homeOffice} onChange={(v) => onChange({ homeOffice: v })} />
          <ToggleRow label="Rental floor" hint="Separate rental unit" checked={state.rentalFloor} onChange={(v) => onChange({ rentalFloor: v })} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Compare modal ────────────────────────────────────────────────────────────

function CompareModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.62)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-white w-full sm:max-w-5xl flex flex-col rounded-t-xl sm:rounded-xl shadow-2xl"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-border shrink-0">
          <div>
            <h2 className="font-serif text-navy" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.015em" }}>
              Finish Level Comparison
            </h2>
            <p className="font-mono mt-0.5" style={{ fontSize: "11px", color: "var(--text-tertiary)", letterSpacing: "0.06em" }}>
              All five tiers · Hosur 2026 rates
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none flex items-center justify-center"
            style={{ minWidth: 44, minHeight: 44 }}
            aria-label="Close comparison"
          >
            ✕
          </button>
        </div>

        {/* Table — scrollable both axes on mobile */}
        <div className="overflow-auto flex-1">
          <table style={{ minWidth: "700px", borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ background: "var(--navy)", position: "sticky", top: 0, zIndex: 2 }}>
                <th
                  className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "rgba(255,255,255,0.42)", minWidth: "110px", position: "sticky", left: 0, background: "var(--navy)" }}
                >
                  Feature
                </th>
                {TIER_ORDER.map((tier) => (
                  <th key={tier}
                    className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em]"
                    style={{ color: tier === "ultra-luxury" ? "#C49A3C" : "rgba(255,255,255,0.88)", minWidth: "128px" }}
                  >
                    {TIER_LABEL[tier]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? "#F7F9FB" : "white" }}>
                  <td
                    className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-tertiary)", position: "sticky", left: 0, background: i % 2 === 0 ? "#F7F9FB" : "white" }}
                  >
                    {row.label}
                  </td>
                  {TIER_ORDER.map((tier) => (
                    <td key={tier} className="px-4 py-3" style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.45 }}>
                      {row.values[tier]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="px-5 sm:px-8 py-3 border-t border-border shrink-0" style={{ background: "#FAFBFC" }}>
          <p className="font-mono text-text-tertiary text-center" style={{ fontSize: "11px", letterSpacing: "0.04em" }}>
            Specifications are indicative. Final material choice is confirmed with your contractor.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Quality + Interiors ──────────────────────────────────────────────

function Step5Finish({
  state,
  onChange,
}: {
  state: WizardState;
  onChange: (p: Partial<WizardState>) => void;
}) {
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div className="px-5 md:px-10 pt-8 pb-28 md:pb-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-secondary mb-3">
          Step 5 of {DISPLAY_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          Choose your finish level.
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "18px" }}>
          This drives a third of your total cost. Choose honestly.
        </p>
      </motion.div>

      {/* Cards — horizontal carousel on mobile, 2-col on md, 5-col on xl */}
      <div className="flex md:grid md:grid-cols-2 xl:grid-cols-5 gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none -mx-5 md:mx-0 px-5 md:px-0 pb-4 md:pb-0 mb-10">
        {QUALITY_OPTIONS.map((q, i) => {
          const rate = getBaseRate(state.city || "hosur", q.value);
          const estimated = state.builtUpArea * rate;
          const isSelected = state.qualityTier === q.value;
          const copy = FINISH_COPY[q.value];
          const brands = FINISH_BRANDS[q.value];

          return (
            <motion.div
              key={q.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="group shrink-0 snap-start flex flex-col cursor-pointer"
              style={{
                width: "82vw",
                maxWidth: "320px",
                borderRadius: "20px",
                background: "white",
                boxShadow: isSelected
                  ? "0 0 0 2px #D97706, 0 12px 40px rgba(0,0,0,0.14)"
                  : "0 8px 30px rgba(0,0,0,0.08)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                overflow: "hidden",
              }}
              // On md+, override inline width — grid controls sizing
              onClick={() => onChange({ qualityTier: q.value, interiorLevel: INTERIOR_AUTO[q.value] })}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(0,0,0,0.14)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = isSelected
                  ? "0 0 0 2px #D97706, 0 12px 40px rgba(0,0,0,0.14)"
                  : "0 8px 30px rgba(0,0,0,0.08)";
              }}
            >
              {/* Hero image */}
              <div className="relative overflow-hidden shrink-0" style={{ height: "200px" }}>
                <Image
                  src={FINISH_IMAGES[q.value]}
                  alt={`${q.label} finish level interior — Hosur home construction`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 82vw, (max-width: 1280px) 50vw, 20vw"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                {/* Tier badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1"
                    style={{
                      borderRadius: "3px",
                      background: isSelected ? "#D97706" : "rgba(13,31,60,0.70)",
                      color: "white",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    {copy.badge}
                  </span>
                </div>
                {/* Selected checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "#D97706" }}
                  >
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1 5L5 9L12 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-4">
                {/* Name + rate */}
                <div className="flex items-baseline justify-between mb-1.5">
                  <p className="font-serif text-navy" style={{ fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em" }}>
                    {q.label}
                  </p>
                  <p className="font-mono tabular-nums shrink-0 ml-2" style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500 }}>
                    {q.value === "ultra-luxury" ? "Custom" : `₹${rate.toLocaleString("en-IN")}/sqft`}
                  </p>
                </div>

                {/* Positioning statement */}
                <p className="text-text-secondary mb-3" style={{ fontSize: "13px", lineHeight: 1.55 }}>
                  {copy.statement}
                </p>

                {/* Brand chips — monochrome text tags */}
                <div className="mb-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1.5" style={{ color: "var(--text-tertiary)" }}>
                    Trusted brands
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {brands.map((brand) => (
                      <span
                        key={brand}
                        className="font-mono text-[8px] uppercase tracking-[0.04em] px-1.5 py-0.5 border border-border"
                        style={{ borderRadius: "2px", color: "var(--text-tertiary)", opacity: 0.7 }}
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1" />

                {/* Estimated cost */}
                <div className="pt-3 mb-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--text-tertiary)" }}>
                    Estimated cost
                  </p>
                  <p className="font-mono text-navy tabular-nums" style={{ fontSize: "21px", fontWeight: 400, letterSpacing: "-0.02em" }}>
                    {q.value === "ultra-luxury" ? "Custom quote" : `~${formatINRShort(estimated)}`}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange({ qualityTier: q.value, interiorLevel: INTERIOR_AUTO[q.value] });
                    }}
                    className="w-full py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-200 focus:outline-none"
                    style={{
                      borderRadius: "4px",
                      background: isSelected ? "#D97706" : "var(--navy)",
                      color: "white",
                      border: "none",
                    }}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? "✓ Selected" : "Select finish"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setShowCompare(true); }}
                    className="w-full py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-200 focus:outline-none"
                    style={{
                      borderRadius: "4px",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      background: "transparent",
                    }}
                  >
                    Compare all →
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interior finish level — unchanged logic */}
      {state.qualityTier && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-10">
          <SectionLabel>Interior finish level</SectionLabel>
          <p className="text-text-secondary mb-4" style={{ fontSize: "16px" }}>
            Auto-matched to your quality choice. Override if needed.
          </p>
          <div className="divide-y divide-border border-t border-border">
            {INTERIOR_OPTIONS.map((opt) => {
              const rate = INTERIOR_RATES[opt.value];
              const cost = state.builtUpArea * rate;
              const isSelected = state.interiorLevel === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ interiorLevel: opt.value })}
                  className="w-full text-left flex items-center justify-between py-4 focus:outline-none transition-all duration-200"
                  style={{
                    paddingLeft: "16px",
                    borderLeftWidth: "2px",
                    borderLeftStyle: "solid",
                    borderLeftColor: isSelected ? "var(--accent)" : "transparent",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "17px", color: isSelected ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: isSelected ? 500 : 400 }}>
                      {opt.label}
                    </p>
                    <p className="font-mono text-text-secondary" style={{ fontSize: "13px" }}>{opt.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-mono tabular-nums" style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>
                      ₹{rate.toLocaleString("en-IN")}/sqft
                    </p>
                    <p className="font-mono tabular-nums" style={{ fontSize: "15px", color: isSelected ? "var(--accent)" : "var(--text-tertiary)", fontWeight: isSelected ? 500 : 400 }}>
                      {formatINRShort(cost)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Compare modal portal */}
      {showCompare && createPortal(
        <CompareModal onClose={() => setShowCompare(false)} />,
        document.body
      )}
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

interface PlannerWizardProps {
  defaultCity?: string;
  defaultHomeType?: string;
  defaultPlotL?: string;
  defaultPlotW?: string;
  sourcePage?: string;
  ctaVariant?: "primary" | "secondary";
  partnerId?: string;
}

export function PlannerWizard({
  defaultCity = "",
  defaultHomeType = "",
  defaultPlotL = "",
  defaultPlotW = "",
  sourcePage,
  partnerId,
}: PlannerWizardProps = {}) {
  const router = useRouter();
  const { setInput, setResult, setCalculating } = usePlannerStore();

  const [step, setStep] = useState(() => {
    const hasPlot = defaultCity && defaultHomeType && defaultPlotL && defaultPlotW;
    if (hasPlot) return 4;
    if (defaultCity && defaultHomeType) return 3;
    return 1;
  });
  const [dir, setDir] = useState(1);
  // Initializer fn runs once — merges defaultCity/defaultHomeType/plot dims into INITIAL state
  const [wizard, setWizard] = useState<WizardState>(() => {
    const validTypes = HOME_TYPES.map((h) => h.value as string);
    const pL = parseInt(defaultPlotL || "0");
    const pW = parseInt(defaultPlotW || "0");
    const useL = pL >= 15 && pL <= 200 ? pL : INITIAL.plotLength;
    const useW = pW >= 15 && pW <= 200 ? pW : INITIAL.plotWidth;
    return {
      ...INITIAL,
      city: defaultCity || INITIAL.city,
      homeType: validTypes.includes(defaultHomeType) ? (defaultHomeType as HomeType) : INITIAL.homeType,
      plotLength: useL,
      plotWidth: useW,
      builtUpArea: Math.round(useL * useW * 0.6),
    };
  });
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => { setCalculating(false); }, [setCalculating]);

  function patch(partial: Partial<WizardState>) {
    setWizard((prev) => ({ ...prev, ...partial }));
  }

  function goTo(n: number) {
    setError(null);
    setDir(n > step ? 1 : -1);
    setStep(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1: return wizard.homeType !== null;
      case 2: return wizard.city !== "";
      case 3: return wizard.plotLength >= 15 && wizard.plotWidth >= 15 && wizard.plotLength * wizard.plotWidth >= 225;
      case 4: return wizard.builtUpArea >= 400 && wizard.builtUpArea <= 15000;
      case 5: return wizard.qualityTier !== null && wizard.interiorLevel !== null;
      default: return false;
    }
  }

  function handleHomeTypeSelect(ht: HomeType) {
    patch({ homeType: ht });
    if (defaultCity) {
      // City pre-filled from city hub — skip location step, go straight to plot.
      setTimeout(() => goTo(3), 280);
    } else if (typeof window !== "undefined" && !window.matchMedia("(max-width: 767px)").matches) {
      // Desktop without pre-fill: auto-advance to location step.
      setTimeout(() => goTo(2), 280);
    }
    // Mobile without pre-fill: sticky action bar handles step 1 → 2.
  }

  async function handleCalculate() {
    if (!wizard.homeType || !wizard.city || !wizard.qualityTier || !wizard.interiorLevel) return;
    setError(null);
    setIsCalculating(true);
    setCalculating(true);

    try {
      const fullInput = buildFullInput(wizard);
      setInput(fullInput);

      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fullInput,
          _meta: { sourcePage: sourcePage ?? null, partnerId: partnerId ?? null },
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error ?? `Server error (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
      router.push("/plan/result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed — please try again.");
      setIsCalculating(false);
      setCalculating(false);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "35%" : "-35%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-35%" : "35%", opacity: 0 }),
  };

  const showContinue = step >= 2;
  const mobilePct = Math.round((step / DISPLAY_STEPS) * 100);
  const selectedHomeType = HOME_TYPES.find((h) => h.value === wizard.homeType);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Planner header */}
      <header className="sticky top-0 z-30 bg-bg-primary border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" aria-label="Estimato home">
            <EstimateLogo size="md" variant="dark" />
          </Link>
          <span className="font-mono text-[12px] text-text-secondary uppercase tracking-[0.18em]">
            Free · No sign-up
          </span>
        </div>
      </header>

      {/* Nav bar with progress */}
      <div className="sticky top-14 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-5 md:px-10">

          {/* Desktop: single row */}
          <div className="hidden md:flex items-center h-12 justify-between">
            <div className="w-16 shrink-0">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary hover:text-navy transition-colors focus:outline-none"
                >
                  ← Back
                </button>
              )}
            </div>
            <DesktopStepBreadcrumb current={step} />
            <div className="w-16 shrink-0" />
          </div>

          {/* Mobile: back + step text row + progress bar */}
          <div className="flex md:hidden flex-col py-2.5 gap-1.5">
            <div className="flex items-center justify-between">
              <div>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary focus:outline-none"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
              </div>
              <span className="font-mono text-[11px] text-text-secondary tracking-[0.04em]">
                {mobilePct}% · Step {step} of {DISPLAY_STEPS}
              </span>
            </div>
            <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${mobilePct}%`, background: "var(--accent)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step panels */}
      <div className="flex-1" style={{ overflowX: "clip" }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease }}
            className="w-full"
          >
            {step === 1 && <Step1HomeType selected={wizard.homeType} onSelect={handleHomeTypeSelect} />}
            {step === 2 && <Step2Location city={wizard.city} onChange={(v) => patch({ city: v })} prefilled={!!defaultCity} />}
            {step === 3 && <Step3Plot state={wizard} onChange={patch} />}
            {step === 4 && <Step4Config state={wizard} onChange={patch} />}
            {step === 5 && <Step5Finish state={wizard} onChange={patch} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error bar */}
      {error && (
        <div className="px-5 py-3 border-t" style={{ background: "#FEF2F2", borderColor: "#FCA5A5" }}>
          <p className="font-mono text-[11px] text-center" style={{ color: "#DC2626" }}>{error}</p>
        </div>
      )}

      {/* Continue / Calculate sticky CTA (steps 2–5) */}
      {showContinue && (
        <div className="sticky bottom-0 bg-bg-primary/95 backdrop-blur-sm border-t border-border px-5 py-4">
          <div className="max-w-3xl mx-auto">
            {step < 5 ? (
              <Button variant="primary" size="lg" className="w-full" onClick={() => goTo(step + 1)} disabled={!canAdvance()}>
                Continue →
              </Button>
            ) : (
              <>
                <p className="font-mono text-[12px] text-text-secondary text-center mb-3 uppercase tracking-[0.1em]">
                  Free · No sign-up · BOQ-verified rates
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleCalculate}
                  disabled={!canAdvance() || isCalculating}
                >
                  {isCalculating ? "Calculating your estimate…" : "Calculate my estimate →"}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile sticky action bar — step 1 only, when card selected, no pre-filled city */}
      {step === 1 && wizard.homeType && !defaultCity && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-5 py-4 border-t"
          style={{ background: "var(--navy)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between max-w-5xl mx-auto gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] mb-0.5" style={{ color: "rgba(255,255,255,0.42)" }}>
                Selected
              </p>
              <p className="font-sans font-medium truncate" style={{ fontSize: "17px", color: "white" }}>
                {selectedHomeType?.label}
              </p>
            </div>
            <button
              type="button"
              onClick={() => goTo(2)}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] focus:outline-none transition-opacity duration-150 active:opacity-80"
              style={{ background: "var(--accent)", color: "white", borderRadius: "2px" }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
