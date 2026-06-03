# Bordicrea Landing Page

Landing page oficial de Bordicrea, enfocada en mostrar servicios de bordado personalizado y convertir visitas en cotizaciones por WhatsApp.

## Demo

Repositorio: https://github.com/Cacaguadios/Bordicrea_LadingPage.git

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- Assets optimizados con formatos AVIF, WebP y PNG fallback

## Caracteristicas

- Diseno responsive para desktop y mobile.
- Menu movil accesible (ARIA, cierre con `Escape`, cierre por clic externo, control de foco).
- SEO tecnico: `canonical`, Open Graph, Twitter Cards y JSON-LD (`LocalBusiness`).
- Rendimiento mejorado con `picture`, `srcset`, `sizes`, `loading`, `decoding` y `fetchpriority` en la imagen principal.
- Fallback sin JavaScript para evitar contenido oculto.

## Estructura del proyecto

```text
.
├── assets/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Desarrollo local

Puedes abrir `index.html` directamente o usar un servidor estatico:

```bash
npx http-server . -p 4173
```

Luego visita:

- http://127.0.0.1:4173

## Despliegue en Azure Static Web Apps

1. Sube este repositorio a GitHub.
2. En Azure, crea un recurso **Static Web App**.
3. Conecta el repositorio `Cacaguadios/Bordicrea_LadingPage`.
4. Configura:
   - App location: `/`
   - API location: *(vacío)*
   - Output location: `/`
5. Guarda y deja que GitHub Actions haga el deploy automatico.

## Licencia

Uso interno/comercial de Bordicrea.
