"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { 
  Leaf, 
  Building2, 
  Zap, 
  Settings, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  Users,
  TrendingDown,
  BarChart3,
  DollarSign,
  Factory
} from "lucide-react";

const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});

const HexWrapper = ({ children, isDark }: { children: React.ReactNode, isDark?: boolean }) => (
    <div className="relative w-[180px] h-[208px] flex items-center justify-center z-10 hover:scale-105 transition-transform duration-500 cursor-pointer">
      <svg viewBox="0 0 100 115.47" className="absolute inset-0 w-full h-full drop-shadow-md z-0">
        <polygon points="50,1 99,29.36 99,86.11 50,114.47 1,86.11 1,29.36" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      </svg>
      <div 
         className={`relative w-[156px] h-[180px] z-10 flex items-center justify-center ${isDark ? 'bg-[#18291c]' : 'bg-gray-100'}`} 
         style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        {children}
      </div>
    </div>
);

export default function IndustrialSolarPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <PageLoader />
      <Header />
      <main className="min-h-screen bg-[#FDFDFD] overflow-x-hidden">
        
        {/* --- 1. Hero Banner --- */}
        <section ref={heroRef} className="relative h-[55vh] min-h-[450px] w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 h-[120%] top-[-10%]">
            <Image
              src="/images/rooftop-solar.jpg"
              alt="Industrial Solar Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-sm font-bold text-[#2A2A2A] mb-4 shadow-lg ring-1 ring-black/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" /> Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white shadow-black drop-shadow-2xl tracking-tight font-[var(--font-poppins)]">
              Industrial Solar
            </h1>
          </motion.div>
        </section>

        {/* --- 2. Intro Section --- */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="relative min-h-[500px]">
            
            {/* The Background Image (Right & Bottom) */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute top-[160px] bottom-0 right-0 left-[20%] md:left-[35%] rounded-[30px] overflow-hidden z-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="/images/rooftop-solar.jpg"
                alt="Industrial Installation"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* The Text Content over top-left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 bg-[#FDFDFD] w-full md:w-[65%] lg:w-[60%] rounded-br-[80px] pb-12 pr-12 pt-8"
              style={{ boxShadow: "15px 15px 40px -15px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#2A2A2A] mb-6 font-[var(--font-poppins)] leading-[1.2]">
                Industrial Solar Installation
              </h2>
              <p className="text-[#4A4A4A] mb-10 font-medium text-[15px] max-w-lg">
                Power your factory or large-scale manufacturing unit with high-performance solar energy solutions that cut costs and boost sustainability.
              </p>
              
              <h3 className="text-xl font-bold text-[#2A2A2A] mb-5">Benefits of Service</h3>
              <ul className="space-y-4 mb-10 pl-2">
                {[
                  "Massive Operational Savings",
                  "Energy Security & Independence",
                  "Compliance with Green Regulations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-[#4A4A4A]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A4A4A]" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/contact" className="bg-[#1b3022] hover:bg-[#2c4a35] w-fit text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 group mt-4">
                <span className="pl-3 pr-1">Get Free Quotation</span>
                <div className="bg-white text-[#1b3022] rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
              </Link>
            </motion.div>
            
          </div>
        </section>

        {/* --- 3. Service Overview --- */}
        <section className="pt-32 pb-32 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start mx-auto w-full max-w-6xl">
            <div className="w-full md:w-[55%]">
              <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-8 bg-white">
                Service Overview
              </div>
              <p className="text-[#4A4A4A] text-[15px] leading-[1.8] mb-10">
                Industrial solar solutions are designed to help manufacturing units and large complexes drastically reduce their heavy energy expenses. Whether it&apos;s a factory, processing plant, or heavy machinery unit, our systems are engineered for maximum industrial output and rugged reliability. We handle every aspect from grid compliance to heavy structural engineering.
              </p>
              
              <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-3">Understanding Industrial Solar</h3>
              <p className="text-[#4A4A4A] text-[14.5px] leading-[1.8] mb-10">
                Industrial solar installations work by converting sunlight into usable electricity through large-scale photovoltaic arrays. These systems operate at high voltages to meet the massive demands of industrial equipment. They integrate seamlessly with the existing HT/LT power grids and can include large-scale energy storage solutions.
              </p>

              <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-3">Our Simple Approach</h3>
              <p className="text-[#4A4A4A] text-[14.5px] leading-[1.8] mb-10">
                We begin with a comprehensive load analysis of your manufacturing operations. Our structural and electrical engineers then design a custom, high-yield solar plant optimized for your industrial roof or open land. From CEIG approvals and procurement to heavy installation and grid synchronization, we manage the full megawatt-scale project lifecycle.
              </p>

              <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-3">What This Provides</h3>
              <p className="text-[#4A4A4A] text-[14.5px] leading-[1.8]">
                Industrial solar plants provide factories with deep protection against rising industrial electricity tariffs and grid instabilities. They enhance corporate sustainability profiles, ensure compliance with environmental regulations, and deliver massive savings that boost overall profitability.
              </p>
            </div>
            
            <div className="w-full md:w-[45%] relative h-[450px] md:h-[650px] rounded-3xl overflow-hidden mt-8 md:mt-24 shadow-xl">
               <Image src="/images/rooftop-solar.jpg" alt="Industrial Service Overview" fill className="object-cover" />
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mt-24">
            <div className="w-full h-px bg-gray-200" />
          </div>
        </section>

        {/* --- 4. Benefits Section --- */}
        <section className="py-28 bg-[#18291c]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[13px] font-bold text-[#2A2A2A] mb-8">
              Benefits
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[44px] font-bold text-white mb-28 text-center font-[var(--font-poppins)]">
              Benefits Of Industrial Solar
            </h2>

            <div className="flex flex-wrap justify-center md:justify-between items-start gap-12 md:gap-4">
              {[
                { icon: <Factory className="w-7 h-7" />, title: "Power Heavy\nMachinery" },
                { icon: <Building2 className="w-7 h-7" />, title: "Meet ESG\nMandates" },
                { icon: <BarChart3 className="w-7 h-7" />, title: "Accelerated\nDepreciation" },
                { icon: <TrendingDown className="w-7 h-7" />, title: "Hedge Against\nTariff Hikes" },
                { icon: <ShieldCheck className="w-7 h-7" />, title: "Uninterrupted\nProduction" },
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center max-w-[160px] text-center w-[45%] md:w-auto">
                  <div className="w-24 h-24 rounded-full bg-[#EAF4ED] flex items-center justify-center text-[#18291c] mb-6 transition-transform hover:scale-110 shadow-lg cursor-pointer">
                    {benefit.icon}
                  </div>
                  <h4 className="text-white font-bold leading-[1.4] whitespace-pre-line text-[15px]">{benefit.title}</h4>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 5. Showcase Section --- */}
        <section className="pt-32 pb-32 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-6 bg-white shadow-sm">
                What We Offer
              </div>
              <h2 className="text-4xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)]">
                Our Industrial Solar Solution
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Factory Rooftop\nPlants", desc: "Megawatt-scale solutions utilizing expansive factory roof spaces.", image: "/images/rooftop-solar.jpg" },
                { title: "Ground Mount\nSolar Parks", desc: "Large utility-scale solar farms for heavy manufacturing needs.", image: "/images/rooftop-solar.jpg" },
                { title: "Cold Storage\nSolar Systems", desc: "Specialized hybrid systems for 24/7 refrigeration facilities.", image: "/images/rooftop-solar.jpg" },
                { title: "Industrial Microgrids", desc: "Complete energy independence with large-scale battery storage.", image: "/images/rooftop-solar.jpg" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full cursor-pointer group">
                  <div className="relative h-[220px] w-full bg-white p-3 pb-0">
                    <div className="relative w-full h-full rounded-t-[16px] overflow-hidden">
                       <Image src={item.image} alt="Solution" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="p-6 pt-5 grow">
                    <h3 className="text-[18px] font-bold text-[#2A2A2A] mb-2 leading-[1.3] whitespace-pre-line group-hover:text-[#4a7a53] transition-colors">{item.title}</h3>
                    <p className="text-[#6A6A6A] text-[13.5px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 6. How It Works --- */}
        <section className="py-24 bg-[#F8F7F3] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 md:px-8">
             <div className="text-center mb-24 relative z-20">
               <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-gray-300 text-[13px] font-semibold text-[#2A2A2A] mb-8 bg-white shadow-sm">
                 Installation Process
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)]">
                 How It Works
               </h2>
             </div>

             <div className="relative w-full max-w-[1000px] h-[600px] mx-auto mt-20 hidden md:block">
                {/* Horizontal Straight Line */}
                <div className="absolute top-[184px] left-[90px] right-[90px] h-[2px] bg-[#d1d5db] z-0" />
                
                {/* Diagonal Lines for V shape */}
                <svg className="absolute top-0 left-0 w-full h-[600px] z-0" viewBox="0 0 1000 600" preserveAspectRatio="none">
                   <line x1="363" y1="288" x2="500" y2="380" stroke="#d1d5db" strokeWidth="2" />
                   <line x1="637" y1="288" x2="500" y2="380" stroke="#d1d5db" strokeWidth="2" />
                </svg>

                {/* Node 1 */}
                <div className="absolute top-[80px] left-0 flex flex-col items-center w-[180px] z-10 bg-[#F8F7F3]">
                   <HexWrapper isDark>
                      <Users className="w-10 h-10 text-white" />
                   </HexWrapper>
                   <span className="mt-5 text-[14px] text-[#4A4A4A] font-bold">Free Consultation</span>
                </div>

                {/* Node 2 */}
                <div className="absolute top-[35px] left-[273px] flex flex-col items-center w-[180px] z-10 bg-[#F8F7F3]">
                   <span className="mb-5 text-[14px] text-[#4A4A4A] font-bold">Site Survey</span>
                   <HexWrapper>
                      <Image src="/images/rooftop-solar.jpg" alt="Site Survey" fill className="object-cover" />
                   </HexWrapper>
                </div>

                {/* Node 3 */}
                <div className="absolute top-[35px] left-[547px] flex flex-col items-center w-[180px] z-10 bg-[#F8F7F3]">
                   <span className="mb-5 text-[14px] text-[#4A4A4A] font-bold">Custom Design</span>
                   <HexWrapper>
                      <Image src="/images/rooftop-solar.jpg" alt="Custom Design" fill className="object-cover" />
                   </HexWrapper>
                </div>

                {/* Node 4 */}
                <div className="absolute top-[80px] left-[820px] flex flex-col items-center w-[180px] z-10 bg-[#F8F7F3]">
                   <HexWrapper isDark>
                      <CheckCircle2 className="w-10 h-10 text-white" />
                   </HexWrapper>
                   <span className="mt-5 text-[14px] text-[#4A4A4A] font-bold">Monitoring & System</span>
                </div>

                {/* Node 5 */}
                <div className="absolute top-[380px] left-[410px] flex flex-col items-center w-[180px] z-10 bg-[#F8F7F3]">
                   <HexWrapper>
                      <Image src="/images/rooftop-solar.jpg" alt="Installation" fill className="object-cover" />
                   </HexWrapper>
                   <span className="mt-5 text-[14px] text-[#4A4A4A] font-bold">Installation</span>
                </div>
             </div>

             {/* Mobile Layout Fallback */}
             <div className="flex flex-col gap-12 md:hidden">
                <div className="flex flex-col items-center text-center">
                  <HexWrapper isDark><Users className="w-10 h-10 text-white" /></HexWrapper>
                  <span className="mt-4 font-bold text-[#4A4A4A]">Free Consultation</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4 font-bold text-[#4A4A4A]">Site Survey</span>
                  <HexWrapper><Image src="/images/rooftop-solar.jpg" alt="Site Survey" fill className="object-cover" /></HexWrapper>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4 font-bold text-[#4A4A4A]">Custom Design</span>
                  <HexWrapper><Image src="/images/rooftop-solar.jpg" alt="Custom Design" fill className="object-cover" /></HexWrapper>
                </div>
                <div className="flex flex-col items-center text-center">
                  <HexWrapper><Image src="/images/rooftop-solar.jpg" alt="Installation" fill className="object-cover" /></HexWrapper>
                  <span className="mt-4 font-bold text-[#4A4A4A]">Installation</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <HexWrapper isDark><CheckCircle2 className="w-10 h-10 text-white" /></HexWrapper>
                  <span className="mt-4 font-bold text-[#4A4A4A]">Monitoring & System</span>
                </div>
             </div>
          </motion.div>
        </section>

        {/* --- 7. Pricing Section --- */}
        <section className="py-24 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 md:px-8">
             <div className="text-center mb-16 relative z-20">
               <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] mb-4">
                 Choose the Right System for Your Plant
               </h2>
               <p className="text-[#6A6A6A] text-[15px] max-w-xl mx-auto">
                 Find the perfect heavy-duty megawatt scale solution for your industrial complex.
               </p>
               
               <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-gray-100 mt-10">
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-[#6A6A6A]">Off Grid</button>
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-white bg-[#18291c] shadow-sm">On Grid</button>
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-[#6A6A6A]">Hybrid</button>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* 100 kW Card */}
                <div className="rounded-[24px] border border-gray-200 overflow-hidden bg-white flex flex-col">
                  <div className="p-8 pb-6 bg-[#F4F8F5] relative">
                    <div className="inline-flex items-center justify-center w-16 h-14 rounded-full bg-[#18291c] text-white font-bold text-[14px] mb-4">
                      100 kW
                    </div>
                    <div className="text-[12px] text-[#6A6A6A] font-medium mb-1 line-through">₹ 55,00,000*</div>
                    <div className="flex items-center gap-3">
                      <span className="text-[28px] font-bold text-[#2A2A2A]">₹ 45,00,000*</span>
                      <span className="px-2 py-1 rounded bg-[#E8F3EB] text-[#18291c] text-[12px] font-bold">-18%</span>
                    </div>
                  </div>
                  <div className="p-8 pt-6 flex-grow flex flex-col">
                    <div className="w-full border-t border-dashed border-gray-300 mb-6"></div>
                    <div className="flex items-center gap-3 mb-8">
                       <CheckCircle2 className="w-5 h-5 text-[#4a7a53]" />
                       <span className="text-[15px] font-medium text-[#4A4A4A]">Suitable for Small Processing Units</span>
                    </div>
                    <button className="w-full py-3.5 rounded-full border border-[#18291c] text-[#18291c] font-bold text-[14px] hover:bg-gray-50 transition-colors mt-auto">
                      Get This System
                    </button>
                  </div>
                </div>

                {/* 500 kW Card - Highlighted */}
                <div className="rounded-[24px] border-2 border-[#18291c] overflow-hidden bg-white flex flex-col relative shadow-xl transform md:-translate-y-4">
                  <div className="p-8 pb-6 bg-[#F4F8F5] relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-14 rounded-full bg-[#18291c] text-white font-bold text-[14px]">
                        500 kW
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FFF3E0] text-[#E65100] text-[11px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]"></span> Industry Standard
                      </span>
                    </div>
                    <div className="text-[12px] text-[#6A6A6A] font-medium mb-1 line-through">₹ 2,75,00,000*</div>
                    <div className="flex items-center gap-3">
                      <span className="text-[28px] font-bold text-[#2A2A2A]">₹ 2,20,00,000*</span>
                      <span className="px-2 py-1 rounded bg-[#E8F3EB] text-[#18291c] text-[12px] font-bold">-20%</span>
                    </div>
                  </div>
                  <div className="p-8 pt-6 flex-grow flex flex-col">
                    <div className="w-full border-t border-dashed border-gray-300 mb-6"></div>
                    <div className="flex items-center gap-3 mb-8">
                       <CheckCircle2 className="w-5 h-5 text-[#4a7a53]" />
                       <span className="text-[15px] font-medium text-[#4A4A4A]">Suitable for Medium Factories</span>
                    </div>
                    <button className="w-full py-3.5 rounded-full bg-[#18291c] text-white font-bold text-[14px] hover:bg-[#2c4a35] transition-colors mt-auto">
                      Get This System
                    </button>
                  </div>
                </div>

                {/* 1 MW Card */}
                <div className="rounded-[24px] border border-gray-200 overflow-hidden bg-white flex flex-col">
                  <div className="p-8 pb-6 bg-[#F4F8F5] relative">
                    <div className="inline-flex items-center justify-center w-16 h-14 rounded-full bg-[#18291c] text-white font-bold text-[14px] mb-4">
                      1 MW+
                    </div>
                    <div className="text-[12px] text-[#6A6A6A] font-medium mb-1 line-through">Custom Pricing</div>
                    <div className="flex items-center gap-3">
                      <span className="text-[28px] font-bold text-[#2A2A2A]">Get Free Quotation</span>
                      <span className="px-2 py-1 rounded bg-[#E8F3EB] text-[#18291c] text-[12px] font-bold">Best ROI</span>
                    </div>
                  </div>
                  <div className="p-8 pt-6 flex-grow flex flex-col">
                    <div className="w-full border-t border-dashed border-gray-300 mb-6"></div>
                    <div className="flex items-center gap-3 mb-8">
                       <CheckCircle2 className="w-5 h-5 text-[#4a7a53]" />
                       <span className="text-[15px] font-medium text-[#4A4A4A]">Suitable for Heavy Manufacturing</span>
                    </div>
                    <button className="w-full py-3.5 rounded-full border border-[#18291c] text-[#18291c] font-bold text-[14px] hover:bg-gray-50 transition-colors mt-auto">
                      Get This System
                    </button>
                  </div>
                </div>
             </div>
          </motion.div>
        </section>

        {/* --- 8. Calculator Section --- */}
        <section className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-[#F4F3F0] rounded-[30px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            {/* Left */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-300 text-[12px] font-bold text-[#2A2A2A] bg-white shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1b3022] mr-2" /> Start Here
              </div>
              <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] leading-[1.2]">
                See how much you<br/>can save every<br/>month
              </h2>
              <p className="text-[#6A6A6A] text-sm md:text-[14px] pt-12 pr-12 leading-relaxed">
                Get a personalized estimate including monthly savings, recommended solar capacity, and long-term energy benefits for your industrial plant.
              </p>
            </div>
            {/* Right */}
            <div className="w-full md:w-1/2 space-y-6 bg-[#F4F3F0] pt-4 md:pt-0">
              <div>
                <input type="text" placeholder="PINCODE" className="w-full bg-white border-0 px-6 py-4 rounded-full text-[13px] font-bold text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1b3022]/20 shadow-sm placeholder:text-[#A0A0A0] uppercase tracking-wider" />
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center mb-4 px-2">
                  <label className="block text-[13px] font-bold text-[#2A2A2A]">Monthly Electricity Bill</label>
                  <span className="text-[13px] font-bold text-[#2A2A2A]">₹0</span>
                </div>
                <div className="relative">
                   <div className="w-full bg-white p-1.5 rounded-full flex items-center justify-between shadow-sm">
                     <div className="bg-[#18291c] w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#2c4a35] transition-colors">
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" strokeWidth={3} />
                        <ChevronRight className="w-3.5 h-3.5 -ml-2" strokeWidth={3} />
                     </div>
                     <span className="text-[#D0D0D0] text-[13px] pr-5 font-medium tracking-wide">₹ 5,00,000 / Month</span>
                   </div>
                </div>
              </div>
              <button className="w-full bg-[#18291c] hover:bg-[#2c4a35] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 mt-2 transition-colors text-[14px]">
                Calculate Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* --- 9. Related Services --- */}
        <section className="py-24 bg-[#18291c]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <h2 className="text-3xl md:text-[44px] font-bold text-white font-[var(--font-poppins)] max-w-sm leading-[1.2]">
                Other Sustainability<br/>Services
              </h2>
              <button className="bg-white text-[#18291c] px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Residential Solar Installation", desc: "For homes, individual households, and residential buildings wanting clean, cost-effective energy.", img: "/images/rooftop-solar.jpg" },
                { title: "Commercial Solar Installation", desc: "Ideal for businesses, offices, and commercial buildings looking to reduce overhead costs.", img: "/images/rooftop-solar.jpg" },
                { title: "Industrial Solar Projects", desc: "High-yield power solutions tailored for factories, manufacturing units, and large-scale facilities.", img: "/images/rooftop-solar.jpg" }
              ].map((service, i) => (
                <div key={i} className="relative h-[320px] w-full rounded-[24px] overflow-hidden group cursor-pointer">
                   <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-7 flex flex-col justify-end border border-white/10 rounded-[24px]">
                     <h3 className="text-[18px] font-bold text-white mb-2 leading-tight">{service.title}</h3>
                     <p className="text-gray-300 text-[12px] leading-relaxed hidden group-hover:block transition-all duration-300">{service.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 10. Why Choose Us --- */}
        <section className="pt-28 pb-32 px-4 md:px-8 max-w-[1400px] mx-auto bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto">
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-8 shadow-sm">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] max-w-2xl leading-[1.2] mb-16">
              Reduce Electricity Bills With Smart Solar Solutions.
            </h2>

            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="w-full md:w-[45%] relative h-[450px] md:h-[550px] rounded-[30px] overflow-hidden shadow-2xl">
                 <Image src="/images/rooftop-solar.jpg" alt="Industrial Installation" fill className="object-cover" />
              </div>
              
              <div className="w-full md:w-[55%] grid grid-cols-2 gap-x-8 gap-y-12 pr-4">
                {[
                  { num: "1", title: "Certified & Experienced\nEngineers", desc: "Expert installation from certified professionals ensuring safety and efficiency." },
                  { num: "2", title: "High-Efficiency Solar\nSystems", desc: "Our premium tier monocrystalline panels maximize performance and output." },
                  { num: "3", title: "End-to-End Energy\nSolutions", desc: "From consultation to maintenance, we handle the entire process seamlessly." },
                  { num: "4", title: "Transparent &\nAffordable Pricing", desc: "Clear pricing with no hidden costs and flexible finance options." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[44px] font-[var(--font-poppins)] text-[#2A2A2A] leading-none mb-6 border-b border-gray-100 pb-5">{item.num}</span>
                    <h4 className="text-[16px] font-bold text-[#2A2A2A] mb-3 leading-[1.4] whitespace-pre-line">{item.title}</h4>
                    <p className="text-[#6A6A6A] text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- 11. FAQ Section --- */}
        <section className="py-24 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 md:px-8">
             <div className="text-center mb-20">
               <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-8 shadow-sm">
                 FAQs
               </div>
               <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)]">
                 Get Clarity Before You Go Solar
               </h2>
             </div>

             <div className="space-y-0 max-w-3xl mx-auto">
                {[
                  { q: "What size system does my factory need?", a: "The system size depends on your monthly electricity consumption and heavy machinery load. Our team conducts a detailed energy audit to recommend the optimal capacity, typically ranging from 100kW to multiple Megawatts for industrial setups." },
                  { q: "Will installation disrupt my manufacturing operations?", a: "No. We plan and schedule installations to minimize any disruption. Most industrial installations are completed in planned phases to avoid downtime." },
                  { q: "What is the ROI for industrial solar?", a: "Most industrial solar systems pay for themselves within 3-4 years through massive energy savings and accelerated depreciation, after which you enjoy nearly free electricity for the remaining 20+ year lifespan." },
                  { q: "Are government incentives available for industries?", a: "Yes, industrial solar installations are eligible for accelerated depreciation (AD) benefits, tax incentives, and various state-level industrial subsidies. We assist with all documentation." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-gray-200">
                    <button 
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between py-6 text-left group"
                    >
                      <span className={`text-[15px] font-bold transition-colors ${activeFaq === i ? "text-[#18291c]" : "text-[#2A2A2A] group-hover:text-[#4a7a53]"}`}>{faq.q}</span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all bg-[#18291c] text-white shadow-md`}>
                        {activeFaq === i ? <Minus className="w-3.5 h-3.5" strokeWidth={3} /> : <Plus className="w-3.5 h-3.5" strokeWidth={3} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 text-[#6A6A6A] text-[14px] leading-relaxed pr-12">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
             </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
