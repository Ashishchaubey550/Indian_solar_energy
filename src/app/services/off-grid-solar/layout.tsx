import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Off-Grid Solar Systems | Indian Solar Green Energy",
  description: "Gain complete energy independence with our reliable off-grid solar systems featuring advanced battery storage for 24/7 power in UP.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services/off-grid-solar",
  },
};

export default function OffGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
