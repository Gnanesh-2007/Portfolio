"use client";

import React, { useState } from "react";
import { PERSONAL_DATA } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { sound } from "@/lib/sound";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";

const GithubIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sound.enter();
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-4 md:px-8 max-w-5xl mx-auto border-t border-[#22262d]/50">
      <div className="flex items-center gap-2 font-mono text-xs text-[#6c8cff] tracking-widest uppercase mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6c8cff]" />
        <span>CONTACT // GET IN TOUCH</span>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f2f2f0] leading-tight">
            Let&apos;s Connect.
          </h2>
          <p className="text-base sm:text-lg text-[#8b9099] font-light mt-3 max-w-xl">
            Have a question, an idea, or just want to say hi? Drop an email or connect directly through my socials.
          </p>
        </div>

        {/* Clean Direct Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
          {/* Email Card */}
          <div className="p-5 rounded-2xl border border-[#22262d] bg-[#101216] flex flex-col justify-between gap-4 group hover:border-[#6c8cff] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6c8cff]">
                <Mail size={18} />
                <span className="font-bold tracking-wider text-[#f2f2f0]">EMAIL</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-md bg-[#181b22] border border-[#22262d] text-[#8b9099] hover:text-white flex items-center gap-1 transition-all"
                title="Copy email address"
              >
                {copied ? <Check size={12} className="text-[#10b981]" /> : <Copy size={12} />}
                <span className="text-[10px]">{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            <a
              href={`mailto:${PERSONAL_DATA.email}`}
              className="text-[#8b9099] hover:text-[#6c8cff] transition-colors truncate font-sans text-sm"
              onMouseEnter={() => {
                setCursor("link", "MAIL");
                sound.hover();
              }}
              onMouseLeave={resetCursor}
            >
              {PERSONAL_DATA.email}
            </a>
          </div>

          {/* GitHub Card */}
          <a
            href={PERSONAL_DATA.socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl border border-[#22262d] bg-[#101216] flex flex-col justify-between gap-4 group hover:border-[#6c8cff] transition-all"
            onMouseEnter={() => {
              setCursor("link", "GIT");
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6c8cff]">
                <GithubIcon size={18} />
                <span className="font-bold tracking-wider text-[#f2f2f0]">GITHUB</span>
              </div>
              <ArrowUpRight size={16} className="text-[#8b9099] group-hover:text-[#6c8cff] transition-colors" />
            </div>

            <div className="text-[#8b9099] group-hover:text-white transition-colors font-sans text-sm">
              @Gnanesh-2007
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={PERSONAL_DATA.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl border border-[#22262d] bg-[#101216] flex flex-col justify-between gap-4 group hover:border-[#6c8cff] transition-all"
            onMouseEnter={() => {
              setCursor("link", "IN");
              sound.hover();
            }}
            onMouseLeave={resetCursor}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6c8cff]">
                <LinkedinIcon size={18} />
                <span className="font-bold tracking-wider text-[#f2f2f0]">LINKEDIN</span>
              </div>
              <ArrowUpRight size={16} className="text-[#8b9099] group-hover:text-[#6c8cff] transition-colors" />
            </div>

            <div className="text-[#8b9099] group-hover:text-white transition-colors font-sans text-sm">
              Gnanesh Reddy Maram
            </div>
          </a>
        </div>

        {/* Bottom Footer Credits */}
        <div className="pt-12 mt-8 border-t border-[#22262d]/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8b9099]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Nellore, Andhra Pradesh, India</span>
          </div>
          <div>© {new Date().getFullYear()} Gnanesh Reddy Maram. All rights reserved.</div>
        </div>
      </div>
    </section>
  );
};
