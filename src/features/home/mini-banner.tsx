import { miniPacks, packSizesLabel } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BrandMotif, BrandPattern } from "@/components/brand/brand-motif";

export function MiniBanner() {
  return (
    <section className="page-container py-12 md:py-16">
      <div className="overflow-hidden rounded-2xl bg-yellow-soft text-brand">
        <BrandPattern className="h-8 text-brand/20" />
        <div className="flex flex-col items-center gap-7 px-6 py-7 text-center md:flex-row md:justify-between md:px-10 md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <BrandMotif name="hand" className="hidden h-24 w-18 md:block" />
            <div>
              <p className="eyebrow">Pequeñas, pero protagonistas</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">El mejor plan es compartir.</h2>
              <p className="mt-3 text-sm">Mini cookies en packs de {packSizesLabel} unidades.</p>
            </div>
          </div>
          <div className="shrink-0 text-center">
            <p className="mb-3 text-sm">Desde {formatMoney(miniPacks[0].price)}</p>
            <ButtonLink href="/cookies/mini-cookies">Elegí tu pack <Icon name="arrow" /></ButtonLink>
          </div>
        </div>
        <BrandPattern className="h-8 text-brand/20" />
      </div>
    </section>
  );
}
