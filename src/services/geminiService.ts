import { GoogleGenAI } from '@google/genai';
import { GeneratePromptInput, StemLessonPlan } from '../types';

export const STORAGE_KEY_API_KEY = 'gemini_api_key';
export const STORAGE_KEY_MODEL = 'gemini_preferred_model';

export interface AIModelOption {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  contextWindow: string;
  isRecommended?: boolean;
}

export const AVAILABLE_MODELS: AIModelOption[] = [
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    badge: 'Khuyên Dùng Mặc Định',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Thế hệ mới nhất, khả năng tư duy sư phạm xuất sắc, tốc độ phản hồi cực nhanh.',
    contextWindow: '1,000,000 tokens',
    isRecommended: true
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    badge: 'Ổn Định & Nhanh',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Bản Flash tiêu chuẩn, hoạt động ổn định, cân bằng giữa chi phí và độ chi tiết.',
    contextWindow: '1,000,000 tokens'
  },
  {
    id: 'gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    badge: 'Tiết Kiệm Quota',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Phiên bản siêu nhẹ, tốn ít hạn ngạch quota nhất, phản hồi tức thì.',
    contextWindow: '128,000 tokens'
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    badge: 'Chất Lượng Chuyên Sâu',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Dành cho giáo án phức tạp, phân tích kiến thức liên môn chuyên sâu và nâng cao.',
    contextWindow: '1,000,000 tokens'
  }
];

export const DEFAULT_MODEL = 'gemini-3-flash-preview';

export function getStoredApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_API_KEY)?.trim() || '';
  } catch {
    return '';
  }
}

export function saveStoredApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_API_KEY);
    }
  } catch (e) {
    console.error('Error saving API Key to localStorage', e);
  }
}

export function getStoredModel(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_MODEL)?.trim() || DEFAULT_MODEL;
  } catch {
    return DEFAULT_MODEL;
  }
}

export function saveStoredModel(model: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODEL, model.trim());
  } catch (e) {
    console.error('Error saving Model to localStorage', e);
  }
}

// Instantiate SDK safely
function createGenAI(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'stem-lesson-planner-client'
      }
    }
  });
}

// Test key validity
export async function testApiKey(key: string, modelId: string = DEFAULT_MODEL): Promise<{ success: boolean; message: string }> {
  if (!key || !key.trim()) {
    return { success: false, message: 'Vui lòng nhập mã API Key.' };
  }

  try {
    const ai = createGenAI(key.trim());
    const response = await ai.models.generateContent({
      model: modelId,
      contents: 'Xin chào, hãy phản hồi chữ "OK" để xác nhận kết nối.',
      config: {
        temperature: 0.1,
        maxOutputTokens: 10
      }
    });

    if (response.text) {
      return { success: true, message: 'Kết nối API Key thành công! Model sẵn sàng hoạt động.' };
    }
    return { success: false, message: 'Không nhận được phản hồi từ AI Studio. Vui lòng kiểm tra lại Key.' };
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('400') || errMsg.includes('key not valid')) {
      return { success: false, message: 'API Key không hợp lệ. Vui lòng kiểm tra lại ký tự copy từ Google AI Studio.' };
    }
    if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
      return { success: false, message: 'API Key này đã hết hạn ngạch (Quota Exceeded). Vui lòng dùng tài khoản Gmail khác để tạo key mới.' };
    }
    return { success: false, message: 'Lỗi kiểm tra API: ' + errMsg };
  }
}

