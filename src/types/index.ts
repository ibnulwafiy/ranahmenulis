export interface User {
  name: string;
  isLoggedIn: boolean;
  rememberDevice: boolean;
  lastLogin?: string;
}

export type TabId = 'beranda' | 'inspirasi' | 'menulis' | 'ai' | 'profil';

export interface NavItemConfig {
  id: TabId;
  label: string;
  iconName: string;
  path: string;
  isActiveTab: boolean;
  badge?: string;
}

export interface WritingProgress {
  title: string;
  currentChapter: number;
  totalChapters: number;
  wordCount: number;
  targetWordCount: number;
  percentage: number;
  status: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface WorkspaceQuote {
  quote: string;
  author: string;
  source?: string;
}

// =========================================================================
// Granular Content Types (Data Layer Refactor)
// =========================================================================

export interface StoryIdea {
  id: string | number;
  category: string;
  content: string;
  tag?: string;
  title?: string;
}

export interface TitleIdea {
  id: string | number;
  category: string;
  title: string;
  content?: string;
  tag?: string;
}

export interface OpeningLine {
  id: string | number;
  category: string;
  content: string;
  tag?: string;
  context?: string;
}

export interface ClosingLine {
  id: string | number;
  category: string;
  content: string;
  tag?: string;
  context?: string;
}

export interface Transition {
  id: string | number;
  category: string;
  content: string;
  context?: string;
  tag?: string;
}

export interface DictionaryWord {
  id: string | number;
  word?: string;
  definition?: string;
  content: string;
  context?: string;
  tag?: string;
  category: string;
}

export interface ReflectionQuestion {
  id: string | number;
  category: string;
  content: string;
  tag?: string;
}

export interface Prompt {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  promptText: string;
  tag?: string;
}

export interface BlueprintDay {
  day: number;
  title: string;
  description: string;
  task: string;
  tip?: string;
}

export interface WorkbookQuestion {
  id: string | number;
  question: string;
  prompt?: string;
}

export interface WorkbookExercise {
  id: string;
  category: string;
  title: string;
  instruction: string;
  prompts: string[];
  questions?: WorkbookQuestion[];
}

export interface EbookItem {
  id: string;
  title: string;
  description: string;
  format: string;
  pages?: number;
  size?: string;
  available: boolean;
}

// =========================================================================
// Inspiration Types (Sprint 2 Compatibility)
// =========================================================================
export type InspirationCategoryId =
  | 'ide-cerita'
  | 'ide-judul'
  | 'kalimat-pembuka'
  | 'kalimat-penutup'
  | 'kamus-diksi'
  | 'kamus-transisi'
  | 'pertanyaan-refleksi';

export interface InspirationItem {
  id: string;
  content: string;
  category: InspirationCategoryId;
  context?: string;
  tag?: string;
}

export interface InspirationCategory {
  id: InspirationCategoryId;
  title: string;
  shortDescription: string;
  iconName: string;
  itemCount: number;
}

// =========================================================================
// Workspace Types (Sprint 3 Compatibility)
// =========================================================================
export type WorkspaceFeatureId =
  | 'blueprint'
  | 'workbook'
  | 'template-outline'
  | 'template-naskah'
  | 'editor'
  | 'ebook'
  | 'story-builder'
  | 'character-builder'
  | 'plot-builder'
  | 'scene-builder'
  | 'conflict-generator'
  | 'emotion-mapper'
  | 'synopsis-builder'
  | 'writing-checklist'
  | 'word-counter'
  | 'writing-session';

export interface WorkspaceFeature {
  id: WorkspaceFeatureId;
  title: string;
  shortDescription: string;
  iconName: string;
}

export interface OutlineTemplate {
  id: string;
  targetWords: number;
  title: string;
  subtitle: string;
  sections: {
    name: string;
    wordCount: string;
    guideline: string;
  }[];
  rawText: string;
}

export interface ManuscriptTemplate {
  title: string;
  authorName: string;
  bodyFormat: string;
  notes: string;
  rawText: string;
}

// =========================================================================
// Writing Assistant Types (Sprint 4 Compatibility)
// =========================================================================
export type AiPromptCategoryId =
  // IDE & KONSEP
  | 'cari-ide'
  | 'kembangkan-ide'
  | 'tentukan-tema'
  | 'buat-judul'
  // STRUKTUR
  | 'buat-outline'
  | 'bangun-alur'
  | 'bangun-karakter'
  | 'buat-scene'
  // PENULISAN
  | 'kembangkan-paragraf'
  | 'kalimat-pembuka'
  | 'kalimat-penutup'
  | 'buat-dialog'
  // REVISI
  | 'perbaiki-diksi'
  | 'perkuat-emosi'
  | 'proofreading'
  | 'perbaiki-gaya-bahasa'
  // PUBLISHING
  | 'buat-sinopsis'
  | 'buat-blurb'
  | 'caption-promosi';

export interface AiPromptCategory {
  id: AiPromptCategoryId;
  title: string;
  description: string;
  iconName: string;
  promptCount: number;
}

export interface AiPromptItem {
  id: string;
  categoryId: AiPromptCategoryId;
  title: string;
  description: string;
  promptText: string;
  tag?: string;
}
