// Los conteos por sabor (combinación del pack, dips) comparten forma: un registro
// con exactamente esas claves y cantidades enteras no negativas. Se validan juntos
// para que un sabor desconocido no sobreviva al carrito ni al mensaje de pedido.
export function isCountRecord(value: unknown, keys: readonly string[]): boolean {
  if (!value || typeof value !== "object") return false;
  const entries = Object.entries(value);
  return (
    entries.length === keys.length &&
    keys.every((key) => Number.isSafeInteger((value as Record<string, number>)[key]) && (value as Record<string, number>)[key] >= 0)
  );
}
