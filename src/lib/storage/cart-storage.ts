import { isPackMix, type PackMix } from "../../features/catalog/pack-mix.ts";
import { hasDips, isPackDips, type PackDips } from "../../features/catalog/pack-dips.ts";
import type { CartItem } from "../../features/cart/cart.ts";
import { lineIdOf, validQuantity } from "../../features/cart/cart.ts";

// Los dips de los packs pasaron a ser parte de la identidad de la línea, así que el formato guardado cambia.
export const CART_VERSION = 3;
export const CART_KEY = `quecookies:cart:v${CART_VERSION}`;

export function decodeCart(raw: string | null): CartItem[] {
  if (raw === null) return [];
  const stored: unknown = JSON.parse(raw);
  if (!stored || typeof stored !== "object" || !("version" in stored) || stored.version !== CART_VERSION || !("items" in stored) || !Array.isArray(stored.items)) throw new Error("Carrito incompatible");
  const seen = new Set<string>();
  return stored.items.map((item: unknown) => {
    if (!item || typeof item !== "object") throw new Error("Línea inválida");
    const value = item as CartItem;
    if (typeof value.productId !== "string" || !value.productId || !validQuantity(value.quantity) || !Number.isSafeInteger(value.lastPrice) || value.lastPrice < 0) throw new Error("Línea inválida");
    if (value.mix !== undefined && !isPackMix(value.mix)) throw new Error("Línea inválida");
    if (value.dips !== undefined && !isPackDips(value.dips)) throw new Error("Línea inválida");
    const clean: CartItem = { productId: value.productId, quantity: value.quantity, lastPrice: value.lastPrice, ...(value.mix ? { mix: value.mix as PackMix } : {}), ...(hasDips(value.dips) ? { dips: value.dips as PackDips } : {}) };
    if (seen.has(lineIdOf(clean))) throw new Error("Línea inválida");
    seen.add(lineIdOf(clean));
    return clean;
  });
}

export const encodeCart = (items: CartItem[]) => JSON.stringify({ version: CART_VERSION, items });