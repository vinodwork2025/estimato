"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Rate data (averages, mins, maxes from Estimato Hosur Cost Index 2026) ─

const RATES = {
  "Independent House": {
    Basic:    { min: 1400, avg: 1500, max: 1600 },
    Standard: { min: 1650, avg: 1800, max: 1950 },
    Premium:  { min: 2000, avg: 2200, max: 2400 },
  },
  "Duplex House": {
    Standard: { min: 1800, avg: 1950, max: 2100 },
    Premium:  { min: 2150, avg: 2400, max: 2650 },
    Luxury:   { min: 2700, avg: 3100, max: 3500 },
  },
  "Contemporary Villa": {
    Standard: { min: 2050, avg: 2250, max: 2450 },
    Premium:  { min: 2500, avg: 2850, max: 3100 },
    Luxury:   { min: 3200, avg: 3750, max: 4300 },
  },
  "Luxury Villa": {
    Premium:  { min: 2800, avg: 3150, max: 3450 },
    Luxury:   { min: 3600, avg: 4200, max: 5200 },
  },
} as const;

type Typology = keyof typeof RATES;

const BREAKDOWN = [
  { label: "Superstructure RCC frame",        pct: 22 },
  { label: "Foundation and substructure",     pct: 14 },
  { label: "Flooring and tile finishes",      pct: 11 },
  { label: "Bespoke joinery and main doors",  pct: 11 },
  { label: "Brickwork and internal walls",    pct: 10 },
  { label: "Plastering and external prep",    pct: 8 },
  { label: "Electrical infrastructure",       pct: 7 },
  { label: "Plumbing and drainage",           pct: 6 },
  { label: "Painting and fine finishes",      pct: 6 },
  { label: "Windows and outer glazing",       pct: 5 },
];

