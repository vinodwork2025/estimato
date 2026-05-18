import type { Partner } from "@/types";
import { createServerClient } from "@/lib/supabase/server";

// Simple in-memory cache: city → partner (null if no match)
const cache = new Map<string, { partner: Partner | null; ts: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function matchPartnerForCity(city: string): Promise<Partner | null> {
  const key = city.toLowerCase().trim();
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now - cached.ts < CACHE_TTL_MS) {
    return cached.partner;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("status", "active")
      .contains("exclusive_cities", [key]);

    if (error || !data || data.length === 0) {
      cache.set(key, { partner: null, ts: now });
      return null;
    }

    // Prefer founding partner
    const row = data.find((p) => p.is_founding) ?? data[0];

    const partner: Partner = {
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.tagline ?? "",
      founderName: row.founder_name ?? "",
      founderBio: row.founder_bio ?? "",
      founderPhotoUrl: row.founder_photo_url ?? "",
      logoUrl: row.logo_url ?? "",
      websiteUrl: row.website_url ?? "",
      whatsappNumber: row.whatsapp_number ?? "",
      email: row.email ?? "",
      exclusiveCities: row.exclusive_cities ?? [],
      status: row.status,
      perLeadPrice: row.per_lead_price ?? 0,
      isFounding: row.is_founding ?? false,
    };

    cache.set(key, { partner, ts: now });
    return partner;
  } catch {
    cache.set(key, { partner: null, ts: now });
    return null;
  }
}

export async function shouldShowPartnerCard(city: string): Promise<boolean> {
  const partner = await matchPartnerForCity(city);
  return partner !== null;
}

export function clearPartnerCache(): void {
  cache.clear();
}
