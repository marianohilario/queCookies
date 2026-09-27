# 001 — Criterios de aceptación

## CV-01 — Logo fiel (RV-01 / QC-011)

El resultado dice «que cookies», conserva la última s y modifica únicamente la letra indicada y su integración inmediata. El original se conserva. La comparación mantiene composición, migas, colores, sombras y demás letras; no se declara exactitud sin revisar ambos archivos.

## CV-02 — Identidad y motivos (RV-02 / QC-012)

La interfaz usa rojo y amarillo de marca; los valores medidos tienen fuente documentada. Motivos de cookie, mano y corazón son nítidos y reutilizables, y no se confunden con controles. Contraste y estados de foco revisados.

## CV-03 — Cuatro accesos móviles (RV-03 / QC-013)

A 320, 375 y 390 px se ven Inicio, Cookies, Carrito y Contacto, con icono y texto, en una única barra fija al pie. No existe hamburguesa ni desplegable equivalente. Los enlaces funcionan y no dependen de hover. En escritorio la barra no se muestra y continúa la navegación superior.

## CV-04 — Activo y contador (RV-03 / QC-013)

Inicio activo solo en `/`; Cookies en carta/fichas; Carrito en carrito/checkout; Contacto en `/nosotros`. No hay coincidencias accidentales de prefijo. La selección tiene señal visual y aria-current. El contador refleja artículos reales del contexto, incluidos packs como una unidad de venta, sin una segunda fuente de estado.

## CV-05 — Barra única y espacio disponible (RV-03 / QC-013)

Agregar productos no crea otra barra fija encima o debajo de la navegación. Existe padding inferior suficiente para la barra y safe area. Al llegar al final de página, el pie y las acciones del checkout pueden verse y usarse sin quedar cubiertos. No hay overflow horizontal en anchos de referencia.

## CV-06 — Hero y escena (RV-04 / QC-014)

La composición aproxima el plato lateral, texto editorial y ondas de la referencia usando paleta propia. En móvil se adapta el orden y tamaño sin recortar el producto principal ni ocultar el CTA. Texto HTML seleccionable; la fotografía tiene procedencia y carácter ilustrativo cuando corresponda. Se revisa una comparación visual, no solo el build.

## CV-07 — Carta coherente (RV-05 / QC-015)

Las tarjetas y franjas reflejan identidad y referencia sin incorporar productos, precios, servicios o afirmaciones ajenos al alcance real. Packs y mínimo conservan las reglas de 000.

## CV-08 — Regresión y commits (QC-010 a QC-016)

Typecheck/build y verificaciones pertinentes correctos. El recorrido de compra, persistencia y mensaje WhatsApp conserva resultados. Evidencia en validacion.md, módulos pequeños y commits por issue sin coautoría del asistente.
