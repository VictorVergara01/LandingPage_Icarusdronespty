# CLAUDE.md — Icarus Drones · Landing Page

## Contexto del proyecto

Landing page pública de **Icarus Drones** (icarusdronespty.com), empresa de fumigación agrícola con drones basada en Las Tablas, Los Santos, Panamá. El objetivo del sitio es convertir agricultores de Azuero en clientes — generar cotizaciones por WhatsApp o formulario.

El diseño ya está aprobado y existe como `index_final.html` (prototipo HTML/CSS vanilla). Este proyecto es su migración a Next.js con mejoras de rendimiento, SEO y mantenibilidad.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS v4
- **Tipografías:** Google Fonts — Playfair Display (serif, títulos) + Source Sans 3 (sans, cuerpo)
- **Animaciones:** CSS transitions + Intersection Observer (scroll reveal)
- **Formulario:** React Hook Form + envío a webhook n8n
- **Video:** HTML5 `<video>` nativo con lazy loading
- **Imágenes:** `next/image` con optimización automática
- **Deploy:** Vercel (dominio icarusdronespty.com via Cloudflare)

---

## Paleta de colores

```css
/* Definir en globals.css como variables CSS */
--soil:     #1C1208   /* fondo oscuro principal */
--earth:    #2E1F0A   /* secciones oscuras secundarias */
--bark:     #3D2B10   /* elementos hover / activos oscuros */
--straw:    #C4922A   /* acento dorado oscuro — CTAs, borders */
--gold:     #E8B84B   /* dorado principal — precios, highlights */
--gold-lt:  #F5D078   /* dorado claro — texto sobre fondo oscuro */
--sky:      #4A8FA3   /* azul cielo — badges "próximamente" */
--leaf:     #5A8A3C   /* verde campo — badges "disponible" */
--leaf-lt:  #7DB55A   /* verde claro */
--cream:    #F5EDD8   /* fondo claro principal */
--cream-dk: #D9C9A8   /* borders sobre fondo claro */
--white:    #FDFAF4   /* cards y superficies blancas */
--text:     #1C1208   /* texto principal */
--text-mid: #4A3820   /* texto secundario */
--text-lt:  #7A6448   /* texto muted */
```

---

## Estructura de archivos

```
icarus-landing/
├── CLAUDE.md
├── next.config.ts
├── tailwind.config.ts
├── package.json
│
├── public/
│   ├── videos/
│   │   ├── hero.mp4                  # DJI T50 sobrevolando potrero verde (hero bg)
│   │   ├── fumigacion.mp4            # Drone fumigando con nube de insumo
│   │   ├── piloto.mp4                # Piloto operando en campo
│   │   └── aerea.mp4                 # Vista aérea de parcela
│   └── images/
│       ├── gal-fumigacion.jpg        # Drone fumigando, montañas de fondo (galería 1, grande)
│       ├── gal-t50-arroz.jpg         # T50 de frente sobre arroz verde (galería 2)
│       ├── gal-atardecer.jpg         # Silueta drone atardecer sobre lomas (galería 3)
│       ├── gal-tractor.jpg           # Tractor al amanecer dorado (galería 4)
│       ├── gal-piloto.jpg            # Piloto operando T50 en campo (galería 5)
│       ├── team-victor.jpg           # Foto Víctor Vergara
│       └── og-image.jpg              # Open Graph image (1200×630)
│
├── app/
│   ├── layout.tsx                    # Root layout — fonts, metadata global
│   ├── globals.css                   # Variables CSS, reset, clases utilitarias
│   ├── page.tsx                      # Página principal (todas las secciones)
│   └── api/
│       └── contact/
│           └── route.ts              # POST → webhook n8n WhatsApp
│
└── components/
    ├── layout/
    │   ├── Nav.tsx                   # Navbar fija con scroll effect
    │   └── Footer.tsx
    ├── sections/
    │   ├── Hero.tsx                  # Video background + texto + stats card
    │   ├── TrustBar.tsx              # Barra de confianza (5 items)
    │   ├── Servicios.tsx             # Grid de servicios + precio destacado
    │   ├── ComoFunciona.tsx          # 4 pasos con línea conectora
    │   ├── Cobertura.tsx             # Mapa SVG Azuero + lista de zonas
    │   ├── Galeria.tsx               # Grid 5 fotos reales
    │   ├── Nosotros.tsx              # Texto + equipo + tech cards
    │   ├── Portal.tsx                # Cards de acceso cliente + app Android
    │   └── Contacto.tsx              # Datos de contacto + formulario
    └── ui/
        ├── RevealWrapper.tsx         # Intersection Observer scroll reveal
        ├── SectionEyebrow.tsx        # Label pequeño con línea
        └── Badge.tsx                 # Tags "Disponible" / "Próximamente"
```

---

## Secciones y contenido

