"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;
const MONO  = "'SF Mono', 'Fira Mono', 'Consolas', monospace";
const SERIF = "var(--font-serif, Georgia, 'Times New Roman', serif)";

// White text palette for glass cards
const W1 = "rgba(255,255,255,0.95)"; // primary — big numbers
const W2 = "rgba(255,255,255,0.72)"; // secondary — names / values
const W3 = "rgba(255,255,255,0.42)"; // tertiary — tiny labels
const WD = "rgba(255,255,255,0.10)"; // dividers
const WB = "rgba(255,255,255,0.05)"; // subtle footer bg
const WT = "rgba(255,255,255,0.13)"; // progress track

// ── Count-up ──────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, delay = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

// Indian rupee format: 7642000 → ₹76,42,000
function fmtINR(n: number): string {
  if (n === 0) return "₹0";
  const s = Math.round(n).toString();
  if (s.length <= 3) return `₹${s}`;
  const last3 = s.slice(-3);
  const grouped = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${grouped},${last3}`;
}

// ── True glassmorphism card shell ─────────────────────────────────────────────
function G({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.10)",
      backdropFilter: "blur(36px)",
      WebkitBackdropFilter: "blur(36px)",
      border: "1px solid rgba(255,255,255,0.20)",
      borderRadius: 20,
      boxShadow:
        "0 28px 72px rgba(0,0,0,0.32), 0 4px 16px rgba(0,0,0,0.16), inset 0 1.5px 0 rgba(255,255,255,0.28)",
      overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Floating card wrapper ─────────────────────────────────────────────────────
function F({
  children, style, fd = 0, ed = 0.8,
  ef = { opacity: 0, y: 20 },
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  fd?: number;
  ed?: number;
  ef?: { opacity?: number; x?: number; y?: number };
}) {
  return (
    <motion.div className="absolute z-20" style={style}
      initial={ef} animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: ed, duration: 0.9, ease }}>
      <motion.div animate={{ y: [0, -9, 0] }}
        transition={{ duration: 6, delay: fd, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// ── Card 1: Total Estimated Cost ──────────────────────────────────────────────
const ROWS = [
  { label: "Structure",        raw: 3_380_000, color: "#6B9FD4" },
  { label: "Finishes",         raw: 1_960_000, color: "#88C0EE" },
  { label: "MEP Services",     raw:   820_000, color: "#C79B4B" },
  { label: "External Works",   raw:   600_000, color: "#8FD3C0" },
  { label: "Contingency",      raw:   332_000, color: "rgba(255,255,255,0.48)" },
  { label: "Taxes & Others",   raw:   550_000, color: "rgba(255,255,255,0.28)" },
];
const TOTAL = ROWS.reduce((s, r) => s + r.raw, 0);

function CostCard() {
  const animated = useCountUp(TOTAL, 1900, 900);
  return (
    <G style={{ width: 276 }}>
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.2em", color: W3, marginBottom: 7 }}>
              Total Estimated Cost
            </p>
            <p style={{ fontFamily: SERIF, fontSize: 29, color: W1, lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
              {fmtINR(animated)}
            </p>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 9px", borderRadius: 20, background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.30)", flexShrink: 0, marginTop: 2 }}>
            BOQ ✓
          </span>
        </div>

        {/* Proportional stacked bar */}
        <div style={{ display: "flex", height: 5, borderRadius: 99, overflow: "hidden", gap: 1.5, marginBottom: 14 }}>
          {ROWS.map((r, i) => (
            <motion.div key={r.label}
              style={{ flex: r.raw / TOTAL, background: r.color }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.05 + i * 0.07, duration: 0.35 }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7.5 }}>
          {ROWS.map((r) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                <span style={{ fontFamily: MONO, fontSize: 12, color: W3 }}>{r.label}</span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 12, color: W2, fontVariantNumeric: "tabular-nums" }}>
                {fmtINR(r.raw)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", marginTop: 14, borderTop: `1px solid ${WD}`, background: WB }}>
        <span style={{ fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.1em", color: W3 }}>Est. per sq.ft</span>
        <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: W1, fontVariantNumeric: "tabular-nums" }}>₹2,650</span>
      </div>
    </G>
  );
}

// ── Card 2: City Benchmark ────────────────────────────────────────────────────
const CITIES = [
  { name: "Hosur",     min: 2450, max: 2850, color: "#C79B4B" },
  { name: "Bengaluru", min: 3200, max: 3800, color: "#6B9FD4" },
];
const CITY_SCALE = 4200;

function CityCard() {
  return (
    <G style={{ width: 252 }}>
      <div style={{ padding: "18px 18px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <p style={{ fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.2em", color: W3 }}>
            City Benchmark
          </p>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "#4ade80", padding: "3px 8px", borderRadius: 20, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)" }}>
            Q2 2026
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {CITIES.map((c, i) => (
            <div key={c.name}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
                <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: W1 }}>{c.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: W2, fontVariantNumeric: "tabular-nums" }}>
                  ₹{c.min.toLocaleString()}–{c.max.toLocaleString()}
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: WT, position: "relative" }}>
                <motion.div
                  style={{ position: "absolute", top: 0, bottom: 0, left: `${(c.min / CITY_SCALE) * 100}%`, borderRadius: 99, background: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((c.max - c.min) / CITY_SCALE) * 100}%` }}
                  transition={{ delay: 1.2 + i * 0.18, duration: 0.85, ease }}
                />
              </div>
            </div>
          ))}
        </div>
        <button style={{ marginTop: 14, paddingTop: 13, borderTop: `1px solid ${WD}`, width: "100%", fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.13em", color: "#C79B4B", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
          View all 12 cities →
        </button>
      </div>
    </G>
  );
}

