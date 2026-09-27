import { business } from "../config/business.ts";

const formatter = new Intl.NumberFormat(business.locale, {
  style: "currency", currency: business.currency,
  minimumFractionDigits: 0, maximumFractionDigits: 2,
});

export function formatMoney(cents: number): string {
  return formatter.format(cents / 100);
}