// Call Gemini with Fallback sequence
async function callGeminiWithFallback(
  apiKey: string,
  preferredModel: string,
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0.7
): Promise<string> {
  const candidateModels = Array.from(new Set([
    preferredModel,
    'gemini-3-flash-preview',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.5-pro'
  ]));

  let lastError: any = null;
  let isQuotaExhausted = false;

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Gemini Client] Invoking model: ${model} (attempt ${attempt})`);
        const ai = createGenAI(apiKey);
        const response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature
          }
        });

        if (response.text && response.text.trim()) {
          return response.text.trim();
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        console.warn(`[Gemini Client] Model ${model} attempt ${attempt} error:`, errMsg);

        if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
          isQuotaExhausted = true;
        }

        const isTemporary =
          errMsg.includes('503') ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('429') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          errMsg.includes('high demand') ||
          errMsg.includes('overloaded');

        if (isTemporary && attempt < 2) {
          await new Promise(r => setTimeout(r, 1000 * attempt));
        } else {
          break; // Try next model candidate
        }
      }
    }
  }

  if (isQuotaExhausted) {
    throw new Error('QUOTA_EXHAUSTED: API Key của bạn đã đạt giới hạn hạn ngạch sử dụng trong ngày. Vui lòng bấm vào nút "Cài đặt API Key" trên Header để dán Key từ một tài khoản Gmail khác hoặc thử lại vào ngày mai.');
  }

  throw lastError || new Error('Tất cả các mô hình AI hiện đang bận. Vui lòng kiểm tra lại kết nối hoặc thử lại sau ít phút.');
}

// Fallback high-quality curriculum generator
export function generateFallbackLesson(
  topicName: string,
  gradeLevel: string,
  mainSubject: string,
  integratedSubjects: string[],
  durationPeriods: number,
  targetMaterialsType: string,
  digitalFocus: string
): StemLessonPlan {
  const duration = durationPeriods || 3;
  return {
    id: 'stem-' + Date.now(),
    topicName: topicName.toUpperCase(),
    gradeLevel: gradeLevel || 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: mainSubject || 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: integratedSubjects && integratedSubjects.length >= 3
      ? integratedSubjects
      : [mainSubject || 'Khoa học tự nhiên', 'Công nghệ', 'Toán học', 'Mĩ thuật', 'Tin học'],
    durationPeriods: duration,
    durationText: `${duration} tiết (${duration * 45} phút)`,
    overviewDescription: `Chủ đề STEM "${topicName}" được biên soạn theo đúng định hướng Chương trình GDPT 2018 và Công văn 5512/BGDĐT-GDTrH. Bài học tích hợp liên môn sâu sắc, phát huy tính tích cực, tư duy thiết kế kỹ thuật, rèn luyện kỹ năng giải quyết vấn đề thực tiễn và hình thành năng lực số cho học sinh.`,
    objectives: {
      knowledge: [
        `Vận dụng được các kiến thức trọng tâm của môn ${mainSubject} và các môn liên quan để giải thích nguyên lý hoạt động và tính khả thi của sản phẩm "${topicName}".`,
        'Phân tích được cấu tạo, chức năng của từng bộ phận trong thiết kế mô hình kỹ thuật.',
        'Đề xuất, thử nghiệm và lựa chọn được phương án thiết kế tối ưu dựa trên các tiêu chí kỹ thuật và điều kiện vật tư sẵn có.'
      ],
      generalCompetencies: {
        autonomyAndSelfLearning: 'Tự giác tìm hiểu kiến thức nền, chủ động phân công nhiệm vụ và quản lý thời gian thực hiện dự án hiệu quả.',
        communicationAndCollaboration: 'Tương tác nhóm tích cực, biết lắng nghe, chia sẻ ý tưởng và phối hợp nhịp nhàng trong quá trình chế tạo, thử nghiệm.',
        problemSolvingAndCreativity: 'Phát hiện các lỗi kỹ thuật phát sinh trong quá trình thử nghiệm và sáng tạo các giải pháp cải tiến tối ưu.'
      },
      stemCompetencies: {
        science: `Giải thích được các hiện tượng và quy luật khoa học tự nhiên liên quan đến ${topicName}.`,
        technology: 'Sử dụng thành thạo các dụng cụ gia công đơn giản, tuân thủ đúng quy trình công nghệ và đảm bảo an toàn lao động.',
        engineering: 'Vẽ được bản phác thảo thiết kế kỹ thuật chi tiết có kích thước, chế tạo và hoàn thiện mô hình thử nghiệm đạt các yêu cầu đề ra.',
        math: 'Tính toán kích thước, tỉ lệ, định lượng vật tư, chi phí sản xuất và phân tích số liệu thực nghiệm đo đạc.',
        art: 'Thiết kế kiểu dáng sản phẩm hài hòa, thẩm mỹ, sáng tạo và chuẩn bị bài thuyết trình trực quan, sinh động.'
      },
      digitalCompetence: digitalFocus || 'Sử dụng phần mềm mô phỏng và ứng dụng bảng tính số để ghi chép dữ liệu, thiết kế đồ họa sản phẩm.',
      qualities: {
        patriotism: 'Có ý thức bảo vệ môi trường sống và ứng dụng khoa học công nghệ phục vụ cộng đồng.',
        kindness: 'Tôn trọng ý kiến của bạn, sẵn sàng giúp đỡ các thành viên trong nhóm.',
        diligence: 'Kiên trì thử nghiệm, không nản lòng khi sản phẩm thử nghiệm ban đầu chưa đạt chuẩn.',
        honesty: 'Ghi nhận trung thực các số liệu đo đạc và kết quả thử nghiệm.',
        responsibility: 'Có trách nhiệm với nhiệm vụ được giao và giữ gìn vệ sinh lớp học.'
      }
    },
    equipment: {
      teacherEquipment: [
        'Máy chiếu, bài giảng điện tử (Canva/PowerPoint)',
        'Video/hình ảnh thực tế kích thích tình huống học tập',
        'Bộ dụng cụ mẫu minh họa hoặc vật mẫu tiêu chuẩn'
      ],
      studentMaterials: [
        { name: 'Vật liệu tái chế / Khung chịu lực', specification: 'Bìa carton, chai nhựa, thanh gỗ hoặc que tre', quantity: '1 bộ / nhóm', isRecyclable: true, note: 'Vật liệu dễ kiếm 0 đồng' },
        { name: 'Dụng cụ kết nối và cố định', specification: 'Băng dính, keo dán, dây buộc, kéo cắt', quantity: '1 bộ / nhóm', isRecyclable: false, note: 'Sử dụng cẩn thận' },
        { name: 'Dụng cụ đo lường và trang trí', specification: 'Thước kẻ, bút màu, giấy A4/A3', quantity: '1 bộ / nhóm', isRecyclable: false, note: 'Dùng chung nhóm' }
      ],
      digitalTools: [
        'Bảng tính Google Sheets/Excel để xử lý bảng đo lường',
        'Ứng dụng Canva thiết kế poster thuyết trình'
      ],
      safetyNotes: [
        'Cẩn trọng khi sử dụng kéo, dao rọc giấy và súng bắn keo nóng.',
        'Thu gom và phân loại rác thải tái chế gọn gàng sau giờ thực hành.'
      ]
    },
    teachingSteps: [
      {
        stepNumber: 1,
        stepName: 'BƯỚC 1: XÁC ĐỊNH VẤN ĐỀ (Khởi động & Giao nhiệm vụ)',
        timeEstimate: '15 phút',
        target: `Khơi gợi hứng thú, nhận diện vấn đề thực tiễn cần giải quyết và tiếp nhận tiêu chí sản phẩm "${topicName}".`,
        content: 'HS quan sát tình huống thực tế qua video/hình ảnh, thảo luận về thách thức đặt ra và tiếp nhận tiêu chí sản phẩm.',
        expectedProduct: 'Bản ghi nhận tiêu chí kỹ thuật cần đạt của sản phẩm và phân công nhóm.',
        implementation: {
          teacherActivities: [
            'GV trình chiếu video/hình ảnh nêu vấn đề thực tế cần giải quyết.',
            'GV đặt câu hỏi gợi mở: "Làm thế nào để thiết kế một sản phẩm hiệu quả, tiết kiệm từ vật liệu sẵn có?"',
            'GV giao phiếu học tập số 1 và công bố bảng tiêu chí đánh giá sản phẩm (Rubrics).'
          ],
          studentActivities: [
            'HS quan sát, thảo luận cặp đôi để xác định vấn đề trọng tâm.',
            'Đại diện nhóm phát biểu nhận định, thống nhất mục tiêu cần giải quyết.',
            'Ghi nhận các tiêu chí kỹ thuật bắt buộc vào phiếu học tập cá nhân.'
          ],
          transferMethod: 'Chiếu Slide kết hợp phát phiếu học tập và chia nhóm 4-6 học sinh.'
        }
      },
      {
        stepNumber: 2,
        stepName: 'BƯỚC 2: NGHIÊN CỨU KIẾN THỨC NỀN & ĐỀ XUẤT GIẢI PHÁP',
        timeEstimate: '30 phút',
        target: 'Học sinh tiếp thu/ôn tập kiến thức khoa học trọng tâm và đề xuất ý tưởng giải pháp.',
        content: 'Nghiên cứu tài liệu SGK, làm các thí nghiệm kiểm chứng và thảo luận phương án kỹ thuật khả thi.',
        expectedProduct: 'Nội dung trả lời câu hỏi trong Phiếu học tập số 1 và ý tưởng thiết kế ban đầu.',
        implementation: {
          teacherActivities: [
            'GV tổ chức cho các nhóm nghiên cứu mục kiến thức trọng tâm qua phiếu hướng dẫn.',
            'GV đặt các câu hỏi định hướng cấp độ tư duy (Phân tích, So sánh, Đánh giá).',
            'GV hỗ trợ các nhóm giải đáp thắc mắc về mặt nguyên lý khoa học.'
          ],
          studentActivities: [
            'HS làm việc nhóm, tra cứu SGK và tài liệu học tập để hoàn thành câu hỏi kiến thức nền.',
            'Thảo luận các phương án khả thi để ứng dụng nguyên lý vào mô hình.',
            'Thống nhất lựa chọn giải pháp khả thi nhất của nhóm.'
          ]
        }
      },
      {
        stepNumber: 3,
        stepName: 'BƯỚC 3: LẬP KẾ HOẠCH VÀ THIẾT KẾ BẢN VẼ KĨ THUẬT',
        timeEstimate: '25 phút',
        target: 'Vẽ được bản thiết kế chi tiết có kích thước, chú thích vật liệu và lập kế hoạch chế tạo.',
        content: 'Các nhóm phác thảo bản vẽ trên giấy A3 hoặc phần mềm đồ họa, giải thích nguyên lý và phân công chuẩn bị.',
        expectedProduct: 'Bản vẽ thiết kế kỹ thuật hoàn chỉnh kèm danh mục vật tư dự trù.',
        implementation: {
          teacherActivities: [
            'GV hướng dẫn quy chuẩn bản vẽ kỹ thuật cơ bản (kích thước, chú thích, tỉ lệ).',
            'GV đi quanh các nhóm góp ý, phản biện về tính khả thi của bản vẽ.',
            'GV duyệt bản thiết kế trước khi cho phép các nhóm tiến hành chế tạo.'
          ],
          studentActivities: [
            'HS cùng nhau phác thảo bản vẽ chi tiết của mô hình lên giấy A3.',
            'Ghi chú rõ kích thước, các điểm nối và vật liệu sử dụng cho từng chi tiết.',
            'Báo cáo nhanh bản vẽ với GV để nhận góp ý và phê duyệt.'
          ]
        }
      },
      {
        stepNumber: 4,
        stepName: 'BƯỚC 4: CHẾ TẠO, THỬ NGHIỆM VÀ ĐÁNH GIÁ SẢN PHẨM',
        timeEstimate: '35 phút',
        target: 'Gia công, lắp ráp hoàn chỉnh sản phẩm theo bản thiết kế và thử nghiệm đánh giá chất lượng.',
        content: 'Học sinh thực hành cắt ghép, lắp ráp, vận hành thử nghiệm, đo đạc thông số và ghi nhận lỗi để hiệu chỉnh.',
        expectedProduct: `Sản phẩm mẫu thử nghiệm "${topicName}" hoàn chỉnh và bảng dữ liệu thử nghiệm.`,
        implementation: {
          teacherActivities: [
            'GV nhắc nhở nội quy an toàn lao động và quản lý thời gian thi công.',
            'GV quan sát, kịp thời hỗ trợ các nhóm gặp khó khăn về kỹ thuật lắp ráp.',
            'Hướng dẫn HS cách đo đạc và ghi chép số liệu thử nghiệm chuẩn xác.'
          ],
          studentActivities: [
            'Các thành viên trong nhóm thực hiện phân công: cắt gọt, lắp ráp, gắn kết vật liệu.',
            'Tiến hành thử nghiệm vận hành sản phẩm và ghi nhận các thông số.',
            'Thảo luận nhanh để điều chỉnh, gia cố lại các vị trí chưa đạt yêu cầu.'
          ]
        }
      },
      {
        stepNumber: 5,
        stepName: 'BƯỚC 5: CHIA SẺ, THẢO LUẬN & ĐIỀU CHỈNH HOÀN THIỆN',
        timeEstimate: '25 phút',
        target: 'Báo cáo sản phẩm, phản biện khoa học, đánh giá theo Rubrics và rút ra bài học kinh nghiệm.',
        content: 'Trưng bày sản phẩm, thuyết trình quá trình chế tạo, kiểm tra vận hành trực tiếp và đánh giá đồng đẳng.',
        expectedProduct: 'Bài thuyết trình nhóm, phiếu đánh giá Rubrics hoàn chỉnh và định hướng cải tiến.',
        implementation: {
          teacherActivities: [
            'GV điều hành phiên báo cáo của các nhóm, tạo không khí học thuật cởi mở.',
            'GV đặt câu hỏi phản biện chuyên sâu và hướng dẫn các nhóm đánh giá chéo.',
            'GV nhận xét tổng kết, tuyên dương sự sáng tạo và chốt lại kiến thức cốt lõi.'
          ],
          studentActivities: [
            'Đại diện nhóm lên thuyết trình giới thiệu sản phẩm và trình diễn thử nghiệm.',
            'Lắng nghe câu hỏi phản biện từ GV và các nhóm bạn, tự tin trả lời giải thích.',
            'Chấm điểm đánh giá chéo cho nhóm bạn theo bảng tiêu chí Rubrics.'
          ]
        }
      }
    ],
    evaluationCriteria: {
      productCriteria: [
        {
          id: 'crit-p1',
          category: 'product',
          name: 'Tính năng và hiệu quả hoạt động',
          weightPercent: 40,
          levels: {
            level1: 'Sản phẩm chưa hoạt động ổn định hoặc chưa đáp ứng đủ yêu cầu kỹ thuật cơ bản.',
            level2: 'Sản phẩm hoạt động đúng chức năng, đáp ứng tốt các yêu cầu thử nghiệm.',
            level3: 'Sản phẩm vận hành hoàn hảo, vượt trội về độ bền, độ chính xác và tính tối ưu.'
          }
        },
        {
          id: 'crit-p2',
          category: 'product',
          name: 'Tính thẩm mỹ và sáng tạo trong thiết kế',
          weightPercent: 30,
          levels: {
            level1: 'Kết cấu còn sơ sài, mối nối chưa chắc chắn, kiểu dáng chưa bắt mắt.',
            level2: 'Kết cấu gọn gàng, chắc chắn, các chi tiết gắn kết cân đối và thẩm mỹ.',
            level3: 'Ý tưởng thiết kế độc đáo, sáng tạo cao, màu sắc hài hòa và hoàn thiện tinh tế.'
          }
        },
        {
          id: 'crit-p3',
          category: 'product',
          name: 'Sử dụng vật liệu và chi phí',
          weightPercent: 30,
          levels: {
            level1: 'Vật liệu chưa được tận dụng triệt để, có sự lãng phí khi chế tạo.',
            level2: 'Tận dụng tốt vật liệu tái chế, chi phí hợp lý và an toàn cho người dùng.',
            level3: '100% vật liệu thân thiện môi trường, chi phí tối thiểu (0 đồng), độ bền cao.'
          }
        }
      ],
      processCriteria: [
        {
          id: 'crit-pr1',
          category: 'process',
          name: 'Tinh thần hợp tác và phân công nhóm',
          levels: {
            level1: 'Phân công chưa rõ ràng, còn thành viên thụ động không tham gia.',
            level2: 'Các thành viên đều có nhiệm vụ rõ ràng và phối hợp hoàn thành tốt.',
            level3: 'Tương tác nhóm xuất sắc, chủ động hỗ trợ lẫn nhau và giải quyết mâu thuẫn tốt.'
          }
        },
        {
          id: 'crit-pr2',
          category: 'process',
          name: 'Quản lý thời gian và an toàn vệ sinh',
          levels: {
            level1: 'Chậm tiến độ hoặc chưa thu dọn rác thải gọn gàng.',
            level2: 'Hoàn thành đúng giờ, tuân thủ an toàn và vệ sinh khu vực làm việc.',
            level3: 'Hoàn thành trước thời hạn, quy trình làm việc khoa học và ngăn nắp tuyệt đối.'
          }
        }
      ],
      knowledgeCriteria: [
        {
          id: 'crit-k1',
          category: 'knowledge',
          name: 'Vận dụng kiến thức khoa học và giải thích nguyên lý',
          levels: {
            level1: 'Chưa giải thích rõ mối liên hệ giữa kiến thức bài học và sản phẩm.',
            level2: 'Giải thích đúng nguyên lý khoa học và trả lời được các câu hỏi của GV.',
            level3: 'Hiểu sâu sắc bản chất liên môn, lập luận thuyết phục và phản biện sắc bén.'
          }
        }
      ]
    },
    worksheets: [
      {
        title: 'PHIẾU HỌC TẬP SỐ 1: NGHIÊN CỨU KIẾN THỨC NỀN & Ý TƯỞNG',
        description: 'Dành cho nhóm học sinh thảo luận và chuẩn bị trước khi thiết kế',
        tasks: [
          `Nêu các kiến thức khoa học cần ứng dụng trong sản phẩm "${topicName}".`,
          'Liệt kê danh sách các vật tư, dụng cụ dự kiến sẽ sử dụng.',
          'Phân công nhiệm vụ cụ thể cho từng thành viên trong nhóm.'
        ],
        questions: [
          'Tại sao nhóm lại lựa chọn kết cấu và vật liệu này?',
          'Những yếu tố nào có thể ảnh hưởng đến độ bền và hiệu suất hoạt động của sản phẩm?'
        ]
      },
      {
        title: 'PHIẾU HỌC TẬP SỐ 2: BÁO CÁO KẾT QUẢ THỬ NGHIỆM & ĐÁNH GIÁ CHÉO',
        description: 'Dành cho ghi nhận số liệu trong buổi thử nghiệm và đánh giá đồng đẳng',
        tasks: [
          'Ghi chép thông số thử nghiệm lần 1, lần 2 và lần 3.',
          'Nêu các lỗi kỹ thuật phát sinh và giải pháp đã khắc phục.',
          'Chấm điểm đánh giá nhóm bạn theo bảng Rubrics đã ban hành.'
        ],
        questions: [
          'Nếu có thêm thời gian, nhóm sẽ cải tiến chi tiết nào của sản phẩm?'
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Generate full lesson
export async function generateStemLesson(input: GeneratePromptInput): Promise<StemLessonPlan> {
  const apiKey = getStoredApiKey();
  const preferredModel = getStoredModel();

  if (!apiKey) {
    console.warn('[Gemini Client] No API Key provided, generating curriculum fallback lesson.');
    return generateFallbackLesson(
      input.topicName,
      input.gradeLevel,
      input.mainSubject,
      input.integratedSubjects,
      input.durationPeriods,
      input.targetMaterialsType,
      input.digitalFocus
    );
  }

  const systemPrompt = `Bạn là một Chuyên gia Phát triển Chương trình Giáo dục Phổ thông 2018 (GDPT 2018) và là Chuyên gia Phương pháp dạy học STEM/STEAM hàng đầu tại Việt Nam. Nhiệm vụ của bạn là hỗ trợ giáo viên rà soát chương trình môn học, tích hợp liên môn và biên soạn Kế hoạch bài dạy (Giáo án) STEM hoàn chỉnh, chi tiết, sẵn sàng áp dụng vào thực tế giảng dạy theo Công văn 5512/BGDĐT-GDTrH.

