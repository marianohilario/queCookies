# 000 — Vidriera y solicitudes de pedido por WhatsApp

## Estado y documentos

- Fecha: 2026-09-26.
- Release: R1, frontend sin conexión al SaaS ni cobro online.
- Estado: especificación actualizada con nombre Que Cookies, packs de mini cookies y horarios confirmados; contenidos pendientes identificados abajo.
- Implementación: no iniciada.
- Metodología: SDD (desarrollo guiado por especificaciones).

Documentos asociados:

- [Diseño de arquitectura y stack](./arquitectura-y-stack.md).
- [Diseño UI/UX mobile first](./diseno-ui-ux.md).
- [Plan de tareas](./plan-de-tareas.md).
- [Criterios de aceptación](./criterios-de-aceptacion.md).
- [Plan y registro de validación](./validacion.md).

Esta especificación es la fuente de verdad del release. Los cambios de comportamiento se reflejan primero en requisitos, criterios y tareas; luego en implementación y evidencia de validación. Los identificadores RF, RN, RNF, CA, T y V permiten seguir esa relación. Superpowers podrá apoyar el proceso cuando esté disponible; no es una dependencia del producto ni está configurado por estos documentos.

## 1. Objetivo

Publicar rápidamente una web moderna, cálida y mobile first para Que Cookies. El cliente descubre cookies individuales y packs de mini cookies, arma una selección de al menos dos cookies físicas, completa sus datos, solicita retiro o envío y continúa a WhatsApp con un mensaje preparado para el negocio. Cualquier pack de mini cookies cumple por sí solo el mínimo.

El negocio confirma disponibilidad, entrega e importe definitivo cuando corresponda, y coordina el pago dentro de la conversación. La web no recibe pagos, no reserva stock y no registra pedidos en un servidor.

## 2. Datos confirmados

| Dato | Valor |
| --- | --- |
| Marca confirmada | Que Cookies |
| Identidad | Se mantienen los colores rojo profundo y amarillo cálido y el resto de la identidad; actualizar el texto del logo al nuevo nombre |
| Instagram | https://www.instagram.com/quecookiss/ |
| WhatsApp | +54 9 11 6191-9801 |
| Destino normalizado de WhatsApp | `5491161919801` |
| Enlace base | https://wa.me/5491161919801 |
| Retiro | Peña 298, Banfield, Buenos Aires, Argentina |
| Horarios de retiro y envío | De 09:00 a 19:00, de lunes a domingo |
| Cobertura informada | Partidos de Lomas de Zamora y Lanús, y localidad de Adrogué |
| Costo de envío | A confirmar con el negocio por WhatsApp |
| Moneda / formato | ARS / es-AR |
| Zona horaria | America/Argentina/Buenos_Aires |
| Pedido mínimo | 2 cookies físicas, sumando individuales y contenido de packs; no exige dos packs |
| Venta | Cookies individuales por sabor y mini cookies exclusivamente en packs de 12, 24, 48 y 96 |
| Fotografías R1 | Imágenes de stock ilustrativas, por seleccionar |

Adrogué pertenece al partido de Almirante Brown. La cobertura se interpreta como la localidad de Adrogué, no todo Almirante Brown. Esta precisión debe figurar en el selector de entrega y validarse con el negocio.

El nombre público es Que Cookies desde este release. El enlace de Instagram informado sigue siendo `quecookiss` hasta que el negocio proporcione otro. La carpeta del proyecto conserva su ruta `quecookiss`; el nombre de una carpeta no determina la marca pública.

## 3. Catálogo recibido

Transcripción de la imagen facilitada por el usuario. Los importes se interpretan como pesos argentinos, sin separadores decimales. Se preserva el nombre original para contrastarlo antes de publicar; los nombres de presentación podrán corregir mayúsculas y tildes sin cambiar el producto.

| ID de referencia | Nombre original | Precio ARS | Tratamiento confirmado |
| --- | --- | ---: | --- |
| cookie-tradicional | cookie tradicional | 3500 | Cookie individual |
| cookie-cacao | cookie de cacao | 4000 | Cookie individual |
| cookie-red-velvet | red velvet | 4000 | Cookie individual |
| cookie-bon-o-bon | cookie bon o bon | 5000 | Cookie individual |
| cookie-nutella | cookie de nutella | 5000 | Cookie individual |
| cookie-red-velvet-rellena | red velvet rellena | 5000 | Cookie individual |
| cookie-pistacho | cookie pistacho | 6000 | Cookie individual |
| bollo-vainilla | bollo vainilla | 1150 | Excluido de la venta web |
| bollo-red-velvet | bollo red velvet | 2000 | Excluido de la venta web |
| mini-cookie | Mini Cookie | 792 | Base de cálculo por mini cookie; no vendible individualmente |
| bollo-choco | bollo choco | 2000 | Excluido de la venta web |
| bollo-tradicional | bollo tradicional | 2000 | Excluido de la venta web |
| cookie-cacao-chocolate-blanco | cookie cacao choco blanco | 4000 | Cookie individual |

