import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://traveleaselk.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/packages`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/blogs`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