NGUYÊN TẮC BẮT BUỘC:
1. TUYỆT ĐỐI KHÔNG dài dòng, không chào hỏi, không lặp lại yêu cầu của người dùng.
2. Bám sát Chương trình GDPT 2018 hiện hành đối với môn học và khối lớp được chỉ định.
3. Đảm bảo tích hợp liên môn tối thiểu từ 3 môn trở lên (trong số KHTN, Công nghệ, Tin học, Mĩ thuật, Toán học).
4. Phải theo đúng quy trình thiết kế kỹ thuật 5 BƯỚC chuẩn:
   - BƯỚC 1: XÁC ĐỊNH VẤN ĐỀ (Khởi động & Giao nhiệm vụ)
   - BƯỚC 2: NGHIÊN CỨU KIẾN THỨC NỀN & ĐỀ XUẤT GIẢI PHÁP
   - BƯỚC 3: LẬP KẾ HOẠCH VÀ THIẾT KẾ
   - BƯỚC 4: CHẾ TẠO, THỬ NGHIỆM VÀ ĐÁNH GIÁ
   - BƯỚC 5: CHIA SẺ, THẢO LUẬN & ĐIỀU CHỈNH
   Mỗi bước PHẢI có đầy đủ: a) Mục tiêu, b) Nội dung, c) Sản phẩm, d) Tổ chức thực hiện (Hoạt động của GV & Hoạt động của HS chi tiết).
