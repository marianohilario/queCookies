import Image from "next/image";

type Props = { src: string; priority?: boolean; className?: string; sizes?: string };
export function ProductImage({ src, priority = false, className = "", sizes = "(max-width: 767px) 90vw, 50vw" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#eadcc5] ${className}`}>
      <Image src={src} alt="Fotografía ilustrativa de cookies; no representa necesariamente el producto final" fill sizes={sizes} preload={priority} className="object-cover" />
      <span className="absolute bottom-3 left-1/2 w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-full bg-cream/95 px-2 py-1 text-center text-[10px] text-ink">Imagen ilustrativa</span>
    </div>
  );
}
