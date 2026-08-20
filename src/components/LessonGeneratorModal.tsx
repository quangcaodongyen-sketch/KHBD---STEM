import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Lightbulb, 
  Cpu, 
  Layers, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Key,
  ChevronDown,
  ChevronUp,
  Sliders,
  BookOpen,
  ArrowRight,
  GraduationCap,
  BookMarked
} from 'lucide-react';
import { GeneratePromptInput, StemLessonPlan } from '../types';
import { STEM_TOPIC_SUGGESTIONS, TopicSuggestion } from '../data/curriculumTopics';
import { generateStemLesson, getStoredApiKey } from '../services/geminiService';

interface LessonGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonGenerated: (lesson: StemLessonPlan) => void;
  onOpenApiKeyModal?: () => void;
}

export interface SubjectItem {
  id: string;
  name: string;
  stemTag?: '(S) Khoa học' | '(T) Công nghệ' | '(E) Kĩ thuật' | '(M) Toán học' | '(A) Nghệ thuật' | '(D) Năng lực số' | 'Liên môn';
  tagColor?: string;
}

// DANH MỤC MÔN HỌC CHUẨN THCS GDPT 2018
export const THCS_SUBJECTS: SubjectItem[] = [
  { id: 'khtn', name: 'Khoa học tự nhiên (KHTN)', stemTag: '(S) Khoa học', tagColor: 'bg-emerald-100 text-emerald-800' },
  { id: 'math_thcs', name: 'Toán học', stemTag: '(M) Toán học', tagColor: 'bg-blue-100 text-blue-800' },
  { id: 'tech_thcs', name: 'Công nghệ', stemTag: '(T) Công nghệ', tagColor: 'bg-indigo-100 text-indigo-800' },
  { id: 'it_thcs', name: 'Tin học', stemTag: '(D) Năng lực số', tagColor: 'bg-cyan-100 text-cyan-800' },
  { id: 'art_thcs', name: 'Mĩ thuật', stemTag: '(A) Nghệ thuật', tagColor: 'bg-pink-100 text-pink-800' },
  { id: 'music_thcs', name: 'Âm nhạc', stemTag: '(A) Nghệ thuật', tagColor: 'bg-purple-100 text-purple-800' },
  { id: 'lsdl_thcs', name: 'Lịch sử và Địa lí', stemTag: 'Liên môn', tagColor: 'bg-amber-100 text-amber-800' },
  { id: 'gdcd_thcs', name: 'Giáo dục công dân', stemTag: 'Liên môn', tagColor: 'bg-slate-100 text-slate-700' },
  { id: 'hdtn_thcs', name: 'Hoạt động trải nghiệm, hướng nghiệp', stemTag: 'Liên môn', tagColor: 'bg-slate-100 text-slate-700' },
  { id: 'gddp_thcs', name: 'Giáo dục địa phương', stemTag: 'Liên môn', tagColor: 'bg-slate-100 text-slate-700' }
];

