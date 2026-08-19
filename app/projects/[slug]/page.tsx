import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import VideoBackground from "@/components/VideoBackground";
import PrivacyNote from "@/components/PrivacyNote";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  // Projects 4–6 are Ayala Land Inc. work — images are lightly blurred for
  // data-privacy reasons, with an eye icon that explains why.
  const blurClass = project.blurred ? "blur-[3px]" : "";

  return (
    <>
      <Nav />
      <main className="relative isolate min-h-screen w-full px-16 pb-24 pt-32">
        <VideoBackground src={project.video} eager />

        {project.blurred && <PrivacyNote />}

        {/* Grid restructured so the thumbnail's top aligns with "← BACK" —
            both the back link and the thumbnail are the first row of their
            respective grid columns, instead of the thumbnail starting
            further down alongside the title. */}
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-start">
          <div>
            <Link href="/#projects" className="font-body mb-4 inline-block text-sm font-semibold text-white hover:text-accent">
              ← BACK
            </Link>

            <p className="font-mono text-accent mb-3 text-xs tracking-wide">
              [{project.index}] {project.tags.join(" · ").toUpperCase()}
            </p>

            <h1 className="font-title text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              {project.title.split(": ")[0]}:{" "}
              <span className="text-accent">{project.title.split(": ").slice(1).join(": ")}</span>
            </h1>
            <p className="font-body mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {project.description}
            </p>
          </div>
          {/* Hero preview uses the project's thumbnail image, not the first
              showcase shot, per CJ. */}
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/15 bg-black/40">
            <img
              src={project.thumbnail}
              alt={`${project.name} preview`}
              className={`h-full w-full object-cover ${blurClass}`}
            />
          </div>
        </div>

        <div className="my-10 grid grid-cols-2 gap-6 border-y border-white/15 py-6 font-mono text-xs sm:grid-cols-4">
          {[
            ["COURSE", project.course],
            ["FIELD", project.field],
            ["RECOGNITION", project.recognition],
            ["TECH STACK", project.techStack],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-1 tracking-wide text-white/50">{label}</p>
              <p className="text-accent">{value}</p>
            </div>
          ))}
        </div>

        <p className="font-mono text-accent mb-4 text-xs tracking-wide">[{project.index}.2] SHOWCASE</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.showcase.map((src, i) => (
            <div key={src} className="aspect-[16/9] overflow-hidden rounded-md border border-white/15 bg-black/40">
              <img
                src={src}
                alt={`${project.name} showcase ${i + 1}`}
                className={`h-full w-full object-cover ${blurClass}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Link href="/#projects" className="font-body text-sm font-semibold text-white hover:text-accent">
            ← BACK
          </Link>
          {project.hasMoreProjectsLink && (
            <Link href="/#projects" className="font-body text-sm font-semibold text-white hover:text-accent">
              MORE PROJECTS →
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
