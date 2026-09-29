import { business, contactUrl } from "../../config/business.ts";
import { formatMoney } from "../../lib/money.ts";
import { summarizeCart } from "../cart/cart.ts";
import type { CartItem } from "../cart/cart.ts";
import type { CheckoutDraft } from "../checkout/checkout.ts";
import { validateCheckout } from "../checkout/validation.ts";

export function formatAddress(draft: CheckoutDraft) {
  return [
    `${draft.street.trim()} ${draft.noNumber ? "s/n" : draft.number.trim()}`,
    draft.unit.trim(), draft.locality.trim(), draft.zone,
  ].filter(Boolean).join(", ");
}

export function prepareOrder(items: CartItem[], draft: CheckoutDraft, now = new Date()) {
  const summary = summarizeCart(items);
  const errors = validateCheckout(draft, now);
  if (!summary.valid || Object.keys(errors).length) return { ok: false as const, summary, errors };
  const lines = summary.lines.map((line) => {
    const product = line.product!;
    const unit = product.kind === "pack" ? `pack(s) de ${product.name} (${line.quantity * product.cookiesPerItem} mini cookies)` : product.name;
    return `• ${line.quantity} × ${unit} — ${formatMoney(product.price)} c/u — ${formatMoney(line.amount)}`;
  });
  const dateLabel = draft.date.split("-").reverse().join("/");
  const text = [
    `¡Hola, ${business.name}! 👋`, "Quiero solicitar este pedido:", "",
    "🍪 *Mi pedido*", ...lines, "", "💰 *Resumen*",
    `Subtotal de productos: ${formatMoney(summary.subtotal)}`,
    ...(draft.mode === "pickup"
      ? ["Retiro: sin cargo", `Total: ${formatMoney(summary.subtotal)}`]
      : ["Envío: a confirmar", "Total final: pendiente de cotizar el envío"]),
    "", "👤 *Mis datos*", `Nombre: ${draft.name.trim()}`, `Teléfono: ${draft.phone.trim()}`, "",
    ...(draft.mode === "pickup"
      ? ["📍 *Retiro*", `Retiro en: ${business.address}`]
      : ["🚚 *Envío*", `Envío a: ${formatAddress(draft)}`, ...(draft.references.trim() ? [`Referencias: ${draft.references.trim()}`] : [])]),
    "", "📅 *Fecha y horario*", `Fecha preferida: ${dateLabel}`, `Horario preferido: ${draft.time} h (sujeto a confirmación)`,
    ...(draft.notes.trim() ? ["", "📝 *Comentarios*", draft.notes.trim()] : []), "",
    "¿Me confirman disponibilidad, entrega, importe final si corresponde y cómo realizar el pago?",
  ].join("\n");
  return { ok: true as const, summary, errors, text, url: `${contactUrl}?text=${encodeURIComponent(text)}` };
}
