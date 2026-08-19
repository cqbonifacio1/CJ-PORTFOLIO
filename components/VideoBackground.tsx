"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** If true, start fetching immediately (use for the first visible section). */
  eager?: boolean;
};

// Confirmed-working video CJ has verified renders correctly in-browser.
// Used as an automatic fallback if a page's own background video fails
// to decode/play (e.g. a codec mismatch in how that specific file was
// exported) so the section never falls back to plain black.
const FALLBACK_SRC = "/videos/profexppage.mp4";

/**
 * Autoplay/muted/loop/cover video background, reused across every section.
 *
 * This version always mounts the <video> element immediately (no
 * conditional two-stage render) to avoid any race condition between
 * IntersectionObserver firing and the ref attaching. `preload` is what's
 * toggled for lazy sections instead, which still protects load
 * performance without changing DOM mount timing.
 *
 * `muted` is also set imperatively via ref on mount — the JSX `muted` prop
 * only sets the DOM *property* after hydration, not the HTML *attribute*
 * in the server-rendered markup, and browsers check the attribute before
 * hydration runs, which can silently block autoplay.
 */
export default function VideoBackground({ src, poster, className = "", eager = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState(src);
  const [preload, setPreload] = useState<"auto" | "metadata" | "none">(eager ? "auto" : "metadata");

  useEffect(() => {
    setActiveSrc(src); // reset fallback state if the src prop changes
  }, [src]);

  useEffect(() => {
    if (eager || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPreload("auto");
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [activeSrc, preload]);

  const handleError = () => {
    console.error(`[VideoBackground] failed to load/decode: ${activeSrc}`);
    if (activeSrc !== FALLBACK_SRC) {
      console.warn(`[VideoBackground] falling back to ${FALLBACK_SRC} for this section.`);
      setActiveSrc(FALLBACK_SRC);
    }
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 -z-10 overflow-hidden bg-ink ${className}`}>
      {poster && (
        <img src={poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      )}
      <video
        key={activeSrc}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={poster}
        onError={handleError}
      >
        <source src={activeSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
