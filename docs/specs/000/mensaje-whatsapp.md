# QC-027 — Presentación del mensaje (RF-10)

Usar la manito en el saludo y un emoji por sección: pedido, resumen, datos, retiro/envío, fecha/horario y comentarios opcionales. Mantener etiquetas textuales, importes, condiciones comerciales y solicitud de confirmación. El texto copiado y el codificado en el enlace deben coincidir.

Entregables verificados: formato implementado, `npm test` (23 pruebas correctas) y `npm run typecheck`. Prueba de ida y vuelta del parámetro `text` para retiro y envío, saludo con 👋 y encabezados; comprobación de `%F0%9F%91%8B` en la URL.

La codificación existente mediante `encodeURIComponent` preserva la manito y sigue el formato documentado por WhatsApp: https://faq.whatsapp.com/425247423114725/

Pendiente: reproducir la ausencia del emoji en el cliente WhatsApp del usuario. Estas pruebas validan el texto y el enlace generado, no la representación ni el traspaso a la aplicación externa. No se atribuye una causa ni se declara corregida esa incidencia.
