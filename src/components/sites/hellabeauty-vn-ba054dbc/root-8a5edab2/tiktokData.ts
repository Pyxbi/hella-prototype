// Hella Beauty TikTok feed — hardcoded. Add a card = add an object below.
const TIKTOK_IMG = "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/tiktok";

export interface TikTokVideo {
  id: string;
  user: string; // @handle without the @
  videoId: string;
  url: string; // canonical watch URL (fallback link)
  embedUrl: string; // in-page iframe player
  poster: string; // local poster image
  categoryTag: string; // pill label
  title: string;
  description: string;
  categoryHref: string; // collection page to jump to
}

function embed(videoId: string) {
  // Official TikTok inline player — plays the video in-page (unlike embed/v2,
  // which only shows a preview card that opens TikTok).
  const params = new URLSearchParams({
    autoplay: "1",
    controls: "1",
    progress_bar: "1",
    play_button: "1",
    volume_control: "1",
    fullscreen_button: "1",
    loop: "1",
    rel: "0",
    description: "0",
    music_info: "0",
  });
  return `https://www.tiktok.com/player/v1/${videoId}?${params.toString()}`;
}

export const tiktokProfileUrl = "https://www.tiktok.com/tag/hellabeauty";

export const tiktokVideos: TikTokVideo[] = [
  {
    id: "tay-te-bao",
    user: "herilamreview",
    videoId: "7605658413804162322",
    url: "https://www.tiktok.com/@herilamreview/video/7605658413804162322",
    embedUrl: embed("7605658413804162322"),
    poster: `${TIKTOK_IMG}/7605658413804162322.jpg`,
    categoryTag: "Dưỡng Da Body",
    title: "Tẩy tế bào chết body",
    description: "Da mịn màng, sáng khoẻ sau mỗi lần sử dụng",
    categoryHref: "/collections/cham-soc-da",
  },
  {
    id: "hair-lotion",
    user: "hellabeautyessentials",
    videoId: "7663794948260580626",
    url: "https://www.tiktok.com/@hellabeautyessentials/video/7663794948260580626",
    embedUrl: embed("7663794948260580626"),
    poster: `${TIKTOK_IMG}/7663794948260580626.jpg`,
    categoryTag: "Dưỡng Tóc",
    title: "Oil Control Hair Lotion",
    description: "Kiểm soát dầu thừa, tóc bồng bềnh tự nhiên",
    categoryHref: "/collections/cham-soc-toc",
  },
  {
    id: "mat-na",
    user: "vintace.ci",
    videoId: "7235121983220976901",
    url: "https://www.tiktok.com/@vintace.ci/video/7235121983220976901",
    embedUrl: embed("7235121983220976901"),
    poster: `${TIKTOK_IMG}/7235121983220976901.jpg`,
    categoryTag: "Dưỡng Da Mặt",
    title: "Mặt nạ nghệ dưỡng da",
    description: "Giúp làm sáng, mờ thâm và hỗ trợ giảm mụn",
    categoryHref: "/collections/cham-soc-da-mat",
  },
  {
    id: "bodymist",
    user: "minaashmi",
    videoId: "7463820005998628114",
    url: "https://www.tiktok.com/@minaashmi/video/7463820005998628114",
    embedUrl: embed("7463820005998628114"),
    poster: `${TIKTOK_IMG}/7463820005998628114.jpg`,
    categoryTag: "Lưu Hương",
    title: "Body Mist Matcha Mochi",
    description: "Hương thanh ngọt ngào, lưu hương suốt ngày dài",
    categoryHref: "/collections/bo-suu-tap-bodymist",
  },
  {
    id: "sua-tam",
    user: "tranbaonu2809",
    videoId: "7618558569050393864",
    url: "https://www.tiktok.com/@tranbaonu2809/video/7618558569050393864",
    embedUrl: embed("7618558569050393864"),
    poster: `${TIKTOK_IMG}/7618558569050393864.jpg`,
    categoryTag: "Dưỡng Da Body",
    title: "Sữa tắm dưỡng ẩm",
    description: "Làm sạch dịu nhẹ, da mềm mịn & ẩm mượt",
    categoryHref: "/collections/cham-soc-da",
  },
];
