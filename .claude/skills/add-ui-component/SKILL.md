---
name: add-ui-component
description: Añade un componente shadcn/ui o crea un componente/sección nueva siguiendo el sistema de diseño del portafolio. Usar cuando se pida un componente, una sección nueva en una página, o un primitive de shadcn (tooltip, popover, select, etc.).
---

# Añadir componente de UI

## Primitive de shadcn/ui
```bash
pnpm dlx shadcn@latest add <componente>
```
Se genera en `src/components/ui/` usando `components.json` (estilo new-york, iconos lucide). Revisa que el archivo use tokens del tema y `cn()`. Si añade dependencias `@radix-ui/*`, quedan en `package.json`.

## Componente propio
1. Archivo en `src/components/<NombrePascal>.tsx` (export default, como el resto).
2. Patrón de sección:
   ```tsx
   <section className="container mx-auto px-4 md:px-8">
     <SectionHeading title="..." subtitle="..." />
     ...
   </section>
   ```
3. Animación de entrada: `motion.div` con `variants={sectionReveal}`, `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true }}` (de `@/lib/motion`). Requiere `"use client"`.
4. Tokens de color, `cn()`, tema claro/oscuro, accesibilidad y responsive según `CLAUDE.md`.
5. Ejecuta `/verify`.
