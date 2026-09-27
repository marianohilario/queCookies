import type { Metadata } from "next";
import { CheckoutView } from "@/features/checkout/checkout-view";
export const metadata: Metadata = { title: "Completá tu pedido", robots: { index: false } };
export default function CheckoutPage() {
  return (
    <section className="page-container section-space">
      <div className="mx-auto max-w-2xl"><p className="eyebrow">Del antojo a tu mesa</p><h1 className="section-title mt-4">Armemos tu pedido.</h1><p className="mt-4 text-sm leading-7 text-muted">Sin cuenta y sin vueltas. Revisá tus datos y coordiná con nosotros por WhatsApp.</p></div>
      <CheckoutView />
    </section>
  );
}
