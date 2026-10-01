"use client";

import { useState } from "react";
import { findProduct, miniPacks } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCart } from "@/features/cart/cart-provider";
import { evenMix, isCompleteMix, type PackMix } from "./pack-mix";
import { PackMixSelector } from "./pack-mix-selector";

export function PurchaseControls({ productId }: { productId: string }) {
  const [selectedId, setSelectedId] = useState(productId);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add, ready } = useCart();
  const product = findProduct(selectedId);
  if (!product) return null;
  const unitLabel = product.kind === "pack" ? "packs" : "cookies";

  return product.kind === "pack" ? (
    <PackPurchase
      key={selectedId}
      product={product}
      quantity={quantity}
      added={added}
      ready={ready}
      onSelectPack={(id) => { setSelectedId(id); setAdded(false); }}
      onQuantity={(value) => { setQuantity(value); setAdded(false); }}
      onAdd={(mix) => { add(product.id, quantity, mix); setAdded(true); }}
    />
  ) : (
    <div className="mt-7 space-y-5">
      <p className="text-2xl font-semibold" aria-live="polite">{formatMoney(product.price)} <span className="text-sm font-normal text-muted">por cookie</span></p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm">Cantidad de {unitLabel}</span>
        <QuantitySelector value={quantity} onChange={(value) => { setQuantity(value); setAdded(false); }} label={unitLabel} />
      </div>
      <Button className="w-full" disabled={!ready || !product.available} onClick={() => { add(product.id, quantity); setAdded(true); }}>
        {product.available ? `Agregar al carrito · ${formatMoney(product.price * quantity)}` : "No disponible"}
      </Button>
      <p className="min-h-5 text-sm text-brand" role="status">{added ? "¡Ya está en tu carrito! Podés seguir eligiendo." : ""}</p>
    </div>
  );
}

type PackProps = {
  product: NonNullable<ReturnType<typeof findProduct>>;
  quantity: number;
  added: boolean;
  ready: boolean;
  onSelectPack: (id: string) => void;
  onQuantity: (value: number) => void;
  onAdd: (mix: PackMix) => void;
};

function PackPurchase({ product, quantity, added, ready, onSelectPack, onQuantity, onAdd }: PackProps) {
  const size = product.cookiesPerItem;
  const [mix, setMix] = useState<PackMix>(() => evenMix(size));
  const complete = isCompleteMix(mix, size);

  return (
    <div className="mt-7 space-y-5">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Elegí tu presentación</legend>
        <div className="grid grid-cols-2 gap-3">
          {miniPacks.map((pack) => (
            <label key={pack.id} className={`cursor-pointer rounded-xl border p-4 text-sm ${pack.id === product.id ? "border-brand bg-yellow/30" : "border-muted/40 bg-white"}`}>
              <input type="radio" name="pack-presentation" value={pack.id} checked={pack.id === product.id} onChange={() => onSelectPack(pack.id)} className="mr-2 accent-brand" />
              {pack.cookiesPerItem} unidades
              <span className="mt-2 block font-semibold">{formatMoney(pack.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <PackMixSelector size={size} mix={mix} onChange={setMix} />
      <p className="text-2xl font-semibold" aria-live="polite">{formatMoney(product.price)} <span className="text-sm font-normal text-muted">por pack</span></p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm">Cantidad de packs</span>
        <QuantitySelector value={quantity} onChange={onQuantity} label="packs" />
      </div>
      <Button className="w-full" disabled={!ready || !product.available || !complete} onClick={() => onAdd(mix)}>
        {product.available ? `Agregar pack · ${formatMoney(product.price * quantity)}` : "No disponible"}
      </Button>
      <p className="min-h-5 text-sm text-brand" role="status">{added ? "¡Ya está en tu carrito! Podés seguir eligiendo." : ""}</p>
    </div>
  );
}