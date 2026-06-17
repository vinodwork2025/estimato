import type { MaterialWithChange } from "@/lib/materials/types";
import { formatMonthYear } from "@/lib/materials/schema";

function fmtRange(min: number, max: number): string {
  const fmt = (n: number) =>
    n % 1 === 0 ? n.toLocaleString("en-IN") : n.toFixed(1);
  return `₹${fmt(min)}–₹${fmt(max)}`;
}

function ChangeCell({ direction, pct }: { direction: MaterialWithChange["direction"]; pct: number | null }) {
  if (direction === null || pct === null) {
    return <span style={{ color: "var(--text-tertiary)" }}>&#8212;</span>;
  }
  const abs = Math.abs(pct).toFixed(1);
  if (direction === "flat") {
    return <span style={{ color: "var(--text-tertiary)" }}>&#8212; {abs}%</span>;
  }
  const up = direction === "up";
  return (
    <span style={{ color: up ? "#B84A0A" : "#2E7D4F", display: "inline-flex", alignItems: "center", gap: 3 }}>
      {up ? "▲" : "▼"} {abs}%
    </span>
  );
}

interface PriceTableProps {
  materials: MaterialWithChange[];
}

export function PriceTable({ materials }: PriceTableProps) {
  if (materials.length === 0) {
    return (
      <p className="font-sans" style={{ fontSize: 14, color: "var(--text-tertiary)" }}>
        No price data available yet.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto", borderRadius: 2, border: "1px solid var(--border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 540 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(14,33,70,0.025)" }}>
            {["Material", "Unit", "Current range", "vs last month", "Recorded"].map((h) => (
              <th
                key={h}
                className="font-mono"
                style={{
                  padding: "10px 16px", textAlign: "left", fontSize: 10,
                  textTransform: "uppercase", letterSpacing: "0.16em",
                  color: "var(--text-tertiary)", fontWeight: 500, whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {materials.map((m, i) => (
            <tr
              key={m.material}
              style={{
                borderBottom: i < materials.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 1 ? "rgba(14,33,70,0.015)" : "#fff",
              }}
            >
              <td style={{ padding: "14px 16px" }}>
                <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 1 }}>
                  {m.material}
                </p>
                <p className="font-mono" style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Ex-dealer &middot; excl. GST &amp; transport
                </p>
              </td>
              <td className="font-mono" style={{ padding: "14px 16px", fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                {m.unit}
              </td>
              <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                <span className="font-mono" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                  {fmtRange(m.price_min, m.price_max)}
                </span>
              </td>
              <td className="font-mono" style={{ padding: "14px 16px", fontSize: 12, whiteSpace: "nowrap" }}>
                <ChangeCell direction={m.direction} pct={m.change_pct} />
              </td>
              <td className="font-mono" style={{ padding: "14px 16px", fontSize: 11, color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                {formatMonthYear(m.recorded_on)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
