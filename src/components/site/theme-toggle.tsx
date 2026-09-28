"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/* The theme lives on <html>, which is written by the blocking init script and
   by `toggle()` below — an external store, so `useSyncExternalStore` is the
   right way to read it (no setState-in-effect, no hydration mismatch). */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle({
  className,
  overMedia = false,
}: {
  className?: string;
  /** Renders light-on-dark while floating over a cinematic image. */
  overMedia?: boolean;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [flash, setFlash] = useState<{ x: number; y: number; to: Theme } | null>(
    null,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(() => setFlash(null), 620);
    return () => window.clearTimeout(timer);
  }, [flash]);

  const toggle = useCallback(() => {
    const next: Theme =
      document.documentElement.classList.contains("dark") ? "light" : "dark";
    const root = document.documentElement;

    const rect = buttonRef.current?.getBoundingClientRect();
    setFlash({
      x: rect ? rect.left + rect.width / 2 : window.innerWidth - 60,
      y: rect ? rect.top + rect.height / 2 : 40,
      to: next,
    });

    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    // Short colour cross-fade; removed again so it never affects later changes.
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 460);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the theme still applies for this session */
    }
  }, []);

  const nextLabel = theme === "dark" ? "light" : "dark";

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={`Switch to ${nextLabel} mode`}
        title={`Switch to ${nextLabel} mode`}
        className={`group relative grid size-10 cursor-pointer place-items-center overflow-hidden rounded-full border backdrop-blur-md transition-[color,background-color,border-color,transform] duration-500 hover:text-accent active:scale-95 ${
          overMedia
            ? "border-white/30 bg-white/10 text-white hover:border-accent"
            : "border-line-strong bg-surface/60 text-ink-soft hover:border-accent"
        } ${className ?? ""}`}
      >
        <span className="absolute inset-0 scale-0 rounded-full bg-accent/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
        <Sun
          className={`absolute size-[1.05rem] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          }`}
          strokeWidth={1.6}
        />
        <Moon
          className={`absolute size-[1.05rem] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-50 opacity-0"
          }`}
          strokeWidth={1.6}
        />
      </button>

      {flash &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            aria-hidden
            className="pointer-events-none fixed z-9998 rounded-full"
            style={{
              left: flash.x,
              top: flash.y,
              width: 32,
              height: 32,
              marginLeft: -16,
              marginTop: -16,
              background: flash.to === "dark" ? "#05070b" : "#ffffff",
              animation: "theme-flash 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />,
          document.body,
        )}
    </>
  );
}
