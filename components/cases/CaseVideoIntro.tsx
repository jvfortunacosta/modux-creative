"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CaseVideoIntro({
  src,
  poster,
  playbackRate = 1,
  onFinished,
  persistAsBackground = false,
}: {
  src: string;
  poster?: string;
  playbackRate?: number;
  onFinished: () => void;
  /**
   * Em vez de desaparecer ao terminar, o vídeo continua tocando (em loop)
   * como fundo da seção, com uma camada preta a 20% por cima. Usado no
   * piloto do novo template de case (Casa Martinho).
   */
  persistAsBackground?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [background, setBackground] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (persistAsBackground) {
      setBackground(true);
      onFinished();
      requestAnimationFrame(() => {
        videoRef.current?.play().catch(() => {});
      });
    } else {
      setVisible(false);
      setTimeout(onFinished, 500);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (persistAsBackground) {
    return (
      <div
        className={
          background
            ? "absolute inset-0 z-0 h-full w-full"
            : "fixed inset-0 z-[60] h-[100dvh] w-full"
        }
      >
        <motion.video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop={background}
          playsInline
          preload="auto"
          onEnded={finish}
          onError={finish}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: background ? 0.2 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-modux-black"
          aria-hidden="true"
        />

        <AnimatePresence>
          {showSkip && !background && (
            <motion.button
              type="button"
              onClick={finish}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-1/2 min-h-[56px] min-w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-modux-canvas/50 bg-modux-black/30 px-8 text-base font-semibold text-modux-canvas backdrop-blur-sm transition-colors duration-300 ease-modux hover:border-modux-canvas hover:bg-modux-black/50"
            >
              Pular
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] h-[100dvh] w-full bg-modux-black"
        >
          <motion.video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finish}
            onError={finish}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover"
          />

          <AnimatePresence>
            {showSkip && (
              <motion.button
                type="button"
                onClick={finish}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 right-6 min-h-[44px] rounded-full border border-modux-canvas/40 px-5 text-sm font-medium text-modux-canvas transition-colors duration-300 ease-modux hover:border-modux-canvas md:bottom-10 md:right-10"
              >
                Pular
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
