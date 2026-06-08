"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";

// ─── SolarSquare-matched calculation constants ─────────────────────────────
const SAVINGS_RATE_PER_KWH = 12.11;
const PEAK_HOURS   = 5;
const DAYS         = 30;
const SQFT_PER_KW  = 59.26;
const CO2_FACTOR   = 0.6513;
const CO2_PER_TREE = 30;
const CAR_CO2_KM   = 0.112;
const SYSTEM_YEARS = 25;

function effectiveTariff(bill: number): number {
  if (bill <= 2600) return 8.02;
  return 8.02 + ((bill - 2600) / (7000 - 2600)) * (8.64 - 8.02);
}

function calcResults(bill: number) {
  const rate         = effectiveTariff(bill);
  const monthlyUnits = bill / rate;
  const rawKw        = monthlyUnits / (PEAK_HOURS * DAYS);
  const systemKw     = Math.floor(rawKw * 100) / 100;
  const roofArea     = Math.round(rawKw * SQFT_PER_KW);

  const monthlyGen      = rawKw * PEAK_HOURS * DAYS;
  const monthlySavings  = Math.round(monthlyGen * SAVINGS_RATE_PER_KWH);
  const yearlySavings   = Math.round(monthlySavings * 12);
  const lifetimeSavings = Math.round(yearlySavings * SYSTEM_YEARS);

  const yearlyGen  = monthlyGen * 12;
  const co2        = Math.round(Math.round(yearlyGen * CO2_FACTOR) / 10) * 10;
  const trees      = Math.round(co2 / CO2_PER_TREE);
  const distance   = Math.round(co2 / CAR_CO2_KM / 10) * 10;

  return { systemKw, roofArea, monthlySavings, yearlySavings, lifetimeSavings, co2, trees, distance };
}

const inr = (n: number) => n.toLocaleString("en-IN");

