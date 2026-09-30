import { business } from "../../config/business.ts";

function toMinutes(time: string): number {
  return Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
}

function toTime(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// Franjas de retiro/envío alineadas al paso configurado, para que los selectores
// nunca ofrezcan horarios que validateDelivery rechazaría.
export function timeSlots(): string[] {
  const slots: string[] = [];
  const closes = toMinutes(business.closes);
  for (let minutes = toMinutes(business.opens); minutes <= closes; minutes += business.slotMinutes) {
    slots.push(toTime(minutes));
  }
  return slots;
}

export function hourOptions(): string[] {
  return [...new Set(timeSlots().map((slot) => slot.slice(0, 2)))];
}

// Los minutos dependen de la hora elegida: en la última hora solo existe su
// cierre, así que ofrecer ":15", ":30" o ":45" daría horarios que la validación rechaza.
export function minuteOptions(hour: string): string[] {
  const minutes = [...new Set(timeSlots().map((slot) => slot.slice(3)))];
  return hour ? minutes.filter((minute) => timeSlots().includes(composeTime(hour, minute))) : minutes;
}

// Al cambiar la hora, el minuto elegido puede dejar de ser una franja válida.
export function alignMinute(hour: string, minute: string): string {
  return minuteOptions(hour).includes(minute) ? minute : "";
}

// Los dos selectores se combinan en el único horario que consume el pedido.
export function composeTime(hour: string, minute: string): string {
  return hour && minute ? `${hour}:${minute}` : "";
}
