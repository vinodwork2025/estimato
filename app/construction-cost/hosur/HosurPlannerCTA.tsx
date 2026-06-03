"use client";

import Link from "next/link";

/**
 * Calculator CTA for the Hosur city hub.
 *
 * PATCH NEEDED (Phase 1 → Phase 2):
 * PlannerWizard does not yet accept `defaultCity`, `prefilledInput`,
 * `sourcePage`, `ctaVariant`, or `partnerId` props. It maintains all
 * wizard state locally. Add an optional `defaultCity?: string` prop to
 * PlannerWizard (or read a `?city=` URL query param on mount) so city
 * hub pages can skip Step 2 and land users on Step 3 directly.
 *
 * Until that patch lands, this component links to /plan with sourcePage
 * context in the URL so analytics can track city-hub referrals.
 */
export function HosurPlannerCTA() {
  return (
    <div
      className="rounded-sm border"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-primary)",
        padding: "clamp(24px, 4vw, 48px)",
      }}
    >
      <div className="max-w-2xl">
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
          Estimate your Hosur project
        </h2>
        <p
          className="font-sans mb-6"
          style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-secondary)" }}
        >
          Answer five questions about your home type, plot size, and finish
          level. Get a cost range, material quantities, BOQ summary, and a
          payment timeline — built from real Hosur contractor rates.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            "Construction cost range",
            "Cost per sq ft",
            "BOQ summary",
            "Payment timeline",
            "Budget guidance",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 font-mono text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5L3.2 5.8L8 1"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>

        <Link
          href="/plan?from=hosur-city-hub"
          className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] focus:outline-none transition-opacity duration-150 hover:opacity-85"
          style={{
            background: "var(--text-primary)",
            color: "#ffffff",
            borderRadius: "2px",
          }}
        >
          Begin your Hosur estimate
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M1 5h12M9 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <p
          className="font-mono mt-4"
          style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
        >
          Takes under 2 minutes · Hosur rates pre-loaded
        </p>
      </div>
    </div>
  );
}
