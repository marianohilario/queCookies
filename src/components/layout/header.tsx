import Link from "next/link";
import { Brand } from "./brand";
import { MobileNav } from "./mobile-nav";
import { CartIndicator } from "@/features/cart/cart-indicator";

const links = [
  ["/cookies", "Cookies"], ["/cookies#minis", "Mini cookies"],
  ["/#como-pedir", "Cómo pedir"], ["/nosotros", "Contacto"],
] as const;

export function Header() {
  return (
    <header className="relative z-20 border-b border-brand/10 bg-cream">
      <div className="page-container flex h-22 items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <CartIndicator />
          <MobileNav links={links} />
        </div>
      </div>
    </header>
  );
}
