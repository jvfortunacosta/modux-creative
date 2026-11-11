"use client";

import { useEffect, useRef } from "react";
import Container from "./ui/Container";

const PILLARS = [
  {
    word: "Palpável",
    description:
      "Estratégia que vira presença, sistema e resultado. Não fica só no slide.",
  },
  {
    word: "Acessível",
    description:
      "Clareza para conversar com empresas de todos os tamanhos, sem empobrecer o pensamento.",
  },
  {
    word: "Competente",
    description:
      "Confiança sustentada por repertório, processo e execução. Não por promessa.",
  },
  {
    word: "Moderna",
    description:
      "Tecnologia com critério. A gente usa o que funciona, não o que está na moda.",
  },
];

export default function Pillars() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const triggers: { kill: () => void }[] = [];

    import("@/lib/smooth-scroll").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      cardRefs.current.forEach((card, i) => {
        if (!card || i === PILLARS.length - 1) return;
        const scrim = card.querySelector("[data-scrim]");
        const inner = card.querySelector("[data-inner]");

        const st = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(scrim, { opacity: self.progress * 0.55 });
            gsap.set(inner, { scale: 1 - self.progress * 0.08 });
          },
        });
        triggers.push(st);
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="pilares" className="relative bg-modux-canvas">
      {PILLARS.map((pillar, i) => (
        <div
          key={pillar.word}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="sticky top-20 flex h-[calc(100vh-5rem)] items-center overflow-hidden border-t border-modux-graphite/10 bg-modux-canvas md:top-24 md:h-[calc(100vh-6rem)]"
          style={{ zIndex: i + 1 }}
        >
          <div data-inner className="w-full">
            <Container>
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-modux-graphite">
                Pilar 0{i + 1}
              </span>
              <h3 className="mt-4 text-[clamp(2.75rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-modux-black">
                {pillar.word}
              </h3>
              <p className="mt-6 max-w-xl text-body text-modux-graphite">
                {pillar.description}
              </p>
            </Container>
          </div>
          <div
            data-scrim
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-modux-black opacity-0"
          />
        </div>
      ))}
    </section>
  );
}
