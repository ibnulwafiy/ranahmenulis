import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CalendarCheck2,
  BookOpenCheck,
  LayoutTemplate,
  FileSpreadsheet,
  PenTool,
  BookText,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  Save,
  Clock,
  Sparkles,
  Target,
  RotateCcw,
  BookOpen,
  UserPlus,
  GitMerge,
  Clapperboard,
  Swords,
  HeartPulse,
  FileText,
  ListTodo,
  Hash,
  Timer,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Toast } from '@/components/ui/Toast';
import { AccordionItem } from '@/components/ui/Accordion';
import { WorkspaceFeatureId } from '@/types';
import { contentService } from '@/services/contentService';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  CalendarCheck2,
  BookOpenCheck,
  LayoutTemplate,
  FileSpreadsheet,
  PenTool,
  BookText,
  BookOpen,
  UserPlus,
  GitMerge,
  Clapperboard,
  Swords,
  HeartPulse,
  FileText,
  ListTodo,
  Hash,
  Timer,
};

export const Workspace: React.FC = () => {
  // Navigation sub-view state
  const [currentSubView, setCurrentSubView] = useState<WorkspaceFeatureId | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Data from Content Service
  const workspaceFeatures = useMemo(() => contentService.getWorkspaceFeatures(), []);
  const blueprintDays = useMemo(() => contentService.getBlueprintDays(), []);
  const workbookExercise = useMemo(() => contentService.getWorkbookData(), []);
  const outlineTemplates = useMemo(() => contentService.getOutlineTemplates(), []);
  const manuscriptTemplate = useMemo(() => contentService.getManuscriptTemplate(), []);

  const { user } = useAuth();
  const [isDataLoading, setIsDataLoading] = useState(true);

  // 1. Blueprint State (Days completed)
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const toggleDayComplete = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetBlueprint = () => {
    if (window.confirm('Reset semua progress Blueprint 10 Hari?')) {
      setCompletedDays([]);
    }
  };

  // 2. Workbook State
  const [workbookContent, setWorkbookContent] = useState<string>('');

  const workbookSaveTimerRef = useRef<any | null>(null);

  const handleWorkbookChange = (value: string) => {
    setWorkbookContent(value);
    if (workbookSaveTimerRef.current) {
      clearTimeout(workbookSaveTimerRef.current);
    }
    workbookSaveTimerRef.current = setTimeout(async () => {
      if (!user?.id) return;
      try {
        await supabase
          .from('workbook_entries')
          .upsert({
            user_id: user.id,
            exercise_id: 'wb-exercise-01',
            content: value,
            updated_at: new Date().toISOString()
          });
        showToast('Tersimpan otomatis');
      } catch (err) {
        console.error('Error saving workbook entry:', err);
      }
    }, 800);
  };

  const handleManualSaveWorkbook = async () => {
    if (!user?.id) return;
    try {
      await supabase
        .from('workbook_entries')
        .upsert({
          user_id: user.id,
          exercise_id: 'wb-exercise-01',
          content: workbookContent,
          updated_at: new Date().toISOString()
        });
      showToast('Tersimpan otomatis');
    } catch (err) {
      console.error('Error saving workbook entry:', err);
    }
  };

  // 3. Outline Template State
  const [selectedOutlineId, setSelectedOutlineId] = useState<string>('outline-500');
  const selectedOutline = useMemo(() => {
    return outlineTemplates.find((o) => o.id === selectedOutlineId) || outlineTemplates[0];
  }, [selectedOutlineId, outlineTemplates]);

  // 4. Editor Menulis State
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [draftContent, setDraftContent] = useState<string>('');
  const [targetWordCount, setTargetWordCount] = useState<number>(500);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Baru saja');

  const editorSaveTimerRef = useRef<any | null>(null);

  const saveDraftToStorage = async (title: string, content: string, target: number) => {
    if (!user?.id) return;
    try {
      const { error } = await supabase
        .from('drafts')
        .upsert({
          user_id: user.id,
          title,
          content,
          target_word_count: target,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;
        setLastSavedTime(timeStr);
      }
    } catch (e) {
      console.error('Failed to save draft to Supabase', e);
    }
  };

  const handleTitleChange = (val: string) => {
    setDraftTitle(val);
    triggerAutoSave(val, draftContent, targetWordCount);
  };

  const handleContentChange = (val: string) => {
    setDraftContent(val);
    triggerAutoSave(draftTitle, val, targetWordCount);
  };

  const handleTargetChange = (target: number) => {
    setTargetWordCount(target);
    saveDraftToStorage(draftTitle, draftContent, target);
  };

  const triggerAutoSave = (title: string, content: string, target: number) => {
    if (editorSaveTimerRef.current) {
      clearTimeout(editorSaveTimerRef.current);
    }
    editorSaveTimerRef.current = setTimeout(() => {
      saveDraftToStorage(title, content, target);
      showToast('Tersimpan otomatis');
    }, 1000);
  };

  // 5. Story Builder
  const [storyBuilder, setStoryBuilder] = useState<any>({ tema: '', premis: '', konflik: '', tujuan: '', hambatan: '', perubahan: '', pesan: '' });
  
  // 6. Character Builder
  const [characterBuilder, setCharacterBuilder] = useState<any>({ nama: '', usia: '', kepribadian: '', kelebihan: '', kekurangan: '', keinginan: '', ketakutan: '', latar: '', konflik: '', perubahan: '' });

  // 7. Plot Builder
  const [plotBuilder, setPlotBuilder] = useState<any>({ opening: '', inciting: '', rising: '', climax: '', resolution: '' });

  // 8. Scene Builder
  const [sceneBuilder, setSceneBuilder] = useState<any>({ tujuan: '', lokasi: '', waktu: '', tokoh: '', konflik: '', emosi: '', peristiwa: '', dampak: '' });

  // 9. Conflict Generator
  const [conflictGen, setConflictGen] = useState<any>({ tokoh: '', keinginan: '', hambatan: '', taruhan: '' });

  // 10. Emotion Mapper
  const [emotionMapper, setEmotionMapper] = useState<any[]>([{ id: 1, scene: '', start: '', trigger: '', shift: '', end: '', intensity: 5 }]);

  // 11. Synopsis Builder
  const [synopsisBuilder, setSynopsisBuilder] = useState<any>({ judul: '', tokoh: '', premis: '', konflik: '', perjalanan: '', ending: '' });

  // 12. Writing Checklist
  const initialChecklist = [
    { id: 'c1', label: 'Menentukan ide', checked: false },
    { id: 'c2', label: 'Menentukan tema', checked: false },
    { id: 'c3', label: 'Membuat premis', checked: false },
    { id: 'c4', label: 'Menentukan karakter', checked: false },
    { id: 'c5', label: 'Membuat outline', checked: false },
    { id: 'c6', label: 'Menulis draft', checked: false },
    { id: 'c7', label: 'Revisi struktur', checked: false },
    { id: 'c8', label: 'Perbaiki diksi', checked: false },
    { id: 'c9', label: 'Perkuat emosi', checked: false },
    { id: 'c10', label: 'Proofreading', checked: false },
    { id: 'c11', label: 'Finalisasi', checked: false }
  ];
  const [writingChecklist, setWritingChecklist] = useState<any[]>(initialChecklist);

  // 13. Word Counter
  const [wordCounterText, setWordCounterText] = useState('');

  // 14. Writing Session
  const [sessionTarget, setSessionTarget] = useState(500);
  const [sessionText, setSessionText] = useState<string>('');
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Fetch initial workspace data from Supabase
  useEffect(() => {
    if (!user?.id) return;

    const loadWorkspaceData = async () => {
      setIsDataLoading(true);
      try {
        const [
          draftsRes,
          blueprintRes,
          workbookRes,
          storyRes,
          characterRes,
          plotRes,
          sceneRes,
          emotionRes,
          synopsisRes,
          checklistRes,
          sessionRes
        ] = await Promise.all([
          supabase.from('drafts').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('blueprint_progress').select('day_number').eq('user_id', user.id),
          supabase.from('workbook_entries').select('content').eq('user_id', user.id).eq('exercise_id', 'wb-exercise-01').maybeSingle(),
          supabase.from('story_builders').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('character_builders').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('plot_builders').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('scene_builders').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('emotion_mappers').select('*').eq('user_id', user.id).order('order_index', { ascending: true }),
          supabase.from('synopsis_builders').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('writing_checklists').select('*').eq('user_id', user.id),
          supabase.from('writing_sessions').select('session_text').eq('user_id', user.id).maybeSingle(),
        ]);

        if (draftsRes.data) {
          setDraftTitle(draftsRes.data.title || '');
          setDraftContent(draftsRes.data.content || '');
          setTargetWordCount(draftsRes.data.target_word_count || 500);
        }
        if (blueprintRes.data) {
          setCompletedDays(blueprintRes.data.map((r) => r.day_number));
        }
        if (workbookRes.data) {
          setWorkbookContent(workbookRes.data.content || '');
        }
        if (storyRes.data) {
          const { user_id, updated_at, ...fields } = storyRes.data;
          setStoryBuilder(fields);
        }
        if (characterRes.data) {
          const { user_id, updated_at, ...fields } = characterRes.data;
          setCharacterBuilder(fields);
        }
        if (plotRes.data) {
          const { user_id, updated_at, ...fields } = plotRes.data;
          setPlotBuilder(fields);
        }
        if (sceneRes.data) {
          const { user_id, updated_at, ...fields } = sceneRes.data;
          setSceneBuilder(fields);
        }
        if (emotionRes.data && emotionRes.data.length > 0) {
          setEmotionMapper(
            emotionRes.data.map(({ id, scene, start_emotion, trigger, shift, end_emotion, intensity }) => ({
              id,
              scene,
              start: start_emotion,
              trigger,
              shift,
              end: end_emotion,
              intensity,
            }))
          );
        }
        if (synopsisRes.data) {
          const { user_id, updated_at, ...fields } = synopsisRes.data;
          setSynopsisBuilder(fields);
        }
        if (checklistRes.data && checklistRes.data.length > 0) {
          setWritingChecklist(
            checklistRes.data.map((item) => ({
              id: item.item_id,
              label: item.label,
              checked: item.checked,
            }))
          );
        }
        if (sessionRes.data) {
          setSessionText(sessionRes.data.session_text || '');
        }
      } catch (err) {
        console.error('Error loading workspace data:', err);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadWorkspaceData();
  }, [user?.id]);

  // Debounced auto-save effects for tools
  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('story_builders').upsert({ user_id: user.id, ...storyBuilder, updated_at: new Date().toISOString() });
      } catch (err) { console.error('Error saving story builder:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [storyBuilder, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('character_builders').upsert({ user_id: user.id, ...characterBuilder, updated_at: new Date().toISOString() });
      } catch (err) { console.error('Error saving character builder:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [characterBuilder, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('plot_builders').upsert({ user_id: user.id, ...plotBuilder, updated_at: new Date().toISOString() });
      } catch (err) { console.error('Error saving plot builder:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [plotBuilder, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('scene_builders').upsert({ user_id: user.id, ...sceneBuilder, updated_at: new Date().toISOString() });
      } catch (err) { console.error('Error saving scene builder:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [sceneBuilder, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('emotion_mappers').delete().eq('user_id', user.id);
        if (emotionMapper.length > 0) {
          const toInsert = emotionMapper.map((item, index) => ({
            user_id: user.id,
            scene: item.scene || '',
            start_emotion: item.start || '',
            trigger: item.trigger || '',
            shift: item.shift || '',
            end_emotion: item.end || '',
            intensity: item.intensity || 5,
            order_index: index,
          }));
          await supabase.from('emotion_mappers').insert(toInsert);
        }
      } catch (err) { console.error('Error saving emotion mapper:', err); }
    }, 1200);
    return () => clearTimeout(timer);
  }, [emotionMapper, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('synopsis_builders').upsert({ user_id: user.id, ...synopsisBuilder, updated_at: new Date().toISOString() });
      } catch (err) { console.error('Error saving synopsis builder:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [synopsisBuilder, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('writing_checklists').delete().eq('user_id', user.id);
        if (writingChecklist.length > 0) {
          const toInsert = writingChecklist.map((item) => ({
            user_id: user.id,
            item_id: item.id,
            label: item.label,
            checked: item.checked,
          }));
          await supabase.from('writing_checklists').insert(toInsert);
        }
      } catch (err) { console.error('Error saving writing checklist:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [writingChecklist, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('writing_sessions').upsert({ user_id: user.id, session_text: sessionText, updated_at: new Date().toISOString() });
      } catch (err) { console.error('Error saving writing session:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [sessionText, user?.id, isDataLoading]);

  useEffect(() => {
    if (!user?.id || isDataLoading) return;
    const timer = setTimeout(async () => {
      try {
        await supabase.from('blueprint_progress').delete().eq('user_id', user.id);
        if (completedDays.length > 0) {
          const toInsert = completedDays.map((day) => ({
            user_id: user.id,
            day_number: day,
          }));
          await supabase.from('blueprint_progress').insert(toInsert);
        }
      } catch (err) { console.error('Error saving blueprint progress:', err); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [completedDays, user?.id, isDataLoading]);

  // Session timer effect
  useEffect(() => {
    let interval: any;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  // Metrics computation
  const wordCount = useMemo(() => {
    const trimmed = draftContent.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [draftContent]);

  const charCount = useMemo(() => {
    return draftContent.length;
  }, [draftContent]);

  const readingTimeMinutes = useMemo(() => {
    return Math.max(1, Math.ceil(wordCount / 200));
  }, [wordCount]);

  const progressPercentage = useMemo(() => {
    if (!targetWordCount) return 0;
    return Math.min(100, Math.round((wordCount / targetWordCount) * 100));
  }, [wordCount, targetWordCount]);

  // General Copy Helper
  const copyToClipboard = async (text: string, successMsg = 'Berhasil disalin') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(successMsg);
    } catch (e) {
      showToast('Gagal menyalin');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center">
        <div className="w-8 h-8 rounded-xl bg-black animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-10">
      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* ========================================================================= */}
      {/* VIEW 0: WORKSPACE HOME (6 Feature Cards) */}
      {/* ========================================================================= */}
      {!currentSubView && (
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <section className="space-y-1 pt-1 sm:pt-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Workspace
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium">
              Semua kebutuhan menulismu ada di sini.
            </p>
          </section>

          {/* Quick Active Draft Summary Card */}
          <Card padding="md" className="bg-zinc-900 text-white border-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Draf Aktif
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {draftTitle || 'Naskah Tanpa Judul'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {wordCount} kata • Target {targetWordCount} kata ({progressPercentage}%)
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentSubView('editor')}
                  leftIcon={<PenTool size={14} />}
                  className="bg-white text-black hover:bg-zinc-100 font-semibold"
                >
                  Buka Editor
                </Button>
              </div>
            </div>
          </Card>

          {/* 6 Workspace Feature Cards Grid */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Fitur Ruang Tulis
              </span>
              <span className="text-xs font-medium text-zinc-400">
                {workspaceFeatures.length} Modul Workspace
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {workspaceFeatures.map((feature) => {
                const Icon = ICON_MAP[feature.iconName] || PenTool;
                return (
                  <Card
                    key={feature.id}
                    padding="md"
                    interactive
                    onClick={() => setCurrentSubView(feature.id)}
                    className="group flex items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-800 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight leading-snug truncate">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {feature.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 transition-colors duration-200 shrink-0">
                      <ChevronRight size={17} />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: BLUEPRINT 10 HARI */}
      {/* ========================================================================= */}
      {currentSubView === 'blueprint' && (
        <div className="space-y-6 sm:space-y-8 animate-fade">
          {/* Header */}
          <section className="space-y-3 pt-1 sm:pt-2">
            <button
              onClick={() => setCurrentSubView(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Workspace</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                  Blueprint 10 Hari
                </h1>
                <p className="text-sm text-zinc-500 font-medium mt-0.5">
                  Panduan langkah demi langkah menyelesaikan naskah antologi dalam 10 hari.
                </p>
              </div>

              {completedDays.length > 0 && (
                <button
                  onClick={resetBlueprint}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-800 transition-colors self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Progress</span>
                </button>
              )}
            </div>
          </section>

          {/* Progress Overview Card */}
          <Card padding="md" className="space-y-3 bg-zinc-50 border-zinc-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900">
                Progress Blueprint: {completedDays.length} dari {blueprintDays.length} Hari Selesai
              </span>
              <span className="text-xs font-extrabold text-zinc-900">
                {Math.round((completedDays.length / (blueprintDays.length || 10)) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={completedDays.length}
              max={blueprintDays.length || 10}
              showPercentage={false}
              size="md"
            />
          </Card>

          {/* 10 Expandable Day Cards */}
          <section className="space-y-3">
            {blueprintDays.map((dayItem) => {
              const isDone = completedDays.includes(dayItem.day);
              return (
                <AccordionItem
                  key={dayItem.day}
                  id={dayItem.day}
                  title={dayItem.title}
                  badge={isDone ? 'Selesai' : `Hari ke-${dayItem.day}`}
                  isCompleted={isDone}
                  onToggleComplete={() => toggleDayComplete(dayItem.day)}
                  defaultExpanded={dayItem.day === 1 || (completedDays.length === dayItem.day - 1)}
                >
                  <div className="space-y-3.5 text-xs sm:text-sm text-zinc-700">
                    <p className="font-normal text-zinc-600 leading-relaxed">
                      {dayItem.description}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-900 text-xs">
                        <Target size={14} className="text-zinc-700" />
                        <span>Tugas Hari Ini:</span>
                      </div>
                      <p className="text-zinc-800 font-medium leading-relaxed">
                        {dayItem.task}
                      </p>
                    </div>

                    {dayItem.tip && (
                      <div className="flex items-start gap-2 text-xs text-zinc-500 font-medium">
                        <Sparkles size={14} className="text-zinc-600 shrink-0 mt-0.5" />
                        <span>Tips: {dayItem.tip}</span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <Button
                        variant={isDone ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => toggleDayComplete(dayItem.day)}
                        leftIcon={isDone ? <Check size={14} /> : undefined}
                      >
                        {isDone ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
              );
            })}
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: WORKBOOK HARIAN */}
      {/* ========================================================================= */}
      {currentSubView === 'workbook' && (
        <div className="space-y-6 sm:space-y-8 animate-fade">
          {/* Header */}
          <section className="space-y-3 pt-1 sm:pt-2">
            <button
              onClick={() => setCurrentSubView(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Workspace</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                  Workbook Harian
                </h1>
                <p className="text-sm text-zinc-500 font-medium mt-0.5">
                  Latihan menulis reflektif harian dengan fitur auto-save otomatis.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-700 self-start sm:self-auto">
                <Clock size={13} className="text-zinc-600" />
                <span>Auto-save Aktif</span>
              </span>
            </div>
          </section>

          {/* Exercise Prompt Card */}
          <Card padding="lg" className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                {workbookExercise.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                {workbookExercise.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {workbookExercise.instruction}
              </p>
            </div>

            {/* Guided Prompts */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-2">
              <div className="text-xs font-bold text-zinc-900">Pemantik Jawaban:</div>
              <ul className="space-y-1.5 text-xs text-zinc-700 font-medium list-disc list-inside">
                {workbookExercise.prompts.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Writing Textarea */}
            <div className="space-y-2">
              <textarea
                rows={10}
                placeholder="Tuliskan refleksi jujurmu di sini... (tersimpan otomatis saat mengetik)"
                value={workbookContent}
                onChange={(e) => handleWorkbookChange(e.target.value)}
                className="w-full bg-zinc-50/50 hover:bg-zinc-50 focus:bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-medium rounded-2xl border border-zinc-200/90 p-4 leading-relaxed focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-y"
              />

              <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
                <span>{workbookContent.trim() ? workbookContent.trim().split(/\s+/).length : 0} kata</span>
                <span>Tersimpan di penyimpanan lokal perangkat</span>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleManualSaveWorkbook}
                leftIcon={<Save size={16} />}
              >
                Simpan Workbook
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: TEMPLATE OUTLINE */}
      {/* ========================================================================= */}
      {currentSubView === 'template-outline' && (
        <div className="space-y-6 sm:space-y-8 animate-fade">
          {/* Header */}
          <section className="space-y-3 pt-1 sm:pt-2">
            <button
              onClick={() => setCurrentSubView(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Workspace</span>
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                Template Outline
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                Struktur alur teruji untuk naskah antologi 500, 1000, dan 1500 kata.
              </p>
            </div>
          </section>

          {/* Template Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-100 border border-zinc-200/60 overflow-x-auto no-scrollbar">
            {outlineTemplates.map((tmpl) => {
              const isActive = selectedOutlineId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedOutlineId(tmpl.id)}
                  className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center select-none ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tmpl.targetWords} Kata
                </button>
              );
            })}
          </div>

          {/* Active Template Card */}
          <Card padding="lg" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Target: {selectedOutline.targetWords} Kata
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight mt-0.5">
                  {selectedOutline.title}
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  {selectedOutline.subtitle}
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => copyToClipboard(selectedOutline.rawText, 'Template berhasil disalin')}
                leftIcon={<Copy size={14} />}
                className="shrink-0"
              >
                Salin Template
              </Button>
            </div>

            {/* Sections Breakdown */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Pembagian Struktur Naskah
              </div>

              <div className="grid grid-cols-1 gap-3">
                {selectedOutline.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                        {sec.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-zinc-600 bg-white px-2 py-0.5 rounded-full border border-zinc-200">
                        {sec.wordCount}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                      {sec.guideline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Raw Template Preview */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Preview Teks Template
              </div>
              <pre className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {selectedOutline.rawText}
              </pre>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: TEMPLATE NASKAH */}
      {/* ========================================================================= */}
      {currentSubView === 'template-naskah' && (
        <div className="space-y-6 sm:space-y-8 animate-fade">
          {/* Header */}
          <section className="space-y-3 pt-1 sm:pt-2">
            <button
              onClick={() => setCurrentSubView(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Workspace</span>
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                Template Naskah
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                Format standar naskah siap kirim untuk buku antologi Ranah Menulis.
              </p>
            </div>
          </section>

          {/* Template Details Card */}
          <Card padding="lg" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Standar Redaksi Ranah Menulis
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight mt-0.5">
                  {manuscriptTemplate.title}
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  Gunakan format ini sebelum menyetorkan naskah ke tim kurator antologi.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => copyToClipboard(manuscriptTemplate.rawText, 'Format berhasil disalin')}
                leftIcon={<Copy size={14} />}
                className="shrink-0"
              >
                Salin Format
              </Button>
            </div>

            {/* Checklist Guide */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-2">
              <div className="text-xs font-bold text-zinc-900">Ketentuan Format Penulisan:</div>
              <ul className="space-y-1.5 text-xs text-zinc-700 font-medium list-disc list-inside">
                <li>Judul naskah singkat, padat, dan representatif.</li>
                <li>Sertakan nama lengkap / nama pena yang akan dicantumkan di buku.</li>
                <li>Panjang naskah rata-rata 800 s.d. 1200 kata.</li>
                <li>Sertakan biodata singkat penulis maksimal 50 kata di akhir naskah.</li>
              </ul>
            </div>

            {/* Raw Manuscript Box */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Struktur Dokumen
              </div>
              <pre className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {manuscriptTemplate.rawText}
              </pre>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: EDITOR MENULIS (ZEN WRITING EXPERIENCE) */}
      {/* ========================================================================= */}
      {currentSubView === 'editor' && (
        <div className="space-y-6 sm:space-y-8 animate-fade">
          {/* Header */}
          <section className="space-y-3 pt-1 sm:pt-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentSubView(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Kembali ke Workspace</span>
              </button>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Tersimpan {lastSavedTime}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                  Editor Menulis
                </h1>
                <p className="text-sm text-zinc-500 font-medium mt-0.5">
                  Ruang menulis fokus tanpa distraksi dengan auto-save otomatis.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`${draftTitle}\n\n${draftContent}`, 'Draf berhasil disalin')}
                  leftIcon={<Copy size={14} />}
                >
                  Salin Draf
                </Button>
              </div>
            </div>
          </section>

          {/* Metrics & Target Bar Card */}
          <Card padding="md" className="space-y-4 bg-zinc-50 border-zinc-200">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-3 gap-2 text-center pb-3 border-b border-zinc-200/60">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  {wordCount}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                  Kata
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  {charCount}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                  Karakter
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  ~{readingTimeMinutes}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                  Menit Baca
                </div>
              </div>
            </div>

            {/* Target Selector & Progress */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-zinc-900">
                  Target Menulis:
                </span>
                <div className="flex items-center gap-1.5">
                  {[300, 500, 1000, 1500].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTargetChange(t)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                        targetWordCount === t
                          ? 'bg-black text-white'
                          : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {t} Kata
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
                  <span>{wordCount} dari {targetWordCount} kata</span>
                  <span className="font-bold text-zinc-900">{progressPercentage}%</span>
                </div>
                <ProgressBar
                  value={wordCount}
                  max={targetWordCount}
                  showPercentage={false}
                  size="md"
                />
              </div>
            </div>
          </Card>

          {/* Distraction-Free Editor Canvas Card */}
          <Card padding="lg" className="min-h-[460px] flex flex-col space-y-4">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Judul Naskah Antologi..."
              value={draftTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-transparent text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 placeholder:text-zinc-300 border-b border-zinc-200/60 pb-3 focus:border-black outline-none transition-colors"
            />

            {/* Body Textarea */}
            <textarea
              rows={16}
              placeholder="Mulai tuliskan naskahmu di sini dengan tenang dan leluasa..."
              value={draftContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full flex-1 bg-transparent text-sm sm:text-base font-normal leading-relaxed sm:leading-loose text-zinc-900 placeholder:text-zinc-300 outline-none resize-none"
            />

            {/* Subtle Bottom Help */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles size={13} className="text-zinc-400" />
                Tips: Tulis draf kasar terlebih dahulu tanpa menghakimi diri.
              </span>
              <span>Auto-save aktif</span>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 6: EBOOK PANDUAN */}
      {/* ========================================================================= */}
      {currentSubView === 'ebook' && (
        <div className="space-y-6 sm:space-y-8 animate-fade">
          {/* Header */}
          <section className="space-y-3 pt-1 sm:pt-2">
            <button
              onClick={() => setCurrentSubView(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-black transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Workspace</span>
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                Ebook Panduan
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                Buku panduan kurasi dan penulisan antologi berstandar penerbit.
              </p>
            </div>
          </section>

          {/* Placeholder PDF Viewer Card */}
          <Card padding="lg" className="border-dashed border-zinc-300">
            <div className="text-center py-10 max-w-md mx-auto space-y-4">
              <div className="w-16 h-20 rounded-2xl bg-zinc-900 text-white flex flex-col items-center justify-center mx-auto shadow-md space-y-1">
                <BookOpen size={24} />
                <span className="text-[9px] font-bold uppercase tracking-wider">PDF</span>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800">
                  <Clock size={13} className="text-zinc-600" />
                  <span>Segera Hadir</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                  Ebook Panduan Menulis Antologi 2026
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                  Ebook akan tersedia di versi berikutnya. Tim kurator Ranah Menulis sedang menyusun panduan lengkap seputar struktur cerita, tata bahasa, dan tips lolos seleksi naskah.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentSubView(null)}
                  leftIcon={<ArrowLeft size={16} />}
                  className="mx-auto"
                >
                  Kembali ke Workspace
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 5. Story Builder View */}
      {currentSubView === 'story-builder' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Story Builder
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Strukturkan fondasi ceritamu dengan mengisi elemen-elemen penting di bawah ini.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            {['tema', 'premis', 'konflik', 'tujuan', 'hambatan', 'perubahan', 'pesan'].map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide capitalize">{key}</label>
                <textarea
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                  rows={2}
                  value={storyBuilder[key]}
                  onChange={e => setStoryBuilder({ ...storyBuilder, [key]: e.target.value })}
                  placeholder={`Tulis ${key} ceritamu di sini...`}
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* 6. Character Builder View */}
      {currentSubView === 'character-builder' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Character Builder
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Rancang tokoh utama dengan kedalaman psikologis dan motivasi.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            {['nama', 'usia', 'kepribadian', 'kelebihan', 'kekurangan', 'keinginan', 'ketakutan', 'latar', 'konflik', 'perubahan'].map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide capitalize">{key}</label>
                <textarea
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                  rows={2}
                  value={characterBuilder[key]}
                  onChange={e => setCharacterBuilder({ ...characterBuilder, [key]: e.target.value })}
                  placeholder={`Tulis ${key} karaktermu di sini...`}
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* 7. Plot Builder View */}
      {currentSubView === 'plot-builder' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Plot Builder
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Susun alur cerita dari awal hingga akhir.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            {['opening', 'inciting', 'rising', 'climax', 'resolution'].map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide capitalize">{key}</label>
                <textarea
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                  rows={3}
                  value={plotBuilder[key]}
                  onChange={e => setPlotBuilder({ ...plotBuilder, [key]: e.target.value })}
                  placeholder={`Tulis ${key} ceritamu di sini...`}
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* 8. Scene Builder View */}
      {currentSubView === 'scene-builder' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Scene Builder
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Rancang satu adegan secara spesifik.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            {['tujuan', 'lokasi', 'waktu', 'tokoh', 'konflik', 'emosi', 'peristiwa', 'dampak'].map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide capitalize">{key}</label>
                <textarea
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                  rows={2}
                  value={sceneBuilder[key]}
                  onChange={e => setSceneBuilder({ ...sceneBuilder, [key]: e.target.value })}
                  placeholder={`Tulis ${key} adegan ini...`}
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* 9. Conflict Generator View */}
      {currentSubView === 'conflict-generator' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Conflict Generator
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Ciptakan konflik menarik dengan merumuskan keinginan dan rintangan.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            {['tokoh', 'keinginan', 'hambatan', 'taruhan'].map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide capitalize">{key}</label>
                <textarea
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                  rows={2}
                  value={conflictGen[key]}
                  onChange={e => setConflictGen({ ...conflictGen, [key]: e.target.value })}
                  placeholder={`Tulis ${key}...`}
                />
              </div>
            ))}
            {conflictGen.tokoh && conflictGen.keinginan && conflictGen.hambatan && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-emerald-900 text-sm mb-1">Hasil Konflik:</h3>
                <p className="text-emerald-800 text-sm">
                  {conflictGen.tokoh} sangat menginginkan {conflictGen.keinginan}, namun terhalang oleh {conflictGen.hambatan}. Jika gagal, maka {conflictGen.taruhan || 'akibatnya akan sangat fatal'}.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* 10. Emotion Mapper View */}
      {currentSubView === 'emotion-mapper' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Emotion Mapper
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Petakan perubahan emosi adegan secara berurutan.
            </p>
          </section>
          
          <div className="space-y-4">
            {emotionMapper.map((item, index) => (
              <Card key={item.id} padding="md" className="space-y-3 relative group">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-zinc-800">Adegan {index + 1}</h3>
                  {emotionMapper.length > 1 && (
                    <button onClick={() => setEmotionMapper(emotionMapper.filter(i => i.id !== item.id))} className="text-zinc-400 hover:text-red-500 text-xs font-semibold">
                      Hapus
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['scene', 'start', 'trigger', 'shift', 'end'].map(key => (
                    <div key={key} className={key === 'scene' || key === 'trigger' ? 'col-span-1 sm:col-span-2' : ''}>
                       <label className="text-xs font-bold text-zinc-800 uppercase tracking-wide">{key}</label>
                       <input
                          type="text"
                          className="w-full bg-zinc-50/50 border border-zinc-200 rounded-lg p-2 text-sm text-zinc-900 mt-1 focus:outline-none focus:ring-2 focus:ring-black/5"
                          value={item[key]}
                          onChange={e => {
                            const newMap = [...emotionMapper];
                            newMap[index][key] = e.target.value;
                            setEmotionMapper(newMap);
                          }}
                          placeholder={`Tulis ${key}...`}
                       />
                    </div>
                  ))}
                  <div className="col-span-1 sm:col-span-2">
                     <label className="text-xs font-bold text-zinc-800 uppercase tracking-wide">Intensity (1-10)</label>
                     <input
                        type="range"
                        min="1" max="10"
                        className="w-full mt-2 accent-zinc-900"
                        value={item.intensity}
                        onChange={e => {
                          const newMap = [...emotionMapper];
                          newMap[index].intensity = parseInt(e.target.value);
                          setEmotionMapper(newMap);
                        }}
                     />
                     <div className="text-right text-xs font-semibold text-zinc-500">{item.intensity}/10</div>
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={() => setEmotionMapper([...emotionMapper, { id: Date.now(), scene: '', start: '', trigger: '', shift: '', end: '', intensity: 5 }])}>
              + Tambah Adegan
            </Button>
          </div>
        </div>
      )}

      {/* 11. Synopsis Builder View */}
      {currentSubView === 'synopsis-builder' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Synopsis Builder
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Rangkum ceritamu untuk keperluan pitching.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            {['judul', 'tokoh', 'premis', 'konflik', 'perjalanan', 'ending'].map(key => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide capitalize">{key}</label>
                <textarea
                  className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                  rows={2}
                  value={synopsisBuilder[key]}
                  onChange={e => setSynopsisBuilder({ ...synopsisBuilder, [key]: e.target.value })}
                  placeholder={`Tulis ${key}...`}
                />
              </div>
            ))}
            <div className="pt-4 border-t border-zinc-100 flex gap-2">
              <Button onClick={() => {
                const text = `Judul: ${synopsisBuilder.judul}\nTokoh: ${synopsisBuilder.tokoh}\nPremis: ${synopsisBuilder.premis}\nKonflik: ${synopsisBuilder.konflik}\nPerjalanan: ${synopsisBuilder.perjalanan}\nEnding: ${synopsisBuilder.ending}`;
                copyToClipboard(text);
              }} leftIcon={<Copy size={16} />}>Salin Sinopsis</Button>
            </div>
          </Card>
        </div>
      )}

      {/* 12. Writing Checklist View */}
      {currentSubView === 'writing-checklist' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Writing Checklist
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Lacak kemajuan proses menulismu.
            </p>
          </section>
          
          <Card padding="md">
            <div className="space-y-3">
              {writingChecklist.map((item, index) => (
                <label key={item.id} className="flex items-center gap-3 p-3 bg-zinc-50/50 rounded-xl hover:bg-zinc-100/50 cursor-pointer border border-transparent transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-black accent-zinc-900"
                    checked={item.checked}
                    onChange={e => {
                      const newChecklist = [...writingChecklist];
                      newChecklist[index].checked = e.target.checked;
                      setWritingChecklist(newChecklist);
                    }}
                  />
                  <span className={`text-sm font-medium ${item.checked ? 'text-zinc-400 line-through' : 'text-zinc-800'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 13. Word Counter View */}
      {currentSubView === 'word-counter' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Word Counter
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Hitung jumlah kata, karakter, dan estimasi waktu baca naskah.
            </p>
          </section>
          
          <Card padding="md" className="space-y-4">
            <textarea
              className="w-full min-h-[250px] bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5"
              placeholder="Tempel atau ketik teksmu di sini..."
              value={wordCounterText}
              onChange={e => setWordCounterText(e.target.value)}
            />
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-zinc-100 p-4 rounded-xl text-center">
                <div className="text-xs text-zinc-500 font-semibold uppercase">Kata</div>
                <div className="text-2xl font-bold text-zinc-900 mt-1">{wordCounterText.trim() ? wordCounterText.trim().split(/\s+/).length : 0}</div>
              </div>
              <div className="bg-zinc-100 p-4 rounded-xl text-center">
                <div className="text-xs text-zinc-500 font-semibold uppercase">Karakter</div>
                <div className="text-2xl font-bold text-zinc-900 mt-1">{wordCounterText.length}</div>
              </div>
              <div className="bg-zinc-100 p-4 rounded-xl text-center">
                <div className="text-xs text-zinc-500 font-semibold uppercase">Paragraf</div>
                <div className="text-2xl font-bold text-zinc-900 mt-1">{wordCounterText.trim() ? wordCounterText.split(/\n+/).filter(p => p.trim() !== '').length : 0}</div>
              </div>
              <div className="bg-zinc-100 p-4 rounded-xl text-center">
                <div className="text-xs text-zinc-500 font-semibold uppercase">Waktu Baca</div>
                <div className="text-2xl font-bold text-zinc-900 mt-1">{Math.max(1, Math.ceil((wordCounterText.trim() ? wordCounterText.trim().split(/\s+/).length : 0) / 200))} mnt</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 14. Writing Session View */}
      {currentSubView === 'writing-session' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
          <section className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentSubView(null)} leftIcon={<ArrowLeft size={16} />} className="-ml-2 text-zinc-500 hover:text-zinc-900">
              Kembali
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              Writing Session
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium max-w-2xl">
              Fokus menulis dengan memantau target kata dan durasi secara real-time.
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <Card padding="md" className="col-span-1 lg:col-span-2 space-y-4">
              <textarea
                className="w-full min-h-[400px] bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-base leading-relaxed text-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5"
                placeholder="Mulai menulis..."
                value={sessionText}
                onChange={e => {
                  setSessionText(e.target.value);
                  if (!sessionActive && e.target.value.length > 0) {
                    setSessionActive(true);
                  }
                }}
              />
            </Card>

            <div className="space-y-4">
              <Card padding="md" className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-800 uppercase tracking-wide">Target Kata</label>
                  <select 
                    className="w-full bg-zinc-100 border-none rounded-lg p-2.5 text-sm font-semibold focus:ring-2 focus:ring-black/5 outline-none"
                    value={sessionTarget}
                    onChange={e => setSessionTarget(parseInt(e.target.value))}
                  >
                    <option value={300}>300 Kata</option>
                    <option value={500}>500 Kata</option>
                    <option value={1000}>1000 Kata</option>
                    <option value={1500}>1500 Kata</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Progress</span>
                    <span className="text-sm font-bold text-zinc-900">{sessionText.trim() ? sessionText.trim().split(/\s+/).length : 0} / {sessionTarget}</span>
                  </div>
                  <ProgressBar value={Math.min(100, Math.round(((sessionText.trim() ? sessionText.trim().split(/\s+/).length : 0) / sessionTarget) * 100))} />
                </div>
                
                <div className="pt-4 border-t border-zinc-100 space-y-1">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Durasi</span>
                  <div className="text-3xl font-bold font-mono tracking-tight text-zinc-900">
                    {Math.floor(sessionTime / 60).toString().padStart(2, '0')}:{(sessionTime % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1" 
                    variant={sessionActive ? "outline" : "primary"}
                    onClick={() => setSessionActive(!sessionActive)}
                  >
                    {sessionActive ? 'Jeda' : 'Mulai'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if(window.confirm('Reset sesi ini?')) {
                        setSessionTime(0);
                        setSessionText('');
                        setSessionActive(false);
                      }
                    }}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
