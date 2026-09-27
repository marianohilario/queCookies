"use client";
import { FormField } from "@/components/ui/form-field";
import { Notice } from "@/components/ui/notice";
import { useCheckout } from "./checkout-provider";
import { fieldLimits } from "./checkout";
import type { FieldErrors } from "./checkout";

export function ContactStep({ errors }: { errors: FieldErrors }) {
  const { draft, update, remember, setRemember, forget, profileNotice } = useCheckout();
  return (
    <div className="space-y-5">
      <FormField id="name" label="Nombre" autoComplete="name" required maxLength={fieldLimits.name} value={draft.name} onChange={(e) => update({ name: e.target.value })} error={errors.name} />
      <FormField id="phone" label="Teléfono con código de área" type="tel" autoComplete="tel" required maxLength={fieldLimits.phone} value={draft.phone} onChange={(e) => update({ phone: e.target.value })} error={errors.phone} />
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mt-1 size-5 shrink-0 accent-brand" />
        Recordar mis datos y domicilio en este dispositivo.
      </label>
      <p className="text-xs leading-6 text-muted">Solo en este navegador. Tus datos se incluirán en el mensaje al continuar por WhatsApp.</p>
      {remember && <button type="button" className="min-h-11 text-sm text-brand underline" onClick={forget}>Borrar mis datos guardados</button>}
      {profileNotice && <Notice>{profileNotice}</Notice>}
    </div>
  );
}
