"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Features />
        <Services />
        <CTA />
        <Calculator />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
