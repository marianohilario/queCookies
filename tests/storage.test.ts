import test from "node:test";
import assert from "node:assert/strict";
import { decodeCart, encodeCart } from "../src/lib/storage/cart-storage.ts";
import { evenMix } from "../src/features/catalog/pack-mix.ts";
import { dipsAmount, noDips } from "../src/features/catalog/pack-dips.ts";
import { decodeProfile, encodeProfile, profileFromDraft } from "../src/lib/storage/profile-storage.ts";
import { emptyDraft } from "../src/features/checkout/checkout.ts";

test("restauración conserva IDs, cantidades de packs y referencia de precio", () => {
  const items = [{ productId: "mini-cookies-12", quantity: 2, lastPrice: 950000, mix: evenMix(12) }];
  assert.deepEqual(decodeCart(encodeCart(items)), items);
  assert.deepEqual(decodeCart(null), []);
});

test("datos corruptos, versiones y cantidades inválidas se detectan", () => {
  for (const raw of ["{", '{"version":4,"items":[]}', '{"version":1,"items":[{}]}']) assert.throws(() => decodeCart(raw));
  assert.throws(() => decodeCart(encodeCart([{ productId: "mini-cookies-12", quantity: 0.5, lastPrice: 950000 }])));
  const line = { productId: "cookie-tradicional", quantity: 1, lastPrice: 350000 };
  assert.throws(() => decodeCart(encodeCart([line, line])));
});

test("la combinación se persiste y una combinación repetida se rechaza", () => {
  const pack = { productId: "mini-cookies-12", quantity: 1, lastPrice: 950000, mix: evenMix(12) };
  assert.deepEqual(decodeCart(encodeCart([pack])), [pack]);
  assert.throws(() => decodeCart(encodeCart([pack, pack])));
});

test("una combinación guardada corrupta o incompleta se rechaza", () => {
  const pack = { productId: "mini-cookies-12", quantity: 1, lastPrice: 950000 };
  // Se fuerzan datos inválidos a propósito: el contenido guardado no es de confianza.
  const corrupt = (mix: unknown) => decodeCart(encodeCart([{ ...pack, mix } as never]));
  assert.throws(() => corrupt({ tradicional: 12 }));
  assert.throws(() => corrupt({ tradicional: 4, cacao: 4, "red-velvet": -1 }));
  assert.throws(() => corrupt({ tradicional: 4, cacao: 4, "red-velvet": 4.5 }));
  assert.throws(() => corrupt({ tradicional: "4", cacao: 4, "red-velvet": 4 }));
});

test("los dips se persisten con la línea y una combinación repetida se rechaza", () => {
  const pack = { productId: "mini-cookies-12", quantity: 1, mix: evenMix(12), dips: { nutella: 2, "chocolate-blanco": 0 } };
  const line = { ...pack, lastPrice: 950000 + dipsAmount(pack.dips) };
  assert.deepEqual(decodeCart(encodeCart([line])), [line]);
  assert.throws(() => decodeCart(encodeCart([line, line])));
  // Mismos dips pero distinta combinación: siguen siendo líneas distintas.
  const other = { ...line, mix: { tradicional: 6, cacao: 4, "red-velvet": 2 } };
  assert.equal(decodeCart(encodeCart([line, other])).length, 2);
});

test("dips guardados corruptos, con sabores desconocidos o negativos se rechazan", () => {
  const pack = { productId: "mini-cookies-12", quantity: 1, lastPrice: 950000, mix: evenMix(12) };
  const corrupt = (dips: unknown) => decodeCart(encodeCart([{ ...pack, dips } as never]));
  assert.throws(() => corrupt({ nutella: 1 }));
  assert.throws(() => corrupt({ nutella: -1, "chocolate-blanco": 0 }));
  assert.throws(() => corrupt({ nutella: 1.5, "chocolate-blanco": 0 }));
  assert.throws(() => corrupt({ nutella: "1", "chocolate-blanco": 0 }));
  assert.throws(() => corrupt({ nutella: 1, "chocolate-blanco": 0, "dulce-de-leche": 3 }));
  // Un registro válido de cero dips es la misma línea que no pedir ninguno: se normaliza.
  assert.deepEqual(decodeCart(encodeCart([{ ...pack, dips: noDips }])), [pack]);
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
