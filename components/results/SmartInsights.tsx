import type { Insight } from "@/types";

const TYPE_VISUAL: Record<Insight["type"], { bar: string; label: string; labelColor: string }> = {
  opportunity: { bar: "#2D7D5A", label: "Opportunity",   labelColor: "#2D7D5A" },
  warning:     { bar: "#B8741F", label: "Watch out",     labelColor: "#B8741F" },
  note:        { bar: "#4A5568", label: "Good to know",  labelColor: "#4A5568" },
};

interface SmartInsightsProps {
  insights: Insight[];
  contingency: number;
}

export function SmartInsights({ insights, contingency }: SmartInsightsProps) {
  return (
    <section aria-labelledby="insights-heading" className="py-8">
      <p className="label-arch mb-2">AI insights</p>
      <h2 id="insights-heading" className="font-serif text-headline-md text-text-primary mb-1">
        Smart observations
      </h2>
      <p className="text-body-sm text-text-secondary mb-6">
        Based on your specific inputs.
      </p>

      <div className="flex flex-col divide-y divide-border mb-6">
        {insights.map((insight, i) => {
          const v = TYPE_VISUAL[insight.type];
          return (
            <div key={i} className="flex gap-4 py-5 first:pt-0">
              {/* Left accent bar */}
              <div
                className="w-[3px] rounded-full shrink-0 self-stretch"
                style={{ background: v.bar }}
                aria-hidden="true"
              />

              <div className="flex-1 min-w-0">
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1.5"
                  style={{ color: v.labelColor }}
                >
                  {v.label}
                </p>
                <p className="font-semibold text-text-primary text-sm mb-1">{insight.title}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{insight.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contingency callout — dark navy */}
      <div className="bg-navy rounded-2xl px-5 py-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-16 bg-gold/10 blur-2xl rounded-full pointer-events-none" />
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 mb-2">
          Recommendation
        </p>
        <p className="text-sm font-semibold text-white mb-1">Keep 8% aside as contingency</p>
        <p className="text-sm text-white/55 leading-relaxed">
          Set aside{" "}
          <span className="font-mono font-semibold text-gold tabular-nums">
            ₹{contingency.toLocaleString("en-IN")}
          </span>{" "}
          as a buffer. Construction always has surprises.
        </p>
      </div>
    </section>
  );
}
