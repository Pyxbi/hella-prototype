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
