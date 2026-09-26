"use client";

import React from "react";
import { PERSONAL_DATA } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { Radio, Code2, BookOpen, Search, MapPin, Zap } from "lucide-react";

export const CurrentlySection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();

  const items = [
    {
      label: "BUILDING",
      value: PERSONAL_DATA.currently.building,
      icon: <Code2 size={16} className="text-[#6c8cff]" />,
      color: "border-[#6c8cff]/30 text-[#6c8cff]",
    },
    {
      label: "LEARNING",
      value: PERSONAL_DATA.currently.learning,
      icon: <BookOpen size={16} className="text-[#10b981]" />,
      color: "border-[#10b981]/30 text-[#10b981]",
    },
    {
      label: "EXPLORING",
      value: PERSONAL_DATA.currently.exploring,
      icon: <Search size={16} className="text-[#f59e0b]" />,
      color: "border-[#f59e0b]/30 text-[#f59e0b]",
    },
    {
      label: "BASED IN",
      value: PERSONAL_DATA.currently.location,
      icon: <MapPin size={16} className="text-[#6c8cff]" />,
      color: "border-[#6c8cff]/30 text-[#6c8cff]",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase">
          <Radio size={14} className="text-[#10b981] animate-pulse" />
          <span>07 // REAL-TIME RADAR & FOCUS</span>
        </div>
        <span className="font-mono text-xs text-[#8b9099]">UPDATED LIVE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-5 rounded-xl border border-[#22262d] bg-[#101216] flex flex-col justify-between hover:border-[#6c8cff]/40 transition-colors group"
            onMouseEnter={() => {
              setCursor("view", item.label);
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            <div className="flex items-center justify-between border-b border-[#22262d] pb-3 mb-3">
              <span className={`font-mono text-xs font-bold ${item.color}`}>{item.label}</span>
              {item.icon}
            </div>

            <p className="text-sm font-medium text-[#f2f2f0] leading-snug">{item.value}</p>

            <div className="mt-4 pt-2 border-t border-[#22262d]/50 font-mono text-[9px] text-[#8b9099] flex items-center justify-between">
              <span>STATUS: ACTIVE</span>
              <Zap size={10} className="text-[#10b981]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
