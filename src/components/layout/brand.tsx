import Link from "next/link";
import { business } from "@/config/business";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label={`${business.name}, inicio`} className={`flex items-center gap-2 ${light ? "text-yellow" : "text-brand"}`}>
      <span className="font-display text-[30px] leading-[.8] font-black tracking-[-2px]">
        {business.name.split(" ")[0].toLowerCase()}
        <span className="block text-[20px] tracking-[-1px]">{business.name.split(" ").slice(1).join(" ").toLowerCase()}</span>
      </span>
      <svg width="35" height="35" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M33 15a8 8 0 0 1-8-10A17 17 0 1 0 37 21a7 7 0 0 1-4-6Z" fill="currentColor" opacity=".9" />
        <g fill={light ? "#8F1D22" : "#FFCA5C"}><circle cx="13" cy="14" r="2" /><circle cx="22" cy="24" r="2.5" /><circle cx="12" cy="27" r="2" /><circle cx="27" cy="32" r="1.5" /></g>
      </svg>
    </Link>
  );
}
