"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = testimonials.items.length;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [go, paused, reduce]);

  const item = testimonials.items[index];

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-surface"
        data-cursor="drag"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.figure
            key={item.id}
            custom={direction}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 42 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -42 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              if (info.offset.x > 60) go(-1);
            }}
            className="flex cursor-grab flex-col gap-7 p-7 active:cursor-grabbing sm:p-10 lg:flex-row lg:items-start lg:gap-12"
          >
            <Quote
              aria-hidden
              className="mt-1 size-8 shrink-0 text-accent/40 lg:size-12"
              strokeWidth={1.2}
            />

            <blockquote className="flex-1">
              <p className="font-display text-[clamp(1.05rem,2.3vw,1.6rem)] leading-[1.35] font-normal tracking-[-0.02em] text-balance">
                “{item.quote}”
              </p>

              <figcaption className="mt-6 flex flex-wrap items-center gap-4">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line">
                  <Image
                    src={item.avatar}
                    alt={`${item.name}, ${item.role}`}
                    fill
                    sizes="48px"
                    quality={75}
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.9rem] font-medium">{item.name}</span>
                  <span className="text-[0.78rem] text-muted">
                    {item.role} · {item.company}
                  </span>
                </span>
                <span className="ml-auto rounded-full border border-accent/35 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-accent uppercase">
                  {item.projectType}
                </span>
              </figcaption>
            </blockquote>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonials">
          {testimonials.items.map((entry, entryIndex) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={entryIndex === index}
              aria-label={`Show testimonial from ${entry.name}`}
              onClick={() => {
                setDirection(entryIndex > index ? 1 : -1);
                setIndex(entryIndex);
              }}
              className={cn(
                "h-1 cursor-pointer rounded-full transition-all duration-500",
                entryIndex === index
                  ? "w-10 bg-accent"
                  : "w-4 bg-line-strong hover:bg-muted",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-2 font-mono text-[0.68rem] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <CarouselButton label="Previous testimonial" onClick={() => go(-1)}>
            <ArrowLeft className="size-4" strokeWidth={1.6} />
          </CarouselButton>
          <CarouselButton label="Next testimonial" onClick={() => go(1)}>
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 cursor-pointer place-items-center rounded-full border border-line-strong text-ink-soft transition-[border-color,color,transform] duration-300 hover:scale-105 hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
