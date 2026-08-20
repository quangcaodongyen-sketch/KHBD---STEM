import React, { useState } from 'react';
import { Award, Plus, Trash2, CheckCircle, Calculator, Printer, FileSpreadsheet, Share2 } from 'lucide-react';
import { StemLessonPlan, EvaluationCriterion } from '../types';
import confetti from 'canvas-confetti';

interface RubricsCalculatorProps {
  lesson: StemLessonPlan;
}

interface GroupEvaluation {
  id: string;
  groupName: string;
  productScores: Record<string, number>; // criterionId -> 1 (Chưa đạt), 2 (Đạt), 3 (Tốt)
  processScores: Record<string, number>;
  knowledgeScores: Record<string, number>;
  teacherNotes: string;
}

export const RubricsCalculator: React.FC<RubricsCalculatorProps> = ({ lesson }) => {
  const [groups, setGroups] = useState<GroupEvaluation[]>([
    {
      id: 'g1',
      groupName: 'Nhóm 1 (Tên tự đặt: Chiến Binh Xanh)',
      productScores: { 'crit-p1': 3, 'crit-p2': 2, 'crit-p3': 3 },
      processScores: { 'crit-pr1': 3, 'crit-pr2': 3 },
      knowledgeScores: { 'crit-k1': 2 },
      teacherNotes: 'Sản phẩm hoàn thiện đúng giờ, nước lọc rất trong. Cần giải thích rõ hơn cơ chế hấp phụ than hoạt tính.'
    },
    {
      id: 'g2',
      groupName: 'Nhóm 2 (Tên tự đặt: Kỹ Sư Tương Lai)',
      productScores: { 'crit-p1': 2, 'crit-p2': 3, 'crit-p3': 2 },
      processScores: { 'crit-pr1': 2, 'crit-pr2': 3 },
      knowledgeScores: { 'crit-k1': 3 },
      teacherNotes: 'Thuyết trình rất tự tin và am hiểu kiến thức liên môn, thiết kế khung vỏ cần gọn hơn.'
    }
  ]);

  const [activeGroupId, setActiveGroupId] = useState<string>('g1');

  const addGroup = () => {
    const newId = 'g_' + Date.now();
    const newGroup: GroupEvaluation = {
      id: newId,
      groupName: `Nhóm ${groups.length + 1}`,
      productScores: {},
      processScores: {},
      knowledgeScores: {},
      teacherNotes: ''
    };
    setGroups([...groups, newGroup]);
    setActiveGroupId(newId);
  };

  const removeGroup = (id: string) => {
    if (groups.length <= 1) return;
    const remaining = groups.filter(g => g.id !== id);
    setGroups(remaining);
    if (activeGroupId === id) {
      setActiveGroupId(remaining[0].id);
    }
  };

  const currentGroup = groups.find(g => g.id === activeGroupId) || groups[0];

  const updateScore = (category: 'product' | 'process' | 'knowledge', critId: string, level: number) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== currentGroup.id) return g;
        if (category === 'product') {
          return { ...g, productScores: { ...g.productScores, [critId]: level } };
        } else if (category === 'process') {
          return { ...g, processScores: { ...g.processScores, [critId]: level } };
        } else {
          return { ...g, knowledgeScores: { ...g.knowledgeScores, [critId]: level } };
        }
      })
    );
  };

  const updateNotes = (notes: string) => {
    setGroups(prev =>
      prev.map(g => (g.id === currentGroup.id ? { ...g, teacherNotes: notes } : g))
    );
  };

  const updateGroupName = (name: string) => {
    setGroups(prev =>
      prev.map(g => (g.id === currentGroup.id ? { ...g, groupName: name } : g))
    );
  };

  // Compute weighted score for a group
  const calculateGroupScore = (g: GroupEvaluation) => {
    const productCrits = lesson.evaluationCriteria.productCriteria;
    const processCrits = lesson.evaluationCriteria.processCriteria;
    const knowledgeCrits = lesson.evaluationCriteria.knowledgeCriteria;

    // Weight allocation: Product 50%, Process 25%, Knowledge 25%
    let productSum = 0;
    let productMax = productCrits.length * 3;
    productCrits.forEach(c => {
      productSum += g.productScores[c.id] || 2;
    });
    const productPct = productMax > 0 ? (productSum / productMax) * 100 : 70;

    let processSum = 0;
    let processMax = processCrits.length * 3;
    processCrits.forEach(c => {
      processSum += g.processScores[c.id] || 2;
    });
    const processPct = processMax > 0 ? (processSum / processMax) * 100 : 70;

    let knowledgeSum = 0;
    let knowledgeMax = knowledgeCrits.length * 3;
    knowledgeCrits.forEach(c => {
      knowledgeSum += g.knowledgeScores[c.id] || 2;
    });
    const knowledgePct = knowledgeMax > 0 ? (knowledgeSum / knowledgeMax) * 100 : 70;

    const total10 = ((productPct * 0.5 + processPct * 0.25 + knowledgePct * 0.25) / 10);
    const rounded10 = Math.round(total10 * 10) / 10;

    let tier = 'Đạt (Hoàn thành)';
    let tierColor = 'text-blue-700 bg-blue-50 border-blue-200';
    if (rounded10 >= 8.5) {
      tier = 'Xuất sắc (Vượt chuẩn)';
      tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (rounded10 >= 7.0) {
      tier = 'Tốt (Đạt chuẩn tốt)';
      tierColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
    } else if (rounded10 < 5.0) {
      tier = 'Cần cố gắng';
      tierColor = 'text-amber-700 bg-amber-50 border-amber-200';
    }

    return { rounded10, tier, tierColor, productPct, processPct, knowledgePct };
  };

  const currentStats = calculateGroupScore(currentGroup);

  const handleTriggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrintScoreSheet = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Overview Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Công cụ Đánh giá & Chấm điểm Thực địa GDPT 2018</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Bảng Chấm Điểm Rubrics Sản Phẩm STEM
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chủ đề: <span className="font-semibold text-slate-800">{lesson.topicName}</span> ({lesson.gradeLevel})
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handlePrintScoreSheet}
            className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>In Bảng Điểm</span>
          </button>
          <button
            onClick={addGroup}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Nhóm Mới</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Group Selector & Right Rubric Scoring Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Groups List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Danh sách các nhóm ({groups.length})
          </h3>
          <div className="space-y-2">
            {groups.map((g, idx) => {
              const stats = calculateGroupScore(g);
              const isSelected = g.id === currentGroup.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setActiveGroupId(g.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500/30'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                      {g.groupName}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100/60 px-1.5 py-0.2 rounded-md">
                        {stats.rounded10} / 10đ
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">
                        {stats.tier.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  {groups.length > 1 && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        removeGroup(g.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                      title="Xóa nhóm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Group Scoring Dashboard */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Group Header & Realtime Result Badge */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                Tên nhóm đang chấm điểm:
              </label>
              <input
                type="text"
                value={currentGroup.groupName}
                onChange={e => updateGroupName(e.target.value)}
                className="text-base sm:text-lg font-bold text-slate-900 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-transparent focus:border-blue-400 rounded-lg px-2.5 py-1 w-full max-w-md focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-blue-700 leading-none">
                  {currentStats.rounded10} <span className="text-xs font-medium text-slate-400">/ 10</span>
                </div>
                <div className={`text-[11px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block ${currentStats.tierColor}`}>
                  {currentStats.tier}
                </div>
              </div>
              <button
                onClick={handleTriggerCelebration}
                className="p-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl border border-blue-200 text-xs font-semibold"
                title="Thưởng pháo hoa khen ngợi"
              >
                🎉 Khen
              </button>
            </div>
          </div>

          {/* 1. Tiêu chí Sản phẩm (50% trọng số) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>1. Tiêu chí Đánh giá Sản phẩm STEM (Trọng số 50%)</span>
              </h3>
            </div>

            <div className="space-y-4">
              {lesson.evaluationCriteria.productCriteria.map(crit => {
                const currentLevel = currentGroup.productScores[crit.id] || 2;
                return (
                  <div key={crit.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">{crit.name}</span>
                      {crit.weightPercent && (
                        <span className="text-[11px] font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Tỉ trọng {crit.weightPercent}%
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* Mức 1 */}
                      <button
                        onClick={() => updateScore('product', crit.id, 1)}
                        className={`p-2.5 rounded-lg text-left text-xs border transition-all ${
                          currentLevel === 1
                            ? 'bg-amber-100 border-amber-400 font-semibold text-amber-950 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-[11px] text-amber-800 mb-0.5">Mức 1 (Cần cố gắng - 1đ)</div>
                        <p className="line-clamp-2 text-[11px]">{crit.levels.level1}</p>
                      </button>

                      {/* Mức 2 */}
                      <button
                        onClick={() => updateScore('product', crit.id, 2)}
                        className={`p-2.5 rounded-lg text-left text-xs border transition-all ${
                          currentLevel === 2
                            ? 'bg-blue-100 border-blue-400 font-semibold text-blue-950 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-[11px] text-blue-800 mb-0.5">Mức 2 (Đạt - 2đ)</div>
                        <p className="line-clamp-2 text-[11px]">{crit.levels.level2}</p>
                      </button>

                      {/* Mức 3 */}
                      <button
                        onClick={() => updateScore('product', crit.id, 3)}
                        className={`p-2.5 rounded-lg text-left text-xs border transition-all ${
                          currentLevel === 3
                            ? 'bg-emerald-100 border-emerald-400 font-semibold text-emerald-950 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-[11px] text-emerald-800 mb-0.5">Mức 3 (Tốt / Xuất sắc - 3đ)</div>
                        <p className="line-clamp-2 text-[11px]">{crit.levels.level3}</p>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Tiêu chí Quá trình & 3. Tiêu chí Kiến thức */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Process Criteria */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>2. Quá trình Thực hiện (25%)</span>
              </h3>
              {lesson.evaluationCriteria.processCriteria.map(crit => {
                const currentLevel = currentGroup.processScores[crit.id] || 2;
                return (
                  <div key={crit.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900 mb-1.5">{crit.name}</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2, 3].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => updateScore('process', crit.id, lvl)}
                          className={`py-1.5 px-2 rounded-md font-bold text-center border transition-all ${
                            currentLevel === lvl
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {lvl === 1 ? 'Mức 1' : lvl === 2 ? 'Mức 2' : 'Mức 3'}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Knowledge Criteria */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span>3. Kiến thức Vận dụng (25%)</span>
              </h3>
              {lesson.evaluationCriteria.knowledgeCriteria.map(crit => {
                const currentLevel = currentGroup.knowledgeScores[crit.id] || 2;
                return (
                  <div key={crit.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900 mb-1.5">{crit.name}</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2, 3].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => updateScore('knowledge', crit.id, lvl)}
                          className={`py-1.5 px-2 rounded-md font-bold text-center border transition-all ${
                            currentLevel === lvl
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {lvl === 1 ? 'Mức 1' : lvl === 2 ? 'Mức 2' : 'Mức 3'}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teacher Notes & Feedback */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nhận xét và Lời khuyên của Giáo viên cho {currentGroup.groupName}:
            </label>
            <textarea
              rows={3}
              value={currentGroup.teacherNotes}
              onChange={e => updateNotes(e.target.value)}
              placeholder="Ghi chú đánh giá về ưu điểm, mặt cần cải thiện, kỹ năng thuyết trình và an toàn thực hành..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

        </div>
      </div>

    </div>
  );
};
