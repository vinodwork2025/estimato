import type { Partner, Lead } from "@/types";

export async function notifyPartnerByEmail(
  partner: Partner,
  lead: Lead,
  priority: boolean
): Promise<void> {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = priority
    ? `[HOT LEAD] New consultation request from ${lead.name} in ${lead.city}`
    : `New consultation request from ${lead.name} in ${lead.city}`;

  await resend.emails.send({
    from: "leads@estimato.in",
    to: partner.email,
    subject,
    html: buildPartnerEmailHtml(partner, lead, priority),
  });
}

function buildPartnerEmailHtml(
  partner: Partner,
  lead: Lead,
  priority: boolean
): string {
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1A1A1A;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; margin-bottom: 8px;">Estimato Partner Network</p>
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">
        ${priority ? "Hot lead: " : "New lead: "}${lead.name} wants to build in ${lead.city}
      </h1>
      ${priority ? '<p style="background: #FEF3C7; border-left: 3px solid #B8741F; padding: 12px 16px; margin-bottom: 24px; font-size: 14px;">This lead is planning within 3 months. Respond within 24 hours.</p>' : ""}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.name}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.countryCode} ${lead.phone}</td></tr>
        ${lead.email ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.email}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Location</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.area ? lead.area + ", " : ""}${lead.city}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Timeline</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${formatTimeline(lead.planningTimeline)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 14px;">Estimated budget</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600;">₹${formatINR(lead.calculationResult.totalRange.min)} – ₹${formatINR(lead.calculationResult.totalRange.max)}</td></tr>
      </table>
      <p style="font-size: 12px; color: #9CA3A3; margin-top: 32px;">Estimato partner lead. Reply to this email or call the lead directly.</p>
    </div>
  `;
}

function formatTimeline(t: string): string {
  const map: Record<string, string> = {
    "within-3-months": "Within 3 months",
    "3-6-months": "3 to 6 months",
    "6-12-months": "6 to 12 months",
    exploring: "Just exploring",
  };
  return map[t] ?? t;
}

function formatINR(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(0)}L`;
  return n.toLocaleString("en-IN");
}
