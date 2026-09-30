import { miniPacks, packSizesLabel } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BrandMotif, BrandPattern } from "@/components/brand/brand-motif";
import styles from "./mini-banner.module.css";

export function MiniBanner() {
  return (
    <section className="page-container py-12 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-yellow-soft text-brand">
        <BrandPattern className={`${styles.horizontal} top-2 text-brand/20`} />
        <BrandPattern
          className={`${styles.horizontal} ${styles.bottom} bottom-2 text-brand/20`}
        />
        <BrandPattern className={`${styles.vertical} left-2 text-brand/20`} />
        <BrandPattern
          className={`${styles.vertical} ${styles.vertica_right} right-2 text-brand/20`}
        />
        <div className="relative flex flex-col items-center gap-7 px-12 py-16 text-center md:flex-row md:justify-between md:px-16 md:py-20 md:text-left lg:px-20">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col items-center justify-center">
              <BrandMotif
                name="heart"
                className="hidden h-12 w-11 mr-3 md:block"
              />
              <BrandMotif name="hand" className="hidden h-24 w-18 md:block" />
            </div>
            <div>
              <p className="eyebrow">Pequeñas, pero protagonistas</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                El mejor plan es compartir.
              </h2>
              <p className="mt-3 text-sm">
                Mini cookies en packs de {packSizesLabel} unidades.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-center">
            <p className="mb-3 text-sm">
              Desde {formatMoney(miniPacks[0].price)}
            </p>
            <ButtonLink href="/cookies/mini-cookies">
              Elegí tu pack <Icon name="arrow" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
