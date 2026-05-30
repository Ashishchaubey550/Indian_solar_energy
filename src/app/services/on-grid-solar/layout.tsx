import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On-Grid Solar Systems | Indian Solar Green Energy",
  description: "Grid-tied solar systems that allow you to save money and export excess electricity back to the grid. Expert installation in Gorakhpur.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services/on-grid-solar",
  },
};

export default function OnGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