### 1. Hero
- Video de fondo en loop silencioso: `public/videos/hero.mp4`
- Poster de fallback: `public/images/gal-fumigacion.jpg`
- Overlay oscuro con gradiente para legibilidad del texto
- Eyebrow: "🌾 Azuero, Panamá — Desde Las Tablas"
- Título H1 (Playfair Display 900): "Tu cosecha / merece la mejor / protección"
  - Segunda línea en `--gold`
  - Tercera línea en `#A8D878`
- Subtítulo: "Fumigación con drones agrícolas. Más cobertura, menos gasto de insumo, sin dañar el suelo."
- CTAs: "Pedir cotización gratis" (botón `--straw`) + "¿Cómo funciona?" (outline)
- Stats card (desktop only): +500 ha / 10× más rápido / 30% menos insumo

### 2. Trust Bar
Fondo `--earth`, borde superior 3px `--straw`. 5 items separados por divisores:
- ✈ DJI Agras T50
- 🛡 Pilotos certificados ANAC
- 📍 Base en Las Tablas
- 📋 Reporte por vuelo · cobro por ha real
- 📱 Cotización en menos de 24h

### 3. Servicios
Fondo `--white`. Grid de dos columnas: texto + caja de precio.
- **Precio destacado:** `$20` / por hectárea en caja `--earth`
- **Lista de servicios** (4 filas con número, nombre, descripción, badge):
  1. Fumigación agrícola — badge "Disponible"
  2. Fumigación intensiva — badge "Disponible"
  3. Análisis multiespectral (NDVI) — badge "Próximamente"
  4. Fotogrametría y levantamiento — badge "Próximamente"

### 4. Cómo funciona
Fondo `--earth` con grid de puntos. 4 pasos en círculos conectados:
1. Nos contactas
2. Recibís la cotización (< 24h)
3. Agendamos el vuelo
4. Reporte y cobro por ha real

### 5. Cobertura
Fondo `#F5EDD8`. Mapa SVG estilizado de la Península de Azuero (ya diseñado).
Zonas activas: Las Tablas (base), Chitré, Tonosí, Macaracas, Pesé/Guararé.
Próximamente: Aguadulce/Penonomé.
Nota de cierre: "¿Tu finca está fuera de la lista? Escríbenos igual."

### 6. Galería
Fondo `--white`. Grid asimétrico 12 columnas, 2 filas:
- Fila 1: gal-fumigacion (7 cols) + gal-t50-arroz (5 cols)
- Fila 2: gal-atardecer + gal-tractor + gal-piloto (4 cols cada una)
Todas con `object-fit: cover` y hover `scale(1.01)`.

### 7. Nosotros
Fondo `#FAF7F0`. Grid dos columnas: texto + tech cards.
- Texto: origen Las Tablas, DJI Agras T50, transparencia digital
- Equipo card: foto `team-victor.jpg` + "Víctor Vergara · Fundador"
- Tech cards (4): T50 specs / Generador D12500iE / ANAC / Sistema digital

### 8. Portal de clientes
Fondo `--earth`. Dos cards:
- **Card 1 (activa):** Portal web agricultor → `/portal/login`
  - Registrar parcelas GPS, solicitar fumigación, historial
- **Card 2 (dimmed):** App Android — próximamente
- Borde inferior degradado hoja→dorado→cielo

### 9. Contacto
Fondo `--cream`. Grid dos columnas: datos + formulario.
- Datos: Las Tablas / WhatsApp / info@icarusdronespty.com / horario
- Botón WhatsApp verde `#25D366`
- **Formulario** (campos): nombre, WhatsApp, ubicación finca, cultivo (select), hectáreas, mensaje
- Submit → `POST /api/contact` → n8n webhook

---

## Formulario de contacto — API route

```typescript
// app/api/contact/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  // Validar campos requeridos
  // Enviar a N8N_WEBHOOK_URL (env var)
  // Responder 200 o 400
}
```

Variables de entorno requeridas:
```env
N8N_WEBHOOK_URL=https://n8n.icarusdronespty.com/webhook/icarus-contact
N8N_WEBHOOK_SECRET=...
```

El webhook de n8n envía el mensaje a WhatsApp con los datos de la solicitud.

---

