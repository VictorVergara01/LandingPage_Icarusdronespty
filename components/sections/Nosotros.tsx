import Image from 'next/image';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const techCards = [
  {
    title: 'DJI Agras T50',
    value: '2 unidades',
    desc: '40 kg carga · 16 boquillas · RTK integrado',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    title: 'Generador D12500iE',
    value: 'DJI',
    desc: 'Autonomía de carga en campo sin red eléctrica',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: 'Certificados ANAC',
    value: 'Panamá',
    desc: 'Licencia vigente de operación de drones agrícolas',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'Icarus Platform',
    value: 'Portal Web',
    desc: 'Sistema digital para registro, solicitud e historial',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
];

const testimonials = [
  {
    quote: 'IcarusDrones transformó mi producción en arrozal. Completé una temporada entera con menos insumos y mejor rendimiento.',
    name: 'Juan Pérez',
    role: 'Productor Agrícola · Los Santos',
    img: '/images/team-victor.jpg',
  },
];

export function Nosotros() {
  return (
    <>
      {/* ── Nosotros ── */}
      <section
        id="nosotros"
        className="section-pad section-sep"
        style={{ backgroundColor: 'var(--dark)' }}
        aria-labelledby="nosotros-heading"
      >
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left */}
            <div>
              <RevealWrapper>
                <SectionEyebrow>Quiénes somos</SectionEyebrow>
                <h2
                  id="nosotros-heading"
                  className="font-serif font-bold mb-5 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text)' }}
                >
                  Nacidos en Azuero,<br />
                  <span className="text-gradient-green">construidos para el campo</span>
                </h2>
                <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                  <p>Somos una empresa panameña fundada en Las Tablas, Los Santos. Crecimos viendo la dureza del trabajo agrícola y decidimos traer tecnología de precisión al campo de Azuero.</p>
                  <p>Operamos con drones <strong style={{ color: 'var(--text)' }}>DJI Agras T50</strong> — la plataforma más avanzada de fumigación — con pilotos certificados por la Autoridad de Aeronáutica Civil de Panamá (ANAC).</p>
                  <p>Cada vuelo genera un reporte digital y el cobro es por las hectáreas realmente fumigadas, sin estimaciones ni sorpresas.</p>
                </div>
              </RevealWrapper>

              {/* Team card */}
              <RevealWrapper delay={150}>
                <div
                  className="mt-8 flex items-center gap-4 p-5 rounded-xl"
                  style={{ backgroundColor: 'var(--panel)', border: '1px solid rgba(0,204,53,0.18)' }}
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0" style={{ border: '2px solid rgba(0,204,53,0.4)' }}>
                    <Image src="/images/team-victor.jpg" alt="Víctor Vergara — Fundador Icarus Drones" fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Víctor Vergara</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--neon)' }}>Fundador &amp; Piloto Certificado ANAC</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-lt)' }}>Las Tablas, Los Santos, Panamá</p>
                  </div>
                </div>
              </RevealWrapper>
            </div>

            {/* Right: tech cards */}
            <div>
              <RevealWrapper delay={100}>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--neon)' }}>
                  Tecnología y certificaciones
                </p>
              </RevealWrapper>
              <div className="grid sm:grid-cols-2 gap-5">
                {techCards.map((card, i) => (
                  <RevealWrapper key={card.title} delay={100 + i * 80}>
                    <div className="card-dark p-6 h-full">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: 'rgba(0,204,53,0.1)', color: 'var(--neon)' }}
                      >
                        {card.icon}
                      </div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>{card.title}</p>
                      <p className="text-xs font-bold mb-1.5" style={{ color: 'var(--neon)' }}>{card.value}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-mid)' }}>{card.desc}</p>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonios ── */}
      <section
        className="section-pad section-sep"
        style={{ backgroundColor: 'var(--panel)' }}
        aria-labelledby="testimonios-heading"
      >
        <div className="container-xl">
          <RevealWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow>Testimonios</SectionEyebrow>
              <h2
                id="testimonios-heading"
                className="font-serif font-bold"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
              >
                Lo que dicen nuestros clientes
              </h2>
            </div>
          </RevealWrapper>

          <div className="max-w-2xl mx-auto">
            {testimonials.map((t, i) => (
              <RevealWrapper key={i} delay={i * 100}>
                <blockquote
                  className="card-dark p-10 relative"
                  cite={t.name}
                >
                  {/* Quote mark */}
                  <svg
                    className="absolute top-5 left-6 opacity-15"
                    width="40" height="30"
                    viewBox="0 0 40 30"
                    fill="var(--neon)"
                    aria-hidden="true"
                  >
                    <path d="M0 30V18C0 8 6 2 18 0l2 4C12 6 8 10 8 18v2h8v10H0zm22 0V18c0-10 6-16 18-18l2 4c-8 2-12 6-12 14v2h8v10H22z"/>
                  </svg>

                  <p className="text-base leading-relaxed mb-6 pt-4 italic" style={{ color: 'var(--text-mid)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0" style={{ border: '2px solid rgba(0,204,53,0.35)' }}>
                      <Image src={t.img} alt={t.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <cite className="not-italic font-semibold text-sm block" style={{ color: 'var(--text)' }}>{t.name}</cite>
                      <span className="text-xs" style={{ color: 'var(--text-lt)' }}>{t.role}</span>
                    </div>
                  </footer>
                </blockquote>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
