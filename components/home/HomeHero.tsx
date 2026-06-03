"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

// ── Blueprint architectural overlay ──────────────────────────────────────────
function BlueprintOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 700 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 64} y1={0} x2={i * 64} y2={800}
          stroke="rgba(255,255,255,0.055)" strokeWidth="0.5" strokeDasharray="4 8" />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 64} x2={700} y2={i * 64}
          stroke="rgba(255,255,255,0.055)" strokeWidth="0.5" strokeDasharray="4 8" />
      ))}

      {/* Corner brackets — top left */}
      <path d="M 24 24 L 24 64 M 24 24 L 64 24" stroke="rgba(196,154,60,0.5)" strokeWidth="1.5" fill="none" />
      {/* Corner brackets — bottom right */}
      <path d="M 676 776 L 676 736 M 676 776 L 636 776" stroke="rgba(196,154,60,0.5)" strokeWidth="1.5" fill="none" />

      {/* Floor plan sketch — bottom-left area */}
      <g transform="translate(30, 580)" opacity="0.3" filter="url(#glow)">
        <rect x="0" y="0" width="120" height="80" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <rect x="0" y="0" width="60" height="45" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
        <rect x="60" y="0" width="60" height="45" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
        <rect x="0" y="45" width="80" height="35" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
        <rect x="80" y="45" width="40" height="35" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
        {/* Door arcs */}
        <path d="M 60 45 Q 72 33 72 45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <path d="M 0 45 Q 12 57 12 45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        {/* Dimension lines */}
        <line x1="-8" y1="0" x2="-8" y2="80" stroke="rgba(196,154,60,0.35)" strokeWidth="0.5" />
        <line x1="-11" y1="0" x2="-5" y2="0" stroke="rgba(196,154,60,0.35)" strokeWidth="0.5" />
        <line x1="-11" y1="80" x2="-5" y2="80" stroke="rgba(196,154,60,0.35)" strokeWidth="0.5" />
        <text x="130" y="44" fill="rgba(255,255,255,0.28)" fontSize="7" fontFamily="monospace" letterSpacing="1">
          1,600 SQ.FT
        </text>
      </g>

      {/* Cross-markers */}
      {[[350, 200], [180, 400], [520, 350]].map(([cx, cy], i) => (
        <g key={i} opacity="0.22">
          <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="rgba(255,255,255,0.6)" strokeWidth="0.6" />
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="rgba(255,255,255,0.6)" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="2.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
        </g>
      ))}

      {/* Technical arc — structure indicator */}
      <circle cx="430" cy="160" r="55" fill="none"
        stroke="rgba(196,154,60,0.18)" strokeWidth="0.8" strokeDasharray="6 10" />
      <circle cx="430" cy="160" r="32" fill="none"
        stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    </svg>
  );
}

