import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Indian Solar Green Energy",
  description: "Get in touch with Indian Solar Green Energy for a free solar installation quote in Gorakhpur. Call us or fill out our form today.",
  alternates: {
    canonical: "https://indiansolargreenenergy.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
