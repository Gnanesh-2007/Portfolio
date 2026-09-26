"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useAppStore } from "@/lib/store";

export const CustomCursor: React.FC = () => {
  const { cursorVariant, cursorText } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  const getVariantStyles = () => {
    switch (cursorVariant) {
      case "view":
        return {
          width: 80,
          height: 80,
          backgroundColor: "#6c8cff",
          borderColor: "#6c8cff",
          color: "#08090b",
          scale: 1,
        };
      case "drag":
        return {
          width: 70,
          height: 70,
          backgroundColor: "#f2f2f0",
          borderColor: "#f2f2f0",
          color: "#08090b",
          scale: 1,
        };
      case "link":
        return {
          width: 48,
          height: 48,
          backgroundColor: "rgba(108, 140, 255, 0.2)",
          borderColor: "#6c8cff",
          color: "#ffffff",
          scale: 1.1,
        };
      case "code":
        return {
          width: 75,
          height: 75,
          backgroundColor: "#181b22",
          borderColor: "#3e5cc9",
          color: "#6c8cff",
          scale: 1,
        };
      case "target":
        return {
          width: 36,
          height: 36,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: "#10b981",
          color: "#10b981",
          scale: 1.3,
        };
      case "hidden":
        return {
          width: 0,
          height: 0,
          opacity: 0,
        };
      default:
        return {
          width: 14,
          height: 14,
          backgroundColor: "#f2f2f0",
          borderColor: "rgba(242, 242, 240, 0)",
          color: "rgba(0, 0, 0, 0)",
          scale: 1,
        };
    }
  };

  const currentStyles = getVariantStyles();

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 4,
          height: 4,
          backgroundColor: "#ffffff",
        }}
      />

      {/* Main Interactive Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center font-mono font-bold text-[10px] tracking-wider uppercase border select-none transition-colors duration-200 hidden md:flex"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={currentStyles}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {cursorText || (cursorVariant === "view" ? "VIEW" : cursorVariant === "drag" ? "DRAG" : cursorVariant === "link" ? "↗" : "")}
      </motion.div>
    </>
  );
};
