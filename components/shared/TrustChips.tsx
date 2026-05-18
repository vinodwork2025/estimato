interface TrustChipsProps {
  chips?: string[];
}

const DEFAULT_CHIPS = [
  "Based on 2026 market rates",
  "Updated weekly",
  "Estimato verified",
];

export function TrustChips({ chips = DEFAULT_CHIPS }: TrustChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-sm text-text-secondary bg-white border border-border rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" aria-hidden="true" />
          {chip}
        </span>
      ))}
    </div>
  );
}
