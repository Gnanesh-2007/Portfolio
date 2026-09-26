"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { PERSONAL_DATA } from "@/lib/data";
import { Volume2, VolumeX, Terminal, Menu, X, Compass, FileText, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const { isAudioEnabled, toggleAudio, setDevModalOpen, setCursor, resetCursor } = useAppStore();
  const [time, setTime] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentContext, setCurrentContext] = useState<string>("GNANESH MARAM");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Context-aware scroll position observer
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const nexusEl = document.getElementById("nexus-showcase");
      const parkosEl = document.getElementById("parkos-showcase");
      const omertaEl = document.getElementById("omerta-showcase");
      const labEl = document.getElementById("lab");
      const constEl = document.getElementById("constellation");
      const aboutEl = document.getElementById("about");
      const contactEl = document.getElementById("contact");
      const workEl = document.getElementById("work");

      const checkInView = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 250 && rect.bottom >= 150;
      };

      if (checkInView(contactEl)) {
        setCurrentContext("07 // CONTACT");
      } else if (checkInView(aboutEl)) {
        setCurrentContext("06 // JOURNEY & MILESTONES");
      } else if (checkInView(constEl)) {
        setCurrentContext("05 // TECH STACK");
      } else if (checkInView(labEl)) {
        setCurrentContext("04 // PROTOTYPES");
      } else if (checkInView(omertaEl)) {
        setCurrentContext("03 // OMERTÀ [AI RE-ID]");
      } else if (checkInView(parkosEl)) {
        setCurrentContext("02 // PARKOS [SPATIAL IOT]");
      } else if (checkInView(nexusEl)) {
        setCurrentContext("01 // VIT-AP NEXUS [APP]");
      } else if (checkInView(workEl)) {
        setCurrentContext("01 // FEATURED WORK");
      } else {
        setCurrentContext("GNANESH MARAM");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    const next = !isAudioEnabled;
    sound.setEnabled(next);
    toggleAudio();
  };

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "CASE STUDIES", href: "#nexus-showcase" },
    { label: "PROTOTYPES", href: "#lab" },
    { label: "STACK", href: "#constellation" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#08090b]/90 backdrop-blur-xl border-b border-[#22262d] shadow-lg"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group shrink-0"
            onMouseEnter={() => {
              setCursor("link", "TOP");
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            <div className="text-lg md:text-xl font-mono tracking-tight text-[#f2f2f0]">
              <strong className="font-extrabold text-white group-hover:text-[#6c8cff] transition-colors">GNANESH</strong>{" "}
              <span className="font-light text-[#8b9099]">MARAM</span>
            </div>
          </a>

          {/* Morphing Dynamic Context Indicator (Desktop Center) */}
          <div className="hidden xl:flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentContext}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-1.5 rounded-full border border-[#22262d] bg-[#101216]/80 flex items-center gap-2 font-mono text-xs shadow-inner"
              >
                <Compass size={12} className="text-[#6c8cff] animate-spin" />
                <span className="text-[#f2f2f0] font-bold tracking-wider">{currentContext}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs tracking-wider text-[#a1a7b5] hover:text-[#f2f2f0] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#6c8cff] after:absolute after:bottom-0 after:left-0 after:transition-all"
                onMouseEnter={() => {
                  setCursor("link");
                  sound.hover();
                }}
                onMouseLeave={resetCursor}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links & Controls */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Direct Resume Button */}
            <a
              href={PERSONAL_DATA.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#374151] bg-[#101216] text-[#f2f2f0] hover:text-white hover:border-[#6c8cff] hover:bg-[#6c8cff]/10 transition-all font-mono text-xs font-bold"
              onMouseEnter={() => {
                setCursor("link", "RESUME");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
            >
              <FileText size={12} className="text-[#6c8cff]" />
              <span>Resume</span>
            </a>

            {/* Social Pill Chips */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-xs">
              <a
                href="https://github.com/Gnanesh-2007"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#22262d] bg-[#101216] text-[#a1a7b5] hover:text-white hover:border-[#6c8cff] hover:bg-[#6c8cff]/10 transition-all"
                onMouseEnter={() => {
                  setCursor("link", "GIT");
                  sound.hover();
                }}
                onMouseLeave={resetCursor}
              >
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/gnanesh-reddy-a60141325/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#22262d] bg-[#101216] text-[#a1a7b5] hover:text-white hover:border-[#6c8cff] hover:bg-[#6c8cff]/10 transition-all"
                onMouseEnter={() => {
                  setCursor("link", "IN");
                  sound.hover();
                }}
                onMouseLeave={resetCursor}
              >
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              aria-label={isAudioEnabled ? "Mute audio synthesis" : "Enable audio soundscape"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-mono transition-all ${
                isAudioEnabled
                  ? "border-[#6c8cff] bg-[#6c8cff]/10 text-[#6c8cff]"
                  : "border-[#22262d] bg-[#101216] text-[#8b9099] hover:text-[#f2f2f0] hover:border-[#3e5cc9]"
              }`}
              onMouseEnter={() => {
                setCursor("sound", isAudioEnabled ? "MUTE" : "AUDIO");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
              title={isAudioEnabled ? "Sound ON" : "Sound OFF"}
            >
              {isAudioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            {/* Dev Mode Terminal Button */}
            <button
              onClick={() => {
                sound.click();
                setDevModalOpen(true);
              }}
              aria-label="Open Developer CLI Console (Press G)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#22262d] bg-[#101216] text-xs font-mono text-[#8b9099] hover:text-[#6c8cff] hover:border-[#6c8cff] transition-all shadow-sm"
              onMouseEnter={() => {
                setCursor("code", "DEV");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
              title="Open Developer Console (Press G)"
            >
              <Terminal size={13} />
              <span className="text-[10px] text-[#8b9099] bg-[#181b22] px-1 rounded">G</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Toggle navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-hidden={mobileMenuOpen}
              tabIndex={mobileMenuOpen ? -1 : 0}
              className="md:hidden p-2 rounded-lg border border-[#22262d] bg-[#101216] text-[#f2f2f0] cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Clean Full-Screen Mobile Drawer Menu (No Overlap) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#08090b] p-6 pt-20 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            {/* Top Close Bar in Drawer */}
            <div className="flex items-center justify-between border-b border-[#22262d] pb-4">
              <div className="font-mono text-xs text-[#6c8cff] font-bold">
                GNANESH MARAM // NAVIGATION
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 rounded-lg border border-[#22262d] bg-[#101216] text-[#f2f2f0]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav Links Stack */}
            <div className="flex flex-col gap-2 my-6">
              {navLinks.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xl font-bold tracking-wider text-[#f2f2f0] flex items-center justify-between py-3.5 border-b border-[#22262d]/50 hover:text-[#6c8cff] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-[#6c8cff]">0{idx + 1}</span>
                </a>
              ))}

              <a
                href={PERSONAL_DATA.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xl font-bold tracking-wider text-[#6c8cff] flex items-center justify-between py-3.5 border-b border-[#22262d]/50"
              >
                <span>RESUME / CV</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Mobile Footer Info */}
            <div className="font-mono text-xs text-[#8b9099] pt-4 border-t border-[#22262d] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="text-[#f2f2f0]">Nellore, Andhra Pradesh, India</span>
              </div>
              <div className="text-[#6c8cff]">gnaneshreddy357@gmail.com</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
