# 000 — Plan y registro de validación

## QC-031 — Envíos a cualquier destino (RF-06 / CA-13 / CA-14)

- Eliminada la lista de cobertura: provincia/región libre y obligatoria, con máximo de 80 caracteres. El campo interno `zone` se conserva para recuperar domicilios existentes sin cambiar el formato de almacenamiento.
- Centralizados los textos de envío en `src/config/business.ts`, usados en FAQ, checkout, franja de inicio y footer. WhatsApp aclara costo a cargo del cliente, sin asignar tarifa ni cerrar el total final.
- `npm run check`: TypeScript, 22 pruebas, build y smoke HTTP correctos. Pruebas de validación actualizadas: Quilmes, Burzaco y Villa Carlos Paz admitidos; región vacía o demasiado larga y localidad vacía rechazadas. Las pruebas existentes de perfiles con zonas anteriores siguen pasando.
- `npm run test:browser`: recorrido de envío con destino Villa Carlos Paz, Córdoba correcto, incluido domicilio en el mensaje, costo a cargo del cliente, total pendiente y recuperación de región tras recarga. Retiro posterior excluye domicilio; regresión de carrito, persistencia y checkout correcta. WhatsApp interceptado, sin mensajes enviados.
- Verificación al preparar el commit: `npm run check` y `npm run test:browser` correctos con 23 pruebas. La aserción del enlace de navegador se actualizó al destino directo `api.whatsapp.com/send/` incorporado en QC-028; se comprueba el teléfono mediante el parámetro `phone`.

## Estado actual

- Documentación inicial creada el 2026-09-26.
- Especificación actualizada con nombre Que Cookies, cuatro packs de mini cookies y atención diaria de 09:00 a 19:00.
- Diseño mobile first documentado en [diseno-ui-ux.md](./diseno-ui-ux.md), implementado y revisado mediante capturas de Chrome.
- Reglas de modularidad y DRY registradas en [AGENTS.md](../../../AGENTS.md), RNF-08 y CA-27.
- Aplicación: primera implementación local de vidriera y compra construida en QC-004 a QC-006.
- Pruebas de producto: 22 pruebas de dominio, smoke HTTP y recorrido interactivo en Chrome ejecutados.
- Dependencias del stack instaladas. Verificación con TypeScript/build y pruebas nativas de Node; sin herramientas externas de navegador/lint instaladas.
- Despliegue: pendiente.

Este documento describe qué se verificará y dónde registrar la evidencia. Una definición de prueba no implica que la prueba haya pasado.

Referencias: [spec](./spec.md), [arquitectura](./arquitectura-y-stack.md), [tareas](./plan-de-tareas.md), [criterios](./criterios-de-aceptacion.md).

## 1. Estrategia

Priorizar reglas de compra, importes, persistencia, manejo de datos y mensaje a WhatsApp. Automatizar lógica pura y recorridos críticos cuando estén acordadas las herramientas; complementar con revisión manual en navegadores/dispositivos reales.

No instalar frameworks de pruebas sin conversarlo. Los comandos concretos se registrarán cuando exista package.json y se haya definido la herramienta. Las verificaciones manuales iniciales no sustituyen evidencias de comportamiento en los casos críticos.

Usar datos sintéticos. Para comprobar el mensaje recibido por el negocio, coordinar una prueba identificada como «PRUEBA — NO PREPARAR»; no enviar solicitudes reales inadvertidas ni afirmar que abrir el chat demuestra recepción.

## 2. Datos de referencia

| Caso | Selección | Subtotal esperado |
| --- | --- | ---: |
| Mínimo incompleto | 1 tradicional | $3.500; continuar bloqueado |
| Mínimo mismo sabor | 2 tradicionales | $7.000 |
| Mínimo mixto | 1 tradicional + 1 pistacho | $9.500 |
| Varias unidades | 2 tradicionales + 1 cacao | $11.000 |
| Pack mínimo | 1 pack de 12 mini cookies | $9.500; continuar habilitado |
| Pack de 24 | 1 pack de 24 mini cookies | $18.500 |
| Pack de 48 | 1 pack de 48 mini cookies | $35.500 |
| Pack de 96 | 1 pack de 96 mini cookies | $67.000 |
| Pack con un dip | 1 pack de 12 + 1 dip de Nutella | $11.500 |
| Pack con cuatro dips | 1 pack de 12 + 2 Nutella + 2 chocolate blanco | $17.500 |
| Varios packs | 2 packs de 12 mini cookies | $19.000; conservar dos packs de 12 |
| Pedido mixto | 1 pack de 12 + 1 tradicional | $13.000 |

