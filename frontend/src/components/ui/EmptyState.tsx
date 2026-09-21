import React from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Inbox size={36} style={{ color: 'var(--color-text-muted)' }} />,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`card ${className}`.trim()}
      style={{
        textAlign: 'center',
        padding: 'var(--space-12) var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(14, 22, 39, 0.4)',
        border: '1px dashed var(--color-border-subtle)',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-4)',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            maxWidth: '44ch',
            margin: '0 auto var(--space-6)',
          }}
        >
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
};
