# 000 — Diseño de arquitectura y stack

Estado: arquitectura para [la especificación R1](./spec.md). Base inicializada en QC-004 y verificada con TypeScript y compilación de producción.

## 1. Decisiones de stack

| Área | Decisión / estado |
| --- | --- |
| Framework | Next.js con App Router, acordado |
| Estilos | Tailwind CSS, acordado |
| UI base | React y React DOM, dependencias propias de Next.js |
| Lenguaje | TypeScript, propuesto y aceptado en la dirección técnica conversada |
| Versiones | Next.js 16.3.6, React 19.3.0, Tailwind 4.3.3, TypeScript 5.9.3; package-lock.json versionado |
| Gestor de paquetes | npm; desarrollo con Node.js 24.20.0 / npm 11.19.0 |
| Estado interactivo | Hooks y Context de React, sin store externo inicialmente |
| Formularios | Controles nativos y validaciones propias pequeñas, sin librería adicional inicialmente |
| Persistencia | localStorage a través de un adaptador defensivo |
| Imágenes | next/image; recursos de stock elegidos y optimizados, preferentemente locales |
| Tipografía | next/font o archivos locales con licencia adecuada |
| Iconografía | SVG propios o recursos con licencia adecuada; sin paquete de iconos inicialmente |
| WhatsApp | Enlace wa.me y texto codificado; sin SDK ni API de mensajería |
| Backend / base de datos / pagos | Fuera del release |
| Hosting | Pendiente, según modalidad de despliegue y dominio |
| Pruebas y lint | TypeScript y build; pruebas de dominio con node:test y node:assert nativos. Sin paquetes adicionales de lint/testing; automatización de navegador por acordar |

Cualquier dependencia adicional, incluso de desarrollo o componentes UI, se conversa antes de instalar. No ejecutar un scaffolding que incorpore silenciosamente paquetes opcionales. Las dependencias técnicas necesarias de Next.js, React, Tailwind y TypeScript se documentarán al preparar el entorno.

Superpowers es una herramienta del entorno de desarrollo. Su instalación/configuración se trata por separado; estos documentos siguen SDD sin afirmar que sus skills estén activas.

## 2. Límites de la arquitectura

### R1

Catálogo local → renderizado de la web → selección en navegador → revisión validada → mensaje → WhatsApp.

- El sitio no crea un pedido persistido en servidor.
- No hay endpoint de cobro, credenciales de Mercado Pago, webhook ni acceso al SaaS.
- El navegador calcula importes informativos a partir del catálogo publicado.
- El negocio revisa la solicitud por WhatsApp; el contenido de un mensaje puede ser editado por el cliente y no es una cotización confiable de un servidor.
- No se introducen endpoints ficticios, autenticación ni abstracciones multi-tenant completas para anticipar el SaaS.

### Próximo release

Un adaptador de catálogo podrá consumir el SaaS; un servicio de cotización validará precios y disponibilidad; un servicio de pedidos creará la reserva y el backend iniciará Mercado Pago. En ese release se especificarán estados, idempotencia, autenticación del negocio, seguimiento y reembolso. R1 conserva componentes y modelos útiles, sin representar esas operaciones como existentes.

## 3. Organización propuesta

Rutas:

| Ruta | Responsabilidad |
| --- | --- |
| `/` | Inicio, destacados y accesos |
| `/cookies` | Carta |
| `/cookies/[slug]` | Detalle compartible e indexable |
| `/carrito` | Selección editable |
| `/checkout` | Contacto, entrega y revisión en pasos lógicos |
| `/preguntas-frecuentes` | Respuestas operativas |
| `/nosotros` | Historia y contacto |
| `/privacidad` | Explicación breve del tratamiento real de datos locales y WhatsApp |

Los pasos del checkout pueden convivir en una sola ruta para reducir complejidad. La navegación permite volver sin perder el borrador. No habrá `/pedido-confirmado` ni una ruta de seguimiento en R1.

Organización de módulos propuesta, ajustable durante la planificación técnica:

- `src/app/`: rutas, layouts, metadatos y composición de páginas.
- `src/components/`: elementos visuales compartidos.
- `src/features/catalog/`: catálogo y presentación de productos.
- `src/features/cart/`: reglas, estado y controles del carrito.
- `src/features/checkout/`: formulario, validación y revisión.
- `src/features/whatsapp/`: formateo y entrega del mensaje.
- `src/lib/storage/`: persistencia, versiones y recuperación.
- `src/config/`: marca y operación del negocio.
- `src/data/`: catálogo público local.
- `public/`: imágenes y marca con registro de procedencia.

Usar Server Components para contenido y catálogo donde sea posible. Delimitar Client Components al carrito, formulario, persistencia y acciones de navegador. No convertir toda la aplicación en cliente por comodidad.

