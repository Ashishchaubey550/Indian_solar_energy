"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

const navLinks = [
  { href: "/", label: "Home" },
  // { href: "/#about", label: "About" },
  {
    href: "/services",
    label: "Services",
    dropdown: [
      {
        label: "Services Overview",
        href: "/services",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6L12 1z" />
          </svg>
        ),
      },
      {
        label: "Residential Solar",
        href: "/services/residential-solar",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        ),
      },
      {
        label: "Commercial Solar",
        href: "/services/commercial-solar",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.1 0-2 .9-2 2v16h18V6c0-1.1-.9-2-2-2zM7 18H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V8h2v2zm4 8H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z" />
          </svg>
        ),
      },
      {
        label: "Industrial Solar",
        href: "/services/industrial-solar",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12v6h2v-6h2v6h2v-6h2v6h2V12L12 12zM2 20h20v2H2z" />
            <path d="M2.28 10.46l5.72 2.76V12h2v1.9l5.88-2.61L21 13.43V6h-2v4.86l-3.23-1.61L12.5 11l-2.5-2.5V6H8v5.27z" />
          </svg>
        ),
      },
      {
        label: "On-Grid Solar",
        href: "/services/on-grid-solar",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.02c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M11 7h2v4h-2zm0 6h2v2h-2z" />
          </svg>
        ),
      },
      {
        label: "Off-Grid Solar",
        href: "/services/off-grid-solar",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-1.99-1.99-1.99z" />
          </svg>
        ),
      },
      {
        label: "Hybrid Solar",
        href: "/services/hybrid-solar",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.33 10.22L18.47 8.5 16.5 9.47 17.37 11.2l1.96-.98zm-1.83 5.31l1.96-.98-1.02-2.03-1.96.98 1.02 2.03zm-4.5 2.47H11v2h2v-2zm-2.06-11.45l2.03-1.02-.98-1.96-2.03 1.02.98 1.96zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-5.36-.67l-1.96.98 1.02 2.03 1.96-.98-1.02-2.03zm1.65-4.59l-.98-1.96-2.03 1.02.98 1.96 2.03-1.02z" />
          </svg>
        ),
      },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 md:top-8 left-0 w-full z-50 px-3 md:px-8">
      <div
        className={`max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between rounded-full transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg py-3" : "bg-white/95 backdrop-blur-md shadow-sm py-4"
        }`}
      >
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo.png"
            alt="Indian Solar"
            width={240}
            height={64}
            className="h-12 md:h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <Link
                href={link.href}
                className={`text-[15px] transition-colors py-4 flex items-center gap-1 ${
                  link.label === "Home"
                    ? "font-bold text-forest"
                    : "font-medium text-gray-700 hover:text-forest"
                }`}
              >
                {link.label}
              </Link>

              {/* First-level Dropdown for Service */}
              {link.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-white/50">
                  {/* Top Arrow triangle */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 backdrop-blur-md rotate-45 border-t border-l border-white/50"></div>
                  
                  {link.dropdown.map((item) => (
                    <div key={item.label} className="relative group/nested">
                      <Link
                        href={item.href}
                        className="px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-white hover:text-forest flex items-center gap-3 transition-colors rounded mx-1"
                      >
                        {item.icon && <span className="text-gray-600">{item.icon}</span>}
                        <span className="flex-1">{item.label}</span>
                        {(item as any).hasNested && (
                          <div className="w-5 h-5 bg-[#0f2e1a] rounded flex items-center justify-center text-white shrink-0">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </Link>

                      {/* Second-level Dropdown */}
                      {(item as any).hasNested && (item as any).nested && (
                        <div className="absolute top-0 left-full ml-1 w-44 bg-white/95 backdrop-blur-md rounded-lg shadow-xl py-2 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 border border-white/50">
                           {(item as any).nested.map((subItem: any) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white hover:text-forest rounded mx-1"
                              >
                                {subItem.label}
                              </Link>
                           ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Magnetic>
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-[#0f2e1a] text-white px-7 py-3 rounded-full text-[15px] font-semibold hover:bg-black transition-colors shrink-0 shadow-md"
          >
            Get Free Quotation
          </Link>
        </Magnetic>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)", transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden absolute top-[calc(100%+10px)] left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-6 flex flex-col gap-4 transform-gpu z-50 origin-top"
          >
            {navLinks.map((link, i) => (
              <motion.div 
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (i * 0.05), type: "spring", damping: 20 }}
              >
                 <Link
                   href={link.href}
                   className={`text-base py-2 block border-b border-gray-50 ${
                     link.label === "Home"
                       ? "font-bold text-forest"
                       : "font-medium text-gray-700 hover:text-forest"
                   }`}
                   onClick={() => !link.dropdown && setMobileOpen(false)}
                 >
                   {link.label}
                 </Link>
                 {link.dropdown && (
                   <div className="pl-4 mt-2 flex flex-col gap-2">
                     {link.dropdown.map(d => (
                       <div key={d.label}>
                          <Link href={d.href} className="text-sm text-gray-600 block py-1 font-medium" onClick={() => setMobileOpen(false)}>{d.label}</Link>
                          {/* @ts-ignore - nested not typed */}
                          {d.nested && (
                            <div className="pl-4 mt-1 flex flex-col gap-1">
                               {/* @ts-ignore */}
                               {d.nested.map((n: any) => (
                                 <Link key={n.label} href={n.href} className="text-xs text-gray-500 block" onClick={() => setMobileOpen(false)}>{n.label}</Link>
                               ))}
                            </div>
                          )}
                       </div>
                     ))}
                   </div>
                 )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
            >
              <Link
                href="/contact"
                className="bg-[#0f2e1a] block text-white text-center px-6 py-3.5 rounded-full text-[15px] font-bold mt-4 shadow-md active:scale-95 transition-transform"
                onClick={() => setMobileOpen(false)}
              >
                Get Free Quotation
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
