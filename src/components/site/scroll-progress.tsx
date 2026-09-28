"use client";

import { useEffect, useRef } from "react";

/**
 * Top scroll-progress bar. Uses a single passive scroll listener and a
 * compositor-only transform (no re-renders, no library).
 */
export function ScrollProgress({ className }: { className?: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 top-0 z-95 h-0.5 origin-left bg-linear-to-r from-accent/40 via-accent to-accent-soft ${className ?? ""}`}
      style={{ transform: "scaleX(0)" }}
    />
  );
}
