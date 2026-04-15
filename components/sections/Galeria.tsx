import Image from 'next/image';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const fotos = [
  { src: '/images/gal-fumigacion.jpg', alt: 'Drone DJI Agras T50 fumigando cultivo en Azuero, Panamá' },
  { src: '/images/gal-t50-arroz.jpg',  alt: 'Vista frontal del DJI Agras T50 sobre arroz verde' },
  { src: '/images/gal-atardecer.jpg',  alt: 'Silueta del drone al atardecer sobre las lomas de Azuero' },
  { src: '/images/gal-tractor.jpg',    alt: 'Campo agrícola al amanecer dorado en Los Santos' },
  { src: '/images/gal-piloto.jpg',     alt: 'Piloto certificado ANAC operando el T50 en campo' },
];

export function Galeria() {
  return (
    <section
      className="section-pad section-sep"
      style={{ backgroundColor: 'var(--panel)' }}
      aria-labelledby="galeria-heading"
    >
      <div className="container-xl">
        <RevealWrapper>
          <div className="text-center mb-10">
            <SectionEyebrow>Galería</SectionEyebrow>
            <h2
              id="galeria-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
            >
              El trabajo en campo
            </h2>
          </div>
        </RevealWrapper>

        {/* Mobile: stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
          {fotos.map((f, i) => (
            <RevealWrapper key={f.src} delay={i * 60}>
              <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '4/3', border: '1px solid rgba(0,204,53,0.12)' }}>
                <Image src={f.src} alt={f.alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" sizes="(max-width:640px)100vw,50vw" loading="lazy"/>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                  style={{ background: 'linear-gradient(0,rgba(3,8,5,.7) 0%,transparent 60%)' }}>
                  <p className="text-xs" style={{ color: 'rgba(0,204,53,.8)' }}>{f.alt}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Desktop: asymmetric grid */}
        <RevealWrapper>
          <div
            className="hidden lg:grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: '300px 240px',
            }}
          >
            {/* Large — 2 rows */}
            <div className="relative overflow-hidden rounded-xl" style={{ gridColumn: '1 / 8', gridRow: '1 / 3', border: '1px solid rgba(0,204,53,0.12)' }}>
              <Image src={fotos[0].src} alt={fotos[0].alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" sizes="58vw"/>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: 'linear-gradient(0,rgba(3,8,5,.7) 0%,transparent 50%)' }}>
                <p className="text-xs" style={{ color: 'rgba(0,204,53,.8)' }}>{fotos[0].alt}</p>
              </div>
            </div>
            {/* Row 1 col B */}
            <div className="relative overflow-hidden rounded-xl" style={{ gridColumn: '8 / 13', gridRow: '1 / 2', border: '1px solid rgba(0,204,53,0.12)' }}>
              <Image src={fotos[1].src} alt={fotos[1].alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" sizes="42vw" loading="lazy"/>
            </div>
            {/* Row 2 — 3 cols */}
            {fotos.slice(2).map((f) => (
              <div key={f.src} className="relative overflow-hidden rounded-xl" style={{ gridColumn: 'span 4', border: '1px solid rgba(0,204,53,0.12)' }}>
                <Image src={f.src} alt={f.alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" sizes="33vw" loading="lazy"/>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