5. Phải có 3 BIỂU TIÊU CHÍ ĐÁNH GIÁ (Rubrics):
   1> Biểu tiêu chí đánh giá sản phẩm (rõ ràng 3 mức độ 1: Cần cố gắng, 2: Đạt, 3: Tốt/Xuất sắc)
   2> Biểu tiêu chí đánh giá quá trình thực hiện
   3> Biểu tiêu chí đánh giá kiến thức vận dụng
6. Trả về định dạng JSON hợp lệ theo đúng cấu trúc yêu cầu.`;

  const userPrompt = `Hãy biên soạn KẾ HOẠCH BÀI DẠY STEM hoàn chỉnh với các thông số sau:
- Tên chủ đề: "${input.topicName}"
- Khối lớp: "${input.gradeLevel}"
- Môn học chủ đạo: "${input.mainSubject || 'Khoa học tự nhiên'}"
- Các môn tích hợp (tối thiểu 3 môn): ${JSON.stringify(input.integratedSubjects || ['Khoa học tự nhiên', 'Công nghệ', 'Toán học', 'Mĩ thuật', 'Tin học'])}
- Thời lượng: ${input.durationPeriods || 3} tiết (${(input.durationPeriods || 3) * 45} phút)
- Hướng vật liệu: ${input.targetMaterialsType || 'Vật liệu tái chế, chi phí thấp, dễ kiếm'}
- Yêu cầu bổ sung: ${input.customRequirements || 'Tối ưu cho thực tế trường học tại Việt Nam, chi tiết từng lời giảng và thao tác'}
- Trọng tâm năng lực số: ${input.digitalFocus || 'Tích hợp phần mềm mô phỏng hoặc ứng dụng đo đạc số'};

