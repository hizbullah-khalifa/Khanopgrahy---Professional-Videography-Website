"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const LABELS: Record<string, string> = {
  view: "View",
  play: "Play",
  drag: "Drag",
  link: "Open",
};

const LABELS_AR: Record<string, string> = {
  view: "دیکھیں",
  play: "چلائیں",
  drag: "گھسیٹیں",
  link: "کھولیں",
};

/**
 * Desktop-only creative cursor.
 *
 * • Follows the pointer with a spring (compositor-only transforms)
 * • Grows + shows a contextual label over anything with `data-cursor="view|play|drag|link"`
 * • Collapses to a small dot elsewhere
 * • Not rendered at all on touch devices or with reduced motion
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.42 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.42 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const isArabic = document.documentElement.lang.startsWith("ar");
    const table = isArabic ? LABELS_AR : LABELS;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      setLabel(target ? (table[target.dataset.cursor ?? ""] ?? null) : null);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-9999 hidden cursor-desktop-only"
    >
      {/* Dot — instant, no spring, always under the true pointer position */}
      <motion.div
        className="absolute size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Ring — springy follower that expands into a labelled disc */}
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border border-accent/70 bg-accent/10 backdrop-blur-[2px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 92 : pressed ? 26 : 38,
          height: label ? 92 : pressed ? 26 : 38,
          opacity: visible ? 1 : 0,
          backgroundColor: label
            ? "rgba(233, 162, 59, 0.92)"
            : "rgba(233, 162, 59, 0.06)",
          borderColor: label ? "rgba(233, 162, 59, 0)" : "rgba(233, 162, 59, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.5 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-[0.6rem] font-semibold tracking-[0.16em] text-accent-ink uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
