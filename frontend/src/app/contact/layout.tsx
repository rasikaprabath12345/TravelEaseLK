import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with TravelEase LK. We're here to help you plan the perfect Sri Lanka trip — reach out via phone, email, or WhatsApp.",
  openGraph: {
    title: "Contact TravelEase LK",
    description: "Reach out to TravelEase LK and let us plan your dream Sri Lanka trip.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
