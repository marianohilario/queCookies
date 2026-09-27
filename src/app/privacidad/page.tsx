import type { Metadata } from "next";
import { business, contactUrl } from "@/config/business";
export const metadata: Metadata = { title: "Tus datos y privacidad" };
export default function PrivacyPage() {
  return (
    <section className="page-container section-space">
      <div className="mx-auto max-w-2xl space-y-6 leading-8">
        <h1 className="section-title">Tus datos, con claridad.</h1>
        <p>El carrito de {business.name} se guarda en el navegador de este dispositivo para que puedas retomar tu selección.</p>
        <p>Si elegís «Recordar mis datos y domicilio», guardamos localmente tu nombre, teléfono, modalidad y domicilio. Podés editar o borrar esos datos desde el checkout. No guardamos la fecha, hora ni comentarios de pedidos anteriores como preferencias.</p>
        <p>Al continuar por WhatsApp, tus datos y selección se incorporan al enlace del mensaje preparado. Revisalo y envialo para coordinar con el negocio. WhatsApp tiene sus propias condiciones de privacidad.</p>
        <p>Esta versión no requiere cuenta, no procesa pagos ni registra pedidos en un servidor de gestión. Los datos locales no se sincronizan entre dispositivos y se eliminan al borrar el almacenamiento del sitio.</p>
        <p>Las imágenes ilustrativas se sirven desde Unsplash a través del optimizador de imágenes del sitio. No incorporamos analítica publicitaria.</p>
        <a className="font-semibold text-brand underline underline-offset-4" href={contactUrl}>Consultas por WhatsApp ↗</a>
      </div>
    </section>
  );
}
