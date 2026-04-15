import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C1208',
};

export const metadata: Metadata = {
  title: 'Icarus Drones — Fumigación Agrícola con Drones en Azuero',
  description:
    'Servicio de fumigación aérea con drones DJI Agras T50 en Las Tablas, Chitré, Tonosí y toda la Península de Azuero, Panamá. Cotización gratis en menos de 24 h.',
  keywords: [
    'fumigación drones Panamá',
    'drones agrícolas Azuero',
    'fumigación aérea Las Tablas',
    'DJI Agras T50 Panamá',
    'fumigación agrícola Los Santos',
  ],
  openGraph: {
    title: 'Icarus Drones — Fumigación Aérea en Azuero',
    description: '$20/ha · Pilotos certificados ANAC · Desde Las Tablas, Panamá',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_PA',
    type: 'website',
    siteName: 'Icarus Drones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Icarus Drones — Fumigación Aérea en Azuero',
    description: '$20/ha · Pilotos certificados · Desde Las Tablas, Panamá',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://icarusdronespty.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PA" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
