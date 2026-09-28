"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { BeforeAfter } from "@/data/site";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  item: BeforeAfter;
};

/**
 * Draggable before/after comparison. Pointer + touch + keyboard accessible
 * (arrow keys, Home/End) with `role="slider"`.
 */
export function BeforeAfterSlider({ item }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(event.clientX);
  };

  const stop = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  const afterClip = dragging
    ? `inset(0 0 0 ${position}%)`
    : `inset(0 0 0 ${position}%)`;

  return (
    <figure className="group/ba">
      <div
        ref={frameRef}
        className="relative touch-none overflow-hidden rounded-2xl border border-line bg-surface-2 select-none"
        style={{ aspectRatio: "14 / 9" }}
      >
        {/* BEFORE — ungraded */}
        <Image
          src={item.before}
          alt={item.beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          quality={75}
          loading="lazy"
          decoding="async"
          className="object-cover"
        />
        <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-black/65 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
          Raw
        </span>

        {/* AFTER — graded, revealed by the clip */}
        <div
          className="absolute inset-0"
          style={{ clipPath: afterClip, transition: dragging ? "none" : "clip-path 0.12s linear" }}
        >
          <Image
            src={item.after}
            alt={item.afterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            quality={75}
            loading="lazy"
            decoding="async"
            className="object-cover"
          />
          <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-accent px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-accent-ink">
            Graded
          </span>
        </div>

        {/* HANDLE */}
        <div
          className="absolute inset-y-0 z-20 w-px bg-white/85 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          style={{ left: `${position}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${item.title} — compare raw footage with the graded result`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% graded`}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stop}
            onPointerCancel={stop}
            className={cn(
              "absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full",
              "border border-white/40 bg-black/55 text-white backdrop-blur-md",
              "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:scale-110 hover:border-accent hover:text-accent",
              dragging && "scale-110 border-accent text-accent",
            )}
          >
            <MoveHorizontal className="size-5" strokeWidth={1.6} />
          </div>
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-display text-base font-medium">{item.title}</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{item.note}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-muted"
            >
              {tool}
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
