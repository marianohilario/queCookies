import Image from "next/image";

export function ProductImage({ src, priority = false, className = "" }: { src: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#eadcc5] ${className}`}>
      <Image src={src} alt="Fotografía ilustrativa de cookies; no representa necesariamente el producto final" fill sizes="(max-width: 767px) 90vw, 50vw" preload={priority} className="object-cover" />
      <span className="absolute right-3 bottom-3 rounded-full bg-cream/95 px-2 py-1 text-[10px] text-ink">Imagen ilustrativa</span>
    </div>
  );
}
