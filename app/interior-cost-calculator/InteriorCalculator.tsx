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

// ── Icons ────────────────────────────────────────────────────────────────────

function IconKitchen({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="6" width="18" height="11" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <line x1="2" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="7" cy="8" r="1" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" />
      <circle cx="11" cy="8" r="1" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" />
      <line x1="15" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
function IconWardrobe({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="3" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <line x1="11" y1="3" x2="11" y2="19" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8.5" cy="11" r="1" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" />
      <circle cx="13.5" cy="11" r="1" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconCeiling() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <line x1="2" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="5" x2="6" y2="9" stroke="currentColor" strokeWidth="1" />
      <line x1="11" y1="5" x2="11" y2="9" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="5" x2="16" y2="9" stroke="currentColor" strokeWidth="1" />
      <circle cx="11" cy="15" r="3" stroke="currentColor" strokeWidth="1.25" />
      <line x1="11" y1="12" x2="11" y2="9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconPaint() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="2" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <line x1="8" y1="6" x2="8" y2="12" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 12 Q8 10 11 12 Q11 17 8 18 Q5 17 5 12Z" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
function IconFloor() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="2" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="12" y="2" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="2" y="12" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="12" y="12" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
function IconElec() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M13 2L5 12h7l-3 8 10-12h-7l3-6z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}
function IconTV() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="3" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <line x1="8" y1="15" x2="8" y2="19" stroke="currentColor" strokeWidth="1.25" />
      <line x1="14" y1="15" x2="14" y2="19" stroke="currentColor" strokeWidth="1.25" />
      <line x1="6" y1="19" x2="16" y2="19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
function IconFurn() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 14V9a2 2 0 014 0v2h8V9a2 2 0 014 0v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <rect x="2" y="14" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <line x1="5" y1="18" x2="5" y2="20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="17" y1="18" x2="17" y2="20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
function IconCurtain() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <line x1="2" y1="3" x2="20" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 3 Q5 10 4 19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9 3 Q8 10 9 19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M13 3 Q14 10 13 19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M18 3 Q17 10 18 19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
function IconLight() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.25" />
      <line x1="11" y1="2" x2="11" y2="4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="11" y1="16" x2="11" y2="18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="17" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="5.5" y1="4.5" x2="7" y2="6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="15" y1="14" x2="16.5" y2="15.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="16.5" y1="4.5" x2="15" y2="6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="7" y1="14" x2="5.5" y2="15.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const SCOPE_META: Record<ScopeKey, { label: string; desc: string; icon: (active: boolean) => JSX.Element }> = {
  "modular-kitchen":  { label: "Modular kitchen",       desc: "Carcass, shutters, hardware, countertop",     icon: (a) => <IconKitchen active={a} /> },
  "wardrobes":        { label: "Wardrobes",              desc: "Floor-to-ceiling per bedroom, internal fittings", icon: (a) => <IconWardrobe active={a} /> },
  "false-ceiling":    { label: "False ceiling",          desc: "Gypsum board, recessed light provisions",     icon: () => <IconCeiling /> },
  "painting":         { label: "Painting",               desc: "Primer + 2 finish coats, all surfaces",       icon: () => <IconPaint /> },
  "flooring":         { label: "Flooring",               desc: "Supply and lay, all rooms",                   icon: () => <IconFloor /> },
  "electrical":       { label: "Electrical",             desc: "Concealed conduit, wiring, modular switches", icon: () => <IconElec /> },
  "tv-storage":       { label: "TV & storage unit",      desc: "Entertainment unit with wall panel",          icon: () => <IconTV /> },
  "loose-furniture":  { label: "Loose furniture",        desc: "Sofa, beds, dining set, storage units",       icon: () => <IconFurn /> },
  "soft-furnishings": { label: "Soft furnishings",       desc: "Curtains, blinds, cushions, throws",         icon: () => <IconCurtain /> },
  "lighting":         { label: "Lighting",               desc: "Fixtures, LED strips, feature lighting",      icon: () => <IconLight /> },
};

const FINISH_TIERS: {
  value: FinishLevel;
  roman: string;
  label: string;
  tagline: string;
  materials: string[];
  band: string;
  indicative: string;
  dark?: boolean;
}[] = [
  {
    value: "basic",
    roman: "I",
    label: "Basic",
    tagline: "Functional and clean",
    materials: ["Vitrified / ceramic tiles", "Standard emulsion paint", "Prefab kitchen cabinets", "Standard bathroom fittings"],
    band: "#6B7280",
    indicative: "~₹800–1,400/sqft",
  },
  {
    value: "standard",
    roman: "II",
    label: "Standard",
    tagline: "Well-designed living",
    materials: ["Large-format / wood-look tiles", "Texture paint finish", "Semi-modular kitchen", "Designer CP fittings"],
    band: "#C49A3C",
    indicative: "~₹1,400–2,200/sqft",
  },
  {
    value: "premium",
    roman: "III",
    label: "Premium",
    tagline: "Architect-grade finish",
    materials: ["Imported marble / large-format stone", "Concealed LED, coffered ceilings", "Hettich/Häfele full-modular", "Smart switches, automation-ready"],
    band: "#0D1F3C",
    indicative: "~₹2,200–3,800/sqft",
  },
  {
    value: "ultra-luxury",
    roman: "IV",
    label: "Ultra Luxury",
    tagline: "By quotation only",
    materials: ["Bespoke millwork and joinery", "Imported natural stone throughout", "Specialist lighting design", "Site-measured, custom everything"],
    band: "#C49A3C",
    indicative: "Custom quote",
    dark: true,
  },
];

const PROPERTY_TYPES: { value: PropertyType; label: string; desc: string; icon: JSX.Element }[] = [
  {
    value: "apartment",
    label: "Apartment",
    desc: "Flat in a multi-storey building",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <line x1="6" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1" />
        <rect x="13" y="22" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="8" width="4" height="3" stroke="currentColor" strokeWidth="1" />
        <rect x="19" y="8" width="4" height="3" stroke="currentColor" strokeWidth="1" />
        <rect x="9" y="15" width="4" height="3" stroke="currentColor" strokeWidth="1" />
        <rect x="19" y="15" width="4" height="3" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    value: "independent-house",
    label: "Independent house",
    desc: "G+1 or standalone home",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16L16 5l12 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="16" width="20" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="13" y="20" width="6" height="8" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="19" width="4" height="3.5" stroke="currentColor" strokeWidth="1" />
        <rect x="20" y="19" width="4" height="3.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    value: "villa",
    label: "Villa",
    desc: "Large premium residence",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 18L10 8l6 7 4-5 10 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="18" width="28" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="13" y="22" width="6" height="7" stroke="currentColor" strokeWidth="1.2" />
        <rect x="5" y="21" width="5" height="4" stroke="currentColor" strokeWidth="1" />
        <rect x="22" y="21" width="5" height="4" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

const CURRENT_STATES: { value: CurrentState; label: string; subtitle: string; detail: string; icon: JSX.Element }[] = [
  {
    value: "bare-shell",
    label: "Bare shell",
    subtitle: "Raw structure, no finishes",
    detail: "Concrete walls and slab only. Civil, plumbing, and full electrical added automatically.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="18" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <line x1="3" y1="6" x2="9" y2="2" stroke="currentColor" strokeWidth="1.3" />
        <line x1="25" y1="6" x2="19" y2="2" stroke="currentColor" strokeWidth="1.3" />
        <line x1="9" y1="2" x2="19" y2="2" stroke="currentColor" strokeWidth="1.3" />
        <line x1="14" y1="6" x2="14" y2="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    value: "semi-finished",
    label: "Semi-finished",
    subtitle: "Civil done, no interiors yet",
    detail: "Walls plastered, basic plumbing roughed in. Pick your electrical and finish scope.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="18" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1" />
        <rect x="3" y="14" width="22" height="10" rx="0" fill="currentColor" fillOpacity="0.06" />
        <line x1="11" y1="6" x2="11" y2="24" stroke="currentColor" strokeWidth="1.1" />
        <rect x="13" y="17" width="5" height="7" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    value: "occupied",
    label: "Occupied / renovation",
    subtitle: "Existing home, full redo",
    detail: "Demolition costs included. All surfaces stripped and rebuilt to your chosen finish.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="18" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="3" y="6" width="22" height="18" fill="currentColor" fillOpacity="0.05" />
        <line x1="8" y1="11" x2="20" y2="23" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="20" y1="11" x2="8" y2="23" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="11" y="14" width="6" height="8" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

const ALL_SCOPE: ScopeKey[] = [...SCOPE_KEYS];

// ── Formatting ────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
function fmtINRShort(n: number): string {
  if (n >= 10_000_000) return "₹" + (n / 10_000_000).toFixed(2) + " Cr";
  if (n >= 100_000)    return "₹" + (n / 100_000).toFixed(1) + "L";
  return fmtINR(n);
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-5 mb-7">
      <span
        className="font-serif leading-none select-none shrink-0"
        style={{ fontSize: 48, fontWeight: 300, color: "var(--border)", letterSpacing: "-0.04em", lineHeight: 1 }}
        aria-hidden="true"
      >
        {num}
      </span>
      <div>
        <div className="h-px mb-2" style={{ width: 40, background: "var(--accent)" }} />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-tertiary)" }}>
          {title}
        </p>
      </div>
    </div>
  );
}

// ── Lead form ─────────────────────────────────────────────────────────────────

function LeadForm({ city, input, result }: { city: City; input: InteriorInput; result: InteriorResult }) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr]   = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [serverErr, setServerErr]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameErr(""); setPhoneErr(""); setServerErr("");
    let ok = true;
    if (name.trim().length < 2) { setNameErr("Enter your name"); ok = false; }
    if (!/^\d{10}$/.test(phone))  { setPhoneErr("Enter a valid 10-digit number"); ok = false; }
    if (!ok) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/interior-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), phone, city,
          message: message.trim() || undefined,
          propertyType: input.propertyType, bhk: input.bhk,
          carpetArea: input.carpetArea, currentState: input.currentState,
          finishLevel: input.finishLevel, scope: input.scope,
          estimateMin: result.headline.min, estimateMax: result.headline.max,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setServerErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="h-px mb-6" style={{ background: "rgba(196,154,60,0.3)" }} />
        <p className="font-serif mb-1" style={{ fontSize: 20, fontWeight: 400, color: "#fff" }}>Request received.</p>
        <p className="font-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
          A verified partner will reach out within one working day.
        </p>
      </motion.div>
    );
  }

  const inputStyle = {
    height: 44, padding: "0 14px", fontSize: 14, borderRadius: 2,
    background: "rgba(255,255,255,0.07)", color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)", outline: "none", width: "100%",
  };
  const labelStyle = { fontSize: 11, fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 6 };
  const errStyle   = { fontSize: 12, color: "#F87171", marginTop: 4 };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="h-px mb-6" style={{ background: "rgba(196,154,60,0.3)" }} />
      <p className="font-serif mb-5" style={{ fontSize: 18, fontWeight: 400, color: "#fff", letterSpacing: "-0.01em" }}>
        Connect with a verified interior partner
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>Your name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={{ ...inputStyle, borderColor: nameErr ? "#F87171" : "rgba(255,255,255,0.15)" }} />
          {nameErr && <p style={errStyle}>{nameErr}</p>}
        </div>
        <div>
          <label style={labelStyle}>Mobile number</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>+91</span>
            <input type="tel" inputMode="numeric" maxLength={10} value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="10-digit number"
              style={{ ...inputStyle, paddingLeft: 46, borderColor: phoneErr ? "#F87171" : "rgba(255,255,255,0.15)" }} />
          </div>
          {phoneErr && <p style={errStyle}>{phoneErr}</p>}
        </div>
      </div>
      <div className="mb-5">
        <label style={labelStyle}>Message (optional)</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Timeline, specific requirements..." rows={2}
          style={{ ...inputStyle, height: "auto", padding: "10px 14px", lineHeight: 1.6, resize: "none" }} />
      </div>
      {serverErr && <p style={{ ...errStyle, marginBottom: 12 }}>{serverErr}</p>}
      <button type="submit" disabled={submitting}
        style={{
          height: 48, padding: "0 28px", borderRadius: 2, border: "none", cursor: submitting ? "not-allowed" : "pointer",
          background: "linear-gradient(to bottom, #d4a540, #b07825)", color: "#fff",
          fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em",
          opacity: submitting ? 0.7 : 1, transition: "opacity 150ms",
        }}
      >
        {submitting ? "Sending…" : "Request a quote →"}
      </button>
    </form>
  );
}

