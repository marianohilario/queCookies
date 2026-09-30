# 001 — Identidad fiel y rediseño de la vidriera

## Estado y alcance

Ampliación visual de R1. La compra sigue gobernada por [000/spec.md](../000/spec.md): no cambia catálogo, precios, mínimo, entrega ni integración por WhatsApp.

El usuario pide conservar el logo original cambiando una sola letra, incorporar motivos de la marca, acercar la presentación a la referencia gastronómica y sustituir el menú móvil por cuatro accesos inferiores visibles.

Documentos: [arquitectura y stack](./arquitectura-y-stack.md), [plan](./plan-de-tareas.md), [aceptación](./criterios-de-aceptacion.md), [validación](./validacion.md).

## Referencias proporcionadas

1. Logo circular rojo con letras amarillas «que cookiss», sombras, migas y tres formas superiores amarillas.
2. Pieza de marca con patrón de cookies, manos y corazones; fondo rojo y panel amarillo.
3. Mockup de tienda: hero horizontal con plato de cookies, fondo suave, texto editorial, bordes ondulados, carta compacta y franja inferior de beneficios.

Archivos recibidos en `public/brand/references/`: logo-original.png, patron-marca.jpg, referencia-web.jpeg y hero-original.png. La edición y extracción parten de esos archivos, preservando sus originales.

## Requisitos

### RV-01 — Edición mínima del logo

- Cambiar «cookiss» por «cookies»: sustituir la primera s, inmediatamente después de la i, por e; conservar la s final.
- Conservar las demás letras, composición, fondo, colores, sombras, migas y silueta circular.
- Preferir el original vectorial; si solo existe raster, trabajar a resolución original y conservar intacto el archivo fuente.
- Evaluar reutilizar la e de «que» para respetar la forma tipográfica. Ajustar escala/posición al espacio de la letra reemplazada, sin reescribir la palabra con otra fuente.
- Entregar comparación antes/después. Si el raster no permite una integración fiel, comunicar la limitación y revisar el resultado, sin declarar equivalencia exacta.

### RV-02 — Paleta y motivos de marca

- Rojo y amarillo reales como colores principales. Crema puede ser superficie neutra; no trasladar el verde pistacho de la referencia como color de marca.
- Medir colores desde archivos originales cuando estén disponibles; conservar contraste legible en texto y controles.
- Incorporar cookies, manos y corazones como SVG reutilizables o recursos extraídos del original. Identificar una reconstrucción como tal cuando no sea el vector original.
- Usar motivos con moderación en separadores, sellos y franjas; no reducir legibilidad ni convertir ilustraciones decorativas en controles confusos.
- Footer (QC-030): enlaces a Instagram y WhatsApp con sus logos SVG reconocibles, texto visible y contactos configurados. Composición de icono amarillo en superficie roja sutil, bordes discretos, foco visible y áreas táctiles de al menos 44 px; sin desbordamiento desde 320 px.
- Envíos (QC-031): comunicar «Envíos a coordinar · Costo según destino», con costo a cargo del cliente conforme a RF-06 actualizado.

### RV-03 — Navegación móvil inferior

Cuatro opciones permanentes con icono y texto:

| Opción | Destino | Estado activo |
| --- | --- | --- |
| Inicio | `/` | Solo inicio |
| Cookies | `/cookies` | Carta y fichas de cookies/minis |
| Carrito | `/carrito` | Carrito y checkout |
| Contacto | `/nosotros` | Página de contacto |

- Visible en pantallas menores de 768 px; escritorio conserva navegación superior.
- Eliminar el menú hamburguesa y su desplegable. En móvil, encabezado simple con marca centrada; los accesos funcionales viven en la barra inferior.
- Estado activo distinguible por forma/color/peso y señal semántica. FAQ/privacidad no simulan estar en una de las cuatro páginas principales.
- Carrito con contador de artículos basado en el mismo estado existente: un pack cuenta como un artículo, sin cambiar el mínimo por cookies físicas.
- Reemplazar la barra contextual móvil del carrito; no apilar dos barras fijas ni superponer un WhatsApp flotante.
- Reservar espacio real al pie, contemplar safe area y no ocultar el último contenido ni botones del checkout.
- Enlaces de al menos 44 × 44 px, iconos decorativos y texto siempre visible. No bloquear zoom o gestos del navegador.

### RV-04 — Hero cercano a la referencia

- Escritorio: texto a la izquierda y escena de un plato con varias cookies a la derecha, con proporciones más próximas al mockup.
- Móvil: título y CTA compactos seguidos de la escena gastronómica; acercar visualmente producto y acción.
- Superficie suave de la paleta roja/amarilla, ondas de separación y sello de marca sin afirmaciones no verificadas.
- Mantener texto y CTA como HTML accesible; no convertir todo el hero en una captura de la referencia.
- Para la escena fotográfica usar el archivo fuente del hero, recortes autorizados o fotos suministradas. Una captura puede servir como recurso provisional recortado si su resolución y contenido lo permiten, indicando su carácter ilustrativo.
- No prometer una nueva fotografía idéntica sin disponer de recursos o herramienta de generación. La composición de UI sí puede reconstruirse con CSS/SVG.

