import { WorkbookExercise, WorkbookQuestion } from '@/types';

export const workbookQuestions: WorkbookQuestion[] = [
  {
    id: 1,
    question: 'Di mana kamu berada saat peristiwa itu terjadi?',
    prompt: 'Detail latar ruang, waktu, suhu, dan suara sekitar.',
  },
  {
    id: 2,
    question: 'Apa satu kalimat yang terucap (atau tersimpan di batin) saat itu?',
    prompt: 'Kalimat dialog atau monolog batin yang paling membekas.',
  },
  {
    id: 3,
    question: 'Bagaimana kamu yang hari ini memandang peristiwa masa lalu tersebut?',
    prompt: 'Refleksi, pelajaran berharga, atau hikmah kedewasaan diri.',
  },
];

export const workbookExercise: WorkbookExercise = {
  id: 'wb-exercise-01',
  category: 'Latihan Menulis Reflektif',
  title: 'Momen Titik Balik Terbesar dalam Hidupmu',
  instruction: 'Tuliskan secara jujur satu momen singkat yang mengubah cara pandangmu terhadap dunia atau dirimu sendiri. Fokus pada detail apa yang kamu rasakan, dengar, dan lihat pada detik-detik tersebut.',
  prompts: [
    'Di mana kamu berada saat peristiwa itu terjadi?',
    'Apa satu kalimat yang terucap (atau tersimpan di batin) saat itu?',
    'Bagaimana kamu yang hari ini memandang peristiwa masa lalu tersebut?',
  ],
  questions: workbookQuestions,
};

export const WORKBOOK_EXERCISE = workbookExercise;
