// 資料: Bai1_徹底トレーニング_語彙N1.md の単語データ（全126語）
const VOCAB_BAI1_RAW = [
  { stt: 1, kanji: "維持", yomi: "いじ", meaning: "duy trì" },
  { stt: 2, kanji: "意図", yomi: "いと", meaning: "ý đồ / mục đích" },
  { stt: 3, kanji: "寄附", yomi: "きふ", meaning: "quyên góp / gửi tặng" },
  { stt: 4, kanji: "拒否", yomi: "きょひ", meaning: "từ chối" },
  { stt: 5, kanji: "処置", yomi: "しょち", meaning: "xử trí / đối xử" },
  { stt: 6, kanji: "阻止", yomi: "そし", meaning: "cản trở" },
  { stt: 7, kanji: "破棄", yomi: "はき", meaning: "hủy hoại / phá bỏ" },
  { stt: 8, kanji: "保護", yomi: "ほご", meaning: "bảo hộ / chăm sóc" },
  { stt: 9, kanji: "保守", yomi: "ほしゅ", meaning: "bảo thủ" },
  { stt: 10, kanji: "加味", yomi: "かみ", meaning: "thêm gia vị" },
  { stt: 11, kanji: "寄与", yomi: "きよ", meaning: "đóng góp / giúp đỡ" },
  { stt: 12, kanji: "指揮", yomi: "しき", meaning: "chỉ huy" },
  { stt: 13, kanji: "支持", yomi: "しじ", meaning: "duy trì / nâng đỡ / ủng hộ" },
  { stt: 14, kanji: "自首", yomi: "じしゅ", meaning: "tự thú" },
  { stt: 15, kanji: "所持", yomi: "しょじ", meaning: "sở hữu" },
  { stt: 16, kanji: "補助", yomi: "ほじょ", meaning: "hỗ trợ" },
  { stt: 17, kanji: "麻痺", yomi: "まひ", meaning: "tê liệt" },
  { stt: 18, kanji: "餓死", yomi: "がし", meaning: "chết đói" },
  { stt: 19, kanji: "帰化", yomi: "きか", meaning: "nhập quốc tịch" },
  { stt: 20, kanji: "危惧", yomi: "きぐ", meaning: "sợ hãi" },
  { stt: 21, kanji: "起訴", yomi: "きそ", meaning: "khởi tố" },
  { stt: 22, kanji: "忌避", yomi: "きひ", meaning: "né tránh" },
  { stt: 23, kanji: "挙手", yomi: "きょしゅ", meaning: "giơ tay" },
  { stt: 24, kanji: "駆使", yomi: "くし", meaning: "tận dụng hết" },
  { stt: 25, kanji: "駆除", yomi: "くじょ", meaning: "tiêu diệt" },
  { stt: 26, kanji: "固辞", yomi: "こじ", meaning: "từ chối" },
  { stt: 27, kanji: "誇示", yomi: "こじ", meaning: "khoa trương / khoe khoang" },
  { stt: 28, kanji: "示唆", yomi: "しさ", meaning: "đề xuất / gợi ý" },
  { stt: 29, kanji: "自負", yomi: "じふ", meaning: "kiêu ngạo / tự phụ" },
  { stt: 30, kanji: "除去", yomi: "じょきょ", meaning: "loại bỏ / giải thoát" },
  { stt: 31, kanji: "図示", yomi: "ずし", meaning: "hiển thị" },
  { stt: 32, kanji: "打破", yomi: "だは", meaning: "phá vỡ" },
  { stt: 33, kanji: "治癒", yomi: "ちゆ", meaning: "điều trị" },
  { stt: 34, kanji: "卑下", yomi: "ひげ", meaning: "hạ thấp mình / tự ti" },
  { stt: 35, kanji: "補佐", yomi: "ほさ", meaning: "trợ lí" },
  { stt: 36, kanji: "拉致", yomi: "らち", meaning: "bắt cóc" },
  { stt: 37, kanji: "濾過", yomi: "ろか", meaning: "lọc" },
  { stt: 38, kanji: "意義", yomi: "いぎ", meaning: "ý nghĩa" },
  { stt: 39, kanji: "異議", yomi: "いぎ", meaning: "phản bác / phản đối" },
  { stt: 40, kanji: "意地", yomi: "いじ", meaning: "tâm địa" },
  { stt: 41, kanji: "過疎", yomi: "かそ", meaning: "sự giảm dân số" },
  { stt: 42, kanji: "規模", yomi: "きぼ", meaning: "quy mô" },
  { stt: 43, kanji: "義務", yomi: "ぎむ", meaning: "nghĩa vụ / bổn phận" },
  { stt: 44, kanji: "個々", yomi: "ここ", meaning: "từng...một / từng" },
  { stt: 45, kanji: "誤差", yomi: "ごさ", meaning: "sai số" },
  { stt: 46, kanji: "磁気", yomi: "じき", meaning: "từ tính" },
  { stt: 47, kanji: "時期", yomi: "じき", meaning: "thời kì" },
  { stt: 48, kanji: "自己", yomi: "じこ", meaning: "tự mình" },
  { stt: 49, kanji: "視野", yomi: "しや", meaning: "quan điểm / tầm nhìn" },
  { stt: 50, kanji: "砂利", yomi: "じゃり", meaning: "sỏi" },
  { stt: 51, kanji: "趣旨", yomi: "しゅし", meaning: "ý đồ / mục đích" },
  { stt: 52, kanji: "種々", yomi: "しゅじゅ", meaning: "nhiều loại / đa dạng" },
  { stt: 53, kanji: "措置", yomi: "そち", meaning: "biện pháp" },
  { stt: 54, kanji: "墓地", yomi: "ぼち", meaning: "nghĩa địa" },
  { stt: 55, kanji: "余地", yomi: "よち", meaning: "chỗ thừa / nơi trống" },
  { stt: 56, kanji: "危機", yomi: "きき", meaning: "nguy cơ / khủng hoảng" },
  { stt: 57, kanji: "義理", yomi: "ぎり", meaning: "tình nghĩa" },
  { stt: 58, kanji: "下痢", yomi: "げり", meaning: "tiêu chảy" },
  { stt: 59, kanji: "語彙", yomi: "ごい", meaning: "từ vựng" },
  { stt: 60, kanji: "語句", yomi: "ごく", meaning: "câu cú" },
  { stt: 61, kanji: "孤児", yomi: "こじ/みなしご", meaning: "mồ côi" },
  { stt: 62, kanji: "詐欺", yomi: "さぎ", meaning: "lừa đảo" },
  { stt: 63, kanji: "歯科", yomi: "しか", meaning: "nha khoa" },
  { stt: 64, kanji: "自我", yomi: "じが", meaning: "đắc ý / tâm đắc / tự hào" },
  { stt: 65, kanji: "磁器", yomi: "じき", meaning: "đồ gốm sứ" },
  { stt: 66, kanji: "時差", yomi: "じさ", meaning: "lệch múi giờ" },
  { stt: 67, kanji: "自主", yomi: "じしゅ", meaning: "tự chủ" },
  { stt: 68, kanji: "守備", yomi: "しゅび", meaning: "phòng vệ / bảo vệ" },
  { stt: 69, kanji: "助詞", yomi: "じょし", meaning: "trợ từ" },
  { stt: 70, kanji: "庶務", yomi: "しょむ", meaning: "cv tổng hợp" },
  { stt: 71, kanji: "世辞", yomi: "せじ", meaning: "nịnh" },
  { stt: 72, kanji: "著書", yomi: "ちょしょ", meaning: "tác phẩm" },
  { stt: 73, kanji: "徒歩", yomi: "とほ", meaning: "đi bộ" },
  { stt: 74, kanji: "秘書", yomi: "ひしょ", meaning: "thư ký" },
  { stt: 75, kanji: "不意", yomi: "ふい", meaning: "đột nhiên / không ngờ tới" },
  { stt: 76, kanji: "部下", yomi: "ぶか", meaning: "cấp dưới" },
  { stt: 77, kanji: "捕虜", yomi: "ほりょ", meaning: "tù binh" },
  { stt: 78, kanji: "未知", yomi: "みち", meaning: "chưa biết" },
  { stt: 79, kanji: "余暇", yomi: "よか", meaning: "thời gian rảnh" },
  { stt: 80, kanji: "利子", yomi: "りし", meaning: "lời lãi" },
  { stt: 81, kanji: "意気", yomi: "いき", meaning: "tinh thần" },
  { stt: 82, kanji: "囲碁", yomi: "いご", meaning: "cờ vây" },
  { stt: 83, kanji: "遺書", yomi: "いしょ", meaning: "di thư" },
  { stt: 84, kanji: "歌詞", yomi: "かし", meaning: "ca từ / lời bài hát" },
  { stt: 85, kanji: "過度", yomi: "かど", meaning: "quá độ / quá mức" },
  { stt: 86, kanji: "可否", yomi: "かひ", meaning: "sự đúng sai" },
  { stt: 87, kanji: "飢餓", yomi: "きが", meaning: "nạn đói" },
  { stt: 88, kanji: "機器", yomi: "きき", meaning: "máy móc" },
  { stt: 89, kanji: "季語", yomi: "きご", meaning: "từ ngữ theo mùa" },
  { stt: 90, kanji: "機種", yomi: "きしゅ", meaning: "chủng loại máy" },
  { stt: 91, kanji: "旗手", yomi: "きしゅ", meaning: "người chơi cờ" },
  { stt: 92, kanji: "既知", yomi: "きち", meaning: "đã biết" },
  { stt: 93, kanji: "虚偽", yomi: "きょぎ", meaning: "sự giả dối" },
  { stt: 94, kanji: "虚無", yomi: "きょむ", meaning: "trống rỗng" },
  { stt: 95, kanji: "呼気", yomi: "こき", meaning: "hơi thở" },
  { stt: 96, kanji: "誤字", yomi: "ごじ", meaning: "chữ sai" },
  { stt: 97, kanji: "語尾", yomi: "ごび", meaning: "vĩ tố / âm cuối" },
  { stt: 98, kanji: "差異", yomi: "さい", meaning: "sự sai khác" },
  { stt: 99, kanji: "時価", yomi: "じか", meaning: "giá hiện tại" },
  { stt: 100, kanji: "時下", yomi: "じか", meaning: "thời nay" },
  { stt: 101, kanji: "時機", yomi: "じき", meaning: "cơ hội / thời cơ" },
  { stt: 102, kanji: "次期", yomi: "じき", meaning: "thời kì sau / thời tiếp theo" },
  { stt: 103, kanji: "私語", yomi: "しご", meaning: "nói chuyện riêng / độc thoại" },
  { stt: 104, kanji: "死語", yomi: "しご", meaning: "từ lỗi thời / tử ngữ" },
  { stt: 105, kanji: "事後", yomi: "じご", meaning: "sự việc sau đó" },
  { stt: 106, kanji: "私費", yomi: "しひ", meaning: "chi phí cá nhân" },
  { stt: 107, kanji: "自費", yomi: "じひ", meaning: "tự trả tiền" },
  { stt: 108, kanji: "首位", yomi: "しゅい", meaning: "vị trí đứng đầu" },
  { stt: 109, kanji: "主旨", yomi: "しゅし", meaning: "ý chính / lý do chính" },
  { stt: 110, kanji: "種子", yomi: "しゅし", meaning: "hạt giống" },
  { stt: 111, kanji: "手話", yomi: "しゅわ", meaning: "ngôn ngữ kí hiệu / ra dấu hiệu" },
  { stt: 112, kanji: "書記", yomi: "しょき", meaning: "ghi chép / thư kí" },
  { stt: 113, kanji: "齟齬", yomi: "そご", meaning: "mâu thuẫn / bất hòa" },
  { stt: 114, kanji: "地価", yomi: "ちか", meaning: "giá đất" },
  { stt: 115, kanji: "致死", yomi: "ちし", meaning: "gây chết / chí mạng" },
  { stt: 116, kanji: "覇者", yomi: "はしゃ", meaning: "quán quân / dẫn đầu" },
  { stt: 117, kanji: "馬車", yomi: "ばしゃ", meaning: "xe ngựa" },
  { stt: 118, kanji: "避暑", yomi: "ひしょ", meaning: "tránh nóng" },
  { stt: 119, kanji: "比喩", yomi: "ひゆ", meaning: "so sánh / ví von" },
  { stt: 120, kanji: "部署", yomi: "ぶしょ", meaning: "cương vị" },
  { stt: 121, kanji: "不和", yomi: "ふわ", meaning: "bất hòa" },
  { stt: 122, kanji: "簿記", yomi: "ぼき", meaning: "ghi vào sổ" },
  { stt: 123, kanji: "母語", yomi: "ぼご", meaning: "tiếng mẹ đẻ" },
  { stt: 124, kanji: "無期", yomi: "むき", meaning: "không hạn định" },
  { stt: 125, kanji: "路地", yomi: "ろじ", meaning: "đường đi" },
  { stt: 126, kanji: "和語", yomi: "わご", meaning: "tiếng Nhật" },
];

