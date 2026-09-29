import { business, contactUrl, mapsUrl, mapsEmbedUrl } from "@/config/business";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icon";

export function BusinessContact() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-brand/15 bg-white lg:grid-cols-2">
      <div className="self-center p-6 sm:p-10 lg:p-12">
        <p className="eyebrow">Pasá a buscar tu momento</p>
        <h2 className="section-title mt-4">Te esperamos<br />en Banfield.</h2>
        <p className="mt-6 flex items-center gap-2"><Icon name="pin" />{business.address}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted"><Icon name="clock" />{business.hoursLabel}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={contactUrl} target="_blank" rel="noreferrer">Hablemos por WhatsApp</ButtonLink>
          <ButtonLink href={mapsUrl} target="_blank" rel="noreferrer" variant="secondary">Cómo llegar ↗</ButtonLink>
        </div>
      </div>
      <iframe
        src={mapsEmbedUrl}
        title={`Ubicación de ${business.name}: ${business.address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-80 w-full border-0 bg-vanilla lg:h-full lg:min-h-105"
      />
    </div>
  );
}
