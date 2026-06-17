export const runtime = "edge";

import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { submitLeadLimiter, getIP } from "@/lib/security/ratelimit";
import { FROM_LEADS } from "@/lib/email/report-html";
import { escapeHtml } from "@/lib/security/html";
import { InteriorLeadSchema } from "@/lib/interior/schema";
import { CITY_LABELS } from "@/lib/interior/rates";
import type { City } from "@/lib/interior/types";

export async function POST(request: Request) {
  const { success } = await submitLeadLimiter.limit(getIP(request));
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = InteriorLeadSchema.parse(body);

    const supabase = createServerClient();

    const { error: dbError } = await supabase.from("interior_leads").insert({
      name: data.name,
      phone: data.phone,
      city: data.city,
      message: data.message ?? null,
      property_type: data.propertyType ?? null,
      bhk: data.bhk ?? null,
      carpet_area: data.carpetArea ?? null,
      current_state: data.currentState ?? null,
      finish_level: data.finishLevel ?? null,
      scope: data.scope ?? null,
      estimate_min: data.estimateMin ?? null,
      estimate_max: data.estimateMax ?? null,
    });

    if (dbError) throw new Error(dbError.message);

    const cityLabel = escapeHtml(
      CITY_LABELS[data.city as City] ?? data.city
    );

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // TODO: Add Twilio WhatsApp notification here when that integration is available.

    await Promise.allSettled([
      resend.emails.send({
        from: FROM_LEADS,
        to: "hello@estimato.in",
        replyTo: "hello@estimato.in",
        subject: `New interior lead — ${escapeHtml(data.name)} — ${cityLabel}`,
        html: buildPartnerNotificationHtml(data, cityLabel),
      }).catch((err) => console.error("interior-lead partner-email error:", err)),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.errors }, { status: 400 });
    }
    console.error("interior-lead error:", err);
    await logError("interior-lead", err);
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

function buildPartnerNotificationHtml(
  data: z.infer<typeof InteriorLeadSchema>,
  cityLabel: string
): string {
  const esc = escapeHtml;
  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const rows = [
    ["Name", esc(data.name)],
    ["Phone", `+91 ${esc(data.phone)}`],
    ["City", cityLabel],
    data.carpetArea ? ["Carpet area", `${data.carpetArea} sqft`] : null,
    data.bhk ? ["BHK", `${esc(data.bhk)} BHK`] : null,
    data.finishLevel ? ["Finish", esc(data.finishLevel)] : null,
    data.currentState ? ["Property state", esc(data.currentState)] : null,
    data.estimateMin && data.estimateMax
      ? ["Estimate range", `${formatINR(data.estimateMin)} – ${formatINR(data.estimateMax)}`]
      : null,
    data.message ? ["Message", esc(data.message)] : null,
  ]
    .filter(Boolean)
    .map(
      (row) =>
        `<tr>
          <td style="padding:7px 0;color:#6B7280;width:160px;vertical-align:top;font-size:14px;">${row![0]}</td>
          <td style="padding:7px 0;font-weight:500;font-size:14px;color:#1a202c;">${row![1]}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="font-family:Inter,sans-serif;background:#FAF8F5;padding:32px;margin:0;">
<div style="max-width:540px;margin:0 auto;background:#fff;border:1px solid #E2DDD4;border-radius:4px;padding:32px;">
  <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:400;color:#0E2146;margin:0 0 4px;">New interior lead</p>
  <p style="font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#C49A3C;margin:0 0 24px;">Interior cost calculator</p>
  <table style="width:100%;border-collapse:collapse;">${rows}</table>
  <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E2DDD4;">
    <p style="font-size:12px;color:#9CA3AF;margin:0;">Estimato · estimato.in · Hosur–Bengaluru belt</p>
  </div>
</div>
</body>
</html>`;
}
