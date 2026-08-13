import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-16 h-16 rounded-[20px]',
    xl: 'w-20 h-20 rounded-[24px]',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {/* Minimalist Emblem */}
      <div
        className={`${iconDimensions} bg-black flex items-center justify-center text-white shadow-card relative select-none`}
      >
        <span className="font-bold tracking-tighter text-white font-sans text-xl leading-none">
          P<span className="text-zinc-400 font-light">+</span>
        </span>
      </div>

      {showSubtitle && (
        <div className="mt-3 text-center">
          <h1 className={`font-semibold tracking-tight text-black ${textSize}`}>
            Penulis+ Workspace
          </h1>
          <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-0.5">
            by Ranah Menulis
          </p>
        </div>
      )}
    </div>
  );
};
