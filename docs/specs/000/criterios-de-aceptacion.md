# 000 — Criterios de aceptación

Estado: definidos para desarrollo; no ejecutados. Referencias: [spec](./spec.md), [tareas](./plan-de-tareas.md) y [validación](./validacion.md).

## CA-01 — Identidad e inicio

**Dado** un visitante desde móvil o escritorio, **cuando** entra al inicio, **entonces** reconoce Que Cookies, encuentra el CTA «Pedí tus cookies» y puede acceder al catálogo, carrito, información de retiro y contacto. El nombre y los enlaces provienen de una configuración central. Logo, textos públicos, metadatos y saludo de WhatsApp usan el nombre nuevo; el enlace de Instagram conserva el usuario informado. Se mantiene la identidad visual y las fotos genéricas se identifican como ilustrativas.

Referencias: RF-01; T-03, T-04, T-07; V-01, V-07.

## CA-02 — Catálogo fiel

Cada producto público tiene precio correspondiente a las tablas de spec.md, nombre, foto accesible, descripción e información alimentaria verificada. No se inventan pesos, rellenos o alérgenos. Se ofrecen ocho cookies individuales y cuatro presentaciones de mini cookies, que pueden agruparse en una ficha con selector. Bollos y mini cookies sueltas no tienen acciones de compra. Un cambio de nombre de presentación no duplica ni cambia el ID del producto.

Las presentaciones 12/24/48/96 cuestan $9.500/$19.000/$38.000/$76.000 respectivamente, derivados por múltiplos 1/2/4/8 del pack de 12. Seleccionar un tamaño actualiza precio e ID; no se aceptan tamaños fuera de esas opciones.

Los packs se arman solo con Tradicional, Cacao y Red Velvet. La ficha de un pack no publica una lista de ingredientes propia: explica que las minis usan la misma masa que las cookies grandes y enlaza a las fichas de esos tres sabores.

Referencias: RF-02, RN-12; T-01, T-03, T-06, T-07; V-01, V-02.

## CA-03 — Importes por sabor

Dos tradicionales a $3.500 suman $7.000. Una tradicional y una de pistacho suman $9.500. Dos tradicionales más una de cacao suman $11.000. Ediciones de cantidades actualizan líneas, subtotal y resumen; no hay errores de redondeo ni precios almacenados usados como autoridad.

Dos packs de 12 mini cookies cuestan $19.000 y contienen 24 mini cookies. Un pack de 12 más una tradicional cuesta $13.000. Un pack de 24 y dos de 12 no se fusionan aunque tengan equivalencia de contenido/precio. El importe de una línea es cantidad de packs × precio del pack, sin volver a multiplicar por 12/24/48/96.

## CA-03b — Combinación de sabores del pack

El pack arranca con reparto equitativo (4/4/4 en el de 12). El cliente sube y baja cada sabor y el total queda clavado en el tamaño del pack: subir un sabor toma una unidad del sabor que más tiene, y bajar abre lugar dejando el pack incompleto. Mientras la suma no iguale el tamaño del pack, la interfaz indica cuántas unidades faltan y el botón de agregar permanece deshabilitado. El precio no cambia según la combinación.

Dos packs del mismo tamaño con combinaciones distintas son líneas separadas del carrito, se muestran por separado y cada una viaja desglosada por sabor al mensaje de WhatsApp. Dos packs con la combinación idéntica sí se acumulan en una sola línea. Una combinación guardada con saborees desconocidos, negativos o fraccionarios se descarta al recuperar el carrito.

Referencias: RF-03, RF-09, RN-02; docs/specs/000/spec.md; docs/issues.md QC-038.

## CA-04 — Mínimo de dos

Con cero cookies o una cookie individual sola no se continúa ni se genera un enlace de solicitud. Con dos cookies individuales del mismo o distinto sabor se cumple el mínimo. Un único pack de cualquiera de los tamaños también cumple el mínimo; no se exigen dos packs ni cookies grandes adicionales. Si al quitar un pack queda solo una individual, se bloquea continuar y se explica el motivo. Acceder directamente a `/checkout` no evita la regla. El contador de artículos puede mostrar uno para un pack sin que eso invalide el mínimo por contenido físico.

