# 000 — Diseño UI/UX mobile first

Estado: primera propuesta de diseño documentada, con wireframes de baja fidelidad. No es una interfaz implementada ni un prototipo probado en navegador.

Referencias: [spec](./spec.md), [arquitectura](./arquitectura-y-stack.md), [tareas](./plan-de-tareas.md), [aceptación](./criterios-de-aceptacion.md) y [validación](./validacion.md).

## 1. Dirección visual

**Concepto: una tienda de cookies cálida, expresiva y cuidada, con el producto como protagonista.**

Conservar el rojo profundo y amarillo del logo, con superficies crema para lectura y fotografía. Titulares grandes, imágenes cercanas de cookies y detalles orgánicos discretos. La referencia inicial orienta composición y tono; la paleta se adapta a la identidad real de Que Cookies.

- Pocas acciones simultáneas: elegir, agregar, revisar y continuar.
- Fotografías de stock coherentes en iluminación, recorte y fondo; indicación «Imagen ilustrativa» perceptible.
- Precios claros, sin adornos que compitan con el botón de compra.
- Titulares expresivos; textos de apoyo y campos cómodos de leer.
- Sin carrusel automático, rotación 3D ni acciones dependientes de hover.
- Las cookies individuales y las mini cookies son dos formas de comprar dentro de la misma carta.

### Paleta propuesta para la interfaz

Valores de trabajo basados en la referencia visual del logo; confirmar contra el archivo de marca en P-05. No se presentan como valores oficiales extraídos del archivo original.

| Token semántico | Valor propuesto | Uso |
| --- | --- | --- |
| `surface-page` | `#FFF8EC` | Fondo crema |
| `surface-card` | `#FFFFFF` | Tarjetas y campos |
| `brand-primary` | `#8F1D22` | Botón principal, titulares, secciones de contraste |
| `brand-accent` | `#FFCA5C` | Acentos, etiquetas con texto rojo, detalles de marca |
| `text-primary` | `#36191B` | Texto principal |
| `text-muted` | `#705B56` | Texto secundario legible |
| `focus-ring` | `#1E5670` | Foco en superficies claras |

Contrastes calculados por luminancia sRGB: texto principal/crema 15,16:1; secundario/crema 5,99:1; crema/rojo 8,40:1; rojo/amarillo 5,85:1; foco/crema 7,59:1. Amarillo/crema da 1,44:1: no usar amarillo como texto ni como único borde funcional sobre crema. En superficies oscuras, usar foco claro con separación visible. Las combinaciones reales de hover, error y deshabilitado se revisarán en la implementación.

### Tipografía, espaciado y superficies

- Propuesta: Fraunces para títulos editoriales y DM Sans para UI/cuerpo, con pesos limitados; gestionar por next/font sin agregar un paquete. La selección final depende de la prueba visual con el logo actualizado.
- Cuerpo y campos: base 16 px; textos secundarios 14 px; interlineado aproximado 1,5.
- H1: 36–44 px en móvil y 56–72 px en escritorio, con adaptación fluida y sin cortes forzados por dispositivo.
- Escala de separación: 4, 8, 12, 16, 24, 32, 48 y 64 px.
- Radio de tarjetas 20 px; controles 12 px; etiquetas tipo píldora.
- Botones y campos principales con altura mínima de 48 px; iconos interactivos con zona de al menos 44 × 44 px.
- Separadores y campos con borde suficientemente contrastado; sombras suaves solo como refuerzo visual.
- Una textura sutil puede acompañar fondos decorativos; nunca por detrás de textos largos o formularios.

## 2. Estructura responsive y navegación

| Ancho de referencia | Composición |
| --- | --- |
| 320–359 px | Catálogo en una columna para conservar controles cómodos |
| 360–767 px | Catálogo en dos columnas; ficha, carrito y checkout en una columna |
| 768–1023 px | Catálogo en tres columnas; secciones con mayor separación |
| Desde 1024 px | Catálogo en cuatro columnas; hero, detalle y checkout en dos columnas |

