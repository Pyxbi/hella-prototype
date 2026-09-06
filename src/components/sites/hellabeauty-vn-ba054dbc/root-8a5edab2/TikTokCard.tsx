"use client";

import Image from "next/image";
import Link from "next/link";
import { TikTokVideo } from "./tiktokFeed";
import {
  ArrowRightIcon,
  PlayIcon,
  TikTokIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

interface TikTokCardProps {
  video: TikTokVideo;
  onPlay: () => void;
}

export function TikTokCard({ video, onPlay }: TikTokCardProps) {
  return (
    <div className="flex w-[78%] shrink-0 snap-start flex-col sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-96px)/5)]">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Xem video ${video.title}`}
        className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#f3efe8]"
      >
        <Image
          src={video.poster}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 18vw"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-black/80 px-1.5 py-1 text-[10px] font-semibold text-white">
          <TikTokIcon className="h-3 w-3" />
          TikTok
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-hella-green shadow-md transition group-hover:scale-110">
            <PlayIcon className="ml-0.5 h-5 w-5" />
          </span>
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-hella-green px-2.5 py-1 text-[11px] font-medium text-white">
          {video.categoryTag}
        </span>
      </button>
      <h3 className="font-heading mt-3 text-base text-black">{video.title}</h3>
      <p className="mt-1 text-xs leading-snug text-black/60">{video.description}</p>
      <Link
        href={video.categoryHref}
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-hella-green hover:underline"
      >
        Xem thêm sản phẩm
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
