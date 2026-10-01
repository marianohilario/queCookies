import { validQuantity } from "@/features/cart/cart";
import { Icon } from "@/components/ui/icon";

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: 0 | 1;
  disabled?: boolean;
};
export function QuantitySelector({
  value,
  onChange,
  label,
  min = 1,
  disabled = false,
}: Props) {
  return (
    <div role="group" aria-label={label} className="counter">
      <button
        type="button"
        className="counter-button rounded-l-full"
        disabled={disabled || value <= min}
        aria-label={`Reducir ${label}`}
        onClick={() => onChange(value - 1)}
      >
        <Icon name="minus" className="size-4" />
      </button>
      <output
        aria-label={label}
        aria-live="polite"
        className="flex h-full min-w-9 items-center justify-center border-x border-brand/12 px-1 text-base leading-none font-semibold tabular-nums text-ink"
      >
        {value}
      </output>
      <button
        type="button"
        className="counter-button rounded-r-full"
        disabled={disabled || !validQuantity(value + 1)}
        aria-label={`Aumentar ${label}`}
        onClick={() => onChange(value + 1)}
      >
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}
