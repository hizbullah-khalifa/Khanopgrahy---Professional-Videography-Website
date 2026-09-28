"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroMediaProps = {
  poster: string;
  posterAlt: string;
  video: string;
  priority?: boolean;
  className?: string;
};

/**
 * Hero background.
 *
 * 1. The poster image is the LCP element and loads immediately.
 * 2. The ambient video is only mounted once the browser is idle, on a
 *    connection that is not saving data, and on screens wide enough to
 *    benefit from it. `preload="none"` means zero bytes until then.
 */
export function HeroMedia({
  poster,
  posterAlt,
  video,
  priority = true,
  className,
}: HeroMediaProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => setShowVideo(true);

    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof idle === "function") {
      const id = idle.call(window, start, { timeout: 2600 });
      return () => window.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(start, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showVideo) videoRef.current?.play().catch(() => setShowVideo(false));
  }, [showVideo]);

  return (
    <div className={className}>
      <Image
  src={poster}
  alt={posterAlt}
  fill
  preload={priority}
  fetchPriority="high"
  sizes="100vw"
  quality={90}
  onLoad={() => setReady(true)}
  className={`object-cover transition-opacity duration-1000 ${
    ready ? "opacity-100" : "opacity-0"
  } ${showVideo ? "scale-105 opacity-0" : ""}`}
/>
      {showVideo && (
        <video
          ref={videoRef}
          className="animate-veil absolute inset-0 size-full scale-105 object-cover opacity-90"
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden
          tabIndex={-1}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
