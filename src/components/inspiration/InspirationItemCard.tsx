import React from 'react';
import { Card } from '@/components/ui/Card';
import { Copy, Heart, Check } from 'lucide-react';
import { InspirationItem } from '@/types';

interface InspirationItemCardProps {
  item: InspirationItem;
  isFavorite: boolean;
  isCopied: boolean;
  onCopy: (item: InspirationItem) => void;
  onToggleFavorite: (item: InspirationItem) => void;
}

export const InspirationItemCard: React.FC<InspirationItemCardProps> = ({
  item,
  isFavorite,
  isCopied,
  onCopy,
  onToggleFavorite,
}) => {
  return (
    <Card
      variant="default"
      padding="md"
      className="flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-colors"
    >
      {/* Content Text */}
      <div className="space-y-2">
        {item.tag && (
          <span className="inline-block text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200/60">
            {item.tag}
          </span>
        )}
        <p className="text-sm sm:text-base font-medium text-zinc-900 leading-relaxed">
          {item.content}
        </p>
        {item.context && (
          <p className="text-xs text-zinc-500 font-normal italic">
            {item.context}
          </p>
        )}
      </div>

      {/* Action Footer: Copy & Favorite Buttons */}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
        {/* Copy Button */}
        <button
          onClick={() => onCopy(item)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 active:scale-95 focus:outline-none ${
            isCopied
              ? 'bg-zinc-900 text-white'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 border border-zinc-200/60'
          }`}
          title="Salin ke clipboard"
        >
          {isCopied ? (
            <>
              <Check size={13} strokeWidth={2.5} />
              <span>Tersalin</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Salin</span>
            </>
          )}
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(item)}
          className={`p-2 rounded-xl transition-all duration-150 active:scale-90 focus:outline-none flex items-center gap-1.5 text-xs font-medium ${
            isFavorite
              ? 'text-black bg-zinc-100'
              : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100'
          }`}
          title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
          aria-label="Favorite"
        >
          <Heart
            size={16}
            fill={isFavorite ? '#0A0A0A' : 'none'}
            strokeWidth={isFavorite ? 0 : 2}
            className={`transition-transform duration-150 ${isFavorite ? 'scale-110' : ''}`}
          />
          <span className="hidden sm:inline text-xs font-semibold text-zinc-700">
            {isFavorite ? 'Tersimpan' : 'Favorit'}
          </span>
        </button>
      </div>
    </Card>
  );
};
