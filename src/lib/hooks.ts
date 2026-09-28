"use client";

import { useEffect, useRef } from "react";

/** Locks page scroll while a modal is open, without layout shift. */
export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const { body, documentElement } = document;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;
    documentElement.dataset.modalOpen = "true";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      delete documentElement.dataset.modalOpen;
    };
  }, [active]);
}

/** Calls `handler` on the given key while `active`, always with a fresh handler. */
export function useKeyHandler(
  active: boolean,
  handler: (event: KeyboardEvent) => void,
) {
  const ref = useRef(handler);

  useEffect(() => {
    ref.current = handler;
  });

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => ref.current(event);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
}

/** Restores focus to whatever was focused before `active` turned on. */
export function useFocusRestore(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    return () => previous?.focus?.();
  }, [active]);
}
