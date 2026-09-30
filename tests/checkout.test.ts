import test from "node:test";
import assert from "node:assert/strict";
import { emptyDraft } from "../src/features/checkout/checkout.ts";
import { business } from "../src/config/business.ts";
import { businessClock, firstOrderDate, validateCheckout, validateDelivery } from "../src/features/checkout/validation.ts";
import { alignMinute, composeTime, hourOptions, minuteOptions, timeSlots } from "../src/features/checkout/time-slots.ts";

const at = (time: string) => ({ hour: time.slice(0, 2), minute: time.slice(3) });
const now = new Date("2026-10-01T15:00:00Z");
const pickup = { ...emptyDraft, name: "Cliente de prueba", phone: "+54 9 11 1234-5678", mode: "pickup" as const, date: "2026-10-02", ...at("10:00") };

test("retiro válido no exige domicilio y exige contacto", () => {
  assert.deepEqual(validateCheckout(pickup, now), {});
  assert.ok(validateCheckout({ ...pickup, name: " " }, now).name);
  assert.ok(validateCheckout({ ...pickup, phone: "12" }, now).phone);
});

test("envío exige dirección completa y admite destinos sin restricción zonal", () => {
  const delivery = { ...pickup, mode: "delivery" as const };
  assert.ok(validateCheckout(delivery, now).street);
  const complete = { ...delivery, street: "Calle de prueba", number: "123", locality: "Banfield", zone: "Lomas de Zamora" };
  assert.deepEqual(validateCheckout(complete, now), {});
  for (const [zone, locality] of [["Buenos Aires", "Quilmes"], ["Buenos Aires", "Burzaco"], ["Córdoba", "Villa Carlos Paz"]]) {
    assert.deepEqual(validateCheckout({ ...complete, zone, locality }, now), {});
  }
  assert.ok(validateCheckout({ ...complete, zone: " " }, now).zone);
  assert.ok(validateCheckout({ ...complete, zone: "x".repeat(81) }, now).zone);
  assert.ok(validateCheckout({ ...complete, locality: " " }, now).locality);
});

test("dirección sin número y notas opcionales tienen límites", () => {
  const draft = { ...pickup, mode: "delivery" as const, street: "Calle de prueba", noNumber: true, locality: "Banfield", zone: "Lomas de Zamora" };
  assert.deepEqual(validateCheckout(draft, now), {});
  assert.ok(validateCheckout({ ...draft, references: "x".repeat(201) }, now).references);
  assert.ok(validateCheckout({ ...draft, notes: "x".repeat(301) }, now).notes);
});

test("horarios 09–19 también sábados y domingos; rechaza fuera de rango", () => {
  for (const date of ["2026-10-03", "2026-10-04"]) {
    for (const time of ["09:00", "19:00"]) assert.deepEqual(validateDelivery({ ...pickup, date, ...at(time) }, now), {});
  }
  for (const time of ["08:59", "19:01", "12:99", "25:00", ""]) assert.ok(validateDelivery({ ...pickup, ...at(time) }, now).time);
});

test("solo se aceptan franjas de 15 minutos", () => {
  for (const time of ["09:00", "09:15", "09:30", "09:45", "18:45"]) assert.deepEqual(validateDelivery({ ...pickup, ...at(time) }, now), {});
  for (const time of ["09:01", "09:07", "10:20", "12:75", "18:59"]) assert.ok(validateDelivery({ ...pickup, ...at(time) }, now).time);
});

test("elegir solo hora o solo minutos no completa el horario", () => {
  assert.ok(validateDelivery({ ...pickup, ...at(""), minute: "30" }, now).time);
  assert.ok(validateDelivery({ ...pickup, ...at(""), hour: "10" }, now).time);
  assert.ok(validateDelivery({ ...pickup, hour: "", minute: "" }, now).time);
});

test("hora y minutos separados se componen en un único horario", () => {
  assert.equal(composeTime("09", "45"), "09:45");
  assert.equal(composeTime("19", "00"), "19:00");
  assert.equal(composeTime("09", ""), "");
  assert.equal(composeTime("", "15"), "");
  assert.deepEqual(hourOptions(), ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]);
  assert.deepEqual(minuteOptions(""), ["00", "15", "30", "45"]);
});

test("los minutos se ajustan a la hora para no ofrecer franjas imposibles", () => {
  assert.deepEqual(minuteOptions("09"), ["00", "15", "30", "45"]);
  assert.deepEqual(minuteOptions("12"), ["00", "15", "30", "45"]);
  assert.deepEqual(minuteOptions("19"), ["00"]);
  assert.equal(alignMinute("19", "45"), "");
  assert.equal(alignMinute("19", "00"), "00");
  assert.equal(alignMinute("12", "45"), "45");
  // Toda combinación que los dos selectores permiten debe pasar la validación.
  for (const hour of hourOptions()) {
    for (const minute of minuteOptions(hour)) {
      const time = composeTime(hour, minute);
      assert.ok(timeSlots().includes(time), `${time} no es una franja válida`);
      assert.deepEqual(validateDelivery({ ...pickup, date: "2026-10-02", ...at(time) }, now), {}, `${time} debería ser válido`);
    }
  }
});

test("el selector de horario ofrece solo franjas de 15 minutos", () => {
  const slots = timeSlots();
  assert.equal(slots[0], business.opens);
  assert.equal(slots.at(-1), business.closes);
  assert.ok(slots.every((slot) => Number(slot.slice(3)) % 15 === 0), "ninguna franja cae fuera de :00/:15/:30/:45");
  assert.deepEqual(slots.slice(0, 5), ["09:00", "09:15", "09:30", "09:45", "10:00"]);
  for (const slot of slots) assert.deepEqual(validateDelivery({ ...pickup, date: "2026-10-02", ...at(slot) }, now), {}, `${slot} debería ser válido`);
});

test("fechas pasadas, inexistentes y horarios ya transcurridos se rechazan", () => {
  assert.ok(validateDelivery({ ...pickup, date: "2026-09-30" }, now).date);
  assert.ok(validateDelivery({ ...pickup, date: "2026-02-30" }, now).date);
  assert.ok(validateDelivery({ ...pickup, date: "2026-10-01", ...at("11:00") }, now).time);
  assert.ok(validateDelivery({ ...pickup, date: "2026-10-01", ...at("19:00") }, new Date("2026-10-01T22:01:00Z")).time);
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
