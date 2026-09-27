import test from "node:test";
import assert from "node:assert/strict";
import { prepareOrder } from "../src/features/whatsapp/order-message.ts";
import { emptyDraft } from "../src/features/checkout/checkout.ts";

const now = new Date("2026-10-01T12:00:00Z");
const draft = { ...emptyDraft, name: "Cliente Ñ & + # % 👋", phone: "+54 9 11 1234-5678", mode: "pickup" as const, date: "2026-10-02", time: "10:00", street: "DOMICILIO PRIVADO", number: "1", references: "REFERENCIA PRIVADA" };
const items = [{ productId: "mini-cookies-12", quantity: 2, lastPrice: 1 }];

test("mensaje de retiro excluye domicilio y usa precios vigentes", () => {
  const result = prepareOrder(items, draft, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.summary.subtotal, 1900800);
  assert.match(result.text, /2 × pack\(s\) de Mini cookies × 12 \(24 mini cookies\)/);
  assert.match(result.text, /Peña 298/);
  assert.match(result.text, /19\.008/);
  assert.ok(!result.text.includes("DOMICILIO PRIVADO"));
  assert.ok(!result.text.includes("REFERENCIA PRIVADA"));
  assert.equal(items[0].quantity, 2);
});

test("destino y codificación conservan tildes, símbolos, emojis y saltos", () => {
  const result = prepareOrder(items, draft, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const url = new URL(result.url);
  assert.equal(url.origin + url.pathname, "https://wa.me/5491161919801");
  assert.equal(url.searchParams.get("text"), result.text);
  assert.ok(result.text.includes(draft.name));
});

test("envío muestra dirección y no inventa importe final", () => {
  const result = prepareOrder(items, { ...draft, mode: "delivery", locality: "Banfield", zone: "Lomas de Zamora", notes: "Timbre del frente" }, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.match(result.text, /Envío: a confirmar/);
  assert.match(result.text, /Total final: pendiente de cotizar el envío/);
  assert.match(result.text, /DOMICILIO PRIVADO/);
  assert.match(result.text, /Timbre del frente/);
  assert.ok(!result.text.includes("Retiro: sin cargo"));
});

test("la salida final vuelve a validar mínimo, contacto y horario", () => {
  assert.equal(prepareOrder([{ productId: "cookie-tradicional", quantity: 1, lastPrice: 350000 }], draft, now).ok, false);
  assert.equal(prepareOrder(items, { ...draft, phone: "" }, now).ok, false);
  assert.equal(prepareOrder(items, draft, new Date("2026-10-03T12:00:00Z")).ok, false);
});

test("mensaje extenso conserva contenido completo sin truncar", () => {
  const notes = "🍪".repeat(150);
  const result = prepareOrder(items, { ...draft, notes }, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.ok(result.text.includes(notes));
  assert.equal(new URL(result.url).searchParams.get("text"), result.text);
});
