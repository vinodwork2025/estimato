import { createServerClient } from "@/lib/supabase/server";
import type { MaterialPrice, MaterialWithChange, MaterialTrend, TrendPoint } from "./types";

export async function getCurrentPrices(city: string): Promise<MaterialWithChange[]> {
  const sb = createServerClient();

  const { data, error } = await sb
    .from("material_prices")
    .select("*")
    .eq("city", city)
    .order("material", { ascending: true })
    .order("recorded_on", { ascending: false });

  if (error || !data) return [];

  // Group by material, keep latest 2 rows per material for MoM comparison
  const groups = new Map<string, MaterialPrice[]>();
  for (const row of data as MaterialPrice[]) {
    if (!groups.has(row.material)) groups.set(row.material, []);
    const arr = groups.get(row.material)!;
    if (arr.length < 2) arr.push(row);
  }

  return Array.from(groups.values()).map(([cur, prev]) => {
    const curMid = (Number(cur.price_min) + Number(cur.price_max)) / 2;
    const prevMid = prev ? (Number(prev.price_min) + Number(prev.price_max)) / 2 : null;
    const rawPct = prevMid ? ((curMid - prevMid) / prevMid) * 100 : null;
    const changePct = rawPct !== null ? Math.round(rawPct * 10) / 10 : null;

    return {
      material:    cur.material,
      unit:        cur.unit,
      price_min:   Number(cur.price_min),
      price_max:   Number(cur.price_max),
      source:      cur.source,
      recorded_on: cur.recorded_on,
      prev_min:    prev ? Number(prev.price_min) : null,
      prev_max:    prev ? Number(prev.price_max) : null,
      change_pct:  changePct,
      direction:   changePct === null ? null : changePct > 0.4 ? "up" : changePct < -0.4 ? "down" : "flat",
    } satisfies MaterialWithChange;
  });
}

export async function getTrend(city: string, materials: string[]): Promise<MaterialTrend[]> {
  const sb = createServerClient();

  // Last 12 months
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 12);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const { data, error } = await sb
    .from("material_prices")
    .select("material, unit, price_min, price_max, recorded_on")
    .eq("city", city)
    .in("material", materials)
    .gte("recorded_on", cutoffStr)
    .order("recorded_on", { ascending: true });

  if (error || !data) return [];

  const groups = new Map<string, { unit: string; points: TrendPoint[] }>();
  for (const row of data) {
    if (!groups.has(row.material)) {
      groups.set(row.material, { unit: row.unit, points: [] });
    }
    const entry = groups.get(row.material)!;
    const [year, month] = row.recorded_on.split("-").map(Number);
    const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    entry.points.push({
      month:       `${MONTHS[month - 1]} ${year}`,
      recorded_on: row.recorded_on,
      price_min:   Number(row.price_min),
      price_max:   Number(row.price_max),
      midpoint:    (Number(row.price_min) + Number(row.price_max)) / 2,
    });
  }

  return Array.from(groups.entries()).map(([material, { unit, points }]) => ({
    material,
    unit,
    points,
  }));
}

export async function getLatestDate(city: string): Promise<string | null> {
  const sb = createServerClient();
  const { data } = await sb
    .from("material_prices")
    .select("recorded_on")
    .eq("city", city)
    .order("recorded_on", { ascending: false })
    .limit(1)
    .single();

  return data?.recorded_on ?? null;
}
