import type { HomeType } from "@/types";

export const HOME_TYPES: {
  value: HomeType;
  label: string;
  range: string;
  sqftRange: string;
  description: string;
}[] = [
  {
    value: "villa",
    label: "Villa",
    range: "₹50L–1.2Cr typical",
    sqftRange: "1,500–3,000 sqft",
    description: "Independent house with garden, single or double floor",
  },
  {
    value: "duplex",
    label: "Duplex",
    range: "₹40L–90L typical",
    sqftRange: "1,200–2,400 sqft",
    description: "Two-level home with internal staircase",
  },
  {
    value: "farmhouse",
    label: "Farmhouse",
    range: "₹35L–1.5Cr typical",
    sqftRange: "1,000–4,000 sqft",
    description: "Open layout on agricultural land, informal style",
  },
  {
    value: "contemporary",
    label: "Contemporary Home",
    range: "₹45L–1Cr typical",
    sqftRange: "1,400–2,800 sqft",
    description: "Modern design with flat roof and clean lines",
  },
  {
    value: "budget",
    label: "Budget Home",
    range: "₹25L–50L typical",
    sqftRange: "800–1,500 sqft",
    description: "Practical, durable, minimal frills",
  },
  {
    value: "luxury-villa",
    label: "Luxury Villa",
    range: "₹1.2Cr–3Cr typical",
    sqftRange: "2,500–5,000 sqft",
    description: "Architect-designed, premium materials throughout",
  },
];
