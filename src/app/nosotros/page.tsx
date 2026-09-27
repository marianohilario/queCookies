import type { Metadata } from "next";
import { BusinessContact } from "@/components/business-contact";
export const metadata: Metadata = { title: "Nos encontrás en Banfield" };
export default function AboutPage() {
  return (
    <section className="page-container section-space">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Hola, somos Que Cookies</p>
        <h1 className="section-title mt-4">Un lugar para<br />tus antojos.</h1>
        <p className="mt-6 leading-8 text-muted">
          Estamos en Banfield y queremos acompañar tu próxima pausa. Cookies estilo New York,
          minis para compartir y un pedido que coordinamos con vos, de persona a persona.
        </p>
      </div>
      <BusinessContact />
      <p className="mt-8 max-w-xl text-sm leading-7 text-muted">
        ¿Tenés una cafetería, un evento o un pedido grande? Escribinos por WhatsApp para conversar cantidades y anticipación.
      </p>
    </section>
  );
}
