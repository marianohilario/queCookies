import type { CartItem } from "../../features/cart/cart.ts";
import { validQuantity } from "../../features/cart/cart.ts";

export const CART_KEY = "quecookies:cart:v1";

export function decodeCart(raw: string | null): CartItem[] {
  if (raw === null) return [];
  const stored: unknown = JSON.parse(raw);
  if (!stored || typeof stored !== "object" || !("version" in stored) || stored.version !== 1 || !("items" in stored) || !Array.isArray(stored.items)) throw new Error("Carrito incompatible");
  const seen = new Set<string>();
  return stored.items.map((item: unknown) => {
    if (!item || typeof item !== "object") throw new Error("Línea inválida");
    const value = item as CartItem;
    if (typeof value.productId !== "string" || !value.productId || seen.has(value.productId) || !validQuantity(value.quantity) || !Number.isSafeInteger(value.lastPrice) || value.lastPrice < 0) throw new Error("Línea inválida");
    seen.add(value.productId);
    return { productId: value.productId, quantity: value.quantity, lastPrice: value.lastPrice };
  });
}

export const encodeCart = (items: CartItem[]) => JSON.stringify({ version: 1, items });
