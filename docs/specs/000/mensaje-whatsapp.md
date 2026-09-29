# QC-027 — Presentación del mensaje (RF-10)

Usar la manito en el saludo y un emoji por sección: pedido, resumen, datos, retiro/envío, fecha/horario y comentarios opcionales. Mantener etiquetas textuales, importes, condiciones comerciales y solicitud de confirmación. El texto copiado y el codificado en el enlace deben coincidir.

Entregables verificados: formato implementado, `npm test` (23 pruebas correctas) y `npm run typecheck`. Prueba de ida y vuelta del parámetro `text` para retiro y envío, saludo con 👋 y encabezados; comprobación de `%F0%9F%91%8B` en la URL.

La codificación existente mediante `encodeURIComponent` preserva la manito y sigue el formato documentado por WhatsApp: https://faq.whatsapp.com/425247423114725/

Estado inicial de QC-027: pendiente reproducir la ausencia del emoji en el cliente WhatsApp del usuario. Estas pruebas validan el texto y el enlace generado, no la representación ni el traspaso a la aplicación externa. No se atribuye una causa ni se declara corregida esa incidencia.


## QC-028 — Evitar corrupción en la redirección

El enlace de pedidos debe abrir `https://api.whatsapp.com/send/?phone=…&text=…` directamente, con teléfono de configuración y mensaje codificado una sola vez. Los enlaces de contacto sin mensaje conservan su destino.

Evidencia HTTP real del 29/09/2026, sin enviar mensajes:

- `HEAD https://wa.me/5491161919801?text=Hola%20%F0%9F%91%8B` respondió 302 con `Location: https://api.whatsapp.com/send/?phone=5491161919801&text=Hola+%EF%BF%BD&type=phone_number&app_absent=0`. El servidor sustituyó 👋 por U+FFFD (�).
- Al consultar directamente `https://api.whatsapp.com/send/?phone=5491161919801&text=Hola%20%F0%9F%91%8B`, su HTML contiene el enlace `https://web.whatsapp.com/send/?phone=5491161919801&text=Hola+%F0%9F%91%8B`: conserva el emoji hasta WhatsApp Web.
- Implementación y pruebas de destino actualizadas. `npm test`: 23 pruebas correctas; `npm run typecheck`: correcto.

Criterio verificado: evitar el salto que reproduce la corrupción y conservar destino y texto completo, incluidos emojis, al construir el enlace. No se abrió una sesión autenticada ni se envió un pedido; la comprobación visual final dentro del chat corresponde al usuario.
