import os

# --- Configuración ---
# Carpetas que el script IGNORARÁ por completo
IGNORE_DIRS = {
    '.git',
    '.vscode',
    '__pycache__',
    'Chapters'  # Ignoramos la carpeta generada por el build_script
}

# Archivos que el script IGNORARÁ
IGNORE_FILES = {
    '.DS_Store',
    'Book.tex',     # Ignoramos el .tex principal generado
    'Book.pdf',     # Ignoramos el PDF final
    'Book.log',
    'Book.aux',
    'Book.toc',
    'Book.out',
    os.path.basename(__file__) # Ignora este mismo script
}
# ---------------------


def generar_arbol(dir_path, nivel=0):
    """
    Función recursiva para imprimir el árbol de directorios y archivos.
    """
    indentacion = "│   " * nivel
    prefijo_archivo = indentacion + "├── 📄 "
    prefijo_carpeta = indentacion + "└── 📁 "

    try:
        # Obtenemos las entradas y las ordenamos
        entradas = os.listdir(dir_path)
        entradas.sort()
    except OSError as e:
        print(f"{indentacion}└── ⚠️ Error al leer: {e}")
        return

    archivos = []
    carpetas = []

    # Separamos archivos y carpetas
    for nombre in entradas:
        if os.path.isfile(os.path.join(dir_path, nombre)):
            if nombre not in IGNORE_FILES:
                archivos.append(nombre)
        else:
            if nombre not in IGNORE_DIRS:
                carpetas.append(nombre)

    # Imprimimos los archivos primero
    for nombre in archivos:
        print(f"{prefijo_archivo}{nombre}")

    # Luego imprimimos las carpetas y recursamos
    for i, nombre in enumerate(carpetas):
        es_ultimo = (i == len(carpetas) - 1)
        
        # El prefijo cambia si es el último elemento para un mejor formato
        if es_ultimo:
            prefijo_carpeta = indentacion + "└── 📁 "
        else:
            prefijo_carpeta = indentacion + "├── 📁 "

        print(f"{prefijo_carpeta}{nombre}/")
        
        # Ajustamos el prefijo de indentación para el siguiente nivel
        siguiente_indent = "    " * (nivel + 1) if es_ultimo else "│   " * (nivel + 1)
        
        # Corrección visual para que la recursión se alinee
        # Esta es una pequeña trampa de `generar_arbol`
        # Necesitamos saber si somos el último hijo para no dibujar el '│'
        
        # Vamos a re-hacer esta parte para que sea más simple y correcta
        generar_arbol_recursivo(os.path.join(dir_path, nombre), nivel + 1, es_ultimo)


def generar_arbol_recursivo(dir_path, nivel, es_ultimo_padre):
    """
    Función recursiva mejorada para imprimir el árbol.
    """
    # El prefijo de indentación para este nivel
    indentacion_base = "│   " * (nivel - 1)
    
    # Si el padre era el último, no ponemos '│', ponemos espacio.
    if nivel > 0:
        indentacion = indentacion_base + ("    " if es_ultimo_padre else "│   ")
    else:
        indentacion = ""

    try:
        entradas = os.listdir(dir_path)
        entradas.sort()
    except OSError as e:
        print(f"{indentacion}└── ⚠️ Error al leer: {e}")
        return

    archivos_y_carpetas = []
    for nombre in entradas:
        es_archivo = os.path.isfile(os.path.join(dir_path, nombre))
        if es_archivo and nombre not in IGNORE_FILES:
            archivos_y_carpetas.append((nombre, 'archivo'))
        elif not es_archivo and nombre not in IGNORE_DIRS:
            archivos_y_carpetas.append((nombre, 'carpeta'))

    # Imprimimos todos los elementos
    total_elementos = len(archivos_y_carpetas)
    for i, (nombre, tipo) in enumerate(archivos_y_carpetas):
        es_ultimo = (i == total_elementos - 1)
        prefijo = "└── " if es_ultimo else "├── "
        
        if tipo == 'archivo':
            print(f"{indentacion}{prefijo}📄 {nombre}")
        else:
            print(f"{indentacion}{prefijo}📁 {nombre}/")
            generar_arbol_recursivo(os.path.join(dir_path, nombre), nivel + 1, es_ultimo)


if __name__ == "__main__":
    ruta_raiz = "."
    print(f"📁 {os.path.abspath(ruta_raiz).split(os.sep)[-1]}/")
    # Inicia la versión mejorada de la recursión
    generar_arbol_recursivo(ruta_raiz, 0, False)