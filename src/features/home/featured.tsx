import Link from "next/link";
import { individualCookies } from "@/data/catalog";
import { ProductCard } from "@/features/catalog/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Featured() {
  return (
    <section className="page-container section-space">
      <SectionHeading eyebrow="Una pausa que vale la pena" title="¿Cuál te tienta hoy?">
        <Link href="/cookies" className="text-sm font-semibold text-brand underline underline-offset-5">
          Ver toda la carta ↗
        </Link>
      </SectionHeading>
      <div className="product-grid">
        {individualCookies.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
