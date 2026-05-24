"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PillTag from "@/components/ui/PillTag";

const faqs = [
  {
    q: "How much can I save with solar panels?",
    a: "Depending on your location and usage, you can expect significant reductions in your monthly electricity bills from day one. Our team provides a custom estimate during the free consultation.",
  },
  {
    q: "What is the installation process like?",
    a: "We handle everything from site survey and system design to installation and maintenance. The process typically takes 2–4 weeks from approval to activation.",
  },
  {
    q: "Do solar panels work in cloudy weather?",
    a: "Yes. Solar panels still generate electricity on cloudy days, though output is reduced. Modern panels are designed for varied Indian weather conditions.",
  },
  {
    q: "What government subsidies are available?",
    a: "Central and state subsidies vary by capacity and category. We help you identify and apply for all eligible schemes during your consultation.",
  },
  {
    q: "What warranty do you provide?",
    a: "We offer up to 25 years performance warranty on Tier-1 panels, plus comprehensive workmanship and inverter warranties.",
  },
  {
    q: "Are there financing options available?",
    a: "Yes. We partner with leading banks and NBFCs to offer flexible EMI plans with minimal upfront investment.",
  },
  {
    q: "How much space do I need for installation?",
    a: "A typical 3 kW system needs about 200 sq ft of shadow-free roof area. We assess your space during the free site survey.",
  },
  {
    q: "Is my roof suitable for solar panels?",
    a: "Most concrete and metal roofs are suitable. Our engineers evaluate structural strength, orientation, and shading before recommending a system.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <PillTag variant="light" className="mb-4 uppercase tracking-wider text-xs font-semibold">
            FAQ
          </PillTag>
          <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-extrabold text-[#0f2e1a] leading-[1.1] tracking-tight">
            Get Clarity Before You Go Solar
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {faqs.map((faq, i) => (
            <div key={faq.q} className="border-b border-gray-200 last:border-0">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  className={`text-sm md:text-[15px] font-semibold pr-4 transition-colors ${
                    openIndex === i ? "text-[#1b3022]" : "text-gray-600"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 bg-[#1b3022] text-white`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    {openIndex === i ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    )}
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-[200px] opacity-100 pb-5" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-500 text-sm leading-relaxed pr-12">{faq.a}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
