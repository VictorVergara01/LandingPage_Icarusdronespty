# Redesign Full Dark Premium — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar el landing page de Icarus Drones con estética full dark premium — hero con Terrain Wave + Dots animado, tipografía más grande y cinematográfica, glassmorphism en cards, mejor jerarquía visual en todas las secciones.

**Architecture:** Todos los cambios son en componentes existentes — no se crean archivos nuevos. Se actualiza `globals.css` con los nuevos keyframes de animación, luego se reescriben/actualizan los componentes en orden de arriba a abajo del landing page. El formulario de Contacto mantiene toda su lógica (react-hook-form, API route) — solo cambia la presentación.

**Tech Stack:** Next.js 15, Tailwind CSS v4, CSS custom properties, SVG animations, React hooks

---

## File Map

| File | Action | What changes |
|---|---|---|
| `app/globals.css` | Modify | Add keyframes: `dot-scroll`, `aurora-slow`, `scanline-move`, `terrain-wave` |
| `components/sections/Hero.tsx` | Rewrite | Replace particles+drone with terrain wave + aurora + dots. Keep HUD card & counters. |
| `components/sections/TrustBar.tsx` | Modify | Border top dorado (`--straw`), gold icons |
| `components/sections/Servicios.tsx` | Modify | Hover lift en cards, price band con borde lateral |
| `components/sections/ComoFunciona.tsx` | Modify | Headings más grandes, stat cards más dramáticos |
| `components/sections/Nosotros.tsx` | Modify | Heading en serif grande, layout editorial |
| `components/sections/Contacto.tsx` | Modify | Heading "Hablemos de tu finca", form title, heading size up |
| `components/layout/Footer.tsx` | Modify | Simplify a single-row slim footer |

---

## Task 1: globals.css — Add animation keyframes

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add the 4 new keyframes after the existing `@keyframes spin-slow` block (line ~297)**

Open `app/globals.css` and add after the `spin-slow` keyframe (before the `.animate-float` utility classes at ~line 301):

```css
@keyframes dot-scroll {
  from { background-position: 0 0; }
  to   { background-position: 0 -280px; }
}
@keyframes aurora-slow {
  0%   { transform: translate(0%,0%) scale(1); }
  50%  { transform: translate(2%,-3%) scale(1.04); }
  100% { transform: translate(-2%,2%) scale(.98); }
}
@keyframes scanline-move {
  0%   { top: 0; opacity: 0; }
  5%   { opacity: 1; }
  90%  { opacity: .4; }
  100% { top: 100%; opacity: 0; }
}
```

- [ ] **Step 2: Verify the file compiles — run dev server**

```bash
cd "C:\Users\victo\proyectos\Landing page icarus"
npm run dev
```

Expected: server starts with no CSS errors in terminal.

- [ ] **Step 3: Stop dev server (Ctrl+C), commit**

```bash
cd "C:\Users\victo\proyectos\Landing page icarus"
git add app/globals.css
git commit -m "feat: add terrain wave animation keyframes to globals.css"
```

---

## Task 2: Hero.tsx — Terrain Wave + Aurora background

**Files:**
- Rewrite: `components/sections/Hero.tsx`

This is the biggest change. The current Hero has: `<Particles>`, `<ScanLine>`, `<DroneSvg>`, video bg, HUD grid, corner decorations. We keep: HUD card structure (right column), stats counters (`useCounter`), `fade-in-up` entrance animations. We replace the background layers with: aurora blobs, scrolling dot grid, animated SVG terrain waves, scanline.

- [ ] **Step 1: Replace Hero.tsx with the full rewrite**

```tsx
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
      aria-label="Hero — Icarus Drones"
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
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,204,53,0.4) 30%, rgba(0,204,53,0.6) 50%, rgba(0,204,53,0.4) 70%, transparent 100%)',
            animation: 'scanline-move 5s linear infinite',
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
          background: 'linear-gradient(180deg,rgba(3,8,5,.75) 0%,rgba(3,8,5,.35) 40%,rgba(3,8,5,.7) 100%)',
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
                backgroundColor: 'rgba(12,22,12,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,204,53,0.2)',
                boxShadow: '0 0 60px rgba(0,204,53,0.08), 0 20px 60px rgba(0,0,0,0.5)',
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
                    aria-label="Drone"
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
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,204,53,0.08)' }}
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
```

