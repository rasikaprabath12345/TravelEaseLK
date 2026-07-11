import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Browse handpicked Sri Lanka tour packages — from cultural journeys and wildlife safaris to beach escapes and highland adventures.",
  openGraph: {
    title: "Sri Lanka Tour Packages | TravelEase LK",
    description: "Find the perfect Sri Lanka tour package tailored to your travel style.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
