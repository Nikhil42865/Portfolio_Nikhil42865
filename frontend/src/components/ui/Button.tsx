import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => {
    const variantClass = `btn-${variant}`;
    const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={size === 'sm' ? 14 : 18} className="animate-spin" />
        ) : (
          iconLeft
        )}
        <span>{children}</span>
        {!isLoading && iconRight}
      </button>
    );
  }
);

Button.displayName = 'Button';
