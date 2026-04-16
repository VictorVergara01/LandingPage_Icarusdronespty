# Icarus Drones — Guía de Assets (Imágenes y Videos)

Todos los archivos estáticos van dentro de la carpeta `public/`.  
Next.js los sirve automáticamente desde la raíz `/`.  
Ejemplo: el archivo `public/images/gal-fumigacion.jpg` se accede como `/images/gal-fumigacion.jpg`.

---

## Estructura de carpetas

```
public/
├── images/          ← todas las imágenes del sitio
│   ├── gal-fumigacion.jpg    ✅ existe
│   ├── gal-t50-arroz.jpg     ✅ existe
│   ├── gal-atardecer.jpg     ✅ existe
│   ├── gal-tractor.jpg       ✅ existe
│   ├── gal-piloto.jpg        ✅ existe
│   ├── og-image.jpg          ✅ existe
│   └── team-victor.jpg       ✅ existe
└── videos/          ← videos del sitio
    └── hero.mp4              ❌ falta (el hero funciona sin él, pero mejora el fondo)
```

---

## Imágenes — detalle por archivo

### `public/images/gal-fumigacion.jpg`
| | |
|---|---|
| **Usada en** | Servicios (tarjeta "Fumigación Inteligente") · Galería · Hero (poster del video) |
| **Qué debe mostrar** | Drone DJI Agras T50 en pleno vuelo fumigando un cultivo |
| **Tamaño recomendado** | 1200 × 800 px mínimo |
| **Formato** | JPG, calidad 85 % |

---

### `public/images/gal-t50-arroz.jpg`
| | |
|---|---|
| **Usada en** | Servicios (tarjeta "Monitoreo de Cultivos") · Galería |
| **Qué debe mostrar** | Vista frontal o cenital del T50 sobre campo de arroz verde |
| **Tamaño recomendado** | 1200 × 800 px mínimo |
| **Formato** | JPG, calidad 85 % |

---

### `public/images/gal-atardecer.jpg`
| | |
|---|---|
| **Usada en** | Servicios (tarjeta "Mapas y Análisis NDVI") · Galería |
| **Qué debe mostrar** | Drone o campo agrícola con cielo de atardecer en Azuero |
| **Tamaño recomendado** | 1200 × 800 px mínimo |
| **Formato** | JPG, calidad 85 % |

---

### `public/images/gal-tractor.jpg`
| | |
|---|---|
| **Usada en** | Galería |
| **Qué debe mostrar** | Campo agrícola al amanecer, lomas de Los Santos — puede incluir maquinaria |
| **Tamaño recomendado** | 1200 × 800 px mínimo |
| **Formato** | JPG, calidad 85 % |

---

### `public/images/gal-piloto.jpg`
| | |
|---|---|
| **Usada en** | Servicios (tarjeta "Asesoría Tecnológica") · Galería |
| **Qué debe mostrar** | Piloto certificado ANAC con control remoto en campo, equipo visible |
| **Tamaño recomendado** | 1200 × 800 px mínimo |
| **Formato** | JPG, calidad 85 % |

---

### `public/images/team-victor.jpg`
| | |
|---|---|
| **Usada en** | Sección "Nosotros" (tarjeta del fundador) · Sección "Testimonios" (foto del cliente) |
| **Qué debe mostrar** | Foto de perfil de Víctor Vergara, fondo limpio o en campo |
| **Tamaño recomendado** | 400 × 400 px (imagen cuadrada, se recorta en círculo) |
| **Formato** | JPG, calidad 90 % |
| **Nota** | Esta imagen aparece como foto de cliente en el testimonio — reemplazar la del testimonio por una foto de un cliente real cuando esté disponible |

---

### `public/images/og-image.jpg`
| | |
|---|---|
| **Usada en** | Meta tags Open Graph y Twitter Card (previsualización al compartir en redes) |
| **Qué debe mostrar** | Logo Icarus Drones + tagline + imagen del drone, fondo oscuro de marca |
| **Tamaño obligatorio** | **1200 × 630 px exactos** (estándar OG) |
| **Formato** | JPG, calidad 90 % |
| **Importante** | Si no existe o está en blanco, las redes sociales mostrarán una previsualización vacía |

---

## Video

### `public/videos/hero.mp4`
| | |
|---|---|
| **Usado en** | Hero — fondo de video a 20 % de opacidad (solo en desktop) |
| **Qué debe mostrar** | Drone volando sobre campo, toma aérea de Azuero, o fumigación en acción |
| **Duración** | 10–30 segundos en loop (sin audio) |
| **Resolución** | 1920 × 1080 px |
| **Peso máximo** | 8 MB (comprimir con H.264, CRF 28) |
| **Estado** | ❌ Falta. Sin este archivo el hero igual funciona: muestra la imagen poster `gal-fumigacion.jpg` de fondo. |
| **Cómo comprimir** | `ffmpeg -i original.mp4 -vcodec libx264 -crf 28 -preset slow -an -vf scale=1920:1080 hero.mp4` |

---

## Recomendaciones generales

### Nomenclatura
- Usa siempre minúsculas y guiones: `gal-fumigacion.jpg` ✅ — `Gal Fumigacion.JPG` ❌
- El nombre debe coincidir **exactamente** con lo que está en el código (incluyendo extensión)

### Optimización
- Comprimir imágenes antes de subir: usa [Squoosh](https://squoosh.app) o `sharp`
- Para JPG de galería (800–1200px ancho), apuntar a **menos de 200 KB por imagen**
- Para `og-image.jpg` (1200×630), apuntar a **menos de 150 KB**

### Dónde agregar imágenes nuevas
Si en el futuro agregas imágenes a nuevas secciones, crea el archivo en `public/images/` y referencialo en el componente así:

```tsx
import Image from 'next/image';

// dentro del JSX:
<Image
  src="/images/nombre-del-archivo.jpg"
  alt="Descripción de la imagen"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Next.js optimiza automáticamente las imágenes (WebP, lazy load, responsive sizing) cuando usas el componente `<Image>`.

---

## Resumen de estado actual

| Archivo | Ruta | Estado |
|---|---|---|
| Fumigación en vuelo | `public/images/gal-fumigacion.jpg` | ✅ Existe |
| T50 sobre arroz | `public/images/gal-t50-arroz.jpg` | ✅ Existe |
| Atardecer campo | `public/images/gal-atardecer.jpg` | ✅ Existe |
| Campo / tractor | `public/images/gal-tractor.jpg` | ✅ Existe |
| Piloto en campo | `public/images/gal-piloto.jpg` | ✅ Existe |
| Open Graph social | `public/images/og-image.jpg` | ✅ Existe |
| Foto fundador | `public/images/team-victor.jpg` | ✅ Existe |
| Video hero | `public/videos/hero.mp4` | ❌ Falta |
