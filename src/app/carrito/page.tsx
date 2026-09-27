import type { Metadata } from "next";
import { CartView } from "@/features/cart/cart-view";
export const metadata: Metadata = { title: "Tu carrito", robots: { index: false } };
export default function CartPage() {
  return <section className="page-container section-space"><p className="eyebrow">Ya falta menos</p><h1 className="section-title mt-4">Tu carrito.</h1><CartView /></section>;
}
