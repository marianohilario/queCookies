# Que Cookies — Reglas del proyecto

Estas reglas se aplican a todo el proyecto y a cada cambio futuro.

## Desarrollo guiado por especificaciones

- Trabajar con SDD. Consultar la especificación activa en `docs/specs/` antes de diseñar o implementar.
- R1 se documenta en `docs/specs/000/spec.md`; arquitectura, diseño, tareas, aceptación y validación la complementan.
- El rediseño visual activo se documenta en `docs/specs/001/`. Sus decisiones sustituyen las de presentación/navegación incompatibles de 000; las reglas de compra de 000 siguen vigentes.
- Actualizar requisitos y criterios cuando cambie el comportamiento esperado. Mantener trazabilidad entre requisitos, tareas y evidencia.
- Marcar una tarea completa solo después de realizar y verificar su entregable. Distinguir diseño documentado de interfaz implementada y validada.

## Módulos pequeños y legibles

- Cada módulo, componente y función debe tener una responsabilidad clara y fácil de describir.
- Mantener archivos pequeños y cohesionados. Separar una responsabilidad cuando mezcle presentación, estado, reglas de negocio o efectos externos, no solo para cumplir un número arbitrario de líneas.
- Usar nombres explícitos y consistentes. Preferir código directo, funciones breves, retornos tempranos y poco anidamiento.
- Las páginas componen secciones; no concentran formularios completos, cálculos, persistencia y mensajería en un solo archivo.
- Separar UI, lógica de dominio, estado y adaptadores de navegador/integraciones. Las reglas puras no dependen de React, localStorage ni WhatsApp.
- Comentar decisiones y motivos que no sean evidentes; evitar comentarios que repitan literalmente el código.

## Reutilización y DRY

- Antes de crear una solución, buscar si ya existe una función, componente, tipo, dato o patrón reutilizable y usarlo o ampliarlo de forma compatible.
- Reutilizar todo lo que tenga la misma responsabilidad y significado: controles, layouts, formateadores, validaciones y reglas compartidas.
- Mantener una única fuente de verdad para catálogo/precios, marca/contacto, horarios, mínimo, tamaños de packs, cálculos y validaciones.
- Derivar totales y mensajes de los mismos modelos. No repetir fórmulas o condiciones en catálogo, carrito, checkout y WhatsApp.
- Componer componentes y usar variantes pequeñas con nombres claros; evitar copiar una implementación para cambiar solo estilos o etiquetas.
- Mantener las abstracciones cerca de su funcionalidad y promoverlas a compartidas cuando exista reutilización real.
- DRY no significa fusionar conceptos distintos porque su código se parece. Evitar componentes universales llenos de booleanos, capas especulativas y fragmentación que dificulte seguir el flujo.
- Al revisar un cambio, comprobar responsabilidades, legibilidad, duplicación y posibilidad real de reutilización, además de su funcionamiento.

## Stack y alcance

- Base acordada: Next.js, React, TypeScript y Tailwind CSS. Conversar antes de instalar cualquier librería adicional, incluidas herramientas de desarrollo.
- Diseñar e implementar mobile first, con accesibilidad y adaptación a escritorio.
- Marca pública: Que Cookies. Conservar los enlaces reales configurados; el cambio de nombre no cambia automáticamente el usuario de Instagram.
- R1 termina en una solicitud preparada para WhatsApp; el negocio confirma disponibilidad y pago. Abrir un chat no equivale a enviar ni confirmar un pedido.
- Superpowers no se presume instalado. Su configuración es independiente del producto.

## Verificación

- Comprobar criterios de aceptación relevantes al cambio; priorizar importes, mínimo, packs, persistencia y datos del mensaje.
- Registrar evidencia real en la documentación. No presentar una revisión documental o un wireframe como una prueba de la aplicación.
- Revisar cambios existentes antes de sobrescribirlos. No hacer pushes ni despliegues sin solicitud.

## Issues y commits

- Por instrucción del usuario, crear commits al completar cada issue verificado, sin esperar una solicitud nueva para cada uno.
- Usar Conventional Commits con descripción clara en español: `tipo(scope): descripción [QC-nnn]`.
- Separar los cambios por issue; no mezclar funcionalidades independientes en un mismo commit. Un issue puede requerir varios commits cohesivos.
- Registrar issues locales en `docs/issues.md` mientras no exista un tracker remoto. No inventar números de issues de GitHub.
- Antes de cada commit revisar estado, diff y commits recientes; stagear solo los archivos del issue, sin secretos ni artefactos generados.
- No agregar al asistente como autor o coautor. No incluir trailers `Co-authored-by` ni modificar la identidad Git del usuario.
- Si falta la identidad Git, pedir su configuración al usuario. No saltear hooks ni usar amend para corregir un commit rechazado.
