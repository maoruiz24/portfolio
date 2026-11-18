---
name: add-project
description: Añade un nuevo caso de estudio/proyecto al portafolio (src/lib/data/projects.ts), con su página de detalle, tarjeta e imagen. Usar cuando el usuario quiera agregar, documentar o destacar un proyecto.
---

# Añadir un proyecto

1. **Recoge la información** (pregunta lo que falte; **no inventes métricas**):
   - título, org (`Nology Solutions`, `Personal R&D`, `ETB`…), periodo, estado opcional
   - category: `enterprise` | `product` | `rnd`; `ai: true` si LLMs/agentes son centrales; `url` opcional
   - tagline (1 línea para tarjetas) y summary (2–3 frases)
   - 2–4 métricas verificables `{ value, label }`
   - problem, responsibilities, approach, impact, learning, stack; para proyectos principales también `features`, `architecture` (capas → nodos), `decisions` (con trade-off) y `challenges`; `flow` opcional
2. **Encuadre:** todo lo que no sea de Nology/ETB/Indra va como `org: "Personal R&D"` con `category: "product"` o `"rnd"`; se permite `url`, pero sin precios, pagos, usuarios ni lenguaje comercial (permiso de trabajo; ver CLAUDE.md). Nada de números de versión ni conteos de releases.
3. **Crea la entrada** en `src/lib/data/projects.ts` siguiendo la interfaz `Project`. `slug` en kebab-case, único (comprueba con Grep).
4. Si debe aparecer en la home, añade el slug a `homeProjectSlugs` en `src/lib/data/projects.ts` (6 tarjetas; mantener múltiplo de 3).
5. Si es relevante para el résumé, añádelo a `rdProjects` en `src/app/resume/page.tsx` y ejecuta `/update-resume`.
6. La ruta `/projects/<slug>`, metadata y sitemap se generan solos. Ejecuta `/verify` y confirma que `/projects/<slug>` responde 200.
