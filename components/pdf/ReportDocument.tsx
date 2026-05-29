import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { CalculationResult, PlannerInput } from "@/types";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-ext-400-normal.woff2",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-ext-600-normal.woff2",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-ext-700-normal.woff2",
      fontWeight: 700,
    },
  ],
});

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

function monthsStr(days: number): string {
  const m = Math.round(days / 30);
  return `${m} ${m === 1 ? "month" : "months"}`;
}

// ─── Colours ──────────────────────────────────────────────────────────────────

const NAVY = "#0E2146";
const GOLD = "#C5A059";
const LIGHT_BG = "#F8F7F4";
const BORDER = "#E2DDD4";
const SECONDARY = "#4A6080";
const TEXT = "#1A1A2E";
const WHITE = "#FFFFFF";
const AMBER = "#C47820";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    backgroundColor: "#FDFCFA",
    paddingTop: 0,
    paddingBottom: 52,
    paddingHorizontal: 0,
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 10,
    color: TEXT,
  },

  // ── Header ──
  header: {
    backgroundColor: NAVY,
    paddingHorizontal: 48,
    paddingVertical: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandName: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 22,
    color: WHITE,
    letterSpacing: 0.5,
  },
  brandDot: {
    color: GOLD,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 9,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 9,
    color: "rgba(255,255,255,0.42)",
  },
  accentLine: {
    height: 3,
    backgroundColor: GOLD,
  },

  // ── Body ──
  body: {
    paddingHorizontal: 48,
    paddingTop: 36,
  },

  // ── Client block ──
  clientName: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 13,
    color: NAVY,
    marginBottom: 5,
  },
  projectMeta: {
    fontSize: 10,
    color: SECONDARY,
    marginBottom: 28,
    lineHeight: 1.45,
  },

  // ── Summary box ──
  summaryBox: {
    backgroundColor: NAVY,
    padding: 26,
    marginBottom: 32,
  },
  summaryLabel: {
    fontSize: 8,
    color: "rgba(255,255,255,0.48)",
    letterSpacing: 2.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  summaryAmount: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 32,
    color: WHITE,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  summaryRule: {
    height: 2,
    backgroundColor: GOLD,
    width: 40,
    marginBottom: 14,
    opacity: 0.75,
  },
  summaryMeta: {
    flexDirection: "row",
    gap: 28,
  },
  summaryMetaItem: {
    fontSize: 9,
    color: "rgba(255,255,255,0.58)",
  },
  summaryMetaValue: {
    fontFamily: "Inter",
    fontWeight: 600,
    color: "rgba(255,255,255,0.92)",
  },

  // ── Section header ──
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: GOLD,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },

  // ── Cost breakdown ──
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  breakdownRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1.5,
    borderTopColor: NAVY,
    marginTop: 6,
  },
  breakdownLabel: {
    fontSize: 10,
    color: TEXT,
    flex: 1,
  },
  breakdownPct: {
    fontSize: 9,
    color: SECONDARY,
    width: 36,
    textAlign: "right",
  },
  breakdownAmount: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 10,
    color: NAVY,
    width: 72,
    textAlign: "right",
  },

  // ── Timeline ──
  phaseRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 14,
    alignItems: "flex-start",
  },
  phaseNumber: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 1,
    color: GOLD,
    width: 22,
    marginTop: 1,
  },
  phaseContent: { flex: 1 },
  phaseName: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10,
    color: NAVY,
    marginBottom: 3,
  },
  phaseDetail: {
    fontSize: 9,
    color: SECONDARY,
  },
  phaseAmount: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 10,
    color: NAVY,
    textAlign: "right",
    width: 64,
  },

  // ── Cost alerts ──
  warningRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 12,
    alignItems: "flex-start",
  },
  warningDot: {
    width: 6,
    height: 6,
    backgroundColor: AMBER,
    borderRadius: 3,
    marginTop: 4,
    flexShrink: 0,
  },
  warningContent: { flex: 1 },
  warningTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10,
    color: TEXT,
    marginBottom: 3,
  },
  warningText: {
    fontSize: 9,
    color: SECONDARY,
    lineHeight: 1.6,
  },
  warningImpact: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 8,
    color: AMBER,
    marginTop: 4,
  },

  // ── Observations ──
  insightRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 12,
    alignItems: "flex-start",
  },
  insightDot: {
    width: 6,
    height: 6,
    backgroundColor: GOLD,
    borderRadius: 3,
    marginTop: 4,
    flexShrink: 0,
  },
  insightContent: { flex: 1 },
  insightTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10,
    color: TEXT,
    marginBottom: 3,
  },
  insightText: {
    fontSize: 9,
    color: SECONDARY,
    lineHeight: 1.6,
  },

  // ── Tier comparison ──
  tierGrid: {
    flexDirection: "row",
    gap: 8,
  },
  tierCard: {
    flex: 1,
    padding: 14,
    backgroundColor: LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER,
  },
  tierCardActive: {
    flex: 1,
    padding: 14,
    backgroundColor: NAVY,
  },
  tierName: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: SECONDARY,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  tierNameActive: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: "rgba(255,255,255,0.58)",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  tierAmount: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 12,
    color: NAVY,
  },
  tierAmountActive: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 12,
    color: WHITE,
  },

  // ── Disclaimer ──
  disclaimer: {
    marginTop: 24,
    padding: 14,
    backgroundColor: "#F2F0EB",
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
  },
  disclaimerText: {
    fontSize: 8,
    color: SECONDARY,
    lineHeight: 1.7,
  },

  // ── Footer ──
  footer: {
    marginTop: 44,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerBrand: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
    color: NAVY,
    marginBottom: 3,
  },
  footerNote: {
    fontSize: 8,
    color: "#9CA3AF",
  },
  footerMeta: {
    fontSize: 8,
    color: SECONDARY,
    textAlign: "right",
    lineHeight: 1.7,
  },

  spacer: { height: 32 },
  spacerSm: { height: 16 },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={s.sectionHeaderRow}>
      <Text style={s.sectionLabel}>{label}</Text>
      <View style={s.sectionRule} />
    </View>
  );
}

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
      subject={`Construction cost estimate for ${ht} in ${city}`}
    >
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.brandName}>
            estimato<Text style={s.brandDot}>.</Text>
          </Text>
          <View style={s.headerRight}>
            <Text style={s.headerTitle}>Construction Cost Report</Text>
            <Text style={s.headerDate}>{today()}</Text>
          </View>
        </View>
        <View style={s.accentLine} />

        <View style={s.body}>

          {/* ── Client block ── */}
          <Text style={s.clientName}>{name}</Text>
          <Text style={s.projectMeta}>
            {ht} · {city} · {sqft.toLocaleString("en-IN")} sqft · G+{floors - 1} · {tier} finish
          </Text>

          {/* ── Summary box ── */}
          <View style={s.summaryBox}>
            <Text style={s.summaryLabel}>Estimated Total Cost</Text>
            <Text style={s.summaryAmount}>
              {fmtINR(result.totalRange.min)} – {fmtINR(result.totalRange.max)}
            </Text>
            <View style={s.summaryRule} />
            <View style={s.summaryMeta}>
              <Text style={s.summaryMetaItem}>
                Cost per sqft:{" "}
                <Text style={s.summaryMetaValue}>
                  ₹{result.costPerSqft.toLocaleString("en-IN")}
                </Text>
              </Text>
              <Text style={s.summaryMetaItem}>
                Timeline:{" "}
                <Text style={s.summaryMetaValue}>
                  {monthsStr(result.timeline.totalDays)}
                </Text>
              </Text>
              <Text style={s.summaryMetaItem}>
                Confidence: <Text style={s.summaryMetaValue}>±6%</Text>
              </Text>
            </View>
          </View>

          {/* ── Cost Breakdown ── */}
          <SectionHeader label="Cost Breakdown" />
          {breakdownEntries.map(([key, value]) => (
            <View key={key} style={s.breakdownRow}>
              <Text style={s.breakdownLabel}>{BREAKDOWN_META[key] ?? key}</Text>
              <Text style={s.breakdownPct}>{fmtPct(value, totalMid)}</Text>
              <Text style={s.breakdownAmount}>{fmtINR(value)}</Text>
            </View>
          ))}
          <View style={s.breakdownRowLast}>
            <Text style={{ ...s.breakdownLabel, fontFamily: "Inter", fontWeight: 700, color: NAVY }}>
              Mid-point total
            </Text>
            <Text style={{ ...s.breakdownAmount, fontSize: 11 }}>
              {fmtINR(totalMid)}
            </Text>
          </View>

          <View style={s.spacer} />

          {/* ── Construction Timeline ── */}
          <SectionHeader label="Construction Timeline" />
          {result.timeline.phases.map((phase, i) => (
            <View key={i} style={s.phaseRow}>
              <Text style={s.phaseNumber}>{String(i + 1).padStart(2, "0")}</Text>
              <View style={s.phaseContent}>
                <Text style={s.phaseName}>{phase.name}</Text>
                <Text style={s.phaseDetail}>
                  {monthsStr(phase.durationDays)} · {phase.paymentPercent}% of total
                </Text>
              </View>
              <Text style={s.phaseAmount}>{fmtINR(phase.cost)}</Text>
            </View>
          ))}

          {/* ── Cost Alerts ── */}
          {warnings.length > 0 && (
            <>
              <View style={s.spacer} />
              {/* wrap=false keeps label with first item — prevents orphaned header */}
              <View wrap={false}>
                <SectionHeader label="Cost Alerts" />
                <View style={s.warningRow}>
                  <View style={s.warningDot} />
                  <View style={s.warningContent}>
                    <Text style={s.warningTitle}>{warnings[0].title}</Text>
                    <Text style={s.warningText}>{warnings[0].message}</Text>
                    {warnings[0].estimatedImpact && (
                      <Text style={s.warningImpact}>
                        Estimated impact: {warnings[0].estimatedImpact}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {warnings.slice(1).map((w, i) => (
                <View key={i} style={s.warningRow}>
                  <View style={s.warningDot} />
                  <View style={s.warningContent}>
                    <Text style={s.warningTitle}>{w.title}</Text>
                    <Text style={s.warningText}>{w.message}</Text>
                    {w.estimatedImpact && (
                      <Text style={s.warningImpact}>
                        Estimated impact: {w.estimatedImpact}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </>
          )}

          {/* ── Observations ── */}
          {insights.length > 0 && (
            <>
              <View style={s.spacer} />
              <View wrap={false}>
                <SectionHeader label="Observations" />
                <View style={s.insightRow}>
                  <View style={s.insightDot} />
                  <View style={s.insightContent}>
                    <Text style={s.insightTitle}>{insights[0].title}</Text>
                    <Text style={s.insightText}>{insights[0].message}</Text>
                  </View>
                </View>
              </View>
              {insights.slice(1).map((ins, i) => (
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

          {/* ── Finish Level Comparison ── */}
          {result.comparisonScenarios && (
            <>
              <View style={s.spacer} />
              <View wrap={false}>
                <SectionHeader label="What If You Changed the Finish Level?" />
                <View style={s.tierGrid}>
                  {(["basic", "standard", "premium", "luxury"] as const).map((t) => {
                    const activeRef =
                      input.qualityTier === "ultra-luxury"
                        ? "luxury"
                        : (input.qualityTier ?? "standard");
                    const isActive = t === activeRef;
                    return (
                      <View key={t} style={isActive ? s.tierCardActive : s.tierCard}>
                        <Text style={isActive ? s.tierNameActive : s.tierName}>
                          {tierLabel(t)}
                        </Text>
                        <Text style={isActive ? s.tierAmountActive : s.tierAmount}>
                          {fmtINR(
                            result.comparisonScenarios[
                              t as keyof typeof result.comparisonScenarios
                            ]
                          )}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </>
          )}

          {/* ── Disclaimer ── */}
          <View style={s.disclaimer}>
            <Text style={s.disclaimerText}>
              This estimate covers construction cost only. It does not include interior design,
              modular kitchen, furniture, landscaping, architect fees, structural engineer fees,
              government approval charges, or utility connection costs.
            </Text>
          </View>

          {/* ── Footer ── */}
          <View style={s.footer}>
            <View>
              <Text style={s.footerBrand}>Estimato · estimato.in</Text>
              <Text style={s.footerNote}>
                Rates verified for 2026 · Hosur–Bengaluru belt
              </Text>
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
