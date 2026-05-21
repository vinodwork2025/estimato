"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlannerStore } from "@/lib/store/planner-store";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/data/cities";
import { getBaseRate } from "@/lib/cost-engine/rates";
import { formatINRShort } from "@/lib/utils";
import type { HomeType, QualityTier, ParkingType, InteriorLevel } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Step 1 data ─────────────────────────────────────────────────────────────

const HOME_TYPES: {
  value: HomeType;
  label: string;
  tagline: string;
  range: string;
  image: string;
}[] = [
  {
    value: "villa",
    label: "Villa",
    tagline: "Independent home with garden",
    range: "₹50L – 1.2Cr",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "duplex",
    label: "Duplex",
    tagline: "Two floors, connected living",
    range: "₹40L – 90L",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "farmhouse",
    label: "Farmhouse",
    tagline: "Open plot, relaxed footprint",
    range: "₹35L – 1.5Cr",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "contemporary",
    label: "Contemporary",
    tagline: "Clean lines, modern architecture",
    range: "₹45L – 1Cr",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "budget",
    label: "Budget Home",
    tagline: "Practical, no-frills build",
    range: "₹25L – 50L",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "luxury-villa",
    label: "Luxury Villa",
    tagline: "Premium finishes, large footprint",
    range: "₹1.2Cr – 3Cr",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
  },
];

// ─── Step 3 data ─────────────────────────────────────────────────────────────

const QUALITY_OPTIONS: {
  value: QualityTier;
  label: string;
  badge: string;
  description: string;
  image: string;
  materials: string;
}[] = [
  {
    value: "essential",
    label: "Basic",
    badge: "Budget-friendly",
    description: "Solid construction with practical material choices. Built to last.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    materials: "Local tiles · Standard sanitary · Basic electricals",
  },
  {
    value: "economy",
    label: "Standard",
    badge: "Most popular",
    description: "Elevated finishes and considered details for homeowners who notice quality.",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80",
    materials: "Kajaria flooring · Hindware sanitary · Anchor switches",
  },
  {
    value: "premium",
    label: "Premium",
    badge: "Design-focused",
    description: "Architectural intent in every surface. Materials chosen to last a lifetime.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    materials: "Somany Duragres · Jaquar fittings · Legrand switches",
  },
  {
    value: "luxury",
    label: "Luxury",
    badge: "Heritage quality",
    description: "Timeless architecture and the finest finishes. Built to outlast trends.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=80",
    materials: "Italian marble · Kohler sanitary · Schneider electrics",
  },
];

// ─── Size presets ─────────────────────────────────────────────────────────────

const SIZE_PRESETS = [
  { label: "Compact", sqft: 1000, desc: "2–3 bedrooms" },
  { label: "Family", sqft: 1500, desc: "3–4 bedrooms", default: true },
  { label: "Spacious", sqft: 2200, desc: "4–5 bedrooms" },
];

// ─── Wizard state ─────────────────────────────────────────────────────────────

interface WizardState {
  homeType: HomeType | null;
  city: string;
  builtUpArea: number;
  qualityTier: QualityTier | null;
  floors: number;
  parking: ParkingType;
  lift: boolean;
  basement: boolean;
  terrace: boolean;
}

const INITIAL: WizardState = {
  homeType: null,
  city: "",
  builtUpArea: 1500,
  qualityTier: null,
  floors: 1,
  parking: "none",
  lift: false,
  basement: false,
  terrace: false,
};

// ─── Build full PlannerInput from wizard state ────────────────────────────────

function buildFullInput(w: WizardState) {
  const side = Math.round(Math.sqrt(w.builtUpArea / 0.6));
  const interiorMap: Record<QualityTier, InteriorLevel> = {
    essential: "basic",
    economy: "modular",
    premium: "premium",
    luxury: "luxury-furnished",
  };
  return {
    homeType: w.homeType!,
    city: w.city,
    plot: {
      length: side,
      width: side,
      facing: "north" as const,
      cornerPlot: false,
      roadWidth: 30,
      soilType: "red" as const,
      slope: "flat" as const,
    },
    configuration: {
      floors: w.floors,
      builtUpArea: w.builtUpArea,
      parking: w.parking,
      terrace: w.terrace,
      balconies: 0,
      lift: w.lift,
      basement: w.basement,
      homeOffice: false,
      rentalFloor: false,
    },
    qualityTier: w.qualityTier!,
    interiorLevel: interiorMap[w.qualityTier!],
  };
}

// ─── Dot progress ─────────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? "20px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background: i + 1 === current ? "var(--accent)" : i + 1 < current ? "var(--accent)" : "#D4CCBF",
            opacity: i + 1 < current ? 0.4 : 1,
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── Step 1: Home type ────────────────────────────────────────────────────────

