"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";

export const CinematicLoader: React.FC = () => {
  const { isLoaded, setIsLoaded } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CORE...");

  useEffect(() => {
    const steps = [
      { p: 18, text: "PARSING SYSTEM TOPOLOGY...", delay: 200 },
      { p: 44, text: "MOUNTING 3D CONSTELLATION...", delay: 500 },
      { p: 76, text: "OPTIMIZING SHADERS & STREAMS...", delay: 850 },
      { p: 100, text: "SYSTEM READY // GNANESH", delay: 1200 },
    ];

    const timeouts = steps.map((step) =>
      setTimeout(() => {
        setProgress(step.p);
        setStatusText(step.text);
        sound.telemetry();
      }, step.delay)
    );

    const finishTimeout = setTimeout(() => {
      sound.enter();
      setIsLoaded(true);
    }, 1600);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [setIsLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
          {/* Top Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#08090b] border-b border-[#22262d] flex items-end justify-center pb-8 pointer-events-auto"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-2xl md:text-5xl font-extrabold tracking-[0.25em] text-[#f2f2f0]"
              >
                GNANESH
              </motion.div>
              <div className="font-mono text-[10px] md:text-xs text-[#6c8cff] tracking-widest mt-2 uppercase">
                SYSTEMS / IDEAS / EXPERIENCES
              </div>
            </div>
          </motion.div>

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#08090b] border-t border-[#22262d] flex items-start justify-center pt-8 pointer-events-auto"
          >
            <div className="w-full max-w-md px-6 text-center">
              {/* Progress percentage */}
              <div className="flex items-center justify-between font-mono text-xs text-[#8b9099] mb-2">
                <span>{statusText}</span>
                <span className="text-[#6c8cff] font-bold">{progress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[2px] bg-[#22262d] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#3e5cc9] to-[#6c8cff]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="mt-4 font-mono text-[10px] text-[#8b9099] flex justify-between">
                <span>LOC: NELLORE, IN</span>
                <span>SYS: ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
