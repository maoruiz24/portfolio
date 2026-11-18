---
name: verify
description: Verifica que el portafolio compile y funcione — typecheck, lint, build de producción y smoke test de todas las rutas. Usar después de cualquier cambio de código, antes de commit/push, o cuando se pida "verifica", "comprueba", "¿funciona?".
---

# Verificar el proyecto

Ejecuta en orden y detente en el primer fallo para corregirlo:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

El objetivo es **0 errores y 0 warnings** en lint.

## Smoke test del build

El build usa `output: "standalone"`, así que `pnpm start` no sirve. Replica lo que hace el Dockerfile:

```bash
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
PORT=3199 node .next/standalone/server.js   # en segundo plano
```

Comprueba con `curl -s -o /dev/null -w '%{http_code}'`:
- 200: `/`, `/about`, `/contact`, `/experience`, `/projects`, `/sitemap.xml`, `/robots.txt`
- 200: `/projects/<slug>` para cada slug de `src/lib/data/projects.ts`
- 404: `/projects/no-existe`

Después detén el servidor (en Windows: localiza el PID con `netstat -ano | grep :3199` y `taskkill //PID <pid> //F //T`).

## Reporte
Resume cada paso con ✓/✗. Si algo falló, muestra el error real y el archivo:línea.
