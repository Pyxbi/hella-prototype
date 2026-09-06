// Hella Beauty factory ("Nhà máy") — real content from provided assets. Hardcoded.
export const FACTORY_IMG = "/sites/hellabeauty-vn-ba054dbc/factory/images";

export const factoryImages = {
  exterior: `${FACTORY_IMG}/factory-exterior.png`,
  stats: `${FACTORY_IMG}/factory-stats.png`,
  team: `${FACTORY_IMG}/factory-team.png`,
  iso9001: `${FACTORY_IMG}/factory-iso9001.png`,
  years: `${FACTORY_IMG}/factory-9years.png`,
};

export const factoryIntro = {
  eyebrow: "Nhà máy Hella Beauty",
  title: "Vận hành theo các tiêu chuẩn quốc tế",
  body: [
    "Suốt hành trình 9 năm được vinh danh Hàng Việt Nam Chất Lượng Cao, Hella Beauty tự hào sở hữu nhà máy sản xuất mỹ phẩm đạt các tiêu chuẩn khắt khe của quốc tế.",
    "Mỗi sản phẩm đều được nghiên cứu, sản xuất và kiểm định trong quy trình khép kín — minh bạch từ nguyên liệu đến thành phẩm, để trao đến bạn sự an tâm trọn vẹn.",
  ],
};

export interface FactoryStat {
  value: string;
  label: string;
}

export const factoryStats: FactoryStat[] = [
  { value: "19.890", label: "m² tổng diện tích nhà máy" },
  { value: "9.929", label: "m² đất xây dựng" },
  { value: "2.951", label: "m² đất cây xanh" },
  { value: "810", label: "m² khu sản xuất mỹ phẩm" },
];

export interface FactoryCert {
  image: string;
  code: string;
  title: string;
}

