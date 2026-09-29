import Link from "next/link";
import { featuredCookies } from "@/data/catalog";
import { ProductCard } from "@/features/catalog/product-card";
import { BrandMotif } from "@/components/brand/brand-motif";

export function Featured() {
  return (
    <section className="page-container pt-8 pb-10 md:pt-12 md:pb-14">
      <div className="mb-7 text-center md:mb-10">
        <div className="flex items-center justify-center gap-3 text-brand">
          <BrandMotif name="heart" className="size-3" />
          <h2 className="section-title">Nuestras cookies</h2>
          <BrandMotif name="heart" className="size-3" />
        </div>
        <p className="mt-3 text-base text-muted">Tu próxima favorita está acá.</p>
      </div>
      <div className="product-grid lg:grid-cols-5">
        {featuredCookies.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className="mt-4 text-right">
        <Link href="/cookies" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline decoration-brand/35 underline-offset-4 hover:decoration-brand">Ver toda la carta</Link>
      </div>
    </section>
  );
}
