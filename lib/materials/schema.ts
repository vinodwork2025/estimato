export function formatMonthYear(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${MONTHS[month - 1]} ${year}`;
}

export function nextMonthYear(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const nm = month === 12 ? 1 : month + 1;
  const ny = month === 12 ? year + 1 : year;
  return `${MONTHS[nm - 1]} ${ny}`;
}

export function buildDatasetSchema({
  cityLabel,
  cityState,
  latestDate,
  pageUrl,
  materials,
}: {
  cityLabel: string;
  cityState: string;
  latestDate: string;
  pageUrl: string;
  materials: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Building Material Prices in ${cityLabel} — ${formatMonthYear(latestDate)}`,
    description: `Current construction material rates in ${cityLabel}, ${cityState}: cement, TMT steel, M-sand, river sand, aggregates, bricks, and concrete blocks. Updated monthly from verified supplier procurement records. Prices ex-dealer, excluding GST and transport.`,
    url: pageUrl,
    dateModified: latestDate,
    creator: {
      "@type": "Organization",
      name: "Estimato",
      url: "https://estimato.in",
    },
    spatialCoverage: {
      "@type": "Place",
      name: cityLabel,
      addressRegion: cityState,
      addressCountry: "IN",
    },
    variableMeasured: materials.map((m) => ({
      "@type": "PropertyValue",
      name: m,
    })),
    license: "https://creativecommons.org/licenses/by/4.0/",
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
