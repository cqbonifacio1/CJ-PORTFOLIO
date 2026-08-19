"use client";

import { useState } from "react";

/** Eye icon + popover explaining why a project's images are blurred. */
export default function PrivacyNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-6 top-28 z-40">
      <button
        aria-label="Why are these images blurred?"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm hover:border-accent hover:text-accent"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      {open && (
        <div className="font-body absolute right-0 top-12 w-72 rounded-lg border border-white/20 bg-black/90 p-4 text-sm leading-relaxed text-white shadow-xl backdrop-blur-sm">
          This project was completed for Ayala Land Inc. To respect their data privacy, the images on this
          page have been blurred.
        </div>
      )}
    </div>
  );
}
