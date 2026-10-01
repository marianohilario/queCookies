import { developer, developerContactUrl } from "@/config/business";
import { Icon } from "@/components/ui/icon";

const channels = [
  { icon: "instagram", href: developer.instagram, name: "Instagram" },
  { icon: "whatsapp", href: developerContactUrl, name: "WhatsApp" },
] as const;

export function DeveloperCredit() {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-cream/65">
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="font-display text-sm text-yellow font-extrabold"
        >
          &lt;/&gt;
        </span>
        Diseñado y desarrollado por{" "}
        <span className="font-bold text-yellow">{developer.name}</span>
      </span>
      <span className="flex items-center gap-2">
        {channels.map(({ icon, href, name }) => (
          <a
            key={icon}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} de ${developer.name}`}
            className="flex items-center justify-center rounded-full text-yellow/80 transition-colors hover:text-yellow focus-visible:outline-yellow cursor-pointer"
          >
            <Icon name={icon} className="size-4" />
          </a>
        ))}
      </span>
    </p>
  );
}
