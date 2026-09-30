import Link from "next/link";
import { business, mapsUrl } from "@/config/business";
import { FooterSocialLinks } from "./footer-social-links";
import { Brand } from "./brand";
import { BrandPattern } from "@/components/brand/brand-motif";

export function Footer() {
  return (
    <footer className="bg-brand text-cream">
      <BrandPattern className="h-14 border-b border-yellow/20 text-yellow/35" />
      <div className="page-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand light classes="border-3 border-yellow rounded-full" />
          <p className="mt-5 max-w-55 text-sm leading-6 text-cream/80">
            Un antojo grande merece una cookie así.
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-semibold">Nos encontrás en</h2>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            {business.address}
          </a>
          <p className="mt-3 text-sm text-cream/80">{business.hoursLabel}</p>
        </div>
        <div>
          <h2 className="mb-4 font-semibold">Hablemos</h2>
          <FooterSocialLinks />
        </div>
        <div>
          <h2 className="mb-4 font-semibold">Antes de pedir</h2>
          <Link className="footer-link" href="/preguntas-frecuentes">
            Preguntas frecuentes
          </Link>
          <Link className="footer-link mt-3" href="/privacidad">
            Tus datos y privacidad
          </Link>
          <p className="mt-3 text-sm text-cream/80">
            Envíos a Lomas de Zamora, Lanús y Adrogué. Costo a confirmar.
          </p>
        </div>
      </div>
      <div className="page-container border-t border-cream/20 py-5 text-xs text-cream/75">
        © {new Date().getFullYear()} {business.name} · Banfield, Buenos Aires ·
        Hecha para tus antojos.
      </div>
    </footer>
  );
}
