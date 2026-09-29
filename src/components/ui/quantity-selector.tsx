import { validQuantity } from "@/features/cart/cart";

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: 0 | 1;
  disabled?: boolean;
};
export function QuantitySelector({ value, onChange, label, min = 1, disabled = false }: Props) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border border-brand/25 bg-white">
      <button type="button" className="icon-button disabled:opacity-30" disabled={disabled || value <= min} aria-label={`Reducir ${label}`} onClick={() => onChange(value - 1)}>−</button>
      <output aria-label={label} className="min-w-7 text-center text-sm font-semibold">{value}</output>
      <button type="button" className="icon-button disabled:opacity-30" disabled={disabled || !validQuantity(value + 1)} aria-label={`Aumentar ${label}`} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
