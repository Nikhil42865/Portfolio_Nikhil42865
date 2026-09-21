import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'raised' | 'elevated' | 'glass' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      padding = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const variantClass =
      variant === 'raised'
        ? 'card-raised'
        : variant === 'elevated'
        ? 'card-elevated'
        : variant === 'glass'
        ? 'card-glass'
        : variant === 'interactive'
        ? 'card-interactive'
        : '';

    const paddingStyle =
      padding === 'none'
        ? { padding: 0 }
        : padding === 'sm'
        ? { padding: 'var(--space-4)' }
        : padding === 'lg'
        ? { padding: 'var(--space-8)' }
        : {};

    return (
      <div
        ref={ref}
        className={`card ${variantClass} ${className}`.trim()}
        style={{ ...paddingStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
