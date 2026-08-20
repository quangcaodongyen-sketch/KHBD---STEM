import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Calculator, 
  PlusCircle, 
  BookmarkCheck, 
  Key, 
  Settings,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { getStoredApiKey, getStoredModel, AVAILABLE_MODELS } from '../services/geminiService';

interface HeaderProps {
  currentTab: 'viewer' | 'library' | 'rubrics';
  onSelectTab: (tab: 'viewer' | 'library' | 'rubrics') => void;
  savedCount: number;
  onQuickNewLesson: () => void;
  onOpenApiKeyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onQuickNewLesson,
  onOpenApiKeyModal
}) => {
  const hasApiKey = Boolean(getStoredApiKey());
  const currentModelId = getStoredModel();
  const currentModel = AVAILABLE_MODELS.find(m => m.id === currentModelId) || AVAILABLE_MODELS[0];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                  STEM GDPT 2018
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Công văn 5512
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Quy trình 5 bước
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 line-clamp-1">
                Tác giả: <span className="font-semibold text-slate-700">Thầy giáo Đinh Văn Thành</span> • Trường THCS Đồng Yên (ĐT: 0915.213717)
              </p>
            </div>
          </div>

          {/* Navigation Bar & Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            
            {/* Nav Tabs */}
            <button
              id="nav-tab-viewer"
              onClick={() => onSelectTab('viewer')}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'viewer'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Giáo án</span>
            </button>

            <button
              id="nav-tab-library"
              onClick={() => onSelectTab('library')}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'library'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Thư viện mẫu</span>
              <span className="sm:hidden">Mẫu</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full text-[11px]">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-rubrics"
              onClick={() => onSelectTab('rubrics')}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'rubrics'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">Chấm điểm Rubrics</span>
              <span className="md:hidden">Rubrics</span>
            </button>

            {/* API Key Settings Button with prominent red text/badge */}
            <button
              id="btn-settings-api-key"
              onClick={onOpenApiKeyModal}
              className={`relative px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 border cursor-pointer ${
                hasApiKey
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  : 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100 animate-pulse'
              }`}
              title="Cài đặt Google Gemini API Key"
            >
              <Key className={`w-4 h-4 ${hasApiKey ? 'text-blue-600' : 'text-rose-600'}`} />
              <span className="hidden xl:inline">
                {hasApiKey ? currentModel.name : 'Cài đặt API Key'}
              </span>
              <span className="xl:hidden">
                {hasApiKey ? 'Model AI' : 'API Key'}
              </span>

              {/* Red warning text when key is missing */}
              {!hasApiKey && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span className="hidden sm:inline">Lấy API key để sử dụng app</span>
                  <span className="sm:hidden">Cần Key</span>
                </span>
              )}

              {hasApiKey && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              )}
            </button>

            {/* Quick New Lesson Button */}
            <button
              id="btn-create-lesson-main"
              onClick={onQuickNewLesson}
              className="ml-1 sm:ml-2 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Soạn bài mới</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
