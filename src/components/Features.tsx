"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import PillTag from "@/components/ui/PillTag";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <PillTag variant="light" className="mb-4">
            Features
          </PillTag>
          <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-extrabold text-[#0f2e1a] leading-[1.1] tracking-tight max-w-2xl">
            Smart Features, Technology Driven Systems Design
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-start-1 md:row-start-1 bg-[#f5f5f5] rounded-3xl p-7 flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="w-9 h-9 rounded-full bg-[#d8e8d8] flex items-center justify-center text-[#1b3022] mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1b3022] font-[var(--font-poppins)] leading-tight">
                Long Life Panel Technology
              </h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Our panels deliver consistent power output over decades with minimal degradation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-start-2 md:row-start-1 md:row-span-2 bg-[#f5f5f5] rounded-3xl p-5 flex flex-col min-h-[320px] md:min-h-[480px]"
          >
            <h3 className="text-xl font-bold text-[#1b3022] font-[var(--font-poppins)] leading-tight mb-2">
              Optimization Installation Design
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Tailored solar layouts for maximum sunshine harvesting on your property.
            </p>
            <div className="relative flex-1 min-h-[200px] rounded-2xl overflow-hidden mt-auto">
              <Image src="/images/residential-solar.jpg" alt="Solar installation" fill className="object-cover" />
              <div className="absolute left-3 bottom-3 bg-white text-[#1b3022] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="text-[10px] sm:text-xs font-semibold">High Efficiency</span>
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-start-3 md:row-start-1 md:row-span-2 bg-[#f5f5f5] rounded-3xl p-7 flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1b3022] font-[var(--font-poppins)]">30%</h3>
              <p className="text-gray-500 text-[10px] font-semibold uppercase mt-2 tracking-wider">
                Energy Savings
              </p>
            </div>
            <div className="flex items-end justify-between gap-2 h-28 mt-6">
              <div className="w-full bg-[#d8e8d8] rounded-t-md h-[35%]" />
              <div className="w-full bg-[#1b3022] rounded-t-md h-[75%]" />
              <div className="w-full bg-[#c8d5cc] rounded-t-md h-[55%]" />
              <div className="w-full bg-[#3d5c45] rounded-t-md h-[90%]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-start-1 md:row-start-2 bg-[#f5f5f5] rounded-3xl p-7 flex flex-col justify-end min-h-[180px]"
          >
            <div className="flex items-end gap-2">
              <span className="text-[56px] md:text-6xl font-light text-[#1b3022] font-[var(--font-poppins)] leading-none">25</span>
              <span className="text-[10px] font-bold text-[#1b3022] mb-2 uppercase tracking-wider leading-tight">
                Year Performance<br />Warranty
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
