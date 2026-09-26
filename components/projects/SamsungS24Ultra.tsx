"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { sound } from "@/lib/sound";
import { useAppStore } from "@/lib/store";
import {
  Wifi,
  Battery,
  Home,
  PieChart,
  Calendar,
  BarChart2,
  CalendarCheck,
  Calculator,
  RefreshCw,
  MapPin,
  User,
  CheckCircle2,
  BookOpen,
  ClipboardList,
  Contact,
  TrendingUp,
  ChevronDown,
  X,
  Plus,
  Minus,
  RotateCw,
  Camera,
  Sparkles,
} from "lucide-react";

export type AppTab = "home" | "attend" | "schedule" | "marks" | "exams";

export const SamsungS24UltraNexus: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [selectedDay, setSelectedDay] = useState<string>("S");
  const [examType, setExamType] = useState<"CAT2" | "CAT1">("CAT2");
  const [attendanceType, setAttendanceType] = useState<"THEORY" | "LAB">("THEORY");
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [calcAttended, setCalcAttended] = useState(24);
  const [calcTotal, setCalcTotal] = useState(25);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeLens, setActiveLens] = useState<string | null>(null);

  // 3D Rotation State
  const [isBackView, setIsBackView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const currentRotY = useRef(0);
  const currentRotX = useRef(0);

  const rotY = useMotionValue(0);
  const rotX = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 28 };
  const smoothRotY = useSpring(rotY, springConfig);
  const smoothRotX = useSpring(rotX, springConfig);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag when clicking the bezel or background
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) {
      return;
    }
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    currentRotY.current = rotY.get();
    currentRotX.current = rotX.get();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    const nextY = currentRotY.current + deltaX * 0.6;
    const nextX = Math.max(-30, Math.min(30, currentRotX.current - deltaY * 0.4));

    rotY.set(nextY);
    rotX.set(nextX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest front or back face
    const currentY = rotY.get();
    const normalizedY = ((currentY % 360) + 360) % 360;
    if (normalizedY > 90 && normalizedY < 270) {
      setIsBackView(true);
      rotY.set(Math.round(currentY / 360) * 360 + 180);
    } else {
      setIsBackView(false);
      rotY.set(Math.round(currentY / 360) * 360);
    }
    rotX.set(0);
  };

  const toggleFlip = () => {
    sound.enter();
    if (isBackView) {
      rotY.set(0);
      rotX.set(0);
      setIsBackView(false);
    } else {
      rotY.set(180);
      rotX.set(0);
      setIsBackView(true);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    sound.telemetry();
    setTimeout(() => {
      setIsRefreshing(false);
      sound.enter();
    }, 800);
  };

  const calcPercent = Math.round((calcAttended / calcTotal) * 100);
  const bunkSafe = Math.max(0, Math.floor(calcAttended / 0.75 - calcTotal));
  const classesNeeded = calcPercent < 75 ? Math.ceil((0.75 * calcTotal - calcAttended) / 0.25) : 0;

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-4">
      {/* 3D Rotation HUD Controls */}
      <div className="flex items-center gap-3 mb-6 z-30 font-mono text-xs">
        <button
          onClick={toggleFlip}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#22262d] bg-[#101216] text-[#f2f2f0] hover:border-[#6c8cff] hover:text-[#6c8cff] transition-all shadow-md group"
          onMouseEnter={() => {
            setCursor("link", "FLIP");
            sound.hover();
          }}
          onMouseLeave={resetCursor}
        >
          <RotateCw size={14} className="group-hover:rotate-180 transition-transform duration-500 text-[#6c8cff]" />
          <span>{isBackView ? "VIEW DISPLAY (FRONT)" : "VIEW S24 ULTRA BACK"}</span>
        </button>

        <span className="text-[10px] text-[#8b9099] hidden sm:inline">
          (or drag device in 3D)
        </span>
      </div>

      {/* 3D Device Viewport */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-full max-w-[380px] h-[730px] flex items-center justify-center cursor-${isDragging ? "grabbing" : "grab"}`}
        style={{ perspective: 1200 }}
      >
        {/* Full 3D Chassis (Preserve 3D Box) */}
        <motion.div
          style={{
            rotateY: smoothRotY,
            rotateX: smoothRotX,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[360px] h-[710px]"
        >
          {/* =========================================================================
              PHYSICAL 3D TITANIUM SIDE EDGES (12mm Device Thickness)
             ========================================================================= */}
          {/* Left Titanium Edge */}
          <div
            className="absolute top-0 bottom-0 -left-[5px] w-[10px] bg-gradient-to-r from-[#242730] via-[#484f60] to-[#20232a] rounded-l-sm"
            style={{
              transform: "rotateY(-90deg) translateZ(5px)",
              transformOrigin: "left center",
            }}
          />

          {/* Right Titanium Edge with Physical Volume & Power Buttons */}
          <div
            className="absolute top-0 bottom-0 -right-[5px] w-[10px] bg-gradient-to-r from-[#20232a] via-[#484f60] to-[#242730] rounded-r-sm flex flex-col justify-start pt-32 gap-6"
            style={{
              transform: "rotateY(90deg) translateZ(5px)",
              transformOrigin: "right center",
            }}
          >
            {/* Power Key */}
            <div className="w-[6px] h-[46px] bg-[#5a6275] rounded-sm shadow-md border-r border-[#7e889f]" />
            {/* Volume Rocker */}
            <div className="w-[6px] h-[80px] bg-[#5a6275] rounded-sm shadow-md border-r border-[#7e889f]" />
          </div>

          {/* Top Titanium Edge */}
          <div
            className="absolute -top-[5px] left-0 right-0 h-[10px] bg-gradient-to-b from-[#484f60] to-[#20232a] rounded-t-sm"
            style={{
              transform: "rotateX(90deg) translateZ(5px)",
              transformOrigin: "top center",
            }}
          />

          {/* Bottom Titanium Edge (with S-Pen slot, USB-C, Speaker Grille) */}
          <div
            className="absolute -bottom-[5px] left-0 right-0 h-[10px] bg-gradient-to-t from-[#484f60] to-[#20232a] rounded-b-sm flex items-center justify-around px-8"
            style={{
              transform: "rotateX(-90deg) translateZ(5px)",
              transformOrigin: "bottom center",
            }}
          >
            {/* S-Pen Silo */}
            <div className="w-4 h-2 bg-[#121317] rounded-sm border border-[#3e4454]" />
            {/* USB-C Port */}
            <div className="w-6 h-2 bg-[#0c0d10] rounded-full border border-[#3e4454]" />
            {/* Speaker Slit */}
            <div className="w-10 h-1.5 bg-[#121317] rounded-full" />
          </div>

          {/* =========================================================================
              FACE 1: FRONT (Dynamic AMOLED 2X Display with App UI)
             ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[18px] bg-[#0c0d10] p-[7px] border border-[#424754] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden"
            style={{
              transform: "translateZ(5px)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Screen Glass Surface */}
            <div className="relative w-full h-full rounded-[12px] bg-[#0c0f14] overflow-hidden flex flex-col justify-between text-[#f2f2f0]">
              {/* Top Status Bar */}
              <div className="relative z-30 pt-2 px-4 pb-1 flex items-center justify-between text-[11px] font-sans font-medium text-[#c0c4cc]">
                <span className="font-semibold text-white tracking-tight">8:51</span>

                {/* Centered Infinity-O Camera */}
                <div className="w-[11px] h-[11px] rounded-full bg-[#000000] border border-[#1e222d] shadow-inner flex items-center justify-center">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#0a1b2d]" />
                </div>

                {/* 5G, Wifi, Battery Pill */}
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-[9px] font-bold text-[#6c8cff] bg-[#6c8cff]/15 px-1 py-0.2 rounded">5G</span>
                  <Wifi size={11} className="text-white" />
                  <div className="flex items-center gap-0.5 bg-[#1a1e27] px-1.5 py-0.5 rounded-full border border-[#2b3140] text-[9px] font-bold text-white">
                    <span>49</span>
                    <Battery size={10} className="text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2 space-y-4 no-scrollbar">
                <AnimatePresence mode="wait">
                  {/* TAB 1: HOME */}
                  {activeTab === "home" && (
                    <motion.div
                      key="screen-home"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-[#8b92a5] tracking-wider">GOOD EVENING</div>
                          <div className="text-xl font-bold text-white tracking-tight">Gnanesh</div>
                        </div>

                        <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-[#2b3140] relative shadow-md">
                          <Image
                            src="/images/gnanesh-portrait.png"
                            alt="Gnanesh"
                            fill
                            sizes="40px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#141822] border border-[#232838] text-[11px] font-mono">
                        <span className="text-amber-400 font-bold">SAT</span>
                        <span className="text-[#596177]">|</span>
                        <span className="text-[#c0c4cc]">26 September 2026</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white">Today</h3>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                            All done
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#141822] border border-[#232838] flex items-start gap-3.5 shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                            <CheckCircle2 size={22} />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-white">All classes done for today</h4>
                            <p className="text-[11px] text-[#8b92a5] leading-tight">
                              All scheduled lectures finished. Great job today!
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-[#141822]/60 border border-[#232838] text-xs text-[#c0c4cc]">
                          <div className="flex items-center gap-2 text-emerald-400 font-medium text-[11px]">
                            <CheckCircle2 size={14} />
                            <span className="text-white">Completed Classes (4)</span>
                          </div>
                          <ChevronDown size={14} className="text-[#596177]" />
                        </div>
                      </div>

                      {/* Quick Access */}
                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white">Quick Access</h3>
                          <span className="text-[10px] font-mono text-[#8b92a5] flex items-center gap-1">
                            VIEW ALL (12) <ChevronDown size={11} />
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2.5 text-center">
                          <button
                            onClick={() => {
                              sound.click();
                              setActiveTab("exams");
                            }}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#141822] transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#1b1f2b] border border-[#2c3244] flex items-center justify-center text-amber-400 shadow-sm">
                              <Calendar size={18} />
                            </div>
                            <span className="text-[10px] font-medium text-[#c0c4cc]">Exams</span>
                          </button>

                          <button
                            onClick={() => {
                              sound.click();
                              setActiveTab("attend");
                            }}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#141822] transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#1b1f2b] border border-[#2c3244] flex items-center justify-center text-[#6c8cff] shadow-sm">
                              <BookOpen size={18} />
                            </div>
                            <span className="text-[10px] font-medium text-[#c0c4cc]">Course Page</span>
                          </button>

                          <button
                            onClick={() => {
                              sound.click();
                              setActiveTab("marks");
                            }}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#141822] transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#1b1f2b] border border-[#2c3244] flex items-center justify-center text-amber-400 shadow-sm">
                              <ClipboardList size={18} />
                            </div>
                            <span className="text-[10px] font-medium text-[#c0c4cc]">Assignments</span>
                          </button>

                          <button
                            onClick={() => {
                              sound.click();
                              setActiveTab("schedule");
                            }}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#141822] transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#1b1f2b] border border-[#2c3244] flex items-center justify-center text-cyan-400 shadow-sm">
                              <Contact size={18} />
                            </div>
                            <span className="text-[10px] font-medium text-[#c0c4cc]">Faculty</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 text-center text-[9px] font-mono text-[#596177] tracking-widest">
                        NEXUS • ACADEMIC OS
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: ATTENDANCE */}
                  {activeTab === "attend" && (
                    <motion.div
                      key="screen-attend"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3.5 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">ACADEMICS</span>
                          <h2 className="text-2xl font-bold text-white tracking-tight">Attendance</h2>
                          <span className="text-[10px] text-[#8b92a5]">Last Synced: 9 hours ago 💾</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              sound.click();
                              setCalcModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-xl bg-[#141822] border border-[#232838] flex items-center justify-center text-[#c0c4cc] hover:text-white"
                          >
                            <Calculator size={16} />
                          </button>
                          <button
                            onClick={handleRefresh}
                            className={`w-9 h-9 rounded-xl bg-[#141822] border border-[#232838] flex items-center justify-center text-[#c0c4cc] hover:text-white ${
                              isRefreshing ? "animate-spin text-[#6c8cff]" : ""
                            }`}
                          >
                            <RefreshCw size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#141822] border border-[#232838] text-xs font-bold">
                        <button
                          onClick={() => {
                            sound.click();
                            setAttendanceType("THEORY");
                          }}
                          className={`py-2 rounded-xl transition-all ${
                            attendanceType === "THEORY"
                              ? "bg-[#93c5fd] text-[#080d1a] shadow"
                              : "text-[#8b92a5] hover:text-white"
                          }`}
                        >
                          THEORY
                        </button>
                        <button
                          onClick={() => {
                            sound.click();
                            setAttendanceType("LAB");
                          }}
                          className={`py-2 rounded-xl transition-all ${
                            attendanceType === "LAB"
                              ? "bg-[#93c5fd] text-[#080d1a] shadow"
                              : "text-[#8b92a5] hover:text-white"
                          }`}
                        >
                          LAB / PRACTICAL
                        </button>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#141822] border border-[#232838] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full border-2 border-emerald-400/80 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white tracking-wide">THEORY OVERALL</span>
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.2 rounded border border-emerald-400/20">
                                SAFE
                              </span>
                            </div>
                            <div className="text-[10px] text-[#8b92a5] mt-0.5">171 / 181 Hours • 75% Target</div>
                          </div>
                        </div>
                        <div className="text-2xl font-black text-emerald-400">94.5%</div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3.5 rounded-2xl bg-[#141822] border border-[#232838] space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                                <BookOpen size={16} />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-mono font-bold text-emerald-400">CS301</span>
                                  <span className="text-[9px] font-mono text-[#8b92a5] bg-[#1a1f2d] px-1.5 rounded">D1+TD1</span>
                                </div>
                                <h4 className="text-xs font-bold text-white mt-0.5">Distributed Systems</h4>
                                <p className="text-[10px] text-[#8b92a5]">Prof. David Miller - Dept of CS</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-base font-black text-emerald-400 leading-none">94.0%</div>
                              <span className="text-[8px] font-mono text-[#8b92a5] uppercase">ATTENDANCE</span>
                            </div>
                          </div>

                          <div className="w-full h-1.5 rounded-full bg-[#1b202e] overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "94%" }} />
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#8b92a5]">24 / 25 attended</span>
                            <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              <span>Miss 5</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#141822] border border-[#232838] space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                                <BookOpen size={16} />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-mono font-bold text-emerald-400">CS204</span>
                                  <span className="text-[9px] font-mono text-[#8b92a5] bg-[#1a1f2d] px-1.5 rounded">B2+TB2</span>
                                </div>
                                <h4 className="text-xs font-bold text-white mt-0.5">Database Systems</h4>
                                <p className="text-[10px] text-[#8b92a5]">Dr. Sarah Chen - Dept of CS</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-base font-black text-emerald-400 leading-none">96.0%</div>
                              <span className="text-[8px] font-mono text-[#8b92a5] uppercase">ATTENDANCE</span>
                            </div>
                          </div>

                          <div className="w-full h-1.5 rounded-full bg-[#1b202e] overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "96%" }} />
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#8b92a5]">23 / 24 attended</span>
                            <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              <span>Miss 6</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="sticky bottom-2 flex justify-end pt-2">
                        <button
                          onClick={() => {
                            sound.enter();
                            setCalcModalOpen(true);
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0b1329] font-bold text-xs flex items-center gap-1.5 shadow-lg"
                        >
                          <Calculator size={14} />
                          <span>CALCULATE</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: SCHEDULE */}
                  {activeTab === "schedule" && (
                    <motion.div
                      key="screen-schedule"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">ACADEMICS</span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Schedule</h2>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#141822] border border-[#232838]">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                          const isSat = idx === 5;
                          const isSelected = selectedDay === (isSat ? "S" : `day-${idx}`);
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                sound.click();
                                setSelectedDay(isSat ? "S" : `day-${idx}`);
                              }}
                              className={`w-9 h-11 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all relative ${
                                isSelected || (isSat && selectedDay === "S")
                                  ? "bg-[#93c5fd] text-[#0b1329] shadow-md"
                                  : "text-[#8b92a5] hover:text-white"
                              }`}
                            >
                              <span>{day}</span>
                              {isSat && (
                                <span className="w-1 h-1 rounded-full bg-amber-500 mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block">SATURDAY</span>
                            <h3 className="text-base font-bold text-white">Today&apos;s agenda</h3>
                          </div>
                          <span className="text-[10px] font-mono text-[#8b92a5] bg-[#141822] px-2.5 py-1 rounded-lg border border-[#232838]">
                            4 CLASSES
                          </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#141822] border border-[#232838] space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <div className="flex items-center gap-1.5 text-[#c0c4cc]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6c8cff]" />
                              <span>09:00 - 09:50</span>
                            </div>
                            <span className="text-[9px] font-bold text-[#c0c4cc] bg-[#1d2334] px-2 py-0.5 rounded-md border border-[#2a334a]">
                              THEORY
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white">Algorithms &amp; Data Structures</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS201</span>
                          </div>

                          <div className="pt-2 border-t border-[#232838] flex items-center gap-4 text-[10px] font-mono text-[#8b92a5]">
                            <div className="flex items-center gap-1">
                              <MapPin size={11} className="text-[#6c8cff]" />
                              <span>Hall 204</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={11} className="text-[#6c8cff]" />
                              <span>Dr. Evelyn Reed</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#141822] border border-[#232838] space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <div className="flex items-center gap-1.5 text-[#c0c4cc]">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <span>11:40 - 12:30</span>
                            </div>
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                              LAB
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white">Systems Programming Lab</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS208</span>
                          </div>

                          <div className="pt-2 border-t border-[#232838] flex items-center gap-4 text-[10px] font-mono text-[#8b92a5]">
                            <div className="flex items-center gap-1">
                              <MapPin size={11} className="text-amber-400" />
                              <span>Tech Lab 3</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={11} className="text-amber-400" />
                              <span>Lab Staff</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: MARKS */}
                  {activeTab === "marks" && (
                    <motion.div
                      key="screen-marks"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">ACADEMICS</span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Academic Performance</h2>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#141822] border border-[#232838] flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-[#8b92a5] uppercase">CUMULATIVE CGPA</div>
                          <div className="text-3xl font-black text-emerald-400 tracking-tight">9.42</div>
                          <span className="text-[10px] font-mono text-emerald-400">Top 1% Class Standing</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                          <TrendingUp size={24} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-[#141822] border border-[#232838] flex items-center justify-between text-xs">
                          <div>
                            <h4 className="font-bold text-white">Distributed Systems</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS301 • 4 Credits</span>
                          </div>
                          <span className="text-base font-black text-[#6c8cff]">S Grade</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#141822] border border-[#232838] flex items-center justify-between text-xs">
                          <div>
                            <h4 className="font-bold text-white">Computer Vision &amp; AI</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS402 • 4 Credits</span>
                          </div>
                          <span className="text-base font-black text-[#6c8cff]">S Grade</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#141822] border border-[#232838] flex items-center justify-between text-xs">
                          <div>
                            <h4 className="font-bold text-white">Cloud Architecture</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS310 • 3 Credits</span>
                          </div>
                          <span className="text-base font-black text-[#6c8cff]">S Grade</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: EXAMS */}
                  {activeTab === "exams" && (
                    <motion.div
                      key="screen-exams"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">EXAMINATIONS</span>
                          <h2 className="text-2xl font-bold text-white tracking-tight">Exam Schedule</h2>
                          <span className="text-[10px] text-[#8b92a5]">Last Synced: 3m ago 💾</span>
                        </div>

                        <button
                          onClick={handleRefresh}
                          className={`w-9 h-9 rounded-xl bg-[#141822] border border-[#232838] flex items-center justify-center text-[#c0c4cc] hover:text-white ${
                            isRefreshing ? "animate-spin text-[#6c8cff]" : ""
                          }`}
                        >
                          <RefreshCw size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            sound.click();
                            setExamType("CAT2");
                          }}
                          className={`px-5 py-2 rounded-2xl font-bold text-xs transition-all ${
                            examType === "CAT2"
                              ? "bg-[#93c5fd] text-[#0b1329] shadow"
                              : "bg-[#141822] border border-[#232838] text-[#8b92a5]"
                          }`}
                        >
                          CAT2
                        </button>
                        <button
                          onClick={() => {
                            sound.click();
                            setExamType("CAT1");
                          }}
                          className={`px-5 py-2 rounded-2xl font-bold text-xs transition-all ${
                            examType === "CAT1"
                              ? "bg-[#93c5fd] text-[#0b1329] shadow"
                              : "bg-[#141822] border border-[#232838] text-[#8b92a5]"
                          }`}
                        >
                          CAT1
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3.5 rounded-2xl bg-[#141822] border border-[#232838] space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#8b92a5] bg-[#1c2232] px-2.5 py-0.5 rounded-full">
                              • B2+TB2
                            </span>
                            <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              • Upcoming
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white">Cloud Infrastructure</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS310</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#8b92a5] pt-2 border-t border-[#232838]">
                            <div>
                              <span className="text-[#596177] block text-[8px]">TIME</span>
                              <span className="text-white">10:00 - 11:30 AM</span>
                            </div>
                            <div>
                              <span className="text-[#596177] block text-[8px]">VENUE</span>
                              <span className="text-white">Exam Hall A</span>
                            </div>
                            <div>
                              <span className="text-[#596177] block text-[8px]">SEAT LOCATION</span>
                              <span className="text-white">Row 4 - S12</span>
                            </div>
                            <div>
                              <span className="text-[#596177] block text-[8px]">SEAT NUMBER</span>
                              <span className="text-white">#24</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#141822] border border-[#232838] space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#8b92a5] bg-[#1c2232] px-2.5 py-0.5 rounded-full">
                              • C2+TC2
                            </span>
                            <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              • Upcoming
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white">Deep Learning Systems</h4>
                            <span className="text-[10px] font-mono text-[#8b92a5]">CS406</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#8b92a5] pt-2 border-t border-[#232838]">
                            <div>
                              <span className="text-[#596177] block text-[8px]">TIME</span>
                              <span className="text-white">02:00 - 03:30 PM</span>
                            </div>
                            <div>
                              <span className="text-[#596177] block text-[8px]">VENUE</span>
                              <span className="text-white">Exam Hall B</span>
                            </div>
                            <div>
                              <span className="text-[#596177] block text-[8px]">SEAT LOCATION</span>
                              <span className="text-white">Row 2 - S06</span>
                            </div>
                            <div>
                              <span className="text-[#596177] block text-[8px]">SEAT NUMBER</span>
                              <span className="text-white">#14</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Nav */}
              <div className="relative z-30 px-2 py-2 bg-[#0c0f14] border-t border-[#1a1f2b] grid grid-cols-5 text-center">
                <button
                  onClick={() => {
                    sound.click();
                    setActiveTab("home");
                  }}
                  className="flex flex-col items-center justify-center gap-1 group py-1"
                >
                  <Home size={17} className={activeTab === "home" ? "text-white" : "text-[#596177] group-hover:text-[#8b92a5]"} />
                  <span className={`text-[8px] font-mono font-bold tracking-wider ${activeTab === "home" ? "text-white" : "text-[#596177]"}`}>
                    HOME
                  </span>
                  {activeTab === "home" && (
                    <div className="w-5 h-[2px] rounded-full bg-amber-500 mt-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.click();
                    setActiveTab("attend");
                  }}
                  className="flex flex-col items-center justify-center gap-1 group py-1"
                >
                  <PieChart size={17} className={activeTab === "attend" ? "text-white" : "text-[#596177] group-hover:text-[#8b92a5]"} />
                  <span className={`text-[8px] font-mono font-bold tracking-wider ${activeTab === "attend" ? "text-white" : "text-[#596177]"}`}>
                    ATTEND
                  </span>
                  {activeTab === "attend" && (
                    <div className="w-5 h-[2px] rounded-full bg-amber-500 mt-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.click();
                    setActiveTab("schedule");
                  }}
                  className="flex flex-col items-center justify-center gap-1 group py-1"
                >
                  <Calendar size={17} className={activeTab === "schedule" ? "text-white" : "text-[#596177] group-hover:text-[#8b92a5]"} />
                  <span className={`text-[8px] font-mono font-bold tracking-wider ${activeTab === "schedule" ? "text-white" : "text-[#596177]"}`}>
                    SCHEDULE
                  </span>
                  {activeTab === "schedule" && (
                    <div className="w-5 h-[2px] rounded-full bg-amber-500 mt-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.click();
                    setActiveTab("marks");
                  }}
                  className="flex flex-col items-center justify-center gap-1 group py-1"
                >
                  <BarChart2 size={17} className={activeTab === "marks" ? "text-white" : "text-[#596177] group-hover:text-[#8b92a5]"} />
                  <span className={`text-[8px] font-mono font-bold tracking-wider ${activeTab === "marks" ? "text-white" : "text-[#596177]"}`}>
                    MARKS
                  </span>
                  {activeTab === "marks" && (
                    <div className="w-5 h-[2px] rounded-full bg-amber-500 mt-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.click();
                    setActiveTab("exams");
                  }}
                  className="flex flex-col items-center justify-center gap-1 group py-1"
                >
                  <CalendarCheck size={17} className={activeTab === "exams" ? "text-white" : "text-[#596177] group-hover:text-[#8b92a5]"} />
                  <span className={`text-[8px] font-mono font-bold tracking-wider ${activeTab === "exams" ? "text-white" : "text-[#596177]"}`}>
                    EXAMS
                  </span>
                  {activeTab === "exams" && (
                    <div className="w-5 h-[2px] rounded-full bg-amber-500 mt-0.5" />
                  )}
                </button>
              </div>

              {/* Samsung Bottom Gesture Pill */}
              <div className="w-full flex justify-center py-1 bg-[#0c0f14]">
                <div className="w-28 h-1 rounded-full bg-[#3e4454]" />
              </div>
            </div>
          </div>

          {/* =========================================================================
              FACE 2: BACK (Real Samsung S24 Ultra Titanium Back Panel & Floating Lenses)
             ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-[#1b1e26] via-[#141720] to-[#0e1017] p-[10px] border border-[#484f60] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden"
            style={{
              transform: "rotateY(180deg) translateZ(5px)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Satin Matte Glass Texture Refinement */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

            {/* Top Area: Signature S24 Ultra Floating Quad Camera Array */}
            <div className="relative z-10 pt-4 px-2">
              <div className="flex gap-4">
                {/* Left Column: 3 Major Camera Rings */}
                <div className="flex flex-col gap-4">
                  {/* Lens 1: 200MP Main Wide Camera */}
                  <div
                    onMouseEnter={() => {
                      setActiveLens("200MP Wide (f/1.7, OIS, Super Quad Pixel)");
                      sound.hover();
                    }}
                    onMouseLeave={() => setActiveLens(null)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1b1f2b] via-[#383e50] to-[#1a1d26] p-[3px] shadow-[0_8px_16px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-[#525b73] cursor-pointer group transition-transform hover:scale-105"
                  >
                    <div className="w-full h-full rounded-full bg-[#08090d] border border-[#2b3140] flex items-center justify-center p-2 relative overflow-hidden">
                      {/* Lens Optical Reflection */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#001133] via-[#08224d] to-[#1a4a8a] border border-[#28487d] shadow-inner flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#02050d] border border-[#4a72b0]/40" />
                      </div>
                      <div className="absolute top-1.5 right-2 w-3 h-1.5 bg-white/20 rounded-full blur-[1px] transform -rotate-45" />
                    </div>
                  </div>

                  {/* Lens 2: 12MP Ultra-Wide Camera */}
                  <div
                    onMouseEnter={() => {
                      setActiveLens("12MP Ultra-Wide (120° FOV, f/2.2)");
                      sound.hover();
                    }}
                    onMouseLeave={() => setActiveLens(null)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1b1f2b] via-[#383e50] to-[#1a1d26] p-[3px] shadow-[0_8px_16px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-[#525b73] cursor-pointer group transition-transform hover:scale-105"
                  >
                    <div className="w-full h-full rounded-full bg-[#08090d] border border-[#2b3140] flex items-center justify-center p-2 relative overflow-hidden">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0a1828] via-[#103055] to-[#1d508f] border border-[#28487d] shadow-inner flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#02050d]" />
                      </div>
                      <div className="absolute top-1.5 right-2 w-3 h-1.5 bg-white/20 rounded-full blur-[1px] transform -rotate-45" />
                    </div>
                  </div>

                  {/* Lens 3: 50MP 5x Periscope Telephoto (Square Prism Cutout) */}
                  <div
                    onMouseEnter={() => {
                      setActiveLens("50MP Periscope Telephoto (5x Optical Zoom, 100x Space Zoom, OIS)");
                      sound.hover();
                    }}
                    onMouseLeave={() => setActiveLens(null)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1b1f2b] via-[#383e50] to-[#1a1d26] p-[3px] shadow-[0_8px_16px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-[#525b73] cursor-pointer group transition-transform hover:scale-105"
                  >
                    <div className="w-full h-full rounded-full bg-[#08090d] border border-[#2b3140] flex items-center justify-center relative overflow-hidden">
                      {/* Rectangular Periscope Prism Aperture */}
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#051121] via-[#0d2645] to-[#1a4478] border border-[#375e96] flex items-center justify-center shadow-inner">
                        <div className="w-3 h-3 bg-[#02050c] rounded-sm" />
                      </div>
                      <div className="absolute top-1.5 right-2 w-3 h-1.5 bg-white/25 rounded-full blur-[1px] transform -rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Laser AF + LED Flash + 10MP 3x Telephoto */}
                <div className="flex flex-col gap-5 pt-2">
                  {/* Laser AutoFocus Sensor + LED Flash Ring */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1b1f2b] via-[#383e50] to-[#1a1d26] p-[2px] shadow-md border border-[#525b73] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#08090d] flex items-center justify-center relative">
                      {/* LED Flash Dual Tone */}
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-300 via-amber-100 to-white shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    </div>
                  </div>

                  {/* Lens 4: 10MP 3x Telephoto */}
                  <div
                    onMouseEnter={() => {
                      setActiveLens("10MP Telephoto (3x Optical Zoom, Dual Pixel AF)");
                      sound.hover();
                    }}
                    onMouseLeave={() => setActiveLens(null)}
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1b1f2b] via-[#383e50] to-[#1a1d26] p-[2.5px] shadow-[0_6px_12px_rgba(0,0,0,0.8)] border border-[#525b73] cursor-pointer group transition-transform hover:scale-105"
                  >
                    <div className="w-full h-full rounded-full bg-[#08090d] border border-[#2b3140] flex items-center justify-center relative overflow-hidden">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#051121] to-[#194378] border border-[#28487d] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#02050c]" />
                      </div>
                      <div className="absolute top-1 right-1.5 w-2 h-1 bg-white/20 rounded-full blur-[0.5px] transform -rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Lens Inspector Pill on Hover */}
              <div className="mt-8 h-12 flex items-center justify-center">
                <AnimatePresence>
                  {activeLens ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="px-3.5 py-1.5 rounded-full bg-[#1e2330]/95 border border-[#6c8cff] text-[10px] font-mono text-[#f2f2f0] shadow-lg flex items-center gap-1.5"
                    >
                      <Camera size={12} className="text-[#6c8cff]" />
                      <span>{activeLens}</span>
                    </motion.div>
                  ) : (
                    <div className="text-[10px] font-mono text-[#5f667a] flex items-center gap-1">
                      <Sparkles size={11} />
                      <span>Hover any camera lens for optical specifications</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Middle Space: Subtle Titanium Grade Etching */}
            <div className="text-center font-mono text-[9px] text-[#474d5e] tracking-[0.25em] uppercase">
              TITANIUM GRAY • GORILLA GLASS ARMOR
            </div>

            {/* Bottom: Minimal Recessed SAMSUNG Logo */}
            <div className="pb-8 flex flex-col items-center gap-2">
              <div className="text-lg font-sans font-bold tracking-[0.35em] text-[#555d72] select-none hover:text-[#7d88a3] transition-colors">
                SAMSUNG
              </div>
              <div className="text-[8px] font-mono text-[#3e4454] tracking-widest">
                SM-S928B/DS • MADE FOR HIGH PERFORMANCE
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal: Interactive Bunk Calculator */}
        <AnimatePresence>
          {calcModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md rounded-[18px] p-6 flex flex-col justify-center"
            >
              <div className="p-5 rounded-2xl bg-[#141822] border border-[#232838] space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#232838] pb-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Calculator size={16} className="text-[#6c8cff]" />
                    <span>Attendance Calculator</span>
                  </div>
                  <button
                    onClick={() => setCalcModalOpen(false)}
                    className="p-1 text-[#8b9099] hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="text-center py-2">
                  <div className="text-3xl font-black text-white">{calcPercent}%</div>
                  <div className="text-xs mt-1">
                    {calcPercent >= 75 ? (
                      <span className="text-emerald-400 font-bold">Safe: Can bunk {bunkSafe} classes</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Need {classesNeeded} more classes to reach 75%</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8b9099]">Attended: {calcAttended}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCalcAttended((prev) => Math.max(0, prev - 1))}
                        className="w-7 h-7 rounded-lg bg-[#1c2232] text-white flex items-center justify-center border border-[#2b3348]"
                      >
                        <Minus size={13} />
                      </button>
                      <button
                        onClick={() => setCalcAttended((prev) => Math.min(calcTotal, prev + 1))}
                        className="w-7 h-7 rounded-lg bg-[#1c2232] text-white flex items-center justify-center border border-[#2b3348]"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8b9099]">Total Classes: {calcTotal}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCalcTotal((prev) => Math.max(calcAttended, prev - 1))}
                        className="w-7 h-7 rounded-lg bg-[#1c2232] text-white flex items-center justify-center border border-[#2b3348]"
                      >
                        <Minus size={13} />
                      </button>
                      <button
                        onClick={() => setCalcTotal((prev) => prev + 1)}
                        className="w-7 h-7 rounded-lg bg-[#1c2232] text-white flex items-center justify-center border border-[#2b3348]"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCalcModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#6c8cff] text-[#080d1a] font-bold text-xs tracking-wider"
                >
                  APPLY & CLOSE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
