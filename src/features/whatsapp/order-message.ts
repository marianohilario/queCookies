import { business } from "../../config/business.ts";
import { formatMoney } from "../../lib/money.ts";
import { formatPackMix } from "../catalog/pack-mix.ts";
import { summarizeCart } from "../cart/cart.ts";
import type { CartItem } from "../cart/cart.ts";
import type { CheckoutDraft } from "../checkout/checkout.ts";
import { validateCheckout } from "../checkout/validation.ts";
import { composeTime } from "../checkout/time-slots.ts";

export function formatAddress(draft: CheckoutDraft) {
  return [
    `${draft.street.trim()} ${draft.noNumber ? "s/n" : draft.number.trim()}`,
    draft.unit.trim(), draft.locality.trim(), draft.zone.trim(),
  ].filter(Boolean).join(", ");
}

export function prepareOrder(items: CartItem[], draft: CheckoutDraft, now = new Date()) {
  const summary = summarizeCart(items);
  const errors = validateCheckout(draft, now);
  if (!summary.valid || Object.keys(errors).length) return { ok: false as const, summary, errors };
  const lines = summary.lines.flatMap((line) => {
    const product = line.product!;
    const unit = product.kind === "pack" ? `pack(s) de ${product.name} (${line.quantity * product.cookiesPerItem} mini cookies)` : product.name;
    const row = `• ${line.quantity} × ${unit} — ${formatMoney(product.price)} c/u — ${formatMoney(line.amount)}`;
    // Cada combinación es una línea propia del pedido: el negocio tiene que ver el detalle exacto.
    return line.mix ? [row, `   Sabores: ${formatPackMix(line.mix)}`] : [row];
  });
  const dateLabel = draft.date.split("-").reverse().join("/");
  const text = [
    `¡Hola, ${business.name}! 👋`, "Quiero solicitar este pedido:", "",
    "🍪 *Mi pedido*", ...lines, "", "💰 *Resumen*",
    `Subtotal de productos: ${formatMoney(summary.subtotal)}`,
    ...(draft.mode === "pickup"
      ? ["Retiro: sin cargo", `Total: ${formatMoney(summary.subtotal)}`]
      : ["Envío: a confirmar, a cargo del cliente", "Total final: pendiente de cotizar el envío"]),
    "", "👤 *Mis datos*", `Nombre: ${draft.name.trim()}`, `Teléfono: ${draft.phone.trim()}`, "",
    ...(draft.mode === "pickup"
      ? ["📍 *Retiro*", `Retiro en: ${business.address}`]
      : ["🚚 *Envío*", `Envío a: ${formatAddress(draft)}`, ...(draft.references.trim() ? [`Referencias: ${draft.references.trim()}`] : [])]),
    "", "📅 *Fecha y horario*", `Fecha preferida: ${dateLabel}`, `Horario preferido: ${composeTime(draft.hour, draft.minute)} h (sujeto a confirmación)`,
    ...(draft.notes.trim() ? ["", "📝 *Comentarios*", draft.notes.trim()] : []), "",
    "¿Me confirman disponibilidad, entrega, importe final si corresponde y cómo realizar el pago?",
  ].join("\n");
  // wa.me corrompe los emojis en su redirección; abrir el destino directamente.
  const url = `https://api.whatsapp.com/send/?phone=${business.whatsapp}&text=${encodeURIComponent(text)}`;
  return { ok: true as const, summary, errors, text, url };
}
