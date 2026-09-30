"use client";
import { business } from "@/config/business";
import { FormField } from "@/components/ui/form-field";
import { Notice } from "@/components/ui/notice";
import { AddressFields } from "./address-fields";
import { useCheckout } from "./checkout-provider";
import { firstOrderDate } from "./validation";
import { TimeField } from "./time-field";
import { fieldLimits } from "./checkout";
import type { FieldErrors } from "./checkout";

export function DeliveryStep({ errors }: { errors: FieldErrors }) {
  const { draft, update } = useCheckout();
  return (
    <div className="space-y-6">
      <fieldset aria-describedby={errors.mode ? "mode-error" : undefined}>
        <legend className="mb-3 text-sm font-semibold">¿Cómo querés recibirlo?</legend>
        <div className="grid grid-cols-2 gap-3">
          {([ ["pickup", "Retiro"], ["delivery", "Envío"] ] as const).map(([mode, label]) => (
            <label key={mode} className={`cursor-pointer rounded-xl border p-4 ${draft.mode === mode ? "border-brand bg-yellow/30" : "border-muted/40"}`}>
              <input type="radio" name="mode" checked={draft.mode === mode} onChange={() => update({ mode })} className="mr-2 accent-brand" />{label}
            </label>
          ))}
        </div>
        {errors.mode && <p id="mode-error" className="mt-2 text-sm text-brand">{errors.mode}</p>}
      </fieldset>
      {draft.mode === "pickup" && <Notice><strong>{business.address}</strong><br />{business.hoursLabel} · Sin cargo.</Notice>}
      {draft.mode === "delivery" && <AddressFields errors={errors} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="date" label="Día preferido" type="date" min={firstOrderDate()} required value={draft.date} onChange={(e) => update({ date: e.target.value })} error={errors.date} />
        <TimeField hour={draft.hour} minute={draft.minute} onChange={update} error={errors.time} />
      </div>
      <p className="text-sm text-muted">{business.hoursLabel}. Fecha y horario sujetos a confirmación.</p>
      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium">Comentarios (opcional)</label>
        <textarea id="notes" className="field min-h-24" maxLength={fieldLimits.notes} value={draft.notes} onChange={(e) => update({ notes: e.target.value })} aria-invalid={!!errors.notes} aria-describedby="notes-help" />
        <p id="notes-help" className="mt-2 text-xs text-muted">{errors.notes ?? `${draft.notes.length}/${fieldLimits.notes} caracteres. Para consultas sobre ingredientes, escribinos antes de pedir.`}</p>
      </div>
    </div>
  );
}
