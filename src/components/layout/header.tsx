import Link from "next/link";
import { Brand } from "./brand";
import { Icon } from "../ui/icon";

const links = [ ["/cookies", "Cookies"], ["/cookies#minis", "Mini cookies"], ["/#como-pedir", "Cómo pedir"], ["/nosotros", "Contacto"] ];

export function Header() {
  return (
    <header className="relative z-20 border-b border-brand/10 bg-cream">
      <div className="page-container flex h-22 items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 text-sm font-medium md:flex">{links.map(([href, label]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <Link href="/cookies" aria-label="Elegir cookies" className="icon-button"><Icon name="bag" /></Link>
          <details className="group md:hidden">
            <summary className="icon-button list-none cursor-pointer" aria-label="Abrir navegación"><Icon name="menu" /></summary>
            <nav aria-label="Navegación móvil" className="absolute inset-x-0 top-full border-b border-brand/15 bg-cream p-5 shadow-lg">{links.map(([href, label]) => <Link key={href} href={href} className="block rounded-xl px-4 py-3 hover:bg-brand/5">{label}</Link>)}</nav>
          </details>
        </div>
      </div>
    </header>
  );
}