### Modularidad, legibilidad y DRY

Regla obligatoria del proyecto, registrada en [AGENTS.md](../../../AGENTS.md) y RNF-08:

- Páginas pequeñas que componen secciones; cada sección implementa una responsabilidad visual reconocible.
- Estado en hooks/proveedores acotados; acceso al almacenamiento en su adaptador, nunca disperso en controles o páginas.
- Cálculo de líneas, subtotales, mínimo físico y elegibilidad en funciones puras compartidas por carrito y checkout.
- Un único modelo de resumen alimenta la presentación y el formateador de WhatsApp. Este último cambia el formato, no recalcula reglas comerciales.
- Datos de marca, horarios, catálogo, tamaños y precio base de mini cookies centralizados. Tokens visuales compartidos, sin repetir valores arbitrarios por pantalla.
- Reutilizar controles y componentes existentes antes de crear otros. Mantener componentes de dominio dentro de su feature y primitivas transversales dentro de `components/ui/`.
- Nombrar archivos por propósito (`calculate-cart`, `pack-size-selector`, `order-totals`) y evitar contenedores genéricos que mezclen responsabilidades (`helpers`, `misc`, `all-components`).
- Extraer según cohesión y reutilización real; sin límites mecánicos de líneas ni componentes universales con combinaciones de props difíciles de seguir.

Dirección de dependencias: páginas → componentes/features → reglas puras y datos. Los adaptadores de navegador se invocan desde la capa de estado; el dominio no importa React, UI ni almacenamiento. Compartir datos serializables hacia Client Components sin arrastrar módulos exclusivos de servidor.

La distribución concreta de componentes y estados está en [diseño UI/UX](./diseno-ui-ux.md). La verificación de modularidad forma parte de CA-27 y V-08.

## 4. Modelos conceptuales

### BusinessConfig

Nombre público Que Cookies, logo con el nuevo texto y la misma identidad, enlaces, WhatsApp normalizado, dirección de retiro, horario de retiro/envío 09:00–19:00 de lunes a domingo, zona horaria, moneda, mínimo y zonas declaradas de envío. La dirección de retiro es diferente del domicilio del cliente. No inferir un cambio de usuario de Instagram a partir del cambio de marca.

### Product

ID estable, slug, nombre público, descripción verificada, precio por unidad de venta en unidades monetarias menores, moneda ARS, imagen, texto alternativo, ingredientes/alérgenos, etiquetas, disponibilidad editorial, tipo de venta (individual/pack) y cookies por unidad de venta. Los campos alimentarios pendientes no se completan por inferencia.

Las ocho cookies individuales tienen contenido 1. Las mini cookies tienen cuatro presentaciones con IDs `mini-cookies-12`, `mini-cookies-24`, `mini-cookies-48` y `mini-cookies-96`, contenido 12/24/48/96 y precio derivado de una base central de 79200 centavos por mini cookie. Una ficha puede agruparlas con selector, pero se resuelve un ID de presentación concreto antes de agregar. No exponer `mini-cookie` individual ni bollos en el catálogo comprable.

Los importes recibidos se convierten de pesos a centavos al ingresar en el modelo (3500 ARS = 350000 centavos). Cálculos enteros; presentación con Intl.NumberFormat, sin aritmética de dinero en flotantes.

Precios de packs en centavos: 950400, 1900800, 3801600 y 7603200. Derivarlos del precio base y tamaño para evitar duplicar valores que puedan divergir. No aplicar descuentos implícitos ni permitir tamaños arbitrarios enviados desde almacenamiento.

### CartLine

ID de producto/presentación y cantidad de unidades de venta. En individuales la cantidad cuenta cookies; en packs cuenta packs completos. Nombre, contenido y precio vigentes se resuelven desde el catálogo. La representación persistida incluye el último precio por unidad de venta mostrado para detectar cambios, pero nunca determina con él el importe actual. Productos faltantes se conservan como líneas no resolubles hasta que el usuario las quite, con una etiqueta de referencia segura.

Identidad de línea por presentación: dos packs de 12 se conservan separados de un pack de 24 aunque ambos contengan 24 mini cookies y cuesten lo mismo. Restaurar el carrito no cambia el tamaño elegido ni acepta IDs de bollos o mini cookies individuales como productos comprables.

### CustomerProfile

Nombre, teléfono, última modalidad y dirección opcional. Perfil recordado separado del borrador transaccional. No incluye fecha, hora, comentarios ni historial de pedidos.

### CheckoutDraft

Contacto, modalidad, dirección si corresponde, fecha y hora preferidas, comentarios y decisión de recordar perfil. Es un borrador de solicitud, no una entidad de pedido confirmado.

### PurchaseSummary

