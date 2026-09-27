import { ButtonLink } from "@/components/ui/button";
export default function NotFound() {
  return <section className="page-container section-space text-center"><p className="eyebrow">Esta página se terminó antes que las cookies</p><h1 className="section-title mt-5">Volvamos a la carta.</h1><ButtonLink href="/cookies" className="mt-8">Encontrá tu próxima favorita</ButtonLink></section>;
}
