import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const checkboxId = id || 'custom-checkbox';

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-3 cursor-pointer select-none text-xs sm:text-sm text-zinc-700 font-medium ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-zinc-900'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 ${
            checked
              ? 'bg-black border-black text-white'
              : 'bg-white border-zinc-300 peer-focus:border-zinc-500 peer-hover:border-zinc-400'
          }`}
        >
          {checked && <Check size={13} strokeWidth={3} />}
        </div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};
