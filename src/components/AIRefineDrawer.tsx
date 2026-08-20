import React, { useState } from 'react';
import { Sparkles, X, Wand2, RefreshCw, Cpu, Layers, HelpCircle, FileText, CheckCircle, Key } from 'lucide-react';
import { StemLessonPlan } from '../types';
import { refineStemLesson, getStoredApiKey } from '../services/geminiService';

interface AIRefineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLesson: StemLessonPlan;
  onLessonUpdated: (updatedLesson: StemLessonPlan) => void;
  onOpenApiKeyModal?: () => void;
}

export const AIRefineDrawer: React.FC<AIRefineDrawerProps> = ({
  isOpen,
  onClose,
  currentLesson,
  onLessonUpdated,
  onOpenApiKeyModal
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const hasApiKey = Boolean(getStoredApiKey());

  const handleRefine = async (actionType: string, instruction: string) => {
    if (!hasApiKey) {
      setErrorMsg('Vui lòng cài đặt API Key trước khi sử dụng tính năng AI tinh chỉnh chuyên sâu.');
      return;
    }

    setIsRefining(true);
    setActiveAction(actionType);
    setErrorMsg('');

    try {
      const updated = await refineStemLesson(currentLesson, instruction, actionType);
      onLessonUpdated(updated);
      setCustomPrompt('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Không thể tinh chỉnh: ' + (err?.message || 'Vui lòng thử lại'));
    } finally {
      setIsRefining(false);
      setActiveAction(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div 
        id="drawer-ai-refine"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-white/15 rounded-lg">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Trợ Lý AI Tinh Chỉnh Giáo Án</h3>
              <p className="text-xs text-blue-100">Nâng cấp chất lượng và điều chỉnh chuyên sâu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          
          {/* Missing API Key Warning */}
          {!hasApiKey && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-2">
              <p className="font-bold flex items-center space-x-1">
                <span>⚠️ Chưa có API Key</span>
              </p>
              <p className="text-rose-700">
                Để thực hiện tinh chỉnh AI theo thời gian thực, bạn cần cài đặt Gemini API Key.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenApiKeyModal?.();
                }}
                className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Mở Cài Đặt API Key</span>
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 leading-relaxed font-medium">
              {errorMsg}
            </div>
          )}

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Các tính năng nâng cấp 1 chạm:
          </p>

          {/* Quick Actions List */}
          <div className="space-y-2.5">
            
            {/* 1. Add Digital Competence */}
            <button
              disabled={isRefining}
              onClick={() =>
                handleRefine(
                  'digital_boost',
                  'Hãy bổ sung và tích hợp sâu Năng lực số (Digital Competence) cho bài học: chỉ định rõ công cụ mô phỏng 3D (Tinkercad), ứng dụng thu thập dữ liệu (Phyphox/Excel), hoặc thiết kế poster sản phẩm (Canva), và đưa các bước sử dụng phần mềm vào Hoạt động của HS ở Bước 3 & Bước 4.'
                )
              }
              className="w-full p-3.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all group flex items-start space-x-3 cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                  Tăng cường Năng lực số & Phần mềm
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tích hợp Tinkercad 3D, Excel vẽ đồ thị, Canva thiết kế poster vào tiến trình dạy học.
                </p>
              </div>
            </button>

            {/* 2. Zero-cost Recycled Materials */}
            <button
              disabled={isRefining}
              onClick={() =>
                handleRefine(
                  'zero_cost_recycled',
                  'Hãy tối ưu hóa 100% bảng vật tư sang vật liệu tái chế 0 đồng, dễ kiếm ở mọi vùng miền Việt Nam (chai nhựa rỗng, que kem, bìa carton, dây thun, nắp chai), đồng thời bổ sung các hướng dẫn an toàn khi cắt gọt rác tái chế.'
                )
              }
              className="w-full p-3.5 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group flex items-start space-x-3 cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                  Tối ưu Vật liệu tái chế 0 đồng
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Chuyển sang 100% chai nhựa, bìa các-tông, que tre, tiết kiệm chi phí tối đa cho học sinh.
                </p>
              </div>
            </button>

            {/* 3. Bloom Questioning System */}
            <button
              disabled={isRefining}
              onClick={() =>
                handleRefine(
                  'bloom_questions',
                  'Hãy bổ sung hệ thống câu hỏi định hướng, gợi mở của Giáo viên theo các cấp độ tư duy thang Bloom (Biết, Hiểu, Vận dụng, Phân tích, Sáng tạo) vào chi tiết Hoạt động của GV ở Bước 1, Bước 2 và Bước 5.'
                )
              }
              className="w-full p-3.5 bg-slate-50 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 rounded-xl text-left transition-all group flex items-start space-x-3 cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                  Bổ sung câu hỏi gợi mở (Thang Bloom)
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Thêm câu hỏi phản biện, kích thích tư duy sáng tạo cho giáo viên trong từng hoạt động.
                </p>
              </div>
            </button>

            {/* 4. Generate Worksheets & Rubrics Expansion */}
            <button
              disabled={isRefining}
              onClick={() =>
                handleRefine(
                  'worksheets_expand',
                  'Hãy tạo bổ sung chi tiết 2 Phiếu học tập (Phiếu nghiên cứu kiến thức nền và Phiếu thử nghiệm sản phẩm) kèm tiêu chí chấm điểm đồng đẳng (Peer assessment) giữa các nhóm học sinh.'
                )
              }
              className="w-full p-3.5 bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 rounded-xl text-left transition-all group flex items-start space-x-3 cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                  Mở rộng Phiếu Học Tập & Bảng Kiểm
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tạo phiếu giao nhiệm vụ in sẵn và phiếu chấm chéo đồng đẳng giữa các nhóm.
                </p>
              </div>
            </button>
          </div>

          {/* Custom Instruction Box */}
          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Hoặc yêu cầu AI điều chỉnh theo ý bạn:
            </label>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              placeholder="Ví dụ: Rút gọn hoạt động chế tạo xuống 25 phút; Thêm bài toán tính chu vi hình tròn ở bước thiết kế; Phân hóa cho học sinh trường chuyên..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
            <button
              disabled={isRefining || !customPrompt.trim()}
              onClick={() => handleRefine('custom_prompt', customPrompt.trim())}
              className="mt-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {isRefining ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý nâng cấp...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Thực Hiện Điều Chỉnh</span>
                </>
              )}
            </button>
          </div>

          {/* Status feedback */}
          {isRefining && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center space-x-2 text-blue-800 text-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Chuyên gia STEM đang tinh chỉnh và đồng bộ cấu trúc giáo án...</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
