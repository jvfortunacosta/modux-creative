"use client";

import { useEffect, useRef } from "react";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import AngleGraphic from "./ui/AngleGraphic";

const SENTENCE =
  "A MODUX não vende aparência nova. Corrige a distância entre o valor que a empresa já entrega e o valor que o mercado consegue perceber.";

function tokenize(sentence: string) {
  return sentence.split(" ").map((word, i) => ({ word, key: `${i}-${word}` }));
}

const WORDS = tokenize(SENTENCE);

export default function Positioning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let scrollTriggerInstance: { kill: () => void } | undefined;

    import("@/lib/smooth-scroll").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      gsap.set(words, { color: "rgba(22, 23, 22, 0.22)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.4,
        },
      });

      tl.to(words, { color: "#161716", stagger: 0.04, ease: "none" }, 0);

      if (underlineRef.current) {
        tl.fromTo(
          underlineRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0.5
        ).to(underlineRef.current, { letterSpacing: "0.3em", ease: "none" }, 0.55);
      }

      scrollTriggerInstance = tl.scrollTrigger;
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      scrollTriggerInstance?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-modux-canvas py-section md:py-section-lg"
    >
      <AngleGraphic theme="light" />
      <Container className="relative">
        <Reveal>
          <Eyebrow theme="light">Posicionamento</Eyebrow>
        </Reveal>

        <p className="mt-8 max-w-4xl text-h1 text-modux-black text-balance">
          {WORDS.map(({ word, key }, i) => {
            const clean = word.replace(/[.,]/g, "");
            if (clean === "distância") {
              return (
                <span key={key} className="relative mr-[0.3em] inline-block">
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                  >
                    {word}
                  </span>
                  <span
                    ref={underlineRef}
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-modux-lime"
                  />
                </span>
              );
            }
            return (
              <span
                key={key}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </span>
            );
          })}
        </p>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl text-body text-modux-graphite">
            Sua empresa já ficou maior do que a imagem que transmite. A gente
            sabe como corrigir essa distância.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
