import { escapeHtml } from "@/lib/security/html";
import { formatINRShort } from "@/lib/utils";
import type { CalculationResult } from "@/types";

export const FROM_REPORTS = "Estimato <reports@estimato.in>";
export const FROM_LEADS   = "Estimato <leads@estimato.in>";

const BREAKDOWN_LABELS: Record<string, string> = {
  civilStructure:   "Foundation & Structure",
  finishes:         "Flooring & Wall Finishes",
  interiors:        "Interiors",
  mep:              "Electrical & Plumbing",
  elevation:        "Exterior & Facade",
  approvalsAndFees: "Approvals & Permits",
  contingency:      "Contingency Reserve",
};

const TIER_LABELS: Record<string, string> = {
  basic:         "Basic",
  standard:      "Standard",
  premium:       "Premium",
  luxury:        "Luxury",
  "ultra-luxury":"Ultra Luxury",
};

function daysToMonths(days: number): string {
  const m = Math.round(days / 30);
  return `${m} ${m === 1 ? "month" : "months"}`;
}

export function buildReportEmailHtml({
  name,
  city,
  homeType,
  input,
  result,
  partnerName,
}: {
  name: string;
  city: string;
  homeType: string;
  input?: { floors?: number; builtUpArea?: number; qualityTier?: string };
  result: CalculationResult;
  partnerName: string | null;
}): string {
  const firstName  = escapeHtml(name.split(" ")[0]);
  const cityLabel  = escapeHtml(city.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
  const homeLabel  = escapeHtml(homeType.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
  const tierLabel  = TIER_LABELS[input?.qualityTier ?? ""] ?? "";
  const sqft       = input?.builtUpArea ?? 0;
  const floors     = input?.floors ?? 1;
  const siteUrl    = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
  const partnerLabel = partnerName ? escapeHtml(partnerName) : null;
  const totalMid   = result.totalRange.mid;

  // ── Cost breakdown rows ──
  const breakdownRows = Object.entries(result.breakdown)
    .map(([key, value]) => {
      const pct = totalMid > 0 ? Math.round((value / totalMid) * 100) : 0;
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;font-size:14px;color:#3A3A3A;">${BREAKDOWN_LABELS[key] ?? key}</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;font-size:13px;color:#9CA3AF;text-align:right;width:40px;">${pct}%</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #F0EDE8;font-size:14px;font-weight:600;color:#0E2146;text-align:right;width:80px;">${formatINRShort(value)}</td>
        </tr>`;
    }).join("");

  // ── Timeline rows ──
  const phaseRows = result.timeline.phases.map((phase, i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;width:24px;vertical-align:top;">
        <span style="font-size:11px;font-family:monospace;color:#C5A059;font-weight:700;">${String(i + 1).padStart(2, "0")}</span>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #F0EDE8;vertical-align:top;">
        <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0E2146;">${escapeHtml(phase.name)}</p>
        <p style="margin:0;font-size:13px;color:#6B6B6B;">${daysToMonths(phase.durationDays)} · ${phase.paymentPercent}% of total</p>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;font-size:14px;font-weight:600;color:#0E2146;text-align:right;vertical-align:top;width:72px;">${formatINRShort(phase.cost)}</td>
    </tr>`).join("");

  // ── Warnings (top 3) ──
  const warnings = (result.hiddenCostWarnings ?? []).slice(0, 3);
  const warningsHtml = warnings.length === 0 ? "" : `
    <tr><td colspan="3" style="padding-top:32px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#9CA3AF;margin:0 0 12px;font-family:monospace;">Cost Alerts</p>
      ${warnings.map(w => `
        <div style="border-left:3px solid #C5A059;padding:12px 16px;margin-bottom:10px;background:#FAFAF7;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#1A1A1A;">${escapeHtml(w.title)}</p>
          <p style="margin:0 0 6px;font-size:13px;color:#6B6B6B;line-height:1.6;">${escapeHtml(w.message)}</p>
          ${w.estimatedImpact ? `<p style="margin:0;font-size:12px;color:#C47820;font-weight:600;">Estimated impact: ${escapeHtml(w.estimatedImpact)}</p>` : ""}
        </div>`).join("")}
    </td></tr>`;

  // ── Insights (top 2) ──
  const insights = (result.smartInsights ?? []).slice(0, 2);
  const insightsHtml = insights.length === 0 ? "" : `
    <tr><td colspan="3" style="padding-top:28px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#9CA3AF;margin:0 0 12px;font-family:monospace;">Observations</p>
      ${insights.map(ins => `
        <div style="padding:12px 16px;margin-bottom:10px;background:#FAFAF7;border:1px solid #F0EDE8;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#1A1A1A;">${escapeHtml(ins.title)}</p>
          <p style="margin:0;font-size:13px;color:#6B6B6B;line-height:1.6;">${escapeHtml(ins.message)}</p>
        </div>`).join("")}
    </td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your Estimato Report</title></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E8E6E0;max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#0E2146;padding:24px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#fff;letter-spacing:-0.02em;">ESTIMATO<span style="color:#C5A059;">.</span></p></td>
              <td align="right"><p style="margin:0;font-size:11px;font-family:monospace;color:rgba(255,255,255,0.45);letter-spacing:0.12em;text-transform:uppercase;">Construction Cost Report</p></td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="height:3px;background:#C5A059;"></td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px 0;">
          <h1 style="font-size:22px;font-weight:600;color:#1A1A1A;margin:0 0 6px;">Hi ${firstName},</h1>
          <p style="color:#6B6B6B;margin:0 0 28px;font-size:15px;">
            Here is your construction cost report for a <strong style="color:#1A1A1A;">${homeLabel}</strong> in <strong style="color:#1A1A1A;">${cityLabel}</strong>.
          </p>

          <!-- Total cost box -->
          <div style="background:#0E2146;padding:28px;margin-bottom:32px;">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.45);margin:0 0 10px;font-family:monospace;">Estimated Total Cost</p>
            <p style="font-size:32px;font-weight:700;color:#fff;margin:0 0 10px;font-family:Georgia,serif;">
              ${formatINRShort(result.totalRange.min)} – ${formatINRShort(result.totalRange.max)}
            </p>
            <div style="height:2px;width:40px;background:#C5A059;margin-bottom:14px;opacity:0.75;"></div>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:24px;font-size:12px;color:rgba(255,255,255,0.55);">Cost/sqft <strong style="color:rgba(255,255,255,0.9);">₹${result.costPerSqft.toLocaleString("en-IN")}</strong></td>
                <td style="padding-right:24px;font-size:12px;color:rgba(255,255,255,0.55);">Timeline <strong style="color:rgba(255,255,255,0.9);">${daysToMonths(result.timeline.totalDays)}</strong></td>
                ${sqft ? `<td style="font-size:12px;color:rgba(255,255,255,0.55);">Built-up <strong style="color:rgba(255,255,255,0.9);">${sqft.toLocaleString("en-IN")} sqft</strong></td>` : ""}
              </tr>
            </table>
            ${tierLabel ? `<p style="margin:10px 0 0;font-size:12px;color:rgba(255,255,255,0.45);">G+${floors - 1} · ${tierLabel} finish</p>` : ""}
          </div>

          <!-- Cost breakdown -->
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#9CA3AF;margin:0 0 12px;font-family:monospace;">Cost Breakdown</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${breakdownRows}
            <tr>
              <td style="padding:12px 0 0;font-size:14px;font-weight:700;color:#0E2146;">Mid-point total</td>
              <td></td>
              <td style="padding:12px 0 0 16px;font-size:15px;font-weight:700;color:#0E2146;text-align:right;">${formatINRShort(totalMid)}</td>
            </tr>
          </table>

          <!-- Construction timeline -->
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#9CA3AF;margin:32px 0 12px;font-family:monospace;">Construction Timeline</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${phaseRows}
          </table>

          <!-- Warnings + Insights -->
          <table width="100%" cellpadding="0" cellspacing="0">
            ${warningsHtml}
            ${insightsHtml}
          </table>

          <!-- Disclaimer -->
          <div style="background:#F2F0EB;border-left:3px solid #C5A059;padding:14px 16px;margin-top:28px;">
            <p style="font-size:12px;color:#6B6B6B;margin:0;line-height:1.7;">This estimate covers construction cost only. It does not include interior design, modular kitchen, furniture, landscaping, architect fees, structural engineer fees, government approval charges, or utility connection costs.</p>
          </div>
        </td></tr>

        <!-- Partner block -->
        ${partnerLabel ? `
        <tr><td style="padding:24px 40px 0;">
          <div style="border:1px solid #E8E6E0;padding:20px;">
            <p style="font-size:14px;color:#1A1A1A;margin:0;">We have shared your details with <strong>${partnerLabel}</strong>, a verified architect in your area. They will reach out within 24 hours.</p>
          </div>
        </td></tr>` : ""}

        <!-- CTA -->
        <tr><td style="padding:28px 40px 40px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:12px;">
                <a href="${siteUrl}/plan" style="display:inline-block;background:#0E2146;color:#fff;text-decoration:none;padding:12px 24px;font-size:14px;font-weight:500;">Plan another build</a>
              </td>
            </tr>
          </table>
          <p style="font-size:12px;color:#9CA3AF;margin-top:16px;">Confidence band ±6% · Based on verified BOQs from real ${cityLabel} projects</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;border-top:1px solid #E8E6E0;background:#FAFAF7;">
          <p style="font-size:12px;color:#9CA3AF;margin:0;">Estimato · estimato.in · hello@estimato.in</p>
          <p style="font-size:12px;color:#C0BDBA;margin:4px 0 0;">This report is for planning purposes only.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
