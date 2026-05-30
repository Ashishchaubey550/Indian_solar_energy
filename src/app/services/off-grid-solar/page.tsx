"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { 
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});

export default function OffGridSolarPage() {
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
              alt="Off-Grid Solar Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
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
              Off-Grid Solar
            </h1>
          </motion.div>
        </section>

        {/* --- 2. Intro & Consultation Form --- */}
        <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
             {/* Left Text */}
             <div className="w-full md:w-1/2">
               <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] mb-6 font-[var(--font-poppins)] leading-[1.2]">
                 Off-Grid Solar Systems
               </h2>
               <p className="text-[#4A4A4A] mb-10 font-medium text-[15px] leading-relaxed">
                 An off-grid solar system operates completely independently from the local electricity grid. It stores generated solar power in high-capacity batteries to provide continuous electricity day and night, making it the perfect solution for remote areas or locations with frequent power cuts.
               </p>
               
               <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-5">Benefits of Service</h3>
               <ul className="space-y-4 mb-10 pl-2">
                 {[
                   "Complete Energy Independence",
                   "100% Reliable Backup Power",
                   "Ideal for Remote & Rural Areas",
                   "No Dependency on Grid Power",
                   "Total Protection from Power Outages"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-[14.5px] font-bold text-[#4A4A4A]">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#4A4A4A]" /> {item}
                   </li>
                 ))}
               </ul>
             </div>

             {/* Right Form */}
             <div className="w-full md:w-1/2 bg-[#18291c] rounded-[30px] p-8 md:p-10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white text-center mb-2 font-[var(--font-poppins)]">Book a FREE Consultation</h3>
                <p className="text-[#A0A0A0] text-center text-sm mb-8">Get expert advice tailored for your energy needs</p>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                   <input type="text" placeholder="Full Name *" className="w-full bg-white px-5 py-4 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4a7a53] shadow-sm font-medium" />
                   <input type="tel" placeholder="Mobile No. *" className="w-full bg-white px-5 py-4 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4a7a53] shadow-sm font-medium" />
                   <input type="email" placeholder="Email ID" className="w-full bg-white px-5 py-4 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4a7a53] shadow-sm font-medium" />
                   
                   <div className="pt-4 flex flex-wrap gap-2 justify-center">
                     {["Upto 2KW", "3KW - 5KW", "5KW - 10KW", "10KW - 20KW", "Above 20KW"].map((size) => (
                        <button key={size} type="button" className="px-4 py-2 bg-white text-[#2A2A2A] font-bold text-[12px] rounded-full border border-transparent hover:border-[#4a7a53] hover:text-[#4a7a53] transition-colors">
                          {size}
                        </button>
                     ))}
                   </div>
                   
                   <Link href="/contact" className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-[#18291c] py-4 rounded-full font-bold mt-8 transition-colors shadow-lg">
                     Get Free Quotation
                   </Link>
                </form>
             </div>
          </motion.div>
        </section>

        {/* --- 3. Calculator Section --- */}
        <section className="py-24 px-4 md:px-8 bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-[#F8F7F3] rounded-[30px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            {/* Left */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-300 text-[12px] font-bold text-[#2A2A2A] bg-white shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1b3022] mr-2" /> Start Here
              </div>
              <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] leading-[1.2]">
                See how much you<br/>can save every<br/>month
              </h2>
              <p className="text-[#6A6A6A] text-sm md:text-[14px] pt-12 pr-12 leading-relaxed">
                Get a personalized estimate including monthly savings, recommended solar capacity, and long-term energy benefits.
              </p>
            </div>
            {/* Right */}
            <div className="w-full md:w-1/2 space-y-6">
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
                     <span className="text-[#D0D0D0] text-[13px] pr-5 font-medium tracking-wide">₹ 5,000 / Month</span>
                   </div>
                </div>
              </div>
              <button className="w-full bg-[#18291c] hover:bg-[#2c4a35] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 mt-2 transition-colors text-[14px]">
                Calculate Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* --- 4. Service Overview --- */}
        <section className="pt-24 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start mx-auto w-full max-w-6xl">
            <div className="w-full md:w-[55%]">
              <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-8 bg-white">
                Off-Grid Systems
              </div>
              <p className="text-[#4A4A4A] text-[15px] leading-[1.8] mb-10">
                Off-grid systems are designed to provide uninterrupted power entirely on their own. Since you are not connected to the municipal grid, your solar panels must generate enough power to meet 100% of your energy needs, while excess power is stored in a battery bank for use at night or during cloudy days.
              </p>
              
              <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-3">Understanding Battery Storage</h3>
              <p className="text-[#4A4A4A] text-[14.5px] leading-[1.8] mb-10">
                The core of an off-grid system is its battery bank. Modern lithium-ion or deep-cycle gel batteries store the direct current (DC) power generated by the solar panels. An off-grid inverter then converts this stored energy into alternating current (AC) to safely power your home appliances.
              </p>

              <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-3">Our Simple Approach</h3>
              <p className="text-[#4A4A4A] text-[14.5px] leading-[1.8] mb-10">
                We perform a highly detailed load analysis to calculate your exact peak and continuous power requirements. Based on this, we design a balanced off-grid system with the perfect solar array size, charge controllers, and battery bank capacity to ensure you never run out of power.
              </p>

              <h3 className="text-[20px] font-bold text-[#2A2A2A] mb-3">What This Provides</h3>
              <p className="text-[#4A4A4A] text-[14.5px] leading-[1.8]">
                True energy independence. You will never receive another electricity bill and you will never be affected by grid blackouts, brownouts, or voltage fluctuations again. It is the ultimate solution for self-reliance and peace of mind.
              </p>
            </div>
            
            <div className="w-full md:w-[45%] relative h-[450px] md:h-[650px] rounded-[30px] overflow-hidden mt-8 md:mt-24 shadow-xl">
               <Image src="/images/rooftop-solar.jpg" alt="Off-Grid House" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* --- 5. Pricing Section --- */}
        <section className="py-24 bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 md:px-8">
             <div className="text-center mb-16 relative z-20">
               <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] mb-4">
                 Choose the Right System for Your Home
               </h2>
               <p className="text-[#6A6A6A] text-[15px] max-w-xl mx-auto">
                 System size depends on your monthly electricity bill and rooftop space. Off-grid systems include battery storage.
               </p>
               
               <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-gray-100 mt-10">
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-white bg-[#18291c] shadow-sm">Small Battery</button>
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-[#6A6A6A]">3 kW</button>
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-[#6A6A6A]">5 kW</button>
                 <button className="px-6 py-2 rounded-full text-[14px] font-bold text-[#6A6A6A]">5kW & Above</button>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* 2 kW Card */}
                <div className="rounded-[24px] border border-gray-200 overflow-hidden bg-white flex flex-col p-8 text-center shadow-sm">
                  <h3 className="text-2xl font-bold text-[#2A2A2A] mb-1">2 KW Off-Grid</h3>
                  <p className="text-[#6A6A6A] text-[13px] mb-6">Ideal for small families with backup needs</p>
                  
                  <div className="bg-[#E8F3EB] rounded-[16px] py-4 flex flex-col items-center justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#18291c] flex items-center justify-center text-white mb-2 shadow-md">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-[#18291c] font-bold text-[14px]">4-6 Hours Backup <br/> Small Appliances</p>
                  </div>

                  <div className="inline-block px-3 py-1 bg-[#FFF4E5] text-[#E65100] text-[11px] font-bold rounded-full mb-4 w-max mx-auto">
                     Premium Batteries Included
                  </div>
                  
                  <p className="text-[#6A6A6A] text-[13px] font-medium mb-1 line-through">₹2,20,000*</p>
                  <p className="text-[32px] font-bold text-[#2A2A2A] mb-2 leading-none">₹1,65,000*</p>
                  <p className="text-[#6A6A6A] text-[12px] font-medium mb-8 bg-[#F8F8F8] py-1 px-3 rounded-md mx-auto w-max">Complete System Cost</p>

                  <p className="text-[14px] font-bold text-[#4A4A4A] mb-1">EMI Starts</p>
                  <p className="text-[18px] font-bold text-[#2A2A2A] mb-2">₹1,800 - ₹2,500 / month</p>
                  <p className="text-[#A0A0A0] text-[11px] mb-8">Down Payment Required ₹40,000 only</p>

                  <button className="w-full py-3.5 rounded-full border border-gray-300 text-[#4A4A4A] font-bold text-[14px] hover:bg-gray-50 transition-colors mt-auto">
                    Customize this Package
                  </button>
                </div>

                {/* 3 kW Card - Highlighted */}
                <div className="rounded-[24px] border-2 border-[#18291c] overflow-hidden bg-white flex flex-col p-8 text-center shadow-xl transform md:-translate-y-4 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#18291c] text-white text-[11px] font-bold px-4 py-1.5 rounded-b-lg tracking-wider">
                    MOST POPULAR
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#2A2A2A] mb-1 mt-4">3 KW Off-Grid</h3>
                  <p className="text-[#6A6A6A] text-[13px] mb-6">Ideal for standard homes & frequent cuts</p>
                  
                  <div className="bg-[#E8F3EB] rounded-[16px] py-4 flex flex-col items-center justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#18291c] flex items-center justify-center text-white mb-2 shadow-md">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-[#18291c] font-bold text-[14px]">8-10 Hours Backup <br/> Multiple Fans/Lights</p>
                  </div>

                  <div className="inline-block px-3 py-1 bg-[#FFF4E5] text-[#E65100] text-[11px] font-bold rounded-full mb-4 w-max mx-auto">
                     Premium Batteries Included
                  </div>
                  
                  <p className="text-[#6A6A6A] text-[13px] font-medium mb-1 line-through">₹3,10,000*</p>
                  <p className="text-[32px] font-bold text-[#2A2A2A] mb-2 leading-none">₹2,45,000*</p>
                  <p className="text-[#4a7a53] text-[12px] font-bold mb-8 bg-[#EAF4ED] py-1 px-3 rounded-md mx-auto w-max">Complete System Cost</p>

                  <p className="text-[14px] font-bold text-[#4A4A4A] mb-1">EMI Starts</p>
                  <p className="text-[18px] font-bold text-[#2A2A2A] mb-2">₹2,800 - ₹3,500 / month</p>
                  <p className="text-[#A0A0A0] text-[11px] mb-8">Down Payment Required ₹60,000 only</p>

                  <button className="w-full py-3.5 rounded-full bg-[#18291c] text-white font-bold text-[14px] hover:bg-[#2c4a35] transition-colors mt-auto">
                    Customize this Package
                  </button>
                </div>

                {/* 5 kW Card */}
                <div className="rounded-[24px] border border-gray-200 overflow-hidden bg-white flex flex-col p-8 text-center shadow-sm">
                  <h3 className="text-2xl font-bold text-[#2A2A2A] mb-1">5 KW Off-Grid</h3>
                  <p className="text-[#6A6A6A] text-[13px] mb-6">Heavy backup for 1-1.5 Ton AC & large homes</p>
                  
                  <div className="bg-[#E8F3EB] rounded-[16px] py-4 flex flex-col items-center justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#18291c] flex items-center justify-center text-white mb-2 shadow-md">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-[#18291c] font-bold text-[14px]">Heavy Duty Backup <br/> Supports 1 AC</p>
                  </div>

                  <div className="inline-block px-3 py-1 bg-[#FFF4E5] text-[#E65100] text-[11px] font-bold rounded-full mb-4 w-max mx-auto">
                     High Capacity Batteries
                  </div>
                  
                  <p className="text-[#6A6A6A] text-[13px] font-medium mb-1 line-through">₹4,80,000*</p>
                  <p className="text-[32px] font-bold text-[#2A2A2A] mb-2 leading-none">₹3,95,000*</p>
                  <p className="text-[#6A6A6A] text-[12px] font-medium mb-8 bg-[#F8F8F8] py-1 px-3 rounded-md mx-auto w-max">Complete System Cost</p>

                  <p className="text-[14px] font-bold text-[#4A4A4A] mb-1">EMI Starts</p>
                  <p className="text-[18px] font-bold text-[#2A2A2A] mb-2">₹4,500 - ₹5,500 / month</p>
                  <p className="text-[#A0A0A0] text-[11px] mb-8">Down Payment Required ₹95,000 only</p>

                  <button className="w-full py-3.5 rounded-full border border-gray-300 text-[#4A4A4A] font-bold text-[14px] hover:bg-gray-50 transition-colors mt-auto">
                    Customize this Package
                  </button>
                </div>
             </div>
          </motion.div>
        </section>

        {/* --- 6. FAQ Section --- */}
        <section className="py-24 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 md:px-8">
             <div className="text-center mb-20">
               <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)]">
                 Get Clarity Before You Go Solar
               </h2>
             </div>

             <div className="space-y-0 max-w-3xl mx-auto">
                {[
                  { q: "How long do solar batteries last?", a: "Modern lithium-ion solar batteries typically last between 10 to 15 years, while traditional lead-acid batteries last 5 to 7 years depending on usage cycles." },
                  { q: "Can an off-grid system run air conditioners?", a: "Yes, but you will need a larger system (typically 5kW or above) and a substantial battery bank to handle the high surge currents and continuous power draw of an AC." },
                  { q: "Do I still pay fixed meter charges to the electricity board?", a: "If you completely disconnect your grid connection, you do not pay any fixed charges. However, some people choose to keep a grid connection as an emergency backup." },
                  { q: "What happens if there are several cloudy days in a row?", a: "A properly designed off-grid system includes enough battery capacity to provide 'days of autonomy' (backup for 2-3 cloudy days). If needed, a generator can also be integrated for emergencies." }
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
