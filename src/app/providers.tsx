"use client";
import { CartProvider } from "@/features/cart/cart-provider";
import { CheckoutProvider } from "@/features/checkout/checkout-provider";
export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider><CheckoutProvider>{children}</CheckoutProvider></CartProvider>;
}
