"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES, CERTIFICATIONS, PERSONAL_DATA } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { Cpu, Award, ShieldCheck, CheckCircle2, ArrowUpRight, Sparkles, Terminal, Code2 } from "lucide-react";

// Interactive project tag mapping for skill association
const SKILL_PROJECT_MAP: Record<string, { name: string; tag: string; href: string }[]> = {
  Python: [
    { name: "VIT-AP Nexus", tag: "FastAPI Backend", href: "#nexus-showcase" },
    { name: "Omertà", tag: "AI Video Pipelines", href: "#omerta-showcase" },
  ],
  Java: [
    { name: "Core CS", tag: "OOP & Data Structures", href: "#about" },
  ],
  JavaScript: [
    { name: "ParkOS", tag: "Full-Stack Web", href: "#parkos-showcase" },
  ],
  Dart: [
    { name: "VIT-AP Nexus", tag: "Cross-Platform App", href: "#nexus-showcase" },
  ],
  Flutter: [
    { name: "VIT-AP Nexus", tag: "Riverpod MVVM UI", href: "#nexus-showcase" },
  ],
  Riverpod: [
    { name: "VIT-AP Nexus", tag: "Reactive State Engine", href: "#nexus-showcase" },
  ],
  Dio: [
    { name: "VIT-AP Nexus", tag: "Networking & Interceptors", href: "#nexus-showcase" },
  ],
  Rust: [
    { name: "VIT-AP Nexus", tag: "High-Speed Caching Engine", href: "#nexus-showcase" },
  ],
  "Next.js & React": [
    { name: "ParkOS", tag: "Interactive UI & Realtime Map", href: "#parkos-showcase" },
  ],
  "Node.js": [
    { name: "ParkOS", tag: "Backend API & WebSockets", href: "#parkos-showcase" },
  ],
  "Express.js": [
    { name: "ParkOS", tag: "REST Endpoints & Middleware", href: "#parkos-showcase" },
  ],
  MongoDB: [
    { name: "ParkOS", tag: "Parking Sessions & Bookings", href: "#parkos-showcase" },
  ],
  SQLite: [
    { name: "VIT-AP Nexus", tag: "Sub-15ms Offline Storage", href: "#nexus-showcase" },
  ],
  PostgreSQL: [
    { name: "ParkOS", tag: "Relational Telemetry", href: "#parkos-showcase" },
  ],
  "Google Cloud Platform (GCP)": [
    { name: "GCP Certified", tag: "Associate Cloud Engineer", href: PERSONAL_DATA.resume },
  ],
  Docker: [
    { name: "Omertà", tag: "Containerized Inference", href: "#omerta-showcase" },
  ],
  PyTorch: [
    { name: "Omertà", tag: "512-dim Re-ID Embeddings", href: "#omerta-showcase" },
  ],
  YOLOv8: [
    { name: "Omertà", tag: "Real-time Vehicle Detection", href: "#omerta-showcase" },
  ],
  OpenCV: [
    { name: "Omertà", tag: "Multi-camera Frame Stitching", href: "#omerta-showcase" },
  ],
};

