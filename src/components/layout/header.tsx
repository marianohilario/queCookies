import Link from "next/link";
import { Brand } from "./brand";
import { CartIndicator } from "@/features/cart/cart-indicator";

const links = [
  ["/cookies", "Cookies"], ["/cookies#minis", "Mini cookies"],
  ["/#como-pedir", "Cómo pedir"], ["/nosotros", "Contacto"],
] as const;

export function Header() {
  return (
    <header className="relative z-20 border-b border-brand/10 bg-cream">
      <div className="page-container flex h-20 items-center justify-center gap-4 md:h-22 md:justify-between">
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
