"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/logo.png"
              alt="Indian Solar Green Energy"
              width={250}
              height={80}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </motion.div>
          {/* Loading bar */}
          <div className="mt-6 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#2d8a39] to-[#4caf50] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
