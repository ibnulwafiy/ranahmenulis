import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'outline' | 'black';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-[20px] transition-all duration-200';

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  }[padding];

  const variantStyles = {
    default:
      'bg-white border border-zinc-200/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)]',
    subtle:
      'bg-zinc-50/80 border border-zinc-200/60',
    outline:
      'bg-transparent border border-zinc-200',
    black:
      'bg-black text-white border border-zinc-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]',
  }[variant];

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:border-zinc-300 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.06)] active:scale-[0.99]'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles} ${paddingStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
