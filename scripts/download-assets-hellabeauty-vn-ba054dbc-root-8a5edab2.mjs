import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const IMG_DIR = "public/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images";
const FONT_DIR = "public/sites/hellabeauty-vn-ba054dbc/shared/fonts";

// [remote url, local filename]
const images = [
  ["https://theme.hstatic.net/200000690509/1001057747/14/logo.png", "logo.png"],
  ["https://iili.io/FdITSxS.jpg", "hero_slide_1.jpg"],
  ["https://iili.io/FdIIvMF.jpg", "hero_slide_2.jpg"],
  ["https://iili.io/FdIBnhg.jpg", "hero_slide_3.jpg"],
  ["https://file.hstatic.net/200000690509/file/3__1__01bc4893696a4e938f8e2f3a58ff7e86.jpg", "slideshow2_1.jpg"],
  ["https://file.hstatic.net/200000690509/file/resize_10_d8397a379b174c298060d6a50504fc3e.jpg", "slideshow2_2.jpg"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/homepage_banner_and_collection.png", "collection_banner.png"],
  ["https://file.hstatic.net/200000662001/file/group_9bbe4fa438594a1091353d1fa6609513.png", "collection_banner_group.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_1.png", "collection_list_1.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_2.png", "collection_list_2.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_3.png", "collection_list_3.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_4.png", "collection_list_4.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_6b_1.png", "collection_list_6b_1.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_6b_2.png", "collection_list_6b_2.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_6b_3.png", "collection_list_6b_3.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_collection_list_6b_4.png", "collection_list_6b_4.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/shop_the_look_1_image.png", "shop_the_look_1.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/shop_the_look_2_image.png", "shop_the_look_2.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_vendor_1.png", "vendor_1.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_vendor_2.png", "vendor_2.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_vendor_3.png", "vendor_3.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_vendor_4.png", "vendor_4.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_vendor_5.png", "vendor_5.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_vendor_6.png", "vendor_6.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_ig_1.png", "ig_1.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_ig_2.png", "ig_2.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_ig_3.png", "ig_3.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_ig_4.png", "ig_4.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_ig_5.png", "ig_5.png"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/home_ig_6.png", "ig_6.png"],
  ["https://file.hstatic.net/200000690509/file/1920x960_fcadc8851b8945f2bc81da478e92c061.jpg", "footer_banner.jpg"],
  ["https://theme.hstatic.net/200000690509/1001057747/14/logo_bct.png", "logo_bct.png"],
  ["https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-2019-1597680-1350125.png", "social_facebook.png"],
  ["https://cdn.iconscout.com/icon/free/png-256/free-instagram-1868978-1583142.png", "social_instagram.png"],
  ["https://cdn-icons-png.flaticon.com/256/4138/4138151.png", "social_tiktok.png"],
  ["https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png", "market_tiki.png"],
  ["https://logospng.org/download/shopee/logo-shopee-icon-256.png", "market_shopee.png"],
  ["https://shipxanh.com/wp-content/uploads/2021/05/icon-lazada.png", "market_lazada.png"],
  // background images
  ["https://theme.hstatic.net/200000690509/1001057747/14/bg-collection-list.png", "bg-collection-list.png"],
  ["https://file.hstatic.net/200000662001/file/item-nav_3f76df06df7b48afa2c204444e7487cd.png", "item-nav.png"],
  ["https://file.hstatic.net/200000662001/file/slide-dot_1c8e21f09a4943579eef28e4b0f69413.png", "slide-dot.png"],
  // favicon
  ["https://file.hstatic.net/200000690509/file/hella_beauty_3e3c1ca7f63547bc8bec90ac0f532635.jpg", "favicon.jpg"],
];

const fonts = [
  ["https://theme.hstatic.net/200000690509/1001057747/14/BeautiqueDisplay.ttf", "BeautiqueDisplay.ttf"],
];

async function download(url, dest) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://hellabeauty.vn/" } });
    if (!res.ok) return { url, ok: false, status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    return { url, ok: true, bytes: buf.length, dest };
  } catch (e) {
    return { url, ok: false, err: String(e).slice(0, 80) };
  }
}

async function batch(items, dir) {
  await mkdir(dir, { recursive: true });
  const results = [];
  for (let i = 0; i < items.length; i += 4) {
    const chunk = items.slice(i, i + 4);
    const r = await Promise.all(chunk.map(([u, name]) => download(u, path.join(dir, name))));
    results.push(...r);
  }
  return results;
}

const imgResults = await batch(images, IMG_DIR);
const fontResults = await batch(fonts, FONT_DIR);
const all = [...imgResults, ...fontResults];
const failed = all.filter((r) => !r.ok);
console.log(`Downloaded ${all.filter((r) => r.ok).length}/${all.length}`);
if (failed.length) console.log("FAILED:", JSON.stringify(failed, null, 2));
