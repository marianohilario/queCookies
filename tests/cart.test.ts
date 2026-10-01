import test from "node:test";
import assert from "node:assert/strict";
import { addItem, summarizeCart } from "../src/features/cart/cart.ts";
import { evenMix, mixTotal, stepMix, type PackMix } from "../src/features/catalog/pack-mix.ts";
import { dipsAmount, formatPackDips, noDips, stepDips, type PackDips } from "../src/features/catalog/pack-dips.ts";
import { individualCookies, dipPrice, miniPacks, products } from "../src/data/catalog.ts";

const traditional = individualCookies[0];
const item = (id: string, quantity = 1) => ({ productId: id, quantity, lastPrice: products.find((p) => p.id === id)!.price });
const packItem = (index: number, mix: PackMix = evenMix(miniPacks[index].cookiesPerItem), quantity = 1) => ({
  productId: miniPacks[index].id, quantity, lastPrice: miniPacks[index].price, mix,
});
const mix = (over: Partial<PackMix>): PackMix => ({ ...evenMix(12), ...over });
const dips = (over: Partial<PackDips>): PackDips => ({ ...noDips, ...over });
const packWithDips = (index: number, over: Partial<PackDips> = {}) => {
  const selected = dips(over);
  return { ...packItem(index), dips: selected, lastPrice: miniPacks[index].price + dipsAmount(selected) };
};

test("mínimo por contenido: una individual no; dos o un pack sí", () => {
  assert.equal(summarizeCart([]).valid, false);
  assert.equal(summarizeCart([item(traditional.id)]).valid, false);
  assert.equal(summarizeCart([item(traditional.id, 2)]).subtotal, 700000);
  for (const [index, pack] of miniPacks.entries()) {
    const summary = summarizeCart([packItem(index)]);
    assert.equal(summary.valid, true, `${pack.id} con reparto equitativo`);
    assert.equal(summary.articleCount, 1);
    assert.equal(summary.cookieCount, pack.cookiesPerItem);
  }
});

test("un pack sin combinación completa o con un total que no cierra no se puede comprar", () => {
  for (const index of [0, 3]) {
    assert.equal(summarizeCart([{ ...packItem(index), mix: undefined }]).valid, false);
    assert.equal(summarizeCart([packItem(index, evenMix(miniPacks[index].cookiesPerItem + 1))]).valid, false);
    assert.equal(addItem([], miniPacks[index], 1).length, 0);
  }
});

test("el paso de sabores mantiene el total clavado en el tamaño del pack", () => {
  const start = evenMix(12);
  // Al subir un sabor, la unidad sale del sabor que más unidades tiene.
  assert.deepEqual(stepMix(start, "tradicional", 1, 12), mix({ tradicional: 5, cacao: 3, "red-velvet": 4 }));
  // Bajar sí abre lugar: el pack queda incompleto hasta que el cliente complete con otro sabor.
  assert.deepEqual(stepMix(start, "red-velvet", -1, 12), mix({ tradicional: 4, cacao: 4, "red-velvet": 3 }));
  const single = mix({ tradicional: 12, cacao: 0, "red-velvet": 0 });
  assert.deepEqual(stepMix(single, "cacao", 1, 12), mix({ tradicional: 11, cacao: 1, "red-velvet": 0 }));
  const empty = mix({ tradicional: 0, cacao: 0, "red-velvet": 0 });
  assert.deepEqual(stepMix(empty, "red-velvet", -1, 12), empty);
  for (const delta of [1, 2, 20]) assert.equal(mixTotal(stepMix(start, "cacao", delta, 12)), 12);
  for (const delta of [1, 2, 20]) assert.equal(mixTotal(stepMix(start, "cacao", -delta, 12)), 12 - Math.min(delta, 4));
});

test("el reparto equitativo reparte todo el pack entre los tres sabores", () => {
  assert.deepEqual(evenMix(12), { tradicional: 4, cacao: 4, "red-velvet": 4 });
  assert.deepEqual(evenMix(24), { tradicional: 8, cacao: 8, "red-velvet": 8 });
  assert.deepEqual(evenMix(96), { tradicional: 32, cacao: 32, "red-velvet": 32 });
});

test("precios individuales y de packs coinciden con la lista del negocio", () => {
  assert.deepEqual(individualCookies.map((p) => p.price), [350000, 400000, 400000, 500000, 500000, 500000, 600000, 400000]);
  assert.deepEqual(miniPacks.map((p) => p.price), [950000, 1850000, 3550000, 6700000]);
  assert.equal(products.some((p) => p.id.startsWith("bollo") || p.id === "mini-cookie"), false);
});

test("dos packs de 12 mantienen su presentación y no se multiplican dos veces", () => {
  const cart = addItem(addItem([], miniPacks[0], 1, evenMix(12)), miniPacks[0], 1, evenMix(12));
  const summary = summarizeCart(cart);
  assert.equal(cart[0].productId, "mini-cookies-12");
  assert.equal(cart[0].quantity, 2);
  assert.equal(summary.cookieCount, 24);
  assert.equal(summary.subtotal, 1900000);
  const withOtherSize = addItem(cart, miniPacks[1], 1, evenMix(24));
  assert.equal(withOtherSize.length, 2);
});

