import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: "weekly", lastModified: today },
    { url: `${BASE}/plan`, priority: 0.9, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur`, priority: 0.9, changeFrequency: "weekly", lastModified: today },
    { url: `${BASE}/for-architects`, priority: 0.7, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/methodology`, priority: 0.6, changeFrequency: "monthly", lastModified: today },
    // Hosur plot size pages
    { url: `${BASE}/construction-cost/hosur/20x30`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/30x40`, priority: 0.9, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/30x50`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/40x60`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/20x40`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/30x30`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/40x40`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/50x80`, priority: 0.7, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/30x60`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/40x50`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/25x40`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/construction-cost/hosur/60x40`, priority: 0.7, changeFrequency: "monthly", lastModified: today },
    // Hosur home type pages
    { url: `${BASE}/villa-construction-cost/hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/duplex-construction-cost/hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/independent-house-construction-cost/hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    // Hosur budget pages
    { url: `${BASE}/40-lakh-house-hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/50-lakh-house-hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/60-lakh-house-hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${BASE}/1-crore-house-hosur`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
  ];

  return urls;
}
