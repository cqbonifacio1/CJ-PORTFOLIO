"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

type Phase = "bar" | "reveal" | "exit";

// Durations (ms) — kept as named constants so the phase timers below stay
// obviously in sync with the animation durations used in the JSX.
const BAR_DURATION = 1000;
const REVEAL_STAGGER = 300; // gap before "Bonifacio." starts wiping in
const REVEAL_DURATION = 700;
const HOLD_DURATION = 450; // both words fully visible, before the exit sweep
const EXIT_SWEEP_DURATION = 500; // background flashes to sky blue
const EXIT_FADE_DURATION = 450; // whole overlay dissolves into the page

// A plain module-scoped variable, NOT sessionStorage. sessionStorage
// persists across a hard refresh within the same tab (it's only cleared
// when the tab closes) — so the intro would silently stop playing after
// the very first refresh, which is the bug you hit. This variable lives
// in the JS module itself: a hard refresh re-executes the whole module
// (resetting it to false, replaying the intro), while an internal
// Next.js client-side navigation (e.g. clicking to a project page and
// back) does NOT re-execute the module, so it correctly stays true and
// skips the intro — matching "play once per load, not on every internal
// navigation, but again on a fresh refresh."
let hasPlayedThisLoad = false;

/**
 * Full-screen intro, matching lukebaffait.fr's actual sequence: a loading
 * bar plays first; then a small, centered wordmark wipes in (mask reveal,
 * not the full landing-page size); it holds briefly; then the background
 * flashes to the brand's sky blue before the whole overlay smoothly
 * dissolves into the real page underneath.
 */
export default function Preloader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<Phase>("bar");

  useEffect(() => {
    setShowIntro(!hasPlayedThisLoad);
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    const toReveal = setTimeout(() => setPhase("reveal"), BAR_DURATION);
    const toExit = setTimeout(
      () => setPhase("exit"),
      BAR_DURATION + REVEAL_STAGGER + REVEAL_DURATION + HOLD_DURATION
    );
    const toDone = setTimeout(() => {
      hasPlayedThisLoad = true;
      setShowIntro(false);
    }, BAR_DURATION + REVEAL_STAGGER + REVEAL_DURATION + HOLD_DURATION + EXIT_SWEEP_DURATION + EXIT_FADE_DURATION);

    return () => {
      clearTimeout(toReveal);
      clearTimeout(toExit);
      clearTimeout(toDone);
    };
  }, [showIntro]);

  // Avoid a flash of content before we know whether it's already played.
  if (showIntro === null) return null;

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ backgroundColor: "#0a0a0a" }}
            animate={{ backgroundColor: phase === "exit" ? "#5ce1e6" : "#0a0a0a" }}
            exit={{ opacity: 0 }}
            transition={{
              backgroundColor: { duration: EXIT_SWEEP_DURATION / 1000, ease: "easeInOut" },
              opacity: { duration: EXIT_FADE_DURATION / 1000 },
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
          >
            {/* Loading bar */}
            <AnimatePresence>
              {phase === "bar" && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3"
                >
                  <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/20 sm:w-56">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: BAR_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
                      style={{ transformOrigin: "left" }}
                      className="h-full w-full bg-white"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wordmark — small and centered (not the full landing-page
                size, which appears later on the actual Hero), revealed
                with a left-to-right wipe mask. */}
            {phase !== "bar" && (
              <div className="flex items-center gap-4">
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: REVEAL_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
                  className="font-display block text-4xl font-bold text-white sm:text-6xl"
                >
                  {site.name.first}
                </motion.span>
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{
                    duration: REVEAL_DURATION / 1000,
                    delay: REVEAL_STAGGER / 1000,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="font-serif block text-4xl italic text-white sm:text-6xl"
                >
                  {site.name.last}
                </motion.span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!showIntro && children}
    </>
  );
}