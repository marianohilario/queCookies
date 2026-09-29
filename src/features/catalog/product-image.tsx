import Image from "next/image";

type Props = { src: string; priority?: boolean; className?: string; sizes?: string };
export function ProductImage({ src, priority = false, className = "", sizes = "(max-width: 767px) 90vw, 50vw" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#eadcc5] ${className}`}>
      <Image src={src} alt="Fotografía ilustrativa de cookies; no representa necesariamente el producto final" fill sizes={sizes} preload={priority} className="object-cover" />
    </div>
  );
}
