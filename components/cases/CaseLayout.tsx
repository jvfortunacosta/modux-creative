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
import CaseVideoIntro from "./CaseVideoIntro";
import GalleryMarquee from "./GalleryMarquee";

export type CaseImage = { src: string; alt: string };

export type CaseSection = {
  heading: string;
  body: string[];
  image: CaseImage;
};

export type BrandBlock =
  | { type: "pair"; images: [CaseImage, CaseImage] }
  | { type: "quad"; images: [CaseImage, CaseImage, CaseImage, CaseImage] }
  | { type: "video"; src: string; poster?: string };

export type CaseLayoutProps = {
  client: string;
  sector: string;
  videoSrc: string;
  videoPoster?: string;
  intro: { eyebrow: string; heading: string; body: string };
  sections: CaseSection[];
  gallery: CaseImage[];
  credits: string;
  /**
   * Piloto do novo template (Casa Martinho): o vídeo de abertura não some
   * ao terminar, vira o fundo contínuo do hero. Antes dos blocos de
   * imagem+texto de sempre, entra uma vitrine de marca (brandBlocks).
   */
  heroVideoBackground?: boolean;
  brandBlocks?: BrandBlock[];
};

function BrandBlockItem({ block }: { block: BrandBlock }) {
  if (block.type === "video") {
    return (
      <Reveal>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl md:aspect-[21/9]">
          <video
            src={block.src}
            poster={block.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>
    );
  }

  const cols = block.type === "pair" ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4";
  const aspect = block.type === "pair" ? "aspect-[4/5]" : "aspect-square";

  return (
    <div className={`grid ${cols} gap-4 md:gap-6`}>
      {block.images.map((image, i) => (
        <Reveal key={image.src} delay={0.06 * i}>
          <div className={`relative ${aspect} overflow-hidden rounded-2xl`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                block.type === "pair"
                  ? "(min-width: 768px) 40vw, 50vw"
                  : "(min-width: 768px) 20vw, 50vw"
              }
              className="object-cover"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CaseBody({
  sections,
  gallery,
  credits,
}: {
  sections: CaseSection[];
  gallery: CaseImage[];
  credits: string;
}) {
  return (
    <>
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
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
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
            <GalleryMarquee images={gallery} />
          </div>
        </section>
      )}

      <section className="border-t border-modux-graphite/10 bg-modux-canvas py-10">
        <Container>
          <Link
            href="/#cases"
            className="text-sm font-medium text-modux-graphite transition-colors hover:text-modux-black"
          >
            ← Ver outros cases
          </Link>
        </Container>
      </section>

      <CtaBanner />
      <Footer />

      <p className="sr-only">{credits}</p>
    </>
  );
}

/**
 * Modelo-base para páginas de case. Cada cliente novo só precisa fornecer
 * os dados (vídeo, textos, imagens); a estrutura e o comportamento
 * (vídeo cheio -> conteúdo) são compartilhados.
 */
export default function CaseLayout({
  client,
  sector,
  videoSrc,
  videoPoster,
  intro,
  sections,
  gallery,
  credits,
  heroVideoBackground = false,
  brandBlocks,
}: CaseLayoutProps) {
  const [revealed, setRevealed] = useState(false);

  // O conteúdo principal nunca é desmontado/remontado condicionalmente; só
  // sua opacidade muda. Se ele fosse removido do DOM, qualquer instante em
  // que a página ficasse com altura zero forçaria o navegador a resetar o
  // scroll para o topo, indistinguível de um "pulo" espontâneo.
  useEffect(() => {
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed]);

  if (heroVideoBackground) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: revealed ? "auto" : "none" }}
          aria-hidden={!revealed}
        >
          <Header />
        </motion.div>

        <section className="relative min-h-screen overflow-hidden bg-modux-black">
          <CaseVideoIntro
            src={videoSrc}
            poster={videoPoster}
            onFinished={() => setRevealed(true)}
            persistAsBackground
          />

          <Container className="relative z-10 flex min-h-screen items-end pb-16 pt-32 md:items-center md:pb-24 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ pointerEvents: revealed ? "auto" : "none" }}
            >
              <Eyebrow theme="dark">
                <span className="text-[10px] tracking-[0.1em] md:text-eyebrow md:tracking-[0.18em]">
                  Case · {client} · {sector}
                </span>
              </Eyebrow>
              <h1 className="mt-4 max-w-3xl text-h1 text-modux-canvas text-balance">
                {intro.heading}
              </h1>
              <p className="mt-8 max-w-xl text-body text-modux-canvas/80">
                {intro.body}
              </p>
            </motion.div>
          </Container>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: revealed ? "auto" : "none" }}
          aria-hidden={!revealed}
        >
          {brandBlocks && brandBlocks.length > 0 && (
            <section className="bg-modux-canvas py-section md:py-section-lg">
              <Container>
                <div className="flex flex-col gap-10 md:gap-14">
                  {brandBlocks.map((block, i) => (
                    <BrandBlockItem key={i} block={block} />
                  ))}
                </div>
              </Container>
            </section>
          )}

          <CaseBody sections={sections} gallery={gallery} credits={credits} />
        </motion.div>
      </>
    );
  }

  return (
    <>
      <CaseVideoIntro
        src={videoSrc}
        poster={videoPoster}
        onFinished={() => setRevealed(true)}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: revealed ? "auto" : "none" }}
        aria-hidden={!revealed}
      >
        <Header />

        <section className="bg-modux-canvas py-section md:py-section-lg">
          <Container>
            <Reveal>
              <Eyebrow>
                <span className="-mx-6 flex overflow-x-auto whitespace-nowrap px-6 text-[10px] tracking-[0.1em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0 md:text-eyebrow md:tracking-[0.18em]">
                  Case · {client} · {sector}
                </span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 max-w-3xl text-h1 text-modux-black text-balance">
                {intro.heading}
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-xl text-body text-modux-graphite">
                {intro.body}
              </p>
            </Reveal>
          </Container>
        </section>

        <CaseBody sections={sections} gallery={gallery} credits={credits} />
      </motion.main>
    </>
  );
}
