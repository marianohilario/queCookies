"use client";
import Link from "next/link";
import type { Product } from "./product";
import { CookiePortrait } from "./cookie-portrait";
import { formatMoney } from "@/lib/money";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCart } from "../cart/cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { summary, ready, add, setQuantity, remove } = useCart();
  const cartLine = summary.lines.find((line) => line.lineId === product.id);
  const quantity = cartLine?.quantity ?? 0;

  function changeQuantity(value: number) {
    if (!ready || !product.available) return;
    if (value === 0) {
      remove(product.id);
    } else if (quantity === 0) {
      add(product.id, value);
    } else {
      setQuantity(product.id, value);
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white/45 transition-colors hover:border-brand/35">
      <Link
        href={`/cookies/${product.slug}`}
        aria-label={`Ver ${product.name}`}
        className="mb-4"
      >
        <CookiePortrait product={product} />
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-4 sm:px-4 lg:px-5 lg:pb-5">
        <Link href={`/cookies/${product.slug}`}>
          <h3 className="text-base leading-snug font-semibold tracking-tight text-brand lg:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-xs leading-5 text-muted lg:text-sm lg:leading-6">
          {product.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          <span className="text-base font-semibold text-brand">
            {formatMoney(product.price)}
          </span>
          <QuantitySelector
            value={quantity}
            onChange={changeQuantity}
            label={product.name}
            min={0}
            disabled={!ready || !product.available}
          />
        </div>
        {!product.available && (
          <p className="mt-2 text-xs text-muted">No disponible</p>
        )}
      </div>
    </article>
  );
}
