// Hella Beauty collection pages — real products extracted from hellabeauty.vn.
const IMG = "/sites/hellabeauty-vn-ba054dbc/collections/images";
export const collectionBannerImage = `${IMG}/breadcrumb.png`;

export interface CollectionProduct {
  title: string;
  image: string;
  price: number; // current price (VND)
  compareAt?: number; // original price if on sale
  href: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CollectionData {
  slug: string;
  title: string; // Vietnamese collection name
  productType: string; // "Loại sản phẩm" value
  products: CollectionProduct[];
}

export const collections: Record<string, CollectionData> = {
  "cham-soc-da": {
    slug: "cham-soc-da",
    title: "Chăm Sóc Da",
    productType: "Chăm sóc da",
    products: [
      { title: "Sữa tắm hương nước hoa Lovelywish Hella Beauty 500ml", image: `${IMG}/da-1.jpg`, price: 245000, href: "#", isNew: true },
      { title: "Sữa tắm hương nước hoa Starrynight Hella Beauty 500ml", image: `${IMG}/da-2.jpg`, price: 245000, href: "#", isBestSeller: true },
      { title: "Tẩy tế bào chết body đậu đỏ kem dừa Hella Beauty 500g", image: `${IMG}/da-3.jpg`, price: 280000, href: "#", isBestSeller: true },
      { title: "Tẩy tế bào chết body hạnh nhân macca Hella Beauty 500g", image: `${IMG}/da-4.jpg`, price: 280000, href: "#" },
      { title: "Tẩy tế bào chết body kem dâu Hella Beauty 500g", image: `${IMG}/da-5.jpg`, price: 280000, href: "#" },
      { title: "Tẩy Tế Bào Chết Body Matcha Hella Beauty 500g", image: `${IMG}/da-6.jpg`, price: 280000, href: "#", isNew: true },
      { title: "Tẩy tế bào chết cà phê Hella Beauty 450g", image: `${IMG}/da-7.jpg`, price: 280000, href: "#" },
    ],
  },
  "cham-soc-toc": {
    slug: "cham-soc-toc",
    title: "Chăm Sóc Tóc",
    productType: "Chăm sóc tóc",
    products: [
      { title: "Dầu gội Bưởi Hella Beauty 500g", image: `${IMG}/toc-1.jpg`, price: 259000, compareAt: 359000, href: "#", isBestSeller: true },
      { title: "Dầu gội giảm rụng Blueberry Hella Beauty 500g", image: `${IMG}/toc-2.jpg`, price: 259000, compareAt: 359000, href: "#" },
      { title: "Tẩy tế bào chết cho da đầu tinh chất quả cam Hella Beauty 150g", image: `${IMG}/toc-3.jpg`, price: 200000, href: "#", isNew: true },
    ],
  },
  "cham-soc-da-mat": {
    slug: "cham-soc-da-mat",
    title: "Chăm Sóc Da Mặt",
    productType: "Chăm sóc da mặt",
    products: [
      { title: "Mặt nạ bơ làm sạch ẩm mịn cho da Hella Beauty 50g", image: `${IMG}/damat-1.jpg`, price: 187000, href: "#", isBestSeller: true },
      { title: "Mặt nạ nghệ dưỡng trắng mờ thâm Hella Beauty 50g", image: `${IMG}/damat-2.jpg`, price: 187000, href: "#", isNew: true },
      { title: "Nước tẩy trang nho Hella Beauty 500ml", image: `${IMG}/damat-3.jpg`, price: 250000, compareAt: 280000, href: "#" },
    ],
  },
  "bo-suu-tap-bodymist": {
    slug: "bo-suu-tap-bodymist",
    title: "Bộ Sưu Tập Bodymist",
    productType: "Bodymist",
    products: [
      { title: "After Hours", image: `${IMG}/bm-1.jpg`, price: 280000, href: "#", isBestSeller: true },
      { title: "Aloha Sorbet", image: `${IMG}/bm-2.jpg`, price: 280000, href: "#" },
      { title: "Berry Candy", image: `${IMG}/bm-3.jpg`, price: 280000, href: "#", isNew: true },
      { title: "Boba Milktea", image: `${IMG}/bm-4.jpg`, price: 280000, href: "#", isBestSeller: true },
      { title: "Clean Baby", image: `${IMG}/bm-5.jpg`, price: 280000, href: "#" },
      { title: "Cotton Cloud", image: `${IMG}/bm-6.jpg`, price: 280000, href: "#" },
      { title: "Cozy Vanilla", image: `${IMG}/bm-7.jpg`, price: 280000, href: "#" },
      { title: "Creamy Baby", image: `${IMG}/bm-8.jpg`, price: 280000, href: "#" },
      { title: "Dear My Berry", image: `${IMG}/bm-9.jpg`, price: 280000, href: "#", isNew: true },
      { title: "Honey Fusion", image: `${IMG}/bm-10.jpg`, price: 280000, href: "#" },
      { title: "Kailani Coconut", image: `${IMG}/bm-11.jpg`, price: 280000, href: "#" },
      { title: "Lush Bloom", image: `${IMG}/bm-12.jpg`, price: 280000, href: "#" },
    ],
  },
};

export const sortOptions = [
  { id: "featured", label: "Sản phẩm nổi bật" },
  { id: "bestselling", label: "Bán chạy nhất" },
  { id: "name-asc", label: "Theo tên A-Z" },
  { id: "name-desc", label: "Theo tên Z-A" },
  { id: "price-asc", label: "Theo giá tăng dần" },
  { id: "price-desc", label: "Theo giá giảm dần" },
  { id: "newest", label: "Từ mới đến cũ" },
  { id: "oldest", label: "Từ cũ đến mới" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

export const priceRanges = [
  { id: "u100", label: "Dưới 100.000", min: 0, max: 99999 },
  { id: "100-199", label: "100.000 - 199.000", min: 100000, max: 199999 },
  { id: "200-299", label: "200.000 - 299.000", min: 200000, max: 299999 },
  { id: "300-399", label: "300.000 - 399.000", min: 300000, max: 399999 },
  { id: "400-499", label: "400.000 - 499.000", min: 400000, max: 499999 },
  { id: "o500", label: "Trên 500.000", min: 500000, max: Infinity },
];

export function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}
