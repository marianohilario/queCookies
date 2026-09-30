# 000 — Plan de tareas

Estado: primera implementación local de R1 construida en QC-004 a QC-006. Las casillas distinguen código/pruebas realizados de revisiones visuales, operativas y de publicación aún pendientes. El release no se declara cerrado.

Referencias: [spec](./spec.md), [arquitectura](./arquitectura-y-stack.md), [diseño UI/UX](./diseno-ui-ux.md), [aceptación](./criterios-de-aceptacion.md), [validación](./validacion.md).

## Forma de trabajo SDD

1. Resolver o registrar explícitamente las decisiones relevantes de la funcionalidad.
2. Actualizar requisito y criterio de aceptación antes de cambiar el comportamiento.
3. Detallar la tarea sobre la estructura real del proyecto antes de implementarla.
4. Implementar una unidad verificable y comprobar sus criterios.
5. Registrar evidencia y pendientes; completar la tarea solo con verificación real.
6. Aplicar las reglas de [AGENTS.md](../../../AGENTS.md): módulos pequeños y legibles, responsabilidad única, reutilización y DRY. Revisar abstracciones existentes antes de crear otras y centralizar las reglas compartidas.

Las fases siguientes indican dependencias, no estimaciones de tiempo. Ninguna tarea autoriza instalar librerías adicionales sin conversarlo. Superpowers se podrá configurar como herramienta independiente antes de implementar, si se decide usarlo; no se da por instalado.

## Fase A — Contenido y reglas operativas

### T-01 — Cerrar catálogo público

- [ ] Confirmar las ocho cookies individuales y sus nombres públicos.
- [x] Registrar exclusión de bollos y venta de mini cookies exclusivamente en packs de 12, 24, 48 y 96 a $792 por mini cookie.
- [x] Preparar las cuatro presentaciones con su precio total, ID, contenido y unidad de venta; implementar mínimo por cookies físicas.
- [ ] Completar descripciones e información verificada de ingredientes/alérgenos.
- [ ] Validar precio, moneda y disponibilidad editorial de cada producto.
- Dependencias: ninguna; P-01 y P-03.
- Entregable: catálogo editorial aprobado y preparado para modelar.
- Verificación: CA-02, CA-03, CA-06.

### T-02 — Cerrar datos de operación

- [x] Confirmar retiro de lunes a domingo de 09:00 a 19:00.
- [x] Confirmar envíos de lunes a domingo de 09:00 a 19:00.
- [x] Actualizar cobertura confirmada: solicitudes a cualquier destino, costo a cargo del cliente y cotizado por WhatsApp; textos centralizados y checkout sin restricción zonal (CA-13/CA-14, evidencia en validacion.md).
- [ ] Precisar si existe cantidad para derivar consultas grandes; no asumir 48 horas.
- [ ] Confirmar formato de preferencia horaria y mensajes de confirmación manual.
- Dependencias: ninguna; P-02, P-06 y P-07.
- Entregable: configuración operativa y FAQs sin promesas no verificadas.
- Verificación: CA-12 a CA-16.

### T-03 — Preparar marca, textos e imágenes

- [x] Registrar el nombre definitivo Que Cookies y la conservación de la identidad visual.
- [ ] Obtener/adaptar el archivo del logo con el nombre Que Cookies y confirmar colores.
- [ ] Redactar inicio, cómo pedir, contacto y preguntas frecuentes.
- [ ] Completar historia y conservación con información del negocio.
- [ ] Seleccionar fotos de stock con uso permitido y registro de origen/licencia.
- [ ] Definir indicación visible «Imagen ilustrativa» y textos alternativos.
- Dependencias: información editorial de T-01/T-02 para contenidos asociados.
- Entregable: inventario de assets y textos listos para diseño.
- Verificación: CA-01, CA-02 y CA-25.

## Fase B — Diseño y base técnica

### T-04 — Diseñar el recorrido mobile first

- [x] Documentar wireframes de inicio, carta, detalle, carrito y checkout, incluyendo selector de presentación de mini cookies.
- [x] Definir estados vacío, mínimo incompleto, producto no disponible, error y resumen de envío pendiente.
- [x] Proponer componentes reutilizables y tokens de diseño con adaptación a escritorio en diseno-ui-ux.md.
- [x] Calcular contraste de los pares principales de la paleta propuesta.
- [x] Revisar composición visual y tipografías en capturas Chrome mobile/desktop; logo definitivo y tokens oficiales pendientes en QC-008.
- [ ] Verificar navegación, foco, controles táctiles y contraste de todos los estados en la interfaz implementada.
- Dependencias: spec; puede empezar mientras se completa contenido, con pendientes visibles.
- Entregable: [diseño del flujo y componentes](./diseno-ui-ux.md) documentado; revisión visual de implementación pendiente.
- Verificación: CA-01, CA-04, CA-09, CA-17, CA-23, CA-27. T-04 permanece parcial hasta revisar la interfaz.

