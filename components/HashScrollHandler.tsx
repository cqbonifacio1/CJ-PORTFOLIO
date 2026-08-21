"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixes "Back" / nav links that arrive at the home page with a hash (e.g.
 * /#projects) landing at the top of the page instead of the target
 * section. Root cause: several home-page sections are GSAP ScrollTrigger
 * pinned (Hero, About, Experience) — pinning adds spacer height to the
 * page, but that happens slightly AFTER mount. The browser's native
 * hash-scroll fires before that extra height exists, so it lands on
 * where #projects WAS, which ends up near the very top.
 *
 * Fix: after mount, wait briefly for ScrollTrigger to finish pinning,
 * force a refresh (recalculates all pin positions), then scroll to the
 * hash target ourselves.
 */
export default function HashScrollHandler() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      });
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return null;
}