CẤU TRÚC JSON CẦN TRẢ VỀ (trả về đúng định dạng JSON thuần):
{
  "topicName": "Tên chủ đề in hoa",
  "gradeLevel": "${input.gradeLevel}",
  "schoolLevel": "lowerSecondary",
  "mainSubject": "${input.mainSubject}",
  "integratedSubjects": ["Môn 1", "Môn 2", "Môn 3", "Môn 4"],
  "durationPeriods": ${input.durationPeriods || 3},
  "durationText": "${input.durationPeriods || 3} tiết (${(input.durationPeriods || 3) * 45} phút)",
  "overviewDescription": "Mô tả tổng quan nội dung và ý nghĩa thực tiễn của chủ đề STEM",
  "objectives": {
    "knowledge": ["Yêu cầu cần đạt về kiến thức 1", "Yêu cầu 2", "Yêu cầu 3"],
    "generalCompetencies": {
      "autonomyAndSelfLearning": "Tự chủ và tự học...",
      "communicationAndCollaboration": "Giao tiếp và hợp tác...",
      "problemSolvingAndCreativity": "Giải quyết vấn đề và sáng tạo..."
    },
    "stemCompetencies": {
      "science": "Năng lực Khoa học (S)...",
      "technology": "Năng lực Công nghệ (T)...",
      "engineering": "Năng lực Kỹ thuật (E)...",
      "math": "Năng lực Toán học (M)...",
      "art": "Năng lực Mĩ thuật (A)..."
    },
    "digitalCompetence": "Năng lực số (Digital Competence) - công cụ/phần mềm phù hợp...",
    "qualities": {
      "patriotism": "Yêu nước...",
      "kindness": "Nhân ái...",
      "diligence": "Chăm chỉ...",
      "honesty": "Trung thực...",
      "responsibility": "Trách nhiệm..."
    }
  },
  "equipment": {
    "teacherEquipment": ["Thiết bị của GV 1", "Thiết bị 2"],
    "studentMaterials": [
      { "name": "Tên vật liệu", "specification": "Quy cách", "quantity": "Số lượng", "isRecyclable": true, "note": "Ghi chú" }
    ],
    "digitalTools": ["Phần mềm 1", "Phần mềm 2"],
    "safetyNotes": ["Lưu ý an toàn 1", "Lưu ý an toàn 2"]
  },
  "teachingSteps": [
    {
      "stepNumber": 1,
      "stepName": "BƯỚC 1: XÁC ĐỊNH VẤN ĐỀ (Khởi động & Giao nhiệm vụ)",
      "timeEstimate": "15 phút",
      "target": "Mục tiêu cụ thể",
      "content": "Nội dung hoạt động",
      "expectedProduct": "Sản phẩm của học sinh",
      "implementation": {
        "teacherActivities": ["Hoạt động GV 1", "Hoạt động GV 2"],
        "studentActivities": ["Hoạt động HS 1", "Hoạt động HS 2"],
        "transferMethod": "Cách thức giao nhiệm vụ"
      }
    },
    {
      "stepNumber": 2,
      "stepName": "BƯỚC 2: NGHIÊN CỨU KIẾN THỨC NỀN & ĐỀ XUẤT GIẢI PHÁP",
      "timeEstimate": "30 phút",
      "target": "Mục tiêu",
      "content": "Nội dung",
      "expectedProduct": "Sản phẩm",
      "implementation": {
        "teacherActivities": ["GV hướng dẫn nghiên cứu..."],
        "studentActivities": ["HS làm việc nhóm..."]
      }
    },
    {
      "stepNumber": 3,
      "stepName": "BƯỚC 3: LẬP KẾ HOẠCH VÀ THIẾT KẾ BẢN VẼ KĨ THUẬT",
      "timeEstimate": "25 phút",
      "target": "Mục tiêu",
      "content": "Nội dung",
      "expectedProduct": "Bản vẽ kĩ thuật...",
      "implementation": {
        "teacherActivities": ["GV kiểm duyệt bản vẽ..."],
        "studentActivities": ["HS vẽ bản phác thảo..."]
      }
    },
    {
      "stepNumber": 4,
      "stepName": "BƯỚC 4: CHẾ TẠO, THỬ NGHIỆM VÀ ĐÁNH GIÁ SẢN PHẨM",
      "timeEstimate": "35 phút",
      "target": "Mục tiêu",
      "content": "Nội dung",
      "expectedProduct": "Sản phẩm mẫu thử...",
      "implementation": {
        "teacherActivities": ["GV hướng dẫn chế tạo và quan sát..."],
        "studentActivities": ["HS lắp ráp, thử nghiệm, đo đạc..."]
      }
    },
    {
      "stepNumber": 5,
      "stepName": "BƯỚC 5: CHIA SẺ, THẢO LUẬN & ĐIỀU CHỈNH HOÀN THIỆN",
      "timeEstimate": "30 phút",
      "target": "Mục tiêu",
      "content": "Nội dung",
      "expectedProduct": "Bài thuyết trình, đánh giá chéo...",
      "implementation": {
        "teacherActivities": ["GV tổ chức báo cáo..."],
        "studentActivities": ["HS trưng bày, phản biện..."]
      }
    }
  ],
  "evaluationCriteria": {
    "productCriteria": [
      {
        "id": "crit-p1",
        "category": "product",
        "name": "Tên tiêu chí sản phẩm 1",
        "weightPercent": 40,
        "levels": {
          "level1": "Mức 1: Cần cố gắng",
          "level2": "Mức 2: Đạt",
          "level3": "Mức 3: Tốt/Xuất sắc"
        }
      }
    ],
    "processCriteria": [
      {
        "id": "crit-pr1",
        "category": "process",
        "name": "Tên tiêu chí quá trình",
        "levels": {
          "level1": "Mức 1",
          "level2": "Mức 2",
          "level3": "Mức 3"
        }
      }
    ],
    "knowledgeCriteria": [
      {
        "id": "crit-k1",
        "category": "knowledge",
        "name": "Tên tiêu chí kiến thức",
        "levels": {
          "level1": "Mức 1",
          "level2": "Mức 2",
          "level3": "Mức 3"
        }
      }
    ]
  },
  "worksheets": [
    {
      "title": "PHIẾU HỌC TẬP SỐ 1",
      "description": "Mô tả phiếu",
      "tasks": ["Nhiệm vụ 1", "Nhiệm vụ 2"],
      "questions": ["Câu hỏi 1", "Câu hỏi 2"]
    }
  ]
}`;

  try {
    const rawJson = await callGeminiWithFallback(apiKey, preferredModel, systemPrompt, userPrompt, 0.7);
    const cleanJson = rawJson.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.id = 'stem-' + Date.now();
    parsed.createdAt = new Date().toISOString();
    parsed.updatedAt = new Date().toISOString();
    return parsed as StemLessonPlan;
  } catch (err: any) {
    console.warn('[Gemini Client] AI generation failed, using curriculum fallback:', err?.message);
    if (err?.message?.includes('QUOTA_EXHAUSTED')) {
      throw err;
    }
    return generateFallbackLesson(
      input.topicName,
      input.gradeLevel,
      input.mainSubject,
      input.integratedSubjects,
      input.durationPeriods,
      input.targetMaterialsType,
      input.digitalFocus
    );
  }
}

// Refine lesson with custom prompt
export async function refineStemLesson(
  currentLesson: StemLessonPlan,
  instruction: string,
  actionType: string = 'custom'
): Promise<StemLessonPlan> {
  const apiKey = getStoredApiKey();
  const preferredModel = getStoredModel();

  if (!apiKey) {
    throw new Error('Vui lòng cài đặt API Key trong mục Settings trước khi sử dụng tính năng AI tinh chỉnh.');
  }

  const systemPrompt = `Bạn là Chuyên gia Phương pháp dạy học STEM GDPT 2018. Bạn nhận vào một Kế hoạch bài dạy STEM dạng JSON và yêu cầu điều chỉnh. Hãy điều chỉnh, nâng cấp hoặc bổ sung chính xác theo yêu cầu của giáo viên mà vẫn bảo toàn cấu trúc JSON chuẩn của Kế hoạch bài dạy.`;

  const userPrompt = `Giáo án hiện tại:
${JSON.stringify(currentLesson, null, 2)}

Yêu cầu điều chỉnh (${actionType}):
"${instruction}"

Hãy trả về phiên bản giáo án JSON mới nhất đã được chỉnh sửa hoàn chỉnh theo yêu cầu trên.`;

  const rawJson = await callGeminiWithFallback(apiKey, preferredModel, systemPrompt, userPrompt, 0.7);
  const cleanJson = rawJson.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);
  parsed.updatedAt = new Date().toISOString();
  return parsed as StemLessonPlan;
}
