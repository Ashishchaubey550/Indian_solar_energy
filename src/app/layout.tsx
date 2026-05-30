import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import LeadGenModal from "@/components/LeadGenModal";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Indian Solar Green Energy | #1 Solar Panel Installation in Gorakhpur",
  description:
    "Indian Solar Green Energy provides affordable solar panel installation, rooftop solar systems, and green energy solutions in Gorakhpur, UP. Save up to 90% on electricity bills. Get a free quotation today!",
  keywords: [
    "solar panel installation Gorakhpur",
    "solar energy Gorakhpur",
    "rooftop solar system",
    "green energy solutions",
    "solar panel price Gorakhpur",
    "best solar company Gorakhpur",
    "residential solar panels",
    "commercial solar installation",
    "Indian Solar Green Energy",
    "solar power UP",
  ],
  authors: [{ name: "Indian Solar Green Energy" }],
  creator: "Indian Solar Green Energy",
  metadataBase: new URL("https://indiansolargreenenergy.com"),
  openGraph: {
    title: "Indian Solar Green Energy | Solar Panel Installation Gorakhpur",
    description:
      "Save up to 90% on electricity bills with premium solar solutions. #1 rated solar installer in Gorakhpur.",
    url: "https://indiansolargreenenergy.com",
    siteName: "Indian Solar Green Energy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-solar.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Solar Green Energy - Solar Panel Installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Solar Green Energy | Solar Panel Installation Gorakhpur",
    description:
      "Save up to 90% on electricity bills with premium solar solutions.",
    images: ["/images/hero-solar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://indiansolargreenenergy.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Indian Solar Green Energy",
    image: "https://indiansolargreenenergy.com/images/logo.png",
    description:
      "Leading solar panel installation company in Gorakhpur providing affordable green energy solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gorakhpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    url: "https://indiansolargreenenergy.com",
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-18:00",
    sameAs: [],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[var(--font-inter)] antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
          <LeadGenModal />
          <ScrollToTop />
          <CustomCursor />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
