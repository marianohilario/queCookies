import test from "node:test";
import assert from "node:assert/strict";
import { emptyDraft } from "../src/features/checkout/checkout.ts";
import { businessClock, firstOrderDate, validateCheckout, validateDelivery } from "../src/features/checkout/validation.ts";

const now = new Date("2026-10-01T15:00:00Z");
const pickup = { ...emptyDraft, name: "Cliente de prueba", phone: "+54 9 11 1234-5678", mode: "pickup" as const, date: "2026-10-02", time: "10:00" };

test("retiro válido no exige domicilio y exige contacto", () => {
  assert.deepEqual(validateCheckout(pickup, now), {});
  assert.ok(validateCheckout({ ...pickup, name: " " }, now).name);
  assert.ok(validateCheckout({ ...pickup, phone: "12" }, now).phone);
});

test("envío exige dirección y zona; fuera de cobertura no se acepta", () => {
  const delivery = { ...pickup, mode: "delivery" as const };
  assert.ok(validateCheckout(delivery, now).street);
  const complete = { ...delivery, street: "Calle de prueba", number: "123", locality: "Banfield", zone: "Lomas de Zamora" };
  assert.deepEqual(validateCheckout(complete, now), {});
  assert.ok(validateCheckout({ ...complete, zone: "Quilmes" }, now).zone);
  assert.ok(validateCheckout({ ...complete, zone: "Adrogué (Almirante Brown)", locality: "Burzaco" }, now).locality);
  assert.deepEqual(validateCheckout({ ...complete, zone: "Adrogué (Almirante Brown)", locality: "Adrogue" }, now), {});
});

test("dirección sin número y notas opcionales tienen límites", () => {
  const draft = { ...pickup, mode: "delivery" as const, street: "Calle de prueba", noNumber: true, locality: "Banfield", zone: "Lomas de Zamora" };
  assert.deepEqual(validateCheckout(draft, now), {});
  assert.ok(validateCheckout({ ...draft, references: "x".repeat(201) }, now).references);
  assert.ok(validateCheckout({ ...draft, notes: "x".repeat(301) }, now).notes);
});

test("horarios 09–19 también sábados y domingos; rechaza fuera de rango", () => {
  for (const date of ["2026-10-03", "2026-10-04"]) {
    for (const time of ["09:00", "19:00"]) assert.deepEqual(validateDelivery({ ...pickup, date, time }, now), {});
  }
  for (const time of ["08:59", "19:01", "12:99", "25:00", ""]) assert.ok(validateDelivery({ ...pickup, time }, now).time);
});

test("fechas pasadas, inexistentes y horarios ya transcurridos se rechazan", () => {
  assert.ok(validateDelivery({ ...pickup, date: "2026-09-30" }, now).date);
  assert.ok(validateDelivery({ ...pickup, date: "2026-02-30" }, now).date);
  assert.ok(validateDelivery({ ...pickup, date: "2026-10-01", time: "11:00" }, now).time);
  assert.ok(validateDelivery({ ...pickup, date: "2026-10-01", time: "19:00" }, new Date("2026-10-01T22:01:00Z")).time);
});

test("la medianoche UTC no adelanta el día operativo de Buenos Aires", () => {
  assert.deepEqual(businessClock(new Date("2026-10-02T01:00:00Z")), { date: "2026-10-01", time: "22:00" });
  assert.deepEqual(businessClock(new Date("2026-10-02T03:01:00Z")), { date: "2026-10-02", time: "00:01" });
});

test("después del cierre la primera fecha cambia correctamente de mes y año", () => {
  assert.equal(firstOrderDate(new Date("2026-12-31T21:59:00Z")), "2026-12-31");
  assert.equal(firstOrderDate(new Date("2026-12-31T22:00:00Z")), "2027-01-01");
  assert.equal(firstOrderDate(new Date("2026-10-01T01:00:00Z")), "2026-10-01");
});