// ─── Main Component ─────────────────────────────────────────────────────────
export default function Calculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [bill, setBill]             = useState(2600);
  const [pinCode, setPinCode]       = useState("");
  const [location, setLocation]     = useState<string | null>(null);
  const [pinError, setPinError]     = useState<string | null>(null);
  const [pinLoading, setPinLoading] = useState(false);
  const [results, setResults]       = useState<ReturnType<typeof calcResults> | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handlePinChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPinCode(val);
    setLocation(null);
    setPinError(null);

    if (val.length === 6) {
      setPinLoading(true);
      try {
        const res  = await fetch(`/api/pincode?pin=${val}`);
        const data = await res.json();
        if (res.ok && data.district) {
          setLocation(`${data.district}, ${data.state}`);
        } else {
          setPinError("Invalid PIN code. Please try again.");
        }
      } catch {
        setPinError("Network error. Please try again.");
      } finally {
        setPinLoading(false);
      }
    }
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(parseInt(e.target.value));
    setCalculated(false);
    setResults(null);
  };

  const handleCalculate = () => {
    if (bill === 0) return;
    setResults(calcResults(bill));
    setCalculated(true);
  };

  const MAX_BILL = 25000;
  const pct = (bill / MAX_BILL) * 100;

  return (
    <section className="py-12 md:py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#dbebd5] rounded-[28px] px-6 py-12 md:px-14 md:py-16 shadow-sm"
        >

          {/* ── Top 2-col Grid: Heading + Inputs ── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: Heading */}
            <div className="flex flex-col">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] md:text-sm font-semibold text-[#0f2e1a] bg-white w-fit mb-6 shadow-sm">
                <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-[#0f2e1a]" />
                Start Now
              </div>

              <h2 className="text-[36px] md:text-[50px] lg:text-[56px] font-medium text-[#0f2e1a] leading-[1.1] tracking-tight mb-8">
                See how much you<br />can save every<br />month
              </h2>

              <p className="mt-4 text-[#516458] text-[15.5px] leading-[1.6] max-w-sm">
                Get a personalized estimate including monthly savings, recommended solar size, and long-term energy benefits.
              </p>
            </div>

            {/* Right: Inputs */}
            <div className="w-full flex flex-col gap-8 justify-center pt-2 md:pl-6">

              {/* PIN Code */}
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter PIN CODE"
                    value={pinCode}
                    onChange={handlePinChange}
                    maxLength={6}
                    className="w-full bg-white px-8 py-5 rounded-full text-sm font-medium text-[#0f2e1a] placeholder:text-[#a1aca5] focus:outline-none focus:ring-2 focus:ring-[#0f2e1a]/30 shadow-sm pr-14 transition"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    {pinLoading && (
                      <svg className="w-5 h-5 text-[#0f2e1a] animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                    )}
                    {!pinLoading && location && (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>

                {location && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-sm text-sm text-[#0f2e1a] font-medium"
                  >
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    📍 {location}
                  </motion.div>
                )}

                {pinError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-xs text-red-500 px-4">
                    {pinError}
                  </motion.p>
                )}
              </div>

              {/* Bill Slider */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end px-2">
                  <label className="text-[17px] font-medium text-[#0f2e1a]">Monthly Electricity Bill</label>
                  <div className="text-[17px] font-semibold text-[#0f2e1a]">
                    {bill > 0 ? `₹${inr(bill)}` : "₹0"}
                  </div>
                </div>

                <div className="relative w-full h-[64px] bg-white rounded-full flex items-center shadow-sm px-2">
                  <div
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-2 bg-[#0f2e1a]/15 rounded-full pointer-events-none"
                    style={{ width: `calc(${pct}% - 4px)` }}
                  />
                  <input
                    type="range" min="500" max="25000" step="100"
                    value={bill} onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div
                    className="absolute w-14 h-14 bg-[#0f2e1a] rounded-full flex items-center justify-center z-10 pointer-events-none shadow-md transition-all duration-75"
                    style={{ left: `calc(8px + ${pct}% - ${pct * 0.56}px)` }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between px-2 text-[11px] text-[#516458] font-medium">
                  <span>₹500</span>
                  <span>₹6,500</span>
                  <span>₹12,500</span>
                  <span>₹18,500</span>
                  <span>₹25,000</span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full bg-[#0f2e1a] hover:bg-black text-white px-8 py-5 rounded-full text-[17px] font-medium transition-colors shadow-sm flex items-center justify-center gap-3 mt-2"
              >
                Calculate Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Results: Full-width below the 2-col grid ── */}
          <AnimatePresence>
            {calculated && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mt-10 pt-10 border-t border-[#b8d9b0]"
              >
                {/* 3-card row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

                  {/* Card 1 — System Size */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-bold text-[#4a7a53] uppercase tracking-[0.12em] mb-5">⚡ Required System</p>
                    <div className="flex divide-x divide-gray-100">
                      <div className="flex-1 flex flex-col items-center pr-4">
                        <p className="text-[12px] text-gray-400 mb-1.5">System Size</p>
                        <p className="text-[32px] font-bold text-[#0f2e1a] leading-none">{results.systemKw}</p>
                        <p className="text-[13px] text-[#516458] mt-1.5 font-semibold">kW</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center pl-4">
                        <p className="text-[12px] text-gray-400 mb-1.5">Roof Area</p>
                        <p className="text-[32px] font-bold text-[#0f2e1a] leading-none">{inr(results.roofArea)}</p>
                        <p className="text-[13px] text-[#516458] mt-1.5 font-semibold">sq. ft.</p>
                      </div>
                    </div>
                    <p className="mt-5 text-[11px] text-center text-gray-400 border-t border-gray-100 pt-4">
                      Don&apos;t have enough roof area?{" "}
                      <a href="/contact" className="text-[#0f2e1a] underline font-semibold">Get in touch</a>
                    </p>
                  </div>

                  {/* Card 2 — Savings */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-bold text-[#4a7a53] uppercase tracking-[0.12em] mb-5">💰 Your Solar Savings</p>
                    <div className="flex flex-col gap-3.5">
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 font-medium">Monthly</p>
                        <p className="text-[20px] font-bold text-[#0f2e1a]">₹{inr(results.monthlySavings)}</p>
                      </div>
                      <div className="w-full h-px bg-gray-100" />
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 font-medium">Yearly</p>
                        <p className="text-[20px] font-bold text-[#0f2e1a]">₹{inr(results.yearlySavings)}</p>
                      </div>
                      <div className="w-full h-px bg-gray-100" />
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 font-medium">Lifetime (25 yrs)</p>
                        <p className="text-[20px] font-bold text-[#0f2e1a]">₹{inr(results.lifetimeSavings)}</p>
                      </div>
                    </div>
                    <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-[11px] text-center text-amber-700 font-medium">
                      We offer <strong>5-year guaranteed savings</strong> with Indian Solar Green Energy™
                    </div>
                  </div>

                  {/* Card 3 — Environmental */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-bold text-[#4a7a53] uppercase tracking-[0.12em] mb-5">🌍 Green Impact / Year</p>
                    <div className="flex flex-col gap-3.5">
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 font-medium">🌍 CO₂ Mitigated</p>
                        <p className="text-[20px] font-bold text-[#0f2e1a]">{inr(results.co2)} Kg</p>
                      </div>
                      <div className="w-full h-px bg-gray-100" />
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 font-medium">🌳 Trees Planted</p>
                        <p className="text-[20px] font-bold text-[#0f2e1a]">{inr(results.trees)}</p>
                      </div>
                      <div className="w-full h-px bg-gray-100" />
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 font-medium">🚗 Car Distance</p>
                        <p className="text-[20px] font-bold text-[#0f2e1a]">{inr(results.distance)} Km</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Us — full-width CTA */}
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center gap-3 bg-[#0f2e1a] hover:bg-black text-white py-5 rounded-full text-[17px] font-semibold transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                >
                  Contact Us — Get Your Free Quote
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
