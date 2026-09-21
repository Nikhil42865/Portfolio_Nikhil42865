import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  style,
  ...props
}) => {
  const borderRadius =
    variant === 'circle'
      ? 'var(--radius-full)'
      : variant === 'text'
      ? 'var(--radius-xs)'
      : 'var(--radius-md)';

  const defaultHeight =
    variant === 'circle'
      ? (width || '40px')
      : variant === 'text'
      ? '1rem'
      : '100px';

  return (
    <div
      className={`skeleton-shimmer ${className}`.trim()}
      style={{
        width: width || '100%',
        height: height || defaultHeight,
        borderRadius,
        display: 'block',
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};
