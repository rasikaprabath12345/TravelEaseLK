import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TravelEase LK — our story, mission, and the local team behind Sri Lanka's most trusted travel experience platform.",
  openGraph: {
    title: "About TravelEase LK",
    description: "Meet the passionate team crafting unforgettable Sri Lanka travel experiences.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
