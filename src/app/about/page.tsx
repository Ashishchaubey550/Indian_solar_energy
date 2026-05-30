"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { 
  Plus,
  Minus,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";

const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});

export default function AboutPage() {
  const [activeProcess, setActiveProcess] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleProcess = (index: number) => {
    setActiveProcess(activeProcess === index ? null : index);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <PageLoader />
      <Header />
      <main className="min-h-screen bg-[#FDFDFD] overflow-x-hidden">
        
        {/* --- 1. Hero Banner --- */}
        <section className="relative h-[60vh] min-h-[500px] w-full flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/rooftop-solar.jpg" 
              alt="About Us Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-sm font-bold text-[#2A2A2A] mb-6 shadow-lg ring-1 ring-black/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" /> About Us
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white shadow-black drop-shadow-2xl tracking-tight font-[var(--font-poppins)] mb-6">
              Powering A Sustainable Tomorrow
            </h1>
            <p className="text-white/90 text-[15px] md:text-[17px] font-medium max-w-2xl mx-auto drop-shadow-md">
              Indian solar energy is dedicated to empowering homes and businesses through reliable, affordable, and sustainable solar solutions.
            </p>
          </motion.div>
        </section>

        {/* --- 2. Introduction Section --- */}
        <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <div className="max-w-6xl mx-auto">
            {/* Top Text Part */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-20">
               <div className="w-full md:w-1/4">
                 <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] bg-white shadow-sm">
                   About Us
                 </div>
               </div>
               <div className="w-full md:w-3/4">
                 <h2 className="text-2xl md:text-[32px] font-medium text-[#2A2A2A] mb-10 leading-[1.4] font-[var(--font-poppins)]">
                   <span className="font-bold">INDIAN SOLAR</span> is a solar startup committed to transforming the way homes and businesses consume energy. We combine modern technology, high-quality solar systems, and expert installation to deliver long-term savings and sustainable energy solutions.
                 </h2>
                 <Link href="/contact" className="inline-flex px-10 py-4 bg-[#18291c] text-white rounded-full font-bold text-[14px] hover:bg-[#2c4a35] transition-colors shadow-lg">
                   Contact Us
                 </Link>
               </div>
            </div>

            {/* Bottom Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
               {/* Left Image */}
               <div className="relative rounded-[24px] overflow-hidden shadow-md h-full mt-12">
                 <Image src="/images/workers-installing.jpg" alt="Installation" fill className="object-cover" />
               </div>
               {/* Center Image with Overlay */}
               <div className="relative rounded-[24px] overflow-hidden shadow-xl h-full -mt-6">
                 <Image src="/images/quality-check.jpg" alt="Engineers" fill className="object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                   <p className="text-white text-sm md:text-[15px] font-medium leading-relaxed text-center">
                     We help homes and businesses reduce electricity bills with high-quality solar technology, expert installation, and reliable long-term support.
                   </p>
                 </div>
               </div>
               {/* Right Image */}
               <div className="relative rounded-[24px] overflow-hidden shadow-md h-full mt-12">
                 <Image src="/images/residential-solar.jpg" alt="Family" fill className="object-cover" />
               </div>
            </div>
          </div>
        </section>

        {/* --- 3. Core Values --- */}
        <section className="py-24 px-4 md:px-8 bg-[#F8F7F3]">
          <div className="max-w-6xl mx-auto">
            {/* Top Row: Pill Tag and Title */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16">
               <div className="w-full md:w-1/3">
                 <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[13px] font-semibold text-[#2A2A2A] bg-white shadow-sm">
                   Our Core Values
                 </div>
               </div>
               <div className="w-full md:w-2/3">
                 <h2 className="text-3xl md:text-[42px] font-bold text-[#2A2A2A] leading-[1.2] font-[var(--font-poppins)] text-left">
                   The Core Values That Drive<br className="hidden md:block" />
                   Purposeful and Long-Term Progress
                 </h2>
               </div>
            </div>

            {/* Bottom Row: Image and Cards */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
               {/* Left: Big Image */}
               <div className="w-full lg:w-[55%]">
                 <div className="relative h-[400px] lg:h-[520px] w-full rounded-[24px] overflow-hidden shadow-sm">
                   <Image src="/images/commercial-solar.jpg" alt="Solar farm workers" fill className="object-cover" />
                 </div>
               </div>

               {/* Right: 2x2 Cards Grid */}
               <div className="w-full lg:w-[45%]">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                   {/* Card 1 */}
                   <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[250px]">
                     <div className="w-10 h-10 rounded-full bg-[#18291c] mb-6 shadow-sm shrink-0" />
                     <div>
                       <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-2 leading-snug">Clean Energy Focus</h3>
                       <p className="text-[#6A6A6A] text-[13px] leading-relaxed">Powering a sustainable future with smart solar solutions.</p>
                     </div>
                   </div>
                   {/* Card 2 */}
                   <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[250px]">
                     <div className="w-10 h-10 rounded-full bg-[#18291c] mb-6 shadow-sm shrink-0" />
                     <div>
                       <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-2 leading-snug">Trusted Relationships</h3>
                       <p className="text-[#6A6A6A] text-[13px] leading-relaxed">Building long-term trust through transparency and reliable service.</p>
                     </div>
                   </div>
                   {/* Card 3 */}
                   <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[250px]">
                     <div className="w-10 h-10 rounded-full bg-[#18291c] mb-6 shadow-sm shrink-0" />
                     <div>
                       <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-2 leading-snug">Performance Driven</h3>
                       <p className="text-[#6A6A6A] text-[13px] leading-relaxed">Delivering efficient solar systems designed for maximum savings.</p>
                     </div>
                   </div>
                   {/* Card 4 */}
                   <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[250px]">
                     <div className="w-10 h-10 rounded-full bg-[#18291c] mb-6 shadow-sm shrink-0" />
                     <div>
                       <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-2 leading-snug">Continuous Innovation</h3>
                       <p className="text-[#6A6A6A] text-[13px] leading-relaxed">Using modern technology to create smarter energy solutions.</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- 4. Why Choose Us --- */}
        <section className="py-24 px-4 md:px-8 bg-[#FDFDFD]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
             {/* Left */}
             <div className="w-full md:w-[45%] space-y-8">
               <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] bg-white shadow-sm">
                 Why Choose Us
               </div>
               <h2 className="text-3xl md:text-[42px] font-bold text-[#2A2A2A] leading-[1.2] font-[var(--font-poppins)] pr-4">
                 Reduce Electricity Bills With Smart Solar Solutions.
               </h2>
               <div className="relative h-[500px] w-full rounded-[30px] overflow-hidden shadow-xl mt-8">
                 <Image src="/images/residential-solar.jpg" alt="Smart Solar Solutions" fill className="object-cover" />
                 <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30">
                   <div className="w-3.5 h-3.5 bg-[#8fc358] rounded-full shadow-inner" />
                 </div>
               </div>
             </div>
             {/* Right */}
             <div className="w-full md:w-[55%] pt-12 md:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 relative">
                   {/* Vertical Line Connector (Desktop) */}
                   <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gray-100 -translate-x-1/2" />

                   {/* Item 1 */}
                   <div className="relative pb-16 md:pb-0 md:border-b md:border-gray-100">
                     <span className="text-4xl md:text-[44px] font-light text-[#2A2A2A] block mb-5 font-[var(--font-poppins)]">1</span>
                     <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-3 pr-2">Certified & Experienced Engineers</h3>
                     <p className="text-[#6A6A6A] text-[13.5px] leading-relaxed pr-4">Expert team with years of proven performance in the solar industry.</p>
                   </div>
                   
                   {/* Item 2 */}
                   <div className="relative pb-16 md:pb-0 md:border-b md:border-gray-100 pl-0 md:pl-6">
                     <span className="text-4xl md:text-[44px] font-light text-[#2A2A2A] block mb-5 font-[var(--font-poppins)]">2</span>
                     <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-3 pr-2">High-Efficiency Solar Systems</h3>
                     <p className="text-[#6A6A6A] text-[13.5px] leading-relaxed pr-4">Top-tier solar panels and inverters for maximum energy output.</p>
                   </div>
                   
                   {/* Item 3 */}
                   <div className="relative pt-0 md:pt-10">
                     <span className="text-4xl md:text-[44px] font-light text-[#2A2A2A] block mb-5 font-[var(--font-poppins)]">3</span>
                     <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-3 pr-2">End-to-End Solar Solutions</h3>
                     <p className="text-[#6A6A6A] text-[13.5px] leading-relaxed pr-4">From consultation to installation, we handle everything for you.</p>
                   </div>
                   
                   {/* Item 4 */}
                   <div className="relative pt-0 md:pt-10 pl-0 md:pl-6">
                     <span className="text-4xl md:text-[44px] font-light text-[#2A2A2A] block mb-5 font-[var(--font-poppins)]">4</span>
                     <h3 className="text-[17px] font-bold text-[#2A2A2A] mb-3 pr-2">Transparent & Affordable Pricing</h3>
                     <p className="text-[#6A6A6A] text-[13.5px] leading-relaxed pr-4">Cost-effective solutions with no hidden charges or surprises.</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* --- 5. Process Section --- */}
        <section className="py-24 px-4 md:px-8 bg-[#18291c] text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
             {/* Left Accordion */}
             <div className="w-full md:w-1/2 space-y-8">
               <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 text-[13px] font-semibold text-white bg-white/5 backdrop-blur-sm">
                 Process
               </div>
               <h2 className="text-3xl md:text-[42px] font-bold text-white leading-[1.2] font-[var(--font-poppins)] mb-12 pr-10">
                 A Seamless Process For Sustainable Energy
               </h2>
               
               <div className="space-y-4 pr-0 md:pr-8">
                 {[
                   { title: "Consultation", desc: "We start by analyzing your energy requirements, roof space, and electricity bills to determine the perfect system size for your needs." },
                   { title: "Planning", desc: "Our engineers design a custom solar layout and handle all necessary permits and government approvals." },
                   { title: "Installation", desc: "Our certified technicians install the solar panels and inverters with precision and care, usually within a few days." },
                   { title: "Activation", desc: "We complete the net-metering setup with your electricity board and turn on your new solar power system." },
                   { title: "Support", desc: "We provide ongoing monitoring and maintenance to ensure your system operates at peak efficiency for decades." }
                 ].map((step, i) => (
                   <div key={i} className={`rounded-2xl overflow-hidden transition-all duration-300 ${activeProcess === i ? "bg-[#eaf3ed] text-[#18291c] shadow-lg" : "bg-white text-[#2A2A2A]"}`}>
                     <button 
                       onClick={() => toggleProcess(i)}
                       className="w-full flex items-center justify-between p-6 text-left"
                     >
                       <div className="flex items-center gap-4">
                         <span className="text-[14px] font-bold w-6">{i + 1}.</span>
                         <span className="text-[17px] font-bold">{step.title}</span>
                       </div>
                       {activeProcess === i ? <ChevronUp className="w-5 h-5 text-[#4a7a53]" /> : <ChevronDown className="w-5 h-5 text-[#A0A0A0]" />}
                     </button>
                     <AnimatePresence>
                       {activeProcess === i && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <p className="px-6 pb-6 text-[#18291c]/80 text-[13.5px] leading-relaxed ml-10">
                             {step.desc}
                           </p>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 ))}
               </div>
             </div>
             
             {/* Right Image */}
             <div className="w-full md:w-1/2">
                <div className="relative h-[600px] md:h-[700px] w-full rounded-[30px] overflow-hidden shadow-2xl">
                   <Image src="/images/rooftop-solar.jpg" alt="Installation Process" fill className="object-cover" />
                </div>
             </div>
          </div>
        </section>

        {/* --- 6. FAQ Section --- */}
        <section className="py-24 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
             {/* Left */}
             <div className="w-full md:w-1/3">
               <h2 className="text-3xl md:text-[40px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] mb-6">
                 Got questions?
               </h2>
               <p className="text-[#6A6A6A] text-[14px] leading-relaxed mb-10 pr-8">
                 We're here to help you make the best decision for your energy needs. Reach out to our expert team for personalized advice.
               </p>
               <div className="mb-6">
                 <p className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-3">For general inquiries</p>
                 <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#18291c] text-white text-[13px] font-bold hover:bg-[#2c4a35] transition-colors shadow-sm">
                   Contact Us
                 </Link>
               </div>
             </div>
             
             {/* Right FAQs */}
             <div className="w-full md:w-2/3">
               <div className="border-t border-gray-200">
                  {[
                    { q: "How much space is required for installation?", a: "Typically, you need about 100 sq. ft. of shade-free roof space per 1kW of solar panel capacity." },
                    { q: "What is the life of a solar plant?", a: "High-quality solar panels have a lifespan of 25 to 30 years, and they come with a 25-year performance warranty." },
                    { q: "Will solar panels work on cloudy days?", a: "Yes, solar panels still generate electricity on cloudy days, though their output is reduced compared to direct sunlight." },
                    { q: "How long does the installation process take?", a: "The physical installation usually takes 2-3 days for a standard residential system, but paperwork and net-metering approvals can take 2-4 weeks." },
                    { q: "Is there any maintenance required?", a: "Solar systems require very little maintenance. Occasional cleaning of the panels (once every few weeks) is usually enough to maintain peak efficiency." },
                    { q: "Do you offer financing options?", a: "Yes, we partner with leading banks and NBFCs to offer flexible EMI options, making solar affordable for everyone." }
                  ].map((faq, i) => (
                    <div key={i} className="border-b border-gray-200">
                      <button 
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between py-6 text-left group"
                      >
                        <span className={`text-[15px] font-bold transition-colors ${activeFaq === i ? "text-[#18291c]" : "text-[#2A2A2A] group-hover:text-[#4a7a53]"}`}>{faq.q}</span>
                        <div className={`w-7 h-7 flex-shrink-0 ml-4 rounded-full flex items-center justify-center transition-all shadow-sm ${activeFaq === i ? 'bg-[#18291c] text-white' : 'bg-white border border-gray-200 text-[#2A2A2A] group-hover:bg-[#f5f5f5]'}`}>
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
                            <p className="pb-8 text-[#6A6A6A] text-[13.5px] leading-relaxed pr-12">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
