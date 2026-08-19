import type { Metadata } from "next";
import "./globals.css";
import SpinCursor from "@/components/SpinCursor";

// Font notes:
// - Garet is not on Google Fonts (no free web-safe distribution). Substituting
//   Poppins Bold/ExtraBold, tuned with tighter tracking to approximate Garet's
//   geometric weight. Drop real Garet .woff2 files in /public/fonts and swap
//   this out for local @font-face rules if you have a license.
// - Neue Montreal is also not freely distributable — substituting Inter,
//   the closest free neo-grotesque for body copy.
//
// IMPORTANT: fonts are now loaded via standard <link> tags to Google's CDN
// instead of next/font/google. next/font/google needs the Next.js dev
// server itself to reach fonts.gstatic.com while it's building — if your
// network (firewall, antivirus, VPN, ISP hiccup) blocks that mid-session,
// the whole page 500s, exactly what you hit. A plain <link> tag makes the
// *browser* fetch the font CSS/files at runtime instead, like any normal
// website — a blocked or slow font request just means Times New Roman
// shows briefly, never a crashed page. See README section 0 for details.
export const metadata: Metadata = {
  title: "Chris Bonifacio — Portfolio",
  description: "Turning raw data into decisions that move business forward.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400;500&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-paper min-h-screen">
        {children}
        {/* Custom cursor — mounted globally as a fixed full-screen overlay,
            replaces the Fluid Trail per CJ's latest round. Blue to match
            the site's sky-blue accent. */}
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <SpinCursor fillColor="#5CE1E6" cursorSize={40} enableStretch label={false} enableGlow glowColor="#5CE1E6" glowIntensity={45} />
        </div>
      </body>
    </html>
  );
}
