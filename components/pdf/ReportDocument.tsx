import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { CalculationResult, PlannerInput } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtPct(value: number, total: number): string {
  return `${Math.round((value / total) * 100)}%`;
}

function cityLabel(city: string): string {
  return city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function homeLabel(ht: string): string {
  const map: Record<string, string> = {
    villa: "Villa",
    duplex: "Duplex",
    farmhouse: "Farmhouse",
    contemporary: "Contemporary Home",
    budget: "Budget Home",
    "luxury-villa": "Luxury Villa",
  };
  return map[ht] ?? ht;
}

function tierLabel(t: string): string {
  const map: Record<string, string> = {
    basic: "Basic",
    standard: "Standard",
    premium: "Premium",
    luxury: "Luxury",
    "ultra-luxury": "Ultra Luxury",
  };
  return map[t] ?? t;
}

function today(): string {
  return new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const NAVY = "#0E2146";
const GOLD = "#C5A059";
const LIGHT_BG = "#F8F7F4";
const BORDER = "#E2DDD4";
const SECONDARY = "#4A6080";
const TEXT = "#1A1A2E";

const s = StyleSheet.create({
  page: {
    backgroundColor: "#FDFCFA",
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: TEXT,
  },

  // Header
  header: {
    backgroundColor: NAVY,
    paddingHorizontal: 48,
    paddingVertical: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  brandName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  brandDot: {
    color: GOLD,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerMeta: {
    fontSize: 8,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  headerDate: {
    fontSize: 8,
    color: "rgba(255,255,255,0.4)",
    marginTop: 3,
  },

  // Gold accent line below header
  accentLine: {
    height: 2,
    backgroundColor: GOLD,
    opacity: 0.35,
  },

  // Body
  body: {
    paddingHorizontal: 48,
    paddingTop: 32,
  },

  // Address block
  greeting: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: SECONDARY,
    marginBottom: 24,
  },

  // Summary box
  summaryBox: {
    backgroundColor: NAVY,
    padding: 24,
    marginBottom: 28,
  },
  summaryLabel: {
    fontSize: 7,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  summaryAmount: {
    fontFamily: "Courier-Bold",
    fontSize: 30,
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  summaryRule: {
    height: 1,
    backgroundColor: GOLD,
    width: 36,
    marginBottom: 10,
    opacity: 0.7,
  },
  summaryMeta: {
    flexDirection: "row",
    gap: 20,
  },
  summaryMetaItem: {
    fontSize: 8,
    color: "rgba(255,255,255,0.6)",
  },
  summaryMetaValue: {
    fontFamily: "Courier-Bold",
    color: "rgba(255,255,255,0.9)",
  },

  // Section
  sectionLabel: {
    fontSize: 7,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: GOLD,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 24,
    marginTop: 8,
  },

  // Breakdown table
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  breakdownRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: NAVY,
    marginTop: 4,
  },
  breakdownLabel: {
    fontSize: 9,
    color: TEXT,
    flex: 1,
  },
  breakdownAmount: {
    fontSize: 9,
    color: NAVY,
    fontFamily: "Courier-Bold",
    width: 70,
    textAlign: "right",
  },
  breakdownPct: {
    fontSize: 8,
    color: SECONDARY,
    fontFamily: "Courier",
    width: 34,
    textAlign: "right",
  },
  breakdownBar: {
    height: 3,
    backgroundColor: NAVY,
    opacity: 0.12,
    marginVertical: 1,
    width: 60,
  },

  // Timeline
  phaseRow: {
    flexDirection: "row",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 12,
  },
  phaseNumber: {
    fontSize: 7,
    letterSpacing: 1,
    color: GOLD,
    fontFamily: "Courier-Bold",
    width: 20,
    marginTop: 1,
  },
  phaseContent: { flex: 1 },
  phaseName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    marginBottom: 2,
  },
  phaseDetail: { fontSize: 8, color: SECONDARY },
  phaseAmount: {
    fontSize: 9,
    fontFamily: "Courier-Bold",
    color: NAVY,
    textAlign: "right",
    width: 60,
  },

  // Warnings
  warningRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 10,
    alignItems: "flex-start",
  },
  warningDot: {
    width: 5,
    height: 5,
    backgroundColor: "#C47820",
    borderRadius: 3,
    marginTop: 3,
  },
  warningContent: { flex: 1 },
  warningTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
    marginBottom: 2,
  },
  warningText: { fontSize: 8, color: SECONDARY, lineHeight: 1.5 },
  warningImpact: {
    fontSize: 7,
    color: "#C47820",
    marginTop: 3,
    letterSpacing: 0.3,
  },

  // Insights
  insightRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 10,
  },
  insightDot: {
    width: 5,
    height: 5,
    backgroundColor: GOLD,
    borderRadius: 3,
    marginTop: 3,
  },
  insightContent: { flex: 1 },
  insightTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
    marginBottom: 2,
  },
  insightText: { fontSize: 8, color: SECONDARY, lineHeight: 1.5 },

  // Tier comparison
  tierGrid: {
    flexDirection: "row",
    gap: 8,
  },
  tierCard: {
    flex: 1,
    padding: 12,
    backgroundColor: LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER,
  },
  tierCardActive: {
    flex: 1,
    padding: 12,
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: NAVY,
  },
  tierName: { fontSize: 7, letterSpacing: 1.2, color: SECONDARY, textTransform: "uppercase", marginBottom: 5 },
  tierNameActive: { fontSize: 7, letterSpacing: 1.2, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 5 },
  tierAmount: { fontSize: 11, fontFamily: "Courier-Bold", color: NAVY },
  tierAmountActive: { fontSize: 11, fontFamily: "Courier-Bold", color: "#FFFFFF" },

  // Footer
  footer: {
    marginTop: 36,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBrand: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    letterSpacing: 0.3,
  },
  footerMeta: { fontSize: 7, color: SECONDARY, textAlign: "right", lineHeight: 1.6 },
  footerNote: { fontSize: 7, color: "#9CA3AF", marginTop: 8 },

  spacer: { height: 28 },
  spacerSm: { height: 14 },
});

