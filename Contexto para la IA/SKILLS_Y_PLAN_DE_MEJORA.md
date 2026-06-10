# 🚀 Skills, Herramientas y Plan de Mejora del Portafolio

> Documento generado el 2026-06-10. Objetivo: llevar el portafolio a nivel de lo que buscan
> reclutadores de Google, Meta, Apple, Microsoft, etc., con prioridad en **diseño**.

---

## 1. Diagnóstico honesto del portafolio actual

### Lo que ya está bien ✅

- Base técnica limpia: HTML semántico, CSS con design tokens en `:root`, BEM, JS vanilla bien organizado.
- Sistema bilingüe EN/ES completo (`data-en`/`data-es`) — pocos portafolios de estudiantes lo tienen.
- Flujo de Git profesional (GitHub Flow + Conventional Commits + PRs) ya documentado.
- Desplegado en GitHub Pages: https://robert0x.github.io/portfolio/
- Historia real que contar: ICPC, fundador de club, instructor — eso es oro para reclutadores.

### Los problemas, en orden de impacto 🔴

| # | Problema | Por qué importa para FAANG |
|---|----------|---------------------------|
| 1 | **Las tarjetas de proyectos NO tienen links** (ni a GitHub ni a demo) | Un reclutador dedica ~30 segundos. Si no puede hacer clic y ver código funcionando, el proyecto "no existe". Es el gap #1. |
| 2 | **Tus mejores proyectos no están en el sitio.** El CV menciona el Sistema de Gestión de Cafetería (.NET 8 + React) y ACSI (full-stack), pero el portafolio muestra CuentaClara (sin link), un evento y scripts de certificados | Los proyectos full-stack con stack real (.NET, React, SQL) son exactamente lo que evalúa un recruiter técnico. Mostrar "organización de eventos" como proyecto #2 diluye la señal. |
| 3 | **Sin capturas/visuales de proyectos** — solo texto | El diseño de un portafolio se juzga también por cómo presenta evidencia visual del trabajo. |
| 4 | **Diseño limpio pero genérico** ("safe") | No es feo — pero no es memorable. Cientos de portafolios usan exactamente esta fórmula (hero + typing animation + cards grises). Para destacar se necesita identidad visual propia. |
| 5 | **Sin dark mode** | La audiencia (ingenieros) lo espera. Con los tokens CSS ya centralizados, es barato de implementar. |
| 6 | **SEO/compartibilidad incompleta**: sin favicon, sin Open Graph/Twitter cards, sin JSON-LD, sin sitemap/robots.txt | Cuando compartas el link en LinkedIn se ve un preview vacío = primera impresión perdida. |
| 7 | **Accesibilidad parcial**: sin `prefers-reduced-motion`, estados `:focus-visible` no auditados | Google y Apple toman a11y en serio; es un diferenciador real en entrevistas de frontend. |
| 8 | **El repo no tiene README.md** | El recruiter llega al repo desde tu perfil de GitHub antes que al sitio. Un repo sin README parece abandonado. |
| 9 | Sin analítica (Plausible/GoatCounter) ni página 404 | No sabes si alguien visita; el 404 de GitHub Pages es genérico. |

> **Verdad incómoda:** para empresas top, el portafolio es la puerta, pero lo que más pesa es:
> perfil de GitHub activo con repos documentados, rating de Codeforces visible, y resultados
> medibles. El rediseño debe **apuntar todo hacia esa evidencia**, no solo verse bonito.

---

## 2. Inventario completo de skills disponibles y cómo usarlas AQUÍ

### ⭐ Tier 1 — Núcleo para el rediseño (úsalas sí o sí)

