# CLAUDE.md

Portafolio personal de Ivan Ruiz — **Senior Software Engineer · AI Engineering**. Es su herramienta principal de búsqueda de empleo (roles de Senior AI Engineer / Applied AI / Full-Stack AI). Sitio estático con Next.js App Router, desplegado como contenedor Docker en su clúster k3s propio.

- Repo: https://github.com/maoruiz24/portfolio (rama `main`)
- Dominio: **https://iruiz.dev** (`siteConfig.url` en [src/lib/site.ts](src/lib/site.ts))
- Idioma del contenido del sitio y del résumé: **inglés**. Conversación con el usuario: español.

## Comandos

Gestor de paquetes: **pnpm** (no usar npm/yarn; existe `pnpm-lock.yaml`).

```bash
pnpm install       # instalar dependencias
pnpm dev           # servidor de desarrollo en http://localhost:3000
pnpm typecheck     # tsc --noEmit
pnpm lint          # eslint . (debe quedar en 0 errores y 0 warnings)
pnpm build         # build de producción (output: "standalone")
node .next/standalone/server.js   # servir el build (NO usar `pnpm start` con standalone; copiar antes public/ y .next/static, ver skill /verify)
docker compose up --build         # imagen de producción en http://localhost:3080
```

Verificación antes de dar algo por terminado: `pnpm typecheck && pnpm lint && pnpm build` (ver skill `/verify`).

## Stack y versiones

| Pieza | Versión | Nota |
|---|---|---|
| Next.js | 16.4.x | App Router, Turbopack, `output: "standalone"` |
| React | 19.3.x | |
| Tailwind CSS | 4.3.x | Config CSS-first en `globals.css` (`@theme inline`, `@utility`), **sin** `tailwind.config.*` |
| shadcn/ui | estilo `new-york` | Componentes en `src/components/ui`, primitivas Radix |
| framer-motion | 14.x | Entradas con `<Reveal>`; `MotionConfig reducedMotion="user"` en `providers.tsx` |
| lucide-react | 1.x | **No incluye iconos de marca** → usar `@/components/brand-icons` |
| TypeScript | 6.0.x | Bloqueado `<6.1` por `typescript-eslint` |
| ESLint | 9.x | Bloqueado en 9 por `eslint-plugin-react` / `jsx-a11y` (no soportan 10) |

## Arquitectura

```
src/
  app/
    layout.tsx            # Metadata SEO, fuentes (Inter, Space Grotesk, JetBrains Mono), Providers, Navbar/Footer, JSON-LD, skip link
    page.tsx              # Home (Server Component): Hero, stats, pilares, "how I build with AI", case studies, experiencia, skills, CTA
    projects/page.tsx     # Lista con filtros (ProjectsExplorer, client)
    projects/[slug]/      # Caso de estudio (SSG): métricas, flow, problem, approach, impact, learning, stack, related
    experience/ about/ contact/
    resume/page.tsx       # Résumé ATS de una columna, "papel" siempre claro, imprimible → fuente del PDF
    opengraph-image.tsx   # Imagen OG generada (next/og)
    sitemap.ts robots.ts  # Generados desde siteConfig + projects
  components/
    ui/                   # shadcn/ui — generados; modificar con cuidado
    providers.tsx         # ThemeProvider (dark por defecto) + MotionConfig
    Reveal.tsx            # Wrapper client de animación al entrar en viewport (permite páginas server)
    SectionHeading.tsx    # eyebrow "// texto" + título + subtítulo
    Hero, Navbar, Footer, ThemeToggle, ProjectCard, ProjectsExplorer, FlowDiagram,
    Timeline, SkillsGrid, ContactForm, CopyEmailButton, PrintButton, JsonLd, brand-icons
  lib/
    site.ts               # siteConfig: identidad, url, email, teléfono, availability, stats, idiomas, educación, SEO ← fuente única
    data/projects.ts      # Project[] + groupLabels (professional | lab | earlier, flag ai, featured, metrics, flow…)
    data/experience.ts    # Experience[] — bullets compartidos por /experience, home y /resume
    data/skills.ts        # SkillGroup[] con "proof" por grupo
    utils.ts              # cn() = clsx + tailwind-merge
public/
  Resume-IvanRuiz.pdf     # GENERADO desde /resume (ver skill /update-resume). No editar a mano.
tmp/                      # Notas locales (brief de Nology). En .gitignore — nunca commitear.
```

