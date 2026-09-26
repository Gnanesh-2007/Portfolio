"use client";

import React, { useRef, useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { useAppStore } from "@/lib/store";
import { Smartphone, Car, Eye, ArrowUpRight, ChevronRight, Layers, Database, Cpu } from "lucide-react";

export const HorizontalProjects: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      id: "nexus",
      number: "01",
      category: "MOBILE PLATFORM",
      title: "VIT-AP NEXUS",
      outcome: "An offline-first mobile application providing sub-15ms cached academic records and instant attendance forecasting.",
      icon: Smartphone,
      tags: ["Flutter", "Riverpod", "SQLite", "FastAPI"],
      metrics: [
        { label: "CACHE LATENCY", value: "< 15ms (local SQLite read)" },
        { label: "FRAME RATE", value: "120 FPS UI benchmark" },
      ],
      caseStudyAnchor: "#nexus-showcase",
      liveLink: "https://github.com/Gnanesh-2007/Vitap_nexus",
      liveLabel: "GITHUB",
      accentColor: "#6c8cff",
    },
    {
      id: "parkos",
      number: "02",
      category: "SPATIAL IOT & WEB",
      title: "PARKOS",
      outcome: "Smart parking management operating system featuring real-time spatial lot grids, dynamic pricing, and automated check-ins.",
      icon: Car,
      tags: ["Next.js", "React", "WebSockets", "Tailwind"],
      metrics: [
        { label: "SLOT TELEMETRY", value: "Real-Time WS" },
        { label: "DEPLOYMENT", value: "Live on Vercel" },
      ],
      caseStudyAnchor: "#parkos-showcase",
      liveLink: "https://park-os.vercel.app/",
      liveLabel: "LIVE APP",
      accentColor: "#10b981",
    },
    {
      id: "omerta",
      number: "03",
      category: "COMPUTER VISION & AI",
      title: "OMERTÀ",
      outcome: "Multi-camera vehicle surveillance and trajectory Re-ID pipeline tracking across disjoint camera networks in real-time.",
      icon: Eye,
      tags: ["PyTorch", "YOLOv8", "DeepSORT", "FastAPI"],
      metrics: [
        { label: "GPU INFERENCE", value: "30+ FPS (batch)" },
        { label: "FEATURE VECTOR", value: "512-dim Embedding" },
      ],
      caseStudyAnchor: "#omerta-showcase",
      liveLink: "https://omerta-o1dy.onrender.com/",
      liveLabel: "LIVE APP",
      accentColor: "#6c8cff",
    },
  ];

  return (
    <section id="work" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-2">
            <Layers size={14} />
            <span>02 // SELECTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-[#f2f2f0] tracking-tight">
            FLAGSHIP PROJECTS
          </h2>
        </div>

        <div className="font-mono text-xs text-[#a1a7b5]">
          [ 03 SYSTEMS ENGINEERED &amp; DEPLOYED ]
        </div>
      </div>

      {/* Clean Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {projects.map((proj) => {
          const Icon = proj.icon;

          return (
            <div
              key={proj.id}
              className="rounded-3xl border border-[#22262d] bg-[#101216] p-6 md:p-7 flex flex-col justify-between hover:border-[#6c8cff]/50 transition-all group shadow-xl relative overflow-hidden"
              onMouseEnter={() => {
                setCursor("view", proj.title);
                sound.hover();
              }}
              onMouseLeave={resetCursor}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between border-b border-[#22262d] pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl border border-[#22262d] bg-[#181b22] flex items-center justify-center shadow-sm"
                      style={{ color: proj.accentColor }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold uppercase" style={{ color: proj.accentColor }}>
                        {proj.number} // {proj.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-2xl font-black text-[#22262d] group-hover:text-[#6c8cff]/30 transition-colors">
                    {proj.number}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold uppercase text-[#f2f2f0] tracking-tight group-hover:text-[#6c8cff] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-[#cbd5e1] mt-3 font-normal leading-relaxed">
                  {proj.outcome}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 my-5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#08090b] border border-[#22262d] font-mono text-[11px] text-[#a1a7b5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Metrics & Actions */}
              <div className="space-y-4 pt-4 border-t border-[#22262d]">
                {/* 2 Measurable Metrics */}
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {proj.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl bg-[#08090b] border border-[#22262d]">
                      <div className="text-[10px] text-[#8b9099] uppercase">{m.label}</div>
                      <div className="text-[#f2f2f0] font-bold text-xs mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <a
                    href={proj.caseStudyAnchor}
                    className="font-mono text-xs font-bold text-[#6c8cff] flex items-center gap-1 hover:underline"
                    onClick={() => sound.click()}
                  >
                    <span>View Case Study</span>
                    <ChevronRight size={14} />
                  </a>

                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#181b22] border border-[#22262d] text-[#f2f2f0] hover:border-[#6c8cff] font-mono text-xs flex items-center gap-1 transition-all"
                    onClick={() => sound.click()}
                  >
                    <span>{proj.liveLabel}</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
