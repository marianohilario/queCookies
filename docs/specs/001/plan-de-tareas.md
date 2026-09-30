# 001 — Plan en tareas pequeñas

## QC-030 — Redes del footer (RV-02)

- [x] Ampliar `Icon` con logos SVG de Instagram y WhatsApp y componer enlaces sociales con contactos centralizados, etiquetas visibles y colores de marca.
- [x] Verificar build, regresión responsive y de compra; revisar capturas específicas del footer a 390/1440 px. Evidencia en `validacion.md`.

## QC-031 — Envíos a cualquier destino (RF-06)

- [x] Presentar «Tus cookies, donde estés» y condiciones de envío en footer; alinear FAQ, franja y checkout con RF-06 actualizado. Evidencia en `../000/validacion.md`.

Cada fila es una unidad de trabajo y commit(s) propios. No se da por terminada una edición gráfica sin revisar el archivo resultante.

| Issue | Tarea | Entregable y comprobación | Dependencia | Estado |
| --- | --- | --- | --- | --- |
| QC-010 | Especificar rediseño y organizar recursos | Documentos 001, referencias y criterios | Ninguna | Documentado |
| QC-011 | Cambiar una sola letra del logo | Fuente preservada, logo «que cookies», comparación antes/después | Archivo original del logo | Editado y comparado |
| QC-012 | Extraer paleta y preparar motivos | Tokens y máscaras originales de cookie/mano/corazón, contraste medido | Archivo de marca/patrón | Extraído e integrado |
| QC-013 | Navegación inferior mobile | Cuatro accesos, activo, contador y espacio reservado; eliminar hamburguesa/barra duplicada | RV-03 | Implementado y verificado |
| QC-014 | Reconstruir hero | Layout y escena próxima a la referencia, ondas y sello | Recurso fotográfico y QC-012 | Implementado y revisado en capturas |
| QC-015 | Ajustar carta y franjas | Tarjetas y módulos con identidad consistente, sin cambiar oferta | QC-012/QC-014 | Implementado y revisado |
| QC-016 | Regresión del rediseño | Capturas comparables, compra preservada y revisión responsive | Tareas visuales terminadas | Verificado en Chrome y documentado |
| QC-017 | Corregir selector de cantidades de las tarjetas | Agregar desde cero, eliminar desde uno, reflejar carrito por ID y verificar persistencia/regresión (CV-09) | RV-05 / RF-03 | Implementado y verificado en Chrome |

## Primer incremento ejecutable — QC-013

- [x] Definir rutas y estado activo en una configuración única.
- [x] Agregar iconos funcionales y contador compartido.
- [x] Implementar barra inferior y simplificar encabezado móvil.
- [x] Retirar hamburguesa y barra contextual de carrito.
- [x] Reservar espacio y contemplar safe area; verificar pie/checkout en viewport Chrome.
- [x] Verificar móvil/escritorio, enlace al carrito y recorrido de compra.
- [x] Registrar evidencia; identificar el commit con QC-013 en el historial Git.

La comprobación física de safe area y teclado iOS sigue en QC-009. El incremento verificado se guarda en su commit semántico antes de continuar con otro issue.

## Recursos recibidos

1. `logo-original.png`: 1080 × 1080, con transparencia.
2. `patron-marca.jpg`: pieza de marca con iconos.
3. `referencia-web.jpeg`: mockup de composición.
4. `hero-original.png`: fotografía separada del plato, 1264 × 843.

Ubicación: `public/brand/references/`. Los derivados se generan en rutas separadas para conservar intactas las fuentes.
