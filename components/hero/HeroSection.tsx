"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GnaneshHero3DView } from "@/components/three/GnaneshDetailed3DModel";
import { PERSONAL_DATA } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { ArrowUpRight, ArrowDown, FileText, Sparkles, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();

  // Animated Typographic Decrypt Streams
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  // Mouse Parallax for independent name layer movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const gnaneshShiftX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const gnaneshShiftY = useTransform(smoothY, [-1, 1], [-4, 4]);

  const maramShiftX = useTransform(smoothX, [-1, 1], [12, -12]);
  const maramShiftY = useTransform(smoothY, [-1, 1], [8, -8]);

  // Decryption / Character Ingestion Animation
  useEffect(() => {
    const targetFirst = "GNANESH";
    const targetLast = "MARAM";

    let fIdx = 0;
    const firstTimer = setInterval(() => {
      if (fIdx <= targetFirst.length) {
        setFirstNameText(targetFirst.slice(0, fIdx));
        fIdx++;
        sound.telemetry();
      } else {
        clearInterval(firstTimer);

        let lIdx = 0;
        const lastTimer = setInterval(() => {
          if (lIdx <= targetLast.length) {
            setLastNameText(targetLast.slice(0, lIdx));
            lIdx++;
            sound.telemetry();
          } else {
            clearInterval(lastTimer);
            setTypingComplete(true);
          }
        }, 55);
      }
    }, 45);

    return () => clearInterval(firstTimer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between"
    >
      {/* Top Status & Recruiter Fast-Track Navigation */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#a1a7b5] border-b border-[#22262d] pb-4 mb-4">
        {/* Availability Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#22262d] bg-[#101216]">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[#f2f2f0] font-semibold tracking-wider">AVAILABLE</span>
          <span className="text-[#a1a7b5] text-[11px] hidden sm:inline">• SOFTWARE ENGINEERING &amp; INTERNSHIPS</span>
        </div>

        {/* Recruiter Fast-Track Jump Route */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#6c8cff] font-bold hidden md:inline flex items-center gap-1">
            <Compass size={13} />
            <span>Fast-Track:</span>
          </span>
          <div className="flex items-center gap-2 text-[#a1a7b5]">
            <a href="#about" className="hover:text-white transition-colors underline-offset-4 hover:underline">About</a>
            <span>&rarr;</span>
            <a href="#work" className="hover:text-white transition-colors underline-offset-4 hover:underline">Projects</a>
            <span>&rarr;</span>
            <a href={PERSONAL_DATA.resume} target="_blank" rel="noreferrer" className="text-[#6c8cff] hover:underline font-bold">Resume</a>
            <span>&rarr;</span>
            <a href="#contact" className="hover:text-white transition-colors underline-offset-4 hover:underline">Contact</a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO MAIN: DIRECT VALUE PROPOSITION & CLEAR PROOF
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4">
        {/* Left Column: Direct Value Headline & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity Decrypt Stream */}
          <div className="space-y-1">
            <div className="font-mono text-xs tracking-[0.2em] text-[#6c8cff] uppercase font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6c8cff]" />
              <span>FULL-STACK DEVELOPER &amp; SYSTEMS BUILDER</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-2xl sm:text-3xl font-black tracking-tight text-[#f2f2f0]">
              <motion.span style={{ x: gnaneshShiftX, y: gnaneshShiftY }} className="text-white">
                {firstNameText || "GNANESH"}
                {!typingComplete && (
                  <span className="inline-block w-2 h-6 bg-[#6c8cff] ml-1 animate-pulse" />
                )}
              </motion.span>
              <motion.span style={{ x: maramShiftX, y: maramShiftY }} className="text-[#6c8cff] font-medium">
                {lastNameText}
              </motion.span>
            </div>
          </div>

          {/* Specific Value-Driven Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#f2f2f0] leading-[1.12]">
            Building offline-first applications and{" "}
            <span className="text-[#6c8cff] drop-shadow-[0_0_30px_rgba(108,140,255,0.35)]">
              real-time AI vision systems.
            </span>
          </h1>

          {/* Grounded, Jargon-Free Description */}
          <p className="text-base sm:text-lg text-[#cbd5e1] font-normal leading-relaxed max-w-xl">
            Computer Science undergraduate engineering high-throughput FastAPI backends, sub-15ms SQLite caching engines in Flutter, and multi-camera vehicle tracking in PyTorch.
          </p>

          {/* Action Buttons: Clear CTAs + Visible Resume */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6c8cff] text-[#08090b] font-mono text-xs font-extrabold tracking-wider hover:bg-[#85a0ff] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(108,140,255,0.3)]"
              onMouseEnter={() => {
                setCursor("view", "BUILDS");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.click()}
            >
              <span>FEATURED PROJECTS</span>
              <ArrowDown size={14} />
            </a>

            <a
              href={PERSONAL_DATA.resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#374151] bg-[#101216] text-[#f2f2f0] font-mono text-xs font-bold tracking-wider hover:border-[#6c8cff] hover:text-[#6c8cff] transition-all shadow-sm"
              onMouseEnter={() => {
                setCursor("link", "RESUME");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.click()}
            >
              <FileText size={14} className="text-[#6c8cff]" />
              <span>RESUME / CV</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#22262d] bg-[#101216] text-[#a1a7b5] font-mono text-xs tracking-wider hover:border-[#6c8cff] hover:text-white transition-all"
              onMouseEnter={() => {
                setCursor("link", "CHAT");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.click()}
            >
              <span>LET&apos;S CHAT</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean 3D Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <GnaneshHero3DView />
        </div>
      </div>

      {/* =========================================================================
          BOTTOM METRICS BAR (Concrete, demonstrable benchmarks)
         ========================================================================= */}
      <div className="relative z-30 pt-8 mt-6 border-t border-[#22262d]/70 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f2f2f0] tracking-tight">
            03<span className="text-[#6c8cff]">+</span>
          </div>
          <div className="text-[11px] text-[#a1a7b5] tracking-wider uppercase">
            COMPLETED FLAGSHIP PROJECTS
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f2f2f0] tracking-tight">
            120<span className="text-[#10b981]">FPS</span>
          </div>
          <div className="text-[11px] text-[#a1a7b5] tracking-wider uppercase">
            UI BENCHMARK / TARGET
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f2f2f0] tracking-tight">
            &lt;15<span className="text-[#6c8cff]">ms</span>
          </div>
          <div className="text-[11px] text-[#a1a7b5] tracking-wider uppercase">
            LOCAL SQLITE READ (ON-DEVICE)
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f2f2f0] tracking-tight">
            30<span className="text-[#6c8cff]">+</span>
          </div>
          <div className="text-[11px] text-[#a1a7b5] tracking-wider uppercase">
            FPS GPU RE-ID BATCH INFERENCE
          </div>
        </div>
      </div>
    </section>
  );
};
