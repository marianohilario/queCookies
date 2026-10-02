export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  cookiesPerItem: number;
  kind: "individual" | "pack";
  available: boolean;
  image: string;
  images?: readonly string[];
  cardImage?: string;
  ingredients?: readonly string[];
  allergens?: readonly string[];
};
