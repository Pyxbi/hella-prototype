import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = "public/sites/hellabeauty-vn-ba054dbc/collections/images";
const P = (f) => `https://product.hstatic.net/200000690509/product/${f}`;
const C = (f) => `https://cdn.hstatic.net/products/200000690509/${f}`;

const assets = [
  ["breadcrumb.png", "https://theme.hstatic.net/200000690509/1001057747/14/breadcrumb.png"],
  // cham-soc-da (7)
  ["da-1.jpg", P("z4510168451805_3b3d2805472b8f3c1ac1eca94818af72_5410654a17a74c829fb823b661d0ec0f_large.jpg")],
  ["da-2.jpg", P("z4510168451806_a80863f54685a90cb8e97d6711bb3e91_ba8466341c874a44ad89f84bf11f0dc5_large.jpg")],
  ["da-3.jpg", C("6_59b4faba8af34ffeafb11b5c0f664e66_large.jpg")],
  ["da-4.jpg", C("5_abf45e10095e4ceaabd0db90ab189503_large.jpg")],
  ["da-5.jpg", C("4_eafd4f8975094c678760914dd94a2ddb_large.jpg")],
  ["da-6.jpg", C("7_c5518772432a425a86fdb7fda323ff8d_large.jpg")],
  ["da-7.jpg", C("2_dce23d3b0f054ee39839eb36aaf50551_large.jpg")],
  // cham-soc-toc (3)
  ["toc-1.jpg", P("buoi__2__c134d64d1ac146d19873d98e39097f74_grande.jpg")],
  ["toc-2.jpg", P("blueberry__2__36a76a6ba155426793edd92a53616b34_grande.jpg")],
  ["toc-3.jpg", C("mua_1_t_ng_1__4__1a17971b32264ac4ae3f69ebbf87898a_grande.jpg")],
  // cham-soc-da-mat (3)
  ["damat-1.jpg", P("1_a83e878a9d354a23b18f10a55265f60d_grande.jpg")],
  ["damat-2.jpg", P("mnn_f9fb46bb832d45728c17d98523ee9180_grande.jpg")],
  ["damat-3.jpg", P("z4510167558644_2c3a9a4b004c9158333facb34383fd5c_20898d6cbafe44eebb60d64e304301c1_grande.jpg")],
  // bodymist (12)
  ["bm-1.jpg", C("icon_89cbc98fb67a495685019c3054f3048c_grande.jpg")],
  ["bm-2.jpg", C("icon_c128285b50974340ba19cd3cd8f0f758_grande.jpg")],
  ["bm-3.jpg", C("icon_4288f198f1ab4a4485faeb558b4ece43_grande.jpg")],
  ["bm-4.jpg", C("icon_7badc40f326249afa4c3e7cf6deeb108_grande.jpg")],
  ["bm-5.jpg", C("icon_cb4a26f32d4446d3b1071b58b935dcca_grande.jpg")],
  ["bm-6.jpg", C("icon_15aaad1e22d84152a5c2f674034f2569_grande.jpg")],
  ["bm-7.jpg", C("icon_2f236996dc4b41adb3487e9efd27ee93_grande.jpg")],
  ["bm-8.jpg", C("icon_4c73763b1ecc48b3ac1da11ae9a3a55e_grande.jpg")],
  ["bm-9.jpg", C("icon_64f696c82ed549fb83b0495d8b0c8e00_grande.jpg")],
  ["bm-10.jpg", C("icon_e428e604f4de44c5ae1b27792fe183a4_grande.jpg")],
  ["bm-11.jpg", C("icon_a00baab8333b4e268dd883e45ceee001_grande.jpg")],
  ["bm-12.jpg", C("icon_589c468bbe7148179e31d6416eb47371_grande.jpg")],
];

async function download(name, url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://hellabeauty.vn/" } });
    if (!res.ok) return { name, ok: false, status: res.status };
    await writeFile(path.join(DIR, name), Buffer.from(await res.arrayBuffer()));
    return { name, ok: true };
  } catch (e) {
    return { name, ok: false, err: String(e).slice(0, 80) };
  }
}

await mkdir(DIR, { recursive: true });
const results = [];
for (let i = 0; i < assets.length; i += 4) {
  results.push(...(await Promise.all(assets.slice(i, i + 4).map(([n, u]) => download(n, u)))));
}
console.log(`Downloaded ${results.filter((r) => r.ok).length}/${results.length}`);
const failed = results.filter((r) => !r.ok);
if (failed.length) console.log("FAILED:", JSON.stringify(failed, null, 2));
