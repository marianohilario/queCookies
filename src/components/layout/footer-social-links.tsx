import { business, contactUrl } from "@/config/business";
import { Icon } from "@/components/ui/icon";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: "whatsapp",
    href: contactUrl,
    detail: business.phoneLabel,
  },
  {
    name: "Instagram",
    icon: "instagram",
    href: business.instagram,
    detail: "Un poquito de nuestro mundo",
  },
] as const;

export function FooterSocialLinks() {
  return (
    <div className="flex max-w-72 flex-col gap-3">
      {socialLinks.map(({ name, icon, href, detail }) => (
        <a
          key={icon}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-16 items-center gap-3 rounded-2xl border border-yellow/25 bg-cream/5 px-3 py-3 transition-colors hover:border-yellow/60 hover:bg-yellow/10 focus-visible:outline-yellow duration-300"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow/10 text-yellow transition-colors duration-300 group-hover:bg-yellow group-hover:text-brand">
            <Icon name={icon} className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{name}</span>
            <span className="mt-0.5 block text-xs leading-5 text-cream/80">
              {detail}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
