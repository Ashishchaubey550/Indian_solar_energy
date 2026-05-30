"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Turnstile } from '@marsidev/react-turnstile';

export default function LeadGenModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    // Check session storage to see if we already showed it this session
    const hasSeenModal = sessionStorage.getItem("isge_lead_modal_seen");
    
    if (!hasSeenModal) {
      // Open after the PageLoader animation completes (2000ms + 500ms fade)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that the user closed it so we don't annoy them again this session
    sessionStorage.setItem("isge_lead_modal_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setErrorMsg("Please complete the bot verification.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add the turnstile token to the formData
    formData.append("cf-turnstile-response", turnstileToken);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error: any) {
      console.error('Error!', error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-[900px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-100/80 hover:bg-gray-200 backdrop-blur-md rounded-full flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-[#2A2A2A]" />
              </button>

              {/* Left Image Section (Hidden on small mobile screens) */}
              <div className="hidden md:block w-5/12 relative bg-[#18291c]">
                <Image
                  src="/images/rooftop-solar.jpg"
                  alt="Solar Panels Installation"
                  fill
                  className="object-cover opacity-80 mix-blend-overlay"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e1a] via-[#18291c]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <div className="w-3.5 h-3.5 bg-[#8fc358] rounded-full shadow-inner" />
                  </div>
                  <h3 className="text-white text-[26px] font-bold font-[var(--font-poppins)] leading-[1.2] mb-3">
                    Switch to Solar &<br/>Save up to 90%
                  </h3>
                  <p className="text-white/80 text-[13px] leading-relaxed pr-4">
                    Get a free site survey and a custom quote tailored to your energy needs today.
                  </p>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="w-full md:w-7/12 p-8 md:p-10 relative">
                <AnimatePresence>
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-[#EAF4ED] rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-[#2d8a39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-[28px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] mb-3">
                        Request Received!
                      </h2>
                      <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                        Thank you for your interest. Our solar experts will contact you within 24 hours to provide your free quote.
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className={`transition-opacity duration-300 ${isSuccess ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="mb-8">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#EAF4ED] text-[#18291c] text-[11px] font-bold mb-4 tracking-wide uppercase">
                      Free Consultation
                    </div>
                    <h2 className="text-2xl md:text-[32px] font-bold text-[#2A2A2A] font-[var(--font-poppins)] mb-3 leading-tight">
                      Get Your Free Solar Quote
                    </h2>
                    <p className="text-[#6A6A6A] text-[13.5px] leading-relaxed pr-4">
                      Fill out the form below and our experts will contact you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider pl-1">Full Name</label>
                        <input name="Name" required type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-[14px] text-[#2A2A2A] focus:outline-none focus:bg-white focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider pl-1">Phone Number</label>
                        <input name="Phone" required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-[14px] text-[#2A2A2A] focus:outline-none focus:bg-white focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider pl-1">Property Pincode</label>
                        <input name="Pincode" required type="text" placeholder="Enter Pincode" className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-[14px] text-[#2A2A2A] focus:outline-none focus:bg-white focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors uppercase tracking-wider" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider pl-1">Plant Capacity</label>
                        <input name="PlantCapacity" required type="text" placeholder="e.g. 5kW" className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-[14px] text-[#2A2A2A] focus:outline-none focus:bg-white focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors uppercase tracking-wider" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider pl-1">Full Address</label>
                      <input name="Address" required type="text" placeholder="Your complete address" className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-[14px] text-[#2A2A2A] focus:outline-none focus:bg-white focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider pl-1">Monthly Electricity Bill</label>
                      <div className="relative">
                        <select name="BillAmount" required defaultValue="" className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-[14px] text-[#2A2A2A] focus:outline-none focus:bg-white focus:border-[#4a7a53] focus:ring-1 focus:ring-[#4a7a53] transition-colors appearance-none">
                          <option value="" disabled hidden>Select an option</option>
                          <option value="under_2000">Under ₹2,000</option>
                          <option value="2000_5000">₹2,000 - ₹5,000</option>
                          <option value="5000_10000">₹5,000 - ₹10,000</option>
                          <option value="above_10000">Above ₹10,000</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3 mb-4 bg-red-50 text-red-600 text-[12px] rounded-xl border border-red-100">
                        {errorMsg}
                      </div>
                    )}

                    <div className="py-2 flex justify-center">
                      <Turnstile 
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
                        onSuccess={(token) => setTurnstileToken(token)}
                        options={{ theme: 'light' }}
                      />
                    </div>

                    <div className="pt-2">
                      <button disabled={isLoading} type="submit" className="w-full bg-[#18291c] hover:bg-[#2c4a35] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-[14px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg">
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Get Free Estimate <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      <p className="text-center text-[#A0A0A0] text-[10.5px] mt-4 font-medium">
                        By submitting, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
