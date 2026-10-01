import Link from "next/link";
import { miniFlavors } from "@/data/catalog";
import type { Product } from "./product";

// Las minis usan las mismas recetas que las cookies grandes de cada sabor:
// se enlaza a cada ficha en lugar de duplicar o inventar ingredientes.
function MiniIngredients() {
  return (
    <div className="mt-8 border-t border-brand/15 pt-6">
      <h2 className="font-semibold">Ingredientes y alérgenos</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Las mini cookies se hacen con la misma masa que las cookies grandes, en
        su versión mini. Los ingredientes y alérgenos de cada sabor son los de
        su ficha:
      </p>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
        {miniFlavors.map((flavor) => (
          <li key={flavor.slug}>
            <Link
              className="font-semibold text-brand underline underline-offset-4"
              href={`/cookies/${flavor.slug}`}
            >
              {flavor.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-6 text-muted">
        <span className="font-semibold text-ink">Contienen:</span>{" "}
        Trigo, Leche, Huevo
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Confirmá los alérgenos y posibles trazas antes de pedir.
      </p>
    </div>
  );
}

export function ProductIngredients({ product }: { product: Product }) {
  if (product.kind === "pack") return <MiniIngredients />;
  if (!product.ingredients?.length) return null;

  return (
    <div className="mt-8 border-t border-brand/15 pt-6">
      <h2 className="font-semibold">Ingredientes</h2>
      <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm leading-7 text-muted sm:grid-cols-2">
        {product.ingredients.map((ingredient) => (
          <li key={ingredient} className="flex gap-2">
            <span aria-hidden="true" className="text-brand/50">
              &middot;
            </span>
            {ingredient}
          </li>
        ))}
      </ul>
      {product.allergens?.length ? (
        <p className="mt-5 text-sm leading-6 text-muted">
          <span className="font-semibold text-ink">Contiene:</span>{" "}
          {product.allergens.join(", ")}
        </p>
      ) : null}
      <p className="mt-2 text-sm leading-6 text-muted">
        Confirmá los alérgenos y posibles trazas antes de pedir.
      </p>
    </div>
  );
}