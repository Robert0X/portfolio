# 🔍 Análisis crítico: portafolios de referencia (midudev y Eduardo Cabral)

> 2026-06-10. Análisis de https://porfolio.dev/ (midudev) y https://jackshaw32.dev/
> (Eduardo Cabral, repo Portfolio-2026) contra el objetivo: portafolio-CV que destaque
> para Google/Meta/Apple/Microsoft. Opinión brutalmente honesta.

---

## 1. midudev — porfolio.dev (1,451 ⭐ · 579 forks)

**Stack:** Astro + Tailwind, fuente Onest Variable, columna única estrecha (~768px).
**Estructura:** hero compacto con badge "Disponible para trabajar" → Experiencia
(timeline) → Proyectos (2-3, con chips de tecnología) → Sobre mí → footer.

### Lo bueno
1. **Claridad radical.** Un recruiter lee TODO en 60 segundos. Cero fricción, cero
   decoración que estorbe. Es el mejor "tiempo-a-la-información" de los dos.
2. **Orden de secciones correcto:** experiencia ANTES que proyectos. Los recruiters
   escanean experiencia primero; casi todos los portafolios lo hacen al revés.
3. **Badge de disponibilidad** ("Disponible para trabajar") — señal directa de
   contratación, en el primer viewport.
4. **Rendimiento brutal**: Astro sin JS innecesario. Carga instantánea.
5. Chips de tecnología con iconos por proyecto — escaneables.

### Lo malo (brutal)
1. **Es una plantilla con 579 forks.** Imitarlo de cerca = tu portafolio se ve como
   el de otras 579 personas. Para tu objetivo ("destacar"), copiar su visual es un
   error fatal.
2. **Visualmente tímido.** No hay un solo momento memorable. A midudev le funciona
   porque SU marca es su nombre (2M+ seguidores); el diseño no necesita trabajar.
   Tú no tienes esa fama — tu diseño sí tiene que trabajar.
3. Columna única = no exhibe ningún criterio de composición/diseño. No demuestra
   craft de frontend.

### Veredicto
Roba sus **decisiones de contenido** (orden, brevedad, badge de disponibilidad),
ignora su **lenguaje visual**.

---

## 2. Eduardo Cabral — jackshaw32.dev (Portfolio-2026)

**Stack:** Astro v5 SSR + React 19 islands + Tailwind v4 + Redis + Lenis + GSAP +
View Transitions + **Vercel AI SDK + Groq (chatbot "EduBot")** + Resend. Vitest,
versionado v2.0.0, README con diagrama de arquitectura, design.md, AGENTS.md.

### Lo bueno (hay mucho)
1. **El repo ES parte del portafolio.** README con diagrama de arquitectura, sección
   de seguridad, tests con Vitest, versionado semántico. Esto es EXACTAMENTE lo que
   un ingeniero de Google respeta al abrir un repo. La lección más valiosa de todo
   este análisis.
2. **EduBot (chatbot IA real, bilingüe).** Diferenciador genuino: demuestra streaming,
   rate-limiting con Redis, prompt engineering y producto. Además es tema de
   conversación garantizado en entrevistas.
3. **Páginas de detalle por proyecto** (`/projects/x`) tipo case study: rol,
   decisiones, stack en negritas, "Ver detalle" + "Ver sitio", con View Transitions.
   Profundidad que una card nunca da.
4. **Métricas cuantificadas animadas** ("Sistemas en producción", "% performance",
   "% reducción de deuda técnica") — impacto medible, el lenguaje que hablan los
   recruiters técnicos.
5. **Sección de Feedback/testimonios** — prueba social, casi nadie la tiene.
6. **CV descargable persistente en el header** + EN/ES + theme toggle. Decisión
   correcta: el CTA de contratación siempre visible.

### Lo malo (brutal)
1. **Tipografía: Inter.** La fuente por defecto de todo sitio generado con IA en
   2024-2026. Cero identidad tipográfica. Un diseñador de Apple lo nota en 2 segundos.
