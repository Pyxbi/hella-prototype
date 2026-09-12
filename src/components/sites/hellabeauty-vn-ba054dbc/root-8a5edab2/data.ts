// Content extracted verbatim from https://hellabeauty.vn/
export const IMG = "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images";

export const announcements = [
  "Mua sắm & Tận hưởng giao hàng miễn phí toàn quốc với cùng với Hellabeauty.vn",
  "Mua sắm & Tận hưởng miễn phí giao hàng trong 2h cùng với Hella Beauty",
  "Mua sắm & Tận hưởng miễn phí giao hàng trong 2h cùng với Sundays",
];

export const navLinks = [
  { label: "Câu chuyện thương hiệu", href: "/pages/cau-chuyen-thuong-hieu" },
  { label: "Lịch nhắc nhở", href: "/pages/hella-buddy" },
  {
    label: "Chăm sóc toàn diện",
    href: "/",
    children: [
      { label: "Chăm sóc body", href: "/collections/cham-soc-da" },
      { label: "Chăm sóc tóc", href: "/collections/cham-soc-toc" },
      { label: "Chăm sóc da mặt", href: "/collections/cham-soc-da-mat" },
      { label: "Bộ sưu tập bodymist", href: "/collections/bo-suu-tap-bodymist" },
    ],
  },
  {
    label: "Bài viết",
    href: "/blogs/news",
    children: [
      { label: "Nhà máy", href: "/pages/nha-may" },
      { label: "Nguyên liệu", href: "/pages/nguyen-lieu" },
      { label: "Câu chuyện thương hiệu", href: "/pages/cau-chuyen-thuong-hieu" },
    ],
  },
];

export const heroSlides = [
  `${IMG}/hero_slide_1.jpg`,
  `${IMG}/hero_slide_2.jpg`,
  `${IMG}/hero_slide_3.jpg`,
];

export const slideshow2 = [`${IMG}/slideshow2_1.jpg`, `${IMG}/slideshow2_2.jpg`];

export const collectionBanner = {
  image: `${IMG}/collection_banner.png`,
  badge: `${IMG}/collection_banner_group.png`,
  subtitle: "Chương trình HOT tháng 7 dành riêng cho tín đồ Hella Beauty",
  title: "Mua hàng - Nhận quà",
};

export const productTabHeading = {
  subtitle: "Chăm Sóc Tóc Không Sulfate, Silicone & PEG",
  title: "Trải Nghiệm Diệu Kì Cho Mái Tóc Mây",
};

export type Product = { title: string; image: string; href: string };

export const collectionList1 = {
  subtitle: "Luôn xinh đẹp với",
  title: "Combo siêu xịn - chăm da siêu mịn",
  products: [
    {
      title: "Kem Body trắng da nâng tone Hella Beauty 200g",
      image: `${IMG}/collection_list_1.png`,
      href: "/products/kem-body-trang-da-nang-tone-tuc-thi-hella-beauty-200g",
    },
    {
      title: "Kem Body trắng da Alpha Arbutin Pear Freesia Hella Beauty 200g",
      image: `${IMG}/collection_list_2.png`,
      href: "/products/kem-body-trang-da-alpha-arbutin-pear-freesia-hella-beauty-200g",
    },
    {
      title: "Kem Body trắng da Alpha Arbutin Midnight Petal Hella Beauty 200g",
      image: `${IMG}/collection_list_3.png`,
      href: "/products/kem-body-trang-da-alpha-arbutin-midnight-petal-hella-beauty-200g",
    },
    {
      title: "Kem Body 3-in-1 Dưỡng Ẩm Chống Nắng Dưỡng Trắng Starry Nights Hella Beauty 200g",
      image: `${IMG}/collection_list_4.png`,
      href: "/products/kem-body-3-in-1-duong-am-chong-nang-duong-trang-starry-nights-hella-beauty-200g",
    },
  ] as Product[],
};

