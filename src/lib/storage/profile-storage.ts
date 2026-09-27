import { emptyAddress } from "../../features/checkout/checkout.ts";
import type { Address, CheckoutDraft, CustomerProfile } from "../../features/checkout/checkout.ts";
import { validateAddress, validateContact } from "../../features/checkout/validation.ts";

export const PROFILE_KEY = "quecookies:profile:v1";

function selectAddress(source: Address): Address {
  return {
    street: source.street, number: source.noNumber ? "" : source.number, noNumber: source.noNumber,
    locality: source.locality, zone: source.zone, unit: source.unit, references: source.references,
  };
}

export function profileFromDraft(draft: CheckoutDraft, previous: CustomerProfile | null): CustomerProfile {
  return {
    name: draft.name, phone: draft.phone, mode: draft.mode,
    address: draft.mode === "delivery" && !Object.keys(validateAddress(draft)).length
      ? selectAddress(draft) : previous?.address ?? null,
  };
}

export function decodeProfile(raw: string | null): CustomerProfile | null {
  if (!raw) return null;
  const data = JSON.parse(raw);
  const profile = data?.profile;
  if (data?.version !== 1 || !profile || typeof profile.name !== "string" || typeof profile.phone !== "string" || !["", "pickup", "delivery"].includes(profile.mode) || Object.keys(validateContact(profile)).length) throw new Error("Perfil incompatible");
  let address: Address | null = null;
  if (profile.address !== null) {
    const candidate = profile.address;
    if (!candidate || Object.entries(emptyAddress).some(([key, value]) => typeof candidate[key] !== typeof value)) throw new Error("Domicilio inválido");
    if (Object.keys(validateAddress(candidate)).length) throw new Error("Domicilio inválido");
    address = selectAddress(candidate);
  }
  return { name: profile.name, phone: profile.phone, mode: profile.mode, address };
}

export const encodeProfile = (profile: CustomerProfile) => JSON.stringify({ version: 1, profile });
