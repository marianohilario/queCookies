export const mobileDestinations = [
  { href: "/", label: "Inicio", icon: "home", activePaths: ["/"] },
  { href: "/cookies", label: "Cookies", icon: "cookie", activePaths: ["/cookies"] },
  { href: "/carrito", label: "Carrito", icon: "bag", activePaths: ["/carrito", "/checkout"] },
  { href: "/nosotros", label: "Contacto", icon: "chat", activePaths: ["/nosotros"] },
] as const;

type MobileDestination = (typeof mobileDestinations)[number];

export function isDestinationActive(pathname: string, destination: MobileDestination) {
  return destination.activePaths.some((path) => (
    pathname === path || (path !== "/" && pathname.startsWith(`${path}/`))
  ));
}
