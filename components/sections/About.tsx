"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "@/components/VideoBackground";
import AsciiReveal from "@/components/AsciiReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textARef = useRef<HTMLDivElement>(null);
  const textBRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states — autoAlpha also toggles visibility:hidden,
      // so a faded-out block can't be clicked/selected while invisible.
      gsap.set(photoRef.current, { filter: "blur(20px)", autoAlpha: 0 });
      gsap.set(textARef.current, { filter: "blur(20px)", autoAlpha: 0 });
      gsap.set(textBRef.current, { autoAlpha: 0, y: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.6,
          pin: true,
        },
      });

      // 1. Photo + Text A blur-reveal in together
      tl.to([photoRef.current, textARef.current], {
        filter: "blur(0px)",
        autoAlpha: 1,
        duration: 1,
        ease: "none",
      }, 0);

      // 2. Hold Text A on screen (first scroll "stop")
      tl.to({}, { duration: 1.2 });

      // 3. Text A fully fades out FIRST — no overlap
      tl.to(textARef.current, {
        autoAlpha: 0,
        y: -60,
        duration: 1,
        ease: "power1.inOut",
      });

      // 4. THEN Text B fades in — starts only once A has finished
      //    (no position param = plays right after the previous tween ends)
      tl.to(textBRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power1.inOut",
      });

      // 5. Hold Text B (second scroll "stop")
      tl.to({}, { duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative isolate h-screen w-full overflow-hidden px-16">
      <VideoBackground src="/videos/whatibuiltpage.mp4" eager />
      <span className="absolute bottom-10 left-16 font-mono text-sm text-white/60">(20)</span>

      <div ref={photoRef} className="absolute bottom--35 right-34 h-[125vh] w-auto max-w-[45vw] aspect-[1142/1599]">
        <AsciiReveal image={{ src: "/images/about/mypicture.png", alt: "Chris Bonifacio" }} />
      </div>

      {/* Text A */}
      <div ref={textARef} className="absolute left-16 top-1/2 max-w-2xl -translate-y-1/2">
        <h2 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.15] text-white">
          As a <span className="font-serif text-accent italic">data scientist</span> and{" "}
          <span className="font-serif text-accent italic">data analyst</span>, I build <br /> end-to-end solutions
          <br />
          that turn <span className="font-serif text-accent italic">complex</span> datasets into clear,{" "}
          <span className="whitespace-nowrap">
            <span className="font-serif text-accent italic">actionable</span> intelligence
          </span>
          .
        </h2>
      </div>

      {/* Text B */}
      <div ref={textBRef} className="absolute left-46 top-45 max-w-xl -translate-y-1/2">
        <h2 className="relative -left-36 font-serif mb-5 text-[clamp(5.5rem,4.5vw,4rem)] italic leading-none text-white">
          Hi, I&rsquo;m <span className="text-accent not-italic">CJ</span>
        </h2>

        <p className="font-body text-[clamp(1.8rem,1.3vw,1.35rem)] leading-relaxed text-white/90">
          A <span className="text-accent">Magna Cum Laude</span> CS graduate from the University of the
          Philippines Manila. I craft solutions at the intersection of{" "}
          <span className="text-accent">machine learning</span>,{" "}
          <span className="text-accent">business intelligence</span>, and{" "}
          <span className="text-accent">web development</span>. I turn domain complexity into tools people
          actually use.
        </p>
      </div>
    </section>
  );
}