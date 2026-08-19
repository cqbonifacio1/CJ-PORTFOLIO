"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "@/components/VideoBackground";
import { experience } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const CARD_WIDTH = 420;
const CARD_GAP = 28;
const LINE_TO_CONTENT_GAP = 96; // ~1 inch, per CJ's note

/**
 * Professional Experience — ONE continuous pinned section. The background
 * video and the "Professional Experience" heading stay fixed on screen for
 * the entire journey through all 4 companies; only the date, vertical
 * line, and image track change as you scroll (companies cross-fade
 * between each other rather than each being its own full-page pin).
 *
 * Within each company's active window, its images fan in one at a time
 * (cover image visible first — and ONLY the cover — then each next image
 * scales/fades in while the track shifts left so the newly revealed card
 * slides into view).
 */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const companyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const groups = companyRefs.current;
      if (groups.some((g) => !g)) return;

      // Only the first company's group is visible at the start.
      groups.forEach((g, i) => {
        gsap.set(g, { opacity: i === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${experience.reduce((sum, c) => sum + c.images.length, 0) * 70 + experience.length * 15}%`,
          scrub: 0.6,
          pin: true,
        },
      });

      experience.forEach((company, ci) => {
        const groupEl = groups[ci]!;
        const track = trackRefs.current[ci];
        const cards = track?.querySelectorAll<HTMLElement>("[data-fan-card]") ?? [];
        const extraCards = Array.from(cards); // indices 3+ (first 3 are always visible via JSX)

        gsap.set(track, { x: 0 });
        gsap.set(extraCards, { opacity: 0, scale: 0.4 });

        if (ci > 0) {
          const prevGroupEl = groups[ci - 1]!;
          tl.to(prevGroupEl, { opacity: 0, duration: 0.5 });
          tl.set(prevGroupEl, { visibility: "hidden" });
          tl.set(groupEl, { visibility: "visible" });
          tl.to(groupEl, { opacity: 1, duration: 0.5 }, "<");
        }

        extraCards.forEach((card, i) => {
          const label = `c${ci}-${i}`;
          tl.addLabel(label);
          tl.to(card, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, label);
          tl.to(track, { x: -(CARD_WIDTH + CARD_GAP) * (i + 1), duration: 1, ease: "power2.out" }, label);
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="relative isolate h-screen w-full overflow-hidden px-16">
      <VideoBackground src="/videos/profexppage.mp4" eager />

      {/* "Professional Experience" heading — stays fixed for the whole
          section, sized similarly to the Four Disciplines heading, and
          positioned ~1 inch to the right of the vertical line. */}
      <div className="absolute left-16 top-28" style={{ paddingLeft: LINE_TO_CONTENT_GAP }}>
        <h2 className="leading-none">
          <span className="font-serif text-[clamp(3.2rem,5.4vw,5.25rem)] italic text-white">Professional </span>
          <span className="font-display text-[clamp(3.2rem,5.4vw,5.25rem)] font-bold text-white">Experience</span>
        </h2>
      </div>

      {/* Vertical timeline rail */}
      <div className="absolute left-16 top-0 h-full w-[3px] bg-white/40" />

      {experience.map((row, rowIndex) => (
        <div
          key={row.company}
          ref={(el) => {
            companyRefs.current[rowIndex] = el;
          }}
          className="absolute inset-0 flex flex-col justify-center"
          style={{ paddingLeft: 64 + LINE_TO_CONTENT_GAP }}
        >
          <p className="font-serif mb-8 mt-10 flex items-center gap-3 text-[clamp(1.35rem,1.9vw,2.1rem)] italic text-white/90">
            <span className="inline-block h-3 w-3 rounded-full border-2 border-white" />
            {row.dateRange}
          </p>

          <div className="relative overflow-hidden">
            <div
              ref={(el) => {
                trackRefs.current[rowIndex] = el;
              }}
              className="flex items-end gap-7"
            >
              {row.images.map((img, i) => (
                <div
                  key={img.src}
                  data-fan-card={i < 3 ? undefined : true}
                  className="relative h-[260px] w-[420px] shrink-0 overflow-hidden rounded-2xl bg-neutral-800"
                  style={{ zIndex: row.images.length - i }}
                >
                  <img src={img.src} alt={img.caption} className="h-full w-full object-cover" />
                  <div className="from-green/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  <span className="font-mono absolute left-3 top-3 rounded-full border border-white/50 bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                    {img.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    {i === 0 ? (
                      <>
                        <p className="font-display text-xl font-bold text-white">{row.company}</p>
                        <p className="font-body text-base text-white/90">{row.role}</p>
                      </>
                    ) : (
                      <p className="font-body text-[15px] leading-snug text-white">{img.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
