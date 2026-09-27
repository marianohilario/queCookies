"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { CartAlerts } from "./cart-alerts";
import { ProductImage } from "@/features/catalog/product-image";
import { Button, ButtonLink } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { OrderTotals } from "@/features/checkout/order-totals";
import { formatMoney } from "@/lib/money";

export function CartView() {
  const { summary, ready, setQuantity, remove, clear } = useCart();
  if (!ready) return <p role="status" className="py-12">Recuperando tu carrito…</p>;
  if (!summary.lines.length) return <div className="py-12"><h2 className="section-title">Tu próximo antojo empieza acá.</h2><p className="mt-5 text-muted">Elegí tus favoritas y volvé para armar tu pedido.</p><ButtonLink className="mt-7" href="/cookies">Ver cookies</ButtonLink></div>;

  return (
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <CartAlerts />
        <ul className="mt-4 divide-y divide-brand/15">
          {summary.lines.map((line) => (
            <li key={line.productId} className="flex gap-4 py-6">
              {line.product && <ProductImage src={line.product.image} sizes="96px" className="hidden size-24 shrink-0 rounded-xl sm:block" />}
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-semibold text-brand">{line.product?.name ?? "Producto no disponible"}</h2>
                <p className="mt-1 text-sm text-muted">{line.product ? `${formatMoney(line.product.price)} por ${line.product.kind === "pack" ? "pack" : "cookie"}` : "Este producto ya no está en la carta."}</p>
                {line.product?.kind === "pack" && <p className="mt-1 text-xs text-muted">{line.quantity} pack(s) · {line.quantity * line.product.cookiesPerItem} mini cookies</p>}
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <QuantitySelector value={line.quantity} onChange={(value) => setQuantity(line.productId, value)} label={line.product?.name ?? "producto"} />
                  <button className="min-h-11 text-sm text-muted underline underline-offset-4" onClick={() => remove(line.productId)}>Quitar</button>
                </div>
              </div>
              <span className="self-start text-sm font-semibold">{line.product?.available ? formatMoney(line.amount) : "No disponible"}</span>
            </li>
          ))}
        </ul>
        <button className="min-h-11 text-sm text-muted underline" onClick={clear}>Vaciar carrito</button>
      </div>
      <aside className="rounded-2xl border border-brand/15 bg-white p-6">
        <OrderTotals subtotal={summary.subtotal} />
        {summary.valid ? <ButtonLink href="/checkout" className="mt-6 w-full">Continuar con mi pedido</ButtonLink> : <Button className="mt-6 w-full" disabled>Continuar con mi pedido</Button>}
        <Link href="/cookies" className="mt-4 block py-2 text-center text-sm text-muted underline">Seguir eligiendo</Link>
      </aside>
    </div>
  );
}
