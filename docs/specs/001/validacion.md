# 001 — Validación del rediseño

### QC-025 — Skill de diseño local

- Revisados `.agents/skills/frontend-design/SKILL.md`, licencia Apache 2.0 y `skills-lock.json`: skill local de diseño, origen y hash declarados; sin dependencias de ejecución de la web.

### QC-024 — Presentación del carrito

- Revisados cambios pendientes: bolsa de 28 px en escritorio, posición del contador ajustada y formato multilínea en CartProvider sin cambios de lógica.
- `npm run check` y `npm run test:browser` correctos sobre el estado final: 22 pruebas, compilación, smoke HTTP y recorrido de cantidades, persistencia y checkout.

### QC-023 — Logo en encabezado y footer

- Revisados cambios pendientes: tamaño de logo de escritorio de 68 px, prop de clases opcional y borde amarillo circular en el footer.
- Build y regresión Chrome responsive a 320/375/390/768/1440/1920 px correctos durante la preparación de commits.

### QC-022 — Retirada de badges

- Eliminadas etiquetas visibles «Imagen ilustrativa» de HeroPhoto, ProductCard y ProductImage; conservadas descripciones alternativas y documentación de procedencia.
- Typecheck correcto al implementar; `npm run check` y `npm run test:browser` correctos al preparar commits.

### QC-021 — QR con logo central

- Entregable: `public/brand/qr-que-cookies.png`, 1376×1376 px, módulos negros, fondo blanco, margen de seguridad y logo central.
- Generado con CoreImage y corrección H; Vision decodificó el resultado compuesto a `https://www.quecookies.com.ar` antes de guardarlo. No se declara una prueba de impresión física.

### QC-020 — Favicon nativo de Next

- Diagnóstico: el HTML de producción sí incluía los enlaces PNG en head; `/favicon.ico` respondía 404. No se pudo reproducir la caché de la sesión del usuario ni atribuirle con certeza el icono genérico.
- Generador ampliado para producir `src/app/favicon.ico` con entradas PNG de 16/32/48 px. Next publica `/favicon.ico` y agrega un único enlace de icono con hash; retiradas las dos declaraciones PNG competidoras. Apple mantiene su PNG de 180 px.
- `npm run build`: correcto. Verificación HTTP: `/favicon.ico` responde 200, `image/x-icon`, contenedor con tres entradas. Chrome decodifica el icono enlazado a 48×48; hay un único `rel=icon` y URL versionada. Esto verifica entrega/decodificación, no la UI de pestañas de la sesión personal del usuario.

### QC-019 — Mapa de ubicación y favicon contrastado

- BusinessContact compartido por inicio y `/nosotros`: iframe Google Maps derivado de la dirección configurada, carga diferida, título accesible y enlace externo conservado. Dos columnas desde 1024 px; mapa inferior en móvil.
- Generados PNG transparentes de 32/180/192 px mediante `scripts/brand/generate-favicon.mjs`, con disco amarillo #fcc256 y logo original superpuesto. Contorno equivalente a 2 px en el favicon de 32 px. Metadata actualizada con tamaños explícitos.
- `npm run check` y `npm run test:browser`: correctos; 22 pruebas, build, smoke HTTP y regresión de compra/responsive entre 320 y 1920 px.
- Revisión adicional en Chrome de `/nosotros` a 390/1440 px: sin overflow, mapa de 320/420 px de alto, dirección Peña 298 mostrada por Google y marcador visible. Capturas revisadas: `.artifacts/browser/contact-map-390.png` y `contact-map-1440.png`.
- Los tres iconos cargan y decodifican en navegador con sus dimensiones correspondientes. Revisado visualmente `public/brand/favicon-192.png` para comprobar contorno y conservación de letras/mordida.

### QC-018 — Amplitud y refinamiento visual

- Contenedor compartido de 1536 px, hero de escritorio de 560–680 px mínimos según viewport, tipografía fluida y fotografía ampliada. Refinadas jerarquía, espaciado, tarjetas y banner de minis conservando los colores de marca.
- Metadata con favicon e icono Apple apuntando al logo corregido existente.
- `npm run check`: TypeScript, 22 pruebas, build y smoke HTTP correctos.
- `npm run test:browser`: sin overflow en inicio y catálogo a 320/375/390/768/1440/1920 px. Aserciones de contenedor de 1536 px, hero ≥560 px y enlace de favicon correctas; recurso del logo con HTTP 200 y tipo imagen.
- Revisadas visualmente `.artifacts/browser/home-390.png`, `home-1440.png` y `home-1920.png`: jerarquía del hero, composición fotográfica, amplitud de escritorio y disposición móvil.
- Regresión correcta de navegación, cantidades, checkout, WhatsApp interceptado, almacenamiento y sincronización; sin excepciones JavaScript capturadas.