// ── Result panel ──────────────────────────────────────────────────────────────

function ResultPanel({ result, input, city, onReset }: {
  result: CalcResult; input: InteriorInput; city: City; onReset: () => void;
}) {
  const [showLead, setShowLead] = useState(false);
  const finishLabel = input.finishLevel.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: "#0D1F3C", borderRadius: 4, overflow: "hidden" }}
    >
      {/* Gold accent top bar */}
      <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #C49A3C 30%, #C49A3C 70%, transparent)" }} />

      <div style={{ padding: "clamp(28px,4vw,44px)" }}>

        {result.isUltraLuxury ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(196,154,60,0.7)" }}>
              Ultra Luxury &middot; {CITY_LABELS[city]}
            </p>
            <p className="font-serif mb-3" style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              This tier is quoted per project.
            </p>
            <p className="font-sans mb-6" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
              Ultra Luxury interiors demand a site visit, design brief, and bespoke material sourcing before any number is meaningful. Connect with a verified designer below.
            </p>
            {!showLead ? (
              <button onClick={() => setShowLead(true)}
                style={{ height: 48, padding: "0 24px", borderRadius: 2, border: "none", cursor: "pointer",
                  background: "linear-gradient(to bottom, #d4a540, #b07825)", color: "#fff",
                  fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                Talk to a verified designer &rarr;
              </button>
            ) : (
              <LeadForm city={city} input={input}
                result={{ isUltraLuxury: false, headline: { min: 0, max: 0 }, perSqft: { min: 0, max: 0 }, categories: [], designFeeRange: null }} />
            )}
          </>
        ) : (
          <>
            {/* Header line */}
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(196,154,60,0.7)" }}>
              Interior estimate &middot; {CITY_LABELS[city]} &middot; {input.bhk} BHK &middot; {input.carpetArea.toLocaleString("en-IN")} sqft
            </p>

            {/* Headline number */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <p className="font-serif" style={{ fontSize: "clamp(14px,2.2vw,17px)", fontWeight: 400, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                Total cost range
              </p>
              <p className="font-serif" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 2 }}>
                {fmtINR(result.headline.min)}
              </p>
              <p className="font-serif mb-1" style={{ fontSize: "clamp(14px,2vw,18px)", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>
                to
              </p>
              <p className="font-serif mb-4" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                {fmtINR(result.headline.max)}
              </p>
              {/* Gold rule */}
              <div style={{ height: 1, background: "linear-gradient(90deg, #C49A3C, rgba(196,154,60,0.2))", marginBottom: 10, maxWidth: 180 }} />
              <p className="font-mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>
                {result.perSqft.min.toLocaleString("en-IN")} &ndash; {result.perSqft.max.toLocaleString("en-IN")} &#8377;/sqft &middot; {finishLabel}
              </p>
            </motion.div>

            {/* Breakdown */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, marginTop: 20, marginBottom: 20 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Cost breakdown
              </p>
              {result.categories.map((cat) => {
                const pct = result.headline.max > 0 ? (cat.range.max / result.headline.max) * 100 : 0;
                const innerPct = cat.range.max > 0 ? (cat.range.min / cat.range.max) * 100 : 0;
                return (
                  <div key={cat.label} className="mb-4">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="font-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{cat.label}</span>
                      <span className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                        {fmtINRShort(cat.range.min)} &ndash; {fmtINRShort(cat.range.max)}
                      </span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: "rgba(196,154,60,0.25)", position: "relative" }}>
                        <div style={{ width: `${innerPct}%`, height: "100%", borderRadius: 2, background: "#C49A3C" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              {result.designFeeRange && (
                <div className="mb-4">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>Design &amp; management (8&ndash;12%)</span>
                    <span className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                      {fmtINRShort(result.designFeeRange.min)} &ndash; {fmtINRShort(result.designFeeRange.max)}
                    </span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.05)" }}>
                    <div style={{ width: `${result.headline.max > 0 ? (result.designFeeRange.max / result.headline.max) * 100 : 0}%`, height: "100%", borderRadius: 2, background: "rgba(196,154,60,0.15)" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Includes / excludes */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 18, marginBottom: 18 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Covers</p>
              {["Materials and labour for all selected scope items", "City-adjusted rates for " + CITY_LABELS[city], "Design and management fee where applicable"].map(item => (
                <p key={item} className="font-sans flex items-start gap-2 mb-1.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  <span style={{ color: "#C49A3C", marginTop: 2, flexShrink: 0 }}>&mdash;</span>{item}
                </p>
              ))}
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] mt-4 mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Not included</p>
              {["Statutory approvals and permits", "Structural changes or column removal", "Appliances (AC, refrigerator, washer)", "Building elevation or facade work"].map(item => (
                <p key={item} className="font-sans flex items-start gap-2 mb-1.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
                  <span style={{ color: "rgba(255,255,255,0.2)", marginTop: 2, flexShrink: 0 }}>&mdash;</span>{item}
                </p>
              ))}
            </div>

            {/* Credibility */}
            <p className="font-mono mb-6" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.7, letterSpacing: "0.02em" }}>
              {CREDIBILITY_LINES[city]}
            </p>

            {/* CTA */}
            {!showLead ? (
              <button onClick={() => setShowLead(true)}
                style={{ width: "100%", height: 50, borderRadius: 2, border: "none", cursor: "pointer",
                  background: "linear-gradient(to bottom, #d4a540, #b07825)", color: "#fff",
                  fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                Get an exact quote from a verified partner &rarr;
              </button>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <LeadForm city={city} input={input} result={result} />
              </motion.div>
            )}

            {/* Reset */}
            <button onClick={onReset}
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", cursor: "pointer", padding: 0 }}>
              Recalculate
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Placeholder panel ─────────────────────────────────────────────────────────

function PlaceholderPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ border: "1px dashed rgba(196,154,60,0.25)", borderRadius: 4, padding: "clamp(32px,5vw,52px)", textAlign: "center", background: "rgba(196,154,60,0.02)" }}
    >
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(196,154,60,0.2)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v6l4 2" stroke="#C49A3C" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="10" cy="10" r="8" stroke="#C49A3C" strokeWidth="1.3" />
        </svg>
      </div>
      <p className="font-serif mb-2" style={{ fontSize: 20, fontWeight: 400, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
        Your estimate appears here
      </p>
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
        Complete the form and tap Calculate to see your interior cost range with a full breakdown.
      </p>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

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
  const resultRef = useRef<HTMLDivElement>(null);

  const isBareShell = currentState === "bare-shell";
  const activeScope: Set<ScopeKey> = isBareShell ? new Set([...scope, "electrical" as ScopeKey]) : scope;

  function toggleScope(key: ScopeKey) {
    if (isBareShell && key === "electrical") return;
    setScope(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
    setResult(null);
  }

  function handleStateChange(s: CurrentState) {
    setCurrentState(s);
    if (s === "bare-shell") setScope(prev => new Set([...prev, "electrical" as ScopeKey]));
    setResult(null);
  }

  function handleCalculate() {
    setAreaError("");
    const n = Number(carpetArea);
    if (!carpetArea || isNaN(n)) { setAreaError("Enter a carpet area"); return; }
    if (n < 200)   { setAreaError("Minimum is 200 sqft"); return; }
    if (n > 10000) { setAreaError("Maximum is 10,000 sqft"); return; }
    if (activeScope.size === 0) return;

    const input: InteriorInput = { city, propertyType, bhk, carpetArea: n, currentState, finishLevel, scope: [...activeScope] };
    setResult(computeInteriorCost(input));
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  const inputForLead: InteriorInput = {
    city, propertyType, bhk, carpetArea: Number(carpetArea) || 0,
    currentState, finishLevel, scope: [...activeScope],
  };

  const canCalculate = activeScope.size > 0;

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D1F3C", borderBottom: "1px solid rgba(196,154,60,0.2)" }}>
        <div className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-12 md:pt-20 md:pb-16">
          <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70" style={{ color: "rgba(255,255,255,0.35)" }}>Estimato</Link>
            <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.55)" }}>Interior cost calculator</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(196,154,60,0.8)" }}>
                Free &middot; No sign-up &middot; Verified 2026 rates
              </p>
              <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px,5.5vw,60px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.02, color: "#fff" }}>
                Interior cost<br className="hidden md:block" /> calculator
              </h1>
              <p className="font-sans" style={{ fontSize: "clamp(15px,1.8vw,17px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "48ch" }}>
                A verified cost range for your home interior in Bangalore or Hosur. Covers every scope item &mdash; kitchen to curtains. Your estimate is shown in full, ungated.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden", minWidth: 220 }}>
                {[["10", "scope items"], ["3", "cities live"], ["4", "finish tiers"], ["2026", "rates verified"]].map(([n, l]) => (
                  <div key={l} style={{ padding: "14px 16px", background: "#0D1F3C" }}>
                    <p className="font-serif" style={{ fontSize: 22, fontWeight: 400, color: "#C49A3C", letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-16 items-start">

          {/* ── FORM COLUMN ── */}
          <div>

            {/* 01 — Your property */}
            <div className="mb-14">
              <SectionHead num="01" title="Your property" />

              {/* City */}
              <div className="mb-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: "var(--text-tertiary)" }}>City</p>
                <div style={{ position: "relative", maxWidth: 340 }}>
                  <select
                    value={city}
                    onChange={e => { setCity(e.target.value as City); setResult(null); }}
                    style={{
                      width: "100%", height: 48, padding: "0 40px 0 16px", fontSize: 15,
                      fontFamily: "inherit", borderRadius: 2, border: "1px solid var(--border)",
                      background: "#fff", color: "var(--text-primary)", outline: "none",
                      appearance: "none",
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23566776' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                    }}
                  >
                    <option value="hosur">Hosur — Tamil Nadu</option>
                    <option value="bangalore-outskirts">Bangalore Outskirts — Karnataka</option>
                    <option value="bangalore-urban">Bangalore Urban — Karnataka</option>
                    <optgroup label="Coming soon">
                      {["Chennai", "Hyderabad", "Pune", "Coimbatore"].map(c => <option key={c} disabled>{c}</option>)}
                    </optgroup>
                  </select>
                </div>
                <p className="font-mono text-[10px] mt-2 uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
                  Rates verified against local designer quotes
                </p>
              </div>

              {/* Property type */}
              <div className="mb-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: "var(--text-tertiary)" }}>Property type</p>
                <div className="grid grid-cols-3 gap-3">
                  {PROPERTY_TYPES.map(pt => {
                    const active = propertyType === pt.value;
                    return (
                      <button key={pt.value} type="button" onClick={() => { setPropertyType(pt.value); setResult(null); }}
                        style={{
                          padding: "16px 12px", borderRadius: 2, textAlign: "center", cursor: "pointer",
                          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          background: active ? "rgba(196,154,60,0.06)" : "#fff",
                          transition: "all 150ms",
                        }}>
                        <div style={{ color: active ? "var(--accent)" : "var(--text-tertiary)", marginBottom: 8, display: "flex", justifyContent: "center" }}>
                          {pt.icon}
                        </div>
                        <p className="font-sans" style={{ fontSize: 12, fontWeight: 500, color: active ? "var(--accent)" : "var(--text-primary)", marginBottom: 2 }}>{pt.label}</p>
                        <p className="font-sans" style={{ fontSize: 10, color: "var(--text-tertiary)", lineHeight: 1.4 }}>{pt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BHK */}
              <div className="mb-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: "var(--text-tertiary)" }}>BHK configuration</p>
                <div className="flex flex-wrap gap-2">
                  {(["1", "2", "3", "4", "5+"] as BHK[]).map(b => {
                    const active = bhk === b;
                    return (
                      <button key={b} type="button" onClick={() => { setBhk(b); setResult(null); }}
                        style={{
                          padding: "8px 20px", borderRadius: 2, cursor: "pointer",
                          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          background: active ? "rgba(196,154,60,0.08)" : "transparent",
                          fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
                          color: active ? "var(--accent)" : "var(--text-secondary)", transition: "all 150ms",
                        }}>
                        {b} BHK
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Carpet area */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: "var(--text-tertiary)" }}>Carpet area</p>
                <div style={{ position: "relative", maxWidth: 260 }}>
                  <input
                    type="number" inputMode="numeric" min={200} max={10000}
                    value={carpetArea}
                    onChange={e => { setCarpetArea(e.target.value); setAreaError(""); setResult(null); }}
                    placeholder="e.g. 1000"
                    style={{
                      width: "100%", height: 48, padding: "0 60px 0 16px", fontSize: 18,
                      fontFamily: "monospace", borderRadius: 2,
                      border: `1px solid ${areaError ? "#B33A3A" : "var(--border)"}`,
                      background: "#fff", color: "var(--text-primary)", outline: "none",
                      letterSpacing: "-0.02em",
                    }}
                  />
                  <span className="font-mono" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>sqft</span>
                </div>
                {areaError
                  ? <p className="font-sans mt-1.5" style={{ fontSize: 12, color: "#B33A3A" }}>{areaError}</p>
                  : <p className="font-sans mt-1.5" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>200 &ndash; 10,000 sqft. Carpet area excludes walls and common areas.</p>
                }
              </div>
            </div>

            <div className="h-px mb-14" style={{ background: "var(--border)" }} />

            {/* 02 — Current state */}
            <div className="mb-14">
              <SectionHead num="02" title="Current state of property" />
              <p className="font-sans mb-5" style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                This is the single biggest swing factor in your interior budget.
              </p>
              <div className="flex flex-col gap-3">
                {CURRENT_STATES.map(cs => {
                  const active = currentState === cs.value;
                  return (
                    <button key={cs.value} type="button" onClick={() => handleStateChange(cs.value)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px",
                        borderRadius: 2, textAlign: "left", cursor: "pointer",
                        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                        background: active ? "rgba(196,154,60,0.05)" : "#fff",
                        transition: "all 150ms",
                        borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                      }}>
                      <div style={{ color: active ? "var(--accent)" : "var(--text-tertiary)", flexShrink: 0, marginTop: 2 }}>
                        {cs.icon}
                      </div>
                      <div>
                        <p className="font-serif mb-0.5" style={{ fontSize: 17, fontWeight: 400, color: active ? "var(--text-primary)" : "var(--text-primary)", lineHeight: 1.2 }}>
                          {cs.label}
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: active ? "var(--accent)" : "var(--text-tertiary)" }}>
                          {cs.subtitle}
                        </p>
                        <p className="font-sans" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          {cs.detail}
                        </p>
                      </div>
                      {active && (
                        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5l3 3 5-5.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px mb-14" style={{ background: "var(--border)" }} />

            {/* 03 — Scope */}
            <div className="mb-14">
              <SectionHead num="03" title="Scope of work" />
              <div className="flex items-center justify-between mb-5">
                <p className="font-sans" style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                  Toggle what you need. Each item adds a cost block.
                </p>
                <button type="button"
                  onClick={() => {
                    const allOn = ALL_SCOPE.every(k => activeScope.has(k));
                    setScope(allOn ? new Set(isBareShell ? ["electrical" as ScopeKey] : []) : new Set(ALL_SCOPE));
                    setResult(null);
                  }}
                  style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 16 }}>
                  {ALL_SCOPE.every(k => activeScope.has(k)) ? "Deselect all" : "Select all"}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ALL_SCOPE.map(key => {
                  const meta   = SCOPE_META[key];
                  const active = activeScope.has(key);
                  const locked = isBareShell && key === "electrical";
                  return (
                    <button key={key} type="button" onClick={() => !locked && toggleScope(key)} disabled={locked}
                      style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
                        borderRadius: 2, textAlign: "left", cursor: locked ? "not-allowed" : "pointer",
                        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                        background: active ? "rgba(196,154,60,0.05)" : "#fff",
                        borderLeft: `3px solid ${active ? "var(--accent)" : "transparent"}`,
                        opacity: locked ? 0.7 : 1,
                        transition: "all 150ms",
                      }}>
                      <div style={{ color: active ? "var(--accent)" : "var(--text-tertiary)", flexShrink: 0 }}>
                        {meta.icon(active)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="font-sans" style={{ fontSize: 13, fontWeight: 500, color: active ? "var(--text-primary)" : "var(--text-secondary)", marginBottom: 1 }}>
                          {meta.label}
                          {locked && <span className="font-mono ml-2" style={{ fontSize: 9, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.14em" }}>Auto-added</span>}
                        </p>
                        <p className="font-sans" style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{meta.desc}</p>
                      </div>
                      <div style={{
                        width: 18, height: 18, borderRadius: 2, flexShrink: 0,
                        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                        background: active ? "var(--accent)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 150ms",
                      }}>
                        {active && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5l3 3 5-5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                    </button>
                  );
                })}
              </div>
              {activeScope.size === 0 && (
                <p className="font-sans mt-3" style={{ fontSize: 12, color: "#B33A3A" }}>Select at least one scope item to calculate.</p>
              )}
            </div>

            <div className="h-px mb-14" style={{ background: "var(--border)" }} />

            {/* 04 — Finish level */}
            <div className="mb-12">
              <SectionHead num="04" title="Finish level" />
              <p className="font-sans mb-6" style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                Your finish level is the most powerful variable. It affects every rate in the model.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FINISH_TIERS.map(tier => {
                  const active = finishLevel === tier.value;
                  return (
                    <button key={tier.value} type="button" onClick={() => { setFinishLevel(tier.value); setResult(null); }}
                      style={{
                        textAlign: "left", padding: "22px 22px", borderRadius: 2, cursor: "pointer",
                        border: `1px solid ${active ? tier.band : "var(--border)"}`,
                        background: tier.dark ? (active ? "#0D1F3C" : "#f8f9fb") : (active ? `rgba(${tier.band === "#C49A3C" ? "196,154,60" : "107,114,128"},0.06)` : "#fff"),
                        transition: "all 180ms",
                        boxShadow: active ? `0 0 0 1px ${tier.band}` : "none",
                      }}>
                      {/* Roman numeral */}
                      <p className="font-serif mb-1" style={{ fontSize: 28, fontWeight: 300, color: active ? tier.band : "var(--border)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                        {tier.roman}
                      </p>
                      <p className="font-serif mb-0.5" style={{ fontSize: 18, fontWeight: 400, color: tier.dark ? (active ? "#fff" : "var(--text-primary)") : "var(--text-primary)", letterSpacing: "-0.01em" }}>
                        {tier.label}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: active ? tier.band : "var(--text-tertiary)" }}>
                        {tier.tagline}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                        {tier.materials.map(m => (
                          <li key={m} className="font-sans flex items-start gap-2 mb-1.5" style={{ fontSize: 12, color: tier.dark ? (active ? "rgba(255,255,255,0.65)" : "var(--text-secondary)") : "var(--text-secondary)", lineHeight: 1.45 }}>
                            <span style={{ color: tier.band, flexShrink: 0, marginTop: 1 }}>&mdash;</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                      <p className="font-mono text-[11px]" style={{ color: active ? tier.band : "var(--text-tertiary)" }}>
                        {tier.indicative}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculate */}
            <button type="button" onClick={handleCalculate} disabled={!canCalculate}
              style={{
                width: "100%", height: 56, borderRadius: 2, border: "none",
                cursor: canCalculate ? "pointer" : "not-allowed",
                background: canCalculate
                  ? "linear-gradient(to bottom, #1b3568, #0c1d42)"
                  : "var(--border)",
                color: canCalculate ? "#fff" : "var(--text-tertiary)",
                fontFamily: "monospace", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em",
                boxShadow: canCalculate ? "0 2px 12px rgba(13,31,60,0.22), 0 1px 3px rgba(13,31,60,0.18)" : "none",
                transition: "all 200ms",
              }}>
              {finishLevel === "ultra-luxury" ? "Get a custom quote →" : "Calculate my interior cost →"}
            </button>

            {!canCalculate && (
              <p className="font-sans mt-2 text-center" style={{ fontSize: 12, color: "#B33A3A" }}>Select at least one scope item above.</p>
            )}
          </div>

          {/* ── RESULT COLUMN ── */}
          <div ref={resultRef} style={{ position: "sticky", top: 100 }}>
            <AnimatePresence mode="wait">
              {result
                ? <ResultPanel key="result" result={result} input={inputForLead} city={city} onReset={() => setResult(null)} />
                : <PlaceholderPanel key="placeholder" />
              }
            </AnimatePresence>
          </div>

        </div>
      </div>
    </>
  );
}
