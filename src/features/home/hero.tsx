import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BrandMotif } from "@/components/brand/brand-motif";
import { WaveDivider } from "@/components/brand/wave-divider";
import { HeroPhoto } from "./hero-photo";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={`relative isolate overflow-hidden ${styles.surface}`}>
      <WaveDivider edge="top" />
      <div className="page-container relative z-10 pt-10 pb-4 md:py-12 lg:py-14">
        <div className="mx-auto text-center md:mx-0 md:w-[46%] md:text-left">
          <h1 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-.035em] text-brand">
            <span className="block font-semibold">No son solo cookies,</span>
            <span className="block italic">son momentos</span>
            <span className="block italic">que importan.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-89 text-sm leading-6 text-muted md:mx-0 md:max-w-96">
            Cookies estilo New York para hacer especial tu pausa.
            Elegí tus sabores favoritos y coordiná tu pedido para retirar o recibir en casa.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <ButtonLink href="/cookies" className="gap-2 px-5 text-xs">
              Pedí tus cookies <Icon name="arrow" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/cookies#minis" variant="secondary" className="gap-2 px-5 text-xs">
              Mini cookies <BrandMotif name="cookie" className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
      <HeroPhoto />
      <WaveDivider edge="bottom" />
    </section>
  );
}
