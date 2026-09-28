import { BrandMotif } from "@/components/brand/brand-motif";
import { Icon } from "@/components/ui/icon";
import { business } from "@/config/business";
import { packSizesLabel } from "@/data/catalog";

const items = [
  { title: "Tus sabores favoritos", text: "Combiná las cookies como más te gusten.", motif: "cookie" },
  { title: "Minis para compartir", text: `Packs de ${packSizesLabel}.`, motif: "heart" },
  { title: "Retiro en Banfield", text: business.hoursLabel, motif: "hand" },
  { title: "Envíos a coordinar", text: "Consultá cobertura y costo por WhatsApp.", icon: "pin" },
] as const;

export function ServiceStrip() {
  return (
    <section aria-label="Cómo disfrutar tus cookies" className="bg-brand text-cream">
      <div className="page-container grid grid-cols-2 gap-x-5 gap-y-6 py-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
            <span className="text-yellow">
              {"motif" in item ? <BrandMotif name={item.motif} className="h-10 w-9" /> : <Icon name={item.icon} className="size-9" />}
            </span>
            <div><h3 className="text-xs font-semibold">{item.title}</h3><p className="mt-1 max-w-45 text-[11px] leading-5 text-cream/90">{item.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
