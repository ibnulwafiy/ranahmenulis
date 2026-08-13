import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsReady(true);
        if (user.isLoggedIn) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }, 1000); // 1.0s splash screen duration for premium feel

      return () => clearTimeout(timer);
    }
  }, [isLoading, user.isLoggedIn, navigate]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#F7F7F8] flex flex-col items-center justify-between p-8 transition-opacity duration-300 ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full" />

      {/* Center Brand */}
      <div className="flex flex-col items-center text-center animate-scale-in">
        <Logo size="xl" />
        <div className="mt-5 space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            Penulis+ Workspace
          </h1>
          <p className="text-xs text-zinc-500 font-medium tracking-wide">
            Ruang Kerja Penulis Antologi
          </p>
        </div>

        {/* Minimal loading dot */}
        <div className="mt-8 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse delay-75"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse delay-150"></span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
          by Ranah Menulis
        </p>
      </div>
    </div>
  );
};
