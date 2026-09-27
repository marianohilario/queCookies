import test from "node:test";
import assert from "node:assert/strict";
import { addItem, summarizeCart } from "../src/features/cart/cart.ts";
import { individualCookies, miniPacks, products } from "../src/data/catalog.ts";

const traditional = individualCookies[0];
const item = (id: string, quantity = 1) => ({ productId: id, quantity, lastPrice: products.find((p) => p.id === id)!.price });

test("mínimo por contenido: una individual no; dos o un pack sí", () => {
  assert.equal(summarizeCart([]).valid, false);
  assert.equal(summarizeCart([item(traditional.id)]).valid, false);
  assert.equal(summarizeCart([item(traditional.id, 2)]).subtotal, 700000);
  for (const pack of miniPacks) {
    const summary = summarizeCart([item(pack.id)]);
    assert.equal(summary.valid, true);
    assert.equal(summary.articleCount, 1);
    assert.equal(summary.cookieCount, pack.cookiesPerItem);
  }
});

test("precios individuales y de packs coinciden con la lista del negocio", () => {
  assert.deepEqual(individualCookies.map((p) => p.price), [350000, 400000, 400000, 500000, 500000, 500000, 600000, 400000]);
  assert.deepEqual(miniPacks.map((p) => p.price), [950400, 1900800, 3801600, 7603200]);
  assert.equal(products.some((p) => p.id.startsWith("bollo") || p.id === "mini-cookie"), false);
});

test("dos packs de 12 mantienen su presentación y no se multiplican dos veces", () => {
  const cart = addItem(addItem([], miniPacks[0], 1), miniPacks[0], 1);
  const summary = summarizeCart(cart);
  assert.equal(cart[0].productId, "mini-cookies-12");
  assert.equal(cart[0].quantity, 2);
  assert.equal(summary.cookieCount, 24);
  assert.equal(summary.subtotal, 1900800);
  const withOtherSize = addItem(cart, miniPacks[1], 1);
  assert.equal(withOtherSize.length, 2);
});

test("carrito mixto usa el precio actual, no la copia almacenada", () => {
  const items = [item(traditional.id), item(miniPacks[0].id)];
  items[0].lastPrice = 1;
  const summary = summarizeCart(items);
  assert.equal(summary.subtotal, 1300400);
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
