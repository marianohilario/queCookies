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
| QC-008 | Contenido definitivo: fotografías de productos, ingredientes, alérgenos e historia | P-03/P-04, P-09 | Logo y paleta resueltos en QC-011/QC-012; contenido restante pendiente |
| QC-009 | Verificación Safari/dispositivos físicos y preparación de publicación | T-15, T-16 | Pendiente; definir dominio y hosting |
| QC-010 | Especificar rediseño y organizar referencias | docs/specs/001 | Documentado |
| QC-011 | Editar solo la letra del logo | RV-01 / CV-01 | Editado, comparado e integrado; 0 píxeles alterados fuera de la región de la letra |
| QC-012 | Paleta exacta y motivos de marca | RV-02 / CV-02 | Paleta medida y motivos originales extraídos e integrados |
| QC-013 | Navegación móvil inferior de cuatro accesos | RV-03 / CV-03 a CV-05 | Implementado y verificado en Chrome; capturas revisadas |
| QC-014 | Hero próximo a la referencia | RV-04 / CV-06 | Implementado con imagen suministrada; capturas mobile/desktop y regresión Chrome correctas |
| QC-015 | Ajustar carta y franjas a la nueva dirección | RV-05 / CV-07 | Implementado y revisado: tarjetas, cookies aisladas, franja roja y minis con patrón |
| QC-016 | Regresión y comparación visual del rediseño | CV-08 | Verificado en Chrome con capturas; 22 pruebas de dominio, build y HTTP correctos |
| QC-017 | Corregir altas y eliminación desde el selector de las tarjetas | RF-03 / RV-05 / CV-09 | Implementado y verificado en Chrome; typecheck, 22 pruebas, build y smoke HTTP correctos |
| QC-018 | Ampliar hero y contenedores, refinar estilos e incorporar favicon | RV-06 | Implementado; check y regresión Chrome correctos de 320 a 1920 px; capturas revisadas |
| QC-019 | Mapa de ubicación y favicon con contorno amarillo | RV-07 | Implementado; check, regresión Chrome y revisión visual de mapa/icono correctos |
| QC-020 | Publicar favicon mediante convención nativa de Next y ruta estándar | RV-07 | Build correcto; ICO HTTP 200 y decodificación Chrome comprobados |
| QC-021 | QR del sitio con logo central | Recurso de marca | PNG 1376×1376 generado y decodificado a https://www.quecookies.com.ar |
| QC-022 | Retirar badges de imágenes ilustrativas | RV-05 | Eliminados del hero, tarjetas y fichas; typecheck y regresión correctos |
| QC-023 | Ajustar logo de encabezado y contorno del footer | RV-01 / RV-02 | Cambios pendientes revisados; build y regresión Chrome correctos |
| QC-024 | Ajustar indicador visual del carrito y formato del proveedor | RV-03 / RF-03 | Cambios pendientes revisados; 22 pruebas y regresión Chrome correctos |
| QC-025 | Versionar la skill frontend-design del proyecto | Herramientas de diseño | Skill, licencia Apache 2.0 y lockfile revisados |

| QC-026 | Normalizar escala y orientación de motoDelivery | RV-05 / docs/specs/001/icono-delivery.md | Implementado; typecheck correcto y transformación cotejada con SVG original |

| QC-027 | Presentar secciones del mensaje con emojis y verificar codificación | RF-10 / docs/specs/000/mensaje-whatsapp.md | Formato implementado; 23 pruebas y typecheck correctos; desaparición en cliente WhatsApp pendiente de reproducir |

| QC-028 | Evitar pérdida de emojis en redirección de WhatsApp | RF-10 / docs/specs/000/mensaje-whatsapp.md | Corregido; causa reproducida por HTTP, destino directo conserva emoji; 23 pruebas y typecheck correctos |

| QC-029 | Marco completo de manitos y galletas en mini banner y patrones limpios | RV-05 / docs/specs/001/validacion.md | Implementado; ajustes finales revisados, check y regresión Chrome correctos |

