# QC-026 — Icono de delivery (RV-05)

La franja de servicios puede usar `motoDelivery` como icono de Envíos a Domicilio. Debe respetar el tamaño CSS compartido (`size-9`), mostrar el dibujo completo y mantener la orientación del SVG proporcionado.

Implementación: normalizar las coordenadas originales de 5120 unidades a 20 dentro del viewBox de 24, con margen de 2 unidades; invertir el eje Y como en el archivo original. Usar relleno `currentColor` sin trazo, ya que el dibujo original define los contornos como superficies.

Validación: `npm run typecheck` correcto. Transformación cotejada con `delivery-man.svg`: escala 20/5120 y traslación (2,22), equivalente a la transformación original con margen interior. La franja conserva `size-9`. Sin revisión visual en navegador en esta tarea.
