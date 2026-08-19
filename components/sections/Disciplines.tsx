import VideoBackground from "@/components/VideoBackground";
import { disciplines } from "@/lib/content";

export default function Disciplines() {
  return (
    <section id="tech-stack" className="relative isolate w-full px-6 py-28 sm:px-14">
      <VideoBackground src="/videos/4disciplinespage.mp4" eager />

      <h2 className="font-display mb-14 text-5xl font-bold leading-tight text-white sm:text-7xl">
        Four <span className="font-serif italic">disciplines.</span> One{" "}
        <span className="font-serif italic">goal.</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {disciplines.map((d) => (
          <div key={d.index} className="glass-card relative flex flex-col overflow-hidden p-7 sm:p-8">
            {/* Optional glass.png texture, layered under the CSS blur/tint above.
                Drop the file at /public/images/glass.png to enable; if it's
                missing this <img> just renders nothing and the pure-CSS
                glassmorphism (blur + translucent fill) still applies. */}
            <img
              src="/images/glass.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-10"
            />
            <div className="mb-3 flex items-start justify-between">
              <h3 className="font-display text-2xl font-bold text-white sm:text-5xl">{d.name}</h3>
              <span className="font-display text-4xl font-bold text-white/30 sm:text-6xl">{d.index}</span>
            </div>
            <p className="font-body mb-6 text-sm text-white/80 sm:text-base">{d.description}</p>
            <div className="mt-auto flex flex-wrap justify-center gap-2">
              {d.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/40 px-3 py-1 font-mono text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
