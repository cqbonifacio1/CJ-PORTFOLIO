import type { Metadata } from "next";
import { Poppins, Playfair_Display, Inter, Roboto_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import SpinCursor from "@/components/SpinCursor";
import DesktopOnlyGate from "@/components/DesktopOnlyGate";

// Font notes:
// - Garet is not on Google Fonts (no free web-safe distribution). Substituting
//   Poppins Bold/ExtraBold, tuned with tighter tracking to approximate Garet's
//   geometric weight. Drop real Garet .woff2 files in /public/fonts and swap
//   this out for a next/font/local setup if you have a license.
// - Neue Montreal is also not freely distributable — substituting Inter,
//   the closest free neo-grotesque for body copy.
//
// IMPORTANT — fonts load via next/font/google again (not a runtime <link>
// tag). Two things this fixes:
//   1. The previous <link> URL was missing Montserrat entirely (only
//      Poppins/Playfair/Inter/Roboto Mono were requested) — that's why
//      font-title was silently falling back to the system sans-serif on
//      every platform, not just Mac.
//   2. A runtime <link> also depends on the VISITOR's own browser
//      successfully reaching fonts.gstatic.com live, every page load —
//      Safari on macOS is notably strict here (Intelligent Tracking
//      Prevention and related privacy settings can throttle/block
//      third-party font requests). next/font/google instead downloads the
//      font files once at BUILD time and serves them from your own
//      domain, so there's zero runtime dependency on Google's CDN at all.
//   The only reason next/font/google was avoided before was that the DEV
//   SERVER (running locally on Windows) couldn't reach fonts.gstatic.com
//   due to a local network/firewall issue. That's specific to local dev —
//   on Vercel, the build runs on Vercel's own servers with full internet
//   access, so it doesn't apply in production.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Chris Bonifacio — Portfolio",
  description: "Turning raw data into decisions that move business forward.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${inter.variable} ${robotoMono.variable} ${montserrat.variable}`}
    >
      <body className="bg-ink text-paper min-h-screen">
        {/* Blocks phones (portrait + landscape) and small/portrait tablets.
            Fully removes #page-content from layout on mobile via plain CSS
            media queries — see DesktopOnlyGate for the breakpoint logic. */}
        <DesktopOnlyGate />

        <div id="page-content">
          {children}
        </div>

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