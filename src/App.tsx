import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LessonViewer } from './components/LessonViewer';
import { LessonGeneratorModal } from './components/LessonGeneratorModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SampleLessonBank } from './components/SampleLessonBank';
import { RubricsCalculator } from './components/RubricsCalculator';
import { SAMPLE_STEM_LESSONS } from './data/sampleLessons';
import { StemLessonPlan } from './types';
import { getStoredApiKey } from './services/geminiService';
import confetti from 'canvas-confetti';

const STORAGE_KEY_CURRENT = 'stem_current_lesson_plan';
const STORAGE_KEY_SAVED = 'stem_saved_lesson_plans';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'viewer' | 'library' | 'rubrics'>('viewer');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  const [currentLesson, setCurrentLesson] = useState<StemLessonPlan>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return SAMPLE_STEM_LESSONS[0];
  });

  const [savedLessons, setSavedLessons] = useState<StemLessonPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading saved lessons', e);
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync current lesson to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(currentLesson));
    } catch (e) {
      console.error(e);
    }
  }, [currentLesson]);

  // Sync saved lessons
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [savedLessons]);

  const handleLessonGenerated = (newLesson: StemLessonPlan) => {
    setCurrentLesson(newLesson);
    setCurrentTab('viewer');
    showToast('Đã biên soạn thành công Kế hoạch bài dạy STEM!');
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.warn('Confetti animation error:', e);
    }
  };

  const handleSaveToLibrary = (lessonToSave: StemLessonPlan) => {
    const exists = savedLessons.some(l => l.id === lessonToSave.id);
    if (exists) {
      const updated = savedLessons.map(l => (l.id === lessonToSave.id ? lessonToSave : l));
      setSavedLessons(updated);
      showToast('Đã cập nhật bài học trong thư viện của bạn!');
    } else {
      setSavedLessons([lessonToSave, ...savedLessons]);
      showToast('Đã lưu giáo án vào thư viện cá nhân thành công!');
    }
  };

  const handleSelectFromBank = (selected: StemLessonPlan) => {
    setCurrentLesson(selected);
    setCurrentTab('viewer');
    showToast(`Đã tải chủ đề: ${selected.topicName}`);
  };

  const isCurrentLessonSaved = savedLessons.some(l => l.id === currentLesson.id);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* App Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        savedCount={savedLessons.length}
        onQuickNewLesson={() => setIsGeneratorOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Tab Views */}
      <main className="flex-1 pb-16">
        {currentTab === 'viewer' && (
          <LessonViewer
            lesson={currentLesson}
            onLessonUpdate={updated => {
              setCurrentLesson(updated);
              showToast('Đã lưu các thay đổi giáo án!');
            }}
            onSaveToLibrary={handleSaveToLibrary}
            onOpenRubrics={() => setCurrentTab('rubrics')}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            isSaved={isCurrentLessonSaved}
          />
        )}

        {currentTab === 'library' && (
          <SampleLessonBank
            onSelectLesson={handleSelectFromBank}
            savedLessons={savedLessons}
          />
        )}

        {currentTab === 'rubrics' && (
          <RubricsCalculator lesson={currentLesson} />
        )}
      </main>

      {/* AI Generator Modal */}
      <LessonGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onLessonGenerated={handleLessonGenerated}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* API Key & Model Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaved={() => showToast('Đã cập nhật cấu hình API Key & Model!')}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2.5 border border-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer & Copyright */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 print:hidden mt-auto shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-800 text-sm tracking-tight">
            HỆ THỐNG SOẠN KẾ HOẠCH BÀI DẠY STEM CHUẨN GDPT 2018 & CÔNG VĂN 5512
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200 shadow-2xs">
              © Bản quyền & Phát triển: Thầy giáo Đinh Văn Thành
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
              Trường THCS Đồng Yên
            </span>
            <a
              href="tel:0915213717"
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs cursor-pointer"
            >
              📞 ĐT: 0915.213717
            </a>
          </div>
          <p className="text-[11px] text-slate-400">
            Hỗ trợ giáo viên phát triển bài học liên môn Khoa học (S) - Công nghệ (T) - Kĩ thuật (E) - Toán học (M) - Mĩ thuật (A) & Năng lực số
          </p>
        </div>
      </footer>
    </div>
  );
}
