"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PillTag from "@/components/ui/PillTag";

const slides = [
  { image: "/images/residential_solar_product.png", alt: "Residential solar", title: "Residential Solar", link: "/services/residential-solar" },
  { image: "/images/commercial_solar_product.png", alt: "Commercial solar", title: "Commercial Solar", link: "/services/commercial-solar" },
  { image: "/images/industrial_solar_product.png", alt: "Industrial solar", title: "Industrial Solar", link: "/services/industrial-solar" },
  { image: "/images/agricultural_solar_product.png", alt: "Off-Grid Solar", title: "Off-Grid Solar", link: "/services/off-grid-solar" },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="py-20 md:py-28 bg-forest" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <PillTag variant="dark" className="mb-6 uppercase tracking-wider text-xs font-semibold">
              Products
            </PillTag>
            <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight max-w-[650px]">
              Affordable Solar Energy Solution For Every Needs
            </h2>
            <p className="mt-5 text-white/70 text-[15px] leading-relaxed max-w-lg">
              We provide high-quality solar panels and energy solutions designed to fit every budget and roof type for maximum savings.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {slides.map((slide, i) => (
            <Link href={slide.link} key={slide.alt} className="block group h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`h-[280px] md:h-[320px] lg:h-[380px] rounded-[20px] overflow-hidden relative bg-[#c8d5cc] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl`}
              >
                <Image src={slide.image} alt={slide.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute left-6 bottom-6 right-16">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{slide.title}</h3>
                </div>
                <div className="absolute right-4 bottom-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7v8" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
