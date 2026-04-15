import { RevealWrapper } from '@/components/ui/RevealWrapper';

const items = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    label: 'DJI Agras T50',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    label: 'Pilotos ANAC',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: 'Base Las Tablas',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    label: 'Reporte por vuelo',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    label: 'Cotización &lt;24 h',
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Por qué Icarus Drones"
      style={{
        backgroundColor: 'var(--panel)',
        borderTop: '3px solid var(--straw)',
        borderBottom: '1px solid rgba(0,204,53,0.12)',
      }}
    >
      <div className="container-xl py-4">
        <RevealWrapper>
          <ul className="flex flex-wrap justify-center md:justify-between items-center gap-y-4 gap-x-6" role="list">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: 'var(--text-mid)' }}>
                <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
                {i < items.length - 1 && (
                  <span className="hidden md:block w-px h-4 ml-3" style={{ backgroundColor: 'rgba(0,204,53,0.2)' }} aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  );
}
