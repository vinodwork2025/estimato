import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { TIER_RATES } from "@/lib/cost-engine/rates";
import { SEED_PARTNERS } from "@/data/partners";
import { HosurPlannerCTA } from "@/app/construction-cost/hosur/HosurPlannerCTA";
import { PLOT_PAGES } from "@/lib/data/hosur-plot-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(PLOT_PAGES).map((size) => ({ size }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  const config = PLOT_PAGES[params.size];
  if (!config) return {};
  const pageUrl = `${SITE_URL}/construction-cost/hosur/${config.slug}`;
  return {
    title: config.title,
    description: config.metaDesc,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: config.title,
      description: config.metaDesc,
      url: pageUrl,
      type: "website",
      siteName: "Estimato",
      locale: "en_IN",
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRate(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtLakh(rupees: number): string {
  const l = rupees / 100000;
  return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
}

// ─── Rate tier rows (per-sqft rates stay constant across all plot pages) ──────

const RATE_TIERS = [
  {
    key: "basic" as const,
    label: "Basic",
    badge: null,
    description: "Functional construction. Standard local materials and fittings. No branded items.",
  },
  {
    key: "standard" as const,
    label: "Standard",
    badge: "Most common",
    description: "Branded fittings, better flooring. The choice for most Hosur homeowners.",
  },
  {
    key: "premium" as const,
    label: "Premium",
    badge: null,
    description: "Quality materials throughout. Somany, Jaquar, Legrand fittings.",
  },
  {
    key: "luxury" as const,
    label: "Luxury",
    badge: null,
    description: "High-end finishes. Italian marble, Kohler sanitary, architect-level detail.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlotSizePage({ params }: { params: { size: string } }) {
  const config = PLOT_PAGES[params.size];
  if (!config) notFound();

  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;
  const pageUrl = `${SITE_URL}/construction-cost/hosur/${config.slug}`;
  const sourcePage = `hosur-plot-${config.slug}`;

  const faqItems: FAQItem[] = config.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Estimato",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: "Construction cost intelligence platform for Indian homeowners.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Construction Cost",
          item: `${SITE_URL}/construction-cost`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Hosur",
          item: `${SITE_URL}/construction-cost/hosur`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: `${config.display} House Cost`,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: config.title,
      description: config.metaDesc,
      url: pageUrl,
      inLanguage: "en-IN",
      publisher: {
        "@type": "Organization",
        name: "Estimato",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Hosur Construction Cost Estimator",
      url: `${SITE_URL}/plan`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "Free construction cost estimator for Hosur homeowners. Pre-filled for your plot size.",
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <SiteHeader
        ctaLabel="Get my estimate →"
        ctaHref={`/plan?city=hosur&from=${sourcePage}`}
        maxWidth="max-w-5xl"
      />

      <main className="bg-bg-primary">

        {/* ── HERO + QUICK ANSWER ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link
                href="/"
                className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: "var(--text-tertiary)" }}
              >
                Estimato
              </Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link
                href="/construction-cost/hosur"
                className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: "var(--text-tertiary)" }}
              >
                Hosur
              </Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--text-primary)" }}
              >
                {config.display}
              </span>
            </nav>

            {/* Eyebrow */}
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              {config.eyebrow}
            </p>

            {/* H1 */}
            <h1
              className="font-serif mb-4"
              style={{
                fontSize: "clamp(32px, 5.5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                color: "var(--text-primary)",
              }}
            >
              {config.headline}
            </h1>

            <p
              className="font-sans mb-8"
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "600px",
              }}
            >
              {config.lead}
            </p>

            {/* Quick Answer */}
            <div
              className="rounded-sm p-6 md:p-8"
              style={{
                border: "1.5px solid var(--accent)",
                background: "rgba(196,154,60,0.04)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--accent)" }}
              >
                Quick answer
              </p>
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(15px, 2vw, 17px)",
                  lineHeight: 1.8,
                  color: "var(--text-primary)",
                }}
              >
                Building a {config.display} house in Hosur in 2026 costs between{" "}
                <strong>{fmtLakh(config.quickAnswerStd.min)}</strong> and{" "}
                <strong>{fmtLakh(config.quickAnswerStd.max)}</strong> at standard quality,
                for a {config.floorLabel} with {config.bua.toLocaleString("en-IN")} sqft of built-up area.
                Hosur standard rate: <strong>{fmtRate(TIER_RATES.standard.min)}–{fmtRate(TIER_RATES.standard.max)} per sqft</strong>.
                The plot is {config.plotSqft.toLocaleString("en-IN")} sqft ({config.L}×{config.W} feet).
              </p>
            </div>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── RATE BANDS ──────────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="rate-bands-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              {config.display} plot · Hosur · {config.floorLabel} · {config.bua.toLocaleString("en-IN")} sqft BUA
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Cost by quality tier
            </h2>
            <p
              className="font-sans mb-10"
              style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}
            >
              Ranges computed from verified Hosur rates × {config.bua.toLocaleString("en-IN")} sqft built-up area.
              All figures are civil construction only — interiors billed separately.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_TIERS.map(({ key, label, badge, description }) => {
              const perSqft = TIER_RATES[key];
              const range = config.tierRanges[key];
              return (
                <StaggerItem key={key}>
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p
                          className="font-serif"
                          style={{
                            fontSize: "22px",
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--text-primary)",
                          }}
                        >
                          {label}
                        </p>
                        {badge && (
                          <span
                            className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                            style={{
                              background: "rgba(196,154,60,0.12)",
                              color: "var(--accent)",
                              borderRadius: "2px",
                            }}
                          >
                            {badge}
                          </span>
                        )}
                      </div>
                      <p
                        className="font-mono tabular-nums"
                        style={{
                          fontSize: "clamp(18px, 2.5vw, 22px)",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          color: "var(--text-primary)",
                        }}
                      >
                        <strong>{fmtLakh(range.min)}</strong>
                        <span
                          className="font-mono"
                          style={{ fontSize: "14px", color: "var(--text-tertiary)", margin: "0 6px" }}
                        >
                          –
                        </span>
                        <strong>{fmtLakh(range.max)}</strong>
                      </p>
                      <p
                        className="font-mono"
                        style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
                      >
                        {fmtRate(perSqft.min)}–{fmtRate(perSqft.max)}/sqft × {config.bua.toLocaleString("en-IN")} sqft
                      </p>
                    </div>
                    <div className="md:pt-1">
                      <p
                        className="font-sans"
                        style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65 }}
                      >
                        {description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 md:justify-end">
                      <div
                        className="w-full md:w-32 h-1 rounded-full overflow-hidden"
                        style={{ background: "var(--border)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.round((perSqft.mid / 5000) * 100)}%`,
                            background: "var(--accent)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}

            {/* Ultra Luxury — no figure, lead CTA */}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                <div>
                  <p
                    className="font-serif mb-1"
                    style={{
                      fontSize: "22px",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "var(--text-primary)",
                    }}
                  >
                    Ultra Luxury
                  </p>
                  <p className="font-mono" style={{ fontSize: "16px", color: "var(--text-tertiary)" }}>
                    Custom quote
                  </p>
                  <p className="font-mono" style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                    ₹5,000+ per sqft
                  </p>
                </div>
                <div className="md:pt-1">
                  <p
                    className="font-sans mb-3"
                    style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65 }}
                  >
                    Imported stone, Kohler or Duravit sanitary, Lutron lighting.
                    No standard rate applies — priced from a full design brief.
                  </p>
                  <Link
                    href={`/plan?city=hosur&from=${sourcePage}-ultra`}
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}
                  >
                    Speak to Design Intend
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path
                        d="M1 4h9M7 1l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="flex items-center gap-3 md:justify-end">
                  <div
                    className="w-full md:w-32 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--border)" }}
                  >
                    <div className="h-full rounded-full" style={{ width: "100%", background: "var(--accent)" }} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* BOQ credibility statement */}
          <AnimateIn direction="up" delay={0.1}>
            <p
              className="font-mono mt-8 pt-6 border-t border-border"
              style={{ fontSize: "12px", color: "var(--text-tertiary)", lineHeight: 1.7 }}
            >
              "Rates built from real project BOQs and verified against current Hosur and
              Bangalore contractor quotes, 2026"
            </p>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── CALCULATOR CTA ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <HosurPlannerCTA sourcePage={sourcePage} plotL={config.L} plotW={config.W} />
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── CONTENT BODY ────────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="content-heading"
        >
          <AnimateIn direction="up">
            <h2
              id="content-heading"
              className="font-serif mb-8"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              What to know about a {config.display} plot in Hosur
            </h2>
            <div
              className="space-y-6"
              style={{ maxWidth: "680px" }}
            >
              {config.body.map((para, i) => (
                <p
                  key={i}
                  className="font-sans"
                  style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--text-secondary)" }}
                >
                  {para}
                </p>
              ))}
              <p
                className="font-mono"
                style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
              >
                As of 2026. Hosur Town Municipality (HTM) jurisdiction. Rates verified against current BOQs.
              </p>
            </div>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="faq-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="font-serif mb-10"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              {config.display} plot in Hosur
            </h2>
          </AnimateIn>
          <FAQBlock items={faqItems} schemaId={`hosur-plot-${config.slug}-faq`} />
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── PARTNER CARD ────────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="partner-heading"
        >
          <AnimateIn direction="up">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Hosur exclusive partner
            </p>
            <h2
              id="partner-heading"
              className="font-serif mb-8"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Verified architect on the ground
            </h2>

            <div
              className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start"
              style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "24px",
                      fontWeight: 400,
                      letterSpacing: "-0.015em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {partner.name}
                  </p>
                  {partner.isFounding && (
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5"
                      style={{
                        background: "rgba(196,154,60,0.12)",
                        color: "var(--accent)",
                        borderRadius: "2px",
                      }}
                    >
                      Founding partner
                    </span>
                  )}
                </div>

                <p
                  className="font-sans mb-4"
                  style={{ fontSize: "14px", color: "var(--accent)", lineHeight: 1.5 }}
                >
                  {partner.tagline}
                </p>

                <p
                  className="font-sans mb-6"
                  style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}
                >
                  Led by {partner.founderName}. {partner.founderBio} Exclusive
                  territory: Hosur, Sarjapura, Attibele, Bagalur, and Krishnagiri.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
                    style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${partner.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors hover:border-navy hover:text-navy"
                    style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}
                  >
                    Email
                  </a>
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors hover:border-navy hover:text-navy"
                      style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}
                    >
                      Website ↗
                    </a>
                  )}
                </div>
              </div>

              <div
                className="rounded-sm p-5"
                style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Services
                </p>
                {[
                  "Architecture & design",
                  "HTM approval support",
                  "Structural drawings",
                  "Turnkey construction",
                  "Interior fit-out",
                  "Project management",
                ].map((s) => (
                  <p
                    key={s}
                    className="font-mono py-2 border-b last:border-b-0"
                    style={{
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      borderColor: "rgba(196,154,60,0.12)",
                    }}
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* ── INTERNAL LINKS ──────────────────────────────────────────────── */}
        <section
          className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20"
          aria-labelledby="related-heading"
        >
          <AnimateIn direction="up">
            <h2
              id="related-heading"
              className="font-serif mb-8"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Related pages
            </h2>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.internalLinks.map((link) => (
              <StaggerItem key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {link.eyebrow}
                  </p>
                  <p
                    className="font-serif mb-2 group-hover:text-navy transition-colors"
                    style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}
                  >
                    {link.title}
                  </p>
                  <p
                    className="font-sans"
                    style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}
                  >
                    {link.desc}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ──────────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4"
                style={{ color: "rgba(196,154,60,0.85)" }}
              >
                Free · No sign-up · Under 2 minutes
              </p>
              <h2
                className="font-serif mb-4"
                style={{
                  fontSize: "clamp(28px, 4.5vw, 48px)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "#FFFFFF",
                }}
              >
                Get your {config.display} estimate
              </h2>
              <p
                className="font-sans mb-8 mx-auto"
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: "480px",
                }}
              >
                Your plot dimensions are pre-filled. Five questions and you get a
                cost range, material list, and payment timeline — built from Hosur BOQs.
              </p>
              <Link
                href={`/plan?city=hosur&type=contemporary&length=${config.L}&width=${config.W}&from=${sourcePage}`}
                className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}
              >
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
