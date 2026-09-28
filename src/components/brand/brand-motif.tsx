type MotifName = "hand" | "heart" | "cookie";

export function BrandMotif({ name, className = "size-12" }: { name: MotifName; className?: string }) {
  const image = `url('/brand/motifs/${name}.png')`;
  return (
    <span
      aria-hidden="true"
      className={`brand-motif ${className}`}
      style={{ maskImage: image, WebkitMaskImage: image }}
    />
  );
}

export function BrandPattern({ className = "h-12" }: { className?: string }) {
  return <div aria-hidden="true" className={`brand-pattern ${className}`} />;
}
