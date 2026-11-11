"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./ui/Container";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

const PROJECTS = [
  {
    slug: "goias-fa",
    name: "Goiás F.A.",
    sector: "Futebol Americano",
    image: "/sites/goias-fa/home.jpg",
  },
  {
    slug: "aurora",
    name: "Aurora's Cleaning",
    sector: "Limpeza residencial",
    image: "/sites/aurora/hero.jpg",
  },
  {
    slug: "gusia",
    name: "GUS IA",
    sector: "Branding & Direção Criativa",
    image: "/sites/gusia/hero.jpg",
  },
  {
    slug: "piriextra",
    name: "piriExtra",
    sector: "Marketplace de diárias",
    image: "/sites/piriextra/hero.jpg",
  },
  {
    slug: "placar",
    name: "Placar",
    sector: "SaaS · Gestão comercial",
    image: "/sites/placar/hero.jpg",
  },
];

export default function Sites() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <section id="sites" className="relative bg-modux-canvas py-section md:py-section-lg">
      <Container>
        <Reveal>
          <Eyebrow>Sites</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl text-h2 text-modux-black text-balance">
            Sistemas que rodam sozinhos, não só páginas bonitas.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-body text-modux-graphite">
            MODUX Sites entrega presença digital que já nasce funcional: loja,
            formulário, painel de gestão. O cliente publica sozinho, sem
            depender de desenvolvedor.
          </p>
        </Reveal>

        {/* Desktop: lista com preview seguindo o cursor */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setHovered(null)}
          className="relative mt-14 hidden border-t border-modux-graphite/15 md:block"
        >
          {PROJECTS.map((project, i) => (
            <Link
              key={project.slug}
              href={`/sites/${project.slug}`}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="group relative flex min-h-[44px] items-center justify-between border-b border-modux-graphite/15 py-8 transition-colors duration-300"
            >
              <span className="flex items-baseline gap-6">
                <span className="font-mono text-sm text-modux-graphite/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-h2 font-bold text-modux-black transition-colors duration-300 group-hover:text-modux-graphite">
                  {project.name}
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-modux-graphite/60">
                {project.sector}
              </span>
            </Link>
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 h-48 w-72 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-200"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -130%)",
              opacity: hovered !== null ? 1 : 0,
            }}
          >
            {hovered !== null && (
              <Image
                src={PROJECTS[hovered].image}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Mobile: grid de cards simples, sem preview por cursor */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={0.08 * i}>
              <Link
                href={`/sites/${project.slug}`}
                className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[4/5]"
              >
                <Image
                  src={project.image}
                  alt={`Site ${project.name}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-modux-black via-modux-black/55 to-modux-black/10" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
                  <span className="inline-flex items-center rounded-full border border-modux-canvas/25 bg-modux-black/30 px-4 py-2 text-eyebrow font-bold uppercase tracking-widest text-modux-canvas backdrop-blur-sm">
                    {project.sector}
                  </span>
                  <span className="font-mono text-xs text-modux-canvas/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative p-6">
                  <h3 className="text-4xl font-extrabold leading-[0.95] text-modux-canvas text-balance">
                    {project.name}
                  </h3>
                  <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-modux-canvas/30 bg-modux-black/30 px-5 text-sm font-semibold text-modux-canvas backdrop-blur-sm">
                    Ver site
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
