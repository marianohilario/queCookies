import Link from "next/link";
import type { Product } from "./product";
import { ProductImage } from "./product-image";
import { formatMoney } from "@/lib/money";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white">
      <Link href={`/cookies/${product.slug}`} aria-label={`Ver ${product.name}`}>
        <ProductImage src={product.image} sizes="(max-width: 359px) 90vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, 280px" className="aspect-square transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/cookies/${product.slug}`}><h3 className="font-display text-xl leading-tight font-semibold text-brand">{product.name}</h3></Link>
        <p className="mt-2 hidden text-sm leading-6 text-muted sm:block">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
          <span className="font-semibold">{formatMoney(product.price)}</span>
          <QuickAdd id={product.id} name={product.name} available={product.available} />
        </div>
        {!product.available && <p className="mt-2 text-xs text-muted">No disponible</p>}
      </div>
    </article>
  );
}
