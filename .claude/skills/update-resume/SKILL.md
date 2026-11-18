---
name: update-resume
description: Regenera public/Resume-IvanRuiz.pdf desde la página /resume después de cambiar experiencia, skills, site.ts o la propia página del résumé. Usar cuando se pida actualizar, regenerar o exportar el résumé/CV en PDF.
---

# Regenerar el résumé en PDF

El PDF es un artefacto generado: su fuente es `src/app/resume/page.tsx`, que lee `src/lib/site.ts` y `src/lib/data/experience.ts`. Nunca editar el PDF a mano.

1. Edita los datos (no inventes métricas; ver "Reglas de contenido" en CLAUDE.md).
2. `pnpm build`, copia `public/` y `.next/static` dentro de `.next/standalone/` y arranca `PORT=3199 node .next/standalone/server.js` en segundo plano.
3. Genera el PDF con Chrome headless:
   ```bash
   "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer \
     --virtual-time-budget=6000 --print-to-pdf="C:/code/portfolio/public/Resume-IvanRuiz.pdf" http://localhost:3199/resume
   ```
   (Edge sirve igual: `/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`.)
4. Lee el PDF y comprueba: **máximo 2 páginas**, fondo blanco, ninguna sección vacía al pie de página, texto extraíble (ATS).
   Si pasa de 2 páginas, recorta bullets antes de reducir la letra (mínimo `print:text-[9.5pt]`).
5. Detén el servidor y ejecuta `/verify`.