## SEO y metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Icarus Drones — Fumigación Agrícola con Drones en Azuero',
  description: 'Servicio de fumigación aérea con drones DJI Agras T50 en Las Tablas, Chitré, Tonosí y toda la Península de Azuero, Panamá. Cotización gratis.',
  keywords: ['fumigación drones Panamá', 'drones agrícolas Azuero', 'fumigación aérea Las Tablas', 'DJI Agras T50 Panamá'],
  openGraph: {
    title: 'Icarus Drones — Fumigación Aérea en Azuero',
    description: '$20/ha · Pilotos certificados · Desde Las Tablas, Panamá',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_PA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

---

## Componente RevealWrapper

```typescript
// components/ui/RevealWrapper.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

export function RevealWrapper({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </div>
  );
}
```

---

## Componente Hero — video background

```typescript
// components/sections/Hero.tsx
export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay muted loop playsInline
        poster="/images/gal-fumigacion.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Overlay oscuro */}
      <div className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(180deg,rgba(10,20,8,.45) 0%,rgba(10,20,8,.2) 40%,rgba(10,20,8,.55) 80%,rgba(10,20,8,.75) 100%)' }}
      />
      {/* Contenido */}
      <div className="relative z-20 ...">
        ...
      </div>
    </section>
  );
}
```

---

## Animación del navbar al hacer scroll

```typescript
// components/layout/Nav.tsx
'use client';
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
// Aplicar clase según scrolled para cambiar background/blur
```

---

## Performance — reglas importantes

- El video del hero va en `public/videos/hero.mp4`. NO usar base64 embebido.
- Todas las imágenes de galería usan `<Image>` de `next/image` con `sizes` apropiados.
- El video solo carga en desktop (`preload="none"` en mobile, mostrar poster estático).
- Lazy loading en galería: `loading="lazy"` en imágenes fuera del viewport inicial.
- Fuentes Google via `next/font/google` para evitar FOUT.
- `next/image` para el poster del hero y todas las fotos de galería.

```typescript
// app/layout.tsx — fuentes con next/font
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700','900'], variable: '--font-serif' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-sans' });
```

---

## Archivos multimedia a colocar en public/

Estos archivos ya existen como grabaciones originales. Renombrarlos y colocarlos en `public/`:

| Archivo original | Destino en public/ | Uso |
|---|---|---|
| `dji_fly_20250628_..._Trim.mp4` | `videos/hero.mp4` | Hero background (landscape 1280×720) |
| `IMG_1283.mp4` | `videos/fumigacion.mp4` | Opcional para sección galería |
| Frame de `IMG_1283.mp4` | `images/gal-fumigacion.jpg` | Galería slot 1 (grande) |
| Frame de `IMG_1342_-_Trim.mp4` | `images/gal-t50-arroz.jpg` | Galería slot 2 |
| Frame de `IMG_1443.mp4` | `images/gal-atardecer.jpg` | Galería slot 3 |
| Frame de `IMG_1242.mp4` | `images/gal-tractor.jpg` | Galería slot 4 |
| Frame de `IMG_1226_-_Trim.mp4` | `images/gal-piloto.jpg` | Galería slot 5 |
| Frame de `IMG_1226_-_Trim.mp4` | `images/team-victor.jpg` | Sección Nosotros |

---

## Comandos de desarrollo

```bash
# Instalar
npm create next-app@latest icarus-landing --typescript --tailwind --app --src-dir=false
cd icarus-landing

# Instalar dependencias adicionales
npm install react-hook-form

# Copiar archivos multimedia a public/videos/ y public/images/

# Desarrollo
npm run dev

# Build y verificar
npm run build && npm run start

# Deploy
vercel --prod
```

---

## Notas del negocio

- Precio actual: **$20/ha** fumigación estándar
- Equipo: DJI Agras T50 ×2, Generador DJI D12500iE
- Zona principal: Las Tablas, Los Santos — toda la Península de Azuero
- Contacto principal: WhatsApp (número a completar) + info@icarusdronespty.com
- El formulario debe enviar una notificación por WhatsApp al número del negocio vía n8n
- El enlace "Portal clientes" apunta a `/portal/login` — ruta que existirá cuando se implemente la app de gestión (proyecto separado: `icarus-platform`)
- La app de gestión (`icarus-platform`) vive en un subdominio o carpeta separada, **no** dentro de este proyecto de landing
- Idioma: español (Panamá) en todo el contenido
- No hay blog ni rutas adicionales en el MVP — es un one-pager

---

## Orden de implementación

1. Setup Next.js + Tailwind + fuentes
2. `globals.css` con variables CSS de paleta completa
3. `layout.tsx` con metadata SEO
4. Componente `Nav.tsx` con efecto scroll
5. Sección `Hero.tsx` con video background
6. Barra `TrustBar.tsx`
7. Sección `Servicios.tsx` con precio destacado
8. Sección `ComoFunciona.tsx` con pasos
9. Sección `Cobertura.tsx` con mapa SVG
10. Sección `Galeria.tsx` con fotos reales
11. Sección `Nosotros.tsx`
12. Sección `Portal.tsx`
13. Sección `Contacto.tsx` + formulario
14. `Footer.tsx`
15. API route `/api/contact` → n8n webhook
16. `RevealWrapper.tsx` + aplicar en todas las secciones
17. Ajustes responsive mobile
18. Optimización de imágenes y video
19. Deploy en Vercel + DNS Cloudflare
