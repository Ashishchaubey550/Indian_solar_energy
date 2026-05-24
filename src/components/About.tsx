"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import PillTag from "@/components/ui/PillTag";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.7 }}
           className="mb-10 md:mb-14"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#0f2e1a] bg-white border border-[#0f2e1a]/20 mb-6 shadow-sm">
            <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-[#0f2e1a]"></span>
            ABOUT US
          </div>

          <h2 className="text-[32px] md:text-[44px] lg:text-[48px] font-medium text-forest leading-[1.2] tracking-[-0.01em] max-w-[1050px]">
            Powering a cleaner future with smart and<br className="hidden lg:block"/>
            sustainable solar energy to create and provide<br className="hidden lg:block"/>
            innovative, eco-friendly solution
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col pt-1"
          >
            <p className="text-[#64746b] text-[16px] font-light leading-[1.65] max-w-[320px] mb-8">
              We help homes and businesses<br className="hidden md:block" />
              reduce electricity costs through<br className="hidden md:block" />
              innovative solar technology, expert<br className="hidden md:block" />
              installation, and reliable long-term<br className="hidden md:block" />
              support.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-[320px]">
              <div className="relative aspect-square rounded-[16px] overflow-hidden shadow-sm">
                <Image src="/images/workers-installing.jpg" alt="Workers installing solar" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-[16px] overflow-hidden shadow-sm">
                <Image src="/images/about-solar.jpg" alt="Solar panels close up" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-8 relative h-[320px] md:h-[460px] lg:h-[480px] w-[110%] ml-[-5%] lg:ml-0 lg:w-full rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm"
          >
            <Image src="/images/commercial-solar.jpg" alt="Solar farm landscape" fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
