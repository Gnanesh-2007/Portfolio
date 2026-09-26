"use client";

import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const GnaneshHero3DView: React.FC = () => {
  // Smooth 3D mouse tilt on portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
    >
      {/* Motion Portrait with Zero Box / Zero Text Clutter */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full max-w-[480px] max-h-[700px] flex items-center justify-center"
      >
        <Image
          src="/images/gnanesh-portrait.png"
          alt="Gnanesh Reddy Maram"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center drop-shadow-[0_20px_50px_rgba(108,140,255,0.15)] transition-transform duration-300"
        />
      </motion.div>
    </div>
  );
};