### RV-05 — Carta y franjas visuales

- Por solicitud posterior del usuario, retirar todos los badges visibles «Imagen ilustrativa» del hero, tarjetas y fotos de producto. La procedencia de los recursos permanece documentada en `docs/assets.md`.

- Aproximar tarjetas, bordes, espaciado y proporción de fotos a la referencia, usando productos y precios reales.
- Mantener compra de individuales y packs; no incorporar regalos, personalización, cuentas, Mercado Pago o beneficios ficticios presentes en el mockup.
- Motivos de marca en franja y pie; información operativa real en lugar de afirmaciones no confirmadas.
- Mini banner: marco decorativo en los cuatro lados, alternando manitos y galletas con los patrones limpios de `public/brand/motifs/`. Repetir pares completos sin recortar dibujos; reservar las esquinas redondeadas y separar el marco del contenido. Aceptación: motivos completos arriba, abajo y en ambos laterales, sin superposición con texto/CTA ni desbordamiento en móvil y escritorio.
- Por solicitud posterior del usuario, la franja de inicio adopta el contenido de la nueva referencia: «Ingredientes Premium», «Hechas a Mano», «Presentación Perfecta» y «Envíos a Domicilio», con sus descripciones e iconos lineales de hoja, mano con corazón, regalo y camión. Conserva los tokens actuales `bg-brand`, `text-yellow` y `text-cream`, y la distribución responsive existente. Este cambio de contenido no modifica las condiciones de entrega ni incorpora productos de regalo.
- No incorporar animación 360° sin fotografías/secuencia adecuadas.
- Las tarjetas de inicio y catálogo muestran la cantidad elegida desde el carrito compartido, identificada por ID de producto. Permiten agregar desde cero y eliminar la última unidad con «−» (RF-03 / QC-017). Los controles esperan la recuperación del carrito y no permiten comprar productos no disponibles.

### RV-06 — Amplitud y refinamiento visual (QC-018)

- Ampliar el contenedor compartido de 1280 a 1536 px, con márgenes fluidos y textos de lectura acotados.
- Hero de escritorio más alto (mínimo 560 px desde 1024 px), con título y fotografía de mayor presencia; composición apilada en móvil.
- Conservar rojo #92191e, amarillo #fcc256, amarillo suave #fed36d, crema #fff8ec, tinta #36191b y secundario #705b56. Fraunces para titulares y DM Sans para lectura y controles.
- Composición: `[texto alineado a izquierda | fotografía amplia]`, seguida de `[título centrado / carta con aire]`. En móvil: `[texto centrado / acciones / fotografía]`.
- Concentrar la expresión en el hero gastronómico. Evitar añadir gradientes ornamentales, animaciones o etiquetas; unificar el peso del titular en lugar de enfatizar frases en cursiva. Tarjetas con jerarquía tipográfica y superficies sutiles, sin sombras repetidas.
- Usar el logo corregido existente como favicon y como icono de acceso en dispositivos Apple.
- Aceptación: sin desbordamiento a 320, 390, 768, 1440 y 1920 px; contenedor de 1536 px en 1920; hero de al menos 560 px en escritorio; icono de marca servido correctamente; conservar interacción del carrito y foco visible.

### RV-07 — Mapa de retiro y favicon contrastado (QC-019)

- La sección compartida de contacto incorpora Google Maps con la dirección derivada de `business.address`, junto al texto en escritorio y debajo en móvil. Mantiene el enlace «Cómo llegar», carga diferida y título accesible.
- Composición `[contacto | mapa]` con panel cartográfico de al menos 320 px de alto, esquinas redondeadas y borde discreto de marca. Paleta y tipografías de RV-06; sin motivos adicionales encima del mapa.
- Favicon derivado del logo corregido con contorno circular amarillo #fcc256, transparente fuera del círculo. Generar tamaños 32/192 px y Apple 180 px sin modificar el logo de la web.
- Compatibilidad Chrome (QC-020): usar además la convención `src/app/favicon.ico` de Next, con entradas de 16/32/48 px y metadata automática. `/favicon.ico` debe responder 200; evitar múltiples iconos de pestaña que compitan entre sí.
- Aceptación: mapa con dirección correcta en inicio y contacto, sin overflow móvil; iconos servidos con tamaños declarados y contorno visible al revisar la imagen.

## Dependencias y orden

Los archivos originales de logo, patrón y escena fotográfica ya están disponibles. La navegación inferior se implementó y verificó de forma independiente en QC-013.

Cada unidad se trabaja como un issue pequeño, con criterios, evidencia y commit semántico. El rediseño de 001 reemplaza las decisiones de navegación/estética incompatibles de 000; conserva sus reglas comerciales y su historial.
