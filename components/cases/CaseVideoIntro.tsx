"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CaseVideoIntro({
  src,
  poster,
  playbackRate = 1,
  onFinished,
}: {
  src: string;
  poster?: string;
  playbackRate?: number;
  onFinished: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setVisible(false);
    setTimeout(onFinished, 500);
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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
