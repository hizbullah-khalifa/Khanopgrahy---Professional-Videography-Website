"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  /** Intrinsic size — used when no aspect ratio is supplied. */
  width?: number;
  height?: number;
  /** CSS aspect-ratio string, e.g. "3/4". Switches the image to `fill`. */
  ratio?: string;
  /** Force `fill` when the parent already provides the box (e.g. a grid cell). */
  fill?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Eagerly load the image (use for LCP / above-the-fold). */
  eager?: boolean;
  quality?: 50 | 75 | 90;
  /** Adds a slow zoom on group hover. */
  zoom?: boolean;
  /** "contain" shows the whole image (logos) on a white tile; default "cover". */
  fit?: "cover" | "contain";
  style?: CSSProperties;
  priority?: boolean;
};

/**
 * Image primitive: responsive `next/image` + fade-in on load + a cheap gradient
 * placeholder. If the file can't be loaded, the shimmer is replaced by a clear
 * fallback (and the missing path is shown in development).
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  ratio,
  fill = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  imgClassName,
  eager = false,
  quality = 75,
  zoom = false,
  fit = "cover",
  style,
  priority,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Local files: if one extension 404s, try the others (jpg, jpeg, png, webp…)
  const candidates = useMemo(() => {
    const m = src.startsWith("/") ? src.match(/^(.*)\.([a-z0-9]+)$/i) : null;
    if (!m) return [src];
    const [, base, ext] = m;
    const all = [ext, "jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];
    return [...new Set(all)].map((e) => `${base}.${e}`);
  }, [src]);
  const current = candidates[attempt] ?? src;
  const imgRef = useRef<HTMLImageElement>(null);
  const stretch = Boolean(ratio) || fill;
  const contain = fit === "contain";

  // Reset when the source changes
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    setAttempt(0);
  }, [src]);

  // Cached images can finish loading before React attaches onLoad
  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, [current]);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        contain ? "bg-white" : "bg-surface-2",
        className,
      )}
      style={{
        ...(ratio ? { aspectRatio: ratio } : undefined),
        ...style,
      }}
    >
      {!loaded && !failed && (
        <div
          aria-hidden
          className="absolute inset-0 skeleton"
          style={{ backgroundImage: "var(--skeleton)", backgroundSize: "200% 100%" }}
        />
      )}

      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-[0.7rem] tracking-[0.14em] text-muted uppercase">
            {alt}
          </span>
          {process.env.NODE_ENV === "development" && (
            <span className="font-mono text-[0.62rem] break-all text-red-500">
              Not found in public/images: {src} (tried jpg, jpeg, png, webp)
            </span>
          )}
        </div>
      ) : (
        <Image
          key={current}
          ref={imgRef}
          src={current}
          alt={alt}
          {...(stretch
            ? { fill: true }
            : { width: width ?? 1200, height: height ?? 800 })}
          sizes={sizes}
          quality={quality}
          loading={eager ? "eager" : "lazy"}
          {...(eager && !priority ? { fetchPriority: "high" as const } : {})}
          {...(priority ? { preload: true } : {})}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (attempt < candidates.length - 1) {
              setAttempt((a) => a + 1);
            } else {
              console.warn(`[SmartImage] could not load: ${src}`);
              setFailed(true);
            }
          }}
          className={cn(
            "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            contain ? "object-contain p-[10%]" : "object-cover",
            loaded ? "opacity-100" : "opacity-0",
            zoom &&
              "group-hover:scale-[1.07] group-focus-visible:scale-[1.07] motion-reduce:group-hover:scale-100",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}