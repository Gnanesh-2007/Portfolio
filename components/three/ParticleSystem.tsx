"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sound } from "@/lib/sound";

export type MetamorphosisStage = "chaos" | "network" | "architecture" | "product";

interface StageInfo {
  id: MetamorphosisStage;
  label: string;
  tagline: string;
}

const STAGES: StageInfo[] = [
  { id: "chaos", label: "CHAOS", tagline: "HIGH-ENTROPY DISCONNECTED PARTICLES" },
  { id: "network", label: "NETWORK", tagline: "DYNAMIC GRAPH TOPOLOGY & PROXIMITY LINKS" },
  { id: "architecture", label: "ARCHITECTURE", tagline: "4-TIER DISTRIBUTED SYSTEM FLOW" },
  { id: "product", label: "PRODUCT", tagline: "VIT-AP NEXUS WIREFRAME DEVICE OS" },
];

// =========================================================================
// Pure Mathematical & Systems Particle Metamorphosis (No Model Inside)
// =========================================================================
const MetamorphosisMesh: React.FC<{
  scrollProgress: number;
  mousePos: { x: number; y: number };
  onStageChange?: (stage: MetamorphosisStage) => void;
}> = ({ scrollProgress, mousePos, onStageChange }) => {
  const count = 1600;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const lastReportedStage = useRef<MetamorphosisStage>("chaos");

  // Generate target geometries for 4 stages
  const { chaosPositions, networkPositions, architecturePositions, productPositions } = useMemo(() => {
    const chPos = new Float32Array(count * 3);
    const netPos = new Float32Array(count * 3);
    const archPos = new Float32Array(count * 3);
    const prodPos = new Float32Array(count * 3);

    // 1. CHAOS: High-entropy particles floating in ambient Brownian space
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      chPos[i3] = (Math.random() - 0.5) * 8.5;
      chPos[i3 + 1] = (Math.random() - 0.5) * 6.5;
      chPos[i3 + 2] = (Math.random() - 0.5) * 5.0;

      // 2. NETWORK: Spherical interconnected neural web
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.6 * Math.cbrt(Math.random());
      netPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      netPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      netPos[i3 + 2] = r * Math.cos(phi);

      // 3. ARCHITECTURE: Layered 4-Tier Distributed System Planes (Flutter -> SQLite -> FastAPI -> VTOP)
      const tier = i % 4;
      const tx = ((i % 40) - 20) * 0.22;
      const tz = (Math.floor(i / 40) - 10) * 0.18;
      const ty = (tier - 1.5) * 1.0 + Math.sin(tx * 2) * 0.1;
      archPos[i3] = tx;
      archPos[i3 + 1] = ty;
      archPos[i3 + 2] = tz;

      // 4. PRODUCT: 3D Wireframe Smartphone Device (Nexus)
      if (i < 400) {
        const p = i / 400;
        let px = 0;
        let py = 0;
        if (p < 0.25) {
          px = -1.2 + (p / 0.25) * 2.4;
          py = 2.2;
        } else if (p < 0.5) {
          px = 1.2;
          py = 2.2 - ((p - 0.25) / 0.25) * 4.4;
        } else if (p < 0.75) {
          px = 1.2 - ((p - 0.5) / 0.25) * 2.4;
          py = -2.2;
        } else {
          px = -1.2;
          py = -2.2 + ((p - 0.75) / 0.25) * 4.4;
        }
        prodPos[i3] = px + (Math.random() - 0.5) * 0.05;
        prodPos[i3 + 1] = py + (Math.random() - 0.5) * 0.05;
        prodPos[i3 + 2] = (Math.random() - 0.5) * 0.1;
      } else {
        const uiIdx = i - 400;
        const uix = ((uiIdx % 30) - 15) * 0.07;
        const uiy = (Math.floor(uiIdx / 30) - 20) * 0.09;
        prodPos[i3] = Math.max(-1.0, Math.min(1.0, uix));
        prodPos[i3 + 1] = Math.max(-1.9, Math.min(1.9, uiy));
        prodPos[i3 + 2] = (Math.random() - 0.5) * 0.08;
      }
    }

    return {
      chaosPositions: chPos,
      networkPositions: netPos,
      architecturePositions: archPos,
      productPositions: prodPos,
    };
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const colors = useMemo(() => new Float32Array(count * 3), [count]);

  const maxLines = 700;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] = chaosPositions[i];
      colors[i] = 0.95;
    }
  }, [currentPositions, colors, chaosPositions, count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const progress = Math.min(Math.max(scrollProgress, 0), 1);

    let currentStage: MetamorphosisStage = "chaos";
    if (progress < 0.28) currentStage = "chaos";
    else if (progress < 0.58) currentStage = "network";
    else if (progress < 0.85) currentStage = "architecture";
    else currentStage = "product";

    if (currentStage !== lastReportedStage.current) {
      lastReportedStage.current = currentStage;
      onStageChange?.(currentStage);
      sound.telemetry();
    }

    let sourceArr = chaosPositions;
    let destArr = networkPositions;
    let blend = 0;

    if (progress < 0.33) {
      sourceArr = chaosPositions;
      destArr = networkPositions;
      blend = progress / 0.33;
    } else if (progress < 0.66) {
      sourceArr = networkPositions;
      destArr = architecturePositions;
      blend = (progress - 0.33) / 0.33;
    } else {
      sourceArr = architecturePositions;
      destArr = productPositions;
      blend = (progress - 0.66) / 0.34;
    }

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colArray = pointsRef.current.geometry.attributes.color.array as Float32Array;

    const lerpSpeed = Math.min(delta * 5.0, 0.25);
    const time = state.clock.getElapsedTime();
    const targetMouse3D = new THREE.Vector3(mousePos.x * 4.0, mousePos.y * 3.0, 0);

    let lineIdx = 0;
    const allowLines = progress >= 0.12;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const sX = sourceArr[i3];
      const sY = sourceArr[i3 + 1];
      const sZ = sourceArr[i3 + 2];

      const dX = destArr[i3];
      const dY = destArr[i3 + 1];
      const dZ = destArr[i3 + 2];

      let tx = sX + (dX - sX) * blend;
      let ty = sY + (dY - sY) * blend;
      let tz = sZ + (dZ - sZ) * blend;

      // Subtle turbulence when in chaos
      if (progress < 0.6) {
        ty += Math.sin(time * 1.5 + tx * 2) * (0.12 * (1 - progress));
        tx += Math.cos(time * 1.2 + ty * 2) * (0.08 * (1 - progress));
      }

      // Cursor interaction pull
      const dx = targetMouse3D.x - posArray[i3];
      const dy = targetMouse3D.y - posArray[i3 + 1];
      const dz = targetMouse3D.z - posArray[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 1.7) {
        const pull = (1.7 - dist) * 0.32;
        tx += dx * pull;
        ty += dy * pull;
        tz += dz * pull;

        colArray[i3] = 0.42;
        colArray[i3 + 1] = 0.55;
        colArray[i3 + 2] = 1.0;

        if (allowLines && lineIdx < maxLines && Math.random() > 0.65) {
          const l6 = lineIdx * 6;
          linePositions[l6] = posArray[i3];
          linePositions[l6 + 1] = posArray[i3 + 1];
          linePositions[l6 + 2] = posArray[i3 + 2];
          linePositions[l6 + 3] = targetMouse3D.x;
          linePositions[l6 + 4] = targetMouse3D.y;
          linePositions[l6 + 5] = targetMouse3D.z;

          const alpha = (1.7 - dist) / 1.7;
          lineColors[l6] = 0.42 * alpha;
          lineColors[l6 + 1] = 0.55 * alpha;
          lineColors[l6 + 2] = 1.0 * alpha;
          lineColors[l6 + 3] = 0.42 * alpha;
          lineColors[l6 + 4] = 0.55 * alpha;
          lineColors[l6 + 5] = 1.0 * alpha;
          lineIdx++;
        }
      } else {
        const targetColor = progress > 0.7 ? 0.42 : 0.92;
        colArray[i3] += (targetColor - colArray[i3]) * 0.08;
        colArray[i3 + 1] += ((progress > 0.7 ? 0.55 : 0.92) - colArray[i3 + 1]) * 0.08;
        colArray[i3 + 2] += (1.0 - colArray[i3 + 2]) * 0.08;
      }

      posArray[i3] += (tx - posArray[i3]) * lerpSpeed;
      posArray[i3 + 1] += (ty - posArray[i3 + 1]) * lerpSpeed;
      posArray[i3 + 2] += (tz - posArray[i3 + 2]) * lerpSpeed;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    const rotSpeed = Math.max(0, 1 - progress * 1.1);
    pointsRef.current.rotation.y += delta * 0.15 * rotSpeed + mousePos.x * 0.02;
    pointsRef.current.rotation.x = mousePos.y * 0.25 * rotSpeed;

    if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.046}
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

