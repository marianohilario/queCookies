import Link from "next/link";
import { business, mapsUrl, shipping } from "@/config/business";
import { Brand } from "./brand";
import { BrandPattern } from "@/components/brand/brand-motif";
import { Icon } from "@/components/ui/icon";
import { FooterSocialLinks } from "./footer-social-links";

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
          <div className="mt-6 border-t border-yellow/20 pt-5">
            <p className="flex items-center gap-2 text-sm font-medium text-yellow">
              <Icon name="truck" className="size-5 shrink-0" />
              {shipping.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-cream/80">{shipping.summary}</p>
            <p className="mt-1 text-xs leading-5 text-cream/80">A tu cargo, confirmado por WhatsApp.</p>
          </div>
        </div>
      </div>
      <div className="page-container border-t border-cream/20 py-5 text-xs text-cream/75">
        © {new Date().getFullYear()} {business.name} · Banfield, Buenos Aires ·
        Hecha para tus antojos.
      </div>
    </footer>
  );
}
