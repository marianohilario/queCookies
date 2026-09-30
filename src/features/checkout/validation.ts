import { business } from "../../config/business.ts";
import { fieldLimits } from "./checkout.ts";
import { composeTime } from "./time-slots.ts";
import type { Address, CheckoutDraft, FieldErrors } from "./checkout.ts";

export function businessClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: business.timezone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}

export function validateContact(data: Pick<CheckoutDraft, "name" | "phone">): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim() || data.name.length > fieldLimits.name) errors.name = "Ingresá tu nombre (hasta 100 caracteres).";
  const digits = data.phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(data.phone) || digits.length < 8 || digits.length > 15 || data.phone.length > fieldLimits.phone) errors.phone = "Ingresá un teléfono válido, con código de área.";
  return errors;
}

export function firstOrderDate(now = new Date()): string {
  const clock = businessClock(now);
  if (clock.time < business.closes) return clock.date;
  const tomorrow = new Date(`${clock.date}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export function validateAddress(data: Address): FieldErrors {
  const errors: FieldErrors = {};
  for (const key of ["street", "locality", "zone"] as const) {
    if (!data[key].trim() || data[key].length > fieldLimits[key]) errors[key] = "Completá este campo con una dirección válida.";
  }
  if (!data.noNumber && (!data.number.trim() || data.number.length > fieldLimits.number)) errors.number = "Ingresá la altura o marcá sin número.";
  for (const key of ["unit", "references"] as const) {
    if (data[key].length > fieldLimits[key]) errors[key] = `Usá hasta ${fieldLimits[key]} caracteres.`;
  }
  return errors;
}

export function validateDelivery(data: CheckoutDraft, now = new Date()): FieldErrors {
  const errors: FieldErrors = data.mode === "delivery" ? validateAddress(data) : {};
  if (data.mode !== "pickup" && data.mode !== "delivery") errors.mode = "Elegí retiro o envío.";
  const clock = businessClock(now);
  const time = composeTime(data.hour, data.minute);
  const parsed = new Date(`${data.date}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== data.date || data.date < firstOrderDate(now)) errors.date = "Elegí una fecha válida; después de las 19 h, solicitá desde el día siguiente.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || time < business.opens || time > business.closes || Number(time.slice(3)) % business.slotMinutes !== 0) errors.time = `Elegí un horario entre las 9 y las 19 h, en franjas de ${business.slotMinutes} minutos.`;
  if (data.date === clock.date && time && time <= clock.time) errors.time = "Ese horario ya pasó. Elegí uno posterior o pedí para otro día.";
  if (data.notes.length > fieldLimits.notes) errors.notes = `Usá hasta ${fieldLimits.notes} caracteres.`;
  return errors;
}

export function validateCheckout(data: CheckoutDraft, now = new Date()): FieldErrors {
  return { ...validateContact(data), ...validateDelivery(data, now) };
}
