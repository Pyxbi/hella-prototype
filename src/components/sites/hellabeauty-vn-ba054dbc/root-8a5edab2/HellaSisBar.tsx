"use client";

import { useEffect, useRef } from "react";
import { SisQA } from "./sisEngine";
import {
  SearchIcon,
  SparkleIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

interface HellaSisBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (text: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: SisQA[];
  onPick: (qa: SisQA) => void;
}

export function HellaSisBar({
  value,
  onChange,
  onSubmit,
  open,
  onOpenChange,
  suggestions,
  onPick,
}: HellaSisBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) onOpenChange(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onOpenChange]);

  return (
    <section ref={barRef} className="mx-auto max-w-[760px] px-5 py-16 text-center lg:py-20">
      <p className="font-heading text-sm italic text-black/70 sm:text-base">
        Hella Sis - Trợ lý làm đẹp dành riêng cho bạn
      </p>
      <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
        Skincare that feels like you.
      </h2>

      <div className="relative mt-8">
        <div className="flex items-center gap-3 rounded-full border border-black/15 bg-white px-5 py-3.5 shadow-sm transition focus-within:border-hella-green">
          <SparkleIcon className="h-5 w-5 shrink-0 text-hella-green" />
          <input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              onOpenChange(true);
            }}
            onFocus={() => onOpenChange(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim()) onSubmit(value.trim());
            }}
            placeholder="Ask Hella Sis anything about your body care routine…"
            aria-label="Ask Hella Sis"
            className="w-full bg-transparent text-left text-sm text-black outline-none placeholder:text-black/40 sm:text-base"
          />
          <button
            aria-label="Gửi"
            onClick={() => value.trim() && onSubmit(value.trim())}
            className="shrink-0 text-black/60 transition hover:text-hella-green"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>

        {open && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white py-2 text-left shadow-lg">
            {suggestions.map((qa) => (
              <li key={qa.id}>
                <button
                  onClick={() => onPick(qa)}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-sm text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
                >
                  {qa.flow === "combo" ? (
                    <SparkleIcon className="h-4 w-4 shrink-0 text-hella-green" />
                  ) : (
                    <SearchIcon className="h-4 w-4 shrink-0 text-black/40" />
                  )}
                  {qa.question}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
