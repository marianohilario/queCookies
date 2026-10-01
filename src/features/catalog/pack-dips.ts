import {
  dipFlavorSlugs,
  dipFlavors,
  dipPrice,
  type DipFlavorSlug,
} from "../../data/catalog.ts";
import { isCountRecord } from "../../lib/counts.ts";

export type PackDips = Record<DipFlavorSlug, number>;

// Los dips son un extra libre del pack: no hay tope, el cliente pide los que necesite.
export const noDips: PackDips = Object.fromEntries(
  dipFlavorSlugs.map((slug) => [slug, 0]),
) as PackDips;

export const dipsTotal = (dips: PackDips) =>
  dipFlavorSlugs.reduce((sum, slug) => sum + dips[slug], 0);

// Todos los dips valen lo mismo, así que el extra depende solo de cuántos se piden.
export const dipsAmount = (dips: PackDips) => dipsTotal(dips) * dipPrice;

export const isPackDips = (dips: unknown): dips is PackDips =>
  isCountRecord(dips, dipFlavorSlugs);

export const hasDips = (dips: PackDips | undefined) =>
  !!dips && dipsTotal(dips) > 0;

export const stepDips = (
  dips: PackDips,
  slug: DipFlavorSlug,
  delta: number,
): PackDips => ({ ...dips, [slug]: Math.max(0, dips[slug] + delta) });

export const dipsLineId = (dips: PackDips) =>
  dipFlavorSlugs.map((slug) => `${slug}:${dips[slug]}`).join("|");

export function formatPackDips(dips: PackDips) {
  return dipFlavors
    .filter((dip) => dips[dip.slug] > 0)
    .map((dip) => `${dips[dip.slug]} ${dip.name}`)
    .join(" · ");
}
