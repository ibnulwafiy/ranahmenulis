import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, PenLine, Bot, User } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  isPlaceholder?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'beranda',
    label: 'Beranda',
    path: '/dashboard',
    icon: Home,
    isPlaceholder: false,
  },
  {
    id: 'inspirasi',
    label: 'Inspirasi',
    path: '/inspirasi',
    icon: Sparkles,
    isPlaceholder: false,
  },
  {
    id: 'menulis',
    label: 'Workspace',
    path: '/menulis',
    icon: PenLine,
    isPlaceholder: false,
  },
  {
    id: 'ai',
    label: 'Asisten AI',
    path: '/ai',
    icon: Bot,
    isPlaceholder: false,
  },
  {
    id: 'profil',
    label: 'Profil',
    path: '/profil',
    icon: User,
    isPlaceholder: false,
  },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
      role="navigation"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 relative group focus:outline-none ${
                isActive
                  ? 'text-black font-semibold'
                  : 'text-zinc-400 hover:text-zinc-700 font-medium'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`p-1 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-zinc-100 scale-105' : 'group-active:scale-95'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className="transition-transform duration-200"
                />
              </div>

              <span className="text-[10px] tracking-tight mt-0.5 select-none leading-none">
                {item.label}
              </span>

              {/* Minimal Dot Indicator for Active Item */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-black mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