const HIDDEN_COSTS = [
  { label: "Borewell drilling",       range: "₹1,40,000 to ₹2,80,000" },
  { label: "HNTDA/DTCP approvals",    range: "₹1,20,000 to ₹2,50,000" },
  { label: "EB connection",           range: "₹45,000 to ₹85,000" },
  { label: "Soil testing",            range: "₹18,000 to ₹30,000" },
  { label: "Rainwater harvesting",    range: "₹35,000 to ₹60,000" },
  { label: "Compound wall",           range: "₹1,400 to ₹1,800 per running foot", note: "A 40×60 plot needs ~200 running feet = ₹3,00,000+" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function toLakh(n: number): string {
  const l = n / 100000;
  if (l >= 100) return `₹${(n / 10000000).toFixed(1)} crore`;
  if (l >= 1) return `₹${l.toFixed(0)} lakh`;
  return fmtINR(n);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CalculatorClient() {
  const [sqftRaw, setSqftRaw] = useState<string>("");
  const [typology, setTypology] = useState<Typology>("Independent House");
  const [tier, setTier] = useState<string>("Standard");

  const sqft = sqftRaw === "" ? 0 : parseInt(sqftRaw.replace(/\D/g, ""), 10) || 0;
  const availableTiers = Object.keys(RATES[typology]) as string[];

  function handleTypologyChange(newTypology: Typology) {
    setTypology(newTypology);
    const tiers = Object.keys(RATES[newTypology]);
    if (!tiers.includes(tier)) {
      setTier(tiers.includes("Standard") ? "Standard" : tiers[0]);
    }
  }

  // Derive result — no state needed, computed on every render
  const rateData = (RATES[typology] as Record<string, { min: number; avg: number; max: number }>)[tier];

  const hasResult = sqft > 0 && rateData;
  const baseCost = hasResult ? Math.round(sqft * rateData.avg) : 0;
  const minCost  = hasResult ? Math.round(sqft * rateData.min)  : 0;
  const maxCost  = hasResult ? Math.round(sqft * rateData.max)  : 0;

  const breakdown = hasResult
    ? BREAKDOWN.map((b) => ({ ...b, amount: Math.round(baseCost * b.pct / 100) }))
    : [];

  const maxBreakdownAmt = breakdown.length > 0 ? Math.max(...breakdown.map((b) => b.amount)) : 1;

  return (
    <div>
      {/* ── INPUTS ──────────────────────────────────────────────────── */}
      <div
        className="rounded-sm p-7 md:p-10 mb-6"
        style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-6" style={{ color: "var(--accent)" }}>
          Enter your project details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Built-up area */}
          <div>
            <label
              htmlFor="sqft-input"
              className="block font-mono text-[11px] uppercase tracking-[0.14em] mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              Built-up area (sqft)
            </label>
            <input
              id="sqft-input"
              type="number"
              inputMode="numeric"
              min={0}
              max={99999}
              placeholder="e.g. 1800"
              value={sqftRaw}
              onChange={(e) => setSqftRaw(e.target.value)}
              className="w-full font-mono tabular-nums rounded-sm px-4 py-3 outline-none focus:border-navy transition-colors"
              style={{
                fontSize: "18px",
                border: "1px solid var(--border)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <p className="font-mono text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>
              Total covered area across all floors
            </p>
          </div>

          {/* Typology */}
          <div>
            <label
              htmlFor="typology-select"
              className="block font-mono text-[11px] uppercase tracking-[0.14em] mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              Home type
            </label>
            <select
              id="typology-select"
              value={typology}
              onChange={(e) => handleTypologyChange(e.target.value as Typology)}
              className="w-full font-mono rounded-sm px-4 py-3 outline-none focus:border-navy transition-colors appearance-none cursor-pointer"
              style={{
                fontSize: "15px",
                border: "1px solid var(--border)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            >
              {(Object.keys(RATES) as Typology[]).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Quality tier */}
          <div>
            <label
              htmlFor="tier-select"
              className="block font-mono text-[11px] uppercase tracking-[0.14em] mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              Quality tier
            </label>
            <select
              id="tier-select"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full font-mono rounded-sm px-4 py-3 outline-none focus:border-navy transition-colors appearance-none cursor-pointer"
              style={{
                fontSize: "15px",
                border: "1px solid var(--border)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            >
              {availableTiers.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── RESULTS (shown when sqft > 0) ───────────────────────────── */}
      {hasResult && (
        <div className="space-y-6">

          {/* Summary */}
          <div
            className="rounded-sm p-7 md:p-10"
            style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.05)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>
              Estimate result · {typology} · {tier} · {sqft.toLocaleString("en-IN")} sqft
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--text-tertiary)" }}>Base estimate</p>
                <p className="font-mono tabular-nums" style={{ fontSize: "32px", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                  {toLakh(baseCost)}
                </p>
                <p className="font-mono text-[12px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                  {fmtINR(baseCost)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--text-tertiary)" }}>Low estimate</p>
                <p className="font-mono tabular-nums" style={{ fontSize: "24px", fontWeight: 400, color: "var(--text-secondary)" }}>
                  {toLakh(minCost)}
                </p>
                <p className="font-mono text-[12px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                  at ₹{rateData.min.toLocaleString("en-IN")}/sqft
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "var(--text-tertiary)" }}>High estimate</p>
                <p className="font-mono tabular-nums" style={{ fontSize: "24px", fontWeight: 400, color: "var(--text-secondary)" }}>
                  {toLakh(maxCost)}
                </p>
                <p className="font-mono text-[12px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                  at ₹{rateData.max.toLocaleString("en-IN")}/sqft
                </p>
              </div>
            </div>

            <p
              className="font-mono pt-4 border-t"
              style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7, borderColor: "rgba(196,154,60,0.2)" }}
            >
              This estimate covers civil, finishes, and MEP. It does not include land, approvals, or the hidden costs listed below.
            </p>
          </div>

          {/* Component breakdown */}
          <div
            className="rounded-sm p-7 md:p-10"
            style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-6" style={{ color: "var(--accent)" }}>
              Where your money goes
            </p>
            <div className="divide-y divide-border">
              {breakdown.map(({ label, pct, amount }) => (
                <div key={label} className="grid grid-cols-[1fr_110px] gap-4 py-3.5 items-center">
                  <div>
                    <p className="font-sans mb-1.5" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      {label}
                    </p>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(amount / maxBreakdownAmt) * 100}%`, background: "var(--accent)" }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono tabular-nums text-[13px]" style={{ color: "var(--text-tertiary)" }}>{pct}%</p>
                    <p className="font-mono tabular-nums" style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}>
                      {toLakh(amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden costs */}
          <div
            className="rounded-sm p-7 md:p-10"
            style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Not included in the rate
            </p>
            <p className="font-sans mb-6" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              These costs are real and common, but every contractor quote leaves them out. Budget for them separately.
            </p>
            <div className="divide-y divide-border">
              {HIDDEN_COSTS.map(({ label, range, note }) => (
                <div key={label} className="py-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <p className="font-serif" style={{ fontSize: "17px", fontWeight: 400, color: "var(--text-primary)" }}>
                      {label}
                    </p>
                    <p className="font-mono tabular-nums" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                      {range}
                    </p>
                  </div>
                  {note && (
                    <p className="font-mono text-[12px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/plan?city=hosur&type=${encodeURIComponent(typology.toLowerCase().replace(/ /g, "-"))}&sqft=${sqft}&tier=${tier.toLowerCase()}&from=hosur-calculator`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
              style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
            >
              Get a verified quote →
            </Link>
            <Link
              href="/construction-cost/hosur/material-prices"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-navy hover:text-navy"
              style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}
            >
              View current material prices
            </Link>
          </div>
        </div>
      )}

      {/* Empty state when no sqft entered */}
      {!hasResult && sqftRaw === "" && (
        <div
          className="rounded-sm p-8 text-center"
          style={{ border: "1px dashed var(--border)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>
            Enter a built-up area above to see your estimate
          </p>
        </div>
      )}
    </div>
  );
}
