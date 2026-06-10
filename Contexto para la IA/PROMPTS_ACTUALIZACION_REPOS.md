# 🛠️ Prompts para profesionalizar los 3 repos del portafolio

> Generado el 2026-06-10. Un prompt por repositorio. Cada uno es autocontenido:
> incluye contexto, tareas concretas y criterios de calidad para que Claude Code
> no tenga que adivinar nada.

## Cómo usarlos

1. Abre una terminal **en la carpeta del repo correspondiente** (no en el portafolio):
   ```powershell
   cd C:\ruta\al\repo    # ej. cd C:\Users\joser\...\TGS-ITM
   claude
   ```
2. Copia y pega el prompt completo (todo el bloque) como primer mensaje.
3. Revisa el PR/commits que genere antes de hacer merge.

> **Orden recomendado:** TGS-ITM primero (es el que más impresiona y el que más
> limpieza necesita), luego studyvault, luego NoteBook-CP.

---

## 1️⃣ TGS-ITM — limpieza de raíz + README profesional

```text
Quiero profesionalizar este repositorio (github.com/Robert0X/TGS-ITM) porque va
enlazado desde mi portafolio y lo verán reclutadores de empresas top. Es un sistema
de gestión de actividades deportivas para el Club Social y Deportivo Morelia
(proyecto de Ingeniería de Software, TecNM), con Next.js 16 + React 19 + TypeScript
+ Tailwind 4 + Prisma 7 + PostgreSQL (Neon) + NextAuth v5, desarrollado por sprints.

Problema principal: la RAÍZ del repo está llena de archivos de contexto para IA
(CONTEXTO_IA.md, PROMPT_CONTEXTO.md, ERRORES_DETECTADOS.md, UltimosCambios.md,
README_IA.md, lista_tareas_sprint*.md, resumen_sprint2_con_guion_daily.md, etc.).
Un recruiter que entre ve eso antes que el código. NO quiero perder esos archivos
— son la memoria del proyecto — solo reubicarlos.

Tareas (explora el repo primero; trabaja en una rama y respeta husky/commitlint):

1. Crea `docs/contexto-ia/` y mueve ahí TODOS los archivos de contexto IA y de
   sprints de la raíz (usa `git mv` para conservar historial). Actualiza las rutas
   internas que se referencien entre ellos (README_IA.md apunta a varios).
2. Escribe un `README.md` NUEVO en la raíz, en inglés, nivel profesional:
   - Título + una línea que diga qué es y para quién.
   - Badges (Next.js, TypeScript, Prisma, PostgreSQL).
   - Sección de screenshots (deja los placeholders listos y dime qué capturas
     tomar, o tómalas tú con Playwright si el proyecto corre localmente).
   - Features principales (derívalas explorando `Codigo/app/`).
   - Stack con versiones (ya documentado en `Codigo/README.md`).
   - Cómo correrlo (resume el setup de `Codigo/README.md`, no lo dupliques:
     enlázalo como "detailed setup").
   - Metodología: desarrollo por sprints, con link a `docs/contexto-ia/`.
   - Sección de autores/créditos.
3. Verifica que `.env.example` exista y que NINGÚN secreto real esté commiteado
   (revisa historial de `.env` con git log -- '*.env*').
4. Ejecuta y corrige: lint y build si es posible (`npm run lint`, `npm run build`
   dentro de Codigo/) para confirmar que el repo está verde tal como lo verá quien
   lo clone.
5. Agrega topics al repo con gh:
   gh repo edit Robert0X/TGS-ITM --add-topic nextjs --add-topic typescript
   --add-topic prisma --add-topic postgresql --add-topic software-engineering
6. Al final dame un resumen de qué cambió y qué me toca a mí (ej. subir screenshots).

Criterio de calidad: que un ingeniero de Google que abra el repo entienda en 30
segundos qué es, qué stack usa y cómo correrlo — y que nada en la raíz parezca
"tarea generada con IA".
```

---

## 2️⃣ studyvault — README desde cero + reubicar el enunciado

