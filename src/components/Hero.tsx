"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);

  return (
    <section id="home" ref={ref} className="relative min-h-[90vh] flex items-end overflow-hidden mt-0 pt-0">
      <div className="absolute inset-0 z-0 rounded-b-3xl overflow-hidden m-2 md:m-4 bg-[#122315]">
        <motion.div 
          className="absolute inset-0 w-full h-[120%] top-[-10%]"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/residential-solar.jpg"
            alt="Home with solar panels"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            loading="eager"
          />
        </motion.div>
        {/* Adjusted gradient to match mockup's dark bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold text-white leading-[1.02] tracking-tight uppercase">
            THE FUTURE OF SMART<br/>
            SOLAR ENERGY
          </h1>

          <p className="mt-6 md:mt-8 text-lg sm:text-xl text-white/90 leading-relaxed font-medium max-w-2xl">
            Clean, affordable, and reliable solar solutions for homes, businesses,
            and industries with expert installation and long-term support.
          </p>

          <Magnetic>
            <Link href="/services" className="inline-block mt-8 md:mt-10 group">
              <div className="bg-white rounded-full flex items-center gap-3 pl-8 pr-2 py-2.5 shadow-xl hover:bg-gray-50 transition-colors">
                <span className="text-[#0f2e1a] text-base font-bold">Our Solution</span>
                <div className="w-10 h-10 bg-[#0f2e1a] rounded-full flex items-center justify-center text-white transition-all transform group-hover:translate-x-1">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