- [ ] **Step 2: Run dev server and visually verify hero animations load**

```bash
npm run dev
```

Open http://localhost:3000 in browser. Verify:
- Dots scroll upward slowly
- Aurora blobs shift gently
- Wave SVG animates at the bottom
- Scanline sweeps from top to bottom
- HUD card appears on right (desktop), stack on mobile

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: hero terrain wave + aurora + scrolling dots background"
```

---

## Task 3: TrustBar — Gold top border + premium feel

**Files:**
- Modify: `components/sections/TrustBar.tsx`

- [ ] **Step 1: Update the section style — change `borderTop` to `3px solid var(--straw)` and icon color to `var(--gold)`**

Find this in `TrustBar.tsx`:
```tsx
    style={{
      backgroundColor: 'var(--panel)',
      borderTop: '1px solid rgba(0,204,53,0.3)',
      borderBottom: '1px solid rgba(0,204,53,0.12)',
    }}
```

Replace with:
```tsx
    style={{
      backgroundColor: 'var(--panel)',
      borderTop: '3px solid var(--straw)',
      borderBottom: '1px solid rgba(0,204,53,0.12)',
    }}
```

Find:
```tsx
<span style={{ color: 'var(--neon)' }}>{item.icon}</span>
```

Replace with:
```tsx
<span style={{ color: 'var(--gold)' }}>{item.icon}</span>
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/TrustBar.tsx
git commit -m "feat: trust bar gold top border and gold icons"
```

---

## Task 4: Servicios — Hover lift + stronger price band

**Files:**
- Modify: `components/sections/Servicios.tsx`

- [ ] **Step 1: Add hover lift to service cards and upsize the heading**

Find the `<article` element (around line 73):
```tsx
<article
  className="card-dark flex flex-col overflow-hidden h-full group"
```
Replace with:
```tsx
<article
  className="card-dark flex flex-col overflow-hidden h-full group transition-transform duration-300 hover:-translate-y-2"
```

Find the section heading `<h2` (around line 56):
```tsx
style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
```
Replace with:
```tsx
style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text)' }}
```

- [ ] **Step 2: Enhance the price band — add left accent border and larger `$20`**

Find the price band `<div` (around line 124):
```tsx
          <div
            className="mt-12 p-7 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background: 'linear-gradient(135deg, rgba(0,204,53,0.08) 0%, rgba(3,8,5,0) 100%)',
              border: '1px solid rgba(0,204,53,0.25)',
            }}
          >
```
Replace with:
```tsx
          <div
            className="mt-12 p-7 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,204,53,0.07) 0%, rgba(3,8,5,0) 60%), rgba(12,22,12,0.9)',
              border: '1px solid rgba(0,204,53,0.22)',
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: 'linear-gradient(to bottom, var(--neon), var(--straw))' }} aria-hidden="true" />
```

Find the `$20` price display (around line 133):
```tsx
<span className="font-serif font-black" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: 'var(--gold)', lineHeight: 1 }}>$20</span>
```
Replace with:
```tsx
<span className="font-serif font-black" style={{ fontSize: 'clamp(3.5rem, 9vw, 5.5rem)', color: 'var(--gold)', lineHeight: 1 }}>$20</span>
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Servicios.tsx
git commit -m "feat: servicios hover lift, bigger heading, enhanced price band"
```

---

## Task 5: ComoFunciona — Bigger headings + dramatic stats

**Files:**
- Modify: `components/sections/ComoFunciona.tsx`

- [ ] **Step 1: Upsize both section headings in this component**

There are two `<h2` elements. Find first one (around line 94):
```tsx
style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
```
Replace with:
```tsx
style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text)' }}
```

Find the second `<h2` (around line 114):
```tsx
style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
```
Replace with:
```tsx
style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text)' }}
```

- [ ] **Step 2: Make stat cards more dramatic — upsize the number**

Find `StatCard`'s number paragraph (around line 45):
```tsx
    className="font-serif font-black leading-none"
    style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'var(--neon)' }}
```
Replace with:
```tsx
    className="font-serif font-black leading-none text-gradient-green"
    style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/ComoFunciona.tsx