Para retiro el total coincide con el subtotal y el retiro cuesta $0. Para envío, el subtotal existe pero el total final queda pendiente de cotización.

Fixtures adicionales: producto marcado no disponible, producto eliminado del catálogo, cambio de precio, cantidades inválidas, almacenamiento de versión anterior y datos con caracteres especiales. Las modificaciones de fixtures no cambian el catálogo real del negocio.

## 3. Suites de validación

### V-01 — Contenido y catálogo

- Contrastar las 13 referencias y precios recibidos contra spec.md.
- Verificar publicación de ocho cookies individuales y cuatro presentaciones comprables de mini cookies, agrupables bajo una ficha con selector.
- Comprobar exclusión de bollos y ausencia de venta unitaria de mini cookies; P-01 está resuelto.
- Verificar los precios de cada presentación de pack: $9.500, $18.500, $35.500 y $67.000, sin derivarlos de un precio base ni aplicar descuentos implícitos ni tamaños arbitrarios.
- Verificar el extra de dips: cada dip suma $2.000 al pack, sin tope de cantidad y sin sumar contenido físico.
- Revisar nombre Que Cookies en logo, textos, metadatos y mensajes; conservar el Instagram proporcionado hasta recibir un nuevo enlace.
- Revisar ingredientes/alérgenos, textos, datos de contacto, retiro y cobertura.
- Confirmar carácter ilustrativo de fotografías y ausencia de afirmaciones comerciales inventadas.
- Comprobar producto no disponible y enlaces desde inicio/carta/detalle.

Cobertura: CA-01, CA-02, CA-06, CA-16, CA-25.

### V-02 — Reglas del carrito e importes

- Probar carrito vacío, una cookie individual, dos iguales, dos distintas, un pack, varios packs y pedidos mixtos.
- Editar y eliminar individuales/packs; verificar subtotal y mínimo físico después de cada cambio, especialmente al quitar el pack de un pedido mixto.
- Verificar contador de artículos independiente del mínimo: un pack cuenta como un artículo y cumple el mínimo de cookies.
- Comprobar que dos packs de 12 no se convierten automáticamente en uno de 24 ni se confunden sus IDs.
- Intentar valores negativos, cero como línea persistida, fraccionarios, texto y números desbordados.
- Comparar cálculos en unidades monetarias menores contra casos de referencia.
- Verificar retiro $0 y envío pendiente sin total ficticio.

Cobertura: CA-02, CA-03, CA-04, CA-05, CA-17.

### V-03 — Persistencia y reconciliación

- Recargar, navegar, cerrar y reabrir con carrito existente.
- Verificar que hidratación no sobrescribe datos antes de leerlos.
- Cambiar precio, disponibilidad y existencia de un producto entre cargas.
- Restaurar carrito con packs de diferentes tamaños; comprobar que conserva presentaciones y cantidades. Cambiar precio base de mini cookies y comprobar actualización de los cuatro packs.
- Probar almacenamiento bloqueado, cuota agotada, JSON corrupto y versión incompatible.
- Modificar selección en otra pestaña y volver al checkout original.
- Guardar perfil, regresar, editar dirección, desactivar recuerdo y borrar datos.
- Comprobar independencia de perfil/carrito y exclusión de fecha/hora/notas.
- Inspeccionar persistencia para confirmar que no hay datos personales sin elección explícita.

Cobertura: CA-05, CA-06, CA-07, CA-08, CA-10, CA-11, CA-24.

### V-04 — Checkout, cobertura y preferencias

- Acceder directamente a checkout sin mínimo cumplido.
- Validar campos vacíos, espacios, límites y formatos razonables de teléfono.
- Alternar envío/retiro con un domicilio previamente guardado.
- Verificar destinos dentro y fuera de las zonas originales: Lomas de Zamora, Quilmes, Burzaco y Córdoba.
- Confirmar provincia/región de texto libre, sin bloqueo geográfico, con dirección completa y costo a cargo del cliente sujeto a cotización.
- Revisar fecha pasada, hora transcurrida, horario válido y límites 09:00/19:00 para retiro y envío; rechazar 08:59/19:01 y fechas del día después del cierre.
- Comprobar que la hora solo se ofrece en franjas de cuarto de hora (:00, :15, :30, :45), que con la hora de cierre solo aparece :00 y que ninguna combinación de las dos listas excede las 19:00.
- Probar con reloj controlado cerca de medianoche y dispositivo configurado en otra zona horaria.
- Verificar disponibilidad de preferencias de lunes a domingo, incluidos sábados y domingos; P-02 resuelto con 09:00–19:00 para ambas modalidades.
- Introducir texto parecido a HTML y comprobar que se muestra sin ejecución.
- Modificar selección o modalidad después de revisar y verificar invalidación del resumen previo.

