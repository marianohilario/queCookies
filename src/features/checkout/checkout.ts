export type DeliveryMode = "" | "pickup" | "delivery";
export type Address = {
  street: string; number: string; noNumber: boolean; locality: string;
  zone: string; unit: string; references: string;
};
export type CheckoutDraft = Address & {
  name: string; phone: string; mode: DeliveryMode;
  date: string; hour: string; minute: string; notes: string;
};
// "time" agrupa el error de los dos selectores de hora y minutos.
export type FieldErrorKey = keyof CheckoutDraft | "time";
export type FieldErrors = Partial<Record<FieldErrorKey, string>>;
export type CustomerProfile = {
  name: string; phone: string; mode: DeliveryMode; address: Address | null;
};

export const emptyAddress: Address = {
  street: "", number: "", noNumber: false, locality: "", zone: "", unit: "", references: "",
};
export const emptyDraft: CheckoutDraft = {
  ...emptyAddress, name: "", phone: "", mode: "", date: "", hour: "", minute: "", notes: "",
};

export const fieldLimits = {
  name: 100, phone: 30, street: 120, number: 20,
  locality: 80, zone: 80, unit: 80, references: 200, notes: 300,
} as const;
