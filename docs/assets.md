# Recursos visuales de R1

## Fotografías ilustrativas

URLs centralizadas en `src/data/catalog.ts`. Servidas por next/image con tamaños responsivos y caché; no representan sabores reales y llevan la etiqueta «Imagen ilustrativa».

| Recurso | Fuente | Uso |
| --- | --- | --- |
| Cookies | https://images.unsplash.com/photo-1499636136210-6f4ee915583e | Hero y tarjetas |
| Surtido | https://images.unsplash.com/photo-1558961363-fa8fdf82db35 | Minis y tarjetas |

Ambos endpoints respondieron HTTP 200, tipo image/jpeg, durante la selección. Referencia de licencia general: https://unsplash.com/license (la consulta automatizada recibió 401). Revisar atribución/procedencia final de las fotos con el negocio antes de publicar o sustituir por fotos propias. No se descargaron imágenes de Instagram ni del logo adjunto.

## Marca y tipografía

- Logo original recibido en `public/brand/references/logo-original.png`. Versión corregida en `public/brand/que-cookies-logo.png`, integrada en encabezado y pie mediante next/image.
- Fraunces y DM Sans mediante next/font/google, servidas localmente por Next.js luego del build.
- Paleta sRGB medida en los originales: rojo `#92191E` y amarillo `#FCC256` del logo; amarillo complementario `#FED36D` de la pieza de marca. Crema y vainilla son superficies auxiliares de la interfaz.

## QC-011 — Edición del logo

- Fuente PNG 1080 × 1080, con transparencia exterior; original preservado.
- Reutilizada la e de «que», reescalada dentro del espacio de la primera s de «cookiss». Se conserva la s final, el resto de letras, las migas y la silueta circular.
- Región de edición: x=748, y=530, ancho=126, alto=164. Se integra únicamente el fondo/sombra inmediato a esa letra.
- Comparación RGBA en sRGB entre el PNG original y el PNG de salida vuelto a decodificar: 17.580 píxeles diferentes dentro de esa región; **0 fuera**.
- Detalles antes/después generados en `.artifacts/logo-detail-before.png` y `.artifacts/logo-detail-after.png`, revisados visualmente.
- Proceso reproducible con Swift/CoreGraphics/ImageIO nativos de macOS; no se instalaron bibliotecas.

```sh
swiftc scripts/brand/*.swift -o .artifacts/brand-tools
.artifacts/brand-tools logo public/brand/references/logo-original.png public/brand/que-cookies-logo.png .artifacts
```

El comando de edición exige la resolución original y no sobrescribe la fuente.

## QC-012 — Motivos y paleta originales

- Fuente: `public/brand/references/patron-marca.jpg`, 1080 × 1350, facilitada por el negocio.
- Mano, corazón, cookie y franja extraídos a `public/brand/motifs/`. Son máscaras raster transparentes del trazo original, no iconos redibujados ni vectores inventados.
- Renderizado: `BrandMotif` y `BrandPattern` aplican currentColor mediante máscara CSS. Se conserva la forma y se usan los colores oficiales según fondo/estado.
- La franja se incorpora al pie; la cookie original identifica la carta en la navegación móvil. Resto de motivos disponibles para hero y secciones.
- Contrastes calculados sRGB: rojo/amarillo 5,46:1; rojo/amarillo complementario 6,20:1; rojo/crema 8,36:1; texto oscuro/amarillo 9,90:1.

```sh
.artifacts/brand-tools motifs public/brand/references/patron-marca.jpg public/brand/motifs
```
