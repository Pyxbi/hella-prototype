// Loyalty "Level Her Up" — hardcoded tiers + vouchers. Jar = 100 stars.
export const JAR_CAPACITY = 100;

export interface Voucher {
  id: string;
  label: string;
  brand: string;
  code: string;
  state: "available" | "used";
}

export interface Tier {
  id: string;
  name: string;
  range: string;
  meaning: string;
  rate: string;
  bonus: number; // bonus stars poured into the next jar on completion
  color: string; // tier accent
  vouchers: Voucher[];
}

export const tiers: Tier[] = [
  {
    id: "bloom",
    name: "HER BLOOM",
    range: "0 – 99 sao",
    meaning: "Bắt đầu hành trình",
    rate: "1 đơn 100k = 10 sao",
    bonus: 0,
    color: "#c98a8a",
    vouchers: [
      { id: "b1", label: "Miễn phí vận chuyển toàn quốc", brand: "Hella Beauty", code: "HELLAFREESHIP", state: "available" },
      { id: "b2", label: "Voucher 10% cho đơn đầu tiên", brand: "Hella Beauty", code: "HELLABLOOM10", state: "used" },
    ],
  },
  {
    id: "glow",
    name: "HER GLOW",
    range: "100 – 299 sao",
    meaning: "Routine & relationship bắt đầu hình thành",
    rate: "1 đơn 100k = 20 sao",
    bonus: 40,
    color: "#d8b26e",
    vouchers: [
      { id: "g1", label: "Voucher 20%", brand: "Hella TikTok Shop", code: "HELLATIKTOK20", state: "available" },
      { id: "g2", label: "Voucher 15% toàn bộ body care", brand: "Hella Beauty", code: "HELLAGLOW15", state: "available" },
    ],
  },
  {
    id: "shine",
    name: "HER SHINE",
    range: "300 – 499 sao",
    meaning: "Active customer",
    rate: "1 đơn 100k = 30 sao",
    bonus: 60,
    color: "#7a8fb8",
    vouchers: [
      { id: "s1", label: "Voucher 30%", brand: "Shin Spa", code: "SHINSPA30", state: "available" },
      { id: "s2", label: "Early-access sản phẩm mới", brand: "Hella Beauty", code: "HELLAEARLY", state: "available" },
    ],
  },
  {
    id: "icon",
    name: "HER ICON",
    range: "500+ sao",
    meaning: "Highest tier",
    rate: "1 đơn 100k = 40 sao",
    bonus: 80,
    color: "#698269",
    vouchers: [
      { id: "i1", label: "Voucher 50%", brand: "Watsons", code: "WATSONS50", state: "available" },
      { id: "i2", label: "Quà sinh nhật đặc biệt", brand: "Hella Beauty", code: "HELLABDAY", state: "available" },
      { id: "i3", label: "Priority access & ưu đãi độc quyền", brand: "Hella Beauty", code: "HELLAICON", state: "available" },
    ],
  },
];
