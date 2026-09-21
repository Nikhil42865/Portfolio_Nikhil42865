import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'subtle' | 'success' | 'warning' | 'error' | 'purple';
  dot?: boolean;
  pulseDot?: boolean;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'brand',
  dot = false,
  pulseDot = false,
  size = 'md',
  style,
  ...props
}) => {
  const variantClass =
    variant === 'subtle'
      ? 'tag-subtle'
      : variant === 'success'
      ? 'tag-success'
      : variant === 'warning'
      ? 'tag-warning'
      : variant === 'error'
      ? 'tag-error'
      : variant === 'purple'
      ? 'tag-purple'
      : '';

  const sizeStyle =
    size === 'sm'
      ? { padding: '0.18rem 0.5rem', fontSize: 'var(--text-2xs)' }
      : {};

  const dotColor =
    variant === 'success'
      ? 'var(--color-success)'
      : variant === 'warning'
      ? 'var(--color-warning)'
      : variant === 'error'
      ? 'var(--color-error)'
      : variant === 'purple'
      ? 'var(--color-accent-purple)'
      : 'var(--color-primary)';

  return (
    <span
      className={`tag ${variantClass} ${className}`.trim()}
      style={{ ...sizeStyle, ...style }}
      {...props}
    >
      {dot && (
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '7px',
            height: '7px',
          }}
        >
          {pulseDot && (
            <span
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: dotColor,
                animation: 'pulsePing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
          )}
          <span
            style={{
              position: 'relative',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: dotColor,
            }}
          />
        </span>
      )}
      {children}
    </span>
  );
};
