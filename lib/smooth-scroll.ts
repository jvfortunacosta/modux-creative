"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

/**
 * Lenis (scroll suave) + GSAP ScrollTrigger. Respeita prefers-reduced-motion:
 * nesse caso o scroll fica nativo (sem Lenis), e quem usa isso para medir
 * progresso deve tratar `null`. Suporta start/destroy repetidos (Fast
 * Refresh, Strict Mode) sem acumular listeners.
 */
export function startSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  lenis?.destroy();
  lenis = null;
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function getLenis() {
  return lenis;
}

export { gsap, ScrollTrigger };