```text
Quiero profesionalizar este repositorio (github.com/Robert0X/studyvault) porque va
enlazado desde mi portafolio y lo verán reclutadores. Es una plataforma de estudio
en PHP orientado a objetos con arquitectura MVC hecha a mano (controllers/models/
views + api/), PDO con consultas preparadas y MySQL. Tiene módulos de materias
(subjects), recursos (resources), flashcards y una sección de programación
competitiva (cp), con autenticación y sesiones.

Problemas actuales: (a) NO tiene README — lo primero que se ve es `descripcion.md`,
que es el ENUNCIADO de la tarea de la escuela, y eso resta seriedad; (b) el repo no
tiene description ni topics en GitHub.

Tareas (explora el código primero para verificar lo que afirmo; trabaja en una rama):

1. Mueve `descripcion.md` a `docs/especificacion-original.md` (con `git mv`).
2. Escribe un `README.md` profesional en la raíz, en inglés:
   - Qué es StudyVault en una línea (plataforma para organizar tu estudio:
     materias, recursos, flashcards y entrenamiento de programación competitiva).
   - Screenshots (corre el proyecto si es posible — necesita PHP + MySQL — o deja
     placeholders y dime exactamente qué capturas tomar).
   - Features por módulo (deriva la lista real leyendo los controllers y views).
   - Arquitectura: explica el MVC hecho a mano SIN framework — eso es un punto
     fuerte, no lo escondas: routing, controllers, models con PDO, views, api/.
   - Esquema de base de datos: hay studyvault.sql y migrations_v2/v3.sql —
     documenta cómo inicializar la BD y en qué orden.
   - Setup local paso a paso (XAMPP/PHP built-in server, .env.example, MySQL).
   - Sección de seguridad: PDO prepared statements, manejo de sesiones, y lo que
     encuentres (password_hash, validación) — los recruiters valoran que un
     proyecto PHP hable de seguridad explícitamente.
3. Revisa que `.env.example` no tenga credenciales reales y que ningún secreto
   esté commiteado.
4. Si MEJORAS.md y PLAN_IMPLEMENTACION.md son notas internas, muévelos a `docs/`.
5. Agrega description y topics:
   gh repo edit Robert0X/studyvault --description "Study platform — subjects,
   resources, flashcards & competitive programming training. Hand-rolled PHP MVC
   + PDO + MySQL" --add-topic php --add-topic mvc --add-topic mysql --add-topic
   pdo --add-topic education
6. Al final dame un resumen de qué cambió y qué me toca a mí.

Criterio de calidad: que quede claro que NO es un CRUD de tutorial — es una
arquitectura MVC construida desde cero con seguridad bien manejada.
```

---

## 3️⃣ NoteBook-CP — pulir lo que ya está bien

```text
Quiero terminar de profesionalizar este repositorio (github.com/Robert0X/NoteBook-CP)
porque va enlazado desde mi portafolio. Es un generador de PDF para notebooks de
ICPC: agregas algoritmos como archivos .cpp, corres `python build.py` y obtienes
un PDF imprimible con tabla de contenidos y resaltado de sintaxis (Python + LaTeX).
Ya tiene un README decente en español — partimos de buena base.

Tareas (explora el repo primero; trabaja en una rama):

1. README bilingüe: deja el inglés como principal (los recruiters de empresas top
   leen inglés) y conserva el español (sección o archivo README.es.md enlazado).
2. Agrega al README una imagen de ejemplo del PDF generado (una página del
   notebook renderizada como PNG en docs/img/) — es la prueba visual de que
   funciona. Si pdflatex está disponible, genera el PDF y extrae la captura;
   si no, dime cómo hacerlo yo.
3. Documenta la estructura: cómo organizar los .cpp por categorías y cómo aparece
   eso en la tabla de contenidos del PDF.
4. Agrega una licencia MIT (LICENSE) — sin licencia, técnicamente nadie puede
   usar el código, y los recruiters lo notan.
5. Crea un Release v1.0.0 en GitHub con el Book.pdf de ejemplo adjunto, para que
   cualquiera pueda ver el resultado sin instalar nada:
   gh release create v1.0.0 Book.pdf --title "NoteBook CP v1.0.0" --notes "..."
6. Agrega description y topics:
   gh repo edit Robert0X/NoteBook-CP --description "ICPC team notebook generator —
   drop in .cpp algorithms, get a print-ready PDF with ToC and syntax highlighting"
   --add-topic competitive-programming --add-topic icpc --add-topic latex
   --add-topic python --add-topic cpp
7. Al final dame un resumen de qué cambió y qué me toca a mí.

Criterio de calidad: que un competidor de ICPC que encuentre el repo pueda usarlo
en 5 minutos, y que un recruiter vea un proyecto terminado, con licencia y release.
```

---

## ✅ Checklist final (después de correr los 3 prompts)

- [ ] Los 3 repos tienen README en inglés con screenshots/evidencia visual.
- [ ] Los 3 tienen description y topics en GitHub.
- [ ] Ningún secreto/credencial commiteado.
- [ ] La raíz de TGS-ITM ya no muestra archivos de contexto IA.
- [ ] `descripcion.md` (enunciado escolar) ya no es lo primero en studyvault.
- [ ] NoteBook-CP tiene LICENSE y un release con el PDF de ejemplo.
- [ ] Verificar cómo se ven los 3 repos en modo incógnito (como los ve un recruiter).