Referencias: RF-03, RN-01; T-04, T-08; V-02, V-04.

## CA-05 — Cantidades válidas

No se aceptan cantidades negativas, fraccionarias, no numéricas o desbordadas. Para packs, el selector aumenta o reduce packs completos, no el número de mini cookies dentro de ellos. Quitar una línea recalcula totales. Vaciar la selección muestra el estado vacío. Las mismas comprobaciones se aplican a datos restaurados del almacenamiento, incluidos tipo e ID de presentación.

Referencias: RF-03, RF-04; T-08; V-02, V-03.

## CA-06 — Producto no comprable

Un producto marcado no disponible no puede agregarse. Si deja de estar disponible o desaparece con una línea ya guardada, se identifica el problema y no se incluye como línea comprable ni se permite generar la solicitud hasta resolverlo. Nunca se reemplaza por otro sabor automáticamente.

Referencias: RF-02, RF-04; T-01, T-07, T-08; V-01, V-03.

## CA-07 — Restauración y cambio de precio

Tras seleccionar productos y cerrar/reabrir el navegador en condiciones normales de almacenamiento, se recuperan IDs, cantidades y combinaciones de sabores, manteniendo tamaño y número de packs. La hidratación no borra el carrito anterior. Si cambia un precio publicado entre visitas, se recalcula el subtotal y se informa antes de continuar; un cambio del precio base de mini cookies actualiza los cuatro packs.

Referencias: RF-04; T-09; V-03.

## CA-08 — Almacenamiento y estado obsoleto

Con almacenamiento bloqueado, lleno, corrupto o de versión incompatible, la página sigue funcionando y permite armar la solicitud en memoria. Se informa la limitación de persistencia cuando aplica. Cambios del carrito en otra pestaña se sincronizan o reconcilian al recuperar foco; no se envía un resumen antiguo.

Referencias: RF-04, RNF-07; T-09; V-03.

## CA-09 — Contacto y borrador

Nombre y teléfono son obligatorios y los errores son específicos y accesibles. No se exige cuenta ni correo. Volver al paso anterior conserva los datos del borrador. Los límites de longitud se comunican y no recortan contenido silenciosamente.

Referencias: RF-05; T-04, T-10; V-04.

## CA-10 — Recordar y editar datos

Sin activar la opción no se crea un perfil persistente. Al activarla y completar datos válidos, una nueva visita precarga contacto, modalidad y domicilio guardados. La revisión muestra la dirección y permite cambiarla. No se precargan fecha, hora ni comentarios del pedido anterior.

Referencias: RF-08; T-11; V-03, V-04.

## CA-11 — Borrado independiente

Desactivar «Recordar mis datos» o usar «Borrar mis datos guardados» elimina el perfil persistente y comunica el resultado, sin borrar el carrito. Desactivar la opción no vacía los campos que se están usando en la compra actual. Vaciar el carrito no elimina el perfil recordado.

Referencias: RF-08, RF-11; T-11; V-03.

## CA-12 — Retiro

Elegir retiro muestra Peña 298, Banfield, Buenos Aires y 09:00–19:00 de lunes a domingo. No exige domicilio personal. Una solicitud de retiro no contiene un domicilio del cliente recuperado de una compra anterior. Los horarios ofrecidos no se anuncian como reserva garantizada.

Referencias: RF-06, RN-07; T-02, T-06, T-10; V-04, V-05.

## CA-13 — Envío y campos condicionales

Elegir envío requiere calle, número o indicación explícita sin número, localidad y provincia/región en texto libre. Piso/departamento y referencias son opcionales. Se puede alternar a retiro y regresar sin perder el borrador de dirección. El mensaje de envío incluye dirección y campos opcionales solo cuando tienen valor.

Referencias: RF-06, RF-09; T-10, T-12; V-04, V-05.

## CA-14 — Cobertura

