import { InspirationCategory, InspirationItem } from '@/types';
import { storyIdeas } from './storyIdeas';
import { titleIdeas } from './titleIdeas';
import { openingLines } from './openingLines';
import { closingLines } from './closingLines';
import { dictionaries } from './dictionaries';
import { transitions } from './transitions';
import { reflectionQuestions } from './reflectionQuestions';

export const INSPIRATION_CATEGORIES: InspirationCategory[] = [
  {
    id: 'ide-cerita',
    title: 'Ide Cerita',
    shortDescription: 'Premis dan benih konflik emosional untuk naskah antologi.',
    iconName: 'Sparkles',
    itemCount: storyIdeas.length,
  },
  {
    id: 'ide-judul',
    title: 'Ide Judul',
    shortDescription: 'Pilihan judul puitis dan menggugah rasa penasaran pembaca.',
    iconName: 'Type',
    itemCount: titleIdeas.length,
  },
  {
    id: 'kalimat-pembuka',
    title: 'Kalimat Pembuka',
    shortDescription: 'Pengait pertama untuk memikat perhatian pembaca sejak baris awal.',
    iconName: 'AlignLeft',
    itemCount: openingLines.length,
  },
  {
    id: 'kalimat-penutup',
    title: 'Kalimat Penutup',
    shortDescription: 'Kalimat akhir yang meninggalkan resonansi batin mendalam.',
    iconName: 'CheckCircle',
    itemCount: closingLines.length,
  },
  {
    id: 'kamus-diksi',
    title: 'Kamus Diksi',
    shortDescription: 'Pilihan kata arkais dan puitis untuk memperkaya rasa bahasa.',
    iconName: 'Book',
    itemCount: dictionaries.length,
  },
  {
    id: 'kamus-transisi',
    title: 'Kamus Transisi',
    shortDescription: 'Jembatan kalimat untuk mengalirkan adegan tanpa jeda yang kaku.',
    iconName: 'ArrowRightLeft',
    itemCount: transitions.length,
  },
  {
    id: 'pertanyaan-refleksi',
    title: 'Pertanyaan Refleksi',
    shortDescription: 'Pemantik batin untuk menggali memori dan kebenaran terdalam.',
    iconName: 'HelpCircle',
    itemCount: reflectionQuestions.length,
  },
];

export const INSPIRATION_ITEMS: InspirationItem[] = [
  ...storyIdeas.map((item) => ({
    id: String(item.id),
    content: item.content,
    category: 'ide-cerita' as const,
    tag: item.tag,
  })),
  ...titleIdeas.map((item) => ({
    id: String(item.id),
    content: item.title || item.content || '',
    category: 'ide-judul' as const,
    tag: item.tag,
  })),
  ...openingLines.map((item) => ({
    id: String(item.id),
    content: item.content,
    category: 'kalimat-pembuka' as const,
    tag: item.tag,
    context: item.context,
  })),
  ...closingLines.map((item) => ({
    id: String(item.id),
    content: item.content,
    category: 'kalimat-penutup' as const,
    tag: item.tag,
    context: item.context,
  })),
  ...dictionaries.map((item) => ({
    id: String(item.id),
    content: item.content,
    category: 'kamus-diksi' as const,
    context: item.context,
    tag: item.tag,
  })),
  ...transitions.map((item) => ({
    id: String(item.id),
    content: item.content,
    category: 'kamus-transisi' as const,
    context: item.context,
    tag: item.tag,
  })),
  ...reflectionQuestions.map((item) => ({
    id: String(item.id),
    content: item.content,
    category: 'pertanyaan-refleksi' as const,
    tag: item.tag,
  })),
];
