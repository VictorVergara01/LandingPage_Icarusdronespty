import Link from 'next/link';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

export function Portal() {
  return (
    <section
      className="section-pad section-sep relative overflow-hidden"
      style={{ backgroundColor: 'var(--void)' }}
      aria-labelledby="portal-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,204,53,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container-xl relative z-10">
        <RevealWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow>Plataforma digital</SectionEyebrow>
            <h2
              id="portal-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
            >
              Tu finca en tu pantalla
            </h2>
            <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: 'var(--text-mid)' }}>
              Gestioná tus parcelas, solicitá fumigaciones y revisá el historial de vuelos desde cualquier lugar.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {/* Active card */}
          <RevealWrapper delay={50}>
            <div
              className="flex flex-col p-8 rounded-2xl h-full animate-glow"
              style={{ backgroundColor: 'var(--panel-lt)', border: '1px solid rgba(0,204,53,0.4)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(0,204,53,0.12)', color: 'var(--neon)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <h3 className="font-serif font-bold text-xl mb-1" style={{ color: 'var(--neon-lt)' }}>Portal Web</h3>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--neon)' }}>Agricultor · Disponible</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-mid)' }}>
                Registrá tus parcelas con GPS, solicitá fumigaciones y consultá el historial completo de vuelos y reportes.
              </p>
              <ul className="flex flex-col gap-2.5 mb-8" role="list">
                {['Registro de parcelas GPS','Solicitar fumigación online','Historial de vuelos','Descarga de reportes PDF'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-mid)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/portal/login" className="btn-neon justify-center mt-auto" style={{ display: 'flex' }}>
                Acceder al portal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </RevealWrapper>

          {/* Coming soon */}
          <RevealWrapper delay={150}>
            <div
              className="flex flex-col p-8 rounded-2xl h-full"
              style={{ backgroundColor: 'var(--card-surface-dim)', border: '1px dashed rgba(74,143,163,0.35)', opacity: 0.82 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(74,143,163,0.1)', color: 'var(--sky)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(74,143,163,0.12)', color: 'var(--sky)', border: '1px solid rgba(74,143,163,0.25)' }}>
                  Próximamente
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl mb-1" style={{ color: 'var(--text-mid)' }}>App Android</h3>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--sky)' }}>Google Play · En desarrollo</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-lt)' }}>
                Toda la funcionalidad del portal en tu teléfono. Notificaciones en tiempo real, fotos de parcela y más.
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {['Notificaciones en tiempo real','Fotos de parcela','Geolocalización','Aprobación de vuelos'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-lt)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(74,143,163,0.5)" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </RevealWrapper>
        </div>

        {/* Bottom gradient bar */}
        <div className="mt-14 h-px max-w-2xl mx-auto" style={{
          background: 'linear-gradient(90deg, transparent, var(--neon-dk), var(--neon), var(--neon-lt), var(--neon), var(--neon-dk), transparent)',
        }} aria-hidden="true"/>
      </div>
    </section>
  );
}
