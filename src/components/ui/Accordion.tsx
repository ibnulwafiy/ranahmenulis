import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export interface AccordionItemProps {
  id: string | number;
  title: string;
  badge?: string;
  isCompleted?: boolean;
  onToggleComplete?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  badge,
  isCompleted = false,
  onToggleComplete,
  children,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card
      variant="default"
      padding="none"
      className={`overflow-hidden transition-all duration-200 ${
        isCompleted ? 'border-zinc-300 bg-zinc-50/50' : 'border-zinc-200/80 bg-white'
      }`}
    >
      {/* Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer select-none hover:bg-zinc-50/80 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Checkbox Trigger if provided */}
          {onToggleComplete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(e);
              }}
              className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-150 shrink-0 ${
                isCompleted
                  ? 'bg-black border-black text-white'
                  : 'bg-white border-zinc-300 hover:border-zinc-500'
              }`}
              title={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
            >
              {isCompleted && <Check size={14} strokeWidth={3} />}
            </button>
          )}

          {/* Title and Badge */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm sm:text-base font-bold tracking-tight ${
                  isCompleted ? 'line-through text-zinc-400' : 'text-zinc-900'
                }`}
              >
                {title}
              </span>
              {badge && (
                <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200/60 shrink-0">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expand Chevron Icon */}
        <div
          className={`w-7 h-7 rounded-xl bg-zinc-100/70 flex items-center justify-center text-zinc-500 transition-transform duration-200 shrink-0 ${
            isExpanded ? 'rotate-180 text-zinc-900 bg-zinc-200' : ''
          }`}
        >
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-zinc-100 animate-fade">
          {children}
        </div>
      )}
    </Card>
  );
};
