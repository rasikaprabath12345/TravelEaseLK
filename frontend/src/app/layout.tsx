import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// Load Inter with display=swap for no layout shift
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// ─── Global Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "TravelEase LK — Sri Lanka's Premier Travel Experience",
    template: "%s | TravelEase LK",
  },
  description:
    "Discover Sri Lanka with handpicked tour packages, expert-guided itineraries, and unforgettable experiences — from wildlife safaris to beach escapes.",
  keywords: [
    "Sri Lanka tours",
    "Sri Lanka travel",
    "travel packages Sri Lanka",
    "Sigiriya",
    "Ella",
    "Galle",
    "wildlife safari Sri Lanka",
    "beach holidays Sri Lanka",
  ],
  authors: [{ name: "TravelEase LK" }],
  creator: "TravelEase LK",
  metadataBase: new URL("https://traveleaselk.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://traveleaselk.com",
    siteName: "TravelEase LK",
    title: "TravelEase LK — Sri Lanka's Premier Travel Experience",
    description:
      "Handpicked Sri Lanka tour packages, destinations, and travel guides crafted by local experts.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TravelEase LK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelEase LK",
    description: "Sri Lanka's premier travel experience platform.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ─── Viewport ────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("scroll-smooth", inter.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <WhatsAppButton />
      </body>
    </html>
  );
}