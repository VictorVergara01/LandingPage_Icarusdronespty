import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const zonas = [
  { name: 'Las Tablas',        note: 'Base operativa · Los Santos', active: true,  base: true  },
  { name: 'Chitré',            note: 'Capital de Herrera',          active: true,  base: false },
  { name: 'Tonosí',            note: 'Los Santos',                  active: true,  base: false },
  { name: 'Macaracas',         note: 'Los Santos',                  active: true,  base: false },
  { name: 'Pesé / Guararé',    note: 'Herrera / Los Santos',        active: true,  base: false },
  { name: 'Aguadulce / Penonomé', note: 'Coclé — Próximamente',     active: false, base: false },
];

export function Cobertura() {
  return (
    <section
      id="cobertura"
      className="section-pad section-sep"
      style={{ backgroundColor: 'var(--dark)' }}
      aria-labelledby="cobertura-heading"
    >
      <div className="container-xl">
        <RevealWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow>Área de cobertura</SectionEyebrow>
            <h2
              id="cobertura-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
            >
              Cubrimos toda Azuero
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: 'var(--text-mid)' }}>
              Operamos desde Las Tablas hacia toda la Península. Si tu finca está en la región, llegamos.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* SVG Map */}
          <RevealWrapper>
            <div
              className="card-dark p-6"
              role="img"
              aria-label="Mapa Península de Azuero con zonas de cobertura"
            >
              <svg viewBox="0 0 400 350" className="w-full max-w-md mx-auto" aria-hidden="true">
                <defs>
                  <filter id="neon-glow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <radialGradient id="map-bg" cx="50%" cy="60%">
                    <stop offset="0%" stopColor="rgba(0,204,53,0.07)"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </radialGradient>
                </defs>

                {/* Ocean */}
                <rect width="400" height="350" fill="var(--map-ocean)" rx="12"/>
                <rect width="400" height="350" fill="url(#map-bg)" rx="12"/>

                {/* Grid */}
                <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,204,53,0.05)" strokeWidth="1"/>
                </pattern>
                <rect width="400" height="350" fill="url(#map-grid)" rx="12"/>

                {/* Azuero Peninsula */}
                <path
                  d="M60,30 L360,30 L380,80 L370,130 L340,160 L310,190 L280,230 L255,265 L240,290 L220,320 L200,335 L185,320 L175,295 L160,270 L145,240 L125,210 L100,185 L75,155 L55,120 L45,80 Z"
                  fill="var(--map-land)"
                  stroke="rgba(0,204,53,0.3)"
                  strokeWidth="1.5"
                />

                {/* Coverage ellipse */}
                <ellipse cx="200" cy="190" rx="105" ry="100" fill="rgba(0,204,53,0.05)"/>

                {/* Las Tablas — base */}
                <circle cx="220" cy="220" r="12" fill="rgba(0,204,53,0.2)" filter="url(#neon-glow)"/>
                <circle cx="220" cy="220" r="7" fill="var(--neon)"/>
                <circle cx="220" cy="220" r="14" fill="none" stroke="var(--neon)" strokeWidth="1" opacity=".4"
                  style={{ animation: 'pulse-ring 2s ease-in-out infinite' }}/>
                <text x="236" y="215" fontSize="10" fontWeight="700" fill="var(--neon)" fontFamily="serif">Las Tablas</text>
                <text x="236" y="227" fontSize="8" fill="var(--neon)" opacity=".65" fontFamily="sans-serif">★ Base</text>

                {/* Active cities */}
                {[
                  { cx:155, cy:155, name:'Chitré'        },
                  { cx:175, cy:285, name:'Tonosí'        },
                  { cx:262, cy:258, name:'Macaracas'     },
                  { cx:127, cy:200, name:'Pesé/Guararé'  },
                ].map(({ cx, cy, name }) => (
                  <g key={name}>
                    <circle cx={cx} cy={cy} r="6" fill="rgba(0,204,53,0.15)" stroke="var(--neon)" strokeWidth="1.5"/>
                    <circle cx={cx} cy={cy} r="3" fill="var(--neon)" opacity=".8"/>
                    <text x={cx+10} y={cy+4} fontSize="9" fill="var(--map-text-primary)" fontFamily="serif">{name}</text>
                  </g>
                ))}

                {/* Coming soon */}
                {[
                  { cx:80,  cy:78,  name:'Aguadulce'  },
                  { cx:300, cy:65,  name:'Penonomé'   },
                ].map(({ cx, cy, name }) => (
                  <g key={name}>
                    <circle cx={cx} cy={cy} r="6" fill="none" stroke="var(--sky)" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <text x={cx+10} y={cy+4} fontSize="8" fill="var(--sky)" fontFamily="sans-serif">{name}</text>
                  </g>
                ))}

                {/* Legend */}
                <g transform="translate(12,298)">
                  <rect width="125" height="44" rx="6" fill="var(--map-legend-bg)" stroke="rgba(0,122,32,0.25)" strokeWidth="1"/>
                  <circle cx="14" cy="13" r="4" fill="var(--neon)"/>
                  <text x="22" y="17" fontSize="8.5" fill="var(--map-text-primary)" fontFamily="sans-serif">Base operativa</text>
                  <circle cx="14" cy="31" r="4" fill="none" stroke="var(--sky)" strokeWidth="1.5" strokeDasharray="2 1.5"/>
                  <text x="22" y="35" fontSize="8.5" fill="var(--sky)" fontFamily="sans-serif">Próximamente</text>
                </g>
              </svg>
            </div>
          </RevealWrapper>

          {/* Zone list */}
          <RevealWrapper delay={120}>
            <ul className="flex flex-col gap-3" role="list">
              {zonas.map((zona) => (
                <li
                  key={zona.name}
                  className="flex items-center justify-between p-4 rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor: zona.active ? 'var(--panel)' : 'var(--card-surface-dim)',
                    border: `1px solid ${zona.active ? 'rgba(0,204,53,0.18)' : 'rgba(74,143,163,0.15)'}`,
                    opacity: zona.active ? 1 : 0.65,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: zona.base ? 'var(--neon)' : zona.active ? 'rgba(0,204,53,0.7)' : 'var(--sky)' }}
                    />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: zona.active ? 'var(--text)' : 'var(--text-mid)' }}>
                        {zona.name}
                        {zona.base && <span className="ml-1.5 text-xs" style={{ color: 'var(--neon)' }}>★</span>}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-lt)' }}>{zona.note}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={zona.active
                      ? { backgroundColor: 'rgba(0,204,53,0.1)', color: 'var(--neon)' }
                      : { backgroundColor: 'rgba(74,143,163,0.1)', color: 'var(--sky)' }}
                  >
                    {zona.active ? 'Activa' : 'Próx.'}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-5 p-4 rounded-xl text-sm"
              style={{ backgroundColor: 'rgba(0,204,53,0.06)', border: '1px solid rgba(0,204,53,0.18)', color: 'var(--text-mid)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--neon)' }}>¿Tu finca está fuera de la lista?</span>{' '}
              Escríbenos igual — evaluamos el desplazamiento sin costo adicional en muchos casos.
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