Líneas resueltas, total de unidades de venta (artículos), total de cookies físicas, subtotal y estado de entrega. Mínimo: suma de cantidad × contenido por unidad de venta ≥ 2, calculada solo sobre líneas comprables. El contador visual de artículos no determina ese mínimo. Subtotal: suma de cantidad × precio por unidad de venta; no multiplicar otra vez por el contenido cuando el precio ya es el de un pack.

Para retiro: envío conocido con importe cero y total numérico. Para envío R1: envío pendiente y total final no disponible; no representar «pendiente» como cero.

### WhatsAppMessage

Texto derivado únicamente del resumen validado, con saludo a Que Cookies y tamaños/cantidades de packs explícitos. No contiene ID de pedido inventado, estado de pago ni enlaces de seguimiento. Campos opcionales vacíos se omiten. La URL se construye codificando el mensaje completo una sola vez.

## 5. Persistencia e hidratación

- Claves propuestas para la primera implementación: `quecookies:cart:v1` y `quecookies:profile:v1`.
- Mantener las claves estables aunque cambie el nombre comercial, o migrarlas explícitamente.
- Incluir versión del esquema y validar forma, tipos y cantidades al leer.
- Consultar localStorage únicamente en cliente.
- Distinguir «todavía no hidratado» de «carrito vacío». No escribir el estado vacío inicial sobre datos existentes antes de terminar la restauración.
- Atrapar errores de acceso, lectura, parsing, cuota y escritura. Mantener funcionamiento en memoria cuando no se pueda persistir.
- Reconciliar carrito con el catálogo cargado antes de mostrar una revisión válida.
- Detectar actualización de almacenamiento entre pestañas o revalidar al recuperar foco; no permitir que un resumen antiguo siga habilitado tras cambios del carrito.
- Guardar perfil solo tras elección explícita; desactivar la opción elimina lo persistido.
- No persistir datos del formulario en URLs ni incluirlos en logs.
- No escribir datos personales en pruebas reales compartidas; usar datos sintéticos para validar.

## 6. Validación y entrega a WhatsApp

Reglas puras reutilizables para mínimo, cantidades, subtotal, modalidad, datos y preferencias. Validación de teléfono razonable, sin prometer verificar la titularidad del número. Límites propuestos de longitud: nombre 100, teléfono 30, calle 120, número 20, localidad 80, piso/departamento 80, referencias 200 y comentarios 300 caracteres.

Al continuar:

1. Leer el estado vigente y reconciliar productos.
2. Validar selección y formulario.
3. Derivar un único resumen.
4. Mostrar errores y devolver foco al área correspondiente si falla.
5. Derivar texto y enlace desde ese resumen.
6. Abrir WhatsApp como consecuencia directa del gesto del usuario, evitando aperturas tardías bloqueadas por el navegador.

No depender de detección de instalación de WhatsApp ni asumir que un cambio de foco acredita envío. Mantener visible la alternativa de copiar. Para mensajes largos, medir el comportamiento en móvil y escritorio; si el enlace no es fiable, facilitar copiar el texto completo y abrir el chat, sin truncar.

Fecha y hora se interpretan en America/Argentina/Buenos_Aires. Evitar convertir una fecha de calendario a UTC de forma que cambie el día mostrado.

## 7. Sistema visual

Detalle de pantallas, wireframes, tokens propuestos y componentes: [diseno-ui-ux.md](./diseno-ui-ux.md).

- Marca pública: Que Cookies; adaptar el texto del logo y mantener su identidad visual.
- Paleta principal: rojo y amarillo del logo; crema como superficie complementaria.
- Tokens semánticos para fondo, texto, acción, borde, error y foco.
- Contraste verificado: no asumir que amarillo sobre crema o texto pequeño sobre rojo cumplen accesibilidad.
- Titulares expresivos y cuerpo muy legible; selección tipográfica pendiente.
- Tarjetas con precio y acción visibles, sin depender de hover.
- Grilla mobile legible; destacados pueden usar desplazamiento horizontal accesible.
- Carrito visible en el encabezado y CTA contextual que no tape contenido ni teclado.
- Animaciones discretas, respetando reduced motion; sin efectos 3D en R1.
- Stock fotográfico sin hotlinking improvisado; registrar origen, licencia y fecha de obtención, y señalar su carácter ilustrativo.

## 8. Despliegue y medición

La plataforma se elige antes de publicar. R1 no necesita un servidor de negocio; la estrategia de generación estática y optimización de imágenes depende del hosting elegido. No decidir exportación estática y optimizador de imágenes incompatible sin resolver su configuración.

No agregar analítica de terceros inicialmente sin definir herramienta y tratamiento de datos. Si luego se mide el CTA, denominar el evento «inicio de WhatsApp», no «pedido enviado» ni «venta». Dominio definitivo pendiente para metadatos de producción.
