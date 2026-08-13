import {
  StoryIdea,
  TitleIdea,
  OpeningLine,
  ClosingLine,
  Transition,
  DictionaryWord,
  ReflectionQuestion,
  AiPromptCategory,
  AiPromptItem,
  BlueprintDay,
  WorkbookExercise,
  OutlineTemplate,
  ManuscriptTemplate,
  EbookItem,
  InspirationCategory,
  InspirationItem,
  InspirationCategoryId,
} from '@/types';

import { storyIdeas } from '@/data/storyIdeas';
import { titleIdeas } from '@/data/titleIdeas';
import { openingLines } from '@/data/openingLines';
import { closingLines } from '@/data/closingLines';
import { transitions } from '@/data/transitions';
import { dictionaries } from '@/data/dictionaries';
import { reflectionQuestions } from '@/data/reflectionQuestions';
import { prompts, promptCategories } from '@/data/prompts';
import { blueprintDays } from '@/data/blueprint';
import { workbookExercise } from '@/data/workbook';
import { ebooks } from '@/data/ebooks';
import {
  INSPIRATION_CATEGORIES,
  INSPIRATION_ITEMS,
} from '@/data/inspirationData';
import {
  OUTLINE_TEMPLATES,
  MANUSCRIPT_TEMPLATE,
  WORKSPACE_FEATURES,
} from '@/data/workspaceData';

/**
 * Story Ideas Content Service
 */
export function getStoryIdeas(): StoryIdea[] {
  return storyIdeas;
}

/**
 * Title Ideas Content Service
 */
export function getTitleIdeas(): TitleIdea[] {
  return titleIdeas;
}

/**
 * Opening Lines Content Service
 */
export function getOpeningLines(): OpeningLine[] {
  return openingLines;
}

/**
 * Closing Lines Content Service
 */
export function getClosingLines(): ClosingLine[] {
  return closingLines;
}

/**
 * Transitions Content Service
 */
export function getTransitions(): Transition[] {
  return transitions;
}

/**
 * Dictionary Words Content Service
 */
export function getDictionary(): DictionaryWord[] {
  return dictionaries;
}

/**
 * Reflection Questions Content Service
 */
export function getReflectionQuestions(): ReflectionQuestion[] {
  return reflectionQuestions;
}

/**
 * Prompts Content Service (Writing Assistant)
 */
export function getPrompts(categoryId?: string): AiPromptItem[] {
  if (!categoryId) return prompts;
  return prompts.filter((p) => p.categoryId === categoryId);
}

/**
 * Prompt Categories Content Service
 */
export function getPromptCategories(): AiPromptCategory[] {
  return promptCategories;
}

/**
 * Inspiration Categories Service
 */
export function getInspirationCategories(): InspirationCategory[] {
  return INSPIRATION_CATEGORIES;
}

/**
 * Inspiration Items Service
 */
export function getInspirationItems(categoryId?: InspirationCategoryId | string | null): InspirationItem[] {
  if (!categoryId) return INSPIRATION_ITEMS;
  return INSPIRATION_ITEMS.filter((item) => item.category === categoryId);
}

/**
 * Blueprint Days Service
 */
export function getBlueprintDays(): BlueprintDay[] {
  return blueprintDays;
}

/**
 * Workbook Data Service
 */
export function getWorkbookData(): WorkbookExercise {
  return workbookExercise;
}

/**
 * Outline Templates Service
 */
export function getOutlineTemplates(): OutlineTemplate[] {
  return OUTLINE_TEMPLATES;
}

/**
 * Manuscript Template Service
 */
export function getManuscriptTemplate(): ManuscriptTemplate {
  return MANUSCRIPT_TEMPLATE;
}

/**
 * Ebooks Service
 */
export function getEbooks(): EbookItem[] {
  return ebooks;
}

/**
 * Workspace Features Service
 */
export function getWorkspaceFeatures() {
  return WORKSPACE_FEATURES;
}

// =========================================================================
// Search Services (Refactored search logic)
// =========================================================================

/**
 * Search Title Ideas
 */
export function searchTitles(query: string): TitleIdea[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return titleIdeas;
  return titleIdeas.filter(
    (item) =>
      item.title.toLowerCase().includes(trimmed) ||
      (item.category && item.category.toLowerCase().includes(trimmed)) ||
      (item.tag && item.tag.toLowerCase().includes(trimmed))
  );
}

/**
 * Search Story Ideas
 */
export function searchStoryIdeas(query: string): StoryIdea[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return storyIdeas;
  return storyIdeas.filter(
    (item) =>
      item.content.toLowerCase().includes(trimmed) ||
      (item.category && item.category.toLowerCase().includes(trimmed)) ||
      (item.tag && item.tag.toLowerCase().includes(trimmed))
  );
}

/**
 * Search Prompts with optional Category filter
 */
export function searchPrompts(query: string, categoryId?: string | null): AiPromptItem[] {
  const trimmed = query.trim().toLowerCase();
  let list = prompts;

  if (categoryId) {
    list = list.filter((p) => p.categoryId === categoryId);
  }

  if (!trimmed) return list;

  return list.filter(
    (item) =>
      item.title.toLowerCase().includes(trimmed) ||
      item.description.toLowerCase().includes(trimmed) ||
      item.promptText.toLowerCase().includes(trimmed) ||
      (item.tag && item.tag.toLowerCase().includes(trimmed))
  );
}

/**
 * Search Inspiration Items with optional Category filter
 */
export function searchInspiration(
  query: string,
  categoryId?: InspirationCategoryId | string | null
): InspirationItem[] {
  const trimmed = query.trim().toLowerCase();
  let list = INSPIRATION_ITEMS;

  if (categoryId) {
    list = list.filter((item) => item.category === categoryId);
  }

  if (!trimmed) return list;

  return list.filter(
    (item) =>
      item.content.toLowerCase().includes(trimmed) ||
      (item.tag && item.tag.toLowerCase().includes(trimmed)) ||
      (item.context && item.context.toLowerCase().includes(trimmed))
  );
}

export const contentService = {
  getStoryIdeas,
  getTitleIdeas,
  getOpeningLines,
  getClosingLines,
  getTransitions,
  getDictionary,
  getReflectionQuestions,
  getPrompts,
  getPromptCategories,
  getInspirationCategories,
  getInspirationItems,
  getBlueprintDays,
  getWorkbookData,
  getOutlineTemplates,
  getManuscriptTemplate,
  getEbooks,
  getWorkspaceFeatures,
  searchTitles,
  searchStoryIdeas,
  searchPrompts,
  searchInspiration,
};

export default contentService;
