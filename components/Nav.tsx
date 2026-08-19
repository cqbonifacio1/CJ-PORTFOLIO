"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// Always route to "/" + hash, never a bare hash — a bare "#about" from a
// project detail page (e.g. /projects/predictor) resolves to
// /projects/predictor#about, which doesn't exist. "/#about" always lands
// on the home page's About section regardless of what page you're on.
const NAV_LINKS = [
  { label: "ABOUT", href: "/#about" },
  { label: "WORK", href: "/#work" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "TECH STACK", href: "/#tech-stack" },
];

/**
 * Persistent nav bar. Starts elongated (full-width pill) on the landing
 * page, compacts on scroll, and expands into a full overlay menu when the
 * hamburger is clicked. Links + hamburger sit grouped together near the
 * right edge of the pill (not spread across the full width).
 */
export default function Nav({ startElongated = false }: { startElongated?: boolean }) {
  const [scrolled, setScrolled] = useState(!startElongated);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!startElongated) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startElongated]);

  const compact = scrolled && !menuOpen;

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          width: compact ? 220 : "min(96vw, 1600px)",
          paddingLeft: compact ? 26 : 40,
          paddingRight: compact ? 26 : 40,
          paddingTop: compact ? 14 : 20,
          paddingBottom: compact ? 14 : 20,
        }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="nav-pill fixed left-1/2 top-8 z-50 flex -translate-x-1/2 items-center justify-between shadow-lg"
      >
        <span className="font-display text-lg font-bold tracking-wide whitespace-nowrap">PORTFOLIO</span>

        {/* Links + hamburger grouped together, pushed toward the right edge */}
        <div className="flex items-center gap-8">
          {!compact && (
            <div className="hidden items-center gap-8 font-body text-base font-semibold sm:flex">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="tracking-wide hover:opacity-60">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-[4px] p-1"
          >
            <span className="h-[2.5px] w-6 bg-black" />
            <span className="h-[2.5px] w-6 bg-black" />
            <span className="h-[2.5px] w-6 bg-black" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95"
            onClick={() => setMenuOpen(false)}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link href={link.href} className="font-display text-4xl font-bold text-white">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
