// Hella Buddy routine companion — hardcoded prototype data. Reuses existing product images.
const ROOT_IMG = "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images";
const COL_IMG = "/sites/hellabeauty-vn-ba054dbc/collections/images";

export type IconName =
  | "bodywash"
  | "scrub"
  | "face"
  | "hair"
  | "lotion"
  | "mist";

export interface FeatureTile {
  title: string;
  desc: string;
}

export const featureTiles: FeatureTile[] = [
  { title: "Lịch trình cá nhân hoá", desc: "Routine riêng được thiết kế chỉ dành cho bạn." },
  { title: "Nhắc nhở đúng lúc", desc: "Không bỏ lỡ bất kỳ bước nào trong routine." },
  { title: "Đồng hành & hỗ trợ", desc: "Theo dõi tiến trình cùng Hella Sis mỗi ngày." },
  { title: "Hiệu quả rõ rệt", desc: "Kiên trì đều đặn, thấy rõ sự khác biệt." },
];

export interface HerOption {
  id: string;
  title: string;
  desc: string;
}

export const herOptions: HerOption[] = [
  { id: "chin-chu", title: "HER chỉn chu", desc: "Thơm tho và sạch sẽ để luôn tự tin và sẵn sàng mỗi ngày." },
  { id: "nang-niu", title: "HER nâng niu", desc: "Tập trung dưỡng ẩm, làm mềm và chăm da kỹ hơn." },
  { id: "tuoi-moi", title: "HER tươi mới", desc: "Ưu tiên sự nhẹ nhàng, phục hồi và thoáng da." },
  { id: "vao-nep", title: "HER vào nếp", desc: "Chăm sóc trọn vẹn, chuyên sâu từ tóc đến body." },
];

export const frequencyStops = [
  "1 ngày / tuần",
  "2 ngày / tuần",
  "3–4 ngày / tuần",
  "5–6 ngày / tuần",
  "Gần như mỗi ngày",
];

export interface RoutineStep {
  id: string;
  label: string;
  icon: IconName;
  necessary?: boolean; // "*"
  mustHave?: boolean; // "must have"
  productImage: string; // shown when the step's product was bought
  suggestHref: string; // where to buy if not owned
}

export const routineSteps: RoutineStep[] = [
  { id: "tam-goi", label: "Tắm Gội", icon: "bodywash", necessary: true, productImage: `${COL_IMG}/da-1.jpg`, suggestHref: "/collections/cham-soc-da" },
  { id: "tay-tbc", label: "Tẩy tế bào chết", icon: "scrub", necessary: true, productImage: `${ROOT_IMG}/collection_list_6b_1.png`, suggestHref: "/collections/cham-soc-da" },
  { id: "da-mat", label: "Chăm sóc da mặt", icon: "face", mustHave: true, productImage: `${COL_IMG}/damat-1.jpg`, suggestHref: "/collections/cham-soc-da-mat" },
  { id: "cham-toc", label: "Chăm sóc tóc", icon: "hair", mustHave: true, productImage: `${COL_IMG}/toc-1.jpg`, suggestHref: "/collections/cham-soc-toc" },
  { id: "body-lotion", label: "Body Lotion", icon: "lotion", productImage: `${ROOT_IMG}/collection_list_2.png`, suggestHref: "/collections/cham-soc-da" },
  { id: "xit-thom", label: "Xịt thơm", icon: "mist", productImage: `${ROOT_IMG}/collection_list_6b_3.png`, suggestHref: "/collections/bo-suu-tap-bodymist" },
];

export interface OrderProduct {
  stepId: string;
  title: string;
  image: string;
}

// Simulated "orders found" — any code returns this sample order.
export const sampleOrderProducts: OrderProduct[] = [
  { stepId: "tam-goi", title: "Sữa tắm hương nước hoa Hella Beauty", image: `${COL_IMG}/da-1.jpg` },
  { stepId: "tay-tbc", title: "Tẩy tế bào chết body Hella Beauty", image: `${ROOT_IMG}/product.png` },
  { stepId: "da-mat", title: "Mặt nạ dưỡng da Hella Beauty", image: `${COL_IMG}/damat-1.jpg` },
  { stepId: "cham-toc", title: "Dầu gội chăm sóc tóc Hella Beauty", image: `${COL_IMG}/toc-1.jpg` },
];

export const channels = [
  { id: "shopee", label: "Shopee", icon: `${ROOT_IMG}/market_shopee.png` },
  { id: "tiktok", label: "TikTok Shop", icon: `${ROOT_IMG}/social_tiktok.png` },
  { id: "website", label: "Website", icon: null },
];

export interface BuddyAnswers {
  her: string[];
  frequency: number; // index into frequencyStops
  steps: string[]; // routine step ids
  period: "morning" | "evening";
  time: string; // e.g. "7:00 CH"
}