function Step1HomeType({
  selected,
  onSelect,
}: {
  selected: HomeType | null;
  onSelect: (v: HomeType) => void;
}) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">Step 1 of 4</p>
        <h1
          className="font-serif text-navy"
          style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
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
              className="relative overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
              style={{
                borderRadius: "4px",
                border: isSelected ? "2px solid var(--accent)" : "2px solid transparent",
                aspectRatio: "3/2",
                transition: "border-color 0.2s ease",
              }}
              aria-pressed={isSelected}
            >
              {/* Photo */}
              <Image
                src={ht.image}
                alt={ht.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{
                  filter: isSelected
                    ? "grayscale(0.2) brightness(0.75)"
                    : "grayscale(0.55) sepia(0.2) brightness(0.7) contrast(1.05)",
                  transition: "filter 0.3s ease",
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.1) 55%)",
                }}
              />

              {/* Selected check */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent)" }}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  className="font-serif text-white leading-tight mb-1"
                  style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {ht.label}
                </p>
                <p className="font-mono text-white/60 hidden md:block" style={{ fontSize: "11px" }}>
                  {ht.range}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Location + size ──────────────────────────────────────────────────

function Step2LocationSize({
  city,
  builtUpArea,
  onCityChange,
  onAreaChange,
}: {
  city: string;
  builtUpArea: number;
  onCityChange: (v: string) => void;
  onAreaChange: (v: number) => void;
}) {
  const [customArea, setCustomArea] = useState("");
  const cities = CITIES.filter((c) => c.value !== "other");

  return (
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">Step 2 of 4</p>
        <h1
          className="font-serif text-navy"
          style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
          Where and how big?
        </h1>
      </motion.div>

      {/* City selection */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        className="mb-10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
          Your city
        </p>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select city">
          {cities.map((c) => {
            const isSelected = city === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onCityChange(c.value)}
                role="radio"
                aria-checked={isSelected}
                className="px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30"
                style={{
                  borderRadius: "2px",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--navy)" : "var(--border)",
                  background: isSelected ? "var(--navy)" : "transparent",
                  color: isSelected ? "#F7F4EF" : "var(--text-secondary)",
                }}
              >
                {c.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onCityChange("other")}
            role="radio"
            aria-checked={city === "other"}
            className="px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-all duration-200 focus:outline-none"
            style={{
              borderRadius: "2px",
              border: "1px solid",
              borderColor: city === "other" ? "var(--navy)" : "var(--border)",
              background: city === "other" ? "var(--navy)" : "transparent",
              color: city === "other" ? "#F7F4EF" : "var(--text-secondary)",
            }}
          >
            Other
          </button>
        </div>
      </motion.div>

      {/* Size selection */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
          Built-up area (total floor area across all floors)
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {SIZE_PRESETS.map((s) => {
            const isSelected = builtUpArea === s.sqft;
            return (
              <button
                key={s.sqft}
                type="button"
                onClick={() => { onAreaChange(s.sqft); setCustomArea(""); }}
                className="py-5 px-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30"
                style={{
                  borderRadius: "4px",
                  border: "1.5px solid",
                  borderColor: isSelected ? "var(--accent)" : "var(--border)",
                  background: isSelected ? "rgba(168,130,59,0.06)" : "white",
                }}
              >
                <p
                  className="font-serif text-navy mb-1"
                  style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  {s.sqft.toLocaleString("en-IN")}
                </p>
                <p className="font-mono text-text-tertiary" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                  SQFT · {s.desc}
                </p>
                <p
                  className="font-mono mt-1.5"
                  style={{ fontSize: "11px", fontWeight: 500, color: s.label === "Family" ? "var(--accent)" : "var(--text-tertiary)" }}
                >
                  {s.label}
                  {s.label === "Family" && " ✦"}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom area input */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Custom sqft (e.g. 1750)"
              value={customArea}
              onChange={(e) => {
                setCustomArea(e.target.value);
                const v = parseInt(e.target.value);
                if (v >= 400 && v <= 15000) onAreaChange(v);
              }}
              className="w-full px-4 py-3 font-mono text-[13px] bg-white focus:outline-none"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "2px",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <span className="font-mono text-[11px] text-text-tertiary uppercase tracking-[0.1em] shrink-0">
            sqft
          </span>
        </div>
        {builtUpArea > 0 && (
          <p className="font-mono text-[10px] text-text-tertiary mt-2 uppercase tracking-[0.1em]">
            Selected: {builtUpArea.toLocaleString("en-IN")} sqft
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ─── Step 3: Quality tier ─────────────────────────────────────────────────────

function Step3Quality({
  selected,
  city,
  builtUpArea,
  onSelect,
}: {
  selected: QualityTier | null;
  city: string;
  builtUpArea: number;
  onSelect: (v: QualityTier) => void;
}) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">Step 3 of 4</p>
        <h1
          className="font-serif text-navy"
          style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
          What quality are you aiming for?
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
          This sets the material standard for your entire home.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUALITY_OPTIONS.map((q, i) => {
          const rate = getBaseRate(city || "hosur", q.value);
          const estimated = builtUpArea * rate;
          const isSelected = selected === q.value;

          return (
            <motion.button
              key={q.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              onClick={() => onSelect(q.value)}
              className="relative overflow-hidden text-left focus:outline-none group"
              style={{
                borderRadius: "4px",
                border: "2px solid",
                borderColor: isSelected ? "var(--accent)" : "var(--border)",
                background: "white",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: isSelected ? "0 0 0 3px rgba(168,130,59,0.1)" : "none",
              }}
              aria-pressed={isSelected}
            >
              {/* Photo */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={q.image}
                  alt={q.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{
                    filter: isSelected
                      ? "grayscale(0.1) brightness(0.9)"
                      : "grayscale(0.5) sepia(0.15) brightness(0.85)",
                    transition: "filter 0.3s ease",
                  }}
                />
                {/* Popular badge */}
                {q.value === "economy" && (
                  <div
                    className="absolute top-3 left-3 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                    style={{ background: "var(--accent)", color: "white", borderRadius: "2px" }}
                  >
                    Most popular
                  </div>
                )}
                {/* Selected check */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "var(--accent)" }}
                  >
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1 5L5 9L12 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <p
                    className="font-serif text-navy"
                    style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em" }}
                  >
                    {q.label}
                  </p>
                  <p
                    className="font-mono tabular-nums"
                    style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 500 }}
                  >
                    ₹{rate.toLocaleString("en-IN")}/sqft
                  </p>
                </div>
                <p className="text-text-secondary mb-3" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {q.description}
                </p>
                <div
                  className="pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>
                    {q.materials}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-mono text-text-tertiary" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                    ESTIMATED FOR YOUR SIZE
                  </p>
                  <p
                    className="font-serif text-navy tabular-nums"
                    style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.015em" }}
                  >
                    ~{formatINRShort(estimated)}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 4: Quick options ────────────────────────────────────────────────────

const FLOOR_OPTIONS = [
  { value: 1, label: "Ground only", desc: "Single floor" },
  { value: 2, label: "G + 1", desc: "Two floors" },
  { value: 3, label: "G + 2", desc: "Three floors" },
  { value: 4, label: "G + 3", desc: "Four floors" },
];

function Step4Options({
  state,
  onChange,
  onCalculate,
  isCalculating,
}: {
  state: WizardState;
  onChange: (partial: Partial<WizardState>) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}) {
  return (
    <div className="px-5 md:px-10 pt-8 pb-12 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">Step 4 of 4</p>
        <h1
          className="font-serif text-navy"
          style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
          A few quick questions
        </h1>
        <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
          These fine-tune your estimate. Everything has a default — just skip if unsure.
        </p>
      </motion.div>

      {/* Floors */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        className="mb-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
          Number of floors
        </p>
        <div className="grid grid-cols-4 gap-2">
          {FLOOR_OPTIONS.map((f) => {
            const isSelected = state.floors === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => onChange({ floors: f.value })}
                className="py-4 px-2 text-center focus:outline-none transition-all duration-200"
                style={{
                  borderRadius: "4px",
                  border: "1.5px solid",
                  borderColor: isSelected ? "var(--accent)" : "var(--border)",
                  background: isSelected ? "rgba(168,130,59,0.06)" : "white",
                }}
              >
                <p
                  className="font-serif text-navy"
                  style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  {f.value}
                </p>
                <p className="font-mono text-text-tertiary mt-1" style={{ fontSize: "10px" }}>
                  {f.label}
                </p>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Parking */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease }}
        className="mb-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
          Parking
        </p>
        <div className="flex gap-3">
          {(["none", "covered", "stilt"] as ParkingType[]).map((p) => {
            const labels: Record<ParkingType, string> = { none: "None", covered: "Covered +3%", stilt: "Stilt +6%" };
            const isSelected = state.parking === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onChange({ parking: p })}
                className="flex-1 py-3 font-mono text-[12px] uppercase tracking-[0.1em] focus:outline-none transition-all duration-200"
                style={{
                  borderRadius: "2px",
                  border: "1.5px solid",
                  borderColor: isSelected ? "var(--accent)" : "var(--border)",
                  background: isSelected ? "rgba(168,130,59,0.06)" : "white",
                  color: isSelected ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                {labels[p]}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Extras */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease }}
        className="mb-10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
          Optional extras
        </p>
        <div className="divide-y divide-border border-t border-border">
          {[
            { key: "lift" as const, label: "Lift", hint: "Adds ₹6.5L installed" },
            { key: "basement" as const, label: "Basement", hint: "Adds ~22% to civil cost" },
            { key: "terrace" as const, label: "Terrace", hint: "Usable roof terrace" },
          ].map((extra) => (
            <div key={extra.key} className="flex items-center justify-between py-4">
              <div>
                <p style={{ fontSize: "16px", color: "var(--text-primary)" }}>{extra.label}</p>
                <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>{extra.hint}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange({ [extra.key]: !state[extra.key] })}
                className="relative focus:outline-none"
                style={{ width: "44px", height: "24px" }}
                aria-checked={state[extra.key]}
                role="switch"
              >
                <div
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "12px",
                    background: state[extra.key] ? "var(--accent)" : "#D4CCBF",
                    transition: "background 0.2s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: state[extra.key] ? "23px" : "3px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "9px",
                    background: "white",
                    transition: "left 0.2s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Calculate button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28, ease }}
      >
        <button
          type="button"
          onClick={onCalculate}
          disabled={isCalculating}
          className="w-full py-5 font-mono uppercase tracking-[0.18em] text-white focus:outline-none transition-all duration-200 disabled:opacity-60"
          style={{
            background: isCalculating ? "var(--navy)" : "var(--accent)",
            borderRadius: "2px",
            fontSize: "13px",
            cursor: isCalculating ? "wait" : "pointer",
          }}
        >
          {isCalculating ? "Calculating your estimate…" : "Calculate my estimate →"}
        </button>
        <p className="font-mono text-[10px] text-text-tertiary text-center mt-3 uppercase tracking-[0.1em]">
          Free · No sign-up · Takes 3 seconds
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

export function PlannerWizard() {
  const router = useRouter();
  const { setInput, setResult, setCalculating, isCalculating } = usePlannerStore();

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [wizard, setWizard] = useState<WizardState>(INITIAL);
  const [error, setError] = useState<string | null>(null);

  function patch(partial: Partial<WizardState>) {
    setWizard((prev) => ({ ...prev, ...partial }));
  }

  function goTo(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
  }

  function canAdvance() {
    if (step === 1) return wizard.homeType !== null;
    if (step === 2) return wizard.city !== "" && wizard.builtUpArea >= 400;
    if (step === 3) return wizard.qualityTier !== null;
    return true;
  }

  function handleStep1Select(ht: HomeType) {
    patch({ homeType: ht });
    setTimeout(() => goTo(2), 280);
  }

  async function handleCalculate() {
    if (!wizard.homeType || !wizard.city || !wizard.qualityTier) return;
    setError(null);
    setCalculating(true);

    const fullInput = buildFullInput(wizard);
    setInput(fullInput);

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullInput),
      });
      if (!res.ok) throw new Error("Calculation failed");
      const data = await res.json();
      setResult(data);
      router.push("/plan/result");
    } catch {
      setError("Something went wrong. Please try again.");
      setCalculating(false);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "40%" : "-40%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      {/* Step dots + back button */}
      <div className="sticky top-14 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-12 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary hover:text-text-secondary transition-colors focus:outline-none"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <StepDots current={step} total={4} />
          {canAdvance() && step < 4 ? (
            <button
              type="button"
              onClick={() => goTo(step + 1)}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary hover:text-text-secondary transition-colors focus:outline-none"
            >
              Next →
            </button>
          ) : (
            <div style={{ width: "48px" }} />
          )}
        </div>
      </div>

      {/* Step panels */}
      <div className="flex-1 overflow-hidden">
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
            {step === 1 && (
              <Step1HomeType selected={wizard.homeType} onSelect={handleStep1Select} />
            )}
            {step === 2 && (
              <Step2LocationSize
                city={wizard.city}
                builtUpArea={wizard.builtUpArea}
                onCityChange={(v) => patch({ city: v })}
                onAreaChange={(v) => patch({ builtUpArea: v })}
              />
            )}
            {step === 3 && (
              <Step3Quality
                selected={wizard.qualityTier}
                city={wizard.city}
                builtUpArea={wizard.builtUpArea}
                onSelect={(v) => { patch({ qualityTier: v }); setTimeout(() => goTo(4), 280); }}
              />
            )}
            {step === 4 && (
              <Step4Options
                state={wizard}
                onChange={patch}
                onCalculate={handleCalculate}
                isCalculating={isCalculating}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error */}
      {error && (
        <div className="px-5 py-3 text-center">
          <p className="font-mono text-[11px] text-red-600">{error}</p>
        </div>
      )}

      {/* Continue button (steps 2 only — step 1 and 3 auto-advance, step 4 has its own button) */}
      {step === 2 && (
        <div className="sticky bottom-0 bg-bg-primary/95 backdrop-blur-sm border-t border-border px-5 py-4">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => goTo(3)}
              disabled={!canAdvance()}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
