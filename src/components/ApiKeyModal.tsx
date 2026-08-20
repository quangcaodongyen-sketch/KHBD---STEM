import React, { useState, useEffect } from 'react';
import { 
  Key, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Eye, 
  EyeOff, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck,
  ClipboardPaste,
  ArrowRight,
  HelpCircle,
  Mail,
  Zap,
  Play
} from 'lucide-react';
import { 
  AVAILABLE_MODELS, 
  getStoredApiKey, 
  saveStoredApiKey, 
  getStoredModel, 
  saveStoredModel, 
  testApiKey 
} from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash-preview');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAdvancedModels, setShowAdvancedModels] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setSelectedModel(getStoredModel());
      setTestResult(null);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng dán mã API Key trước khi kiểm tra.'
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const result = await testApiKey(apiKey.trim(), selectedModel);
    setIsTesting(false);
    setTestResult(result);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredApiKey(apiKey.trim());
    saveStoredModel(selectedModel);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onSaved?.();
      onClose();
    }, 600);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setApiKey(text.trim());
        setTestResult(null);
      }
    } catch {
      // Fallback
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    saveStoredApiKey('');
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="modal-api-settings"
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Cài Đặt API Key Google Gemini
              </h2>
              <p className="text-xs text-blue-100/90 font-medium">
                Miễn phí 100% • Dễ dàng lấy trong 1 phút • Không cần thẻ ngân hàng
              </p>
            </div>
          </div>
          <button
            id="btn-close-api-modal"
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/15 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Visual Step-by-Step Guide: Ai cũng làm được */}
          <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-slate-50 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>3 Bước Lấy Key Cực Kỳ Đơn Giản (Có Ảnh Hướng Dẫn)</span>
              </span>
              <a
                href="https://aistudio.google.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>Mở AI Studio Ngay</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Step 1 */}
              <div className="bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                    1
                  </div>
                  <p className="font-bold text-slate-800">Đăng Nhập Gmail</p>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Nhấn nút xanh ở trên để mở trang Google AI Studio và đăng nhập bằng tài khoản Gmail của bạn.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                    2
                  </div>
                  <p className="font-bold text-slate-800">Tạo Khóa API</p>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Bấm vào nút <strong>"Create API key"</strong> màu xanh trên màn hình Google AI Studio.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                    3
                  </div>
                  <p className="font-bold text-slate-800">Dán Vào Đây</p>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Bấm <strong>Copy</strong> rồi quay lại app này dán vào ô bên dưới, bấm <strong>Lưu</strong> là xong!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center space-x-1 text-amber-900 font-medium">
                <span>💡</span>
                <span><strong>Mẹo nhỏ:</strong> Nếu sau này hết hạn ngạch ngày (Quota), chỉ cần đổi sang Gmail khác để lấy Key mới là dùng tiếp bình thường.</span>
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            
            {/* API Key Input Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Dán Mã API Key Của Bạn Vào Đây <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>Dán từ bộ nhớ</span>
                  </button>
                  {apiKey && (
                    <button
                      type="button"
                      onClick={handleClearKey}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <input
                  id="input-gemini-api-key"
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={e => {
                    setApiKey(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder="Dán mã bắt đầu bằng AIzaSy..."
                  className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title={showKey ? 'Ẩn Key' : 'Hiện Key'}
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Khóa API được lưu trực tiếp an toàn trên trình duyệt của bạn, hoàn toàn bảo mật và riêng tư.</span>
              </p>
            </div>

            {/* Test Result Message */}
            {testResult && (
              <div className={`p-3.5 rounded-2xl border text-xs flex items-start space-x-2.5 animate-in fade-in duration-150 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 font-medium">{testResult.message}</div>
              </div>
            )}

            {/* Model Selector Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Model AI Hoạt Động</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowAdvancedModels(!showAdvancedModels)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  {showAdvancedModels ? 'Thu gọn' : 'Tùy chọn Model khác'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(showAdvancedModels ? AVAILABLE_MODELS : AVAILABLE_MODELS.slice(0, 2)).map(model => {
                  const isSelected = selectedModel === model.id;
                  return (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {model.name}
                          </span>
                          <div>
                            <span className={`inline-block mt-1 px-2 py-0.2 rounded-full text-[10px] font-semibold border ${model.badgeColor}`}>
                              {model.badge}
                            </span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="selected_model"
                          checked={isSelected}
                          onChange={() => setSelectedModel(model.id)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer mt-1"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        {model.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons & Testing */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleTestKey}
                disabled={isTesting || !apiKey.trim()}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang kiểm tra...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Kiểm tra kết nối API</span>
                  </>
                )}
              </button>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                <span>Hỗ trợ kỹ thuật & Bản quyền: </span>
                <span className="font-bold text-slate-700">Thầy giáo Đinh Văn Thành - Trường THCS Đồng Yên (ĐT: 0915.213717)</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  id="btn-save-api-key"
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  {saveSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Đã Lưu Xong!</span>
                    </>
                  ) : (
                    <>
                      <span>Lưu & Bắt Đầu Dùng</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
