import type { Product } from "../features/catalog/product.ts";

export const stockPhotos = {
  cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1400&q=85",
  assortment: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85",
};

const flavors = [
  ["tradicional", "Tradicional", 3500, "Hay clásicos a los que siempre dan ganas de volver."],
  ["cacao", "Cacao", 4000, "Para cuando tu pausa pide un poco más de cacao."],
  ["red-velvet", "Red Velvet", 4000, "Un antojo con personalidad propia."],
  ["bon-o-bon", "Bon o Bon", 5000, "Tu próximo momento dulce puede empezar por acá."],
  ["nutella", "Nutella", 5000, "Una favorita para acompañar ese ratito para vos."],
  ["red-velvet-rellena", "Red Velvet rellena", 5000, "Otra forma de elegir ese sabor que te encanta."],
  ["pistacho", "Pistacho", 6000, "Una invitación a salir del clásico."],
  ["cacao-chocolate-blanco", "Cacao y chocolate blanco", 4000, "Dos protagonistas para una misma pausa."],
] as const;

export const individualCookies: Product[] = flavors.map(([slug, name, pesos, description], index) => ({
  id: `cookie-${slug}`, slug, name, description, price: pesos * 100,
  cookiesPerItem: 1, kind: "individual", available: true,
  image: index % 2 ? stockPhotos.assortment : stockPhotos.cookies,
}));

export const miniBasePrice = 79200;
export const packSizes = [12, 24, 48, 96] as const;
export const miniPacks: Product[] = packSizes.map((size) => ({
  id: `mini-cookies-${size}`, slug: "mini-cookies", name: `Mini cookies × ${size}`,
  description: "Pequeñas para compartir. Elegí la presentación que mejor va con tu plan.",
  price: size * miniBasePrice, cookiesPerItem: size, kind: "pack", available: true,
  image: stockPhotos.assortment,
}));

export const products: Product[] = [...individualCookies, ...miniPacks];
export const findProduct = (id: string) => products.find((product) => product.id === id);
export const findBySlug = (slug: string) => products.find((product) => product.slug === slug);
