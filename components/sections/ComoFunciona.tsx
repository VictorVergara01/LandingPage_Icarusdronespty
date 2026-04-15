'use client';
import { useEffect, useRef, useState } from 'react';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/* ── Stats counter ── */
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      let start: number | null = null;
      const duration = 1600;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(ease * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, value, delay]);

  return (
    <div
      ref={ref}
      className="card-dark p-6 text-center flex flex-col gap-2"
    >
      <p
        className="font-serif font-black leading-none text-gradient-green"
        style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
      >
        {count}{suffix}
      </p>
      <p className="text-sm font-medium" style={{ color: 'var(--text-mid)' }}>{label}</p>
    </div>
  );
}

/* ── Steps ── */
const pasos = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Análisis del Terreno',
    desc: 'Recibimos los datos de tu finca y evaluamos las condiciones óptimas de vuelo.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Planificación del Vuelo',
    desc: 'Diseñamos la ruta óptima y coordenamos fecha y hora según tu disponibilidad.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    title: 'Ejecución con Drones',
    desc: 'Nuestro piloto certificado llega a tu finca y ejecuta el vuelo con precisión DJI.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Reporte y Optimización',
    desc: 'Recibís el reporte digital con mapa de cobertura. El cobro es por hectáreas reales.',
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="section-pad section-sep"
      style={{ backgroundColor: 'var(--panel)' }}
      aria-labelledby="resultados-heading"
    >
      <div className="container-xl">

        {/* ── Stats ── */}
        <RevealWrapper>
          <div className="text-center mb-10">
            <SectionEyebrow>Resultados que Impactan</SectionEyebrow>
            <h2
              id="resultados-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text)' }}
            >
              Números que hablan
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          <StatCard value={30}  suffix="%" label="Menos Uso de Insumos"            delay={0}   />
          <StatCard value={25}  suffix="%" label="Aumento en Rendimiento"           delay={150} />
          <StatCard value={10}  suffix="×" label="Más Rápido que Métodos Manuales"  delay={300} />
        </div>

        <div className="divider-neon mb-20" />

        {/* ── How it works ── */}
        <RevealWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow>Cómo Funciona</SectionEyebrow>
            <h2
              id="como-funciona-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text)' }}
            >
              De la cotización al reporte en días
            </h2>
          </div>
        </RevealWrapper>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px z-0"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon), var(--neon), transparent)', opacity: .25 }}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {pasos.map((p, i) => (
              <RevealWrapper key={p.title} delay={i * 100}>
                <li className="card-dark p-6 flex flex-col gap-4">
                  {/* Icon circle */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'rgba(0,204,53,0.1)',
                        color: 'var(--neon)',
                        border: '1px solid rgba(0,204,53,0.25)',
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="font-serif font-black text-4xl leading-none"
                      style={{ color: 'rgba(0,204,53,0.15)' }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>{p.desc}</p>
                  </div>
                </li>
              </RevealWrapper>
            ))}
          </ol>
        </div>

        <RevealWrapper delay={500}>
          <div className="text-center mt-14">
            <a href="#contacto" className="btn-neon">Agenda tu demo gratuita</a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
