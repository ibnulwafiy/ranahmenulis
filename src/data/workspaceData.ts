import {
  WorkspaceFeature,
  BlueprintDay,
  OutlineTemplate,
  ManuscriptTemplate,
} from '@/types';
import { blueprintDays } from './blueprint';
import { workbookExercise } from './workbook';

export const WORKSPACE_FEATURES: WorkspaceFeature[] = [
  {
    id: 'blueprint',
    title: 'Blueprint 10 Hari',
    shortDescription: 'Panduan langkah demi langkah menyelesaikan draf antologi dalam 10 hari.',
    iconName: 'CalendarCheck2',
  },
  {
    id: 'workbook',
    title: 'Workbook Harian',
    shortDescription: 'Latihan menulis reflektif harian dengan fitur auto-save otomatis.',
    iconName: 'BookOpenCheck',
  },
  {
    id: 'template-outline',
    title: 'Template Outline',
    shortDescription: 'Struktur bab teruji untuk naskah 500, 1000, dan 1500 kata.',
    iconName: 'LayoutTemplate',
  },
  {
    id: 'template-naskah',
    title: 'Template Naskah',
    shortDescription: 'Format standar naskah siap kirim untuk buku antologi Ranah Menulis.',
    iconName: 'FileSpreadsheet',
  },
  {
    id: 'editor',
    title: 'Editor Menulis',
    shortDescription: 'Ruang menulis fokus tanpa distraksi dengan hitungan kata dan target.',
    iconName: 'PenTool',
  },
  {
    id: 'ebook',
    title: 'Ebook Panduan',
    shortDescription: 'Buku panduan kurasi dan penulisan antologi berstandar penerbit.',
    iconName: 'BookText',
  },
  {
    id: 'story-builder',
    title: 'Story Builder',
    shortDescription: 'Strukturkan fondasi cerita: tema, premis, konflik, dan tujuan tokoh.',
    iconName: 'BookOpen',
  },
  {
    id: 'character-builder',
    title: 'Character Builder',
    shortDescription: 'Rancang tokoh dengan kedalaman psikologis, luka batin, dan motivasi.',
    iconName: 'UserPlus',
  },
  {
    id: 'plot-builder',
    title: 'Plot Builder',
    shortDescription: 'Rancang alur dari inciting incident hingga klimaks dan resolusi.',
    iconName: 'GitMerge',
  },
  {
    id: 'scene-builder',
    title: 'Scene Builder',
    shortDescription: 'Siapkan tujuan, konflik, dan emosi spesifik di setiap pergantian adegan.',
    iconName: 'Clapperboard',
  },
  {
    id: 'conflict-generator',
    title: 'Conflict Generator',
    shortDescription: 'Ciptakan rintangan berlapis dan tingkatkan taruhan cerita tokohmu.',
    iconName: 'Swords',
  },
  {
    id: 'emotion-mapper',
    title: 'Emotion Mapper',
    shortDescription: 'Petakan pergeseran emosi dari awal adegan hingga katarsis akhir.',
    iconName: 'HeartPulse',
  },
  {
    id: 'synopsis-builder',
    title: 'Synopsis Builder',
    shortDescription: 'Rangkum perjalanan cerita untuk kebutuhan pitching dan pengiriman naskah.',
    iconName: 'FileText',
  },
  {
    id: 'writing-checklist',
    title: 'Writing Checklist',
    shortDescription: 'Lacak tahapan menulismu dari ideasi hingga finalisasi.',
    iconName: 'ListTodo',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    shortDescription: 'Hitung kata, karakter, paragraf, dan estimasi waktu baca naskahmu.',
    iconName: 'Hash',
  },
  {
    id: 'writing-session',
    title: 'Writing Session',
    shortDescription: 'Fokus menulis dengan target kata dan pantauan durasi otomatis.',
    iconName: 'Timer',
  },
];

export const BLUEPRINT_DAYS: BlueprintDay[] = blueprintDays;
export const WORKBOOK_EXERCISE = workbookExercise;