Los cuatro bollos se conservan solo como antecedente de la lista recibida; no se publican ni se pueden comprar por la web. La referencia Mini Cookie a $792 es la base para calcular packs, no un artículo comprable de una unidad.

### Presentaciones de mini cookies incluidas en R1

| ID estable de presentación | Nombre público | Cookies por pack | Cálculo ARS | Precio del pack ARS |
| --- | --- | ---: | --- | ---: |
| mini-cookies-12 | Mini cookies × 12 | 12 | 12 × 792 | 9504 |
| mini-cookies-24 | Mini cookies × 24 | 24 | 24 × 792 | 19008 |
| mini-cookies-48 | Mini cookies × 48 | 48 | 48 × 792 | 38016 |
| mini-cookies-96 | Mini cookies × 96 | 96 | 96 × 792 | 76032 |

El catálogo público tiene ocho sabores individuales y cuatro presentaciones comprables de mini cookies. Estas últimas pueden presentarse en una ficha con selector de tamaño; cada tamaño conserva su ID en el carrito. El cliente elige cantidad de packs enteros, no mini cookies sueltas ni tamaños arbitrarios. No hay descuento por volumen: precio del pack = tamaño × $792.

No se deducirán ingredientes, rellenos, pesos, sabores de las mini cookies o alérgenos a partir del nombre ni de fotografías genéricas. La composición de los packs se documentará con el negocio como contenido del producto; R1 no incluye un configurador de sabores para ellos.

## 4. Alcance

### Incluido

- Inicio, carta, detalle de producto, historia/contacto y preguntas frecuentes.
- Selección de cookies individuales y packs fijos de mini cookies, cantidades, carrito persistente y mínimo de compra.
- Checkout sin cuenta con nombre, teléfono, retiro o envío, preferencias de fecha/hora y comentarios opcionales.
- Domicilio editable y posibilidad de recordar datos en el dispositivo.
- Resumen de productos, importes y condiciones de entrega.
- Mensaje preparado y apertura del chat de WhatsApp.
- Alternativa para copiar el pedido y acceder al número del negocio.
- Diseño mobile first, accesibilidad, imágenes optimizadas y SEO básico.

### Releases posteriores

- Integración con SaaS, catálogo administrable y disponibilidad en tiempo real.
- Registro de pedidos, reservas de stock y capacidad de producción.
- Pago completo con Mercado Pago, aceptación/rechazo del negocio y reembolsos con motivo obligatorio.
- Seguimiento privado y notificaciones.
- Cajas de cookies grandes, otros combos, configuradores y mensajes de regalo; los cuatro packs fijos de mini cookies sí están incluidos en R1.
- Tarifas automáticas de envío y eventual integración logística.

## 5. Recorrido y requisitos funcionales

### RF-01 — Presentación de la marca

El inicio presenta fotos protagonistas, una frase breve, CTA «Pedí tus cookies», selección destacada, instrucciones para pedir y acceso a la carta. Secciones informativas incluyen historia, Instagram, WhatsApp, retiro y preguntas frecuentes. Nombre, logo, textos, metadatos y mensajes usan Que Cookies; se centralizan identidad y contactos. La paleta y el estilo de marca se mantienen.

Propuesta editorial, pendiente de revisión:

> Un antojo grande merece una cookie así.
>
> Cookies estilo New York en Banfield. Elegí tus favoritas y coordiná tu pedido para retirar o recibir en casa.

Cómo pedir: «Elegí tus cookies → Completá tus datos → Confirmá con nosotros por WhatsApp».

No se inventarán historia, testimonios, premios, afirmaciones nutricionales ni características de producción. Las imágenes de stock llevarán una indicación perceptible de que son ilustrativas y no representan necesariamente el producto final.

### RF-02 — Catálogo y detalle

Cada producto público tendrá ID estable, nombre, precio, imagen con texto alternativo, descripción y espacio para ingredientes destacados y alérgenos verificados. Estos últimos contenidos están pendientes de aporte del negocio; no se publicarán afirmaciones de ausencia de alérgenos sin respaldo.

