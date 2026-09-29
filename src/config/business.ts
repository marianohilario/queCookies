export const business = {
  name: "Que Cookies",
  whatsapp: "5491161919801",
  phoneLabel: "+54 9 11 6191-9801",
  instagram: "https://www.instagram.com/quecookiss/",
  address: "Peña 298, Banfield, Buenos Aires",
  hoursLabel: "Todos los días, de 9 a 19 h",
  opens: "09:00",
  closes: "19:00",
  timezone: "America/Argentina/Buenos_Aires",
  currency: "ARS",
  locale: "es-AR",
  minimumCookies: 2,
  coverage: ["Lomas de Zamora", "Lanús", "Adrogué (Almirante Brown)"],
} as const;

export const contactUrl = `https://wa.me/${business.whatsapp}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=16&output=embed`;
