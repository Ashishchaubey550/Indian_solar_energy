"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PillTag from "@/components/ui/PillTag";

const steps = [
  { label: "Site Survey", position: "top" },
  { label: "System Design", position: "right" },
  { label: "Installation", position: "bottom" },
  { label: "Maintenance & Support", position: "left" },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 md:py-28 bg-[#1b3022] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <PillTag variant="dark" className="mb-6 uppercase tracking-wider text-xs font-semibold">
            Our Process
          </PillTag>
          <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight">
            We handle everything from planning to installation and maintenance so you can enjoy hassle free solar energy.
          </h2>
        </motion.div>

        <div className="relative mt-16 md:mt-24 flex items-center justify-center min-h-[300px] md:min-h-[360px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-lg aspect-square flex items-center justify-center"
          >
            <div className="absolute w-48 h-48 md:w-56 md:h-56 border border-dashed border-white/20 rounded-full" />

            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 2v2m0 16v2M2 12h2m16 0h2m-2.93-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m0-14.14l1.41 1.41m11.32 11.32l1.41 1.41" />
              </svg>
            </div>

            {steps.map((step) => (
              <div
                key={step.label}
                className={`absolute flex items-center gap-2 whitespace-nowrap ${
                  step.position === "top"
                    ? "top-0 left-1/2 -translate-x-1/2"
                    : step.position === "bottom"
                    ? "bottom-0 left-1/2 -translate-x-1/2"
                    : step.position === "left"
                    ? "left-0 top-1/2 -translate-y-1/2"
                    : "right-0 top-1/2 -translate-y-1/2"
                }`}
              >
                {step.position === "right" && <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />}
                <span className="text-white text-[11px] md:text-xs font-semibold tracking-wide bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  {step.label}
                </span>
                {step.position !== "right" && <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
