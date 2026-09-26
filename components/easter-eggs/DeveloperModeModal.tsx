"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { X, Terminal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const DeveloperModeModal: React.FC = () => {
  const { isDevModalOpen, setDevModalOpen } = useAppStore();
  const [cmdInput, setCmdInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "GNANESH ARCHITECTURAL SYSTEM CONSOLE v2.4",
    "Type 'help' for a list of available system commands.",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener ('G' or '`' / Konami code)
  useEffect(() => {
    let konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle modal with 'g' key when not typing in an input
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (
        (e.key === "g" || e.key === "G" || e.key === "`") &&
        targetTag !== "input" &&
        targetTag !== "textarea"
      ) {
        e.preventDefault();
        sound.click();
        setDevModalOpen(!isDevModalOpen);
      }

      // Konami code detection
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0;
          sound.enter();
          try {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 },
              colors: ["#6c8cff", "#10b981", "#f59e0b", "#ffffff"],
            });
          } catch {}
          setLogs((prev) => [
            ...prev,
            "★ [EASTER EGG UNLOCKED] KONAMI PROTOCOL ENGAGED: OVERCLOCK 120%",
          ]);
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDevModalOpen, setDevModalOpen]);

  useEffect(() => {
    if (isDevModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isDevModalOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    if (!cleanCmd) return;

    sound.hover();
    const newLogs = [...logs, `> ${cmdInput}`];

    switch (cleanCmd) {
      case "help":
        newLogs.push(
          "AVAILABLE COMMANDS:",
          "  whoami      - Display engineer bio and specs",
          "  projects    - List flagship software systems",
          "  tech        - List core programming languages and frameworks",
          "  contact     - Display verified contact channels",
          "  clear       - Clear console output",
          "  konami      - Hint for the legendary code",
          "  exit        - Close developer console"
        );
        break;
      case "whoami":
        newLogs.push(
          "NAME: Gnanesh Reddy Maram",
          "ROLE: Full Stack Developer & Software Engineer",
          "LOCATION: Nellore, Andhra Pradesh, India",
          "FOCUS: Systems, AI / Computer Vision, Distributed Backends"
        );
        break;
      case "projects":
        newLogs.push(
          "01. VIT-AP NEXUS  - Campus Super App & Academic OS (Flutter, FastAPI, SQLite)",
          "02. PARKOS        - Smart IoT Parking Operating System (Next.js, WebSockets)",
          "03. OMERTÀ        - Multi-Camera AI Vehicle Tracking & Re-ID (PyTorch, YOLO)"
        );
        break;
      case "tech":
        newLogs.push(
          "LANGUAGES : Python, TypeScript, Dart, C/C++, SQL",
          "FRAMEWORKS: Next.js, React, Flutter, FastAPI, PyTorch, Tailwind CSS",
          "SYSTEMS   : Docker, PostgreSQL, Redis, Riverpod, OpenCV, Git"
        );
        break;
      case "contact":
        newLogs.push(
          "EMAIL   : gnaneshreddy357@gmail.com",
          "GITHUB  : https://github.com/Gnanesh-2007",
          "LINKEDIN: https://www.linkedin.com/in/gnanesh-reddy-a60141325/"
        );
        break;
      case "konami":
        newLogs.push("HINT: Try typing ↑ ↑ ↓ ↓ ← → ← → B A anywhere on your keyboard!");
        break;
      case "clear":
        setLogs([]);
        setCmdInput("");
        return;
      case "exit":
        setDevModalOpen(false);
        setCmdInput("");
        return;
      default:
        newLogs.push(`Command not recognized: '${cleanCmd}'. Type 'help' for assistance.`);
        break;
    }

    setLogs(newLogs);
    setCmdInput("");
  };

  return (
    <AnimatePresence>
      {isDevModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-2xl rounded-2xl border border-[#22262d] bg-[#08090b] shadow-2xl overflow-hidden flex flex-col h-[480px]"
          >
            {/* Window Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#22262d] bg-[#101216]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8b9099]">
                <Terminal size={14} className="text-[#6c8cff]" />
                <span className="text-[#f2f2f0] font-bold">GNANESH // SYSTEM_DEV_CLI</span>
                <span className="text-[10px] text-[#6c8cff]">[PRESS G TO TOGGLE]</span>
              </div>

              <button
                onClick={() => setDevModalOpen(false)}
                className="p-1 rounded text-[#8b9099] hover:text-[#f2f2f0] hover:bg-[#181b22]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Output */}
            <div className="flex-1 p-4 font-mono text-xs space-y-1.5 overflow-y-auto text-[#8b9099]">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.startsWith(">")
                      ? "text-[#6c8cff] font-bold"
                      : log.startsWith("★")
                      ? "text-[#10b981] font-bold"
                      : ""
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleCommandSubmit} className="p-3 border-t border-[#22262d] bg-[#101216] flex items-center gap-2">
              <span className="font-mono text-xs text-[#6c8cff] font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder="type 'help', 'whoami', 'projects'..."
                className="flex-1 bg-transparent font-mono text-xs text-[#f2f2f0] focus:outline-none placeholder-[#8b9099]/50"
              />
              <button
                type="submit"
                className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#181b22] text-[#6c8cff] border border-[#22262d]"
              >
                EXECUTE
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
