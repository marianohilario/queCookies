export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-3">{title}</h2></div>
      {children}
    </div>
  );
}
