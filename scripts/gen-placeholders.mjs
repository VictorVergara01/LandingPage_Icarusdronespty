import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function buildSvg({ width, height, bg1, bg2, label, sublabel, icon }) {
  const cx = width / 2, cy = height / 2;
  const fs = Math.max(18, Math.min(32, width / 16));
  const ss = Math.max(12, fs * 0.58);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
    <radialGradient id="r" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(0,204,53,0.12)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect width="${width}" height="${height}" fill="url(#r)"/>
  <!-- Grid -->
  <pattern id="p" width="36" height="36" patternUnits="userSpaceOnUse">
    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(0,204,53,0.06)" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#p)"/>
  <!-- Glow circle -->
  <circle cx="${cx}" cy="${cy - fs * 0.8}" r="${Math.min(width, height) * 0.22}" fill="rgba(0,204,53,0.07)" filter="url(#glow)"/>
  <circle cx="${cx}" cy="${cy - fs * 0.8}" r="${Math.min(width, height) * 0.13}" fill="rgba(0,204,53,0.1)"/>
  <!-- Icon -->
  <text x="${cx}" y="${cy - fs * 0.3}" font-size="${fs * 1.8}" text-anchor="middle" dominant-baseline="middle" fill="rgba(0,204,53,0.6)">${icon}</text>
  <!-- Label -->
  <text x="${cx}" y="${cy + fs * 1.5}" font-family="Georgia,serif" font-size="${fs}" font-weight="700" text-anchor="middle" fill="rgba(34,255,85,0.85)" letter-spacing="0.5">${label}</text>
  <!-- Sublabel -->
  <text x="${cx}" y="${cy + fs * 1.5 + ss * 1.7}" font-family="Arial,sans-serif" font-size="${ss}" text-anchor="middle" fill="rgba(154,184,154,0.6)">${sublabel}</text>
  <!-- Neon bottom bar -->
  <rect x="0" y="${height - 3}" width="${width}" height="3" fill="rgba(0,204,53,0.5)"/>
  <rect x="0" y="0" width="${width}" height="2" fill="rgba(0,204,53,0.2)"/>
  <!-- Corner brackets -->
  <path d="M10,10 L10,24 M10,10 L24,10" stroke="rgba(0,204,53,0.4)" stroke-width="2" fill="none"/>
  <path d="M${width-10},10 L${width-10},24 M${width-10},10 L${width-24},10" stroke="rgba(0,204,53,0.4)" stroke-width="2" fill="none"/>
  <path d="M10,${height-10} L10,${height-24} M10,${height-10} L24,${height-10}" stroke="rgba(0,204,53,0.4)" stroke-width="2" fill="none"/>
  <path d="M${width-10},${height-10} L${width-10},${height-24} M${width-10},${height-10} L${width-24},${height-10}" stroke="rgba(0,204,53,0.4)" stroke-width="2" fill="none"/>
</svg>`;
}

const images = [
  { file: 'gal-fumigacion.jpg', width: 1400, height: 900,  bg1: '#030D03', bg2: '#0A1A0A', label: 'Fumigación Agrícola',    sublabel: 'DJI Agras T50 · Azuero, Panamá',  icon: '✈' },
  { file: 'gal-t50-arroz.jpg',  width: 1000, height: 700,  bg1: '#051205', bg2: '#0A1F0A', label: 'DJI Agras T50',          sublabel: 'Sobre arrozal · Los Santos',       icon: '🌾' },
  { file: 'gal-atardecer.jpg',  width: 800,  height: 600,  bg1: '#0A0D05', bg2: '#141A05', label: 'Atardecer en Azuero',    sublabel: 'Silueta · Vuelo vespertino',       icon: '🌅' },
  { file: 'gal-tractor.jpg',    width: 800,  height: 600,  bg1: '#050D05', bg2: '#0A1A08', label: 'Campo Las Tablas',        sublabel: 'Amanecer dorado · Los Santos',     icon: '🚜' },
  { file: 'gal-piloto.jpg',     width: 800,  height: 600,  bg1: '#030A03', bg2: '#071407', label: 'Piloto Certificado',      sublabel: 'ANAC Panamá · Operación T50',      icon: '👨‍✈️' },
  { file: 'team-victor.jpg',    width: 400,  height: 400,  bg1: '#050D05', bg2: '#0C1A0C', label: 'Víctor Vergara',          sublabel: 'Fundador · Icarus Drones',         icon: '👤' },
  { file: 'og-image.jpg',       width: 1200, height: 630,  bg1: '#030805', bg2: '#0A1A0A', label: 'Icarus Drones',           sublabel: '$20/ha · Fumigación Aérea · Azuero, Panamá', icon: '✈' },
];

async function main() {
  let ok = 0;
  for (const img of images) {
    const svg = buildSvg(img);
    const out = join(root, 'public', 'images', img.file);
    try {
      await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
      console.log(`✓  ${img.file}`);
      ok++;
    } catch (err) { console.error(`✗  ${img.file}:`, err.message); }
  }
  console.log(`\n${ok}/${images.length} imágenes generadas`);
}
main();
