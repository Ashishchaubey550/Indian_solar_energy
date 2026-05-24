"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="bg-[#122315] pt-16 md:pt-24 pb-8" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src="/images/logo.png"
            alt="Indian Solar Green Energy"
            width={240}
            height={60}
            className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
          />
          <h2 className="mt-8 text-[32px] md:text-[40px] font-semibold text-white leading-[1.2] max-w-[600px]">
            Save Electricity Bills with<br/>Solar Power
          </h2>
        </div>

        {/* Middle Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#59685e] rounded-[32px] md:rounded-[40px] p-8 md:p-14 lg:p-16 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Newsletter Subscription */}
            <div className="flex flex-col max-w-sm">
              <h3 className="text-3xl md:text-[38px] font-bold text-white mb-2">Indian Solar</h3>
              <p className="text-white/80 text-[15px] mb-8">Stay connected with us</p>
              
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-white rounded-full px-6 py-4 text-[15px] text-[#122315] placeholder:text-[#88908b] focus:outline-none shadow-sm"
                />
                <button
                  type="button"
                  className="w-full bg-forest hover:bg-black text-white px-6 py-4 rounded-full text-[15px] font-semibold transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between py-4 border-b border-white/30 text-white hover:text-gray-200 transition-colors group"
                >
                  <span className="text-[17px] font-medium">{link.label}</span>
                  <svg 
                    className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              ))}
            </div>
            
          </div>
        </motion.div>

        {/* Bottom Contact Pill Container */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-[#3e4d43] rounded-3xl md:rounded-full py-6 md:py-4 px-6 md:px-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 bg-forest rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] font-medium leading-none mb-1.5">Phone No:</span>
                <span className="text-white/90 text-[13px] leading-none">+91 702430XXXX</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 bg-forest rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] font-medium leading-none mb-1.5">Email Address:</span>
                <span className="text-white/90 text-[13px] leading-none">indian.solar@gmail.com</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 bg-forest rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] font-medium leading-none mb-1.5">Location:</span>
                <span className="text-white/90 text-[13px] leading-none">Location</span>
              </div>
            </div>

          </div>
        </motion.div>
        
      </div>
    </footer>
  );
}
