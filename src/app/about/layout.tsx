import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Indian Solar Green Energy",
  description: "Learn about Indian Solar Green Energy, the leading provider of residential, commercial, and industrial solar panel installations in Gorakhpur, UP.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