// 資料: Bai2 - 徹底トレーニング語彙N1_Bai2.csv の単語データ（全140語）
const VOCAB_BAI2_RAW = [
  { stt: 127, kanji: "移行", yomi: "いこう", meaning: "chuyển tiếp / di trú" },
  { stt: 128, kanji: "委託", yomi: "いたく", meaning: "ủy thác" },
  { stt: 129, kanji: "違反", yomi: "いはん", meaning: "vi phạm" },
  { stt: 130, kanji: "依頼", yomi: "いらい", meaning: "nhờ cậy / yêu cầu" },
  { stt: 131, kanji: "汚染", yomi: "おせん", meaning: "ô nhiễm" },
  { stt: 132, kanji: "加減", yomi: "かげん", meaning: "điều chỉnh / tăng giảm" },
  { stt: 133, kanji: "企画", yomi: "きかく", meaning: "kế hoạch" },
  { stt: 134, kanji: "棄権", yomi: "きけん", meaning: "bỏ phiếu trắng" },
  { stt: 135, kanji: "記載", yomi: "きさい", meaning: "ghi chép / viết" },
  { stt: 136, kanji: "規制", yomi: "きせい", meaning: "quy chế" },
  { stt: 137, kanji: "偽造", yomi: "ぎぞう", meaning: "làm giả / ngụy tạo" },
  { stt: 138, kanji: "誤解", yomi: "ごかい", meaning: "hiểu lầm / hiểu sai" },
  { stt: 139, kanji: "故障", yomi: "こしょう", meaning: "hỏng hóc" },
  { stt: 140, kanji: "誇張", yomi: "こちょう", meaning: "khoa trương / phóng đại" },
  { stt: 141, kanji: "雇用", yomi: "こよう", meaning: "tuyển dụng" },
  { stt: 142, kanji: "孤立", yomi: "こりつ", meaning: "cô lập" },
  { stt: 143, kanji: "作用", yomi: "さよう", meaning: "tác dụng" },
  { stt: 144, kanji: "飼育", yomi: "しいく", meaning: "chăn nuôi" },
  { stt: 145, kanji: "自覚", yomi: "じかく", meaning: "tự giác" },
  { stt: 146, kanji: "志向", yomi: "しこう", meaning: "chí hướng" },
  { stt: 147, kanji: "思考", yomi: "しこう", meaning: "suy nghĩ" },
  { stt: 148, kanji: "施行", yomi: "しこう", meaning: "thực hiện / thi hành" },
  { stt: 149, kanji: "試行", yomi: "しこう", meaning: "thử nghiệm" },
  { stt: 150, kanji: "視察", yomi: "しさつ", meaning: "thị sát" },
  { stt: 151, kanji: "辞退", yomi: "じたい", meaning: "từ chức / từ chối" },
  { stt: 152, kanji: "指摘", yomi: "してき", meaning: "chỉ trích" },
  { stt: 153, kanji: "自慢", yomi: "じまん", meaning: "tự mãn" },
  { stt: 154, kanji: "謝罪", yomi: "しゃざい", meaning: "tạ tội" },
  { stt: 155, kanji: "謝絶", yomi: "しゃぜつ", meaning: "cự tuyệt / từ chối" },
  { stt: 156, kanji: "修行", yomi: "しゅぎょう", meaning: "tu nghiệp / tu hành" },
  { stt: 157, kanji: "主張", yomi: "しゅちょう", meaning: "chủ trương" },
  { stt: 158, kanji: "主導", yomi: "しゅどう", meaning: "chủ đạo" },
  { stt: 159, kanji: "樹立", yomi: "じゅりつ", meaning: "thành lập" },
  { stt: 160, kanji: "助言", yomi: "じょげん", meaning: "lời khuyên" },
  { stt: 161, kanji: "処罰", yomi: "しょばつ", meaning: "xử phạt" },
  { stt: 162, kanji: "署名", yomi: "しょめい", meaning: "chữ kí / đề tên" },
  { stt: 163, kanji: "所有", yomi: "しょゆう", meaning: "sở hữu" },
  { stt: 164, kanji: "是正", yomi: "ぜせい", meaning: "sửa cho đúng" },
  { stt: 165, kanji: "訴訟", yomi: "そしょう", meaning: "kiện tụng / thưa kiện" },
  { stt: 166, kanji: "打開", yomi: "だかい", meaning: "công phá / vượt qua" },
  { stt: 167, kanji: "妥協", yomi: "だきょう", meaning: "thỏa hiệp" },
  { stt: 168, kanji: "把握", yomi: "はあく", meaning: "nắm bắt" },
  { stt: 169, kanji: "派遣", yomi: "はけん", meaning: "phái cử" },
  { stt: 170, kanji: "避難", yomi: "ひなん", meaning: "lánh nạn / tị nạn" },
  { stt: 171, kanji: "非難", yomi: "ひなん", meaning: "chỉ trích / phê bình" },
  { stt: 172, kanji: "披露", yomi: "ひろう", meaning: "công khai / tuyên bố" },
  { stt: 173, kanji: "疲労", yomi: "ひろう", meaning: "mệt mỏi" },
  { stt: 174, kanji: "普及", yomi: "ふきゅう", meaning: "phổ biến / phổ cập" },
  { stt: 175, kanji: "負傷", yomi: "ふしょう", meaning: "bị thương" },
  { stt: 176, kanji: "侮辱", yomi: "ぶじょく", meaning: "lăng mạ / sỉ nhục" },
  { stt: 177, kanji: "負担", yomi: "ふたん", meaning: "gánh vác" },
  { stt: 178, kanji: "赴任", yomi: "ふにん", meaning: "nhận chức" },
  { stt: 179, kanji: "腐敗", yomi: "ふはい", meaning: "phân hủy / thối nát / mục nát" },
  { stt: 180, kanji: "扶養", yomi: "ふよう", meaning: "cấp dưỡng" },
  { stt: 181, kanji: "保管", yomi: "ほかん", meaning: "bảo quản" },
  { stt: 182, kanji: "補充", yomi: "ほじゅう", meaning: "bổ sung" },
  { stt: 183, kanji: "保障", yomi: "ほしょう", meaning: "bảo đảm" },
  { stt: 184, kanji: "補償", yomi: "ほしょう", meaning: "bồi thường" },
  { stt: 185, kanji: "募集", yomi: "ぼしゅう", meaning: "chiêu mộ / tuyển tập" },
  { stt: 186, kanji: "摩擦", yomi: "まさつ", meaning: "ma sát" },
  { stt: 187, kanji: "矛盾", yomi: "むじゅん", meaning: "mâu thuẫn / bất hòa" },
  { stt: 188, kanji: "模索", yomi: "もさく", meaning: "tìm kiếm / dò dẫm" },
  { stt: 189, kanji: "移住", yomi: "いじゅう", meaning: "di trú" },
  { stt: 190, kanji: "依存", yomi: "いぞん", meaning: "dựa vào / phụ thuộc" },
  { stt: 191, kanji: "異動", yomi: "いどう", meaning: "dời chỗ" },
  { stt: 192, kanji: "化合", yomi: "かごう", meaning: "hợp chất hóa học" },
  { stt: 193, kanji: "加入", yomi: "かにゅう", meaning: "gia nhập" },
  { stt: 194, kanji: "議決", yomi: "ぎけつ", meaning: "nghị quyết" },
  { stt: 195, kanji: "記述", yomi: "きじゅつ", meaning: "viết / mô tả" },
  { stt: 196, kanji: "寄贈", yomi: "きぞう", meaning: "tặng / biếu" },
  { stt: 197, kanji: "規定", yomi: "きてい", meaning: "quy định" },
  { stt: 198, kanji: "居住", yomi: "きょじゅう", meaning: "cư trú / sinh sống" },
  { stt: 199, kanji: "拒絶", yomi: "きょぜつ", meaning: "cự tuyệt / từ chối" },
  { stt: 200, kanji: "許容", yomi: "きょよう", meaning: "chấp nhận / cho phép" },
  { stt: 201, kanji: "区画", yomi: "くかく", meaning: "khu đất / ngăn chia" },
  { stt: 202, kanji: "護衛", yomi: "ごえい", meaning: "bảo vệ / hộ tống" },
  { stt: 203, kanji: "死刑", yomi: "しけい", meaning: "tử hình" },
  { stt: 204, kanji: "辞職", yomi: "じしょく", meaning: "từ chức" },
  { stt: 205, kanji: "持続", yomi: "じぞく", meaning: "tiếp tục / kéo dài" },
  { stt: 206, kanji: "志望", yomi: "しぼう", meaning: "nguyện vọng" },
  { stt: 207, kanji: "始末", yomi: "しまつ", meaning: "kết cục / tiết kiệm" },
  { stt: 208, kanji: "主催", yomi: "しゅさい", meaning: "tổ chức / chủ trì" },
  { stt: 209, kanji: "取材", yomi: "しゅざい", meaning: "lấy thông tin" },
  { stt: 210, kanji: "所属", yomi: "しょぞく", meaning: "thuộc về" },
  { stt: 211, kanji: "除外", yomi: "じょがい", meaning: "ngoại trừ" },
  { stt: 212, kanji: "徐行", yomi: "じょこう", meaning: "giảm tốc độ / hãm lại" },
  { stt: 213, kanji: "処分", yomi: "しょぶん", meaning: "xử lý / vứt bỏ" },
  { stt: 214, kanji: "自立", yomi: "じりつ", meaning: "tự lập" },
  { stt: 215, kanji: "指令", yomi: "しれい", meaning: "mệnh lệnh / chỉ thị" },
  { stt: 216, kanji: "妥結", yomi: "だけつ", meaning: "thỏa thuận" },
  { stt: 217, kanji: "貯蓄", yomi: "ちょちく", meaning: "tiết kiệm (tiền)" },
  { stt: 218, kanji: "治療", yomi: "ちりょう", meaning: "điều trị" },
  { stt: 219, kanji: "破壊", yomi: "はかい", meaning: "phá hoại" },
  { stt: 220, kanji: "破損", yomi: "はそん", meaning: "hư tổn" },
  { stt: 221, kanji: "破裂", yomi: "はれつ", meaning: "phá vỡ" },
  { stt: 222, kanji: "悲観", yomi: "ひかん", meaning: "bi quan" },
  { stt: 223, kanji: "否決", yomi: "ひけつ", meaning: "phủ quyết" },
  { stt: 224, kanji: "微笑", yomi: "びしょう", meaning: "mỉm cười" },
  { stt: 225, kanji: "比例", yomi: "ひれい", meaning: "tỉ lệ" },
  { stt: 226, kanji: "布告", yomi: "ふこく", meaning: "tuyên bố / bố cáo" },
  { stt: 227, kanji: "武装", yomi: "ぶそう", meaning: "vũ trang" },
  { stt: 228, kanji: "捕獲", yomi: "ほかく", meaning: "giành được / bắt được" },
  { stt: 229, kanji: "補給", yomi: "ほきゅう", meaning: "cung cấp thêm" },
  { stt: 230, kanji: "募金", yomi: "ぼきん", meaning: "tiền quyên góp" },
  { stt: 231, kanji: "舗装", yomi: "ほそう", meaning: "lát đường" },
  { stt: 232, kanji: "補足", yomi: "ほそく", meaning: "bổ sung" },
  { stt: 233, kanji: "保養", yomi: "ほよう", meaning: "bảo dưỡng" },
  { stt: 234, kanji: "模倣", yomi: "もほう", meaning: "mô phỏng" },
  { stt: 235, kanji: "預金", yomi: "よきん", meaning: "tiền gửi ngân hàng" },
  { stt: 236, kanji: "予言", yomi: "よげん", meaning: "nói trước / điềm báo trước" },
  { stt: 237, kanji: "移植", yomi: "いしょく", meaning: "cấy / ghép" },
  { stt: 238, kanji: "遺伝", yomi: "いでん", meaning: "di truyền" },
  { stt: 239, kanji: "会釈", yomi: "えしゃく", meaning: "cúi đầu / cúi chào" },
  { stt: 240, kanji: "祈願", yomi: "きがん", meaning: "nguyện cầu / cầu khấn" },
  { stt: 241, kanji: "棄却", yomi: "ききゃく", meaning: "bác bỏ" },
  { stt: 242, kanji: "偽装", yomi: "ぎそう", meaning: "ngụy trang / cải trang" },
  { stt: 243, kanji: "解毒", yomi: "げどく", meaning: "giải độc" },
  { stt: 244, kanji: "懸念", yomi: "けねん", meaning: "lo lắng" },
  { stt: 245, kanji: "下落", yomi: "げらく", meaning: "sụt giảm" },
  { stt: 246, kanji: "個室", yomi: "こしつ", meaning: "phòng riêng" },
  { stt: 247, kanji: "挫折", yomi: "ざせつ", meaning: "sụp đổ / thất bại" },
  { stt: 248, kanji: "左遷", yomi: "させん", meaning: "giáng chức" },
  { stt: 249, kanji: "作動", yomi: "さどう", meaning: "tác động" },
  { stt: 250, kanji: "自炊", yomi: "じすい", meaning: "tự nấu" },
  { stt: 251, kanji: "自重", yomi: "じちょう", meaning: "tự trọng" },
  { stt: 252, kanji: "遮断", yomi: "しゃだん", meaning: "ngắt / làm gián đoạn" },
  { stt: 253, kanji: "授与", yomi: "じゅよ", meaning: "trao tặng" },
  { stt: 254, kanji: "受領", yomi: "じゅりょう", meaning: "nhận lãnh" },
  { stt: 255, kanji: "是認", yomi: "ぜにん", meaning: "tán thành / chấp nhận" },
  { stt: 256, kanji: "疎外", yomi: "そがい", meaning: "xa lánh / ghẻ lạnh" },
  { stt: 257, kanji: "阻害", yomi: "そがい", meaning: "cản trở / trở ngại" },
  { stt: 258, kanji: "遅延", yomi: "ちえん", meaning: "trì hoãn" },
  { stt: 259, kanji: "波及", yomi: "はきゅう", meaning: "lan rộng" },
  { stt: 260, kanji: "破綻", yomi: "はたん", meaning: "sụp đổ / phá sản" },
  { stt: 261, kanji: "破滅", yomi: "はめつ", meaning: "tiêu tan / đổ nát" },
  { stt: 262, kanji: "批准", yomi: "ひじゅん", meaning: "phê chuẩn" },
  { stt: 263, kanji: "浮上", yomi: "ふじょう", meaning: "nổi lên / trồi lên" },
  { stt: 264, kanji: "魅惑", yomi: "みわく", meaning: "quyến rũ / mê hoặc" },
  { stt: 265, kanji: "癒着", yomi: "ゆちゃく", meaning: "dính chặt / liền lại" },
  { stt: 266, kanji: "由来", yomi: "ゆらい", meaning: "nguồn gốc / gốc gác" },
];