Cobertura: CA-04, CA-09, CA-10, CA-12, CA-13, CA-14, CA-15, CA-16, CA-21, CA-24.

### V-05 — Mensaje y enlace

- Comparar línea por línea el resumen visible y el mensaje preparado para retiro y envío.
- Comprobar saludo a Que Cookies, tamaños y número de packs, contenido total e importes sin confundir packs con mini cookies sueltas.
- Confirmar destino `5491161919801`.
- Incluir nombres/direcciones con ñ, tildes, emoji, saltos, `&`, `+`, `#` y `%`.
- Decodificar el parámetro de texto y compararlo con el mensaje original.
- Asegurar que retiro no filtra el domicilio personal guardado.
- Verificar que envío pendiente no se convierte en gratis o total cerrado.
- Comprobar que no se incluyen campos vacíos, número de pedido ficticio o estado de pago.
- Construir el mensaje con todas las referencias públicas y campos al máximo permitido; comprobar integridad y alternativa de copia.

Cobertura: CA-12, CA-13, CA-17, CA-18, CA-19, CA-21, CA-22.

### V-06 — WhatsApp y recuperación

- Abrir desde Android, iOS y escritorio, según entornos disponibles.
- Probar escenarios con aplicación instalada y alternativa web cuando sea posible.
- Volver sin enviar y verificar carrito intacto.
- Confirmar que el sitio no afirma recepción/confirmación ni borra la selección.
- Pulsar varias veces y revisar ausencia de estados de éxito falsos.
- Probar copiar pedido con portapapeles permitido y denegado; verificar copia manual.
- Revisar teclado, nueva pestaña/retorno y apertura directa desde el gesto de usuario.
- Coordinar comprobación del mensaje recibido con el negocio; distinguirla de mera apertura del enlace.

Cobertura: CA-19, CA-20, CA-21, CA-22.

### V-07 — Diseño, accesibilidad y rendimiento visual

- Anchos de 320, 375, 390, 768, 1024 y 1440 px.
- Safari iOS, Chrome Android y navegadores de escritorio acordados.
- Navegación completa con teclado y foco visible; orden lógico y gestión de foco de menús/diálogos si existen.
- Etiquetas, mensajes de error, anuncios relevantes del carrito y textos alternativos.
- Contraste AA, zoom y preferencia de movimiento reducido.
- Verificar CTA y campos con teclado virtual abierto; ninguna barra fija tapa acciones.
- Medir cambios de layout y carga de imágenes en emulación móvil; guardar condiciones de medición.

Cobertura: CA-01, CA-23, CA-25.

### V-08 — Calidad técnica y preparación de despliegue

- Ejecutar build, chequeo de tipos y lint cuando estén configurados.
- Ejecutar pruebas automatizadas acordadas y registrar comandos/resultados reales.
- Revisar rutas directas, páginas públicas indexables y metadatos.
- Comprobar estrategia de imágenes compatible con el hosting seleccionado.
- Registrar mediciones de laboratorio y distinguirlas de métricas de campo.
- Revisar ausencia de errores de hidratación y errores de consola durante el flujo.
- Verificar que configuración de marca/catálogo y reglas de negocio no están duplicadas en componentes.
- Revisar responsabilidades y dependencias por módulo: páginas como composición, estado separado de efectos y dominio independiente de React/UI/almacenamiento.
- Identificar componentes y funciones reutilizados; comprobar que no existen copias con el mismo significado ni componentes genéricos con opciones que dificulten comprenderlos.
- Seguir el cálculo desde catálogo hasta carrito, checkout y WhatsApp: misma fuente de precios, mínimo y resumen; el formateador no vuelve a calcular reglas de negocio.
- Registrar archivos revisados y mejoras de cohesión/legibilidad necesarias como parte de CA-27.

Cobertura: CA-25, CA-26, CA-27; RNF-06, RNF-08.

### V-09 — Comprobación posterior al despliegue

- Registrar URL pública y versión/commit si existe repositorio.
- Comprobar HTTPS, rutas, imágenes, dominio canónico y enlaces sociales.
- Recorrer catálogo → carrito → checkout → WhatsApp desde la URL pública.
- Confirmar destino real y mensaje con el negocio mediante prueba coordinada.
- Validar que el sitio no apunta a datos de ejemplo, dominios temporales o números de prueba.
- Registrar incidencias abiertas y resultado de publicación.

