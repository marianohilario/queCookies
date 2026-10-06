import type { Product } from "../features/catalog/product.ts";

export const stockPhotos = {
  // cookies:
  //   "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1400&q=85",
  cookies: "/images/cookies/traditional_bg.jpeg",
  assortment: "/images/cookies/minis.png",
  // assortment:
  //   "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85",
};

const flavors = [
  [
    "tradicional",
    "Tradicional",
    3500,
    "Hay clásicos a los que siempre dan ganas de volver.",
  ],
  ["cacao", "Cacao", 4000, "Para cuando tu pausa pide un poco más de cacao."],
  ["red-velvet", "Red Velvet", 4000, "Un antojo con personalidad propia."],
  [
    "bon-o-bon",
    "Bon o Bon",
    5000,
    "Tu próximo momento dulce puede empezar por acá.",
  ],
  [
    "nutella",
    "Nutella",
    5000,
    "Una favorita para acompañar ese ratito para vos.",
  ],
  [
    "red-velvet-rellena",
    "Red Velvet rellena",
    5000,
    "Otra forma de elegir ese sabor que te encanta.",
  ],
  ["pistacho", "Pistacho", 5000, "Una invitación a salir del clásico."],
  [
    "cacao-chocolate-blanco",
    "Cacao y chocolate blanco",
    4000,
    "Dos protagonistas para una misma pausa.",
  ],
] as const;

type FlavorSlug = (typeof flavors)[number][0];

// Recetas de las ocho cookies individuales aportadas por el negocio.
const flavorRecipes: Record<
  FlavorSlug,
  { ingredients: readonly string[]; allergens: readonly string[] }
> = {
  tradicional: {
    ingredients: [
      "Harina de trigo",
      "Azúcar blanca",
      "Azúcar rubia",
      "Esencia de vainilla",
      "Mantequilla",
      "Bicarbonato",
      "Polvo de hornear",
      "Sal",
      "Chips chocolate amargo",
      "Chocolate semi amargo",
      "Huevo",
    ],
    allergens: ["Trigo", "Leche", "Huevo"],
  },
  cacao: {
    ingredients: [
      "Mantequilla",
      "Azúcar rubia",
      "Azúcar blanca",
      "Cacao amargo",
      "Harina de trigo",
      "Bicarbonato",
      "Huevo",
      "Sal",
      "Chocolate semi amargo",
      "Chips chocolate amargo",
    ],
    allergens: ["Trigo", "Leche", "Huevo"],
  },
  "red-velvet": {
    ingredients: [
      "Mantequilla",
      "Azúcar rubia",
      "Azúcar blanca",
      "Cacao amargo",
      "Harina de trigo",
      "Bicarbonato",
      "Sal",
      "Chocolate blanco",
      "Chips chocolate blanco",
      "Polvo de hornear",
      "Esencia de vainilla",
      "Huevo",
    ],
    allergens: ["Trigo", "Leche", "Huevo"],
  },
  "bon-o-bon": {
    ingredients: [
      "Harina de trigo",
      "Azúcar blanca",
      "Azúcar rubia",
      "Esencia de vainilla",
      "Mantequilla",
      "Bicarbonato",
      "Polvo de hornear",
      "Sal",
      "Chocolate con leche",
      "Bon o Bon",
      "Huevo",
    ],
    allergens: ["Trigo", "Leche", "Huevo", "Maní"],
  },
  nutella: {
    ingredients: [
      "Harina de trigo",
      "Azúcar blanca",
      "Azúcar rubia",
      "Esencia de vainilla",
      "Mantequilla",
      "Bicarbonato",
      "Polvo de hornear",
      "Sal",
      "Chocolate con leche",
      "Nutella",
      "Huevo",
    ],
    allergens: ["Trigo", "Leche", "Huevo", "Avellana"],
  },
  "red-velvet-rellena": {
    ingredients: [
      "Huevo",
      "Mantequilla",
      "Azúcar rubia",
      "Azúcar blanca",
      "Cacao amargo",
      "Harina de trigo",
      "Bicarbonato",
      "Sal",
      "Chocolate blanco",
      "Chips chocolate blanco",
      "Polvo de hornear",
      "Esencia de vainilla",
      "Pins blanco",
      "Crema de leche",
    ],
    allergens: ["Trigo", "Leche", "Huevo"],
  },
  pistacho: {
    ingredients: [
      "Harina de trigo",
      "Azúcar blanca",
      "Azúcar rubia",
      "Esencia de vainilla",
      "Mantequilla",
      "Bicarbonato",
      "Polvo de hornear",
      "Sal",
      "Chocolate blanco",
      "Pasta de pistacho",
      "Pins blanco",
      "Crema de leche",
      "Pistachos",
      "Huevo",
    ],
    allergens: ["Trigo", "Leche", "Huevo", "Pistacho"],
  },
  "cacao-chocolate-blanco": {
    ingredients: [
      "Mantequilla",
      "Azúcar rubia",
      "Azúcar blanca",
      "Cacao amargo",
      "Harina de trigo",
      "Bicarbonato",
      "Sal",
      "Chocolate blanco",
      "Chips chocolate blanco",
      "Huevo",
    ],
    allergens: ["Trigo", "Leche", "Huevo"],
  },
};

