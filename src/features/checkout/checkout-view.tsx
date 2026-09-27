"use client";
import { useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-provider";
import { CartAlerts } from "@/features/cart/cart-alerts";
import { WhatsAppActions } from "@/features/whatsapp/whatsapp-actions";
import { prepareOrder } from "@/features/whatsapp/order-message";
import { ContactStep } from "./contact-step";
import { DeliveryStep } from "./delivery-step";
import { ReviewStep } from "./review-step";
import { useCheckout } from "./checkout-provider";
import { validateCheckout, validateContact } from "./validation";
import type { FieldErrors } from "./checkout";

const titles = ["Tus datos", "Entrega", "Revisá tu pedido"];

export function CheckoutView() {
  const cart = useCart();
  const checkout = useCheckout();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);

  function editStep(value: number) {
    setStep(value);
    setErrors({});
    requestAnimationFrame(() => heading.current?.focus());
  }

  function showErrors(next: FieldErrors) {
    setErrors(next);
    requestAnimationFrame(() => errorSummary.current?.focus());
  }

  function advance(event: React.FormEvent) {
    event.preventDefault();
    const next = step === 0 ? validateContact(checkout.draft) : validateCheckout(checkout.draft);
    if (Object.keys(next).length) { showErrors(next); return; }
    editStep(Math.min(step + 1, 2));
  }

  function prepare() {
    const result = prepareOrder(cart.summary.lines, checkout.draft);
    if (!result.ok) {
      if (result.errors.name || result.errors.phone) setStep(0);
      else if (Object.keys(result.errors).length) setStep(1);
      showErrors(result.errors);
    }
    return result;
  }

  if (!cart.ready || !checkout.ready) return <p role="status" className="py-10">Preparando tu pedido…</p>;
  if (!cart.summary.valid) return <div className="mt-8 space-y-5"><CartAlerts /><ButtonLink href="/carrito">Revisar carrito</ButtonLink></div>;
  const preview = step === 2 ? prepareOrder(cart.summary.lines, checkout.draft) : null;

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <ol aria-label="Pasos del pedido" className="mb-8 grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {titles.map((title, index) => <li key={title} aria-current={index === step ? "step" : undefined} className={`border-b-2 pb-3 ${index === step ? "border-brand font-semibold text-brand" : "border-brand/15 text-muted"}`}>{index + 1}. {title}</li>)}
      </ol>
      <CartAlerts />
      <form noValidate onSubmit={advance} className="mt-5 rounded-2xl border border-brand/15 bg-white p-5 sm:p-8">
        <h2 ref={heading} tabIndex={-1} className="mb-7 font-display text-3xl font-semibold text-brand">{titles[step]}</h2>
        {Object.keys(errors).length > 0 && (
          <div ref={errorSummary} tabIndex={-1} role="alert" className="mb-6 rounded-xl border border-brand/30 bg-cream p-4 text-sm">
            <p className="font-semibold">Revisá estos datos:</p>
            <ul className="mt-2 list-inside list-disc">
              {Object.values(errors).map((message, index) => <li key={index}>{message}</li>)}
            </ul>
          </div>
        )}
        {step === 0 && <ContactStep errors={errors} />}
        {step === 1 && <DeliveryStep errors={errors} />}
        {step === 2 && (
          <>
            <ReviewStep onEdit={editStep} />
            <WhatsAppActions prepare={prepare} preview={preview?.ok ? preview.text : ""} />
          </>
        )}
        <div className="mt-7 flex flex-wrap justify-between gap-3">
          {step > 0 ? <Button type="button" variant="secondary" onClick={() => editStep(step - 1)}>Volver</Button> : <ButtonLink variant="secondary" href="/carrito">Volver al carrito</ButtonLink>}
          {step < 2 && <Button type="submit">{step === 0 ? "Elegir entrega" : "Revisar pedido"} →</Button>}
        </div>
      </form>
    </div>
  );
}
