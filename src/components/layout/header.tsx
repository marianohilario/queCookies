import Link from "next/link";
import { Brand } from "./brand";
import { CartIndicator } from "@/features/cart/cart-indicator";

const links = [
  ["/", "Inicio"], ["/cookies", "Cookies"], ["/cookies/mini-cookies", "Mini cookies"],
  ["/#como-pedir", "Cómo pedir"], ["/nosotros", "Contacto"],
] as const;

export function Header() {
  return (
    <header className="z-20 border-b border-brand/10 bg-cream md:sticky md:top-0">
      <div className="page-container flex h-(--header-height) items-center justify-center gap-4 md:justify-between">
        <Brand />
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <CartIndicator />
        </div>
      </div>
    </header>
  );
}
