import { formatINRShort } from "@/lib/utils";
import type { Phase } from "@/types";

interface TimelineProps {
  phases: Phase[];
  totalDays: number;
}

const PHASE_COLORS = ["#0E2146", "#C5A059", "#4A5568", "#C8C2B8"];

export function Timeline({ phases, totalDays }: TimelineProps) {
  const totalMonths = Math.ceil(totalDays / 30);

  return (
    <section aria-labelledby="timeline-heading" className="py-8">
      <p className="label-arch mb-2">Build timeline</p>
      <h2 id="timeline-heading" className="font-serif text-headline-md text-text-primary mb-1">
        Phase-wise schedule
      </h2>
      <p className="text-body-sm text-text-secondary mb-6">
        ~{totalMonths} months total ({totalDays} days)
      </p>

      {/* Desktop: horizontal */}
      <div className="hidden md:flex gap-0 relative">
        <div className="absolute top-[7px] left-0 right-0 h-px bg-border" aria-hidden="true" />
        {phases.map((phase, i) => (
          <div key={phase.name} className="flex-1 relative pr-4">
            <div
              className="w-3.5 h-3.5 rounded-full relative z-10 mb-4"
              style={{ background: PHASE_COLORS[i] }}
              aria-hidden="true"
            />
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-tertiary mb-1">
              Phase {i + 1}
            </p>
            <p className="text-xs font-semibold text-text-primary mb-1 leading-snug">{phase.name}</p>
            <p className="font-mono text-xs text-text-secondary mb-1 tabular-nums">{phase.durationDays}d</p>
            <p className="font-mono text-xs font-semibold text-navy tabular-nums">
              {formatINRShort(phase.cost)}
            </p>
            <p className="font-mono text-[9px] text-text-tertiary mt-0.5">{phase.paymentPercent}% tranche</p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex flex-col md:hidden relative">
        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
        {phases.map((phase, i) => (
          <div key={phase.name} className="flex gap-5 pb-7 relative last:pb-0">
            <div
              className="w-3.5 h-3.5 rounded-full shrink-0 relative z-10 mt-0.5"
              style={{ background: PHASE_COLORS[i] }}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-tertiary mb-0.5">
                Phase {i + 1}
              </p>
              <p className="text-sm font-semibold text-text-primary leading-snug">{phase.name}</p>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{phase.description}</p>
              <div className="flex gap-4 mt-2">
                <span className="font-mono text-xs text-text-secondary tabular-nums">{phase.durationDays} days</span>
                <span className="font-mono text-xs font-semibold text-navy tabular-nums">
                  {formatINRShort(phase.cost)}
                </span>
                <span className="font-mono text-xs text-text-tertiary">{phase.paymentPercent}% tranche</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