export const factoryArticle = {
  title:
    "Hella Beauty & Khái Niệm “Minh Bạch Từ Nhà Máy”: Hành Trình Định Hình Tiêu Chuẩn Nữ Tính An Toàn Cho Phụ Nữ Việt",
  author: "MKT",
  date: "13/09/2026 04:46",
  comments: "0 Bình luận",
  heroCaption:
    "Nhà máy Hella Beauty được đầu tư bài bản, đáp ứng các tiêu chuẩn sản xuất mỹ phẩm khắt khe.",
  intro:
    "Giữa thị trường làm đẹp đa dạng nhưng đầy biến động, niềm tin của người tiêu dùng không còn dừng lại ở những lời quảng cáo bay bổng hay thiết kế bao bì bắt mắt. Với Hella Beauty, nét đẹp nữ tính đích thực phải được nâng niu từ những điều nguyên bản và minh bạch nhất. Đằng sau mỗi giọt tinh chất hay nốt hương dịu nhẹ chạm lên làn da nàng là cả một hệ thống vận hành đạt chuẩn quốc tế, nơi chất lượng và độ an toàn được đặt lên hàng đầu.",
  journey: {
    heading: "HÀNH TRÌNH KHỞI NGUỒN TỪ SỰ MINH BẠCH VÀ UY TÍN",
    paragraphs: [
      "Được thành lập với sứ mệnh đồng hành cùng phụ nữ hiện đại trên hành trình thấu hiểu và tôn vinh tính nữ cá nhân, Hella Beauty hiểu rằng làn da Việt cần những giải pháp chăm sóc thực sự lành tính, hiệu quả và phù hợp với khí hậu nội địa.",
      "Thay vì lựa chọn mô hình gia công đơn thuần, thương hiệu định hình bước đi bền vững ngay từ những ngày đầu bằng việc xây dựng nền tảng sản xuất vững chắc. Hành trình ấy là sự kết hợp giữa nghiên cứu khoa học, tâm huyết của đội ngũ chuyên gia và quy trình quản lý chất lượng nghiêm ngặt. Mỗi sản phẩm khi đến tay nàng không chỉ mang giá trị thẩm mỹ mà còn là lời cam kết trọn vẹn về sự an toàn.",
    ],
  },
  iso9001Caption:
    "Đội ngũ vận hành chuyên nghiệp tuân thủ nghiêm ngặt các quy chuẩn an toàn quốc tế.",
  certsSection: {
    heading: "BẢO CHỨNG VÀNG TỪ NHỮNG CHỨNG NHẬN QUỐC TẾ",
    intro:
      "Để một sản phẩm body care hay fragrance chạm tới làn da và cảm xúc của người dùng, toàn bộ quy trình từ khâu nhập nguyên liệu đầu vào, pha chế, đóng gói cho đến kiểm định thành phẩm đều phải đi qua những tiêu chí khắt khe nhất. Hella Beauty tự hào vận hành dựa trên hai tiêu chuẩn quốc tế cốt lõi:",
    items: [
      {
        code: "ISO 9001:2015",
        name: "Quality Management System",
        desc: "Hệ thống quản lý chất lượng toàn diện, đảm bảo mọi công đoạn vận hành đều đồng nhất, minh bạch và liên tục được cải tiến để mang lại trải nghiệm tối ưu.",
      },
      {
        code: "ISO 22716:2007",
        name: "Cosmetics – GMP",
        desc: "Tiêu chuẩn Thực hành tốt sản xuất mỹ phẩm quốc tế. Đây là bảo chứng vàng khẳng định môi trường sản xuất của Hella Beauty đạt chuẩn vệ sinh, vô trùng, kiểm soát tốt các rủi ro nhiễm khuẩn và an toàn tuyệt đối.",
      },
    ],
  },
  toGetHer: {
    heading: "“TO GET HER” TỰ TIN TRONG MỌI KHOẢNH KHẮC",
    paragraphs: [
      "Sự minh bạch về nguồn gốc và nền tảng nhà máy vững chắc chính là “điểm tựa” để Hella Beauty hiện thực hóa triết lý Nurture Her Femininity. Thông qua thông điệp TO GET HER, Hella không chỉ là một thương hiệu mỹ phẩm, mà còn là người bạn đồng hành (Together) giúp nàng chạm tới phiên bản tính nữ kiêu hãnh (To Get Her) của riêng mình.",
      "Khi không còn lo lắng về độ an toàn hay nguồn gốc xuất xứ, nàng có thể hoàn toàn thả lỏng, tận hưởng từng khoảnh khắc vỗ về làn da và tự tin tỏa sáng theo cách mình muốn.",
      "Khám phá ngay các dòng sản phẩm đạt chuẩn quốc tế của Hella Beauty để trải nghiệm sự chăm sóc an toàn và trọn vẹn nhất cho làn da bạn!",
    ],
    ctaLabel: "Khám phá sản phẩm",
    ctaHref: "/collections/cham-soc-da",
  },
};

export interface RelatedArticle {
  title: string;
  desc: string;
  image: string;
  href: string;
  tag: string;
}

export const relatedArticles: RelatedArticle[] = [
  {
    tag: "Top 5 Body Mist Mùa Hè 2026",
    title: "Top 5 body mist cho chuyến đi biển mùa hè 2026 không thể bỏ qua",
    desc: "Mùa hè là thời điểm của những chuyến du lịch biển, những bộ outfit rực rỡ và những bức ảnh…",
    image: "/sites/hellabeauty-vn-ba054dbc/ingredients/images/product-1.png",
    href: "/blogs/news",
  },
  {
    tag: "Tẩy Da Chết Bao Nhiêu Lần 1 Tuần",
    title: "Tẩy tế bào chết body bao nhiêu lần 1 tuần là đủ để da mịn đẹp?",
    desc: "Mỗi ngày, làn da cơ thể phải tiếp xúc với bụi bẩn, mồ hôi, tia UV và nhiều tác nhân…",
    image: "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/collection_list_6b_1.png",
    href: "/blogs/news",
  },
];

export const factoryCerts: FactoryCert[] = [
  {
    image: factoryImages.team,
    code: "ISO 22716:2007",
    title: "Thực hành sản xuất tốt (CGMP)",
  },
  {
    image: factoryImages.iso9001,
    code: "ISO 9001:2015",
    title: "Hệ thống quản lý chất lượng (QMS)",
  },
  {
    image: factoryImages.years,
    code: "9 Năm",
    title: "Hàng Việt Nam Chất Lượng Cao",
  },
];