// ── Floating Cards ────────────────────────────────────────────────────────────
function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`
      absolute bg-white/95 backdrop-blur-md border border-white/70
      shadow-[0_8px_32px_rgba(13,31,60,0.18),0_2px_8px_rgba(13,31,60,0.1)]
      rounded-xl overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  );
}

function CostCard() {
  const breakdown = [
    { label: "Structure",       amount: "₹33,80,000" },
    { label: "Finishes",        amount: "₹19,60,000" },
    { label: "MEP Services",    amount: "₹8,20,000"  },
    { label: "External Works",  amount: "₹6,00,000"  },
    { label: "Contingency (5%)", amount: "₹3,32,000" },
    { label: "Taxes & Others",  amount: "₹7,00,000"  },
  ];
  return (
    <CardShell className="top-5 right-4 w-[216px]">
      <div className="px-3.5 pt-3 pb-1">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-tertiary mb-1">
          Total Estimated Cost
        </p>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="font-serif text-navy text-[22px] leading-none tracking-tight">₹76,42,000</span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded font-mono font-medium">
            LIVE
          </span>
        </div>
        <div className="space-y-1 border-t border-border pt-2">
          {breakdown.map((b) => (
            <div key={b.label} className="flex justify-between items-baseline">
              <span className="font-mono text-[9.5px] text-text-tertiary">{b.label}</span>
              <span className="font-mono text-[9.5px] text-text-secondary tabular-nums">{b.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-navy/5 border-t border-border px-3.5 py-2 flex justify-between items-center">
        <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-wider">Cost per sq.ft</span>
        <span className="font-mono text-[11px] font-semibold text-navy tabular-nums">₹2,650 / sq.ft</span>
      </div>
    </CardShell>
  );
}

function MaterialCard() {
  const items = [
    { icon: "⬡", label: "Cement",  qty: "500 Bags"    },
    { icon: "⬗", label: "Steel",   qty: "8.25 Tonnes"  },
    { icon: "▪", label: "Bricks",  qty: "14,200 Nos"  },
    { icon: "◈", label: "M-Sand",  qty: "42.5 Cum"    },
  ];
  return (
    <CardShell className="top-[42%] right-3 w-[164px]">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-tertiary">
            Material Quantities
          </p>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold text-[8px]">{item.icon}</span>
                </div>
                <span className="font-mono text-[9.5px] text-text-secondary">{item.label}</span>
              </div>
              <span className="font-mono text-[9px] text-text-tertiary tabular-nums">{item.qty}</span>
            </div>
          ))}
        </div>
        <button className="mt-2.5 w-full text-center font-mono text-[8.5px] uppercase tracking-wider text-gold/80 hover:text-gold border-t border-border pt-2 transition-colors">
          View full BOQ →
        </button>
      </div>
    </CardShell>
  );
}

function CityCard() {
  return (
    <CardShell className="bottom-[120px] left-4 w-[192px]">
      <div className="p-3.5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <span className="font-mono text-[10px] font-semibold text-navy uppercase tracking-wider">Hosur</span>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-text-tertiary mb-1">
          Construction Cost Range
        </p>
        <p className="font-serif text-navy text-[18px] leading-none tracking-tight mb-1.5">
          ₹2,450 – ₹2,850<span className="text-[11px] text-text-tertiary">/sq.ft</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded font-mono">
            ↑ 3.6% vs last quarter
          </span>
        </div>
        <button className="mt-2.5 font-mono text-[9px] uppercase tracking-wider text-gold hover:text-gold-muted transition-colors">
          View city trends →
        </button>
      </div>
    </CardShell>
  );
}

function AreaCard() {
  return (
    <CardShell className="bottom-5 left-[30%] w-[144px]">
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C49A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-tertiary">Built-up Area</p>
        </div>
        <p className="font-serif text-navy text-[26px] leading-none tracking-tight mb-0.5">
          1,600
          <span className="text-[12px] text-text-tertiary font-sans font-normal"> sq.ft</span>
        </p>
        <p className="font-mono text-[10px] text-text-secondary">3 BHK Villa</p>
      </div>
    </CardShell>
  );
}

function TimelineCard() {
  const phases = [
    { label: "Planning",   dur: "15 Days",    w: 12 },
    { label: "Structure",  dur: "2.5 Months", w: 40 },
    { label: "Finishing",  dur: "3 Months",   w: 48 },
    { label: "Handover",   dur: "15 Days",    w: 12 },
  ];
  return (
    <CardShell className="bottom-5 right-4 w-[210px]">
      <div className="p-3.5">
        <div className="flex justify-between items-start mb-2.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-tertiary">Project Timeline</p>
          <span className="font-mono text-[9px] text-navy font-semibold">7.5 Months</span>
        </div>
        {/* Visual timeline track */}
        <div className="flex gap-0.5 mb-3 h-2 rounded-full overflow-hidden">
          {phases.map((p, i) => (
            <div
              key={p.label}
              className="h-full rounded-sm"
              style={{
                flex: p.w,
                background: i === 0 ? "#C49A3C" : i === 1 ? "#0D1F3C" : i === 2 ? "#1E3A5F" : "#7B93A8",
              }}
            />
          ))}
        </div>
        <div className="space-y-1.5">
          {phases.map((p, i) => (
            <div key={p.label} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: i === 0 ? "#C49A3C" : i === 1 ? "#0D1F3C" : i === 2 ? "#1E3A5F" : "#7B93A8" }}
                />
                <span className="font-mono text-[9.5px] text-text-secondary">{p.label}</span>
              </div>
              <span className="font-mono text-[9px] text-text-tertiary tabular-nums">{p.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

// ── Trust indicators ──────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    label: "Verified Rates",
    sub: "Built from real BOQs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Transparent",
    sub: "No hidden assumptions",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: "City Specific",
    sub: "12+ cities covered",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "BOQ Verified",
    sub: "Cross-checked with experts",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FAF8F5", minHeight: "calc(100dvh - 60px)" }}
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] min-h-[760px]"
        style={{ minHeight: "calc(100dvh - 60px)" }}>

        {/* ── LEFT: content ─────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-6 py-20 lg:py-0 lg:pl-8 lg:pr-12 xl:pl-10 xl:pr-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-7 bg-gold/50 flex-shrink-0" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-text-secondary">
              Free for Indian Homeowners&nbsp;&nbsp;·&nbsp;&nbsp;2026 Verified Rates
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease }}
            className="font-serif text-navy mb-7"
            style={{
              fontSize: "clamp(42px, 5.8vw, 70px)",
              lineHeight: 1.02,
              letterSpacing: "-0.032em",
              fontWeight: 400,
            }}
          >
            Plan your home<br />
            with numbers that<br />
            actually{" "}
            <em className="not-italic" style={{ color: "#C79B4B" }}>hold up.</em>
          </motion.h1>

          {/* Gold separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{ width: 40, height: 1, background: "#C79B4B", marginBottom: 24, transformOrigin: "left" }}
          />

          {/* Sub paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="text-text-secondary mb-10 leading-relaxed"
            style={{ fontSize: "17px", maxWidth: "46ch", lineHeight: 1.75 }}
          >
            A construction cost projection built from real Hosur and Bengaluru BOQs.
            Updated quarterly. Seven steps. No contractor pitch.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Link href="/plan">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 gap-2">
                Begin your projection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 pt-9 border-t border-border"
          >
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.64 + i * 0.08 }}
                className="flex flex-col gap-1.5"
              >
                <div className="text-gold/70">{item.icon}</div>
                <p className="font-serif text-navy text-[14px] leading-tight" style={{ fontWeight: 400, letterSpacing: "-0.008em" }}>
                  {item.label}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-tertiary leading-snug">
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: visual composition ──────────────────────────── */}
        <div className="relative hidden lg:block overflow-hidden">

          {/* Villa image */}
          <Image
            src="/hero-villa.jpg"
            alt="Contemporary luxury villa — the kind of home Estimato helps you plan and budget accurately"
            fill
            priority
            className="object-cover object-center"
            sizes="55vw"
          />

          {/* Overlay — slight warm vignette left + bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(250,248,245,0.38) 0%, transparent 30%), linear-gradient(to top, rgba(13,31,60,0.35) 0%, transparent 55%)",
            }}
          />

          {/* Blueprint overlay */}
          <BlueprintOverlay />

          {/* ── Floating card 1: Cost breakdown ── */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease }}>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, delay: 0, repeat: Infinity, ease: "easeInOut" }}>
              <CostCard />
            </motion.div>
          </motion.div>

          {/* ── Floating card 2: Materials ── */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.75, ease }}>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}>
              <MaterialCard />
            </motion.div>
          </motion.div>

          {/* ── Floating card 3: City rates ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.75, ease }}>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}>
              <CityCard />
            </motion.div>
          </motion.div>

          {/* ── Floating card 4: Built-up area ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7, ease }}>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <AreaCard />
            </motion.div>
          </motion.div>

          {/* ── Floating card 5: Timeline ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7, ease }}>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}>
              <TimelineCard />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
