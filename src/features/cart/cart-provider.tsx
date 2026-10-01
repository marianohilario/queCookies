"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { findProduct } from "@/data/catalog";
import type { PackMix } from "@/features/catalog/pack-mix";
import type { PackDips } from "@/features/catalog/pack-dips";
import { formatPackDips, hasDips } from "@/features/catalog/pack-dips";
import { addItem, lineIdOf, summarizeCart, unitPrice, validQuantity } from "./cart";
import { useCartStorage } from "./use-cart-storage";

function useCartState() {
  const { items, setItems, ready, storageNotice } = useCartStorage();
  const [announcement, setAnnouncement] = useState("");
  const summary = useMemo(() => summarizeCart(items), [items]);

  function addToCart(productId: string, quantity = 1, mix?: PackMix, dips?: PackDips) {
    const product = findProduct(productId);
    if (!ready || !product?.available || !validQuantity(quantity)) return;
    setItems((current) => addItem(current, product, quantity, mix, dips));
    setAnnouncement(
      `Agregaste ${quantity} ${product.kind === "pack" ? "pack(s) de " : ""}${product.name} al carrito.${hasDips(dips) ? ` Con ${formatPackDips(dips!)}.` : ""}`,
    );
  }

  function setQuantity(lineId: string, quantity: number) {
    if (!validQuantity(quantity)) return;
    setItems((current) =>
      current.map((item) =>
        lineIdOf(item) === lineId ? { ...item, quantity } : item,
      ),
    );
  }

  return {
    summary,
    ready,
    storageNotice,
    announcement,
    add: addToCart,
    setQuantity,
    remove: (lineId: string) =>
      setItems((current) => current.filter((item) => lineIdOf(item) !== lineId)),
    clear: () => setItems([]),
    acknowledgePrices: () =>
      setItems((current) =>
        current.map((item) => {
          const product = findProduct(item.productId);
          return product ? { ...item, lastPrice: unitPrice(product, item) } : item;
        }),
      ),
  };
}

const CartContext = createContext<ReturnType<typeof useCartState> | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const value = useCartState();
  return (
    <CartContext.Provider value={value}>
      {children}
      <p role="status" className="sr-only">
        {value.announcement}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart requiere CartProvider");
  return context;
}
