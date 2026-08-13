import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { supabase } from '@/services/supabase';
import {
  PenLine,
  Target,
  Quote,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
  BookmarkCheck,
  Flame,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [draft, setDraft] = useState<{ title: string; content: string; target_word_count: number } | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const loadDraft = async () => {
      try {
        const { data, error } = await supabase
          .from('drafts')
          .select('title, content, target_word_count')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!error && data) {
          setDraft(data);
        }
      } catch (err) {
        console.error('Error loading draft for dashboard:', err);
      }
    };

    loadDraft();
  }, [user?.id]);

  const title = draft?.title || 'Draft Naskah Baru';
  const wordCount = draft?.content ? draft.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const targetWords = draft?.target_word_count || 500;
  const percentage = targetWords > 0 ? Math.min(100, Math.round((wordCount / targetWords) * 100)) : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Dashboard Top Header */}
      <section className="space-y-1 pt-1 sm:pt-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Halo, {user.name || 'Penulis'} 👋
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 font-medium">
          Selamat datang kembali.
        </p>
      </section>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Card: Progress Workspace (Spans 12 or 7 cols) */}
        <div className="md:col-span-7 flex flex-col">
          <Card
            variant="default"
            padding="lg"
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Title & Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800">
                    <BookmarkCheck size={17} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 tracking-tight leading-none">
                      Progress Workspace
                    </h2>
                    <p className="text-xs text-zinc-500 font-medium mt-1">
                      Naskah Antologi Utama
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/60">
                  Draft Utama
                </span>
              </div>

              {/* Progress Title & Bar */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-800 truncate">
                    {title}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 ml-2">
                    {percentage}%
                  </span>
                </div>
                <ProgressBar
                  value={percentage}
                  max={100}
                  showPercentage={false}
                  size="md"
                />
              </div>
            </div>

            {/* Quick footnote */}
            <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5 font-medium">
                <FileText size={14} className="text-zinc-400" />
                Draft tersimpan otomatis
              </span>
              <span className="font-semibold text-zinc-800">
                Deadline: 14 Hari Lagi
              </span>
            </div>
          </Card>
        </div>

        {/* Card: Today's Target (Spans 12 or 5 cols) */}
        <div className="md:col-span-5 flex flex-col">
          <Card
            variant="default"
            padding="lg"
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800">
                    <Target size={17} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 tracking-tight leading-none">
                      Today's Target
                    </h2>
                    <p className="text-xs text-zinc-500 font-medium mt-1">
                      Komitmen Menulis Harian
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/60">
                  <Flame size={13} className="text-zinc-700" />
                  <span>3 Hari Beruntun</span>
                </div>
              </div>

              {/* Target Highlight */}
              <div className="mt-2 py-4 px-5 rounded-2xl bg-black text-white text-center shadow-sm">
                <div className="text-3xl font-extrabold tracking-tight">
                  {targetWords} <span className="text-base font-normal text-zinc-400">Kata</span>
                </div>
                <div className="mt-2 text-xs text-zinc-300 font-medium">
                  {wordCount} dari {targetWords} kata tercapai hari ini
                </div>
                <div className="mt-3">
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (wordCount / targetWords) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-zinc-400 text-center font-medium">
              Target teratur menghasilkan antologi terbaik.
            </p>
          </Card>
        </div>
      </div>

      {/* Primary Action Button: Lanjut Menulis */}
      <section className="pt-1">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate('/menulis')}
          leftIcon={<PenLine size={20} />}
          rightIcon={<ChevronRight size={18} />}
          className="py-4 rounded-2xl shadow-card text-base font-semibold"
        >
          Lanjut Menulis
        </Button>
      </section>

      {/* Card: Quote of the Day & Card: Aktivitas Terakhir Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Card: Quote of the Day (Static placeholder) */}
        <div className="md:col-span-6 flex flex-col">
          <Card
            variant="default"
            padding="lg"
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800">
                  <Quote size={17} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 tracking-tight leading-none">
                    Quote of the Day
                  </h2>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Inspirasi Ruang Tulis
                  </p>
                </div>
              </div>

              {/* Static Quote Placeholder */}
              <blockquote className="mt-3 p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60">
                <p className="text-sm font-medium text-zinc-800 italic leading-relaxed">
                  "Menulislah dengan bebas tanpa menghakimi diri di draf pertama. Keajaiban sebuah karya lahir saat kita berani menyelesaikannya."
                </p>
                <footer className="mt-3 text-xs font-semibold text-zinc-500 text-right">
                  — Ranah Menulis Curated
                </footer>
              </blockquote>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-zinc-600 font-medium">
              <Sparkles size={13} className="text-zinc-600" />
              <span>Diperbarui setiap hari untuk menemani proses karyamu.</span>
            </div>
          </Card>
        </div>

        {/* Card: Aktivitas Terakhir (Placeholder) */}
        <div className="md:col-span-6 flex flex-col">
          <Card
            variant="default"
            padding="lg"
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800">
                    <Clock size={17} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 tracking-tight leading-none">
                      Aktivitas Terakhir
                    </h2>
                    <p className="text-xs text-zinc-500 font-medium mt-1">
                      Catatan Perubahan & Draft
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-zinc-600">
                  Terbaru
                </span>
              </div>

              {/* Activity List Placeholders */}
              <div className="mt-2 space-y-2.5">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/50 flex items-center justify-between hover:bg-zinc-100/70 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-zinc-900 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 truncate">
                        Revisi Dialog Bab 2
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">
                        Menambahkan 120 kata
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium shrink-0 ml-2">
                    Hari ini, 14:20
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/50 flex items-center justify-between hover:bg-zinc-100/70 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-zinc-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 truncate">
                        Menyusun Outline Karakter
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">
                        Catatan ide di modul inspirasi
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium shrink-0 ml-2">
                    Kemarin, 20:15
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/50 flex items-center justify-between hover:bg-zinc-100/70 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-zinc-300 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 truncate">
                        Selesai Bab 1: Titik Temu
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">
                        Draf awal terkirim ke arsip
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium shrink-0 ml-2">
                    2 hari lalu
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 text-center">
              <span className="text-[11px] text-zinc-600 font-medium">
                Placeholder riwayat aktivitas antologi.
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
