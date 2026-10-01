import { miniFlavorSlugs, miniFlavors, type MiniFlavorSlug } from "../../data/catalog.ts";

export type PackMix = Record<MiniFlavorSlug, number>;

export const mixTotal = (mix: PackMix) =>
  miniFlavorSlugs.reduce((sum, slug) => sum + mix[slug], 0);

export function evenMix(size: number): PackMix {
  const base = Math.floor(size / miniFlavorSlugs.length);
  const rest = size % miniFlavorSlugs.length;
  return Object.fromEntries(
    miniFlavorSlugs.map((slug, index) => [slug, base + (index < rest ? 1 : 0)]),
  ) as PackMix;
}

export const isPackMix = (mix: unknown): mix is PackMix =>
  !!mix &&
  typeof mix === "object" &&
  miniFlavorSlugs.every((slug) => Number.isSafeInteger((mix as PackMix)[slug]) && (mix as PackMix)[slug] >= 0);

export function isCompleteMix(mix: unknown, size: number): mix is PackMix {
  return isPackMix(mix) && mixTotal(mix) === size;
}

// El total queda clavado en el tamaño del pack: al subir un sabor se toma
// una unidad del sabor que más tiene, para no dejar el selector bloqueado.
export function stepMix(mix: PackMix, slug: MiniFlavorSlug, delta: number, size: number): PackMix {
  const target = Math.max(0, mix[slug] + delta);
  const next = { ...mix, [slug]: target };
  let excess = mixTotal(next) - size;
  while (excess > 0) {
    const donor = miniFlavorSlugs
      .filter((other) => other !== slug && next[other] > 0)
      .sort((a, b) => next[b] - next[a])[0];
    if (!donor) return mix;
    next[donor] -= 1;
    excess -= 1;
  }
  return next;
}

export function packLineId(productId: string, mix: PackMix | undefined) {
  return mix
    ? `${productId}#${miniFlavorSlugs.map((slug) => `${slug}:${mix[slug]}`).join("|")}`
    : productId;
}

export function formatPackMix(mix: PackMix) {
  return miniFlavors
    .filter((flavor) => mix[flavor.slug] > 0)
    .map((flavor) => `${mix[flavor.slug]} ${flavor.name}`)
    .join(" · ");
}