test("dos combinaciones distintas del mismo pack son líneas separadas", () => {
  const a = mix({ tradicional: 6, cacao: 4, "red-velvet": 2 });
  const b = mix({ tradicional: 2, cacao: 4, "red-velvet": 6 });
  const cart = addItem(addItem([], miniPacks[0], 1, a), miniPacks[0], 1, b);
  assert.equal(cart.length, 2);
  assert.notEqual(cart[0].mix, cart[1].mix);
  const summary = summarizeCart(cart);
  assert.equal(summary.cookieCount, 24);
  assert.equal(summary.subtotal, 1900000);
  assert.equal(new Set(summary.lines.map((line) => line.lineId)).size, 2);
});

test("la misma combinación se acumula en una sola línea", () => {
  const a = mix({ tradicional: 6, cacao: 4, "red-velvet": 2 });
  const cart = addItem(addItem([], miniPacks[0], 1, a), miniPacks[0], 1, mix({ tradicional: 6, cacao: 4, "red-velvet": 2 }));
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);
  assert.equal(summarizeCart(cart).cookieCount, 24);
});

test("carrito mixto usa el precio actual, no la copia almacenada", () => {
  const items = [item(traditional.id), packItem(0)];
  items[0].lastPrice = 1;
  const summary = summarizeCart(items);
  assert.equal(summary.subtotal, 1300000);
  assert.equal(summary.lines[0].priceChanged, true);
});

test("productos eliminados o no disponibles impiden continuar", () => {
  const items = [item(traditional.id, 2)];
  assert.equal(summarizeCart(items, []).valid, false);
  const summary = summarizeCart(items, [{ ...traditional, available: false }]);
  assert.equal(summary.valid, false);
  assert.equal(summary.subtotal, 0);
});

test("cantidades inválidas y desbordamientos no generan una compra válida", () => {
  for (const quantity of [-1, 0, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
    assert.equal(summarizeCart([item(traditional.id, quantity)]).valid, false);
  }
});

test("cada dip suma el extra publicado y el pack conserva su precio base", () => {
  assert.equal(dipPrice, 200000);
  assert.deepEqual(noDips, { nutella: 0, "chocolate-blanco": 0 });
  // Sin dips el pack vale lo mismo que sin el extra.
  assert.equal(summarizeCart([packItem(0)]).subtotal, 950000);
  assert.equal(summarizeCart([packWithDips(0, { nutella: 1 })]).subtotal, 1150000);
  assert.equal(summarizeCart([packWithDips(0, { nutella: 2, "chocolate-blanco": 1 })]).subtotal, 1550000);
  // El extra es por pack: dos packs con un dip cada uno cobran los dos.
  const doubled = { ...packWithDips(0, { nutella: 1 }), quantity: 2 };
  assert.equal(summarizeCart([doubled]).subtotal, 2300000);
});

test("el paso de dips no baja de cero y no tiene tope", () => {
  assert.deepEqual(stepDips(noDips, "nutella", -1), noDips);
  assert.deepEqual(stepDips(noDips, "nutella", 1), dips({ nutella: 1 }));
  assert.deepEqual(stepDips(noDips, "chocolate-blanco", 12), dips({ "chocolate-blanco": 12 }));
  assert.equal(dipsAmount(dips({ "chocolate-blanco": 12 })), 2400000);
  assert.equal(formatPackDips(dips({ nutella: 2, "chocolate-blanco": 1 })), "2 Dip de Nutella · 1 Dip de chocolate blanco");
  assert.equal(formatPackDips(noDips), "");
});

test("los dips forman parte de la identidad de la línea del pack", () => {
  const a = addItem([], miniPacks[0], 1, evenMix(12), dips({ nutella: 1 }));
  const b = addItem([], miniPacks[0], 1, evenMix(12), dips({ "chocolate-blanco": 1 }));
  const c = addItem([], miniPacks[0], 1, evenMix(12), dips({ nutella: 1 }));
  const cart = addItem(addItem(a, miniPacks[0], 1, evenMix(12), dips({ "chocolate-blanco": 1 })), miniPacks[0], 1, evenMix(12), dips({ nutella: 1 }));
  // Mismos dips y misma combinación: se acumulan. Distintos dips: líneas aparte.
  assert.equal(cart.length, 2);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cart[1].quantity, 1);
  assert.equal(summarizeCart(cart).subtotal, 1150000 * 2 + 1150000);
  // Un pack sin dips y el mismo con un dip tampoco se fusionan.
  assert.equal(addItem(cart, miniPacks[0], 1, evenMix(12)).length, 3);
  // Los dips no agregan cookies al contenido físico.
  assert.equal(summarizeCart(b).cookieCount, 12);
});

test("dips en una línea que no es pack impiden continuar", () => {
  const summary = summarizeCart([{ ...item(traditional.id, 2), dips: dips({ nutella: 1 }) }]);
  assert.equal(summary.valid, false);
  assert.match(summary.issues.join(" "), /dips/i);
});
