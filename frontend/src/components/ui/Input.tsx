import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  requiredIndicator?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      requiredIndicator,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={inputId} className="form-label">
            <span>
              {label}
              {requiredIndicator && <span style={{ color: 'var(--color-primary)', marginLeft: '3px' }}>*</span>}
            </span>
          </label>
        )}

        <div style={{ position: 'relative', width: '100%' }}>
          {leftIcon && (
            <div
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
            style={{
              paddingLeft: leftIcon ? '2.5rem' : undefined,
              paddingRight: rightIcon ? '2.5rem' : undefined,
            }}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-hint` : undefined}
            {...props}
          />

          {rightIcon && (
            <div
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <div id={`${inputId}-error`} className="field-error-text" role="alert">
            <AlertCircle size={13} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <span id={`${inputId}-hint`} className="form-hint">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
