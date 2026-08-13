import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  LayoutTemplate,
  Type,
  AlignLeft,
  CheckCircle,
  Book,
  CheckCheck,
  Heart,
  Share2,
  Search,
  X,
  ChevronRight,
  ArrowLeft,
  Bot,
  Lightbulb,
  Target,
  GitMerge,
  UserPlus,
  Clapperboard,
  ChevronRightSquare,
  MessageSquare,
  PenTool,
  FileText,
  Megaphone,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Toast } from '@/components/ui/Toast';
import { PromptCard } from '@/components/assistant/PromptCard';
import { AiPromptCategoryId } from '@/types';
import { contentService } from '@/services/contentService';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles,
  LayoutTemplate,
  Type,
  AlignLeft,
  CheckCircle,
  Book,
  CheckCheck,
  Heart,
  Share2,
  Lightbulb,
  Target,
  GitMerge,
  UserPlus,
  Clapperboard,
  ChevronRightSquare,
  MessageSquare,
  PenTool,
  FileText,
  Megaphone,
};

export const AsistenMenulis: React.FC = () => {
  const { user } = useAuth();

  // Category navigation state
  const [selectedCategoryId, setSelectedCategoryId] = useState<AiPromptCategoryId | null>(null);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Favorites filter state
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Favorites stored (IDs only)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch favorite prompts from Supabase
  useEffect(() => {
    if (!user?.id) return;

    const loadFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('favorite_prompts')
          .select('prompt_id')
          .eq('user_id', user.id);

        if (!error && data) {
          setFavorites(data.map((item) => item.prompt_id));
        }
      } catch (err) {
        console.error('Error fetching favorite prompts:', err);
      }
    };

    loadFavorites();
  }, [user?.id]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  const handleCopyPrompt = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Prompt berhasil disalin');
    } catch (e) {
      showToast('Gagal menyalin prompt');
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!user?.id) return;

    const exists = favorites.includes(id);
    if (exists) {
      setFavorites((prev) => prev.filter((item) => item !== id));
      try {
        await supabase
          .from('favorite_prompts')
          .delete()
          .eq('user_id', user.id)
          .eq('prompt_id', id);
      } catch (err) {
        console.error('Error removing favorite prompt:', err);
      }
    } else {
      setFavorites((prev) => [...prev, id]);
      try {
        await supabase
          .from('favorite_prompts')
          .insert({
            user_id: user.id,
            prompt_id: id,
          });
      } catch (err) {
        console.error('Error adding favorite prompt:', err);
      }
    }
  };

  const categories = useMemo(() => {
    return contentService.getPromptCategories();
  }, []);

  // Filtered prompts based on active category, search query, and favorites toggle via contentService
  const filteredPrompts = useMemo(() => {
    const rawMatches = contentService.searchPrompts(searchQuery, selectedCategoryId);

    if (!showOnlyFavorites) {
      return rawMatches;
    }

    return rawMatches.filter((item) => favorites.includes(item.id));
  }, [selectedCategoryId, showOnlyFavorites, searchQuery, favorites]);

  // Active Category details
  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === selectedCategoryId) || null;
  }, [selectedCategoryId, categories]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-10">
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* Header Section */}
      {!selectedCategoryId && !showOnlyFavorites && !searchQuery ? (
        <section className="space-y-1 pt-1 sm:pt-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Asisten Menulis
            </h1>

            {favorites.length > 0 && (
              <button
                onClick={() => setShowOnlyFavorites(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 transition-all shadow-sm"
              >
                <Heart size={13} fill="#0A0A0A" className="text-black" />
                <span>Tersimpan ({favorites.length})</span>
              </button>
            )}
          </div>
          <p className="text-sm sm:text-base text-zinc-500 font-medium">
            Gunakan AI untuk membantumu menemukan ide, memperbaiki tulisan, dan menyelesaikan naskah lebih cepat.
          </p>
        </section>
      ) : (
        <section className="space-y-3 pt-1 sm:pt-2 animate-fade">
          <button
            onClick={() => {
              setSelectedCategoryId(null);
              setShowOnlyFavorites(false);
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Kategori Asisten</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                {showOnlyFavorites
                  ? 'Prompt Tersimpan'
                  : searchQuery && !activeCategory
                  ? `Pencarian: "${searchQuery}"`
                  : activeCategory?.title}
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                {showOnlyFavorites
                  ? 'Kumpulan prompt asisten menulis favorit yang telah kamu simpan.'
                  : searchQuery && !activeCategory
                  ? `Ditemukan ${filteredPrompts.length} prompt yang cocok dengan kata kunci.`
                  : activeCategory?.description}
              </p>
            </div>

            {favorites.length > 0 && !showOnlyFavorites && (
              <button
                onClick={() => setShowOnlyFavorites(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 transition-all self-start sm:self-auto shadow-sm"
              >
                <Heart size={13} fill="#0A0A0A" className="text-black" />
                <span>Tersimpan ({favorites.length})</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* Search Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-zinc-400 pointer-events-none">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder={
            selectedCategoryId
              ? `Cari prompt dalam kategori ${activeCategory?.title}...`
              : 'Cari prompt ide, judul, diksi, proofreading, atau pembuka...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white text-zinc-900 text-sm font-medium rounded-2xl border border-zinc-200/90 pl-11 pr-10 py-3.5 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
            title="Hapus pencarian"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Guide Banner */}
      {!selectedCategoryId && !showOnlyFavorites && !searchQuery && (
        <Card padding="md" className="bg-zinc-50 border-zinc-200/80">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Bot size={18} />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 tracking-tight">
                Cara Menggunakan Prompt Toolkit
              </h3>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                Pilih kategori kebutuhanmu, klik <strong>"Salin Prompt"</strong>, lalu tempelkan ke asisten AI seperti ChatGPT, Claude, atau Gemini. Ganti teks petunjuk dalam tanda kurung siku <code className="bg-white px-1 py-0.5 rounded border border-zinc-200 font-mono text-[10px] text-zinc-800">[ ... ]</code> untuk mendapatkan hasil paling spesifik.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* CATEGORY GRID (When not inside category / search / favorites) */}
      {!selectedCategoryId && !showOnlyFavorites && !searchQuery ? (
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Kategori Asisten Menulis
            </span>
            <span className="text-xs font-medium text-zinc-400">
              {categories.length} Kategori • 45 Prompt
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {categories.map((category) => {
              const Icon = ICON_MAP[category.iconName] || Sparkles;
              return (
                <Card
                  key={category.id}
                  padding="md"
                  interactive
                  onClick={() => setSelectedCategoryId(category.id)}
                  className="group flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight leading-snug truncate">
                          {category.title}
                        </h3>
                        <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200/50">
                          {category.promptCount} prompt
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
                    <ChevronRight size={17} />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : (
        /* PROMPT LIST VIEW (Active category / search results / favorites) */
        <div className="space-y-4 animate-fade">
          {filteredPrompts.length === 0 ? (
            <Card padding="lg" className="border-dashed border-zinc-300 text-center py-12">
              <div className="max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center mx-auto text-zinc-400">
                  <Search size={20} />
                </div>
                <h3 className="text-base font-bold text-zinc-900">
                  {showOnlyFavorites
                    ? 'Belum ada prompt tersimpan'
                    : 'Tidak ada prompt yang sesuai'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  {showOnlyFavorites
                    ? 'Klik ikon hati pada prompt untuk menyimpannya ke daftar favorit agar mudah diakses kembali.'
                    : 'Coba ubah kata kunci pencarian atau telusuri kategori prompt lainnya.'}
                </p>
              </div>
            </Card>
          ) : (
            filteredPrompts.map((promptItem) => {
              const isFav = favorites.includes(promptItem.id);
              const parentCat = categories.find(
                (c) => c.id === promptItem.categoryId
              );

              return (
                <PromptCard
                  key={promptItem.id}
                  item={promptItem}
                  isFavorite={isFav}
                  onToggleFavorite={toggleFavorite}
                  onCopy={handleCopyPrompt}
                  categoryTitle={parentCat?.title}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