**Todo el contenido es data estática en `src/lib/`.** No hay CMS, base de datos, API routes ni variables de entorno. Sitio y résumé leen de los mismos datos: si cambias `experience.ts` o `site.ts`, regenera el PDF.

## Reglas de contenido (importantes)

- **Cero métricas inventadas.** Cada número debe venir del usuario o de evidencia verificable (git, tests, docs). Si falta, deja el texto sin número y pregunta.
- **Permiso de trabajo:** el usuario tiene un permiso que solo le permite trabajar para Nology. Todo proyecto fuera de Nology se presenta como **"Personal R&D"**: sin clientes, ingresos, precios, planes de pago, dominios comerciales ni lenguaje de negocio/freelance. No mencionar el estado migratorio en el sitio (lo trata en entrevistas).
- El TMS/SaaS logístico propio está **pausado**: aparece solo como "Multi-Tenant Platform Architecture (Paused)", no destacado.
- Nology: se puede nombrar DeliverySuite (producto público en las tiendas). Nada de clientes, URLs internas ni código.
- El teléfono solo aparece en `/resume` y el PDF; en el resto del sitio solo email/LinkedIn/GitHub.
- Posicionamiento: profundidad de ingeniería senior + IA (agentes, MCP, RAG, evals/LLM-as-judge, observabilidad/costos, human-in-the-loop). Mantener esas palabras clave alineadas con ofertas actuales.

## Convenciones de UI

- Estética "consola de ingeniería": fondo oscuro, acento verde menta (`primary`), `signal` ámbar para estados, etiquetas `font-mono`, rejilla sutil (`bg-grid`).
- Tokens en `:root` (claro) y `.dark` (oscuro) con oklch en [globals.css](src/app/globals.css); usar siempre clases semánticas (`bg-card`, `text-muted-foreground`, `text-primary`, `border-border`, `text-signal`…). Toda UI debe verse bien en ambos temas.
- Utilidades propias (`@utility`): `container-page` (ancho máximo + gutters), `bg-grid`, `text-gradient`, `eyebrow`.
- Páginas = Server Components; interactividad aislada en componentes client. Animaciones de entrada con `<Reveal>`.
- En grids con contenido ancho (p. ej. `whitespace-pre`) poner `min-w-0` en los hijos para evitar overflow en móvil.
- `/resume` usa colores fijos (`bg-white`, `text-zinc-*`, `text-emerald-800`) a propósito, y `print:` variants. Navbar/Footer tienen `print:hidden`.
- Alias `@/*` → `src/*`; clases con `cn()`; apóstrofes en JSX como `&apos;`; iconos genéricos de `lucide-react`, marcas en `brand-icons.tsx`.
- Nuevos componentes shadcn: `pnpm dlx shadcn@latest add <componente>`.

## Despliegue — ¡cuidado!

`git push` a `main` dispara [.github/workflows/deploy.yml](.github/workflows/deploy.yml): build de imagen Docker → push a registry privado → `kubectl set image deployment/app-portfolio -n portfolio`. **Un push a `main` es un despliegue a producción.**

- No hacer push a `main` sin que el usuario lo pida explícitamente y sin haber pasado typecheck + lint + build.
- Preferir ramas + PR para cambios grandes.
- Secrets del workflow (en GitHub): `REGISTRY_URL`, `REGISTRY_USER`, `REGISTRY_PASSWORD`, `KUBECONFIG_BASE64`.
- El contenedor escucha en el puerto **3080** (Dockerfile / docker-compose).

## Pendientes conocidos

- No hay imágenes/capturas de proyectos; las tarjetas son tipográficas (métricas + stack).
- El formulario de contacto no tiene backend: arma un `mailto:` hacia `siteConfig.email`.
- No hay tests automatizados; la verificación es typecheck + lint + build + revisión visual (capturas con Chrome headless; ojo: headless tiene ancho mínimo ~500px, para móvil real usar un iframe de 390px).
