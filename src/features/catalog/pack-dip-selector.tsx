"use client";

import { dipFlavors, dipPrice } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { dipsAmount, formatPackDips, stepDips, type PackDips } from "./pack-dips";

type Props = {
  dips: PackDips;
  onChange: (dips: PackDips) => void;
};

export function PackDipSelector({ dips, onChange }: Props) {
  const extra = dipsAmount(dips);

  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 text-sm font-semibold">Sumale dips</legend>
      <p className="text-sm leading-6 text-muted">
        Cada dip suma {formatMoney(dipPrice)} al pack. Podés pedir todos los que
        quieras, de los dos sabores.
      </p>
      <div className="grid gap-2">
        {dipFlavors.map((dip) => (
          <div
            key={dip.slug}
            className="flex items-center justify-between gap-3 rounded-xl border border-muted/40 bg-white px-4 py-2"
          >
            <span className="text-sm">{dip.name}</span>
            <QuantitySelector
              value={dips[dip.slug]}
              onChange={(value) => onChange(stepDips(dips, dip.slug, value - dips[dip.slug]))}
              label={dip.name}
              min={0}
            />
          </div>
        ))}
      </div>
      {/* Altura reservada: el desglose crece con los pedidos y, al cambiar de alto, movía el botón de agregar. */}
      <p className="min-h-10 text-xs leading-5 text-muted">
        {extra
          ? `${formatPackDips(dips)}: suman ${formatMoney(extra)} por pack.`
          : "Sin dips, el pack conserva su precio de lista."}
      </p>
    </fieldset>
  );
}
