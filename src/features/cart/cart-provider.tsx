"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { findProduct } from "@/data/catalog";
import { addItem, summarizeCart, validQuantity } from "./cart";
import { useCartStorage } from "./use-cart-storage";

function useCartState() {
  const { items, setItems, ready, storageNotice } = useCartStorage();
  const [announcement, setAnnouncement] = useState("");
  const summary = useMemo(() => summarizeCart(items), [items]);

  function add(productId: string, quantity = 1) {
    const product = findProduct(productId);
    if (!ready || !product?.available || !validQuantity(quantity)) return;
    setItems((current) => addItem(current, product, quantity));
    setAnnouncement(
      `Agregaste ${quantity} ${product.kind === "pack" ? "pack(s) de " : ""}${product.name} al carrito.`,
    );
  }

  function setQuantity(productId: string, quantity: number) {
    if (!validQuantity(quantity)) return;
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  return {
    summary,
    ready,
    storageNotice,
    announcement,
    add,
    setQuantity,
    remove: (id: string) =>
      setItems((current) => current.filter((item) => item.productId !== id)),
    clear: () => setItems([]),
    acknowledgePrices: () =>
      setItems((current) =>
        current.map((item) => ({
          ...item,
          lastPrice: findProduct(item.productId)?.price ?? item.lastPrice,
        })),
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
