"use client";

import { useEffect } from "react";
import { startSmoothScroll, destroySmoothScroll } from "@/lib/smooth-scroll";

/**
 * Liga o Lenis (scroll suave) + GSAP ScrollTrigger uma vez, para a página
 * inteira. Não renderiza nada; só o efeito colateral do scroll.
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    startSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return null;
}
