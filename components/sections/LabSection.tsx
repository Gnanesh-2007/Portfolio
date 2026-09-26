"use client";

import React, { useState, useEffect, useRef } from "react";
import { LAB_EXPERIMENTS, LabExperiment } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import {
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
  Check,
  Zap,
  Cpu,
  Mic,
  Activity,
  Server,
  Layers,
  ShieldAlert,
  Send,
  Skull,
  Radio,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LabSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const [selectedExp, setSelectedExp] = useState<LabExperiment>(LAB_EXPERIMENTS[0]);

  // ==========================================
  // PLAYGROUND 01: Speech → ISL State & Engine
  // ==========================================
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const [speechInputText, setSpeechInputText] = useState("Hello, welcome to my portfolio");
  const [islStage, setIslStage] = useState<"IDLE" | "AUDIO" | "TOKEN" | "GRAMMAR" | "GESTURE" | "COMPLETE">("IDLE");
  const [activeGestureIndex, setActiveGestureIndex] = useState(0);
  const [customInput, setCustomInput] = useState("");

  const sampleTokens = speechInputText
    .toUpperCase()
    .replace(/[^A-Z\s]/g, "")
    .split(" ")
    .filter((w) => !["A", "THE", "IS", "MY", "TO"].includes(w));

  const runSpeechPipeline = (phrase?: string) => {
    const textToRun = phrase || speechInputText;
    if (phrase) setSpeechInputText(phrase);
    sound.enter();

    setIslStage("AUDIO");
    setTimeout(() => {
      sound.telemetry();
      setIslStage("TOKEN");
    }, 600);

    setTimeout(() => {
      sound.telemetry();
      setIslStage("GRAMMAR");
    }, 1300);

    setTimeout(() => {
      sound.telemetry();
      setIslStage("GESTURE");
      setActiveGestureIndex(0);
    }, 2000);

    setTimeout(() => {
      sound.laserPulse();
      setIslStage("COMPLETE");
    }, 3200);
  };

  // Waveform render loop
  useEffect(() => {
    if (selectedExp.interactiveType !== "isl") return;
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.1;
      ctx.fillStyle = "#08090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isActive = islStage === "AUDIO" || islStage === "TOKEN";
      ctx.strokeStyle = isActive ? "#6c8cff" : "#22262d";
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const freq = isActive ? 0.08 : 0.02;
        const amp = isActive ? 16 * Math.sin(t * 2 + x * 0.05) + 8 : 2;
        const y = centerY + Math.sin(x * freq + t) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedExp.interactiveType, islStage]);

  // ==========================================
  // PLAYGROUND 02: Neural Kernel Matrix Engine
  // ==========================================
  const imageMatrix = [
    [1, 1, 1, 0, 0],
    [1, 2, 2, 1, 0],
    [0, 1, 2, 2, 1],
    [0, 0, 1, 2, 2],
    [0, 0, 0, 1, 1],
  ];

  const sobelKernel = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];

  const [kernelPos, setKernelPos] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  // Compute convolution at current kernel position
  const computeConvolution = () => {
    let sum = 0;
    const steps: string[] = [];
    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const pixel = imageMatrix[kernelPos.r + kr][kernelPos.c + kc];
        const weight = sobelKernel[kr][kc];
        const prod = pixel * weight;
        sum += prod;
        if (weight !== 0) {
          steps.push(`(${pixel}×${weight})`);
        }
      }
    }
    return { sum, stepsStr: steps.join(" + ") };
  };

  const { sum: convOutput, stepsStr: convSteps } = computeConvolution();

  // ==========================================
  // PLAYGROUND 03: Raft Consensus Cluster State
  // ==========================================
  interface RaftNode {
    id: "A" | "B" | "C";
    role: "LEADER" | "FOLLOWER" | "CANDIDATE" | "DEAD";
    votes: number;
    term: number;
  }

  const [raftNodes, setRaftNodes] = useState<RaftNode[]>([
    { id: "A", role: "LEADER", votes: 2, term: 42 },
    { id: "B", role: "FOLLOWER", votes: 0, term: 42 },
    { id: "C", role: "FOLLOWER", votes: 0, term: 42 },
  ]);

  const [raftLog, setRaftLog] = useState<string>("Cluster Healthy. Node A is elected Leader in Term 42.");
  const [electionActive, setElectionActive] = useState(false);

  const failActiveLeader = () => {
    sound.laserPulse();
    setElectionActive(true);
    const currentLeader = raftNodes.find((n) => n.role === "LEADER") || raftNodes[0];

    // Kill Leader
    setRaftNodes((prev) =>
      prev.map((n) => (n.id === currentLeader.id ? { ...n, role: "DEAD" } : n))
    );
    setRaftLog(`[ALERT] Leader ${currentLeader.id} Heartbeat Lost! Initiating Raft Election...`);

    // Step 1: Election timeout
    setTimeout(() => {
      sound.telemetry();
      const aliveCandidates = raftNodes.filter((n) => n.id !== currentLeader.id);
      const nextLeaderCandidate = aliveCandidates[0]?.id || "B";

      setRaftNodes((prev) =>
        prev.map((n) =>
          n.id === nextLeaderCandidate ? { ...n, role: "CANDIDATE", term: n.term + 1, votes: 1 } : n
        )
      );
      setRaftLog(`Node ${nextLeaderCandidate} stepped up as Candidate for Term 43. Requesting votes...`);

      // Step 2: Quorum Achieved
      setTimeout(() => {
        sound.enter();
        setRaftNodes((prev) =>
          prev.map((n) => {
            if (n.id === nextLeaderCandidate) return { ...n, role: "LEADER", votes: 2 };
            if (n.role !== "DEAD") return { ...n, role: "FOLLOWER", term: 43 };
            return n;
          })
        );
        setRaftLog(`✓ Quorum Achieved! Node ${nextLeaderCandidate} elected as NEW LEADER (Term 43).`);
        setElectionActive(false);
      }, 1200);
    }, 1000);
  };

  const recoverAllNodes = () => {
    sound.enter();
    setRaftNodes([
      { id: "A", role: "LEADER", votes: 2, term: 44 },
      { id: "B", role: "FOLLOWER", votes: 0, term: 44 },
      { id: "C", role: "FOLLOWER", votes: 0, term: 44 },
    ]);
    setRaftLog("Cluster reset. Node A resumed leadership in Term 44.");
    setElectionActive(false);
  };

  // ==========================================
  // PLAYGROUND 04: Token Bucket High-Throughput
  // ==========================================
  const maxBucketTokens = 8;
  const [tokens, setTokens] = useState(8);
  const [recentRequests, setRecentRequests] = useState<{ id: number; status: 200 | 429; time: string }[]>([]);

  // Token Refill Timer (1 token per 1.5s)
  useEffect(() => {
    const refillTimer = setInterval(() => {
      setTokens((prev) => Math.min(maxBucketTokens, prev + 1));
    }, 1400);
    return () => clearInterval(refillTimer);
  }, []);

  const sendRateLimitedRequest = () => {
    const nowTime = new Date().toLocaleTimeString();
    if (tokens > 0) {
      sound.telemetry();
      setTokens((prev) => prev - 1);
      setRecentRequests((prev) => [{ id: Date.now(), status: 200, time: nowTime }, ...prev.slice(0, 5)]);
    } else {
      sound.click();
      setRecentRequests((prev) => [{ id: Date.now(), status: 429, time: nowTime }, ...prev.slice(0, 5)]);
    }
  };

  const burstSpamRequests = () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => sendRateLimitedRequest(), i * 60);
    }
  };

  // ==========================================
  // PLAYGROUND 05: VTOP Headless Scraper Terminal
  // ==========================================
  const [terminalCommands, setTerminalCommands] = useState<string[]>([
    "$ python -m vtop_scraper.engine",
    "[INIT] Session pool initialized (Workers: 4)",
  ]);
  const [scraperState, setScraperState] = useState<"IDLE" | "AUTH" | "FETCHING" | "PARSED" | "PERSISTED">("IDLE");

  const runScraperCommand = (action: "auth" | "attendance" | "marks" | "cache") => {
    sound.hover();
    const time = new Date().toLocaleTimeString();

    if (action === "auth") {
      setScraperState("AUTH");
      setTerminalCommands((prev) => [
        ...prev,
        `$ vtop.authenticate()  [${time}]`,
        `> Captcha resolved via OCR in 68ms`,
        `> Session established (Token: sess_94ae2b1)`,
        `✓ 200 OK — Auth Cookie pinned`,
      ]);
    } else if (action === "attendance") {
      setScraperState("FETCHING");
      setTerminalCommands((prev) => [
        ...prev,
        `$ vtop.fetch_attendance()  [${time}]`,
        `> DOM parsed: 8 Courses identified`,
        `> Slot correlation: [CSE3002: 88.5%, CSE3003: 92.0%...]`,
        `✓ 200 OK — Attendance payload JSON serialized (8.4 KB)`,
      ]);
    } else if (action === "marks") {
      setScraperState("PARSED");
      setTerminalCommands((prev) => [
        ...prev,
        `$ vtop.fetch_grades()  [${time}]`,
        `> Ingesting FAT & internal evaluation components`,
        `✓ Computed CGPA Aggregate: 9.24 / 10.0`,
      ]);
    } else if (action === "cache") {
      setScraperState("PERSISTED");
      sound.enter();
      setTerminalCommands((prev) => [
        ...prev,
        `$ db.persist_to_sqlite()  [${time}]`,
        `> WAL Journal mode active`,
        `✓ 14 records committed locally in 3.8ms`,
      ]);
    }
  };

  return (
    <section id="lab" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#22262d]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-2">
            <Sparkles size={14} />
            <span>04 // INTERACTIVE PROTOTYPES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[#f2f2f0] tracking-tight">
            SYSTEM TESTBENCHES <span className="text-[#6c8cff] font-normal text-2xl md:text-3xl">[05 PLAYGROUNDS]</span>
          </h2>
        </div>

        <span className="font-mono text-xs text-[#a1a7b5] bg-[#101216] px-3.5 py-1.5 rounded-full border border-[#22262d] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span>CLIENT-SIDE ALGORITHMIC SIMULATION</span>
        </span>
      </div>

      {/* Main Grid: Experiment Selector (Left) + Distinct Playgrounds (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Experiment Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {LAB_EXPERIMENTS.map((exp) => {
            const isSelected = selectedExp.id === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => {
                  sound.click();
                  setSelectedExp(exp);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#6c8cff] bg-[#101216] ring-1 ring-[#6c8cff]/30 shadow-xl scale-[1.01]"
                    : "border-[#22262d] bg-[#08090b] hover:border-[#3e5cc9] hover:bg-[#101216]/60"
                }`}
                onMouseEnter={() => {
                  setCursor("view", "RUN");
                  sound.hover();
                }}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className={`font-bold ${isSelected ? "text-[#6c8cff]" : "text-[#8b9099]"}`}>
                    {exp.number} // {exp.category}
                  </span>
                  <span
                    className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold ${
                      exp.status === "ACTIVE"
                        ? "bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30"
                        : "bg-[#6c8cff]/15 text-[#6c8cff] border border-[#6c8cff]/30"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#f2f2f0]">{exp.title}</h4>
                <p className="text-xs text-[#8b9099] mt-1.5 leading-relaxed">{exp.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] px-2.5 py-1 rounded bg-[#181b22] text-[#8b9099] border border-[#22262d]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: High-Impact Distinct Interactive Playgrounds */}
        <div className="lg:col-span-7 rounded-3xl border border-[#22262d] bg-[#101216] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Top Testbench Header */}
          <div className="flex items-center justify-between border-b border-[#22262d] pb-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#8b9099]">
              <Terminal size={14} className="text-[#6c8cff]" />
              <span>TESTBENCH // {selectedExp.title.toUpperCase()}</span>
            </div>
            <span className="font-mono text-[10px] text-[#6c8cff] bg-[#181b22] px-2.5 py-1 rounded-full border border-[#22262d]">
              INTERACTIVE MODULE
            </span>
          </div>

          {/* ========================================================
              PLAYGROUND 01: SPEECH -> ISL PIPELINE
             ======================================================== */}
          {selectedExp.interactiveType === "isl" && (
            <div className="space-y-5 font-mono text-xs">
              {/* Input Controls */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-[#8b9099]">
                  <span>SPEECH / PHRASE INPUT STREAM:</span>
                  <span>{speechInputText.length} CHARS</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={speechInputText}
                    onChange={(e) => setSpeechInputText(e.target.value)}
                    placeholder="Type a custom phrase..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#08090b] border border-[#22262d] text-[#f2f2f0] focus:border-[#6c8cff] focus:outline-none"
                  />
                  <button
                    onClick={() => runSpeechPipeline()}
                    className="px-4 py-2.5 rounded-xl bg-[#6c8cff] text-[#08090b] font-bold text-xs flex items-center gap-1.5 hover:bg-[#85a0ff] transition-all shadow-md"
                  >
                    <Mic size={13} />
                    <span>PROCESS</span>
                  </button>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Hello, welcome to my portfolio",
                    "Computer Science and Engineering",
                    "Thank you very much",
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => runSpeechPipeline(phrase)}
                      className="px-2.5 py-1 rounded-lg bg-[#181b22] border border-[#22262d] text-[10px] text-[#8b9099] hover:text-[#f2f2f0] hover:border-[#6c8cff]"
                    >
                      &ldquo;{phrase}&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Waveform Canvas */}
              <div className="rounded-xl border border-[#22262d] bg-[#08090b] p-3 space-y-1">
                <div className="flex justify-between text-[9px] text-[#8b9099]">
                  <span>FFT AUDIO WAVEFORM</span>
                  <span className={islStage === "AUDIO" ? "text-[#6c8cff] font-bold" : ""}>
                    {islStage === "AUDIO" ? "PROCESSING WAVEFORM..." : "BUFFER READY"}
                  </span>
                </div>
                <canvas ref={waveformCanvasRef} width={520} height={50} className="w-full h-[45px] block" />
              </div>

              {/* 5-Stage Animated Pipeline Visualizer */}
              <div className="space-y-2">
                <div className="text-[10px] text-[#8b9099]">5-TIER SYNTACTIC PIPELINE:</div>
                <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                  {[
                    { id: "AUDIO", label: "01. AUDIO" },
                    { id: "TOKEN", label: "02. TOKENS" },
                    { id: "GRAMMAR", label: "03. ISL GRAMMAR" },
                    { id: "GESTURE", label: "04. GESTURES" },
                    { id: "COMPLETE", label: "05. 3D AVATAR" },
                  ].map((step) => {
                    const isStepActive =
                      islStage === step.id || (islStage === "COMPLETE" && step.id !== "COMPLETE");
                    return (
                      <div
                        key={step.id}
                        className={`p-2 rounded-lg border font-bold transition-all ${
                          isStepActive
                            ? "border-[#6c8cff] bg-[#6c8cff]/15 text-[#6c8cff]"
                            : "border-[#22262d] bg-[#08090b] text-[#8b9099]"
                        }`}
                      >
                        {step.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parsed Gesture Tokens Display */}
              <div className="p-4 rounded-xl bg-[#08090b] border border-[#22262d] space-y-2">
                <div className="text-[10px] text-[#8b9099]">SYNTHESIZED ISL GESTURE TOKENS:</div>
                <div className="flex flex-wrap gap-2">
                  {sampleTokens.map((tok, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-[#181b22] border border-[#6c8cff] text-[#6c8cff] font-bold text-xs flex items-center gap-2 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6c8cff]" />
                      <span>{tok}</span>
                      <span className="text-[9px] text-[#8b9099]">#{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              PLAYGROUND 02: NEURAL KERNEL CONVOLUTION VISUALIZER
             ======================================================== */}
          {selectedExp.interactiveType === "cv" && (
            <div className="space-y-5 font-mono text-xs">
              <div className="text-[#8b9099]">
                Interactive 3×3 Spatial Convolution: Click or move the kernel over the 5×5 image matrix to compute the output feature pixel in real time.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* 5x5 Image Matrix with 3x3 Overlay */}
                <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-2">
                  <div className="text-[10px] text-[#8b9099] flex justify-between">
                    <span>5×5 INPUT IMAGE MATRIX:</span>
                    <span className="text-[#6c8cff]">POS: ({kernelPos.r},{kernelPos.c})</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 max-w-[240px] mx-auto">
                    {imageMatrix.map((row, rIdx) =>
                      row.map((val, cIdx) => {
                        const inKernel =
                          rIdx >= kernelPos.r &&
                          rIdx < kernelPos.r + 3 &&
                          cIdx >= kernelPos.c &&
                          cIdx < kernelPos.c + 3;

                        return (
                          <button
                            key={`${rIdx}-${cIdx}`}
                            onClick={() => {
                              const validR = Math.min(2, Math.max(0, rIdx));
                              const validC = Math.min(2, Math.max(0, cIdx));
                              setKernelPos({ r: validR, c: validC });
                              sound.hover();
                            }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                              inKernel
                                ? "bg-[#6c8cff]/20 border-2 border-[#6c8cff] text-[#6c8cff] scale-105 shadow-md"
                                : "bg-[#101216] border border-[#22262d] text-[#8b9099] hover:border-[#6c8cff]"
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 3x3 Sobel Kernel Matrix */}
                <div className="p-4 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-2">
                  <div className="text-[10px] text-[#8b9099]">3×3 SOBEL VERTICAL KERNEL:</div>
                  <div className="grid grid-cols-3 gap-1.5 max-w-[160px] mx-auto text-center font-bold text-emerald-400">
                    {sobelKernel.map((row, r) =>
                      row.map((w, c) => (
                        <div key={`${r}-${c}`} className="p-2 rounded-lg bg-[#101216] border border-[#22262d]">
                          {w > 0 ? `+${w}` : w}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Convolution Mathematical Computation HUD */}
              <div className="p-4 rounded-xl bg-[#08090b] border border-[#22262d] space-y-2">
                <div className="flex justify-between text-[10px] text-[#8b9099]">
                  <span>CONVOLUTION COMPUTATION:</span>
                  <span className="text-[#10b981] font-bold">∑(Pixel × Weight)</span>
                </div>
                <div className="text-[11px] text-[#8b9099] truncate font-mono bg-[#101216] p-2.5 rounded-lg border border-[#22262d]">
                  {convSteps}
                </div>
                <div className="flex justify-between items-center text-xs font-bold pt-1">
                  <span className="text-[#f2f2f0]">OUTPUT FEATURE PIXEL VALUE:</span>
                  <span className="text-xl text-[#6c8cff] bg-[#181b22] px-3 py-1 rounded-lg border border-[#22262d]">
                    {convOutput}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              PLAYGROUND 03: DISTRIBUTED RAFT CONSENSUS CLUSTER
             ======================================================== */}
          {selectedExp.interactiveType === "cache" && (
            <div className="space-y-5 font-mono text-xs">
              <div className="text-[#8b9099]">
                Live 3-Node Raft Consensus Cluster: Kill the active leader to trigger real-time leader election and quorum voting.
              </div>

              {/* 3 Node Cluster Topology */}
              <div className="grid grid-cols-3 gap-4">
                {raftNodes.map((node) => {
                  const isLeader = node.role === "LEADER";
                  const isDead = node.role === "DEAD";
                  const isCandidate = node.role === "CANDIDATE";

                  return (
                    <div
                      key={node.id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center space-y-2 transition-all ${
                        isLeader
                          ? "border-[#10b981] bg-[#10b981]/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                          : isDead
                          ? "border-rose-950/70 bg-rose-950/30 opacity-60"
                          : isCandidate
                          ? "border-amber-500 bg-amber-500/10 animate-pulse"
                          : "border-[#22262d] bg-[#08090b]"
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <Server size={14} className={isLeader ? "text-[#10b981]" : isDead ? "text-rose-400" : "text-[#6c8cff]"} />
                        <span className="text-[#f2f2f0]">NODE {node.id}</span>
                      </div>

                      <div
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLeader
                            ? "bg-[#10b981] text-[#08090b]"
                            : isDead
                            ? "bg-rose-500 text-white"
                            : isCandidate
                            ? "bg-amber-400 text-[#08090b]"
                            : "bg-[#181b22] text-[#8b9099]"
                        }`}
                      >
                        {node.role}
                      </div>

                      <div className="text-[9px] text-[#8b9099]">
                        Term: <span className="text-[#f2f2f0] font-bold">{node.term}</span> | Votes: {node.votes}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Raft Terminal Event Log */}
              <div className="p-4 rounded-xl bg-[#08090b] border border-[#22262d] space-y-1">
                <div className="text-[9px] text-[#8b9099] flex items-center gap-1.5">
                  <Radio size={10} className="text-[#10b981] animate-pulse" />
                  <span>RAFT CONSENSUS EVENT STREAM:</span>
                </div>
                <div className="text-[#6c8cff] font-bold text-xs py-1">{raftLog}</div>
              </div>

              {/* Action Controls */}
              <div className="flex gap-3">
                <button
                  onClick={failActiveLeader}
                  disabled={electionActive}
                  className="flex-1 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Skull size={14} />
                  <span>FAIL ACTIVE LEADER (TRIGGER ELECTION)</span>
                </button>

                <button
                  onClick={recoverAllNodes}
                  className="px-4 py-3 rounded-xl bg-[#181b22] border border-[#22262d] text-[#f2f2f0] hover:border-[#6c8cff] flex items-center gap-1.5"
                >
                  <RotateCcw size={13} />
                  <span>RESET</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              PLAYGROUND 04: TOKEN BUCKET RATE LIMITER
             ======================================================== */}
          {selectedExp.interactiveType === "ratelimit" && (
            <div className="space-y-5 font-mono text-xs">
              <div className="text-[#8b9099]">
                Token Bucket Traffic Shaper: Dispatch rapid bursts to observe token depletion, bucket drain, and 429 DDoS throttling.
              </div>

              {/* Glowing Token Visualizer */}
              <div className="p-5 rounded-2xl bg-[#08090b] border border-[#22262d] space-y-3">
                <div className="flex justify-between text-[10px] text-[#8b9099]">
                  <span>TOKEN BUCKET RESERVOIR:</span>
                  <span className="text-[#10b981] font-bold">
                    {tokens} / {maxBucketTokens} AVAILABLE (REFILL: +1/1.4s)
                  </span>
                </div>

                <div className="flex gap-2.5 justify-center py-3">
                  {Array.from({ length: maxBucketTokens }).map((_, i) => {
                    const isAvailable = i < tokens;
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                          isAvailable
                            ? "bg-[#6c8cff] border-[#85a0ff] shadow-[0_0_12px_#6c8cff] scale-105"
                            : "bg-[#101216] border-[#22262d] scale-90 opacity-40"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={sendRateLimitedRequest}
                  className="py-3.5 rounded-xl bg-[#6c8cff] hover:bg-[#85a0ff] text-[#08090b] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Zap size={14} />
                  <span>SEND 1 REQUEST</span>
                </button>

                <button
                  onClick={burstSpamRequests}
                  className="py-3.5 rounded-xl bg-[#181b22] hover:bg-[#22262d] border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldAlert size={14} />
                  <span>RAPID BURST SPAM (6x)</span>
                </button>
              </div>

              {/* Recent Request Stream */}
              <div className="p-3 rounded-xl bg-[#08090b] border border-[#22262d] space-y-1.5">
                <div className="text-[10px] text-[#8b9099]">REAL-TIME TRAFFIC INGESTION LOG:</div>
                <div className="space-y-1">
                  {recentRequests.length === 0 ? (
                    <div className="text-[#8b9099] text-[10px]">No requests dispatched yet. Click buttons above.</div>
                  ) : (
                    recentRequests.map((req) => (
                      <div
                        key={req.id}
                        className={`flex justify-between p-1.5 rounded text-[10px] ${
                          req.status === 200 ? "bg-[#101216] text-[#10b981]" : "bg-rose-950/40 text-rose-400"
                        }`}
                      >
                        <span>&gt; GET /api/v1/telemetry</span>
                        <span className="font-bold">
                          {req.status === 200 ? "200 OK (TOKEN CONSUMED)" : "429 TOO MANY REQUESTS (BLOCKED)"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              PLAYGROUND 05: VTOP HEADLESS SESSION SCRAPER ENGINE
             ======================================================== */}
          {selectedExp.interactiveType === "vtop" && (
            <div className="space-y-5 font-mono text-xs">
              <div className="text-[#8b9099]">
                Headless Asynchronous University Portal Scraper: Execute the lifecycle methods below to simulate auth pooling, DOM parsing, and local SQLite caching.
              </div>

              {/* Interactive Step Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => runScraperCommand("auth")}
                  className="p-2.5 rounded-xl bg-[#181b22] border border-[#22262d] hover:border-[#6c8cff] text-[#f2f2f0] text-[10px] font-bold text-left"
                >
                  1. authenticate()
                </button>
                <button
                  onClick={() => runScraperCommand("attendance")}
                  className="p-2.5 rounded-xl bg-[#181b22] border border-[#22262d] hover:border-[#6c8cff] text-[#f2f2f0] text-[10px] font-bold text-left"
                >
                  2. fetch_attendance()
                </button>
                <button
                  onClick={() => runScraperCommand("marks")}
                  className="p-2.5 rounded-xl bg-[#181b22] border border-[#22262d] hover:border-[#6c8cff] text-[#f2f2f0] text-[10px] font-bold text-left"
                >
                  3. fetch_grades()
                </button>
                <button
                  onClick={() => runScraperCommand("cache")}
                  className="p-2.5 rounded-xl bg-[#181b22] border border-[#22262d] hover:border-[#10b981] text-[#10b981] text-[10px] font-bold text-left"
                >
                  4. persist_to_sqlite()
                </button>
              </div>

              {/* Terminal Logs Output */}
              <div className="p-4 rounded-xl bg-[#08090b] border border-[#22262d] space-y-1.5 h-44 overflow-y-auto">
                {terminalCommands.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith("$")
                        ? "text-[#6c8cff] font-bold"
                        : line.startsWith("✓")
                        ? "text-[#10b981] font-bold"
                        : "text-[#8b9099]"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#181b22] border border-[#22262d] text-[10px] text-[#8b9099] flex items-center justify-between">
                <span>FastAPI Async Engine: Persistent session pool ready</span>
                <span className="text-[#10b981] font-bold">STATE: {scraperState}</span>
              </div>
            </div>
          )}

          {/* Bottom Testbench Footer */}
          <div className="pt-4 border-t border-[#22262d] flex justify-between font-mono text-xs text-[#8b9099] mt-6">
            <span>GNANESH LAB BENCH</span>
            <span className="text-[#10b981]">CLIENT-SIDE ISOLATED RUNTIME</span>
          </div>
        </div>
      </div>
    </section>
  );
};
