"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Brilho que segue o cursor pela página inteira (fixed ao viewport, não
 * preso a uma seção), acento em Signal Lime, cirúrgico, nunca um fundo
 * sólido extenso. Em dispositivos com mouse fino, também substitui o
 * cursor do sistema por um ponto com mix-blend-mode: difference.
 */
export default function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);
  const [fine, setFine] = useState(false);

  const springX = useSpring(x, { damping: 26, stiffness: 170, mass: 0.4 });
  const springY = useSpring(y, { damping: 26, stiffness: 170, mass: 0.4 });
  const springOpacity = useSpring(opacity, { damping: 20, stiffness: 120 });

  const dotX = useSpring(x, { damping: 30, stiffness: 500, mass: 0.2 });
  const dotY = useSpring(y, { damping: 30, stiffness: 500, mass: 0.2 });

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);

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

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("custom-cursor");
    return () => {
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [fine]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ left: springX, top: springY, opacity: springOpacity }}
        className="pointer-events-none fixed z-40 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-modux-lime/40 blur-3xl"
      />
      {fine && (
        <motion.div
          aria-hidden="true"
          style={{ left: dotX, top: dotY, opacity: springOpacity }}
          className="pointer-events-none fixed z-[95] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        />
      )}
    </>
  );
}
