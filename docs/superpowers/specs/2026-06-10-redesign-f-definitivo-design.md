# Spec — Rediseño "F: Definitivo" del portafolio

> Aprobado por el usuario el 2026-06-10 tras 3 rondas de mockups (A/B/C temáticos CP →
> D/E macOS/libre → F/G finales). Mockup de referencia: `design-mockups/f-definitivo.html`
> (+ capturas F-definitivo-*.png). Análisis de referencias en
> `Contexto para la IA/ANALISIS_PORTAFOLIOS_REFERENCIA.md`.

## Identidad

- **Concepto:** precisión editorial-ingenieril. Papel cálido, tinta casi negra, UN azul
  eléctrico (IKB) como única voz de color. Reglas de 1px, asimetría, metadatos en mono.
- **Fuentes (Google Fonts):** Familjen Grotesk (display 400-700) · Instrument Sans
  (cuerpo 400-600) · JetBrains Mono (metadatos 400-500).
- **Tokens claro:** paper `#fbfaf7`, paper-2 `#f4f2ed`, card `#fff`, ink `#131312`,
  ink-2 `#5c5a55`, ink-3 `#a3a09a`, rule `#e4e1da`, blue `#2b3cff`,
  blue-soft `rgba(43,60,255,.07)`, green `#1fa860`.
- **Tokens oscuro** (`[data-theme="dark"]`): paper `#101013`, paper-2 `#16161a`,
  card `#1a1a1f`, ink `#f0efeb`, ink-2 `#a5a3a0`, ink-3 `#5e5c5a`, rule `#26262b`,
  blue `#6573ff`, green `#3ecf80`.
- Se conservan: sistema i18n `data-en`/`data-es` (TODO texto visible lo lleva),
  localStorage `portfolio-lang`, formulario formsubmit.co, GitHub Flow.

## Estructura de página (index.html)

1. **Nav** (sticky, blur): logo "Robert." · links mono `01 About … 05 Contact` ·
   botón ES/EN · botón tema ☾/☀ · **botón CV ↓ relleno azul** (link al PDF).
2. **Hero** (grid 1fr/290px, asimétrico): badge pulsante verde "open to internships —
   software engineer · competitive programmer"; nombre gigante Familjen Grotesk con
   reveal línea-por-línea (overflow hidden + translateY); bio 1 frase; **spec rail**
   derecha (border-left): Currently / Peak / Handle / Status (● available — Morelia, MX).
3. **Proof strip** (full-bleed, border top/bottom, 4 celdas): ICPC '25 · 3rd Coding Cup ·
   1 club founded · 4+ years competing & teaching. Count-up al entrar en viewport;
   **valores finales escritos en el HTML** (sin JS se leen igual).
4. **01 About**: texto actual (2 párrafos) + **bento grid** (de la propuesta D):
   celda 2w Stack con chips mono (C++, TS, Python, PHP, SQL, Next.js, React, Linux…),
   Education (TecNM 2028), Languages (ES nativo / EN), Teaching (instructor + OMICH),
   Location (Morelia, MX). Celdas con hover-lift sutil.
5. **02 Work**: 3 proyectos en filas alternadas (frame 460px + texto): browser-frame
   con **UI abstracta en CSS** (TGS dashboard / StudyVault flashcards / NoteBook PDF)
   como base; cuando existan capturas reales (pipeline Playwright) se montan dentro
   del mismo frame. Meta mono (año · stack), nombre, desc con <b>, links
   "case study →" (fase 2, por ahora ancla al repo) y "code ↗".
   CuentaClara: fila compacta sin frame, status "in development — private repo".
6. **03 Competitive**: intro 1 frase + tabla de logros con reglas 1px (logro + detalle +
   verdict mono ✓ + año) + strip de perfiles mono (Codeforces · omegaUp · LeetCode ·
   GitHub) con handles.
7. **04 Experience**: filas con reglas (rol + org + fechas mono + descripción), las 3
   experiencias actuales.
8. **05 Contact**: texto + email/GitHub/LinkedIn + formulario formsubmit estilizado
   (inputs con border-bottom 1px, focus azul).
9. **Footer**: © + "built by hand — zero dependencies" + back to top.

## JavaScript (reescritura de js/main.js, vanilla, un IIFE)

- **Theme manager**: toggle, `localStorage('portfolio-theme')`, default
  `prefers-color-scheme`, actualiza `<meta name="theme-color">`. Script inline
  anti-flash en `<head>` (lee localStorage antes del primer paint).
- **i18n**: igual que hoy (`setLanguage` sobre `[data-en][data-es]`), sin typingStrings
  (la animación de typing se elimina; el reveal del nombre es CSS).
- **Count-up**: IntersectionObserver; anima de 0 al valor de `data-count`; si
  reduced-motion, no anima. Texto final ya está en el HTML.
- **Scroll-reveal v2**: elementos con `data-reveal` (+ `data-reveal-delay`), observer
  añade `.is-visible`. Sustituye la lista de selectores hard-coded.
- Nav scroll state, menú móvil, smooth scroll y active-nav se conservan adaptados.

## Accesibilidad / calidad

- `prefers-reduced-motion: reduce` desactiva todas las animaciones (hero queda visible).
- Focus-visible estilizado (outline azul offset 2px). Contraste AA en ambos temas.
- Botones con `type="button"`; eliminar inline styles del hero (los delays van a CSS)
  → html-validate debe quedar en 0 errores.
- Lighthouse ≥ 95 en las 4 categorías como criterio de aceptación.

## Marca derivada

- Re-render og-image (assets/brand/og-image.html → tokens/fuentes F) y favicons
  (R. con fondo ink `#131312` y punto azul `#2b3cff`) vía Playwright como ya está
  documentado. 404.html re-estilizada con tokens F.

## Fases

- **Fase 1 (esta rama):** todo lo anterior en index.html/css/js + 404 + marca.
- **Fase 2:** case-study pages (`projects/*.html`) + View Transitions nativas;
  capturas reales de los proyectos; testimonios cuando haya quotes reales.
- **Fase 3:** chatbot IA sobre el CV (requiere serverless; proyecto aparte).
