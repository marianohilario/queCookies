# 001 — Plan en tareas pequeñas

Cada fila es una unidad de trabajo y commit(s) propios. No se da por terminada una edición gráfica sin revisar el archivo resultante.

| Issue | Tarea | Entregable y comprobación | Dependencia | Estado |
| --- | --- | --- | --- | --- |
| QC-010 | Especificar rediseño y organizar recursos | Documentos 001, referencias y criterios | Ninguna | Documentado |
| QC-011 | Cambiar una sola letra del logo | Fuente preservada, logo «que cookies», comparación antes/después | Archivo original del logo | Pendiente de recurso |
| QC-012 | Extraer paleta y preparar motivos | Tokens y SVG de cookie/mano/corazón, revisión de contraste | Archivo de marca/patrón | Pendiente |
| QC-013 | Navegación inferior mobile | Cuatro accesos, activo, contador y espacio reservado; eliminar hamburguesa/barra duplicada | RV-03 | Implementado y verificado |
| QC-014 | Reconstruir hero | Layout y escena próxima a la referencia, ondas y sello | Recurso fotográfico y QC-012 | Pendiente de recurso |
| QC-015 | Ajustar carta y franjas | Tarjetas y módulos con identidad consistente, sin cambiar oferta | QC-012/QC-014 | Pendiente |
| QC-016 | Regresión del rediseño | Capturas comparables, compra preservada y revisión responsive | Tareas visuales terminadas | Pendiente |

## Primer incremento ejecutable — QC-013

- [x] Definir rutas y estado activo en una configuración única.
- [x] Agregar iconos funcionales y contador compartido.
- [x] Implementar barra inferior y simplificar encabezado móvil.
- [x] Retirar hamburguesa y barra contextual de carrito.
- [x] Reservar espacio y contemplar safe area; verificar pie/checkout en viewport Chrome.
- [x] Verificar móvil/escritorio, enlace al carrito y recorrido de compra.
- [x] Registrar evidencia; identificar el commit con QC-013 en el historial Git.

La comprobación física de safe area y teclado iOS sigue en QC-009. El incremento verificado se guarda en su commit semántico antes de continuar con otro issue.

## Recursos a recibir

1. Logo original PNG o, preferentemente, SVG/PDF vectorial.
2. Pieza de marca/patrón en archivo, idealmente con iconos vectoriales.
3. Referencia del hero a máxima resolución y, si existe, fotografía del plato separada del mockup.

Usar `public/brand/references/` con nombres descriptivos. La ausencia de estos archivos no bloquea QC-013.
