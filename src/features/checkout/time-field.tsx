"use client";
import { alignMinute, composeTime, hourOptions, minuteOptions } from "./time-slots";

type Props = {
  hour: string;
  minute: string;
  onChange: (patch: { hour?: string; minute?: string }) => void;
  error?: string;
};

// Imita el selector nativo con dos listas; los minutos solo ofrecen franjas reales.
export function TimeField({ hour, minute, onChange, error }: Props) {
  const shared = {
    className: "field flex-1",
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? "time-error" : undefined,
  };
  return (
    <div>
      <span id="time-label" className="mb-2 block text-sm font-medium">Horario preferido</span>
      <div className="flex items-center gap-2" role="group" aria-labelledby="time-label">
        <select {...shared} aria-label="Hora" value={hour} onChange={(e) => onChange({ hour: e.target.value, minute: alignMinute(e.target.value, minute) })}>
          <option value="">--</option>
          {hourOptions().map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <span aria-hidden="true" className="text-lg font-semibold">:</span>
        <select {...shared} aria-label="Minutos" value={minute} onChange={(e) => onChange({ minute: e.target.value })}>
          <option value="">--</option>
          {minuteOptions(hour).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <p className="sr-only" aria-live="polite">{composeTime(hour, minute) || "Horario sin elegir"}</p>
      {error && <p id="time-error" className="mt-2 text-sm text-brand">{error}</p>}
    </div>
  );
}