## Estado actual

- Referencias originales recibidas en public/brand/references/.
- Logo editado en QC-011, motivos/paleta extraídos en QC-012, hero y tarjetas implementados en QC-014/QC-015.
- Navegación inferior implementada en QC-013; conjunto revisado con recursos originales y regresión Chrome en QC-016.

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

### QC-016 — Verificación final del incremento visual

- `npm run check`: correcto. TypeScript, 22 pruebas de dominio, build de producción de 18 páginas y smoke HTTP de nueve rutas más 404.
- `npm run test:browser`: correcto. Sin desbordamiento horizontal en 320/375/390/768/1440 px; navegación inferior, contador, espacio al pie y CTA del checkout accesibles.
- Escenario nuevo `redesign-scenario.mjs`: logo corregido servido en encabezado, rojo calculado en navegador `rgb(146,25,30)`, hero local y diez recursos gráficos con HTTP 200 y tipo imagen.
- Ilustraciones de tarjetas cargadas y con tamaño visible ≥100 px en la revisión mobile, evitando regresión del escalado automático de srcset.
- Revisadas capturas home-390.png, home-1440.png, home-catalog-390.png, brand-minis-390.png y checkout-bottom-nav-390.png en `.artifacts/browser/`.
- Conservado el recorrido: mínimo, packs, total mixto $13.004, precarga de datos, retiro sin domicilio personal, envío con costo pendiente, enlace correcto a WhatsApp, copia manual, almacenamiento corrupto/denegado y sincronización entre pestañas.
- No se instalaron dependencias; herramientas de imagen nativas y motor sharp ya incluido por Next. Las pruebas interceptan WhatsApp y no envían mensajes al negocio.

Resultado: CV-01 a CV-08 revisados dentro del alcance de archivos y Chrome emulado. No se declara publicación, aprobación editorial definitiva ni pruebas físicas de Safari/iOS; permanecen en QC-008/QC-009. Las imágenes de tarjetas son ilustrativas y su procedencia está en docs/assets.md.

### QC-017 — Selector de cantidades en las tarjetas

- `ProductCard` consulta el carrito por ID y reutiliza `add`, `setQuantity` y `remove`: cero representa ausencia de línea, sin persistir cantidades inválidas. Eliminados la búsqueda por nombre y el log de depuración.
- `QuantitySelector` admite mínimo cero y estado deshabilitado. Mínimo uno por defecto para carrito y cantidad pendiente de agregar en la ficha. Revisión de código: las tarjetas bloquean interacción antes de recuperar el carrito y para productos no disponibles; el catálogo actual no incluye un producto no disponible para probar ese estado en navegador.
- `npm run check`: TypeScript, 22 pruebas de dominio, build de 18 páginas y smoke HTTP correctos.
- `npm run test:browser`: correcto. Nuevo escenario `card-quantity-scenario.mjs` verifica en inicio y catálogo agregar 0→1→2, contador de dos artículos, subtotal $7.000, sincronización entre vistas, eliminación 1→0 persistida tras recarga y posibilidad de volver a agregar. Comprueba que «−» queda deshabilitado en cero en las tarjetas, en uno en el carrito y en el selector de packs de la ficha; «Quitar» conserva su funcionamiento.
- Actualizados los escenarios existentes a las etiquetas accesibles del selector. Regresión correcta de mínimo, packs, checkout/WhatsApp, almacenamiento bloqueado/corrupto, sincronización entre pestañas y responsive a 320/375/390/768/1440 px. Sin excepciones JS capturadas.
# Actualización de contenido de la franja de servicios

- Implementados los cuatro textos de la referencia solicitada y sus iconos SVG lineales reutilizables.
- Conservados los tokens de color de marca y la cuadrícula responsive existente (dos/cuatro columnas).
- Verificación: `npm run typecheck` completado correctamente. Sin comprobación visual en navegador para este cambio.