const cardIllustrations: Record<string, string> = {
  tradicional: "tradicional.png",
  cacao: "cacao.png",
  "red-velvet": "red-velvet.png",
  "bon-o-bon": "bon-o-bon.png",
  nutella: "nutella.png",
  "red-velvet-rellena": "red-velvet-rellena.png",
  pistacho: "pistacho.png",
  "cacao-chocolate-blanco": "cacao-chocolate-blanco.png",
};

export const individualCookies: Product[] = flavors.map(
  ([slug, name, pesos, description], index) => ({
    id: `cookie-${slug}`,
    slug,
    name,
    description,
    price: pesos * 100,
    cookiesPerItem: 1,
    kind: "individual",
    available: true,
    image: `/images/cookies/${cardIllustrations[slug]}`,
    images: [`/images/cookies/${cardIllustrations[slug]}`],
    cardImage: `/images/cookies/${cardIllustrations[slug]}`,
    ...flavorRecipes[slug],
  }),
);

export const packSizes = [12, 24, 48, 96] as const;
export type PackSize = (typeof packSizes)[number];
// Cada presentación tiene su precio cerrado: ya no son múltiplos del pack de 12,
// así que los importes se publican uno por uno en lugar de derivarse de una base.
export const packPrices: Record<PackSize, number> = {
  12: 950000,
  24: 1850000,
  48: 3550000,
  96: 6700000,
};
export const packSizesLabel = new Intl.ListFormat("es-AR", {
  type: "disjunction",
}).format(packSizes.map(String));
// Los packs de minis se arman solo con estos tres sabores; el cliente define cuántas de cada uno.
export const miniFlavorSlugs = ["tradicional", "cacao", "red-velvet"] as const;
export type MiniFlavorSlug = (typeof miniFlavorSlugs)[number];

export const miniFlavors = miniFlavorSlugs.map((slug) => {
  const product = individualCookies.find((cookie) => cookie.slug === slug)!;
  return { slug, name: product.name };
});

export const miniPacks: Product[] = packSizes.map((size) => ({
  id: `mini-cookies-${size}`,
  slug: "mini-cookies",
  name: `Mini cookies × ${size}`,
  description:
    "Pequeñas para compartir, de tradicional, cacao y red velvet. Armá tu combinación sabor por sabor y sumale los dips que quieras.",
  price: packPrices[size],
  cookiesPerItem: size,
  kind: "pack",
  available: true,
  image: stockPhotos.assortment,
}));

// Los packs se pueden pedir con dips extra: el cliente elige cuántos de cada
// sabor y cada uno suma el mismo precio al pack.
export const dipPrice = 200000;
export const dipFlavorSlugs = ["nutella", "chocolate-blanco"] as const;
export type DipFlavorSlug = (typeof dipFlavorSlugs)[number];
export const dipFlavors: { slug: DipFlavorSlug; name: string }[] = [
  { slug: "nutella", name: "Dip de Nutella" },
  { slug: "chocolate-blanco", name: "Dip de chocolate blanco" },
];

export const products: Product[] = [...individualCookies, ...miniPacks];
export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
export const findBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

const featuredIds = [
  "cookie-tradicional",
  "cookie-pistacho",
  "cookie-red-velvet",
  "cookie-nutella",
  "cookie-cacao",
];
export const featuredCookies = featuredIds.map(
  (id) => individualCookies.find((product) => product.id === id)!,
);
