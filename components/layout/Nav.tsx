'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '#servicios',      label: 'Servicios' },
  { href: '#como-funciona',  label: 'Resultados' },
  { href: '#nosotros',       label: 'Nosotros' },
  { href: '#contacto',       label: 'Contacto' },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}

export function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const isLight = mounted && theme === 'light';
  const toggleTheme = () => setTheme(isLight ? 'dark' : 'light');

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-idle)',
        backdropFilter:  scrolled ? 'blur(16px)' : 'none',
        borderBottom:    scrolled ? '1px solid var(--nav-border-scrolled)' : '1px solid transparent',
      }}
    >
      <div className="container-xl">
        <nav className="flex items-center justify-between h-16 md:h-[72px]" aria-label="Navegación principal">

          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2.5 group" aria-label="Icarus Drones — inicio">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
              className="transition-transform duration-300 group-hover:rotate-6">
              <circle cx="16" cy="16" r="15" stroke="var(--neon)" strokeWidth="1.5"/>
              <path d="M16 6 L22 20 L16 17 L10 20 Z" fill="var(--neon)" opacity=".8"/>
              <circle cx="16" cy="17" r="2.5" fill="var(--neon-lt)"/>
            </svg>
            <span className="font-serif font-bold text-lg tracking-wide" style={{ color: 'var(--text)' }}>
              <span className="text-gradient-green">Icarus</span>Drones
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 text-sm font-medium rounded transition-colors duration-200"
                  style={{ color: 'var(--text-mid)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right group */}
          <div className="hidden md:flex items-center gap-2">
            <a href="#contacto" className="btn-neon text-sm px-5 py-2.5" style={{ minHeight: '40px' }}>
              Cotizar gratis
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200 hover:opacity-80"
              style={{ color: 'var(--neon)', background: 'rgba(0,122,32,0.08)' }}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {isLight ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>

          {/* Mobile right group */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--neon)', background: 'rgba(0,122,32,0.08)' }}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {isLight ? <MoonIcon /> : <SunIcon />}
            </button>

            <button
              className="p-2 rounded flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {[0,1,2].map((i) => (
                <span
                  key={i}
                  className="block w-6 h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--neon)',
                    transform: i === 0 && menuOpen ? 'rotate(45deg) translate(4px,4px)'
                             : i === 2 && menuOpen ? 'rotate(-45deg) translate(4px,-4px)'
                             : undefined,
                    opacity: i === 1 && menuOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: 'var(--nav-mobile-bg)', borderBottom: '1px solid var(--nav-mobile-border)' }}
      >
        <div className="container-xl py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 text-base font-medium border-b transition-colors duration-200"
              style={{ color: 'var(--text-mid)', borderColor: 'var(--nav-mobile-border)' }}
            >
              {l.label}
            </a>
          ))}

          <div className="flex gap-3 mt-3">
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="btn-neon flex-1 justify-center">
              Cotizar gratis
            </a>
            <button
              onClick={() => { toggleTheme(); setMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200"
              style={{
                border: '1.5px solid var(--neon)',
                color: 'var(--neon)',
                background: 'rgba(0,122,32,0.06)',
              }}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {isLight ? <MoonIcon /> : <SunIcon />}
              {isLight ? 'Oscuro' : 'Claro'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
