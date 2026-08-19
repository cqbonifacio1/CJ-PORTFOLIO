import DitherReveal from "@/components/DitherReveal";
import { site } from "@/lib/content";

export default function Ending() {
  return (
    <section
      id="contact"
      className="relative isolate flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-10 sm:px-14"
    >
      {/* Full-screen vertical dither background. The wrapper is sized to
          100vw/100vh with width & height swapped, then rotated 90deg so
          that once rotated it snaps back to exactly cover the viewport —
          the hands render vertically instead of as a horizontal band.
          DitherReveal's rotate={90} prop corrects its internal mouse
          tracking to match this same CSS rotation — keep the two in sync
          if you ever change one (see the note in DitherReveal.tsx). */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <div className="absolute left-1/2 top-1/2 h-[100vw] w-[100vh] -translate-x-1/2 -translate-y-1/2 rotate-90">
          <DitherReveal
            rotate={90}
            ditherStyle="bayer8"
            dotSize={5}
            revealRadius={140}
            revealSoftness={55}
            wave
            waveSpeed={70}
            waveDensity={22}
          />
        </div>
      </div>

      {/* Subtle darkening so the nav/name text stays readable over the
          dither pattern — remove if contrast is already fine. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/30" />

      <div className="font-body flex items-start justify-between text-lg font-semibold text-white">
        <div>
          <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
          <p className="mt-1 text-white/60">© {site.year}</p>
        </div>
        <div className="hidden flex-col gap-1 text-center sm:flex sm:translate-x-24 lg:translate-x-32">
          <a href={site.links.github} className="hover:text-accent">GITHUB</a>
          <a href={site.links.linkedin} className="hover:text-accent">LINKEDIN</a>
          <a href={site.links.indeed} className="hover:text-accent">INDEED</a>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <a href="/#about" className="hover:text-accent">ABOUT</a>
          <a href="/#work" className="hover:text-accent">WORK</a>
          <a href="/#projects" className="hover:text-accent">PROJECTS</a>
        </div>
      </div>

      <div className="flex w-full items-end justify-center gap-6">
        <h2 className="font-display text-[clamp(5rem,11vw,11rem)] font-bold leading-none text-white">
          {site.name.first}
        </h2>
        <h2 className="font-serif text-[clamp(5rem,11vw,11rem)] italic leading-none text-white">
          {site.name.last.replace(/\.$/, "")}
          <span className="text-accent">.</span>
        </h2>
      </div>
    </section>
  );
}