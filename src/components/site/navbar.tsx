"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  /* Compact header once the hero is behind us. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the section currently in view. */
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Lock scrolling while the mobile sheet is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  /* While the header floats over a dark cinematic image it must stay light in
     both themes; once the page scrolls it adopts the theme's own colours. */
  const overMedia = !scrolled && !open;

  return (
    <>
      <header
        data-over-media
        className={cn(
          "fixed inset-x-0 top-0 z-90 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-line bg-bg/72 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link
            href="#top"
            onClick={close}
            className="group flex items-center gap-2.5"
            aria-label={`${site.brand} — home`}
          >
            <Wordmark className="size-7" />
            <span
              className={cn(
                "font-display text-[0.95rem] font-semibold tracking-[-0.02em] transition-colors duration-500",
                overMedia ? "text-white" : "text-ink",
              )}
            >
              {site.brand}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative block px-3.5 py-2 text-[0.82rem] font-medium tracking-[0.01em] transition-colors duration-300",
                        overMedia
                          ? isActive
                            ? "text-white"
                            : "text-white/65 hover:text-white"
                          : isActive
                            ? "text-ink"
                            : "text-muted hover:text-ink",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          overMedia ? "bg-accent-soft" : "bg-accent",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle overMedia={overMedia} />
            <Link
              href="#contact"
              className={cn(
                "hidden h-10 items-center rounded-full px-5 text-[0.8rem] font-medium transition-[background-color,color,transform] duration-300 hover:bg-accent hover:text-accent-ink sm:inline-flex",
                overMedia
                  ? "bg-white text-[#0a0f1a]"
                  : "bg-ink text-bg",
              )}
            >
              Let&apos;s Talk
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-10 cursor-pointer place-items-center rounded-full border transition-[border-color,color] duration-500 hover:border-accent hover:text-accent lg:hidden",
                overMedia
                  ? "border-white/30 text-white"
                  : "border-line-strong text-ink",
              )}
            >
              {open ? (
                <X className="size-4" strokeWidth={1.7} />
              ) : (
                <Menu className="size-4" strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-80 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28 }}
          >
            <div
              className="absolute inset-0 bg-bg/96 backdrop-blur-2xl"
              onClick={close}
            />
            <motion.nav
              aria-label="Mobile"
              className="relative flex h-full flex-col justify-between px-6 pt-24 pb-10"
              initial={reduce ? { opacity: 0 } : { y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: 10, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? { opacity: 0 } : { y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: reduce ? 0 : 0.06 + index * 0.05,
                      duration: reduce ? 0 : 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-4 font-display text-[1.75rem] font-medium tracking-[-0.03em]"
                    >
                      {link.label}
                      <span className="font-mono text-[0.65rem] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.34, duration: 0.5 }}
                className="flex flex-col gap-5"
              >
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted"
                >
                  {site.email}
                </a>
                <a
                  href="#contact"
                  onClick={close}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-bg"
                >
                  Start a Project
                </a>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                  {site.location} · {site.availability}
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
