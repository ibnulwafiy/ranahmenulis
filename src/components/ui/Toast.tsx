import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  duration = 2200,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-slide-up">
      <div className="bg-black text-white px-4 py-2.5 rounded-full shadow-modal flex items-center gap-2 border border-zinc-800 text-xs font-semibold tracking-tight">
        <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-white">
          <Check size={11} strokeWidth={3} />
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
};
