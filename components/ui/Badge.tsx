type BadgeVariant = 'disponible' | 'proximo';

interface BadgeProps {
  variant: BadgeVariant;
}

export function Badge({ variant }: BadgeProps) {
  if (variant === 'disponible') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full"
        style={{
          backgroundColor: 'rgba(90,138,60,0.15)',
          color: 'var(--leaf-lt)',
          border: '1px solid rgba(90,138,60,0.35)',
        }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--leaf-lt)' }}
          aria-hidden="true"
        />
        Disponible
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full"
      style={{
        backgroundColor: 'rgba(74,143,163,0.15)',
        color: 'var(--sky)',
        border: '1px solid rgba(74,143,163,0.35)',
      }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: 'var(--sky)' }}
        aria-hidden="true"
      />
      Próximamente
    </span>
  );
}