export const OUTLINE_TEMPLATES: OutlineTemplate[] = [
  {
    id: 'outline-500',
    targetWords: 500,
    title: 'Template 500 Kata (Flash Essay / Vignette)',
    subtitle: 'Cocok untuk tulisan singkat yang padat, puitis, dan fokus pada satu peristiwa emosional tunggal.',
    sections: [
      {
        name: '1. Pembuka / Hook (±100 Kata)',
        wordCount: '100 Kata',
        guideline: 'Membuka dengan satu adegan visual konkret atau pernyataan batin yang kontemplatif.',
      },
      {
        name: '2. Eksplorasi Konflik & Batin (±300 Kata)',
        wordCount: '300 Kata',
        guideline: 'Mengurai mengapa momen tersebut terasa sangat membekas, apa yang berkecamuk di pikiran, dan dinamika rasa yang terjadi.',
      },
      {
        name: '3. Penutup & Resonansi (±100 Kata)',
        wordCount: '100 Kata',
        guideline: 'Kalimat penutup yang menenangkan, kesimpulan batin, atau penerimaan terhadap apa yang telah terjadi.',
      },
    ],
    rawText: `[JUDUL TULISAN]
Oleh: [Nama Penulis]
Target: 500 Kata

--- 1. PEMBUKA / HOOK (±100 Kata) ---
[Tuliskan adegan pembuka yang menangkap visual atau suasana emosi mula-mula...]

--- 2. EKSPLORASI KONFLIK & BATIN (±300 Kata) ---
[Uraikan pergulatan rasa, memori yang berkelindan, dan detail peristiwa yang dialami...]

--- 3. PENUTUP & RESONANSI (±100 Kata) ---
[Tutup dengan penerimaan diri, makna baru, atau pelepasan yang tenang...]`,
  },
  {
    id: 'outline-1000',
    targetWords: 1000,
    title: 'Template 1000 Kata (Standard Anthology Chapter)',
    subtitle: 'Format ideal bab buku antologi dengan ruang cukup untuk latar, dialog, dan pergulatan karakter.',
    sections: [
      {
        name: '1. Pengenalan & Titik Mula (±150 Kata)',
        wordCount: '150 Kata',
        guideline: 'Menetapkan ruang, waktu, dan suasana batin sebelum badai peristiwa datang.',
      },
      {
        name: '2. Eskalasi & Percakapan Kunci (±350 Kata)',
        wordCount: '350 Kata',
        guideline: 'Hadirkan tokoh lain, dialog yang menyentuh ranah sensitif, atau penemuan fakta baru.',
      },
      {
        name: '3. Titik Balik / Klimaks Emosional (±350 Kata)',
        wordCount: '350 Kata',
        guideline: 'Momen puncak saat tokoh berada di batas ketahanan batin dan harus membuat pilihan.',
      },
      {
        name: '4. Resolusi & Katarsis (±150 Kata)',
        wordCount: '150 Kata',
        guideline: 'Bagaimana kehidupan berlanjut setelah peristiwa itu, apa luka yang sembuh, dan apa kebijaksanaan yang tersisa.',
      },
    ],
    rawText: `[JUDUL NASKAH ANTOLOGI]
Oleh: [Nama Penulis]
Target: 1000 Kata

--- 1. PENGENALAN & TITIK MULA (±150 Kata) ---
[Bangun latar suasana dan perkenalkan keadaan tokoh sebelum konflik...]

--- 2. ESKALASI & PERCAKAPAN KUNCI (±350 Kata) ---
[Hadirkan interaksi, percakapan penting, dan penumpukan beban rasa...]

--- 3. TITIK BALIK / KLIMAKS EMOSIONAL (±350 Kata) ---
[Puncak ketegangan emosional atau keputusan krusial yang mengubah alur...]

--- 4. RESOLUSI & KATARSIS (±150 Kata) ---
[Refleksi akhir, penerimaan, dan kedamaian baru yang ditemukan...]`,
  },
  {
    id: 'outline-1500',
    targetWords: 1500,
    title: 'Template 1500 Kata (Deep Narrative Memoir / Longform)',
    subtitle: 'Struktur mendalam untuk kisah personal dengan multi-layer memori, dialog hidup, dan atmosfer kaya.',
    sections: [
      {
        name: '1. Atmosfer Awal & Premis (±200 Kata)',
        wordCount: '200 Kata',
        guideline: 'Pengantar puitis dan penempatan jangkar emosi cerita.',
      },
      {
        name: '2. Kilas Balik & Latar Konflik (±400 Kata)',
        wordCount: '400 Kata',
        guideline: 'Menggali akar luka masa lalu atau asal mula relasi yang rumit.',
      },
      {
        name: '3. Konfrontasi & Puncak Krisis (±500 Kata)',
        wordCount: '500 Kata',
        guideline: 'Adegan detail titik genting dengan dialog mendalam dan visualisasi kuat.',
      },
      {
        name: '4. Refleksi & Penutup Kontemplatif (±400 Kata)',
        wordCount: '400 Kata',
        guideline: 'Sintesis emosi, rekonsiliasi dengan takdir, dan kalimat penutup yang abadi.',
      },
    ],
    rawText: `[JUDUL NASKAH LENGKAP]
Oleh: [Nama Penulis]
Target: 1500 Kata

--- 1. ATMOSFER AWAL & PREMIS (±200 Kata) ---
[Deskripsi atmosfer yang kuat dan pemantik rasa ingin tahu pembaca...]

--- 2. KILAS BALIK & LATAR KONFLIK (±400 Kata) ---
[Gali lapisan memori, masa lalu yang melatarbelakangi, dan perkembangan situasi...]

--- 3. KONFRONTASI & PUNCAK KRISIS (±500 Kata) ---
[Adegan dramatis utama dengan dialog tajam dan kedalaman rasa...]

--- 4. REFLEKSI & PENUTUP KONTEMPLATIF (±400 Kata) ---
[Sintesis emosi, rekonsiliasi dengan takdir, dan kalimat penutup yang abadi...]`,
  },
];

