import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  PenLine,
  Bot,
  User,
  ArrowLeft,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export type PlaceholderType = 'inspirasi' | 'menulis' | 'ai' | 'profil';

interface PlaceholderConfig {
  title: string;
  shortDescription: string;
  icon: React.ComponentType<any>;
  features: string[];
  badge: string;
}

const PLACEHOLDER_CONFIGS: Record<PlaceholderType, PlaceholderConfig> = {
  inspirasi: {
    title: 'Inspirasi',
    shortDescription: 'Temukan pemantik ide, bank premis, dan eksplorasi sudut pandang unik untuk antologi Anda.',
    icon: Sparkles,
    badge: 'Fitur Mendatang',
    features: [
      'Bank Premis Cerita & Prompt Harian',
      'Generator Sudut Pandang Antologi',
      'Kurasi Tema & Moodboard Penulisan',
    ],
  },
  menulis: {
    title: 'Menulis',
    shortDescription: 'Ruang editor fokus tanpa distraksi dengan auto-save dan kalkulator target kata otomatis.',
    icon: PenLine,
    badge: 'Ruang Editor',
    features: [
      'Distraction-Free Zen Writing Mode',
      'Manajemen Bab & Outline Naskah',
      'Export Naskah Siap Cetak (PDF/Docx)',
    ],
  },
  ai: {
    title: 'AI Workspace',
    shortDescription: 'Asisten cerdas kurasi naskah, penghalus diksi, dan partner brainstorming khusus penulis.',
    icon: Bot,
    badge: 'AI Assistant',
    features: [
      'Pemeriksa Diksi & PUEBI Otomatis',
      'Saran Dinamika Konflik & Emosi Cerita',
      'Feedback Draf Cepat & Ringkasan Alur',
    ],
  },
  profil: {
    title: 'Profil Penulis',
    shortDescription: 'Kelola identitas kepenulisan, biodata antologi, dan preferensi workspace Anda.',
    icon: User,
    badge: 'Manajemen Akun',
    features: [
      'Biodata Penulis untuk Buku Antologi',
      'Statistik Produktivitas Menulis Bulanan',
      'Pengaturan Keamanan & Backup Data',
    ],
  },
};

export interface PlaceholderPageProps {
  type: PlaceholderType;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ type }) => {
  const navigate = useNavigate();
  const config = PLACEHOLDER_CONFIGS[type];
  const Icon = config.icon;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Header */}
      <section className="space-y-1 pt-1 sm:pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-sm">
            <Icon size={18} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
            {config.title}
          </h1>
        </div>
        <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
          {config.shortDescription}
        </p>
      </section>

      {/* Coming Soon Card */}
      <Card variant="default" padding="lg" className="border-dashed border-zinc-300">
        <div className="text-center py-6 sm:py-10 max-w-md mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <Clock size={13} className="text-zinc-600" />
            <span>Coming Soon • Segera Hadir</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
            Modul {config.title} Sedang Dikembangkan
          </h2>

          <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-2 leading-relaxed">
            Kami sedang menyempurnakan fitur ini agar memberikan pengalaman terbaik bagi penulis antologi Ranah Menulis.
          </p>

          {/* Feature List Preview */}
          <div className="mt-6 text-left p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-2">
              <Layers size={14} className="text-zinc-700" />
              <span>Kemampuan yang Disiapkan:</span>
            </div>
            {config.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                <CheckCircle2 size={14} className="text-zinc-900 shrink-0 mt-0.5" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>

          {/* Action to Return to Beranda */}
          <div className="mt-8">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/dashboard')}
              leftIcon={<ArrowLeft size={16} />}
              className="mx-auto"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
