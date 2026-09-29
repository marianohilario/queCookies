const tones = {
  light: "bg-brand text-cream",
  brand: "bg-yellow text-brand",
};

export function CartCount({
  count,
  tone = "light",
}: {
  count: number;
  tone?: keyof typeof tones;
}) {
  if (!count) return null;
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-1 right-0 min-w-4 rounded-full px-1 py-0.5 text-center text-[10px] leading-3 font-semibold ${tones[tone]}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
