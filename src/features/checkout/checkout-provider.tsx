"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { emptyDraft } from "./checkout";
import type { CheckoutDraft, CustomerProfile } from "./checkout";
import { validateContact } from "./validation";
import { PROFILE_KEY, decodeProfile, encodeProfile, profileFromDraft } from "@/lib/storage/profile-storage";

function useCheckoutState() {
  const [draft, setDraft] = useState<CheckoutDraft>({ ...emptyDraft });
  const [remember, setRemember] = useState(false);
  const [ready, setReady] = useState(false);
  const [profileNotice, setProfileNotice] = useState("");
  const previous = useRef<CustomerProfile | null>(null);

  useEffect(() => {
    try {
      const profile = decodeProfile(localStorage.getItem(PROFILE_KEY));
      if (profile) {
        previous.current = profile;
        setDraft({ ...emptyDraft, ...(profile.address ?? {}), name: profile.name, phone: profile.phone, mode: profile.mode });
        setRemember(true);
      }
    } catch { setProfileNotice("No pudimos recuperar tus datos. Podés completarlos nuevamente."); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !remember || Object.keys(validateContact(draft)).length) return;
    const profile = profileFromDraft(draft, previous.current);
    const timer = window.setTimeout(() => {
      try { localStorage.setItem(PROFILE_KEY, encodeProfile(profile)); previous.current = profile; }
      catch { setProfileNotice("No pudimos recordar tus datos en este navegador. Tu pedido actual puede continuar."); }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [draft, ready, remember]);

  function forget() {
    setRemember(false);
    previous.current = null;
    try { localStorage.removeItem(PROFILE_KEY); setProfileNotice("Eliminamos tus datos guardados de este dispositivo."); }
    catch { setProfileNotice("No pudimos acceder al almacenamiento. Podés borrar los datos del sitio desde tu navegador."); }
  }

  return {
    draft, ready, remember, profileNotice, forget,
    setRemember: (value: boolean) => value ? setRemember(true) : forget(),
    update: (patch: Partial<CheckoutDraft>) => setDraft((current) => ({ ...current, ...patch })),
  };
}

const CheckoutContext = createContext<ReturnType<typeof useCheckoutState> | null>(null);
export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const state = useCheckoutState();
  return <CheckoutContext.Provider value={state}>{children}</CheckoutContext.Provider>;
}
export function useCheckout() {
  const state = useContext(CheckoutContext);
  if (!state) throw new Error("useCheckout requiere CheckoutProvider");
  return state;
}
