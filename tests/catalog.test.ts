import test from "node:test";
import assert from "node:assert/strict";
import { individualCookies, miniFlavorSlugs, miniFlavors, miniPacks } from "../src/data/catalog.ts";

test("las ocho cookies individuales tienen receta y alérgenos", () => {
  assert.equal(individualCookies.length, 8);
  for (const product of individualCookies) {
    assert.ok(product.ingredients?.length, `${product.id} sin ingredientes`);
    assert.ok(product.allergens?.length, `${product.id} sin alérgenos`);
  }
});

test("los alérgenos coinciden con los detectados por el negocio", () => {
  assert.deepEqual(
    individualCookies.map((product) => [product.id, product.allergens?.join(", ")]),
    [
      ["cookie-tradicional", "Trigo, Leche, Huevo"],
      ["cookie-cacao", "Trigo, Leche, Huevo"],
      ["cookie-red-velvet", "Trigo, Leche, Huevo"],
      ["cookie-bon-o-bon", "Trigo, Leche, Huevo, Maní"],
      ["cookie-nutella", "Trigo, Leche, Huevo, Avellana"],
      ["cookie-red-velvet-rellena", "Trigo, Leche, Huevo"],
      ["cookie-pistacho", "Trigo, Leche, Huevo, Pistacho"],
      ["cookie-cacao-chocolate-blanco", "Trigo, Leche, Huevo"],
    ],
  );
});

test("los alérgenos de base se corresponden con los insumos de cada receta", () => {
  const insumoAlergeno: [string, string][] = [
    ["Harina", "Trigo"],
    ["Mantequilla", "Leche"],
    ["Huevo", "Huevo"],
  ];

  for (const product of individualCookies) {
    for (const [insumo, alergeno] of insumoAlergeno) {
      const presente = product.ingredients!.includes(insumo);
      const declarado = product.allergens!.includes(alergeno);
      assert.equal(
        declarado,
        presente,
        `${product.id}: ${insumo} ${presente ? "exige" : "no exige"} ${alergeno}`,
      );
    }
  }
});

test("ninguna receta repite ingredientes", () => {
  for (const product of individualCookies) {
    const ingredients = product.ingredients!;
    assert.equal(
      new Set(ingredients).size,
      ingredients.length,
      `${product.id} repite ingredientes`,
    );
  }
});

test("los packs de minis no publican una receta propia: usan la de sus sabores", () => {
  for (const pack of miniPacks) {
    assert.equal(pack.ingredients, undefined);
    assert.equal(pack.allergens, undefined);
  }
});

test("los packs de minis se arman solo con tradicional, cacao y red velvet", () => {
  assert.deepEqual([...miniFlavorSlugs], ["tradicional", "cacao", "red-velvet"]);
  assert.deepEqual(miniFlavors.map((flavor) => flavor.name), ["Tradicional", "Cacao", "Red Velvet"]);
  for (const flavor of miniFlavors) {
    assert.ok(
      individualCookies.find((cookie) => cookie.slug === flavor.slug)?.ingredients?.length,
      `${flavor.slug} sin ficha de ingredientes para enlazar`,
    );
  }
});