Contenedor máximo aproximado de 1200 px; margen móvil de 16 px y separación de grilla 12–24 px. Los breakpoints se ajustan si el contenido exige más espacio; nunca se sacrifica la legibilidad para mantener una cantidad de columnas.

**Encabezado móvil:** menú, marca y carrito con contador de artículos. El menú despliega enlaces debajo del encabezado mediante un botón con estado expandido; no requiere un modal a pantalla completa. En escritorio, enlaces visibles: Cookies, Mini cookies, Cómo pedir y Contacto.

**Pie:** retiro, días/horarios, cobertura, WhatsApp, Instagram, preguntas frecuentes y privacidad. Los datos provienen de la configuración del negocio.

**Carrito contextual:** en carta/detalle puede aparecer una barra inferior «Ver carrito · N artículos · $subtotal» cuando contiene productos. Reserva espacio para no tapar contenido y respeta safe area. Desaparece en checkout; no se apila con un botón flotante de WhatsApp.

**Checkout:** conserva marca, acceso al carrito y navegación de retorno; elimina distracciones promocionales. Sus acciones quedan en el flujo del documento para no superponerse al teclado virtual.

## 3. Inicio — `/`

Wireframe móvil:

```text
┌─────────────────────────────────┐
│ Menú      que cookies   Carrito  │
├─────────────────────────────────┤
│ COOKIES ESTILO NEW YORK          │
│ Un antojo grande                 │
│ merece una cookie así.           │
│                                 │
│ Elegí tus favoritas y coordiná   │
│ tu pedido desde Banfield.        │
│ [ Pedí tus cookies → ]           │
│ Retiro y envío · Todos los días  │
│                                 │
│     Fotografía protagonista     │
│       Imagen ilustrativa        │
├─────────────────────────────────┤
│ Encontrá tu próxima favorita    │
│ [Cookie]           [Cookie]      │
│ [Cookie]           [Cookie]      │
│ [ Ver toda la carta ]           │
├─────────────────────────────────┤
│ Minis para compartir            │
│ Packs de 12, 24, 48 o 96         │
│ [ Elegí tu pack ]               │
├─────────────────────────────────┤
│ Así de fácil                    │
│ 1 Elegí · 2 Completá · 3 Escribí │
├─────────────────────────────────┤
│ Que Cookies, en Banfield        │
│ Contacto · Preguntas frecuentes  │
│ Retiro · Horarios · Redes        │
└─────────────────────────────────┘
```

En escritorio, hero con texto a la izquierda e imagen a la derecha. El CTA queda antes de la fotografía en el orden de lectura móvil. La altura es de contenido, sin ocupar obligatoriamente toda la pantalla.

Destacados editoriales: seleccionar hasta cuatro productos cuando el negocio defina cuáles; no etiquetarlos como «más vendidos» sin datos. Mientras se diseña, usar «Conocé nuestros sabores» y productos del catálogo como muestra.

Texto propuesto para minis: «Pequeñas para compartir. Elegí tu pack de 12, 24, 48 o 96 mini cookies».

Bloque cómo pedir:

1. «Elegí tus cookies»: individuales o packs de minis.
2. «Completá tus datos»: retiro o envío y tu horario preferido.
3. «Coordiná por WhatsApp»: enviá el mensaje preparado para confirmar disponibilidad y pago.

## 4. Carta — `/cookies`

- H1 «Elegí tus cookies» y explicación breve del mínimo.
- Accesos internos «Cookies» y «Mini cookies», implementados como enlaces a secciones, no pestañas que oculten oferta.
- Ocho tarjetas de cookies individuales y sección de minis con selector de presentación.
- Sin buscador ni filtros adicionales para este tamaño de catálogo.

```text
┌─────────────────────────────────┐
│ Elegí tus cookies               │
│ Mínimo: 2 cookies               │
│ [Cookies] [Mini cookies]        │
│                                 │
│ Foto              Foto          │
│ Tradicional       Cacao         │
│ $3.500            $4.000        │
│ [Agregar]         [Agregar]     │
│ ...otros sabores...             │
│                                 │
│ Mini cookies                    │
│ [12] [24] [48] [96]             │
│ Pack seleccionado: $9.500       │
│ [ Agregar pack ]                │
├─────────────────────────────────┤
│ Ver carrito · artículos · $...  │
└─────────────────────────────────┘
```

