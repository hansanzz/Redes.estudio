# Redes.estudio — Evaluación domiciliaria de Informática

Sitio web estático (HTML, CSS y JavaScript puro, sin frameworks ni librerías)
sobre los 4 temas de la guía de Redes:

1. Topologías de red
2. Modelo OSI
3. Modelo TCP/IP
4. Direccionamiento IP

## Estructura del proyecto

```
evaluacion-redes/
├── index.html                → Portada con mapa de red interactivo y login demo
├── topologias.html           → Tema 1
├── modelo-osi.html           → Tema 2
├── modelo-tcpip.html         → Tema 3
├── direccionamiento-ip.html  → Tema 4
├── style.css                 → Todos los estilos del sitio
├── script.js                 → Toda la lógica JavaScript del sitio
└── README.md                 → Este archivo
```

No hay dependencias que instalar: es HTML, CSS y JS sin build, así que se puede
abrir directamente haciendo doble clic en `index.html`, o subirlo tal cual a
cualquiera de las siguientes plataformas.

---

## Opción 1: GitHub Pages (recomendada, gratis)

1. Creá una cuenta en [github.com](https://github.com) si todavía no tenés una.
2. Creá un repositorio nuevo (botón verde "New repository"). Pod ponerle de
   nombre, por ejemplo, `evaluacion-redes`. Marcalo como **público**.
3. Subí los 7 archivos de esta carpeta al repositorio. Podés hacerlo de dos formas:
   - **Desde la web de GitHub:** entrá al repositorio → botón "Add file" →
     "Upload files" → arrastrá los 7 archivos → "Commit changes".
   - **Desde la terminal (si tenés Git instalado):**
     ```bash
     cd evaluacion-redes
     git init
     git add .
     git commit -m "Primera entrega: evaluación de redes"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/evaluacion-redes.git
     git push -u origin main
     ```
4. En el repositorio, andá a **Settings → Pages** (en el menú de la izquierda).
5. En "Branch", elegí `main` y la carpeta `/ (root)`. Guardá.
6. Esperá uno o dos minutos. GitHub te va a mostrar una URL parecida a:
   `https://TU-USUARIO.github.io/evaluacion-redes/`
7. Esa es la dirección que vas a entregar. Se actualiza sola cada vez que subas
   cambios nuevos al repositorio.

---

## Opción 2: Netlify (arrastrar y soltar, sin cuenta de GitHub)

1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastrá la carpeta completa `evaluacion-redes` (con los 7 archivos adentro)
   a la zona indicada en la página.
3. Netlify sube el sitio automáticamente y te da una URL del tipo
   `https://nombre-al-azar.netlify.app`.
4. Opcional: creá una cuenta gratuita para poder editar el nombre del sitio y
   volver a subir cambios más adelante.

---

## Opción 3: Vercel

1. Entrá a [vercel.com](https://vercel.com) y creá una cuenta (podés usar tu
   cuenta de GitHub para entrar más rápido).
2. Si ya subiste el proyecto a GitHub (Opción 1), en Vercel elegí
   "Add New... → Project" y seleccioná el repositorio `evaluacion-redes`.
3. Como es un sitio estático, no hace falta configurar nada especial: dejá los
   valores por defecto y hacé clic en "Deploy".
4. Vercel te va a dar una URL del tipo `https://evaluacion-redes.vercel.app`.

---

## Notas para la entrega

- El formulario de login de la portada es **solo una demostración visual**:
  no hay servidor ni base de datos detrás, valida los campos con JavaScript
  y muestra un `alert()` de confirmación.
- La calculadora de clase de IP (en la página de Direccionamiento IP) permite
  probar tanto escribiendo en un campo de texto como con una ventana emergente
  (`prompt()`), para que se vea el uso de distintas formas de interacción con
  el usuario.
- El sitio es responsive: se probó el comportamiento en pantallas de
  escritorio, tablet y celular (el menú se convierte en un botón hamburguesa
  por debajo de los 700px de ancho).
