import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ProductImage } from "@/features/catalog/product-image";
import { stockPhotos } from "@/data/catalog";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="page-container grid items-center gap-10 pt-12 pb-16 md:grid-cols-2 md:gap-14 md:py-20">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-px w-8 bg-brand" /> Desde Banfield, con mucho antojo
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,6.1vw,5.3rem)] leading-[1.03] tracking-[-.055em] text-brand">
            No es solo<br />una cookie.<br /><span className="italic">Es tu momento.</span>
          </h1>
          <p className="mt-6 max-w-95 text-base leading-7 text-muted">
            Cookies estilo New York para hacer una pausa, compartir o darte ese gusto.
            Elegí las tuyas; nosotros te esperamos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/cookies">Pedí tus cookies <Icon name="arrow" /></ButtonLink>
            <ButtonLink href="/cookies#minis" variant="secondary">Descubrí las minis</ButtonLink>
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs font-medium text-muted">
            <Icon name="pin" className="size-4" /> Retiro en Banfield · Envíos a coordinar
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-135">
          <div className="absolute -inset-5 rotate-6 rounded-[45%_45%_25%_40%] bg-yellow/35" />
          <ProductImage src={stockPhotos.cookies} priority className="aspect-[5/5.5] rounded-[45%_45%_22%_22%]" />
          <div className="absolute -top-2 right-0 flex size-25 rotate-12 flex-col items-center justify-center rounded-full border-4 border-cream bg-brand text-center text-xs font-semibold uppercase tracking-wider text-yellow sm:-right-3">
            <Icon name="heart" className="mb-1 size-5" />Un pequeño<br />gran gusto
          </div>
          <span className="absolute bottom-8 -left-3 rounded-full bg-yellow px-5 py-3 font-display text-lg font-semibold text-brand shadow-sm">
            El antojo tiene nombre.
          </span>
        </div>
      </div>
      <div className="border-y border-brand/10 bg-yellow/35 py-4">
        <div className="page-container flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-semibold tracking-wide text-brand">
          <span>✦ COOKIES ESTILO NEW YORK</span><span>✦ MINIS PARA COMPARTIR</span>
          <span>✦ TODOS LOS DÍAS, DE 9 A 19 H</span>
        </div>
      </div>
    </section>
  );
}
