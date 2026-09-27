# Issues de Que Cookies

Tracker local; estos IDs no representan issues creados en GitHub. Los commits usan `tipo(scope): descripción [QC-nnn]` y se separan por unidad de trabajo.

| ID | Trabajo | Referencias | Estado |
| --- | --- | --- | --- |
| QC-001 | Reglas de desarrollo, modularidad, DRY y política de commits | AGENTS.md, RNF-08 | Documentado |
| QC-002 | Especificación R1, arquitectura, tareas y criterios verificables | docs/specs/000 | Documentado |
| QC-003 | Diseño mobile first y componentes compartidos | T-04, diseno-ui-ux.md | Diseño documentado e implementado; capturas revisadas en QC-007 |
| QC-004 | Inicialización Next.js, TypeScript y Tailwind | T-05 | Completado; typecheck y build correctos |
| QC-005 | Base visual, inicio, catálogo y páginas informativas | T-06, T-07 | Implementado y verificado en Chrome; contenido definitivo en QC-008 |
| QC-006 | Carrito, persistencia, checkout y solicitud por WhatsApp | T-08 a T-14 | Implementado; pruebas de dominio y recorrido interactivo Chrome correctos |
| QC-007 | Automatización Chrome y revisión responsive | T-04, T-15 | Completado para Chrome headless; verificaciones y capturas registradas |
| QC-008 | Contenido definitivo: logo, fotos, ingredientes, alérgenos e historia | P-03 a P-05, P-09 | Pendiente de información del negocio |
| QC-009 | Verificación Safari/dispositivos físicos y preparación de publicación | T-15, T-16 | Pendiente; definir dominio y hosting |

La validación del release y el despliegue (T-15/T-16) se registran al contar con evidencia y entorno disponible. Ningún estado documental implica publicación ni validación de la aplicación.

QC-007 se acotó a Chrome instalado y revisión de capturas; la revisión editorial y las plataformas restantes se separaron en QC-008/QC-009 para no declararlas completas sin evidencia.
