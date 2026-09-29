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
      <div className={`page-container relative z-10 ${styles.content}`}>
        <div className="mx-auto text-center md:mx-0 md:w-[48%] md:text-left">
          <h1 className={`font-display font-semibold text-brand ${styles.title}`}>
            No son solo cookies, son momentos que importan.
          </h1>
          <p className="mx-auto mt-6 max-w-89 text-base leading-7 text-muted md:mx-0 md:max-w-100 lg:mt-7 lg:max-w-110 lg:text-lg lg:leading-8">
            Cookies estilo New York para hacer especial tu pausa.
            Elegí tus sabores favoritos y coordiná tu pedido para retirar o recibir en casa.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start lg:mt-9">
            <ButtonLink href="/cookies" className="gap-2 lg:min-h-14 lg:px-7 lg:text-base">
              Pedí tus cookies <Icon name="arrow" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/cookies#minis" variant="secondary" className="gap-2 lg:min-h-14 lg:px-7 lg:text-base">
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
