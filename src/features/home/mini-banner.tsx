import { ProductImage } from "@/features/catalog/product-image";
import { stockPhotos, miniPacks } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function MiniBanner() {
  return (
    <section className="page-container pb-18">
      <div className="grid overflow-hidden rounded-[2rem] bg-brand text-cream md:grid-cols-2">
        <ProductImage src={stockPhotos.assortment} className="min-h-72 md:min-h-100" />
        <div className="flex flex-col items-start justify-center p-7 sm:p-12">
          <p className="eyebrow text-yellow">Pequeñas, pero protagonistas</p>
          <h2 className="section-title mt-4 text-cream">El mejor plan<br />es compartir.</h2>
          <p className="mt-5 max-w-80 leading-7 text-cream/85">
            Mini cookies en packs de 12, 24, 48 o 96.
            Para la mesa, la merienda o ese encuentro que se alarga.
          </p>
          <p className="mt-4 text-sm text-yellow">Packs desde {formatMoney(miniPacks[0].price)}</p>
          <ButtonLink href="/cookies/mini-cookies" variant="light" className="mt-7">
            Elegí tu pack <Icon name="arrow" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
