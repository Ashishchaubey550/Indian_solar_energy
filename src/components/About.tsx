"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-8 md:gap-24 mb-16 lg:mb-24"
        >
          {/* Left Side: Pill Tag */}
          <div className="shrink-0">
            <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[13px] font-medium border border-gray-300 text-gray-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f2e1a] mr-2.5"></span>
              About Us
            </div>
          </div>

          {/* Right Side: Text & Button */}
          <div className="flex-1 max-w-4xl">
            <h2 className="text-[24px] md:text-[28px] lg:text-[34px] text-[#2d3748] font-light leading-[1.5] tracking-tight">
              <strong className="font-bold text-[#1a202c]">INDIAN SOLAR</strong> is a solar startup committed to
              transforming the way homes and businesses
              consume energy. We combine modern technology,
              high-quality solar systems, and expert installation
              to deliver long-term savings and sustainable
              energy solutions.
            </h2>
            <div className="mt-10 flex justify-center md:justify-start lg:justify-center">
              <Link
                href="/contact"
                className="bg-[#0f2e1a] text-white px-10 py-3.5 rounded-full font-semibold text-[15px] hover:bg-black transition-colors shadow-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
          {/* Image 1 (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-[300px] md:h-[400px] lg:h-[460px] w-full rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="/images/workers-installing.jpg"
              alt="Workers installing solar panels"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Image 2 (Center) - Taller with Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-xl z-10 md:-my-12 group"
          >
            <Image
              src="/images/quality-check.jpg"
              alt="Engineers reviewing plans"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Text Overlay Box */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
                <p className="text-white/95 text-sm md:text-[15px] leading-relaxed font-medium">
                  We help homes and businesses<br className="hidden md:block" />
                  reduce electricity costs through<br className="hidden md:block" />
                  innovative solar technology,<br className="hidden md:block" />
                  expert installation, and reliable<br className="hidden md:block" />
                  long-term support.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image 3 (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-[300px] md:h-[400px] lg:h-[460px] w-full rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="/images/residential-solar.jpg"
              alt="Family with residential solar"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
