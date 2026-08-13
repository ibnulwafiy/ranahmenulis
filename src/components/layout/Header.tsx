import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  showUserBadge?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showUserBadge = true,
}) => {
  const { user, logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F7F7F8]/90 backdrop-blur-md border-b border-zinc-200/60 pt-safe">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white shadow-sm md:hidden">
            <span className="font-bold text-xs">P+</span>
          </div>
          <div>
            {title ? (
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 leading-tight">
                {title}
              </h1>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-900">
                  Penulis+
                </span>
                <span className="text-[11px] font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200/60">
                  Anthology
                </span>
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-zinc-500 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: User Avatar & Quick Actions */}
        {showUserBadge && (
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-zinc-200/80 text-[11px] font-medium text-zinc-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse"></span>
              <span>Online Workspace</span>
            </div>

            {/* User Avatar */}
            <div
              className="w-9 h-9 rounded-xl bg-zinc-200 border border-zinc-300 flex items-center justify-center text-zinc-900 font-bold text-xs tracking-tight shadow-sm select-none"
              title={user.name || 'Penulis'}
            >
              {getInitials(user.name)}
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="p-2 rounded-xl text-zinc-500 hover:text-black hover:bg-zinc-200/60 transition-colors duration-150 focus:outline-none"
              title="Keluar dari Workspace"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
