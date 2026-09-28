export function WaveDivider({ edge, className = "" }: { edge: "top" | "bottom"; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-10 h-5 w-full text-cream md:h-10 ${edge === "top" ? "top-0 rotate-180" : "bottom-0"} ${className}`}
    >
      <path d="M0 40C175-5 300 75 510 42S780 14 970 43s325-20 470-4v41H0Z" fill="currentColor" />
    </svg>
  );
}
