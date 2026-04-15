interface SectionEyebrowProps {
  children: React.ReactNode;
}

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <div className="eyebrow">
      <span>{children}</span>
    </div>
  );
}