Cobertura: CA-26.

## 4. Matriz de ejecución

| Suite | Estado | Entorno / fecha | Evidencia | Incidencias |
| --- | --- | --- | --- | --- |
| V-01 | Parcial | Node / QC-005–006 | Catálogo contrastado en tests y rutas HTTP | Contenido editorial/alimentario pendiente |
| V-02 | Parcial | Node y Chrome / QC-006–007 | Pruebas de dominio; agregar individual/pack, mínimo y total mixto en UI | Casuística completa de controles y otros navegadores pendiente |
| V-03 | Parcial | Node y Chrome / QC-006–007 | Recarga, perfil, datos corruptos, bloqueo simulado y sincronización entre pestañas | Cuota específica/Safari pendientes |
| V-04 | Parcial | Node y Chrome / QC-006–007 | Checkout retiro/envío, datos y preferencias | Revisión completa de foco/teclado/lector de pantalla pendiente |
| V-05 | Parcial | Node y Chrome / QC-006–007 | Enlace capturado desde CTA; coincide con selección/dirección/total pendiente | Recepción real por el negocio pendiente |
| V-06 | Parcial | Chrome / QC-007 | Apertura interceptada, copia manual ante rechazo simulado | WhatsApp real y permisos reales del portapapeles pendientes |
| V-07 | Parcial | Chrome 153 / QC-007 | 320/375/390/768/1440 px sin overflow en inicio, carta y revisión; capturas revisadas | Safari, dispositivos físicos y auditoría completa de accesibilidad pendientes |
| V-08 | Parcial | macOS / QC-004–007 | typecheck, tests, build, HTTP, Chrome y revisión modular | Métricas de rendimiento completas pendientes |
| V-09 | No ejecutada | — | — | Sin despliegue |

Cada ejecución registrará: fecha, versión, entorno, pasos/casos, esperado, observado, evidencia y pendientes. Marcar como bloqueada o parcial cuando no pueda verificarse todo; no aprobar por inferencia.

## 5. Criterios de salida

- Criterios CA-01 a CA-27 verificados con evidencia suficiente.
- Sin defectos que alteren cantidades/importes, destino de WhatsApp, datos de entrega, mínimo o persistencia elegida.
- Sin afirmaciones falsas de pago, reserva o envío exitoso.
- Datos necesarios de catálogo y operación confirmados; pendientes diferidos explícitos y compatibles con R1.
- Uso móvil verificado y limitaciones de cobertura de pruebas documentadas.
- Build y verificaciones técnicas acordadas aprobadas.
- Prueba de producción coordinada y registrada.

## 6. Revisión documental

La revisión de los documentos de 000 y las reglas del proyecto debe comprobar enlaces relativos, referencias de requisitos/tareas/criterios, fidelidad de los precios y consistencia del alcance sin backend. Su resultado se registra aquí separado de las pruebas de producto.

Revisión manual inicial completada el 2026-09-26 (histórica, anterior a la confirmación de packs y horarios):

- Se verificó la existencia de los cinco archivos y sus enlaces relativos.
- Se contrastaron las 13 referencias y precios con la imagen del usuario, incluido Mini Cookie a 792 ARS, que después se confirmó como antecedente y no como base de cálculo.
- Se revisaron RF-01 a RF-11, RN-01 a RN-11, RNF-01 a RNF-07, CA-01 a CA-26, T-01 a T-16 y V-01 a V-09, sus referencias y cobertura.
- Se comprobó consistencia de WhatsApp, dirección, horario, cobertura, mínimo, envío pendiente y alcance sin backend/pagos.
- Se precisó la persistencia del precio histórico solo para detectar cambios, sin usarlo para calcular el subtotal.
- Se separó la validación previa a publicación de la comprobación de producción para evitar una dependencia circular entre T-15 y T-16.

Resultado: documentación consistente para iniciar diseño y desarrollo, con P-01 a P-10 explícitos. Esta revisión no ejecutó pruebas de producto ni validó datos operativos todavía pendientes con el negocio.

### Segunda revisión — Confirmaciones de marca, catálogo y horarios

Completada el 2026-09-26 tras la nueva información del usuario:

