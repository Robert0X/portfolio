# Rediseño F-Definitivo — Implementation Plan (Fase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el diseño actual del portafolio por la identidad "F-Definitivo" aprobada (editorial-ingenieril: Familjen Grotesk/Instrument Sans/JetBrains Mono, azul #2b3cff, dark mode completo), conservando TODO el contenido y el sistema i18n.

**Architecture:** Sitio estático vanilla (sin build). Tres archivos núcleo se reescriben (`index.html`, `css/style.css`, `js/main.js`) tomando como fuente de verdad de diseño el mockup aprobado y commiteado `design-mockups/f-definitivo.html` (tokens, componentes nav/hero/spec-rail/proof/frames). El spec completo vive en `docs/superpowers/specs/2026-06-10-redesign-f-definitivo-design.md`.

**Tech Stack:** HTML5 + CSS custom properties + JS vanilla (IIFE), Google Fonts, IntersectionObserver, Playwright MCP para verificación visual y render de marca.

**Verificación global (no hay tests unitarios — CLAUDE.md):** `html-validate index.html 404.html` debe dar 0 errores; servidor `python -m http.server 8000`; Playwright en 1440px y 390px, temas light/dark, idiomas EN/ES; `lighthouse http://localhost:8000 --view` ≥95 ×4.

---

### Task 1: CSS — sistema de diseño F completo

**Files:**
- Rewrite: `css/style.css` (completo)
- Source de tokens/componentes: `design-mockups/f-definitivo.html` líneas 12-150 (copiar tokens light/dark EXACTOS del `:root` y `[data-theme="dark"]`)

- [ ] **Step 1:** Escribir el nuevo `css/style.css` con este orden de secciones: tokens (light + dark del mockup F) → reset/base → utilidades (`.wrap` max 1120px, `.mono`, `.display`) → focus-visible (outline 2px var(--blue), offset 2px) → nav (sticky blur + `.nav__cv` botón azul) → hero asimétrico + `.spec` rail + `.pulse` → animaciones `lift`/`fadeup` + clases `data-reveal` (`[data-reveal] { opacity:0; transform:translateY(18px); transition: .7s cubic-bezier(.16,1,.3,1) } [data-reveal].is-visible { opacity:1; transform:none }`) → proof strip → bento (grid 4 col, celdas `.cell` con hover-lift, de `design-mockups/d-macos.html` adaptado a tokens F: border var(--rule), radius 20px, bg var(--card)) → proyectos `.proj` con `.frame` + las 3 UI abstractas (`.ui-tgs`, `.ui-sv`, `.ui-nb` del mockup F) → fila compacta CuentaClara (`.proj--min`) → tabla CP `.standings` (filas border-top 1px, verdict mono verde) → experience `.exp` filas → contact (form inputs border-bottom 1px, focus azul) → footer → media queries (≤900px: grids a 1 col, proof 2 col; ≤480px ajustes tipo) → `@media (prefers-reduced-motion: reduce)` global.
- [ ] **Step 2:** Verificar sintaxis: `npx -y stylelint css/style.css` no es config del repo — en su lugar abrir en navegador (Task 6) y revisar consola. Commit parcial: `git add css/style.css && git commit -m "feat(redesign): new F design system stylesheet"`

### Task 2: index.html — estructura nueva con i18n completo

**Files:**
- Modify: `index.html` (head: conservar TODO el bloque SEO/OG/JSON-LD actual líneas 7-67; body: reemplazo completo)

- [ ] **Step 1:** En `<head>`: actualizar Google Fonts a `Familjen+Grotesk:wght@400;500;600;700`, `Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400`, `JetBrains+Mono:wght@400;500`; añadir script anti-flash ANTES del CSS:
```html
<script>(function(){try{var t=localStorage.getItem('portfolio-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;}catch(e){}})();</script>
```
y `<meta name="theme-color" content="#fbfaf7">` (JS la sincroniza).
- [ ] **Step 2:** Body por secciones (estructura del mockup F + spec §Estructura; CADA texto visible con `data-en` y `data-es`):
  nav (logo, 5 links `01 About…05 Contact`, botón `id="langToggle"`, botón `id="themeToggle"` `type="button"`, `<a class="nav__cv" href="assets/CV_RobertGarcia.pdf" download>CV ↓</a>`) · hero (badge pulse "open to internships…", nombre en 2 `.line>span` SIN inline styles, bio, spec rail Currently/Peak/Handle/Status) · proof strip (4 `.proof__item` con `data-count` y valor final en texto: ICPC ’25 / 3rd / 1 club / 4+ años) · `#about` (2 párrafos actuales + bento: Stack 2w con chips, Education, Languages, Teaching, Location) · `#projects` (3 `.proj` con frames ui-tgs/ui-sv/ui-nb, meta mono, links "code ↗" a los repos reales + CuentaClara `.proj--min`) · `#competitive` (intro + standings 3 logros + perfiles Codeforces/omegaUp/LeetCode/GitHub) · `#experience` (3 roles actuales en filas) · `#contact` (links + form formsubmit actual) · footer.
  Mobile menu igual que hoy (mismo patrón `mobileToggle`/`mobileMenu`).
