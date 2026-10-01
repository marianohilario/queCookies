import { miniPacks, stockPhotos } from "@/data/catalog";
import { ProductImage } from "./product-image";
import { PurchaseControls } from "./purchase-controls";

export function MiniSection() {
  return (
    <section id="minis" className="page-container pb-18">
      <div className="grid gap-8 rounded-[2rem] border border-brand/15 bg-white p-5 sm:p-8 md:grid-cols-2">
        <ProductImage src={stockPhotos.assortment} className="min-h-64 rounded-2xl" />
        <div>
          <p className="eyebrow">Pequeñas para compartir</p>
          <h2 className="section-title mt-3">Elegí tus minis.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Presentaciones de 12, 24, 48 o 96 unidades, siempre de tradicional,
            cacao y red velvet. Elegí cuántas de cada sabor y un solo pack ya
            cumple el mínimo de compra.
          </p>
          <PurchaseControls productId={miniPacks[0].id} />
        </div>
      </div>
    </section>
  );
}