### T-05 — Inicializar proyecto y herramientas

- [x] Seleccionar versiones compatibles de Next.js, React, TypeScript y Tailwind.
- [x] Definir TypeScript/build y pruebas nativas de Node sin dependencias adicionales; lint/browser pendientes de conversación.
- [x] Configurar estructura base, App Router y Tailwind; componentes visuales y tipografía definitiva se completan en T-07.
- [x] Definir scripts reales de desarrollo, build y typecheck.
- [x] Registrar versiones y gestor de paquetes; hosting sigue pendiente en T-16.
- Dependencias: revisión de arquitectura y herramientas.
- Entregable: base ejecutable, sin integración con backend ni pagos.
- Verificación: V-08 y CA-27, al existir aplicación.

### T-06 — Implementar configuración y catálogo local

- [x] Centralizar marca, contactos, dirección, horario y cobertura.
- [x] Modelar ocho individuales y cuatro packs con IDs estables, contenido, unidad de venta y precios enteros en centavos; derivar packs desde $792 por mini cookie.
- [x] Separar datos de presentación y acceso al catálogo.
- [ ] Preparar imágenes optimizadas y metadatos de recursos.
- Dependencias: T-01, T-02, T-03 y T-05; se permiten fixtures identificados durante desarrollo.
- Entregable: fuente local que la UI consume sin duplicar reglas ni contactos.
- Verificación: CA-02, CA-03, CA-12, CA-14, CA-25.

## Fase C — Vidriera

### T-07 — Implementar páginas públicas

- [x] Encabezado, menú móvil y pie de página; indicador interactivo de carrito se conecta en QC-006.
- [x] Inicio, carta y detalle con datos locales y fotografías ilustrativas.
- [x] Contacto, preguntas frecuentes y privacidad; historia final pendiente del negocio.
- [x] CTA y enlaces a Instagram/WhatsApp.
- [ ] Metadatos y estados de producto no disponible.
- Dependencias: diseño documentado de T-04, T-05 y T-06. La implementación habilita completar la revisión visual restante de T-04.
- Entregable: vidriera responsive completa.
- Verificación: CA-01, CA-02, CA-06, CA-23, CA-25.

## Fase D — Selección y persistencia

### T-08 — Implementar carrito y cálculo

- [x] Implementar alta, edición y eliminación de individuales o packs completos.
- [x] Calcular y probar mínimo por contenido físico y subtotales por unidad de venta.
- [x] Probar presentaciones independientes: dos packs de 12 no se convierten en uno de 24.
- [x] Implementar carrito vacío y mensajes de mínimo.
- [x] Revalidar y probar cambios de precio/catálogo y líneas no comprables.
- Dependencias: T-06/T-07.
- Entregable: selección coherente y mínimo de dos cookies aplicado en todos los accesos.
- Verificación: CA-03 a CA-06.

### T-09 — Persistir y restaurar carrito

- [x] Adaptador de almacenamiento con esquema versionado y pruebas de codificación/restauración.
- [x] Verificar en Chrome que recargar restaura carrito y no lo sobrescribe al hidratar.
- [x] Detección y pruebas de cambios de precio y productos faltantes/no disponibles.
- [x] Detectar datos inválidos mediante pruebas; manejo en memoria ante fallos implementado.
- [x] Verificar bloqueo simulado de almacenamiento y reconciliación real entre pestañas en Chrome; cuota específica/Safari pendientes.
- Dependencias: T-08.
- Entregable: carrito recuperable y funcional en memoria si falla persistencia.
- Verificación: CA-07, CA-08 y CA-24.

## Fase E — Checkout

### T-10 — Datos, entrega y preferencias

- [x] Implementar formulario de contacto y comentarios.
- [x] Implementar retiro/envío y validación de dirección completa; provincia/región libre de hasta 80 caracteres, sin restricción zonal.
- [x] Implementar y probar días/horarios 09:00–19:00 en Buenos Aires, incluido cierre y cambio de fecha.
- [ ] Verificar en navegador errores accesibles, foco y conservación del borrador implementada al retroceder.
- Dependencias: T-02, T-08 y T-09.
- Entregable: borrador válido sin cuenta ni promesas de disponibilidad.
- Verificación: CA-09, CA-12 a CA-16, CA-23.

