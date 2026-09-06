"use client";

import Link from "next/link";
import { useState } from "react";
import { TikTokCard } from "./TikTokCard";
import { TikTokModal } from "./TikTokModal";
import { tiktokProfileUrl, tiktokVideos, type TikTokVideo } from "./tiktokFeed";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

export function TikTokFeed() {
  const [active, setActive] = useState<TikTokVideo | null>(null);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-hella-green text-3xl leading-tight sm:text-4xl">
            Khám phá Hella từ TikTok
          </h2>
          <p className="mt-2 max-w-xl text-sm text-black/70">
            Xem video trải nghiệm thực tế từ Hella Sis và đi thẳng đến danh mục sản
            phẩm phù hợp với bạn.
          </p>
        </div>
        <Link
          href={tiktokProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center gap-1 rounded-full border border-black/15 px-4 py-2 text-sm text-black transition hover:border-hella-green hover:text-hella-green sm:inline-flex"
        >
          Xem tất cả
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tiktokVideos.map((v) => (
          <TikTokCard key={v.id} video={v} onPlay={() => setActive(v)} />
        ))}
      </div>

      <TikTokModal video={active} onClose={() => setActive(null)} />
    </section>
  );
}