export const collectionList2 = {
  subtitle: "Da trắng sáng với",
  title: "Combo Tẩy Tế Bào Chết",
  products: [
    {
      title: "Tẩy Tế Bào Chết Body cà phê Hella Beauty 500g",
      image: `${IMG}/collection_list_6b_1.png`,
      href: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g",
    },
    {
      title: "Tẩy Tế Bào Chết Body Đậu Đỏ Kem Dừa Hella Beauty 500g",
      image: `${IMG}/collection_list_6b_2.png`,
      href: "/products/tay-te-bao-chet-body-dau-do-kem-dua-hella-beauty-500g",
    },
    {
      title: "Tẩy Tế Bào Chết Body Hạnh Nhân Macca Hella Beauty 500g",
      image: `${IMG}/collection_list_6b_3.png`,
      href: "/products/tay-te-bao-chet-body-hanh-nhan-macca-hella-beauty-500g",
    },
    {
      title: "Tẩy Tế Bào Chết Body kem dâu Hella Beauty 500g",
      image: `${IMG}/collection_list_6b_4.png`,
      href: "/products/tay-te-bao-chet-body-kem-dau-hella-beauty-500g",
    },
  ] as Product[],
};

export const shopTheLook = [
  `${IMG}/shop_the_look_1.png`,
  `${IMG}/shop_the_look_2.png`,
];

export const vendorSection = {
  subtitle: "BÍ QUYẾT NÂNG CẤP LÀN DA",
  title: "Hella Beauty",
  images: [1, 2, 3, 4, 5, 6].map((n) => `${IMG}/vendor_${n}.png`),
};

export const instagramSection = {
  subtitle: "Instagram",
  title: "Hella Beauty",
  images: [1, 2, 3, 4, 5, 6].map((n) => `${IMG}/ig_${n}.png`),
};

export const footer = {
  logo: `${IMG}/logo.png`,
  company: {
    name: "Công Ty Tnhh Sản Xuất Và Thương Mại Tổng Hợp Việt My",
    reg: "GCNĐKKD số: 0302859750 do sở KH & ĐT TP.HCM cấp ngày 07.04.2023",
    email: "hellabeauty.vmg@gmail.com",
    phone: "0972.020.577",
    bct: `${IMG}/logo_bct.png`,
  },
  columns: [
    {
      title: "Về Hella Beauty",
      links: [
        { label: "Câu chuyện thương hiệu", href: "/" },
        { label: "Giới thiệu về Hella Beauty", href: "/" },
        { label: "Quy chế hoạt động Website TMĐT", href: "/pages/quy-che-hoat-dong-website-tmdt-hellabeauty-vn" },
        { label: "Bảo mật thông tin", href: "/pages/bao-mat-thong-tin" },
        { label: "Tuyển dụng", href: "/pages/tuyen-dung" },
        { label: "Liên hệ", href: "/pages/lien-he" },
      ],
    },
    {
      title: "Hỗ Trợ Khách Hàng",
      links: [
        { label: "Hướng dẫn đặt hàng", href: "/" },
        { label: "Chính sách vận chuyển", href: "/" },
        { label: "Hướng dẫn kiểm tra đơn hàng", href: "/" },
        { label: "Hướng dẫn thanh toán", href: "/" },
        { label: "Chính sách đổi trả", href: "/" },
        { label: "Hướng dẫn đổi trả", href: "/" },
        { label: "Hướng dẫn khiếu nại & hoàn tiền", href: "/" },
      ],
    },
  ],
  socials: [
    { label: "Facebook", icon: `${IMG}/social_facebook.png`, href: "/" },
    { label: "Instagram", icon: `${IMG}/social_instagram.png`, href: "/" },
    { label: "Tiktok", icon: `${IMG}/social_tiktok.png`, href: "/" },
  ],
  markets: [
    { label: "Tiki", icon: `${IMG}/market_tiki.png` },
    { label: "Shopee", icon: `${IMG}/market_shopee.png` },
    { label: "Lazada", icon: `${IMG}/market_lazada.png` },
  ],
  bottomLine:
    "Công Ty TNHH Sản Xuất và Thương Mại Tổng Hợp Việt My - GCNĐKKD số: 0302859750 do sở KH & ĐT TP.HCM cấp ngày 07.04.2023",
};
