import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Services | Indian Solar Green Energy",
  description: "Explore our range of solar solutions including residential, commercial, industrial, on-grid, off-grid, and hybrid solar systems in Gorakhpur.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
