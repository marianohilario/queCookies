"use client";
import { Notice } from "@/components/ui/notice";
import { useCart } from "./cart-provider";

export function CartAlerts() {
  const { summary, storageNotice, acknowledgePrices } = useCart();
  return (
    <div className="space-y-3">
      {storageNotice && <Notice>{storageNotice}</Notice>}
      {summary.issues.map((issue) => <Notice key={issue}>{issue}</Notice>)}
      {summary.lines.some((line) => line.priceChanged) && (
        <Notice>Actualizamos los precios de tu selección. Los importes que ves son los vigentes.<button type="button" onClick={acknowledgePrices} className="ml-2 min-h-11 font-semibold underline">Entendido</button></Notice>
      )}
    </div>
  );
}
