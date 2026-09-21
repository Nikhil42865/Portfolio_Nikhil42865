import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={className}
      style={{
        maxWidth: isCenter ? '760px' : '680px',
        margin: isCenter ? '0 auto var(--space-12)' : '0 0 var(--space-10)',
        textAlign: isCenter ? 'center' : 'left',
      }}
    >
      {eyebrow && (
        <div style={{ marginBottom: 'var(--space-2-5)' }}>
          <span className="tag">{eyebrow}</span>
        </div>
      )}

      <h2
        style={{
          marginBottom: 'var(--space-3-5)',
          letterSpacing: 'var(--tracking-tight)',
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            margin: isCenter ? '0 auto' : '0',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