export const LessonGeneratorModal: React.FC<LessonGeneratorModalProps> = ({
  isOpen,
  onClose,
  onLessonGenerated,
  onOpenApiKeyModal
}) => {
  // 1. Khối lớp & Môn học chủ đạo
  const [gradeLevel, setGradeLevel] = useState<'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9'>('Lớp 8');
  const [mainSubject, setMainSubject] = useState<string>('Khoa học tự nhiên (KHTN)');

  // 2. Các môn tích hợp liên môn
  const [integratedSubjects, setIntegratedSubjects] = useState<string[]>([
    'Khoa học tự nhiên (KHTN)',
    'Toán học',
    'Công nghệ',
    'Mĩ thuật'
  ]);

  // 3. Tên chủ đề bài học STEM
  const [topicName, setTopicName] = useState('');

  // Tùy chọn nâng cao
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [durationPeriods, setDurationPeriods] = useState<number>(3);
  const [targetMaterialsType, setTargetMaterialsType] = useState<'recycled_lowcost' | 'standard_lab' | 'sensor_iot_tech' | 'custom'>('recycled_lowcost');
  const [digitalFocus, setDigitalFocus] = useState('Ứng dụng bảng tính Excel/Google Sheets vẽ biểu đồ, Canva thiết kế poster');
  const [customRequirements, setCustomRequirements] = useState('');

  // Trạng thái AI
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-sync mainSubject into integratedSubjects when mainSubject changes
  const handleMainSubjectChange = (newMain: string) => {
    setMainSubject(newMain);
    if (!integratedSubjects.includes(newMain)) {
      setIntegratedSubjects([newMain, ...integratedSubjects]);
    }
  };

  const toggleSubject = (subjectName: string) => {
    if (integratedSubjects.includes(subjectName)) {
      if (integratedSubjects.length <= 3) {
        return; // Cần tối thiểu 3 môn theo chuẩn STEM GDPT 2018
      }
      setIntegratedSubjects(integratedSubjects.filter(s => s !== subjectName));
    } else {
      setIntegratedSubjects([...integratedSubjects, subjectName]);
    }
  };

  const handleSelectDefaultStemCombo = () => {
    if (mainSubject === 'Khoa học tự nhiên (KHTN)') {
      setIntegratedSubjects(['Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ', 'Tin học', 'Mĩ thuật']);
    } else if (mainSubject === 'Toán học') {
      setIntegratedSubjects(['Toán học', 'Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Mĩ thuật']);
    } else if (mainSubject === 'Công nghệ') {
      setIntegratedSubjects(['Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Mĩ thuật']);
    } else if (mainSubject === 'Tin học') {
      setIntegratedSubjects(['Tin học', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ']);
    } else {
      setIntegratedSubjects([mainSubject, 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ']);
    }
  };

  const handleSelectPreset = (preset: TopicSuggestion) => {
    setTopicName(preset.name);
    setGradeLevel(preset.grade);
    setMainSubject(preset.mainSubject);
    setIntegratedSubjects(preset.integratedSubjects);
    setDurationPeriods(preset.duration);
    setTargetMaterialsType(preset.materialsType);
    setCustomRequirements(preset.highlight);
  };

  // TỰ ĐỘNG LỌC CÁC GỢI Ý PHÙ HỢP CHÍNH XÁC VỚI KHỐI LỚP VÀ MÔN CHỦ ĐẠO
  const matchedSuggestions = STEM_TOPIC_SUGGESTIONS.filter(t => {
    const matchesGrade = t.grade === gradeLevel;
    const matchesSubject = t.mainSubject === mainSubject || t.integratedSubjects.includes(mainSubject);
    return matchesGrade && matchesSubject;
  });

  // Gợi ý bổ sung nếu cùng khối lớp (fallback)
  const gradeSuggestions = STEM_TOPIC_SUGGESTIONS.filter(t => t.grade === gradeLevel);
  const displaySuggestions = matchedSuggestions.length > 0 ? matchedSuggestions : gradeSuggestions;

  const handleRandomTopic = () => {
    const pool = displaySuggestions.length > 0 ? displaySuggestions : STEM_TOPIC_SUGGESTIONS;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    if (randomPick) {
      handleSelectPreset(randomPick);
    }
  };

  if (!isOpen) return null;

  const hasApiKey = Boolean(getStoredApiKey());

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) {
      setErrorMessage('Vui lòng nhập hoặc chọn Tên chủ đề bài học STEM');
      return;
    }

    if (integratedSubjects.length < 3) {
      setErrorMessage('Theo quy định STEM GDPT 2018 THCS, vui lòng chọn tích hợp tối thiểu 3 môn học');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 1500);

    try {
      const payload: GeneratePromptInput = {
        topicName: topicName.trim(),
        gradeLevel,
        mainSubject,
        integratedSubjects,
        durationPeriods,
        targetMaterialsType,
        customRequirements: customRequirements.trim(),
        digitalFocus: digitalFocus.trim()
      };

      const generatedLesson = await generateStemLesson(payload);
      clearInterval(stepInterval);

      onLessonGenerated(generatedLesson);
      onClose();
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Generation error:', err);
      const errMsg = err?.message || 'Vui lòng thử lại';
      setErrorMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="modal-lesson-generator"
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Soạn Kế Hoạch Bài Dạy STEM (Công văn 5512)
              </h2>
              <p className="text-xs text-blue-100/90 font-medium">
                Trường THCS Đồng Yên • Tổ Khoa học Tự nhiên
              </p>
            </div>
          </div>
          <button
            id="btn-close-modal"
            onClick={onClose}
            disabled={isLoading}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/15 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">

          {/* Missing API Key Friendly Warning */}
          {!hasApiKey && (
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-rose-950">Bạn chưa cài đặt Google Gemini API Key</p>
                  <p className="text-slate-600 mt-0.5">
                    Hãy dán API Key cá nhân miễn phí để AI sinh giáo án chính xác theo mọi môn học.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenApiKeyModal?.();
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shrink-0 transition-all flex items-center space-x-1.5 shadow-sm shadow-rose-500/20 cursor-pointer"
              >
                <span>Nhập Key</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-rose-800 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* BƯỚC 1: CHỌN KHỐI LỚP & CHỌN MÔN CHỦ ĐẠO */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>1. Chọn Khối Lớp & Môn Học Chủ Đạo</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khối Lớp <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="select-grade-level"
                    value={gradeLevel}
                    onChange={e => setGradeLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                  >
                    <option value="Lớp 6">Lớp 6</option>
                    <option value="Lớp 7">Lớp 7</option>
                    <option value="Lớp 8">Lớp 8</option>
                    <option value="Lớp 9">Lớp 9</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Môn Học Chủ Đạo (Môn gốc) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="select-main-subject"
                    value={mainSubject}
                    onChange={e => handleMainSubjectChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                  >
                    {THCS_SUBJECTS.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* BƯỚC 2: TÍCH HỢP THÊM CÁC MÔN HỌC KHÁC */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    2. Tích hợp thêm các môn học khác (Tối thiểu 3 môn) <span className="text-rose-500">*</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleSelectDefaultStemCombo}
                    className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Gợi ý tổ hợp STEM chuẩn
                  </button>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    integratedSubjects.length >= 3 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    Đã chọn: {integratedSubjects.length} môn
                  </span>
                </div>
              </div>

              {/* Grid Checkboxes for THCS Subjects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 max-h-44 overflow-y-auto pr-1">
                {THCS_SUBJECTS.map(subj => {
                  const isChecked = integratedSubjects.includes(subj.name);
                  const isMain = mainSubject === subj.name;
                  return (
                    <label
                      key={subj.id}
                      className={`flex items-start space-x-2.5 p-2 rounded-xl cursor-pointer text-xs transition-all border ${
                        isChecked
                          ? 'bg-blue-50/90 border-blue-300 text-blue-950 font-semibold shadow-2xs'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSubject(subj.name)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 mt-0.5 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="truncate flex items-center space-x-1">
                          <span>{subj.name}</span>
                          {isMain && (
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1 rounded">
                              (Chủ đạo)
                            </span>
                          )}
                        </div>
                        {subj.stemTag && (
                          <span className={`inline-block text-[9px] font-medium px-1.5 py-0.2 rounded mt-0.5 ${subj.tagColor || 'bg-slate-100 text-slate-600'}`}>
                            {subj.stemTag}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* BƯỚC 3: NHẬP TÊN CHỦ ĐỀ & HIỂN THỊ GỢI Ý TỰ ĐỘNG THEO KHỐI VÀ MÔN */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <BookMarked className="w-4 h-4 text-blue-600" />
                  <span>3. Nhập Tên Chủ Đề Bài Học STEM <span className="text-rose-500">*</span></span>
                </div>
                <button
                  type="button"
                  onClick={handleRandomTopic}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Chọn ngẫu nhiên 1 chủ đề hay</span>
                </button>
              </div>

              <input
                id="input-topic-name"
                type="text"
                value={topicName}
                onChange={e => setTopicName(e.target.value)}
                placeholder="Nhập tên bài dạy hoặc bấm nhanh các gợi ý bên dưới..."
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs"
              />

              {/* TỰ ĐỘNG HIỂN THỊ CÁC GỢI Ý PHÙ HỢP VỚI KHỐI & MÔN */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-600 flex items-center space-x-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      Gợi ý chủ đề STEM tiêu biểu cho <strong className="text-blue-700">{gradeLevel}</strong> • Môn <strong className="text-blue-700">{mainSubject}</strong> (Bấm để chọn ngay):
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {displaySuggestions.length} chủ đề phù hợp
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {displaySuggestions.map(topic => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectPreset(topic)}
                      className={`text-left p-2.5 rounded-xl border transition-all text-xs font-medium flex flex-col justify-between group cursor-pointer ${
                        topicName === topic.name
                          ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                          : 'bg-white hover:bg-blue-50/80 border-slate-200 text-slate-800 hover:border-blue-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold line-clamp-2">
                          ✨ {topic.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded shrink-0 font-semibold ${
                          topicName === topic.name ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {topic.duration}T
                        </span>
                      </div>
                      <p className={`text-[10px] line-clamp-1 mt-1 ${
                        topicName === topic.name ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {topic.highlight}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TÙY CHỌN NÂNG CAO (THỜI LƯỢNG, VẬT LIỆU, NĂNG LỰC SỐ) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showAdvanced ? 'Thu gọn tùy chọn nâng cao' : 'Tùy chỉnh thời lượng, vật liệu & năng lực số (Tùy chọn)'}</span>
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showAdvanced && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thời lượng bài dạy
                    </label>
                    <select
                      value={durationPeriods}
                      onChange={e => setDurationPeriods(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                    >
                      <option value={1}>1 tiết (45 phút - Bài học STEM mini)</option>
                      <option value={2}>2 tiết (90 phút)</option>
                      <option value={3}>3 tiết (135 phút - Khuyên dùng)</option>
                      <option value={4}>4 tiết (180 phút - Dự án tiêu chuẩn)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Định hướng vật liệu
                    </label>
                    <select
                      value={targetMaterialsType}
                      onChange={e => setTargetMaterialsType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                    >
                      <option value="recycled_lowcost">♻️ Vật liệu tái chế 0 đồng (Chai nhựa, bìa các-tông)</option>
                      <option value="standard_lab">🔬 Dụng cụ phòng thí nghiệm trường học</option>
                      <option value="sensor_iot_tech">⚡ Kit STEM / Cảm biến / Arduino / Microbit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trọng tâm Năng lực số
                  </label>
                  <input
                    type="text"
                    value={digitalFocus}
                    onChange={e => setDigitalFocus(e.target.value)}
                    placeholder="Excel vẽ biểu đồ, Canva làm poster, Tinkercad 3D..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ghi chú đặc thù (nếu có)
                  </label>
                  <input
                    type="text"
                    value={customRequirements}
                    onChange={e => setCustomRequirements(e.target.value)}
                    placeholder="Ví dụ: Chia 6 nhóm học sinh, học tại phòng chức năng KHTN..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              
              <button
                id="btn-submit-generate"
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center space-x-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Đang biên soạn giáo án...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Tạo Kế Hoạch Bài Dạy STEM Chuẩn 5512</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Animation Progress */}
          {isLoading && (
            <div className="mt-3 p-4 rounded-2xl bg-blue-50/90 border border-blue-200 animate-pulse space-y-2">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Đang biên soạn theo đúng quy chuẩn GDPT 2018 ({gradeLevel}):
              </p>
              <div className="space-y-1.5 text-xs text-blue-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Xác định mục tiêu kiến thức môn {mainSubject}, năng lực STEM & năng lực số ({integratedSubjects.join(', ')})</span>
                </div>
                <div className="flex items-center space-x-2">
                  {loadingStep >= 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin shrink-0" />}
                  <span>Xây dựng tiến trình 5 bước kỹ thuật chuẩn Công văn 5512</span>
                </div>
                <div className="flex items-center space-x-2">
                  {loadingStep >= 3 ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full bg-blue-200 shrink-0" />}
                  <span>Tạo bảng ma trận 3 biểu tiêu chí đánh giá Rubrics & Phiếu học tập</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