En el wireframe los tamaños se abrevian en una fila; el componente móvil respeta la grilla 2 × 2 descrita abajo. La barra de carrito aparece solo si ya hay selección.

**Tarjeta individual:** imagen cuadrada, nombre, descripción corta verificada, precio y botón «Agregar». Nombre/imagen enlazan al detalle, sin anidar botones dentro del enlace. Al agregar, se anuncia «Agregaste [nombre]» y se actualiza el carrito sin cambiar de página. Edición completa de cantidades en detalle y carrito.

**Mini cookies:** una tarjeta/sección más amplia con fotografía, texto, selector 12/24/48/96, precio del pack seleccionado y botón «Agregar pack». Valor inicial propuesto: 12, claramente seleccionado. En móvil los cuatro tamaños forman una grilla 2 × 2; en escritorio pueden ocupar una fila. Radios nativos con etiquetas, no botones sin estado accesible. El precio principal siempre es el del pack.

## 5. Detalle — `/cookies/[slug]`

Orden móvil: volver a la carta → foto → nombre → descripción → selector de presentación si aplica → precio → cantidad → agregar → ingredientes y alérgenos verificados visibles en la misma ficha.

```text
┌─────────────────────────────────┐
│ ← Volver a la carta              │
│             Foto                │
│       Imagen ilustrativa        │
│ Mini cookies                    │
│ Descripción verificada          │
│                                 │
│ Elegí tu presentación            │
│ [● 12 unidades] [○ 24 unidades]  │
│ [○ 48 unidades] [○ 96 unidades]  │
│ $9.500 por pack                  │
│ Cantidad de packs   [−] 1 [+]    │
│ [ Agregar pack · $9.500 ]        │
│ Ingredientes y alérgenos         │
└─────────────────────────────────┘
```

La jerarquía de información alimentaria puede adaptarse según longitud, pero permanece accesible antes de completar la compra y nunca depende de hover. No mostrar información pendiente como si estuviera confirmada.

La ficha de mini cookies agrupa las cuatro presentaciones; el botón resuelve el ID de la elegida. El selector de cantidad cuenta packs completos. Para una cookie individual cuenta unidades. Al disminuir desde uno, el selector se detiene en uno; la eliminación existe en el carrito.

En escritorio: imagen a la izquierda y bloque de compra a la derecha, sin duplicar componentes para cada dispositivo.

## 6. Carrito — `/carrito`

```text
┌─────────────────────────────────┐
│ Tu carrito                      │
│                                 │
│ Foto · Tradicional              │
│ $3.500 c/u      [−] 1 [+]       │
│ Quitar                 $3.500   │
│                                 │
│ Foto · Mini cookies × 12        │
│ $9.500 por pack [−] 1 [+]       │
│ 1 pack · 12 mini cookies        │
│ Quitar                 $9.500   │
│                                 │
│ Subtotal de productos $13.000   │
│ Elegí retiro o envío al seguir. │
│ [ Continuar con mi pedido ]     │
│ Seguir eligiendo                │
└─────────────────────────────────┘
```

El estado mínimo incompleto deja visible la selección y explica «El pedido mínimo es de 2 cookies. ¡Sumá una más para continuar!». Un pack de minis habilita continuar. Un producto retirado del catálogo aparece como línea a resolver, sin total comprable ni sustitución automática.

Al entrar por primera vez, distinguir restauración pendiente de carrito vacío. El estado vacío usa «Tu próximo antojo empieza acá» y «Ver cookies».

En escritorio: líneas a la izquierda y resumen a la derecha. El resumen puede ser sticky si no oculta contenido a altura reducida.

## 7. Checkout — `/checkout`

Tres pasos lógicos en una misma ruta: **1. Tus datos → 2. Entrega → 3. Revisá**. El estado vive en la feature de checkout y se conserva al retroceder. Nunca colocar datos personales en query params.

### Paso 1 — Tus datos

