"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { Car, ArrowUpRight, CheckCircle2, AlertCircle, RefreshCw, Play, Layers, Wrench, BarChart } from "lucide-react";

interface ParkingSlot {
  id: string;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED";
  rate: number;
  vehicle?: string;
  duration?: string;
}

export const ParkOSShowcase: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();

  const [slots, setSlots] = useState<ParkingSlot[]>([
    { id: "A1", status: "OCCUPIED", rate: 40, vehicle: "AP-26-TG-4401", duration: "1h 42m" },
    { id: "A2", status: "AVAILABLE", rate: 40 },
    { id: "A3", status: "AVAILABLE", rate: 40 },
    { id: "A4", status: "OCCUPIED", rate: 40, vehicle: "TS-09-EA-9912", duration: "45m" },

    { id: "B1", status: "AVAILABLE", rate: 50 },
    { id: "B2", status: "RESERVED", rate: 50, vehicle: "RESERVED (G. MARAM)", duration: "Holds 15m" },
    { id: "B3", status: "OCCUPIED", rate: 50, vehicle: "KA-01-MJ-3000", duration: "2h 10m" },
    { id: "B4", status: "AVAILABLE", rate: 50 },

    { id: "C1", status: "OCCUPIED", rate: 60, vehicle: "TN-07-BB-8819", duration: "3h 05m" },
    { id: "C2", status: "AVAILABLE", rate: 60 },
    { id: "C3", status: "AVAILABLE", rate: 60 },
    { id: "C4", status: "OCCUPIED", rate: 60, vehicle: "DL-01-CT-7744", duration: "25m" },
  ]);

  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot>(slots[1]);
  const [liveBill, setLiveBill] = useState(14.5);
  const [carAnimationActive, setCarAnimationActive] = useState(false);

  // Real-time dynamic parking meter tick
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBill((prev) => +(prev + 0.05).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSlotClick = (slot: ParkingSlot) => {
    sound.hover();
    setSelectedSlot(slot);
  };

  const handleSpawnVehicle = () => {
    sound.enter();
    setCarAnimationActive(true);

    setTimeout(() => {
      setSlots((prev) => {
        const availableIdx = prev.findIndex((s) => s.status === "AVAILABLE");
        if (availableIdx === -1) return prev;
        const copy = [...prev];
        const updatedSlot: ParkingSlot = {
          ...copy[availableIdx],
          status: "OCCUPIED",
          vehicle: `AP-26-SPAWN-${Math.floor(1000 + Math.random() * 9000)}`,
          duration: "Just arrived",
        };
        copy[availableIdx] = updatedSlot;
        setSelectedSlot(updatedSlot);
        return copy;
      });
      setCarAnimationActive(false);
    }, 1200);
  };

  const handleToggleReserve = () => {
    sound.click();
    setSlots((prev) =>
      prev.map((s) => {
        if (s.id === selectedSlot.id) {
          const nextStatus =
            s.status === "AVAILABLE" ? "RESERVED" : s.status === "RESERVED" ? "OCCUPIED" : "AVAILABLE";
          const updated: ParkingSlot = {
            ...s,
            status: nextStatus,
            vehicle:
              nextStatus === "RESERVED"
                ? "RESERVED (G. MARAM)"
                : nextStatus === "OCCUPIED"
                ? "AP-26-LIVE-900"
                : undefined,
            duration: nextStatus === "OCCUPIED" ? "0m" : undefined,
          };
          setSelectedSlot(updated);
          return updated;
        }
        return s;
      })
    );
  };

  return (
    <section id="parkos-showcase" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#10b981] tracking-widest uppercase mb-2">
            <Car size={14} />
            <span>02 // CASE STUDY • SPATIAL IOT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[#f2f2f0] tracking-tight">
            PARKOS <span className="text-[#10b981] font-normal text-2xl md:text-3xl">/ SMART PARKING OS</span>
          </h2>
          <p className="text-base text-[#cbd5e1] max-w-2xl mt-2 font-normal leading-relaxed">
            Real-time parking slot reservation and automated session lifecycle platform with dynamic per-second billing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSpawnVehicle}
            disabled={carAnimationActive}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181b22] text-[#f2f2f0] border border-[#22262d] font-mono text-xs tracking-wider hover:border-[#10b981] hover:text-[#10b981] transition-all"
            title="Simulate a new vehicle entering the parking zone"
          >
            <Play size={13} className={carAnimationActive ? "animate-spin text-[#10b981]" : ""} />
            <span>{carAnimationActive ? "ROUTING VEHICLE..." : "SPAWN VEHICLE ENTRY"}</span>
          </button>

          <a
            href="https://park-os.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10b981] text-[#08090b] font-mono text-xs font-bold tracking-wider hover:bg-emerald-400 transition-all shadow-md"
            onMouseEnter={() => {
              setCursor("link", "LIVE");
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            <span>LAUNCH PARKOS</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Grid: 2D Live Grid (Left) + Structured Case Study (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 2D Interactive Parking Floor Map */}
        <div className="lg:col-span-6 rounded-3xl border border-[#22262d] bg-[#101216] p-6 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#22262d] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#f2f2f0]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>INTERACTIVE LOT MAP • ZONE 01</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-[#10b981]">
                <span className="w-2 h-2 rounded-sm bg-[#10b981]" /> Free
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2 h-2 rounded-sm bg-rose-500" /> Busy
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-sm bg-amber-500" /> Hold
              </span>
            </div>
          </div>

          {/* Grid of Slots */}
          <div className="grid grid-cols-4 gap-3">
            {slots.map((slot) => {
              const isSelected = selectedSlot.id === slot.id;
              const isAvail = slot.status === "AVAILABLE";
              const isRes = slot.status === "RESERVED";

              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  className={`relative p-3.5 rounded-2xl border transition-all flex flex-col justify-between h-24 font-mono text-left group ${
                    isSelected
                      ? "border-[#10b981] bg-[#10b981]/15 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      : isAvail
                      ? "border-[#22262d] bg-[#08090b] hover:border-[#10b981]/50 text-[#f2f2f0]"
                      : isRes
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                      : "border-rose-500/30 bg-rose-500/5 text-rose-300"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-xs">{slot.id}</span>
                    <span className="text-[9px] opacity-70">₹{slot.rate}/h</span>
                  </div>

                  {slot.status === "OCCUPIED" && (
                    <div className="flex items-center gap-1 text-[10px] text-rose-400">
                      <Car size={12} />
                      <span className="truncate text-[8px]">{slot.vehicle?.split("-")[2] || "BUSY"}</span>
                    </div>
                  )}

                  {slot.status === "RESERVED" && (
                    <div className="text-[9px] text-amber-400 font-bold">RESERVED</div>
                  )}

                  {slot.status === "AVAILABLE" && (
                    <div className="text-[9px] text-[#10b981] font-bold">OPEN</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Slot Control Strip */}
          <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-[#a1a7b5] text-[10px] uppercase">Selected Bay:</span>
              <div className="text-base font-bold text-white mt-0.5">
                SLOT {selectedSlot.id} — <span className={selectedSlot.status === "AVAILABLE" ? "text-[#10b981]" : "text-rose-400"}>{selectedSlot.status}</span>
              </div>
            </div>

            <button
              onClick={handleToggleReserve}
              className="px-4 py-2 rounded-xl bg-[#181b22] hover:bg-[#22262d] border border-[#10b981]/40 text-[#10b981] font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={12} />
              <span>{selectedSlot.status === "AVAILABLE" ? "Reserve Bay" : "Release Bay"}</span>
            </button>
          </div>
        </div>

        {/* Right: Structured Case Study */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl border border-[#22262d] bg-[#101216] p-6 md:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#22262d] pb-4">
              <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f2f2f0] uppercase font-mono">
                  CASE STUDY: SMART SPATIAL IOT
                </h3>
                <span className="text-xs text-[#a1a7b5] font-mono">
                  Automating parking allocation and per-minute revenue metering
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
                  Commercial parking complexes struggle with manual paper passes, driver congestion during search loops, and inaccurate hourly billing calculations.
                </p>
              </div>

              {/* Contribution */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-1.5">
                <div className="flex items-center gap-2 text-[#10b981] font-bold">
                  <Wrench size={14} />
                  <span>MY CONTRIBUTION</span>
                </div>
                <p className="text-[#cbd5e1] font-sans text-sm leading-relaxed">
                  Engineered the complete Next.js frontend with live interactive 2D spatial grid layouts, implemented WebSocket state listeners for instant slot locks, and built dynamic per-second billing logic.
                </p>
              </div>

              {/* Measurable Outcome */}
              <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-2">
                <div className="flex items-center gap-2 text-[#10b981] font-bold">
                  <BarChart size={14} />
                  <span>MEASURABLE OUTCOME</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div className="p-2 rounded-lg bg-[#101216] border border-[#22262d]">
                    <div className="text-[10px] text-[#a1a7b5]">DEPLOYMENT</div>
                    <div className="text-[#10b981] font-black text-sm mt-0.5">Live on Vercel</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#101216] border border-[#22262d]">
                    <div className="text-[10px] text-[#a1a7b5]">SLOT SYNC</div>
                    <div className="text-[#10b981] font-black text-sm mt-0.5">Real-time WS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-[#22262d] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <a
                href="https://github.com/Gnanesh-2007/Park-Os"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#181b22] border border-[#22262d] text-[#f2f2f0] hover:border-[#10b981] hover:text-[#10b981] flex items-center gap-1.5 font-bold transition-all shadow-md"
              >
                <span>GitHub Source</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://park-os.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#10b981] text-[#08090b] hover:bg-emerald-400 flex items-center gap-1.5 font-bold transition-all shadow-md"
              >
                <span>Launch App</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
