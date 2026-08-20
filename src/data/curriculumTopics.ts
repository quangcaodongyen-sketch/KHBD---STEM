export interface TopicSuggestion {
  id: string;
  name: string;
  grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9';
  schoolLevel: 'lowerSecondary';
  mainSubject: string;
  integratedSubjects: string[];
  duration: number;
  highlight: string;
  materialsType: 'recycled_lowcost' | 'standard_lab' | 'sensor_iot_tech';
}

export const STEM_TOPIC_SUGGESTIONS: TopicSuggestion[] = [
  // ==========================================
  // KHỐI 6 (THCS)
  // ==========================================
  {
    id: 't-6-khtn-1',
    name: 'Chế tạo chất chỉ thị màu tự nhiên từ bắp cải tím và hoa dâm bụt đo độ pH',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Mĩ thuật', 'Toán học', 'Tin học'],
    duration: 2,
    highlight: 'Nhận biết axit - bazơ trong thực phẩm (chanh, giấm, xà phòng), tạo dải thang đo màu pH chuẩn',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-6-khtn-2',
    name: 'Thiết kế mô hình tế bào thực vật và động vật 3D từ đất nặn và phế liệu',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Mĩ thuật', 'Toán học', 'Công nghệ'],
    duration: 2,
    highlight: 'Cấu tạo màng sinh chất, nhân tế bào, lục lạp, ti thể; tỉ lệ không gian hình học 3D',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-6-khtn-3',
    name: 'Chế tạo lực kế lò xo tự chế đo trọng lượng vật',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Độ biến dạng của lò xo tỉ lệ thuận với lực tác dụng, khắc vạch chia độ chính xác (Newton)',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-6-khtn-4',
    name: 'Làm chậu cây tự hút nước thông minh (Sub-irrigated planter) từ chai nhựa tái chế',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Hiện tượng mao dẫn của sợi bấc bông, cung cấp nước liên tục cho cây xanh lớp học',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-6-math-1',
    name: 'Thiết kế thước cuộn và compa khổng lồ đo chu vi, diện tích sân trường',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Toán học',
    integratedSubjects: ['Toán học', 'Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Ứng dụng hình học phẳng, đo đạc thực tế, tỉ lệ xích và sai số đo đạc',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-6-tech-1',
    name: 'Thiết kế ngôi nhà xanh thông minh tiết kiệm năng lượng và thoáng mát',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Công nghệ',
    integratedSubjects: ['Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Mĩ thuật'],
    duration: 3,
    highlight: 'Nguyên lý cách nhiệt, thông gió tự nhiên, mô hình nhà ở thông minh',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-6-it-1',
    name: 'Thiết kế thiệp điện tử tương tác và sơ đồ tư duy phân loại sinh vật bằng Scratch',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Tin học',
    integratedSubjects: ['Tin học', 'Khoa học tự nhiên (KHTN)', 'Mĩ thuật', 'Toán học'],
    duration: 2,
    highlight: 'Lập trình kéo thả Scratch, khóa lưỡng phân sinh học, xử lý tương tác người dùng',
    materialsType: 'sensor_iot_tech'
  },
  {
    id: 't-6-art-1',
    name: 'Sáng tạo tranh phù điêu chất liệu tự nhiên mô phỏng hệ sinh thái rừng',
    grade: 'Lớp 6',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Mĩ thuật',
    integratedSubjects: ['Mĩ thuật', 'Khoa học tự nhiên (KHTN)', 'Địa lí', 'Toán học'],
    duration: 2,
    highlight: 'Tạo hình từ lá cây khô, hạt ngũ cốc, vỏ sò; tỉ lệ bố cục cảnh quan sinh thái',
    materialsType: 'recycled_lowcost'
  },

  // ==========================================
  // KHỐI 7 (THCS)
  // ==========================================
  {
    id: 't-7-khtn-1',
    name: 'Chế tạo xe thế năng chạy tự động vượt chướng ngại vật',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ', 'Mĩ thuật'],
    duration: 3,
    highlight: 'Chuyển hóa thế năng hấp dẫn thành động năng, giảm ma sát ổ trục xe chuyển động xa nhất',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-khtn-2',
    name: 'Chế tạo kính tiềm vọng (Periscope) quan sát góc khuất tàu ngầm',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học (Góc 45 độ)', 'Công nghệ', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Định luật phản xạ ánh sáng trên gương phẳng đặt nghiêng 45 độ song song',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-khtn-3',
    name: 'Thiết kế dụng cụ bẫy côn trùng và sâu hại nông nghiệp dùng năng lượng mặt trời',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Tập tính hướng sáng của côn trùng, mạch pin mặt trời tự nạp thắp sáng bẫy đêm',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-khtn-4',
    name: 'Chế tạo đàn organ nước (Water Xylophone) khảo sát tần số và độ cao của âm',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Âm nhạc', 'Toán học', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Tần số dao động của cột nước, độ cao trầm bổng của âm thanh theo nốt nhạc Đô-Rê-Mi',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-khtn-5',
    name: 'Chế tạo mô hình nhà kính mini khảo sát quang hợp và thoát hơi nước',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Hiệu ứng nhà kính giữ nhiệt và độ ẩm, tăng cường độ quang hợp cho cây mầm',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-math-1',
    name: 'Thiết kế và chế tạo giác kế đo góc nghiêng xác định chiều cao cột cờ trường',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Toán học',
    integratedSubjects: ['Toán học', 'Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Tam giác bằng nhau, tam giác vuông, tỉ số lượng giác góc nhọn và đo đạc thực địa',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-tech-1',
    name: 'Thiết kế hệ thống ươm cây con bằng xơ dừa và phân hữu cơ vi sinh',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Công nghệ',
    integratedSubjects: ['Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Giáo dục địa phương'],
    duration: 3,
    highlight: 'Kỹ thuật ươm mầm, tỷ lệ phối trộn giá thể hữu cơ, điều chỉnh độ ẩm và ánh sáng',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-7-it-1',
    name: 'Xây dựng trang tính Excel theo dõi và biểu diễn biểu đồ tốc độ tăng trưởng cây mầm',
    grade: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Tin học',
    integratedSubjects: ['Tin học', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ'],
    duration: 2,
    highlight: 'Nhập công thức trung bình, hàm thống kê, vẽ biểu đồ đường biểu diễn tốc độ sinh trưởng',
    materialsType: 'standard_lab'
  },

  // ==========================================
  // KHỐI 8 (THCS)
  // ==========================================
  {
    id: 't-8-khtn-1',
    name: 'Thiết kế và chế tạo bình lọc nước mini nhiều tầng từ cát, sỏi, than hoạt tính',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Mĩ thuật', 'Tin học'],
    duration: 3,
    highlight: 'Lọc thô cơ học, hấp phụ khử mùi độc tố than hoạt tính, kiểm tra độ trong và lưu lượng nước',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-8-khtn-2',
    name: 'Chế tạo mô hình cánh tay robot thủy lực nâng vật bằng xi-lanh',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ', 'Mĩ thuật'],
    duration: 3,
    highlight: 'Nguyên lý truyền áp suất chất lỏng Pascal, cơ cấu khớp đòn bẩy gắp và chuyển vật thể',
    materialsType: 'standard_lab'
  },
  {
    id: 't-8-khtn-3',
    name: 'Thiết kế mạch đèn ngủ thông minh tự động bật khi trời tối với quang trở LDR',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Cảm biến quang trở LDR, transistor đóng ngắt tự động, tiết kiệm điện năng sinh hoạt',
    materialsType: 'sensor_iot_tech'
  },
  {
    id: 't-8-khtn-4',
    name: 'Chế tạo tên lửa nước 2 tầng có cánh dẫn hướng và dù hạ cánh an toàn',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học (Góc phóng Parabol)', 'Công nghệ', 'Mĩ thuật'],
    duration: 3,
    highlight: 'Định luật III Newton phản lực, áp suất khí nén đẩy nước, quỹ đạo bay và bung dù an toàn',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-8-khtn-5',
    name: 'Chế tạo mô hình phổi người mô phỏng cơ chế hô hấp và trao đổi khí',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Mĩ thuật', 'Tin học'],
    duration: 2,
    highlight: 'Độ chênh lệch áp suất khoang ngực, cử động cơ hoành và sự giãn nở bóng khí phế nang',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-8-khtn-6',
    name: 'Chế tạo bình chữa cháy mini tự chế từ giấm ăn và bột baking soda',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Giáo dục công dân'],
    duration: 2,
    highlight: 'Phản ứng sinh khí CO2 nặng hơn không khí dập tắt ngọn lửa, an toàn phòng cháy chữa cháy',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-8-math-1',
    name: 'Ứng dụng định lý Thalès và tam giác đồng dạng đo khoảng cách hai bờ sông',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Toán học',
    integratedSubjects: ['Toán học', 'Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Địa lí'],
    duration: 2,
    highlight: 'Định lý Thalès trong tam giác, tam giác đồng dạng, cắm mốc tiêu ngắm đo gián tiếp',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-8-tech-1',
    name: 'Thiết kế mạch điện chiếu sáng lớp học gồm cầu chì, công tắc 2 cực và đèn LED',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Công nghệ',
    integratedSubjects: ['Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Sơ đồ nguyên lý và sơ đồ lắp đặt mạng điện trong nhà, an toàn điện gia dụng',
    materialsType: 'standard_lab'
  },
  {
    id: 't-8-it-1',
    name: 'Thiết kế ứng dụng Quiz trắc nghiệm tương tác kiểm tra kiến thức KHTN',
    grade: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Tin học',
    integratedSubjects: ['Tin học', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Lập trình thuật toán rẽ nhánh, vòng lặp, tính điểm và giao diện đồ họa',
    materialsType: 'sensor_iot_tech'
  },

  // ==========================================
  // KHỐI 9 (THCS)
  // ==========================================
  {
    id: 't-9-khtn-1',
    name: 'Chế tạo máy sấy nông sản mini dùng năng lượng mặt trời',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Bẫy nhiệt hiệu ứng nhà kính, đối lưu không khí sấy khô hoa quả và dược liệu địa phương',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-9-khtn-2',
    name: 'Chế tạo mô hình máy phát điện xoay chiều mini từ nam châm và cuộn dây',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Công nghệ', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Hiện tượng cảm ứng điện từ Faraday, quay rotor tạo dòng điện xoay chiều thắp sáng LED',
    materialsType: 'standard_lab'
  },
  {
    id: 't-9-khtn-3',
    name: 'Chế tạo kính thiên văn khúc xạ đơn giản từ thấu kính hội tụ quan sát Mặt Trăng',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ', 'Mĩ thuật'],
    duration: 3,
    highlight: 'Hệ thống vật kính và thị kính hội tụ, độ phóng đại ảnh ảo của thấu kính',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-9-khtn-4',
    name: 'Chế tạo hệ thống báo động chống trộm bằng cảm biến hồng ngoại PIR',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Tin học', 'Công nghệ', 'Toán học'],
    duration: 3,
    highlight: 'Bức xạ nhiệt hồng ngoại cơ thể người, cảm biến PIR kích hoạt còi báo động',
    materialsType: 'sensor_iot_tech'
  },
  {
    id: 't-9-khtn-5',
    name: 'Thiết kế pin điện hóa từ kim loại phế thải và dung dịch muối ăn',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (KHTN)',
    integratedSubjects: ['Khoa học tự nhiên (KHTN)', 'Toán học', 'Công nghệ', 'Mĩ thuật'],
    duration: 2,
    highlight: 'Dãy hoạt động hóa học của kim loại (Nhôm - Đồng), phản ứng ăn mòn điện hóa phát điện',
    materialsType: 'standard_lab'
  },
  {
    id: 't-9-math-1',
    name: 'Ứng dụng hình học không gian (Hình trụ, Hình nón, Hình cầu) thiết kế hộp bao bì tối ưu chi phí',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Toán học',
    integratedSubjects: ['Toán học', 'Mĩ thuật', 'Công nghệ', 'Tin học'],
    duration: 2,
    highlight: 'Diện tích xung quanh, thể tích hình trụ/nón/cầu, bài toán cực trị tiết kiệm nguyên liệu sản xuất',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-9-tech-1',
    name: 'Thiết kế hệ thống tưới nước nhỏ giọt bán tự động cho vườn sinh học trường học',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Công nghệ',
    integratedSubjects: ['Công nghệ', 'Khoa học tự nhiên (KHTN)', 'Toán học', 'Tin học'],
    duration: 3,
    highlight: 'Nguyên lý siphon, áp suất cột nước và lưu lượng nhỏ giọt tiết kiệm 70% nước tưới',
    materialsType: 'recycled_lowcost'
  },
  {
    id: 't-9-it-1',
    name: 'Xây dựng website/infographic tuyên truyền tiết kiệm năng lượng và giảm rác thải nhựa',
    grade: 'Lớp 9',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Tin học',
    integratedSubjects: ['Tin học', 'Khoa học tự nhiên (KHTN)', 'Mĩ thuật', 'Giáo dục công dân'],
    duration: 2,
    highlight: 'Ngôn ngữ HTML/CSS căn bản, thiết kế đồ họa truyền thông môi trường',
    materialsType: 'standard_lab'
  }
];
