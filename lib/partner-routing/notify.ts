import type { Partner, Lead } from "@/types";
import { FROM_LEADS } from "@/lib/email/report-html";

export function isWhatsAppConfigured(partner: Partner): boolean {
  if (partner.whatsappNumber.includes("XXXXXXXXXX")) {
    console.error(
      `[partner-routing] WhatsApp number not configured for partner "${partner.name}". Skipping WhatsApp notification.`
    );
    return false;
  }
  return true;
}

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
    from: FROM_LEADS,
    to: [partner.email, "vinod@optiscaleadvisors.com"],
    subject,
    html: buildPartnerEmailHtml(partner, lead, priority),
  });
}

function buildPartnerEmailHtml(
  partner: Partner,
  lead: Lead,
  priority: boolean
): string {
  const inp = lead.calculationInput;
  const res = lead.calculationResult;
  const cityDisplay = lead.city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const locationDisplay = lead.area ? `${lead.area}, ${cityDisplay}` : cityDisplay;

  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1A1A1A;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; margin-bottom: 8px;">Estimato Partner Network</p>
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">
        ${priority ? "Hot lead: " : "New lead: "}${lead.name} wants to build in ${cityDisplay}
      </h1>
      ${priority ? '<p style="background: #FEF3C7; border-left: 3px solid #B8741F; padding: 12px 16px; margin-bottom: 24px; font-size: 14px;">This lead is planning within 3 months. Respond within 24 hours.</p>' : ""}

      <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3A3; margin-bottom: 6px;">Contact</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px; width: 40%;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.name}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.countryCode} ${lead.phone}</td></tr>
        ${lead.email ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${lead.email}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Location</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${locationDisplay}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 14px;">Planning timeline</td><td style="padding: 8px 0; font-size: 14px;">${formatTimeline(lead.planningTimeline)}</td></tr>
      </table>

      <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3A3; margin-bottom: 6px;">Project requirements</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px; width: 40%;">Home type</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${formatLabel(inp.homeType)}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Plot size</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${inp.plot.length} × ${inp.plot.width} ft (${inp.plot.length * inp.plot.width} sqft)</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Built-up area</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${inp.configuration.builtUpArea.toLocaleString("en-IN")} sqft</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Floors</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${inp.configuration.floors} floor${inp.configuration.floors > 1 ? "s" : ""}${inp.configuration.basement ? " + basement" : ""}${inp.configuration.terrace ? " + terrace" : ""}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Quality tier</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">${formatLabel(inp.qualityTier)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 14px;">Interiors</td><td style="padding: 8px 0; font-size: 14px;">${formatLabel(inp.interiorLevel)}</td></tr>
      </table>

      <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3A3; margin-bottom: 6px;">Estimate</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px; width: 40%;">Budget range</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px; font-weight: 600;">₹${formatINR(res.totalRange.min)} – ₹${formatINR(res.totalRange.max)}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; color: #6B6B6B; font-size: 14px;">Cost per sqft</td><td style="padding: 8px 0; border-bottom: 1px solid #E8E6E0; font-size: 14px;">₹${res.costPerSqft.toLocaleString("en-IN")}/sqft</td></tr>
        <tr><td style="padding: 8px 0; color: #6B6B6B; font-size: 14px;">Build duration</td><td style="padding: 8px 0; font-size: 14px;">${res.timeline.totalDays} days (~${Math.round(res.timeline.totalDays / 30)} months)</td></tr>
      </table>

      <p style="font-size: 12px; color: #9CA3A3; margin-top: 32px;">Estimato partner lead. Reply to this email or call the lead directly.</p>
    </div>
  `;
}

function formatLabel(s: string): string {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
