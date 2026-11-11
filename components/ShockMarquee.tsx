"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/smooth-scroll";

const LABEL = "ESTRATÉGIA ✕ IDENTIDADE ✕ SITES ✕ COMUNICAÇÃO ✕ ";

function MarqueeTrack({
  direction,
  baseSpeed,
  className,
}: {
  direction: 1 | -1;
  baseSpeed: number;
  className: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let x = 0;
    let last = performance.now();
    let raf = 0;

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const track = trackRef.current;
      if (track) {
        const velocity = getLenis()?.velocity ?? 0;
        const boost = Math.min(Math.abs(velocity) * 1.6, 70);
        const speed = (baseSpeed + boost) * direction;
        x -= speed * dt;
        const wrap = track.scrollWidth / 2 || 1;
        x = ((x % wrap) + wrap) % wrap;
        const skew = Math.max(-12, Math.min(12, -velocity * 0.6 * direction));
        track.style.transform = `translateX(${-x}px) skewX(${skew}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [direction, baseSpeed]);

  return (
    <div
      ref={trackRef}
      className={`flex w-max whitespace-nowrap will-change-transform ${className}`}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="shrink-0 px-4">
          {LABEL}
        </span>
      ))}
    </div>
  );
}

/**
 * Faixa de choque logo após o hero: duas tiras de texto em loop, velocidade
 * e inclinação reagindo à velocidade real do scroll (via Lenis).
 */
export default function ShockMarquee() {
  return (
    <section
      className="relative overflow-hidden bg-modux-black py-20 md:py-28"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden bg-modux-lime py-5 md:py-7">
        <MarqueeTrack
          direction={-1}
          baseSpeed={70}
          className="text-4xl font-extrabold uppercase leading-none tracking-tight text-modux-black md:text-6xl"
        />
      </div>
      <div className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 -rotate-3 overflow-hidden bg-modux-black py-5 md:py-7">
        <MarqueeTrack
          direction={1}
          baseSpeed={70}
          className="text-4xl font-extrabold uppercase leading-none tracking-tight text-modux-lime md:text-6xl"
        />
      </div>
    </section>
  );
}
