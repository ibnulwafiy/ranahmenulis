import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  Sparkles,
  Type,
  AlignLeft,
  CheckCircle,
  Book,
  ArrowRightLeft,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import { InspirationCategory } from '@/types';

interface InspirationCardProps {
  category: InspirationCategory;
  onClick: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles: Sparkles,
  Type: Type,
  AlignLeft: AlignLeft,
  CheckCircle: CheckCircle,
  Book: Book,
  ArrowRightLeft: ArrowRightLeft,
  HelpCircle: HelpCircle,
};

export const InspirationCard: React.FC<InspirationCardProps> = ({
  category,
  onClick,
}) => {
  const Icon = ICON_MAP[category.iconName] || Sparkles;

  return (
    <Card
      variant="default"
      padding="md"
      interactive
      onClick={onClick}
      className="group flex items-center justify-between gap-4 select-none"
    >
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Category Icon */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
          <Icon size={19} />
        </div>

        {/* Text Details */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight leading-snug truncate">
              {category.title}
            </h3>
            <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200/50 shrink-0">
              {category.itemCount} ide
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
            {category.shortDescription}
          </p>
        </div>
      </div>

      {/* Chevron Arrow */}
      <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
        <ChevronRight size={17} />
      </div>
    </Card>
  );
};
