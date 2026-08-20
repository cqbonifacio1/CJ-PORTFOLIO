"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

type Phase = "bar" | "reveal" | "grow" | "exit";

// Durations (ms) — named so the phase timers stay obviously in sync with
// the animation durations used below.
const BAR_DURATION = 1200;
const REVEAL_DURATION = 900; // small "Chris Bonifacio." wipes in
const REVEAL_HOLD = 300;
// "grow" now covers both the wordmark scaling into place (finishes partway
// through, ~900ms in) AND the blue -> black-wipe -> blue background cycle
// (GROW_BG_WIPE_DURATION, below) — the phase itself runs a bit longer than
// either individually so both finish comfortably before "exit" starts.
const GROW_DURATION = 1500;
const GROW_WORDMARK_DURATION = 900;
const GROW_BG_WIPE_DURATION = 1300;
const EXIT_FADE_DURATION = 700; // overlay dissolves, revealing the real page

// A plain module-scoped variable, NOT sessionStorage. sessionStorage
// persists across a hard refresh within the same tab (only clearing when
// the tab closes), so the intro would stop playing after the first
// refresh. This variable resets whenever the page does a full reload
// (the whole module re-executes), but survives internal Next.js
// client-side navigation — intro plays on load/refresh, not on every
// click around the site.
let hasPlayedThisLoad = false;

/**
 * Full-screen intro. Sequence:
 *  1. "bar" — CJ mark + wordmark (Echo-reference layout), with a
 *     percentage counter and progress line underneath.
 *  2. "reveal" — small centered "Chris Bonifacio." wipes in: "Chris"
 *     sweeps left-to-right, "Bonifacio." sweeps right-to-left.
 *  3. "grow" — that wordmark scales up and moves into the EXACT position/
 *     size of the real landing page's wordmark, while the background
 *     cycles blue -> a black wipe sweeps top-to-bottom and back off ->
 *     blue again.
 *  4. "exit" — the whole overlay fades away, revealing the real page
 *     (Hero, Nav, tagline, footer — mounted underneath the entire time)
 *     in one simultaneous dissolve.
 */
export default function Preloader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [phase, setPhase] = useState<Phase>("bar");
  const [percent, setPercent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (hasPlayedThisLoad) setShowIntro(false);
  }, []);

  // Percentage counter, synced to the bar's fill duration.
  useEffect(() => {
    if (!showIntro || phase !== "bar") return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / BAR_DURATION);
      setPercent(Math.round(t * 100));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [showIntro, phase]);

  useEffect(() => {
    if (!showIntro) return;

    const t1 = setTimeout(() => setPhase("reveal"), BAR_DURATION);
    const t2 = setTimeout(() => setPhase("grow"), BAR_DURATION + REVEAL_DURATION + REVEAL_HOLD);
    const t3 = setTimeout(
      () => setPhase("exit"),
      BAR_DURATION + REVEAL_DURATION + REVEAL_HOLD + GROW_DURATION
    );
    const t4 = setTimeout(() => {
      hasPlayedThisLoad = true;
      setShowIntro(false);
    }, BAR_DURATION + REVEAL_DURATION + REVEAL_HOLD + GROW_DURATION + EXIT_FADE_DURATION);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [showIntro]);

  const grown = phase === "grow" || phase === "exit";

  return (
    <>
      {/* The real page is mounted the whole time — the overlay just sits
          on top and dissolves away, rather than the page mounting fresh
          after the overlay disappears. */}
      {children}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ backgroundColor: "#0a0a0a" }}
            animate={{ backgroundColor: grown ? "#5ce1e6" : "#0a0a0a" }}
            exit={{ opacity: 0 }}
            transition={{
              backgroundColor:
                phase === "grow"
                  ? { duration: 0.15, ease: "easeInOut" } // quick snap to blue as "grow" begins
                  : { duration: 0 },
              opacity: { duration: EXIT_FADE_DURATION / 1000 },
            }}
            className="fixed inset-0 z-[100] overflow-hidden"
          >
            {/* Background wipe: a black panel sweeps down from above,
                fully covers the screen, then continues down and off the
                bottom — reading as blue -> black -> blue again. Only
                mounted during "grow"; by GROW_BG_WIPE_DURATION its cycle
                has already finished (fully off-screen, blue visible)
                well within the GROW_DURATION window, before "exit"
                begins. */}
            <AnimatePresence>
              {phase === "grow" && (
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: ["-100%", "0%", "100%"] }}
                  transition={{
                    duration: GROW_BG_WIPE_DURATION / 1000,
                    times: [0, 0.5, 1],
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                  className="absolute inset-0 bg-black"
                />
              )}
            </AnimatePresence>

            {/* Stage 1: CJ mark + percentage bar, Echo-reference layout —
                sized up ~1.7x from the previous pass per CJ's note. */}
            <AnimatePresence>
              {phase === "bar" && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5"
                >
                  <div className="flex items-center gap-4">
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden>
                      <circle cx="22" cy="27" r="16" stroke="#5ce1e6" strokeWidth="3" />
                      <circle cx="34" cy="27" r="16" stroke="#ffffff" strokeWidth="3" />
                    </svg>
                    <span className="font-display text-4xl font-bold tracking-wide text-white sm:text-5xl">CJ</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-lg text-white/70 sm:text-xl">{percent}%</span>
                    <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/20 sm:w-56">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: percent / 100 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                        className="h-full w-full bg-sky"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage 2 → 3: small wordmark wipes in (Chris left-to-right,
                "Bonifacio." right-to-left), then scales/moves into the
                exact spot and size of Hero.tsx's real wordmark. Uses a
                pure `y` translate (always numeric/animatable) rather than
                switching between `top`/`bottom` positioning — Framer
                Motion can't smoothly tween to/from `auto`. `30vh` is the
                same offset Hero.tsx itself uses (in reverse) to move its
                wordmark between this resting spot and screen-center. */}
            {phase !== "bar" && (
              <motion.div
                animate={grown ? { y: "30vh", scale: 1 } : { y: 0, scale: 0.4 }}
                transition={{ duration: GROW_WORDMARK_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-end gap-6">
                  <motion.span
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: REVEAL_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
                    className="font-display inline-block text-[clamp(5rem,11vw,11rem)] font-bold leading-none text-white"
                  >
                    {site.name.first}
                  </motion.span>
                  <motion.span
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 0%)" }}
                    transition={{
                      duration: REVEAL_DURATION / 1000,
                      delay: 0.15,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    className="font-serif inline-block text-[clamp(5rem,11vw,11rem)] italic leading-none text-white"
                  >
                    {site.name.last}
                  </motion.span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}