const SOURCE_NAMES = {
  1: "Bai1_徹底トレーニング_語彙N1.md",
  2: "Bai2 - 徹底トレーニング語彙N1_Bai2.csv",
};

const VOCAB_BAI1 = VOCAB_BAI1_RAW.map((w) => ({ ...w, bai: 1, source: SOURCE_NAMES[1] }));
const VOCAB_BAI2 = VOCAB_BAI2_RAW.map((w) => ({ ...w, bai: 2, source: SOURCE_NAMES[2] }));
const VOCAB_ALL = [...VOCAB_BAI1, ...VOCAB_BAI2];
const VOCAB_BY_STT = new Map(VOCAB_ALL.map((w) => [w.stt, w]));

// 間違えた単語はSTT番号だけをlocalStorageに保存し、フラッシュカード復習に使う
const WRONG_WORDS_KEY = "n1QuizWrongWords";

function loadWrongStts() {
  try {
    const raw = JSON.parse(localStorage.getItem(WRONG_WORDS_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function addWrongStt(stt) {
  const set = new Set(loadWrongStts());
  set.add(stt);
  localStorage.setItem(WRONG_WORDS_KEY, JSON.stringify([...set]));
}

function removeWrongStt(stt) {
  const set = new Set(loadWrongStts());
  set.delete(stt);
  localStorage.setItem(WRONG_WORDS_KEY, JSON.stringify([...set]));
}

function getWrongWords() {
  return loadWrongStts()
    .map((stt) => VOCAB_BY_STT.get(stt))
    .filter(Boolean);
}

const QUESTION_TYPES = ["kanji-yomi", "kanji-meaning", "meaning-kanji"];
const TYPE_LABEL = {
  "kanji-yomi": "漢字 → 読み方",
  "kanji-meaning": "漢字 → 意味（ベトナム語）",
  "meaning-kanji": "ベトナム語 → 漢字",
};

let selectedRange = "both";
let selectedCount = 5;
let selectedType = "mixed";
let quizItems = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let history = [];

let fcQueue = [];
let fcTotal = 0;
let fcKnownCount = 0;
let fcFlipped = false;

const RANGE_POOL = {
  bai1: VOCAB_BAI1,
  bai2: VOCAB_BAI2,
  both: VOCAB_ALL,
};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const flashcardScreen = document.getElementById("flashcard-screen");
const ALL_SCREENS = [startScreen, quizScreen, resultScreen, flashcardScreen];

function showScreen(screen) {
  ALL_SCREENS.forEach((s) => s.classList.toggle("hidden", s !== screen));
}

const rangeOptions = document.getElementById("range-options");
const countOptions = document.getElementById("count-options");
const typeOptions = document.getElementById("type-options");
const startBtn = document.getElementById("start-btn");
const allCountBtn = countOptions.querySelector('[data-count="all"]');

const flashcardEntry = document.getElementById("flashcard-entry");
const flashcardEntryText = document.getElementById("flashcard-entry-text");
const flashcardEntryBtn = document.getElementById("flashcard-entry-btn");

const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const questionLabel = document.getElementById("question-label");
const questionText = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const feedbackResult = document.getElementById("feedback-result");
const feedbackExplain = document.getElementById("feedback-explain");
const nextBtn = document.getElementById("next-btn");

const resultScore = document.getElementById("result-score");
const resultList = document.getElementById("result-list");
const reviewMistakesBtn = document.getElementById("review-mistakes-btn");
const retryBtn = document.getElementById("retry-btn");

const fcProgress = document.getElementById("flashcard-progress");
const fcCard = document.getElementById("flashcard");
const fcKanji = document.getElementById("flashcard-kanji");
const fcYomi = document.getElementById("flashcard-yomi");
const fcMeaning = document.getElementById("flashcard-meaning");
const fcSource = document.getElementById("flashcard-source");
const fcActions = document.getElementById("flashcard-actions");
const fcAgainBtn = document.getElementById("fc-again-btn");
const fcKnownBtn = document.getElementById("fc-known-btn");
const fcComplete = document.getElementById("flashcard-complete");
const fcCompleteText = document.getElementById("flashcard-complete-text");
const fcExitBtn = document.getElementById("fc-exit-btn");

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setupOptionGroup(container, dataAttr, onSelect, defaultValue) {
  const buttons = container.querySelectorAll(".option-btn");
  buttons.forEach((btn) => {
    if (btn.dataset[dataAttr] === String(defaultValue)) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      onSelect(btn.dataset[dataAttr]);
    });
  });
}

function updateAllCountLabel() {
  allCountBtn.textContent = `全${RANGE_POOL[selectedRange].length}問`;
}

setupOptionGroup(rangeOptions, "range", (v) => {
  selectedRange = v;
  updateAllCountLabel();
}, "both");
setupOptionGroup(countOptions, "count", (v) => (selectedCount = v), "5");
setupOptionGroup(typeOptions, "type", (v) => (selectedType = v), "mixed");

updateAllCountLabel();

startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", () => {
  showScreen(startScreen);
  refreshFlashcardEntry();
});

