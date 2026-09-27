"use client";
import { useRef } from "react";
import Link from "next/link";
import { Icon } from "../ui/icon";

export function MobileNav({ links }: { links: readonly (readonly [string, string])[] }) {
  const menu = useRef<HTMLDetailsElement>(null);
  function close(restoreFocus = false) {
    if (!menu.current) return;
    menu.current.open = false;
    if (restoreFocus) menu.current.querySelector("summary")?.focus();
  }
  return (
    <details ref={menu} className="group md:hidden" onKeyDown={(event) => { if (event.key === "Escape") close(true); }}>
      <summary className="icon-button list-none cursor-pointer" aria-label="Abrir navegación"><Icon name="menu" /></summary>
      <nav aria-label="Navegación móvil" className="absolute inset-x-0 top-full border-b border-brand/15 bg-cream p-5 shadow-lg">
        {links.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => close()} className="block rounded-xl px-4 py-3 hover:bg-brand/5">{label}</Link>
        ))}
      </nav>
    </details>
  );
}
