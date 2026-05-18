import type { Warning } from "@/types";

const CATEGORY_CODES: Record<Warning["category"], string> = {
  approvals: "APR",
  interiors: "INT",
  materials: "MAT",
  labour: "LAB",
  overruns: "OVR",
};

const CATEGORY_COLORS: Record<Warning["category"], string> = {
  approvals: "#8492A6",
  interiors: "#C5A059",
  materials: "#C8633A",
  labour: "#4A5568",
  overruns: "#B8741F",
};

interface HiddenCostsProps {
  warnings: Warning[];
}

export function HiddenCosts({ warnings }: HiddenCostsProps) {
  return (
    <section aria-labelledby="hidden-costs-heading" className="py-8">
      <p className="label-arch mb-2">Often overlooked</p>
      <h2 id="hidden-costs-heading" className="font-serif text-headline-md text-text-primary mb-1">
        Costs people forget
      </h2>
      <p className="text-body-sm text-text-secondary mb-6">
        Real costs most estimates leave out. Flagged upfront.
      </p>

      <div className="flex flex-col divide-y divide-border">
        {warnings.map((w, i) => {
          const color = CATEGORY_COLORS[w.category];
          const code = CATEGORY_CODES[w.category];
          return (
            <div key={i} className="flex gap-4 py-5 first:pt-0 last:pb-0">
              {/* Left accent bar */}
              <div
                className="w-[3px] rounded-full shrink-0 self-stretch"
                style={{ background: color }}
                aria-hidden="true"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                    style={{ color, background: `${color}12` }}
                  >
                    {code}
                  </span>
                  <p className="font-semibold text-text-primary text-sm">{w.title}</p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-2">{w.message}</p>
                <p className="font-mono text-xs font-semibold text-warning">{w.estimatedImpact}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
