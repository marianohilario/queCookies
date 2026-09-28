import Link from "next/link";
import Image from "next/image";
import { business } from "@/config/business";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label={`${business.name}, inicio`} className="inline-flex shrink-0 rounded-full">
      <Image
        src="/brand/que-cookies-logo.png"
        alt={business.name}
        width={1080}
        height={1080}
        sizes={light ? "112px" : "(max-width: 767px) 72px, 80px"}
        preload={!light}
        className={light ? "size-28" : "size-18 md:size-20"}
      />
    </Link>
  );
}
