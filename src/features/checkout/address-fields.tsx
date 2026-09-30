"use client";
import { FormField } from "@/components/ui/form-field";
import { shipping } from "@/config/business";
import { useCheckout } from "./checkout-provider";
import { fieldLimits } from "./checkout";
import type { FieldErrors } from "./checkout";

export function AddressFields({ errors }: { errors: FieldErrors }) {
  const { draft, update } = useCheckout();
  return (
    <div className="space-y-5">
      <FormField id="zone" label="Provincia / región" autoComplete="address-level1" placeholder="Ej.: Buenos Aires" required maxLength={fieldLimits.zone} value={draft.zone} onChange={(e) => update({ zone: e.target.value })} error={errors.zone} />
      <FormField id="locality" label="Localidad" autoComplete="address-level2" required maxLength={fieldLimits.locality} value={draft.locality} onChange={(e) => update({ locality: e.target.value })} error={errors.locality} />
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <FormField id="street" label="Calle" autoComplete="address-line1" required maxLength={fieldLimits.street} value={draft.street} onChange={(e) => update({ street: e.target.value })} error={errors.street} />
        <FormField id="number" label="Número" required={!draft.noNumber} disabled={draft.noNumber} maxLength={fieldLimits.number} value={draft.number} onChange={(e) => update({ number: e.target.value })} error={errors.number} />
      </div>
      <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={draft.noNumber} onChange={(e) => update({ noNumber: e.target.checked })} className="size-5 accent-brand" />Mi dirección no tiene número.</label>
      <FormField id="unit" label="Piso / departamento (opcional)" autoComplete="address-line2" maxLength={fieldLimits.unit} value={draft.unit} onChange={(e) => update({ unit: e.target.value })} error={errors.unit} />
      <FormField id="references" label="Referencias de entrega (opcional)" maxLength={fieldLimits.references} value={draft.references} onChange={(e) => update({ references: e.target.value })} error={errors.references} />
      <p className="text-sm leading-6 text-muted">{shipping.description}</p>
    </div>
  );
}
