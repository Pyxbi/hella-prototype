"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ComboStep, SisLink, SisMessage } from "./hellaSis";
import { HellaSisComboWizard } from "./HellaSisComboWizard";
import {
  ChatCloseIcon,
  GlobeIcon,
  SendIcon,
  SparkleIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { IMG } from "./data";

interface HellaSisChatProps {
  open: boolean;
  messages: SisMessage[];
  mode: "chat" | "combo";
  currentStep: ComboStep | null;
  comboSelected: string[];
  onComboSelect: (optionId: string) => void;
  onComboNext: () => void;
  composerValue: string;
  onComposerChange: (v: string) => void;
  onComposerSubmit: (text: string) => void;
  onClose: () => void;
}

function LinkIcon({ icon }: { icon: SisLink["icon"] }) {
  if (icon === "web") return <GlobeIcon className="h-4 w-4" />;
  const src =
    icon === "shopee" ? `${IMG}/market_shopee.png` : `${IMG}/social_tiktok.png`;
  return <Image src={src} alt="" width={16} height={16} className="h-4 w-4 object-contain" />;
}

export function HellaSisChat({
  open,
  messages,
  mode,
  currentStep,
  comboSelected,
  onComboSelect,
  onComboNext,
  composerValue,
  onComposerChange,
  onComposerSubmit,
  onClose,
}: HellaSisChatProps) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mode, currentStep]);

  if (!open) return null;

  return (
    <aside className="hella-slide-up fixed bottom-4 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-hella-green px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <SparkleIcon className="h-5 w-5" />
          <span className="font-heading text-base">Hella Sis</span>
        </div>
        <button
          aria-label="Đóng"
          onClick={onClose}
          className="opacity-90 transition hover:opacity-100"
        >
          <ChatCloseIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl bg-hella-green px-3.5 py-2 text-sm text-white">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-hella-cream px-3.5 py-2.5 text-sm text-black">
                {m.answer.text.map((t, i) => (
                  <p key={i} className={cn(i > 0 && "mt-2")}>
                    {t}
                  </p>
                ))}
                {m.answer.products && m.answer.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {m.answer.products.map((p) => (
                      <Link
                        key={p.title}
                        href={p.href}
                        className="flex items-center gap-3 rounded-lg bg-white p-2 transition hover:ring-1 hover:ring-hella-green"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-[#f3efe8]">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <span className="text-xs leading-snug text-black">{p.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {m.answer.links && m.answer.links.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    {m.answer.links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.url}
                        aria-label={l.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-hella-green transition hover:border-hella-green"
                      >
                        <LinkIcon icon={l.icon} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {/* Active combo step */}
        {mode === "combo" && currentStep && (
          <div className="rounded-2xl bg-hella-cream px-3.5 py-3">
            <HellaSisComboWizard
              step={currentStep}
              selected={comboSelected}
              onSelect={onComboSelect}
              onNext={onComboNext}
            />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Composer (hidden during combo step selection) */}
      {mode === "chat" && (
        <div className="flex items-center gap-2 border-t border-black/10 px-3 py-2.5">
          <input
            value={composerValue}
            onChange={(e) => onComposerChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && composerValue.trim())
                onComposerSubmit(composerValue.trim());
            }}
            placeholder="Nhập câu hỏi cho Hella Sis…"
            aria-label="Nhập câu hỏi"
            className="w-full bg-transparent px-2 text-sm text-black outline-none placeholder:text-black/40"
          />
          <button
            aria-label="Gửi"
            onClick={() => composerValue.trim() && onComposerSubmit(composerValue.trim())}
            className="shrink-0 text-hella-green transition hover:opacity-80"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </aside>
  );
}
