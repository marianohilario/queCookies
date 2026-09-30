"use client";
import Link from "next/link";
import { business } from "@/config/business";
import { useCart } from "@/features/cart/cart-provider";
import { formatMoney } from "@/lib/money";
import { formatAddress } from "@/features/whatsapp/order-message";
import { useCheckout } from "./checkout-provider";
import { composeTime } from "./time-slots";
import { OrderTotals } from "./order-totals";

export function ReviewStep({ onEdit }: { onEdit: (step: number) => void }) {
  const { summary } = useCart();
  const { draft } = useCheckout();
  return (
    <div className="space-y-7">
      <section>
        <div className="flex items-center justify-between"><h3 className="font-semibold">Tu selección</h3><Link className="min-h-11 py-3 text-sm underline" href="/carrito">Editar</Link></div>
        <ul className="divide-y divide-brand/10">
          {summary.lines.map((line) => (
            <li key={line.productId} className="flex justify-between gap-4 py-3 text-sm">
              <div>{line.quantity} × {line.product?.name}
                <span className="mt-1 block text-xs text-muted">{formatMoney(line.product?.price ?? 0)} por {line.product?.kind === "pack" ? "pack" : "cookie"}</span>
                {line.product?.kind === "pack" && <span className="mt-1 block text-xs text-muted">{line.quantity} pack(s) · {line.quantity * line.product.cookiesPerItem} mini cookies</span>}
              </div>
              <span className="shrink-0 font-medium">{formatMoney(line.amount)}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-brand/15 pt-4">
        <div className="flex items-center justify-between"><h3 className="font-semibold">Contacto</h3><button type="button" className="min-h-11 text-sm underline" onClick={() => onEdit(0)}>Editar datos</button></div>
        <p className="text-sm leading-7">{draft.name}<br />{draft.phone}</p>
      </section>
      <section className="border-t border-brand/15 pt-4">
        <div className="flex items-center justify-between"><h3 className="font-semibold">{draft.mode === "pickup" ? "Retiro" : "Envío"}</h3><button type="button" className="min-h-11 text-sm underline" onClick={() => onEdit(1)}>Editar entrega</button></div>
        <p className="text-sm leading-7">{draft.mode === "pickup" ? business.address : formatAddress(draft)}</p>
        {draft.mode === "delivery" && draft.references && <p className="text-sm leading-7 text-muted">{draft.references}</p>}
        <p className="mt-2 text-sm">{draft.date.split("-").reverse().join("/")} · {composeTime(draft.hour, draft.minute)} h</p>
        <p className="mt-1 text-xs text-muted">Sujeto a confirmación del negocio.</p>
        {draft.notes && <p className="mt-4 whitespace-pre-wrap text-sm">Comentarios: {draft.notes}</p>}
      </section>
      <div className="rounded-xl bg-cream p-5"><OrderTotals subtotal={summary.subtotal} mode={draft.mode} /></div>
    </div>
  );
}
