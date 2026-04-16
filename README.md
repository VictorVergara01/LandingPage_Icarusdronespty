# Icarus Drones — Landing Page

Landing page oficial de **Icarus Drones**, servicio de fumigación agrícola con drones DJI Agras T50 en la Península de Azuero, Panamá.

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 15 | Framework principal (App Router) |
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos utilitarios |
| [shadcn/ui](https://ui.shadcn.com) | 4.2 | Componentes de formulario (Base UI) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Dark / Light mode |
| [react-hook-form](https://react-hook-form.com) | 7 | Formulario de contacto |
| [class-variance-authority](https://cva.style) | 0.7 | Variantes de botones |

---

## Cómo correr el proyecto

### Requisitos
- Node.js 20 o superior
- npm

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/VictorVergara01/LandingPage_Icarusdronespty.git
cd LandingPage_Icarusdronespty

# 2. Instalar dependencias
npm install

# 3. Correr en modo desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Otros comandos

```bash
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Verificar errores de linting
```

---

## Estructura del proyecto

```
├── app/
│   ├── globals.css          # Tokens de diseño (CSS variables), keyframes, utilidades
│   ├── layout.tsx           # Root layout, fuentes, metadata SEO, ThemeProvider
│   ├── page.tsx             # Página principal (ensambla todas las secciones)
│   └── api/
│       └── contact/         # API route para el formulario de contacto
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx          # Barra de navegación fija + toggle dark/light + menú móvil
│   │   ├── Footer.tsx       # Pie de página
│   │   └── ThemeProvider.tsx # Proveedor de tema (next-themes)
│   │
│   ├── sections/            # Una sección por componente, en orden de aparición:
│   │   ├── Hero.tsx         # Hero con video bg, aurora blobs, HUD card, counters
│   │   ├── TrustBar.tsx     # Barra de confianza (DJI · ANAC · Base · Reporte · 24h)
│   │   ├── Servicios.tsx    # 4 tarjetas de servicio + banda de precio $20/ha
│   │   ├── ComoFunciona.tsx # Stats animados + 4 pasos del proceso
│   │   ├── Nosotros.tsx     # Historia de la empresa + tech cards + testimonios
│   │   ├── Cobertura.tsx    # Mapa SVG de Azuero + lista de zonas activas
│   │   ├── Galeria.tsx      # Galería de fotos en grid
│   │   ├── Portal.tsx       # Portal web y app Android (próximamente)
│   │   └── Contacto.tsx     # Formulario de cotización + info de contacto + WhatsApp
│   │
│   └── ui/                  # Componentes reutilizables
│       ├── button.tsx       # Botón shadcn (variantes: default, neon, gold, outline-neon)
│       ├── input.tsx        # Input shadcn
│       ├── label.tsx        # Label shadcn
│       ├── select.tsx       # Select shadcn
│       ├── textarea.tsx     # Textarea shadcn
│       ├── Badge.tsx        # Badge "disponible" / "próximo"
│       ├── RevealWrapper.tsx # Animación de entrada al hacer scroll (IntersectionObserver)
│       └── SectionEyebrow.tsx # Etiqueta pequeña verde encima de los títulos de sección
│
├── lib/
│   └── utils.ts             # Función cn() (clsx + tailwind-merge)
│
├── public/
│   ├── images/              # ← AQUÍ van todas las imágenes (ver docs/ASSETS.md)
│   └── videos/              # ← AQUÍ va el video del hero (ver docs/ASSETS.md)
│
└── docs/
    └── ASSETS.md            # Guía detallada de imágenes y videos requeridos
```

---

## Secciones de la página

| # | Sección | ID | Descripción |
|---|---|---|---|
| 1 | Hero | `#hero` | Pantalla completa con video, animaciones y HUD card |
| 2 | TrustBar | — | Barra de iconos de confianza |
| 3 | Servicios | `#servicios` | 4 servicios + precio $20/ha |
| 4 | Cómo Funciona | `#como-funciona` | Stats animados + 4 pasos |
| 5 | Nosotros | `#nosotros` | Historia + equipo + testimonio |
| 6 | Cobertura | `#cobertura` | Mapa de Azuero + zonas activas |
| 7 | Galería | — | Grid de fotos del trabajo en campo |
| 8 | Portal | — | Portal web y app (próximamente) |
| 9 | Contacto | `#contacto` | Formulario de cotización + WhatsApp |

---

## Dark / Light Mode

El sitio soporta tema oscuro y claro.

- El toggle está en la barra de navegación (icono sol/luna)
- En **desktop**: a la derecha del botón "Cotizar gratis"
- En **móvil**: junto al menú hamburguesa, y dentro del menú desplegable con etiqueta "Claro / Oscuro"
- Detecta automáticamente la preferencia del sistema operativo
- La preferencia se guarda en `localStorage`

Los tokens de color están definidos en `app/globals.css`:
- `:root { }` — tema oscuro (por defecto)
- `html.light { }` — tema claro (overrides)

---

## Imágenes y videos

Todos los assets estáticos van en la carpeta `public/`.

Ver **[docs/ASSETS.md](docs/ASSETS.md)** para la guía completa con:
- Lista de todos los archivos requeridos
- Qué debe mostrar cada imagen
- Tamaños y formatos recomendados
- Estado actual (qué existe, qué falta)

### Resumen rápido

```
public/images/gal-fumigacion.jpg   ✅  Drone fumigando cultivo
public/images/gal-t50-arroz.jpg    ✅  T50 sobre arroz
public/images/gal-atardecer.jpg    ✅  Campo al atardecer
public/images/gal-tractor.jpg      ✅  Campo al amanecer
public/images/gal-piloto.jpg       ✅  Piloto en campo
public/images/og-image.jpg         ✅  Imagen para redes sociales (1200×630 px)
public/images/team-victor.jpg      ✅  Foto del fundador
public/videos/hero.mp4             ❌  Video de fondo del hero (opcional)
```

---

## Variables de entorno

El proyecto no requiere variables de entorno para correr localmente.

Si en el futuro se conecta un servicio de email para el formulario, crear un archivo `.env.local` en la raíz:

```env
# Ejemplo (no requerido aún)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=info@icarusdronespty.com
```

---

## Despliegue

El proyecto está listo para desplegarse en **Vercel** (recomendado para Next.js).

```bash
# Opción 1: mediante Vercel CLI
npx vercel

# Opción 2: conectar el repositorio en vercel.com
# → Import Project → GitHub → VictorVergara01/LandingPage_Icarusdronespty
```

No se requiere ninguna configuración adicional. Vercel detecta Next.js automáticamente.