git commit -m "feat: como-funciona bigger headings and more dramatic stat numbers"
```

---

## Task 6: Nosotros — Cinematic heading

**Files:**
- Modify: `components/sections/Nosotros.tsx`

- [ ] **Step 1: Upsize the main heading and change subtitle copy**

Find the `<h2` in Nosotros (around line 59):
```tsx
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
```
Replace with:
```tsx
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text)' }}
```

- [ ] **Step 2: Upsize the testimonios `<h2`**

Find the testimonios heading (around line 133):
```tsx
style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text)' }}
```
Replace with:
```tsx
style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Nosotros.tsx
git commit -m "feat: nosotros cinematic heading sizes"
```

---

## Task 7: Contacto — Heading update + form title

**Files:**
- Modify: `components/sections/Contacto.tsx`

- [ ] **Step 1: Update section heading and subtitle copy**

Find (around line 59):
```tsx
            >
              Llevá tu cultivo al siguiente nivel
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: 'var(--text-mid)' }}>
              Respondemos en menos de 24 horas con el presupuesto completo para tu finca.
            </p>
```
Replace with:
```tsx
            >
              Hablemos de tu finca
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: 'var(--text-mid)' }}>
              Respondemos en menos de 24 horas. Sin compromiso.
            </p>
```

- [ ] **Step 2: Upsize the heading**

Find (around line 56):
```tsx
style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
```
Replace with:
```tsx
style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text)' }}
```

- [ ] **Step 3: Add a form title inside the `<form` element — add it as first child before the first `<div>`**

Find (around line 124 — the opening of the form + first label):
```tsx
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="card-dark p-8 flex flex-col gap-6"
              aria-label="Formulario de cotización"
            >
              <div>
                <label htmlFor="nombre"
```
Replace with:
```tsx
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="card-dark p-8 flex flex-col gap-6"
              aria-label="Formulario de cotización"
            >
              <h3 className="font-serif font-bold text-xl" style={{ color: 'var(--text)' }}>
                Solicitar cotización
              </h3>
              <div>
                <label htmlFor="nombre"
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contacto.tsx
git commit -m "feat: contacto new heading copy and form title"
```

---

## Task 8: Footer — Slim single-row footer

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Replace the entire Footer component with the slim version**

```tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="py-7"
      style={{ backgroundColor: 'var(--void)', borderTop: '1px solid rgba(0,204,53,0.1)' }}
    >
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="15" stroke="var(--neon)" strokeWidth="1.5"/>
              <path d="M16 6 L22 20 L16 17 L10 20 Z" fill="var(--neon)" opacity=".8"/>
              <circle cx="16" cy="17" r="2.5" fill="var(--neon-lt)"/>
            </svg>
            <span className="font-serif font-bold" style={{ color: 'var(--text)' }}>
              <span className="text-gradient-green">Icarus</span>Drones
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'var(--text-lt)' }}>
            © 2025 Icarus Drones · Las Tablas, Panamá · icarusdronespty.com
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            {[
              { href: '#servicios', label: 'Servicios' },
              { href: '#nosotros',  label: 'Nosotros' },
              { href: '#contacto', label: 'Contacto' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs transition-colors hover:text-[var(--neon-lt)]"
                style={{ color: 'var(--text-lt)' }}
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/portal/login"
              className="text-xs transition-colors hover:text-[var(--neon-lt)]"
              style={{ color: 'var(--text-lt)' }}
            >
              Portal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: footer slim single-row redesign"
```

---

## Task 9: Final visual check

- [ ] **Step 1: Run the full dev build**

```bash
npm run dev
```

Open http://localhost:3000 and scroll through the entire page. Check:
- Hero: dots scroll, aurora shifts, waves animate, scanline sweeps, HUD card visible
- TrustBar: gold top border visible
- Servicios: cards lift on hover, price band has left gradient bar, `$20` is large
- ComoFunciona: stat numbers are large (3–4.5rem), headings bigger
- Nosotros: headings larger
- Contacto: reads "Hablemos de tu finca", form has "Solicitar cotización" title
- Footer: single slim row

- [ ] **Step 2: Run build to catch type errors**

```bash
npm run build
```

Expected: ✓ Compiled successfully with 0 errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: full dark premium redesign complete"
```