2. **Hero genérico:** wash de gradiente rosa/violeta (la moda de hace 2 años) y un
   titular ("Construyendo productos web modernos y escalables") que podría ser de
   cualquier persona del planeta. Su NOMBRE no está en el H1 — está chiquito en la
   esquina. En un portafolio-CV, tu nombre es el producto.
3. **El robot mascota** puede leerse juguetón/junior ante un revisor conservador.
4. **Sobre-ingeniería de movimiento:** Lenis + GSAP + islands para lo que CSS y un
   IntersectionObserver hacen al 90%. Costo en JS/perf vs. el cero-JS de midudev.
5. **Fragilidad:** los contadores muestran "0+" y "0%" hasta que la animación corre
   (lo vi en vivo). Si el JS falla o alguien lee rápido, tus logros dicen CERO.
   Anti-patrón: el contenido nunca debe depender de la animación.

### Veredicto
Roba su **ingeniería y profundidad** (repo-como-evidencia, case studies, métricas,
testimonios, CV persistente), ignora su **estética** (Inter, gradiente, mascota).

---

## 3. Qué adoptamos para TU portafolio (sobre la base E + bento ya elegida)

| Feature | Decisión | Por qué / cómo |
|---|---|---|
| Orden: proof/experiencia temprano (midudev) | ✅ Adoptar | El proof strip de E ya va arriba; experiencia sube de posición. |
| Badge "Open to internships · SWE roles" (midudev) | ✅ Ya está | En la spec rail del hero de E; lo hacemos más visible (punto verde pulsante). |
| CV descargable persistente en nav (Eduardo) | ✅ Adoptar | Botón "CV ↓" siempre visible en la nav. |
| Repo-como-evidencia: README con arquitectura, CI, versionado (Eduardo) | ✅ Adoptar | Ya planeado (README + GitHub Actions); se suma versionado y sección de decisiones técnicas. |
| Páginas de detalle / case study por proyecto (Eduardo) | ✅ Adaptar | Versión estática: `projects/tgs-itm.html` etc., con capturas, rol, decisiones, métricas. View Transitions API nativa (CSS, sin librerías). |
| Contadores de métricas cuantificadas (Eduardo) | ✅ Adaptar (bien) | Count-up con IntersectionObserver, PERO con el número final en el HTML (sin JS se lee igual). Nada de "0%" fantasma. |
| Testimonios/Feedback (Eduardo) | 🟡 Fase 2 | Consigue 2-3 quotes reales (alumnos que entrenaste, profesores, organizador de OMICH). Sin quotes reales no se publica — inventarlos se nota. |
| Chatbot IA sobre tu CV (Eduardo) | 🟡 Fase 3 | Gran diferenciador y proyecto en sí mismo, pero requiere backend serverless (saldríamos de GitHub Pages o usaríamos Vercel functions aparte). NO bloquea el rediseño. Cuando toque: función edge + Claude/Groq + rate limit. |
| Lenis + GSAP (Eduardo) | ❌ No | CSS + IntersectionObserver + View Transitions nativas logran el efecto sin dependencias — y "cero dependencias" es parte de tu identidad de ingeniería. |
| Inter + gradiente rosa/violeta + mascota (Eduardo) | ❌ No | Genérico. Nuestra identidad E (Familjen Grotesk + Instrument Sans + JetBrains Mono, azul eléctrico único) es más distintiva. |
| Lenguaje visual de midudev | ❌ No | 579 forks. Verse como plantilla mata el objetivo. |

## 4. Conclusión

- **midudev gana en**: velocidad de lectura, foco en contratación. **Pierde en**: identidad.
- **Eduardo gana en**: profundidad de ingeniería, diferenciadores (IA, case studies, métricas). **Pierde en**: identidad visual genérica y sobre-ingeniería de movimiento.
- **Tu ventaja competitiva**: la identidad E + bento (que ninguno tiene) + la disciplina de contenido de midudev + la profundidad de ingeniería de Eduardo — con la historia única de ICPC/founder/coach que ninguno de los dos puede contar.
