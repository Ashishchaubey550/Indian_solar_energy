"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { 
  Plus,
  Minus,
  ArrowRight,
  ChevronRight
} from "lucide-react";

const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset(); // Reset form on success
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <section ref={heroRef} className="relative h-[60vh] min-h-[500px] w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 h-[120%] top-[-10%]">
            <Image
              src="/images/rooftop-solar.jpg" 
              alt="Contact Us Banner"
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
            <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-sm font-bold text-[#2A2A2A] mb-6 shadow-lg ring-1 ring-black/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" /> Contact
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white shadow-black drop-shadow-2xl tracking-tight font-[var(--font-poppins)] mb-6">
              Let's Build Your Energy Future
            </h1>
            <p className="text-white/90 text-[15px] md:text-[17px] font-medium max-w-2xl mx-auto drop-shadow-md">
              Connect with our experts and start your sustainable journey.
            </p>
          </motion.div>
        </section>

        {/* --- 2. Contact Form Section --- */}
        <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
             <div className="text-center md:text-left mb-16">
               <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] bg-white shadow-sm mb-6">
                 Contact
               </div>
               <h2 className="text-3xl md:text-[44px] font-bold text-[#2A2A2A] leading-[1.2] font-[var(--font-poppins)] mb-4">
                 Get in Touch
               </h2>
               <p className="text-[#6A6A6A] text-[15px] leading-relaxed max-w-xl">
                 Our team is here to help answer your questions, provide more information on our services, and create an effective solution for your needs.
               </p>
             </div>

             <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
               {/* Left Title */}
               <div className="w-full md:w-1/3 pt-4">
                 <h3 className="text-2xl md:text-[32px] font-medium text-[#2A2A2A] font-[var(--font-poppins)]">
                   Send us a Message
                 </h3>
               </div>
               
               {/* Right Form */}
               <div className="w-full md:w-2/3 bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-gray-100">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contactName" className="text-[12px] font-bold text-[#2A2A2A] uppercase tracking-wider pl-1">Name</label>
                          <input id="contactName" type="text" name="Name" required placeholder="Your full name" className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl text-[14px] focus:outline-none focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contactPhone" className="text-[12px] font-bold text-[#2A2A2A] uppercase tracking-wider pl-1">Phone</label>
                          <input id="contactPhone" type="tel" name="Phone" required placeholder="Your phone number" className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl text-[14px] focus:outline-none focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contactEmail" className="text-[12px] font-bold text-[#2A2A2A] uppercase tracking-wider pl-1">Email</label>
                          <input id="contactEmail" type="email" name="Email" required placeholder="Your email address" className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl text-[14px] focus:outline-none focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contactTopic" className="text-[12px] font-bold text-[#2A2A2A] uppercase tracking-wider pl-1">Topic</label>
                          <select id="contactTopic" name="Topic" className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl text-[14px] focus:outline-none focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors appearance-none text-[#6A6A6A]">
                            <option>Solar Installation Inquiry</option>
                            <option>Maintenance & Support</option>
                            <option>Partnership Opportunities</option>
                            <option>Other</option>
                          </select>
                        </div>
                     </div>
                     <div className="space-y-2">
                       <label htmlFor="contactAddress" className="text-[12px] font-bold text-[#2A2A2A] uppercase tracking-wider pl-1">Address</label>
                       <input id="contactAddress" type="text" name="Address" placeholder="Your full address (City, State, Pincode)" className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl text-[14px] focus:outline-none focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                     </div>
                     <div className="space-y-2">
                       <label htmlFor="contactMessage" className="text-[12px] font-bold text-[#2A2A2A] uppercase tracking-wider pl-1">How can we help?</label>
                       <textarea id="contactMessage" name="Message" rows={5} placeholder="Tell us about your project or inquiry..." className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl text-[14px] focus:outline-none focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors resize-none"></textarea>
                     </div>

                     {submitStatus === "success" && (
                       <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200">
                         Thank you! Your message has been sent successfully. We will check it and reply to you soon.
                       </div>
                     )}

                     {submitStatus === "error" && (
                       <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200">
                         {errorMessage}
                       </div>
                     )}

                     <div className="pt-4">
                       <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 py-4 bg-[#18291c] hover:bg-[#2c4a35] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-full font-bold transition-colors shadow-lg flex items-center justify-center gap-2">
                         {isSubmitting ? (
                           <>
                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                             Sending...
                           </>
                         ) : (
                           "Submit Message"
                         )}
                       </button>
                     </div>
                  </form>
               </div>
             </div>
          </motion.div>
        </section>

        {/* --- 3. Location & Map Section --- */}
        <section className="py-24 px-4 md:px-8 bg-[#FDFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-[#F8F7F3] rounded-[30px] p-8 md:p-12 flex flex-col gap-12"
          >
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-gray-200 text-[13px] font-semibold text-[#2A2A2A] bg-white shadow-sm mb-6">
                Our Location
              </div>
              <h2 className="text-3xl md:text-[40px] font-bold text-[#2A2A2A] leading-[1.2] font-[var(--font-poppins)] mb-4">
                Visit Our Headquarters
              </h2>
              <p className="text-[#6A6A6A] text-[15px] leading-relaxed">
                Come talk to our experts in person and see our solar technology displays.
              </p>
            </div>

            <div className="w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden shadow-sm border border-gray-200">
              <iframe 
                src="https://maps.google.com/maps?q=Partawal+Bazar,+Gorakhpur,+Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </section>

        {/* --- 4. FAQ Section --- */}
        <section className="py-24 px-4 md:px-8 bg-white border-t border-gray-100">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24"
          >
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
                 <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#18291c] text-white text-[13px] font-bold hover:bg-[#2c4a35] transition-colors shadow-sm">
                   Contact Us
                 </button>
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
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
