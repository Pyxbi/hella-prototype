"use client";

import { ComboStep } from "./sisEngine";
import { cn } from "@/lib/utils";

interface HellaSisComboWizardProps {
  step: ComboStep;
  selected: string[];
  onSelect: (optionId: string) => void;
  onNext: () => void;
}

export function HellaSisComboWizard({
  step,
  selected,
  onSelect,
  onNext,
}: HellaSisComboWizardProps) {
  const atMax = step.maxSelect ? selected.length >= step.maxSelect : false;
  return (
    <div className="hella-slide-up">
      <p className="text-sm font-medium text-black">{step.question}</p>
      {step.multi && step.maxSelect && (
        <p className="mt-1 text-xs text-black/50">
          Chọn tối đa {step.maxSelect} ({selected.length}/{step.maxSelect})
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {step.options.map((opt) => {
          const active = selected.includes(opt.id);
          const disabled = step.multi && !active && atMax;
          return (
            <button
              key={opt.id}
              disabled={disabled}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition",
                active
                  ? "border-hella-green bg-hella-green text-white"
                  : "border-black/20 text-black/80 hover:border-hella-green hover:text-hella-green",
                disabled &&
                  "cursor-not-allowed opacity-40 hover:border-black/20 hover:text-black/80",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {step.multi && (
        <button
          disabled={selected.length === 0}
          onClick={onNext}
          className="mt-4 w-full rounded-full bg-hella-green py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Xem combo của tôi ✦
        </button>
      )}
    </div>
  );
}