export const Hero3DScene: React.FC = () => {
  const [activeStage, setActiveStage] = useState<MetamorphosisStage>("chaos");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 750;
      const prog = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(prog);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleManualStageClick = (stage: MetamorphosisStage) => {
    sound.switch();
    setActiveStage(stage);
    if (stage === "chaos") setScrollProgress(0.1);
    else if (stage === "network") setScrollProgress(0.45);
    else if (stage === "architecture") setScrollProgress(0.72);
    else if (stage === "product") setScrollProgress(0.95);
  };

  const activeStageInfo = STAGES.find((s) => s.id === activeStage) || STAGES[0];

  return (
    <div
      className="relative w-full h-[480px] md:h-[580px] rounded-3xl border border-[#22262d] bg-[#101216]/70 backdrop-blur-md overflow-hidden cursor-crosshair group shadow-2xl"
      onPointerMove={handlePointerMove}
    >
      {/* Top Telemetry Overlay */}
      <div className="absolute top-5 left-5 z-10 font-mono text-[10px] text-[#8b9099] flex items-center gap-3">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6c8cff] animate-ping" />
          <span>TOPOLOGY EVOLUTION:</span>
          <span className="text-[#f2f2f0] font-black uppercase tracking-wider">{activeStageInfo.label}</span>
        </span>
        <span className="text-[#22262d]">|</span>
        <span className="hidden sm:inline text-[#8b9099]">{activeStageInfo.tagline}</span>
      </div>

      <div className="absolute top-5 right-5 z-10 font-mono text-[10px] text-[#6c8cff] bg-[#181b22] px-3 py-1.5 rounded-full border border-[#22262d] flex items-center gap-1.5 shadow-md">
        <span>SCROLL TO EVOLVE SHAPE</span>
        <span className="text-[#f2f2f0] font-bold">({Math.round(scrollProgress * 100)}%)</span>
      </div>

      {/* 3D Canvas (Pure Particle Topology) */}
      <Canvas camera={{ position: [0, 0, 5.0], fov: 48 }}>
        <ambientLight intensity={0.6} />

        {/* Morphing Quantum Particle Constellation */}
        <MetamorphosisMesh
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          onStageChange={setActiveStage}
        />
      </Canvas>

      {/* Signature Animated Evolution Step Bar */}
      <div className="absolute bottom-4 left-5 right-5 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] border-t border-[#22262d]/60 pt-3">
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {STAGES.map((s, idx) => {
            const isActive = activeStage === s.id;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => handleManualStageClick(s.id)}
                  className={`px-2.5 py-1 rounded-md transition-all font-bold tracking-wider ${
                    isActive
                      ? "bg-[#6c8cff] text-[#08090b] shadow-[0_0_15px_#6c8cff]"
                      : "text-[#8b9099] hover:text-[#f2f2f0] hover:bg-[#181b22]"
                  }`}
                >
                  {s.label}
                </button>
                {idx < STAGES.length - 1 && <span className="text-[#22262d] font-normal">&rarr;</span>}
              </React.Fragment>
            );
          })}
        </div>

        <span className="text-[#6c8cff] text-[10px] uppercase hidden md:inline">
          CHAOS &rarr; NETWORK &rarr; ARCHITECTURE &rarr; PRODUCT
        </span>
      </div>
    </div>
  );
};