| Skill | Qué hace | Cómo ayuda en ESTE proyecto |
|-------|----------|------------------------------|
| `frontend-design:frontend-design` | Genera interfaces de calidad producción con identidad propia, evitando la estética genérica de IA | **La skill estrella para tu objetivo.** Úsala al rediseñar el hero, las project cards, la tipografía y el sistema de color. Pídele explícitamente "una dirección visual distintiva, no genérica". |
| `superpowers:brainstorming` | Explora intención, requisitos y diseño ANTES de implementar | Primer paso obligado del rediseño: definir identidad visual (¿minimalista editorial? ¿terminal/mono inspirado en CP? ¿brutalist?), audiencia y alcance antes de tocar CSS. |
| `superpowers:writing-plans` | Convierte requisitos en un plan de implementación por pasos | El rediseño toca HTML+CSS+JS+i18n a la vez. Un plan escrito evita romper la alternancia de secciones, el scroll-reveal y las traducciones. |
| `superpowers:executing-plans` | Ejecuta un plan con checkpoints de revisión | Pareja de la anterior: ejecuta el plan del rediseño fase por fase con verificación entre fases. |
| `verify` / `run` | Lanza la app y observa el comportamiento real | Después de cada cambio de diseño: servir el sitio, verificar EN/ES, mobile y desktop. Combínalas con Playwright MCP (ver sección 3) para que Claude VEA el diseño. |
| `code-review` (`/code-review`) | Revisa el diff buscando bugs y simplificaciones | Antes de cada merge a `main` (que despliega a producción directo). El modo `ultra` (multi-agente en la nube) vale la pena para el PR grande del rediseño. |
| `superpowers:verification-before-completion` | Exige evidencia antes de declarar algo terminado | Tu sitio se despliega al hacer merge: nunca aceptar un "ya quedó" sin haber visto el sitio servido funcionando en ambos idiomas. |

### 🔧 Tier 2 — Proceso y calidad (úsalas en cada ciclo de trabajo)

| Skill | Cómo ayuda aquí |
|-------|-----------------|
| `superpowers:using-git-worktrees` | Aísla el rediseño en un worktree mientras `main` (= producción) queda intacto. Encaja con tu GitHub Flow documentado. |
| `superpowers:requesting-code-review` / `receiving-code-review` | Disciplina de revisión al terminar features; la segunda evita aceptar feedback sin verificarlo técnicamente. |
| `superpowers:finishing-a-development-branch` | Cierra cada rama con opciones estructuradas (PR, merge, cleanup) — coincide con tu ciclo de 12 pasos documentado. |
| `simplify` | Tras varias iteraciones de diseño el CSS acumula reglas muertas. Pásala antes del PR final para limpiar. |
| `review` | Revisar tus PRs en GitHub antes del merge. |
| `security-review` | Auditar el formulario (formsubmit.co), links externos (`rel="noopener"`) y headers. Una vez por release grande basta. |
| `superpowers:dispatching-parallel-agents` / `subagent-driven-development` | Cuando haya tareas independientes (ej. dark mode + meta tags SEO + README), se pueden trabajar en paralelo con subagentes. |

### 🧰 Tier 3 — Situacionales (útiles, pero no para el rediseño en sí)

| Skill | Cuándo usarla aquí |
|-------|--------------------|
| `superpowers:systematic-debugging` | Si el typing animation, el toggle de idioma o el scroll-reveal se rompen: diagnóstico antes de parchar. |
| `superpowers:test-driven-development` | **Aplicabilidad baja hoy** (sitio estático sin infra de tests). Útil solo si extraes utilidades JS (ej. lógica i18n) a módulos testeables. No la fuerces. |
| `graphify` | **Aplicabilidad baja**: el repo son 3 archivos; un knowledge graph aporta poco. Útil si el proyecto crece a multi-página. |
| `superpowers:writing-skills` | **Idea valiosa**: crear una skill propia del proyecto, ej. `portfolio-i18n-check`, que verifique que todo texto nuevo tenga `data-en`/`data-es` y que `typingStrings` EN/ES estén sincronizados. |
| `loop` / `schedule` | Automatizar chequeos recurrentes (ej. correr Lighthouse semanalmente, verificar que los links del sitio no estén rotos). |
| `update-config` / `fewer-permission-prompts` / `keybindings-help` | Mejoran tu experiencia con Claude Code (permisos, hooks), no el portafolio directamente. `fewer-permission-prompts` sí vale la pena correrla una vez. |
| `claude-api` | Solo si algún día agregas una feature con IA al sitio (ej. chatbot del CV). |
| `init` | ✅ Ya usada — `CLAUDE.md` creado en la raíz del repo. |