- Actualizados los cinco documentos con marca pública Que Cookies e identidad visual conservada. Las únicas referencias operativas a `quecookiss` corresponden al Instagram proporcionado y a la ruta existente del proyecto.
- P-01 y P-02 resueltos: bollos fuera de la web; mini cookies solo en packs de 12/24/48/96; retiro y envío de lunes a domingo de 09:00 a 19:00. En P-08 queda resuelto el nombre y siguen pendientes dominio/alojamiento.
- Búsqueda de referencias obsoletas: no quedan el nombre anterior como marca activa, horario 22:00 ni bloqueos de selector por días/horas desconocidos.
- Comprobación aritmética histórica (superada en QC-033): `792 × {12, 24, 48, 96}` devolvía `{9504, 19008, 38016, 76032}` ARS.
- RN-12 y RN-13 vinculadas con CA-02/CA-15 y V-01/V-02/V-04. Actualizados los casos de mínimo, persistencia, selección de presentación y mensaje de WhatsApp para distinguir cookies físicas y packs.
- El mínimo se interpreta por contenido físico: un solo pack cumple; no se exige comprar dos packs. Los precios por presentación ya incluyen su contenido y no se multiplican dos veces por el tamaño.

Resultado: revisión documental y aritmética completada. Las suites V-01 a V-09 siguen sin ejecutarse sobre una aplicación; no se implementó código de producto en esta actualización.

### Tercera revisión — Diseño mobile first y reglas de desarrollo

- Creado AGENTS.md con reglas permanentes de módulos pequeños, responsabilidad única, legibilidad, reutilización y DRY; reflejadas en RNF-08, arquitectura y CA-27.
- Documentados dirección visual, tokens, wireframes, estados, adaptación a escritorio y límites de componentes en diseno-ui-ux.md.
- Contrastados ejemplos de carrito/revisión con el catálogo: una tradicional más un pack de 12 da $13.000; el pack se identifica por su presentación y no necesita otro artículo para cumplir el mínimo.
- Verificados documentalmente los tres pasos del checkout, horario 09:00–19:00, persistencia opcional del perfil, envío a confirmar y apertura de WhatsApp sin confirmación ficticia.
- Calculadas con Python las relaciones de contraste de los tokens propuestos mediante luminancia relativa sRGB: texto principal/crema 15,16:1; secundario/crema 5,99:1; crema/rojo 8,40:1; rojo/amarillo 5,85:1; foco/crema 7,59:1. Amarillo/crema 1,44:1, por lo que se excluye como combinación de texto o único borde funcional.
- Actualizada la dependencia de T-07 para que use el diseño documentado de T-04 y permita completar su revisión visual después de implementar, sin dependencia circular.

Resultado: propuesta de diseño y reglas documentadas, con verificación aritmética de contrastes base. T-04 permanece parcial hasta revisar la interfaz real. CA-27 y las suites de producto requieren implementación y no se dan por aprobados con esta revisión documental.

### QC-004 — Inicialización

- Entorno: Node.js 24.20.0, npm 11.19.0, macOS.
- `npm install`: 47 paquetes del stack y sus dependencias transitivas; auditoría inicial sin vulnerabilidades reportadas.
- `npm run typecheck`: correcto.
- `npm run build`: correcto; Next.js 16.3.6 genera `/` y la página de ruta inexistente.
- No se instalaron bibliotecas adicionales de UI, estado, formularios o pruebas.
- Evidencia limitada a la base del proyecto; no acredita recorridos de compra ni pruebas visuales.
- Ajuste posterior de herramientas: next-env.d.ts se excluye de Git porque Next alterna rutas de tipos entre desarrollo/producción; `typecheck` ejecuta `next typegen` antes de TypeScript. El archivo local se conserva y se regenera automáticamente.

### QC-005 — Vidriera y catálogo

- Implementados inicio por secciones, carta, nueve fichas (ocho sabores y mini cookies con cuatro presentaciones), contacto, FAQ, privacidad y 404.
- Componentes separados de datos y configuración; precios en centavos, packs derivados de su base, tipografías con next/font y fotos mediante next/image.
- `npm run typecheck`, `npm run build`: correctos. Build genera 16 páginas, incluidas rutas internas de Next.
- `npm run smoke`: siete rutas públicas devuelven 200 con contenido esperado e idioma es-AR; ruta desconocida devuelve 404. Usa Node nativo y servidor de producción efímero.
- Recursos externos: dos fotografías responden HTTP 200. Procedencia y limitaciones registradas en docs/assets.md.
- No se verificó aún layout en navegador real, métricas de campo ni interacción de compra. Ingredientes/alérgenos, logo definitivo e historia permanecen pendientes de contenido.

