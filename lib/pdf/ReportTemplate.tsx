import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { PlannerInput, CalculationResult, Partner } from "@/types";

const ACCENT = "#C8633A";
const CHARCOAL = "#0F0F0F";
const SECONDARY = "#6B6B6B";
const BORDER = "#E8E6E0";
const BG = "#FAFAF7";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    padding: 48,
    color: CHARCOAL,
  },
  coverPage: {
    fontFamily: "Helvetica",
    backgroundColor: CHARCOAL,
    padding: 48,
    color: "#FFFFFF",
    justifyContent: "space-between",
  },
  heading1: { fontSize: 28, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  heading2: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  heading3: { fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  body: { fontSize: 10, lineHeight: 1.6, color: SECONDARY },
  label: { fontSize: 8, color: SECONDARY, textTransform: "uppercase", letterSpacing: 1 },
  accentText: { color: ACCENT },
  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
  divider: { borderBottomWidth: 1, borderBottomColor: BORDER, marginVertical: 16 },
  chip: {
    backgroundColor: BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingVertical: 6,
  },
  tableCell: { fontSize: 9, flex: 1 },
  tableCellRight: { fontSize: 9, textAlign: "right" },
  warningCard: {
    backgroundColor: BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  pageNumber: {
    position: "absolute",
    bottom: 24,
    right: 48,
    fontSize: 8,
    color: SECONDARY,
  },
});

function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(0)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

interface ReportTemplateProps {
  input: PlannerInput;
  result: CalculationResult;
  leadName: string;
  partner: Partner | null;
  reportId: string;
  generatedDate: string;
}

export function ReportTemplate({
  input,
  result,
  leadName,
  partner,
  reportId,
  generatedDate,
}: ReportTemplateProps) {
  const city = input.city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const homeType = input.homeType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const firstName = leadName.split(" ")[0];

  return (
    <Document title={`Estimato Report – ${leadName}`} author="Estimato" subject="Home Construction Cost Estimate">
      {/* Page 1: Cover */}
      <Page size="A4" style={styles.coverPage}>
        <View>
          <Text style={{ fontSize: 24, color: "#FFFFFF", fontFamily: "Helvetica-Bold" }}>estimato.</Text>
          <Text style={{ fontSize: 10, color: "#9CA3A3", marginTop: 4 }}>Plan before you build</Text>
        </View>
        <View>
          <Text style={[styles.label, { color: "#9CA3A3" }]}>Construction Cost Estimate</Text>
          <Text style={{ fontSize: 36, color: "#FFFFFF", fontFamily: "Helvetica-Bold", marginTop: 8 }}>
            {formatINR(result.totalRange.min)} – {formatINR(result.totalRange.max)}
          </Text>
          <Text style={{ fontSize: 14, color: "#9CA3A3", marginTop: 8 }}>
            For {leadName} · {homeType} in {city}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 9, color: "#9CA3A3" }}>
            Report ID: {reportId} · Generated {generatedDate}
          </Text>
          <Text style={{ fontSize: 9, color: "#9CA3A3", marginTop: 2 }}>estimato.in</Text>
        </View>
      </Page>

      {/* Page 2: Executive Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Executive Summary</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>
          Hi {firstName}, here is your construction cost estimate for a {homeType} in {city}.
          This estimate is based on 2026 market rates verified by Estimato.
        </Text>

        <View style={{ backgroundColor: BG, borderWidth: 1, borderColor: BORDER, borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <Text style={styles.label}>Estimated total cost</Text>
          <Text style={{ fontSize: 28, fontFamily: "Helvetica-Bold", color: CHARCOAL, marginTop: 4 }}>
            {formatINR(result.totalRange.min)} – {formatINR(result.totalRange.max)}
          </Text>
          <Text style={[styles.body, { marginTop: 4 }]}>
            Mid estimate: {formatINR(result.totalRange.mid)} · {formatINR(result.costPerSqft)}/sqft
          </Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.col, { backgroundColor: BG, padding: 12, borderRadius: 6, borderWidth: 1, borderColor: BORDER }]}>
            <Text style={styles.label}>Built-up area</Text>
            <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", marginTop: 3 }}>
              {input.configuration.builtUpArea.toLocaleString("en-IN")} sqft
            </Text>
          </View>
          <View style={[styles.col, { backgroundColor: BG, padding: 12, borderRadius: 6, borderWidth: 1, borderColor: BORDER }]}>
            <Text style={styles.label}>Quality tier</Text>
            <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", marginTop: 3, textTransform: "capitalize" }}>
              {input.qualityTier}
            </Text>
          </View>
          <View style={[styles.col, { backgroundColor: BG, padding: 12, borderRadius: 6, borderWidth: 1, borderColor: BORDER }]}>
            <Text style={styles.label}>Timeline</Text>
            <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", marginTop: 3 }}>
              ~{Math.ceil(result.timeline.totalDays / 30)} months
            </Text>
          </View>
        </View>

        <Text style={[styles.body, { marginTop: 16, color: SECONDARY }]}>
          Keep {formatINR(result.recommendedContingency)} (8% of total) as a contingency buffer.
          Construction costs always have surprises.
        </Text>
        <Text style={styles.pageNumber}>2 of 12</Text>
      </Page>

      {/* Page 3: Cost Breakdown */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Cost Breakdown</Text>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.label]}>Component</Text>
          <Text style={[styles.label, { textAlign: "right" }]}>Amount</Text>
          <Text style={[styles.label, { textAlign: "right", width: 40 }]}>Share</Text>
        </View>
        {Object.entries(result.breakdown).map(([key, value]) => {
          const labels: Record<string, string> = {
            civilStructure: "Civil structure",
            finishes: "Finishes",
            interiors: "Interiors",
            mep: "MEP (electrical & plumbing)",
            elevation: "Elevation",
            approvalsAndFees: "Approvals & fees",
            contingency: "Contingency",
          };
          const pct = ((value / result.totalRange.mid) * 100).toFixed(0);
          return (
            <View style={styles.tableRow} key={key}>
              <Text style={styles.tableCell}>{labels[key] ?? key}</Text>
              <Text style={[styles.tableCell, styles.tableCellRight]}>{formatINR(value)}</Text>
              <Text style={[styles.tableCell, { textAlign: "right", width: 40, color: SECONDARY, fontSize: 9 }]}>{pct}%</Text>
            </View>
          );
        })}
        <View style={[styles.tableRow, { borderBottomWidth: 0, marginTop: 4 }]}>
          <Text style={[styles.tableCell, { fontFamily: "Helvetica-Bold" }]}>Total (mid estimate)</Text>
          <Text style={[styles.tableCell, { textAlign: "right", fontFamily: "Helvetica-Bold" }]}>{formatINR(result.totalRange.mid)}</Text>
          <Text style={{ width: 40 }} />
        </View>
        <Text style={styles.pageNumber}>3 of 12</Text>
      </Page>

      {/* Page 4: Phase-wise Timeline */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Build Timeline</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>
          Total build: ~{Math.ceil(result.timeline.totalDays / 30)} months ({result.timeline.totalDays} working days)
        </Text>
        {result.timeline.phases.map((phase, i) => (
          <View key={phase.name} style={[styles.warningCard, { marginBottom: 10 }]}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={[styles.heading3, { color: ACCENT }]}>Phase {i + 1}: {phase.name}</Text>
                <Text style={styles.body}>{phase.description}</Text>
              </View>
              <View style={{ width: 100, alignItems: "flex-end" }}>
                <Text style={[styles.label]}>Duration</Text>
                <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>{phase.durationDays} days</Text>
                <Text style={[styles.label, { marginTop: 6 }]}>Cost</Text>
                <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold" }}>{formatINR(phase.cost)}</Text>
                <Text style={[styles.label, { marginTop: 4 }]}>{phase.paymentPercent}% tranche</Text>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.pageNumber}>4 of 12</Text>
      </Page>

      {/* Page 5: Quality Comparison */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Quality Tier Comparison</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>
          Your selection: {input.qualityTier.charAt(0).toUpperCase() + input.qualityTier.slice(1)}
        </Text>
        {(["essential", "economy", "premium", "luxury"] as const).map((tier) => {
          const isSelected = tier === input.qualityTier;
          return (
            <View
              key={tier}
              style={[
                styles.warningCard,
                isSelected ? { borderColor: ACCENT, borderWidth: 2 } : {},
              ]}
            >
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={[styles.heading3, isSelected ? { color: ACCENT } : {}]}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    {isSelected ? " ← Your choice" : ""}
                  </Text>
                </View>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>
                  {formatINR(result.comparisonScenarios[tier])}
                </Text>
              </View>
            </View>
          );
        })}
        <Text style={styles.pageNumber}>5 of 12</Text>
      </Page>

      {/* Page 6: Hidden Costs */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Costs People Forget</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>
          These are real costs that most construction estimates leave out.
        </Text>
        {result.hiddenCostWarnings.map((w, i) => (
          <View key={i} style={styles.warningCard}>
            <Text style={[styles.heading3]}>{w.title}</Text>
            <Text style={styles.body}>{w.message}</Text>
            <Text style={[styles.body, { color: "#B8741F", marginTop: 4, fontFamily: "Helvetica-Bold" }]}>
              Estimated impact: {w.estimatedImpact}
            </Text>
          </View>
        ))}
        <Text style={styles.pageNumber}>6 of 12</Text>
      </Page>

      {/* Page 7: Smart Insights */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Smart Observations</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>Based on your specific inputs.</Text>
        {result.smartInsights.map((insight, i) => (
          <View key={i} style={styles.warningCard}>
            <Text style={[styles.body, { color: ACCENT, fontFamily: "Helvetica-Bold", fontSize: 8, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }]}>
              {insight.type === "opportunity" ? "Opportunity" : insight.type === "warning" ? "Watch out" : "Good to know"}
            </Text>
            <Text style={styles.heading3}>{insight.title}</Text>
            <Text style={styles.body}>{insight.message}</Text>
          </View>
        ))}
        <Text style={styles.pageNumber}>7 of 12</Text>
      </Page>

      {/* Page 8: Local Market Context */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Local Market Context</Text>
        <Text style={[styles.heading2, { color: ACCENT }]}>{city}</Text>
        <Text style={[styles.body, { marginBottom: 12 }]}>
          Construction costs in {city} are based on verified 2026 BOQ data. Labour rates, material
          logistics, and regulatory costs all vary by location.
        </Text>
        <Text style={[styles.body, { marginBottom: 8 }]}>
          Hosur and the Krishnagiri belt are experiencing rapid construction activity driven by
          industrial growth (Tata Electronics, Samsung, and others). This creates both opportunity
          (competitive sub-contractors) and risk (peak-season labour shortage).
        </Text>
        <Text style={[styles.body]}>
          Sarjapura and the Bengaluru outer ring road areas command 5-13% premiums over Hosur due to
          proximity to IT corridors and higher labour demand.
        </Text>
        <Text style={styles.pageNumber}>8 of 12</Text>
      </Page>

      {/* Page 9: Pre-construction Checklist */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Pre-construction Checklist</Text>
        {[
          "Get soil testing report before finalizing foundation design",
          "Verify plot title is clear (check encumbrance certificate)",
          "Engage a licensed architect before starting any work",
          "Submit building plan for approval before breaking ground",
          "Get at least 3 contractor quotes and check references",
          "Sign a detailed agreement with payment schedule",
          "Set up a dedicated construction fund account",
          "Arrange borewell drilling 60 days before construction starts",
          "Apply for BESCOM/KSEB connection 90 days in advance",
          "Confirm water connection from panchayat or BWSSB",
          "Inspect steel and cement at delivery (check grade and ISI mark)",
          "Photograph and document every construction stage",
          "Lock cement and steel prices before signing agreement",
          "Plan your interiors before electrical rough-in (not after)",
          "Keep 8% of total budget as contingency in a separate account",
        ].map((item, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
            <View style={{ width: 14, height: 14, borderWidth: 1, borderColor: BORDER, borderRadius: 2, marginTop: 1 }} />
            <Text style={[styles.body, { flex: 1 }]}>{item}</Text>
          </View>
        ))}
        <Text style={styles.pageNumber}>9 of 12</Text>
      </Page>

      {/* Page 10: Material Brand Recommendations */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Material Brand Recommendations</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>
          Recommendations for {input.qualityTier.charAt(0).toUpperCase() + input.qualityTier.slice(1)} tier.
        </Text>
        {[
          { category: "Flooring", essential: "Local manufacturer", economy: "Kajaria / Nitco", premium: "Somany Duragres", luxury: "Italgraniti / Florim" },
          { category: "Sanitary", essential: "Hindware / Parryware", economy: "Hindware", premium: "Jaquar", luxury: "Kohler / Roca" },
          { category: "Electricals", essential: "Havells / Anchor", economy: "Anchor", premium: "Legrand", luxury: "Schneider / ABB" },
          { category: "Paint", essential: "Indigo / Nerolac", economy: "Asian Paints Tractor", premium: "Asian Paints Royale", luxury: "Dulux Weathershield" },
          { category: "Doors", essential: "Flush doors", economy: "WPC flush", premium: "Teak solid", luxury: "Imported hardwood" },
          { category: "Waterproofing", essential: "Dr. Fixit", economy: "Dr. Fixit", premium: "Sika", luxury: "Sika / Fosroc" },
        ].map((row) => (
          <View key={row.category} style={styles.tableRow}>
            <Text style={[styles.tableCell, { fontFamily: "Helvetica-Bold" }]}>{row.category}</Text>
            <Text style={[styles.tableCell, input.qualityTier === "essential" ? { color: ACCENT } : {}]}>{row.essential}</Text>
            <Text style={[styles.tableCell, input.qualityTier === "economy" ? { color: ACCENT } : {}]}>{row.economy}</Text>
            <Text style={[styles.tableCell, input.qualityTier === "premium" ? { color: ACCENT } : {}]}>{row.premium}</Text>
            <Text style={[styles.tableCell, input.qualityTier === "luxury" ? { color: ACCENT } : {}]}>{row.luxury}</Text>
          </View>
        ))}
        <Text style={styles.pageNumber}>10 of 12</Text>
      </Page>

      {/* Page 11: About Estimato + Partner Spotlight */}
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading1}>About Estimato</Text>
          <Text style={styles.body}>
            Estimato is an independent home construction cost planning platform for Indian homeowners.
            We help you understand your build cost before you talk to a single contractor.
            Our estimates are based on verified BOQ data and updated quarterly.
          </Text>
          <Text style={[styles.body, { marginTop: 8 }]}>
            We earn revenue from verified architecture and construction firms who pay per qualified
            consultation lead. We never earn commissions on project value. This keeps our numbers honest.
          </Text>
        </View>

        <View style={styles.divider} />

        <View>
          {partner ? (
            <>
              <Text style={styles.heading2}>Your Estimato Verified Partner</Text>
              <Text style={[styles.heading3, { color: ACCENT }]}>{partner.name}</Text>
              <Text style={styles.body}>{partner.tagline}</Text>
              <Text style={[styles.body, { marginTop: 8 }]}>
                {partner.founderName} — {partner.founderBio}
              </Text>
              <Text style={[styles.body, { marginTop: 8 }]}>{partner.websiteUrl}</Text>
            </>
          ) : (
            <>
              <Text style={styles.heading2}>Find Your Architect</Text>
              <Text style={styles.body}>
                We are building our partner network for your city. Email us at hello@estimato.in
                to be notified when a verified partner is available in your area.
              </Text>
            </>
          )}
        </View>
        <Text style={styles.pageNumber}>11 of 12</Text>
      </Page>

      {/* Page 12: Next Steps */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading1}>Next Steps</Text>
        {[
          {
            step: "1",
            title: "Get a detailed consultation",
            body: partner
              ? `Book a call with ${partner.name}. They will review your plot, design requirements, and give you a detailed project estimate.`
              : "Contact us at hello@estimato.in and we will connect you with a verified architect.",
          },
          {
            step: "2",
            title: "Review the checklist",
            body: "Complete all 15 items on the pre-construction checklist in this report before breaking ground.",
          },
          {
            step: "3",
            title: "Set your budget with the buffer",
            body: `Keep ${formatINR(result.recommendedContingency)} (8%) aside as a contingency. Construction always has surprises.`,
          },
        ].map((item) => (
          <View key={item.step} style={[styles.warningCard, { flexDirection: "row", gap: 12 }]}>
            <View style={{ width: 28, height: 28, backgroundColor: ACCENT, borderRadius: 14, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 14 }}>{item.step}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading3}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        ))}

        {partner && (
          <View style={[styles.warningCard, { marginTop: 16, backgroundColor: CHARCOAL }]}>
            <Text style={[styles.heading3, { color: "#FFFFFF" }]}>{partner.name}</Text>
            <Text style={[styles.body, { color: "#9CA3A3" }]}>WhatsApp: {partner.whatsappNumber}</Text>
            <Text style={[styles.body, { color: "#9CA3A3" }]}>Email: {partner.email}</Text>
            <Text style={[styles.body, { color: "#9CA3A3" }]}>{partner.websiteUrl}</Text>
          </View>
        )}

        <View style={[styles.divider, { marginTop: "auto" }]} />
        <Text style={[styles.body, { textAlign: "center" }]}>
          estimato.in · hello@estimato.in · Report ID: {reportId}
        </Text>
        <Text style={styles.pageNumber}>12 of 12</Text>
      </Page>
    </Document>
  );
}