export const TechConstellation: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const [selectedSkill, setSelectedSkill] = useState<string | null>("Flutter");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.category)];

  const displayedCategories =
    filterCategory === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === filterCategory);

  const activeProjects = selectedSkill ? SKILL_PROJECT_MAP[selectedSkill] || [] : [];

  return (
    <section id="constellation" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      {/* Clean Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-2">
            <Cpu size={14} />
            <span>05 // TECHNICAL COMPETENCIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[#f2f2f0] tracking-tight">
            SKILLS &amp; ARCHITECTURE
          </h2>
        </div>

        {/* Minimal Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#101216] p-1.5 rounded-2xl border border-[#22262d]">
          {categories.map((cat) => {
            const isAll = cat === "All";
            const shortLabel = isAll ? "All" : cat.split(" ")[0];
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setFilterCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  filterCategory === cat
                    ? "bg-[#6c8cff] text-[#08090b] shadow-md"
                    : "text-[#8b9099] hover:text-[#f2f2f0]"
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Clean Categorized Cards + Active Implementation Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Clean Skill Cards Matrix */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-5 rounded-2xl border border-[#22262d] bg-[#101216] hover:border-[#374151] transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#22262d] pb-2.5 mb-3.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] font-bold tracking-wider uppercase">
                    <Code2 size={13} />
                    <span>{cat.category}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8b9099]">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => {
                          sound.click();
                          setSelectedSkill(skill.name);
                        }}
                        onMouseEnter={() => {
                          setCursor("link", skill.name);
                          sound.hover();
                        }}
                        onMouseLeave={resetCursor}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 text-left ${
                          isSelected
                            ? "bg-[#6c8cff] text-[#08090b] border-[#6c8cff] font-bold shadow-md scale-[1.02]"
                            : "bg-[#08090b] border-[#22262d] text-[#f2f2f0] hover:border-[#6c8cff] hover:text-[#6c8cff]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-[#08090b]" : "bg-[#10b981]"
                          }`}
                        />
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Implementation Inspector */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-[#22262d] bg-[#101216] shadow-xl sticky top-24">
          <div className="flex items-center justify-between border-b border-[#22262d] pb-3 mb-4">
            <span className="font-mono text-xs text-[#8b9099]">ACTIVE SKILL INSPECTOR</span>
            <span className="font-mono text-xs text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded-full border border-[#10b981]/20 font-bold">
              VERIFIED
            </span>
          </div>

          <div className="my-2">
            <h3 className="text-2xl font-black text-[#f2f2f0] font-mono flex items-center gap-2">
              <span>{selectedSkill || "Select a skill"}</span>
              <Sparkles size={16} className="text-[#6c8cff]" />
            </h3>
            <p className="text-xs text-[#8b9099] mt-1 font-mono">
              Click any skill on the left to see production applications.
            </p>
          </div>

          <div className="mt-5 space-y-2.5 font-mono text-xs">
            <div className="text-[11px] text-[#a1a7b5] uppercase tracking-wider">
              Used in Projects &amp; Architecture:
            </div>

            {activeProjects.length > 0 ? (
              activeProjects.map((proj) => (
                <a
                  key={proj.name + proj.tag}
                  href={proj.href}
                  className="p-3 rounded-xl bg-[#08090b] border border-[#22262d] hover:border-[#6c8cff] flex items-center justify-between group transition-all"
                  onMouseEnter={() => {
                    setCursor("link", "VIEW");
                    sound.hover();
                  }}
                  onMouseLeave={resetCursor}
                >
                  <div>
                    <div className="font-bold text-[#f2f2f0] group-hover:text-[#6c8cff] transition-colors">
                      {proj.name}
                    </div>
                    <div className="text-[10px] text-[#8b9099]">{proj.tag}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-[#8b9099] group-hover:text-[#6c8cff] transition-colors" />
                </a>
              ))
            ) : (
              <div className="p-3 rounded-xl bg-[#08090b] border border-[#22262d] text-[#8b9099] text-xs">
                Core engineering foundation used across system design &amp; coursework.
              </div>
            )}
          </div>

          <div className="pt-4 mt-6 border-t border-[#22262d] font-mono text-[10px] text-[#8b9099] flex justify-between">
            <span>RESUME SYNCHRONIZED</span>
            <span className="text-[#6c8cff]">100% PRODUCTION PROVEN</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          GOOGLE CLOUD CERTIFICATIONS (Clean & Elegant)
         ========================================================================= */}
      <div className="rounded-2xl border border-[#22262d] bg-[#101216] p-6 md:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#22262d] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#6c8cff]/10 border border-[#6c8cff]/30 text-[#6c8cff]">
              <Award size={20} />
            </div>
            <div>
              <div className="font-mono text-[11px] text-[#6c8cff] font-bold tracking-wider uppercase">
                CERTIFICATIONS
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-[#f2f2f0]">
                Google Cloud Certified
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-full border border-[#10b981]/30 flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>VERIFIED CREDENTIALS</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-xl border border-[#22262d] bg-[#08090b] hover:border-[#6c8cff]/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#6c8cff] font-bold bg-[#181b22] px-2 py-0.5 rounded border border-[#22262d]">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-xs text-[#8b9099]">{cert.date}</span>
                </div>
                <h4 className="text-base font-bold text-[#f2f2f0]">
                  {cert.title}
                </h4>
                <p className="text-xs text-[#8b9099] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#22262d]/40 flex items-center justify-between font-mono text-xs">
                <span className="text-[#10b981] flex items-center gap-1 text-[11px]">
                  <CheckCircle2 size={12} />
                  <span>{cert.badge}</span>
                </span>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#6c8cff] hover:underline flex items-center gap-1 text-[11px] font-bold"
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
