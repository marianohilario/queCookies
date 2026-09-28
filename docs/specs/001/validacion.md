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
