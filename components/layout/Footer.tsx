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
