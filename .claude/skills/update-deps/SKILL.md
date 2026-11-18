---
name: update-deps
description: Actualiza las dependencias del portafolio a sus últimas versiones compatibles respetando las restricciones conocidas (TypeScript <6.1, ESLint 9, lucide sin iconos de marca) y verifica que todo siga funcionando. Usar cuando se pida actualizar librerías, paquetes, Next.js, React, etc.
---

# Actualizar dependencias

1. **Ver qué hay nuevo**: `pnpm outdated` y, para cada paquete con salto mayor, revisa su changelog/release notes.
2. **Comprobar restricciones de peer deps** antes de subir:
   - `npm view typescript-eslint@latest peerDependencies` → rango permitido de `typescript` (hoy `<6.1`).
   - `npm view eslint-plugin-react@latest peerDependencies` y `eslint-plugin-jsx-a11y` → si ya aceptan ESLint 10, se puede subir `eslint`.
   - `npm view next@latest peerDependencies` → versión de React soportada.
   - `next` y `eslint-config-next` deben ir **siempre en la misma versión exacta**.
   - `react`, `react-dom`, `@types/react`, `@types/react-dom` en la misma minor.
   - `@types/node` alineado con la versión mayor de Node usada (local y `Dockerfile`), no necesariamente la última.
3. **Actualizar**: `pnpm up --latest <paquetes>` (o editar `package.json` y `pnpm install`). Mantén versiones exactas para `next`, `eslint-config-next`, `react`, `react-dom`.
4. **Breaking changes conocidos**:
   - `lucide-react` ≥1.0 quitó los iconos de marca → usar `@/components/brand-icons`.
   - Tailwind 4 no usa `tailwind.config.*`; la config está en `globals.css`.
5. **Otros sitios con versiones**: imagen base en `Dockerfile` (`node:<LTS>-alpine`), acciones en `.github/workflows/deploy.yml` (`actions/checkout`, `docker/*`, `azure/setup-kubectl`), `packageManager` en `package.json`.
6. Ejecuta la skill `/verify`. Si algo se rompe, corrige el código (no fijes una versión vieja sin explicar por qué).
7. Resume al usuario: tabla paquete | antes | después, y qué quedó bloqueado y por qué.
