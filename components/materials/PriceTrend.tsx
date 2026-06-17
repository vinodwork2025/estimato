"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import type { MaterialTrend } from "@/lib/materials/types";

const PALETTE = ["#C49A3C", "#0D1F3C"];

interface ChartRow {
  month: string;
  [key: string]: string | number;
}

interface PriceTrendProps {
  trends: MaterialTrend[];
}

export function PriceTrend({ trends }: PriceTrendProps) {
  const populated = trends.filter((t) => t.points.length > 0);
  if (populated.length === 0) return null;

  // Build month-keyed rows preserving chronological order
  const monthOrder: string[] = [];
  const seen = new Set<string>();
  for (const t of populated) {
    for (const p of t.points) {
      if (!seen.has(p.month)) { seen.add(p.month); monthOrder.push(p.month); }
    }
  }

  const rowMap = new Map<string, ChartRow>(monthOrder.map((m) => [m, { month: m }]));
  for (const t of populated) {
    for (const p of t.points) {
      rowMap.get(p.month)![t.material] = p.midpoint;
    }
  }

  const chartData = monthOrder.map((m) => rowMap.get(m)!);

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(14,33,70,0.07)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fontFamily: "monospace", fill: "#566776" }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: "monospace", fill: "#566776" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `₹${v}`}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `₹${Number(value).toLocaleString("en-IN")} (midpoint)`,
              name,
            ]}
            contentStyle={{
              fontFamily: "monospace", fontSize: 12,
              border: "1px solid #e2d8d4", borderRadius: 2,
              background: "#fff",
            }}
            labelStyle={{ color: "var(--text-primary)", marginBottom: 4 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, fontFamily: "monospace", paddingTop: 12 }} />
          {populated.map((t, i) => (
            <Line
              key={t.material}
              type="monotone"
              dataKey={t.material}
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={2}
              dot={{ fill: PALETTE[i % PALETTE.length], r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
