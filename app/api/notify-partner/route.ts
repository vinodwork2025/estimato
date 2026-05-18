import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { notifyPartnerByEmail } from "@/lib/partner-routing/notify";
import type { Lead, Partner } from "@/types";

const Schema = z.object({
  leadId: z.string().uuid(),
  priority: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, priority } = Schema.parse(body);

    const supabase = createServerClient();

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*, partners(*)")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (!lead.assigned_partner_id || !lead.partners) {
      return NextResponse.json({ error: "No partner assigned" }, { status: 400 });
    }

    const partner = lead.partners as Partner;
    const leadPayload: Lead = {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      countryCode: lead.country_code,
      email: lead.email,
      city: lead.city,
      area: lead.area,
      planningTimeline: lead.planning_timeline,
      consentToPartnerShare: lead.consent_to_partner_share,
      calculationInput: lead.calculation_input,
      calculationResult: lead.calculation_result,
    };

    await notifyPartnerByEmail(partner, leadPayload, priority);

    await supabase
      .from("leads")
      .update({ partner_notified_at: new Date().toISOString() })
      .eq("id", leadId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("notify-partner error:", err);
    return NextResponse.json({ error: "Notification failed" }, { status: 500 });
  }
}
