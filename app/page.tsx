import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Servicios } from '@/components/sections/Servicios';
import { ComoFunciona } from '@/components/sections/ComoFunciona';
import { Cobertura } from '@/components/sections/Cobertura';
import { Galeria } from '@/components/sections/Galeria';
import { Nosotros } from '@/components/sections/Nosotros';
import { Portal } from '@/components/sections/Portal';
import { Contacto } from '@/components/sections/Contacto';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Servicios />
        <ComoFunciona />
        <Cobertura />
        <Galeria />
        <Nosotros />
        <Portal />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
