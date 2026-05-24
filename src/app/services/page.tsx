"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});

export default function ServicesPage() {
  const [activeProcess, setActiveProcess] = useState<number>(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);

  const processSteps = [
    { title: "Consultation", desc: "We start by understanding your energy needs, surveying your site, and providing a free initial consultation to recommend the best solar solution." },
    { title: "Planning", desc: "Our engineering team designs a customized solar architecture optimized for your specific property and energy consumption patterns." },
    { title: "Installation", desc: "Certified professionals handle the entire installation process with premium components, ensuring safety and minimal disruption." },
    { title: "Activation", desc: "We manage all necessary grid connections, testing, and regulatory approvals before officially activating your system." },
    { title: "Support", desc: "Enjoy peace of mind with our continuous monitoring, lifetime support, and comprehensive maintenance services." }
  ];

  return (
    <>
      <PageLoader />
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* --- 1. Hero Banner --- */}
        <section ref={heroRef} className="relative h-[65vh] min-h-[500px] w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 h-[120%] top-[-10%]">
            <Image
              src="/images/rooftop-solar.jpg"
              alt="Services Banner"
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
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-white text-[13px] font-bold text-[#2A2A2A] mb-6 shadow-lg">
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white shadow-black drop-shadow-2xl tracking-tight font-[var(--font-poppins)] mb-6 leading-tight">
              Sustainable Energy Solutions<br/>Made Simple
            </h1>
            <p className="text-white/90 text-[15px] max-w-2xl mx-auto drop-shadow-md">
              Contact our team at Indian Solar Green Energy to discover the perfect solar solution for your home or business.
            </p>
          </motion.div>
        </section>

        {/* --- 2. Smart Solar Services (Horizontal Scroll/Cards) --- */}
        <section className="py-24 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-6 shadow-sm">
                  Our Services
                </div>
                <h2 className="text-3xl md:text-[40px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] leading-[1.2]">
                  Smart solar services designed<br/>to reduce costs and maximize<br/>efficiency.
                </h2>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#2A2A2A] hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#2A2A2A] hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Residential Solar Installation", desc: "Power your home with clean energy.", img: "/images/rooftop-solar.jpg", link: "/services/residential-solar" },
                { title: "Commercial Solar Installations", desc: "Energy solutions for businesses.", img: "/images/commercial-solar.jpg", link: "/services/commercial-solar" },
                { title: "Industrial Solar Projects", desc: "Large-scale solar farm deployments.", img: "/images/about-solar.jpg", link: "/services/industrial-solar" }
              ].map((service, i) => (
                <Link href={service.link} key={i}>
                  <div className="relative h-[380px] w-full rounded-[30px] overflow-hidden group cursor-pointer shadow-md">
                     <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                        <ArrowUpRight className="w-6 h-6 text-[#2A2A2A]" />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                       <h3 className="text-xl font-bold text-white mb-2 leading-tight pr-4">{service.title}</h3>
                       <p className="text-gray-300 text-sm hidden group-hover:block transition-all duration-300">{service.desc}</p>
                     </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 3. Choose Type (Grid Cards) --- */}
        <section className="py-16 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-10 shadow-sm">
              Choose Type
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "On-Grid Solar System", img: "/images/rooftop-solar.jpg", link: "/services/on-grid-solar" },
                { title: "Off-Grid Solar System", img: "/images/quality-check.jpg", link: "/services/off-grid-solar" },
                { title: "Hybrid Solar System", img: "/images/worker-inspecting.jpg", link: "/services/hybrid-solar" }
              ].map((type, i) => (
                <Link href={type.link} key={i}>
                  <div className="flex flex-col group cursor-pointer">
                    <div className="relative h-[280px] w-full rounded-[30px] overflow-hidden shadow-sm border border-gray-100 mb-6">
                      <Image src={type.img} alt={type.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#2A2A2A] text-center group-hover:text-[#4a7a53] transition-colors">{type.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 4. Process Section --- */}
        <section className="py-24 px-4 sm:px-6 md:px-8 bg-[#18291c] mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              
              {/* Left Side: Accordion */}
              <div>
                <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-[13px] font-bold text-[#2A2A2A] mb-8">
                  Process
                </div>
                <h2 className="text-3xl md:text-[44px] font-bold text-white font-[var(--font-poppins)] leading-[1.2] mb-12">
                  A Seamless Process For<br/>Sustainable Energy
                </h2>

                <div className="space-y-4">
                  {processSteps.map((step, i) => {
                    const isActive = activeProcess === i;
                    return (
                      <div 
                        key={i} 
                        className={`rounded-[20px] overflow-hidden transition-all duration-300 ${isActive ? 'bg-[#EAF4ED]' : 'bg-transparent border border-white/20'}`}
                      >
                        <button 
                          onClick={() => setActiveProcess(i)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[15px] font-bold ${isActive ? 'text-[#18291c]' : 'text-white'}`}>{i + 1}.</span>
                            <span className={`text-[18px] font-bold ${isActive ? 'text-[#18291c]' : 'text-white'}`}>{step.title}</span>
                          </div>
                          {isActive ? (
                            <ChevronUp className="w-5 h-5 text-[#18291c]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-white" />
                          )}
                        </button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 pb-6 pt-2 text-[#4A4A4A] text-[14px] leading-relaxed pl-[42px]">
                                {step.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="relative h-[600px] w-full rounded-[30px] overflow-hidden shadow-2xl">
                 <Image src="/images/worker-inspecting.jpg" alt="Installation Process" fill className="object-cover" />
              </div>

            </div>
          </motion.div>
        </section>

        {/* --- 5. Why Choose Us --- */}
        <section className="py-28 px-4 md:px-8 max-w-[1400px] mx-auto bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] mb-8 shadow-sm">
              Why Choose Us
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-start">
              
              <div className="w-full md:w-[45%] relative">
                <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] max-w-sm leading-[1.2] mb-12">
                  Reduce Electricity Bills With Smart Solar Solutions.
                </h2>
                <div className="relative h-[450px] md:h-[500px] rounded-[30px] overflow-hidden shadow-2xl">
                   <Image src="/images/workers-installing.jpg" alt="Solar Solutions" fill className="object-cover" />
                </div>
              </div>
              
              <div className="w-full md:w-[55%] grid grid-cols-2 gap-x-8 gap-y-12 pt-0 md:pt-[140px] pr-4">
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

      </main>
      <Footer />
    </>
  );
}

