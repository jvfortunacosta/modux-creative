"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Brilho que segue o cursor pela página inteira (fixed ao viewport, não
 * preso a uma seção), acento em Signal Lime, cirúrgico, nunca um fundo
 * sólido extenso.
 */
export default function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);

  const springX = useSpring(x, { damping: 26, stiffness: 170, mass: 0.4 });
  const springY = useSpring(y, { damping: 26, stiffness: 170, mass: 0.4 });
  const springOpacity = useSpring(opacity, { damping: 20, stiffness: 120 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    }
    function handleLeave() {
      opacity.set(0);
    }

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y, opacity]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ left: springX, top: springY, opacity: springOpacity }}
      className="pointer-events-none fixed z-40 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-modux-lime/40 blur-3xl"
    />
  );
}
