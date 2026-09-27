"use client";
import { useState } from "react";
import { business, contactUrl } from "@/config/business";
import { Button } from "@/components/ui/button";
import { prepareOrder } from "./order-message";

type Prepared = ReturnType<typeof prepareOrder>;
export function WhatsAppActions({ prepare, preview }: { prepare: () => Prepared; preview: string }) {
  const [feedback, setFeedback] = useState("");
  const [showManual, setShowManual] = useState(false);

  function openChat() {
    const order = prepare();
    if (!order.ok) return;
    if (order.url.length > 7500) {
      setShowManual(true);
      setFeedback("Tu pedido es extenso. Copiá el texto completo y pegalo en el chat del negocio.");
      return;
    }
    window.open(order.url, "_blank", "noopener,noreferrer");
    setFeedback("Si no se abrió WhatsApp, podés copiar tu pedido y abrir el contacto de abajo.");
  }

  async function copyOrder() {
    const order = prepare();
    if (!order.ok) return;
    try { await navigator.clipboard.writeText(order.text); setFeedback("Pedido copiado. Pegalo en el chat y enviá el mensaje."); }
    catch { setShowManual(true); setFeedback("Seleccioná el texto para copiarlo manualmente."); }
  }

  return (
    <div className="mt-7 space-y-4">
      <Button type="button" className="w-full" onClick={openChat}>Continuar por WhatsApp ↗</Button>
      <p className="text-xs leading-6 text-muted">Se abrirá el chat con tu pedido preparado. Enviá el mensaje para coordinar la confirmación y el pago.</p>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <button type="button" onClick={copyOrder} className="min-h-11 text-brand underline">Copiar pedido</button>
        <a href={contactUrl} target="_blank" rel="noreferrer" className="py-3 text-brand underline">Abrir contacto</a>
      </div>
      <p className="text-xs text-muted">{business.phoneLabel}</p>
      {feedback && <p role="status" className="text-sm leading-6 text-brand">{feedback}</p>}
      {showManual && preview && (
        <label className="block text-sm">
          Texto para copiar
          <textarea className="field mt-2 min-h-64" readOnly value={preview} onFocus={(event) => event.currentTarget.select()} />
        </label>
      )}
    </div>
  );
}
