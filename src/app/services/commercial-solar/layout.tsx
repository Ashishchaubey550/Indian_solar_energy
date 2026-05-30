import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Solar Panel Installation | Indian Solar Green Energy",
  description: "Reduce operational costs and increase sustainability with our tailored commercial solar panel solutions in Gorakhpur and surrounding areas.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/services/commercial-solar",
  },
};

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