// ─── Component ────────────────────────────────────────────────────────────────

interface ReportDocumentProps {
  name: string;
  input: Partial<PlannerInput>;
  result: CalculationResult;
}

export function ReportDocument({ name, input, result }: ReportDocumentProps) {
  const city = input.city ? cityLabel(input.city) : "your city";
  const ht = homeLabel(input.homeType ?? "home");
  const tier = tierLabel(input.qualityTier ?? "economy");
  const sqft = input.configuration?.builtUpArea ?? 0;
  const floors = input.configuration?.floors ?? 1;
  const totalMid = result.totalRange.mid;

  const BREAKDOWN_META: Record<string, string> = {
    civilStructure: "Foundation & Structure",
    finishes: "Flooring & Wall Finishes",
    interiors: "Interiors",
    mep: "Electrical & Plumbing",
    elevation: "Exterior & Facade",
    approvalsAndFees: "Approvals & Permits",
    contingency: "Contingency Reserve",
  };

  const breakdownEntries = Object.entries(result.breakdown) as [string, number][];
  const warnings = result.hiddenCostWarnings?.slice(0, 4) ?? [];
  const insights = result.smartInsights?.slice(0, 3) ?? [];

  return (
    <Document
      title={`Estimato Report – ${name}`}
      author="Estimato"
      subject={`Construction cost projection for ${ht} in ${city}`}
    >
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.brandName}>estimato<Text style={s.brandDot}>.</Text></Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.headerMeta}>Construction Cost Report</Text>
            <Text style={s.headerDate}>{today()}</Text>
          </View>
        </View>
        <View style={s.accentLine} />

        <View style={s.body}>

          {/* Greeting */}
          <Text style={s.greeting}>{name}</Text>
          <Text style={s.subtitle}>
            {ht} · {city} · {sqft.toLocaleString("en-IN")} sqft · G+{floors - 1} · {tier} finish
          </Text>

          {/* Summary box */}
          <View style={s.summaryBox}>
            <Text style={s.summaryLabel}>Estimated total cost</Text>
            <Text style={s.summaryAmount}>
              {fmtINR(result.totalRange.min)} – {fmtINR(result.totalRange.max)}
            </Text>
            <View style={s.summaryRule} />
            <View style={s.summaryMeta}>
              <Text style={s.summaryMetaItem}>
                Cost per sqft: <Text style={s.summaryMetaValue}>₹{result.costPerSqft.toLocaleString("en-IN")}</Text>
              </Text>
              <Text style={s.summaryMetaItem}>
                Timeline: <Text style={s.summaryMetaValue}>{Math.round(result.timeline.totalDays / 30)} months</Text>
              </Text>
              <Text style={s.summaryMetaItem}>
                Confidence: <Text style={s.summaryMetaValue}>±6%</Text>
              </Text>
            </View>
          </View>

          {/* Cost Breakdown */}
          <Text style={s.sectionLabel}>Cost breakdown</Text>
          {breakdownEntries.map(([key, value]) => (
            <View key={key} style={s.breakdownRow}>
              <Text style={s.breakdownLabel}>{BREAKDOWN_META[key] ?? key}</Text>
              <Text style={s.breakdownPct}>{fmtPct(value, totalMid)}</Text>
              <Text style={s.breakdownAmount}>{fmtINR(value)}</Text>
            </View>
          ))}
          <View style={s.breakdownRowLast}>
            <Text style={{ ...s.breakdownLabel, fontFamily: "Helvetica-Bold", color: NAVY }}>
              Mid-point total
            </Text>
            <Text style={{ ...s.breakdownAmount, fontSize: 10 }}>{fmtINR(totalMid)}</Text>
          </View>

          <View style={s.spacer} />

          {/* Timeline */}
          <Text style={s.sectionLabel}>Construction timeline</Text>
          {result.timeline.phases.map((phase, i) => (
            <View key={i} style={s.phaseRow}>
              <Text style={s.phaseNumber}>{String(i + 1).padStart(2, "0")}</Text>
              <View style={s.phaseContent}>
                <Text style={s.phaseName}>{phase.name}</Text>
                <Text style={s.phaseDetail}>
                  {Math.round(phase.durationDays / 30)} months · {phase.paymentPercent}% of total
                </Text>
              </View>
              <Text style={s.phaseAmount}>{fmtINR(phase.cost)}</Text>
            </View>
          ))}

          {warnings.length > 0 && (
            <>
              <View style={s.spacer} />
              <Text style={s.sectionLabel}>Cost alerts</Text>
              {warnings.map((w, i) => (
                <View key={i} style={s.warningRow}>
                  <View style={s.warningDot} />
                  <View style={s.warningContent}>
                    <Text style={s.warningTitle}>{w.title}</Text>
                    <Text style={s.warningText}>{w.message}</Text>
                    {w.estimatedImpact && (
                      <Text style={s.warningImpact}>Estimated impact: {w.estimatedImpact}</Text>
                    )}
                  </View>
                </View>
              ))}
            </>
          )}

          {insights.length > 0 && (
            <>
              <View style={s.spacer} />
              <Text style={s.sectionLabel}>Observations</Text>
              {insights.map((ins, i) => (
                <View key={i} style={s.insightRow}>
                  <View style={s.insightDot} />
                  <View style={s.insightContent}>
                    <Text style={s.insightTitle}>{ins.title}</Text>
                    <Text style={s.insightText}>{ins.message}</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Tier comparison */}
          {result.comparisonScenarios && (
            <>
              <View style={s.spacer} />
              <Text style={s.sectionLabel}>What if you changed the finish level?</Text>
              <View style={s.tierGrid}>
                {(["basic", "standard", "premium", "luxury"] as const).map((t) => {
                  const activeRef = input.qualityTier === "ultra-luxury" ? "luxury" : (input.qualityTier ?? "standard");
                  const isActive = t === activeRef;
                  return (
                    <View key={t} style={isActive ? s.tierCardActive : s.tierCard}>
                      <Text style={isActive ? s.tierNameActive : s.tierName}>
                        {tierLabel(t)}
                      </Text>
                      <Text style={isActive ? s.tierAmountActive : s.tierAmount}>
                        {fmtINR(result.comparisonScenarios[t as keyof typeof result.comparisonScenarios])}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* Exclusions disclaimer */}
          <View style={{ marginTop: 20, padding: 12, backgroundColor: "#F5F4F0", borderLeftWidth: 2, borderLeftColor: GOLD }}>
            <Text style={{ fontSize: 7, color: SECONDARY, lineHeight: 1.6 }}>
              This estimate covers construction cost only. It does not include interior design, modular kitchen, furniture, landscaping, architect fees, structural engineer fees, government approval charges, or utility connection costs.
            </Text>
          </View>

          {/* Footer */}
          <View style={s.footer}>
            <View>
              <Text style={s.footerBrand}>Estimato · estimato.in</Text>
              <Text style={s.footerNote}>Rates verified for 2026 · Hosur–Bengaluru belt</Text>
            </View>
            <Text style={s.footerMeta}>
              hello@estimato.in{"\n"}
              This report is for planning purposes only.{"\n"}
              Confidence band ±6%.
            </Text>
          </View>

        </View>
      </Page>
    </Document>
  );
}