Las mini cookies muestran claramente la presentación de 12, 24, 48 o 96 unidades y el precio completo del pack seleccionado. El precio base de $792 puede mostrarse como referencia por mini cookie, sin un botón de compra individual. Cambiar el tamaño actualiza precio e ID antes de agregar al carrito.

Los productos se podrán marcar como destacados, edición limitada o no disponibles mediante la configuración local. Esas etiquetas requieren confirmación del negocio. No se anunciarán cantidades de stock en tiempo real. Un producto marcado no disponible no puede agregarse ni enviarse en la solicitud.

### RF-03 — Carrito y mínimo

Agregar, aumentar, reducir y eliminar líneas. Cantidades enteras positivas; eliminar es una acción explícita. Para cookies individuales, la cantidad representa cookies; para mini cookies, representa packs del tamaño seleccionado. Mostrar ambas unidades con etiquetas claras y el subtotal.

El mínimo son dos cookies físicas totales: suma de cantidad de cada línea × cookies por unidad de venta. Cada individual aporta una; cada pack aporta 12, 24, 48 o 96. Un pack cumple el mínimo por sí solo, y se permite combinarlo con cookies individuales. No se exige comprar dos packs ni dos cookies grandes adicionales.

Ejemplo: «2 packs de Mini cookies × 12» representa 24 mini cookies y cuesta $19.008. Se conserva como dos packs de 12, sin transformarlo automáticamente en un pack de 24 aunque el precio coincida. El contador principal del carrito muestra unidades de venta (individuales + packs), etiquetadas como artículos, y el resumen distingue el contenido de los packs. Ese contador no se usa para validar el mínimo.

Un carrito con una cookie es válido como borrador, pero no permite continuar ni generar el enlace de pedido. Mensaje: «El pedido mínimo es de 2 cookies. ¡Sumá una más para continuar!». El estado vacío invita a volver a la carta.

### RF-04 — Persistencia del carrito

Guardar automáticamente IDs y cantidades en almacenamiento local, junto con el último precio mostrado como referencia para detectar cambios. Recuperar al regresar al mismo navegador. Recalcular con el catálogo vigente en la carga actual, sin usar ese precio histórico para determinar importes.

Si cambió el precio, notificarlo antes de continuar. Si un producto ya no existe o está marcado no disponible, identificarlo, excluirlo de los importes comprables y exigir resolver la línea antes de continuar. No sustituir sabores silenciosamente.

Datos corruptos, versiones incompatibles o almacenamiento bloqueado no impiden comprar: se recupera un estado seguro y se informa si no es posible conservarlo. No se guardan pagos, pedidos confirmados ni tokens de seguimiento.

### RF-05 — Datos del cliente

Nombre y teléfono obligatorios; sin cuenta ni correo obligatorio. La validación admite formatos de teléfono habituales y produce mensajes claros sin depender únicamente del color. Conservar la entrada mientras el cliente navega el checkout.

Comentarios opcionales, con límite propuesto de 300 caracteres. No se presentan como una opción para personalizar recetas ni garantizar condiciones alimentarias especiales.

### RF-06 — Retiro y envío

**Retiro:** mostrar Peña 298, Banfield, Buenos Aires; de lunes a domingo de 09:00 a 19:00; costo $0. No exigir ni incluir domicilio del cliente en el mensaje.

**Envío:** solicitar calle, número, localidad y zona de cobertura; piso/departamento y referencias opcionales. Permitir una indicación explícita «sin número» cuando corresponda. La cobertura se elige entre Lomas de Zamora, Lanús y Adrogué (Almirante Brown), con localidad adicional cuando corresponda. Esta declaración no equivale a geocodificar ni validar que la calle pertenezca a esa zona; el negocio confirma la dirección.

Los envíos se coordinan de lunes a domingo de 09:00 a 19:00, con costo a confirmar.

Direcciones declaradas fuera de cobertura no completan el flujo estándar de envío. Ofrecer cambiar a retiro o consultar por WhatsApp un envío especial, sin presentarlo como disponible ni asignarle una tarifa.

Elegir retiro oculta los campos de domicilio y no los incluye en la solicitud, aunque exista un domicilio recordado. Volver a envío puede recuperar el borrador.

### RF-07 — Preferencia de fecha y hora

Solicitar fecha y horario preferidos, sujetos a confirmación. No usar «turno reservado», «cupo disponible» ni «entrega garantizada». No permitir fechas pasadas ni un horario ya transcurrido para el día actual, tomando como referencia Buenos Aires.

Para retiro y envío, la preferencia queda dentro de 09:00–19:00 de lunes a domingo. Fuera de ese rango no se ofrece una preferencia válida; después del cierre, la primera fecha solicitada posible es el día siguiente. Pedidos para el día están sujetos a consulta, sin promesa de preparación inmediata. El horario operativo confirmado no garantiza capacidad para una solicitud concreta.

