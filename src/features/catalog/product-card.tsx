import Link from "next/link";
import type { Product } from "./product";
import { CookiePortrait } from "./cookie-portrait";
import { formatMoney } from "@/lib/money";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-yellow/60 bg-cream transition-colors hover:border-brand/35">
      <Link href={`/cookies/${product.slug}`} aria-label={`Ver ${product.name}`}>
        <CookiePortrait product={product} />
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-3 sm:px-4 sm:pb-4">
        <p className="mb-2 text-[9px] text-muted">Imagen ilustrativa</p>
        <Link href={`/cookies/${product.slug}`}><h3 className="text-sm leading-snug font-semibold text-brand">{product.name}</h3></Link>
        <p className="mt-1.5 text-xs leading-5 text-muted">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <span className="text-sm font-semibold text-brand">{formatMoney(product.price)}</span>
          <QuickAdd id={product.id} name={product.name} available={product.available} />
        </div>
        {!product.available && <p className="mt-2 text-xs text-muted">No disponible</p>}
      </div>
    </article>
  );
}
