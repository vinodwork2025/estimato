"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlannerStore } from "@/lib/store/planner-store";
import { Button } from "@/components/ui/Button";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { CITIES } from "@/data/cities";
import { getBaseRate, INTERIOR_RATES } from "@/lib/cost-engine/rates";
import { formatINRShort } from "@/lib/utils";
import type {
  HomeType, QualityTier, ParkingType, InteriorLevel, Facing, SoilType, Slope,
} from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 5;

// ─── Static data ──────────────────────────────────────────────────────────────

const HOME_TYPES: { value: HomeType; label: string; tagline: string; range: string; image: string }[] = [
  { value: "villa", label: "Villa", tagline: "Independent home with garden", range: "₹50L – 1.2Cr", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80" },
  { value: "duplex", label: "Duplex", tagline: "Two floors, connected living", range: "₹40L – 90L", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80" },
  { value: "farmhouse", label: "Farmhouse", tagline: "Open plot, relaxed footprint", range: "₹35L – 1.5Cr", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80" },
  { value: "contemporary", label: "Contemporary", tagline: "Clean lines, modern architecture", range: "₹45L – 1Cr", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80" },
  { value: "budget", label: "Budget Home", tagline: "Practical, no-frills build", range: "₹25L – 50L", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80" },
  { value: "luxury-villa", label: "Luxury Villa", tagline: "Premium finishes, large footprint", range: "₹1.2Cr – 3Cr", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80" },
];

const QUALITY_OPTIONS: { value: QualityTier; label: string; badge: string; description: string; image: string; materials: string }[] = [
  { value: "essential", label: "Basic", badge: "Budget-friendly", description: "Solid construction with practical material choices.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80", materials: "Local tiles · Standard sanitary · Basic electricals" },
  { value: "economy", label: "Standard", badge: "Most popular", description: "Elevated finishes and considered details for homeowners who notice quality.", image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80", materials: "Kajaria flooring · Hindware sanitary · Anchor switches" },
  { value: "premium", label: "Premium", badge: "Design-focused", description: "Architectural intent in every surface. Materials chosen to last.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", materials: "Somany Duragres · Jaquar fittings · Legrand switches" },
  { value: "luxury", label: "Luxury", badge: "Heritage quality", description: "Timeless architecture and the finest finishes. Built to outlast trends.", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=80", materials: "Italian marble · Kohler sanitary · Schneider electrics" },
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

const INTERIOR_AUTO: Record<QualityTier, InteriorLevel> = {
  essential: "basic",
  economy: "modular",
  premium: "premium",
  luxury: "luxury-furnished",
};

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

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? "20px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background: i + 1 <= current ? "var(--accent)" : "#DDE4ED",
            opacity: i + 1 < current ? 0.45 : 1,
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-3">
      {children}
    </p>
  );
}

function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-200 focus:outline-none"
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
        <p style={{ fontSize: "15px", color: "var(--text-primary)", fontWeight: 400 }}>{label}</p>
        <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>{hint}</p>
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

// ─── Step 1: Home type ────────────────────────────────────────────────────────

function Step1HomeType({ selected, onSelect }: { selected: HomeType | null; onSelect: (v: HomeType) => void }) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-5xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
          Step 1 of {TOTAL_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          What are you building?
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
          Pick the type that best describes your project.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {HOME_TYPES.map((ht, i) => {
          const isSelected = selected === ht.value;
          return (
            <motion.button
              key={ht.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              onClick={() => onSelect(ht.value)}
              className="relative overflow-hidden text-left focus:outline-none group"
              style={{ borderRadius: "4px", border: `2px solid ${isSelected ? "var(--accent)" : "transparent"}`, aspectRatio: "3/2", transition: "border-color 0.2s" }}
              aria-pressed={isSelected}
            >
              <Image src={ht.image} alt={ht.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw"
                style={{ filter: isSelected ? "grayscale(0.2) brightness(0.75)" : "grayscale(0.55) sepia(0.2) brightness(0.7) contrast(1.05)", transition: "filter 0.3s" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,31,60,0.85) 0%, rgba(13,31,60,0.1) 55%)" }} />
              {isSelected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-serif text-white leading-tight mb-1" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 400, letterSpacing: "-0.01em" }}>{ht.label}</p>
                <p className="font-mono text-white/60 hidden md:block" style={{ fontSize: "11px" }}>{ht.range}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Location ─────────────────────────────────────────────────────────

function Step2Location({ city, onChange }: { city: string; onChange: (v: string) => void }) {
  const cities = CITIES.filter((c) => c.value !== "other");
  return (
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
          Step 2 of {TOTAL_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          Where will it stand?
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
          Location affects material costs and labour rates significantly.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }}>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select city">
          {[...cities, { value: "other", label: "Other location" }].map((c) => {
            const isSelected = city === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange(c.value)}
                role="radio"
                aria-checked={isSelected}
                className="px-4 py-3 transition-all duration-200 focus:outline-none"
                style={{
                  borderRadius: "2px",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--navy)" : "var(--border)",
                  background: isSelected ? "var(--navy)" : "transparent",
                  color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                  fontSize: "14px",
                  letterSpacing: "0.01em",
                }}
              >
                {c.label}
              </button>
            );
          })}
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
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
          Step 3 of {TOTAL_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          Tell us about your plot.
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
          Plot dimensions affect foundation and structure costs.
        </p>
      </motion.div>

      {/* Big plot area */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease }} className="text-center py-6">
        <p className="font-serif text-navy leading-none tabular-nums" style={{ fontSize: "clamp(64px, 14vw, 110px)", fontWeight: 300, letterSpacing: "-0.03em" }}>
          {plotArea > 0 ? plotArea.toLocaleString("en-IN") : "—"}
        </p>
        <p style={{ fontSize: "15px", color: "#7B93A8", marginTop: "8px" }}>square feet</p>
        <p className="font-mono text-text-tertiary mt-1" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
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
          <span className="font-mono text-[10px] text-text-tertiary tracking-[0.1em]">900</span>
          <span className="font-mono text-[10px] text-text-tertiary tracking-[0.1em]">40,000 sqft</span>
        </div>
      </motion.div>

      {/* L × W inputs */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18, ease }} className="mb-8">
        <SectionLabel>Or enter exact dimensions</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          {(["plotLength", "plotWidth"] as const).map((field) => (
            <div key={field}>
              <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-2 block">
                {field === "plotLength" ? "Length" : "Width"} (ft)
              </label>
              <input
                type="number"
                min={15}
                max={200}
                value={field === "plotLength" ? state.plotLength : state.plotWidth}
                onChange={(e) => handleDimension(field, parseInt(e.target.value) || 1)}
                className="w-full focus:outline-none"
                style={{ borderBottom: "1px solid #DDE4ED", padding: "8px 0", fontSize: "18px", color: "var(--text-primary)", background: "transparent" }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Suggested BUA callout */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }} className="mb-8">
        <div className="p-4" style={{ background: "rgba(168,130,59,0.07)", border: "1px solid rgba(168,130,59,0.2)", borderRadius: "3px" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--accent)" }}>
            Suggested built-up area
          </p>
          <p className="font-serif text-navy" style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em" }}>
            {Math.round(state.plotLength * state.plotWidth * 0.6).toLocaleString("en-IN")} sqft
          </p>
          <p className="font-mono text-text-tertiary mt-1" style={{ fontSize: "11px" }}>
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
                style={{ fontSize: "17px", color: active ? "var(--accent)" : "var(--text-primary)", borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent" }}
              >
                {s.label}
                <span className="block font-mono" style={{ fontSize: "11px", color: active ? "var(--accent)" : "var(--text-tertiary)", marginTop: "2px" }}>
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
        <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>
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
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
          Step 4 of {TOTAL_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          How will it be built?
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
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
                <p className="font-serif text-navy" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em" }}>{f.label}</p>
                <p className="font-mono text-text-tertiary mt-1" style={{ fontSize: "10px" }}>{f.desc}</p>
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
                fontFamily: "var(--font-serif)",
                letterSpacing: "-0.02em",
              }}
            />
          </div>
          <span className="font-mono text-[12px] text-text-tertiary shrink-0">sqft</span>
        </div>
        <p className="font-mono text-text-tertiary mt-2" style={{ fontSize: "11px" }}>
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
        <div className="flex gap-8 border-b border-border pb-6">
          {([
            { value: "none" as ParkingType, label: "None", hint: "" },
            { value: "covered" as ParkingType, label: "Covered", hint: "+3%" },
            { value: "stilt" as ParkingType, label: "Stilt", hint: "+6%" },
          ]).map((p) => {
            const isSelected = state.parking === p.value;
            return (
              <button key={p.value} type="button" onClick={() => onChange({ parking: p.value })}
                className="text-left focus:outline-none pb-1 transition-colors duration-200"
                style={{ fontSize: "18px", color: isSelected ? "var(--accent)" : "var(--text-primary)", borderBottom: isSelected ? "2px solid var(--accent)" : "2px solid transparent" }}
              >
                {p.label}
                {p.hint && (
                  <span className="block font-mono" style={{ fontSize: "11px", color: isSelected ? "var(--accent)" : "var(--text-tertiary)", marginTop: "2px" }}>{p.hint}</span>
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
          <button type="button" onClick={() => onChange({ balconies: Math.max(0, state.balconies - 1) }) } disabled={state.balconies === 0}
            className="w-12 h-12 border border-border flex items-center justify-center text-lg focus:outline-none disabled:opacity-30 transition-all"
          >
            −
          </button>
          <span className="font-serif tabular-nums w-8 text-center" style={{ fontSize: "32px", fontWeight: 400, color: "var(--text-primary)" }}>
            {state.balconies}
          </span>
          <button type="button" onClick={() => onChange({ balconies: Math.min(6, state.balconies + 1) })} disabled={state.balconies === 6}
            className="w-12 h-12 border border-border flex items-center justify-center text-lg focus:outline-none disabled:opacity-30 transition-all"
          >
            +
          </button>
          {state.balconies > 0 && (
            <span className="font-mono text-[11px] text-text-tertiary tabular-nums">
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

// ─── Step 5: Quality + Interiors ──────────────────────────────────────────────

function Step5Finish({
  state,
  onChange,
}: {
  state: WizardState;
  onChange: (p: Partial<WizardState>) => void;
}) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-4 max-w-5xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
          Step 5 of {TOTAL_STEPS}
        </p>
        <h1 className="font-serif text-navy" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          Choose your finish level.
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
          This drives a third of your total cost. Choose honestly.
        </p>
      </motion.div>

      {/* Quality tier cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {QUALITY_OPTIONS.map((q, i) => {
          const rate = getBaseRate(state.city || "hosur", q.value);
          const estimated = state.builtUpArea * rate;
          const isSelected = state.qualityTier === q.value;
          return (
            <motion.button
              key={q.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              onClick={() => onChange({ qualityTier: q.value, interiorLevel: INTERIOR_AUTO[q.value] })}
              className="relative overflow-hidden text-left focus:outline-none group"
              style={{
                borderRadius: "4px",
                border: "2px solid",
                borderColor: isSelected ? "var(--accent)" : "var(--border)",
                background: "white",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: isSelected ? "0 0 0 3px rgba(168,130,59,0.1)" : "none",
              }}
              aria-pressed={isSelected}
            >
              <div className="relative h-36 overflow-hidden">
                <Image src={q.image} alt={q.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ filter: isSelected ? "grayscale(0.1) brightness(0.9)" : "grayscale(0.5) sepia(0.15) brightness(0.85)", transition: "filter 0.3s" }} />
                {q.value === "economy" && (
                  <div className="absolute top-3 left-3 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "white", borderRadius: "2px" }}>
                    Most popular
                  </div>
                )}
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M1 5L5 9L12 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-serif text-navy" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em" }}>{q.label}</p>
                  <p className="font-mono tabular-nums" style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500 }}>₹{rate.toLocaleString("en-IN")}/sqft</p>
                </div>
                <p className="text-text-secondary mb-2" style={{ fontSize: "13px", lineHeight: 1.6 }}>{q.description}</p>
                <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>{q.materials}</p>
                <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="font-mono text-text-tertiary" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>ESTIMATED FOR YOUR BUILD</p>
                  <p className="font-serif text-navy tabular-nums" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.015em" }}>
                    ~{formatINRShort(estimated)}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Interior level — shown after quality is selected */}
      {state.qualityTier && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-10">
          <SectionLabel>Interior finish level</SectionLabel>
          <p className="text-text-secondary mb-4" style={{ fontSize: "14px" }}>
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
                    <p style={{ fontSize: "15px", color: isSelected ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: isSelected ? 500 : 400 }}>
                      {opt.label}
                    </p>
                    <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>{opt.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-mono tabular-nums" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                      ₹{rate.toLocaleString("en-IN")}/sqft
                    </p>
                    <p className="font-mono tabular-nums" style={{ fontSize: "13px", color: isSelected ? "var(--accent)" : "var(--text-tertiary)", fontWeight: isSelected ? 500 : 400 }}>
                      {formatINRShort(cost)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

export function PlannerWizard() {
  const router = useRouter();
  const { setInput, setResult, setCalculating } = usePlannerStore();

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [wizard, setWizard] = useState<WizardState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Clear any stale isCalculating from persisted store on mount
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
    setTimeout(() => goTo(2), 280);
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
        body: JSON.stringify(fullInput),
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Planner header */}
      <header className="sticky top-0 z-30 bg-bg-primary border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" aria-label="Estimato home">
            <EstimateLogo size="sm" variant="mark" />
          </Link>
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.18em]">
            Free · No sign-up
          </span>
        </div>
      </header>

      {/* Nav bar */}
      <div className="sticky top-14 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-12 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => goTo(step - 1)}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary hover:text-text-secondary transition-colors focus:outline-none"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <StepDots current={step} />
          <div style={{ width: "48px" }} />
        </div>
      </div>

      {/* Step panels — overflow-x-clip clips slide animation without blocking vertical scroll */}
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
            {step === 2 && <Step2Location city={wizard.city} onChange={(v) => patch({ city: v })} />}
            {step === 3 && <Step3Plot state={wizard} onChange={patch} />}
            {step === 4 && <Step4Config state={wizard} onChange={patch} />}
            {step === 5 && (
              <Step5Finish
                state={wizard}
                onChange={patch}
              />
            )}
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
                <p className="font-mono text-[10px] text-text-tertiary text-center mb-3 uppercase tracking-[0.1em]">
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
    </div>
  );
}
