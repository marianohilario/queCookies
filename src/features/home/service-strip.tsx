import { Icon } from "@/components/ui/icon";

const items = [
  {
    title: "Ingredientes Premium",
    text: "Seleccionamos lo mejor para un sabor único.",
    icon: "leaf",
  },
  {
    title: "Hechas a Mano",
    text: "Cada cookie es elaborada con dedicación y amor.",
    icon: "hand-heart",
  },
  {
    title: "Presentación Perfecta",
    text: "Ideales para regalar o regalarte.",
    icon: "gift",
  },
  {
    title: "Envíos a Domicilio",
    text: "Llegamos a donde estés con mucho cuidado.",
    icon: "truck",
  },
] as const;

export function ServiceStrip() {
  return (
    <section
      aria-label="Cómo disfrutar tus cookies"
      className="bg-brand text-cream"
    >
      <div className="page-container grid grid-cols-2 gap-x-5 gap-y-6 py-6 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left"
          >
            <span className="text-yellow">
              <Icon name={item.icon} className="size-9 shrink-0" />
            </span>
            <div>
              <h3 className="text-xs font-semibold">{item.title}</h3>
              <p className="mt-1 max-w-45 text-[11px] leading-5 text-cream/90">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