### QC-006 — Compra y persistencia

- Implementados selección de presentación, cantidades, carrito, estado compartido, almacenamiento versionado y reconciliación con catálogo. Checkout dividido en contacto, entrega y revisión; perfil recordado separado del borrador.
- La lógica comercial vive en cart.ts, validation.ts y order-message.ts; no importa React ni almacenamiento. Persistencia y proveedores cliente separados. Revisión de CA-27: componentes por responsabilidad, precios y contacto centralizados, mismos modelos para totales y WhatsApp.
- Pruebas nativas de Node: carrito/precios/mínimo/packs; validación de contacto/cobertura/fechas/horarios; codecs de almacenamiento y exclusión de datos transaccionales; mensajes de retiro/envío, destino/codificación y revalidación final.
- La alternativa de copia manual deriva del mensaje vigente para no conservar un resumen anterior tras modificar el pedido.
- `npm run check`: correcto; TypeScript, 22 pruebas nativas aprobadas, build de 18 páginas y smoke HTTP de nueve rutas más 404.
- `git diff --check`: correcto.
- Pruebas interactivas de navegador pendientes en QC-007. Estas verificaciones no acreditan aún la apertura de WhatsApp ni el uso en celulares físicos.

### QC-007 — Chrome y revisión responsive

- Entorno: Google Chrome 153.0.8010.53 instalado en macOS, headless, perfil temporal aislado; sin dependencias de navegador adicionales.
- Herramienta: scripts/browser-check.mjs con módulos de conexión CDP, entorno, helpers y escenarios. Node WebSocket nativo; servidor de producción efímero. Capturas ignoradas por Git en `.artifacts/browser/`.
- Inicio y carta: 320, 375, 390, 768 y 1440 px, sin desbordamiento horizontal. Capturas home-390.png y home-1440.png revisadas visualmente.
- Compra: una tradicional bloquea el mínimo; agregar un pack de 12 habilita y produce $13.000. Carrito persiste al recargar; cart-390.png revisada.
- Checkout de envío: nombre/teléfono, domicilio, fecha/hora y notas; resumen con envío pendiente. Revisión sin overflow en los cinco anchos; checkout-390.png revisada.
- Click real del CTA mediante DOM: window.open interceptado para inspeccionar destino `5491161919801` y texto íntegro, sin contactar al negocio. Verificados subtotal, dirección, notas y envío pendiente.
- Perfil: precarga después de recargar, domicilio conservado, fecha/notas no recordadas; cambiar a retiro excluye domicilio personal del mensaje. Borrar perfil conserva carrito.
- Portapapeles denegado simulado: texto manual coincide exactamente con el mensaje del pedido vigente.
- Dos pestañas del mismo perfil: cambio de carrito en una se refleja en la otra.
- Almacenamiento corrupto: se detectó que el carrito vacío ocultaba el aviso; corregido en QC-006 y comprobado por el escenario de regresión.
- Almacenamiento denegado simulado: se pueden agregar dos cookies y llegar al checkout usando estado en memoria, con aviso visible.
- Hallazgo visual: etiqueta «Imagen ilustrativa» recortada por borde del hero; centrada y revisada en la nueva captura, corregido en QC-005.
- `npm run build` y `npm run test:browser`: correctos después de corregir hallazgos. Sin excepciones JS ni errores de consola capturados en el recorrido.

Alcance de evidencia: pruebas reales en Chrome con viewport emulado; no equivalen a Safari/iOS, teclado virtual físico, recepción de WhatsApp o auditoría completa WCAG. Esas verificaciones y contenidos finales permanecen explícitos en QC-008/QC-009. No se ejecutó un despliegue.

### QC-033 — Precios redondos de packs de mini cookies

- Reemplazada la base `miniBasePrice` de 79200 centavos por unidad por `miniBasePackSize` 12 y `miniBasePackPrice` 950000 centavos. Cada pack se deriva como `(size / 12) × 950000`, de modo que 12/24/48/96 dan 9500, 19000, 38000 y 76000 ARS. No queda ningún precio por mini cookie en el modelo ni en la interfaz.
- El mínimo sigue calculándose por contenido físico y el subtotal por cantidad de packs; la línea de carrito no se multiplica por el tamaño del pack.
- `npm test`: 28 pruebas correctas, incluidos precios de packs ($9.500/$19.000/$38.000/$76.000), dos packs de 12 por $19.000, mixto con tradicional por $13.000, mensaje de WhatsApp con `$9.500 c/u` y subtotal `$19.000`, y persistencia del precio de referencia del pack de 12.
- `npm run check`: typecheck, pruebas, build y smoke HTTP correctos.
- `npm run test:browser`: correcto. Regresión completa en Chrome con el total mixto de $13.000: mínimo, pack, persistencia al recargar, enlace de WhatsApp con ese importe, sincronización entre pestañas, almacenamiento corrupto/denegado y responsive de 320 a 1920 px sin excepciones JS.

