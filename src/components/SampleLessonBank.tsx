import React, { useState } from 'react';
import { BookOpen, Search, Filter, Sparkles, Clock, Check, ArrowRight, Bookmark } from 'lucide-react';
import { StemLessonPlan } from '../types';
import { SAMPLE_STEM_LESSONS } from '../data/sampleLessons';

interface SampleLessonBankProps {
  onSelectLesson: (lesson: StemLessonPlan) => void;
  savedLessons: StemLessonPlan[];
}

export const SampleLessonBank: React.FC<SampleLessonBankProps> = ({
  onSelectLesson,
  savedLessons
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'sample' | 'saved'>('sample');

  const combinedLessons = activeTab === 'sample' ? SAMPLE_STEM_LESSONS : savedLessons;

  const filteredLessons = combinedLessons.filter(lesson => {
    const matchesSearch =
      lesson.topicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.mainSubject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      selectedSchoolLevel === 'all' ||
      lesson.gradeLevel === selectedSchoolLevel ||
      lesson.gradeLevel.includes(selectedSchoolLevel);

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/15 text-xs font-semibold text-blue-100 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thư Viện Kế Hoạch Bài Dạy STEM Chuẩn GDPT 2018</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Ngân Hàng Giáo Án STEM Mẫu Đã Thẩm Định
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Các chủ đề STEM tiêu biểu được thiết kế hoàn chỉnh theo cấu trúc 5 bước, tích hợp liên môn và sẵn sàng in ấn, giảng dạy hoặc tùy biến tức thì.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Source Switcher: Thư viện mẫu vs Giáo án đã lưu */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('sample')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'sample'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Thư viện chuẩn ({SAMPLE_STEM_LESSONS.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Giáo án của tôi ({savedLessons.length})
          </button>
        </div>

        {/* Search input & Level Filter */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm theo chủ đề, lớp, môn..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <select
            value={selectedSchoolLevel}
            onChange={e => setSelectedSchoolLevel(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tất cả khối THCS</option>
            <option value="Lớp 6">Khối 6 (THCS)</option>
            <option value="Lớp 7">Khối 7 (THCS)</option>
            <option value="Lớp 8">Khối 8 (THCS)</option>
            <option value="Lớp 9">Khối 9 (THCS)</option>
          </select>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map(lesson => (
          <div
            key={lesson.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {lesson.gradeLevel}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lesson.durationText || `${lesson.durationPeriods} tiết`}</span>
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                {lesson.topicName}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {lesson.overviewDescription}
              </p>

              {/* Integrated subjects badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {lesson.integratedSubjects.slice(0, 3).map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                  >
                    {s}
                  </span>
                ))}
                {lesson.integratedSubjects.length > 3 && (
                  <span className="text-[10px] text-slate-400 px-1 py-0.5">
                    +{lesson.integratedSubjects.length - 3} môn khác
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chuẩn 5 bước & Rubrics</span>
              </span>

              <button
                onClick={() => onSelectLesson(lesson)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shadow-2xs transition-all cursor-pointer"
              >
                <span>Xem & Dạy ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Không tìm thấy giáo án phù hợp</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm nút "Soạn bài mới" để AI thiết kế một giáo án STEM hoàn toàn mới.
          </p>
        </div>
      )}

    </div>
  );
};
