/**
 * Penulis+ Workspace Storage Utility
 * Safe, typed wrapper around localStorage.
 * Components must NOT directly call localStorage.
 */

export const STORAGE_KEYS = {
  AUTH_NAME: 'penulis_plus_name',
  AUTH_STATUS: 'penulis_plus_logged_in',
  AUTH_REMEMBER: 'penulis_plus_remember_device',
  AUTH_LAST_LOGIN: 'penulis_plus_last_login',
  FAVORITES: 'penulis_plus_favorites',
  AI_FAVORITES: 'penulis_plus_ai_favorites',
  BLUEPRINT_PROGRESS: 'penulis_plus_blueprint',
  WORKBOOK_CONTENT: 'penulis_plus_workbook',
  DRAFT_TITLE: 'penulis_plus_draft_title',
  DRAFT_CONTENT: 'penulis_plus_draft_content',
  DRAFT_TARGET: 'penulis_plus_draft_target',
  DRAFT_SAVED_AT: 'penulis_plus_draft_saved_at',
  BOOKMARKS: 'penulis_plus_bookmarks',
  STORY_BUILDER: 'penulis_plus_story_builder',
  CHARACTER_BUILDER: 'penulis_plus_character_builder',
  PLOT_BUILDER: 'penulis_plus_plot_builder',
  SCENE_BUILDER: 'penulis_plus_scene_builder',
  EMOTION_MAPPER: 'penulis_plus_emotion_mapper',
  SYNOPSIS_BUILDER: 'penulis_plus_synopsis_builder',
  WRITING_CHECKLIST: 'penulis_plus_writing_checklist',
  WRITING_SESSION: 'penulis_plus_writing_session',
} as const;

/**
 * Get typed item from storage
 */
export function get<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    // If parsing fails (e.g. raw string was stored), return as raw if appropriate or default
    try {
      const raw = localStorage.getItem(key);
      return (raw as unknown as T) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  }
}

/**
 * Set item to storage with automatic JSON serialization
 */
export function set<T>(key: string, value: T): void {
  try {
    const serialized = typeof value === 'string' ? JSON.stringify(value) : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`[Storage] Failed to set key "${key}":`, error);
  }
}

/**
 * Remove an item by key
 */
export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove key "${key}":`, error);
  }
}

/**
 * Clear all storage items
 */
export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('[Storage] Failed to clear localStorage:', error);
  }
}

// =========================================================================
// Specialized Helpers: ID-Only Storage for Favorites and Bookmarks
// =========================================================================

/**
 * Get array of stored IDs for a collection (favorites/bookmarks)
 */
export function getStoredIds(key: string): string[] {
  const data = get<string[]>(key, []);
  return Array.isArray(data) ? data : [];
}

/**
 * Toggle an ID in a collection and return updated list of IDs
 */
export function toggleStoredId(key: string, id: string): string[] {
  const currentIds = getStoredIds(key);
  const exists = currentIds.includes(id);
  const updated = exists ? currentIds.filter((item) => item !== id) : [...currentIds, id];
  set(key, updated);
  return updated;
}

/**
 * Check if an ID exists in stored collection
 */
export function isIdStored(key: string, id: string): boolean {
  const currentIds = getStoredIds(key);
  return currentIds.includes(id);
}

export const storage = {
  get,
  set,
  remove,
  clear,
  getStoredIds,
  toggleStoredId,
  isIdStored,
  KEYS: STORAGE_KEYS,
};

export default storage;
