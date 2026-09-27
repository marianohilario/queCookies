import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findBySlug, products, miniPacks } from "@/data/catalog";
import { ProductImage } from "@/features/catalog/product-image";
import { formatMoney } from "@/lib/money";
import { ButtonLink } from "@/components/ui/button";
import { contactUrl } from "@/config/business";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return [...new Set(products.map((p) => p.slug))].map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findBySlug((await params).slug);
  return { title: product?.kind === "pack" ? "Mini cookies" : product?.name ?? "Cookie no encontrada" };
}

export default async function ProductPage({ params }: Props) {
  const product = findBySlug((await params).slug);
  if (!product) notFound();
  return <section className="page-container section-space"><Link className="text-sm text-muted underline underline-offset-4" href="/cookies">← Volver a la carta</Link><div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16"><ProductImage src={product.image} priority className="aspect-square rounded-[2rem]" /><div className="self-center"><p className="eyebrow">Tu próximo momento dulce</p><h1 className="section-title mt-4">{product.kind === "pack" ? "Mini cookies" : product.name}</h1><p className="mt-5 leading-7 text-muted">{product.description}</p><p className="mt-6 text-2xl font-semibold">{product.kind === "pack" && "Desde "}{formatMoney(product.price)}</p>{product.kind === "pack" && <ul className="mt-5 grid grid-cols-2 gap-3">{miniPacks.map((pack) => <li key={pack.id} className="rounded-xl border border-brand/20 p-3 text-sm">{pack.cookiesPerItem} unidades <strong className="mt-1 block">{formatMoney(pack.price)}</strong></li>)}</ul>}<ButtonLink href={contactUrl} target="_blank" rel="noreferrer" className="mt-8">Consultar por este sabor</ButtonLink><div className="mt-8 border-t border-brand/15 pt-6"><h2 className="font-semibold">Ingredientes y alérgenos</h2><p className="mt-2 text-sm leading-6 text-muted">Estamos completando las fichas de cada sabor. Consultanos los ingredientes, alérgenos y posibles trazas antes de pedir.</p></div></div></div></section>;
}
