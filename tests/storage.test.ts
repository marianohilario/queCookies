import test from "node:test";
import assert from "node:assert/strict";
import { decodeCart, encodeCart } from "../src/lib/storage/cart-storage.ts";
import { decodeProfile, encodeProfile, profileFromDraft } from "../src/lib/storage/profile-storage.ts";
import { emptyDraft } from "../src/features/checkout/checkout.ts";

test("restauración conserva IDs, cantidades de packs y referencia de precio", () => {
  const items = [{ productId: "mini-cookies-12", quantity: 2, lastPrice: 950400 }];
  assert.deepEqual(decodeCart(encodeCart(items)), items);
  assert.deepEqual(decodeCart(null), []);
});

test("datos corruptos, versiones y cantidades inválidas se detectan", () => {
  for (const raw of ["{", '{"version":2,"items":[]}', '{"version":1,"items":[{}]}']) assert.throws(() => decodeCart(raw));
  assert.throws(() => decodeCart(encodeCart([{ productId: "mini-cookies-12", quantity: 0.5, lastPrice: 950400 }])));
  const line = { productId: "cookie-tradicional", quantity: 1, lastPrice: 350000 };
  assert.throws(() => decodeCart(encodeCart([line, line])));
});

test("perfil guarda solo contacto/modalidad/domicilio y omite notas, día y hora", () => {
  const draft = { ...emptyDraft, name: "Cliente prueba", phone: "1112345678", mode: "delivery" as const, street: "Calle prueba", number: "1", locality: "Banfield", zone: "Lomas de Zamora", date: "2026-10-01", time: "12:00", notes: "NO GUARDAR" };
  const raw = encodeProfile(profileFromDraft(draft, null));
  assert.ok(!raw.includes("NO GUARDAR"));
  assert.ok(!raw.includes("2026-10-01"));
  assert.ok(!raw.includes("12:00"));
  assert.equal(decodeProfile(raw)?.address?.street, "Calle prueba");
});

test("cambiar a retiro conserva último domicilio válido sin persistir uno incompleto", () => {
  const draft = { ...emptyDraft, name: "Cliente prueba", phone: "1112345678", mode: "delivery" as const, street: "Calle prueba", number: "1", locality: "Banfield", zone: "Lomas de Zamora" };
  const previous = profileFromDraft(draft, null);
  assert.deepEqual(profileFromDraft({ ...draft, mode: "pickup", street: "" }, previous).address, previous.address);
  assert.deepEqual(profileFromDraft({ ...draft, street: "" }, previous).address, previous.address);
  assert.equal(decodeProfile(null), null);
  assert.throws(() => decodeProfile('{"version":1,"profile":{"name":42}}'));
});