## QC-038 — Combinación de sabores en los packs de mini cookies

Decisión del usuario: los packs se arman solo con tradicional, cacao y red velvet, el cliente elige la cantidad exacta de cada sabor, el precio sigue siendo cerrado por presentación y cada combinación viaja desglosada al mensaje de WhatsApp.

- Nuevo módulo puro `src/features/catalog/pack-mix.ts` con la regla de combinación: reparto equitativo inicial, `stepMix` clavado en el tamaño del pack (al subir un sabor toma una unidad del sabor con más unidades; al bajar abre lugar y deja el pack incompleto), validación e identidad de línea. No importa React ni almacenamiento.
- La combinación pasó a formar parte de la identidad de la línea del carrito: dos packs del mismo tamaño con mezclas distintas son líneas separadas, y dos con la misma mezcla se acumulan. El formato de almacenamiento pasa a `quecookies:cart:v2` porque una línea guardada sin combinación ya no es comprable; los carritos de la versión anterior se descartan con el aviso ya existente.
- La ficha de un pack ya no publica «Estamos completando las fichas»: explica que las minis usan la misma masa que las cookies grandes y enlaza a las fichas de los tres sabores, que son la fuente de la información alimentaria. Los packs siguen sin declarar receta propia en el catálogo.
- `npm run typecheck`: correcto.
- `npm test`: 42 pruebas, 41 correctas. La única falla, `los alérgenos de base se corresponden con los insumos de cada receta`, es previa a este trabajo: la prueba busca el insumo `Harina` de forma exacta y las recetas dicen `Harina de trigo`. Se verificó con `git stash` que ya fallaba antes de estos cambios y no se modifica aquí por no ser parte de este issue.
- `npm run build` y `npm run smoke`: correctos; el HTML generado de `/cookies/mini-cookies` incluye el selector, el reparto equitativo, el resumen de sabores y los enlaces a las tres fichas.
- `npm run test:browser`: correcto con el escenario nuevo `pack-mix-scenario.mjs`: reparto equitativo 4/4/4, bajar un sabor muestra «Faltan 1» y deshabilita el alta, completar deja la combinación lista sin cambiar el precio, el carrito muestra el desglose, dos combinaciones del mismo pack quedan como dos líneas y cada una persiste por separado. Regresión completa de los escenarios previos correcta, incluida la sincronización entre pestañas con la clave `v2`.
- No verificado: no se confirmaron las capturas por revisión visual en esta sesión ni se coordinó con el negocio la recepción de un mensaje con el nuevo desglose. Safari y dispositivos físicos siguen pendientes como en QC-009.

### QC-039 y QC-040 — Correcciones posteriores a QC-038

- El selector de sabores reservaba altura solo a medias: el mensaje «Faltan 1 para completar el pack» ocupa dos líneas y «12 minis listas» una, y el desglose también cambia de largo, así que el botón «Agregar pack» subía 52 px al bajar un sabor. Se reservó altura fija en el bloque de estado y en el desglose; medido en Chrome a 390 px, el botón queda en la misma posición con la combinación completa e incompleta.
- La prueba de alérgenos buscaba el insumo «Harina» por igualdad exacta y las recetas dicen «Harina de trigo». Se corrigió para comparar contra el nombre real del insumo. Se comprobó por mutación que la prueba detecta una harina de arroz, que no obligaría a declarar Trigo: con «Harina» a secas la comprobación habría pasado sin error.
- `npm test`: 42 de 42 pruebas correctas.
- `npm run build`, `npm run smoke` y `npm run test:browser`: correctos, incluido el escenario que mide la posición del botón antes y después de cambiar la combinación.

### QC-041 — Acceso a la ficha de mini cookies

- La ficha `/cookies/mini-cookies`, donde vive el selector de sabores, solo se alcanzaba desde el banner del inicio. En escritorio el enlace «Mini cookies» del header apuntaba al ancla `#minis` de la carta; ahora abre la ficha. La barra móvil de cuatro accesos (QC-013) se mantiene sin cambios y desde la carta se añadió el enlace «Ver la ficha completa de mini cookies», que es el camino en móvil.
- El CTA «Mini cookies» del hero y el ancla de la carta siguen apuntando a la sección, donde ya se puede comprar sin cambiar de página.
- `npm run test:browser`: correcto. El escenario abre la ficha desde la navegación de escritorio y desde la carta a 390 px, sin desbordamiento horizontal.

