"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { process } from "@/data/site";

export function ProcessTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={trackRef} className="relative mt-14">
      {/* Track */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line sm:left-1/2 sm:-translate-x-1/2"
      >
        <motion.div
          className="h-full w-full origin-top bg-linear-to-b from-accent to-accent-soft"
          style={{ scaleY: reduce ? 1 : progress }}
        />
      </div>

      <ol className="flex flex-col gap-10 sm:gap-14">
        {process.steps.map((step, index) => (
          <li
            key={step.id}
            className="relative grid gap-4 pl-12 sm:grid-cols-2 sm:gap-12 sm:pl-0"
          >
            {/* Node */}
            <span
              aria-hidden
              className="absolute top-1.5 left-0 grid size-6 place-items-center rounded-full border border-line bg-bg sm:left-1/2 sm:-translate-x-1/2"
            >
              <span className="size-1.5 rounded-full bg-accent" />
            </span>

            <div
              className={
                index % 2 === 0
                  ? "sm:col-start-1 sm:pr-12 sm:text-right"
                  : "sm:col-start-2 sm:pl-12"
              }
            >
              <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent">
                {step.id}
              </span>
              <h3 className="mt-2 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-tight font-medium tracking-[-0.035em]">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{step.detail}</p>
            </div>

            <p
              className={`text-[0.85rem] leading-relaxed text-muted ${
                index % 2 === 0 ? "sm:col-start-2 sm:pl-12" : "sm:col-start-1 sm:pr-12 sm:text-right"
              }`}
            >
              {step.note}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