// ── Card 3: Built-up Area ─────────────────────────────────────────────────────
function AreaCard() {
  const animated = useCountUp(1600, 1200, 1100);
  return (
    <G style={{ width: 186 }}>
      <div style={{ padding: "18px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C79B4B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" />
          </svg>
          <p style={{ fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.14em", color: W3 }}>Built-up Area</p>
        </div>
        <p style={{ fontFamily: SERIF, fontSize: 42, color: W1, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>
          {animated.toLocaleString()}
        </p>
        <p style={{ fontFamily: MONO, fontSize: 13, color: W3, marginBottom: 16 }}>sq.ft</p>
        <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "5px 13px", borderRadius: 20, background: WT, color: W2, border: `1px solid ${WD}` }}>
          3 BHK Villa
        </span>
      </div>
    </G>
  );
}

// ── Card 4: Project Timeline ──────────────────────────────────────────────────
const PHASES = [
  { label: "Planning",  dur: "15 Days",   color: "#C79B4B",              w: 10 },
  { label: "Structure", dur: "2.5 Mo.",   color: "#6B9FD4",              w: 34 },
  { label: "Finishing", dur: "3 Mo.",     color: "#88C0EE",              w: 43 },
  { label: "Handover",  dur: "15 Days",   color: "rgba(255,255,255,0.35)", w: 10 },
];
const PH_TOT = PHASES.reduce((s, p) => s + p.w, 0);

function TimelineCard() {
  return (
    <G style={{ width: 276 }}>
      <div style={{ padding: "18px 18px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <p style={{ fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.2em", color: W3 }}>
            Project Timeline
          </p>
          <span style={{ fontFamily: SERIF, fontSize: 17, color: W1, fontWeight: 400 }}>7.5 Months</span>
        </div>

        <div style={{ display: "flex", borderRadius: 99, overflow: "hidden", height: 11, gap: 2, marginBottom: 16 }}>
          {PHASES.map((p, i) => (
            <motion.div key={p.label}
              style={{ flex: p.w / PH_TOT, background: p.color, transformOrigin: "left" }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 1.35 + i * 0.20, duration: 0.55, ease }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PHASES.map((p) => (
            <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                <span style={{ fontFamily: MONO, fontSize: 13, color: W2 }}>{p.label}</span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 13, color: W3, fontVariantNumeric: "tabular-nums" }}>{p.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </G>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* ── Full-bleed image ── */}
      <motion.div className="absolute inset-0"
        initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}>
        <Image
          src="/hero-villa.jpg"
          alt="Premium luxury villa — Estimato construction cost intelligence"
          fill priority className="object-cover"
          style={{ objectPosition: "65% center" }}
          sizes="100vw"
        />
      </motion.div>

      {/* ── Gradient layers ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(7,16,40,0.97) 0%, rgba(7,16,40,0.94) 16%, rgba(7,16,40,0.82) 33%, rgba(7,16,40,0.42) 54%, rgba(7,16,40,0.12) 72%, transparent 100%)",
      }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
        height: 260, background: "linear-gradient(to top, rgba(7,16,40,0.55) 0%, transparent 100%)",
      }} />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pointer-events-none" style={{
        height: 130, background: "linear-gradient(to bottom, rgba(7,16,40,0.32) 0%, transparent 100%)",
      }} />
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 58% 52% at 74% 44%, rgba(199,155,75,0.075) 0%, transparent 70%)" }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Dot grid — left zone ── */}
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{ top: 0, bottom: 0, left: 0, width: "50%", zIndex: 2 }}>
        <svg width="100%" height="100%" style={{ opacity: 0.045 }}>
          <defs>
            <pattern id="hgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hgrid)" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative flex flex-col lg:flex-row mx-auto" style={{ zIndex: 10, maxWidth: 1440, minHeight: "90vh" }}>

        {/* ══ LEFT: text ══ */}
        <div className="flex flex-col justify-center w-full lg:w-[44%]"
          style={{ padding: "clamp(48px,8vw,80px) clamp(20px,5vw,52px) clamp(32px,5vw,80px) clamp(20px,5vw,64px)" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
            <span className="animate-pulse" style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#22C55E", boxShadow: "0 0 12px rgba(34,197,94,0.75)", flexShrink: 0,
            }} />
            <span style={{ fontFamily: MONO, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(199,155,75,0.82)" }}>
              Free for Indian Homeowners&nbsp;·&nbsp;2026 Live Rates
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 id="hero-heading"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease }}
            style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4.4vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.026em", fontWeight: 400, color: "#FFFFFF", marginBottom: 28 }}>
            Plan your home with numbers
            <br />
            that actually{" "}
            <motion.em className="not-italic" style={{ color: "#C79B4B" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.58, duration: 0.8 }}>
              hold up.
            </motion.em>
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.34, ease }}
            style={{ width: 46, height: 1.5, background: "#C79B4B", marginBottom: 28, transformOrigin: "left", opacity: 0.9 }}
          />

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.40, ease }}
            style={{ fontSize: 19, lineHeight: 1.84, color: "rgba(255,255,255,0.62)", maxWidth: "38ch", marginBottom: 44 }}>
            A construction cost projection built from real Hosur and Bengaluru BOQs.
            Updated quarterly. Five steps. No contractor pitch.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.50, ease }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 58 }}>
            <Link href="/plan"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#C79B4B", color: "#0A1432",
                padding: "16px 34px", borderRadius: 12, fontWeight: 700, fontSize: 17,
                letterSpacing: "0.01em", textDecoration: "none",
                boxShadow: "0 6px 30px rgba(199,155,75,0.52)",
                transition: "transform 0.16s ease, box-shadow 0.16s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(199,155,75,0.65)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 30px rgba(199,155,75,0.52)";
              }}>
              Begin your estimation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/methodology"
              style={{
                display: "inline-flex", alignItems: "center",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.82)",
                padding: "16px 28px", borderRadius: 12, fontWeight: 500, fontSize: 17,
                textDecoration: "none",
                transition: "background 0.16s ease, border-color 0.16s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.30)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              }}>
              Read the methodology
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: "12px 18px", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            {[
              { label: "Verified Rates", stat: "2,400+" },
              { label: "Transparent",    stat: "5 Steps" },
              { label: "City Specific",  stat: "12 Cities" },
              { label: "BOQ Verified",   stat: "Q2 2026" },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.68 + i * 0.08 }}>
                <p style={{ fontFamily: SERIF, fontSize: 20, color: "rgba(255,255,255,0.94)", fontWeight: 400, lineHeight: 1.1, marginBottom: 5 }}>
                  {item.stat}
                </p>
                <p style={{ fontFamily: MONO, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.11em", color: "rgba(255,255,255,0.36)", lineHeight: 1.5 }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══ RIGHT: card zone ══ */}
        <div className="relative flex-1 hidden lg:block">

          {/* Cost: top right */}
          <F style={{ top: 52, right: 28 }} ed={0.70} ef={{ opacity: 0, y: -22 }} fd={0}>
            <CostCard />
          </F>

          {/* City: mid-left of card zone */}
          <F style={{ top: 320, left: 24 }} ed={0.88} fd={0.65}>
            <CityCard />
          </F>

          {/* Area: bottom left of card zone */}
          <F style={{ bottom: 48, left: 24 }} ed={1.04} fd={1.85}>
            <AreaCard />
          </F>

          {/* Timeline: bottom right */}
          <F style={{ bottom: 48, right: 28 }} ed={1.18} fd={1.05}>
            <TimelineCard />
          </F>

        </div>
      </div>

      {/* ── Mobile: card strip ── */}
      <div className="lg:hidden relative z-10 px-5 pt-4 pb-10 flex gap-3 overflow-x-auto hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        <div className="flex-shrink-0"><CostCard /></div>
        <div className="flex-shrink-0"><CityCard /></div>
        <div className="flex-shrink-0"><AreaCard /></div>
      </div>
    </section>
  );
}