function buildQuestion(word, type, pool) {
  const others = pool.filter((w) => w.stt !== word.stt);

  if (type === "kanji-yomi") {
    const distractors = shuffle(others.filter((w) => w.yomi !== word.yomi)).slice(0, 3);
    const choices = shuffle([word, ...distractors]).map((w) => w.yomi);
    return {
      type,
      prompt: word.kanji,
      correctAnswer: word.yomi,
      choices,
      word,
    };
  }

  if (type === "kanji-meaning") {
    const distractors = shuffle(others.filter((w) => w.meaning !== word.meaning)).slice(0, 3);
    const choices = shuffle([word, ...distractors]).map((w) => w.meaning);
    return {
      type,
      prompt: word.kanji,
      correctAnswer: word.meaning,
      choices,
      word,
    };
  }

  // meaning-kanji
  const distractors = shuffle(others.filter((w) => w.kanji !== word.kanji)).slice(0, 3);
  const choices = shuffle([word, ...distractors]).map((w) => w.kanji);
  return {
    type,
    prompt: word.meaning,
    correctAnswer: word.kanji,
    choices,
    word,
  };
}

function startQuiz() {
  const pool = RANGE_POOL[selectedRange];
  const count = selectedCount === "all" ? pool.length : parseInt(selectedCount, 10);
  const words = shuffle(pool).slice(0, count);

  quizItems = words.map((word) => {
    const type = selectedType === "mixed"
      ? QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)]
      : selectedType;
    return buildQuestion(word, type, pool);
  });

  currentIndex = 0;
  score = 0;
  history = [];

  showScreen(quizScreen);

  renderQuestion();
}

