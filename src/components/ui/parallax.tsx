"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type ParallaxProps = {
  children: ReactNode;
  /** Vertical travel as a percentage of the element height. */
  amount?: number;
  className?: string;
  enabled?: boolean;
};

/**
 * Subtle scroll parallax. Transform-only, and only mounted on large screens
 * where the effect is visible and worth the compositor work.
 */
export function Parallax({
  children,
  amount = 10,
  className,
  enabled: enabledProp,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const enabled = (enabledProp ?? true) && wide && !reduce;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={enabled ? { y } : undefined}
        className="relative size-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
