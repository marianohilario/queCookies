# 000 — Plan y registro de validación

## Estado actual

- Documentación inicial creada el 2026-09-26.
- Especificación actualizada con nombre Que Cookies, cuatro packs de mini cookies y atención diaria de 09:00 a 19:00.
- Diseño mobile first documentado en [diseno-ui-ux.md](./diseno-ui-ux.md); revisión visual en navegador pendiente.
- Reglas de modularidad y DRY registradas en [AGENTS.md](../../../AGENTS.md), RNF-08 y CA-27.
- Aplicación: primera implementación local de vidriera y compra construida en QC-004 a QC-006.
- Pruebas de producto: dominio automatizado y smoke HTTP ejecutados; interacción de navegador pendiente.
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
| Pack mínimo | 1 pack de 12 mini cookies | $9.504; continuar habilitado |
| Pack de 24 | 1 pack de 24 mini cookies | $19.008 |
| Pack de 48 | 1 pack de 48 mini cookies | $38.016 |
| Pack de 96 | 1 pack de 96 mini cookies | $76.032 |
| Varios packs | 2 packs de 12 mini cookies | $19.008; conservar dos packs de 12 |
| Pedido mixto | 1 pack de 12 + 1 tradicional | $13.004 |

Para retiro el total coincide con el subtotal y el retiro cuesta $0. Para envío, el subtotal existe pero el total final queda pendiente de cotización.

Fixtures adicionales: producto marcado no disponible, producto eliminado del catálogo, cambio de precio, cantidades inválidas, almacenamiento de versión anterior y datos con caracteres especiales. Las modificaciones de fixtures no cambian el catálogo real del negocio.

## 3. Suites de validación

### V-01 — Contenido y catálogo

- Contrastar las 13 referencias y precios recibidos contra spec.md.
- Verificar publicación de ocho cookies individuales y cuatro presentaciones comprables de mini cookies, agrupables bajo una ficha con selector.
- Comprobar exclusión de bollos y ausencia de venta unitaria de mini cookies; P-01 está resuelto.
- Verificar cálculo de packs: 12/24/48/96 × $792; sin descuentos implícitos ni tamaños arbitrarios.
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
- Verificar Lomas de Zamora, Lanús, Adrogué y una zona no cubierta como Quilmes.
- Confirmar que seleccionar Adrogué no presenta todo Almirante Brown como cobertura.
- Revisar fecha pasada, hora transcurrida, horario válido y límites 09:00/19:00 para retiro y envío; rechazar 08:59/19:01 y fechas del día después del cierre.
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
| V-02 | Parcial | Node / QC-006 | tests/cart.test.ts | Controles UI por verificar en navegador |
| V-03 | Parcial | Node / QC-006 | tests/storage.test.ts | Hidratación, cuota y sincronización reales pendientes |
| V-04 | Parcial | Node / QC-006 | tests/checkout.test.ts | Foco, teclado y recorrido interactivo pendientes |
| V-05 | Parcial | Node / QC-006 | tests/whatsapp.test.ts | Comparación visual UI/mensaje pendiente |
| V-06 | No ejecutada | — | Implementación disponible | Apertura de chat/portapapeles reales pendientes |
| V-07 | No ejecutada | — | Diseño implementado; contraste base documentado | Revisión visual y dispositivos pendientes |
| V-08 | Parcial | macOS / QC-004–006 | typecheck, tests, build, smoke HTTP y revisión modular | Auditoría de rendimiento/navegador pendiente |
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
- Se contrastaron las 13 referencias y precios con la imagen del usuario, incluido Mini Cookie a 792 ARS como dato pendiente de confirmar.
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
- Comprobación aritmética ejecutada con Python, sin leer ni escribir archivos: `792 × {12, 24, 48, 96}` devuelve `{9504, 19008, 38016, 76032}` ARS. También se verificaron equivalentes en centavos, dos packs de 12 por $19.008 y un pack de 12 más una tradicional por $13.004.
- RN-12 y RN-13 vinculadas con CA-02/CA-15 y V-01/V-02/V-04. Actualizados los casos de mínimo, persistencia, selección de presentación y mensaje de WhatsApp para distinguir cookies físicas y packs.
- El mínimo se interpreta por contenido físico: un solo pack cumple; no se exige comprar dos packs. Los precios por presentación ya incluyen su contenido y no se multiplican dos veces por el tamaño.

Resultado: revisión documental y aritmética completada. Las suites V-01 a V-09 siguen sin ejecutarse sobre una aplicación; no se implementó código de producto en esta actualización.

### Tercera revisión — Diseño mobile first y reglas de desarrollo

- Creado AGENTS.md con reglas permanentes de módulos pequeños, responsabilidad única, legibilidad, reutilización y DRY; reflejadas en RNF-08, arquitectura y CA-27.
- Documentados dirección visual, tokens, wireframes, estados, adaptación a escritorio y límites de componentes en diseno-ui-ux.md.
- Contrastados ejemplos de carrito/revisión con el catálogo: una tradicional más un pack de 12 da $13.004; el pack se identifica por su presentación y no necesita otro artículo para cumplir el mínimo.
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
