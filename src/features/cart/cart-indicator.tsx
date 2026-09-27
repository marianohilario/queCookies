"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./cart-provider";
import { Icon } from "@/components/ui/icon";
import { formatMoney } from "@/lib/money";

export function CartIndicator() {
  const { summary, ready } = useCart();
  return (
    <Link href="/carrito" aria-label={`Carrito, ${ready ? summary.articleCount : 0} artículos`} className="icon-button relative">
      <Icon name="bag" />
      {ready && summary.articleCount > 0 && (
        <span className="absolute -top-1 -right-1 rounded-full bg-brand px-1.5 py-0.5 text-[10px] text-cream">
          {summary.articleCount}
        </span>
      )}
    </Link>
  );
}

export function CartBar() {
  const { summary, ready } = useCart();
  const pathname = usePathname();
  if (!ready || !summary.articleCount || !pathname.startsWith("/cookies")) return null;
  return (
    <div className="h-24 md:hidden">
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand/15 bg-cream p-3 pb-[max(.75rem,env(safe-area-inset-bottom))]">
        <Link href="/carrito" className="button flex w-full flex-wrap justify-between bg-brand text-cream">
          <span>Ver carrito · {summary.articleCount} artículos</span>
          <span>{formatMoney(summary.subtotal)}</span>
        </Link>
      </div>
    </div>
  );
}
