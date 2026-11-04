"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import CtaBanner from "../CtaBanner";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import PillButton from "../ui/PillButton";
import GalleryMarquee from "../cases/GalleryMarquee";
import CaseVideoIntro from "../cases/CaseVideoIntro";

export type SiteImage = { src: string; alt: string };

export type SiteSection = {
  heading: string;
  body: string[];
  image: SiteImage;
};

export type SiteLayoutProps = {
  client: string;
  sector: string;
  liveUrl: string;
  heroImage: SiteImage;
  stack: string[];
  intro: { heading: string; body: string };
  sections: SiteSection[];
  gallery: SiteImage[];
  credits: string;
  /** Opcional: vídeo de abertura em tela cheia, mesmo padrão dos cases de
   * marca. Sites futuros no portfólio podem não ter um vídeo pronto. */
  videoSrc?: string;
  videoPoster?: string;
  videoPlaybackRate?: number;
};

/**
 * Modelo-base para páginas de portfólio de sites. Igual ao CaseLayout, o
 * <main> fica sempre montado (só a opacidade muda) para nunca colapsar a
 * altura da página e resetar o scroll.
 */
export default function SiteLayout({
  client,
  sector,
  liveUrl,
  heroImage,
  stack,
  intro,
  sections,
  gallery,
  credits,
  videoSrc,
  videoPoster,
  videoPlaybackRate,
}: SiteLayoutProps) {
  const [revealed, setRevealed] = useState(!videoSrc);

  useEffect(() => {
    if (!videoSrc) return;
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed, videoSrc]);

  return (
    <>
      {videoSrc && (
        <CaseVideoIntro
          src={videoSrc}
          poster={videoPoster}
          playbackRate={videoPlaybackRate}
          onFinished={() => setRevealed(true)}
        />
      )}

      <motion.main
        initial={{ opacity: videoSrc ? 0 : 1 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: revealed ? "auto" : "none" }}
        aria-hidden={!revealed}
      >
        <Header />

        <section className="bg-modux-canvas py-section md:py-section-lg">
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <Reveal>
                  <Eyebrow>
                    Sites · {client} · {sector}
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h1 className="mt-4 text-h1 text-modux-black text-balance">
                    {intro.heading}
                  </h1>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-6 text-body text-modux-graphite">
                    {intro.body}
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-modux-graphite/20 px-3 py-1 text-xs font-medium text-modux-graphite"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.26}>
                  <div className="mt-8">
                    <PillButton href={liveUrl} variant="primary" external>
                      Acessar o site
                    </PillButton>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-modux-graphite/15">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {sections.map((section, i) => (
          <section
            key={section.heading}
            className="border-t border-modux-graphite/10 bg-modux-canvas py-section md:py-section-lg"
          >
            <Container>
              <div
                className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-modux-graphite/15">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="text-h2 text-modux-black text-balance">
                    {section.heading}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-body text-modux-graphite">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        ))}

        {gallery.length > 0 && (
          <section
            className="overflow-hidden border-t border-modux-graphite/10 bg-modux-canvas py-section md:py-section-lg"
            style={{ overflowAnchor: "none" }}
          >
            <Container>
              <Reveal>
                <Eyebrow>Galeria</Eyebrow>
              </Reveal>
            </Container>
            <div className="mt-10 md:mt-12">
              <GalleryMarquee
                images={gallery}
                aspectClassName="aspect-[16/10]"
                cardWidthClassName="w-[280px] md:w-[420px]"
              />
            </div>
          </section>
        )}

        <section className="border-t border-modux-graphite/10 bg-modux-canvas py-10">
          <Container>
            <Link
              href="/#sites"
              className="text-sm font-medium text-modux-graphite transition-colors hover:text-modux-black"
            >
              ← Ver outros sites
            </Link>
          </Container>
        </section>

        <CtaBanner />
        <Footer />

        <p className="sr-only">{credits}</p>
      </motion.main>
    </>
  );
}