- Nombre y teléfono, con etiquetas persistentes, autocomplete y teclado adecuado.
- Casilla «Recordar mis datos y domicilio en este dispositivo», desmarcada en primera visita.
- Explicación breve y acción para borrar datos recordados cuando existen.
- Botón «Elegir entrega»; al avanzar, validar los campos del paso.

### Paso 2 — Entrega

- Grupo de radios «Retiro» / «Envío» sin modalidad elegida en una primera visita; precargar la última si el cliente la guardó.
- Retiro: bloque con Peña 298, Banfield y «Todos los días, de 9 a 19 h · Sin cargo».
- Envío: provincia/región libre, localidad, calle, número o sin número; piso/departamento y referencias opcionales. Mostrar que se coordina cualquier destino, con costo a cargo del cliente y confirmado por WhatsApp antes de cerrar el pedido.
- Fecha y hora preferidas, con listas nativas separadas de hora y de minutos (solo :00, :15, :30 y :45), limitadas a las reglas de la especificación. Texto «Sujeto a confirmación del negocio».
- Comentarios opcionales y contador de caracteres.
- Botones «Volver» y «Revisar pedido».

### Paso 3 — Revisá tu pedido

```text
┌─────────────────────────────────┐
│ 1 Datos · 2 Entrega · 3 Revisá   │
│                                 │
│ Tu selección          [Editar]  │
│ 1 Tradicional           $3.500  │
│ 1 pack Mini cookies ×12 $9.500  │
│                                 │
│ Contacto              [Editar]  │
│ Nombre · Teléfono                │
│ Envío                 [Editar]  │
│ Dirección · Localidad            │
│ Fecha y hora preferidas          │
│                                 │
│ Productos              $13.000  │
│ Envío               A confirmar │
│ Total final: pendiente de envío │
│                                 │
│ [ Continuar por WhatsApp ]       │
│ Se abrirá el chat con tu pedido.│
│ Enviá el mensaje para coordinar │
│ la confirmación y el pago.       │
│ Copiar pedido · Ver contacto    │
└─────────────────────────────────┘
```

Con retiro, el resumen cambia a «Retiro $0» y «Total $13.000». Con envío, la etiqueta completa será «Total final: pendiente de cotizar el envío»; el wireframe abrevia solo por espacio.

Editar dirige al paso o carrito correspondiente. Al regresar, derivar de nuevo el resumen; no mantener una copia independiente de totales. En escritorio, un resumen compacto acompaña los pasos; en móvil aparece completo al revisar para reducir ruido visual.

La apertura de WhatsApp no cambia a un estado de pedido enviado. «Copiar pedido» anuncia únicamente el resultado de la copia. Si el portapapeles falla, se muestra el texto seleccionable. El número del negocio se encuentra en «Ver contacto» y el pie.

## 8. Pantallas informativas

- **Preguntas frecuentes:** acordeones nativos con preguntas sobre cómo pedir, mínimo, minis, retiro, cobertura, costo de envío y pago. Conservación/ingredientes requieren respuestas del negocio.
- **Nosotros/contacto:** encabezado breve, historia cuando exista, dirección, horario y botones de Instagram/WhatsApp. No completar biografía con hechos inventados.
- **Privacidad:** explicar persistencia opcional en el dispositivo, cómo borrar datos y cómo se incorporan al mensaje preparado.

## 9. Estados compartidos

| Estado | Presentación y acción |
| --- | --- |
| Restaurando carrito | Espacio reservado y estado discreto; no mostrar «vacío» prematuramente |
| Carrito vacío | Mensaje y enlace a la carta |
| Mínimo incompleto | Aviso junto al resumen, continuar inhabilitado con explicación visible |
| Producto no disponible | Etiqueta textual y compra inhabilitada; si estaba en carrito, permitir quitar |
| Precio actualizado | Aviso antes de continuar y nuevo importe claramente visible |
| Error de campo | Texto asociado al control; resumen de errores al avanzar si hay varios |
| Destino fuera de las zonas originales | Permitir solicitud con domicilio completo y costo a confirmar por WhatsApp |
| Perfil precargado | Datos editables y acción para borrarlos del dispositivo |
| Persistencia fallida | Aviso no bloqueante; selección actual usable en memoria |
| Mensaje listo | Revisión y CTA de WhatsApp, nunca «pedido confirmado» |
| Copia fallida | Texto completo seleccionable y enlace al chat |