### 🔌 MCPs ya conectados que puedes aprovechar

| MCP | Uso en este proyecto |
|-----|----------------------|
| **Excalidraw** | Hacer mockups/wireframes del rediseño ANTES de codificar (hero nuevo, layout de project cards). Barato de iterar. |
| **Notion** | Tablero de contenido: qué proyectos mostrar, qué métricas conseguir (rating CF, # estudiantes entrenados). Opcional. |
| Google Drive / Calendar / Gmail | Marginal para este proyecto. |

---

## 3. Lo que te FALTA (instálalo / créalo) — en orden de prioridad

### 3.1 Playwright MCP — la pieza que falta más importante 🎯

**El problema:** quieres mejorar el diseño, pero Claude ahora mismo **no puede ver** tu página
renderizada. Itera a ciegas sobre CSS. Con Playwright MCP, Claude abre un navegador real,
toma screenshots (desktop/mobile, EN/ES), y compara antes/después en cada iteración.

```powershell
claude mcp add playwright -- npx -y "@playwright/mcp@latest"
```

Alternativa equivalente (más orientada a debugging/performance):

```powershell
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

**Sin esto, cualquier rediseño serio es adivinanza. Instálalo primero.**

### 3.2 Auditorías de calidad (no requieren instalación permanente)

```powershell
# Performance + SEO + accesibilidad + best practices (apunta al sitio servido)
npx lighthouse http://localhost:8000 --view

# Accesibilidad específica
npx pa11y http://localhost:8000

# Validación de HTML
npx html-validate index.html
```

Meta: **Lighthouse ≥ 95 en las 4 categorías**. Ponlo como criterio de aceptación del rediseño.

### 3.3 CI con GitHub Actions (el sello "profesional" en el repo)

Crear `.github/workflows/ci.yml` que en cada PR corra: `html-validate`, un link-checker
(ej. `lychee`) y Lighthouse CI con presupuesto. Ver checks verdes en tus PRs es exactamente
el tipo de señal que un ingeniero de Google nota al abrir tu repo.

### 3.4 Contenido/archivos que el repo necesita (no son tooling, pero bloquean el objetivo)

1. **`README.md` del repo** — con screenshot del sitio, link en vivo, stack y cómo correrlo. *(Es lo primero que ve un recruiter en GitHub.)*
2. **Links en CADA project card** — botón "Code" (GitHub) y "Live" (demo) cuando exista.
3. **Subir los proyectos reales del CV**: Sistema de Cafetería (.NET 8 + React) y ACSI a GitHub con buen README, y agregarlos al portafolio con captura de pantalla.
4. **Favicon + Open Graph/Twitter meta + imagen OG** (preview al compartir en LinkedIn).
5. **`robots.txt` + `sitemap.xml` + JSON-LD** (schema.org/Person) para SEO.
6. **`404.html`** personalizada (GitHub Pages la sirve automáticamente).
7. **Analítica ligera y sin cookies**: Plausible (de pago) o GoatCounter (gratis).
8. **Dark mode** con toggle + `prefers-color-scheme` (los tokens en `:root` lo hacen directo).
9. **`prefers-reduced-motion`** para las animaciones (typing, reveal) — a11y real.

### 3.5 Skill personalizada del proyecto (opcional, alto valor formativo)

Usar `superpowers:writing-skills` para crear `.claude/skills/portfolio-i18n-check/` que
valide automáticamente la convención `data-en`/`data-es` en cada cambio. Además de útil,
**saber construir tooling propio es un tema de conversación excelente en entrevistas**.

### 3.6 ¿Migrar a un framework (Astro/Next)? — Mi recomendación: todavía NO

Vanilla HTML/CSS/JS bien ejecutado **demuestra fundamentos**, carga instantáneo y no tiene
mantenimiento de dependencias. Migra a Astro solo cuando necesites: blog con Markdown,
varias páginas por proyecto, o colecciones de contenido. Hoy sería complejidad sin retorno.

---

## 4. El proceso recomendado, paso a paso (pipeline de rediseño)

### Fase 0 — Preparar el terreno (1 sesión)

1. ✅ `CLAUDE.md` creado (ya está).
2. Instalar **Playwright MCP** (sección 3.1).
3. Correr `fewer-permission-prompts` para agilizar las sesiones.
4. Crear `README.md` del repo.

### Fase 1 — Definir la dirección de diseño (1 sesión)

> Prompt sugerido: *"Usa superpowers:brainstorming — quiero rediseñar mi portafolio para que
> sea memorable ante reclutadores de Google/Meta/Apple/Microsoft. Mi identidad: programador
> competitivo (ICPC), fundador de club, instructor. Explora direcciones visuales conmigo."*

- Salida esperada: una dirección visual concreta (tipografía, paleta, motion, layout).
- Opcional: mockup en **Excalidraw MCP** antes de escribir código.

### Fase 2 — Planear (misma sesión o siguiente)

> Prompt: *"Usa superpowers:writing-plans para convertir la dirección elegida en un plan
> por fases: (1) sistema de diseño/tokens, (2) hero, (3) projects con links y capturas,
> (4) dark mode, (5) SEO/meta/favicon, (6) a11y y performance."*

### Fase 3 — Implementar por ramas (varias sesiones)

- Una rama por fase (`feat/design-system`, `feat/projects-links`, …) siguiendo tu GitHub Flow.
- En cada rama: skill `frontend-design` para el código de UI + **screenshots con Playwright
  en cada iteración** (desktop 1440px, mobile 390px, EN y ES) + `run`/`verify`.
- Tareas independientes (README, meta tags, 404) → `dispatching-parallel-agents`.

### Fase 4 — Verificar y revisar (antes de CADA merge)

1. `npx lighthouse` → las 4 categorías ≥ 95.
2. `npx pa11y` → cero errores.
3. `/code-review` (y `/code-review ultra` para el PR grande del rediseño).
4. `simplify` para podar CSS/JS muerto.
5. `superpowers:verification-before-completion` → evidencia visual EN/ES antes de declarar listo.

### Fase 5 — Publicar y medir

1. PR → merge → verificar https://robert0x.github.io/portfolio/ en vivo (es producción).
2. Probar el preview de OG compartiendo el link en LinkedIn.
3. Activar analítica y revisar visitas tras publicar el portafolio en tu perfil de GitHub
   (README de perfil), LinkedIn y firmas.

### Mantenimiento continuo

- `schedule` o `loop`: auditoría Lighthouse + link-check semanal.
- Regla de oro: **cada proyecto nuevo entra al sitio con link a código + captura + métrica de impacto** ("usado por X personas", "redujo Y horas"), no solo descripción.

---

## 5. Resumen ejecutivo (si solo lees una sección, que sea esta)

1. **Instala Playwright MCP** — sin visión del navegador no hay iteración de diseño seria.
2. **Arregla el contenido antes que el estilo**: links en project cards + tus proyectos reales (.NET/React) con capturas. Es el cambio con más ROI frente a reclutadores.
3. **Rediseña con proceso**: `brainstorming` → `writing-plans` → `frontend-design` + screenshots → `code-review` → merge. No saltes fases.
4. **Sella la calidad**: Lighthouse ≥ 95, pa11y limpio, CI en GitHub Actions, README con screenshot.
5. **El portafolio apunta a la evidencia**: GitHub activo, Codeforces visible, métricas de impacto. El diseño es el empaque; que el contenido aguante el clic.