### RF-08 — Datos recordados

Ofrecer una casilla desmarcada por defecto: «Recordar mis datos y domicilio en este dispositivo». Al activarla, guardar nombre, teléfono, modalidad y último domicilio válido; nunca fecha, hora o comentarios particulares de la compra.

En visitas posteriores, precargar lo guardado, mostrarlo en la revisión y permitir modificarlo. Los cambios válidos se guardan si la opción sigue activa. Desactivarla elimina la copia persistente del perfil, sin borrar los datos que el cliente está usando en el formulario actual. «Borrar mis datos guardados» elimina también esa persistencia y comunica el resultado.

El carrito se persiste independientemente de la casilla. Explicar que los datos se recuerdan solo en ese navegador/dispositivo y que se incluirán en el mensaje al continuar por WhatsApp.

### RF-09 — Revisión e importes

Mostrar líneas con precio por unidad de venta, cantidad e importe, subtotal, modalidad, contacto, domicilio cuando aplique, fecha/hora solicitadas y comentarios. Para mini cookies, identificar tamaño del pack, cantidad de packs y contenido total, sin confundir el precio del pack con el precio base por mini cookie. Acciones para corregir la selección y los datos.

- Retiro: subtotal + retiro $0 = total de productos a coordinar con el negocio.
- Envío R1: subtotal de productos, «Envío: a confirmar» y «Total final: pendiente de cotizar el envío».

No usar envío $0, «gratis» ni un total final cerrado cuando falta el costo logístico. No aplicar descuentos, comisiones o recargos no definidos. Los precios del sitio se presentan como los publicados, con disponibilidad y entrega sujetas a confirmación; no se autoriza sustituirlos silenciosamente.

### RF-10 — Continuar por WhatsApp

Botón «Continuar por WhatsApp». Antes de habilitarlo, validar mínimo, productos comprables, datos, modalidad, cobertura declarada y preferencias. Construir el mensaje desde el mismo resumen validado, con importes recalculados.

El mensaje incluye:

1. Saludo a Que Cookies y expresión «Quiero solicitar este pedido».
2. Nombre, cantidad, precio por unidad de venta e importe de cada producto. En packs, tamaño y número de packs explícitos; por ejemplo: «2 packs de Mini cookies × 12 (24 mini cookies) — $9.504 c/u — $19.008».
3. Subtotal y tratamiento de envío/total según modalidad.
4. Nombre y teléfono del cliente.
5. Retiro con dirección del negocio, o envío con domicilio completo.
6. Fecha y horario preferidos, explícitamente sujetos a confirmación.
7. Comentarios si existen.
8. Solicitud de confirmar disponibilidad, entrega, importe definitivo cuando aplique y forma de pago.

Usar el destino `5491161919801`, sin signos ni espacios en el enlace, con texto correctamente codificado. No crear referencias que aparenten ser un número de pedido registrado.

Texto junto al botón: «Se abrirá el chat con tu pedido preparado. Enviá el mensaje para coordinar la confirmación y el pago».

La web no sabe si el chat abrió correctamente, si el usuario envió el mensaje o si el negocio lo recibió. No muestra éxito transaccional, confirmación de pago ni seguimiento. No vacía automáticamente el carrito.

### RF-11 — Recuperación y contacto

Ofrecer «Copiar pedido», número visible y enlace al chat como alternativas accesibles, sin depender de detectar si WhatsApp está instalado. Si el portapapeles no está disponible, permitir seleccionar y copiar el texto manualmente. Verificar mensajes extensos y evitar truncarlos silenciosamente.

Los accesos generales a consultas no requieren un carrito válido. Volver desde WhatsApp conserva la selección; «Vaciar carrito» elimina la selección persistida sin borrar el perfil recordado.

## 6. Reglas de negocio

| ID | Regla |
| --- | --- |
| RN-01 | Mínimo de 2 cookies físicas comprables; suma de cantidades × contenido de la unidad de venta. Un pack de mini cookies cumple el mínimo |
| RN-02 | Cada sabor conserva su precio individual; cantidad de individuales o packs siempre entera; precio de pack = tamaño × $792 |
| RN-03 | Ninguna selección local reserva stock o producción |
| RN-04 | La solicitud, entrega y pago se confirman con el negocio por WhatsApp |
| RN-05 | Retiro sin cargo; envío sin cotización no tiene total final cerrado |
| RN-06 | Cobertura estándar: Lomas de Zamora, Lanús y localidad de Adrogué |
| RN-07 | No se transmite domicilio personal para retiro |
| RN-08 | Abrir WhatsApp no equivale a enviar, recibir o confirmar un pedido |
| RN-09 | No vaciar el carrito automáticamente al continuar por WhatsApp |
| RN-10 | Datos recordados opcionales; fecha, hora y notas no se reutilizan automáticamente |
| RN-11 | Datos de precios, compra y disponibilidad se revalidan contra el catálogo cargado |
| RN-12 | Mini cookies solo en packs de 12, 24, 48 o 96; bollos fuera del catálogo web |
| RN-13 | Retiro y envío de lunes a domingo de 09:00 a 19:00, hora de Buenos Aires |

