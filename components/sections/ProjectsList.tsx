"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "@/components/VideoBackground";
import { projects } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Roughly how many rows are "white" at once as the sweep travels down the
// list — tuned via a fixed pixel scroll-span per row rather than viewport
// percentages, so the window size stays consistent regardless of how many
// projects there are. ~300px ≈ 3 row-heights at this list's row padding.
const WINDOW_SCROLL_PX = 300;

export default function ProjectsList() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const barRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nameRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const indexRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tagRowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const hoveredProject = projects.find((p) => p.slug === hovered);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      projects.forEach((_, i) => {
        const row = rowRefs.current[i];
        const bar = barRefs.current[i];
        const name = nameRefs.current[i];
        const idx = indexRefs.current[i];
        const tagRow = tagRowRefs.current[i];
        if (!row || !bar || !name || !idx || !tagRow) return;
        const tags = Array.from(tagRow.children) as HTMLElement[];

        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 75%", end: `+=${WINDOW_SCROLL_PX}`, scrub: 0.5 },
        });
        // Sweep in, left to right — row turns white, text turns black
        tl.to(bar, { scaleX: 1, transformOrigin: "left center", duration: 0.3, ease: "power1.inOut" });
        tl.to([name, idx, ...tags], { color: "#000000", duration: 0.2 }, "<");
        // Hold — this is what creates the ~3-row-wide overlapping window
        tl.to({}, { duration: 0.5 });
        // Sweep out, right to left — reverts to default colors
        tl.to(bar, { scaleX: 0, transformOrigin: "right center", duration: 0.3, ease: "power1.inOut" });
        tl.to(name, { color: "#ffffff", duration: 0.2 }, "<");
        tl.to(idx, { color: "rgba(255,255,255,0.5)", duration: 0.2 }, "<");
        tl.to(tags, { color: "#5ce1e6", duration: 0.2 }, "<");
        // Release the inline color back to CSS once the sweep fully exits —
        // otherwise the inline style (even at matching values) still wins
        // over the plain hover:text-accent classes, since only an
        // !important class beats inline. Clearing it here lets normal CSS
        // hover take over cleanly for name/index/tags between sweeps.
        tl.set([name, idx, ...tags], { clearProps: "color" });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="relative isolate w-full px-16 py-28"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <VideoBackground src="/videos/whatibuiltpage.mp4" eager />

      <h2 className="font-display mb-14 text-5xl font-bold text-white sm:text-7xl">
        What I&rsquo;ve <span className="font-serif text-accent italic">Built</span>
      </h2>

      <ul className="divide-y divide-white/15 border-t border-white/15">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="relative"
          >
            <div
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className="absolute inset-0 bg-white"
            />
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setHovered(p.slug)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex flex-col justify-between gap-3 py-6 sm:flex-row sm:items-center"
            >
              <span className="font-display text-3xl font-bold transition-colors sm:text-4xl">
                <span
                  ref={(el) => {
                    indexRefs.current[i] = el;
                  }}
                  className="font-mono mr-4 text-base font-normal text-white/50 group-hover:!text-accent"
                >
                  {p.index}
                </span>
                <span
                  ref={(el) => {
                    nameRefs.current[i] = el;
                  }}
                  className={`group-hover:!text-accent ${hovered === p.slug ? "text-accent" : "text-white"}`}
                >
                  {p.name}
                </span>
              </span>
              <div
                ref={(el) => {
                  tagRowRefs.current[i] = el;
                }}
                className="flex flex-wrap gap-2"
              >
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="pill-glow group-hover:!text-accent text-accent rounded-full border border-current/50 px-3 py-1 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ left: pos.x + 24, top: pos.y - 60 }}
            className="pointer-events-none fixed z-30 hidden h-32 w-48 overflow-hidden rounded-lg border border-white/20 shadow-xl sm:block"
          >
            <img src={hoveredProject.thumbnail} alt="" className="h-full w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
