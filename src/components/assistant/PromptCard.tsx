import React from 'react';
import { Copy, Heart, Sparkles, Tag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AiPromptItem } from '@/types';

interface PromptCardProps {
  item: AiPromptItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string) => void;
  categoryTitle?: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onCopy,
  categoryTitle,
}) => {
  return (
    <Card padding="lg" className="space-y-4 transition-all duration-200">
      {/* Top Meta & Title */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {item.tag && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200/60">
                <Tag size={10} className="text-zinc-500" />
                <span>{item.tag}</span>
              </span>
            )}
            {categoryTitle && (
              <span className="text-[10px] font-medium text-zinc-400">
                • {categoryTitle}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          className={`p-2.5 rounded-xl border transition-all duration-150 shrink-0 ${
            isFavorite
              ? 'bg-zinc-900 border-black text-white shadow-sm'
              : 'bg-white border-zinc-200 text-zinc-400 hover:text-zinc-800 hover:border-zinc-300'
          }`}
          title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        >
          <Heart
            size={16}
            fill={isFavorite ? '#FFFFFF' : 'none'}
            strokeWidth={isFavorite ? 0 : 2}
          />
        </button>
      </div>

      {/* Code Block Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-1">
          <span>Prompt Siap Pakai</span>
          <span className="text-zinc-400 font-normal lowercase">Salin & tempel ke ChatGPT / Claude</span>
        </div>

        <div className="relative group">
          <pre className="p-4 sm:p-5 rounded-2xl bg-zinc-900 text-zinc-100 text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed overflow-x-auto border border-zinc-800 selection:bg-zinc-700 selection:text-white">
            {item.promptText}
          </pre>

          {/* Quick Copy Floating Trigger on Hover (Desktop) */}
          <button
            onClick={() => onCopy(item.promptText)}
            className="hidden sm:flex absolute top-3 right-3 items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold backdrop-blur-sm border border-zinc-700/60 shadow-sm transition-all"
            title="Salin Prompt"
          >
            <Copy size={13} />
            <span>Salin</span>
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
          <Sparkles size={13} className="text-zinc-500 shrink-0" />
          <span>Ganti teks di dalam tanda kurung siku <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-700 font-mono text-[10px]">[ ... ]</code> sebelum dikirim.</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onCopy(item.promptText)}
          leftIcon={<Copy size={14} />}
          className="w-full sm:w-auto shrink-0 shadow-sm"
        >
          Salin Prompt
        </Button>
      </div>
    </Card>
  );
};
