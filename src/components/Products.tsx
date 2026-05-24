"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import PillTag from "@/components/ui/PillTag";

const slides = [
  { image: "/images/residential-solar.jpg", alt: "Residential solar" },
  { image: "/images/rooftop-solar.jpg", alt: "Rooftop solar" },
  { image: "/images/commercial-solar.jpg", alt: "Commercial solar" },
  { image: "/images/about-solar.jpg", alt: "Solar panels" },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? slides.length - 1 : a - 1));
  const next = () => setActive((a) => (a === slides.length - 1 ? 0 : a + 1));

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

          <div className="flex gap-4 shrink-0 mt-6 md:mt-0 pb-4">
            <button
              type="button"
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-forest hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {slides.map((slide, i) => (
            <motion.div
              key={slide.alt}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`h-[220px] md:h-[320px] lg:h-[380px] rounded-[20px] overflow-hidden relative bg-[#c8d5cc] transition-all duration-300 ${
                i === active ? "ring-2 ring-white/40" : ""
              }`}
            >
              {i === active ? (
                <>
                  <Image src={slide.image} alt={slide.alt} fill className="object-cover" />
                  <div className="absolute right-4 bottom-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7v8" />
                    </svg>
                  </div>
                </>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
