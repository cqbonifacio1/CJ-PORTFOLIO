// components/DesktopOnlyGate.tsx
export default function DesktopOnlyGate() {
  return (
    <>
      <style>{`
        @media (max-width: 1023px), (orientation: portrait) {
          #desktop-gate {
            display: flex !important;
          }
          #page-content {
            display: none !important;
          }
        }
      `}</style>
      <div
        id="desktop-gate"
        className="fixed inset-0 z-[9999] hidden flex-col items-center justify-center gap-4 bg-black px-8 text-center"
      >
        <h1 className="font-display text-2xl font-bold text-white">
          CHRIS<span className="text-accent">.</span>
        </h1>
        <p className="font-body max-w-xs text-sm text-white/70">
          This site is best viewed on a larger screen.
          <br />
          Please open it on a desktop/laptop, or a tablet in landscape.
        </p>
      </div>
    </>
  );
}