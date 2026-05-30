import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Solar Installations | Indian Solar Green Energy",
  description: "High-capacity, robust industrial solar power plants designed for manufacturing and heavy industries in UP. Maximize ROI and energy independence.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services/industrial-solar",
  },
};

export default function IndustrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
