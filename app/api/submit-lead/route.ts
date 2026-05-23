export const runtime = 'edge';

import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { matchPartnerForCity } from "@/lib/partner-routing/match";
import { notifyPartnerByEmail } from "@/lib/partner-routing/notify";
import { submitLeadLimiter, getIP } from "@/lib/security/ratelimit";
import type { Lead, PlannerInput, CalculationResult } from "@/types";

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit number"),
  countryCode: z.string().default("+91"),
  city: z.string().min(2),
  area: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  planningTimeline: z.enum(["within-3-months", "3-6-months", "6-12-months", "exploring"]),
  consentToPartnerShare: z.boolean(),
  calculationInput: z.object({
    homeType: z.string(),
    city: z.string(),
    plot: z.record(z.unknown()),
    configuration: z.record(z.unknown()),
    qualityTier: z.string(),
    interiorLevel: z.string(),
  }).passthrough(),
  calculationResult: z.object({
    totalRange: z.object({ min: z.number(), max: z.number(), mid: z.number() }),
    costPerSqft: z.number(),
    timeline: z.object({ totalDays: z.number() }).passthrough(),
  }).passthrough(),
  sourcePage: z.string().optional(),
  pdfUrl: z.string().url().optional(),
});

export async function POST(request: Request) {
  const { success } = await submitLeadLimiter.limit(getIP(request));
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = LeadSchema.parse(body);

    const partner = data.consentToPartnerShare
      ? await matchPartnerForCity(data.city)
      : null;

    const supabase = createServerClient();

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone,
        country_code: data.countryCode,
        email: data.email || null,
        city: data.city,
        area: data.area || null,
        planning_timeline: data.planningTimeline,
        consent_to_partner_share: data.consentToPartnerShare,
        assigned_partner_id: partner ? partner.id : null,
        calculation_input: data.calculationInput,
        calculation_result: data.calculationResult,
        source_page: data.sourcePage || null,
        pdf_url: data.pdfUrl || null,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    // Send PDF report via email (fire-and-forget)
    if (data.email) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret": process.env.INTERNAL_API_SECRET ?? "",
        },
        body: JSON.stringify({
          leadId: lead.id,
          email: data.email,
          name: data.name,
          city: data.city,
          homeType: data.calculationInput?.homeType,
          result: data.calculationResult,
          partnerName: partner?.name ?? null,
          pdfUrl: data.pdfUrl || null,
        }),
      }).catch(() => {});
    }

    // Notify partner
    if (partner && data.consentToPartnerShare) {
      const isPriority = data.planningTimeline === "within-3-months";
      const leadPayload: Lead = {
        id: lead.id,
        name: data.name,
        phone: data.phone,
        countryCode: data.countryCode,
        email: data.email || undefined,
        city: data.city,
        area: data.area,
        planningTimeline: data.planningTimeline,
        consentToPartnerShare: data.consentToPartnerShare,
        calculationInput: data.calculationInput as unknown as PlannerInput,
        calculationResult: data.calculationResult as unknown as CalculationResult,
      };

      notifyPartnerByEmail(partner, leadPayload, isPriority).then(() => {
        supabase
          .from("leads")
          .update({ partner_notified_at: new Date().toISOString() })
          .eq("id", lead.id)
          .then(() => {});
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      partnerMatched: partner !== null,
      partnerName: partner?.name ?? null,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.errors },
        { status: 400 }
      );
    }
    console.error("submit-lead error:", err);
    await logError("submit-lead", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

async function logError(type: string, err: unknown) {
  try {
    const supabase = createServerClient();
    await supabase.from("errors").insert({
      error_type: type,
      message: err instanceof Error ? err.message : String(err),
    });
  } catch {}
}
