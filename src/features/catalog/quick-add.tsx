"use client";
import { useCart } from "@/features/cart/cart-provider";
export function QuickAdd({ id, name, available }: { id: string; name: string; available: boolean }) {
  const { add, ready } = useCart();
  return <button className="icon-button border border-brand/20 text-brand hover:bg-yellow disabled:opacity-40" disabled={!ready || !available} onClick={() => add(id)} aria-label={`Agregar ${name} al carrito`}><span aria-hidden="true" className="text-xl">+</span></button>;
}