Se admiten solicitudes a cualquier destino, incluidas localidades fuera de Lomas de Zamora, Lanús y Adrogué. Provincia/región es obligatoria, admite texto libre y tiene un límite de 80 caracteres. Los domicilios recordados anteriores siguen siendo editables. Footer, FAQ y checkout comunican envíos a coordinar, con costo a cargo del cliente según destino y confirmado por WhatsApp. El resumen y mensaje mantienen el total final pendiente de cotización; no se afirma haber geocodificado ni confirmado la entrega.

Referencias: RF-06, RN-06; T-02, T-06, T-10; V-04.

## CA-15 — Fechas y horas

No se acepta una fecha pasada ni una hora transcurrida del día actual en Buenos Aires. Retiro y envío respetan 09:00–19:00 de lunes a domingo: 08:59 y 19:01 no son elegibles; 09:00 y 19:00 lo son si no han transcurrido. Después del cierre, solo se pueden solicitar fechas desde el día siguiente. Los casos cercanos a medianoche no cambian involuntariamente la fecha solicitada por conversión de zona horaria.

La hora se elige en franjas de cuarto de hora: solo se ofrecen :00, :15, :30 y :45. Ninguna combinación de las listas de hora y minutos puede exceder el cierre, de modo que 19:15, 19:30 y 19:45 no son elegibles; con la hora de cierre solo se ofrece :00. Elegir solo una de las dos listas no completa el horario.

Referencias: RF-07, RN-13; T-02, T-10; V-04.

## CA-16 — Solicitud sujeta a confirmación

La selección de día/hora y la revisión indican que son preferencias sujetas a confirmación. No se publican stock en tiempo real, cupos garantizados ni 48 horas de anticipación como regla no validada. Atender de lunes a domingo de 09:00 a 19:00 no se presenta como garantía de capacidad para cualquier pedido en ese horario.

Referencias: RF-07, RN-03, RN-04; T-02, T-10; V-01, V-04.

## CA-17 — Total honesto

Para dos tradicionales con retiro: subtotal $7.000, retiro $0 y total $7.000. Para las mismas cookies con envío: subtotal $7.000, «Envío: a confirmar» y total final pendiente. El mensaje y la revisión coinciden. No se muestra envío gratis, cero ficticio ni total final cerrado en el segundo caso.

Referencias: RF-09, RN-05; T-04, T-12; V-02, V-05.

## CA-18 — Mensaje completo y consistente

El mensaje saluda a Que Cookies y contiene líneas con nombre, unidades de venta, precio por unidad de venta e importe; subtotal; tratamiento de entrega/total; nombre y teléfono; dirección correspondiente a la modalidad; preferencias y comentarios no vacíos. Los packs identifican tamaño, cantidad y contenido total; por ejemplo: «2 packs de Mini cookies × 12 (24 mini cookies) — $9.500 c/u — $19.000». Cada pack añade su desglose de sabores («Sabores: 6 Tradicional · 4 Cacao · 2 Red Velvet») y los sabores en cantidad cero no se listan. Coincide con el último resumen validado y pide confirmación al negocio. No contiene ID de pedido ficticio ni estado de pago.

Referencias: RF-09, RF-10; T-12, T-13; V-05.

## CA-19 — Destino y codificación

La acción apunta a `https://wa.me/5491161919801` y codifica el texto correctamente. Se verifican «Peña», tildes, saltos de línea, emojis y caracteres como `&`, `+`, `#` y `%` sin pérdida ni alteración del mensaje. Los datos personales no aparecen en URLs internas del checkout.

Referencias: RF-10, RNF-05; T-13; V-05, V-06.

## CA-20 — Semántica de apertura

El botón dice «Continuar por WhatsApp» y explica que el cliente debe enviar el mensaje. Tras accionarlo no se afirma que el pedido se envió, se recibió, se confirmó o se pagó. No se crea una página de seguimiento ficticia. El carrito se conserva aunque se vuelva sin enviar nada.

Referencias: RF-10, RN-08, RN-09; T-13, T-14; V-06.

## CA-21 — Validación final

