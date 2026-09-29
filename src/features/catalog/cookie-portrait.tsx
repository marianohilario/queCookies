import Image from "next/image";
import type { Product } from "./product";

export function CookiePortrait({ product }: { product: Product }) {
  return (
    <div className="flex h-36 items-center justify-center px-3 pt-2 lg:h-48 xl:h-52">
      <Image
        src={product.cardImage ?? product.image}
        alt={`Ilustración de cookie para ${product.name}; no es una foto del producto real`}
        width={156}
        height={137}
        sizes="(min-width: 1024px) 208px, 152px"
        className="h-30 w-36 max-w-full object-contain drop-shadow-[0_7px_5px_#5a351326] sm:h-32 sm:w-38 lg:h-44 lg:w-52"
      />
    </div>
  );
}
