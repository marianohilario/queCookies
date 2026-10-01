import test from "node:test";
import assert from "node:assert/strict";
import { prepareOrder } from "../src/features/whatsapp/order-message.ts";
import { evenMix } from "../src/features/catalog/pack-mix.ts";
import { noDips } from "../src/features/catalog/pack-dips.ts";
import { emptyDraft } from "../src/features/checkout/checkout.ts";

const now = new Date("2026-10-01T12:00:00Z");
const draft = { ...emptyDraft, name: "Cliente Ñ & + # % 👋", phone: "+54 9 11 1234-5678", mode: "pickup" as const, date: "2026-10-02", hour: "10", minute: "00", street: "DOMICILIO PRIVADO", number: "1", references: "REFERENCIA PRIVADA" };
const items = [{ productId: "mini-cookies-12", quantity: 2, lastPrice: 1, mix: evenMix(12) }];

test("mensaje de retiro excluye domicilio y usa precios vigentes", () => {
  const result = prepareOrder(items, draft, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.summary.subtotal, 1900000);
  assert.match(result.text, /2 × pack\(s\) de Mini cookies × 12 \(24 mini cookies\)/);
  assert.match(result.text, /Peña 298/);
  assert.match(result.text, /19\.000/);
  assert.ok(!result.text.includes("DOMICILIO PRIVADO"));
  assert.ok(!result.text.includes("REFERENCIA PRIVADA"));
  assert.equal(items[0].quantity, 2);
});

test("cada combinación de sabores se informa por separado en el mensaje", () => {
  const first = { tradicional: 6, cacao: 4, "red-velvet": 2 };
  const second = { tradicional: 0, cacao: 2, "red-velvet": 10 };
  const result = prepareOrder(
    [
      { productId: "mini-cookies-12", quantity: 1, lastPrice: 950000, mix: first },
      { productId: "mini-cookies-12", quantity: 1, lastPrice: 950000, mix: second },
    ],
    draft,
    now,
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.match(result.text, /Sabores: 6 Tradicional · 4 Cacao · 2 Red Velvet/);
  assert.match(result.text, /Sabores: 2 Cacao · 10 Red Velvet/);
  assert.ok(!result.text.includes("0 Tradicional"));
  assert.equal(result.summary.subtotal, 1900000);
});

test("los dips pedidos se detallan y se cobran en el mensaje", () => {
  const result = prepareOrder(
    [
      { productId: "mini-cookies-12", quantity: 2, lastPrice: 1350000, mix: evenMix(12), dips: { nutella: 2, "chocolate-blanco": 0 } },
      { productId: "mini-cookies-12", quantity: 1, lastPrice: 1150000, mix: evenMix(12), dips: { nutella: 0, "chocolate-blanco": 1 } },
      { productId: "mini-cookies-12", quantity: 1, lastPrice: 950000, mix: evenMix(12), dips: noDips },
    ],
    draft,
    now,
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.match(result.text, /Dips: 2 Dip de Nutella/);
  assert.match(result.text, /Dips: 1 Dip de chocolate blanco/);
  // El pack sin dips no inventa una línea de extras.
  assert.equal(result.text.match(/Dips:/g)?.length, 2);
  // El precio por pack ya incluye el extra: $9.500 más $2.000 por cada dip.
  assert.match(result.text, /2 × pack\(s\) de Mini cookies × 12 \(24 mini cookies\) — [\p{Sc}\s]+13\.500 c\/u — [\p{Sc}\s]+27\.000/u);
  assert.match(result.text, /1 × pack\(s\) de Mini cookies × 12 \(12 mini cookies\) — [\p{Sc}\s]+9\.500 c\/u — [\p{Sc}\s]+9\.500/u);
  assert.equal(result.summary.subtotal, 4800000);
});

test("destino y codificación conservan tildes, símbolos, emojis y saltos", () => {
  const result = prepareOrder(items, draft, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const url = new URL(result.url);
  assert.equal(url.origin + url.pathname, "https://api.whatsapp.com/send/");
  assert.equal(url.searchParams.get("phone"), "5491161919801");
  assert.equal(url.searchParams.get("text"), result.text);
  assert.ok(result.text.includes(draft.name));
});

test("envío muestra dirección y no inventa importe final", () => {
  const result = prepareOrder(items, { ...draft, mode: "delivery", locality: "Villa Carlos Paz", zone: "Córdoba", notes: "Timbre del frente" }, now);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.match(result.text, /Envío: a confirmar/);
  assert.match(result.text, /a cargo del cliente/);
  assert.match(result.text, /Villa Carlos Paz, Córdoba/);
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


test("saludo y secciones conservan emojis al abrir el enlace de ambas modalidades", () => {
  for (const mode of ["pickup", "delivery"] as const) {
    const result = prepareOrder(items, { ...draft, mode, locality: "Banfield", zone: "Buenos Aires", notes: "Sin timbre" }, now);
    assert.equal(result.ok, true);
    if (!result.ok) continue;
    const decoded = new URL(result.url).searchParams.get("text");
    assert.equal(decoded, result.text);
    assert.ok(decoded.startsWith("¡Hola, Que Cookies! 👋\n"));
    assert.ok(result.url.includes("%F0%9F%91%8B"));
    for (const heading of ["🍪 *Mi pedido*", "💰 *Resumen*", "👤 *Mis datos*", mode === "pickup" ? "📍 *Retiro*" : "🚚 *Envío*", "📅 *Fecha y horario*", "📝 *Comentarios*"]) {
      assert.ok(decoded.includes(heading));
    }
    assert.ok(!decoded.includes("�"));
  }
});
