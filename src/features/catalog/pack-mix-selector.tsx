"use client";

import { miniFlavors } from "@/data/catalog";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import {
  evenMix,
  formatPackMix,
  isCompleteMix,
  mixTotal,
  stepMix,
  type PackMix,
} from "./pack-mix";

type Props = {
  size: number;
  mix: PackMix;
  onChange: (mix: PackMix) => void;
};

export function PackMixSelector({ size, mix, onChange }: Props) {
  const remaining = size - mixTotal(mix);
  const complete = isCompleteMix(mix, size);

  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 text-sm font-semibold">Armá tu combinación</legend>
      <p className="text-sm leading-6 text-muted">
        Los packs se arman con tradicional, cacao y red velvet. Vos decidí
        cuántas de cada sabor.
      </p>
      <div className="grid gap-2">
        {miniFlavors.map((flavor) => (
          <div
            key={flavor.slug}
            className="flex items-center justify-between gap-3 rounded-xl border border-muted/40 bg-white px-4 py-2"
          >
            <span className="text-sm">{flavor.name}</span>
            <QuantitySelector
              value={mix[flavor.slug]}
              onChange={(value) => onChange(stepMix(mix, flavor.slug, value - mix[flavor.slug], size))}
              label={`${flavor.name} en el pack`}
              min={0}
            />
          </div>
        ))}
      </div>
      {/* Estas dos líneas se reservan siempre: el desglose y el mensaje cambian
          de largo con la combinación, y al cambiar de alto movían el botón de agregar. */}
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-3 text-sm">
        <span aria-live="polite" className={`min-w-44 leading-5 ${complete ? "text-brand" : "text-muted"}`}>
          {complete ? `${size} minis listas` : `Faltan ${remaining} para completar el pack`}
        </span>
        <button
          type="button"
          className="min-h-11 text-sm text-muted underline underline-offset-4"
          onClick={() => onChange(evenMix(size))}
        >
          Reparto equitativo
        </button>
      </div>
      <p className="min-h-10 text-xs leading-5 text-muted">
        {formatPackMix(mix)}.
        {complete
          ? " El precio del pack no cambia según los sabores."
          : " Completá el pack para agregarlo al carrito."}
      </p>
    </fieldset>
  );
}