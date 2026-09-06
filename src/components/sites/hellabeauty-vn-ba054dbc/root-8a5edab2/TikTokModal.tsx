"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TikTokVideo } from "./tiktokFeed";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

interface TikTokModalProps {
  video: TikTokVideo | null;
  onClose: () => void;
}

export function TikTokModal({ video, onClose }: TikTokModalProps) {
  return (
    <Dialog
      open={!!video}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-[380px] overflow-hidden bg-white p-0">
        {video && (
          <div>
            <div className="w-full bg-black">
              <iframe
                key={video.videoId}
                src={video.embedUrl}
                title={video.title}
                className="h-[600px] w-full border-0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <DialogTitle className="font-heading text-lg text-black">
                {video.title}
              </DialogTitle>
              <p className="mt-1 text-sm text-black/70">{video.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <Link
                  href={video.categoryHref}
                  className="inline-flex items-center gap-1 rounded-full bg-hella-green px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Khám phá ngay
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-black/60 transition hover:text-hella-green"
                >
                  Mở trên TikTok
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
