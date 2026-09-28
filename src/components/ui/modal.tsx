"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useBodyLock, useFocusRestore, useKeyHandler } from "@/lib/hooks";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
};

export function Modal({ open, onClose, children, label, className }: ModalProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyLock(open);
  useFocusRestore(open);
  useKeyHandler(open, (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  });

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.div
            className="absolute inset-0 bg-black/88 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className={className ?? "relative w-full max-w-6xl"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.965, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.975, y: 10 }}
            transition={{ duration: reduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalClose({ onClick, label = "Close" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/50 text-white/85 backdrop-blur-md transition-[background-color,transform,border-color] duration-300 hover:scale-105 hover:border-accent hover:text-accent"
    >
      <X className="size-4" strokeWidth={1.6} />
    </button>
  );
}
