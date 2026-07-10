"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight muted/autoplay/loop background video with a poster fallback.
 * Respects prefers-reduced-motion (pauses, poster stays visible).
 */
export default function VideoFrame({
  src,
  poster,
  className = "",
  tint = true,
}: {
  src: string;
  poster: string;
  className?: string;
  tint?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setReady(true)}
      />
      {tint && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut/25 via-transparent to-transparent" />
      )}
    </div>
  );
}
