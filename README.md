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

## Documentación

- [Reglas del proyecto](./AGENTS.md).
- [Issues y commits](./docs/issues.md).
- [Especificación R1](./docs/specs/000/spec.md).
- [Diseño mobile first](./docs/specs/000/diseno-ui-ux.md).

Las dependencias adicionales deben conversarse antes de instalarlas. No se configuró un proveedor de hosting ni un backend.

## Contenido y recursos

- Negocio y horarios: `src/config/business.ts`.
- Catálogo y precios (centavos): `src/data/catalog.ts`.
- Preguntas frecuentes: `src/data/faqs.ts`.
- [Fotos y marca provisional](./docs/assets.md).

La marca tipográfica y las fotos son provisionales. Las fichas de ingredientes/alérgenos y los textos definitivos requieren confirmación del negocio antes de publicar.

## Compra y almacenamiento

- Carrito: `src/features/cart/`; reglas puras en `cart.ts` y persistencia versionada en `src/lib/storage/`.
- Checkout: `src/features/checkout/`, separado en datos, entrega, revisión y validaciones.
- Mensaje: `src/features/whatsapp/`; se prepara y valida antes de abrir el chat. El cliente debe enviarlo.
- El carrito se recuerda automáticamente; contacto y domicilio solo si el cliente elige recordarlos. No se recuerdan día/hora ni comentarios particulares.
- Envíos con costo a confirmar; horarios en zona de Buenos Aires. No hay credenciales ni integración de pagos.

La primera implementación está disponible para revisión local. Falta validar la interacción completa en dispositivos reales, además de completar el contenido editorial y definir dominio/hosting; no se realizó un despliegue.
