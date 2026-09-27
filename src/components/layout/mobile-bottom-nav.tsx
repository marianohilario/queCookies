"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileDestinations, isDestinationActive } from "@/config/navigation";
import { useCart } from "@/features/cart/cart-provider";
import { CartCount } from "@/features/cart/cart-count";
import { Icon } from "../ui/icon";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { summary, ready } = useCart();
  const count = ready ? summary.articleCount : 0;

  return (
    <nav aria-label="Navegación móvil" className="mobile-bottom-nav bg-brand text-cream md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 px-2">
        {mobileDestinations.map((destination) => {
          const active = isDestinationActive(pathname, destination);
          return (
            <Link
              key={destination.href}
              href={destination.href}
              aria-current={active ? pathname === destination.href ? "page" : "location" : undefined}
              aria-label={destination.href === "/carrito" ? `Carrito, ${count} artículos` : undefined}
              className={`flex min-h-[var(--mobile-nav-content-height)] min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] transition-colors ${active ? "font-semibold text-yellow" : "text-cream/90 hover:text-yellow"}`}
            >
              <span className={`relative flex h-8 w-13 items-center justify-center rounded-full ${active ? "bg-yellow/15 ring-1 ring-inset ring-yellow/40" : ""}`}>
                <Icon name={destination.icon} className="size-[22px]" />
                {destination.href === "/carrito" && <CartCount count={count} tone="brand" />}
              </span>
              <span>{destination.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
