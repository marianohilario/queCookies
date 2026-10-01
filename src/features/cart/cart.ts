import { business } from "../../config/business.ts";
import { products } from "../../data/catalog.ts";
import { isCompleteMix, packLineId, type PackMix } from "../catalog/pack-mix.ts";
import type { Product } from "../catalog/product.ts";

export type CartItem = { productId: string; quantity: number; lastPrice: number; mix?: PackMix };
export type CartLine = CartItem & { lineId: string; product?: Product; amount: number; priceChanged: boolean };
export type CartSummary = {
  lines: CartLine[]; subtotal: number; articleCount: number;
  cookieCount: number; valid: boolean; issues: string[];
};

export const validQuantity = (value: number) => Number.isSafeInteger(value) && value > 0;

export function lineIdOf(item: Pick<CartItem, "productId" | "mix">) {
  return packLineId(item.productId, item.mix);
}

export function summarizeCart(items: CartItem[], catalog: Product[] = products): CartSummary {
  const issues: string[] = [];
  const lines = items.map((item): CartLine => {
    const product = catalog.find((entry) => entry.id === item.productId);
    const packSize = product?.kind === "pack" ? product.cookiesPerItem : 0;
    if (product && packSize && !isCompleteMix(item.mix as PackMix, packSize))
      issues.push("Revisá la combinación de sabores de los packs de mini cookies.");
    const amount = product ? product.price * item.quantity : 0;
    if (!product?.available) issues.push("Quitá los productos no disponibles para continuar.");
    if (!validQuantity(item.quantity) || !Number.isSafeInteger(amount)) issues.push("Revisá las cantidades del carrito.");
    return { ...item, lineId: lineIdOf(item), product, amount: product?.available ? amount : 0, priceChanged: !!product && product.price !== item.lastPrice };
  });
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const articleCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cookieCount = lines.reduce((sum, line) => sum + (line.product?.available ? line.quantity * line.product.cookiesPerItem : 0), 0);
  if (![subtotal, articleCount, cookieCount].every(Number.isSafeInteger)) issues.push("La cantidad es demasiado grande; consultanos por WhatsApp.");
  if (cookieCount < business.minimumCookies) issues.push(`El pedido mínimo es de ${business.minimumCookies} cookies. ¡Sumá una más para continuar!`);
  return { lines, subtotal, articleCount, cookieCount, valid: issues.length === 0, issues: [...new Set(issues)] };
}

export function addItem(items: CartItem[], product: Product, quantity: number, mix?: PackMix): CartItem[] {
  if (!product.available || !validQuantity(quantity)) return items;
  if (product.kind === "pack" && !isCompleteMix(mix as PackMix, product.cookiesPerItem)) return items;
  const lineId = lineIdOf({ productId: product.id, mix });
  const existing = items.find((item) => lineIdOf(item) === lineId);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;
  if (!validQuantity(nextQuantity) || !Number.isSafeInteger(nextQuantity * product.price)) return items;
  if (!existing) return [...items, { productId: product.id, quantity, lastPrice: product.price, ...(mix ? { mix } : {}) }];
  return items.map((item) => (lineIdOf(item) === lineId ? { ...item, quantity: nextQuantity } : item));
}