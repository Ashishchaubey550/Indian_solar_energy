"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if it's a touch device, in which case we don't want the custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // Add class to hide default cursor
    document.body.classList.add("cursor-none-global");

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.classList.remove("cursor-none-global");
    };
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-10000 bg-forest/80 backdrop-blur-sm border border-white/20 hidden md:flex items-center justify-center shadow-lg"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 12),
        y: mousePosition.y - (isHovering ? 24 : 12),
        width: isHovering ? 48 : 24,
        height: isHovering ? 48 : 24,
      }}
      transition={{
        type: "spring",
        stiffness: 1500,
        damping: 80,
        mass: 0.1
      }}
    >
      {/* Optional internal dot when not hovering */}
      <motion.div 
        animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
        className="w-1.5 h-1.5 bg-white rounded-full"
      />
    </motion.div>
  );
}
