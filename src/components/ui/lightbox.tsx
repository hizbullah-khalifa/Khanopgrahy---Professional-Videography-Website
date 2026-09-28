"use client";

import Image from "next/image";
import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PhotoItem } from "@/data/site";
import { useKeyHandler } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Modal, ModalClose } from "./modal";

type LightboxProps = {
  items: PhotoItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Fullscreen photo viewer: arrow-key navigation, swipe (drag) navigation and
 * scroll-locked backdrop. The whole module is dynamically imported by the
 * gallery, so none of it ships in the initial bundle.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  const open = index !== null;
  const reduce = useReducedMotion();

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + items.length) % items.length);
      setLoaded(false);
    },
    [index, items.length, onNavigate],
  );

  useKeyHandler(open, (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  });

  const item = index !== null ? items[index] : undefined;

  return (
    <Modal open={open} onClose={onClose} label="Photo preview" className="w-full">
      {item && (
        <div className="relative flex h-[100dvh] w-full flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 bg-linear-to-b from-black/75 to-transparent p-4 sm:p-6">
            <div className="pointer-events-auto min-w-0 pl-1">
              <p className="truncate text-sm font-medium text-white sm:text-base">
                {item.title}
              </p>
              <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-white/55">
                {item.category}
                {item.location ? ` · ${item.location}` : ""}
              </p>
            </div>
            <ModalClose onClick={onClose} />
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-20 sm:px-16 sm:py-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                className="relative flex h-full w-full items-center justify-center"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  if (info.offset.x > 70) go(-1);
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="100vw"
                  quality={90}
                  priority
                  onLoad={() => setLoaded(true)}
                  className={cn(
                    "max-h-full max-w-full object-contain transition-opacity duration-500",
                    loaded ? "opacity-100" : "opacity-0",
                  )}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 bg-linear-to-t from-black/75 to-transparent p-4 sm:p-6">
            <span className="pl-1 font-mono text-xs text-white/55">
              {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <div className="pointer-events-auto flex items-center gap-2">
              <NavButton label="Previous photo" onClick={() => go(-1)}>
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </NavButton>
              <NavButton label="Next photo" onClick={() => go(1)}>
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </NavButton>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function NavButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/50 text-white/85 backdrop-blur-md transition-[background-color,transform,border-color,color] duration-300 hover:scale-105 hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
