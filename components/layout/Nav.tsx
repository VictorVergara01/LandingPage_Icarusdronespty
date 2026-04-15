'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#servicios',      label: 'Servicios' },
  { href: '#como-funciona',  label: 'Resultados' },
  { href: '#nosotros',       label: 'Nosotros' },
  { href: '#contacto',       label: 'Contacto' },
];

export function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(3,8,5,0.92)' : 'transparent',
        backdropFilter:  scrolled ? 'blur(16px)' : 'none',
        borderBottom:    scrolled ? '1px solid rgba(0,204,53,0.18)' : '1px solid transparent',
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
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-lt)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="#contacto" className="hidden md:inline-flex btn-neon text-sm px-5 py-2.5" style={{ minHeight: '40px' }}>
            Cotizar gratis
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded flex flex-col gap-1.5"
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
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: 'rgba(3,8,5,0.97)', borderBottom: '1px solid rgba(0,204,53,0.15)' }}
      >
        <div className="container-xl py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 text-base font-medium border-b transition-colors duration-200"
              style={{ color: 'var(--text-mid)', borderColor: 'rgba(0,204,53,0.1)' }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setMenuOpen(false)} className="btn-neon mt-3 justify-center">
            Cotizar gratis
          </a>
        </div>
      </div>
    </header>
  );
}
