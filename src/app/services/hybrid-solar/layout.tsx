import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hybrid Solar Solutions | Indian Solar Green Energy",
  description: "Get the best of both worlds with our hybrid solar systems. Save on bills and enjoy uninterrupted power during outages in Gorakhpur.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services/hybrid-solar",
  },
};

export default function HybridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
