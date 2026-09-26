"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Shockwave {
  id: number;
  x: number;
  y: number;
}

export const ShockwaveClick: React.FC = () => {
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't create shockwave on interactive inputs
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      const newWave: Shockwave = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setShockwaves((prev) => [...prev.slice(-4), newWave]);

      setTimeout(() => {
        setShockwaves((prev) => prev.filter((w) => w.id !== newWave.id));
      }, 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {shockwaves.map((wave) => (
          <React.Fragment key={wave.id}>
            {/* Primary expanding ring */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 140, height: 140, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                left: wave.x,
                top: wave.y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute rounded-full border-2 border-[#6c8cff] shadow-[0_0_20px_#6c8cff]"
            />

            {/* Secondary fast halo */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: 220, height: 220, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                left: wave.x,
                top: wave.y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute rounded-full border border-[#85a0ff] shadow-[0_0_30px_#6c8cff]"
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};
