# 📘 Documentación: Flujo de Git/GitHub Profesional — Portafolio

## ¿Qué se hizo?

Se actualizó el portafolio web usando un **flujo de Git profesional** (GitHub Flow), creando **4 ramas y 4 Pull Requests**, cada una con un propósito específico. Este documento explica cada paso, cada comando, y el **por qué** detrás de cada decisión.

---

## La estrategia: GitHub Flow

```
main (siempre estable, nunca se trabaja directo aquí)
│
├── chore/organize-files       ← Mantenimiento (mover archivos)
├── feat/update-hero           ← Feature nueva (typing animation, CV button)
├── feat/experience-section    ← Feature nueva (sección Experience)
└── feat/update-about-contact  ← Actualización de contenido existente
```

### ¿Por qué no se trabajó directamente en `main`?

`main` es el código que **funciona**. Si algo sale mal en una rama, `main` sigue intacto. Es como tener un documento de Word guardado, y editar en una copia: si la copia se arruina, tienes tu original seguro.

### ¿Por qué no se usó rama `develop`?

- `develop` es del modelo **Git Flow**, diseñado para equipos grandes con releases formales (v1.0, v2.0).
- Para un portafolio personal, agrega complejidad sin beneficio.
- **GitHub Flow** (main + feature branches) es más simple y es el estándar en la industria moderna.

> **Regla:** Si no tienes staging/producción separados ni releases versionados, NO necesitas `develop`.

### ¿Por qué estos prefijos en los nombres?

| Prefijo  | Significado                             | Ejemplo                |
| -------- | --------------------------------------- | ---------------------- |
| `feat/`  | Funcionalidad nueva                     | `feat/update-hero`     |
| `fix/`   | Corrección de bug                       | `fix/navbar-mobile`    |
| `chore/` | Mantenimiento (no cambia funcionalidad) | `chore/organize-files` |
| `docs/`  | Solo documentación                      | `docs/update-readme`   |

---

## Paso 0: Verificación del entorno

### Comandos ejecutados:

```bash
git config --global user.name    # → Jose Roberto Garcia Correa
git config --global user.email   # → robertcgr.0x@gmail.com
git remote -v                    # → origin https://github.com/Robert0X/portfolio.git
git branch                       # → * main
```

### ¿Por qué verificar esto antes de empezar?

Porque si `user.name` o `user.email` están mal, todos tus commits quedarían con identidad incorrecta. Y si `origin` apunta al repo equivocado, harías push al lugar incorrecto. Es como verificar que tienes gasolina antes de un viaje.

---

## PR #1: `chore/organize-files`

**Objetivo:** Organizar archivos del proyecto en carpetas.

### Paso 1.1 — Ver el estado actual

```bash
git status
```

**¿Por qué?** `git status` es tu radar. Te dice **qué cambió** desde el último commit. Nunca hagas commit sin revisar primero qué vas a guardar.

### Paso 1.2 — Crear la rama

```bash
git checkout -b chore/organize-files
```

**¿Qué hace?**

- `checkout` = "moverme a"
- `-b` = "crear la rama primero porque no existe"
- Crea la rama Y te mueve a ella en un solo paso

**¿Por qué crear la rama ANTES de hacer commit?** Porque el commit queda en la rama donde estás. Si estás en `main`, el commit va a `main`. Queremos que vaya a la rama nueva.

### Paso 1.3 — Crear `.gitignore`

```
# Archivos de OS
.DS_Store
Thumbs.db
desktop.ini

# Archivos de editor
*.resolved
.vscode/

# Generados por herramientas IA
.gemini/
```

**¿Qué es `.gitignore`?** Le dice a Git qué archivos **ignorar**. Sin esto, Git rastrearía archivos basura del sistema operativo y del editor, ensuciando tu historial.

### Paso 1.4 — Agregar archivos al staging

```bash
git add -A
```

**¿Qué es el staging area?** Es la "caja" donde pones los archivos que quieres incluir en tu próximo commit. `git add -A` agrega **todo**: archivos nuevos, modificados y eliminados.

**¿Por qué existe el staging y no se commitea directo?** Porque a veces cambias 10 archivos pero solo quieres commitear 3. El staging te da ese control.

### Paso 1.5 — Verificar qué va en el commit

```bash
git status
```

**¿Por qué de nuevo?** Para confirmar que los archivos correctos están en staging (aparecen en verde). Es un checkpoint de seguridad antes de commitear.

### Paso 1.6 — Hacer el commit

```bash
git commit -m "chore: organize project files into context and docs folders"
```

**Anatomía del mensaje:**

- `chore:` → **Conventional Commits**. Le dice a cualquier persona qué tipo de cambio fue sin tener que abrir archivos.
- Mensaje en **inglés** → Convención de la industria.
- Describe **qué** se hizo, no cómo.

**¿Por qué importan los mensajes?** En 6 meses, si algo se rompe y haces `git log`:

- ❌ `"cambios"` → Inútil
- ✅ `"chore: organize files into folders"` → Claro, fue solo organización

### Paso 1.7 — Subir la rama a GitHub

```bash
git push -u origin chore/organize-files
```

**¿Qué hace `-u`?** Le dice a Git: "esta rama local está conectada con esta rama remota". Solo se usa la **primera vez** que subes una rama. Después solo `git push`.

### Paso 1.8 — Crear el Pull Request

```bash
gh pr create --title "..." --body "..."
```

**¿Qué es un PR?** Una solicitud formal para fusionar tu rama con `main`. En GitHub queda registrado:

