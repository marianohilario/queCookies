import { business } from "../../config/business.ts";
import { products } from "../../data/catalog.ts";
import type { Product } from "../catalog/product.ts";

export type CartItem = { productId: string; quantity: number; lastPrice: number };
export type CartLine = CartItem & { product?: Product; amount: number; priceChanged: boolean };
export type CartSummary = {
  lines: CartLine[]; subtotal: number; articleCount: number;
  cookieCount: number; valid: boolean; issues: string[];
};

export const validQuantity = (value: number) => Number.isSafeInteger(value) && value > 0;

export function summarizeCart(items: CartItem[], catalog: Product[] = products): CartSummary {
  const issues: string[] = [];
  const lines = items.map((item): CartLine => {
    const product = catalog.find((entry) => entry.id === item.productId);
    const amount = product ? product.price * item.quantity : 0;
    if (!product?.available) issues.push("Quitá los productos no disponibles para continuar.");
    if (!validQuantity(item.quantity) || !Number.isSafeInteger(amount)) issues.push("Revisá las cantidades del carrito.");
    return { ...item, product, amount: product?.available ? amount : 0, priceChanged: !!product && product.price !== item.lastPrice };
  });
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const articleCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cookieCount = lines.reduce((sum, line) => sum + (line.product?.available ? line.quantity * line.product.cookiesPerItem : 0), 0);
  if (![subtotal, articleCount, cookieCount].every(Number.isSafeInteger)) issues.push("La cantidad es demasiado grande; consultanos por WhatsApp.");
  if (cookieCount < business.minimumCookies) issues.push(`El pedido mínimo es de ${business.minimumCookies} cookies. ¡Sumá una más para continuar!`);
  return { lines, subtotal, articleCount, cookieCount, valid: issues.length === 0, issues: [...new Set(issues)] };
}

export function addItem(items: CartItem[], product: Product, quantity: number): CartItem[] {
  if (!product.available || !validQuantity(quantity)) return items;
  const existing = items.find((item) => item.productId === product.id);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;
  if (!validQuantity(nextQuantity) || !Number.isSafeInteger(nextQuantity * product.price)) return items;
  if (!existing) return [...items, { productId: product.id, quantity, lastPrice: product.price }];
  return items.map((item) => item.productId === product.id ? { ...item, quantity: nextQuantity } : item);
}
