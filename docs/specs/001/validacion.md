# 001 — Validación del rediseño

## Estado inicial

- Referencias originales recibidas en public/brand/references/.
- Logo editado en QC-011; motivos y composición fotográfica son los siguientes incrementos.
- Navegación inferior: implementada y verificada en QC-013. Recursos gráficos del resto del rediseño pendientes.

## Plan

| Verificación | Evidencia esperada | Criterios |
| --- | --- | --- |
| Comparar logo antes/después | Archivos de origen/salida y revisión de letra/zonas preservadas | CV-01 |
| Medir paleta y revisar motivos | Recursos y contrastes documentados | CV-02 |
| Navegación mobile | Cuatro enlaces, destinos, activo, contador y ausencia de hamburguesa | CV-03, CV-04 |
| Espacio y responsive | 320/375/390/768/1440 px, safe area y pie/checkout visibles | CV-05 |
| Comparación hero/carta | Capturas mobile/desktop con recursos reales disponibles | CV-06, CV-07 |
| Regresión | Node tests, typecheck/build y recorrido Chrome existente | CV-08 |

## Registro

La planificación documental no cuenta como validación de una interfaz ni como edición de una imagen. Cada issue registra sus resultados al verificarse; las limitaciones de recursos quedan visibles.

### QC-013 — Navegación inferior

- Cuatro enlaces con iconos SVG propios: Inicio, Cookies, Carrito y Contacto. Estado activo centralizado en navigation.ts; contador visual compartido con el acceso de escritorio.
- Retirados MobileNav desplegable y CartBar contextual; búsqueda de referencias confirma que no quedan usos. Encabezado móvil centrado.
- Altura centralizada con reserva inferior, safe area y píxel de borde. La primera prueba de geometría detectó que faltaba reservar el borde; se corrigió y volvió a comprobar.
- `npm run check`: TypeScript, 22 pruebas de dominio, build y smoke HTTP correctos.
- `npm run build && npm run test:browser`: correctos tras el ajuste de espacio.
- Chrome: cuatro destinos, iconos/textos y áreas táctiles ≥44 px a 320/375/390; navegación desktop visible y barra inferior oculta a 1440.
- Comprobados clics, activo en fichas/checkout y ausencia de selección falsa en FAQ. El carrito indica dos artículos en la selección de una cookie y un pack.
- Pie accesible al llegar al final; CTA de WhatsApp completamente visible por encima de la barra. Sin segunda barra contextual ni overflow horizontal.
- Regresión de retiro/envío, datos recordados, almacenamiento corrupto/bloqueado y sincronización entre pestañas correcta. Sin excepciones JS ni errores de consola capturados.
- Capturas revisadas: `.artifacts/browser/home-390.png` y `.artifacts/browser/checkout-bottom-nav-390.png`.

CV-03/CV-04 y geometría de CV-05 verificados en Chrome emulado. Safe area física, teclado virtual y Safari se mantienen pendientes en QC-009. CV-01/CV-02/CV-06/CV-07 no se dan por realizados: requieren los recursos y siguientes issues.

### QC-011 — Logo original corregido

- Editada la primera s de «cookiss» con la e extraída de «que»; fuente PNG preservada y salida 1080 × 1080 con transparencia.
- Herramienta nativa reproducible en scripts/brand/. Comparación de la salida PNG decodificada contra el original: 17.580 píxeles modificados dentro de x748/y530/126×164, cero fuera de esa región.
- Revisado el logo completo y el detalle ampliado; corregidos un fragmento de k que entraba en el recorte y residuos de antialias de la s anterior antes de darlo por terminado.
- Brand usa ahora el logo raster real en lugar de la marca tipográfica provisional.
- CV-01 comprobado mediante comparación visual y de píxeles; adaptación responsive se vuelve a revisar con el conjunto del rediseño en QC-016.

### QC-012 — Paleta y motivos

- Decodificados originales en sRGB con CoreGraphics: colores dominantes del logo #92191E (517.732 píxeles) y #FCC256 (129.473); panel amarillo del patrón #FED36D (566.275).
- Extracción de las formas originales a PNG transparente por separación del trazo amarillo y fondo rojo. Revisadas máscaras de mano/cookie/corazón; se ajustó el recorte del corazón para excluir un fragmento de la mano inferior.
- Contrastes rojo/amarillo 5,46:1, rojo/amarillo complementario 6,20:1 y rojo/crema 8,36:1; adecuados para los pares de texto normal planteados. Motivos atenuados se usan solo como decoración.
- Tokens globales actualizados; motivos reutilizados desde componentes pequeños en pie y navegación.
- La verificación conjunta en navegador de recursos y disposición sigue en QC-016.

### QC-014 — Hero reconstruido con el recurso suministrado

- HeroPhoto, Hero y WaveDivider separan fotografía, contenido y geometría; CSS del fondo/máscara acotado a hero.module.css.
- Imagen original preservada y derivado JPEG preparado con sips; texto/CTA son HTML, no una captura con texto incrustado.
- Revisadas home-390.png y home-1440.png: logo original corregido visible, escena del plato integrada, ondas y sello con mano extraída. Variante mobile más compacta con acciones antes del plato.
- `npm run build` y `npm run test:browser`: correctos. Se conserva compra, mínimo, packs, persistencia, datos recordados y navegación inferior.
- El smoke HTTP se actualizó al nuevo título, «No son solo cookies»; se ejecutará junto con la verificación completa final.
- CV-06 revisado visualmente con la referencia. La carta conserva de momento su estilo previo hasta QC-015.

### QC-015 — Carta y franjas

- Cinco destacados en desktop y grilla legible en mobile, título centrado con corazones originales, tarjetas crema con borde amarillo e ilustraciones aisladas.
- Recortes del mockup suministrado separados de los datos comerciales; se conserva etiqueta ilustrativa. Verificados nombres, precios y presentaciones mediante las pruebas de dominio existentes.
- Corregido el tamaño de los retratos: se define la caja visual explícita para evitar que la densidad de srcset reduzca ilustraciones pequeñas a aproximadamente 65–85 px.
- Franja roja con cookie/mano/corazón e información operativa real. Bloque amarillo de minis usa patrón original y precio base del catálogo; no incorpora servicios ficticios del mockup.
- Revisadas home-1440.png, home-catalog-390.png y brand-minis-390.png.
- `npm run check` y `npm run test:browser`: correctos, incluidos 22 casos de dominio y regresión del checkout. La evidencia del escenario nuevo de assets/visual se registra en QC-016.
