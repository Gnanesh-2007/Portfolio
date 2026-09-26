"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { ArrowUp, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  const { setCursor, resetCursor, setDevModalOpen } = useAppStore();

  const scrollToTop = () => {
    sound.enter();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#22262d] bg-[#08090b] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#8b9099]">
        {/* Left: Brand / Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#101216] border border-[#22262d] flex items-center justify-center font-bold text-[#f2f2f0]">
            G
          </div>
          <div>
            <span className="text-[#f2f2f0] font-bold">GNANESH REDDY MARAM</span>
            <span className="mx-2">•</span>
            <span>NELLORE, ANDHRA PRADESH, INDIA</span>
          </div>
        </div>

        {/* Center: System Telemetry */}
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-[#10b981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </span>
          <span className="text-[#22262d]">|</span>
          <button
            onClick={() => {
              sound.click();
              setDevModalOpen(true);
            }}
            className="hover:text-[#6c8cff] flex items-center gap-1 transition-colors"
          >
            <Terminal size={12} />
            <span>DEV CONSOLE (G)</span>
          </button>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#22262d] bg-[#101216] hover:border-[#6c8cff] hover:text-[#f2f2f0] transition-all"
          onMouseEnter={() => {
            setCursor("link", "TOP");
            sound.hover();
          }}
          onMouseLeave={resetCursor}
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
};
