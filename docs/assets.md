# Recursos visuales de R1

## Fotografías ilustrativas

URLs centralizadas en `src/data/catalog.ts`. Servidas por next/image con tamaños responsivos y caché; no representan sabores reales y llevan la etiqueta «Imagen ilustrativa».

| Recurso | Fuente | Uso |
| --- | --- | --- |
| Cookies | https://images.unsplash.com/photo-1499636136210-6f4ee915583e | Fotografías provisionales en fichas y carrito |
| Surtido | https://images.unsplash.com/photo-1558961363-fa8fdf82db35 | Minis y fotografías provisionales de fichas |

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

## QC-014 — Hero del negocio

- Fuente suministrada: `public/brand/references/hero-original.png`, 1264 × 843. El mockup se preserva como `referencia-web.jpeg`.
- Derivado web: `public/images/hero-cookies.jpg`, misma resolución, JPEG a calidad 90 mediante sips nativo; next/image genera variantes responsive. No se redibujó la fotografía ni se modificó el archivo fuente.
- Composición: escena a la derecha y texto HTML a la izquierda en desktop; texto/acciones y plato debajo en móvil. Ondas SVG, fondo auxiliar vainilla, sello con la mano original y etiqueta ilustrativa.
- Se conservó la imagen suministrada como ilustrativa: no se presenta como fotografía verificada de los productos reales.

```sh
sips -s format jpeg -s formatOptions 90 public/brand/references/hero-original.png --out public/images/hero-cookies.jpg
```

La recompilación de las herramientas Swift depende de la instalación/licencia de Xcode del equipo. La conversión del hero se realizó con sips; no requiere recompilar esas herramientas.

## QC-015 — Ilustraciones de las tarjetas

- Fuente: mockup suministrado `referencia-web.jpeg`. Cuatro recortes de cookies sin texto/precio/cursor se generan como PNG transparente en `public/images/cookies/`.
- El recorte de la tradicional proviene de la secuencia inferior para evitar el cursor superpuesto de la tarjeta original. Pistacho, red velvet y chocolate proceden de las ilustraciones de la carta.
- El fondo claro conectado al exterior se separa por inundación; no se vacían los chips claros internos de la cookie. Las imágenes son ilustrativas y pueden compartirse entre sabores afines hasta disponer de fotografías reales.
- Resoluciones pequeñas (120×111 y 156×137): se usan solo en tarjetas compactas. No sustituyen la fotografía amplia de las fichas.
- Script reproducible: `node scripts/brand/extract-products.mjs`. Utiliza sharp ya instalado por Next.js como motor de imágenes; no se instaló ni agregó otra dependencia.
- Los precios y nombres se toman del catálogo del negocio, nunca de textos del mockup.