### QC-042 — Alto de la imagen de minis en la carta

- La imagen de la sección de minis en `/cookies` se estiraba a la altura de la fila del grid porque el contenedor de la imagen no fijaba proporción. Medido en Chrome: 303 × 1138 px a 768 px (proporción 3,75) y 623 × 1039 px a 1440 px (1,67), frente a 1:1 en la ficha del pack.
- Se acotó a `aspect-square` con `self-center`, igual que la ficha. Quedó en 1:1 a 390, 768 y 1440 px.
- El escenario `checkMiniSectionImage` mide la proporción en carta y ficha a esos tres anchos, comprueba que la imagen no se salga de la tarjeta y que no haya desbordamiento horizontal. Se verificó que falla sin el arreglo («imagen de minis deformada a 390px: ratio 0.83»).
- `npm run check` (42 de 42), `npm run smoke` y `npm run test:browser` (29 comprobaciones): correctos.
- No verificado: la captura no se revisó por vista en esta sesión.

### QC-043 — Precios de packs de mini cookies

- Los packs se derivaban de `miniBasePackSize`/`miniBasePackPrice` como `(size / 12) × 950000`, lo que daba 9500/19000/38000/76000. El negocio fijó sus precios reales por presentación: 9500, 18500, 35500 y 67000 centavos.
- Se eliminó el precio base y el cálculo por múltiplos; `catalog.ts` publica `packPrices` como tabla única y `packSizes` como lista de referencia, de modo que no quedan valores duplicados que puedan divergir.
- `npm test`: 51 de 51 pruebas correctas, incluidas las que clavan el precio de las cuatro presentaciones.
- `npm run check` (typecheck, 51 pruebas, build y smoke) y `npm run test:browser` (30 comprobaciones): correctos.

### QC-044 — Dips de Nutella y chocolate blanco en los packs

- Se agregaron al catálogo `dipPrice` (200000 centavos), `dipFlavorSlugs` y `dipFlavors`, con un único precio para los dos sabores. Como el extra vale lo mismo, el importe depende solo de la cantidad.
- Nuevo módulo puro `src/features/catalog/pack-dips.ts`: total, importe del extra, paso de cantidades sin negativos, validación e identidad de línea. No importa React ni almacenamiento.
- El precio unitario del pack pasa a sumar el extra, así que el cliente ve el total con dips antes de agregar y el precio por unidad del carrito y del mensaje ya lo incluye. Los dips no aportan contenido físico, por lo que no intervienen en el mínimo y una línea de no-pack con dips se marca como no comprable.
- La selección de dips entró en la identidad de línea junto con la combinación de sabores: dos packs con los mismos sabores y dips distintos quedan separados, y pedir cero dips es la misma línea que no elegirlos. El formato de almacenamiento pasa a `quecookies:cart:v3` porque una línea guardada sin dips válidos ya no es comprable; los carritos anteriores se descartan con el aviso ya existente.
- El selector `PackDipSelector` se integra en `PackPurchase`, por lo que aparece en la ficha `/cookies/mini-cookies` y en la sección de mini cookies de `/cookies`, que comparten ese bloque. El desglose se muestra en el carrito, en la revisión del checkout y en el mensaje de WhatsApp; los packs sin dips no agregan esa línea.
- `isPackDips` usa el mismo validador estricto de registros de conteo que `isPackMix` (`src/lib/counts.ts`), de modo que un sabor desconocido deja de sobrevivir al carrito en lugar de ignorarse en silencio.
- `npm run test:browser`: correcto con el escenario nuevo `pack-dip-scenario.mjs`: un dip lleva el pack de $9.500 a $11.500 sin desplazar el botón de agregar, cuatro dips dan $17.500, el carrito muestra el desglose, dos combinaciones de dips del mismo pack quedan como dos líneas y cada una persiste por separado en `v3`.
- Al verificar el escenario se detectó que el selector de dips usaba `aria-label="Dip de Nutella en el pack"`, igual que el de sabores, y que el escenario de packs leía los contadores por sufijo y TOMABA los dips como sabores. Se quitó el sufijo redundante del selector de dips y el escenario de packs pasó a leer los tres sabores por nombre exacto.
