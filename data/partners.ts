import type { Partner } from "@/types";

export const SEED_PARTNERS: Partner[] = [
  {
    id: "design-intend",
    slug: "design-intend",
    name: "Design Intend",
    tagline: "Premium architecture and turnkey construction studio",
    founderName: "Ar. Chittrarasan",
    founderBio:
      "Architect with experience at Gensler on Chase Bank, Starbucks, and GMFI projects. Leading Design Intend's architecture and turnkey construction practice across Hosur and Bengaluru.",
    founderPhotoUrl: "/images/partners/chittrarasan.jpg",
    logoUrl: "/images/partners/design-intend-logo.svg",
    websiteUrl: "https://designintend.com",
    whatsappNumber: "+917397606382",
    email: "vinod@estimato.in",
    exclusiveCities: ["hosur", "bangalore-outskirts", "bangalore-urban", "sarjapura", "attibele", "bagalur", "krishnagiri"],
    status: "active",
    perLeadPrice: 3000,
    isFounding: true,
  },
];

export const EXCLUSIVE_CITIES_MAP: Record<string, string> = {
  hosur: "design-intend",
  sarjapura: "design-intend",
  attibele: "design-intend",
  bagalur: "design-intend",
  krishnagiri: "design-intend",
};

export const UNASSIGNED_CITIES = [
  "bengaluru-urban",
  "whitefield",
  "electronic-city",
  "yelahanka",
  "devanahalli",
  "bengaluru-rural",
  "anekal",
];
