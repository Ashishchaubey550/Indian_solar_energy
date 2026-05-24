"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const items = [
  {
    num: "1",
    title: "Certified & Experienced Engineers",
    desc: "Every installation is handled by licensed specialists with proven expertise.",
  },
  {
    num: "2",
    title: "High-Efficiency Solar Systems",
    desc: "Our panels deliver maximum output with smart optimization for any climate.",
  },
  {
    num: "3",
    title: "End-to-End Energy Solutions",
    desc: "From consultation to maintenance, we provide full project support.",
  },
  {
    num: "4",
    title: "Transparent & Affordable Pricing",
    desc: "Clear pricing with no hidden costs and complete customer satisfaction.",
  },
];

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.7 }}
           className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#0f2e1a] bg-white border border-[#0f2e1a]/20 mb-6 shadow-sm">
            <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-[#0f2e1a]"></span>
            Why Choose Us
          </div>

          <h2 className="text-[32px] md:text-[44px] lg:text-[48px] font-medium text-forest leading-[1.2] tracking-[-0.01em] max-w-[800px]">
            Reduce Electricity Bills With Smart<br className="hidden md:block" /> Solar Solutions.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative h-[400px] md:h-[580px] w-[110%] ml-[-5%] lg:ml-0 lg:w-full rounded-2xl md:rounded-[24px] overflow-hidden"
          >
            <Image
              src="/images/workers-installing.jpg"
              alt="Technicians installing solar panels"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 relative h-full border border-gray-200 rounded-[16px] overflow-hidden">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200" />
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200" />

              {items.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className={`p-6 md:p-8 flex flex-col justify-between aspect-square md:aspect-auto ${
                    i === 0 ? "border-r border-b border-gray-200" : ""
                  } ${
                    i === 1 ? "border-b border-gray-200" : ""
                  } ${
                    i === 2 ? "border-r border-gray-200" : ""
                  } bg-white`}
                >
                  <div className="text-[44px] md:text-[56px] font-light text-forest leading-none mb-6">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-base md:text-[19px] font-semibold text-forest mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[12px] md:text-[13px] text-gray-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
