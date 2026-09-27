"use client";

import { useEffect, useRef, useState } from "react";
import { CART_KEY, decodeCart, encodeCart } from "@/lib/storage/cart-storage";
import type { CartItem } from "./cart";

export function useCartStorage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  const storageFailed = useRef(false);

  useEffect(() => {
    function restore() {
      if (storageFailed.current) return;
      try {
        const incoming = decodeCart(localStorage.getItem(CART_KEY));
        setItems((current) => encodeCart(current) === encodeCart(incoming) ? current : incoming);
      } catch {
        storageFailed.current = true;
        setStorageNotice("No pudimos recuperar o guardar el carrito. Podés continuar, pero esta selección puede no conservarse al cerrar.");
      }
    }
    restore();
    setReady(true);
    const sync = (event: StorageEvent) => { if (event.key === CART_KEY || event.key === null) restore(); };
    window.addEventListener("storage", sync);
    window.addEventListener("focus", restore);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", restore);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(CART_KEY, encodeCart(items)); }
    catch {
      storageFailed.current = true;
      setStorageNotice("No podemos guardar el carrito en este navegador. Podés continuar con tu selección actual.");
    }
  }, [items, ready]);

  return { items, setItems, ready, storageNotice };
}
