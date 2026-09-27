import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  ["01", "Seguí tu antojo", "Elegí tus cookies favoritas o un pack de minis y armá tu carrito."],
  ["02", "Decinos cómo", "Completá tus datos y elegí retiro o envío, día y horario preferidos."],
  ["03", "Nos vemos en WhatsApp", "Enviá el pedido preparado. Ahí confirmamos disponibilidad, entrega y pago."],
];

export function HowToOrder() {
  return (
    <section id="como-pedir" className="border-t border-brand/10 bg-[#f4eddc]">
      <div className="page-container section-space">
        <SectionHeading eyebrow="Del antojo a tu mesa" title="Pedir es así de fácil." />
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div key={number} className="border-t border-brand/20 pt-6">
              <span className="font-display text-4xl text-brand/50">{number}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-brand">{title}</h3>
              <p className="mt-3 max-w-80 text-sm leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
