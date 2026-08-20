import { StemLessonPlan } from '../types';

export const SAMPLE_STEM_LESSONS: StemLessonPlan[] = [
  {
    id: 'stem-loc-nuoc-8',
    topicName: 'CHẾ TẠO HỆ THỐNG LỌC NƯỚC MINI TỰ NHIÊN GIA ĐÌNH',
    gradeLevel: 'Lớp 8',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên (Phân môn Hóa học - Sinh học)',
    integratedSubjects: ['Khoa học tự nhiên 8', 'Công nghệ 8', 'Toán học 8', 'Mĩ thuật 8', 'Tin học 8'],
    durationPeriods: 3,
    durationText: '3 tiết (135 phút)',
    overviewDescription: 'Vận dụng kiến thức về hỗn hợp, dung dịch, tính chất của than hoạt tính, cát, sỏi và nguyên lý thẩm thấu để thiết kế, chế tạo một bình lọc nước mini tái chế xử lý nước đục thành nước trong dùng trong sinh hoạt dã ngoại hoặc vùng ngập lụt.',
    objectives: {
      knowledge: [
        'Trình bày được nguyên lý lọc cơ học (qua các lớp cát, sỏi, bông) và nguyên lý hấp phụ chất màu, mùi của than hoạt tính.',
        'Nêu được vai trò của nước sạch và ảnh hưởng của nguồn nước ô nhiễm đến sức khỏe con người.',
        'Tính toán được tỉ lệ chiều dày các lớp vật liệu lọc và lưu lượng lọc nước (ml/phút).'
      ],
      generalCompetencies: {
        autonomyAndSelfLearning: 'Chủ động tìm kiếm thông tin về cấu tạo hệ thống lọc nước đơn giản, tự giác chuẩn bị vật liệu tái chế tại nhà.',
        communicationAndCollaboration: 'Phân công nhiệm vụ rõ ràng trong nhóm, lắng nghe, phản biện mang tính xây dựng khi thảo luận bản vẽ thiết kế.',
        problemSolvingAndCreativity: 'Đề xuất giải pháp cải tiến thứ tự và độ dày các lớp vật liệu lọc để tăng độ trong và tốc độ lọc của nước.'
      },
      stemCompetencies: {
        science: 'Giải thích được tác dụng của từng tầng lọc: sỏi (giữ rác thô), cát (giữ cặn mịn), than hoạt tính (khử độc, mùi), bông (giữ hạt than).',
        technology: 'Sử dụng các dụng cụ cắt, đục lỗ vỏ chai nhựa an toàn; lắp ghép các chi tiết kín khít, không rò rỉ.',
        engineering: 'Vẽ bản phác thảo kĩ thuật hệ thống lọc nước nhiều tầng, chế tạo theo bản vẽ và thử nghiệm lưu lượng lọc.',
        math: 'Đo thể tích nước ban đầu và sau lọc, tính vận tốc dòng chảy (V/t) và hiệu suất lọc theo phần trăm.',
        art: 'Trang trí vỏ bình lọc thẩm mĩ, gọn gàng, có móc treo hoặc đế đứng vững chắc.'
      },
      digitalCompetence: 'Sử dụng ứng dụng bảng tính (Excel/Google Sheets) để nhập dữ liệu đo đạc thể tích - thời gian lọc và vẽ biểu đồ so sánh giữa các nhóm; tra cứu tài liệu tiêu chuẩn nước sinh hoạt trên Internet.',
      qualities: {
        patriotism: 'Ý thức bảo vệ nguồn tài nguyên nước sạch của quê hương, đất nước.',
        kindness: 'Chia sẻ kinh nghiệm làm máy lọc nước cho cộng đồng khi xảy ra thiên tai ngập úng.',
        diligence: 'Kiên trì thử nghiệm nhiều lần, ghi chép số liệu đo lường trung thực.',
        honesty: 'Ghi lại chính xác độ đục, thời gian lọc và lượng nước thu được mà không làm sai lệch số liệu.',
        responsibility: 'Giữ vệ sinh khu vực thực hành, tái sử dụng chai nhựa góp phần giảm thiểu rác thải nhựa.'
      }
    },
    equipment: {
      teacherEquipment: [
        'Mẫu nước đục mô phỏng (nước pha bùn đất, phẩm màu thực phẩm nhẹ, vụn lá cây).',
        'Bộ dụng cụ đo độ pH, cốc đong chia vạch 250ml, đồng hồ bấm giây.',
        'Máy chiếu, video tình huống về khan hiếm nước sạch mùa lũ lụt.'
      ],
      studentMaterials: [
        { name: 'Chai nhựa 1.5L rỗng, sạch', specification: 'Chai nhựa trong suốt PET', quantity: '2 chai/nhóm', isRecyclable: true },
        { name: 'Cát thạch anh / Cát sạch', specification: 'Đã rửa sạch, phơi khô', quantity: '300g/nhóm', isRecyclable: true },
        { name: 'Sỏi nhỏ / Đá dăm', specification: 'Đường kính 0.5 - 1cm, rửa sạch', quantity: '300g/nhóm', isRecyclable: true },
        { name: 'Than hoạt tính', specification: 'Dạng hạt nhỏ hoặc viên nghiền', quantity: '150g/nhóm' },
        { name: 'Bông gòn y tế / Vải lọc', specification: 'Bông sợi tự nhiên', quantity: '50g/nhóm' },
        { name: 'Kéo, dao rọc giấy, băng keo', specification: 'Dụng cụ thủ công', quantity: '1 bộ/nhóm' },
        { name: 'Cốc đong trong suốt có chia vạch', specification: 'Nhựa trong 500ml', quantity: '2 chiếc/nhóm' }
      ],
      digitalTools: ['Google Sheets / Excel đo đạc thời gian', 'Phần mềm Canva thiết kế poster giới thiệu sản phẩm'],
      safetyNotes: [
        'Cẩn thận khi sử dụng kéo và dao rọc giấy cắt chai nhựa.',
        'Nước sau khi lọc ở mô hình này chỉ để quan sát độ trong và dùng sinh hoạt thô, KHÔNG ĐƯỢC UỐNG TRỰC TIẾP vì chưa qua đun sôi khử khuẩn.'
      ]
    },
    teachingSteps: [
      {
        stepNumber: 1,
        stepName: 'BƯỚC 1: XÁC ĐỊNH VẤN ĐỀ (Khởi động & Giao nhiệm vụ)',
        timeEstimate: '15 phút',
        target: 'Học sinh nhận biết được thực trạng thiếu nước sạch khi lũ lụt, thiên tai; tiếp nhận nhiệm vụ thiết kế bình lọc nước mini.',
        content: 'Xem video về đồng bào vùng bão lũ thiếu nước sinh hoạt. Xác định các tiêu chí cần đạt của bình lọc nước mini từ vật liệu tái chế.',
        expectedProduct: 'Bảng tiêu chí sản phẩm do học sinh ghi nhận vào vở/phiếu học tập.',
        implementation: {
          teacherActivities: [
            'Chiếu video ngắn 2 phút về tình trạng ngập lụt khiến giếng nước và bể nước bị ô nhiễm bùn đất.',
            'Đặt câu hỏi kích thích: "Nếu bị cô lập trong 2-3 ngày, làm thế nào để biến nước sông, suối đục ngầu thành nước trong để rửa tay, giặt giũ?"',
            'Giao nhiệm vụ: "Hãy thiết kế và chế tạo bình lọc nước mini nhiều tầng từ chai nhựa và vật liệu tự nhiên với dung tích tối thiểu 500ml, nước lọc ra phải trong và thời gian lọc dưới 10 phút."'
          ],
          studentActivities: [
            'Quan sát video, thảo luận nhóm đôi về vấn đề thực tế.',
            'Cùng giáo viên thống nhất 4 tiêu chí cốt lõi: 1) Nước sau lọc không còn cặn bẩn, trong suốt; 2) Tốc độ lọc đạt trên 30ml/phút; 3) Kết cấu chắc chắn, nhỏ gọn; 4) Sử dụng vật liệu tái chế, chi phí 0 đồng.'
          ],
          transferMethod: 'Giao nhiệm vụ trực tiếp kết hợp phiếu học tập số 1.'
        }
      },
      {
        stepNumber: 2,
        stepName: 'BƯỚC 2: NGHIÊN CỨU KIẾN THỨC NỀN & ĐỀ XUẤT GIẢI PHÁP',
        timeEstimate: '30 phút',
        target: 'Nắm vững nguyên lý lọc cơ học và hấp phụ; đề xuất được thứ tự sắp xếp các tầng vật liệu lọc.',
        content: 'Tìm hiểu chức năng của sỏi, cát mịn, than hoạt tính, bông gòn. Thảo luận lý do vì sao phải sắp xếp lớp hạt to ở trên, hạt nhỏ ở dưới hoặc ngược lại.',
        expectedProduct: 'Câu trả lời phiếu học tập số 2; sơ đồ nguyên lý hoạt động của các tầng lọc.',
        implementation: {
          teacherActivities: [
            'Hướng dẫn học sinh đọc tài liệu SGK KHTN 8 (bài Hỗn hợp và các phương pháp tách chất).',
            'Tổ chức thí nghiệm nhanh kiểm chứng khả năng hấp phụ màu của than hoạt tính (cho than vào nước pha mực tím).',
            'Gợi ý câu hỏi: "Nên xếp sỏi to, cát mịn, than hoạt tính theo thứ tự nào từ trên xuống dưới để bình lọc không bị tắc nhanh?"'
          ],
          studentActivities: [
            'Làm việc nhóm 4-6 học sinh, hoàn thành Phiếu học tập số 2.',
            'Thực hiện thí nghiệm nhỏ thử nghiệm khả năng giữ cặn của cát và khử mùi của than.',
            'Đề xuất 2 phương án bố trí các lớp vật liệu lọc kèm lập luận khoa học.'
          ]
        }
      },
      {
        stepNumber: 3,
        stepName: 'BƯỚC 3: LẬP KẾ HOẠCH VÀ THIẾT KẾ BẢN VẼ KĨ THUẬT',
        timeEstimate: '25 phút',
        target: 'Vẽ được bản phác thảo kĩ thuật chi tiết hệ thống lọc nước có ghi rõ kích thước, độ dày từng tầng và dự trù vật liệu.',
        content: 'Phác thảo mô hình 2D/3D của bình lọc, tính toán chiều cao từng lớp (cm), vị trí đục lỗ thoát nước, nắp vặn và giá đỡ.',
        expectedProduct: 'Bản vẽ thiết kế kĩ thuật trên giấy A3 của từng nhóm; bảng phân công nhiệm vụ và dự trù vật liệu.',
        implementation: {
          teacherActivities: [
            'Yêu cầu các nhóm vẽ bản thiết kế chi tiết trên giấy A3, chú thích rõ kích thước và vai trò từng tầng.',
            'Đi đến từng nhóm góp ý: kiểm tra xem độ dày than hoạt tính đã đủ khử mùi chưa, lớp bông có bị nén quá chặt làm nghẽn nước không.'
          ],
          studentActivities: [
            'Nhóm trưởng điều hành phân công: bạn vẽ bản vẽ, bạn tính toán tỉ lệ chiều cao các lớp (Toán học), bạn viết phần thuyết minh cơ chế (KHTN).',
            'Cả nhóm thống nhất chọn phương án tối ưu và hoàn thành bản vẽ thiết kế.'
          ]
        }
      },
      {
        stepNumber: 4,
        stepName: 'BƯỚC 4: CHẾ TẠO, THỬ NGHIỆM VÀ ĐÁNH GIÁ SẢN PHẨM',
        timeEstimate: '35 phút',
        target: 'Chế tạo hoàn chỉnh bình lọc theo bản vẽ, tiến hành rót thử nước đục, đo đạc thời gian và thể tích nước lọc được.',
        content: 'Cắt chai nhựa, rửa sạch vật liệu, sắp xếp từng lớp theo thứ tự thiết kế. Rót 300ml nước đục thử nghiệm, bấm giờ và thu thập số liệu.',
        expectedProduct: 'Bình lọc nước mini hoàn chỉnh; mẫu nước thu được sau lọc; bảng số liệu đo thời gian và thể tích.',
        implementation: {
          teacherActivities: [
            'Phát vật liệu và giám sát an toàn lao động (nhắc nhở khi dùng kéo/dao rọc giấy).',
            'Cấp mẫu nước ô nhiễm mô phỏng đồng nhất cho tất cả các nhóm để đảm bảo tính công bằng khi thử nghiệm.',
            'Theo dõi các nhóm đo lưu lượng lọc và hướng dẫn cách xử lý nếu nước chảy quá chậm hoặc bị đen do bụi than trôi xuống.'
          ],
          studentActivities: [
            'Thực hiện chế tạo theo đúng bản vẽ thiết kế: cắt đáy chai 1.5L, lót bông ở cổ chai, đổ lần lượt than hoạt tính -> cát mịn -> sỏi nhỏ.',
            'Rửa sơ qua hệ thống bằng nước sạch để trôi bụi than mịn ban đầu.',
            'Rót 300ml nước bùn vào bình lọc, bấm giờ đến khi giọt nước cuối cùng rơi xuống cốc đong.',
            'Ghi chép kết quả: Thể tích nước thu được, thời gian lọc (phút), quan sát độ trong và so sánh với mẫu đối chứng.'
          ]
        }
      },
      {
        stepNumber: 5,
        stepName: 'BƯỚC 5: CHIA SẺ, THẢO LUẬN & ĐIỀU CHỈNH HOÀN THIỆN',
        timeEstimate: '30 phút',
        target: 'Báo cáo sản phẩm trước lớp, đánh giá đồng đẳng theo tiêu chí và đề xuất giải pháp nâng cấp mô hình.',
        content: 'Trưng bày bình lọc và cốc nước thành phẩm; đại diện nhóm thuyết trình cơ chế và số liệu đo đạc; các nhóm khác đặt câu hỏi phản biện.',
        expectedProduct: 'Bài thuyết trình sản phẩm; phiếu đánh giá chéo giữa các nhóm; phương án cải tiến sản phẩm.',
        implementation: {
          teacherActivities: [
            'Điều hành phiên báo cáo (mỗi nhóm 3 phút thuyết trình, 2 phút phản biện).',
            'Tổ chức cho học sinh sử dụng bảng tiêu chí để chấm điểm chéo.',
            'Tổng kết, chốt lại kiến thức cốt lõi: vai trò các tầng lọc, ý thức bảo vệ nguồn nước và cách ứng phó trong tình huống thiên tai khẩn cấp.'
          ],
          studentActivities: [
            'Đại diện nhóm thuyết minh bản vẽ và quá trình chế tạo, giải thích vì sao nước sau lọc trở nên trong suốt.',
            'Trả lời các câu hỏi phản biện từ bạn học: "Tại sao nhóm bạn dùng lớp cát dày hơn lớp sỏi?", "Nếu than hoạt tính bị bão hòa thì làm thế nào?".',
            'Ghi nhận ý kiến đóng góp và đề xuất phương án cải tiến (ví dụ: thêm tầng vải lọc ở miệng để dễ vệ sinh rác thô).'
          ],
          transferMethod: 'Báo cáo trực quan kèm sản phẩm thật và bảng tiêu chí rubric.'
        }
      }
    ],
    evaluationCriteria: {
      productCriteria: [
        {
          id: 'crit-p1',
          category: 'product',
          name: 'Độ trong và chất lượng nước sau lọc',
          weightPercent: 40,
          levels: {
            level1: 'Nước còn đục nhiều, còn mùi lạ hoặc có cặn đen của than hoạt tính trôi theo (Dưới 5 điểm)',
            level2: 'Nước tương đối trong, không còn cặn thô, mùi giảm rõ rệt so với mẫu ban đầu (6-8 điểm)',
            level3: 'Nước trong suốt hoàn toàn, không có cặn lơ lửng, không còn mùi tanh/bùn (9-10 điểm)'
          }
        },
        {
          id: 'crit-p2',
          category: 'product',
          name: 'Tốc độ và lưu lượng lọc',
          weightPercent: 30,
          levels: {
            level1: 'Nước bị tắc nghẽn, chảy từng giọt rất chậm (<10ml/phút) hoặc chảy ào ạt không kịp lọc',
            level2: 'Tốc độ lọc ổn định đạt từ 20 - 40ml/phút',
            level3: 'Tốc độ lọc tối ưu 40 - 60ml/phút, dòng chảy đều đặn, không bị tràn bình'
          }
        },
        {
          id: 'crit-p3',
          category: 'product',
          name: 'Độ bền kết cấu & tính thẩm mĩ',
          weightPercent: 30,
          levels: {
            level1: 'Bình lọc xiêu vẹo, dễ đổ, rò rỉ nước ở các mối ghép nối',
            level2: 'Bình đứng vững, các lớp phân định rõ ràng, không rò rỉ nước',
            level3: 'Bình nhỏ gọn, chắc chắn, có móc treo hoặc chân đế tiện lợi, trang trí đẹp mắt'
          }
        }
      ],
      processCriteria: [
        {
          id: 'crit-pr1',
          category: 'process',
          name: 'Tinh thần hợp tác và phân công nhiệm vụ nhóm',
          levels: {
            level1: 'Chỉ 1-2 thành viên làm việc, các thành viên khác mất trật tự hoặc thụ động',
            level2: 'Có phân công công việc nhưng phối hợp chưa nhịp nhàng, còn đùn đẩy nhiệm vụ',
            level3: '100% thành viên tích cực, phân công rõ ràng (nhóm trưởng, thư kí, kĩ thuật viên, báo cáo viên)'
          }
        },
        {
          id: 'crit-pr2',
          category: 'process',
          name: 'Tuân thủ an toàn lao động & vệ sinh thực hành',
          levels: {
            level1: 'Làm đổ nước, vứt rác bừa bãi, sử dụng dao kéo không an toàn',
            level2: 'Có dọn dẹp sau buổi học nhưng chưa sạch sẽ triệt để',
            level3: 'Thao tác an toàn, bàn học luôn khô ráo, thu gom phân loại rác thải tái chế gọn gàng'
          }
        }
      ],
      knowledgeCriteria: [
        {
          id: 'crit-k1',
          category: 'knowledge',
          name: 'Vận dụng kiến thức khoa học giải thích cơ chế',
          levels: {
            level1: 'Không giải thích được vai trò của từng tầng vật liệu lọc',
            level2: 'Giải thích được tác dụng của cát, sỏi nhưng chưa rõ cơ chế hấp phụ của than hoạt tính',
            level3: 'Giải thích chính xác, mạch lạc nguyên lý lọc cơ học, hấp phụ hóa lý và cơ sở tính toán lưu lượng'
          }
        }
      ]
    },
    worksheets: [
      {
        title: 'PHIẾU HỌC TẬP SỐ 1: KHẢO SÁT VẤN ĐỀ VÀ TIÊU CHÍ BÌNH LỌC NƯỚC',
        description: 'Dành cho hoạt động Xác định vấn đề (Bước 1)',
        tasks: [
          'Liệt kê 3 nguyên nhân gây ô nhiễm nguồn nước mặt tại địa phương em sau mưa lũ.',
          'Điền các tiêu chí bắt buộc mà bình lọc nước mini của nhóm em cần đạt được vào bảng sau.'
        ],
        questions: [
          'Tại sao không nên uống trực tiếp nước sau khi chỉ qua lọc cơ học?',
          'Vật liệu nào trong tự nhiên có thể thay thế than hoạt tính nếu không có sẵn?'
        ]
      },
      {
        title: 'PHIẾU HỌC TẬP SỐ 2: THIẾT KẾ VÀ ĐO ĐẠC THỬ NGHIỆM',
        description: 'Dành cho hoạt động Chế tạo và thử nghiệm (Bước 3 & 4)',
        tasks: [
          'Vẽ sơ đồ các lớp vật liệu lọc kèm kích thước chiều cao (cm) của từng tầng.',
          'Ghi lại nhật ký thử nghiệm: Lần 1 (thời gian... phút, lượng nước... ml), Lần 2 (sau khi điều chỉnh...)'
        ],
        questions: [
          'Khi nước lọc chảy quá chậm, nhóm em đã điều chỉnh tầng vật liệu nào? Vì sao?',
          'Làm thế nào để tăng tuổi thọ sử dụng của lõi lọc than hoạt tính?'
        ]
      }
    ],
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-15T08:00:00Z'
  },
  {
    id: 'stem-xe-the-nang-7',
    topicName: 'CHẾ TẠO XE THẾ NĂNG CHẠY TỰ ĐỘNG VƯỢT DỐC',
    gradeLevel: 'Lớp 7',
    schoolLevel: 'lowerSecondary',
    mainSubject: 'Khoa học tự nhiên 7 (Năng lượng và sự biến đổi)',
    integratedSubjects: ['Khoa học tự nhiên 7', 'Toán học 7', 'Công nghệ 7', 'Mĩ thuật 7'],
    durationPeriods: 3,
    durationText: '3 tiết (135 phút)',
    overviewDescription: 'Vận dụng định luật bảo toàn năng lượng, sự chuyển hóa từ thế năng hấp dẫn (hoặc thế năng đàn hồi của dây chun/quả nặng) thành động năng để thiết kế xe mô hình di chuyển xa nhất và mang được tải trọng quy định.',
    objectives: {
      knowledge: [
        'Trình bày được khái niệm thế năng, động năng và sự chuyển hóa qua lại giữa chúng.',
        'Nhận biết được các yếu tố ảnh hưởng đến quãng đường di chuyển của xe (lực ma sát, khối lượng xe, đường kính bánh xe, thế năng ban đầu).'
      ],
      generalCompetencies: {
        autonomyAndSelfLearning: 'Tự tìm kiếm vật liệu làm khung xe, bánh xe (nắp chai, đĩa CD cũ, que tre).',
        communicationAndCollaboration: 'Phân công chế tạo khung, trục bánh, cơ cấu tích trữ năng lượng.',
        problemSolvingAndCreativity: 'Điều chỉnh ma sát giữa trục xe và ống hút để xe chuyển động êm và xa nhất.'
      },
      stemCompetencies: {
        science: 'Giải thích sự chuyển hóa năng lượng từ thế năng sang động năng và hao phí do lực ma sát cản trở.',
        technology: 'Khoan/đục lỗ nắp chai chuẩn tâm, cố định trục quay giảm ma sát ổ bi.',
        engineering: 'Thiết kế khung gầm xe khí động học, phân bố trọng tâm ổn định không bị lật.',
        math: 'Tính chu vi bánh xe C = 2πr, tính tỉ số truyền động và vận tốc trung bình v = s/t.',
        art: 'Tạo hình dáng xe đua thể thao hoặc xe viễn chinh tương lai bắt mắt.'
      },
      digitalCompetence: 'Sử dụng ứng dụng cảm biến chuyển động trên điện thoại (như Phyphox) để đo gia tốc và vận tốc xe.',
      qualities: {
        patriotism: 'Tìm hiểu ứng dụng năng lượng xanh và xe điện trong phát triển bền vững đất nước.',
        diligence: 'Kiên trì căn chỉnh trục bánh xe đồng trục và thử nghiệm nhiều lần.',
        honesty: 'Ghi chép chính xác cự ly chạy được trong 3 lần chạy chính thức.',
        responsibility: 'Bảo quản dụng cụ cắt gọt an toàn và dọn vệ sinh xưởng thực hành.'
      }
    },
    equipment: {
      teacherEquipment: [
        'Đường chạy phẳng dài 10m dán thước đo cự ly.',
        'Đồng hồ bấm giây điện tử, cân điện tử tiểu ly đo khối lượng xe.',
        'Mô hình xe mẫu chạy bằng thế năng quả nặng rơi.'
      ],
      studentMaterials: [
        { name: 'Đĩa CD cũ hoặc nắp hộp sữa', specification: 'Làm 4 bánh xe tròn đều', quantity: '4 cái/nhóm', isRecyclable: true },
        { name: 'Que gỗ xiên thịt / Đũa tre', specification: 'Thẳng, nhẵn', quantity: '6 que/nhóm' },
        { name: 'Ống hút nhựa cứng', specification: 'Làm ống lót trục quay', quantity: '4 ống/nhóm', isRecyclable: true },
        { name: 'Dây thun cao su / Dây cước', specification: 'Độ đàn hồi tốt', quantity: '5 sợi/nhóm' },
        { name: 'Quả nặng 50g (hoặc ốc vít, đá)', specification: 'Tích trữ thế năng rơi', quantity: '1-2 quả/nhóm' },
        { name: 'Bìa carton cứng, súng bắn keo nến', specification: 'Làm khung xe', quantity: '1 tấm A4 + 2 que keo' }
      ],
      digitalTools: ['App Phyphox đo vận tốc', 'Phần mềm GeoGebra vẽ đường tròn bánh xe'],
      safetyNotes: ['Cẩn thận với nhiệt độ súng bắn keo nến tránh gây bỏng tay.']
    },
    teachingSteps: [
      {
        stepNumber: 1,
        stepName: 'BƯỚC 1: XÁC ĐỊNH VẤN ĐỀ',
        timeEstimate: '15 phút',
        target: 'Học sinh hiểu được bài toán: chế tạo xe tự hành không dùng pin/động cơ điện mà chạy bằng cơ năng tích trữ.',
        content: 'Đặt tình huống: Cuộc đua xe "Eco-Car" chạy bằng năng lượng tái tạo. Tiêu chí: chạy tối thiểu 3m và mang tải trọng 50g.',
        expectedProduct: 'Phiếu xác định nhiệm vụ và tiêu chí kỹ thuật của xe thế năng.',
        implementation: {
          teacherActivities: [
            'Cho xem clip xe chạy bằng thế năng quả nặng rơi hoặc dây thun.',
            'Nêu thách thức: Nhóm nào chế tạo xe chạy xa nhất và thẳng hướng nhất sẽ giành chiến thắng.'
          ],
          studentActivities: [
            'Nhận đề bài, phân tích yêu cầu: Xe phải tự khởi hành, không được đẩy bằng tay, chạy thẳng.'
          ]
        }
      },
      {
        stepNumber: 2,
        stepName: 'BƯỚC 2: NGHIÊN CỨU KIẾN THỨC NỀN',
        timeEstimate: '30 phút',
        target: 'Vận dụng kiến thức thế năng, ma sát và nguyên lý truyền động trục quay.',
        content: 'Thảo luận các yếu tố giúp xe chạy xa: Giảm ma sát trục, tăng ma sát bám của lốp xe (bọc thun quanh đĩa CD), chiều cao hạ quả nặng.',
        expectedProduct: 'Sơ đồ phân tích lực và sơ đồ truyền động từ quả nặng/dây thun sang bánh xe.',
        implementation: {
          teacherActivities: ['Gợi ý cách bọc vòng thun quanh đĩa CD để tăng ma sát lăn với mặt sàn.'],
          studentActivities: ['Làm việc nhóm, thảo luận chọn phương án truyền động đòn bẩy hay quấn trục trực tiếp.']
        }
      },
      {
        stepNumber: 3,
        stepName: 'BƯỚC 3: LẬP KẾ HOẠCH VÀ THIẾT KẾ',
        timeEstimate: '25 phút',
        target: 'Vẽ bản thiết kế xe có đầy đủ kích thước chiều dài, rộng, bán kính bánh và vị trí cột thế năng.',
        content: 'Vẽ phác thảo trên giấy A3, tính toán tỉ lệ khung xe sao cho không bị lật khi chuyển động.',
        expectedProduct: 'Bản vẽ kĩ thuật 2D khung xe và trục truyền động.',
        implementation: {
          teacherActivities: ['Kiểm tra tính khả thi của bản vẽ từng nhóm, nhắc nhở cân đối trọng tâm.'],
          studentActivities: ['Vẽ bản vẽ, liệt kê các bước chế tạo chi tiết và phân công mua sắm/chuẩn bị vật liệu.']
        }
      },
      {
        stepNumber: 4,
        stepName: 'BƯỚC 4: CHẾ TẠO, THỬ NGHIỆM VÀ ĐÁNH GIÁ',
        timeEstimate: '35 phút',
        target: 'Chế tạo hoàn thiện xe, chạy thử nghiệm trên sàn và tinh chỉnh độ trơn của trục bánh xe.',
        content: 'Lắp ráp khung xe, gắn bánh đĩa CD, luồn dây cước quấn trục, thả thử nghiệm và đo khoảng cách chạy.',
        expectedProduct: 'Xe thế năng hoàn chỉnh chạy được trên thực tế; bảng số liệu 3 lần chạy thử.',
        implementation: {
          teacherActivities: ['Hỗ trợ các nhóm gặp lỗi xe bị xoay vòng hoặc trượt bánh tại chỗ.'],
          studentActivities: ['Lắp ráp, căn chỉnh song song giữa 2 trục bánh xe, gia tăng độ bám cho lốp xe.']
        }
      },
      {
        stepNumber: 5,
        stepName: 'BƯỚC 5: CHIA SẺ, THẢO LUẬN & ĐUA XE TỔNG KẾT',
        timeEstimate: '30 phút',
        target: 'Tổ chức giải đua xe thế năng lớp học, báo cáo nguyên lý và rút kinh nghiệm cải tiến.',
        content: 'Mỗi nhóm chạy 3 lượt, lấy thành tích xa nhất; thuyết minh giải pháp tối ưu ma sát và khí động học.',
        expectedProduct: 'Kết quả thi đấu; bảng điểm rubric; bài học kinh nghiệm về chuyển hóa năng lượng.',
        implementation: {
          teacherActivities: ['Làm trọng tài đo quãng đường, chấm điểm thái độ và kiến thức.'],
          studentActivities: ['Vận hành xe, ghi nhận số liệu, giải thích nguyên nhân xe chạy nhanh hoặc chậm.']
        }
      }
    ],
    evaluationCriteria: {
      productCriteria: [
        {
          id: 'crit-car-1',
          category: 'product',
          name: 'Quãng đường di chuyển của xe',
          weightPercent: 40,
          levels: {
            level1: 'Xe chạy dưới 2m hoặc bị kẹt trục đứng yên',
            level2: 'Xe chạy từ 2m đến 5m, tương đối thẳng hướng',
            level3: 'Xe chạy trên 5m (hoặc vượt qua dốc quy định), đường chạy thẳng tắp'
          }
        },
        {
          id: 'crit-car-2',
          category: 'product',
          name: 'Khả năng mang tải trọng quy định',
          weightPercent: 30,
          levels: {
            level1: 'Không mang được tải trọng, khung xe bị gãy vẹo',
            level2: 'Mang được 30g - 50g nhưng vận tốc giảm đáng kể',
            level3: 'Mang đủ tải trọng 50g - 100g vững vàng, khung xe chắc chắn'
          }
        },
        {
          id: 'crit-car-3',
          category: 'product',
          name: 'Tính sáng tạo và sử dụng vật liệu tái chế',
          weightPercent: 30,
          levels: {
            level1: 'Sử dụng phụ kiện làm sẵn nhiều, ít yếu tố sáng tạo',
            level2: 'Sử dụng đĩa CD và que kem tái chế khéo léo',
            level3: 'Thiết kế cơ cấu truyền động thông minh, tận dụng 100% phế liệu an toàn'
          }
        }
      ],
      processCriteria: [
        {
          id: 'crit-car-pr1',
          category: 'process',
          name: 'Kỹ năng làm việc nhóm và giải quyết sự cố kỹ thuật',
          levels: {
            level1: 'Bỏ cuộc khi xe không chạy hoặc tranh cãi trong nhóm',
            level2: 'Tìm cách sửa chữa khi xe kẹt nhưng cần giáo viên gợi ý',
            level3: 'Chủ động phát hiện lỗi ma sát và tự khắc phục thành công'
          }
        }
      ],
      knowledgeCriteria: [
        {
          id: 'crit-car-k1',
          category: 'knowledge',
          name: 'Giải thích định luật bảo toàn và chuyển hóa năng lượng',
          levels: {
            level1: 'Chưa phân biệt được thế năng và động năng',
            level2: 'Nêu được thế năng chuyển thành động năng nhưng chưa giải thích được hao phí ma sát',
            level3: 'Phân tích sâu sắc sự bảo toàn cơ năng và các biện pháp giảm hao phí cơ học'
          }
        }
      ]
    },
    createdAt: '2025-02-10T08:00:00Z',
    updatedAt: '2025-02-10T08:00:00Z'
  },
  {
    id: 'stem-tuoi-nho-giot-10',
    topicName: 'THIẾT KẾ HỆ THỐNG TƯỚI NHỎ GIỌT TỰ ĐỘNG THÔNG MINH CHO VƯỜN TRƯỜNG',
    gradeLevel: 'Lớp 10',
    schoolLevel: 'upperSecondary',
    mainSubject: 'Sinh học 10 (Sinh học tế bào & Sinh thái nông nghiệp)',
    integratedSubjects: ['Sinh học 10', 'Công nghệ 10 (Công nghệ trồng trọt)', 'Toán học 10', 'Tin học 10', 'Vật lí 10'],
    durationPeriods: 4,
    durationText: '4 tiết (180 phút - Dự án 1 tuần)',
    overviewDescription: 'Tích hợp sinh lí trao đổi nước ở thực vật, nguyên lí bình thông nhau và áp suất thủy tĩnh để thiết kế mạng lưới tưới nhỏ giọt tự điều tiết hoặc điều khiển bằng vi mạch/van phao cơ học cho vườn cây thuốc nam của trường học.',
    objectives: {
      knowledge: [
        'Nêu được nhu cầu nước và cơ chế hút nước, thoát hơi nước của cây trồng theo từng giai đoạn.',
        'Trình bày nguyên lí áp suất thủy tĩnh p = d.h và quy luật dòng chảy qua tiết diện ống nhỏ.',
        'Tính toán được tổng nhu cầu nước hàng ngày của luống rau và dung tích bình chứa cần thiết.'
      ],
      generalCompetencies: {
        autonomyAndSelfLearning: 'Nghiên cứu tài liệu kĩ thuật về tưới tiết kiệm nước Israel và nông nghiệp công nghệ cao.',
        communicationAndCollaboration: 'Phân công khảo sát thực địa khuôn viên vườn trường, lập dự toán kinh phí.',
        problemSolvingAndCreativity: 'Thiết kế đầu nhỏ giọt tự chế từ dây truyền dịch y tế hoặc ốc vít có thể vặn chỉnh lưu lượng.'
      },
      stemCompetencies: {
        science: 'Tính toán chính xác lượng nước tưới hợp lý cho từng loại cây tránh úng rễ hoặc thiếu nước.',
        technology: 'Lắp ráp mạng lưới ống dẫn PVC/PE, gắn co nối chữ T, van khóa và đầu nhỏ giọt kín nước.',
        engineering: 'Vẽ sơ đồ mặt bằng mạng lưới đường ống, tính độ dốc thủy lực để nước nhỏ giọt đều ở tất cả các gốc cây.',
        math: 'Tính toán thể tích hình trụ, lưu lượng lít/giờ, hàm số phụ thuộc giữa độ cao cột nước và áp lực tưới.',
        art: 'Bố trí đường ống ẩn dưới đất hoặc bám luống cây gọn gàng, tăng vẻ mĩ quan xanh cho trường học.'
      },
      digitalCompetence: 'Sử dụng phần mềm CAD/Tinkercad vẽ sơ đồ mạng lưới ống; lập trình vi điều khiển Micro:bit hoặc Arduino gắn cảm biến độ ẩm đất (nếu có điều kiện).',
      qualities: {
        patriotism: 'Tình yêu thiên nhiên, bảo vệ mảng xanh học đường và tiết kiệm nguồn tài nguyên nước quốc gia.',
        diligence: 'Chăm sóc, theo dõi sự sinh trưởng của luống rau sau khi lắp đặt hệ thống tưới.',
        honesty: 'Ghi chép chính xác lượng nước tiêu thụ và độ ẩm đất đo được mỗi ngày.',
        responsibility: 'Bảo dưỡng định kỳ đường ống, tránh tắc nghẽn do rong rêu và rác cặn.'
      }
    },
    equipment: {
      teacherEquipment: [
        'Mô hình tưới nhỏ giọt chuẩn nông nghiệp công nghệ cao.',
        'Máy đo độ ẩm đất kỹ thuật số, đồng hồ đo áp lực nước mini.'
      ],
      studentMaterials: [
        { name: 'Thùng sơn 20L hoặc bình nước 10L', specification: 'Làm bồn chứa nước trên cao', quantity: '1 bình/nhóm', isRecyclable: true },
        { name: 'Dây truyền dịch y tế cũ (đã tiệt trùng) hoặc ống mềm PE 6mm', specification: 'Có khóa chỉnh lưu lượng', quantity: '10 bộ/nhóm' },
        { name: 'Ống dẫn chính PVC phi 21 hoặc ống mềm phi 16', specification: 'Chiều dài 5m/nhóm', quantity: '1 cuộn' },
        { name: 'Co nối chữ T, van khóa tổng, nắp bịt cuối ống', specification: 'Đồng bộ cỡ ống', quantity: '1 bộ' },
        { name: 'Dùi đục lỗ, keo dán ống PVC, băng keo lụa cao su non', specification: 'Dụng cụ thi công', quantity: '1 bộ' }
      ],
      digitalTools: ['Tinkercad 3D / SketchUp sơ đồ', 'Bảng tính Excel tối ưu hóa chi phí đường ống'],
      safetyNotes: ['Cẩn thận khi khoan đục thùng chứa nước tránh làm nứt vỡ bình.']
    },
    teachingSteps: [
      {
        stepNumber: 1,
        stepName: 'BƯỚC 1: XÁC ĐỊNH VẤN ĐỀ VÀ KHẢO SÁT THỰC ĐỊA',
        timeEstimate: '45 phút',
        target: 'Khảo sát luống rau vườn trường, xác định vấn đề tưới thủ công tốn công sức và lãng phí nước.',
        content: 'Đo kích thước luống cây, đếm số lượng gốc cây, xác định vị trí đặt bồn nước trên cao để tạo áp suất.',
        expectedProduct: 'Bản vẽ mặt bằng hiện trạng vườn trường và bảng yêu cầu kĩ thuật hệ thống tưới.',
        implementation: {
          teacherActivities: ['Dẫn học sinh ra vườn thực nghiệm trường học, nêu thực trạng cây bị héo trong 2 ngày nghỉ cuối tuần.'],
          studentActivities: ['Đo đạc kích thước thực tế, ghi chép khoảng cách giữa các gốc cây, tính tổng số đầu tưới cần lắp.']
        }
      },
      {
        stepNumber: 2,
        stepName: 'BƯỚC 2: NGHIÊN CỨU KIẾN THỨC NỀN & NGUYÊN LÍ THỦY LỰC',
        timeEstimate: '45 phút',
        target: 'Vận dụng kiến thức thoát hơi nước ở lá, áp suất chất lỏng và định luật Bec-nu-li.',
        content: 'Tính toán: Chiều cao bình nước h phải bằng bao nhiêu để tạo áp suất đủ thắng ma sát dọc đường ống dài 5m.',
        expectedProduct: 'Bản tính toán thủy lực và thuyết minh nhu cầu nước của cây trồng theo mùa.',
        implementation: {
          teacherActivities: ['Hướng dẫn công thức tính lưu lượng và mối quan hệ giữa độ cao bồn chứa với áp lực đầu vòi.'],
          studentActivities: ['Tính toán thể tích bồn nước cần duy trì tưới liên tục trong 48 giờ nghỉ cuối tuần.']
        }
      },
      {
        stepNumber: 3,
        stepName: 'BƯỚC 3: LẬP KẾ HOẠCH, VẼ THIẾT KẾ & DỰ TOÁN KINH PHÍ',
        timeEstimate: '45 phút',
        target: 'Hoàn thiện bản vẽ kĩ thuật mạng lưới đường ống và bảng dự trù vật tư chi tiết với chi phí tiết kiệm nhất.',
        content: 'Vẽ sơ đồ mạng lưới hình xương cá hoặc vòng khép kín; chọn giải pháp đầu nhỏ giọt có van điều tiết.',
        expectedProduct: 'Bản vẽ kĩ thuật tỉ lệ 1:20 và bảng danh mục vật tư kèm báo giá thực tế.',
        implementation: {
          teacherActivities: ['Phê duyệt bản vẽ, lưu ý các bẫy cặn ở cuối đường ống để tránh nghẹt đầu tưới.'],
          studentActivities: ['Trình bày bản vẽ trước giáo viên, phản biện tính tối ưu về chi phí và công năng.']
        }
      },
      {
        stepNumber: 4,
        stepName: 'BƯỚC 4: THI CÔNG LẮP ĐẶT & THỬ NGHIỆM TẠI VƯỜN TRƯỜNG',
        timeEstimate: '45 phút',
        target: 'Lắp ráp hoàn chỉnh hệ thống tưới, mở van kiểm tra độ đồng đều lưu lượng giữa đầu nguồn và cuối nguồn.',
        content: 'Đục lỗ trên ống chính, gắn ống nhánh vào gốc cây, đổ đầy bồn chứa nước, đo lưu lượng giọt nước/phút tại 5 vị trí ngẫu nhiên.',
        expectedProduct: 'Hệ thống tưới nhỏ giọt hoạt động ổn định trên luống rau; bảng số liệu lưu lượng tại các đầu vòi.',
        implementation: {
          teacherActivities: ['Hỗ trợ kĩ thuật xử lý các điểm rò rỉ nước ở mối nối, kiểm tra van xả cặn.'],
          studentActivities: ['Tiến hành lắp ráp thực tế, căn chỉnh từng van nhỏ giọt để đảm bảo 1 giọt/giây đều nhau.']
        }
      }
    ],
    evaluationCriteria: {
      productCriteria: [
        {
          id: 'crit-drip-1',
          category: 'product',
          name: 'Độ đồng đều lưu lượng giữa các đầu tưới',
          weightPercent: 40,
          levels: {
            level1: 'Đầu ống nước chảy mạnh nhưng cuối ống không có nước nhỏ giọt',
            level2: 'Tất cả các đầu đều có nước nhưng lưu lượng chênh lệch trên 30%',
            level3: 'Lưu lượng tại tất cả các gốc cây đồng đều (sai số <10%), điều chỉnh được tốc độ giọt'
          }
        },
        {
          id: 'crit-drip-2',
          category: 'product',
          name: 'Độ kín nước & độ bền lắp đặt',
          weightPercent: 30,
          levels: {
            level1: 'Nhiều mối nối bị rò rỉ nước, đường ống lộn xộn',
            level2: 'Không rò rỉ nhưng ống còn cong vênh, chưa cố định chắc chắn',
            level3: 'Kín nước 100%, đường ống thẳng tắp, ghim cố định sát đất gọn gàng, thẩm mĩ cao'
          }
        },
        {
          id: 'crit-drip-3',
          category: 'product',
          name: 'Tính tiết kiệm nước và tự động hóa',
          weightPercent: 30,
          levels: {
            level1: 'Hao phí nước nhiều, bồn nước cạn sau vài giờ',
            level2: 'Duy trì tưới được 24 giờ liên tục',
            level3: 'Duy trì tưới đều đặn 48-72 giờ, tiết kiệm 70% lượng nước so với tưới tràn truyền thống'
          }
        }
      ],
      processCriteria: [
        {
          id: 'crit-drip-pr1',
          category: 'process',
          name: 'Kỹ năng thi công thực địa & tinh thần trách nhiệm',
          levels: {
            level1: 'Làm hỏng cây trồng khi thi công, không tuân thủ kế hoạch',
            level2: 'Thi công cẩn thận nhưng còn phụ thuộc nhiều vào hỗ trợ của giáo viên',
            level3: 'Thao tác thành thạo, giữ gìn cây trồng cẩn thận, dọn dẹp sạch sẽ luống vườn'
          }
        }
      ],
      knowledgeCriteria: [
        {
          id: 'crit-drip-k1',
          category: 'knowledge',
          name: 'Vận dụng kiến thức sinh lí thực vật và thủy lực học',
          levels: {
            level1: 'Không tính được lượng nước cần thiết cho cây trồng',
            level2: 'Tính được thể tích nước nhưng chưa giải thích được ảnh hưởng của áp suất cột nước',
            level3: 'Tính toán chính xác nhu cầu nước theo diện tích tán lá và giải thích rõ nguyên lí thủy lực'
          }
        }
      ]
    },
    createdAt: '2025-02-18T08:00:00Z',
    updatedAt: '2025-02-18T08:00:00Z'
  }
];
