"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

const CLIENTS = [
  {
    slug: "biomaxx",
    name: "Biomaxx",
    sector: "Indústria química",
    image: "/cases/biomaxx/conceito-aereo.jpg",
  },
  {
    slug: "di-amalfi",
    name: "Di Amalfi",
    sector: "Fragrâncias para casa",
    image: "/cases/di-amalfi/lavanda-campo.jpg",
  },
  {
    slug: "norxx",
    name: "Nørxx",
    sector: "Automotivo · Detailing",
    image: "/cases/norxx/aplicacao-carro.jpg",
  },
  {
    slug: "casa-martinho",
    name: "Casa Martinho",
    sector: "Panificadora artesanal",
    image: "/cases/casa-martinho/fachada-placa.jpg",
  },
];

export default function Cases() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let cancelled = false;
    let st: { kill: () => void } | undefined;

    import("@/lib/smooth-scroll").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const count = CLIENTS.length;

      const update = (progress: number) => {
        const vw = window.innerWidth;
        gsap.set(track, { x: -progress * (count - 1) * vw });
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          const local = Math.max(0, Math.min(1, progress * count - i));
          const reveal = panel.querySelector("[data-reveal]");
          if (reveal) {
            gsap.set(reveal, {
              clipPath: `inset(0% 0% 0% ${(1 - local) * 100}%)`,
            });
          }
        });
      };

      update(0);

      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => update(self.progress),
      });

      const onResize = () => update((st as unknown as { progress: number }).progress ?? 0);
      window.addEventListener("resize", onResize);
      ScrollTrigger.refresh();

      return () => window.removeEventListener("resize", onResize);
    });

    return () => {
      cancelled = true;
      st?.kill();
    };
  }, []);

  return (
    <section id="cases" className="relative bg-modux-black">
      <Container className="pb-10 pt-section md:pt-section-lg">
        <Reveal>
          <Eyebrow theme="dark">Cases</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl text-h2 text-modux-canvas text-balance">
            Resultado documentado, não prometido.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-body text-modux-canvas/60">
            Os primeiros cases da MODUX estão em produção. Aqui vai entrar
            prova real: antes/depois, números, contexto. Sem enfeite.
          </p>
        </Reveal>
      </Container>

      {/* Desktop/tablet: galeria horizontal pinada */}
      <div
        ref={wrapperRef}
        className="relative hidden md:block"
        style={{ height: `${CLIENTS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={trackRef} className="flex h-full" style={{ width: `${CLIENTS.length * 100}vw` }}>
            {CLIENTS.map((client, i) => (
              <div
                key={client.slug}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="relative h-full w-screen shrink-0"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[4vw] left-[3vw] select-none text-[30vw] font-black leading-none text-modux-canvas/[0.04]"
                >
                  0{i + 1}
                </span>

                <Link
                  href={`/cases/${client.slug}`}
                  className="group absolute inset-0 flex flex-col justify-end"
                >
                  <div data-reveal className="absolute inset-0">
                    <Image
                      src={client.image}
                      alt={`Case ${client.name}`}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-700 ease-modux group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-modux-black via-modux-black/50 to-modux-black/10" />
                  </div>

                  <div className="relative flex items-center justify-between px-10 pt-10 md:px-16">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-modux-canvas/70">
                      {client.sector}
                    </span>
                    <span className="font-mono text-xs text-modux-canvas/40">
                      {String(i + 1).padStart(2, "0")}/{String(CLIENTS.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative px-10 pb-16 md:px-16">
                    <h3 className="text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] text-modux-canvas text-balance">
                      {client.name}
                    </h3>
                    <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-modux-canvas/30 bg-modux-black/30 px-5 text-sm font-semibold text-modux-canvas backdrop-blur-sm transition-colors duration-300 ease-modux group-hover:border-modux-lime group-hover:bg-modux-lime group-hover:text-modux-black">
                      Ver case
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform duration-300 ease-modux group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 8h11.5M9 3.5 13.5 8 9 12.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: lista empilhada simples, sem pin nem scrub */}
      <div className="grid gap-6 px-6 pb-section md:hidden">
        {CLIENTS.map((client, i) => (
          <Link
            key={client.slug}
            href={`/cases/${client.slug}`}
            className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl"
          >
            <Image
              src={client.image}
              alt={`Case ${client.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-modux-black via-modux-black/55 to-modux-black/10" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
              <span className="inline-flex items-center rounded-full border border-modux-canvas/25 bg-modux-black/30 px-4 py-2 text-eyebrow font-bold uppercase tracking-widest text-modux-canvas backdrop-blur-sm">
                {client.sector}
              </span>
              <span className="font-mono text-xs text-modux-canvas/40">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="relative p-6">
              <h3 className="text-4xl font-extrabold leading-[0.95] text-modux-canvas text-balance">
                {client.name}
              </h3>
              <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-modux-canvas/30 bg-modux-black/30 px-5 text-sm font-semibold text-modux-canvas backdrop-blur-sm">
                Ver case
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
