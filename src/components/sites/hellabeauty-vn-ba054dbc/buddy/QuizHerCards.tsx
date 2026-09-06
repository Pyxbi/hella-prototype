"use client";

import { cn } from "@/lib/utils";
import { herOptions } from "./buddyData";
import { CheckIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

export function QuizHerCards({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {herOptions.map((o) => {
        const active = selected.includes(o.id);
        return (
          <button
            key={o.id}
            onClick={() => onToggle(o.id)}
            className={cn(
              "relative rounded-2xl border p-5 text-left transition",
              active
                ? "border-hella-green bg-hella-cream"
                : "border-black/15 bg-white hover:border-hella-green",
            )}
          >
            <span
              className={cn(
                "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition",
                active ? "border-hella-green bg-hella-green text-white" : "border-black/25",
              )}
            >
              {active && <CheckIcon className="h-3 w-3" />}
            </span>
            <h3 className="font-heading text-hella-green text-lg">{o.title}</h3>
            <p className="mt-1 pr-6 text-sm text-black/70">{o.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