export const MANUSCRIPT_TEMPLATE: ManuscriptTemplate = {
  title: 'Format Naskah Resmi Antologi Ranah Menulis',
  authorName: '[Nama Lengkap Penulis / Nama Pena]',
  bodyFormat: 'Font Montserrat/Georgia 12pt, Spasi 1.5, Rata Kiri-Kanan (Justify), Margin Standar 3cm.',
  notes: 'Pastikan naskah orisinal, belum pernah dipublikasikan, dan bebas dari plagiarisme.',
  rawText: `================================================
FORMAT NASKAH ANTOLOGI RANAH MENULIS
================================================

JUDUL NASKAH : [Tuliskan Judul Naskah Anda di Sini]
NAMA PENULIS : [Nama Lengkap / Nama Pena]
KATEGORI TEMA: [Pilih: Memori / Keluarga / Penerimaan / Harapan]
JUMLAH KATA  : [± 800 - 1200 Kata]

------------------------------------------------
ISI NASKAH:
------------------------------------------------

[Paragraf 1: Mulai tulisan Anda di sini. Gunakan kalimat pembuka yang kuat untuk menarik perhatian pembaca sejak baris pertama. Deskripsikan suasana ruang dan perasaan tokoh secara nyata.]

[Paragraf 2: Lanjutkan dengan pengembangan adegan. Ketika memasukkan percakapan atau dialog, gunakan format tanda petik dua standar: "Dialog tokoh di sini," ucapnya pelan.]

[Paragraf 3: Alirkan narasi menuju titik tengah konflik. Ceritakan bagaimana peristiwa itu mempengaruhi cara pandang batin tokoh utama.]

[Paragraf 4: Hadirkan klimaks atau momen paling rentan dalam kisah Anda.]

[Paragraf 5: Berikan resolusi dan kalimat penutup yang meninggalkan kesan mendalam di benak pembaca.]

------------------------------------------------
BIODATA SINGKAT PENULIS (Maksimal 50 Kata):
------------------------------------------------
[Nama Penulis] adalah seorang penulis yang mencintai dunia literasi dan cerita personal. Karyanya telah dimuat dalam berbagai antologi pilihan. Dapat disapa melalui Instagram @[akun_anda].

================================================`,
};