| QC-030 | Logos de Instagram y WhatsApp en enlaces del footer | RV-02 / docs/specs/001/validacion.md | Implementado; capturas móvil/escritorio revisadas y regresión correcta |

| QC-031 | Solicitar envíos a cualquier destino con costo a cargo del cliente | RF-06 / CA-13 / CA-14 / docs/specs/000/validacion.md | Implementado; 23 pruebas, build, smoke y recorrido Chrome con destino Córdoba correctos |

| QC-032 | Limitar el horario del checkout a franjas de cuarto de hora | RF-07 / CA-15 / docs/specs/000/diseno-ui-ux.md | Implementado; selector en dos listas nativas, 28 pruebas, build y recorrido Chrome con el horario compuesto en el mensaje correctos |

| QC-033 | Precios redondos en packs de mini cookies desde $9.500 por presentación de 12 | P-01 / RN-02 / CA-02 / CA-04 / docs/specs/000/validacion.md | Implementado; base única en catálogo, 28 pruebas, build, smoke y regresión Chrome correctos |

| QC-034 | Ingredientes y alérgenos verificados por cookie individual | P-03 / P-09 / docs/specs/000/diseno-ui-ux.md | Implementado; 8 recetas y alérgenos del negocio en catálogo, minis sin datos inventados, 33 pruebas, build y HTML generado correctos. Soja de Nutella y tipo de harina pendientes de validar |

| QC-035 | Crédito del desarrollador en el pie con enlaces a Instagram y WhatsApp | RV-02 / docs/specs/001/validacion.md | Implementado; línea secundaria bajo el copyright, contactos en configuración única, build, typecheck y recorrido Chrome correctos |

| QC-036 | Selector de cantidades más compacto y armónico con las tarjetas | RV-05 / CV-09 / QC-017 | Implementado; contador de 36 px con área táctil de 44 px, 22 pruebas de navegador y regresión responsive correctas |

| QC-037 | Enlace «Inicio» en la navegación de escritorio | RV-03 / docs/specs/001/validacion.md | Implementado; navegación mobile sin cambios, build y regresión responsive correctos |

| QC-038 | Combinación de sabores en packs de mini cookies (tradicional, cacao y red velvet a elección del cliente) | RF-03 / CA-03b / QC-034 / docs/specs/000/validacion.md | Implementado; identidad de línea por combinación, desglose en WhatsApp, carrito v2, 41 de 42 pruebas correctas (la falla de alérgenos es previa), build, smoke y recorrido Chrome correctos |

| QC-039 | Evitar el salto del selector de sabores al cambiar la combinación | RF-03 / QC-038 | Implementado; estado y desglose con altura reservada, recorrido Chrome verifica que el botón de agregar no se mueve |

| QC-040 | Corregir el test de alérgenos que buscaba «Harina» exacta | QC-034 | Corregido; 42 de 42 pruebas correctas y mutación detectada |

| QC-041 | Acceso navegable a la ficha de mini cookies | RV-03 / QC-038 | Implementado; enlace en la navegación de escritorio y desde la carta en móvil, recorrido Chrome en ambos anchos |

| QC-042 | Acotar el alto de la imagen de minis en la carta, que se estiraba a 3,75:1 | RV-03 / QC-038 | Implementado; proporción 1:1 como la ficha, recorrido Chrome a 390, 768 y 1440 px |

La validación del release y el despliegue (T-15/T-16) se registran al contar con evidencia y entorno disponible. Ningún estado documental implica publicación ni validación de la aplicación.

QC-007 se acotó a Chrome instalado y revisión de capturas; la revisión editorial y las plataformas restantes se separaron en QC-008/QC-009 para no declararlas completas sin evidencia.

El usuario solicitó realizar el rediseño en unidades pequeñas. QC-010 a QC-016 separan planificación, recursos, navegación, hero y revisión. QC-011 asume la edición del logo antes agrupada dentro de QC-008.
