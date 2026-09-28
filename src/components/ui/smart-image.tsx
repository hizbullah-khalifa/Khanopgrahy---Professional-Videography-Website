"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
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
  style?: CSSProperties;
  priority?: boolean;
};

/**
 * Image primitive: responsive `next/image` + fade-in on load + a cheap gradient
 * placeholder (no blurDataURL needed, so no extra network requests).
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
  style,
  priority,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const stretch = Boolean(ratio) || fill;

  return (
    <div
      className={cn("relative overflow-hidden bg-surface-2", className)}
      style={{
        ...(ratio ? { aspectRatio: ratio } : undefined),
        ...style,
      }}
    >
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 skeleton"
          style={{ backgroundImage: "var(--skeleton)", backgroundSize: "200% 100%" }}
        />
      )}
      <Image
        src={src}
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
        className={cn(
          "object-cover transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          loaded ? "opacity-100" : "opacity-0",
          zoom &&
            "group-hover:scale-[1.07] group-focus-visible:scale-[1.07] motion-reduce:group-hover:scale-100",
          imgClassName,
        )}
      />
    </div>
  );
}