- [ ] **Step 3:** `html-validate index.html` → Expected: 0 errors (botones con type, sin inline styles). Commit: `git commit -m "feat(redesign): rebuild index.html with F structure"`

### Task 3: js/main.js — reescritura

**Files:**
- Rewrite: `js/main.js`

- [ ] **Step 1:** IIFE con: `initTheme()` (toggle click → alterna `data-theme`, guarda `portfolio-theme`, actualiza `meta[name=theme-color]` a `#fbfaf7`/`#101013` y el icono ☾/☀), `setLanguage/initLanguage` (copiados del actual SIN typingStrings/typeEffect), `initCounters()`:
```js
function initCounters(){
  var els=document.querySelectorAll('[data-count]');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting) return; io.unobserve(e.target);
    var el=e.target, end=parseInt(el.dataset.count,10), suf=el.dataset.suffix||'', t0=null;
    function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/900,1);
      el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suf; if(p<1)requestAnimationFrame(step); }
    requestAnimationFrame(step);
  });},{threshold:.4});
  els.forEach(function(el){io.observe(el);});
}
```
`initReveal()` (observer sobre `[data-reveal]` añade `.is-visible`, unobserve), más nav scroll/mobile menu/smooth scroll/active nav adaptados del archivo actual.
- [ ] **Step 2:** Verificar en navegador (Task 6): toggle tema persiste tras reload, EN/ES traduce todo, contadores animan una vez. Commit: `git commit -m "feat(redesign): theme manager, counters and reveal v2"`

### Task 4: 404.html con tokens F

**Files:**
- Modify: `404.html` (solo el `<style>` y fuentes)

- [ ] **Step 1:** Cambiar fuentes a Familjen Grotesk + JetBrains Mono; tokens: bg `#fbfaf7`, ink `#131312`, azul `#2b3cff`; conservar estructura/textos/links absolutos `/portfolio/`. Commit: `git commit -m "feat(redesign): restyle 404 with F tokens"`

### Task 5: Marca re-render (og-image + favicons)

**Files:**
- Modify: `assets/brand/og-image.html`, `assets/brand/favicon.html`, `assets/img/favicon.svg`
- Regenerate: `assets/img/og-image.png`, `assets/img/{icon-512,icon-192,apple-touch-icon,favicon-32x32,favicon-16x16}.png`, `favicon.ico`

- [ ] **Step 1:** og-image.html → fuentes F, fondo `#fbfaf7`, tinta `#131312`, azul `#2b3cff`, mismo contenido; favicon.html → bg `#131312`, R blanco Familjen Grotesk 700, punto `#2b3cff`; favicon.svg igual en SVG.
- [ ] **Step 2:** Renderizar vía Playwright (viewport 1200x630 para og; element `#icon` con `--size` 512/192/180/32/16 como está documentado en los propios HTML). Regenerar ICO:
```bash
python -c "import struct;e=[(s,open('assets/img/favicon-%dx%d.png'%(s,s),'rb').read()) for s in(16,32)];o=6+16*len(e);h=struct.pack('<HHH',0,1,len(e));d=b'';b=b''
for s,p in e: d+=struct.pack('<BBBBHHII',s,s,0,0,1,32,len(p),o);o+=len(p);b+=p
open('favicon.ico','wb').write(h+d+b)"
```
- [ ] **Step 3:** Commit: `git commit -m "feat(redesign): re-render brand assets with F identity"`

### Task 6: Verificación integral + PR

- [ ] **Step 1:** Servir (`python -m http.server 8000`) y con Playwright capturar: light/dark × EN/ES × 1440/390 (hero, about+bento, projects, cp+experience, contact). Revisar cada captura; corregir defectos.
- [ ] **Step 2:** `html-validate index.html 404.html` → 0 errores. Consola del navegador → 0 errores.
- [ ] **Step 3:** `lighthouse http://localhost:8000 --output=json --output-path=stdout --quiet --chrome-flags="--headless"` → las 4 categorías ≥ 0.95; si no, corregir y repetir.
- [ ] **Step 4:** Probar reload con tema oscuro guardado (sin flash), localStorage lang=es, `prefers-reduced-motion` emulado.
- [ ] **Step 5:** `git push -u origin feat/redesign` + `gh pr create` (resumen + capturas en el body). **NO merge sin revisión del usuario** (su decisión explícita: revisar el PR antes de producción).
