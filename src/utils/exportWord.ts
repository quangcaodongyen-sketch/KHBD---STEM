import { StemLessonPlan } from '../types';

export function exportLessonToWord(lesson: StemLessonPlan) {
  const sanitize = (text: string | undefined) => (text ? text.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '');

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const realDateText = `Đồng Yên, ngày ${day} tháng ${month} năm ${year}`;

  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns:v='urn:schemas-microsoft-com:vml' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>KẾ HOẠCH BÀI DẠY STEM - ${sanitize(lesson.topicName)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
      <w:Compatibility>
        <w:BreakWrappedTables/>
        <w:SnapToGridInCell/>
        <w:WrapTextWithPunct/>
        <w:UseAsianBreakRules/>
        <w:DontGrowAutofit/>
      </w:Compatibility>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    /* CHUẨN THỂ THỨC VĂN BẢN THEO NGHỊ ĐỊNH 30/2020/NĐ-CP & CV 5512/BGDĐT:
       - Khổ giấy: A4 (210mm x 297mm)
       - Căn lề: Trên 2.0cm, Dưới 2.0cm, Trái 2.5cm, Phải 1.5cm
       - Phông chữ: Times New Roman, Cỡ chữ mặc định: 13.0pt
       - Dãn dòng: Dòng đơn (Single line spacing / 1.15), Dãn đoạn Before 2.5pt, After 2.5pt
       - Thụt đầu dòng: 1.27cm, Căn lề đều 2 bên (Justified)
    */
    @page Section1 {
      size: 595.3pt 841.9pt; /* A4 chuẩn */
      margin: 56.7pt 42.5pt 56.7pt 70.9pt; /* Trên 2.0cm, Phải 1.5cm, Dưới 2.0cm, Trái 2.5cm */
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    
    div.Section1 {
      page: Section1;
    }

    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
      color: #000000;
    }

    p.MsoNormal, li.MsoNormal, div.MsoNormal, p.doc-p, p {
      margin-top: 2.5pt;
      margin-bottom: 2.5pt;
      margin-left: 0cm;
      margin-right: 0cm;
      text-align: justify;
      text-justify: inter-ideograph;
      text-indent: 1.27cm;
      line-height: 1.15;
      mso-line-height-rule: at-least;
      font-size: 13.0pt;
      font-family: 'Times New Roman', Times, serif;
      color: #000000;
    }

    .header-table {
      width: 100%;
      border-collapse: collapse;
      border: none !important;
      margin-top: 0pt !important;
      margin-bottom: 4.0pt !important;
      mso-para-margin-top: 0pt !important;
      mso-para-margin-bottom: 0pt !important;
    }
    .header-table td {
      border: none !important;
      vertical-align: top;
      text-indent: 0 !important;
      line-height: 1.0 !important;
      mso-line-height-rule: exactly;
      mso-para-margin-top: 0pt !important;
      mso-para-margin-bottom: 0pt !important;
      white-space: nowrap;
      padding: 0pt 2.0pt;
    }
    .header-table p, .header-table div {
      text-indent: 0 !important;
      margin-top: 0pt !important;
      margin-bottom: 0pt !important;
      mso-para-margin-top: 0pt !important;
      mso-para-margin-bottom: 0pt !important;
      line-height: 14.0pt !important;
      mso-line-height-rule: exactly;
      white-space: nowrap;
    }

    .line-decor-center {
      border-bottom: 1.5pt solid #000000;
      width: 60%;
      margin: 2.0pt auto 0 auto;
      height: 1px;
    }

    .line-decor-left {
      border-bottom: 1.0pt solid #000000;
      width: 45%;
      margin: 2.0pt auto 0 auto;
      height: 1px;
    }

    h1.doc-title {
      font-family: 'Times New Roman', Times, serif;
      font-size: 14.0pt;
      font-weight: bold;
      text-align: center;
      text-indent: 0 !important;
      text-transform: uppercase;
      margin-top: 10.0pt;
      margin-bottom: 3.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
    }

    h2.doc-subtitle {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13.0pt;
      font-weight: bold;
      text-align: center;
      text-indent: 0 !important;
      text-transform: uppercase;
      color: #000000;
      margin-top: 0pt;
      margin-bottom: 3.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
    }

    p.doc-reference {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12.0pt;
      font-style: italic;
      text-align: center;
      text-indent: 0 !important;
      margin-top: 0pt;
      margin-bottom: 10.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
    }

    .info-table {
      width: 100%;
      border: none !important;
      margin-bottom: 8.0pt;
    }
    .info-table td {
      border: none !important;
      padding: 1.5pt 0;
      vertical-align: top;
      text-indent: 0 !important;
      font-size: 13.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
    }
    .info-table p {
      text-indent: 0 !important;
      margin-top: 1.5pt !important;
      margin-bottom: 1.5pt !important;
    }

    h2.section-header {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13.0pt;
      font-weight: bold;
      text-transform: uppercase;
      text-indent: 0 !important;
      margin-top: 10.0pt;
      margin-bottom: 4.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
      color: #000000;
    }

    h3.subsection-header {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13.0pt;
      font-weight: bold;
      text-indent: 0 !important;
      margin-top: 6.0pt;
      margin-bottom: 3.0pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
      color: #000000;
    }

    p.sub-item-label {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13.0pt;
      font-weight: bold;
      text-indent: 1.27cm;
      margin-top: 4.0pt;
      margin-bottom: 2.5pt;
      line-height: 1.15;
      mso-line-height-rule: at-least;
    }

    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 5.0pt;
      margin-bottom: 8.0pt;
      border: 0.75pt solid #000000;
      mso-border-alt: solid #000000 .5pt;
    }

    table.data-table th {
      border: 0.75pt solid #000000;
      background-color: #f2f2f2;
      font-family: 'Times New Roman', Times, serif;
      font-size: 12.5pt;
      font-weight: bold;
      text-align: center;
      text-indent: 0 !important;
      padding: 4.0pt 4.0pt;
      vertical-align: middle;
      line-height: 1.15;
      mso-line-height-rule: at-least;
    }

    table.data-table td {
      border: 0.75pt solid #000000;
      font-family: 'Times New Roman', Times, serif;
      font-size: 12.5pt;
      padding: 4.0pt 4.0pt;
      vertical-align: top;
      line-height: 1.15;
      mso-line-height-rule: at-least;
      text-indent: 0 !important;
    }
    table.data-table td p {
      text-indent: 0 !important;
      margin-top: 1.5pt !important;
      margin-bottom: 1.5pt !important;
      line-height: 1.15 !important;
    }
    table.data-table ul {
      margin-top: 1.5pt;
      margin-bottom: 1.5pt;
      padding-left: 14.0pt;
    }
    table.data-table li {
      text-indent: 0 !important;
      margin-bottom: 1.5pt;
      line-height: 1.15;
    }

    /* KHỐI CHỮ KÝ PHÊ DUYỆT CHUẨN ĐỒNG HÀNG */
    .signature-table {
      width: 100%;
      border-collapse: collapse;
      border: none !important;
      margin-top: 16.0pt;
      page-break-inside: avoid;
    }
    .signature-table td {
      border: none !important;
      text-align: center;
      vertical-align: top;
      padding: 0pt 4.0pt;
      text-indent: 0 !important;
      line-height: 1.15 !important;
      mso-line-height-rule: at-least;
    }
    .signature-table p, .signature-table div {
      text-indent: 0 !important;
      margin-top: 0pt !important;
      margin-bottom: 2.0pt !important;
      line-height: 1.15 !important;
      mso-line-height-rule: at-least;
    }

    ul, ol {
      margin-top: 2.5pt;
      margin-bottom: 4.0pt;
      padding-left: 28.0pt;
    }

    li {
      margin-top: 2.0pt;
      margin-bottom: 2.0pt;
      text-align: justify;
      text-justify: inter-ideograph;
      line-height: 1.15;
      mso-line-height-rule: at-least;
      font-size: 13.0pt;
      text-indent: 0;
    }

    .text-center { text-align: center; text-indent: 0 !important; }
    .text-justify { text-align: justify; text-justify: inter-ideograph; }
    .text-bold { font-weight: bold; }
    .text-italic { font-style: italic; }
  </style>
</head>
<body>
<div class="Section1">

  <!-- TIÊU ĐỀ ĐƠN VỊ & QUỐC HIỆU CHUẨN NGHỊ ĐỊNH 30/2020/NĐ-CP (SPACING = 0) -->
  <table class="header-table" style="width: 100%; border-collapse: collapse; margin-top: 0pt; margin-bottom: 4pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">
    <tr>
      <td style="width: 38%; text-align: center; vertical-align: top; padding: 0 4pt 0 0; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">
        <div style="font-size: 12.0pt; font-weight: bold; text-transform: uppercase; white-space: nowrap; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">TRƯỜNG THCS ĐỒNG YÊN</div>
        <div style="font-size: 12.0pt; font-weight: bold; text-transform: uppercase; margin-top: 1pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; white-space: nowrap;">TỔ KHOA HỌC TỰ NHIÊN</div>
        <div class="line-decor-left"></div>
        <div style="font-size: 12.0pt; font-style: italic; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; white-space: nowrap;">Giáo viên: Nông Thị Nậm</div>
      </td>
      <td style="width: 62%; text-align: center; vertical-align: top; padding: 0 0 0 4pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">
        <div style="font-size: 12.0pt; font-weight: bold; text-transform: uppercase; white-space: nowrap; word-break: keep-all; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div style="font-size: 13.0pt; font-weight: bold; margin-top: 1pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; white-space: nowrap;">Độc lập - Tự do - Hạnh phúc</div>
        <div class="line-decor-center"></div>
      </td>
    </tr>
  </table>

  <!-- TÊN LOẠI VĂN BẢN VÀ TRÍCH YẾU -->
  <h1 class="doc-title">KẾ HOẠCH BÀI DẠY STEM</h1>
  <h2 class="doc-subtitle">BÀI DẠY: ${sanitize(lesson.topicName)}</h2>
  <p class="doc-reference">
    (Theo định hướng Chương trình GDPT 2018 & Công văn số 5512/BGDĐT-GDTrH ngày 18/12/2020 của Bộ GD&ĐT)
  </p>

  <!-- THÔNG TIN CHUNG VỀ BÀI HỌC -->
  <table style="width: 100%; border: none !important; margin-bottom: 8pt;">
    <tr>
      <td style="border: none !important; width: 50%; padding: 1pt 0; vertical-align: top;">
        <span style="font-size: 13pt;"><strong>Môn học chủ đạo:</strong> ${sanitize(lesson.mainSubject)}</span>
      </td>
      <td style="border: none !important; width: 50%; padding: 1pt 0; vertical-align: top;">
        <span style="font-size: 13pt;"><strong>Đối tượng (Khối lớp):</strong> ${sanitize(lesson.gradeLevel)}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="border: none !important; padding: 1pt 0; vertical-align: top;">
        <span style="font-size: 13pt;"><strong>Các môn tích hợp liên môn:</strong> ${lesson.integratedSubjects.map(s => sanitize(s)).join(', ')}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="border: none !important; padding: 1pt 0; vertical-align: top;">
        <span style="font-size: 13pt;"><strong>Thời lượng dự kiến:</strong> ${sanitize(lesson.durationText || `${lesson.durationPeriods} tiết (${lesson.durationPeriods * 45} phút)`)}</span>
      </td>
    </tr>
    ${lesson.overviewDescription ? `
    <tr>
      <td colspan="2" style="border: none !important; padding: 2pt 0; vertical-align: top;">
        <span style="font-size: 13pt; font-style: italic;"><strong>Ý tưởng sư phạm & Ý nghĩa thực tiễn:</strong> ${sanitize(lesson.overviewDescription)}</span>
      </td>
    </tr>` : ''}
  </table>

  <!-- I. MỤC TIÊU BÀI HỌC -->
  <h2 class="section-header">I. MỤC TIÊU CỦA BÀI HỌC</h2>

  <h3 class="subsection-header">1. Về kiến thức</h3>
  <ul>
    ${lesson.objectives.knowledge.map(k => `<li>${sanitize(k)}</li>`).join('')}
  </ul>

  <h3 class="subsection-header">2. Về năng lực</h3>
  
  <p class="sub-item-label">a) Năng lực chung:</p>
  <ul>
    <li><strong>Tự chủ và tự học:</strong> ${sanitize(lesson.objectives.generalCompetencies.autonomyAndSelfLearning)}</li>
    <li><strong>Giao tiếp và hợp tác:</strong> ${sanitize(lesson.objectives.generalCompetencies.communicationAndCollaboration)}</li>
    <li><strong>Giải quyết vấn đề và sáng tạo:</strong> ${sanitize(lesson.objectives.generalCompetencies.problemSolvingAndCreativity)}</li>
  </ul>

  <p class="sub-item-label">b) Năng lực STEM:</p>
  <ul>
    <li><strong>Khoa học (S):</strong> ${sanitize(lesson.objectives.stemCompetencies.science)}</li>
    <li><strong>Công nghệ (T):</strong> ${sanitize(lesson.objectives.stemCompetencies.technology)}</li>
    <li><strong>Kĩ thuật (E):</strong> ${sanitize(lesson.objectives.stemCompetencies.engineering)}</li>
    <li><strong>Toán học (M):</strong> ${sanitize(lesson.objectives.stemCompetencies.math)}</li>
    ${lesson.objectives.stemCompetencies.art ? `<li><strong>Mĩ thuật & Nghệ thuật (A):</strong> ${sanitize(lesson.objectives.stemCompetencies.art)}</li>` : ''}
  </ul>

  ${lesson.objectives.digitalCompetence ? `
  <p class="sub-item-label">c) Năng lực số:</p>
  <p class="doc-p">${sanitize(lesson.objectives.digitalCompetence)}</p>
  ` : ''}

  <h3 class="subsection-header">3. Về phẩm chất</h3>
  <ul>
    ${lesson.objectives.qualities.patriotism ? `<li><strong>Yêu nước:</strong> ${sanitize(lesson.objectives.qualities.patriotism)}</li>` : ''}
    ${lesson.objectives.qualities.kindness ? `<li><strong>Nhân ái:</strong> ${sanitize(lesson.objectives.qualities.kindness)}</li>` : ''}
    <li><strong>Chăm chỉ:</strong> ${sanitize(lesson.objectives.qualities.diligence)}</li>
    <li><strong>Trung thực:</strong> ${sanitize(lesson.objectives.qualities.honesty)}</li>
    <li><strong>Trách nhiệm:</strong> ${sanitize(lesson.objectives.qualities.responsibility)}</li>
  </ul>

  <!-- II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU -->
  <h2 class="section-header">II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h2>

  <h3 class="subsection-header">1. Thiết bị của Giáo viên</h3>
  <ul>
    ${lesson.equipment.teacherEquipment.map(eq => `<li>${sanitize(eq)}</li>`).join('')}
  </ul>

  <h3 class="subsection-header">2. Thiết bị và Học liệu của Học sinh (theo từng nhóm)</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 8%;">STT</th>
        <th style="width: 44%;">Tên thiết bị / Vật liệu</th>
        <th style="width: 28%;">Quy cách / Đặc điểm</th>
        <th style="width: 20%;">Số lượng / Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      ${lesson.equipment.studentMaterials.map((mat, idx) => `
        <tr>
          <td class="text-center">${idx + 1}</td>
          <td><strong>${sanitize(mat.name)}</strong></td>
          <td>${sanitize(mat.specification || 'Vật tư thông dụng')}</td>
          <td class="text-center">${sanitize(mat.quantity)} ${mat.isRecyclable ? '<br/><span style="color:#047857; font-size:11pt; font-style:italic;">(Vật liệu tái chế)</span>' : ''}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  ${lesson.equipment.digitalTools && lesson.equipment.digitalTools.length > 0 ? `
  <p class="doc-p"><strong>Công cụ số & Học liệu điện tử:</strong> ${lesson.equipment.digitalTools.map(dt => sanitize(dt)).join('; ')}</p>
  ` : ''}

  ${lesson.equipment.safetyNotes && lesson.equipment.safetyNotes.length > 0 ? `
  <p class="doc-p" style="color: #b91c1c;"><strong>Lưu ý an toàn thực hành:</strong> ${lesson.equipment.safetyNotes.map(sn => sanitize(sn)).join(' ')}</p>
  ` : ''}

  <!-- III. TIẾN TRÌNH DẠY HỌC (QUY TRÌNH THIẾT KẾ KĨ THUẬT) -->
  <h2 class="section-header">III. TIẾN TRÌNH DẠY HỌC (QUY TRÌNH THIẾT KẾ KĨ THUẬT)</h2>

  ${lesson.teachingSteps.map(step => `
    <div style="margin-top: 8pt; margin-bottom: 8pt; page-break-inside: avoid;">
      <h3 class="subsection-header" style="color: #000000;">
        ${sanitize(step.stepName)} ${step.timeEstimate ? `<span style="font-weight: normal; font-style: italic;">(${sanitize(step.timeEstimate)})</span>` : ''}
      </h3>
      
      <p class="doc-p"><strong>a) Mục tiêu:</strong> ${sanitize(step.target)}</p>
      <p class="doc-p"><strong>b) Nội dung:</strong> ${sanitize(step.content)}</p>
      <p class="doc-p"><strong>c) Sản phẩm dự kiến:</strong> ${sanitize(step.expectedProduct)}</p>
      <p class="doc-p"><strong>d) Tổ chức thực hiện:</strong></p>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 50%;">HOẠT ĐỘNG CỦA GIÁO VIÊN</th>
            <th style="width: 50%;">HOẠT ĐỘNG CỦA HỌC SINH</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                ${step.implementation.teacherActivities.map(act => `<li>${sanitize(act)}</li>`).join('')}
              </ul>
            </td>
            <td>
              <ul>
                ${step.implementation.studentActivities.map(act => `<li>${sanitize(act)}</li>`).join('')}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `).join('')}

  <!-- IV. BIỂU TIÊU CHÍ ĐÁNH GIÁ (RUBRICS) -->
  <h2 class="section-header">IV. BIỂU TIÊU CHÍ ĐÁNH GIÁ (RUBRICS)</h2>

  <h3 class="subsection-header">1. Đánh giá sản phẩm STEM (Tiêu chí chính)</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Tiêu chí</th>
        <th style="width: 25%;">Mức 1 (Chưa đạt / Cần cố gắng)</th>
        <th style="width: 25%;">Mức 2 (Đạt / Khá)</th>
        <th style="width: 25%;">Mức 3 (Tốt / Xuất sắc)</th>
      </tr>
    </thead>
    <tbody>
      ${lesson.evaluationCriteria.productCriteria.map(crit => `
        <tr>
          <td>
            <strong>${sanitize(crit.name)}</strong>
            ${crit.weightPercent ? `<br/><span style="font-style:italic; font-size:11pt;">(Trọng số: ${crit.weightPercent}%)</span>` : ''}
          </td>
          <td>${sanitize(crit.levels.level1)}</td>
          <td>${sanitize(crit.levels.level2)}</td>
          <td>${sanitize(crit.levels.level3)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  ${lesson.evaluationCriteria.processCriteria && lesson.evaluationCriteria.processCriteria.length > 0 ? `
  <h3 class="subsection-header">2. Đánh giá quá trình làm việc nhóm & Kỹ năng thực hành</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Tiêu chí quá trình</th>
        <th style="width: 25%;">Mức 1</th>
        <th style="width: 25%;">Mức 2</th>
        <th style="width: 25%;">Mức 3</th>
      </tr>
    </thead>
    <tbody>
      ${lesson.evaluationCriteria.processCriteria.map(crit => `
        <tr>
          <td><strong>${sanitize(crit.name)}</strong></td>
          <td>${sanitize(crit.levels.level1)}</td>
          <td>${sanitize(crit.levels.level2)}</td>
          <td>${sanitize(crit.levels.level3)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  ${lesson.evaluationCriteria.knowledgeCriteria && lesson.evaluationCriteria.knowledgeCriteria.length > 0 ? `
  <h3 class="subsection-header">3. Đánh giá kiến thức liên môn & Báo cáo thuyết trình</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Tiêu chí kiến thức / Báo cáo</th>
        <th style="width: 25%;">Mức 1</th>
        <th style="width: 25%;">Mức 2</th>
        <th style="width: 25%;">Mức 3</th>
      </tr>
    </thead>
    <tbody>
      ${lesson.evaluationCriteria.knowledgeCriteria.map(crit => `
        <tr>
          <td><strong>${sanitize(crit.name)}</strong></td>
          <td>${sanitize(crit.levels.level1)}</td>
          <td>${sanitize(crit.levels.level2)}</td>
          <td>${sanitize(crit.levels.level3)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  <!-- V. PHỤ LỤC PHIẾU HỌC TẬP -->
  ${lesson.worksheets && lesson.worksheets.length > 0 ? `
  <h2 class="section-header">V. PHỤ LỤC: CÁC PHIẾU HỌC TẬP</h2>
  ${lesson.worksheets.map(ws => `
    <h3 class="subsection-header">${sanitize(ws.title)}</h3>
    ${ws.description ? `<p class="doc-p" style="font-style: italic;">${sanitize(ws.description)}</p>` : ''}
    <p class="doc-p"><strong>Nhiệm vụ của học sinh:</strong></p>
    <ul>
      ${ws.tasks.map(t => `<li>${sanitize(t)}</li>`).join('')}
    </ul>
    <p class="doc-p"><strong>Câu hỏi định hướng:</strong></p>
    <ul>
      ${ws.questions.map(q => `<li>${sanitize(q)}</li>`).join('')}
    </ul>
  `).join('')}
  ` : ''}

  <!-- KHỐI CHỮ KÝ PHÊ DUYỆT CHUẨN NGHỊ ĐỊNH 30/2020/NĐ-CP (ĐỒNG HÀNG & RỘNG RÃI ĐỦ ĐỂ KÝ) -->
  <table class="signature-table" style="width: 100%; border-collapse: collapse; margin-top: 24pt; margin-bottom: 0pt; page-break-inside: avoid; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">
    <tr>
      <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">
        <div style="font-size: 13.0pt; line-height: 1.25; margin: 0; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">&nbsp;</div>
        <div style="font-size: 13.0pt; font-weight: bold; text-transform: uppercase; margin-top: 4pt; margin-bottom: 2pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">TỔ TRƯỞNG CHUYÊN MÔN</div>
        <div style="font-size: 12.0pt; font-style: italic; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">(Ký và ghi rõ họ tên)</div>
        <div style="height: 85pt; line-height: 85pt; mso-line-height-rule: exactly;">&nbsp;</div>
        <div style="font-size: 13.0pt; font-weight: bold; color: #000000; margin: 0; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">Mai Văn Hùng</div>
      </td>
      <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">
        <div style="font-size: 13.0pt; font-style: italic; line-height: 1.25; margin: 0; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">${realDateText}</div>
        <div style="font-size: 13.0pt; font-weight: bold; text-transform: uppercase; margin-top: 4pt; margin-bottom: 2pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">GIÁO VIÊN SOẠN BÀI</div>
        <div style="font-size: 12.0pt; font-style: italic; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">(Ký và ghi rõ họ tên)</div>
        <div style="height: 85pt; line-height: 85pt; mso-line-height-rule: exactly;">&nbsp;</div>
        <div style="font-size: 13.0pt; font-weight: bold; color: #000000; margin: 0; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">Nông Thị Nậm</div>
      </td>
    </tr>
  </table>

</div>
</body>
</html>
  `;

  // Create Blob with proper MIME type for MS Word (.doc format HTML)
  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `KHBD_STEM_${lesson.gradeLevel.replace(/\s+/g, '_')}_${lesson.topicName.slice(0, 30).replace(/\s+/g, '_')}.doc`;
  
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
