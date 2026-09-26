"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { Eye, Shield, Cpu, Play, Pause, Camera, Activity, ArrowUpRight, Compass, Layers, AlertCircle, Wrench, BarChart } from "lucide-react";

export const OmertaShowcase: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();

  const [activeCam, setActiveCam] = useState<number>(1);
  const [activeTrackId, setActiveTrackId] = useState<string>("042");
  const [simRunning, setSimRunning] = useState<boolean>(true);
  const [visionMode, setVisionMode] = useState<"RGB" | "NIGHT" | "THERMAL">("RGB");
  const [telemetrySpeed, setTelemetrySpeed] = useState<number>(48);
  const [confidence, setConfidence] = useState<number>(98.4);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const cameras = [
    { id: 1, name: "CAM_NORTH_GATE", location: "Perimeter Sector 01", count: 4, fps: 31.4 },
    { id: 2, name: "CAM_PLAZA_JUNCTION", location: "Central Block Transit", count: 7, fps: 29.8 },
    { id: 3, name: "CAM_SOUTH_PERIMETER", location: "Underpass Exit Road", count: 3, fps: 30.2 },
  ];

  // Canvas synthetic camera feed drawing engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const renderFrame = () => {
      if (!ctx || !canvas) return;
      time += 0.03;

      // Clear & draw synthetic background road
      ctx.fillStyle = visionMode === "THERMAL" ? "#1a0b2e" : visionMode === "NIGHT" ? "#061a12" : "#080b11";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Perspective road lines
      ctx.strokeStyle = visionMode === "THERMAL" ? "#9333ea" : visionMode === "NIGHT" ? "#10b981" : "#1f293d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.1, canvas.height);
      ctx.lineTo(canvas.width * 0.45, canvas.height * 0.35);
      ctx.moveTo(canvas.width * 0.9, canvas.height);
      ctx.lineTo(canvas.width * 0.55, canvas.height * 0.35);
      ctx.stroke();

      // Horizon line
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.35);
      ctx.lineTo(canvas.width, canvas.height * 0.35);
      ctx.stroke();

      // Draw 3 moving vehicle tracks
      const vehicles = [
        { id: "042", type: "Sedan [Black]", x: 0.35 + Math.sin(time * 0.7) * 0.15, y: 0.45 + (time % 4) * 0.12, w: 90, h: 50 },
        { id: "108", type: "SUV [White]", x: 0.65 - Math.cos(time * 0.5) * 0.12, y: 0.5 + ((time + 2) % 4) * 0.1, w: 110, h: 65 },
        { id: "019", type: "Truck [Blue]", x: 0.2 + Math.sin(time * 0.4) * 0.08, y: 0.6 + ((time + 1) % 4) * 0.08, w: 130, h: 80 },
      ];

      vehicles.forEach((veh) => {
        const vx = veh.x * canvas.width;
        const vy = (veh.y % 1) * canvas.height;
        const isTarget = veh.id === activeTrackId;

        // Vehicle silhouette box
        ctx.fillStyle = isTarget ? "rgba(108, 140, 255, 0.25)" : "rgba(34, 38, 45, 0.4)";
        ctx.fillRect(vx - veh.w / 2, vy - veh.h / 2, veh.w, veh.h);

        // Bounding Box
        ctx.strokeStyle = isTarget ? "#6c8cff" : "#10b981";
        ctx.lineWidth = isTarget ? 2 : 1.5;
        ctx.strokeRect(vx - veh.w / 2, vy - veh.h / 2, veh.w, veh.h);

        // Bounding Box Corner Reticles
        const rLen = 8;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        // Top Left
        ctx.beginPath();
        ctx.moveTo(vx - veh.w / 2, vy - veh.h / 2 + rLen);
        ctx.lineTo(vx - veh.w / 2, vy - veh.h / 2);
        ctx.lineTo(vx - veh.w / 2 + rLen, vy - veh.h / 2);
        ctx.stroke();

        // Label above bbox
        ctx.fillStyle = isTarget ? "#6c8cff" : "#10b981";
        ctx.font = "bold 10px monospace";
        ctx.fillText(`ID:${veh.id} [${veh.type}] ${isTarget ? "★ LOCK" : ""}`, vx - veh.w / 2, vy - veh.h / 2 - 6);
      });

      // Scanline effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      if (simRunning) {
        animFrameId.current = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [simRunning, visionMode, activeTrackId]);

  // Telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetrySpeed((prev) => Math.floor(45 + Math.random() * 8));
      setConfidence((prev) => +(97.8 + Math.random() * 1.5).toFixed(1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="omerta-showcase" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-2">
            <Eye size={14} />
            <span>03 // CASE STUDY • COMPUTER VISION &amp; AI</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[#f2f2f0] tracking-tight">
            OMERTÀ <span className="text-[#6c8cff] font-normal text-2xl md:text-3xl">/ AI VEHICLE RE-ID</span>
          </h2>
          <p className="text-base text-[#cbd5e1] max-w-2xl mt-2 font-normal leading-relaxed">
            Multi-camera deep metric re-identification pipeline tracking vehicle trajectories across disjoint surveillance feeds.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          <a
            href="https://omerta-o1dy.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6c8cff] text-[#08090b] font-mono text-xs font-bold tracking-wider hover:bg-[#85a0ff] transition-all shadow-md"
            onMouseEnter={() => {
              setCursor("link", "LIVE");
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            <span>LAUNCH OMERTÀ</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Grid: Interactive CCTV Feed (Left) + Structured Case Study (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: CCTV Stream Simulation */}
        <div className="lg:col-span-7 rounded-3xl border border-[#22262d] bg-[#101216] p-6 space-y-4 shadow-2xl relative overflow-hidden">
          {/* Top Camera Stream Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22262d] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="font-mono text-xs font-bold text-[#f2f2f0]">
                FEED: {cameras[activeCam - 1].name}
              </span>
            </div>

            {/* Vision Mode Shaders */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#08090b] border border-[#22262d] font-mono text-[10px]">
              {(["RGB", "NIGHT", "THERMAL"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    sound.click();
                    setVisionMode(mode);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    visionMode === mode
                      ? "bg-[#6c8cff] text-[#08090b] font-bold"
                      : "text-[#8b9099] hover:text-[#f2f2f0]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Synthetic Video Stream */}
          <div className="relative rounded-2xl overflow-hidden border border-[#22262d] bg-black">
            <canvas ref={canvasRef} width={640} height={340} className="w-full h-[280px] sm:h-[340px] block" />

            {/* In-feed HUD Overlay */}
            <div className="absolute top-3 left-3 font-mono text-[10px] text-[#cbd5e1] bg-[#08090b]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-[#22262d]">
              LOC: {cameras[activeCam - 1].location.toUpperCase()}
            </div>

            <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#6c8cff] bg-[#08090b]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-[#22262d] flex items-center gap-2">
              <Activity size={12} />
              <span>COSINE RE-ID CONFIDENCE: {confidence}%</span>
            </div>
          </div>

          {/* Target Selector */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[#a1a7b5]">ACTIVE TARGET LOCK:</span>
            <div className="flex gap-2">
              {["042", "108", "019"].map((tid) => (
                <button
                  key={tid}
                  onClick={() => {
                    sound.click();
                    setActiveTrackId(tid);
                  }}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    activeTrackId === tid
                      ? "border-[#6c8cff] bg-[#6c8cff]/20 text-[#6c8cff] font-bold shadow-md"
                      : "border-[#22262d] bg-[#181b22] text-[#8b9099] hover:text-[#f2f2f0]"
                  }`}
                >
                  TRACK #{tid}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Structured Case Study Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-[#22262d] bg-[#101216] p-6 md:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#22262d] pb-4">
              <div className="w-9 h-9 rounded-xl bg-[#6c8cff]/10 border border-[#6c8cff]/30 flex items-center justify-center text-[#6c8cff]">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f2f2f0] uppercase font-mono">
                  CASE STUDY: MULTI-CAM RE-ID
                </h3>
                <span className="text-xs text-[#a1a7b5] font-mono">
                  Trajectory continuity across disconnected camera angles
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              {/* Problem */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertCircle size={14} />
                  <span>PROBLEM</span>
                </div>
                <p className="text-[#cbd5e1] font-sans text-sm leading-relaxed">
                  Vehicles crossing non-overlapping CCTV networks lose identity context during blind spots, camera occlusion, and variable lighting transitions.
                </p>
              </div>

              {/* Contribution */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#6c8cff] font-bold">
                  <Wrench size={14} />
                  <span>MY CONTRIBUTION</span>
                </div>
                <p className="text-[#cbd5e1] font-sans text-sm leading-relaxed">
                  Developed the complete computer vision pipeline using YOLOv8 for vehicle localization, DeepSORT for intra-camera tracking, and deep metric 512-dim embedding extractors for cross-camera cosine matching.
                </p>
              </div>

              {/* Measurable Outcome */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-2">
                <div className="flex items-center gap-2 text-[#6c8cff] font-bold">
                  <BarChart size={14} />
                  <span>MEASURABLE OUTCOME</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div className="p-2 rounded-lg bg-[#101216] border border-[#22262d]">
                    <div className="text-[10px] text-[#a1a7b5]">INFERENCE SPEED</div>
                    <div className="text-[#6c8cff] font-black text-sm mt-0.5">30+ FPS (GPU)</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#101216] border border-[#22262d]">
                    <div className="text-[10px] text-[#a1a7b5]">EMBEDDING DIM</div>
                    <div className="text-[#6c8cff] font-black text-sm mt-0.5">512-dim Vector</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-[#22262d] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <a
                href="https://omerta-o1dy.onrender.com/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#6c8cff] text-[#08090b] hover:bg-[#85a0ff] flex items-center gap-1.5 font-bold transition-all shadow-md"
              >
                <span>Launch Live App</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/Gnanesh-2007/omerta"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#181b22] border border-[#22262d] text-[#f2f2f0] hover:border-[#6c8cff] flex items-center gap-1.5 transition-all"
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