## 10. Componentes reutilizables y límites

Esta es una guía de composición, no una obligación de crear todos los archivos por anticipado. Crear cada módulo cuando su uso exista y mantener un tamaño fácil de leer.

| Pieza | Responsabilidad | Reutilización |
| --- | --- | --- |
| `Button` / `ButtonLink` | Estilos comunes; semántica de acción/enlace diferenciada | Navegación y acciones |
| `FormField` | Etiqueta, ayuda, error y asociación al control | Contacto y domicilio |
| `RadioGroup` | Selección accesible y estado seleccionado | Presentación y modalidad, con opciones propias |
| `QuantitySelector` | Cantidad entera, límites y etiqueta de unidad | Detalle y carrito |
| `Notice` | Avisos con tono y contenido, sin reglas comerciales | Mínimo, cambios, almacenamiento |
| `PageContainer` / `SectionHeading` | Ancho, separación y jerarquía | Páginas públicas |
| `ProductCard` | Mostrar un producto y su acción concreta | Inicio y carta |
| `PackSizeSelector` | Selección de presentación desde catálogo | Carta de minis y detalle |
| `ProductPurchaseControls` | Resolver presentación y agregar cantidad | Compra individual y pack |
| `CartLine` | Línea editable con unidad de venta explícita | Carrito |
| `OrderLine` | Línea de revisión sin edición directa | Resumen de checkout |
| `OrderTotals` | Presentar importes ya calculados y estado de envío | Carrito y checkout |
| `PickupInfo` / `BusinessContact` | Datos operativos desde configuración | Entrega, contacto, pie |
| `ContactStep` / `DeliveryStep` / `ReviewStep` | Una responsabilidad por paso | Composición del checkout |
| `WhatsAppActions` | Enlace y copia desde mensaje validado | Revisión final |

`CartLine` y `OrderLine` pueden compartir presentación de producto/precio, pero no necesitan convertirse en un componente lleno de opciones de edición. `RadioGroup` comparte mecánica accesible, no reglas de cobertura ni tamaños permitidos.

Fuentes únicas: catálogo y presentaciones; configuración del negocio; formateo ARS; cálculo del carrito/mínimo; validación de entrega; resumen del pedido; adaptador de almacenamiento; construcción del mensaje. Los componentes consumen resultados y delegan acciones, no copian fórmulas.

## 11. Accesibilidad y comportamiento a implementar

- Navegación por teclado, link para saltar al contenido, foco visible y nombres accesibles de iconos.
- Menú desplegable con estado expandido y cierre mediante Escape; devolver foco al botón cuando corresponda.
- Radios navegables por teclado; tamaño seleccionado anunciado y actualización de precio perceptible.
- Al cambiar de paso, foco en su título; si hay errores, foco en resumen o primer campo inválido.
- Actualizaciones del carrito y copia anunciadas en una región de estado sin interrumpir la lectura.
- Controles con tamaño táctil suficiente, incluso en tarjetas a dos columnas; si el contenido no cabe, usar una columna.
- Movimiento reducido respetado; ninguna animación necesaria para acceder a información.
- Las etiquetas de color siempre acompañadas de texto; validar contraste de todos los estados en navegador.

## 12. Cierre de esta etapa

Entregables documentados: dirección visual, tokens propuestos, navegación, wireframes de las pantallas principales, responsive, componentes compartidos y estados. Contraste de pares base calculado; no equivale a auditoría de una interfaz.

Siguiente entrega: implementar la base visual con estos módulos y datos de catálogo, revisar en navegador y completar T-04 con evidencia visual. Pendientes editoriales: logo actualizado, fotos seleccionadas y contenido verificado de productos/historia. Los criterios funcionales siguen pendientes hasta su implementación y prueba.
