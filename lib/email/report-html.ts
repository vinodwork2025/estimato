import { escapeHtml } from "@/lib/security/html";

export const FROM_REPORTS = "Estimato <reports@estimato.in>";
export const FROM_LEADS   = "Estimato <leads@estimato.in>";
import { formatINRShort } from "@/lib/utils";
import type { CalculationResult } from "@/types";

export function buildReportEmailHtml({
  name,
  city,
  homeType,
  result,
  partnerName,
  pdfUrl,
}: {
  name: string;
  city: string;
  homeType: string;
  result: CalculationResult;
  partnerName: string | null;
  pdfUrl?: string | null;
}): string {
  const firstName = escapeHtml(name.split(" ")[0]);
  const cityLabel = escapeHtml(city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
  const homeLabel = escapeHtml(homeType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
  const partnerLabel = partnerName ? escapeHtml(partnerName) : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E8E6E0;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr><td style="padding:32px 40px;border-bottom:1px solid #E8E6E0;">
          <p style="font-family:Georgia,serif;font-size:24px;color:#1A1A1A;margin:0;">estimato<span style="color:#C8633A;">.</span></p>
        </td></tr>
        <tr><td style="padding:40px 40px 0;">
          <h1 style="font-size:22px;font-weight:600;color:#1A1A1A;margin:0 0 8px;">Hi ${firstName},</h1>
          <p style="color:#6B6B6B;margin:0 0 24px;">Here is your construction estimate for a ${homeLabel} in ${cityLabel}.</p>
          <div style="background:#FAFAF7;border:1px solid #E8E6E0;border-radius:8px;padding:24px;margin-bottom:24px;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3A3;margin:0 0 8px;">Estimated total cost</p>
            <p style="font-size:32px;font-weight:700;color:#1A1A1A;margin:0;font-family:Georgia,serif;">
              ${formatINRShort(result.totalRange.min)} – ${formatINRShort(result.totalRange.max)}
            </p>
            <p style="color:#6B6B6B;font-size:14px;margin:8px 0 0;">₹${result.costPerSqft.toLocaleString("en-IN")}/sqft · ${result.timeline.totalDays} days estimated</p>
          </div>
          ${partnerLabel ? `
          <div style="border:1px solid #E8E6E0;border-radius:8px;padding:20px;margin-bottom:24px;">
            <p style="font-size:14px;color:#1A1A1A;margin:0;">We have shared your details with <strong>${partnerLabel}</strong>, a verified architect in your area. They will reach out within 24 hours.</p>
          </div>
          ` : ""}
        </td></tr>
        <tr><td style="padding:0 40px 40px;">
          <table cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              ${pdfUrl ? `
              <td style="padding-right:12px;">
                <a href="${pdfUrl}" style="display:inline-block;background:#0E2146;color:#fff;text-decoration:none;padding:12px 24px;border-radius:3px;font-size:14px;font-weight:500;">Download PDF report</a>
              </td>
              ` : ""}
              <td style="padding-right:12px;">
                <a href="${siteUrl}/plan" style="display:inline-block;border:1px solid #E8E6E0;color:#1A1A1A;text-decoration:none;padding:12px 24px;border-radius:3px;font-size:14px;">Plan another build</a>
              </td>
            </tr>
          </table>
          ${pdfUrl ? "" : `<p style="font-size:12px;color:#9CA3A3;margin-top:16px;">Recalculate or update your estimate at <a href="${siteUrl}/plan" style="color:#0E2146;">estimato.in/plan</a></p>`}
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #E8E6E0;background:#FAFAF7;">
          <p style="font-size:12px;color:#9CA3A3;margin:0;">Estimato · estimato.in · No spam. <a href="${siteUrl}" style="color:#9CA3A3;">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `;
}
