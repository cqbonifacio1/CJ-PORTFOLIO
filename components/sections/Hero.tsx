"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { popup, site } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Landing + Popup, merged into ONE pinned scroll sequence (per CJ: "this is
 * not a separate page, this is just from the landing page where the other
 * elements will fade away"). Stages, all scroll-scrubbed within a single
 * GSAP timeline:
 *
 *  0. Full landing view: nav (rendered outside this component), tagline
 *     top-right, wordmark near the bottom divider, footer (V3.0 /
 *     GITHUB-LINKEDIN-INDEED). Background: landingpage.mp4.
 *  1. First scroll: tagline + footer fade out, wordmark rises from its
 *     bottom position to dead-center of the screen.
 *  2. Chris and Bonifacio slide apart to the left/right.
 *  3. A panel grows from a small box between them to fill the entire
 *     screen, crossfading the background to popuppage.mp4.
 *  4. The quote fades in as a single centered line.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);
  const chrisRef = useRef<HTMLSpanElement>(null);
  const bonifacioRef = useRef<HTMLSpanElement>(null);
  const landingVideoRef = useRef<HTMLVideoElement>(null);
  const popupVideoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      [landingVideoRef, popupVideoRef].forEach((r) => {
        if (r.current) {
          r.current.muted = true;
          r.current.play().catch(() => {});
        }
      });

      gsap.set(panelRef.current, { scale: 0.06, opacity: 0, borderRadius: 24 });
      gsap.set(popupVideoRef.current, { opacity: 0 });
      gsap.set(quoteRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 0.6,
          pin: true,
        },
      });

      // Stage 1: tagline + footer fade out, wordmark rises to center
      tl.to(taglineRef.current, { opacity: 0, y: -20, duration: 0.6 }, 0);
      tl.to(footerRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0);
      tl.to(wordmarkWrapRef.current, { y: "-30vh", duration: 1, ease: "power2.inOut" }, 0.1);

      // Stage 2: split the wordmark apart
      tl.to(chrisRef.current, { xPercent: -70, duration: 1, ease: "power2.inOut" }, 1.1);
      tl.to(bonifacioRef.current, { xPercent: 70, duration: 1, ease: "power2.inOut" }, 1.1);

      // Stage 3: panel grows from a small box to fullscreen, crossfading video
      tl.to(panelRef.current, { opacity: 1, duration: 0.3 }, 1.7);
      tl.to(panelRef.current, { scale: 1, borderRadius: 0, duration: 1.4, ease: "power2.inOut" }, 1.9);
      tl.to(popupVideoRef.current, { opacity: 1, duration: 1 }, 2.1);
      tl.to([chrisRef.current, bonifacioRef.current], { opacity: 0, duration: 0.5 }, 2.3);

      // Stage 4: quote fades in, single centered line
      tl.to(quoteRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 3.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate h-screen w-full overflow-hidden bg-ink">
      <video
        ref={landingVideoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        autoPlay
      >
        <source src="/videos/landingpage.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10" />

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="font-serif absolute right-16 top-36 max-w-sm text-right text-[clamp(1.25rem,1.7vw,1.75rem)] italic leading-snug text-white"
      >
        {site.tagline}
      </p>

      {/* Wordmark — starts ~2cm above the footer divider, rises to center on scroll */}
      <div className="absolute inset-x-0 bottom-[100px] flex justify-center">
        <div ref={wordmarkWrapRef} className="flex items-end gap-6">
          <span ref={chrisRef} className="font-display inline-block text-[clamp(5rem,11vw,11rem)] font-bold leading-none text-white">
            {site.name.first}
          </span>
          <span ref={bonifacioRef} className="font-serif inline-block text-[clamp(5rem,11vw,11rem)] italic leading-none text-white">
            {site.name.last}
          </span>
        </div>
      </div>

      {/* Footer: V3.0 + GITHUB/LINKEDIN/INDEED */}
      <div ref={footerRef} className="absolute inset-x-16 bottom-12 border-t border-white/25 pt-6">
        <span className="font-body absolute left-0 top-6 text-[clamp(0.9rem,1.1vw,1.25rem)] font-semibold tracking-wide text-white">
          → V3.0
        </span>
        <div className="font-body flex items-center justify-center gap-3 text-[clamp(0.9rem,1.1vw,1.25rem)] font-semibold tracking-wide text-white">
          <a href={site.links.github} className="hover:text-accent">GITHUB</a>
          <span>/</span>
          <a href={site.links.linkedin} className="hover:text-accent">LINKEDIN</a>
          <span>/</span>
          <a href={site.links.indeed} className="hover:text-accent">INDEED</a>
        </div>
      </div>

      {/* Growing panel — crossfades into the popup video, filling the screen */}
      <div ref={panelRef} className="absolute inset-0 overflow-hidden">
        <video ref={popupVideoRef} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="auto" autoPlay>
          <source src="/videos/popuppage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <p
        ref={quoteRef}
        className="font-serif pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap px-6 text-center text-[clamp(3.1rem,3.3vw,3.35rem)] italic text-white"
      >
        {popup.quote}
      </p>
    </section>
  );
}
