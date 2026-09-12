import { IMG } from "./data";
import type { SisAnswer, SisQA, ComboStep, ComboProduct } from "./sisEngine";

// ── Static Q&A bank (edit here to add more questions) ──────────────
export const sisQuestions: SisQA[] = [
  {
    id: "combo",
    question: "Gợi ý combo sản phẩm Hella phù hợp với tôi",
    keywords: ["combo", "goi y combo", "phu hop", "ca nhan hoa", "suggestion"],
    suggested: true,
    flow: "combo",
  },
  {
    id: "tips-tay-te-bao",
    question: "Tips dùng tẩy tế bào chết",
    keywords: ["tay te bao chet", "tay te bao", "scrub", "tips"],
    suggested: true,
    answer: {
      text: [
        "Bạn chỉ nên tẩy tế bào chết body 2–3 lần/tuần thôi nhé, lạm dụng dễ làm da khô.",
        "Massage nhẹ nhàng theo vòng tròn trên da còn ẩm, tập trung vùng khuỷu tay, đầu gối và gót chân.",
        "Sau khi tẩy, khoá ẩm ngay bằng body lotion để da mềm mượt và sáng đều hơn.",
      ],
      products: [
        {
          title: "Tẩy Tế Bào Chết Body cà phê Hella Beauty 500g",
          image: `${IMG}/collection_list_6b_1.png`,
          href: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g",
        },
      ],
      links: [
        { label: "Website", url: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g", icon: "web" },
        { label: "Shopee", url: "https://www.google.com/search?client=safari&rls=en&q=Hella+beauty+shopee&ie=UTF-8&oe=UTF-8", icon: "shopee" },
        { label: "TikTok Shop", url: "https://shop.tiktok.com/vn/k/hella-beauty", icon: "tiktok" },
      ],
    },
  },
  {
    id: "bodymist-vibe",
    question: "Mùi hương bodymist nào hợp vibe tôi?",
    keywords: ["bodymist", "body mist", "mui huong", "huong", "vibe", "scent"],
    suggested: true,
    answer: {
      text: [
        "Mỗi vibe của bạn sẽ hợp một tầng hương riêng đó!",
        "Thanh lịch & trong trẻo → hương hoa cỏ nhẹ nhàng. Ngọt ngào nữ tính → hương trái cây hoa ngọt. Cá tính → hương gỗ/musk. Sang trọng → hương phương Đông ấm áp.",
        "Bạn thử chọn “Gợi ý combo…” để Hella Sis pick chuẩn mùi theo vibe của bạn nha! ✦",
      ],
    },
  },
  {
    id: "body-lotion",
    question: "Công dụng của việc xài body lotion",
    keywords: ["body lotion", "lotion", "duong am", "duong the", "cong dung"],
    suggested: true,
    answer: {
      text: [
        "Body lotion giúp cấp ẩm, làm mềm mịn và phục hồi hàng rào bảo vệ da.",
        "Thoa ngay sau khi tắm lúc da còn hơi ẩm để khoá ẩm tốt nhất.",
        "Dùng đều mỗi ngày, da body sẽ mịn màng và sáng khoẻ hơn hẳn.",
      ],
    },
  },
  {
    id: "dau-goi",
    question: "Hella Beauty có dầu gội đầu không?",
    keywords: ["dau goi", "goi dau", "cham soc toc", "toc", "shampoo"],
    suggested: true,
    answer: {
      text: [
        "Có nha! Hella Beauty có bộ chăm sóc tóc không chứa Sulfate, Silicone & PEG.",
        "Phù hợp cho mái tóc cần nhẹ dịu, sạch sâu mà vẫn mềm mượt óng ả.",
      ],
      links: [
        { label: "Website", url: "/collections/cham-soc-toc", icon: "web" },
        { label: "Shopee", url: "https://www.google.com/search?client=safari&rls=en&q=Hella+beauty+shopee&ie=UTF-8&oe=UTF-8", icon: "shopee" },
        { label: "TikTok Shop", url: "https://shop.tiktok.com/vn/k/hella-beauty", icon: "tiktok" },
      ],
    },
  },
  {
    id: "daily-scent",
    question: "Làm sao chọn mùi hương dùng hằng ngày?",
    keywords: ["mui huong hang ngay", "chon mui huong", "mui nao", "luu huong", "bodymist hang ngay"],
    suggested: true,
    answer: {
      text: [
        "Hella Sis hiểu điều bạn đang tìm rồi nè. Nếu bạn muốn chọn một mùi hương phù hợp để sử dụng hằng ngày, mình nghĩ bạn không nhất thiết phải bắt đầu từ một “vibe” cố định đâu. Mùi hương phù hợp thường sẽ phụ thuộc vào sở thích cá nhân, hoàn cảnh sử dụng, mức độ đậm nhẹ bạn cảm thấy thoải mái và cảm giác bạn muốn có khi dùng sản phẩm.",
        "Bạn có thể bắt đầu bằng việc để ý xem mình thường thích những mùi nhẹ và dễ chịu, ngọt hơn một chút, tươi mát hay có cảm giác ấm và nổi bật hơn. Sau đó, hãy cân nhắc thêm việc bạn định dùng mùi hương chủ yếu khi đi học, đi làm, đi chơi hay sử dụng hằng ngày, vì mỗi hoàn cảnh có thể phù hợp với một mức độ lưu hương và độ nổi bật khác nhau.",
        "Ngoài ra, cảm nhận về mùi hương cũng khá cá nhân, nên một mùi được nhiều người yêu thích chưa chắc đã là lựa chọn phù hợp nhất với bạn. Nếu có thể, bạn nên ưu tiên những lựa chọn khiến bạn cảm thấy thoải mái, dễ sử dụng và phù hợp với thói quen của mình, thay vì chỉ chọn theo xu hướng. Nếu bạn muốn, Hella Sis có thể hỏi thêm một vài câu về mùi bạn thường thích, thời điểm bạn hay sử dụng và mức độ lưu hương mong muốn, rồi từ đó gợi ý một số sản phẩm Hella phù hợp hơn để bạn tham khảo nha.",
      ],
    },
  },
  {
    id: "rough-body-skin",
    question: "Da body hơi sần thì nên chăm sóc thế nào?",
    keywords: ["da san", "body san", "da khong qua kho", "routine da san", "tay te bao chet san"],
    suggested: true,
    answer: {
      text: [
        "Chào bạn, Hella Sis hiểu điều bạn đang băn khoăn nè. Nếu da không quá khô nhưng bị sần ở một số vùng, bạn có thể bắt đầu với routine đơn giản: làm sạch nhẹ nhàng → tẩy tế bào chết với tần suất vừa phải → dưỡng ẩm đều đặn.",
        "Khi scrub, nên tập trung nhẹ vào vùng sần thay vì chà mạnh toàn bộ body, vì chà nhiều hơn không đồng nghĩa với hiệu quả tốt hơn đâu nha. Bạn cũng có thể để ý xem tình trạng sần thay đổi theo thời tiết, sản phẩm đang dùng hoặc tần suất tẩy tế bào chết không.",
        "Nếu bạn muốn, Hella Sis có thể hỏi thêm 2–3 câu về tình trạng da và routine hiện tại, rồi gợi ý routine hoặc sản phẩm Hella phù hợp để bạn tham khảo.",
      ],
    },
  },
  {
    id: "scrub-irritation",
    question: "Da bị đỏ sau khi dùng scrub có sao không?",
    keywords: ["da do", "do sau scrub", "rat", "ngua", "sung", "kich ung scrub", "scrub do da"],
    suggested: true,
    answer: {
      text: [
        "Cảm ơn bạn đã chia sẻ, Hella Sis hiểu bạn sẽ hơi lo khi thấy da đỏ sau khi dùng sản phẩm. Da có thể đỏ nhẹ trong thời gian ngắn nếu bạn massage hơi mạnh, dùng scrub quá lâu hoặc da đang nhạy cảm. Tuy nhiên, nếu tình trạng đỏ đi kèm với rát, ngứa, sưng hoặc kéo dài, bạn nên ngưng sử dụng và theo dõi thêm nhé.",
        "Lần sau, bạn có thể thử massage nhẹ hơn trên da ướt, không chà quá lâu và giảm tần suất xuống khoảng 1–2 lần/tuần. Sau đó nhớ dưỡng ẩm để da dễ chịu hơn nha.",
        "Nếu bạn cho Hella Sis biết da bạn thuộc kiểu khô, dầu hay nhạy cảm và bạn thường scrub trong bao lâu, mình có thể giúp bạn xem lại cách dùng phù hợp hơn với routine của bạn.",
      ],
    },
  },
];

export const sisFallback: SisAnswer = {
  text: [
    "Hella Sis chưa có câu trả lời cho câu này, bạn thử một trong các gợi ý bên dưới nhé! ✦",
  ],
};

// ── Combo wizard steps (Solution 1.1) ─────────────────────────────
export const comboSteps: ComboStep[] = [
  {
    id: "vibe",
    question: "Hiện tại bạn đang theo đuổi Vibe như thế nào?",
    options: [
      { id: "thanh-lich", label: "Thanh Lịch" },
      { id: "ngot-ngao", label: "Ngọt Ngào Nữ Tính" },
      { id: "ca-tinh", label: "Cá Tính" },
      { id: "thanh-mat", label: "Thanh Mát Trong Trẻo" },
      { id: "sang-trong", label: "Sang trọng quý phái" },
    ],
  },
  {
    id: "skin",
    question: "Loại da body của bạn là gì?",
    options: [
      { id: "da-kho", label: "Da khô" },
      { id: "da-dau", label: "Da dầu" },
      { id: "da-thuong", label: "Da bình thường" },
      { id: "da-hon-hop", label: "Da hỗn hợp" },
    ],
  },
  {
    id: "goals",
    question: "Bạn mong muốn combo này hỗ trợ bạn điều gì?",
    multi: true,
    maxSelect: 3,
    options: [
      { id: "trang-body", label: "Làm trắng da body" },
      { id: "mem-body", label: "Làm mềm mịn da body" },
      { id: "luu-huong", label: "Lưu hương lâu và thơm hằng ngày" },
      { id: "sach-body", label: "Làm sạch da body" },
      { id: "cham-soc-toc", label: "Chăm sóc tóc" },
      { id: "sach-da-mat", label: "Làm sạch da mặt" },
      { id: "trang-da-mat", label: "Dưỡng trắng mờ thâm da mặt" },
      { id: "khac", label: "Khác" },
    ],
  },
];

// ── Combo catalog + mappings (edit here to change combos) ─────────
export const comboCatalog: ComboProduct[] = [
  { id: "ttbc-body", title: "Tẩy Tế Bào Chết Body cà phê Hella Beauty 500g", category: "tay-te-bao-body", image: `${IMG}/collection_list_6b_1.png`, href: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g" },
  { id: "sua-tam", title: "Sữa tắm dưỡng ẩm Hella Beauty", category: "sua-tam", image: `${IMG}/collection_list_6b_2.png`, href: "#" },
  { id: "body-lotion", title: "Body Lotion dưỡng ẩm mềm mịn Hella Beauty", category: "body-lotion", image: `${IMG}/collection_list_2.png`, href: "#" },
  { id: "kem-body-trang", title: "Kem Body trắng da nâng tone Hella Beauty 200g", category: "duong-trang-body", image: `${IMG}/collection_list_1.png`, href: "/products/kem-body-trang-da-nang-tone-tuc-thi-hella-beauty-200g" },
  { id: "mat-na-nghe", title: "Mặt nạ nghệ dưỡng trắng Hella Beauty", category: "mat-na", image: `${IMG}/collection_list_4.png`, href: "#" },
  { id: "sua-rua-mat", title: "Sữa rửa mặt dịu nhẹ Hella Beauty", category: "sua-rua-mat", image: `${IMG}/collection_list_3.png`, href: "#" },
  { id: "dau-goi", title: "Dầu gội chăm sóc tóc Hella Beauty", category: "cham-soc-toc", image: `${IMG}/shop_the_look_1.png`, href: "/collections/cham-soc-toc" },
  { id: "bm-hoaco", title: "Bodymist Hương Hoa Cỏ Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_3.png`, href: "#" },
  { id: "bm-ngot", title: "Bodymist Hương Trái Cây Ngọt Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_4.png`, href: "#" },
  { id: "bm-musk", title: "Bodymist Hương Gỗ Musk Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_1.png`, href: "#" },
  { id: "bm-phuongdong", title: "Bodymist Hương Phương Đông Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_2.png`, href: "#" },
];

export const goalToCategories: Record<string, string[]> = {
  "trang-body": ["duong-trang-body", "body-lotion"],
  "mem-body": ["body-lotion", "tay-te-bao-body"],
  "luu-huong": ["bodymist"],
  "sach-body": ["tay-te-bao-body", "sua-tam"],
  "cham-soc-toc": ["cham-soc-toc"],
  "sach-da-mat": ["sua-rua-mat", "mat-na"],
  "trang-da-mat": ["mat-na"],
  "khac": ["body-lotion"],
};

// vibe → signature bodymist product id (every combo gets a scent by vibe)
export const vibeToScent: Record<string, string> = {
  "thanh-lich": "bm-hoaco",
  "ngot-ngao": "bm-ngot",
  "ca-tinh": "bm-musk",
  "thanh-mat": "bm-hoaco",
  "sang-trong": "bm-phuongdong",
};
