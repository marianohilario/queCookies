# 001 — Arquitectura y stack

Se conserva Next.js, React, TypeScript y Tailwind; no se agregan librerías. Aplican [AGENTS.md](../../../AGENTS.md), modularidad y DRY.

## Recursos de marca

- Referencias: `public/brand/references/`; nunca sobrescribir el original para producir una versión editada.
- Salidas web previstas: `public/brand/` y `public/images/`, con nombres explícitos y registro en docs/assets.md.
- Edición del logo: elegir procedimiento después de inspeccionar el archivo real; preservar dimensiones y comparar zonas no modificadas. No sustituirlo por una aproximación tipográfica sin identificarla.
- Motivos vectoriales: componentes o SVG pequeños separados de los iconos funcionales. Los primeros decoran; los segundos indican destinos y acciones.
- Colores oficiales: una vez extraídos, actualizar tokens semánticos existentes en lugar de introducir paletas repetidas por componente.

## Navegación

- Configuración de las cuatro rutas en `src/config/navigation.ts`.
- `MobileBottomNav`: componente cliente responsable del layout y estado activo, usando usePathname y el estado existente del carrito.
- `CartCount`: presentación única del contador, reutilizada por acceso superior de escritorio e inferior de móvil.
- `Header`: composición responsive; marca centrada en móvil, menú horizontal y carrito en escritorio.
- Retirar `MobileNav` desplegable y `CartBar` contextual después de comprobar referencias. No conservar implementaciones inaccesibles duplicadas.
- Iconos propios en el componente SVG existente; no instalar librería de iconos.
- Altura y espacio reservado centralizados en una variable CSS, incluyendo safe area. La navegación vive dentro de Providers y no crea un carrito propio.
- El estado activo usa match exacto o prefijo con límite de segmento; `/cookies` no debe activar rutas no relacionadas como `/cookies-extra`.

## Hero posterior

Separar texto/acciones, escena gastronómica, sello y separador ondulado. No crear un componente gigante con todos los motivos. Reutilizar tokens, botones y renderizado de imágenes.

Mantener next/image para fotografías, tamaños responsive y prioridad únicamente para la imagen principal. No alterar píxeles o generar fotografías mediante código vectorial presentándolas como imágenes fotográficas originales.

## Verificación

Node nativo para reglas y Chrome instalado mediante los scripts de QC-007. Extender escenarios para cuatro enlaces, estado activo, contador, safe area, contenido final y checkout. Revisar capturas móviles; distinguir viewport emulado de un dispositivo físico.
