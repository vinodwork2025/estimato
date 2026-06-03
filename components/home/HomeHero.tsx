"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

// ── Glass card shell — NOT absolute; positioning goes on the wrapper ──────────
function GlassCard({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.45)",
        borderRadius: 18,
        boxShadow:
          "0 12px 40px rgba(13,31,60,0.16), 0 2px 8px rgba(13,31,60,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Floating wrapper — absolute position + float animation ───────────────────
function FloatingCard({
  children,
  top,
  bottom,
  left,
  right,
  floatDelay = 0,
  entryDelay = 0.8,
  entryFrom = { opacity: 0, y: 16 },
}: {
  children: React.ReactNode;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  floatDelay?: number;
  entryDelay?: number;
  entryFrom?: { opacity?: number; x?: number; y?: number };
}) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ top, bottom, left, right }}
      initial={entryFrom}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: entryDelay, duration: 0.8, ease }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ── Card 1: Total Estimated Cost — top-right ──────────────────────────────────
function CostCard() {
  const rows = [
    { label: "Structure",         value: "₹33,80,000" },
    { label: "Finishes",          value: "₹19,60,000" },
    { label: "MEP Services",      value: "₹8,20,000"  },
    { label: "External Works",    value: "₹6,00,000"  },
    { label: "Contingency (5%)",  value: "₹3,32,000"  },
    { label: "Taxes & Others",    value: "₹7,00,000"  },
  ];
  return (
    <GlassCard style={{ width: 252 }}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7B93A8] mb-1.5">
              Total Estimated Cost
            </p>
            <p className="font-serif text-[#0E2248] leading-none" style={{ fontSize: 24, letterSpacing: "-0.03em" }}>
              ₹76,42,000
            </p>
          </div>
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mt-0.5 flex-shrink-0"
            style={{ background: "rgba(13,31,60,0.07)", color: "#0E2248", border: "1px solid rgba(13,31,60,0.12)" }}
          >
            BOQ ✓
          </span>
        </div>
        <div className="space-y-1.5 border-t pt-3" style={{ borderColor: "rgba(13,31,60,0.07)" }}>
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between items-baseline">
              <span className="font-mono text-[10px] text-[#7B93A8]">{r.label}</span>
              <span className="font-mono text-[10px] text-[#3D5573] tabular-nums">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex justify-between items-center px-4 py-2.5 border-t"
        style={{ borderColor: "rgba(13,31,60,0.07)", background: "rgba(13,31,60,0.03)" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#7B93A8]">Cost per sq.ft</span>
        <span className="font-mono text-[12px] font-semibold text-[#0E2248] tabular-nums">₹2,650</span>
      </div>
    </GlassCard>
  );
}

// ── Card 2: Material Quantities — mid-right ────────────────────────────────────
function MaterialCard() {
  const items = [
    { label: "Cement",  value: "500 Bags",    pct: 72 },
    { label: "Steel",   value: "8.25 Tonnes", pct: 55 },
    { label: "Bricks",  value: "14,200 Nos",  pct: 85 },
    { label: "M-Sand",  value: "42.5 Cum",    pct: 40 },
  ];
  return (
    <GlassCard style={{ width: 210 }}>
      <div className="px-4 py-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7B93A8] mb-3.5">
          Material Quantities
        </p>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-mono text-[10px] text-[#3D5573]">{item.label}</span>
                <span className="font-mono text-[10px] text-[#7B93A8] tabular-nums">{item.value}</span>
              </div>
              <div className="h-[3px] rounded-full" style={{ background: "rgba(13,31,60,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: "#C79B4B" }} />
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-3.5 w-full font-mono text-[9px] uppercase tracking-wider text-[#C79B4B] border-t pt-3 text-left hover:opacity-70 transition-opacity"
          style={{ borderColor: "rgba(13,31,60,0.07)" }}
        >
          View full BOQ →
        </button>
      </div>
    </GlassCard>
  );
}

// ── Card 3: City Benchmark — bottom-left ──────────────────────────────────────
function CityCard() {
  return (
    <GlassCard style={{ width: 224 }}>
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0E2248" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#0E2248] uppercase tracking-wider">Hosur</span>
          <span className="ml-auto font-mono text-[9px] text-emerald-700 px-2 py-0.5 rounded-full"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            ↑ 3.6%
          </span>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-[#7B93A8] mb-1.5">
          Construction Cost Range
        </p>
        <p className="font-serif text-[#0E2248] leading-none mb-3" style={{ fontSize: 22, letterSpacing: "-0.025em" }}>
          ₹2,450 – ₹2,850
          <span className="text-[12px] text-[#7B93A8] font-sans"> /sq.ft</span>
        </p>
        <button className="font-mono text-[9px] uppercase tracking-wider text-[#C79B4B] hover:opacity-70 transition-opacity">
          View city trends →
        </button>
      </div>
    </GlassCard>
  );
}

// ── Card 4: Built-up Area — bottom-center ─────────────────────────────────────
function AreaCard() {
  return (
    <GlassCard style={{ width: 168 }}>
      <div className="px-4 py-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" />
          </svg>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#7B93A8]">Built-up Area</p>
        </div>
        <p className="font-serif text-[#0E2248] leading-none mb-1" style={{ fontSize: 32, letterSpacing: "-0.035em" }}>
          1,600
        </p>
        <p className="font-mono text-[10px] text-[#7B93A8] mb-2.5">sq.ft</p>
        <span
          className="font-mono text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: "rgba(13,31,60,0.06)", color: "#3D5573", border: "1px solid rgba(13,31,60,0.08)" }}
        >
          3 BHK Villa
        </span>
      </div>
    </GlassCard>
  );
}

// ── Card 5: Project Timeline — bottom-right ───────────────────────────────────
function TimelineCard() {
  const phases = [
    { label: "Planning",  dur: "15 Days",    color: "#C79B4B", w: 12 },
    { label: "Structure", dur: "2.5 Months", color: "#0E2248", w: 38 },
    { label: "Finishing", dur: "3 Months",   color: "#1E3A5F", w: 44 },
    { label: "Handover",  dur: "15 Days",    color: "#7B93A8", w: 12 },
  ];
  const total = phases.reduce((s, p) => s + p.w, 0);
  return (
    <GlassCard style={{ width: 248 }}>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7B93A8]">Project Timeline</p>
          <span className="font-mono text-[11px] font-semibold text-[#0E2248]">7.5 Months</span>
        </div>
        {/* Segmented phase bar */}
        <div className="flex rounded-full overflow-hidden h-2.5 gap-px mb-3.5">
          {phases.map((p) => (
            <div key={p.label} style={{ flex: p.w / total, background: p.color }} />
          ))}
        </div>
        {/* Phase rows */}
        <div className="space-y-2">
          {phases.map((p) => (
            <div key={p.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <span className="font-mono text-[10px] text-[#3D5573]">{p.label}</span>
              </div>
              <span className="font-mono text-[10px] text-[#7B93A8] tabular-nums">{p.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// ── Trust bar ─────────────────────────────────────────────────────────────────
const TRUST = [
  {
    label: "Verified Rates", sub: "Built from real BOQs",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  },
  {
    label: "Transparent", sub: "No hidden assumptions",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
  },
  {
    label: "City Specific", sub: "12+ cities covered",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  },
  {
    label: "BOQ Verified", sub: "Cross-checked with experts",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
      style={{ background: "#FAF8F5", minHeight: "90vh" }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-[45fr_55fr]"
        style={{ maxWidth: 1440, minHeight: "90vh" }}
      >

        {/* ══ LEFT ══════════════════════════════════════════════ */}
        <div className="flex flex-col justify-center px-8 py-24 lg:py-0 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-16 relative z-10">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease }}
            className="flex items-center gap-3 mb-9"
          >
            <div className="h-px w-7 flex-shrink-0" style={{ background: "#C79B4B", opacity: 0.6 }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7B93A8]">
              Free for Indian Homeowners&nbsp;·&nbsp;2026 Verified Rates
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.1, ease }}
            className="font-serif text-[#0E2248] mb-7"
            style={{ fontSize: "clamp(40px, 5vw, 66px)", lineHeight: 1.04, letterSpacing: "-0.033em", fontWeight: 400 }}
          >
            Plan your home<br />
            with numbers that<br />
            actually{" "}
            <em className="not-italic" style={{ color: "#C79B4B" }}>hold up.</em>
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.28, ease }}
            style={{ width: 40, height: 1, background: "#C79B4B", marginBottom: 26, transformOrigin: "left" }}
          />

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34, ease }}
            className="text-[#3D5573] mb-10"
            style={{ fontSize: 17, maxWidth: "44ch", lineHeight: 1.78 }}
          >
            A construction cost projection built from real Hosur and Bengaluru BOQs.
            Updated quarterly. Seven steps. No contractor pitch.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Link href="/plan">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-9 gap-2 group">
                Begin your projection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/methodology">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                Read the methodology
              </Button>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.56 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5 pt-8 border-t"
            style={{ borderColor: "rgba(13,31,60,0.1)" }}
          >
            {TRUST.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.62 + i * 0.08 }}
              >
                <div className="mb-2">{item.icon}</div>
                <p className="font-serif text-[#0E2248] mb-0.5"
                  style={{ fontSize: 14, fontWeight: 400, letterSpacing: "-0.008em", lineHeight: 1.25 }}>
                  {item.label}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7B93A8] leading-snug">
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══ RIGHT — image + cards ════════════════════════════ */}
        <div className="relative hidden lg:block" style={{ minHeight: "90vh" }}>

          {/* Villa image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease }}
          >
            <Image
              src="/hero-villa.jpg"
              alt="Contemporary luxury villa — Estimato helps you plan and budget with real numbers"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "left center" }}
              sizes="55vw"
            />
          </motion.div>

          {/* Seamless left-edge blend — wide gradient into page bg */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 pointer-events-none z-10"
            style={{
              width: "45%",
              background: "linear-gradient(to right, #FAF8F5 0%, rgba(250,248,245,0.7) 40%, rgba(250,248,245,0) 100%)",
            }}
          />

          {/* Bottom depth gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, rgba(14,34,72,0.32) 0%, transparent 100%)" }}
          />

          {/* ── Card 1: Cost — top-right ── */}
          <FloatingCard top={24} right={20} entryDelay={0.75} entryFrom={{ opacity: 0, y: -16 }} floatDelay={0}>
            <CostCard />
          </FloatingCard>

          {/* ── Card 2: Materials — mid-right, below cost card ── */}
          <FloatingCard top={260} right={20} entryDelay={0.92} floatDelay={1.2}>
            <MaterialCard />
          </FloatingCard>

          {/* ── Card 3: City — bottom-left ── */}
          <FloatingCard bottom={140} left={20} entryDelay={1.05} floatDelay={0.7}>
            <CityCard />
          </FloatingCard>

          {/* ── Card 4: Area — bottom-center ── */}
          <FloatingCard bottom={30} left="34%" entryDelay={1.15} floatDelay={1.9}>
            <AreaCard />
          </FloatingCard>

          {/* ── Card 5: Timeline — bottom-right ── */}
          <FloatingCard bottom={30} right={20} entryDelay={1.25} floatDelay={1.0}>
            <TimelineCard />
          </FloatingCard>

        </div>
      </div>

      {/* Mobile: image below content */}
      <div className="relative lg:hidden overflow-hidden" style={{ height: "56vw", minHeight: 240 }}>
        <Image
          src="/hero-villa.jpg"
          alt="Contemporary luxury villa"
          fill
          className="object-cover"
          style={{ objectPosition: "30% center" }}
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #FAF8F5 0%, transparent 30%)" }}
        />
      </div>
    </section>
  );
}
