import { business, shipping } from "../config/business.ts";

export const faqs = [
  ["¿Cómo hago un pedido?", "Elegí tus cookies, completá tus datos y continuá por WhatsApp. Se abrirá el chat con el mensaje preparado: tenés que enviarlo para que coordinemos disponibilidad y pago."],
  ["¿Cuál es el pedido mínimo?", `El mínimo es de ${business.minimumCookies} cookies. Podés combinar sabores. Un pack de mini cookies ya cumple el mínimo por sí solo.`],
  ["¿Cómo vienen las mini cookies?", "En packs cerrados de 12, 24, 48 o 96 unidades. Podés elegir uno o más packs; no se venden minis sueltas."],
  ["¿De qué sabores son los packs de mini cookies?", "Los packs se arman con tradicional, cacao y red velvet. Vos definís cuántas minis de cada sabor van en el pack, y el precio no cambia según la combinación."],
  ["¿Dónde y cuándo puedo retirar?", `En ${business.address}. ${business.hoursLabel}, con confirmación previa por WhatsApp.`],
  ["¿A dónde hacen envíos?", shipping.description],
  ["¿Puedo pedir para hoy?", "Podés solicitarlo. La fecha y el horario son preferencias: te confirmamos por WhatsApp si podemos preparar tu pedido. Para cantidades grandes, escribinos con anticipación."],
  ["¿Cómo pago o cambio mi pedido?", "El pago y cualquier modificación se coordinan directamente con el negocio por WhatsApp. Esta web no cobra ni confirma automáticamente una reserva."],
  ["¿Dónde consulto los ingredientes y alérgenos?", "Escribinos antes de pedir para confirmar ingredientes, alérgenos y posibles trazas de cada sabor. No asumás que un producto es apto para una dieta especial por su nombre o fotografía."],
] as const;
