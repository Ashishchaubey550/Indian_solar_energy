import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Solar Panel Installation | Indian Solar Green Energy",
  description: "Cut your home electricity bills by up to 90% with our premium residential rooftop solar panel systems in Gorakhpur, UP.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services/residential-solar",
  },
};

export default function ResidentialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
