import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Blogs",
  description:
    "Explore expert travel guides, local tips, hidden gems, and itineraries across Sri Lanka — written by experienced travelers and local experts.",
  openGraph: {
    title: "Sri Lanka Travel Blogs | TravelEase LK",
    description: "Discover Sri Lanka through insider guides, travel stories, and curated itineraries.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
