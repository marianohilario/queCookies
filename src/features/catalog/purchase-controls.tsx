"use client";

import { useState } from "react";
import { findProduct, miniPacks } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCart } from "@/features/cart/cart-provider";

export function PurchaseControls({ productId }: { productId: string }) {
  const [selectedId, setSelectedId] = useState(productId);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add, ready } = useCart();
  const product = findProduct(selectedId);
  if (!product) return null;
  const unitLabel = product.kind === "pack" ? "packs" : "cookies";

  return (
    <div className="mt-7 space-y-5">
      {product.kind === "pack" && (
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Elegí tu presentación</legend>
          <div className="grid grid-cols-2 gap-3">
            {miniPacks.map((pack) => (
              <label key={pack.id} className={`cursor-pointer rounded-xl border p-4 text-sm ${selectedId === pack.id ? "border-brand bg-yellow/30" : "border-muted/40 bg-white"}`}>
                <input type="radio" name={`pack-${productId}`} value={pack.id} checked={selectedId === pack.id} onChange={() => { setSelectedId(pack.id); setAdded(false); }} className="mr-2 accent-brand" />
                {pack.cookiesPerItem} unidades
                <span className="mt-2 block font-semibold">{formatMoney(pack.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <p className="text-2xl font-semibold" aria-live="polite">{formatMoney(product.price)} <span className="text-sm font-normal text-muted">por {product.kind === "pack" ? "pack" : "cookie"}</span></p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm">Cantidad de {unitLabel}</span>
        <QuantitySelector value={quantity} onChange={(value) => { setQuantity(value); setAdded(false); }} label={unitLabel} />
      </div>
      <Button className="w-full" disabled={!ready || !product.available} onClick={() => { add(product.id, quantity); setAdded(true); }}>
        {product.available ? `Agregar ${product.kind === "pack" ? "pack" : "al carrito"} · ${formatMoney(product.price * quantity)}` : "No disponible"}
      </Button>
      <p className="min-h-5 text-sm text-brand" role="status">{added ? "¡Ya está en tu carrito! Podés seguir eligiendo." : ""}</p>
    </div>
  );
}