Antes de preparar la solicitud se vuelven a validar mínimo, productos, formulario, entrega y preferencias. Cambiar el carrito o la modalidad invalida el resumen anterior y actualiza el texto. Pulsar repetidamente no crea registros de pedido ni da una confirmación falsa.

Referencias: RF-10; T-13; V-04, V-05, V-06.

## CA-22 — Alternativas y mensajes extensos

Si el cliente no logra abrir WhatsApp, tiene número visible y texto completo para copiar. Si falla el portapapeles, se permite copia manual. Una solicitud con todas las referencias públicas y campos en su longitud máxima no se trunca; si el enlace resulta inadecuado en una plataforma, existe un recorrido de copia y apertura de chat usable.

Referencias: RF-11, RNF-07; T-14; V-05, V-06.

## CA-23 — Uso móvil y accesibilidad

El recorrido se completa a 320, 375, 390 y 768 px y en escritorio sin desbordamiento general ni controles tapados por elementos fijos. Se puede navegar con teclado; foco y errores son perceptibles; imágenes y campos tienen alternativas/etiquetas. El zoom, movimiento reducido y teclado virtual no impiden revisar ni continuar. Contraste compatible con el objetivo AA.

Referencias: RNF-01, RNF-02; T-04, T-07, T-10; V-07.

## CA-24 — Datos personales y entrada segura

El perfil se guarda solo por elección del cliente y no incorpora datos de pedidos anteriores. No hay datos personales en logs o analítica. Texto introducido con etiquetas HTML se trata como texto, sin ejecutarse. Los fallos de persistencia no provocan pérdida silenciosa de la selección en memoria.

Referencias: RF-04, RF-08, RNF-05, RNF-07; T-09, T-11; V-03, V-04.

## CA-25 — Contenido, SEO y rendimiento

Las fotos tienen procedencia y licencia registradas, dimensiones y optimización, y la indicación ilustrativa es visible. Las páginas públicas presentan títulos/descripciones apropiados y contenido indexable. Se registran mediciones de rendimiento con contexto y no se presentan como métricas de campo resultados de laboratorio. No quedan afirmaciones alimentarias ni horarios inventados.

Referencias: RF-01, RF-02, RNF-03, RNF-04; T-03, T-06, T-07; V-01, V-07, V-08.

## CA-26 — Publicación verificable

La compilación y verificaciones acordadas pasan sobre la versión publicada. Rutas directas, imágenes, dominio y metadatos de producción funcionan. Se comprueba apertura al número real y se coordina con el negocio una prueba identificada como tal. Se registra URL, fecha, versión y limitaciones de prueba pendientes; no se declara un navegador/dispositivo validado sin evidencia.

Referencias: RNF-03, RNF-04, RNF-06; T-15, T-16; V-08, V-09.

## CA-27 — Modularidad, legibilidad y DRY

La revisión de código identifica una responsabilidad clara por módulo y funciones/componentes fáciles de seguir. Las páginas componen secciones y no mezclan presentación, cálculo comercial, almacenamiento y construcción del mensaje en un solo archivo. Se reutilizan controles y patrones existentes cuando cumplen el mismo propósito; las abstracciones compartidas no requieren combinaciones de opciones que oculten su comportamiento.

Marca/contacto, horarios, catálogo/precios y tamaños de packs tienen una fuente única. Carrito y checkout consumen las mismas reglas de importes/mínimo; la UI y WhatsApp derivan del mismo resumen validado. No hay fórmulas copiadas ni versiones independientes de una misma validación. Las reglas puras no importan React, UI o almacenamiento.

Cambiar un precio o una regla central no exige editar fórmulas repetidas en varias pantallas. La revisión registra módulos examinados y cualquier duplicación justificada por responsabilidades realmente distintas. El número de líneas por archivo es una señal para revisar cohesión, no un criterio mecánico de aprobación.

Referencias: RNF-06, RNF-08; T-04, T-05, T-06, T-08, T-12, T-13, T-15; V-08; [AGENTS.md](../../../AGENTS.md).
