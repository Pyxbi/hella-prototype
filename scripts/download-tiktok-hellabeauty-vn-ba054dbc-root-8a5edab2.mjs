import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = "public/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/tiktok";

// videoId → canonical watch URL
const videos = [
  ["7605658413804162322", "https://www.tiktok.com/@herilamreview/video/7605658413804162322"],
  ["7663794948260580626", "https://www.tiktok.com/@hellabeautyessentials/video/7663794948260580626"],
  ["7235121983220976901", "https://www.tiktok.com/@vintace.ci/video/7235121983220976901"],
  ["7463820005998628114", "https://www.tiktok.com/@minaashmi/video/7463820005998628114"],
  ["7618558569050393864", "https://www.tiktok.com/@tranbaonu2809/video/7618558569050393864"],
];

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

async function oembedThumb(url) {
  const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) throw new Error(`oembed ${res.status}`);
  const data = await res.json();
  if (!data.thumbnail_url) throw new Error("no thumbnail_url");
  return data.thumbnail_url;
}

async function download(id, url) {
  try {
    const thumb = await oembedThumb(url);
    const img = await fetch(thumb, { headers: { "User-Agent": UA, Referer: "https://www.tiktok.com/" } });
    if (!img.ok) return { id, ok: false, status: img.status };
    const buf = Buffer.from(await img.arrayBuffer());
    await writeFile(path.join(DIR, `${id}.jpg`), buf);
    return { id, ok: true, bytes: buf.length };
  } catch (e) {
    return { id, ok: false, err: String(e).slice(0, 80) };
  }
}

await mkdir(DIR, { recursive: true });
const results = [];
for (let i = 0; i < videos.length; i += 4) {
  const chunk = videos.slice(i, i + 4);
  results.push(...(await Promise.all(chunk.map(([id, url]) => download(id, url)))));
}
console.log(`Downloaded ${results.filter((r) => r.ok).length}/${results.length}`);
const failed = results.filter((r) => !r.ok);
if (failed.length) console.log("FAILED:", JSON.stringify(failed, null, 2));
