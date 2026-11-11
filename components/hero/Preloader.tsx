"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DESKTOP_FRAME_COUNT = 161;
const MOBILE_FRAME_COUNT = 100;
const MOBILE_BREAKPOINT = 768;
const SPARSE_STEP = 8;
const MAX_WAIT_MS = 2500;

type Phase = "loading" | "flash" | "curtain" | "done";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setPhase("done");
      onDone();
      return;
    }

    let cancelled = false;
    let finished = false;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const dir = isMobile ? "mobile" : "desktop";

    const indices: number[] = [];
    for (let i = 1; i <= frameCount; i += SPARSE_STEP) {
      indices.push(i);
    }
    const total = indices.length;
    let loaded = 0;

    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(maxTimer);
      setProgress(100);
      setPhase("flash");
      setTimeout(() => {
        if (cancelled) return;
        setPhase("curtain");
        setTimeout(() => {
          if (cancelled) return;
          setPhase("done");
          onDone();
        }, 700);
      }, 450);
    }

    const maxTimer = setTimeout(finish, MAX_WAIT_MS);

    function bump() {
      loaded++;
      setProgress((p) => Math.max(p, Math.min(99, Math.round((loaded / total) * 100))));
      if (loaded >= total) finish();
    }

    indices.forEach((i) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = `/frames/${dir}/f_${String(i).padStart(4, "0")}.webp`;
    });

    return () => {
      cancelled = true;
      clearTimeout(maxTimer);
    };
  }, [onDone]);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      role="status"
      aria-label="Carregando MODUX Creative"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-modux-black"
        animate={phase === "curtain" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <span className="translate-y-1/2 font-mono text-[16vw] font-bold leading-none text-modux-canvas tabular-nums md:text-[9vw]">
            {String(progress).padStart(3, "0")}
          </span>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-modux-black"
        animate={phase === "curtain" ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      {phase === "flash" && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.45, times: [0, 0.35, 1] }}
            className="absolute inset-0 bg-modux-lime"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center font-mono text-sm uppercase tracking-[0.3em] text-modux-black"
          >
            Make value visible.
          </motion.p>
        </>
      )}
    </div>
  );
}
