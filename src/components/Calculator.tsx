"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Calculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [bill, setBill] = useState(0);

  // A simple simulated drag amount function for visual effect
  // In a real app this would be a complex draggable slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(parseInt(e.target.value));
  };

  return (
    <section className="py-12 md:py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#dbebd5] rounded-[24px] px-6 py-12 md:px-14 md:py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start shadow-sm"
        >
          <div className="flex flex-col">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] md:text-sm font-semibold text-[#0f2e1a] bg-white w-fit mb-6 shadow-sm">
              <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-[#0f2e1a]"></span>
              Start Now
            </div>
            
            <h2 className="text-[36px] md:text-[50px] lg:text-[56px] font-medium text-[#0f2e1a] leading-[1.1] tracking-tight mb-8">
              See how much you<br />
              can save every<br />
              month
            </h2>
            
            <p className="mt-8 text-[#516458] text-[15.5px] leading-[1.6] max-w-sm">
              Get a personalized estimate including monthly savings, recommended solar size, and long-term energy benefits.
            </p>
          </div>

          <div className="w-full flex flex-col gap-8 justify-center pt-2 md:pl-6">
            <div className="w-full">
              <input
                type="text"
                placeholder="PIN CODE"
                className="w-full bg-white px-8 py-5 rounded-full text-sm font-medium text-[#0f2e1a] placeholder:text-[#a1aca5] focus:outline-none shadow-sm"
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-end px-2">
                <label className="text-[17px] font-medium text-[#0f2e1a]">
                  Monthly Electricity Bill
                </label>
                <div className="text-[17px] font-medium text-[#0f2e1a]">
                  ₹{bill > 0 ? bill.toLocaleString() : "0"}
                </div>
              </div>

              {/* Slider mock container */}
              <div className="relative w-full h-[64px] bg-white rounded-full flex items-center shadow-sm px-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={bill}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                />
                <div
                  className="absolute left-2 w-14 h-14 bg-[#0f2e1a] rounded-full flex items-center justify-center z-10 transition-all pointer-events-none"
                  style={{ left: `calc(8px + ${(bill / 50000) * 100}% - ${(bill / 50000) * 56}px)` }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
                {bill === 0 && (
                  <div className="w-full flex justify-center text-[#e2e8e4] text-xs font-bold tracking-wider absolute inset-0 items-center pointer-events-none z-0 pr-6">
                    DRAG TO SET AMOUNT
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-[#0f2e1a] hover:bg-black text-white px-8 py-5 rounded-full text-[17px] font-medium transition-colors shadow-sm flex items-center justify-center gap-3 mt-4"
            >
              Calculate Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
