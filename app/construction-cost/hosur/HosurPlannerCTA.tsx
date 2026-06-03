"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HOME_TYPES = [
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

interface HosurPlannerCTAProps {
  sourcePage?: string;
  plotL?: number;
  plotW?: number;
}

export function HosurPlannerCTA({ sourcePage = "hosur-hub", plotL, plotW }: HosurPlannerCTAProps = {}) {
  const router = useRouter();

  function buildHref(type: string) {
    const p = new URLSearchParams({ city: "hosur", type, from: sourcePage });
    if (plotL) p.set("length", String(plotL));
    if (plotW) p.set("width", String(plotW));
    return `/plan?${p.toString()}`;
  }

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-primary)",
        padding: "clamp(24px, 4vw, 48px)",
        borderRadius: "2px",
      }}
    >
      <div className="mb-8">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4"
          style={{ color: "var(--accent)" }}
        >
          Free estimate — No sign-up
        </p>
        <h2
          className="font-serif mb-3"
          style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "var(--text-primary)",
          }}
        >
          What type of home are you building in Hosur?
        </h2>
        <p
          className="font-sans"
          style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-secondary)" }}
        >
          Select your home type to get a Hosur-specific cost estimate in under 2 minutes.
          Hosur rates pre-loaded — no city selection needed.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {HOME_TYPES.map((ht) => (
          <button
            key={ht.value}
            onClick={() => router.push(buildHref(ht.value))}
            className="group relative overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              borderRadius: "4px",
              border: "1px solid var(--border)",
              background: "#fff",
              cursor: "pointer",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(13,31,60,0.10)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {ht.recommended && (
              <span
                className="absolute top-2 right-2 z-10 font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5"
                style={{ background: "var(--accent)", color: "#fff", borderRadius: "2px" }}
              >
                Popular
              </span>
            )}
            <div className="relative h-28 overflow-hidden">
              <Image
                src={ht.image}
                alt={ht.label}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: "brightness(0.82) saturate(0.95)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,31,60,0.60) 0%, rgba(13,31,60,0.10) 55%, transparent 100%)",
                }}
              />
            </div>
            <div className="p-3">
              <p
                className="font-serif text-[15px] mb-0.5"
                style={{ color: "var(--text-primary)", lineHeight: 1.2 }}
              >
                {ht.label}
              </p>
              <p className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
                {ht.sqftRange}
              </p>
              <p
                className="font-mono text-[11px] mt-1.5"
                style={{ color: "var(--accent)", fontWeight: 500 }}
              >
                {ht.range}
              </p>
            </div>
          </button>
        ))}
      </div>

      <p className="font-mono mt-5" style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
        Click a type to start · Hosur rates pre-loaded · Takes under 2 minutes
      </p>
    </div>
  );
}
