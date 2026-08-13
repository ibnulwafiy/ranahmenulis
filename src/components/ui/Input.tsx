import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  isPassword = false,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const calculatedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 text-zinc-400 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={calculatedType}
          className={`w-full bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-medium rounded-2xl border transition-all duration-200 focus:outline-none ${
            leftIcon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-12' : 'pr-4'} py-3.5 ${
            error
              ? 'border-zinc-900 ring-1 ring-zinc-900 bg-zinc-50/50'
              : 'border-zinc-200 focus:border-black focus:ring-1 focus:ring-black'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors duration-150 rounded-lg focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-zinc-900 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
};
