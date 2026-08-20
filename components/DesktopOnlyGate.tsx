// components/DesktopOnlyGate.tsx
export default function DesktopOnlyGate() {
  return (
    <div className="fixed inset-0 z-[200] hidden md:hidden max-md:flex flex-col items-center justify-center gap-4 bg-black px-8 text-center">
      <h1 className="font-display text-2xl font-bold text-white">
        CHRIS<span className="text-accent">.</span>
      </h1>
      <p className="font-body max-w-xs text-sm text-white/70">
        This portfolio is best experienced on a larger screen.
        <br />
        Please open it on a desktop or laptop.
      </p>
    </div>
  );
}