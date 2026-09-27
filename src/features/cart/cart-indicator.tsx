"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { Icon } from "@/components/ui/icon";
import { CartCount } from "./cart-count";

export function CartIndicator() {
  const { summary, ready } = useCart();
  return (
    <Link href="/carrito" aria-label={`Carrito, ${ready ? summary.articleCount : 0} artículos`} className="icon-button relative">
      <Icon name="bag" />
      <CartCount count={ready ? summary.articleCount : 0} />
    </Link>
  );
}
