import type { Metadata } from "next";
import Link from "next/link";
import { individualCookies } from "@/data/catalog";
import { ProductCard } from "@/features/catalog/product-card";
import { MiniSection } from "@/features/catalog/mini-section";
import { business } from "@/config/business";

export const metadata: Metadata = { title: "Nuestra carta", description: "Conocé nuestros sabores y packs de mini cookies. Elegí tu próximo antojo en Banfield." };

export default function CatalogPage() {
  return (
    <>
      <section className="page-container section-space">
        <p className="eyebrow">La parte difícil es elegir</p>
        <h1 className="section-title mt-4">Seguí tu antojo.</h1>
        <p className="mt-5 max-w-xl leading-7 text-muted">
          Combiná tus sabores favoritos. El mínimo es de {business.minimumCookies} cookies; un pack de minis también cumple el mínimo.
        </p>
        <nav aria-label="Categorías" className="mt-6 flex gap-3">
          <a className="button bg-brand text-cream" href="#cookies">Cookies</a>
          <Link className="button border border-brand/30 text-brand" href="#minis">Mini cookies ↓</Link>
        </nav>
        <div id="cookies" className="product-grid mt-10">
          {individualCookies.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <MiniSection />
    </>
  );
}
