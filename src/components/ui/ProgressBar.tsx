import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100 or current units if max is specified
  max?: number;
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  showPercentage = true,
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2">
            {label && <span className="font-semibold text-zinc-900">{label}</span>}
            {sublabel && <span className="text-zinc-500 font-normal">{sublabel}</span>}
          </div>
          {showPercentage && (
            <span className="font-semibold text-zinc-900 tracking-tight">
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div className={`w-full bg-zinc-100 rounded-full overflow-hidden ${heightStyles}`}>
        <div
          className="bg-black h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