### T-11 — Perfil recordado

- [x] Implementar opción explícita para guardar datos en el dispositivo.
- [x] Implementar precarga/edición y probar selección del último domicilio válido.
- [x] Verificar en Chrome eliminación del perfil, precarga de domicilio y separación respecto del carrito.
- [x] Probar exclusión de fecha/hora y comentarios en el perfil guardado.
- Dependencias: T-09/T-10.
- Entregable: recompra con datos precargados y editables.
- Verificación: CA-10, CA-11 y CA-24.

### T-12 — Resumen revisable

- [x] Implementar líneas con unidad de venta, cantidad, importe y tamaño de packs explícito.
- [x] Implementar retiro sin cargo y envío con total final pendiente desde el mismo modelo.
- [x] Implementar acceso a edición de contacto, entrega y preferencias.
- [x] Revalidar y probar el resumen antes de preparar la solicitud final.
- Dependencias: T-08/T-10/T-11.
- Entregable: una fuente consistente para la revisión y el mensaje.
- Verificación: CA-03, CA-13, CA-17 y CA-18.

## Fase F — WhatsApp

### T-13 — Generar mensaje y abrir chat

- [x] Implementar y probar formateador desde resumen validado, con marca y packs inequívocos.
- [x] Probar destino y codificación del enlace, incluidos caracteres especiales.
- [x] Probar mensajes de retiro/envío y exclusión del domicilio del cliente para retiro.
- [ ] Verificar apertura real desde móvil/escritorio; implementada por acción directa sin vaciar carrito ni afirmar confirmación.
- Dependencias: T-12.
- Entregable: solicitud completa lista para enviar manualmente.
- Verificación: CA-18 a CA-21.

### T-14 — Alternativas y retorno

- [x] Verificar alternativa manual en Chrome ante permiso de portapapeles denegado simulado; permiso real/Safari pendientes.
- [x] Implementar contacto visible y enlace alternativo al chat.
- [x] Probar integridad del mensaje largo; implementar copia manual para enlaces extensos.
- [ ] Verificar retorno real desde WhatsApp, edición y vaciado manual implementados.
- Dependencias: T-13.
- Entregable: cierre robusto en móvil y escritorio.
- Verificación: CA-20 a CA-22.

## Fase G — Validación y publicación

### T-15 — Ejecutar validación del release

- [ ] Ejecutar V-01 a V-08 con las herramientas acordadas.
- [ ] Comprobar Chrome Android, Safari iOS y escritorio; registrar limitaciones de acceso a dispositivos.
- [ ] Documentar resultados, incidencias y correcciones en validacion.md.
- [ ] Revisar los criterios y los contenidos operativos pendientes.
- [ ] Revisar modularidad, legibilidad y DRY: responsabilidades pequeñas, reutilización efectiva y una única fuente de reglas/datos.
- Dependencias: T-07 a T-14.
- Entregable: evidencia de cumplimiento; fallos abiertos identificados.
- Verificación: CA-01 a CA-25, CA-27 y preparación técnica de CA-26; la comprobación de producción se completa en T-16. No declarar un caso aprobado sin ejecutarlo.

### T-16 — Publicar y comprobar producción

- [ ] Definir dominio, hosting y configuración de imágenes.
- [ ] Configurar metadatos definitivos, canonical y sitemap.
- [ ] Publicar versión validada y comprobar rutas directas, assets y enlaces.
- [ ] Coordinar una prueba real con el negocio para revisar el texto recibido, sin tratarla como compra.
- [ ] Registrar URL, versión publicada y evidencia final.
- Dependencias: T-15, P-08 y contenidos necesarios de T-01/T-02/T-03.
- Entregable: sitio público funcional.
- Verificación: V-09 y CA-26.

## Finalización

R1 se completa cuando T-01 a T-16 estén resueltas según su alcance final, los criterios tengan evidencia y no existan defectos bloqueantes del flujo. Los pendientes diferidos deben quedar explícitos; las tarifas de envío pueden seguir sin definir porque el flujo admite su cotización por WhatsApp. La integración SaaS/MP tendrá una nueva carpeta de especificación numerada, sin sobrescribir el historial de 000.
