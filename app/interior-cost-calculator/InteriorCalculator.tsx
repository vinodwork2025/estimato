"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { computeInteriorCost } from "@/lib/interior/engine";
import { CITY_LABELS, CREDIBILITY_LINES } from "@/lib/interior/rates";
import { SCOPE_KEYS } from "@/lib/interior/schema";
import type {
  City, PropertyType, BHK, CurrentState, FinishLevel, ScopeKey,
  InteriorInput, CalcResult, InteriorResult,
} from "@/lib/interior/types";

// ── Label maps ───────────────────────────────────────────────────────────────

const CITY_OPTIONS: { value: City; label: string; live: boolean }[] = [
  { value: "hosur",               label: "Hosur",               live: true  },
  { value: "bangalore-outskirts", label: "Bangalore Outskirts", live: true  },
  { value: "bangalore-urban",     label: "Bangalore Urban",     live: true  },
];

const COMING_SOON_CITIES = ["Chennai", "Hyderabad", "Pune", "Coimbatore"];

const PROPERTY_LABELS: Record<PropertyType, string> = {
  "apartment":         "Apartment",
  "independent-house": "Independent house",
  "villa":             "Villa",
};

const BHK_LABELS: Record<BHK, string> = {
  "1": "1 BHK", "2": "2 BHK", "3": "3 BHK", "4": "4 BHK", "5+": "5+ BHK",
};

const STATE_LABELS: Record<CurrentState, string> = {
  "bare-shell":    "Bare shell",
  "semi-finished": "Semi-finished",
  "occupied":      "Occupied / renovation",
};

const STATE_HINTS: Record<CurrentState, string> = {
  "bare-shell":    "Raw concrete — civil and electrical added automatically.",
  "semi-finished": "Basic civil done, no interiors yet.",
  "occupied":      "Renovation of an existing home — demolition costs included.",
};

const FINISH_LABELS: Record<FinishLevel, string> = {
  "basic":         "Basic",
  "standard":      "Standard",
  "premium":       "Premium",
  "ultra-luxury":  "Ultra Luxury",
};

const SCOPE_LABELS: Record<ScopeKey, string> = {
  "modular-kitchen":  "Modular kitchen",
  "wardrobes":        "Wardrobes",
  "false-ceiling":    "False ceiling",
  "painting":         "Painting",
  "flooring":         "Flooring",
  "electrical":       "Electrical",
  "tv-storage":       "TV & storage units",
  "loose-furniture":  "Loose furniture",
  "soft-furnishings": "Soft furnishings & curtains",
  "lighting":         "Lighting",
};

const ALL_SCOPE: ScopeKey[] = [...SCOPE_KEYS];

// ── Formatting ───────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtINRShort(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000)    return `₹${(n / 100_000).toFixed(0)}L`;
  return fmtINR(n);
}

// ── Sub-components ───────────────────────────────────────────────────────────

