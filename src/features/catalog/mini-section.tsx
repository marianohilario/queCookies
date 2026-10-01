import Link from "next/link";
import { miniPacks, stockPhotos } from "@/data/catalog";
import { ProductImage } from "./product-image";
import { PurchaseControls } from "./purchase-controls";

export function MiniSection() {
  return (
    <section id="minis" className="page-container pb-18">
      <div className="grid gap-8 rounded-[2rem] border border-brand/15 bg-white p-5 sm:p-8 md:grid-cols-2">
        {/* Sin self-center la imagen se estira a la altura de la fila y queda muy alargada
            junto al selector; se acota a 1:1 como en la ficha del pack. */}
        <ProductImage src={stockPhotos.assortment} className="aspect-square self-center rounded-2xl" />
        <div>
          <p className="eyebrow">Pequeñas para compartir</p>
          <h2 className="section-title mt-3">Elegí tus minis.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Presentaciones de 12, 24, 48 o 96 unidades, siempre de tradicional,
            cacao y red velvet. Elegí cuántas de cada sabor y un solo pack ya
            cumple el mínimo de compra.
          </p>
          <PurchaseControls productId={miniPacks[0].id} />
          {/* La navegación móvil no incluye esta ficha, así que se deja un acceso desde la carta. */}
          <Link
            className="mt-5 inline-flex min-h-11 items-center py-2 text-sm text-muted underline underline-offset-4"
            href="/cookies/mini-cookies"
          >
            Ver la ficha completa de mini cookies
          </Link>
        </div>
      </div>
    </section>
  );
}
