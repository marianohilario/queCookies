import { business } from "../../config/business.ts";
import { products } from "../../data/catalog.ts";
import { isCompleteMix, mixLineId, type PackMix } from "../catalog/pack-mix.ts";
import {
  dipsAmount,
  dipsLineId,
  hasDips,
  type PackDips,
} from "../catalog/pack-dips.ts";
import type { Product } from "../catalog/product.ts";

export type CartItem = {
  productId: string;
  quantity: number;
  lastPrice: number;
  mix?: PackMix;
  dips?: PackDips;
};
export type CartLine = CartItem & { lineId: string; product?: Product; amount: number; priceChanged: boolean };
export type CartSummary = {
  lines: CartLine[]; subtotal: number; articleCount: number;
  cookieCount: number; valid: boolean; issues: string[];
};

export const validQuantity = (value: number) => Number.isSafeInteger(value) && value > 0;

// El precio de venta de una unidad: el del pack más los dips que lo acompañan.
export const unitPrice = (product: Product, item: Pick<CartItem, "dips">) =>
  product.price + (product.kind === "pack" && item.dips ? dipsAmount(item.dips) : 0);

// La combinación de sabores y los dips chosen son parte de la identidad de la línea:
// dos packs iguales con distinta combinación o distinto extra son líneas separadas.
export function lineIdOf(item: Pick<CartItem, "productId" | "mix" | "dips">) {
  const parts = [item.productId];
  if (item.mix) parts.push(mixLineId(item.mix));
  if (hasDips(item.dips)) parts.push(dipsLineId(item.dips!));
  return parts.join("#");
}

export function summarizeCart(items: CartItem[], catalog: Product[] = products): CartSummary {
  const issues: string[] = [];
  const lines = items.map((item): CartLine => {
    const product = catalog.find((entry) => entry.id === item.productId);
    const packSize = product?.kind === "pack" ? product.cookiesPerItem : 0;
    if (product && packSize && !isCompleteMix(item.mix as PackMix, packSize))
      issues.push("Revisá la combinación de sabores de los packs de mini cookies.");
    // Los dips son un extra de los packs: si llegan en otra línea no son comprables.
    if (item.dips && !packSize) issues.push("Quitá los dips de los productos que no son packs.");
    const price = product ? unitPrice(product, item) : 0;
    const amount = price * item.quantity;
    if (!product?.available) issues.push("Quitá los productos no disponibles para continuar.");
    if (!validQuantity(item.quantity) || !Number.isSafeInteger(amount)) issues.push("Revisá las cantidades del carrito.");
    return { ...item, lineId: lineIdOf(item), product, amount: product?.available ? amount : 0, priceChanged: !!product && price !== item.lastPrice };
  });
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const articleCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cookieCount = lines.reduce((sum, line) => sum + (line.product?.available ? line.quantity * line.product.cookiesPerItem : 0), 0);
  if (![subtotal, articleCount, cookieCount].every(Number.isSafeInteger)) issues.push("La cantidad es demasiado grande; consultanos por WhatsApp.");
  if (cookieCount < business.minimumCookies) issues.push(`El pedido mínimo es de ${business.minimumCookies} cookies. ¡Sumá una más para continuar!`);
  return { lines, subtotal, articleCount, cookieCount, valid: issues.length === 0, issues: [...new Set(issues)] };
}

export function addItem(items: CartItem[], product: Product, quantity: number, mix?: PackMix, dips?: PackDips): CartItem[] {
  if (!product.available || !validQuantity(quantity)) return items;
  if (product.kind === "pack" && !isCompleteMix(mix as PackMix, product.cookiesPerItem)) return items;
  const lineId = lineIdOf({ productId: product.id, mix, dips });
  const existing = items.find((item) => lineIdOf(item) === lineId);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;
  const price = unitPrice(product, { dips });
  if (!validQuantity(nextQuantity) || !Number.isSafeInteger(nextQuantity * price)) return items;
  if (!existing) return [...items, { productId: product.id, quantity, lastPrice: price, ...(mix ? { mix } : {}), ...(hasDips(dips) ? { dips } : {}) }];
  return items.map((item) => (lineIdOf(item) === lineId ? { ...item, quantity: nextQuantity } : item));
}
