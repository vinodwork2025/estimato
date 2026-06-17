"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { EstimateLogo } from "@/components/shared/EstimateLogo";

const NAV_LINKS = [
  { href: "/construction-cost", label: "Construction costs" },
  { href: "/about", label: "About" },
  { href: "/for-architects", label: "For architects" },
];

const TOOLS_ITEMS = [
  { href: "/interior-cost-calculator", label: "Interior cost calculator", desc: "Kitchen to curtains — full scope estimate" },
  { href: "/building-material-prices", label: "Material price tracker",   desc: "Cement, steel, sand — verified monthly rates" },
];

function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = TOOLS_ITEMS.some(t => pathname.startsWith(t.href));

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(v => !v)}
        className="relative inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-[-0.01em] py-1 group"
        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
      >
        <span className={`transition-colors duration-200 ${isActive ? "text-navy" : "text-text-secondary group-hover:text-navy"}`}>
          Free tools
        </span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: isActive ? "#0E2146" : undefined }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Active underline */}
        <span
          className="absolute -bottom-0.5 left-0 h-px bg-navy transition-all duration-300 ease-out"
          style={{ width: isActive ? "100%" : "0%" }}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", top: "calc(100% + 12px)", right: 0,
              minWidth: 260, background: "rgba(250,248,245,0.99)",
              border: "1px solid rgba(226,221,212,0.9)",
              borderRadius: 4, boxShadow: "0 8px 32px rgba(14,33,70,0.12)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              overflow: "hidden", zIndex: 100,
            }}
          >
            {/* Gold top bar */}
            <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #C49A3C 30%, #C49A3C 70%, transparent)" }} />

            <div style={{ padding: "6px 0" }}>
              {TOOLS_ITEMS.map(item => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block", padding: "11px 18px",
                      background: active ? "rgba(196,154,60,0.06)" : "transparent",
                      textDecoration: "none", transition: "background 120ms",
                      borderLeft: active ? "2px solid #C49A3C" : "2px solid transparent",
                    }}
                    className="group/item hover:bg-[rgba(14,33,70,0.03)]"
                  >
                    <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: active ? "#0E2146" : "var(--text-primary)", marginBottom: 2 }}>
                      {item.label}
                    </p>
                    <p className="font-sans" style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MagneticCTA({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "ghost" | "secondary";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="flex-shrink-0">
      <motion.div style={{ x: sx, y: sy }}>
        <Link href={href}>
          <Button variant={variant} size="md">{label}</Button>
        </Link>
      </motion.div>
    </div>
  );
}

interface SiteHeaderProps {
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: "primary" | "ghost" | "secondary";
  maxWidth?: string;
  showNav?: boolean;
}

export function SiteHeader({
  ctaLabel = "Get my estimate →",
  ctaHref = "/plan",
  ctaVariant = "primary",
  maxWidth = "max-w-6xl",
  showNav = true,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-400 ${
        scrolled
          ? "shadow-[0_1px_0_rgba(226,221,212,1),0_8px_36px_rgba(14,33,70,0.10)]"
          : "shadow-[0_1px_0_rgba(226,221,212,0.8),0_4px_20px_rgba(14,33,70,0.06)]"
      }`}
      style={{
        background: scrolled ? "rgba(250,248,245,0.99)" : "rgba(250,248,245,0.96)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
      }}
      animate={{ height: scrolled ? 72 : 92 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gold gradient top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.6) 25%, rgba(197,160,89,0.6) 75%, transparent 100%)",
        }}
      />

      <div className={`${maxWidth} mx-auto px-6 h-full flex items-center justify-between`}>

        {/* Left — logo */}
        <motion.div
          animate={{ scale: scrolled ? 0.88 : 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left center" }}
        >
          <Link href="/" aria-label="Estimato home">
            <EstimateLogo size="md" variant="dark" />
          </Link>
        </motion.div>

        {/* Right — nav links + CTA */}
        <nav className="flex items-center gap-7" aria-label="Main navigation">

          {showNav && NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="relative hidden md:inline-flex items-center text-[13.5px] font-medium tracking-[-0.01em] py-1 group"
                style={{ color: active ? "#0E2146" : undefined }}
              >
                <span className={`transition-colors duration-200 ${active ? "text-navy" : "text-text-secondary group-hover:text-navy"}`}>
                  {label}
                </span>
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-navy transition-all duration-300 ease-out"
                  style={{ width: active ? "100%" : "0%" }}
                  aria-hidden="true"
                />
                {!active && (
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-navy w-0 group-hover:w-full transition-all duration-300 ease-out"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}

          {showNav && <ToolsDropdown />}

          <MagneticCTA href={ctaHref} label={ctaLabel} variant={ctaVariant} />
        </nav>
      </div>
    </motion.header>
  );
}
