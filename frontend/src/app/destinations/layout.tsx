import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Sri Lanka's most iconic destinations — from Sigiriya's ancient rock fortress and Ella's misty hills to Galle's colonial fort and pristine beaches.",
  openGraph: {
    title: "Destinations in Sri Lanka | TravelEase LK",
    description: "Discover must-visit destinations across Sri Lanka with TravelEase LK.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
