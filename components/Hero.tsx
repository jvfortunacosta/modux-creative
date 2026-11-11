"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import PillButton from "./ui/PillButton";
import ModuxGlassHero from "./hero/ModuxGlassHero";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-modux-black py-section md:py-section-lg"
    >
      <ModuxGlassHero sectionRef={sectionRef} titleRef={titleRef} />

      <Container className="relative z-10 flex h-full items-center">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow theme="dark">
              <span className="-mx-6 flex overflow-x-auto px-6 text-[10px] tracking-[0.1em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0 md:text-eyebrow md:tracking-[0.18em]">
                {["Estratégia", "Identidade", "Sites", "Comunicação"].map(
                  (term, i) => (
                    <span
                      key={term}
                      className="flex shrink-0 items-center whitespace-nowrap"
                    >
                      {i > 0 && (
                        <span
                          aria-hidden="true"
                          className="mx-2 h-3 w-px shrink-0 bg-modux-canvas/25 md:mx-3"
                        />
                      )}
                      {term}
                    </span>
                  )
                )}
              </span>
            </Eyebrow>
          </motion.div>

          <motion.h1
            ref={titleRef}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-h1 text-modux-canvas text-balance"
          >
            Marca boa não enfeita competência. Faz o mercado{" "}
            <span className="underline decoration-modux-lime decoration-[6px] underline-offset-[6px]">
              perceber
            </span>{" "}
            que ela já existe.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-body text-modux-canvas/70"
          >
            A MODUX não vende aparência nova. Corrige a distância entre o
            valor que a sua empresa já entrega e o valor que o mercado
            consegue perceber. Sua empresa já ficou maior do que a imagem
            que transmite. A gente sabe como corrigir essa distância.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <PillButton href="#contato" variant="lime">
              Fale com a MODUX
            </PillButton>
            <PillButton href="#atuacao" variant="outline-dark" showArrow={false}>
              Ver áreas de atuação
            </PillButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
