import Image from 'next/image';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Badge } from '@/components/ui/Badge';

const servicios = [
  {
    num: '01',
    name: 'Fumigación Inteligente',
    desc: 'Aplicación de agroquímicos con boquillas de precisión, cobertura uniforme y registro digital.',
    badge: 'disponible' as const,
    img: '/images/gal-fumigacion.jpg',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    num: '02',
    name: 'Monitoreo de Cultivos',
    desc: 'Vuelos de inspección para detectar plagas, estrés hídrico y deficiencias nutricionales temprano.',
    badge: 'disponible' as const,
    img: '/images/gal-t50-arroz.jpg',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M1 6s1-1 4-1 5 2 8 2 5-1 5-1v14s-1 1-4 1-5-2-8-2-5 1-5 1z"/><line x1="1" y1="6" x2="1" y2="20"/></svg>,
  },
  {
    num: '03',
    name: 'Mapas y Análisis NDVI',
    desc: 'Imágenes multiespectrales para análisis del índice de vegetación y planificación de tratamientos.',
    badge: 'proximo' as const,
    img: '/images/gal-atardecer.jpg',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    num: '04',
    name: 'Asesoría Tecnológica',
    desc: 'Capacitación en uso del portal, interpretación de reportes y planificación de vuelos para tu finca.',
    badge: 'proximo' as const,
    img: '/images/gal-piloto.jpg',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
];

export function Servicios() {
  return (
    <section
      id="servicios"
      className="section-pad section-sep"
      style={{ backgroundColor: 'var(--dark)' }}
      aria-labelledby="servicios-heading"
    >
      <div className="container-xl">
        <RevealWrapper>
          <div className="text-center mb-14">
            <SectionEyebrow>Nuestros Servicios</SectionEyebrow>
            <h2
              id="servicios-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
            >
              Tecnología para cada etapa
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: 'var(--text-mid)' }}>
              Desde la fumigación hasta el análisis de datos, cubrimos todo el ciclo de tu cultivo.
            </p>
          </div>
        </RevealWrapper>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((s, i) => (
            <RevealWrapper key={s.num} delay={i * 90}>
              <article
                className="card-dark flex flex-col overflow-hidden h-full group"
                aria-label={`Servicio: ${s.name}`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  {/* Green overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(3,8,5,0.9) 100%)' }}
                  />
                  {/* Number */}
                  <span
                    className="absolute top-3 left-3 font-serif font-bold text-2xl opacity-60"
                    style={{ color: 'var(--neon)' }}
                  >
                    {s.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0,204,53,0.1)', color: 'var(--neon)' }}
                    >
                      {s.icon}
                    </div>
                    <Badge variant={s.badge} />
                  </div>
                  <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>
                    {s.name}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-mid)' }}>
                    {s.desc}
                  </p>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>

        {/* Price highlight */}
        <RevealWrapper delay={400}>
          <div
            className="mt-12 p-7 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background: 'linear-gradient(135deg, rgba(0,204,53,0.08) 0%, rgba(3,8,5,0) 100%)',
              border: '1px solid rgba(0,204,53,0.25)',
            }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--neon)' }}>Precio base</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif font-black" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: 'var(--gold)', lineHeight: 1 }}>$20</span>
                <span className="text-lg font-medium" style={{ color: 'var(--text-mid)' }}>/ hectárea</span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--text-lt)' }}>Cobro por la hectárea real volada · Reporte digital incluido</p>
            </div>
            <a href="#contacto" className="btn-neon shrink-0">
              Pedir cotización gratis
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
