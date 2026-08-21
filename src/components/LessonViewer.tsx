import React, { useState } from 'react';
import {
  Download,
  Edit3,
  Save,
  Sparkles,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  Calculator,
  RotateCcw
} from 'lucide-react';
import { StemLessonPlan } from '../types';
import { exportLessonToWord } from '../utils/exportWord';
import { AIRefineDrawer } from './AIRefineDrawer';

interface LessonViewerProps {
  lesson: StemLessonPlan;
  onLessonUpdate: (updated: StemLessonPlan) => void;
  onSaveToLibrary: (lesson: StemLessonPlan) => void;
  onOpenRubrics: () => void;
  onOpenApiKeyModal?: () => void;
  isSaved?: boolean;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onLessonUpdate,
  onSaveToLibrary,
  onOpenRubrics,
  onOpenApiKeyModal,
  isSaved = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRefineOpen, setIsRefineOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<number | 'all'>('all');

  // Editable local state
  const [editableLesson, setEditableLesson] = useState<StemLessonPlan>(lesson);

  // Synchronize when parent lesson changes
  React.useEffect(() => {
    setEditableLesson(lesson);
  }, [lesson]);

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const realDateText = `Đồng Yên, ngày ${day} tháng ${month} năm ${year}`;

  const handleSaveEdits = () => {
    onLessonUpdate(editableLesson);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Toolbar Action Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2.5 sticky top-20 z-20 print:hidden">
        
        {/* Left Side: Topic Title badge & Quick info */}
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
            {lesson.gradeLevel}
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {lesson.durationText || `${lesson.durationPeriods} tiết`}
          </span>
        </div>

        {/* Right Actions: Export Word, Print, Refine AI, Save, Edit */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* AI Refine Button */}
          <button
            id="btn-open-ai-refine"
            onClick={() => setIsRefineOpen(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tinh chỉnh</span>
          </button>

          {/* Export Word Button */}
          <button
            id="btn-export-word"
            onClick={() => exportLessonToWord(lesson)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors cursor-pointer"
            title="Tải về file Word (.doc) khổ A4 chuẩn thể thức Nghị định 30/2020/NĐ-CP & Công văn 5512/BGDĐT"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất file Word A4 (NĐ 30)</span>
          </button>

          {/* Rubrics live scoring */}
          <button
            id="btn-open-rubrics-score"
            onClick={onOpenRubrics}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Chấm Rubrics</span>
          </button>

          {/* Save to library */}
          <button
            id="btn-save-library"
            onClick={() => onSaveToLibrary(lesson)}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-emerald-600 fill-emerald-600' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Đã lưu' : 'Lưu'}</span>
          </button>

          {/* Direct Edit Toggle */}
          {isEditing ? (
            <button
              onClick={handleSaveEdits}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu sửa</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sửa trực tiếp</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Document Body (Styled like official Ministry of Education A4 Paper) */}
      <div 
        id="official-lesson-document"
        className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 space-y-6 text-slate-900 font-serif leading-relaxed"
      >
        
        {/* Document Header Table (Vietnamese Administration Standard) */}
        <div className="grid grid-cols-12 gap-2 pb-4 border-b border-slate-200 text-center font-sans text-xs sm:text-sm">
          <div className="col-span-5 text-center">
            <p className="font-bold text-slate-800 uppercase tracking-wide whitespace-nowrap">TRƯỜNG THCS ĐỒNG YÊN</p>
            <p className="font-bold text-blue-900 uppercase tracking-wide mt-0.5 whitespace-nowrap">TỔ KHOA HỌC TỰ NHIÊN</p>
            <p className="text-slate-600 font-semibold mt-0.5 whitespace-nowrap">Giáo viên: Nông Thị Nậm</p>
          </div>
          <div className="col-span-7 text-center">
            <p className="font-bold uppercase tracking-wide text-slate-900 whitespace-nowrap">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p className="font-bold text-slate-900 underline underline-offset-4 decoration-1 whitespace-nowrap">Độc lập - Tự do - Hạnh phúc</p>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2 py-2">
          <h1 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-slate-900">
            KẾ HOẠCH BÀI DẠY STEM
          </h1>
          {isEditing ? (
            <input
              type="text"
              value={editableLesson.topicName}
              onChange={e => setEditableLesson({ ...editableLesson, topicName: e.target.value })}
              className="w-full text-center text-lg sm:text-xl font-bold font-sans text-blue-900 bg-blue-50/70 border border-blue-300 rounded-lg p-2 focus:outline-none"
            />
          ) : (
            <h2 className="text-lg sm:text-xl font-bold font-sans uppercase text-blue-900 tracking-wide">
              TÊN CHỦ ĐỀ: {lesson.topicName}
            </h2>
          )}
          <p className="text-xs font-sans italic text-slate-500">
            (Theo định hướng Chương trình GDPT 2018 & Công văn số 5512/BGDĐT-GDTrH)
          </p>
        </div>

        {/* Metadata Parameters */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 font-sans text-xs sm:text-sm space-y-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="font-bold text-slate-800">Môn học chủ đạo:</span>{' '}
              <span className="text-slate-700">{lesson.mainSubject}</span>
            </div>
            <div>
              <span className="font-bold text-slate-800">Đối tượng (Khối lớp):</span>{' '}
              <span className="text-slate-700">{lesson.gradeLevel}</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-800">Các môn tích hợp:</span>{' '}
            <span className="text-slate-700">{lesson.integratedSubjects.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold text-slate-800">Thời lượng dự kiến:</span>{' '}
            <span className="text-slate-700 font-semibold text-blue-800">
              {lesson.durationText || `${lesson.durationPeriods} tiết (${lesson.durationPeriods * 45} phút)`}
            </span>
          </div>
          {lesson.overviewDescription && (
            <div className="pt-2 border-t border-slate-200 text-slate-600 italic">
              <strong>Ý tưởng sư phạm & Ý nghĩa thực tiễn:</strong> {lesson.overviewDescription}
            </div>
          )}
        </div>

        {/* I. MỤC TIÊU CỦA BÀI HỌC */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-sans text-blue-950 uppercase border-b-2 border-blue-900 pb-1 flex items-center justify-between">
            <span>I. MỤC TIÊU CỦA BÀI HỌC</span>
          </h2>

          {/* 1. Kiến thức */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base font-sans text-slate-900">
              1. Về kiến thức
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-800">
              {lesson.objectives.knowledge.map((k, i) => (
                <li key={i} className="text-justify">{k}</li>
              ))}
            </ul>
          </div>

          {/* 2. Năng lực */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-sm sm:text-base font-sans text-slate-900">
              2. Về năng lực
            </h3>

            {/* a. Năng lực chung */}
            <div className="pl-2 space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900 font-sans">a) Năng lực chung:</p>
              <ul className="list-disc list-inside pl-3 space-y-1 text-slate-800">
                <li>
                  <strong>Năng lực tự chủ và tự học:</strong>{' '}
                  {lesson.objectives.generalCompetencies.autonomyAndSelfLearning}
                </li>
                <li>
                  <strong>Năng lực giao tiếp và hợp tác:</strong>{' '}
                  {lesson.objectives.generalCompetencies.communicationAndCollaboration}
                </li>
                <li>
                  <strong>Năng lực giải quyết vấn đề và sáng tạo:</strong>{' '}
                  {lesson.objectives.generalCompetencies.problemSolvingAndCreativity}
                </li>
              </ul>
            </div>

            {/* b. Năng lực STEM */}
            <div className="pl-2 space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900 font-sans">b) Năng lực STEM (Năng lực đặc thù liên môn):</p>
              <ul className="list-disc list-inside pl-3 space-y-1 text-slate-800">
                <li>
                  <strong>Năng lực Khoa học (S):</strong> {lesson.objectives.stemCompetencies.science}
                </li>
                <li>
                  <strong>Năng lực Công nghệ (T):</strong> {lesson.objectives.stemCompetencies.technology}
                </li>
                <li>
                  <strong>Năng lực Kĩ thuật (E):</strong> {lesson.objectives.stemCompetencies.engineering}
                </li>
                <li>
                  <strong>Năng lực Toán học (M):</strong> {lesson.objectives.stemCompetencies.math}
                </li>
                {lesson.objectives.stemCompetencies.art && (
                  <li>
                    <strong>Năng lực Mĩ thuật (A):</strong> {lesson.objectives.stemCompetencies.art}
                  </li>
                )}
              </ul>
            </div>

            {/* c. Năng lực số */}
            <div className="pl-2 space-y-1 text-xs sm:text-sm bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
              <p className="font-semibold text-blue-950 font-sans">c) Năng lực số (Digital Competence):</p>
              <p className="text-slate-800 pl-3">{lesson.objectives.digitalCompetence}</p>
            </div>
          </div>

          {/* 3. Phẩm chất */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm sm:text-base font-sans text-slate-900">
              3. Về phẩm chất
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-800">
              {lesson.objectives.qualities.patriotism && (
                <li><strong>Yêu nước:</strong> {lesson.objectives.qualities.patriotism}</li>
              )}
              {lesson.objectives.qualities.kindness && (
                <li><strong>Nhân ái:</strong> {lesson.objectives.qualities.kindness}</li>
              )}
              <li><strong>Chăm chỉ:</strong> {lesson.objectives.qualities.diligence}</li>
              <li><strong>Trung thực:</strong> {lesson.objectives.qualities.honesty}</li>
              <li><strong>Trách nhiệm:</strong> {lesson.objectives.qualities.responsibility}</li>
            </ul>
          </div>
        </div>

        {/* II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-sans text-blue-950 uppercase border-b-2 border-blue-900 pb-1">
            II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
          </h2>

          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-bold text-slate-900 font-sans">1. Thiết bị của Giáo viên:</p>
            <ul className="list-disc list-inside pl-2 space-y-1 text-slate-800">
              {lesson.equipment.teacherEquipment.map((eq, i) => (
                <li key={i}>{eq}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-bold text-slate-900 font-sans">2. Vật liệu và dụng cụ của Học sinh (Cho mỗi nhóm 4-6 HS):</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-2 text-center w-12">STT</th>
                    <th className="border border-slate-300 p-2 text-left">Tên vật liệu, dụng cụ</th>
                    <th className="border border-slate-300 p-2 text-left">Quy cách / Đặc điểm</th>
                    <th className="border border-slate-300 p-2 text-center w-24">Số lượng</th>
                    <th className="border border-slate-300 p-2 text-left">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson.equipment.studentMaterials.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2 text-center font-medium">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 font-bold text-slate-900">{item.name}</td>
                      <td className="border border-slate-300 p-2 text-slate-700">{item.specification}</td>
                      <td className="border border-slate-300 p-2 text-center font-semibold text-blue-900">{item.quantity}</td>
                      <td className="border border-slate-300 p-2">
                        {item.isRecyclable ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                            Tái chế / 0 đồng
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs">{item.note || '-'}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {lesson.equipment.digitalTools && lesson.equipment.digitalTools.length > 0 && (
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-slate-900 font-sans">3. Thiết bị số & Phần mềm hỗ trợ:</p>
              <p className="text-slate-800 pl-2">{lesson.equipment.digitalTools.join(', ')}</p>
            </div>
          )}

          {lesson.equipment.safetyNotes && lesson.equipment.safetyNotes.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm space-y-1 font-sans">
              <p className="font-bold text-amber-900 flex items-center space-x-1.5">
                <span>⚠️ Lưu ý an toàn lao động trong giờ thực hành:</span>
              </p>
              <ul className="list-disc list-inside pl-2 text-amber-800 space-y-0.5">
                {lesson.equipment.safetyNotes.map((sn, i) => (
                  <li key={i}>{sn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* III. TIẾN TRÌNH DẠY HỌC (QUY TRÌNH THIẾT KẾ KĨ THUẬT) */}
        <div className="space-y-6">
          <div className="border-b-2 border-blue-900 pb-1 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold font-sans text-blue-950 uppercase">
              III. TIẾN TRÌNH DẠY HỌC (QUY TRÌNH THIẾT KẾ KĨ THUẬT 5 BƯỚC)
            </h2>
          </div>

          {lesson.teachingSteps.map((step, idx) => (
            <div
              key={idx}
              className="border border-slate-300 rounded-xl overflow-hidden shadow-2xs font-sans"
            >
              {/* Step Title Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-4 py-2.5 flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base">
                  {step.stepName}
                </span>
                {step.timeEstimate && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-semibold">
                    {step.timeEstimate}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-3 bg-white text-xs sm:text-sm">
                
                {/* a, b, c attributes */}
                <div className="space-y-1.5 font-serif text-slate-800">
                  <p>
                    <strong className="font-sans text-slate-900">a) Mục tiêu:</strong> {step.target}
                  </p>
                  <p>
                    <strong className="font-sans text-slate-900">b) Nội dung:</strong> {step.content}
                  </p>
                  <p>
                    <strong className="font-sans text-slate-900">c) Sản phẩm:</strong> {step.expectedProduct}
                  </p>
                  <p>
                    <strong className="font-sans text-slate-900">d) Tổ chức thực hiện:</strong>
                  </p>
                </div>

                {/* Table of GV and HS Activities */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300 text-xs">
                    <thead>
                      <tr className="bg-slate-100 font-sans">
                        <th className="border border-slate-300 p-2.5 text-left w-1/2 font-bold text-blue-950">
                          Hoạt động của Giáo viên
                        </th>
                        <th className="border border-slate-300 p-2.5 text-left w-1/2 font-bold text-blue-950">
                          Hoạt động của Học sinh
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-3 align-top bg-slate-50/40">
                          <ul className="list-disc list-inside space-y-1.5 text-slate-800">
                            {step.implementation.teacherActivities.map((act, i) => (
                              <li key={i} className="text-justify">{act}</li>
                            ))}
                          </ul>
                          {step.implementation.transferMethod && (
                            <p className="mt-2 text-[11px] text-blue-800 italic">
                              * Cách thức giao nhiệm vụ: {step.implementation.transferMethod}
                            </p>
                          )}
                        </td>
                        <td className="border border-slate-300 p-3 align-top">
                          <ul className="list-disc list-inside space-y-1.5 text-slate-800">
                            {step.implementation.studentActivities.map((act, i) => (
                              <li key={i} className="text-justify">{act}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* IV. BIỂU TIÊU CHÍ ĐÁNH GIÁ CHỦ ĐỀ STEM (RUBRICS) */}
        <div className="space-y-5">
          <div className="border-b-2 border-blue-900 pb-1 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold font-sans text-blue-950 uppercase">
              IV. BIỂU TIÊU CHÍ ĐÁNH GIÁ CHỦ ĐỀ STEM (RUBRICS)
            </h2>
          </div>

          {/* 1. Biểu tiêu chí đánh giá sản phẩm */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm sm:text-base font-sans text-slate-900">
              1. Biểu tiêu chí đánh giá sản phẩm
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-2 text-left w-1/4">Tiêu chí</th>
                    <th className="border border-slate-300 p-2 text-center w-16">Trọng số</th>
                    <th className="border border-slate-300 p-2 text-left w-1/4 bg-amber-50/50">Mức 1: Cần cố gắng</th>
                    <th className="border border-slate-300 p-2 text-left w-1/4 bg-blue-50/50">Mức 2: Đạt</th>
                    <th className="border border-slate-300 p-2 text-left w-1/4 bg-emerald-50/50">Mức 3: Tốt / Xuất sắc</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson.evaluationCriteria.productCriteria.map(crit => (
                    <tr key={crit.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-bold text-slate-900">
                        {crit.name}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-center font-bold text-blue-800">
                        {crit.weightPercent ? `${crit.weightPercent}%` : '-'}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">{crit.levels.level1}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">{crit.levels.level2}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700 font-medium text-emerald-950">
                        {crit.levels.level3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Biểu tiêu chí đánh giá quá trình thực hiện */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm sm:text-base font-sans text-slate-900">
              2. Biểu tiêu chí đánh giá quá trình thực hiện
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-2 text-left w-1/3">Tiêu chí</th>
                    <th className="border border-slate-300 p-2 text-left w-2/9">Mức 1: Cần cố gắng</th>
                    <th className="border border-slate-300 p-2 text-left w-2/9">Mức 2: Đạt</th>
                    <th className="border border-slate-300 p-2 text-left w-2/9">Mức 3: Tốt / Xuất sắc</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson.evaluationCriteria.processCriteria.map(crit => (
                    <tr key={crit.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-bold text-slate-900">{crit.name}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">{crit.levels.level1}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">{crit.levels.level2}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700 font-medium text-emerald-950">{crit.levels.level3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Biểu tiêu chí đánh giá kiến thức vận dụng */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm sm:text-base font-sans text-slate-900">
              3. Biểu tiêu chí đánh giá kiến thức vận dụng
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-2 text-left w-1/3">Tiêu chí</th>
                    <th className="border border-slate-300 p-2 text-left w-2/9">Mức 1: Cần cố gắng</th>
                    <th className="border border-slate-300 p-2 text-left w-2/9">Mức 2: Đạt</th>
                    <th className="border border-slate-300 p-2 text-left w-2/9">Mức 3: Tốt / Xuất sắc</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson.evaluationCriteria.knowledgeCriteria.map(crit => (
                    <tr key={crit.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-bold text-slate-900">{crit.name}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">{crit.levels.level1}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700">{crit.levels.level2}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-700 font-medium text-emerald-950">{crit.levels.level3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Worksheets Appendix */}
        {lesson.worksheets && lesson.worksheets.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-base sm:text-lg font-bold font-sans text-blue-950 uppercase border-b border-slate-200 pb-1">
              PHỤ LỤC: PHIẾU HỌC TẬP VÀ PHIẾU GIAO NHIỆM VỤ
            </h2>
            <div className="space-y-4">
              {lesson.worksheets.map((ws, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-sans space-y-2 text-xs sm:text-sm">
                  <h4 className="font-bold text-slate-900 text-sm uppercase">{ws.title}</h4>
                  <p className="text-slate-500 italic text-xs">{ws.description}</p>
                  <div>
                    <strong className="text-slate-800">Nhiệm vụ của học sinh:</strong>
                    <ul className="list-disc list-inside pl-2 space-y-1 text-slate-700 mt-1">
                      {ws.tasks.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  {ws.questions && ws.questions.length > 0 && (
                    <div>
                      <strong className="text-slate-800">Câu hỏi định hướng suy ngẫm:</strong>
                      <ul className="list-disc list-inside pl-2 space-y-1 text-slate-700 mt-1">
                        {ws.questions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Signature Blocks */}
        <div className="grid grid-cols-2 gap-8 sm:gap-14 pt-14 mt-8 border-t border-slate-100 text-center font-sans text-xs sm:text-sm print:pt-10 print:mt-6 print:border-none print:break-inside-avoid">
          <div className="flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="h-5"></div>
              <p className="font-bold uppercase text-slate-900 mt-1 tracking-wide">TỔ TRƯỞNG CHUYÊN MÔN</p>
              <p className="italic text-slate-500 text-xs mt-0.5">(Ký và ghi rõ họ tên)</p>
            </div>
            <div className="h-36 sm:h-44 flex items-center justify-center">
              {/* Khoảng trống rộng rãi để ký tên và phê duyệt */}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm sm:text-base">Mai Văn Hùng</p>
            </div>
          </div>
          <div className="flex flex-col justify-between min-h-[220px]">
            <div>
              <p className="italic text-slate-600 text-xs h-5 flex items-center justify-center">{realDateText}</p>
              <p className="font-bold uppercase text-slate-900 mt-1 tracking-wide">GIÁO VIÊN SOẠN BÀI</p>
              <p className="italic text-slate-500 text-xs mt-0.5">(Ký và ghi rõ họ tên)</p>
            </div>
            <div className="h-36 sm:h-44 flex items-center justify-center">
              {/* Khoảng trống rộng rãi để ký tên và ghi rõ họ tên */}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm sm:text-base">Nông Thị Nậm</p>
            </div>
          </div>
        </div>

      </div>

      {/* AI Refine Drawer */}
      <AIRefineDrawer
        isOpen={isRefineOpen}
        onClose={() => setIsRefineOpen(false)}
        currentLesson={lesson}
        onLessonUpdated={updated => {
          onLessonUpdate(updated);
          setIsRefineOpen(false);
        }}
        onOpenApiKeyModal={onOpenApiKeyModal}
      />

    </div>
  );
};
