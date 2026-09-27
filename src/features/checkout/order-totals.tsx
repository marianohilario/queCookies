import { formatMoney } from "@/lib/money";
export function OrderTotals({ subtotal, mode }: { subtotal: number; mode?: string }) {
  return (
    <dl className="space-y-4 text-sm">
      <div className="flex justify-between gap-3"><dt>Productos</dt><dd className="font-semibold">{formatMoney(subtotal)}</dd></div>
      {mode === "pickup" && <><div className="flex justify-between"><dt>Retiro</dt><dd>Sin cargo</dd></div><div className="flex justify-between border-t border-brand/15 pt-4 text-lg font-semibold"><dt>Total</dt><dd>{formatMoney(subtotal)}</dd></div></>}
      {mode === "delivery" && <><div className="flex justify-between"><dt>Envío</dt><dd>A confirmar</dd></div><div className="border-t border-brand/15 pt-4"><dt className="font-semibold">Total final</dt><dd className="mt-1 text-muted">Pendiente de cotizar el envío.</dd></div></>}
      {!mode && <div><dt className="sr-only">Entrega</dt><dd className="text-muted">Elegí retiro o envío al continuar.</dd></div>}
    </dl>
  );
}
