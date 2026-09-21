import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  requiredIndicator?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      requiredIndicator,
      className = '',
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={textareaId} className="form-label">
            <span>
              {label}
              {requiredIndicator && <span style={{ color: 'var(--color-primary)', marginLeft: '3px' }}>*</span>}
            </span>
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`textarea ${error ? 'input-error' : ''} ${className}`.trim()}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-hint` : undefined}
          {...props}
        />

        {error && (
          <div id={`${textareaId}-error`} className="field-error-text" role="alert">
            <AlertCircle size={13} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <span id={`${textareaId}-hint`} className="form-hint">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
