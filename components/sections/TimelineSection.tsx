"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { TIMELINE_EVENTS } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { Milestone, Compass, User, Cpu, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TimelineSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const [portraitHovered, setPortraitHovered] = useState(false);

  // 3D Mouse Parallax on Portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setPortraitHovered(false);
    resetCursor();
  };

  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-2">
            <Milestone size={14} />
            <span>06 // EDITORIAL JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase text-[#f2f2f0] tracking-tight max-w-3xl leading-tight">
            CURIOUS ABOUT HOW COMPLEX SYSTEMS ACTUALLY WORK.
          </h2>
        </div>

        <div className="font-mono text-xs text-[#8b9099] flex items-center gap-2">
          <Compass size={14} className="text-[#6c8cff]" />
          <span>EVOLUTION // 2024 &rarr; PRESENT</span>
        </div>
      </div>

      {/* Holographic Portrait Viewport + Editorial Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        {/* Holographic 3D Portrait Viewport */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setPortraitHovered(true);
            setCursor("view", "GNANESH");
            sound.hover();
          }}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 h-[440px] rounded-3xl border border-[#22262d] bg-[#101216] p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl group select-none"
          style={{ perspective: 1000 }}
        >
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between font-mono text-[10px] text-[#8b9099] border-b border-[#22262d] pb-2 z-10">
            <span className="flex items-center gap-1.5">
              <User size={12} className="text-[#6c8cff]" />
              <span>IDENTITY // GNANESH REDDY MARAM</span>
            </span>
            <span className="text-[#10b981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>ONLINE</span>
            </span>
          </div>

          {/* 3D Motion Tilting Portrait */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative flex-1 my-2 flex items-center justify-center overflow-hidden rounded-2xl"
          >
            <div className="relative w-full h-full max-h-[320px] rounded-2xl overflow-hidden border border-[#22262d]/70 bg-[#08090b]">
              <Image
                src="/images/gnanesh-portrait.png"
                alt="Gnanesh Reddy Maram"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
              />

              {/* Holographic Scanline Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6c8cff]/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Bottom Telemetry Footer */}
          <div className="flex items-center justify-between font-mono text-[9px] text-[#a1a7b5] border-t border-[#22262d] pt-2 z-10">
            <span>NELLORE, ANDHRA PRADESH, INDIA</span>
            <span className="text-[#6c8cff]">FULL STACK &amp; SYSTEMS</span>
          </div>
        </div>

        {/* Editorial Text */}
        <div className="lg:col-span-7 space-y-5 font-normal leading-relaxed text-[#cbd5e1] text-base md:text-lg">
          <p>
            I am a Full Stack Developer &amp; Software Engineer based in Nellore, Andhra Pradesh. My focus centers on building high-performance mobile architectures, low-latency data caches, and real-time computer vision pipelines.
          </p>
          <p>
            From engineering <strong className="text-[#f2f2f0] font-bold">VIT-AP Nexus</strong> to eliminate campus portal wait times with local SQLite caching, to architecting <strong className="text-[#f2f2f0] font-bold">ParkOS</strong> for real-time WebSocket telemetry and <strong className="text-[#f2f2f0] font-bold">Omertà</strong> for AI multi-camera Re-ID — I build systems tested for reliability and measurable real-world performance.
          </p>
          <div className="p-4 rounded-2xl bg-[#101216] border border-[#22262d] font-mono text-xs text-[#f2f2f0] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Cpu size={14} className="text-[#6c8cff]" />
              <span>CORE FOCUS: FULL-STACK, LOCAL-FIRST &amp; COMPUTER VISION</span>
            </span>
            <span className="text-[#10b981] font-bold">VERIFIED BUILDS</span>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Trajectory */}
      <div className="relative border-l-2 border-[#22262d] ml-4 md:ml-6 pl-6 md:pl-10 space-y-12">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div
            key={event.year}
            className="relative group cursor-pointer"
            onMouseEnter={() => {
              setCursor("view", event.year);
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full border-2 border-[#22262d] bg-[#08090b] group-hover:border-[#6c8cff] group-hover:bg-[#6c8cff] transition-all shadow-md" />

            <div className="p-6 rounded-2xl border border-[#22262d] bg-[#101216] group-hover:border-[#6c8cff]/40 transition-colors shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22262d] pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl md:text-2xl font-black text-[#6c8cff]">
                    {event.year}
                  </span>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-md bg-[#181b22] text-[#8b9099] border border-[#22262d]">
                    {event.tag}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#8b9099]">MILESTONE 0{idx + 1}</span>
              </div>

              <h4 className="text-lg md:text-xl font-bold text-[#f2f2f0] uppercase font-mono">
                {event.title}
              </h4>
              <div className="font-mono text-xs text-[#6c8cff] mt-0.5">{event.subtitle}</div>
              <p className="text-sm text-[#8b9099] mt-3 leading-relaxed font-sans">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
