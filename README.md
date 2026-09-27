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
npm run build
npm run smoke
```

Para ejecutar la compilación de producción: `npm start`.

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