## 7. Requisitos no funcionales

- **RNF-01 — Mobile first:** usable desde 320 px, sin desbordamiento horizontal general; navegación, formularios y controles táctiles cómodos. Objetivo de zonas interactivas de al menos 44 × 44 px cuando sea posible.
- **RNF-02 — Accesibilidad:** objetivo WCAG 2.2 AA; contraste, foco visible, etiquetas, errores asociados, navegación por teclado y movimiento reducido. Ninguna información depende solo de hover o color.
- **RNF-03 — Rendimiento:** imágenes dimensionadas y optimizadas; priorizar la imagen principal y diferir las secundarias. Objetivos de campo tras lanzamiento: LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 al percentil 75; las mediciones de laboratorio se documentan por separado.
- **RNF-04 — SEO:** títulos y descripciones por página, contenido indexable, metadatos sociales y datos de negocio veraces. Canonical y sitemap cuando exista dominio definitivo.
- **RNF-05 — Datos personales:** persistencia local opcional del perfil; sin datos personales en las URLs internas ni en registros de analítica. El enlace de WhatsApp incorpora el mensaje preparado cuando el usuario elige continuar.
- **RNF-06 — Mantenibilidad:** reglas de negocio, catálogo, persistencia y formateo de WhatsApp separados de los componentes visuales.
- **RNF-07 — Robustez:** almacenamiento o portapapeles no disponibles no bloquean la solicitud; no interpretar el contenido introducido por el usuario como HTML.
- **RNF-08 — Modularidad y DRY:** módulos pequeños, cohesionados, legibles y de responsabilidad única. Reutilizar componentes, tipos y funciones con el mismo significado; centralizar reglas y datos compartidos. Evitar duplicación, páginas monolíticas y abstracciones que dificulten entender el flujo. Las reglas permanentes se registran en [AGENTS.md](../../../AGENTS.md).

## 8. Decisiones y contenidos

| ID | Tema / estado | Resolución o siguiente acción |
| --- | --- | --- |
| P-01 | Resuelto: bollos y presentaciones de mini cookies | Bollos excluidos; packs de 12/24/48/96 a $792 por mini cookie; mínimo aplicado al contenido físico |
| P-02 | Resuelto: días y horarios | Retiro y envío de lunes a domingo, de 09:00 a 19:00 |
| P-03 | Descripciones, ingredientes y alérgenos por producto | Redactar propuestas; información alimentaria debe verificarse antes de publicar la ficha final |
| P-04 | Fotos de stock y permiso/licencia de uso | Seleccionar recursos permitidos, registrar origen y señalar que son ilustrativos |
| P-05 | Archivo del logo con nombre Que Cookies y valores exactos de color | Mantener identidad visual; obtener/adaptar el recurso con el nuevo nombre y confirmar tokens |
| P-06 | Ratificar cobertura limitada a Adrogué dentro de Almirante Brown | Usar interpretación acotada; no ampliar a todo el partido |
| P-07 | Cantidades que requieren coordinación especial y anticipación | No imponer 48 h como regla general; todas las solicitudes sujetas a confirmación |
| P-08 | Nombre resuelto; dominio y alojamiento pendientes | Nombre confirmado Que Cookies; centralizar identidad y resolver despliegue antes de publicar |
| P-09 | Historia de marca y conservación recomendada | No inventar; completar con el negocio |
| P-10 | Tarifas de envío | No bloquea R1: envío y total final a confirmar explícitamente |

Actualización de alcance: las confirmaciones de nombre, packs y horario reemplazan las hipótesis iniciales de estos documentos. El resto de requisitos de R1 conserva su alcance.

## 9. Condición de cierre del release

Cumplir los criterios de aceptación, registrar evidencia de validación, completar los contenidos operativos necesarios para publicar y verificar el enlace al WhatsApp real. La documentación no acredita implementación ni pruebas ejecutadas. El cierre no requiere integración con SaaS ni Mercado Pago.
