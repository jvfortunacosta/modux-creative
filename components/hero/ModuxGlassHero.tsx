"use client";

import { useEffect, type RefObject } from "react";
import type { ModuxGlassHandle } from "@/lib/modux-glass";

export default function ModuxGlassHero({
  sectionRef,
  titleRef,
}: {
  sectionRef: RefObject<HTMLElement>;
  titleRef: RefObject<HTMLElement>;
}) {
  useEffect(() => {
    const container = sectionRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    let handle: ModuxGlassHandle | null = null;
    let cancelled = false;

    import("@/lib/modux-glass").then(({ createModuxGlass }) => {
      if (cancelled) return;
      handle = createModuxGlass({ container, title });
    });

    return () => {
      cancelled = true;
      handle?.destroy();
    };
  }, [sectionRef, titleRef]);

  return null;
}