- Qué archivos cambiaron y exactamente qué líneas
- Quién lo hizo y cuándo
- Comentarios de revisión (en equipos)

### Paso 1.9 — Hacer merge del PR

```bash
gh pr merge --merge --delete-branch
```

**¿Por qué `--merge`?** Hay 3 opciones:
| Opción | Qué hace | Cuándo usarlo |
|--------|----------|---------------|
| `--merge` | Conserva todos los commits + crea merge commit | Quieres historial completo |
| `--squash` | Aplasta todos los commits en uno | Muchos commits "WIP" |
| `--rebase` | Reescribe historial para que sea lineal | Más limpio pero avanzado |

**¿Por qué `--delete-branch`?** La rama ya cumplió su propósito. Borrarla no borra los commits (siguen en `main` y en el PR). Es limpieza.

### Paso 1.10 — Sincronizar main

```bash
git checkout main
git pull
```

**¿Por qué `git pull` después del merge?** El merge se hizo en GitHub (servidor), pero tu `main` local **no lo sabe**. `git pull` descarga los cambios del servidor a tu máquina.

---

## PR #2: `feat/update-hero`

**Objetivo:** Typing animation, botón Download CV, actualización del hero.

### Flujo (misma mecánica que PR #1):

```bash
git checkout main          # Asegurar que estoy en main
git pull                   # Descargar lo más reciente
git checkout -b feat/update-hero  # Crear nueva rama

# ... hacer cambios en index.html, style.css, main.js ...

git add -A                 # Agregar todo al staging
git commit -m "feat: add typing animation, Download CV button, ..."
git push -u origin feat/update-hero
gh pr create --title "..." --body "..."
gh pr merge --merge --delete-branch
git checkout main && git pull
```

### Cambios realizados:

1. **index.html**:
   - Meta description corregida ("World Finals" → "Mexico Finals 2025")
   - Link "Experience" agregado en nav desktop y mobile
   - Título estático reemplazado por elemento de typing animation
   - Botón Download CV con clase `hero__link--accent`
2. **css/style.css**:
   - `.hero__typing` — contenedor del typing con `min-height`
   - `.typing-text` — texto en font mono + color accent
   - `.typing-cursor` — cursor parpadeante con `@keyframes blink`
   - `.hero__link--accent` — botón azul sólido para Download CV
3. **js/main.js**:
   - Array `typingStrings` con 5 frases EN/ES
   - Función `typeEffect()` — escribe/borra carácter por carácter
   - Función `restartTyping()` — reinicia al cambiar idioma
   - `.exp-card` agregado al selector de scroll reveal

---

## PR #3: `feat/experience-section`

**Objetivo:** Nueva sección Experience con timeline visual.

### Cambios realizados:

1. **index.html**: Sección completa con 3 `exp-card`:
   - Instructor de Programación Competitiva (actual)
   - OMICH Coach
   - Fundador GAPC C120 (Mar 2022 – Dec 2023)
   - Contact cambiado de `section--alt` a `section` (Experience tomó el fondo alternado)
2. **css/style.css**: Timeline visual:
   - `.exp-card__dot` — circulito azul (`border-radius: 50%`)
   - `.exp-card__line` — línea vertical gris conectora
   - `.exp-card__header` — flex con título + fecha
   - Responsive: gap reducido en mobile

---

## PR #4: `feat/update-about-contact`

**Objetivo:** Actualizar contenido existente.

### Cambios realizados:

1. **About**: Semestre 5to → 6to, texto simplificado
2. **Skills**: Python agregado a la lista de lenguajes
3. **Contact**: LinkedIn con icono SVG agregado
4. **Competitive**:
   - ICPC achievement → "ICPC Mexico Finals 2025"
   - Founder/OMICH removidos (ahora en Experience)
   - Winter Coding Cup 2025 Organizer agregado con icono de estrella

---

## ¿Por qué se eliminan las ramas después del merge?

Las ramas son **punteros temporales** a commits. Cuando haces merge, **los commits se copian a `main`**. Borrar la rama borra el puntero, no los commits. Es como quitar los andamios después de construir una pared — la pared sigue ahí.

Además:

- El **PR queda en GitHub** con todo el historial para siempre
- Sin limpieza, después de 50 features tendrías 50 ramas muertas
- Si necesitas "resucitar" una rama borrada: `git reflog` → los commits siguen ahí

---

## El ciclo que se repite SIEMPRE

```
1. git checkout main        ← Pararte en main
2. git pull                 ← Descargar lo más reciente
3. git checkout -b rama     ← Crear rama nueva
4. (trabajar...)            ← Editar archivos
5. git add -A               ← Agregar al staging
6. git status               ← Verificar
7. git commit -m "tipo: mensaje"  ← Guardar con mensaje profesional
8. git push -u origin rama  ← Subir rama a GitHub
9. gh pr create             ← Crear Pull Request
10. gh pr merge             ← Merge + eliminar rama
11. git checkout main       ← Volver a main
12. git pull                ← Sincronizar
```

Este ciclo es **memoria muscular**. Se usa igual en Google, Meta, startups, y open source. La diferencia es solo qué código escribes en el paso 4.

---

## Historial final de Git

```
e41de11 Merge PR #4 — feat: update about, skills, contact, competitive
adc281f Merge PR #3 — feat: add Experience section with timeline
6425166 Merge PR #2 — feat: typing animation, Download CV, hero updates
752cc52 Merge PR #1 — chore: organize project files into folders
cddeb30 Initial commit: portfolio site
```

> Cada merge commit en `main` cuenta una historia. Cualquier persona puede leer este historial y entender exactamente qué pasó, cuándo, y por qué.