function renderQuestion() {
  answered = false;
  feedbackEl.classList.add("hidden");

  const item = quizItems[currentIndex];
  const total = quizItems.length;

  progressFill.style.width = `${(currentIndex / total) * 100}%`;
  progressText.textContent = `問題 ${currentIndex + 1} / ${total}`;

  questionLabel.textContent = TYPE_LABEL[item.type];
  questionText.textContent = item.prompt;

  choicesEl.innerHTML = "";
  item.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, choice));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(button, choice) {
  if (answered) return;
  answered = true;

  const item = quizItems[currentIndex];
  const isCorrect = choice === item.correctAnswer;

  if (isCorrect) score++;

  Array.from(choicesEl.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === item.correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  const w = item.word;
  if (!isCorrect) {
    addWrongStt(w.stt);
  }

  feedbackResult.textContent = isCorrect ? "正解！" : "不正解";
  feedbackResult.className = `feedback-result ${isCorrect ? "correct" : "wrong"}`;
  feedbackExplain.textContent =
    `${w.kanji}（${w.yomi}）= ${w.meaning}　` +
    `【${w.source} STT ${w.stt}番より】`;
  feedbackEl.classList.remove("hidden");

  history.push({
    prompt: item.prompt,
    typeLabel: TYPE_LABEL[item.type],
    correctAnswer: item.correctAnswer,
    userAnswer: choice,
    isCorrect,
    word: w,
  });

  nextBtn.textContent = currentIndex === quizItems.length - 1 ? "結果を見る" : "次へ";
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < quizItems.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  progressFill.style.width = "100%";
  showScreen(resultScreen);

  resultScore.textContent = `${score} / ${quizItems.length} 問正解`;

  resultList.innerHTML = "";
  history.forEach((h, idx) => {
    const div = document.createElement("div");
    div.className = `result-item ${h.isCorrect ? "correct" : "wrong"}`;
    div.innerHTML = `
      <div class="r-question">問${idx + 1}（${h.typeLabel}）: ${h.prompt}</div>
      <div class="r-answer">
        あなたの答え: ${h.userAnswer} ${h.isCorrect ? "" : `／ 正解: ${h.correctAnswer}`}
        — ${h.word.kanji}（${h.word.yomi}）= ${h.word.meaning}
        【${h.word.source} STT ${h.word.stt}番より】
      </div>
    `;
    resultList.appendChild(div);
  });

  const roundMistakes = [...new Map(
    history.filter((h) => !h.isCorrect).map((h) => [h.word.stt, h.word])
  ).values()];

  reviewMistakesBtn.classList.toggle("hidden", roundMistakes.length === 0);
  reviewMistakesBtn.textContent = `今回間違えた単語をフラッシュカードで復習する（${roundMistakes.length}語）`;
  reviewMistakesBtn.onclick = () => startFlashcards(roundMistakes);

  refreshFlashcardEntry();
}

// ===== フラッシュカード =====

function refreshFlashcardEntry() {
  const words = getWrongWords();
  flashcardEntry.classList.toggle("hidden", words.length === 0);
  flashcardEntryText.textContent = `📇 苦手単語: ${words.length}語が復習待ちです`;
}

flashcardEntryBtn.addEventListener("click", () => startFlashcards(getWrongWords()));

function startFlashcards(words) {
  if (words.length === 0) return;
  fcQueue = shuffle(words);
  fcTotal = fcQueue.length;
  fcKnownCount = 0;

  fcComplete.classList.add("hidden");
  fcCard.classList.remove("hidden");
  fcActions.classList.remove("hidden");
  fcExitBtn.classList.remove("hidden");

  showScreen(flashcardScreen);
  renderFlashcard();
}

function renderFlashcard() {
  if (fcQueue.length === 0) {
    fcCard.classList.add("hidden");
    fcActions.classList.add("hidden");
    fcProgress.textContent = "";
    fcComplete.classList.remove("hidden");
    fcCompleteText.textContent = `お疲れさまでした！ ${fcKnownCount} / ${fcTotal} 語を覚えました。`;
    refreshFlashcardEntry();
    return;
  }

  fcFlipped = false;
  fcCard.classList.remove("flipped");
  fcActions.classList.add("hidden");

  const w = fcQueue[0];
  fcProgress.textContent = `覚えた ${fcKnownCount} / ${fcTotal}　（残り ${fcQueue.length} 枚）`;
  fcKanji.textContent = w.kanji;
  fcYomi.textContent = w.yomi;
  fcMeaning.textContent = w.meaning;
  fcSource.textContent = `【${w.source} STT ${w.stt}番より】`;
}

fcCard.addEventListener("click", () => {
  if (fcQueue.length === 0) return;
  fcFlipped = !fcFlipped;
  fcCard.classList.toggle("flipped", fcFlipped);
  if (fcFlipped) {
    fcActions.classList.remove("hidden");
  }
});

fcAgainBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const w = fcQueue.shift();
  fcQueue.push(w);
  renderFlashcard();
});

fcKnownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const w = fcQueue.shift();
  fcKnownCount++;
  removeWrongStt(w.stt);
  renderFlashcard();
});

fcExitBtn.addEventListener("click", () => {
  showScreen(startScreen);
  refreshFlashcardEntry();
});

refreshFlashcardEntry();
