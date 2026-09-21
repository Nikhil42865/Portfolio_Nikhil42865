import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  requiredIndicator?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      requiredIndicator,
      className = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={selectId} className="form-label">
            <span>
              {label}
              {requiredIndicator && <span style={{ color: 'var(--color-primary)', marginLeft: '3px' }}>*</span>}
            </span>
          </label>
        )}

        <div style={{ position: 'relative', width: '100%' }}>
          <select
            ref={ref}
            id={selectId}
            className={`select ${error ? 'input-error' : ''} ${className}`.trim()}
            style={{
              appearance: 'none',
              paddingRight: '2.5rem',
              cursor: 'pointer',
            }}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-hint` : undefined}
            {...props}
          >
            {children}
          </select>

          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronDown size={16} />
          </div>
        </div>

        {error && (
          <div id={`${selectId}-error`} className="field-error-text" role="alert">
            <AlertCircle size={13} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <span id={`${selectId}-hint`} className="form-hint">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
