'use client';
import { useEffect, useRef, useState } from 'react';

/* ── Counter hook (unchanged) ──────────────────────── */
function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

/* ── Main Hero ─────────────────────────────────────── */
export function Hero() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [ready, setReady]       = useState(false);
  const [counting, setCounting] = useState(false);

  const ha   = useCounter(500, 1800, counting);
  const fast = useCounter(10,  1200, counting);
  const pct  = useCounter(30,  1500, counting);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
      setTimeout(() => setCounting(true), 800);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    if (videoRef.current && mq.matches) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const anim = (delay: number) =>
    ready
      ? { animation: `fade-in-up .8s ${delay}ms ease forwards`, opacity: 0 as const }
      : { opacity: 0 as const };

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ backgroundColor: 'var(--void)' }}
    >
      {/* ── Video bg (low opacity, desktop only) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 hidden md:block"
        muted loop playsInline preload="none"
        poster="/images/gal-fumigacion.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Aurora glow blobs ── */}
      <div
        className="absolute z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          inset: '-30% -20%',
          background: [
            'radial-gradient(ellipse 70% 50% at 15% 80%, rgba(0,150,40,0.22) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 60% at 85% 60%, rgba(0,100,25,0.15) 0%, transparent 55%)',
            'radial-gradient(ellipse 40% 35% at 50% 95%, rgba(232,184,75,0.08) 0%, transparent 50%)',
          ].join(','),
          filter: 'blur(40px)',
          animation: 'aurora-slow 12s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />

      {/* ── Scrolling dot grid ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,204,53,0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          animation: 'dot-scroll 18s linear infinite',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,.6) 35%, rgba(0,0,0,.15) 75%, transparent 100%)',
          maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,.6) 35%, rgba(0,0,0,.15) 75%, transparent 100%)',
        }}
      />

      {/* ── Scanline ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            top: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,204,53,0.4) 30%, rgba(0,204,53,0.6) 50%, rgba(0,204,53,0.4) 70%, transparent 100%)',
            animation: 'scanline-move 5s linear infinite',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* ── Terrain wave SVG ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        aria-hidden="true"
        style={{ height: '180px' }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(to top, rgba(0,204,53,0.07), transparent)',
        }} />
        <svg
          style={{ position: 'absolute', bottom: 0, width: '100%', height: '180px' }}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wg-hero" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,204,53,0.22)" />
              <stop offset="100%" stopColor="rgba(0,204,53,0.03)" />
            </linearGradient>
          </defs>
          <path fill="url(#wg-hero)">
            <animate
              attributeName="d"
              dur="5s"
              repeatCount="indefinite"
              values={[
                'M0,90 C360,40 720,150 1080,70 C1260,28 1380,100 1440,80 L1440,180 L0,180 Z',
                'M0,70 C300,110 660,30 1000,100 C1200,140 1360,60 1440,90 L1440,180 L0,180 Z',
                'M0,100 C320,50 680,130 1020,65 C1220,25 1380,95 1440,75 L1440,180 L0,180 Z',
                'M0,90 C360,40 720,150 1080,70 C1260,28 1380,100 1440,80 L1440,180 L0,180 Z',
              ].join(';')}
            />
          </path>
          <path fill="rgba(0,204,53,0.06)">
            <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values={[
                'M0,115 C400,65 800,155 1200,95 C1340,68 1410,110 1440,105 L1440,180 L0,180 Z',
                'M0,90 C350,130 700,50 1100,115 C1280,145 1400,80 1440,100 L1440,180 L0,180 Z',
                'M0,125 C380,75 760,145 1140,85 C1300,55 1400,115 1440,110 L1440,180 L0,180 Z',
                'M0,115 C400,65 800,155 1200,95 C1340,68 1410,110 1440,105 L1440,180 L0,180 Z',
              ].join(';')}
            />
          </path>
        </svg>
      </div>

      {/* ── Dark gradient overlay ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(180deg,var(--hero-overlay-top) 0%,var(--hero-overlay-mid) 40%,var(--hero-overlay-bot) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 container-xl py-24 md:py-0 md:min-h-dvh md:flex md:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left: text */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div style={anim(0)}>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  color: 'var(--neon-lt)',
                  backgroundColor: 'rgba(0,204,53,0.08)',
                  border: '1px solid rgba(0,204,53,0.25)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] animate-pulse" aria-hidden="true" />
                Azuero, Panamá — Desde Las Tablas
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="font-serif font-black leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', ...anim(100) }}
            >
              <span className="block" style={{ color: 'var(--text)' }}>Tu cosecha</span>
              <span className="block text-gradient-green">merece la mejor</span>
              <span className="block" style={{ color: 'var(--gold)' }}>protección</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: 'var(--text-mid)', ...anim(220) }}
            >
              Fumigación agrícola con drones DJI Agras T50. Más cobertura, menos insumo, sin dañar el suelo. Cobro por hectárea real.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-2" style={anim(340)}>
              <a href="#contacto" className="btn-neon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Pedir cotización gratis
              </a>
              <a href="#como-funciona" className="btn-outline-neon">
                ¿Cómo funciona?
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex gap-8 pt-5 mt-2"
              style={{ borderTop: '1px solid rgba(0,204,53,0.15)', ...anim(460) }}
            >
              {[
                { val: `+${ha}`, label: 'Hectáreas fumigadas' },
                { val: `${fast}×`, label: 'Más rápido que manual' },
                { val: `${pct}%`, label: 'Menos insumo por ha' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif font-black text-3xl text-gradient-green leading-none">{s.val}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-lt)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: HUD card */}
          <div style={anim(200)}>
            <div
              className="relative p-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--hud-card-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,122,32,0.25)',
                boxShadow: 'var(--hud-card-shadow)',
              }}
            >
              {/* Corner marks */}
              {[
                { cls: 'top-[10px] left-[10px]', border: '1.5px 0 0 1.5px' },
                { cls: 'top-[10px] right-[10px]', border: '1.5px 1.5px 0 0' },
                { cls: 'bottom-[10px] left-[10px]', border: '0 0 1.5px 1.5px' },
                { cls: 'bottom-[10px] right-[10px]', border: '0 1.5px 1.5px 0' },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`absolute w-3.5 h-3.5 ${c.cls}`}
                  style={{ borderColor: 'rgba(0,204,53,0.5)', borderStyle: 'solid', borderWidth: c.border }}
                  aria-hidden="true"
                />
              ))}

              {/* HUD title */}
              <div
                className="flex items-center gap-2 text-[11px] font-bold tracking-[.15em] uppercase mb-4"
                style={{ color: 'var(--neon)' }}
              >
                <span className="block w-5 h-px bg-[var(--neon)]" aria-hidden="true" />
                DJI Agras T50 — Live Feed
              </div>

              {/* Drone visual area */}
              <div
                className="relative flex items-center justify-center rounded-xl mb-4"
                style={{
                  height: '160px',
                  background: 'rgba(0,204,53,0.04)',
                  border: '1px solid rgba(0,204,53,0.1)',
                }}
                aria-hidden="true"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(0,204,53,0.3)',
                    animation: 'pulse-ring 2.5s ease-in-out infinite',
                  }}
                >
                  <span
                    className="text-4xl"
                    style={{ filter: 'drop-shadow(0 0 10px var(--neon))', animation: 'float-up 3s ease-in-out infinite' }}
                  >✈</span>
                </div>
                <span
                  className="absolute bottom-2 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                  style={{
                    color: 'var(--neon)',
                    background: 'rgba(0,204,53,0.1)',
                    border: '1px solid rgba(0,204,53,0.2)',
                  }}
                >VUELO ACTIVO</span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { val: '12 m',  lbl: 'Altitud' },
                  { val: '7 m/s', lbl: 'Veloc.' },
                  { val: '100%',  lbl: 'Cob.' },
                ].map((m) => (
                  <div
                    key={m.lbl}
                    className="text-center rounded-lg py-2"
                    style={{ background: 'var(--hud-metric-bg)', border: '1px solid rgba(0,122,32,0.12)' }}
                  >
                    <p className="text-sm font-bold font-mono" style={{ color: 'var(--neon-lt)' }}>{m.val}</p>
                    <p className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: 'var(--text-lt)' }}>{m.lbl}</p>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div
                className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase px-3 py-2 rounded-lg"
                style={{ color: 'var(--neon)', background: 'rgba(0,204,53,0.06)', border: '1px solid rgba(0,204,53,0.12)' }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] animate-pulse" aria-hidden="true" />
                  Sistema Activo
                </span>
                <span>DJI Agras T50 ×2</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        aria-hidden="true"
        style={anim(700)}
      >
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: '1px solid rgba(0,204,53,0.35)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: 'var(--neon)', animation: 'scan-line 1.5s linear infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
