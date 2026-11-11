"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import PillButton from "../ui/PillButton";
import Magnetic from "../ui/Magnetic";
import { gsap, ScrollTrigger } from "@/lib/smooth-scroll";

const DESKTOP_FRAME_COUNT = 161;
const MOBILE_FRAME_COUNT = 100;
const BREAK_PROGRESS = 0.29;
const MOBILE_BREAKPOINT = 768;

function frameUrl(mobile: boolean, i: number) {
  return `/frames/${mobile ? "mobile" : "desktop"}/f_${String(i).padStart(4, "0")}.webp`;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function mapRange(v: number, a: number, b: number) {
  return clamp01((v - a) / (b - a));
}

type CharToken = { char: string; word: number };

function tokenize(text: string): CharToken[] {
  let word = 0;
  const tokens: CharToken[] = [];
  for (const char of text) {
    tokens.push({ char, word });
    if (char === " ") word++;
  }
  return tokens;
}

const LINE_1 = tokenize("Marca boa não enfeita competência.");
const LINE_2_PRE = "Faz o mercado ";
const LINE_2_WORD = "perceber";
const LINE_3 = "que ela já existe.";

function CharSpans({
  tokens,
  getRef,
}: {
  tokens: CharToken[];
  getRef: (el: HTMLSpanElement | null, i: number) => void;
}) {
  // Cada caractere precisa ser um span próprio (pra poder voar separado na
  // quebra), mas sem agrupar por palavra o navegador quebra a linha entre
  // quaisquer dois spans, inclusive no meio de uma palavra. Agrupando os
  // spans de cada palavra num wrapper nowrap, a quebra só acontece onde
  // deveria: entre palavras.
  const words: { word: number; items: { t: CharToken; i: number }[] }[] = [];
  tokens.forEach((t, i) => {
    const last = words[words.length - 1];
    if (last && last.word === t.word) {
      last.items.push({ t, i });
    } else {
      words.push({ word: t.word, items: [{ t, i }] });
    }
  });

  return (
    <>
      {words.map((w) => (
        <span key={w.word} className="inline-block whitespace-nowrap">
          {w.items.map(({ t, i }) => (
            <span
              key={i}
              ref={(el) => getRef(el, i)}
              className="inline-block whitespace-pre opacity-0"
            >
              {t.char}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function FrameSequenceHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const line1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const hudFrameRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const hudScrollRef = useRef<HTMLSpanElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(rm);
    if (rm) return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;

    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !stage || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Carregamento progressivo dos frames ──────────────────────────────
    const images: HTMLImageElement[] = new Array(frameCount);
    let targetIndex = 0;
    function loadFrame(i: number) {
      if (images[i]) return;
      const img = new Image();
      img.onload = () => {
        // Sem isso, se nenhum scroll acontecer depois que a imagem termina
        // de carregar, o quadro fica preto até o primeiro onUpdate.
        drawFrame(targetIndex);
      };
      img.src = frameUrl(isMobile, i + 1);
      images[i] = img;
    }
    for (let i = 0; i < frameCount; i += 8) loadFrame(i);
    const requestIdle = (
      window as unknown as {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number }
        ) => number;
      }
    ).requestIdleCallback;
    const cancelIdle = (
      window as unknown as { cancelIdleCallback?: (id: number) => void }
    ).cancelIdleCallback;
    const loadRest = () => {
      for (let i = 0; i < frameCount; i++) loadFrame(i);
    };
    const idleId = requestIdle
      ? requestIdle(loadRest, { timeout: 2000 })
      : window.setTimeout(loadRest, 300);

    function nearestLoaded(target: number): number | null {
      if (images[target]?.complete) return target;
      for (let d = 1; d < frameCount; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && images[lo]?.complete) return lo;
        if (hi < frameCount && images[hi]?.complete) return hi;
      }
      return null;
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resizeCanvas() {
      const rect = stage!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
    }
    resizeCanvas();

    let lastDrawn = -1;
    function drawFrame(index: number) {
      const real = nearestLoaded(index);
      if (real === null || real === lastDrawn) return;
      const img = images[real];
      lastDrawn = real;
      const cw = canvas!.width;
      const ch = canvas!.height;
      const canvasRatio = cw / ch;
      const imgRatio = img.width / img.height;
      let sx: number, sy: number, sw: number, sh: number;
      if (imgRatio > canvasRatio) {
        sh = img.height;
        sw = sh * canvasRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      if (hudFrameRef.current) {
        hudFrameRef.current.textContent = `${String(real + 1).padStart(3, "0")}/${frameCount}`;
      }
    }
    drawFrame(0);

    // ── Texto: helpers ───────────────────────────────────────────────────

    function setLine1Progress(p: number) {
      // Depois da quebra, quem controla opacidade/transform é o
      // timeline de estilhaço (triggerBreak/resetBreak); se o reveal
      // contínuo continuasse rodando aqui, ia forçar opacity:1 de novo
      // em cima do efeito.
      if (p >= BREAK_PROGRESS) return;
      const local = mapRange(p, 0, 0.25);
      const words = LINE_1[LINE_1.length - 1].word + 1;
      const visible = local * words;
      line1Refs.current.forEach((el, i) => {
        if (!el) return;
        const w = LINE_1[i].word;
        const o = clamp01((visible - w) * 3);
        el.style.opacity = String(o);
      });
    }

    function setLine2Progress(p: number) {
      const el = line2Ref.current;
      if (!el) return;
      const fadeIn = mapRange(p, 0.3, 0.38);
      const fadeOut = 1 - mapRange(p, 0.62, 0.7);
      const o = Math.min(fadeIn, fadeOut);
      el.style.opacity = String(o);
      el.style.transform = `translateY(${(1 - fadeIn) * 24}px)`;
    }

    function setLine3Progress(p: number) {
      const el = line3Ref.current;
      const after = afterRef.current;
      if (!el || !after) return;
      const local = mapRange(p, 0.72, 1);
      el.style.opacity = String(mapRange(p, 0.72, 0.85));
      const scale = 1 + local * 0.35;
      el.style.transform = `scale(${scale})`;
      const afterLocal = mapRange(p, 0.9, 1);
      after.style.opacity = String(afterLocal);
      after.style.transform = `translateY(${(1 - afterLocal) * 16}px)`;
      after.style.pointerEvents = afterLocal > 0.6 ? "auto" : "none";
    }

    function setHud(p: number) {
      if (hudBarRef.current) hudBarRef.current.style.width = `${p * 100}%`;
      if (hudScrollRef.current) {
        hudScrollRef.current.style.opacity = p > 0.04 ? "0" : "1";
      }
    }

    // ── Momento da quebra (dispara uma vez por sentido) ──────────────────

    let brokeForward = false;

    function triggerBreak() {
      if (!wrapper) return;
      const tl = gsap.timeline();
      tl.to(wrapper, {
        x: () => gsap.utils.random(-14, 14),
        y: () => gsap.utils.random(-10, 10),
        duration: 0.04,
        repeat: 7,
        yoyo: true,
        ease: "none",
      }).set(wrapper, { x: 0, y: 0 });

      const flash = stage?.querySelector<HTMLDivElement>("[data-break-flash]");
      if (flash) {
        gsap.fromTo(
          flash,
          { opacity: 0.9 },
          { opacity: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      line1Refs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          x: () => gsap.utils.random(-120, 120),
          y: () => gsap.utils.random(-80, 80),
          rotate: () => gsap.utils.random(-50, 50),
          filter: "blur(6px)",
          opacity: 0,
          duration: 0.55,
          ease: "power3.in",
        });
      });
    }

    function resetBreak() {
      line1Refs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { x: 0, y: 0, rotate: 0, filter: "blur(0px)" });
      });
    }

    // ── ScrollTrigger principal ──────────────────────────────────────────

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        const frameIndex = Math.round(p * (frameCount - 1));
        targetIndex = frameIndex;
        drawFrame(frameIndex);
        setLine1Progress(p);
        setLine2Progress(p);
        setLine3Progress(p);
        setHud(p);

        if (p >= BREAK_PROGRESS && !brokeForward) {
          brokeForward = true;
          triggerBreak();
        } else if (p < BREAK_PROGRESS - 0.02 && brokeForward) {
          brokeForward = false;
          resetBreak();
        }
      },
    });

    function onResize() {
      resizeCanvas();
      lastDrawn = -1;
      drawFrame(Math.round(st.progress * (frameCount - 1)));
      ScrollTrigger.refresh();
    }
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      gsap.ticker[document.hidden ? "sleep" : "wake"]();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (cancelIdle && requestIdle) {
        cancelIdle(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: reducedMotion ? undefined : "500vh" }}
    >
      <div
        ref={stageRef}
        className="sticky top-20 h-[calc(100dvh-5rem)] w-full overflow-hidden bg-modux-black md:top-24 md:h-[calc(100dvh-6rem)]"
      >
        {!reducedMotion && (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        )}
        {reducedMotion && (
          <NextImage
            src="/frames/poster.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* Vinheta escura atrás do texto: o vídeo tem trechos muito claros
            (explosão lime) que, sem isso, deixam o texto ilegível. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 75%)",
          }}
        />

        {!reducedMotion && (
          <>
            <div
              data-break-flash
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-modux-lime opacity-0"
            />

            <div
              aria-hidden="true"
              className="dot-grid pointer-events-none absolute inset-0 opacity-[0.25]"
            />

            {/* HUD técnico */}
            <div className="pointer-events-none absolute inset-0 p-6 font-mono text-[11px] uppercase tracking-[0.15em] text-modux-canvas/70 md:p-10">
              <div className="flex items-start justify-between">
                <span>
                  FRAME <span ref={hudFrameRef}>001/161</span>
                </span>
                <span
                  ref={hudScrollRef}
                  className="transition-opacity duration-300"
                >
                  SCROLL ↓
                </span>
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-6 md:inset-x-10 md:bottom-10">
                <span>ESTRATÉGIA · IDENTIDADE · SITES · COMUNICAÇÃO</span>
                <div className="h-px w-24 bg-modux-canvas/20 md:w-40">
                  <div
                    ref={hudBarRef}
                    className="h-px w-0 bg-modux-lime"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Título real (SEO/acessibilidade), sempre uma única vez no DOM. */}
        {reducedMotion ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
            <h1
              className="max-w-4xl text-[clamp(2.25rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight text-modux-canvas text-balance"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 14px 40px rgba(0,0,0,0.6)" }}
            >
              Marca boa não enfeita competência. Faz o mercado{" "}
              <span className="text-modux-lime">perceber</span> que ela já
              existe.
            </h1>
            <div className="flex max-w-xl flex-col items-center gap-8">
              <p
                className="text-body text-modux-canvas/90"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.6)" }}
              >
                A MODUX não vende aparência nova. Corrige a distância entre o
                valor que a sua empresa já entrega e o valor que o mercado
                consegue perceber.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <PillButton href="#contato" variant="lime">
                    Fale com a MODUX
                  </PillButton>
                </Magnetic>
                <Magnetic>
                  <PillButton href="#atuacao" variant="outline-dark" showArrow={false}>
                    Ver áreas de atuação
                  </PillButton>
                </Magnetic>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="sr-only">
              Marca boa não enfeita competência. Faz o mercado perceber que
              ela já existe.
            </h1>

            {/* Texto: linha 1 (decorativo, estilhaça na quebra) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center px-6 text-center"
            >
              <p
                className="max-w-5xl select-none text-[clamp(2.25rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight text-modux-canvas text-balance"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 14px 40px rgba(0,0,0,0.6)" }}
              >
                <CharSpans
                  tokens={LINE_1}
                  getRef={(el, i) => (line1Refs.current[i] = el)}
                />
              </p>
            </div>

            {/* Texto: linha 2 (decorativo) */}
            <div
              ref={line2Ref}
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center px-6 text-center opacity-0"
            >
              <p
                className="max-w-4xl select-none text-[clamp(2.25rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight text-modux-canvas text-balance"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 14px 40px rgba(0,0,0,0.6)" }}
              >
                {LINE_2_PRE}
                <span className="text-modux-lime">{LINE_2_WORD}</span>
              </p>
            </div>

            {/* Texto: linha 3 (decorativo) + CTA final (real, interativo) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
              <p
                ref={line3Ref}
                aria-hidden="true"
                className="select-none text-[clamp(2.25rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight text-modux-canvas text-balance opacity-0"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 14px 40px rgba(0,0,0,0.6)" }}
              >
                {LINE_3}
              </p>

              <div
                ref={afterRef}
                className="flex max-w-xl flex-col items-center gap-8 opacity-0"
              >
                <p
                  className="text-body text-modux-canvas/90"
                  style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.6)" }}
                >
                  A MODUX não vende aparência nova. Corrige a distância entre o
                  valor que a sua empresa já entrega e o valor que o mercado
                  consegue perceber.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Magnetic>
                    <PillButton href="#contato" variant="lime">
                      Fale com a MODUX
                    </PillButton>
                  </Magnetic>
                  <Magnetic>
                    <PillButton
                      href="#atuacao"
                      variant="outline-dark"
                      showArrow={false}
                    >
                      Ver áreas de atuação
                    </PillButton>
                  </Magnetic>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
