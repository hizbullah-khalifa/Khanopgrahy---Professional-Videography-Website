"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import type { PhotoItem } from "@/data/site";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";

/** Loaded on first open — keeps the lightbox out of the initial bundle. */
const Lightbox = dynamic(
  () => import("@/components/ui/lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

type PhotoGalleryProps = {
  photos: PhotoItem[];
  categories: readonly string[];
};

export function PhotoGallery({ photos, categories }: PhotoGalleryProps) {
  const [active, setActive] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (active === "All" ? photos : photos.filter((p) => p.category === active)),
    [active, photos],
  );

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-40 -mx-5 mb-10 px-5 py-3 sm:top-18 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="glass flex items-center gap-2 overflow-x-auto rounded-full border border-line px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const count =
              category === "All"
                ? photos.length
                : photos.filter((p) => p.category === category).length;
            const isActive = active === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={cn(
                  "relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-[0.78rem] font-medium whitespace-nowrap transition-colors duration-300",
                  isActive ? "text-accent-ink" : "text-muted hover:text-ink",
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-accent" />
                )}
                <span className="relative flex items-center gap-1.5">
                  {category}
                  <span
                    className={cn(
                      "font-mono text-[0.62rem]",
                      isActive ? "text-accent-ink/70" : "text-muted/60",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry — CSS columns: no JS layout measurement, no reflow jank */}
      <div
        key={active}
        className="animate-rise columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4"
      >
        {visible.map((photo, index) => (
          <figure
            key={photo.id}
            className="group relative mb-3 break-inside-avoid sm:mb-4"
            style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              data-cursor="view"
              aria-label={`Open ${photo.title} — ${photo.category}`}
              className="block w-full cursor-pointer overflow-hidden rounded-xl border border-line text-left transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/40"
            >
              <SmartImage
                src={photo.src}
                alt={photo.alt}
                ratio={`${photo.width}/${photo.height}`}
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw"
                zoom
                className="rounded-xl"
              />

              {/* Overlay */}
              <span className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-xl bg-linear-to-t from-black/85 via-black/10 to-transparent p-3.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                <span className="translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  <span className="block text-[0.8rem] leading-tight font-medium text-white">
                    {photo.title}
                  </span>
                  <span className="mt-1 flex items-center gap-2 text-[0.62rem] tracking-[0.16em] text-white/60 uppercase">
                    {photo.category}
                    {photo.location ? ` · ${photo.location}` : ""}
                  </span>
                </span>
              </span>

              <span className="pointer-events-none absolute top-3 right-3 grid size-8 scale-75 place-items-center rounded-full border border-white/25 bg-black/45 text-white opacity-0 backdrop-blur-md transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Maximize2 className="size-3.5" strokeWidth={1.6} />
              </span>
            </button>
          </figure>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
