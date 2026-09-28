# Que Cookies

Vidriera mobile first en Next.js, React, TypeScript y Tailwind. R1 prepara solicitudes de pedido por WhatsApp; no cobra ni reserva stock.

## Desarrollo

Requiere Node.js 24 o posterior y npm.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000.

## Verificaciones

```sh
npm run typecheck
npm test
npm run build
npm run smoke
```

Para ejecutar la compilación de producción: `npm start`.

`npm run check` ejecuta todas las verificaciones anteriores. Las pruebas usan `node:test` y `node:assert`, sin paquetes extra. El smoke inicia un servidor efímero en el puerto 43127 (configurable con `SMOKE_PORT`), comprueba HTTP y lo detiene; no automatiza un navegador.

### Verificación de navegador sin dependencias adicionales

```sh
npm run build
npm run test:browser
```

Usa Chrome instalado a través de su protocolo DevTools y WebSocket nativo de Node. En macOS busca `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; en otro entorno indicar `CHROME_PATH`. Inicia producción en el puerto 43128 (`BROWSER_TEST_PORT`), crea un perfil aislado y lo elimina al terminar. No utiliza la sesión personal del navegador.

Verifica responsive, compra, datos recordados y fallos de almacenamiento/portapapeles. La apertura de WhatsApp se intercepta: inspecciona el enlace sin enviar mensajes al negocio. Capturas en `.artifacts/browser/` (fuera de Git).

## Documentación

- [Reglas del proyecto](./AGENTS.md).
- [Issues y commits](./docs/issues.md).
- [Especificación R1](./docs/specs/000/spec.md).
- [Diseño mobile first](./docs/specs/000/diseno-ui-ux.md).
- [Rediseño e identidad de marca](./docs/specs/001/spec.md): navegación inferior móvil y tareas de logo/hero.

Las dependencias adicionales deben conversarse antes de instalarlas. No se configuró un proveedor de hosting ni un backend.

## Contenido y recursos

- Negocio y horarios: `src/config/business.ts`.
- Catálogo y precios (centavos): `src/data/catalog.ts`.
- Preguntas frecuentes: `src/data/faqs.ts`.
- [Fotos y marca provisional](./docs/assets.md).

El logo y los motivos proceden de los archivos del negocio; la letra del logo fue corregida conservando el diseño. Las fotografías son ilustrativas. Las fichas de ingredientes/alérgenos y los textos definitivos requieren confirmación del negocio antes de publicar.

El rediseño 001 incorpora el hero del plato suministrado, colores medidos, motivos originales, tarjetas con ilustraciones aisladas y navegación mobile inferior. Logo final: `public/brand/que-cookies-logo.png`. Las fuentes permanecen en `public/brand/references/` y los procesos/evidencias están documentados en `docs/assets.md` y `docs/specs/001/validacion.md`.

## Compra y almacenamiento

- Carrito: `src/features/cart/`; reglas puras en `cart.ts` y persistencia versionada en `src/lib/storage/`.
- Checkout: `src/features/checkout/`, separado en datos, entrega, revisión y validaciones.
- Mensaje: `src/features/whatsapp/`; se prepara y valida antes de abrir el chat. El cliente debe enviarlo.
- El carrito se recuerda automáticamente; contacto y domicilio solo si el cliente elige recordarlos. No se recuerdan día/hora ni comentarios particulares.
- Envíos con costo a confirmar; horarios en zona de Buenos Aires. No hay credenciales ni integración de pagos.

La primera implementación está disponible para revisión local y tiene verificación interactiva en Chrome headless. Falta verificar Safari y dispositivos físicos, completar el contenido editorial y definir dominio/hosting; no se realizó un despliegue.
