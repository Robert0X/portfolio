# 🚀 Guía Completa de Git y GitHub — Proyecto TGS-ITM

## **Para:** Todos los integrantes del equipo (Solo yo, pero concidera que es un proyecot en equipo para aprender el flujo de trabajo de git y github en equipo)

## Tabla de Contenido

1. [¿Qué es Git y GitHub?](#1-qué-es-git-y-github)
2. [Instalación](#2-instalación)
3. [Configuración inicial (solo una vez)](#3-configuración-inicial-solo-una-vez)
4. [Clonar el proyecto](#4-clonar-el-proyecto)
5. [Conceptos clave](#5-conceptos-clave)
6. [Flujo de trabajo diario](#6-flujo-de-trabajo-diario)
7. [Comandos esenciales (cheat sheet)](#7-comandos-esenciales-cheat-sheet)
8. [Ramas (branches)](#8-ramas-branches)
9. [Resolver conflictos](#9-resolver-conflictos)
10. [Buenas prácticas del equipo](#10-buenas-prácticas-del-equipo)
11. [Errores comunes y soluciones](#11-errores-comunes-y-soluciones)
12. [Glosario](#12-glosario)

---

## 1. ¿Qué es Git y GitHub?

**Git** = Sistema de control de versiones. Guarda un historial de TODOS los cambios que haces en tu código. Si algo se rompe, puedes volver atrás.

**GitHub** = Plataforma en la nube donde se almacena el repositorio. Permite que todos los integrantes trabajen en el mismo proyecto sin pisarse.

**Analogía:** Git es como el "Ctrl+Z infinito" para todo tu proyecto, y GitHub es como el Google Drive del código.

---

## 2. Instalación

### Git

1. Descarga Git desde: https://git-scm.com/downloads
2. Ejecuta el instalador
3. **Opciones importantes durante la instalación:**
   - Editor predeterminado: selecciona **Visual Studio Code**
   - Nombre de la rama inicial: selecciona **main**
   - El resto déjalo por defecto
4. Verifica que se instaló abriendo una terminal (PowerShell o CMD):

```bash
git --version
# Debe aparecer algo como: git version 2.51.2.windows.1
```

### GitHub CLI (opcional pero recomendado)

```bash
winget install --id GitHub.cli
```

Luego autentícate:

```bash
gh auth login
# Selecciona: GitHub.com → HTTPS → Login with a web browser
```

### VS Code (si no lo tienen)

Descarga desde: https://code.visualstudio.com/

---

## 3. Configuración inicial (solo una vez)

Abre una terminal y ejecuta estos 2 comandos con **TU** nombre y email:

```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu-email@ejemplo.com"
```

> ⚠️ Usa el **mismo email** que usaste para crear tu cuenta de GitHub.

### Configuraciones extra recomendadas

```bash
# Que la rama principal se llame "main" (no "master")
git config --global init.defaultBranch main

# Que VS Code sea tu editor de Git
git config --global core.editor "code --wait"

# Que guarde tus credenciales (no te las pide cada vez)
git config --global credential.helper manager
```

---

## 4. Clonar el proyecto

> Esto es lo que hace cada integrante del equipo para obtener el proyecto en su computadora.

```bash
# 1. Abre la terminal en la carpeta donde quieras tener el proyecto
# 2. Ejecuta:
git clone https://github.com/Robert0X/TGS-ITM.git

# 3. Entra a la carpeta del proyecto
cd TGS-ITM
```

¡Listo! Ya tienes todo el proyecto en tu máquina.

---

## 5. Conceptos clave

```
Tu computadora                              GitHub (nube)
┌──────────────────────────────────┐       ┌──────────────────┐
│                                  │       │                  │
│  📁 Working Directory            │       │  ☁️ Repositorio   │
│  (los archivos que ves y editas) │       │  Remoto (origin) │
│          │                       │       │                  │
│          │ git add               │       │                  │
│          ▼                       │       │                  │
│  📦 Staging Area                 │       │                  │
│  (archivos listos para commit)   │       │                  │
│          │                       │       │                  │
│          │ git commit            │       │                  │
│          ▼                       │       │                  │
│  📚 Repositorio Local            │       │                  │
│  (historial guardado en tu PC)   │──────►│                  │
│                                  │ push  │                  │
│                                  │◄──────│                  │
│                                  │ pull  │                  │
└──────────────────────────────────┘       └──────────────────┘
```

| Concepto              | Qué es                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| **Working Directory** | Los archivos en tu carpeta. Lo que ves en VS Code.                     |
| **Staging Area**      | Una "caja" donde metes los archivos que quieres guardar.               |
| **Commit**            | Una foto/snapshot del estado de tu proyecto en un momento dado.        |
| **Push**              | Subir tus commits a GitHub (para que los demás los vean).              |
| **Pull**              | Descargar los cambios que otros subieron desde GitHub.                 |
| **Branch**            | Una copia paralela del proyecto para trabajar sin afectar a los demás. |

---

## 6. Flujo de trabajo diario

### 🟢 El flujo que van a usar SIEMPRE:

```
1. PULL       ← Bajar lo más reciente de GitHub
2. EDITAR     ← Trabajar en tus archivos
3. ADD        ← Seleccionar qué archivos guardar
4. COMMIT     ← Guardar los cambios con un mensaje
5. PUSH       ← Subir los cambios a GitHub
```

### Paso a paso con comandos:

```bash
# PASO 1: Antes de empezar a trabajar, SIEMPRE baja lo más reciente
git pull

# PASO 2: Trabaja normalmente en tus archivos con VS Code...
# (edita, crea, borra archivos)

# PASO 3: Revisa qué archivos cambiaste
git status

# PASO 4: Agrega los archivos que quieres guardar
git add .
# (el punto "." significa "todos los archivos modificados")

# PASO 5: Haz el commit con un mensaje descriptivo
git commit -m "feat: agregar módulo de reservaciones"

# PASO 6: Sube tus cambios a GitHub
git push
```

### ⚠️ Regla de oro: SIEMPRE haz `git pull` antes de empezar a trabajar

---

## 7. Comandos esenciales (cheat sheet)

### 📋 Ver estado

```bash
git status              # ¿Qué archivos cambiaron?
git log --oneline -10   # Ver los últimos 10 commits
git diff                # Ver exactamente qué líneas cambiaron
```

### 📥 Descargar cambios

```bash
git pull                # Bajar cambios de GitHub
```

### 📤 Subir cambios

```bash
git add .                              # Agregar TODOS los archivos
git add archivo.txt                    # Agregar UN archivo específico
git commit -m "descripción del cambio" # Guardar con mensaje
git push                               # Subir a GitHub
```

### ↩️ Deshacer cosas

```bash
# Deshacer cambios en un archivo que NO has guardado (add)
git checkout -- archivo.txt

# Quitar un archivo del staging (lo agregaste con add pero te arrepentiste)
git restore --staged archivo.txt

# Deshacer el ÚLTIMO commit (mantiene los archivos)
git reset --soft HEAD~1
```

### 🌿 Ramas

```bash
git branch                    # Ver ramas
git branch nombre-rama        # Crear rama nueva
git checkout nombre-rama      # Cambiar a otra rama
git checkout -b nombre-rama   # Crear Y cambiar en un solo comando
git merge nombre-rama         # Fusionar una rama con la actual
```

---

## 8. Ramas (branches)

### ¿Para qué sirven?

Las ramas te permiten trabajar en una funcionalidad **sin afectar** el código principal. Cuando terminas, fusionas tu rama con `main`.

```
main:     ──●──●──●──────────────●── (código estable)
                  \              /
feature:           ●──●──●──●──●    (tu funcionalidad)
```

### Flujo recomendado para el equipo

```bash
# 1. Asegúrate de estar en main y actualizado
git checkout main
git pull

# 2. Crea tu rama con nombre descriptivo
git checkout -b feature/nombre-funcionalidad

# Ejemplos de nombres:
#   feature/crud-socios
#   feature/reservaciones
#   feature/dashboard
#   fix/error-login

# 3. Trabaja normalmente... edita archivos...

# 4. Guarda y sube tu rama
git add .
git commit -m "feat: implementar tabla de socios"
git push -u origin feature/nombre-funcionalidad

# 5. En GitHub, crea un Pull Request para fusionar a main
# (o desde terminal:)
gh pr create --title "Agregar tabla de socios" --body "Implementé el CRUD de socios"
```

### Estructura de ramas del proyecto

```
main              ← Código estable, funcional
├── feature/xxx   ← Funcionalidades nuevas
└── fix/xxx       ← Correcciones de bugs
```

---

## 9. Resolver conflictos

### ¿Cuándo pasan?

Cuando **dos personas editan la misma línea** del mismo archivo. Git no sabe cuál versión elegir.

### ¿Cómo se ven?

Al hacer `git pull` o `git merge`, Git te marcará los conflictos así:

```
<<<<<<< HEAD
Tu versión del código (lo que tú tenías)
=======
La versión del otro (lo que viene de GitHub)
>>>>>>> origin/main
```

### ¿Cómo resolverlos?

1. Abre el archivo en VS Code
2. VS Code te mostrará botones: **Accept Current** | **Accept Incoming** | **Accept Both**
   - **Accept Current** = Quedarte con tu versión
   - **Accept Incoming** = Usar la versión del otro
   - **Accept Both** = Dejar las dos (tú decides el orden)
3. Edita manualmente si ninguna opción es correcta
4. Guarda el archivo
5. Haz commit para confirmar la resolución:

```bash
git add .
git commit -m "fix: resolver conflicto en archivo X"
git push
```

### 💡 Tip para evitar conflictos

- **Siempre haz `git pull` antes de empezar a trabajar**
- Cada quien trabaje en **archivos diferentes** cuando sea posible
- Comuniquen en el grupo "estoy trabajando en X archivo"

---

## 10. Buenas prácticas del equipo

### Mensajes de commit

Usen este formato (Conventional Commits):

```
tipo: descripción corta en español

Tipos:
  feat:     Nueva funcionalidad
  fix:      Corrección de un error
  docs:     Cambios en documentación
  style:    Cambios de formato (no afectan el código)
  refactor: Reestructuración de código
  test:     Agregar o modificar tests
```

**Ejemplos buenos ✅:**

```
feat: agregar formulario de registro de socios
fix: corregir validación de fecha de renta vencida
docs: actualizar README con instrucciones de instalación
style: ajustar espaciado en tabla de reservaciones
```

**Ejemplos malos ❌:**

```
cambios
asdasd
fix
terminé
actualización
```

### Reglas del equipo

1. **NUNCA** trabajen directamente en `main` para cosas grandes → usen ramas
2. **SIEMPRE** hagan `git pull` antes de empezar a trabajar
3. **Commits pequeños y frecuentes** → no acumulen 50 cambios en un solo commit
4. **Mensajes descriptivos** → tu yo del futuro te lo agradecerá
5. **Comuniquen** en el grupo quién está trabajando en qué

---

## 11. Errores comunes y soluciones

### "No puedo hacer push"

```bash
# Probablemente alguien subió cambios antes que tú
# Solución: baja los cambios primero
git pull
# Si hay conflictos, resuélvelos (ver sección 9)
# Luego:
git push
```

### "Modifiqué archivos que no debía"

```bash
# Deshacer TODOS los cambios no guardados
git checkout -- .

# O deshacer un archivo específico
git checkout -- nombre-archivo.txt
```

### "Hice commit pero me equivoqué en el mensaje"

```bash
# Cambiar el mensaje del ÚLTIMO commit (solo si NO has hecho push)
git commit --amend -m "nuevo mensaje correcto"
```

### "Quiero ver quién cambió qué"

```bash
# Ver historial de un archivo específico
git log --oneline nombre-archivo.txt

# Ver quién escribió cada línea
git blame nombre-archivo.txt
```

### "Me sale 'fatal: not a git repository'"

Estás en la carpeta equivocada. Navega a la carpeta del proyecto:

```bash
cd "C:\ruta\a\tu\TGS-ITM"
```

### "Git me pide usuario y contraseña cada vez"

```bash
git config --global credential.helper manager
```

---

## 12. Glosario

| Término                | Significado                                           |
| ---------------------- | ----------------------------------------------------- |
| **Repositorio (repo)** | Tu proyecto con todo su historial de cambios          |
| **Clonar (clone)**     | Descargar un repo de GitHub a tu computadora          |
| **Commit**             | Un "guardado" con mensaje que describe qué cambiaste  |
| **Push**               | Subir tus commits locales a GitHub                    |
| **Pull**               | Descargar los commits de GitHub a tu computadora      |
| **Branch (rama)**      | Una línea paralela de desarrollo                      |
| **Merge**              | Fusionar una rama con otra                            |
| **Conflicto**          | Cuando dos personas editaron la misma línea           |
| **Pull Request (PR)**  | Solicitud para fusionar tu rama con main en GitHub    |
| **Origin**             | El nombre que Git le da a GitHub (el servidor remoto) |
| **HEAD**               | El commit en el que estás parado ahora mismo          |
| **Staging**            | El área intermedia entre editar y hacer commit        |
| **`.gitignore`**       | Archivo que lista qué archivos Git debe ignorar       |

---

## Resumen Visual — El Flujo Completo

```
                    TU COMPUTADORA                              GITHUB
              ┌────────────────────────┐              ┌──────────────────┐
              │                        │              │                  │
  Editar ──►  │  1. git pull           │◄─────────────│  Repo remoto     │
  archivos    │  2. (trabajar...)      │              │  (origin/main)   │
              │  3. git status         │              │                  │
              │  4. git add .          │              │                  │
              │  5. git commit -m "…"  │──────────────►                  │
              │  6. git push           │              │                  │
              │                        │              │                  │
              └────────────────────────┘              └──────────────────┘
```

---

> 💡 **¿Dudas?** Pregúntenle a la IA del proyecto o revisen la documentación oficial: https://git-scm.com/doc
