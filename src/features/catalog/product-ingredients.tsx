import type { Product } from "./product";

function PendingIngredients() {
  return (
    <div className="mt-8 border-t border-brand/15 pt-6">
      <h2 className="font-semibold">Ingredientes y alérgenos</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Estamos completando las fichas de este producto. Consultanos los
        ingredientes, alérgenos y posibles trazas antes de pedir.
      </p>
    </div>
  );
}

export function ProductIngredients({ product }: { product: Product }) {
  if (!product.ingredients?.length) return <PendingIngredients />;

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