function PillGroup<T extends string>({
  options, value, onChange, small,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  small?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className="transition-colors duration-150 font-mono uppercase tracking-[0.1em]"
            style={{
              fontSize: small ? "11px" : "12px",
              padding: small ? "5px 12px" : "7px 16px",
              borderRadius: "2px",
              border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
              background: active ? "rgba(196,154,60,0.10)" : "transparent",
              color: active ? "var(--accent)" : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function ScopeToggle({
  scopeKey, active, locked, onToggle,
}: {
  scopeKey: ScopeKey; active: boolean; locked: boolean; onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={locked ? undefined : onToggle}
      disabled={locked}
      title={locked ? "Required for bare shell" : undefined}
      className="flex items-center gap-2.5 text-left transition-colors duration-150"
      style={{
        padding: "10px 14px",
        borderRadius: "2px",
        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
        background: active ? "rgba(196,154,60,0.07)" : "transparent",
        opacity: locked ? 0.65 : 1,
        cursor: locked ? "not-allowed" : "pointer",
        minWidth: 0,
      }}
    >
      <span
        style={{
          width: 14, height: 14, borderRadius: "2px", flexShrink: 0,
          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
          background: active ? "var(--accent)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {active && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.3 }}>
        {SCOPE_LABELS[scopeKey]}
        {locked && <span className="font-mono" style={{ fontSize: "10px", color: "var(--accent)", marginLeft: 6 }}>required</span>}
      </span>
    </button>
  );
}

function CategoryBar({ label, range, maxVal }: { label: string; range: { min: number; max: number }; maxVal: number }) {
  const barPct = maxVal > 0 ? Math.min((range.max / maxVal) * 100, 100) : 0;
  const innerPct = range.max > 0 ? (range.min / range.max) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-sans" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{label}</span>
        <span className="font-mono" style={{ fontSize: "12px", color: "var(--text-primary)" }}>
          {fmtINRShort(range.min)} – {fmtINRShort(range.max)}
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
        <div style={{ width: `${barPct}%`, height: "100%", background: "rgba(196,154,60,0.25)", borderRadius: 3, position: "relative" }}>
          <div style={{ width: `${innerPct}%`, height: "100%", background: "var(--accent)", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}

function LeadForm({
  city, input, result,
}: {
  city: City;
  input: InteriorInput;
  result: InteriorResult;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverErr, setServerErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameErr("");
    setPhoneErr("");
    setServerErr("");

    let valid = true;
    if (name.trim().length < 2) { setNameErr("Enter your name"); valid = false; }
    if (!/^\d{10}$/.test(phone)) { setPhoneErr("Enter a valid 10-digit number"); valid = false; }
    if (!valid) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/interior-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          city,
          message: message.trim() || undefined,
          propertyType: input.propertyType,
          bhk: input.bhk,
          carpetArea: input.carpetArea,
          currentState: input.currentState,
          finishLevel: input.finishLevel,
          scope: input.scope,
          estimateMin: result.headline.min,
          estimateMax: result.headline.max,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "24px", background: "rgba(196,154,60,0.07)", borderRadius: "4px", border: "1px solid var(--border)" }}
      >
        <p className="font-serif mb-1" style={{ fontSize: "20px", fontWeight: 400, color: "var(--text-primary)" }}>Request received.</p>
        <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          A verified partner will reach out within one working day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full font-sans"
            style={{
              height: 44, padding: "0 14px", fontSize: 14, borderRadius: 2,
              border: `1px solid ${nameErr ? "#e53e3e" : "var(--border)"}`,
              background: "#fff", color: "var(--text-primary)", outline: "none",
            }}
          />
          {nameErr && <p className="font-sans mt-1" style={{ fontSize: 12, color: "#e53e3e" }}>{nameErr}</p>}
        </div>
        <div>
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
            Mobile number
          </label>
          <div style={{ position: "relative" }}>
            <span className="font-mono" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "var(--text-tertiary)" }}>+91</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="10-digit number"
              className="w-full font-mono"
              style={{
                height: 44, paddingLeft: 44, paddingRight: 14, fontSize: 14, borderRadius: 2,
                border: `1px solid ${phoneErr ? "#e53e3e" : "var(--border)"}`,
                background: "#fff", color: "var(--text-primary)", outline: "none",
              }}
            />
          </div>
          {phoneErr && <p className="font-sans mt-1" style={{ fontSize: 12, color: "#e53e3e" }}>{phoneErr}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
          City
        </label>
        <input
          readOnly
          value={CITY_LABELS[city]}
          className="w-full font-sans"
          style={{
            height: 44, padding: "0 14px", fontSize: 14, borderRadius: 2,
            border: "1px solid var(--border)", background: "var(--bg-primary)",
            color: "var(--text-tertiary)", outline: "none",
          }}
        />
      </div>

      <div className="mb-5">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
          Message (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Timeline, specific requirements, anything else…"
          rows={3}
          className="w-full font-sans resize-none"
          style={{
            padding: "10px 14px", fontSize: 14, borderRadius: 2,
            border: "1px solid var(--border)", background: "#fff",
            color: "var(--text-primary)", outline: "none", lineHeight: 1.6,
          }}
        />
      </div>

      {serverErr && <p className="font-sans mb-4" style={{ fontSize: 13, color: "#e53e3e" }}>{serverErr}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto font-mono uppercase tracking-[0.12em] transition-opacity"
        style={{
          fontSize: 12, padding: "12px 28px", borderRadius: 2,
          background: "var(--accent)", color: "#fff", border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Sending…" : "Request a quote →"}
      </button>
    </form>
  );
}

// ── Main calculator ───────────────────────────────────────────────────────────

export function InteriorCalculator() {
  const [city, setCity]                 = useState<City>("bangalore-urban");
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment");
  const [bhk, setBhk]                   = useState<BHK>("2");
  const [carpetArea, setCarpetArea]     = useState<string>("1000");
  const [currentState, setCurrentState] = useState<CurrentState>("semi-finished");
  const [scope, setScope]               = useState<Set<ScopeKey>>(new Set(ALL_SCOPE));
  const [finishLevel, setFinishLevel]   = useState<FinishLevel>("standard");
  const [result, setResult]             = useState<CalcResult | null>(null);
  const [areaError, setAreaError]       = useState<string>("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const isBareShell = currentState === "bare-shell";
  const activeScope = isBareShell
    ? new Set([...scope, "electrical" as ScopeKey])
    : scope;

  function toggleScope(key: ScopeKey) {
    if (isBareShell && key === "electrical") return;
    setScope((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleStateChange(s: CurrentState) {
    setCurrentState(s);
    if (s === "bare-shell") {
      setScope((prev) => new Set([...prev, "electrical"]));
    }
    setResult(null);
    setShowLeadForm(false);
  }

  function validate(): boolean {
    const n = Number(carpetArea);
    if (!carpetArea || isNaN(n)) { setAreaError("Enter a carpet area"); return false; }
    if (n < 200)   { setAreaError("Minimum carpet area is 200 sqft"); return false; }
    if (n > 10000) { setAreaError("Maximum carpet area is 10,000 sqft"); return false; }
    setAreaError("");
    return true;
  }

  function handleCalculate() {
    if (!validate()) return;
    if (activeScope.size === 0) return;

    const input: InteriorInput = {
      city, propertyType, bhk,
      carpetArea: Number(carpetArea),
      currentState, finishLevel,
      scope: [...activeScope],
    };
    const r = computeInteriorCost(input);
    setResult(r);
    setShowLeadForm(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  const canCalculate = activeScope.size > 0;
  const noScopeWarning = activeScope.size === 0;

  const inputForLead: InteriorInput = {
    city, propertyType, bhk,
    carpetArea: Number(carpetArea) || 0,
    currentState, finishLevel,
    scope: [...activeScope],
  };

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-20 md:pt-20 md:pb-28">

      {/* ── Hero ── */}
      <div className="mb-12">
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
          <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Interior cost calculator</span>
        </nav>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
          Free · No sign-up · Under 2 minutes
        </p>
        <h1
          className="font-serif mb-4"
          style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text-primary)" }}
        >
          Interior cost calculator
        </h1>
        <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "520px" }}>
          Get a verified cost range for your home interior in Bangalore or Hosur. Covers every major scope item. Your estimate stays on screen — we never gate the number.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

        {/* ── Form ── */}
        <div>

          {/* City */}
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--text-tertiary)" }}>City</p>
            <div>
              <select
                value={city}
                onChange={(e) => { setCity(e.target.value as City); setResult(null); }}
                className="w-full font-sans"
                style={{
                  height: 44, padding: "0 14px", fontSize: 14, borderRadius: 2,
                  border: "1px solid var(--border)", background: "#fff",
                  color: "var(--text-primary)", outline: "none", appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  maxWidth: 360,
                }}
              >
                {CITY_OPTIONS.filter(c => c.live).map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
                <optgroup label="Coming soon">
                  {COMING_SOON_CITIES.map((c) => (
                    <option key={c} disabled>{c}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Property type */}
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--text-tertiary)" }}>Property type</p>
            <PillGroup
              options={(["apartment", "independent-house", "villa"] as PropertyType[]).map((v) => ({ value: v, label: PROPERTY_LABELS[v] }))}
              value={propertyType}
              onChange={(v) => { setPropertyType(v); setResult(null); }}
            />
          </div>

          {/* BHK */}
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--text-tertiary)" }}>BHK configuration</p>
            <PillGroup
              options={(["1", "2", "3", "4", "5+"] as BHK[]).map((v) => ({ value: v, label: BHK_LABELS[v] }))}
              value={bhk}
              onChange={(v) => { setBhk(v); setResult(null); }}
              small
            />
          </div>

          {/* Carpet area */}
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--text-tertiary)" }}>Carpet area (sqft)</p>
            <div style={{ position: "relative", maxWidth: 260 }}>
              <input
                type="number"
                inputMode="numeric"
                min={200}
                max={10000}
                value={carpetArea}
                onChange={(e) => { setCarpetArea(e.target.value); setAreaError(""); setResult(null); }}
                placeholder="e.g. 1000"
                className="w-full font-mono"
                style={{
                  height: 44, padding: "0 48px 0 14px", fontSize: 14, borderRadius: 2,
                  border: `1px solid ${areaError ? "#e53e3e" : "var(--border)"}`,
                  background: "#fff", color: "var(--text-primary)", outline: "none",
                }}
              />
              <span className="font-mono" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "var(--text-tertiary)" }}>sqft</span>
            </div>
            {areaError && <p className="font-sans mt-1.5" style={{ fontSize: 12, color: "#e53e3e" }}>{areaError}</p>}
            <p className="font-sans mt-1.5" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>200 – 10,000 sqft</p>
          </div>

          {/* Current state */}
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--text-tertiary)" }}>
              Current state of property
              <span className="ml-2 normal-case tracking-normal" style={{ color: "var(--accent)" }}>— affects civil and plumbing costs</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              {(["bare-shell", "semi-finished", "occupied"] as CurrentState[]).map((s) => {
                const active = currentState === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStateChange(s)}
                    className="text-left transition-colors duration-150"
                    style={{
                      padding: "10px 14px", borderRadius: 2,
                      border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                      background: active ? "rgba(196,154,60,0.07)" : "transparent",
                      cursor: "pointer", flex: 1,
                    }}
                  >
                    <p className="font-mono" style={{ fontSize: 12, color: active ? "var(--accent)" : "var(--text-primary)", marginBottom: 2 }}>
                      {STATE_LABELS[s]}
                    </p>
                    <p className="font-sans" style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.4 }}>
                      {STATE_HINTS[s]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scope */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>Scope of work</p>
              <button
                type="button"
                onClick={() => {
                  const allActive = ALL_SCOPE.every((k) => activeScope.has(k));
                  if (allActive) {
                    const next = new Set(ALL_SCOPE.filter((k) => isBareShell && k === "electrical"));
                    setScope(next);
                  } else {
                    setScope(new Set(ALL_SCOPE));
                  }
                  setResult(null);
                }}
                className="font-mono text-[10px] uppercase tracking-[0.12em] transition-colors"
                style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                {ALL_SCOPE.every((k) => activeScope.has(k)) ? "Deselect all" : "Select all"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_SCOPE.map((key) => (
                <ScopeToggle
                  key={key}
                  scopeKey={key}
                  active={activeScope.has(key)}
                  locked={isBareShell && key === "electrical"}
                  onToggle={() => { toggleScope(key); setResult(null); }}
                />
              ))}
            </div>
            {noScopeWarning && (
              <p className="font-sans mt-2" style={{ fontSize: 12, color: "#e53e3e" }}>Select at least one item to calculate.</p>
            )}
          </div>

          {/* Finish level */}
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--text-tertiary)" }}>Finish level</p>
            <PillGroup
              options={(["basic", "standard", "premium", "ultra-luxury"] as FinishLevel[]).map((v) => ({ value: v, label: FINISH_LABELS[v] }))}
              value={finishLevel}
              onChange={(v) => { setFinishLevel(v); setResult(null); }}
            />
            {finishLevel === "ultra-luxury" && (
              <p className="font-sans mt-2" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
                Ultra Luxury interiors are quoted per project. Tap Calculate to connect with a verified designer.
              </p>
            )}
          </div>

          {/* Calculate */}
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="font-mono uppercase tracking-[0.12em] transition-opacity"
            style={{
              fontSize: 13, padding: "14px 32px", borderRadius: 2,
              background: canCalculate ? "var(--text-primary)" : "var(--border)",
              color: canCalculate ? "#fff" : "var(--text-tertiary)",
              border: "none", cursor: canCalculate ? "pointer" : "not-allowed",
              opacity: 1,
            }}
          >
            {finishLevel === "ultra-luxury" ? "Get a custom quote →" : "Calculate →"}
          </button>
        </div>

        {/* ── Result panel ── */}
        <div ref={resultRef}>
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "sticky", top: 100 }}
              >
                {result.isUltraLuxury ? (
                  // Ultra Luxury — no number shown
                  <div
                    style={{
                      border: "1px solid var(--border)", borderRadius: 4,
                      padding: "clamp(24px, 4vw, 36px)", background: "var(--bg-primary)",
                    }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>
                      Ultra Luxury
                    </p>
                    <p className="font-serif mb-3" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.2 }}>
                      Ultra Luxury interiors are quoted per project.
                    </p>
                    <p className="font-sans mb-6" style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      Custom materials, bespoke joinery, and specialist trades require a site visit and design brief before any number can be meaningful. Talk to a verified designer.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(true)}
                      className="w-full font-mono uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                      style={{ fontSize: 12, padding: "12px 0", borderRadius: 2, background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer" }}
                    >
                      Talk to a verified designer →
                    </button>
                    {showLeadForm && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >
                        <LeadForm
                          city={city}
                          input={inputForLead}
                          result={{ isUltraLuxury: false, headline: { min: 0, max: 0 }, perSqft: { min: 0, max: 0 }, categories: [], designFeeRange: null }}
                        />
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // Normal result
                  <div
                    style={{
                      border: "1px solid var(--border)", borderRadius: 4,
                      padding: "clamp(24px, 4vw, 36px)", background: "var(--bg-primary)",
                    }}
                  >
                    {/* Headline */}
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
                      Total estimated cost
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="font-serif mb-1"
                      style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text-primary)" }}
                    >
                      {fmtINR(result.headline.min)}
                      <span style={{ color: "var(--text-tertiary)", margin: "0 6px" }}>to</span>
                      {fmtINR(result.headline.max)}
                    </motion.p>
                    <p className="font-mono mb-6" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
                      {result.perSqft.min.toLocaleString("en-IN")} – {result.perSqft.max.toLocaleString("en-IN")} ₹/sqft
                    </p>

                    {/* Breakdown bars */}
                    <div className="mb-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--text-tertiary)" }}>Breakdown</p>
                      {result.categories.map((cat) => (
                        <CategoryBar
                          key={cat.label}
                          label={cat.label}
                          range={cat.range}
                          maxVal={result.headline.max}
                        />
                      ))}
                      {result.designFeeRange && (
                        <CategoryBar
                          label="Design & management fee (8–12%)"
                          range={result.designFeeRange}
                          maxVal={result.headline.max}
                        />
                      )}
                    </div>

                    {/* What's covered */}
                    <div className="mb-6 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: "var(--text-tertiary)" }}>What this covers</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {["Materials and labour for all selected scope items", "City-adjusted rates for " + CITY_LABELS[city], "Design and management fee (where applicable)"].map((item) => (
                          <li key={item} className="flex items-start gap-2 mb-1.5">
                            <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }}>
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            <span className="font-sans" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] mt-3 mb-2" style={{ color: "var(--text-tertiary)" }}>Not included</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {["Statutory approvals and permits", "Structural changes or column removal", "Appliances (fridge, washing machine, AC)", "Building elevation or facade work"].map((item) => (
                          <li key={item} className="flex items-start gap-2 mb-1.5">
                            <span style={{ color: "var(--text-tertiary)", marginTop: 3, flexShrink: 0 }}>–</span>
                            <span className="font-sans" style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.5 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Credibility line */}
                    <p className="font-mono mb-6" style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                      {CREDIBILITY_LINES[city]}
                    </p>

                    {/* Lead CTA */}
                    {!showLeadForm ? (
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(true)}
                        className="w-full font-mono uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                        style={{ fontSize: 12, padding: "12px 0", borderRadius: 2, background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer" }}
                      >
                        Get an exact quote from a verified partner →
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-serif mb-4" style={{ fontSize: 18, fontWeight: 400, color: "var(--text-primary)" }}>
                          Connect with a verified local partner
                        </p>
                        <LeadForm
                          city={city}
                          input={inputForLead}
                          result={result}
                        />
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {!result && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  border: "1px dashed var(--border)", borderRadius: 4,
                  padding: "clamp(32px, 6vw, 48px)", textAlign: "center",
                  background: "var(--bg-primary)",
                }}
              >
                <p className="font-serif mb-2" style={{ fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  Your estimate will appear here
                </p>
                <p className="font-sans" style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                  Fill in your details and tap Calculate.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
