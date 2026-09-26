"use client";

import React from "react";
import { SamsungS24UltraNexus } from "./SamsungS24Ultra";
import { Smartphone, CheckCircle2, ArrowUpRight, Layers, AlertCircle, Wrench, BarChart } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";

export const NexusShowcase: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();

  return (
    <section id="nexus-showcase" className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]/60">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-2">
            <Smartphone size={14} />
            <span>01 // CASE STUDY • MOBILE PLATFORM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-[#f2f2f0] tracking-tight">
            VIT-AP NEXUS
          </h2>
          <p className="text-base text-[#cbd5e1] max-w-2xl mt-2 font-normal leading-relaxed">
            Offline-first mobile academic super-app designed to eliminate erratic university portal timeouts and provide instant attendance forecasting.
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3.5 py-1.5 rounded-full bg-[#101216] border border-[#22262d] flex items-center gap-2 text-[#cbd5e1]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>FLUTTER • RIVERPOD • SQLITE • FASTAPI</span>
          </div>
        </div>
      </div>

      {/* Grid: 3D Phone Simulator (Left) + Structured Case Study (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: 3D Phone Simulator */}
        <div className="lg:col-span-6 flex justify-center">
          <SamsungS24UltraNexus />
        </div>

        {/* Right Column: Structured Case Study Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-[#22262d] bg-[#101216] p-6 md:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#22262d] pb-4">
              <div className="w-9 h-9 rounded-xl bg-[#6c8cff]/10 border border-[#6c8cff]/30 flex items-center justify-center text-[#6c8cff]">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f2f2f0] uppercase font-mono">
                  CASE STUDY: ARCHITECTURE &amp; RESULTS
                </h3>
                <span className="text-xs text-[#a1a7b5] font-mono">
                  From erratic student portal to sub-15ms native super-app
                </span>
              </div>
            </div>

            {/* 4 Pillars: Problem, Contribution, Tech, Outcome */}
            <div className="space-y-3.5 text-xs font-mono">
              {/* 1. Problem */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertCircle size={14} />
                  <span>PROBLEM</span>
                </div>
                <p className="text-[#cbd5e1] font-sans text-sm leading-relaxed">
                  The campus web portal suffered from frequent session timeouts, slow DOM rendering, and required re-authenticating repeatedly just to check daily timetable and attendance safety margins.
                </p>
              </div>

              {/* 2. Contribution */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#6c8cff] font-bold">
                  <Wrench size={14} />
                  <span>MY CONTRIBUTION</span>
                </div>
                <p className="text-[#cbd5e1] font-sans text-sm leading-relaxed">
                  Designed the entire mobile frontend in Flutter with Riverpod state selectors, built a local SQLite caching engine for instant reads, and engineered an asynchronous FastAPI proxy to parse and structure student records.
                </p>
              </div>

              {/* 3. Measurable Outcome */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <BarChart size={14} />
                  <span>MEASURABLE OUTCOME</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-[#101216] border border-[#22262d]">
                    <div className="text-[10px] text-[#a1a7b5]">CACHE READ SPEED</div>
                    <div className="text-emerald-400 font-bold text-xs mt-0.5">&lt; 15ms local SQLite read (measured on device)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#101216] border border-[#22262d]">
                    <div className="text-[10px] text-[#a1a7b5]">UI FRAME RATE</div>
                    <div className="text-emerald-400 font-bold text-xs mt-0.5">120 FPS target / UI benchmark</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links & Source */}
            <div className="pt-3 border-t border-[#22262d] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <span className="text-[#a1a7b5]">Interactive 3D S24 Ultra model simulation</span>
              <a
                href="https://github.com/Gnanesh-2007/Vitap_nexus"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#6c8cff] text-[#08090b] hover:bg-[#85a0ff] flex items-center gap-1.5 font-bold transition-all shadow-md"
                onMouseEnter={() => {
                  setCursor("link", "GIT");
                  sound.hover();
                }}
                onMouseLeave={resetCursor}
              >
                <span>GitHub Source</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
