import Image from "next/image";
import type { Product } from "./product";

export function CookiePortrait({ product }: { product: Product }) {
  return (
    <div className="flex h-34 items-center justify-center px-3 pt-1">
      <Image
        src={product.cardImage ?? product.image}
        alt={`Ilustración de cookie para ${product.name}; no es una foto del producto real`}
        width={156}
        height={137}
        sizes="140px"
        className="h-30 w-36 max-w-full object-contain drop-shadow-[0_7px_5px_#5a351326] transition-transform duration-300 group-hover:-translate-y-1 sm:h-32 sm:w-38"
      />
    </div>
  );
}
