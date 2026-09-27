import Link from "next/link";
import type { Product } from "./product";
import { ProductImage } from "./product-image";
import { formatMoney } from "@/lib/money";
import { Icon } from "@/components/ui/icon";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white">
      <Link href={`/cookies/${product.slug}`} aria-label={`Ver ${product.name}`}><ProductImage src={product.image} className="aspect-square transition-transform duration-500 group-hover:scale-[1.03]" /></Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/cookies/${product.slug}`}><h3 className="font-display text-xl leading-tight font-semibold text-brand">{product.name}</h3></Link>
        <p className="mt-2 hidden text-sm leading-6 text-muted sm:block">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5"><span className="font-semibold">{formatMoney(product.price)}</span><Link className="icon-button border border-brand/20 text-brand hover:bg-yellow" href={`/cookies/${product.slug}`} aria-label={`Elegir ${product.name}`}><Icon name="arrow" /></Link></div>
      </div>
    </article>
  );
}
