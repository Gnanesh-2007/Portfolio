"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { ArrowDownRight } from "lucide-react";

export const StatementSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);

  return (
    <section className="relative py-36 md:py-48 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]/40">
      <div className="max-w-4xl">
        {/* Minimalist Sub-header */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#8b9099] tracking-widest uppercase mb-12">
          <span>01 // PRINCIPLE</span>
        </div>

        {/* Clean, Spacious Kinetic Statement */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight text-[#f2f2f0] leading-[1.15]">
          I BUILD{" "}
          <span
            className="text-[#f2f2f0] font-normal underline decoration-[#6c8cff] decoration-1 underline-offset-8 cursor-pointer hover:text-[#6c8cff] transition-colors"
            onMouseEnter={() => {
              setActiveKeyword("systems");
              setCursor("view", "SYSTEMS");
              sound.hover();
            }}
            onMouseLeave={() => {
              setActiveKeyword(null);
              resetCursor();
            }}
          >
            DIGITAL SYSTEMS
          </span>{" "}
          THAT TURN{" "}
          <span
            className="text-[#8b9099] font-light cursor-pointer hover:text-white transition-colors"
            onMouseEnter={() => {
              setActiveKeyword("complexity");
              setCursor("view", "CHAOS");
              sound.hover();
            }}
            onMouseLeave={() => {
              setActiveKeyword(null);
              resetCursor();
            }}
          >
            COMPLEXITY
          </span>{" "}
          INTO{" "}
          <span
            className="text-[#6c8cff] font-medium cursor-pointer hover:text-white transition-colors"
            onMouseEnter={() => {
              setActiveKeyword("clarity");
              setCursor("view", "CLARITY");
              sound.hover();
            }}
            onMouseLeave={() => {
              setActiveKeyword(null);
              resetCursor();
            }}
          >
            CLARITY.
          </span>
        </h2>

        {/* Subtle dynamic annotation upon hover */}
        <div className="h-16 mt-8">
          <AnimatePresence mode="wait">
            {activeKeyword === "systems" && (
              <motion.div
                key="systems"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-mono text-xs text-[#6c8cff] flex items-center gap-2"
              >
                <ArrowDownRight size={14} />
                <span>Microservices, offline SQLite engines, FastAPI proxies, and reactive state trees.</span>
              </motion.div>
            )}

            {activeKeyword === "complexity" && (
              <motion.div
                key="complexity"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-mono text-xs text-[#8b9099] flex items-center gap-2"
              >
                <ArrowDownRight size={14} />
                <span>Multi-camera video feeds, fragmented university portal APIs, IoT telemetry, and race conditions.</span>
              </motion.div>
            )}

            {activeKeyword === "clarity" && (
              <motion.div
                key="clarity"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-mono text-xs text-[#10b981] flex items-center gap-2"
              >
                <ArrowDownRight size={14} />
                <span>Instant calculations, deterministic state machines, and zero-latency user experiences.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
