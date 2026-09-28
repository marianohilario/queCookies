import { Hero } from "@/features/home/hero";
import { Featured } from "@/features/home/featured";
import { MiniBanner } from "@/features/home/mini-banner";
import { HowToOrder } from "@/features/home/how-to-order";
import { BusinessContact } from "@/components/business-contact";
import { ServiceStrip } from "@/features/home/service-strip";

export default function HomePage() {
  return <><Hero /><Featured /><ServiceStrip /><MiniBanner /><HowToOrder /><section className="page-container section-space"><BusinessContact /></section></>;
}
