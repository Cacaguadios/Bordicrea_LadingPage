# Bordicrea Landing Page

Landing page profesional para Bordicrea, una microempresa de bordados personalizados en Puebla. El sitio presenta servicios, productos destacados, catálogo filtrable, proceso de trabajo, testimonios, ubicación y llamadas a la acción por WhatsApp.

## Stack usado

- HTML5
- CSS3
- JavaScript puro
- CSS Grid
- Flexbox
- Media queries
- Animaciones CSS
- IntersectionObserver para animaciones al hacer scroll

No usa React, Vue, Angular, Vite, Bootstrap, Tailwind ni dependencias externas.

## Cómo abrir el proyecto

Abre el archivo `index.html` directamente en tu navegador.

También puedes usar una extensión como Live Server si quieres recarga automática durante edición, pero no es obligatorio.

## Estructura de carpetas

```txt
bordicrea-landing/
  index.html
  README.md
  assets/
    images/
      logo-bordicrea.svg
      work-shirts-set.webp
      work-pink-polo-logo.webp
      work-papas-cap.webp
      work-hoodie-white-symbol.webp
      work-blue-hoodie-character.webp
      work-polleria-polo.webp
      work-papas-shirt.webp
      work-baby-feet-blanket.webp
      work-christmas-apron.webp
      work-school-banner.webp
    icons/
  css/
    styles.css
  js/
    main.js
```

## Cómo desplegar

### Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel, selecciona `New Project`.
3. Importa el repositorio.
4. Usa `bordicrea-landing` como carpeta raíz si el repositorio contiene más carpetas.
5. No configures build command.
6. Publica el proyecto.

### Netlify

1. Sube el proyecto a GitHub.
2. En Netlify, selecciona `Add new site`.
3. Importa el repositorio.
4. Configura `bordicrea-landing` como base directory si es necesario.
5. Deja vacío el build command.
6. Usa `.` como publish directory si estás dentro de la carpeta del proyecto.

### GitHub Pages

1. Sube la carpeta `bordicrea-landing` al repositorio.
2. En GitHub, entra a `Settings > Pages`.
3. Selecciona la rama principal.
4. Si el sitio está en raíz, selecciona `/root`.
5. Si está dentro de una carpeta, mueve el contenido de `bordicrea-landing` a la raíz o configura el flujo de publicación correspondiente.

## Mantenimiento

- Los estilos principales están en `css/styles.css`.
- Las interacciones están en `js/main.js`.
- Las secciones del sitio están en `index.html`.
- Para agregar productos al catálogo, duplica una tarjeta `.catalog-card` y ajusta `data-category`, imagen, nombre, descripción y `data-product`.
- Para modificar colores, edita las variables dentro de `:root` en `css/styles.css`.

## Estado

Proyecto estático listo para abrir en navegador y desplegar en hosting estático.
