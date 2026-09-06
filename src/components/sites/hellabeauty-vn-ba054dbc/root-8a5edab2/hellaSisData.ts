import { IMG } from "./data";
import type { SisAnswer, SisQA, ComboStep, ComboProduct } from "./hellaSis";

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
        { label: "Shopee", url: "#", icon: "shopee" },
        { label: "TikTok Shop", url: "#", icon: "tiktok" },
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
        { label: "Shopee", url: "#", icon: "shopee" },
        { label: "TikTok Shop", url: "#", icon: "tiktok" },
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
