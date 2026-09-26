"use client";

import React from "react";
import { CinematicLoader } from "@/components/hero/CinematicLoader";
import { Header } from "@/components/navigation/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatementSection } from "@/components/sections/StatementSection";
import { HorizontalProjects } from "@/components/projects/HorizontalProjects";
import { NexusShowcase } from "@/components/projects/NexusShowcase";
import { ParkOSShowcase } from "@/components/projects/ParkOSShowcase";
import { OmertaShowcase } from "@/components/projects/OmertaShowcase";
import { LabSection } from "@/components/sections/LabSection";
import { TechConstellation } from "@/components/sections/TechConstellation";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CurrentlySection } from "@/components/sections/CurrentlySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/navigation/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#08090b] text-[#f2f2f0] overflow-x-hidden">
      {/* Phase 4: Cinematic Entrance Loader */}
      <CinematicLoader />

      {/* Global Navigation HUD */}
      <Header />

      {/* Phase 5: Hero Section + 3D Interactive Metaphor */}
      <HeroSection />

      {/* Phase 6: Kinetic Typography Statement */}
      <StatementSection />

      {/* Phase 7: Horizontal Cinematic Selected Work Sequence */}
      <HorizontalProjects />

      {/* Flagship Showcases Section */}
      <div id="showcases" className="space-y-12">
        {/* Phase 8: VIT-AP Nexus Showcase */}
        <NexusShowcase />

        {/* Phase 9: ParkOS Smart Parking Showcase */}
        <ParkOSShowcase />

        {/* Phase 10: Omertà AI Computer Vision Showcase */}
        <OmertaShowcase />
      </div>

      {/* Phase 11: Interactive Lab [05 Demos] */}
      <LabSection />

      {/* Phase 12: Technology Constellation */}
      <TechConstellation />

      {/* Phase 13: Editorial Journey & Timeline */}
      <TimelineSection />

      {/* Phase 14: Currently Real-Time Radar */}
      <CurrentlySection />

      {/* Phase 15: Contact Section & Message Terminal Deck */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
