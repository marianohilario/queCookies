import Image from "next/image";
import { BrandMotif } from "@/components/brand/brand-motif";
import styles from "./hero.module.css";

export function HeroPhoto() {
  return (
    <div className="relative h-72 min-[390px]:h-80 md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[57%]">
      <div className={`absolute inset-0 ${styles.photo}`}>
        <Image
          src="/images/hero-cookies.jpg"
          alt="Imagen ilustrativa de un plato con cuatro cookies, chocolate y pistachos, proporcionada por Que Cookies"
          fill
          preload
          sizes="(max-width: 767px) 100vw, 57vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute top-2 right-5 z-10 flex size-22 rotate-8 flex-col items-center justify-center rounded-full border-3 border-brand bg-brand p-2 text-center text-[11px] leading-3 font-medium text-yellow md:top-13 md:right-10 lg:size-28 lg:text-sm lg:leading-4">
        <div className="absolute top-0 z-11 rounded-full min-h-26.5 w-26.5 border-2 border-yellow" />
        <BrandMotif name="heart" className="mr-2 h-4 w-3" />
        <BrandMotif name="hand" className="mb-1 h-7 w-6" />
        Tu momento
        <br />
        más dulce
      </div>
    </div>
  );
}
