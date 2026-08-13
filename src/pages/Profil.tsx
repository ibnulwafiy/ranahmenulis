import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PenLine,
  Flame,
  Target,
  FileText,
  Sparkles,
  Bot,
  BookMarked,
  ShieldCheck,
  Info,
  Lock,
  LogOut,
  ChevronRight,
  Edit3,
  Check,
  X,
  Type,
  LayoutTemplate,
  Book,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Toast } from '@/components/ui/Toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/services/supabase';

export const Profil: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserName } = useAuth();

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  // Edit Name Modal / Inline Edit State
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name || '');

  // Modal info state (for About & Privacy Policy)
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'password' | null>(null);

  const [stats, setStats] = useState({
    favPromptsCount: 0,
    favInspirasiCount: 0,
    completedBlueprintCount: 0,
    draftTitle: '',
    draftContent: '',
    targetWords: 300,
  });

  useEffect(() => {
    if (!user?.id) return;

    const loadStats = async () => {
      try {
        const [promptsRes, inspirationsRes, blueprintRes, draftsRes] = await Promise.all([
          supabase.from('favorite_prompts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
          supabase.from('favorite_inspirations').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
          supabase.from('blueprint_progress').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
          supabase.from('drafts').select('title, content, target_word_count').eq('user_id', user.id).maybeSingle(),
        ]);

        setStats({
          favPromptsCount: promptsRes.count || 0,
          favInspirasiCount: inspirationsRes.count || 0,
          completedBlueprintCount: blueprintRes.count || 0,
          draftTitle: draftsRes.data?.title || '',
          draftContent: draftsRes.data?.content || '',
          targetWords: draftsRes.data?.target_word_count || 500,
        });
      } catch (err) {
        console.error('Error loading profile stats:', err);
      }
    };

    loadStats();
  }, [user?.id]);

  const favPromptsCount = stats.favPromptsCount;
  const completedBlueprintCount = stats.completedBlueprintCount;
  const draftTitle = stats.draftTitle || 'Draft Naskah Baru';
  const draftContent = stats.draftContent;
  const targetWords = stats.targetWords;
  
  const currentWords = useMemo(() => {
    const trimmed = draftContent.trim();
    return trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  }, [draftContent]);

  const progressPercentage = useMemo(() => {
    if (!targetWords) return 0;
    return Math.min(100, Math.round((currentWords / targetWords) * 100));
  }, [currentWords, targetWords]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tempName.trim();
    if (!trimmed) {
      showToast('Nama tidak boleh kosong');
      return;
    }
    updateUserName(trimmed);
    setIsEditingName(false);
    showToast('Nama profil berhasil diperbarui');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Recent activities list (Curated for Anthology Writer Workspace)
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Menyusun Bab 3 Naskah',
      detail: 'Menambahkan 180 kata di Editor Menulis',
      time: 'Hari ini, 14:20',
      icon: PenLine,
    },
    {
      id: 'act-2',
      title: 'Menyimpan Prompt Asisten AI',
      detail: 'Menyimpan prompt "Hook Pembuka Sensorik"',
      time: 'Hari ini, 11:05',
      icon: Bot,
    },
    {
      id: 'act-3',
      title: 'Menyelesaikan Blueprint Hari ke-3',
      detail: 'Modul Struktur 3 Babak Naskah',
      time: 'Kemarin, 20:45',
      icon: Check,
    },
    {
      id: 'act-4',
      title: 'Eksplorasi Kamus Diksi Sastra',
      detail: 'Mempelajari 10 diksi puitis emosi rasa',
      time: '2 hari lalu',
      icon: Book,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* Page Header */}
      <section className="space-y-1 pt-1 sm:pt-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Profil Penulis
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 font-medium">
          Kelola identitas, statistik menulis, dan preferensi workspace Anda.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: WRITER PROFILE CARD */}
      {/* ========================================================================= */}
      <Card padding="lg" className="bg-white border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 text-white flex items-center justify-center text-xl sm:text-2xl font-bold tracking-tight shadow-sm shrink-0">
              {user.name ? user.name.slice(0, 2).toUpperCase() : 'P+'}
            </div>

            {/* Writer Name & Badges */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight truncate">
                  {user.name || 'Penulis Antologi'}
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                  Batch 2026
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Daily Goal Badge */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/60">
                  <Target size={13} className="text-zinc-600" />
                  <span>Target: {targetWords} Kata/hari</span>
                </span>

                {/* Current Streak Badge */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/60">
                  <Flame size={13} className="text-amber-600" />
                  <span>3 Hari Beruntun</span>
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTempName(user.name || '');
                setIsEditingName(true);
              }}
              leftIcon={<Edit3 size={14} />}
              className="font-semibold text-xs rounded-xl"
            >
              Ubah Profil
            </Button>
          </div>
        </div>

        {/* Inline Name Edit Drawer/Box */}
        {isEditingName && (
          <form onSubmit={handleSaveName} className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade">
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Nama Lengkap / Nama Pena Penulis:
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Masukkan nama pena..."
                className="w-full bg-zinc-50 text-zinc-900 text-sm font-medium rounded-xl border border-zinc-300 px-3.5 py-2.5 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 sm:self-end">
              <Button type="submit" variant="primary" size="sm" leftIcon={<Check size={14} />}>
                Simpan
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditingName(false)}
                leftIcon={<X size={14} />}
              >
                Batal
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* ========================================================================= */}
      {/* SECTION 2: WRITING STATISTICS (4 Stat Cards) */}
      {/* ========================================================================= */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Statistik Penulisan
          </span>
          <span className="text-xs font-medium text-zinc-400">
            Performa Produktivitas
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Drafts */}
          <Card padding="md" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Draf
              </span>
              <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <FileText size={15} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                {draftTitle ? '1 Naskah' : '3 Draf'}
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Naskah antologi aktif
              </p>
            </div>
          </Card>

          {/* Card 2: Words Written */}
          <Card padding="md" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Total Kata
              </span>
              <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <Type size={15} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                2,450
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Kata tertulis di sesi ini
              </p>
            </div>
          </Card>

          {/* Card 3: Current Streak */}
          <Card padding="md" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Streak
              </span>
              <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <Flame size={15} className="text-amber-600" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                3 Hari
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Konsistensi menulis harian
              </p>
            </div>
          </Card>

          {/* Card 4: Workspace Progress */}
          <Card padding="md" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Progress
              </span>
              <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <Target size={15} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                65%
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Kesiapan naskah akhir
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TODAY'S GOAL */}
      {/* ========================================================================= */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Target Hari Ini
          </span>
          <span className="text-xs font-medium text-zinc-400">
            {progressPercentage}% Tercapai
          </span>
        </div>

        <Card padding="lg" className="bg-zinc-900 text-white border-black space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Target Menulis Harian
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {currentWords} <span className="text-sm font-normal text-zinc-400">dari {targetWords} Kata</span>
              </h3>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/menulis')}
              leftIcon={<PenLine size={14} />}
              className="bg-white text-black hover:bg-zinc-100 font-semibold self-start sm:self-auto"
            >
              Lanjut Menulis
            </Button>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Tersisa {Math.max(0, targetWords - currentWords)} kata lagi untuk mencapai target hari ini</span>
              <span className="font-semibold text-white">{progressPercentage}%</span>
            </div>
          </div>
        </Card>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: FAVORITES (4 Quick Access Cards) */}
      {/* ========================================================================= */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Konten Tersimpan & Favorit
          </span>
          <span className="text-xs font-medium text-zinc-400">
            Akses Cepat Bookmark
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* 1. Favorite Titles */}
          <Card
            padding="md"
            interactive
            onClick={() => navigate('/inspirasi')}
            className="group flex items-center justify-between gap-4 select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                <Type size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-zinc-900 tracking-tight leading-snug">
                  Ide Judul Favorit
                </h4>
                <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                  Variasi judul naskah tersimpan
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
              <ChevronRight size={17} />
            </div>
          </Card>

          {/* 2. Favorite Story Ideas */}
          <Card
            padding="md"
            interactive
            onClick={() => navigate('/inspirasi')}
            className="group flex items-center justify-between gap-4 select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                <Sparkles size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-zinc-900 tracking-tight leading-snug">
                  Ide Cerita Favorit
                </h4>
                <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                  Premis dan konflik naskah
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
              <ChevronRight size={17} />
            </div>
          </Card>

          {/* 3. Favorite Prompts */}
          <Card
            padding="md"
            interactive
            onClick={() => navigate('/ai')}
            className="group flex items-center justify-between gap-4 select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                <Bot size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-zinc-900 tracking-tight leading-snug">
                    Prompt Asisten AI
                  </h4>
                  {favPromptsCount > 0 && (
                    <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                      {favPromptsCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                  Prompt toolkit siap pakai
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
              <ChevronRight size={17} />
            </div>
          </Card>

          {/* 4. Favorite Dictionary */}
          <Card
            padding="md"
            interactive
            onClick={() => navigate('/inspirasi')}
            className="group flex items-center justify-between gap-4 select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                <BookMarked size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-zinc-900 tracking-tight leading-snug">
                  Kamus Diksi Sastra
                </h4>
                <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                  Koleksi diksi indah PUEBI
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
              <ChevronRight size={17} />
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: RECENT ACTIVITY */}
      {/* ========================================================================= */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Aktivitas Terakhir
          </span>
          <span className="text-xs font-medium text-zinc-400">
            Riwayat Sesi
          </span>
        </div>

        <Card padding="md" className="space-y-3">
          <div className="divide-y divide-zinc-100">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0">
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-medium truncate mt-0.5">
                        {act.detail}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-zinc-400 font-medium shrink-0">
                    {act.time}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: WORKSPACE PROGRESS */}
      {/* ========================================================================= */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Progress Modul Workspace
          </span>
          <span className="text-xs font-medium text-zinc-400">
            Status Keseluruhan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Library (Inspirasi) */}
          <Card padding="md" className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-zinc-800" />
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Library Inspirasi
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                7 Kategori Aktif
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Akses ke 70+ ide cerita, judul, kalimat pembuka, penutup, dan kamus diksi.
            </p>
            <ProgressBar value={100} max={100} showPercentage={false} size="sm" />
          </Card>

          {/* Workspace (Menulis) */}
          <Card padding="md" className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenLine size={16} className="text-zinc-800" />
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Workspace Menulis
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                Editor Aktif
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Zen writing editor dengan auto-save lokal dan kalkulator kata real-time.
            </p>
            <ProgressBar value={progressPercentage} max={100} showPercentage={false} size="sm" />
          </Card>

          {/* Writing Assistant */}
          <Card padding="md" className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-zinc-800" />
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Asisten Menulis AI
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                45 Prompt Terkurasi
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              9 kategori prompt teruji untuk brainstorming, proofreading, dan revisi alur.
            </p>
            <ProgressBar value={100} max={100} showPercentage={false} size="sm" />
          </Card>

          {/* Blueprint 10 Hari */}
          <Card padding="md" className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutTemplate size={16} className="text-zinc-800" />
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Blueprint 10 Hari
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                {completedBlueprintCount}/10 Hari
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Panduan terstruktur langkah harian menyelesaikan naskah antologi.
            </p>
            <ProgressBar value={completedBlueprintCount || 4} max={10} showPercentage={false} size="sm" />
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: SETTINGS & ACCOUNT ACTIONS */}
      {/* ========================================================================= */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Pengaturan & Keamanan
          </span>
          <span className="text-xs font-medium text-zinc-400">
            Preferensi Akun
          </span>
        </div>

        <Card padding="md" className="divide-y divide-zinc-100 space-y-0">
          {/* Workspace Password */}
          <div
            onClick={() => setActiveModal('password')}
            className="py-3.5 first:pt-1 flex items-center justify-between cursor-pointer hover:bg-zinc-50/80 -mx-4 px-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <Lock size={15} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Password Workspace
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">
                  Autentikasi akses ruang kerja antologi aktif
                </p>
              </div>
            </div>
            <ChevronRight size={17} className="text-zinc-400" />
          </div>

          {/* About Penulis+ */}
          <div
            onClick={() => setActiveModal('about')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-50/80 -mx-4 px-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <Info size={15} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Tentang Penulis+ Workspace
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">
                  Versi 2.4.0 • Ranah Menulis 2026
                </p>
              </div>
            </div>
            <ChevronRight size={17} className="text-zinc-400" />
          </div>

          {/* Privacy Policy */}
          <div
            onClick={() => setActiveModal('privacy')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-50/80 -mx-4 px-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                <ShieldCheck size={15} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                  Kebijakan Privasi & Data Lokal
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">
                  100% naskah tersimpan di perangkat lokal Anda
                </p>
              </div>
            </div>
            <ChevronRight size={17} className="text-zinc-400" />
          </div>

          {/* Logout Action */}
          <div
            onClick={handleLogout}
            className="py-3.5 last:pb-1 flex items-center justify-between cursor-pointer hover:bg-red-50/40 -mx-4 px-4 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
                <LogOut size={15} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-red-600">
                  Keluar dari Workspace
                </h4>
                <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                  Tutup sesi menulis pada perangkat ini
                </p>
              </div>
            </div>
            <ChevronRight size={17} className="text-red-400" />
          </div>
        </Card>
      </section>

      {/* ========================================================================= */}
      {/* MODAL DIALOGS (About, Privacy, Password Info) */}
      {/* ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade">
          <Card padding="lg" className="w-full max-w-md bg-white border-zinc-200 shadow-2xl space-y-4">
            {activeModal === 'password' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Lock size={18} className="text-zinc-900" />
                    <h3 className="text-base font-bold text-zinc-900">Password Workspace</h3>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg text-zinc-400 hover:text-black">
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  Sesi workspace Anda terlindungi dengan Password Workspace resmi program antologi Ranah Menulis. Kredensial tersimpan secara aman pada penyimpanan sesi lokal perangkat.
                </p>
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-800 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Status: Terotentikasi & Aktif</span>
                </div>
              </>
            )}

            {activeModal === 'about' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Info size={18} className="text-zinc-900" />
                    <h3 className="text-base font-bold text-zinc-900">Tentang Penulis+</h3>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg text-zinc-400 hover:text-black">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  <p>
                    <strong>Penulis+ Workspace</strong> adalah ruang kerja digital eksklusif yang dirancang khusus untuk memfasilitasi para peserta penulisan buku antologi bersama <em>Ranah Menulis</em>.
                  </p>
                  <p>
                    Menggabungkan perpustakaan inspirasi terkurasi, ruang tulis bebas distraksi, blueprint naskah 10 hari, dan panduan prompt AI sastra.
                  </p>
                </div>
                <div className="text-[11px] text-zinc-400 font-semibold pt-1">
                  © 2026 Ranah Menulis • Hak Cipta Dilindungi
                </div>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-zinc-900" />
                    <h3 className="text-base font-bold text-zinc-900">Kebijakan Privasi</h3>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg text-zinc-400 hover:text-black">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  <p>
                    Semua draf naskah, refleksi workbook harian, dan preferensi tersimpan Anda disimpan 100% secara lokal pada penyimpanan perangkat Anda (Browser Local Storage).
                  </p>
                  <p>
                    Penulis+ tidak mengirimkan isi naskah Anda ke server pihak ketiga tanpa persetujuan Anda. Hak cipta naskah sepenuhnya milik penulis.
                  </p>
                </div>
              </>
            )}

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setActiveModal(null)}>
                Tutup
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
