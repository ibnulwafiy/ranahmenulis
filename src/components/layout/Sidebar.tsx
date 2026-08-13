import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, PenLine, Bot, User, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  {
    id: 'beranda',
    label: 'Beranda',
    path: '/dashboard',
    icon: Home,
    description: 'Workspace utama',
  },
  {
    id: 'inspirasi',
    label: 'Inspirasi',
    path: '/inspirasi',
    icon: Sparkles,
    description: 'Ide & pemantik naskah',
  },
  {
    id: 'menulis',
    label: 'Menulis',
    path: '/menulis',
    icon: PenLine,
    description: 'Editor antologi',
  },
  {
    id: 'ai',
    label: 'AI Workspace',
    path: '/ai',
    icon: Bot,
    description: 'Asisten ide & kurasi',
  },
  {
    id: 'profil',
    label: 'Profil',
    path: '/profil',
    icon: User,
    description: 'Akun & preferensi',
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-zinc-200/80 min-h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-100 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm shrink-0">
          <span className="font-bold text-sm tracking-tighter">P+</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-zinc-900 tracking-tight leading-none truncate">
            Penulis+ Workspace
          </h2>
          <p className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase mt-1 truncate">
            by Ranah Menulis
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Navigasi Workspace
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-left transition-all duration-200 group focus:outline-none ${
                isActive
                  ? 'bg-zinc-900 text-white font-medium shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-500 group-hover:text-zinc-900'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold tracking-tight leading-none truncate">
                  {item.label}
                </div>
                <div
                  className={`text-[11px] truncate mt-1 ${
                    isActive ? 'text-zinc-400' : 'text-zinc-400'
                  }`}
                >
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}

        {/* Anthology Batch Badge Card */}
        <div className="pt-6 px-1">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 mb-1">
              <BookOpen size={14} className="text-zinc-700" />
              <span>Antologi Batch 2026</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Ruang kerja resmi penulis antologi Ranah Menulis.
            </p>
          </div>
        </div>
      </div>

      {/* User Card & Logout Footer */}
      <div className="p-4 border-t border-zinc-100 bg-white">
        <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-zinc-50 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 font-bold text-xs shrink-0">
              {user.name ? user.name.slice(0, 2).toUpperCase() : 'P'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-zinc-900 truncate">
                {user.name || 'Penulis'}
              </div>
              <div className="text-[10px] text-zinc-500 truncate">
                Aktif • Workspace
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
            title="Keluar"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
