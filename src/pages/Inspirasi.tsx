import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowLeft, Heart, FileQuestion, X } from 'lucide-react';
import { InspirationCategoryId, InspirationItem } from '@/types';
import { InspirationCard } from '@/components/inspiration/InspirationCard';
import { InspirationItemCard } from '@/components/inspiration/InspirationItemCard';
import { Toast } from '@/components/ui/Toast';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { contentService } from '@/services/contentService';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';

export const Inspirasi: React.FC = () => {
  const { user } = useAuth();

  // Navigation state inside Inspiration module: null = Home View, string = Selected Category ID
  const [selectedCategoryId, setSelectedCategoryId] = useState<InspirationCategoryId | null>(null);
  
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter by favorite tab toggle (optional nice touch for anthology writers)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Favorites state (IDs only)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [lastCopiedId, setLastCopiedId] = useState<string | null>(null);

  // Fetch favorites from Supabase
  useEffect(() => {
    if (!user?.id) return;
    
    const loadFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('favorite_inspirations')
          .select('inspiration_id')
          .eq('user_id', user.id);

        if (!error && data) {
          setFavorites(data.map((item) => item.inspiration_id));
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    loadFavorites();
  }, [user?.id]);

  const categories = useMemo(() => {
    return contentService.getInspirationCategories();
  }, []);

  const selectedCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return categories.find((c) => c.id === selectedCategoryId) || null;
  }, [selectedCategoryId, categories]);

  // Copy handler with fallback
  const handleCopy = async (item: InspirationItem) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(item.content);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = item.content;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setLastCopiedId(item.id);
      setToastMessage('Berhasil disalin');
      setIsToastVisible(true);

      setTimeout(() => {
        setLastCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
      setToastMessage('Gagal menyalin');
      setIsToastVisible(true);
    }
  };

  // Favorite toggle handler (ID only)
  const handleToggleFavorite = async (item: InspirationItem) => {
    if (!user?.id) return;

    const exists = favorites.includes(item.id);
    if (exists) {
      setFavorites((prev) => prev.filter((id) => id !== item.id));
      try {
        await supabase
          .from('favorite_inspirations')
          .delete()
          .eq('user_id', user.id)
          .eq('inspiration_id', item.id);
      } catch (err) {
        console.error('Error removing favorite:', err);
      }
    } else {
      setFavorites((prev) => [...prev, item.id]);
      try {
        await supabase
          .from('favorite_inspirations')
          .insert({
            user_id: user.id,
            inspiration_id: item.id,
          });
      } catch (err) {
        console.error('Error adding favorite:', err);
      }
    }
  };

  // Filtered items computation using contentService search
  const filteredItems = useMemo(() => {
    const rawMatches = contentService.searchInspiration(searchQuery, selectedCategoryId);

    if (!showOnlyFavorites) {
      return rawMatches;
    }

    return rawMatches.filter((item) => favorites.includes(item.id));
  }, [selectedCategoryId, searchQuery, showOnlyFavorites, favorites]);

  // If in Home view and user types a search query, show matched items immediately
  const isGlobalSearching = !selectedCategoryId && searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-8">
      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* TOP HEADER SECTION */}
      {!selectedCategory ? (
        /* Inspiration Home Header */
        <section className="space-y-1 pt-1 sm:pt-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Inspirasi
            </h1>

            {favorites.length > 0 && (
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border ${
                  showOnlyFavorites
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <Heart size={13} fill={showOnlyFavorites ? '#FFFFFF' : 'none'} />
                <span>Tersimpan ({favorites.length})</span>
              </button>
            )}
          </div>
          <p className="text-sm sm:text-base text-zinc-500 font-medium">
            Temukan ide sebelum mulai menulis.
          </p>
        </section>
      ) : (
        /* Category Detail Header with Back Button */
        <section className="space-y-3 pt-1 sm:pt-2">
          <button
            onClick={() => {
              setSelectedCategoryId(null);
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors duration-150 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Kategori Inspirasi</span>
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              {selectedCategory.title}
            </h1>
            <p className="text-sm text-zinc-500 font-medium mt-0.5">
              {selectedCategory.shortDescription}
            </p>
          </div>
        </section>
      )}

      {/* SEARCH BAR */}
      <section>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-zinc-400 pointer-events-none flex items-center">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder={
              selectedCategory
                ? `Cari dalam ${selectedCategory.title}...`
                : 'Cari ide cerita, judul, diksi, atau pembuka...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-medium rounded-2xl border border-zinc-200/90 pl-11 pr-10 py-3.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
              aria-label="Hapus pencarian"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      {/* 1. Category Cards List (Inspiration Home when not searching) */}
      {!selectedCategoryId && !isGlobalSearching && !showOnlyFavorites && (
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Kategori Inspirasi
            </span>
            <span className="text-xs font-medium text-zinc-400">
              {categories.length} Kategori • 70 Koleksi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {categories.map((category) => (
              <InspirationCard
                key={category.id}
                category={category}
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setSearchQuery('');
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. Items List (Inside Category OR Global Search Result OR Favorites View) */}
      {(selectedCategoryId || isGlobalSearching || showOnlyFavorites) && (
        <section className="space-y-4">
          {/* Header info when searching globally */}
          {isGlobalSearching && !selectedCategoryId && (
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-zinc-500">
                Hasil pencarian untuk "{searchQuery}": {filteredItems.length} ide
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-zinc-900 hover:underline"
              >
                Reset
              </button>
            </div>
          )}

          {/* Items Container */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
              {filteredItems.map((item) => (
                <InspirationItemCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  isCopied={lastCopiedId === item.id}
                  onCopy={handleCopy}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <Card variant="default" padding="lg" className="border-dashed border-zinc-300">
              <div className="text-center py-10 max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-400 mx-auto">
                  <FileQuestion size={24} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                  Tidak ada hasil ditemukan.
                </h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  {searchQuery
                    ? `Tidak ditemukan ide yang cocok dengan kata kunci "${searchQuery}". Coba gunakan kata kunci lain.`
                    : 'Belum ada item yang tersimpan di daftar favorit Anda.'}
                </p>
                {searchQuery && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                    >
                      Hapus Kata Kunci
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}
        </section>
      )}
    </div>
  );
};
